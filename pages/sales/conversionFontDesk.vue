<template>
  <view>
    <view class="product">
      <view class="content" v-if="productList&&productList.length > 0">
        <view class="card" v-for="(item, index) in productList" :key="index">
          <view class="crow">
            <view class="flex">
              <image v-if="item.orderNo==orderNo" @click="choice(item, index)" class="check" src="/static/check.png">
              </image>
              <view v-else @click="choice(item, index)" class="spacecheck"></view>
              <view class="name">{{ item.orderNo }}</view>
            </view>
            <view class="status" style="background-color:#fff9c1 ; " v-show="item.status=='已提交'">
              <view style="color: #ffc262;" v-show="item.status=='已提交'">{{ item.status }}
              </view>
            </view>
            <view class="status" style="background-color:#c7ffbb ; " v-show="item.status=='暂存'">
              <view style="color: #00d500;" v-show="item.status=='暂存'">{{ item.status }}
              </view>
            </view>
            <view class="status" style="background-color:#c2e8ff ; " v-show="item.status=='已完成'">
              <view style="color: #007DFF;" v-show="item.status=='已完成'">{{ item.status }}
              </view>
            </view>
          </view>
          <view class="main">
            <view class="flex-row">
              <view class="label">开单日期</view>
              <view class="val">
                <uni-dateformat :date="item.documentDate"></uni-dateformat>
              </view>
            </view>
            <view class="flex-row">
              <view class="label">客户名称</view>
              <view class="val">{{ item.customer }}</view>
            </view>
            <view class="flex-row">
              <view class="label">车牌号</view>
              <view class="val">{{ item.plateNumber }}</view>
            </view>
            <view class="flex-row">
              <view class="label">车主姓名</view>
              <view class="val">{{ item.carOwnerName }}</view>
            </view>
            <view class="flex-row">
              <view class="label">联系电话</view>
              <view class="val">{{ item.phoneNumber }}</view>
            </view>
            <view class="flex-row">
              <view class="label">配送方式</view>
              <view class="val">{{ item.delivery }}</view>
            </view>
            <view class="flex-row">
              <view class="label">结算方式</view>
              <view class="val">{{ item.paymentTerms }}</view>
            </view>
            <view class="flex-row">
              <view class="label">产品合计</view>
              <view class="val">{{ item.productAmount }}</view>
            </view>
            <view class="flex-row">
              <view class="label">接车人</view>
              <view class="val">{{ item.constructionWork }}</view>
            </view>
            <view class="flex-row">
              <view class="label">制单人</view>
              <view class="val">{{ item.updateBy }}</view>
            </view>
          </view>
        </view>
        <view v-show="aa" style="text-align: center; width: 100%; margin-top: 100upx;margin-bottom: 100upx;">没有更多数据了
        </view>

      </view>
      <view class="no-have" v-else>
        <image src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
    </view>
    <view class="bottom">
      <view class="left" @click="close">取消</view>
      <view class="right" @click="sure">确定</view>
    </view>
  </view>
</template>

