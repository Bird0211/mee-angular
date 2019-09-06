import { Type } from '@angular/core';
import { OcrResult, MeeResult } from 'src/app/interface';

export class InvoiceItem {
  constructor(public component: Type<any>, public data: any) {}
}

export class OcrResultVo implements OcrResult {

  constructor(public meeResult: MeeResult, public img: string) {
  }

}
