<template>
  <view style="padding: 24rpx 0rpx">
    <view class="top">
      <view class="header">
        <view class="label">入库明细汇总</view>
        <picker
          class="date"
          mode="date"
          :value="date"
          @change="bindDateChange"
          fields="month"
        >
          <view class="uni-input">{{ date }}</view>
          <image class="icon" src="@/static/blue_bottom.png"></image>
        </picker>
      </view>
      <view
        class="charts-box"
        v-if="chartData.series && chartData.series[0].data.length > 0"
      >
        <qiun-data-charts
          type="column"
          :opts="opts"
          :chartData="chartData"
          :ontouch="true"
        />
      </view>
      <view class="no-have" v-else>
        <image src="@/static/16701.png"></image>
        <view>暂无数据</view>
      </view>
    </view>
    <view class="bottom" v-if="list && list.length > 0">
      <view class="header">
        <view class="labeltitle">入库明细表</view>
        <!-- <image class="icon" src="@/static/receipt.png"></image> -->
      </view>
      <view class="content" v-for="(item, index) of list" :key="index">
        <view class="flex">
          <view class="label">单号</view>
          <view class="input">{{ item.orderNo }}</view>
        </view>
        <view class="flex">
          <view class="label">单据类别</view>
          <view class="input">{{ item.orderCategory | orderCategory }}</view>
        </view>
        <view class="flex">
          <view class="label">产品名称</view>
          <view class="input">{{ item.productName }}</view>
        </view>
        <view class="flex">
          <view class="label">carg</view>
          <view class="input">{{ item.carg }}</view>
        </view>
        <view class="flex">
          <view class="label">价格</view>
          <view class="input">{{ item.price }}</view>
        </view>
        <view class="flex">
          <view class="label">数量</view>
          <view class="input">{{ item.receivalQuantity }}</view>
        </view>
        <view class="flex">
          <view class="label">供应商编号</view>
          <view class="input">{{ item.vendorCode }}</view>
        </view>
        <view class="flex">
          <view class="label">供应商名称</view>
          <view class="input">{{ item.vendorName }}</view>
        </view>
        <view class="flex">
          <view class="label">门店编码</view>
          <view class="input">{{ item.warehouseCode }}</view>
        </view>
        <view class="flex">
          <view class="label">门店名称</view>
          <view class="input">{{ item.warehouseName }}</view>
        </view>
        <view class="flex">
          <view class="label">折率</view>
          <view class="input">{{ item.discountRate }}</view>
        </view>
        <view class="flex">
          <view class="label">创建时间</view>
          <view class="input">{{ item.createTime }}</view>
        </view>
        <view class="flex">
          <view class="label">状态</view>
          <view class="input">{{ item.status | status }}</view>
        </view>
      </view>
    </view>
    <view
      v-show="is_show"
      style="
        text-align: center;
        width: 100%;
        line-height: 100rpx;
        margin-bottom: 40rpx;
        margin-top: 40rpx;
      "
      >没有更多数据了</view
    >
  </view>
</template>

<script>
import {
  inWarehouseSummary,
  inWarehouseProductAmount,
} from "@/Api/purchaseSales.js";
export default {
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      index: 0,
      date: currentDate,
      chartData: {},
      opts: {
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [15, 15, 0, 5],
        touchMoveLimit: 24,
        enableScroll: true,
        dataLabel: true,
        legend: {
          show: false,
        },
        xAxis: {
          disableGrid: true,
          scrollShow: true,
          itemCount: 4,
          labelCount: 2,
          fontColor: "#999999",
          fontSize: "11",
          marginTop: 8,
          axisLineColor: "#D1D3D5",
        },
        yAxis: {
          data: [
            {
              min: 0,
              axisLine: false,
              title: "",
              titleOffsetX: -20,
              titleOffsetY: -20,
              titleFontSize: 12,
              titleFontColor: "#BEBEBE",
              fontColor: "#BEBEBE",
              fontSize: "11",
              dashLength: 7,
            },
          ],
          splitNumber: 4,
          gridType: "dash",
          showTitle: true,
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            width: 16,
            linearType: "custom",
            customColor: ["#47A1FF", "#007DFF"],
          },
        },
      },
      list: [],
      pageNum: 1,
      pageSize: 10,
      is_show: false,
    };
  },
  filters: {
    orderCategory(e) {
      if (e == "1") {
        return "常规入库";
      } else {
        return "采购入库";
      }
    },
    status(e) {
      if (e == 1) {
        return "待审核";
      } else if (e == 0) {
        return "保存";
      } else if (e == 2) {
        return "入库";
      }
    },
  },
  onReady() {
    this.getEcharts();
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
    bindDateChange(e) {
      this.date = e.detail.value;
      this.list = [];
      this.pageNum = 1;
      this.pageSize = 10;
      this.getList();
      this.getEcharts();
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      return `${year}-${month}`;
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        date: this.date,
      };

      uni.showLoading({
        title: "加载中",
      });
      inWarehouseSummary(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = size
              ? res.data.items
              : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
          if (this.list && this.list.length == 0) {
            this.is_show = false;
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
    getEcharts() {
      inWarehouseProductAmount({ date: this.date }).then((res) => {
        let transfer = res.data.xaxis.data.map((item) => {
          return item.length > 17 ? item.substring(0, 17) + "..." : item;
        });
        let data = {
          categories: transfer,
          series: [
            {
              name: '',
              data: res.data.series[0].data,
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(data));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 686rpx;
  min-height: 547rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
  margin: 0rpx auto;
  border-radius: 30rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .label {
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 600;
    color: #333333;
  }

  .date {
    width: 166rpx;
    height: 50rpx;
    background: #e5f2ff;
    border-radius: 25rpx 25rpx 25rpx 25rpx;
    font-size: 24rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #007dff;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .icon {
      display: inline-block;
    }

    ::v-deep .uni-input {
      display: inline-block;
    }
  }

  .icon {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }
}

.charts-box {
  width: 100%;
  height: 600rpx;
}

.bottom {
  width: 686rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
  padding: 32rpx;
  margin: 0 auto;
  border-radius: 30rpx;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .labeltitle {
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }

  .icon {
    width: 32rpx;
    height: 32rpx;
  }

  .content {
    width: 622rpx;
    min-height: 790rpx;
    background: #f5f7fb;
    margin-top: 28rpx;
    border-radius: 30rpx;
    padding: 28rpx 32rpx 0rpx 32rpx;
  }

  .flex {
    display: flex;
    padding-bottom: 24rpx;
  }

  .label {
    width: 121rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }

  .input {
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    margin-left: 27rpx;
    width: 410rpx;
  }
}

.no-have {
  text-align: center;
  padding-top: 60rpx;
  font-size: 32rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  color: #666666;

  uni-image {
    width: 460rpx;
    height: 312rpx;
  }
}
</style>