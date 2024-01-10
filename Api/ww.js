import {
  request,
  loginRequest,
  Request1
} from "@/Api/request.js"
import axios from '../Api'

const publicUrl = 'v1/store/'

// 登录
export function login1(data) {
  return loginRequest({
    url: 'users/actions/login',
    method: 'post',
    data: data
  })
}

// 假注销
export function logoff(params) {
  return loginRequest({
    url: 'users/actions/eliminate',
    method: 'get',
    params:params
  })
}

// 用户信息
export function userInfo1() {
  return Request1({
    url: 'users/userInfo',
    method: 'get',
  })
}

// 退出登录
export function logout2() {
  return Request1({
    url: 'users/actions/logout',
    method: 'get',
  })
}

// 查询移库列表
export function getTransferStocks(query) {
  return request({
    url: publicUrl + 'inventoryTransfer/list',
    method: 'get',
    params: query
  })
}

// 查询出库列表
export function getoutWarehouseForeground(query) {
  return request({
    url: publicUrl + 'outWarehouseForeground/list',
    method: 'get',
    params: query
  })
}

// 查询出库列表1
export function getoutWarehouse(query) {
  return request({
    url: publicUrl + 'outWarehouse/list',
    method: 'get',
    params: query
  })
}


// 查询分类
export function getclassification() {
  return request({
    url: 'system/dict/data/type/classification',
    method: 'get',
  })
}
// 查询付款方式
export function getpaymentTerms() {
  return request({
    url: 'system/dict/data/type/paymentTerms',
    method: 'get',
  })
}

// 查询配送方式
export function getdelivery() {
  return request({
    url: 'system/dict/data/type/delivery_method',
    method: 'get',
  })
}


// 查询价格方式
export function getpriceMode() {
  return request({
    url: 'system/dict/data/type/priceMode',
    method: 'get',
  })
}


// 查询销售退货列表
export function getoutWarehouseReturn(query) {
  return request({
    url: publicUrl + 'outWarehouseReturn/list',
    method: 'get',
    params: query
  })
}

// 查询供应商
export function getsupplier() {
  return request({
    url: publicUrl + 'supplier/listAll',
    method: 'get',
  })
}

// 查询入库列表
export function getStorage(query) {
  return request({
    url: publicUrl + 'inWarehouse/list',
    method: 'get',
    params: query
  })
}

// 查询进货明细
export function getinWarehouseDetail(query) {
  return request({
    url: publicUrl + 'inWarehouseDetail/purchase',
    method: 'get',
    params: query
  })
}

// 查询出货明细
export function getoutWarehouseDetail(query) {
  return request({
    url: publicUrl + 'outWarehouseDetail/information',
    method: 'get',
    params: query
  })
}

// 查询报损单列表
export function getdamage(query) {
  return request({
    url: publicUrl + 'damage/list',
    method: 'get',
    params: query
  })
}

