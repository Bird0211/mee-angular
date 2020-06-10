// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  iconUrl: '//at.alicdn.com/t/font_1644348_mq0vk2whji.js',

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
  weimob_addcode_url: 'https://external.yiyun.co.nz/api/weimobCode/add',

  orderFlowUrl: '//localhost:8801/api/menu/flow',
  subMenuUrl:  '//localhost:8801/api/menu/sub',

  flywayTokenUrl: '//localhost:8801/api/flyway/token'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
