(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/toSettle"],{205:function(e,t,r){"use strict";(function(e,t){var n=r(4);r(26);n(r(25));var a=n(r(206));e.__webpack_require_UNI_MP_PLUGIN__=r,t(a.default)}).call(this,r(1)["default"],r(2)["createPage"])},206:function(e,t,r){"use strict";r.r(t);var n=r(207),a=r(209);for(var o in a)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r(211);var i,c=r(36),s=Object(c["default"])(a["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],i);s.options.__file="pages/order/toSettle.vue",t["default"]=s.exports},207:function(e,t,r){"use strict";r.r(t);var n=r(208);r.d(t,"render",(function(){return n["render"]})),r.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(t,"components",(function(){return n["components"]}))},208:function(e,t,r){"use strict";var n;r.r(t),r.d(t,"render",(function(){return a})),r.d(t,"staticRenderFns",(function(){return i})),r.d(t,"recyclableRender",(function(){return o})),r.d(t,"components",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.orderList,(function(t,r){var n=e.__get_orig(t),a=t.productList.length,o=t.productList.length;return{$orig:n,g0:a,g1:o}})));e.$mp.data=Object.assign({},{$root:{l0:r}})},o=!1,i=[];a._withStripped=!0},209:function(e,t,r){"use strict";r.r(t);var n=r(210),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},210:function(e,t,r){"use strict";(function(e,n){var a=r(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r(53)),i=a(r(55)),c=a(r(11)),s=r(28);a(r(42));function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,c.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f={computed:d({},(0,s.mapState)(["hasLogin","userInfo"])),data:function(){return{res:{},money:"",serviceNo:"400-988-6868",tabCurrentIndex:0,orderStatus:"",orderList:[],orderSn:"",orderInfo:{},totalPrice:0,imgPath:"",showMask:!1}},onLoad:function(e){this.orderSn=e.orderSnList,this.getData()},methods:{getData:function(){var e=this;return(0,i.default)(o.default.mark((function t(){var r,n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={orderSn:e.orderSn},t.next=3,e.$axios(e.$baseUrl.getSelectedOrderList,r);case 3:n=t.sent,e.orderInfo=n.data.data,e.orderList=n.data.data.orderVOList;case 6:case"end":return t.stop()}}),t)})))()},chioceView:function(){var t=this,r=e.getSystemInfoSync().platform;"android"==r?(plus.android.checkPermission("android.permission.CAMERA",(function(e){-1==e.checkResult&&(t.showMask=!0)}),(function(e){console.error("Error checking permission:",e.message)})),plus.android.requestPermissions(["android.permission.CAMERA","android.permission.READ_EXTERNAL_STORAGE"],(function(e){t.showMask=!1,e.granted.length>0&&t.upload()}))):this.upload()},upload:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){e.tempFilePaths;n.getFileSystemManager().readFile({filePath:e.tempFilePaths[0],encoding:"base64",success:function(){var e=(0,i.default)(o.default.mark((function e(r){var n,a,i;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n="data:image/png;base64,"+r.data,a={base64Data:n,bizType:300},e.next=4,t.$axios(t.$baseUrl.uploadPic,a);case 4:i=e.sent,200==i.data.code&&(t.imgPath=i.data.data.webPath);case 6:case"end":return e.stop()}}),e)})));function r(t){return e.apply(this,arguments)}return r}()})},error:function(e){console.log(e)}})},chackInfo:function(){return!!this.imgPath||(this.$api.msg("请上传支付凭证"),!1)},toSettle:function(){var t=this;return(0,i.default)(o.default.mark((function r(){var n,a;return o.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t,t.chackInfo()){r.next=3;break}return r.abrupt("return",!1);case 3:return n={accountSn:"",fkImg:t.imgPath,orderSn:t.orderSn},r.next=6,t.$axios(t.$baseUrl.submitOrderAccount,n);case 6:a=r.sent,200==a.data.code&&(t.$api.msg("结算成功！"),setTimeout((function(){e.navigateBack(),e.navigateTo({url:"/pages/order/orderSettle?state=1"})}),800));case 8:case"end":return r.stop()}}),r)})))()}}};t.default=f}).call(this,r(2)["default"],r(1)["default"])},211:function(e,t,r){"use strict";r.r(t);var n=r(212),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},212:function(e,t,r){}},[[205,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/toSettle.js.map