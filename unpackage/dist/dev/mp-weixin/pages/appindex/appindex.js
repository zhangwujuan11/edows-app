(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/appindex/appindex"],{47:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var r=o(n(48));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},48:function(e,t,n){"use strict";n.r(t);var o=n(49),r=n(51);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n(59);var i,s=n(36),c=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"51b31cb4",null,!1,o["components"],i);c.options.__file="pages/appindex/appindex.vue",t["default"]=c.exports},49:function(e,t,n){"use strict";n.r(t);var o=n(50);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},50:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return o}));var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.noteList&&e.noteList.length>0);e.$mp.data=Object.assign({},{$root:{g0:n}})},a=!1,i=[];r._withStripped=!0},51:function(e,t,n){"use strict";n.r(t);var o=n(52),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},52:function(e,t,n){"use strict";(function(e){var o=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(53)),a=o(n(5)),i=o(n(11)),s=o(n(55)),c=n(32),u=n(56),d=(n(57),n(28)),f=n(58);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,i.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h={data:function(){return{value:0,array:["VIN码查询","车型查询","carg查询"],index:0,duration:[],token:"",datecode:"",viewList:[],orderData:{},noteList:[],vinCodeValue:"",messageNum:null,accountType:e.getStorageSync("UmsMember").UmsMember.accountType,showMask:!1}},onLoad:function(){var t=this;return(0,s.default)(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.accountType=e.getStorageSync("UmsMember").UmsMember.accountType;case 1:case"end":return n.stop()}}),n)})))()},onShow:function(){this.accountType=e.getStorageSync("UmsMember").UmsMember.accountType;var t=e.getStorageSync("userInfo")||"";t.token&&(this.token=t.token,this.getDatecode(),this.getBannerList(),this.getOrderData(),this.getNotesList(),this.getMessageNum(),this.getCertificate())},methods:p(p({},(0,d.mapMutations)(["login"])),{},{bindPickerChange:function(e){var t=this;this.index=e.detail.value,1==e.detail.value?(this.gostorepage(16),this.$nextTick((function(){t.index=0}))):2==e.detail.value&&(this.gostorepage(19),this.$nextTick((function(){t.index=0})))},gostorepage:function(t){e.navigateTo({url:"/pages/storepage/storepage?id="+t})},getDatecode:function(){var e=this;(0,f.datecode)({token:this.token}).then((function(t){200==t.code&&(e.datecode=t.data)}))},getBannerList:function(){var e=this;(0,f.bannerList)({token:this.token}).then((function(t){200==t.code&&(e.viewList=t.data)}))},getOrderData:function(){var e=this;(0,f.orderData)(this.token).then((function(t){200==t.code&&(e.orderData=t.data)}))},getNotesList:function(){var e=this;(0,f.notesList)({token:this.token}).then((function(t){200==t.code&&(e.noteList=t.data.records)}))},chioceView:function(){var t=this,n=e.getSystemInfoSync().platform;"android"==n?(plus.android.checkPermission("android.permission.CAMERA",(function(e){-1==e.checkResult&&(t.showMask=!0)}),(function(e){console.error("Error checking permission:",e.message)})),plus.android.requestPermissions(["android.permission.CAMERA"],(function(e){t.showMask=!1,e.granted.length>0&&t.chooseImage()}))):this.chooseImage()},chooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["compressed"],sourceType:["camera"],success:function(n){e.getImageInfo({src:n.tempFilePaths[0],success:function(e){(0,u.pathToBase64)(e.path).then((function(e){t.queryVinCode(e)}))}})}})},queryVinCode:function(e){var t=this,n={base64Data:e,bizType:"1",token:this.token};(0,f.vinCode)(n).then((function(e){t.vinCodeValue=JSON.parse(e.data.words_result)[0].words,t.collect()}))},collect:function(){""==this.vinCodeValue?e.showToast({title:"请输入VIN码",icon:"none",duration:1500}):e.navigateTo({url:"/pages/storepage/storepage?id=15&vinCodeValue=".concat(this.vinCodeValue)})},toUpperCase:function(){this.vinCodeValue=this.vinCodeValue.toUpperCase()},getMessageNum:function(){var e=this;(0,f.messageNum)({token:this.token}).then((function(t){200==t.code&&(e.messageNum=t.data)}))},getCertificate:function(){var t={};t.token=e.getStorageSync("userInfo").token,e.request({method:"post",timeout:1e4,url:c.web.renew+"member/updateCertificate?token="+e.getStorageSync("userInfo").token||"",dataType:"json",header:t}).then((function(t){var n=(0,a.default)(t,2),o=(n[0],n[1]);200==o.data.code&&o.data.data&&e.showToast({title:"证书已过期",icon:"none",duration:3500})}))}})};t.default=h}).call(this,n(2)["default"])},59:function(e,t,n){"use strict";n.r(t);var o=n(60),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},60:function(e,t,n){}},[[47,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/appindex/appindex.js.map