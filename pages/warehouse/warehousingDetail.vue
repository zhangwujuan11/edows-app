<template>
  <view style="padding-top: 24rpx">
    <view class="main">
      <view class="num">单据编号：{{ details.orderNo }}</view>
      <view class="row">
        <view class="label">门店名称：</view>
        <view class="input">{{ details.warehouseName }}</view>
      </view>
      <view class="row">
        <view class="label">供应商：</view>
        <view class="input">{{ details.vendorName }}</view>
      </view>
      <view class="row">
        <view class="label">结算方式：</view>
        <view class="input">{{ details.paymentTerms | paymentTerms }}</view>
      </view>
      <view class="row">
        <view class="label" style="width: 98rpx">备注</view><text style="font-size: 24rpx">：</text>
        <view class="input">{{ details.remark }}</view>
      </view>
      <view class="content" v-for="(item, index) of details.storeInWarehouseDetailBoList" :key="index">
        <view class="flex">
          <view class="name">库位</view>
          <view class="val">{{ item.position }}</view>
        </view>
        <view class="flex">
          <view class="name">carg</view>
          <view class="val">{{ item.carg }}</view>
        </view>
        <view class="flex">
          <view class="name">产品名称</view>
          <view class="val">{{ item.productName }}</view>
        </view>
        <view class="flex">
          <view class="name">数量</view>
          <view class="val">{{ item.receivalQuantity }}</view>
        </view>
        <view class="flex">
          <view class="name">单价</view>
          <view class="val">{{ item.price }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  inWarehouseDetails
} from "@/Api/purchaseSales.js";
export default {
  data () {
    return {
      details: {},
    };
  },
  filters: {
    paymentTerms (e) {
      if (e == 1) {
        return "现金付款";
      } else if (e == 2) {
        return "银行转账";
      } else if (e == 3) {
        return "微信";
      } else if (e == 0) {
        return "挂账";
      }
    },
  },
  onLoad (option) {
    this.getDetails(option.inWarehouseId);
  },
  methods: {
    getDetails (inWarehouseId) {
      inWarehouseDetails(inWarehouseId).then((res) => {
        this.details = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 686rpx;
  min-height: 702rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
  margin: 0rpx auto;
  border-radius: 20rpx;
  padding: 32rpx;

  .num {
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 600;
    color: #333333;
  }

  .label {
    width: 122rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    text-align-last: justify;
  }

  .input {
    width: 500rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    word-break: break-all;
  }

  .content {
    width: 622rpx;
    min-height: 340rpx;
    background: #f5f7fb;
    border-radius: 30rpx;
    margin-top: 26rpx;
    padding: 28rpx 32rpx 0rpx 32rpx;
  }

  .flex {
    display: flex;
    padding-bottom: 28rpx;
  }

  .row {
    display: flex;
    margin-top: 20rpx;
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