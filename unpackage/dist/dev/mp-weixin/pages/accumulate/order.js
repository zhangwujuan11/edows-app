(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/accumulate/order"],{411:function(e,t,r){"use strict";(function(e,t){var n=r(4);r(26);n(r(25));var a=n(r(412));e.__webpack_require_UNI_MP_PLUGIN__=r,t(a.default)}).call(this,r(1)["default"],r(2)["createPage"])},412:function(e,t,r){"use strict";r.r(t);var n=r(413),a=r(415);for(var o in a)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r(417);var s,c=r(36),i=Object(c["default"])(a["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],s);i.options.__file="pages/accumulate/order.vue",t["default"]=i.exports},413:function(e,t,r){"use strict";r.r(t);var n=r(414);r.d(t,"render",(function(){return n["render"]})),r.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(t,"components",(function(){return n["components"]}))},414:function(e,t,r){"use strict";var n;r.r(t),r.d(t,"render",(function(){return a})),r.d(t,"staticRenderFns",(function(){return s})),r.d(t,"recyclableRender",(function(){return o})),r.d(t,"components",(function(){return n}));try{n={uniLoadMore:function(){return r.e("components/uni-load-more/uni-load-more").then(r.bind(null,1089))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.navList,(function(t,r){var n=e.__get_orig(t),a=!0===t.loaded&&0===t.orderList.length;return{$orig:n,g0:a}})));e.$mp.data=Object.assign({},{$root:{l0:r}})},o=!1,s=[];a._withStripped=!0},415:function(e,t,r){"use strict";r.r(t);var n=r(416),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},416:function(e,t,r){"use strict";(function(e){var n=r(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r(53)),o=n(r(55)),s=n(r(11)),c=r(28);n(r(42));function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){(0,s.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=function(){r.e("components/uni-load-more/uni-load-more").then(function(){return resolve(r(1089))}.bind(null,r)).catch(r.oe)},l=function(){r.e("components/empty").then(function(){return resolve(r(1096))}.bind(null,r)).catch(r.oe)},f={components:{uniLoadMore:d,empty:l},computed:u({},(0,c.mapState)(["hasLogin","userInfo"])),data:function(){return{res:{},serviceNo:"400-988-6868",tabCurrentIndex:0,orderStatus:"",orderList:[],pageNo:1,pageSize:10,totalPage:0,refundDetailVO:[],seviceClass:"none",shareCouponOrderList:[],optsType:"",navList:[{state:0,text:"全部",textSpec:"全部",orderStatus:"",loadingType:"more",orderList:[]},{state:1,text:"待付款",textSpec:"已下单",loadingType:"more",orderStatus:"101",orderList:[]},{state:2,text:"待收货",textSpec:"待收货",loadingType:"more",orderStatus:"102",orderList:[]},{state:3,text:"已完成",textSpec:"已完成",loadingType:"more",orderStatus:"107",orderList:[]}],allSelect:!1,totalPrice:0,orderSnList:[],accountType:0,isOffline:0}},onLoad:function(t){console.log(t.state),this.isOffline=e.getStorageSync("UmsMember").UmsMember.isOffline?e.getStorageSync("UmsMember").UmsMember.isOffline:0,this.accountType=e.getStorageSync("UmsMember").UmsMember.accountType?e.getStorageSync("UmsMember").UmsMember.accountType:0,this.tabCurrentIndex=+t.state,0==t.state&&this.loadData()},methods:{getData:function(t,r){var n=this;return(0,o.default)(a.default.mark((function o(){var s,c,i;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.res={},s={orderStatus:t,pageNo:n.pageNo,pageSize:n.pageSize},a.next=4,n.$axios(n.$baseUrl.scoreGoodsOrderList,JSON.stringify(s));case 4:for(i in c=a.sent,c.data.data)c.data.data[i].flagSel=!1;n.res=c,1==n.pageNo&&(n.totalPage=n.res.data.pages),n.orderList=n.res.data.data.filter((function(e){return e=Object.assign(e,n.orderStateExp(e.orderStatus)),""===t?e:"102"===t?"102"===e.orderStatus||"103"===e.orderStatus:e.orderStatus===t})),n.orderList.forEach((function(e){r.orderList.push(e)})),n.$set(r,"loaded",!0),n.pageNo>=n.totalPage?(e.stopPullDownRefresh(),n.pageNo=n.totalPage+1,r.loadingType="noMore"):(n.pageNo=n.pageNo+1,console.log(n.pageNo),n.getData(t,r),r.loadingType="more");case 12:case"end":return a.stop()}}),o)})))()},loadData:function(e){var t=this.tabCurrentIndex,r=this.navList[t],n=r.orderStatus;console.log("来源：",e),"tabChange"===e&&!0===r.loaded&&this.$set(r,"loaded",!1),"loading"!==r.loadingType&&(r.loadingType="loading",this.getData(n,r),setTimeout((function(){}),600))},changeTab:function(e){this.tabCurrentIndex=e.target.current,this.orderList=[],this.pageNo=1,this.totalPage=0;var t=this.tabCurrentIndex,r=this.navList[t];r.orderStatus;r.orderList=[],this.loadData("tabChange")},tabClick:function(e){this.tabCurrentIndex=e},confirm:function(t){var r=this;return(0,o.default)(a.default.mark((function n(){return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r,e.showModal({content:"确认已收货？",success:function(){var n=(0,o.default)(a.default.mark((function n(o){var s;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!o.confirm){n.next=6;break}return s={orderSn:t.orderSn},n.next=4,r.$axios(r.$baseUrl.scoreGoodsConfirmation,s);case 4:n.sent,e.redirectTo({url:"/pages/order/order?state=3"});case 6:case"end":return n.stop()}}),n)})));function s(e){return n.apply(this,arguments)}return s}()});case 2:case"end":return n.stop()}}),n)})))()},makePhoneCall:function(){e.makePhoneCall({phoneNumber:this.serviceNo,success:function(){console.log("成功拨打电话")}})},toEvalu:function(t){e.navigateTo({url:"/pages/evaluate/evaluate?orderSn="+t.orderSn})},deleteOrder:function(t,r){var n=this;return(0,o.default)(a.default.mark((function s(){return a.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:e.showModal({content:"确认删除此订单？",success:function(){var e=(0,o.default)(a.default.mark((function e(o){var s,c;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!o.confirm){e.next=6;break}return s={orderSn:r.orderSn},e.next=4,n.$axios(n.$baseUrl.scoreGoodsDelete,s);case 4:c=e.sent,200==c.data.code&&setTimeout((function(){n.navList.splice(t,1)}),600);case 6:case"end":return e.stop()}}),e)})));function s(t){return e.apply(this,arguments)}return s}()});case 1:case"end":return s.stop()}}),s)})))()},orderStateExp:function(e){var t="",r="#fa436a";switch(+e){case 101:t=3==this.accountType?"已下单":"待付款";break;case 102:t="已付款",r="#339cfe";break;case 103:t="已发货",r="#339cfe";break;case 104:t="已签收",r="#339cfe";break;case 105:t="已取消",r="#909399";break;case 106:t="已退款",r="#333333";break;case 107:t="已完成",r="#339cfe";break;case 108:t="退款中",r="#333333";break;case 109:t="退款拒绝",r="#f04c41";break}return{stateTip:t,stateTipColor:r}}}};t.default=f}).call(this,r(2)["default"])},417:function(e,t,r){"use strict";r.r(t);var n=r(418),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},418:function(e,t,r){}},[[411,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/accumulate/order.js.map