(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/inventoryquery/sharing"],{552:function(e,t,n){"use strict";(function(e,t){var s=n(4);n(26);s(n(25));var i=s(n(553));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},553:function(e,t,n){"use strict";n.r(t);var s=n(554),i=n(556);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n(558);var a,o=n(36),c=Object(o["default"])(i["default"],s["render"],s["staticRenderFns"],!1,null,"6379741c",null,!1,s["components"],a);c.options.__file="pages/inventoryquery/sharing.vue",t["default"]=c.exports},554:function(e,t,n){"use strict";n.r(t);var s=n(555);n.d(t,"render",(function(){return s["render"]})),n.d(t,"staticRenderFns",(function(){return s["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return s["recyclableRender"]})),n.d(t,"components",(function(){return s["components"]}))},555:function(e,t,n){"use strict";var s;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return r})),n.d(t,"components",(function(){return s}));try{s={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,1075))}}}catch(o){if(-1===o.message.indexOf("Cannot find module")||-1===o.message.indexOf(".vue"))throw o;console.error(o.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.list&&e.list.length>0),s=n?e.__map(e.list,(function(t,n){var s=e.__get_orig(t),i=t.createTime.split(" ");return{$orig:s,g1:i}})):null;e.$mp.data=Object.assign({},{$root:{g0:n,l0:s}})},r=!1,a=[];i._withStripped=!0},556:function(e,t,n){"use strict";n.r(t);var s=n(557),i=n.n(s);for(var r in s)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=i.a},557:function(e,t,n){"use strict";(function(e){var s=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(18)),r=n(58),a=function(){n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(function(){return resolve(n(1075))}.bind(null,n)).catch(n.oe)},o={components:{uniPopup:a},data:function(){return{indicatorStyle:"height: 50px;",searchIndex:[0],statusIndex:[0],searchList:[],list:[],searchValue:"",currIndex:0,currSearch:"carg",status:"",searchTitle:"",shareValue:"",pageNum:1,pageSize:10,total:0,operate:{},currSearchIndex:0,is_show:!1,classify:[],tid:""}},onLoad:function(){e.getStorageSync("UmsMember").StoreUser&&(this.tid=e.getStorageSync("UmsMember").StoreUser.tenantId),this.getShareList(),this.getClassify()},onReachBottom:function(){this.list.length==this.total?this.is_show=!0:(this.is_show=!1,this.pageNum++,this.getShareList())},methods:{openDel:function(e){this.operate=e,this.$refs.popup.open()},openEdit:function(e){this.operate=e,this.$refs.edit.open()},cancel:function(){this.$refs.popup.close()},revoke:function(){this.$refs.edit.close()},share:function(){var t=this;if(!this.shareValue)return e.showToast({title:"共享数量不能为空",icon:"none",duration:1e3});if(this.shareValue<=0||-1!=this.shareValue.indexOf("."))return e.showToast({title:"共享数量不能为0、负数、小数",icon:"none",duration:2e3});e.showLoading({title:"加载中"});var n={inventoryId:"".concat(this.operate.inventoryId),inventoryShareId:"".concat(this.operate.inventoryShareId),shareQuantity:this.shareValue};(0,r.editStoreShare)(n).then((function(n){if(200==n.code){e.hideLoading(),t.$refs.edit.close();var s=t.list.length;t.getShareList(1,s),t.shareValue="",e.showToast({title:"共享成功",icon:"none",duration:1500})}})).catch((function(e){t.shareValue="",t.$refs.edit.close()}))},openSearch:function(e){switch(this.currSearchIndex=e,this.$refs.search.open(),e){case 0:this.currIndex=this.searchIndex[0],this.searchList=["carg","产品名称","库位编码","拼音查找","门店名字","供应商名称"],this.searchTitle="请选择搜索条件";break;case 1:this.currIndex=this.statusIndex[0],this.searchList=this.classify.map((function(e){return e.dictValue})),this.searchList.unshift("全部"),this.searchTitle="请选择分类";break}},bindChange:function(e){this.currIndex=e.detail.value[0]},success:function(){0==this.currSearchIndex?(this.currSearch=this.searchList[this.currIndex],this.searchIndex[0]=this.currIndex):(this.status=this.searchList[this.currIndex],this.statusIndex[0]=this.currIndex,this.list=[],this.getShareList()),this.$refs.search.close()},close:function(){this.$refs.search.close()},getShareList:function(t,n){var s=this,a={pageNum:t||this.pageNum,pageSize:n||this.pageSize};if(""!=this.searchValue)switch(this.currSearch){case"carg":a.carg=this.searchValue;break;case"产品名称":a.productName=this.searchValue;break;case"库位编码":a.positionCode=this.searchValue;break;case"拼音查找":a.pinyin=this.searchValue;break;case"门店名字":a.warehouseName=this.searchValue;break;case"供应商名称":a.vendorName=this.searchValue;break}""!=this.status&&"全部"!=this.status&&(a.classify=this.classify[this.statusIndex[0]-1].dictValue),e.showLoading({title:"加载中"}),(0,r.shareList)(a).then((function(t){200==t.code&&(e.hideLoading(),s.list=n?t.data.items:[].concat((0,i.default)(s.list),(0,i.default)(t.data.items||[])),s.total=t.data.total)}))},search:function(){this.pageNum=1,this.list=[],this.getShareList()},confirm:function(){var t=this;e.showLoading({title:"加载中"}),(0,r.delShare)("".concat(this.operate.inventoryShareId)).then((function(n){if(200==n.code){e.hideLoading(),t.$refs.popup.close();var s=t.list.length;t.getShareList(1,s),e.showToast({title:"删除成功",icon:"none",duration:1500})}})).catch((function(e){t.$refs.popup.close()}))},getClassify:function(){var e=this;(0,r.dictData)("classification").then((function(t){200==t.code&&(e.classify=t.data)}))}}};t.default=o}).call(this,n(2)["default"])},558:function(e,t,n){"use strict";n.r(t);var s=n(559),i=n.n(s);for(var r in s)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=i.a},559:function(e,t,n){}},[[552,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/inventoryquery/sharing.js.map