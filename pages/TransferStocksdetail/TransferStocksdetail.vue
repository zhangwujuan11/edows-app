<template>
  <view>
    <view class="content">
      <view class="top">
        <view class="liconceng1" style="   font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #333333;">
          <text>单据编号：{{form.orderNo}}</text>
        </view>
        <view class="liconceng1">
          <text>移出门店 : </text>
          <text>{{form.outWarehouseName}}</text>
        </view>
        <view class="liconceng1">
          <text>移入门店 : </text>
          <text>{{form.inWarehouseName}}</text>
        </view>
        <view class="liconceng1">
          <text>经 办 人：</text>
          <text>{{form.agentUser}}</text>
        </view>
        <view class="liconceng1">
          <text>单据类型：</text>
          <text>{{form.orderType}}</text>
        </view>
        <view class="liconceng1">
          <text>备 注：</text>
          <text>{{form.remark}}</text>
        </view>
      </view>
      <view class="licon" v-for="(item, index) in form.transferDetailList" :key="index">
        <view class="liconceng">
          <text>产品名称</text>
          <view>{{ item.productName }}</view>
        </view>
        <view class="liconceng">
          <text>新库位</text>
          <view>{{ item.position }}</view>
        </view>
        <view class="liconceng">
          <text>旧库位</text>
          <view>{{ item.oldPosition }}</view>
        </view>
        <view class="liconceng">
          <text>carg</text>
          <view>{{ item.carg }}</view>
        </view>
        <view class="liconceng">
          <text>数量</text>
          <view>{{ item.quantity }}</view>
        </view>
        <view class="liconceng">
          <text>备注</text>
          <view>{{ item.remark }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    detailTransferStocks
  } from "@/Api/ww.js"
  export default {
    data() {
      return {

        form: {}
      }
    },
    async onLoad(e) {
      this.getlist(e.id)
    },
    methods: {
      async getlist(id) {
        const res = await detailTransferStocks(id)
        this.form = res.data
        if (this.form.orderType == 1) {
          this.form.orderType = "移库"
        } else {
          this.form.orderType = "调拨"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 686upx;
    // height: 1360upx;
    margin-top: 24upx;
    margin-left: 32upx;
    border-radius: 30upx;
    background-color: #fff;
    padding-left: 32upx;
    padding-right: 32upx;
    padding-bottom: 20upx;

    .top {
      padding-top: 32upx;
    }

    .licon {
      width: 622upx;
      // height: 300upx;
      background-color: #F5F7FB;
      border-radius: 10upx;
      padding: 28upx 32upx;
      box-sizing: border-box;
      margin-top: 28upx;
      color: #333333;
      font-size: 26upx;
      margin-bottom: 10upx;
    }

    .liconceng1 {
      font-size: 24upx;
      margin-top: 20upx;
      word-break: break-all;
      width: 600upx;
    }

    .liconceng text {
      color: #999999;
      width: 160upx !important;
      display: block;
      margin-right: 34upx;
    }

    .liconceng view {
      width: 410upx;
    }

    .liconceng {
      font-size: 24upx;
      word-break: break-all;
      width: 560upx;
      margin-top: 20upx;
      margin-bottom: 24upx;
      display: flex;
      align-items: center;
    }

  }
</style>