<template>
  <view style="padding-bottom: 24rpx">
    <view class="main">
      <view class="label" style="   font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #333333;">销售开单号：{{ form.orderNo }}</view>
      <view class="label">往来客户：{{ form.customer }}</view>
      <view class="label">业务门店：{{ form.storeName }}</view>
      <view class="label">车&nbsp;牌&nbsp;&nbsp;号：{{ form.plateNumber }}</view>
      <view class="label">车主姓名：{{ form.carOwnerName }}</view>
      <view class="label">车 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{{ form.vehicleModel }}</view>
      <view class="label">电 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：{{ form.phoneNumber }}</view>
      <view class="label">车辆单位：{{ form.vehicleUnit }}</view>
      <view class="label">联系地址：{{ form.contactAddress }}</view>
      <view class="label">VIP 卡 号：{{ form.vipCardNumber }}</view>
      <view class="label">进厂日期：
        <uni-dateformat :date="form.enteringTheFactoryDate"></uni-dateformat>
      </view>
      <view class="label">到期日期：
        <uni-dateformat :date="form.expirationDate"></uni-dateformat>
      </view>
      <view class="label">车 架 &nbsp;号：{{ form.frameNumber }}</view>
      <view class="label">接车人员：{{ form.constructionWork }}</view>
      <view class="label">配送方式：{{ form.delivery }}</view>
      <view class="label">价格方式：{{ form.priceMode }}</view>
      <view class="label">结算方式：{{ form.paymentTerms }}</view>
      <view class="label">车辆类别：{{ form.vehicleCategory }}</view>
      <view class="label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{{ form.remark }}</view>
      <view class="content" v-for="(item, index) in form.detailList" :key="index">
        <view class="flex">
          <view class="name">库位</view>
          <view class="val">{{ item.positionCode }}</view>
        </view>
        <view class="flex">
          <view class="name">产品名称</view>
          <view class="val">{{ item.productName }}</view>
        </view>
        <view class="flex">
          <view class="name">数量</view>
          <view class="val">{{ item.quantity }}</view>
        </view>
        <view class="flex">
          <view class="name">单价</view>
          <view class="val">{{ item.price }}</view>
        </view>
        <view class="flex">
          <view class="name">总价</view>
          <view class="val">{{ item.totalPrice }}</view>
        </view>
        <view class="flex">
          <view class="name">备注</view>
          <view class="val">{{ item.remark }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    detailoutWarehouseForeground
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        form: {},
      };
    },
    async onLoad(e) {
      const data = await detailoutWarehouseForeground(e.id)
      if (data.data != null) {

        if (data.data.delivery == 0) {
          data.data.delivery = '自提'
        } else if (data.data.delivery == 1) {
          data.data.delivery = '送货'
        } else if (data.data.delivery == 2) {
          data.data.delivery = '物流代收'
        } else {
          data.data.delivery = '物流不代收'
        }
        if (data.data.paymentTerms == 1) {
          data.data.paymentTerms = '现金付款'
        } else if (data.data.paymentTerms == 2) {
          data.data.paymentTerms = '银行转账'
        } else if (data.data.paymentTerms == 3) {
          data.data.paymentTerms = '微信'
        } else {
          data.data.paymentTerms = '挂账'
        }

      }
      this.form = data.data
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .main {
    width: 686rpx;
    min-height: 1102rpx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
    margin: 24rpx auto;
    border-radius: 20rpx;
    padding: 32rpx;


    .label {
      width: 600upx;
      word-break: break-all;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      margin-top: 20rpx;
    }

    .content {
      width: 622rpx;
      min-height: 388rpx;
      background: #f5f7fb;
      border-radius: 30rpx;
      margin-top: 26rpx;
      padding: 28rpx 32rpx 0rpx 32rpx;
    }

    .flex {
      display: flex;
      padding-bottom: 24rpx;
      word-break: break-all;
      width: 600upx;
    }

    .name {
      width: 128rpx;
      height: 35rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
      white-space: nowrap;
    }

    .val {
      width: 410rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      margin-left: 34rpx;
    }
  }
</style>