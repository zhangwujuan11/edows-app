import { request,sendRequest } from "@/Api/request.js"

// 获取客户下拉树列表
export function customTreeList(data) {
    return request({
        url: 'v1/store/customerClassify/treeSelect',
        method: 'GET',
        params: data
    })
}

// 获取客户列表
export function customList(data) {
    return request({
        url: 'v1/store/customerClassify/list',
        method: 'GET',
        params: data
    })
}

// 新增客户分类
export function addCustomClassify(data) {
    return request({
        url: 'v1/store/customerClassify',
        method: 'POST',
        data: data
    })
}

// 修改客户分类
export function editCustomClassify(data) {
    return request({
        url: 'v1/store/customerClassify',
        method: 'PUT',
        data: data
    })
}

// 获取客户详情
export function customClassifyDetails(data) {
    return request({
        url: 'v1/store/customerClassify/' + data,
        method: 'GET',
    })
}

// 获取客户管理列表
export function customManagementList(data) {
    return request({
        url: 'v1/store/customer/list',
        method: 'GET',
        params: data
    })
}

// 删除客户管理
export function delCustom(data) {
    return request({
        url: 'v1/store/customer/' + data,
        method: 'DELETE',
    })
}

// 获取客户详情
export function customManagementDetail(data) {
    return request({
        url: 'v1/store/customer/' + data,
        method: 'GET',
    })
}

// 获取参数列表
export function listAll(data) {
    return request({
        url: 'v1/store/typeData/listAll',
        method: 'GET',
        params: data
    })
}

// 获取客户分类列表
export function customerClassifyList() {
    return request({
        url: 'v1/store/customerClassify/list',
        method: 'GET',
    })
}

// 修改客户管理
export function editCustomManagement(data) {
    return request({
        url: 'v1/store/customer',
        method: 'PUT',
        data: data
    })
}

// 新增客户管理
export function addCustomManagement(data) {
    return request({
        url: 'v1/store/customer',
        method: 'POST',
        data: data
    })
}

// 获取库存分享列表
export function shareList(data) {
    return request({
        url: 'v1/store/share/list',
        method: 'GET',
        params: data
    })
}

// 删除客户管理
export function delShare(data) {
    return request({
        url: 'v1/store/share/' + data,
        method: 'DELETE',
    })
}

// 修改库存分享
export function editStoreShare(data) {
    return request({
        url: 'v1/store/share',
        method: 'PUT',
        data: data
    })
}

// 获取采购入库列表
export function inWarehouseList(data) {
    return request({
        url: 'v1/store/inWarehouse/list',
        method: 'GET',
        params: data
    })
}

// 获取入库详情
export function inWarehouseDetails(data) {
    return request({
        url: 'v1/store/inWarehouse/' + data,
        method: 'GET',
    })
}

// 删除采购入库
export function delInWarehouse(data) {
    return request({
        url: 'v1/store/inWarehouse/' + data,
        method: 'DELETE',
    })
}

// 审核入库
export function auditInWarehouse(data) {
    return request({
        url: 'v1/store/inWarehouse/audit',
        method: 'POST',
        data: data
    })
}

// 获取上架人
export function storeUserlist(data) {
    return request({
        url: 'system/user/storeUserlist',
        method: 'GET',
        params: data
    })
}

// 指派上架人
export function shelveUser(data) {
    return request({
        url: 'v1/store/inWarehouse/shelveUser',
        method: 'POST',
        data: data
    })
}

//获取门店列表
export function warehouseList() {
    return request({
        url: 'v1/store/warehouse/list',
        method: 'GET',
    })
}

//获取供应商列表
export function supplierList(data) {
    return request({
        url: 'v1/store/supplier/list',
        method: 'GET',
        params: data
    })
}

//获取结算方式
export function paymentTerms() {
    return request({
        url: 'system/dict/data/type/paymentTerms',
        method: 'GET',
    })
}

//获取产品列表
export function productList(data) {
    return request({
        url: 'v1/store/product/list',
        method: 'GET',
        params: data
    })
}

//修改采购入库
export function editStoreInWarehouse(data) {
    return request({
        url: 'v1/store/inWarehouse',
        method: 'PUT',
        data: data
    })
}

// 新增采购入库
export function addStoreInWarehouse(data) {
    return request({
        url: 'v1/store/inWarehouse',
        method: 'POST',
        data: data
    })
}

// 删除采购退货
export function delInWarehouseReturn(data) {
    return request({
        url: 'v1/store/inWarehouse/delete/' + data,
        method: 'DELETE',
    })
}

