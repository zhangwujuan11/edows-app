(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{69:function(t,e,n){"use strict";(function(t,e){var r=n(4);n(26);r(n(25));var a=r(n(70));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n(1)["default"],n(2)["createPage"])},70:function(t,e,n){"use strict";n.r(e);var r=n(71),a=n(73);for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n(75);var o,i=n(36),u=Object(i["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"57280228",null,!1,r["components"],o);u.options.__file="pages/index/index.vue",e["default"]=u.exports},71:function(t,e,n){"use strict";n.r(e);var r=n(72);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},72:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return a})),n.d(e,"staticRenderFns",(function(){return o})),n.d(e,"recyclableRender",(function(){return c})),n.d(e,"components",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},c=!1,o=[];a._withStripped=!0},73:function(t,e,n){"use strict";n.r(e);var r=n(74),a=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=a.a},74:function(t,e,n){"use strict";(function(t){var r=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n(53)),c=r(n(55)),o=r(n(11)),i=n(28);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var d=function(){n.e("components/backPages").then(function(){return resolve(n(1012))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/CustomTabBar").then(function(){return resolve(n(1019))}.bind(null,n)).catch(n.oe)},f={components:{backPages:d,CustomTabBar:l},data:function(){return{titleNViewBackground:"",swiperCurrent:0,swiperLength:0,indicatorDots:!1,accountType:"",autoplay:!0,interval:2e3,duration:500,current:0,bannerList:[],popularityProductList:[],hotProductList:[],productList:[],brandList:[],glassSpecialClassList:[],hightBrandList:[],carouselList:[],goodsList:[],titletop:0,titleheight:0,currentTab:"tab1"}},created:function(){},computed:s({},(0,i.mapState)(["hasLogin","userInfo"])),onLoad:function(){var e=this;return(0,c.default)(a.default.mark((function n(){return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.accountType=t.getStorageSync("UmsMember").UmsMember.accountType?t.getStorageSync("userInfo").accountType:"",e.getData();case 2:case"end":return n.stop()}}),n)})))()},onShow:function(){var e=this;return(0,c.default)(a.default.mark((function n(){return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.accountType=t.getStorageSync("UmsMember").UmsMember.accountType?t.getStorageSync("userInfo").accountType:"",e.getData();case 2:case"end":return n.stop()}}),n)})))()},methods:{getData:function(){var t=this;return(0,c.default)(a.default.mark((function e(){var n,r;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={},e.next=3,t.$axios(t.$baseUrl.getHomePageData,n);case 3:r=e.sent,console.log("测试一：",r),t.bannerList=r.data.data.bannerList,t.popularityProductList=r.data.data.popularityProductList,t.productList=r.data.data.productList,t.hotProductList=r.data.data.hotProductList,t.brandList=r.data.data.brandList,t.glassSpecialClassList=r.data.data.glassSpecialClassList,t.hightBrandList=r.data.data.hightBrandList;case 12:case"end":return e.stop()}}),e)})))()},visitLog:function(t){var e=this;return(0,c.default)(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("adv：",t),r={advertisementId:t.id},n.next=4,e.$axios(e.$baseUrl.visitLog,r);case 4:n.sent;case 5:case"end":return n.stop()}}),n)})))()},swiperChange:function(t){this.current=t.detail.current},toKeySearch:function(){t.navigateTo({url:"/pages/keySearch/keySearch"})},navToDetailPage:function(e){var n=e.code;t.navigateTo({url:"/pages/product/product?code=".concat(n)})},navToProductListPage:function(e,n){if(2==n){var r=e.id;t.navigateTo({url:"/pages/product/list?specialClassId=".concat(r)})}else if(1==n){var a=e.code,c=e.parentClassId;t.navigateTo({url:"/pages/product/list?brandCode=".concat(a,"&parentClassId=").concat(c)})}},toReserve:function(){t.navigateTo({url:"/pages/reserve/reserve"})}}};e.default=f}).call(this,n(2)["default"])},75:function(t,e,n){"use strict";n.r(e);var r=n(76),a=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=a.a},76:function(t,e,n){}},[[69,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map