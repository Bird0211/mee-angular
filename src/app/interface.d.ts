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

export interface TradeMeSoldOrderResp {
    emailSent: TradeMeSoltOrder[];
    paymentReceived: TradeMeSoltOrder[];
    goodsShipped: TradeMeSoltOrder[];
    saleCompleted: TradeMeSoltOrder[];
}

export interface TradeMeSoltOrder {
    orderId: number;

    reference: string;

    soldDate: string;

    purchaseId: number;

    buyer: SoltItemBuyer;

    deliveryAddress: SoltItemDeliveryAddress;

    items: SoltItem;

    paymentDetail: TradeMePayDetail;

}

export interface PaidSoltOrder {
    orderId: string;

    reference: string;

    soldDate: string;

    purchaseId: number;

    buyer: SoltItemBuyer;

    deliveryAddress?: SoltItemDeliveryAddress;

    items: SoltItem[];

    paymentDetail: TradeMePayDetail;

    carrier: string;

    dimensions?: ShippedDimensions[];

    consignmentId?: string;

    labelTrack?: LabelTrack[];

}

export interface SoltItemBuyer {
    memberId: number;

    nickname: string;

    dateAddressVerified: string;

    dateJoined: string;

    email: string;

    uniqueNegative: number;

    uniquePositive: number;

    feedbackCount: number;

    isAddressVerified: boolean;
}

export interface SoltItemDeliveryAddress {
    name: string;

    address1: string;

    address2: string;

    suburb: string;

    city: string;

    postcode: string;

    country: string;

    phoneNumber: string;
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

export interface TradeMePayResult {
    purchaseId: string;
    consignmentId: string;
    result: boolean;
}

export interface NzPostConfig {

    id?: number;

    bizId?: number;

    reference?: string;

    companyName?: string;

    name?: string;

    phone?: string;

    email?: string;

    street?: string;

    suburb?: string;

    city?: string;

    postcode?: string;

    countryCode?: string;
}

export interface ShippedItem {
    purches: ShippedPurchase[];
} 

export interface ShippedPurchase {
    orderId: string;

    deliveryName: string;

    deliveryPhone: string;

    deliveryEmail: string;

    street: string;

    suburb: string;

    city: string;

    postcode: string;

    countryCode: string;

    carrier: string;

    dimensions: ShippedDimensions[];
}

export interface ShippedDimensions{
    length: number;
    width: number;
    height: number;
    volumes: number;
    weight: number;

    serviceCode?: string;
    addOns?: string[];
}

export interface ShippedOptionService {
    carrier: string;

    description: string;

    service_code: string;

    price_excluding_gst: number;

    price_including_gst: number;

    estimated_delivery_time: string;

    service_standard: string;

    tracking_included: boolean;

    signature_included: boolean;

    addons: Addons[];
}

export interface Addons {
    addon_code: string;

    description: string;

    mandatory: boolean;

    price_excluding_gst: number;
    
    price_including_gst: number;

    checked?: boolean;
}

export interface ShippedOptionReq {
    weight: string;

    length: string;

    width: string;

    height: string;

    diameter: string;

    pickup: ShippedOpPickup;

    delivery: ShippedOpDelivery;
}

export interface ShippedOpPickup {
    suburb: string;

    city: string;

    postcode: string;
}

export interface ShippedOpDelivery {
    suburb: string;

    city: string;

    postcode: string;
}

export interface LabelStatusResult {
    consignmentId: string;
    tracks: LabelTrack[];

}

export interface LabelTrack {
    trackId: string;

    status: string;
}

export interface WeimobOrderData {
    orderNo: number;
    pid: number;
    wid: number;
    userNickname: string;
    orderStatus: number;
    orderStatusName: string;
    deliveryType: number;
    bizType: number;
    subBizType: number;
    bizOrderId: number;
    confirmReceivedTime: number;
    deliveryTime: number;
    enableDelivery: number;
    deliveryTypeName: string;
    paymentAmount: number;
    deliveryAmount: number;
    channelType: number;
    channelTypeName: string;
    paymentType: number;
    paymentTypeName: string;
    paymentStatus: number;
    paymentMethodName: string;
    createTime: number;
    updateTime: number;
    paymentTime: number;
    totalPoint: number;
    transferType: number;
    transferStatus: number;
    transferFailReason: string;
    selfPickupSiteName: string;
    processStoreTitle: string;
    processStoreId: number;
    storeId: number;
    storeTitle: string;
    flagRank: number;
    flagContent: string;
    itemList: WeimobItem[];
    buyerRemark: string;
    receiverName: string;
    receiverMobile: string;
    receiverAddress: string;
    expectDeliveryTime: string;
    deliveryOrderId: number;

    deliveryCode: string;
    deliveryCom: string;
    split: boolean;
}

export interface WeimobItem {
    commentStatus: number;
    goodsCategoryId: number;
    goodsCode: string;
    goodsId: number;
    goodsTitle: string;
    goodsType: number;
    hadDeliveryItemNum: number;
    id: number;
    imageUrl: string;
    originalPrice: number;
    paymentAmount: number;
    point: string;
    price: number;
    rightsOrderId: number;
    rightsStatus: number;
    rightsStatusName: string;
    shouldPaymentAmount: number;
    skuAmount: number;
    skuCode: string;
    skuId: number;
    skuName: string;
    skuNum: number;
    bizInfo: WeimobBizInfo;
}

export interface WeimobBizInfo {
    bizType: number;
    subBizType: number;
    bizId: number;
    bizOrderId: string;
}

export interface DeliveryOrderVo {
    orderId: string;

    deliveryId: string;

    expressComCode: string;

    name: string;

    address: string;

    phone: string;

    id_num: string;

    split: boolean;

    skuInfo: DeliverySkuInfo[];
}

export interface DeliverySkuInfo {
    sku: string;     //商品规格id

    content: string;

    skuNum: number; //发货数量（目前不支持单sku拆分数量）

    skuId:  number;

    itemId: number;
}

export interface PlatFormInfo {
    id: number;

    bizId: number;

    platformCode: string;

    name: string;
}

export interface NineTeenDeliverOrders {
    //订单Id
    orderId: number; 

    tradeNo: string;

    //快递单号
    courierNumber: string;

    //收件人姓名
    name: string;

    //收件人地址
    address: string;

    //收件人电话
    phone: string;

    deliveryCom?: string;

    deliveryCode: number;

    orderDetails: NineTeenOrderDetail[];

}

export interface NineTeenOrderDetail {
    price: number;

    num: number;

    code: string;

    name_ch: string;

    name_eh: string;

    name: string;

    sku: string;

    detail_id: string;
}

export interface NineTeenLogistics {
    id: number;
    name: string;
}

export interface DeliveryInfo {
    orderId: number;
    detailId: string[];
    expressId: number;
    courierNumber: string;
}