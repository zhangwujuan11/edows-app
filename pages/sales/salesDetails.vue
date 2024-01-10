<template>
  <view style="padding: 24rpx 0rpx">
    <view class="main">
      <view class="num">销售开单号：{{ details.orderNo }}</view>
      <view class="row">
        <view class="label">往来客户：</view>
        <view class="input">{{ details.customer }}</view>
      </view>
      <view class="row">
        <view class="label">业务门店：</view>
        <view class="input">{{ details.storeName }}</view>
      </view>
      <view class="row">
        <view class="label">业务员：</view>
        <view class="input">{{ details.updateBy }}</view>
      </view>
      <view class="row">
        <view class="label">票据类型：</view>
        <view class="input">{{ details.billType | billType }}</view>
      </view>
      <view class="row">
        <view class="label">票据名称：</view>
        <view class="input">{{ details.billName }}</view>
      </view>
      <view class="row">
        <view class="label">包装方式：</view>
        <view class="input">{{ details.packagingMethod | packageMethod }}</view>
      </view>
      <view class="row">
        <view class="label">配送方式：</view>
        <view class="input">{{ details.delivery | delivery }}</view>
      </view>
      <view class="row">
        <view class="label">价格方式：</view>
        <view class="input">{{ details.priceMode }}</view>
      </view>
      <view class="row">
        <view class="label">结算方式：</view>
        <view class="input">{{ details.paymentTerms | paymentTerms }}</view>
      </view>
      <view class="row">
        <view class="label" style="width: 98rpx">备注</view><text style="font-size: 24rpx">：</text>
        <view class="input">{{ details.remark }}</view>
      </view>
      <view
        class="content"
        v-for="(item, index) of details.detailList"
        :key="index"
      >
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
    outWarehouseSalesDetails
  } from "@/Api/purchaseSales.js";
  export default {
    data() {
      return {
        details: {},
      };
    },
    onLoad(option) {
      this.getDetails(option.outWarehouseId);
    },
    filters: {
      status(e) {
        if (e == 1) {
          return "提交";
        } else if (e == 0) {
          return "暂存";
        } else if (e == 3) {
          return "出库";
        }
      },
      billType(e) {
        if (e == 0) {
          return "普通发票";
        } else if (e == 1) {
          return "其他";
        } else if (e == 2) {
          return "指定物流";
        } else if (e == 3) {
          return "其他备注";
        }
      },
      paymentTerms(e) {
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
      packageMethod(e) {
        if (e == 1 && e) {
          return "零散装箱";
        } else if (e == 2) {
          return "自提";
        } else if (e == 3) {
          return "简易包装/纸壳";
        } else if (e == 4) {
          return "整箱发货";
        } else if (e == 5) {
          return "整箱发货";
        } else if (e == 6) {
          return "整箱大货/大巴";
        } else if (e == 7) {
          return "木箱";
        } else if (e == 8) {
          return "送货";
        } else if (e == 9) {
          return "其他";
        }
      },
      delivery(e) {
        if (e == 0) {
          return "自提";
        } else if (e == 1) {
          return "送货";
        } else if (e == 2) {
          return "物流代收";
        } else if (e == 3) {
          return "物流不代收";
        }
      },
    },
    methods: {
      getDetails(e) {
        outWarehouseSalesDetails(e).then((res) => {
          if (res.code == 200) {
            this.details = res.data;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
.main {
  width: 686rpx;
  min-height: 1102rpx;
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
  .content {
    width: 622rpx;
    min-height: 440rpx;
    background: #f5f7fb;
    border-radius: 30rpx;
    margin-top: 26rpx;
    padding: 28rpx 32rpx 0rpx 32rpx;
  }
  .flex {
    display: flex;
    padding-bottom: 24rpx;
  }
  .input {
    width: 500rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    word-break: break-all;
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
    width: 400rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    margin-left: 34rpx;
    word-break: break-all;
  }
  .row {
    display: flex;
    margin-top: 20rpx;
  }
}
</style>
