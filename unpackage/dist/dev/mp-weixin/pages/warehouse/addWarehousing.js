(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/warehouse/addWarehousing"],{672:function(t,e,i){"use strict";(function(t,e){var s=i(4);i(26);s(i(25));var n=s(i(673));t.__webpack_require_UNI_MP_PLUGIN__=i,e(n.default)}).call(this,i(1)["default"],i(2)["createPage"])},673:function(t,e,i){"use strict";i.r(e);var s=i(674),n=i(676);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i(678);var o,r=i(36),c=Object(r["default"])(n["default"],s["render"],s["staticRenderFns"],!1,null,"6c376a24",null,!1,s["components"],o);c.options.__file="pages/warehouse/addWarehousing.vue",e["default"]=c.exports},674:function(t,e,i){"use strict";i.r(e);var s=i(675);i.d(e,"render",(function(){return s["render"]})),i.d(e,"staticRenderFns",(function(){return s["staticRenderFns"]})),i.d(e,"recyclableRender",(function(){return s["recyclableRender"]})),i.d(e,"components",(function(){return s["components"]}))},675:function(t,e,i){"use strict";var s;i.r(e),i.d(e,"render",(function(){return n})),i.d(e,"staticRenderFns",(function(){return o})),i.d(e,"recyclableRender",(function(){return a})),i.d(e,"components",(function(){return s}));try{s={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,1075))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.product.length),s=t.__map(t.product,(function(e,i){var s=t.__get_orig(e),n=Math.floor(Number(e.receivalQuantity)*Number(e.price)*Number(e.discountRate)*100);return{$orig:s,g1:n}})),n=t.productList&&t.productList.length>0;t.$mp.data=Object.assign({},{$root:{g0:i,l0:s,g2:n}})},a=!1,o=[];n._withStripped=!0},676:function(t,e,i){"use strict";i.r(e);var s=i(677),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},677:function(t,e,i){"use strict";(function(t){var s=i(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i(18)),a=i(58),o=function(){i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(function(){return resolve(i(1075))}.bind(null,i)).catch(i.oe)},r={components:{uniPopup:o},data:function(){return{indicatorStyle:"height: 50px;",store:"",supplier:"",selectList:[],currIndex:0,product:[{}],productList:[],carg:"",productVal:"",factoryCode:"",pinyinVal:"",classifyIndex:0,classifySelectList:["全部"],classifyList:["全部"],inWarehouseId:"",selectTitle:"",paramsList:[{name:"门店",value:"",selected:[0],list:[],selectIndex:0},{name:"供应商",value:"",selected:[0],list:[],selectIndex:0},{name:"结算方式",value:"",selected:[0],list:[],selectIndex:0}],productPageNum:1,productPageSize:10,productTotal:0,operate:{},choiceProduct:{},productIndex:0,submitParams:{},is_show:!1,showMask:!1}},onBackPress:function(t){if("navigateBack"==t.from){var e=getCurrentPages(),i=e[e.length-2];i=i.$vm,i&&i.getList&&(null==i.list?i.getList(1,1):i.getList(1,i.list.length+1))}},onLoad:function(e){var i=this;e.inWarehouseId&&(this.inWarehouseId=e.inWarehouseId,t.setNavigationBarTitle({title:"修改入库单"})),Promise.all([this.getWarehouseList(),this.getSupplierList(),this.getPaymentTerms()]).then((function(){e.inWarehouseId&&i.getinWarehouseDetails()})),this.getProductList(),this.getClassifyList()},methods:{open:function(t){switch(this.$refs.popup.open(),this.currIndex=t,t){case 0:this.selectTitle="门店";break;case 1:this.selectTitle="供应商";break;case 2:this.selectTitle="结算方式";break}},cancel:function(){this.$refs.popup.close()},success:function(){switch(this.paramsList[this.currIndex].selected=[this.paramsList[this.currIndex].selectIndex],this.currIndex){case 0:this.paramsList[0].value=this.paramsList[0].list[this.paramsList[0].selectIndex].warehouseName;break;case 1:this.paramsList[1].value=this.paramsList[1].list[this.paramsList[1].selectIndex].supplierName;break;case 2:this.paramsList[2].value=this.paramsList[2].list[this.paramsList[2].selectIndex].dictLabel;break}this.$refs.popup.close()},bindChange:function(t){this.paramsList[this.currIndex].selectIndex=t.detail.value[0]},openProduct:function(t,e){this.operate=t,this.productIndex=e,this.chioceProduct(0),this.$refs.product.open(),this.choiceProduct={}},closeProduct:function(){this.$refs.product.close()},choice:function(t){var e=this;this.productList.forEach((function(i,s){i.productId==t.productId?(e.$set(e.productList[s],"choice",!0),e.choiceProduct=i):e.$set(e.productList[s],"choice",!1)}))},getWarehouseList:function(){var t=this;return new Promise((function(e,i){(0,a.warehouseList)().then((function(i){200==i.code&&(t.paramsList[0].list=i.data.items,e(i))}))}))},getSupplierList:function(){var t=this;return new Promise((function(e,i){(0,a.supplierList)({status:0}).then((function(i){200==i.code&&(t.paramsList[1].list=i.data.items,e(i))}))}))},getPaymentTerms:function(){var t=this;return new Promise((function(e,i){(0,a.paymentTerms)().then((function(i){200==i.code&&(t.paramsList[2].list=i.data,e(i))}))}))},getinWarehouseDetails:function(){var t=this;(0,a.inWarehouseDetails)(this.inWarehouseId).then((function(e){if(200==e.code&&(t.product=e.data.storeInWarehouseDetailBoList,t.submitParams=e.data,e.data.storeInWarehouseDetailBoList)){if(e.data.warehouseName)for(var i=0;i<t.paramsList[0].list.length;i++)if(t.paramsList[0].list[i].warehouseId==e.data.warehouseId){t.paramsList[0].value=e.data.warehouseName,t.paramsList[0].selected=[i],t.paramsList[0].selectIndex=i;break}if(e.data.vendorName)for(i=0;i<t.paramsList[1].list.length;i++)if(t.paramsList[1].list[i].supplierCode==e.data.vendorCode){t.paramsList[1].value=e.data.vendorName,t.paramsList[1].selected=[i],t.paramsList[1].selectIndex=i;break}if(e.data.paymentTerms)for(i=0;i<t.paramsList[2].list.length;i++)if(t.paramsList[2].list[i].dictValue==e.data.paymentTerms){t.paramsList[2].value=t.paramsList[2].list[i].dictLabel,t.paramsList[2].selected=[i],t.paramsList[2].selectIndex=i;break}}}))},getProductList:function(){var e=this,i={pageNum:this.productPageNum,pageSize:this.productPageSize,status:0,carg:this.carg,name:this.productVal,factoryCode:this.factoryCode,pinyin:this.pinyinVal};this.classifyIndex>0&&(i.classify=this.classifyList[this.classifyIndex].dictValue),t.showLoading({title:"加载中"}),(0,a.productList)(i).then((function(i){t.hideLoading(),200==i.code&&(e.productList=[].concat((0,n.default)(e.productList),(0,n.default)(i.data.items||[])),e.productTotal=i.data.total,e.chioceProduct())}))},lower:function(){this.productList.length==this.productTotal?this.is_show=!0:(this.is_show=!1,this.productPageNum++,this.getProductList())},chioceProduct:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.productList.forEach((function(i){1==e&&i.choice||t.$set(i,"choice",!1)}))},join:function(){if(0==Object.keys(this.choiceProduct).length)return t.showToast({title:"请选择产品",icon:"none",duration:1e3});this.$set(this.product[this.productIndex],"productName",this.choiceProduct.name),this.$set(this.product[this.productIndex],"productId",this.choiceProduct.productId),this.$set(this.product[this.productIndex],"price",this.choiceProduct.retailPrice),this.$set(this.product[this.productIndex],"position",null),this.$set(this.product[this.productIndex],"receivalQuantity",null),this.$set(this.product[this.productIndex],"discountRate","1"),this.$refs.product.close()},addProduct:function(){this.product.push({})},search:function(){this.productList=[],this.productPageNum=1,this.getProductList()},submit:function(){for(var e=0;e<this.paramsList.length;e++)if(!this.paramsList[e].value)return t.showToast({title:"".concat(this.paramsList[e].name,"不能为空"),icon:"none",duration:1e3});for(e=0;e<this.product.length;e++){if(!this.product[e].productName)return t.showToast({title:"请选择产品".concat(e+1),icon:"none",duration:1e3});if(!this.product[e].receivalQuantity)return t.showToast({title:"产品".concat(e+1,"的数量不能为空"),icon:"none",duration:1e3});if(this.product[e].receivalQuantity<=0||-1!=String(this.product[e].receivalQuantity).indexOf("."))return t.showToast({title:"产品".concat(e+1,"的数量不能为0、负数、小数"),icon:"none",duration:2e3});if(!this.product[e].position)return t.showToast({title:"产品".concat(e+1,"的库位不能为空"),icon:"none",duration:1e3});if(!this.product[e].price)return t.showToast({title:"产品".concat(e+1,"的单价不能为空"),icon:"none",duration:1e3});if(!this.product[e].discountRate)return t.showToast({title:"产品".concat(e+1,"的折率不能为空"),icon:"none",duration:1e3})}t.showLoading({title:"加载中"});var i={inWarehouseId:this.inWarehouseId,warehouseId:this.paramsList[0].list[this.paramsList[0].selectIndex].warehouseId,vendorId:this.paramsList[1].list[this.paramsList[1].selectIndex].supplierId,paymentTerms:this.paramsList[2].list[this.paramsList[2].selectIndex].dictValue,storeInWarehouseDetailBoList:this.product,status:1},s=Object.assign({},this.submitParams,i);this.inWarehouseId&&this.inWarehouseId.length>0?(0,a.editStoreInWarehouse)(s).then((function(e){t.hideLoading(),200==e.code&&(t.showToast({title:"修改成功",icon:"none",duration:1e3}),setTimeout((function(){t.navigateBack({delta:1})}),500))})).catch((function(e){t.showToast({title:e.message,icon:"none",duration:2500})})):(0,a.addStoreInWarehouse)(s).then((function(e){t.hideLoading(),200==e.code&&(t.showToast({title:"新增成功",icon:"none",duration:1e3}),setTimeout((function(){t.navigateBack({delta:1})}),500))})).catch((function(e){t.showToast({title:e.message,icon:"none",duration:2500})}))},reduce:function(t){this.product.splice(t,1)},closeMask:function(t){0==t.show&&(this.paramsList[this.currIndex].selectIndex=[this.paramsList[this.currIndex].selected[0]])},cleanUp:function(){this.product=[{productName:"",receivalQuantity:"",position:"",price:"",discountRate:""}]},getClassifyList:function(){var t=this;(0,a.dictData)("classification").then((function(e){e.data.map((function(e){t.classifySelectList.push(e.dictValue)})),t.classifyList=[].concat((0,n.default)(t.classifyList),(0,n.default)(e.data))}))},bindPickerChange:function(t){this.classifyIndex=t.detail.value},chioceView:function(){var e=this,i=t.getSystemInfoSync().platform;"android"==i?(plus.android.checkPermission("android.permission.CAMERA",(function(t){-1==t.checkResult&&(e.showMask=!0)}),(function(t){console.error("Error checking permission:",t.message)})),plus.android.requestPermissions(["android.permission.CAMERA"],(function(t){e.showMask=!1,t.granted.length>0&&e.scanCarg()}))):this.scanCarg()},scanCarg:function(){var e=this;t.scanCode({onlyFromCamera:!0,scanType:["barCode"],success:function(i){var s={carg:i.result,pageNum:1,pageSize:1,status:0};(0,a.productList)(s).then((function(i){if(200==i.code)if(i.data.items&&i.data.items.length>0){for(var s=!0,n=0;n<e.product.length;n++)if(0==Object.keys(e.product[n]).length){e.$set(e.product[n],"productName",i.data.items[0].name),e.$set(e.product[n],"productId",i.data.items[0].productId),e.$set(e.product[n],"price",i.data.items[0].retailPrice),e.$set(e.product[n],"position",null),e.$set(e.product[n],"receivalQuantity",null),e.$set(e.product[n],"discountRate","1"),s=!1;break}if(s){var a={productName:i.data.items[0].name,productId:i.data.items[0].productId,price:i.data.items[0].retailPrice,position:null,receivalQuantity:null,discountRate:"1"};e.product.push(a)}t.showToast({title:"扫描添加成功",icon:"none",duration:2e3})}else t.showToast({title:"该产品不存在",icon:"none",duration:2e3});else t.showToast({title:i.message,icon:"none",duration:2e3})}))}})}}};e.default=r}).call(this,i(2)["default"])},678:function(t,e,i){"use strict";i.r(e);var s=i(679),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},679:function(t,e,i){}},[[672,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/warehouse/addWarehousing.js.map