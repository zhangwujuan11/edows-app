<template>
  <view style="padding-bottom: 24rpx">
    <view class="main">
      <view class="label" style="   font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #333333;">预计开单号：{{ form.orderNo }}</view>
      <view class="label">往来客户：{{ form.customer }}</view>
      <view class="label">业务门店：{{ form.storeName }}</view>
      <view class="label">车主姓名：{{ form.carOwnerName }}</view>
      <view class="label">车 牌 &nbsp;号：{{ form.plateNumber }}</view>
      <view class="label">联系电话：{{ form.phoneNumber }}</view>
      <view class="label">预约时间：<uni-dateformat :date="form.estimatedDelivery"></uni-dateformat></view>

      <view class="label">接车人员：{{ form.constructionWork }}</view>
      <view class="label">价格方式：{{ form.priceMode }}</view>
      <view class="label">配送方式：{{ form.delivery }}</view>
      <view class="label">结算方式：{{ form.paymentTerms }}</view>
      <view style="display: inline-block" class="label">
        <view style="width: 120rpx; display: inline-block">摘要：</view>{{ form.remark }}
      </view>
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
          <view class="name">carg</view>
          <view class="val">{{ item.carg }}</view>
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
    detailoutWarehouse
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        form: {},
      };
    },
    // filters: {
    //   /**
    //    * 格式化时间戳 Y-m-d H:i:s
    //    * @param {Number} timestamp 2023-01-01 19:20:30  
    //    * @param {String} format Y-m-d H:i:s
    //    * @return {String}
    //    */
    //   date: function(timeStamp, format = 'Y-m-d H:i') {
    //     let _date = new Date(timeStamp),
    //       Y = _date.getFullYear(),
    //       m = _date.getMonth() + 1,
    //       d = _date.getDate(),
    //       H = _date.getHours(),
    //       i = _date.getMinutes(),
    //       s = _date.getSeconds();

    //     m = m < 10 ? '0' + m : m;
    //     d = d < 10 ? '0' + d : d;
    //     H = H < 10 ? '0' + H : H;
    //     i = i < 10 ? '0' + i : i;
    //     s = s < 10 ? '0' + s : s;

    //     return format.replace(/[YmdHis]/g, key => {
    //       return {
    //         Y,
    //         m,
    //         d,
    //         H,
    //         i,
    //         s
    //       } [key];
    //     });
    //   }
    // },
    async onLoad(e) {
      const data = await detailoutWarehouse(e.id)
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
      min-height: 440rpx;
      background: #f5f7fb;
      border-radius: 30rpx;
      margin-top: 26rpx;
      padding: 28rpx 32rpx 0rpx 32rpx;
    }

    .flex {
      word-break: break-all;
      width: 600upx;
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