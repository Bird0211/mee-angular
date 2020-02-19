import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { InvoiceComponent, MeeResult, OcrData, Product } from '../../../interface';
import { OcrResultVo } from '../invoice-item';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { XlsxService } from './xlsx.service';
import format from 'date-fns/format';


@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.less']
})
export class UpdateFileComponent implements OnInit, InvoiceComponent {
  @Input() data: any;

  @Output() callback = new EventEmitter();

  previewImage: string | undefined = '';
  previewVisible = false;
  actionUrl: string | undefined = '';
  uploading = false;
  fileList = [];

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  constructor(private msg: NzMessageService, private http: HttpClient) {
    this.actionUrl = environment.updateImgUrl;
  }

  ngOnInit() {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  handleUpload(): void {
    if (!this.fileList || this.fileList.length <= 0) {
      return;
    }

    console.log(this.fileList);
    this.uploading = true;
    if (this.fileList[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.ocrExl(this.fileList);
    } else {
      const formData = new FormData();
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });
      this.ocrImg(formData);
    }
  }

  ocrImg = (formData: FormData) => {
    const req = new HttpRequest('POST', this.actionUrl, formData, {
      // reportProgress: true
    });

    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          this.uploading = false;
          this.msg.success('upload successfully.');
          const response: MeeResult = e.body;
          console.log(response);
          if (response.statusCode === 0 && response.data != null) {
            const ocrResult = new OcrResultVo(response, this.fileList);
            this.callback.emit(ocrResult);
          }
          this.fileList = [];
        },
        (e) => {
          console.log(e);
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  ocrExl = (fileList: UploadFile[]) => {
    this.uploading = false;
    const xlsx = new XlsxService();
    xlsx.importdata(fileList, 0, (datas: any) => {
      if (!datas || datas == null || datas.length <= 0) {
        this.msg.error('Excel File Error!');
        return;
      }

      const wbData = datas[0];
      const name = wbData.name;
      const d = wbData.data;
      if (!d || d.length <= 0) {
        this.msg.error('Excel File Error!');
        return;
      }

      const sheetDatas = wbData.data[0];
      if (!sheetDatas || sheetDatas.data.length <= 0) {
        this.msg.error('Excel File Error!');
        return;
      }

      const rowDatas = sheetDatas.data;
      if (!rowDatas || rowDatas.data <= 0) {
        this.msg.error('Excel File Error!');
        return;
      }

      const products: Product[] = [];
      for (const rowData of rowDatas) {
        const content = rowData.英文名;
        const num = rowData.需购买件数;
        const price = rowData.成本价;
        const sku = rowData.SKU;
        if (!content && !num && !price && !sku) {
          continue;
        }
        const product: Product = {
          content,
          num,
          price,
          sku
        };
        products.push(product);
      }
      if (!products || products.length <= 0) {
          this.msg.error('Excel File Error!');
          return;
      }

      // const date = format(new Date(), 'yyyy-MM-dd');
      const ocrData: OcrData = { invoiceDate: new Date(), invoiceNo: '', purchaser: null, products};
      const response: MeeResult = {statusCode: 0 , description : null, data: ocrData };
      const ocrResult = new OcrResultVo(response, null);
      this.callback.emit(ocrResult);

    });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  onChange = ({ file, fileList }: { [key: string]: any }) => {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      // this.msg.success(`${file.name} file uploaded successfully.`);
      // const response: MeeResult = file.response;
      // const image = file.url || file.thumbUrl;
      // if (response.statusCode === 0 && response.data != null) {
      //   const ocrResult = new OcrResultVo(response, image);
      //   this.callback.emit(ocrResult);
      // }

    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
