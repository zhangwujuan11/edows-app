import {
  web
} from "./config.js"

const serviceModule = {
  //微信授权 
  getXcxAuth: {
    url: web.apiUrl + 'wx/xcxAuth',
    method: 'GET'
  },
  //小程序授权提交用户信息
  xcxDoAuth: {
    url: web.apiUrl + 'wx/xcxDoAuth',
    method: 'POST'
  },

  //商城登录
  mallMemberLogin: {
    url: web.apiUrl + 'member/mall/login',
    method: 'POST'
  },

  //获取所有品牌信息
  getCarBrandList: {
    url: web.apiUrl + 'car/brand/list',
    method: 'GET'
  },

  //获取获取车系下的车型
  getCarInfoList: {
    url: web.apiUrl + 'car/info/list',
    method: 'GET'
  },

  //获取品牌下的车系
  getCarSeriesList: {
    url: web.apiUrl + 'car/series/list',
    method: 'GET'
  },

  //获取首页数据 
  getHomePageData: {
    url: web.apiUrl + 'mall/product/getHomePageData',
    method: 'GET'
  },

  //记录广告访问Log
  visitLog: {
    url: web.apiUrl + 'mall/advertisement/visitLog?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //获取商品一级分类数据 
  getProductFirstGroup: {
    url: web.apiUrl + 'mall/product/firstGroup',
    method: 'GET'
  },

  //零售用户预约服务 
  subReservationService: {
    url: web.apiUrl + 'mall/reservationService/submit?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //获取商品二级分类数据 
  getProductSecondGroup: {
    url: web.apiUrl + 'mall/product/secondGroup/list?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },
  //关键词模糊搜索 
  getSearchKeywords: {
    url: web.apiUrl + 'mall/product/getHeatSearchKeywordsLike?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },
  //商品检索
  searchProduct: {
    url: web.apiUrl + 'mall/product/search?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //获取商品详情数据 
  getProductByCode: {
    url: web.apiUrl + 'mall/product/detail?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //获取商品详情评价
  getProductComments: {
    url: web.apiUrl + 'mall/comment/productComments?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },
  //获取地址列表
  getContactsList: {
    url: web.apiUrl + 'mall/contacts/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //新增编辑地址
  upDataContacts: {
    url: web.apiUrl + 'mall/contacts/edit?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //删除地址
  delContacts: {
    url: web.apiUrl + 'mall/contacts/delete?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //新增编辑发票
  upDataInvoice: {
    url: web.apiUrl + 'mall/invoice/edit?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //获取发票详情
  getInvoiceDetail: {
    url: web.apiUrl + 'mall/invoice/detail?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //获取发票列表
  getInvoiceList: {
    url: web.apiUrl + 'mall/invoice/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //删除发票
  delInvoice: {
    url: web.apiUrl + 'mall/invoice/delete?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //获取用户下指定状态的优惠券
  getCouponList: {
    url: web.apiUrl + 'mall/coupon/user/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //用户指定商品是否有可用的优惠券
  getCouponProductList: {
    url: web.apiUrl + 'mall/coupon/user/product?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  //判断当前所选的产品及优惠券是否可用
  getCouponCheckUse: {
    url: web.apiUrl + 'mall/coupon/check/use?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //获取所有可用优惠券
  getAllCouponList: {
    url: web.apiUrl + 'mall/coupon/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //用户领取优惠券
  receiveUserCoupon: {
    url: web.apiUrl + 'mall/coupon/user/receive?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //查询购物城中所有的商品
  getShoppingCartList: {
    url: web.apiUrl + 'mall/shoppingCart/List?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //加入购物车
  addShoppingCart: {
    url: web.apiUrl + 'mall/shoppingCart/add?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //购物车选中操作
  shoppingCartChecked: {
    url: web.apiUrl + 'mall/shoppingCart/checked?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //更改购物车中商品的数量值
  editSumShoppingCart: {
    url: web.apiUrl + 'mall/shoppingCart/editSum?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //删除购物车
  delShoppingCart: {
    url: web.apiUrl + 'mall/shoppingCart/delete?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //点击结算或立即购买按钮
  toBuyProduct: {
    url: web.apiUrl + 'mall/order/purchaseProduct?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //提交订单
  submitOrder: {
    url: web.apiUrl + 'mall/order/submitOrder?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //一级门店待结算订单
  getDjsOrderList: {
    url: web.apiUrl + 'mall/order/djsOrderList?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //获取选中的订单信息
  getSelectedOrderList: {
    url: web.apiUrl + 'mall/order/selectedOrder?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //订单结算提交 
  submitOrderAccount: {
    url: web.apiUrl + 'mall/order/orderAccountSubmit?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //订单结算列表（结算中、已结算）
  getOrderAccountList: {
    url: web.apiUrl + 'mall/order/orderAccountList?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //订单结算详情
  getOrderAccountDetail: {
    url: web.apiUrl + 'mall/order/orderAccountDetail?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  //上传图片
  uploadPic: {
    url: web.apiUrl + 'mall/order/upload?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //查询订单防伪编码信息
  getSecurityCodeList: {
    url: web.apiUrl + 'mall/order/securityCodeList?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  //订单列表
  getOrderList: {
    url: web.apiUrl + 'mall/order/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //订单支付
  orderPayer: {
    url: web.apiUrl + 'mall/order/payment?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  //确认收款
  orderConfirmation: {
    url: web.apiUrl + 'mall/order/confirmation?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  //订单详情
  getOrderDetail: {
    url: web.apiUrl + 'mall/order/detail?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  //退款说明原因选择
  getOrderRefundInfo: {
    url: web.apiUrl + 'mall/order/refundInfo?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //退款详情
  getOrderRefundDetail: {
    url: web.apiUrl + 'mall/order/refundDetail?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  //取消退款操作
  canncelRefundApply: {
    url: web.apiUrl + 'mall/order/canncelRefundApply?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },
  //去评价
  publishComment: {
    url: web.apiUrl + 'mall/comment/publishComment?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },
  //退款申请提交
  orderRefundApply: {
    url: web.apiUrl + 'mall/order/refundApply?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },

  //取消订单
  cancelOrder: {
    url: web.apiUrl + 'mall/order/cancelOrder?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  //删除订单
  deleteOrder: {
    url: web.apiUrl + 'mall/order/deleteOrder?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  // 线下付款
  offlinePay: {
    url: web.apiUrl + 'mall/order/offlinePay?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },


  // 积分商品详情信息
  scoreGoodsDetail: {
    url: web.apiUrl + 'mall/scoreGoods/detail?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  // 取消订单
  scoreGoodsCancel: {
    url: web.apiUrl + 'mall/scoreGoods/order/cancel?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  // 确认收货
  scoreGoodsConfirmation: {
    url: web.apiUrl + 'mall/scoreGoods/order/confirmation?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  // 创建积分商品订单
  scoreGoodsCreate: {
    url: web.apiUrl + 'mall/scoreGoods/order/create?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  // 删除订单
  scoreGoodsDelete: {
    url: web.apiUrl + 'mall/scoreGoods/order/delete?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  // 积分订单详情
  scoreGoodsOrderDetail: {
    url: web.apiUrl + 'mall/scoreGoods/order/detail?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  // 积分订单列表
  scoreGoodsOrderList: {
    url: web.apiUrl + 'mall/scoreGoods/order/list?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  // 积分支付结果查询
  queryPayResult: {
    url: web.apiUrl + 'mall/scoreGoods/order/queryPayResult?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'GET'
  },

  // 积分支付
  scorePay: {
    url: web.apiUrl + 'mall/scoreGoods/order/scorePay?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },

  // 积分记录
  scoreGoodsRecord: {
    url: web.apiUrl + 'mall/scoreGoods/score/record?token=' + (uni.getStorageSync('userInfo') ? uni
      .getStorageSync('userInfo').token : ''),
    method: 'POST'
  },
  // 积分商品检索
  scoreGoodsSearch: {
    url: web.apiUrl + 'mall/scoreGoods/search?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'POST'
  },
  // 积分商品检索
  score: {
    url: web.apiUrl + 'mall/scoreGoods/user/score?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  scoreone: {
    url: web.apiUrl + 'shop/getShopSecurityBalance?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

  shopDetail: {
    url: web.apiUrl1 + 'shop/detail?token=' + "",
    method: 'GET'
  },





  // 获取样板店余额
  getShopSecurityBalance: {
    url: web.apiUrl + 'shop/getShopSecurityBalance?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },
  // 获取样板流水
  getshopAccount: {
    url: web.apiUrl + 'mall/shopAccountFlow/list?token=' + (uni.getStorageSync('userInfo') ? uni.getStorageSync(
      'userInfo').token : ''),
    method: 'GET'
  },

};


const ApiSetting = {
  ...serviceModule
}
export default ApiSetting