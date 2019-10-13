import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { InvoiceComponent, MeeResult } from '../../interface';
import { OcrResultVo } from '../invoice-ocr/invoice-item';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';



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
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', this.actionUrl, formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          console.log(e);
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          const response: MeeResult = e.body;
          if (response.statusCode === 0 && response.data != null) {
            const ocrResult = new OcrResultVo(response, null);
            this.callback.emit(ocrResult);
          }
        },
        (e) => {
          console.log(e);
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  handlePreview = (file: UploadFile) => {
    console.log(file);
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
