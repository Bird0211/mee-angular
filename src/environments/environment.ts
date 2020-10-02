// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  iconUrl: '//at.alicdn.com/t/font_1644348_1xf4jhy09xz.js',

  updateImgUrl: '//localhost:8801/api/textocr',
  // updateImgUrl: 'http://localhost:8801/api/textocr',
  supplierUrl: '//localhost:8801/api/allSuppliers',
  authUrl: '//localhost:8801/api/authentication',
  // matchUrl: 'http://localhost:8801/api/matching'
  matchUrl: '//localhost:8801/api/matching',
  upateInventoryUrl: '//localhost:8801/api/inventory/update',
  // upateInventoryUrl: '//localhost:8801/api/inventory/update'
  usermenuUrl: '//localhost:8801/api/menu',
  // usermenuUrl: '//localhost:8801/api/menu'
  menuUrl: '//localhost:8801/api/allmenu',
  updateMenuUrl: '//localhost:8801/api/menu/update',
  addMenuUrl: '//localhost:8801/api/menu/add',
  // bizUrl: '//localhost:8801/api/allbiz'
  bizUrl: '//localhost:8801/api/allbiz',
  addBizUrl: '//localhost:8801/api/biz/add',
  updateBizUrl: '//localhost:8801/api/biz/update',
  bizMenuUrl: '//localhost:8801/api/bizmenu',
  editBizMenuUrl: '//localhost:8801/api/bizmenu/edit',
  roleUrl: '//localhost:8801/api/role/query',
  addRoleUrl: '//localhost:8801/api/role/add',
  queryRoleMenuUrl: '//localhost:8801/api/role/menuid',
  userUrl: '//localhost:8801/api/user',
  allUserUrl: '//localhost:8801/api/alluser',
  roleUserUrl: '//localhost:8801/api/roleuser/role',
  updateRoleMenuUrl: '//localhost:8801/api/role/menu/update',
  updateRoleUserUrl: '//localhost:8801/api/roleuser/update',
  weimob_addcode_url: 'localhost:8801/api/weimobCode/add',

  orderFlowUrl: '//localhost:8801/api/menu/flow',
  subMenuUrl:  '//localhost:8801/api/menu/sub',

  flywayTokenUrl: '//localhost:8801/api/flyway/token',

  newsUrl: '//localhost:8801/api/news/list',
  newsAddUrl: '//localhost:8801/api/news/add',
  newsUpdateUrl: '//localhost:8801/api/news/update',
  currencyUrl: '//localhost:8801/api/currency',
  newsListUrl: '//localhost:8801/api/news/all',
  newsDetailUrl: '//localhost:8801/api/news/detail',

  todayDataUrl: '//localhost:8801/api/today',
  totalDataUrl: '//localhost:8801/api/total',
  noShipUrl: '//localhost:8801/api/noshipped',
  errorOrderUrl:  '//localhost:8801/api/errororder',
  dataStaticUrl: '//localhost:8801/api/datastatic',
  refreshDataUrl: '//localhost:8801/api/refreshdatastatic',

  platFormUrl: '//localhost:8801/api/platform',
  platFormDelUrl: '//localhost:8801/api/platform/del',
  platFormDetailUrl: '//localhost:8801/api/platform/detail',

  nineTeenTypeUrl: '//localhost:8801/api/nineteen/producttype',
  nineTeenGroupUrl: '//localhost:8801/api/nineteen/productgroup',
  nineTeenProductsUrl: '//localhost:8801/api/nineteen/products',
  nineTeenUpdateProductUrl: '//localhost:8801/api/nineteen/price/update',
  nineTeenDeliveryUrl: '//localhost:8801/api/nineteen/delivery/list',
  logicsticeUrl: '//localhost:8801/api/nineteen/logistics',
  deliveryUrl: '//localhost:8801/api/nineteen/delivery',

  platUrl: '//localhost:8801/api/platform',

  orderDataUrl: '//localhost:8801/api/statistics',

  productsSkuUrl: '//localhost:8801/api/product/skus',
  refreshCacheUrl: '//localhost:8801/api/guava/refresh',

  myTodoUrl: '//localhost:8801/api/todo/mytodo',
  addTodoUrl: '//localhost:8801/api/todo/add',
  saveTodoUrl: '//localhost:8801/api/todo/save',
  removeTodoUrl: '//localhost:8801/api/todo/remove',
  finishTodoUrl: '//localhost:8801/api/todo/finish',
  unsetTodoUrl: '//localhost:8801/api/todo/unset',
  countTodoUrl: '//localhost:8801/api/todo/count',
  myalltodoUrl: '//localhost:8801/api/todo/myalltodo',
  mycreatedTodoUrl: '//localhost:8801/api/todo/mycreated',
  createNumberUrl: '//localhost:8801/api/todo/createdcount',

  topProductURl: '//localhost:8801/api/product/top',

  tradeMerRquestUrl: '//localhost:8801/api/trademe/requesttoken',
  tradeMeOauthUrl: 'https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=',
  tradeMeAccessTokenUrl: '//localhost:8801/api/trademe/accessToken',
  tradeMeSoldItemUrl: '//localhost:8801/api/trademe/sold',
  tradeMeSPaidItemUrl: '//localhost:8801/api/trademe/paid',
  tradeMeShippedItemUrl: '//localhost:8801/api/nzpost/shipped',
  shippedoptionUrl: '//localhost:8801/api/nzpost/shippedoption',
  nzPostStatusUrl: '//localhost:8801/api/nzpost/labelstatus',

  nzPostConfigListUrl: '//localhost:8801/api/nzpostconfig/list',
  nzPostAddUrl: '//localhost:8801/api/nzpostconfig/add',
  nzPostEditUrl: '//localhost:8801/api/nzpostconfig/update',
  nzPostDelUrl: '//localhost:8801/api/nzpostconfig/delete',

  weimobDeliveryListUrl: '//localhost:8801/api/weimob/delivery/list',
  deliveryOrderUrl: '//localhost:8801/api/order/delivery',
  weimob_order_list_url: '//localhost:8801/api/order/queryList/v2',

  uggTokenUrl: '//localhost:8801/api/ugg/token',
  uggOrderSaveUrl: '//localhost:8801/api/ugg/order/create',
  uggOrderSearchUrl: '//localhost:8801/api/ugg/order/list',
  uggOrderCountUrl: '//localhost:8801/api/ugg/order/count',
  uggOrderDetailBySKUUrl: '//localhost:8801/api/ugg/product'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
