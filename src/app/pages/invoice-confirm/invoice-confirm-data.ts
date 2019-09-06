import { InvoiceConfirmDataService, OcrData } from 'src/app/interface';

export class InvoiceConfirmData implements InvoiceConfirmDataService {
    public img: string;
    public ocrData: OcrData;

    constructor() { }

}