// 审核采购退货
export function auditPurchaseReturn(data) {
    return request({
        url: 'v1/store/purchaseReturn/audit',
        method: 'POST',
        data: data
    })
}

//获取库存列表
export function inventoryList(data) {
    return request({
        url: 'v1/store/inventory/list',
        method: 'GET',
        params: data
    })
}

//修改采购退货
export function editStorePurchaseReturn(data) {
    return request({
        url: 'v1/store/purchaseReturn',
        method: 'PUT',
        data: data
    })
}

// 新增采购退货
export function addStorePurchaseReturn(data) {
    return request({
        url: 'v1/store/purchaseReturn',
        method: 'POST',
        data: data
    })
}

// 获取销售出库列表
export function outWarehouseList(data) {
    return request({
        url: 'v1/store/outWarehouseSales/list',
        method: 'GET',
        params: data
    })
}

//字典查询
export function dictData(data) {
    return request({
        url: 'system/dict/data/type/' + data,
        method: 'GET',
    })
}

// 删除销售开单
export function delOutWarehouseSales(data) {
    return request({
        url: 'v1/store/outWarehouseSales/' + data,
        method: 'DELETE',
    })
}

// 获取销售出库详情
export function outWarehouseSalesDetails(data) {
    return request({
        url: 'v1/store/outWarehouseSales/' + data,
        method: 'GET',
    })
}

// 审核销售出库
export function auditOutWarehouseSales(data) {
    return request({
        url: 'v1/store/outWarehouseSales/audit',
        method: 'POST',
        data: data
    })
}

// 修改销售出库
export function editOutWarehouseSales(data) {
    return request({
        url: 'v1/store/outWarehouseSales',
        method: 'PUT',
        data: data
    })
}

// 新增销售出库
export function addOutWarehouseSales(data) {
    return request({
        url: 'v1/store/outWarehouseSales',
        method: 'POST',
        data: data
    })
}

//出库列表
export function outList(data) {
    return request({
        url: 'v1/store/outWarehouse/list',
        method: 'GET',
        params: data
    })
}

//查询出库单
export function queryOutWarehouse(data) {
    return request({
        url: 'v1/store/outWarehouse/' + data,
        method: 'GET',
    })
}

//入库明细汇总
export function inWarehouseSummary(data) {
    return request({
        url: 'v1/store/inWarehouse/inWarehouseSummary',
        method: 'GET',
        params: data
    })
}

//入库明细汇总Echart
export function inWarehouseProductAmount(data) {
    return request({
        url: 'v1/store/statisticalChart/inWarehouseProductAmount',
        method: 'GET',
        params: data
    })
}

//产品销售额
export function outWarehouseProductAmountChart(data) {
    return request({
        url: 'v1/store/statisticalChart/outWarehouseProductAmountChart',
        method: 'GET',
        params: data
    })
}

//产品销售额Echart
export function currentMonthSales(data) {
    return request({
        url: 'v1/store/statisticalChart/currentMonthSales',
        method: 'GET',
        params: data
    })
}

//入库金额
export function inWarehouseProductAmountChart(data) {
    return request({
        url: 'v1/store/statisticalChart/inWarehouseProductAmountChart',
        method: 'GET',
        params: data
    })
}

//
//入库金额Echart
export function currentMonthInWarehouseMoney(data) {
    return request({
        url: 'v1/store/statisticalChart/currentMonthInWarehouseMoney',
        method: 'GET',
        params: data
    })
}

//出库销售统计
export function annualMonthlyReport() {
    return request({
        url: 'v1/store/statisticalChart/annualMonthlyReport',
        method: 'GET',
    })
}

//出库销售统计Echart
export function annualMonthlySales() {
    return request({
        url: 'v1/store/statisticalChart/annualMonthlySales',
        method: 'GET',
    })
}

//今日期码
export function datecode(data) {
    return sendRequest({
        url: 'datecode/today',
        method: 'GET',
        params: data
    })
}

//首页轮播图
export function bannerList(data) {
    return sendRequest({
        url: 'bannerList',
        method: 'GET',
        params: data
    })
}

//首页营收情况
export function orderData(data) {
    return sendRequest({
        url: 'report/shop/orderData?token=' + data ,
        method: 'POST',
    })
}

//公告列表
export function notesList(data) {
    return sendRequest({
        url: 'notes/list',
        method: 'POST',
        data: data,
    })
}

//vin查询
export function vinCode(data) {
    return sendRequest({
        url: 'baidu/vinCode?token=' + data.token,
        method: 'POST',
        data: data,
    })
}

//首页消息数量
export function messageNum(data) {
    return sendRequest({
        url: 'shop/countNoRead?token=' +data.token,
        method: 'GET',
    })
}