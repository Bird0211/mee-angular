import {EventEmitter } from "@angular/core";

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
    products: Product[];
}

export interface Product {
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


export class Menu {
  id?: number | 0;

  title?: string | '';

  description?: string | null;

  type?: string | "0";

  url?: string | null;

  level?: number | 1;

  sort?: number | 0;

  icon?: string | null;

  iconColor?: string | null;

  parentId?: number | 0;

  subMenu?: Menu[] | null;

}

export interface OCRProduct {
    id: number;
    content: string;
    price: number;
    num: number;
    sku: string;
    meename: string;
}

export interface BizData {
    id?: number | 0;
    name?: string | null;
    token?: string | null;
    expireDate?: Date | null;
    status?: number | 0;
}

export interface BizMenu {
    id: number;
    bizId: number;
    menuId: number;
}

export interface Role {
    id: number;
    roleName: string;
    bizId: number;
    roleType: number;
}

export interface RoleMenu {
    id: number;
    roleId: number;
    menuId: number;
}

export interface RoleUser {
    id: number;
    roleId: number;
    userId: number;
}

export interface YiYunUser {
    userId: number;

    givenName: string;

    surname: string;

    email: string;
}

export interface AuthParam {
    bizid: string; userid: string; time: string; nonce: string; sign: string;
}

export interface SimpleData {
    image: string;
    value: string;
    name: string;
    color: string;
}

export interface News {
    id: number;
    title: string;
    type: number;
    overView: string;
}

export interface NewsIO {
    status: string;
    totalResults: number;
    articles: NewsIOInfo[];
}

export interface NewsIOInfo {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: NewsSource;
}

export interface NewsSource {
    id: string;
    name: string;
}

export interface TodoEvent {
    id: number;
    title: string;
}

export interface NewsInfo {
    id: string;

    title: string;

    content: string;

    updateDate: Date;

    type: number;
}

export interface pageNewsInfo {
    total: number;
    pageIndex: number;
    pageSize: number;
    news: NewsInfo[];
}

export interface TodayData {
    totalPrice: number;

    totalNum: number;

    deliveredNum: number;

    undeliveredNum: number;
}

export interface TotalData {
    totalNumber: number;
    totalPrice: number;
}

export interface NoshipData {
    noShipOrder: number;
}

export interface ErrorData {
    errorOrder: number;
}

export interface PlatFormInfo {
    id: number;

    bizId: number;

    platformCode: string;

    name: string;
}

export interface NineTeenType {
    id: number;
    type_name: string;
}

export interface NineTeenGroup {
    id: number;
    name: string;
}

export interface NineTeenRequest {
    pageSize: number;
    page: number;
    typeId: number;
    goodName: string;
    groupId: number;
    skuCode: string;
}

export interface NineTeenProducts {
    productName: string;

    goodCode: number;

    nameCh: string;

    nameEn: string;

    skuInfo: NineTeenSku[];

}

export interface NineTeenSku {

    sku: string;

    skuId?: string;

    stock?: number;

    name: string;

    price: number;

    weight: number;

    firstLevel?: number;
    secondLevel?: number;
    thirdLevel?: number;
    fourthLevel?: number;
    fifthLevel?: number;
    sixthLevel?: number;
}

export interface NineTeenGoods {
    productName: string;
    goodCode: number;
    nameCh: string;
    nameEn: string;
    sku?: string;
    skuId?: string;
    skuName?: string;
    stock?: number;
    price?: number;
    firstLevel?: number;
    secondLevel?: number;
    thirdLevel?: number;
    fourthLevel?: number;
    fifthLevel?: number;
    sixthLevel?: number;
    weight?: number;
    meeWeight?: number;
    meeCostPrice?: number;
    meeSalesPrice?: number;
    newPrice?: number;
    newFirstPrice?: number;
    newSecondLevel?: number;
    newThirdLevel?: number;
    newFourthLevel?: number;
    newFifthLevel?: number;
    newSixthLevel?: number;
}

export interface NineTeenProductResponse {
    page: number,
    pageSize: number,
    total: number,
    products: NineTeenProducts[]
}

export interface OrderStatisticsData {
    time: string;

    dataTotal: TotalData;
}

export interface NineTeenUpdatePrice {
    goodCode: number;
    skuInfos: NineTeenUpdateSku[];
}

export interface NineTeenUpdateSku {
    skuId: string;

    skuPrice: number;

    firstLevel: number;

    secondLevel: number;

    thirdLevel: number;

    fourthLevel: number;

    fifthLevel: number;

    sixthLevel: number;
}

export interface TodoPageResult {
    total: number;

    pageIndex: number;

    pageSize: number;

    todo: Todo[];
}

export interface Todo {
    id: number;

    title: string;

    createDate: Date;

    bizId: number;

    uid: number;

    userName?: string;

    createUid: number;

    //0: 未完成； 1: 已完成
    status: number;
}

export interface DataStatistics {
    bizId: number;
    
    noShip: number;

    error: number;
}

export interface YiyunTopProduct {
    sku: string;

    number: number;

    productName?: string;
}

export interface TradeMeToken {
    oauth_token: string;

    oauth_token_secret: string;

    oauth_callback_confirmed: string;
}

export interface TradeMeSoltOrder {
    orderId: number;

    reference: string;

    soldDate: string;

    buyer: SoltItemBuyer;

    deliveryAddress: SoltItemDeliveryAddress;

    items: SoltItem;

    paymentDetail: TradeMePayDetail;

}

export interface SoltItemBuyer {
    MemberId: number;

    Nickname: string;

    DateAddressVerified: string;

    DateJoined: string;

    Email: string;

    UniqueNegative: number;

    UniquePositive: number;

    FeedbackCount: number;

    IsAddressVerified: boolean;
}

export interface SoltItemDeliveryAddress {
    Name: string;

    Address1: string;

    Address2: string;

    Suburb: string;

    City: string;

    Postcode: string;

    Country: string;

    PhoneNumber: string;
}

export interface SoltItem {
    name: string;

    sku: string;

    photo: string;

    quantity: number;

    price: number;
}

export interface TradeMePayDetail {
    isPaymentPending: boolean;

    paymentType: number;

    paymentAmount: number;

    paymentMethodFee: number;

    gstCollected: number;
}