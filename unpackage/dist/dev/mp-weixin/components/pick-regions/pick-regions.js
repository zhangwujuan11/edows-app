(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pick-regions/pick-regions"],{1189:function(t,e,n){"use strict";n.r(e);var r=n(1190),i=n(1192);for(var c in i)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(c);var u,d=n(36),l=Object(d["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);l.options.__file="components/pick-regions/pick-regions.vue",e["default"]=l.exports},1190:function(t,e,n){"use strict";n.r(e);var r=n(1191);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},1191:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return u})),n.d(e,"recyclableRender",(function(){return c})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},c=!1,u=[];i._withStripped=!0},1192:function(t,e,n){"use strict";n.r(e);var r=n(1193),i=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=i.a},1193:function(t,e,n){"use strict";var r=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n(5)),c=n(1194),u={props:{defaultRegions:{type:Array,default:function(){return[]}},defaultRegionCode:{type:String},defaultRegion:[String,Array]},data:function(){return{cityArr:c[0].children,districtArr:c[0].children[0].children,multiIndex:[0,0,0],isInitMultiArray:!0}},watch:{defaultRegion:{handler:function(t,e){Array.isArray(t)?(e=e||[],t.join("")!==e.join("")&&this.handleDefaultRegion(t)):t&&6==t.length?this.handleDefaultRegion(t):console.warn("defaultRegion非有效格式")},immediate:!0}},computed:{multiArray:function(){return this.pickedArr.map((function(t){return t.map((function(t){return t.text}))}))},pickedArr:function(){return this.isInitMultiArray?[c,c[0].children,c[0].children[0].children]:[c,this.cityArr,this.districtArr]}},methods:{handleColumnChange:function(t){this.isInitMultiArray=!1;var e=this,n=t.detail.column,r=t.detail.value;e.multiIndex[n]=r;try{switch(n){case 0:if(0==c[e.multiIndex[0]].children.length){e.cityArr=e.districtArr=[c[e.multiIndex[0]]];break}e.cityArr=c[e.multiIndex[0]].children,e.districtArr=c[e.multiIndex[0]].children[e.multiIndex[1]].children;break;case 1:e.districtArr=c[e.multiIndex[0]].children[e.multiIndex[1]].children;break;case 2:break}}catch(t){e.districtArr=c[e.multiIndex[0]].children[0].children}},handleValueChange:function(t){var e=(0,i.default)(t.detail.value,3),n=e[0],r=e[1],c=e[2],u=(0,i.default)(this.pickedArr,3),d=u[0],l=u[1],a=u[2],o=[d[n],l[r],a[c]];this.$emit("getRegion",o)},handleDefaultRegion:function(t){var e=!Array.isArray(t);this.isInitMultiArray=!1;for(var n=c,r=0;r<3;r++)for(var i=0;i<n.length;i++){var u=e?n[i].value==t.slice(0,2*(r+1)):n[i].text.includes(t[r]);if(u){n=n[i].children,0==r?this.cityArr=n:1==r&&(this.districtArr=n),this.$set(this.multiIndex,r,i);break}0==r&&i==n.length-1&&(this.isInitMultiArray=!0)}}}};e.default=u}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/pick-regions/pick-regions.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pick-regions/pick-regions-create-component',
    {
        'components/pick-regions/pick-regions-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(1189))
        })
    },
    [['components/pick-regions/pick-regions-create-component']]
]);