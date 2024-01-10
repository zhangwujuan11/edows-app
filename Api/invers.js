import { request, sendRequestsencond } from '@/Api/request.js'
export function loginss(data){
	return sendRequestsencond({
		url:'store/user/login',
		method:'post',
		data:data
	})
}

// 产品列表
export function listInventoryall (data){
	return request({
		url: 'v1/store/typeData/list',
		method: 'get',
		params:data
	})
}

// 产品参数树状图
export function treelist (data){
	return request({
		url: 'v1/store/type/treeselect',
		method: 'get'
	})
}

// 产品参数详情
export function typeDatainfo (data){
	return request({
		url: 'v1/store/typeData/' + data,
		method: 'get'
	})
}
// 产品参数修改提交
export function updatetypeData(data){
	return request({
		url: 'v1/store/typeData',
		method: 'put',
		data:data
	})
}

// 添加产品参数
export function addtypeData(data){
	return request({
	  url: 'v1/store/typeData',
	  method: 'post',
	  data: data
	})
}
// 删除产品参数
export function delettypeData(data){
	return request({
	  url: 'v1/store/typeData/' + data,
	  method: 'DELETE'
	})
}

// 品牌列表
export function bandsfirstlist(data){
	return request({
		url:'v1/store/productBrand/list',
		method:'get',
		params:data
	})
}
// 品牌详情
export function bandsinfo(data){
	return request({
		url:'v1/store/productBrand/' + data,
		method:'get'
	})
}

// 品牌车型修改
export function updatabands(data){
	return request({
		url:'v1/store/productBrand',
		method:'put',
		data:data
	})
}

// 品牌车型添加
export function addbands(data){
	return request({
		url:'v1/store/productBrand',
		method:'post',
		data:data
	})
}

// 品牌车型删除
export function deletbands(data){
	return request({
		url:'v1/store/productBrand/' + data,
		method:'DELETE'
	})
}

// 产品管理
export function productlist(data){
	return request({
		url:'v1/store/product/list',
		method:'get',
		params:data
	})
}

// 产品类型下拉框
export function seleclass(){
	return request({
		url:'system/dict/data/type/classification',
		method:'get'
	})
}

// 品牌二级菜单
export function firstLevel(data){
	return request({
		url:'v1/store/productBrand/firstLevel',
		method:'get',
		params:data
	})
}

// 删除品牌
export function detelbans(data){
	return request({
		url:'v1/store/productBrand/' + data,
		method:'DELETE'
	})
}

// 产品删除
export function detelprodu(data){
	return request({
		url:'v1/store/product/' + data,
		method:'DELETE'
	})
}


// 产品详情
export function producinfo(data){
	return request({
		url:'v1/store/product/' + data,
		method:'get'
	})
}


// 品牌下拉框
export function pinpailist(data){
	return request({
		url:'v1/store/productBrand/list?type=0',
		method:'get'
	})
}

// 分类下拉框
export function classlist(){
	return request({
		url:'system/dict/data/type/classification',
		method:'get'
	})
}

// 供应商下拉框
export function superlist(){
	return request({
		url:'v1/store/supplier/list?status=0',
		method:'get'
	})
}

// 产品参数下拉框
export function canshutree(){
	return request({
		url:'v1/store/typeData/treeSelectProd',
		method:'get'
	})
}

// 车型参数下拉列表
export function cehcalss(){
	return request({
		url:'v1/store/productBrand/list?type=1',
		method:'get'
	})
}

// 查询具体信息
export function getTypeData(data){
  return request({
    url:'v1/store/productBrand/' + data,
    method:'get'
  })
}

export function listTypeData(data){
  return request({
    url:'v1/store/productBrand/list',
    method:'get',
    params:data
  })
}


// 产品修改
export function updatapouduct(data){
	return request({
		url:'v1/store/product',
		method:'put',
		data:data
	})
}

// 产品新增
export function addapouduct(data){
	return request({
		url:'v1/store/product',
		method:'post',
		data:data
	})
}

// 门店列表
export function storelist (data){
	return request({
		url:'v1/store/warehouse/listAll',
		method:'get',
		params:data
	})
}

// 供应商列表
export function supplierlist (data){
	return request({
		url:'v1/store/supplier/listAll',
		method:'get',
		params:data
	})
}


// 供应商添加
export function supperadd(data){
	return request({
		url:'v1/store/supplier',
		method:'post',
		data:data
	})
}

// 供应商修改
export function supperupdata(data){
	return request({
		url:'v1/store/supplier',
		method:'put',
		data:data
	})
}

// 供应商删除
export function supperdetel(data){
	return request({
		url:'v1/store/supplier/' + data,
		method:'DELETE'
	})
}


// 供应商详情
export function supperinfo(data){
	return request({
		url:'v1/store/supplier/' + data,
		method:'get'
	})
}

// 品牌树形
export function treelisrt(){
	return request({
		url:'v1/store/productBrand/treeSelect',
		method:'get'
	})
}