// 查询客户列表
export function getcustomer(query) {
  return request({
    url: publicUrl + 'customer/list',
    method: 'get',
    params: query
  })
}
// 查询仓库列表
export function getinventory(query) {
  return request({
    url: publicUrl + 'inventory/list',
    method: 'get',
    params: query
  })
}
// 查询全部仓库列表
export function getAllinventory(query) {
  return request({
    url: publicUrl + 'inventory/listAll',
    method: 'get',
    params: query
  })
}
// 查询仓库管理列表
export function getwarehouse(query) {
  return request({
    url: publicUrl + 'warehouse/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理列表
export function getvehicleCategory(query) {
  return request({
    url: 'system/dict/data/type/vehicleCategory',
    method: 'get',
    params: query
  })
}
// 查询经办人列表
export function getwen(query) {
  return request({
    url: 'system/user/storeUserlist',
    method: 'get',
    params: query
  })
}
// 查询退货列表
export function getBound(query) {
  return request({
    url: publicUrl + 'outWarehouseDetail/outBound',
    method: 'get',
    params: query
  })
}

//  查询移库详情
export function detailTransferStocks(query) {
  return request({
    url: publicUrl + `inventoryTransfer/${query}`,
    method: 'get'
  })
}

//  查询前台开单详情
export function detailoutWarehouse(query) {
  return request({
    url: publicUrl + `outWarehouse/${query}`,
    method: 'get'
  })
}

//  查询入库详情
export function detailinWarehouses(query) {
  return request({
    url: publicUrl + `inWarehouse/${query}`,
    method: 'get'
  })
}

//  查询前台开单详情
export function detailoutWarehouseForeground(query) {
  return request({
    url: publicUrl + `outWarehouseForeground/${query}`,
    method: 'get'
  })
}

//  查询报损单详情
export function detaildamage(query) {
  return request({
    url: publicUrl + `damage/${query}`,
    method: 'get'
  })
}

//  查询销售退货详情
export function detailoutWarehouseReturn(query) {
  return request({
    url: publicUrl + `outWarehouseReturn/${query}`,
    method: 'get'
  })
}

//  查询操作日志
export function Operational(query) {
  return request({
    url: publicUrl + 'inventoryLog/list',
    method: 'get',
    params: query
  })
}


//  删除库移
export function delTransferStocks(query) {
  return request({
    url: publicUrl + 'inventoryTransfer/' + query,
    method: 'delete'
  })
}

//  删除入库
export function delinWarehouse(query) {
  return request({
    url: publicUrl + 'inWarehouse/' + query,
    method: 'delete'
  })
}

//  删除报损单
export function deldamage(query) {
  return request({
    url: publicUrl + 'damage/' + query,
    method: 'delete'
  })
}


//  删除销售退货
export function deloutWarehouseReturn(query) {
  return request({
    url: publicUrl + 'outWarehouseReturn/' + query,
    method: 'delete'
  })
}

//  删除预计开单
export function deloutWarehouse(query) {
  return request({
    url: publicUrl + 'outWarehouse/' + query,
    method: 'delete'
  })
}

//  审核库移
export function AuditTransferStocks(data) {
  return request({
    url: publicUrl + 'inventoryTransfer/audit',
    method: 'post',
    data: data
  })
}


//  审核报溢单
export function Auditbenefit(data) {
  return request({
    url: publicUrl + 'benefit/audit',
    method: 'post',
    data: data
  })
}
//  审核报损单
export function Auditdamage(data) {
  return request({
    url: publicUrl + 'damage/audit',
    method: 'post',
    data: data
  })
}

//  审核销售退货
export function AuditoutWarehouseReturn(data) {
  return request({
    url: publicUrl + 'outWarehouseReturn/audit',
    method: 'post',
    data: data
  })
}

// 新增库移
export function addTransferStocks(data) {
  return request({
    url: publicUrl + 'inventoryTransfer',
    method: 'post',
    data: data
  })
}

// 新增报溢单
export function addbenefit(data) {
  return request({
    url: publicUrl + 'benefit',
    method: 'post',
    data: data
  })
}


// 新增前台开单
export function addoutWarehouseForeground(data) {
  return request({
    url: publicUrl + 'outWarehouseForeground',
    method: 'post',
    data: data
  })
}

// 新增销售退货
export function addoutWarehouseReturn(data) {
  return request({
    url: publicUrl + 'outWarehouseReturn',
    method: 'post',
    data: data
  })
}

// 新增出库
export function addoutWarehouse(data) {
  return request({
    url: publicUrl + 'outWarehouse',
    method: 'post',
    data: data
  })
}

// 新增报损单
export function adddamage(data) {
  return request({
    url: publicUrl + 'damage',
    method: 'post',
    data: data
  })
}

// 新增库存分享
export function addshare(data) {
  return request({
    url: publicUrl + 'share',
    method: 'post',
    data: data
  })
}

// 修改库移
export function editTransferStocks(data) {
  return request({
    url: publicUrl + 'inventoryTransfer',
    method: 'put',
    data: data
  })
}

// 修改销售退货
export function editoutWarehouseReturn(data) {
  return request({
    url: publicUrl + 'outWarehouseReturn',
    method: 'put',
    data: data
  })
}

// 修改报溢单
export function editbenefit(data) {
  return request({
    url: publicUrl + 'benefit',
    method: 'put',
    data: data
  })
}

// 修改报损单
export function editdamage(data) {
  return request({
    url: publicUrl + 'damage',
    method: 'put',
    data: data
  })
}

// 修改前台开单
export function editoutWarehouseForeground(data) {
  return request({
    url: publicUrl + 'outWarehouseForeground',
    method: 'put',
    data: data
  })
}

// 修改预计开单
export function editoutWarehouse(data) {
  return request({
    url: publicUrl + 'outWarehouse',
    method: 'put',
    data: data
  })
}