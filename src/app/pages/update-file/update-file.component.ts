import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { InvoiceComponent, MeeResult } from '../../interface';
import { OcrResultVo } from '../invoice-ocr/invoice-item';
import { environment } from 'src/environments/environment';


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

  fileList = [];

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  constructor(private msg: NzMessageService) {
    this.actionUrl = environment.updateImgUrl;
  }

  ngOnInit() {
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
      this.msg.success(`${file.name} file uploaded successfully.`);
      const response: MeeResult = file.response;
      const image = file.url || file.thumbUrl;
      if (response.statusCode === 0) {
        const ocrResult = new OcrResultVo(response, image);
        this.callback.emit(ocrResult);
      }

    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

}
