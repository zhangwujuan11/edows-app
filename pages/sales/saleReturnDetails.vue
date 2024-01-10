<template>
  <view style="padding-bottom: 24rpx">
    <view class="main">
      <view class="label" style="   font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #333333;">单据编号：{{ form.orderNo }}</view>
      <view class="label">往来客户：{{ form.customer }}</view>
      <view class="label">业务门店：{{ form.storeName }}</view>
      <view class="label">业务人员：{{ form.constructionWork }}</view>
      <view class="label">车&nbsp;牌&nbsp;号：&nbsp;{{ form.plateNumber }}</view>
      <view class="label">结算方式：{{ form.paymentTerms }}</view>
      <view class="label">配送方式：{{ form.delivery }}</view>
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
          <view class="name">退货说明</view>
          <view class="val">{{ item.remark }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    detailoutWarehouseReturn
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        form: {}
      }
    },
    async onLoad(e) {
      const data = await detailoutWarehouseReturn(e.id)
      // console.log(data);
      if (data.data != null) {

        if (data.data.orderType == 1) {
          data.data.orderType = '提交'
        } else {
          data.data.orderType = '出库'
        }
        if (data.data.status == 1) {
          data.data.status = '提交'
        } else {
          data.data.status = '入库'
        }
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
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 686rpx;
    min-height: 902rpx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
    margin: 24rpx auto;
    border-radius: 20rpx;
    padding: 32rpx;

    .label {
      word-break: break-all;
      width: 600upx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      margin-top: 20rpx;
    }

    .content {
      width: 622rpx;
      min-height: 421rpx;
      background: #f5f7fb;
      border-radius: 30rpx;
      margin-top: 26rpx;
      padding: 28rpx 32rpx 0rpx 32rpx;
    }

    .flex {
      word-break: break-all;
      width: 560upx;
      display: flex;
      padding-bottom: 24rpx;
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