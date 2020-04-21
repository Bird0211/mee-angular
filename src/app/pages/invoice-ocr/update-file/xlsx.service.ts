import { Injectable } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

import * as XLSX from 'xlsx';

type Callback = (data: any)  => void;

interface OriFile {
  data: [];
  name: string;
}

@Injectable({
  providedIn: 'root'
})


export class XlsxService {

  constructor() { }

  importdata(files: UploadFile[] , range: number, callback: Callback ) {
    if (!files) {
        return;
    }
    const rABS = true; // 是否将文件读取为二进制字符串
    const oridatas: any = [];

    for (const file of files) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        let wb: any;
        if (rABS) {
          wb = XLSX.read(btoa(this.fixdata(bstr)), {// 手动转化
            type: 'base64'
          });
        } else {
          wb = XLSX.read(bstr, {type: 'binary'});
        }
        const oriFile = {data: [], name: ''};
        oriFile.data = [];
        oriFile.name = e.target.fileName;

        // 遍历每张表读取
        for (const sheetName of wb.SheetNames) {
          const sheet = wb.Sheets[sheetName];
          const oridata = {name: null, fromTo: null, range: 0, manges: null, data: null};
          oridata.name = sheetName;
          oridata.fromTo = sheet['!ref'];
          oridata.range = sheet['!range'];
          oridata.manges = sheet['!merges'];
          oridata.data = XLSX.utils.sheet_to_json(sheet, {raw: true, range });
              // break; // 如果只取第一张表，就取消注释这行
          oriFile.data.push(oridata);
        }
        oridatas.push(oriFile);
      };

      if (rABS) {
        reader.readAsArrayBuffer(file as unknown as Blob);
      } else {
        reader.readAsBinaryString(file as unknown as Blob);
      }

      reader.onloadend = (e) => {
        if (oridatas != null && oridatas.length === files.length) {
            callback(oridatas);
        }
      };
    }
  }

  fixdata(data) {   // 文件流转BinaryString
    let o = '';
    let l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) { o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w))); }
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

}
