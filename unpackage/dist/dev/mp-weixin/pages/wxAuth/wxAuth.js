(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wxAuth/wxAuth"],{347:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var a=r(t(348));e.__webpack_require_UNI_MP_PLUGIN__=t,n(a.default)}).call(this,t(1)["default"],t(2)["createPage"])},348:function(e,n,t){"use strict";t.r(n);var r=t(349),a=t(351);for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t(353);var c,u=t(36),s=Object(u["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);s.options.__file="pages/wxAuth/wxAuth.vue",n["default"]=s.exports},349:function(e,n,t){"use strict";t.r(n);var r=t(350);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},350:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return a})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return o})),t.d(n,"components",(function(){return r}));var a=function(){var e=this,n=e.$createElement;e._self._c},o=!1,c=[];a._withStripped=!0},351:function(e,n,t){"use strict";t.r(n);var r=t(352),a=t.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=a.a},352:function(e,n,t){"use strict";(function(e){var r=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(t(53)),o=r(t(11)),c=r(t(55)),u=(t(32),t(28));function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){(0,o.default)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var l={data:function(){return{returnUrl:"",SessionKey:"",isShowMask:!1,openId:"",nickName:null,avatarUrl:null,encryptedData:"",iv:"",isCanUse:!1}},onLoad:function(n){var t=this;return(0,c.default)(a.default.mark((function r(){return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:console.log("参数：",n),t.returnUrl=n.returnUrl?"/"+n.returnUrl:"/pages/index/index",t.isCanUse=!!e.getStorageSync("isCanUse"),t.openId=e.getStorageSync("openId")?e.getStorageSync("openId"):"",t.authLogin(),console.log("isCanUse：",e.getStorageSync("isCanUse"));case 5:case"end":return r.stop()}}),r)})))()},methods:i(i({},(0,u.mapMutations)(["login"])),{},{wxGetUserInfo:function(){var n=this;e.getUserInfo({provider:"weixin",success:function(){var t=(0,c.default)(a.default.mark((function t(r){var o,c,u,s;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("用户信息：",r),r.userInfo.nickName,r.userInfo.avatarUrl,o=r.encryptedData,c=r.iv,t.prev=5,e.setStorageSync("isCanUse",!0),n.isCanUse=e.getStorageSync("isCanUse"),u={encryptedData:o,iv:c,openId:n.openId},t.next=11,n.$axios(n.$baseUrl.xcxDoAuth,u);case 11:s=t.sent,console.log("resInfo：",s),t.next=17;break;case 15:t.prev=15,t.t0=t["catch"](5);case 17:case"end":return t.stop()}}),t,null,[[5,15]])})));function r(e){return t.apply(this,arguments)}return r}(),fail:function(e){}})},authLogin:function(){var n=this;e.login({provider:"weixin",success:function(){var t=(0,c.default)(a.default.mark((function t(r){var o,u,s;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=r.code,u={code:o},t.next=4,n.$axios(n.$baseUrl.getXcxAuth,u);case 4:s=t.sent,console.log("resDate：",s),n.openId=s.data.data,e.setStorageSync("openId",s.data.data),n.isCanUse&&e.getUserInfo({provider:"weixin",success:function(){var e=(0,c.default)(a.default.mark((function e(t){var r,o,c,u;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.userInfo.nickName,t.userInfo.avatarUrl,r=t.encryptedData,o=t.iv,console.log("用户信息2：",t),c={encryptedData:r,iv:o,openId:n.openId},console.log("params：",c),e.next=9,n.$axios(n.$baseUrl.xcxDoAuth,c);case 9:u=e.sent,console.log("resInfo：",u);case 11:case"end":return e.stop()}}),e)})));function t(n){return e.apply(this,arguments)}return t}()});case 9:case"end":return t.stop()}}),t)})));function r(e){return t.apply(this,arguments)}return r}()})},navBack:function(){e.navigateBack()},toAuthLogin:function(n){var t=this;return(0,c.default)(a.default.mark((function r(){var o,c;return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if("person"!=n){r.next=6;break}return o={loginType:0,openId:t.openId,password:"",redirectUrl:"",userName:""},r.next=4,t.$axios(t.$baseUrl.mallMemberLogin,o);case 4:c=r.sent,200===c.data.code&&(t.login(c.data.data),e.reLaunch({url:t.returnUrl}));case 6:"shop"==n&&e.navigateTo({url:"/pages/public/login?loginType=1&opeinId="+t.openId+"&returnUrl="+t.returnUrl});case 7:case"end":return r.stop()}}),r)})))()}})};n.default=l}).call(this,t(2)["default"])},353:function(e,n,t){"use strict";t.r(n);var r=t(354),a=t.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=a.a},354:function(e,n,t){}},[[347,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wxAuth/wxAuth.js.map