<template>
  <view>
    <view class="state-section blueGradient">
      <image src="../../static/ok.png"></image>
      <text>{{orderInfo.orderStatusValue}}</text>
    </view>


    <view class="address-section  logistics-section" v-if="orderInfo.wlNum">
      <view class="order-content">
        <image class="m-icon-car" src="../../static/car.png"></image>
        <view class="cen">
          <view class="top">
            <text class="wliu">物流公司：{{orderInfo.wlName}}</text>
          </view>
          <text class="wliu">物流单号：{{orderInfo.wlNum}}</text>
          <text class="wliu">发货时间：{{orderInfo.sendTime}}</text>

        </view>

      </view>
      <view class="wliu-pic">
        <image v-if="orderInfo.fhpz" :src="orderInfo.fhpz" mode="widthFix"></image>
      </view>
    </view>

    <!-- 地址 -->
    <view class="address-section">
      <view class="order-content">
        <text class="yticon icon-shouhuodizhi"></text>
        <view class="cen">
          <view class="top">
            <text class="name">{{orderInfo.contactsVO.name}}</text>
            <text class="mobile">{{orderInfo.contactsVO.mobile}}</text>
          </view>
          <text class="address">{{orderInfo.contactsVO.address}} {{orderInfo.contactsVO.roomNum}}</text>
        </view>
      </view>
    </view>

    <view class="goods-section">
      <view class="g-header b-b">
        <text class="name">商品信息</text>
      </view>
      <!-- 商品列表 -->
      <block v-for="(item,index) in orderInfo.productList" :key="index">
        <!-- <navigator :url="`/pages/product/product?code=` + item.productCode" > -->
        <view class="g-item" @click='navToDetailPage(item)'>
          <image :src="item.imgPath"></image>
          <view class="right">
            <text class="title clamp">{{item.productName}}</text>
            <view class="spec">
              <text v-for="(subItem,subIndex) in item.attrValueVOList" :key="subIndex">
                {{subItem.attrValue}}
              </text>

            </view>
            <view class="price-box">
              <text class="price"> {{item.productPrice}}</text>
              <text class="number">x {{item.productNum}}</text>
            </view>
          </view>
        </view>
        <!-- </navigator> -->
      </block>
      <block v-for="(subItem, subIndex) in orderInfo.giftVOList " :key="subIndex" v-if="orderInfo.isGift">
        <navigator :url="`/pages/product/product?code=` + subItem.giftCode">
          <view class="g-item">
            <image :src="subItem.giftImg"></image>
            <view class="right">
              <text class="title clamp">{{subItem.giftName}}</text>
              <view class="spec">
                <text>数量：{{subItem.giftNum}} </text>
                <text v-if="subItem.remarks" class="grey"> ( {{subItem.remarks}} ) </text>
              </view>
              <view class="price-box">
                <text class="number">赠品</text>
              </view>
            </view>
          </view>
        </navigator>
      </block>
    </view>



    <view class="facture-setion" v-if="orderInfo.invoiceVO">
      <view class="f-item">
        <text class="grey">发票抬头</text>
        <text>{{orderInfo.invoiceVO.payable}}</text>
      </view>
      <view class="f-item">
        <text class="grey">纳税人识别号</text>
        <text>{{orderInfo.invoiceVO.nsrsbh}}</text>
      </view>
      <view class="f-item">
        <text class="grey">发票内容</text>
        <text>{{orderInfo.invoiceVO.context}}</text>
      </view>
    </view>

    <view class="facture-setion">
      <view class="f-item">
        <text class="grey">订单编号</text>
        <text>{{orderSn}}</text>
      </view>
      <!-- <view class="f-item" v-if="orderInfo.remarks">
				<text class="grey">备注信息</text>
				<text>{{orderInfo.remarks}}</text>
			</view> -->
      <view class="f-item">
        <text class="grey">提交时间</text>
        <text>{{orderInfo.createDate}}</text>
      </view>
      <view class="f-item" v-if="orderInfo.isSecurity">
        <text class="grey">防伪编号</text>
        <text class="btnOpts" @click="toView(orderInfo)">查看</text>
      </view>
      <view class="f-item" v-if="orderInfo.useCoupon">
        <text class="grey">优惠券使用</text>
        <text>已使用</text>
      </view>

      <view class="f-item" v-if="orderInfo.couponAmount">
        <text class="grey">优惠金额</text>
        <text class="red">￥{{orderInfo.couponAmount}}</text>
      </view>

      <view class="f-item">
        <text class="grey">商品合计</text>
        <text class="red">￥{{orderInfo.orderPrice}}</text>
      </view>
      <view class="f-item" v-if="orderInfo.payTime">
        <text class="grey">付款时间</text>
        <text>{{orderInfo.payTime}}</text>
      </view>
    </view>
    <view class="goods-section" v-if="orderInfo.remarks">
      <view class="g-header b-b">
        <text class="name">备注信息</text>
      </view>
      <view class="remarks grey">
        {{orderInfo.remarks}}
      </view>
    </view>

    <view class="price-section">
      <view class="g-header b-b">
        <text class="name">商品费用</text>
      </view>

      <view class="p-items">
        <!-- <view class="p-item">
					<text class="grey">运费</text>
					<text>￥0.00</text>
				</view> -->
        <view class="p-item">
          <text class="grey">应付金额</text>
          <text class="red">￥{{orderInfo.totalPrice}}</text>
        </view>
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <view class="innerFooter">
        <block v-if="orderInfo.payStatus==0 && orderInfo.orderStatus != 105">
          <button class="action-btn red" @click="cancelOrder(orderInfo)" v-if="orderInfo.settleStatus==0">取消订单</button>
          <button class="action-btn blue" @click="toPay(orderInfo)" v-if="accountType!=3">立即支付</button>
        </block>
        <block v-if="orderInfo.orderStatus == 102">
          <block v-if="orderInfo.refundStatus">
            <button v-if="orderInfo.refundStatus ==202  || orderInfo.refundStatus ==206" class="action-btn red"
              @click="refundOrder">申请退款</button>
            <!-- <button v-if="orderInfo.refundStatus ==202" class="action-btn red" @click="refundOrder">申请退款</button> -->
            <button v-if="orderInfo.refundStatus !=206" class="action-btn recom"
              @click="refundOrderDetail">退款详情</button>
          </block>
          <block v-else>
            <button v-if="orderInfo.refundStatus ==202 || orderInfo.refundStatus ==206" class="action-btn red"
              @click="refundOrder">申请退款</button>
            <button class="action-btn red" @click="refundOrder">申请退款</button>
          </block>
        </block>
        <block v-if="orderInfo.orderStatus == 103">
          <block v-if="orderInfo.refundStatus">
            <button v-if="orderInfo.refundStatus !=206" class="action-btn recom"
              @click="refundOrderDetail">退款详情</button>
          </block>
          <block v-else>
            <button class="action-btn red" @click="refundOrder">申请退款</button>
          </block>
          <button class="action-btn blue" @click="confirm">确认收货</button>
        </block>
        <block v-if="orderInfo.orderStatus == 105">
          <!-- <button class="action-btn red" @click="deleteOrder">删除订单</button> -->
        </block>
        <block v-if="orderInfo.orderStatus == 107">
          <!-- <button class="action-btn red" @click="deleteOrder">删除订单</button> -->
          <button class="action-btn recom" @tap="makePhoneCall">售后服务</button>
          <button class="action-btn blue" @click="toEvalu" v-show="orderInfo.isComment">去评价</button>
        </block>
        <block v-if="orderInfo.orderStatus == 109">
          <button class="action-btn red" @click="refundOrder">申请退款</button>
        </block>
        <!-- <button class="action-btn red">删除订单</button>
				<button class="action-btn blue">申请售后</button>
				<button class="action-btn blue">立即支付</button>
				<button class="action-btn blue">再次购买</button> -->
      </view>
    </view>


    <!-- 服务说明模态层弹窗 -->
    <view class="popup spec" :class="seviceClass" @touchmove.stop.prevent="stopPrevent" @click="toggleService()">
      <!-- 遮罩层 -->
      <view class="mask"></view>
      <view class="layer service-content" @click.stop="stopPrevent">
        <view class="inner-service-content">
          <view class="service-title">
            <text>以下订单需一起{{optsType}}</text>
            <text class="blue">由于以下订单共享优惠，需要一起{{optsType}}</text>
          </view>
          <scroll-view scroll-y class="content-aside">
            <view class="item-service" v-for="(item,index) in shareCouponOrderList" :key="index">
              <text>{{item.productList[0].productName}} （共 {{item.totalSum}} 件）</text>
              <text class="price red">{{item.totalPrice}}</text>
            </view>
          </scroll-view>
          <view class="service-opts">
            <text class="back" @click="toggleService">返回</text>
            <text class="surPay" @click="toSurPay(shareCouponOrderList)" v-if="optsType==`付款`">确认{{optsType}}</text>
            <text class="surPay" @click="cancelSurOrder(shareCouponOrderList)"
              v-if="optsType==`取消`">确认{{optsType}}</text>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import {
    fn
  } from '@/util/common.js';
  export default {
    data() {
      return {
        orderSn: '',
        accountType: 0,
        serviceNo: "400-988-6868",
        orderInfo: {},
        maskState: 0, //优惠券面板显示状态
        desc: '', //备注
        seviceClass: 'none',
        shareCouponOrderList: [],
        optsType: '',
        payType: 1, //1微信 2支付宝
        couponList: [{
            title: '新用户专享优惠券',
            price: 5,
          },
          {
            title: '庆五一发一波优惠券',
            price: 10,
          },
          {
            title: '优惠券优惠券优惠券优惠券',
            price: 15,
          }
        ],
        addressData: {
          name: '许小星',
          mobile: '13853989563',
          addressName: '金九大道',
          address: '山东省济南市历城区',
          area: '149号',
          default: false,
        },
        facdureData: {
          companyName: '不开发票'
        }
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo'])
    },
    onLoad(option) {
      // let returnUrl = getCurrentPages()[0].route;
      // console.log('当前路由：', returnUrl);
      // if (!this.hasLogin) {
      //   uni.reLaunch({
      //     url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
      //   })
      // }
      this.orderSn = option.orderSn;
      this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType ? uni.getStorageSync('UmsMember').UmsMember.accountType : 0;

      //商品数据
      this.getData();
    },
    methods: {
      //获取数据
      async getData() {
        var params = {
          orderSn: this.orderSn
        }
        console.log(params)
        let res = await this.$axios(this.$baseUrl.getOrderDetail, params);
        this.orderInfo = res.data.data;
        this.orderInfo.createDate = fn.formatTime(this.orderInfo.createDate, 'Y-M-D h:m:s');
        if (this.orderInfo.payTime) {
          this.orderInfo.payTime = fn.formatTime(this.orderInfo.payTime, 'Y-M-D h:m:s')
        }
        if (this.orderInfo.sendTime) {
          this.orderInfo.sendTime = fn.formatTime(this.orderInfo.sendTime, 'Y-M-D')
        }
        console.log(this.orderInfo.createDate)
      },

      //跳转进详情
      navToDetailPage(item) {
        let code = item.productCode;
        if (item.isExpire) {
          this.$api.msg('商品已下架');
        } else {
          uni.navigateTo({
            url: `/pages/product/product?code=${code}`
          })
        }

      },
      //跳转防伪编号查看
      toView(item) {
        let orderSn = item.orderSn;
        uni.navigateTo({
          url: `/pages/order/code?orderSn=${orderSn}`
        })
      },
      //服务说明 弹框开关
      toggleService() {
        if (this.seviceClass === 'show') {
          this.seviceClass = 'hide';
          setTimeout(() => {
            this.seviceClass = 'none';
          }, 250);
        } else if (this.seviceClass === 'none') {
          this.seviceClass = 'show';
        }
      },

      stopPrevent() {},

      //去付款
      async toPay(item) {
        var _self = this;
        this.optsType = "";
        this.shareCouponOrderList = "";

        if (item.shareCoupon) {
          this.shareCouponOrderList = item.shareCouponOrderList;
          this.optsType = "付款";
          this.toggleService();
        } else {
          this.toSurPay(item);
        }

      },

      async toSurPay(item) {
        // var orderSn = "";
        // var arrOrderSn = [];
        // if (item.orderSn) {
        //   orderSn = item.orderSn;
        //   console.log(orderSn)
        // } else {
        //   for (var i in item) {
        //     arrOrderSn.push(item[i].orderSn)
        //   }
        //   orderSn = arrOrderSn.join(',')
        //   console.log(orderSn)
        // }
		var orderSn = "";
		var arrOrderSn = [];
		const _self = this
		if (item.orderSn) {
			orderSn = item.orderSn;
		} else {
			for (var i in item) {
				arrOrderSn.push(item[i].orderSn)
			}
			orderSn = arrOrderSn.join(',')
		}
		var params = {
		  orderSn: orderSn,
		  payType: 'MWEB',
		  // useSecurityBalance: item.totalPrice
		}
		let res = await this.$axios(this.$baseUrl.orderPayer, params);
		if (res.data.code == 200) {
		 let data = res.data.data
		 let mweb_url = res.data.data.mwebUrl
		 	const platform = uni.getSystemInfoSync().platform
		 	const domain = 'www.edows.cn'
		 	const webview = plus.webview.create('','custom-webview');
		 	switch (platform) {
		 		case 'android':
		 			webview.loadURL(mweb_url, {'Referer': 'https://' + domain});
		 			break;
		 		case 'ios':
		 			webview.loadURL(mweb_url, {'Referer': domain + '://'});
		 			break;
		 		default:
		 			break;	
		 	}
		}

      },


      //确认收货
      async confirm() {
        var _self = this;
        uni.showModal({
          content: '确认已收货？',
          success: async (res) => {
            if (res.confirm) {
              var params = {
                orderSn: this.orderSn
              }
              let res = await this.$axios(this.$baseUrl.orderConfirmation, params);
              uni.redirectTo({
                url: '/pages/order/order?state=3'
              })
            }
          }
        })

      },

      //申请退款
      refundOrder() {
        uni.navigateTo({
          url: '/pages/order/refund?orderSn=' + this.orderSn
        })
      },
      //退款详情操作
      refundOrderDetail() {
        uni.navigateTo({
          url: '/pages/order/refundDetail?orderSn=' + this.orderSn
        })
      },

      //去评价
      toEvalu() {
        uni.navigateTo({
          url: '/pages/evaluate/evaluate?orderSn=' + this.orderSn
        })
      },

      //联系客服
      makePhoneCall() {
        uni.makePhoneCall({
          phoneNumber: this.serviceNo,
          success: () => {
            console.log("成功拨打电话")
          }
        })
      },

      //取消订单
      async cancelOrder(item) {

        var _self = this;
        this.optsType = "";
        this.shareCouponOrderList = "";

        if (item.shareCoupon) {
          this.shareCouponOrderList = item.shareCouponOrderList;
          this.optsType = "取消";
          this.toggleService();
        } else {
          this.cancelSurOrder(item);
        }
      },
      //确认取消订单
      async cancelSurOrder(item) {
        uni.showLoading({
          title: '请稍后'
        })
        var orderSn = "";
        var arrOrderSn = [];
        if (item.orderSn) {
          orderSn = item.orderSn;
          console.log(orderSn)
        } else {
          for (var i in item) {
            arrOrderSn.push(item[i].orderSn)
          }
          orderSn = arrOrderSn[0]
          console.log(orderSn)
        }
        var params = {
          orderSn: orderSn
        }
        let res = await this.$axios(this.$baseUrl.cancelOrder, params);
        if (res.data.code == 200) {
          this.seviceClass = 'hide';
          this.getData();
          uni.hideLoading();
          setTimeout(() => {
            this.seviceClass = 'none';
          }, 200)

        }
      },
      //删除订单
      async deleteOrder() {
        uni.showModal({
          content: '确认删除此订单？',
          success: async (res) => {
            if (res.confirm) {
              var params = {
                orderSn: this.orderSn
              }
              let res = await this.$axios(this.$baseUrl.deleteOrder, params);
              if (res.data.code == 200) {
                this.$api.msg("删除订单成功！");
                setTimeout(() => {

                  uni.navigateTo({
                    url: '/pages/order/order?state=0'
                  })
                }, 1000)
              }
            }
          }
        })
      },
      //显示优惠券面板
      toggleMask(type) {
        let timer = type === 'show' ? 10 : 300;
        let state = type === 'show' ? 1 : 0;
        this.maskState = 2;
        setTimeout(() => {
          this.maskState = state;
        }, timer)
      },
      //显示支付方式面板
      toggleMaskPay(type) {
        let timer = type === 'show' ? 10 : 300;
        let state = type === 'show' ? 1 : 0;
        this.maskState = 2;
        setTimeout(() => {
          this.maskState = state;
        }, timer)
      },
      numberChange(data) {
        this.number = data.number;
      },
      changePayType(type) {
        this.payType = type;
      },
      submit() {
        uni.redirectTo({
          url: '/pages/money/pay'
        })
      }
    }

  }
</script>

<style lang="scss">
  page {
    background: $page-color-base;
    padding-bottom: 100upx;
  }

  .state-section {
    padding: 50upx 70upx;
    position: relative;
    width: 100%;
    display: flex;
    color: #fff;
    align-items: center;

    image {
      width: 86upx;
      height: 86upx;
      margin-right: 20upx;
    }
  }

  .logistics-section {
    margin-bottom: 16upx
  }

  .address-section {
    padding: 30upx 0;
    background: #fff;
    position: relative;

    .order-content {
      display: flex;
      align-items: center;

      .name {
        line-height: 60upx;
      }
    }

    .m-icon-car {
      width: 36upx;
      height: 36upx;
      margin: 0 26upx 0 26upx
    }

    .icon-shouhuodizhi {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90upx;
      color: #888;
      font-size: 44upx;
    }

    .cen {
      display: flex;
      flex-direction: column;
      flex: 1;
      font-size: 28upx;
      color: $font-color-dark;
    }

    .name {
      font-size: 34upx;
      margin-right: 24upx;
    }

    .wliu {
      font-size: 30upx;
      margin-right: 24upx;
      line-height: 56upx;
    }

    .address {
      margin-top: 16upx;
      margin-right: 20upx;
      color: $font-color-light;
    }

    .icon-you {
      font-size: 32upx;
      color: $font-color-light;
      margin-right: 30upx;
    }

    .a-bg {
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      width: 100%;
      height: 5upx;
    }
  }

  .wliu-pic {
    margin: 16upx 20upx 0;

    //padding:0 20upx;
    image {
      width: 710upx;
    }

  }

  .goods-section {
    margin-top: 16upx;
    background: #fff;
    padding-bottom: 1px;

    .g-header {
      display: flex;
      align-items: center;
      height: 84upx;
      padding: 0 30upx;
      position: relative;
    }

    .logo {
      display: block;
      width: 50upx;
      height: 50upx;
      border-radius: 100px;
    }

    .name {
      font-size: 30upx;
      color: $font-color-base;
      margin-left: 24upx;
    }

    .g-item {
      display: flex;
      margin: 20upx 30upx;

      image {
        flex-shrink: 0;
        display: block;
        width: 140upx;
        height: 140upx;
        border-radius: 4upx;
      }

      .right {
        flex: 1;
        padding-left: 24upx;
        overflow: hidden;
      }

      .title {
        font-size: 30upx;
        color: $font-color-dark;
      }

      .spec {
        font-size: 26upx;
        color: $font-color-light;
        padding: 10upx 12upx;

        text {
          padding-right: 10upx
        }
      }

      .price-box {
        display: flex;
        align-items: center;
        font-size: 32upx;
        color: $font-color-dark;
        padding-top: 10upx;

        .price {
          font-weight: 600;
          margin-bottom: 4upx;
          color: $uni-color-primary
        }

        .number {
          font-size: 26upx;
          color: $font-color-blue;
          margin-left: 20upx;
        }
      }

      .step-box {
        position: relative;
      }
    }
  }

  .remarks {
    font-size: $font-sm + 2upx;
    padding: 20upx 30upx;
    line-height: 44upx;
  }

  .facture-setion {
    margin-top: 16upx;
    background: #fff;
    padding-bottom: 1px;
    font-size: $font-sm + 1upx;
    padding: 20upx 0;
    line-height: 60upx;

    .f-item {
      display: flex;
      align-items: center;
      margin: 0 26upx;

      text.btnOpts {
        background: $font-color-blue;
        color: #fff;
        padding: 0 22upx;
        border-radius: 12upx;
        height: 42upx;
        line-height: 42upx;

      }

      text.grey {
        width: 166upx
      }

      .red {
        font-weight: 600;
        color: $font-color-red
      }

    }
  }

  .price-section {
    margin-top: 16upx;
    background: #fff;
    padding-bottom: 1px;
    font-size: $font-sm + 2upx;

    .g-header {
      display: flex;
      align-items: center;
      height: 84upx;
      padding: 0 30upx;
      position: relative;
    }

    .name {
      font-size: 30upx;
      color: $font-color-base;
      margin-left: 24upx;
    }

    .p-items {
      padding: 20upx 0;
      line-height: 60upx;
    }

    .p-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 26upx;

      text {
        margin-right: 60upx
      }

      .red {
        font-size: $font-lg +2upx;
        font-weight: 600;
        color: $font-color-red;
      }

    }

  }

  .yt-list {
    margin-top: 16upx;
    background: #fff;
  }

  .yt-list-cell {
    display: flex;
    align-items: center;
    padding: 10upx 30upx 10upx 40upx;
    line-height: 70upx;
    position: relative;

    &.cell-hover {
      background: #fafafa;
    }

    &.b-b:after {
      left: 30upx;
    }

    .cell-icon {
      height: 32upx;
      width: 32upx;
      font-size: 22upx;
      color: #fff;
      text-align: center;
      line-height: 32upx;
      background: #f85e52;
      border-radius: 4upx;
      margin-right: 12upx;

      &.hb {
        background: #ffaa0e;
      }

      &.lpk {
        background: #3ab54a;
      }

    }

    .cell-more {
      align-self: center;
      font-size: 24upx;
      color: $font-color-light;
      margin-left: 8upx;
      margin-right: -10upx;
    }

    .cell-tit {
      flex: 1;
      font-size: 26upx;
      color: $font-color-light;
      margin-right: 10upx;
    }

    .cell-tip {
      font-size: 26upx;
      color: $font-color-dark;

      &.disabled {
        color: $font-color-light;
      }

      &.active {
        color: $base-color;
      }

      &.red {
        font-weight: 600;
        color: $font-color-red;
      }

      &.blue {
        color: $font-color-blue;
      }
    }

    &.desc-cell {
      .cell-tit {
        max-width: 90upx;
      }
    }

    .desc {
      flex: 1;
      font-size: $font-base;
      color: $font-color-dark;
    }
  }

  /*  弹出层 */
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    &.show {
      display: block;

      .mask {
        animation: showPopup 0.2s linear both;
      }

      .layer {
        animation: showLayer 0.2s linear both;
      }
    }

    &.hide {
      .mask {
        animation: hidePopup 0.2s linear both;
      }

      .layer {
        animation: hideLayer 0.2s linear both;
      }
    }

    &.none {
      display: none;
    }

    .mask {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .layer {
      position: fixed;
      z-index: 99;
      bottom: 0;
      width: 100%;
      min-height: 40vh;
      border-radius: 10upx 10upx 0 0;
      background-color: #fff;

      .btn {
        width: 100%;
        height: 100upx;
        line-height: 100upx;
        /* border-radius: 10upx; */
        background: $font-color-blue;
        font-size: $font-base + 2upx;
        color: #fff;
        /* margin: 30upx auto 0; */
      }
    }

    @keyframes showPopup {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes hidePopup {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    @keyframes showLayer {
      0% {
        transform: translateY(120%);
      }

      100% {
        transform: translateY(0%);
      }
    }

    @keyframes hideLayer {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(120%);
      }
    }
  }

  .order-share {
    font-size: $font-base;
    line-height: 40upx;
    padding: 0 16upx 16upx
  }

  .service-content {
    position: relative;

    .inner-service-content {
      padding: 20upx;
      font-size: $font-base;

      .service-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: $font-base;
        text-align: center;
        height: 120upx;
        line-height: 50upx;
        border-bottom: 2upx solid #eee
      }

      .content-aside {
        margin-top: 16upx;
        height: 600upx;
        padding-bottom: 100upx;

        .item-service {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16upx 0;
        }
      }

      .service-opts {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        height: 92upx;
        line-height: 92upx;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: 30upx;

        .back {
          width: 50%;
          background: #e1e1e1;
        }

        .surPay {
          width: 50%;
          background: #339cfe;
          color: #fff;
        }
      }
    }
  }

  .price {
    font-weight: 600;
    font-size: $font-base + 2upx;
    color: $font-color-dark;

    &.red {
      font-weight: 600;
      color: $font-color-red;
      padding-right: 14upx;
    }

    &.blue {
      color: $font-color-blue;

    }

    &:before {
      content: '￥';
      font-size: $font-sm;
      margin: 0 2upx 0 8upx;
      color: $font-color-red;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 995;
    display: flex;
    align-items: center;

    width: 100%;
    height: 90upx;
    font-size: $font-sm;
    background-color: #fff;
    z-index: 9;
    color: $font-color-base;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

    .innerFooter {
      position: relative;
      width: 96%;
      display: flex;
      justify-content: flex-end;
      font-size: $font-sm;

      .action-btn {
        width: 160upx;
        height: 60upx;
        margin: 0;
        margin-left: 24upx;
        padding: 0;
        text-align: center;
        line-height: 60upx;
        font-size: $font-sm + 2upx;
        color: $font-color-dark;
        background: #fff;

        &:after {
          border: none;
          border-radius: 4upx;
        }

        &.red {
          font-weight: 600;
          color: $font-color-red;
          border: 2upx solid $font-color-red;

        }

        &.recom {
          color: $base-color;
          border: 2upx solid $base-color;
        }

        &.blue {
          background: $base-color;
          color: #fff;
          border: 2upx solid $base-color;

        }
      }
    }

  }
</style>