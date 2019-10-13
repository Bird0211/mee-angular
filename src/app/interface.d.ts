import { Output, EventEmitter } from "@angular/core";

export interface MeeResult {
    statusCode: number;
    description: string;
    data: any;
}

export interface OcrResult {
    meeResult: MeeResult
    img: string;
}

export interface OcrData {
    invoiceDate: Date;
    invoiceNo: string;
    purchaser: string;
    products: product[];
}

export interface product {
    sku: string;
    price: number;
    num: number;
    content: string;
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

export interface MeeProduct {
    id: string;

    code: string;

    name: string;

    brand: string;

    chName: string;

    weight: string;

    costPrice: number;       //成本价

    retailPrice: number;     //销售价
}