import { Output, EventEmitter } from "@angular/core";

export interface MeeResult {
    statusCode: number;
    description: string;
    data: string;
}

export interface OcrResult {
    meeResult: MeeResult
    img: string;
}

export interface OcrData {
    invoiceDate: Date;
    invoiceNo: string;
    products: [
        {   sku: string;
            price: number;
            num: number;
            content: string;
        }
    ]
}

export interface InvoiceConfirmDataService {
    img: string;
    ocrData: OcrData;

}

export interface InvoiceComponent {
    data: any;
    callback: EventEmitter<any>;
}

export interface SupplierVo {
    id: string;
    name: string;
}