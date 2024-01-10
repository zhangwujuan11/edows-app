<template>
  <view>
    <view class="product">
      <view class="content">
        <view v-if="list && list.length > 0">
          <view class="card" v-for="(item, index) in list" :key="index">
            <view class="crow">
              <view class="flex">
                <image
                  v-if="item.choice"
                  @click="choice(item)"
                  class="check"
                  src="/static/check.png"
                ></image>
                <view v-else @click="choice(item)" class="spacecheck"></view>
                <view class="name">{{ item.orderNo }}</view>
              </view>
              <view
                class="status"
                :style="{
                  background:
                    item.status == 4
                      ? '#cce5ff'
                      : item.status == 1
                      ? '#f9e2cc'
                      : '#d4ffcc',
                }"
              >
                <view
                  :style="{
                    color:
                      item.status == 4
                        ? '#007DFF'
                        : item.status == 1
                        ? '#E07000'
                        : '#28FF00',
                  }"
                  >{{ item.status | status }}</view
                >
              </view>
            </view>
            <view class="main">
              <view class="flex-row">
                <view class="label">开单日期</view>
                <view class="val">{{ item.createTime }}</view>
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
                <view class="val">{{ item.delivery | delivery }}</view>
              </view>
              <view class="flex-row">
                <view class="label">结算方式</view>
                <view class="val">{{ item.paymentTerms | paymentTerms }}</view>
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
                <view class="val">{{ item.createBy }}</view>
              </view>
            </view>
          </view>
          <view
            v-show="is_show"
            style="
              text-align: center;
              width: 100%;
              margin-top: 100rpx;
              margin-bottom: 140rpx;
            "
            >没有更多数据了</view
          >
        </view>
        <view class="no-have" v-else>
          <image src="@/static/16701.png"></image>
          <view>暂无数据</view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="left" @click="cancle">取消</view>
      <view class="right" @click="confirm">确定</view>
    </view>
  </view>
</template>

<script>
import { outList } from "@/Api/purchaseSales.js";
export default {
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      choiceProduct: false,
      is_show: false,
      is_Go: false,
    };
  },
  filters: {
    status(e) {
      if (e == 1) {
        return "已提交";
      } else if (e == 0) {
        return "暂存";
      } else if (e == 4) {
        return "已完成";
      }
    },
    paymentTerms(e) {
      if (e == 1) {
        return "现金付款";
      } else if (e == 2) {
        return "银行转账";
      } else if (e == 3) {
        return "微信";
      } else {
        return "挂账";
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
  onBackPress(event) {
    if (event.from == "navigateBack" && this.is_Go) {
      const pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage = prevPage.$vm;
      if (prevPage && prevPage.conversionSales) {
        prevPage.conversionSales(this.choiceProduct.outWarehouseId, false);
      }
    }
  },
  onLoad() {
    this.getList();
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      this.getList();
    }
  },
  methods: {
    choice(item) {
      if (item.status == 4) {
        uni.showToast({
          title: "已完成订单不可转销售",
          icon: "none",
          duration: 1500,
        });
      } else if (item.status == 0) {
        uni.showToast({
          title: "暂存订单不可转销售",
          icon: "none",
          duration: 1500,
        });
      } else {
        this.list.forEach((ptem, pndex) => {
          if (ptem.outWarehouseId == item.outWarehouseId) {
            this.$set(this.list[pndex], "choice", true);
            this.choiceProduct = ptem;
          } else {
            this.$set(this.list[pndex], "choice", false);
          }
        });
      }
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
      };

      uni.showLoading({
        title: "加载中",
      });
      outList(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = size
              ? res.data.items
              : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          uni.showToast({
            title: `${err.message}`,
            icon: "none",
            duration: 1500,
          });
        });
    },
    cancle() {
      uni.navigateBack({
        delta: 1,
      });
    },
    confirm() {
      if (this.choiceProduct) {
        this.is_Go = true
        uni.navigateBack({
          delta: 1,
        });
      }
    },
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
    background: #f5f7fb;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #010914;
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
  text-align: center;
  margin-top: 260rpx;
  font-size: 32rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  color: #666666;

  uni-image {
    width: 460rpx;
    height: 312rpx;
  }
}
</style>