import { Injectable } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import * as XLSX from 'xlsx';
import { BookType, WritingOptions } from 'xlsx';

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

  importdata(files: NzUploadFile[] , range: number, callback: Callback ) {
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

  downloadExl = (data: any, type: BookType, filename: string, isSkipHeader: boolean) => {
    if (!data || data == null || data.length <= 0) {
      return;
    }

    const reName = filename;
    const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data, {skipHeader: isSkipHeader}); //  通过json_to_sheet转成单页(Sheet)数据
    const bookType: BookType = type === undefined ? 'xlsx' : type;
    const writhOption: WritingOptions = {bookType, bookSST: false, type: 'binary'};

    const obj = new Blob([this.s2ab(XLSX.write(wb, writhOption))],
    { type: 'application/octet-stream' });


    this.saveAs(obj, reName);
  }

  saveAs(obj: any, fileName: string) {     //  当然可以自定义简单的下载文件实现方式
      const tmpa = document.createElement('a');
      tmpa.download = fileName || '下载';
      tmpa.href = URL.createObjectURL(obj);   //  绑定a标签
      tmpa.click();   //  模拟点击实现下载
      setTimeout(() => { // 延时释放
          URL.revokeObjectURL(obj);  // 用URL.revokeObjectURL()来释放这个object URL
      }, 100);
  }

  s2ab(s: any): BlobPart { //  字符串转字符流
      if (typeof ArrayBuffer !== 'undefined') {
          const buf = new ArrayBuffer(s.length);
          const view = new Uint8Array(buf);
          for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
          }
          return buf;
      } else {
          const buf = new Uint8Array(s.length);
          for (let i = 0; i !== s.length; ++i) {
            buf[i] = s.charCodeAt(i) & 0xFF;
          }
          return buf;
      }
  }

}
