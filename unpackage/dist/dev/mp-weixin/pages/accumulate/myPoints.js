(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/accumulate/myPoints"],{435:function(e,t,n){"use strict";(function(e,t){var a=n(4);n(26);a(n(25));var r=a(n(436));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},436:function(e,t,n){"use strict";n.r(t);var a=n(437),r=n(439);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(441);var u,c=n(36),s=Object(c["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],u);s.options.__file="pages/accumulate/myPoints.vue",t["default"]=s.exports},437:function(e,t,n){"use strict";n.r(t);var a=n(438);n.d(t,"render",(function(){return a["render"]})),n.d(t,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(t,"components",(function(){return a["components"]}))},438:function(e,t,n){"use strict";var a;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return a}));var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.pointsList.length);e.$mp.data=Object.assign({},{$root:{g0:n}})},o=!1,u=[];r._withStripped=!0},439:function(e,t,n){"use strict";n.r(t);var a=n(440),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=r.a},440:function(e,t,n){"use strict";(function(e){var a=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(53)),o=a(n(55)),u=(n(28),n(83),function(){n.e("components/empty").then(function(){return resolve(n(1096))}.bind(null,n)).catch(n.oe)}),c=function(){n.e("components/share").then(function(){return resolve(n(1054))}.bind(null,n)).catch(n.oe)},s={components:{share:c,empty:u},data:function(){return{pointsList:[],tabCurrentIndex:0,totalPage:0,pageNo:1,pageSize:10,scores:null}},computed:{},onLoad:function(e){var t=this;return(0,o.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loadData(),e.next=3,t.$axios(t.$baseUrl.score);case 3:n=e.sent,t.scores=n.data.data;case 5:case"end":return e.stop()}}),e)})))()},methods:{loadData:function(e){this.getData(),setTimeout((function(){}),600)},getData:function(){var t=this;return(0,o.default)(r.default.mark((function n(){var a,o,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.res={},a={pageNo:t.pageNo,pageSize:t.pageSize},n.next=4,t.$axios(t.$baseUrl.scoreGoodsRecord,JSON.stringify(a));case 4:for(u in o=n.sent,console.log(o.data.data,1111),o.data.data)o.data.data[u].flagSel=!1;t.res=o,1==t.pageNo&&(t.totalPage=t.res.data.pages),t.pointsList=t.pointsList.concat(o.data.data),t.pageNo>=t.totalPage?(e.stopPullDownRefresh(),t.pageNo=t.totalPage+1):(t.pageNo=t.pageNo+1,t.getData(orderStatus,navItem));case 11:case"end":return n.stop()}}),n)})))()}}};t.default=s}).call(this,n(2)["default"])},441:function(e,t,n){"use strict";n.r(t);var a=n(442),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=r.a},442:function(e,t,n){}},[[435,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/accumulate/myPoints.js.map