<script>
  import {
    getoutWarehouse
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        productList: [],
        params: {
          pageNum: 1,
          pageSize: 100,
        },
        total: '',
        orderNo: '',
        outWarehouseId: '',
        aa: false
      };
    },
    onLoad() {
      this.getList()
    },
    onReachBottom() {
      if (this.productList.length == this.total) {
        this.aa = true
      } else {
        this.params.pageNum++;
        this.getList();
      }
    },
    methods: {
      getList(num, size) {
        this.params.pageNum = num ? num : this.params.pageNum
        this.params.pageSize = size ? size : this.params.pageSize
        uni.showLoading({
          title: "加载中",
        });
        getoutWarehouse(this.params).then((res) => {
          console.log(res);
          if (res.data.items != null) {
            res.data.items.forEach(i => {
              if (i.delivery == 0) {
                i.delivery = '自提'
              } else if (i.delivery == 1) {
                i.delivery = '送货'
              } else if (i.delivery == 2) {
                i.delivery = '物流代收'
              } else {
                i.delivery = '物流不代收'
              }

              if (i.status == 0) {
                i.status = '暂存'
              } else if (i.status == 1) {
                i.status = '已提交'
              } else {
                i.status = '已完成'
              }

              if (i.paymentTerms == 1) {
                i.paymentTerms = '现金付款'
              } else if (i.paymentTerms == 2) {
                i.paymentTerms = '银行转账'
              } else if (i.paymentTerms == 3) {
                i.paymentTerms = '微信'
              } else {
                i.paymentTerms = '挂账'
              }
            })
          }
          if (res.code == 200) {
            uni.hideLoading();
            this.productList = size ? res.data.items : [...this.productList, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        });
      },
      choice(item) {
        if (item.status == '已完成') {
          uni.showToast({
            title: "已完成不能选择",
            icon: "none",
            duration: 1000,
          });
          this.orderNo = ''
          this.outWarehouseId = ''
          uni.hideLoading()
        } else if (item.status == '暂存') {
          uni.showToast({
            title: "暂存不能选择",
            icon: "none",
            duration: 1000,
          });
          this.orderNo = ''
          this.outWarehouseId = ''
          uni.hideLoading()
        } else {
          this.orderNo = item.orderNo
          this.outWarehouseId = item.outWarehouseId
        }
      },
      sure() {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        prevPage.$vm.otherFun(this.outWarehouseId); //重点$vm
        uni.navigateBack({
          data: 1
        })

      },
      close() {
        uni.navigateBack({
          data: 1
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .product {
    .search {
      width: 686rpx;
      height: 72rpx;
      background: #f1f1f1;
      margin: 0 auto;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      position: relative;
      top: 90rpx;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .left-label {
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
      margin-left: 32rpx;
    }

    .placeholder {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }

    .uni-input {
      margin-left: 32rpx;
    }

    .search-icon {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 20rpx;
    }

    .title {
      font-size: 36rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #303133;
      text-align: center;
      position: relative;
      top: 34rpx;
    }

    .fork {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 32rpx;
      top: 10rpx;
    }

    .content {
      background: #f1f1f1;
      padding: 24rpx 32rpx 24rpx 32rpx;
      overflow-y: auto;
      padding-bottom: 148rpx;
    }

    .card {
      width: 686rpx;
      height: 760rpx;
      background: #ffffff;
      box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
      border-radius: 20rpx;
      margin-bottom: 24rpx;
      padding: 26rpx 32rpx 32rpx 32rpx;
    }

    .check {
      width: 60rpx;
      height: 60rpx;
    }

    .crow {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .flex {
      display: flex;
      align-items: center;
    }

    .spacecheck {
      width: 60rpx;
      height: 60rpx;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }

    .name {
      margin-left: 20rpx;
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status {
      width: 86rpx;
      height: 46rpx;
      line-height: 46rpx;
      text-align: center;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }

    .main {
      width: 622rpx;
      min-height: 622rpx;
      background: #f5f7fb;
      padding: 28rpx 32rpx 0rpx 32rpx;
      border-radius: 30rpx;
      margin-top: 28rpx;
    }

    .flex-row {
      display: flex;
      padding-bottom: 24rpx;
    }

    .label {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
      width: 146rpx;
      height: 35rpx;
      line-height: 35rpx;
    }

    .val {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      margin-left: 34rpx;
    }
  }

  .bottom {
    width: 750rpx;
    height: 148rpx;
    background: #ffffff;
    box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0rpx;

    .left {
      width: 330rpx;
      height: 88rpx;
      line-height: 88rpx;
      background: #007dff;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #ffffff;
    }

    .right {
      width: 330rpx;
      height: 88rpx;
      line-height: 88rpx;
      background: #007dff;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #ffffff;
    }
  }

  .no-have {
    padding-top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>