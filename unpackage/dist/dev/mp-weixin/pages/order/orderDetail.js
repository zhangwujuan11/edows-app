(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/orderDetail"],{243:function(e,t,r){"use strict";(function(e,t){var n=r(4);r(26);n(r(25));var a=n(r(244));e.__webpack_require_UNI_MP_PLUGIN__=r,t(a.default)}).call(this,r(1)["default"],r(2)["createPage"])},244:function(e,t,r){"use strict";r.r(t);var n=r(245),a=r(247);for(var o in a)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r(249);var s,i=r(36),c=Object(i["default"])(a["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],s);c.options.__file="pages/order/orderDetail.vue",t["default"]=c.exports},245:function(e,t,r){"use strict";r.r(t);var n=r(246);r.d(t,"render",(function(){return n["render"]})),r.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(t,"components",(function(){return n["components"]}))},246:function(e,t,r){"use strict";var n;r.r(t),r.d(t,"render",(function(){return a})),r.d(t,"staticRenderFns",(function(){return s})),r.d(t,"recyclableRender",(function(){return o})),r.d(t,"components",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=!1,s=[];a._withStripped=!0},247:function(e,t,r){"use strict";r.r(t);var n=r(248),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},248:function(e,t,r){"use strict";(function(e){var n=r(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r(53)),o=n(r(55)),s=n(r(11)),i=r(28),c=r(83);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,s.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f={data:function(){return{orderSn:"",accountType:0,serviceNo:"400-988-6868",orderInfo:{},maskState:0,desc:"",seviceClass:"none",shareCouponOrderList:[],optsType:"",payType:1,couponList:[{title:"新用户专享优惠券",price:5},{title:"庆五一发一波优惠券",price:10},{title:"优惠券优惠券优惠券优惠券",price:15}],addressData:{name:"许小星",mobile:"13853989563",addressName:"金九大道",address:"山东省济南市历城区",area:"149号",default:!1},facdureData:{companyName:"不开发票"}}},computed:d({},(0,i.mapState)(["hasLogin","userInfo"])),onLoad:function(t){this.orderSn=t.orderSn,this.accountType=e.getStorageSync("UmsMember").UmsMember.accountType?e.getStorageSync("UmsMember").UmsMember.accountType:0,this.getData()},methods:{getData:function(){var e=this;return(0,o.default)(a.default.mark((function t(){var r,n;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r={orderSn:e.orderSn},console.log(r),t.next=4,e.$axios(e.$baseUrl.getOrderDetail,r);case 4:n=t.sent,e.orderInfo=n.data.data,e.orderInfo.createDate=c.fn.formatTime(e.orderInfo.createDate,"Y-M-D h:m:s"),e.orderInfo.payTime&&(e.orderInfo.payTime=c.fn.formatTime(e.orderInfo.payTime,"Y-M-D h:m:s")),e.orderInfo.sendTime&&(e.orderInfo.sendTime=c.fn.formatTime(e.orderInfo.sendTime,"Y-M-D")),console.log(e.orderInfo.createDate);case 10:case"end":return t.stop()}}),t)})))()},navToDetailPage:function(t){var r=t.productCode;t.isExpire?this.$api.msg("商品已下架"):e.navigateTo({url:"/pages/product/product?code=".concat(r)})},toView:function(t){var r=t.orderSn;e.navigateTo({url:"/pages/order/code?orderSn=".concat(r)})},toggleService:function(){var e=this;"show"===this.seviceClass?(this.seviceClass="hide",setTimeout((function(){e.seviceClass="none"}),250)):"none"===this.seviceClass&&(this.seviceClass="show")},stopPrevent:function(){},toPay:function(e){var t=this;return(0,o.default)(a.default.mark((function r(){return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t,t.optsType="",t.shareCouponOrderList="",e.shareCoupon?(t.shareCouponOrderList=e.shareCouponOrderList,t.optsType="付款",t.toggleService()):t.toSurPay(e);case 4:case"end":return r.stop()}}),r)})))()},toSurPay:function(t){var r=this;return(0,o.default)(a.default.mark((function n(){var s,i,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s="",i=[],t.orderSn)s=t.orderSn,console.log(s);else{for(c in t)i.push(t[c].orderSn);s=i.join(","),console.log(s)}e.login({provider:"weixin",success:function(){var n=(0,o.default)(a.default.mark((function n(o){var i,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={orderSn:s,openId:e.getStorageSync("openId")?e.getStorageSync("openId"):""},console.log(i),n.next=4,r.$axios(r.$baseUrl.orderPayer,i);case 4:c=n.sent,console.log("返回数据：",c.data.data),e.requestPayment({provider:"wxpay",appId:c.data.data.appId,timeStamp:c.data.data.timeStamp,nonceStr:c.data.data.nonceStr,package:c.data.data.packageValue,signType:c.data.data.signType,paySign:c.data.data.paySign,success:function(r){e.redirectTo({url:"/pages/money/paySuccess?totalPrice="+t.totalPrice})},fail:function(e){_self.$api.msg("支付失败"),console.log("fail:"+JSON.stringify(e))}});case 7:case"end":return n.stop()}}),n)})));function i(e){return n.apply(this,arguments)}return i}()});case 4:case"end":return n.stop()}}),n)})))()},confirm:function(){var t=this;return(0,o.default)(a.default.mark((function r(){return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t,e.showModal({content:"确认已收货？",success:function(){var r=(0,o.default)(a.default.mark((function r(n){var o;return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.confirm){r.next=6;break}return o={orderSn:t.orderSn},r.next=4,t.$axios(t.$baseUrl.orderConfirmation,o);case 4:r.sent,e.redirectTo({url:"/pages/order/order?state=3"});case 6:case"end":return r.stop()}}),r)})));function n(e){return r.apply(this,arguments)}return n}()});case 2:case"end":return r.stop()}}),r)})))()},refundOrder:function(){e.navigateTo({url:"/pages/order/refund?orderSn="+this.orderSn})},refundOrderDetail:function(){e.navigateTo({url:"/pages/order/refundDetail?orderSn="+this.orderSn})},toEvalu:function(){e.navigateTo({url:"/pages/evaluate/evaluate?orderSn="+this.orderSn})},makePhoneCall:function(){e.makePhoneCall({phoneNumber:this.serviceNo,success:function(){console.log("成功拨打电话")}})},cancelOrder:function(e){var t=this;return(0,o.default)(a.default.mark((function r(){return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t,t.optsType="",t.shareCouponOrderList="",e.shareCoupon?(t.shareCouponOrderList=e.shareCouponOrderList,t.optsType="取消",t.toggleService()):t.cancelSurOrder(e);case 4:case"end":return r.stop()}}),r)})))()},cancelSurOrder:function(t){var r=this;return(0,o.default)(a.default.mark((function n(){var o,s,i,c,u;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.showLoading({title:"请稍后"}),o="",s=[],t.orderSn)o=t.orderSn,console.log(o);else{for(i in t)s.push(t[i].orderSn);o=s[0],console.log(o)}return c={orderSn:o},n.next=7,r.$axios(r.$baseUrl.cancelOrder,c);case 7:u=n.sent,200==u.data.code&&(r.seviceClass="hide",r.getData(),e.hideLoading(),setTimeout((function(){r.seviceClass="none"}),200));case 9:case"end":return n.stop()}}),n)})))()},deleteOrder:function(){var t=this;return(0,o.default)(a.default.mark((function r(){return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.showModal({content:"确认删除此订单？",success:function(){var r=(0,o.default)(a.default.mark((function r(n){var o,s;return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!n.confirm){r.next=6;break}return o={orderSn:t.orderSn},r.next=4,t.$axios(t.$baseUrl.deleteOrder,o);case 4:s=r.sent,200==s.data.code&&(t.$api.msg("删除订单成功！"),setTimeout((function(){e.navigateTo({url:"/pages/order/order?state=0"})}),1e3));case 6:case"end":return r.stop()}}),r)})));function n(e){return r.apply(this,arguments)}return n}()});case 1:case"end":return r.stop()}}),r)})))()},toggleMask:function(e){var t=this,r="show"===e?10:300,n="show"===e?1:0;this.maskState=2,setTimeout((function(){t.maskState=n}),r)},toggleMaskPay:function(e){var t=this,r="show"===e?10:300,n="show"===e?1:0;this.maskState=2,setTimeout((function(){t.maskState=n}),r)},numberChange:function(e){this.number=e.number},changePayType:function(e){this.payType=e},submit:function(){e.redirectTo({url:"/pages/money/pay"})}}};t.default=f}).call(this,r(2)["default"])},249:function(e,t,r){"use strict";r.r(t);var n=r(250),a=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},250:function(e,t,r){}},[[243,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/orderDetail.js.map