<template>
  <view style="padding: 24rpx 0rpx">
    <view class="top">
      <view class="header">
        <view class="label">产品销售额汇总</view>
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
      <view class="charts-box" v-if="chartData.series && chartData.series[0].data.length > 0">
        <qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
      </view>
    </view>
    <view class="bottom">
      <view class="header">
        <view class="labeltitle">销售明细表</view>
        <!-- <image class="icon" src="@/static/receipt.png"></image> -->
      </view>
      <view class="content" v-for="(item, index) of list" :key="index">
        <view class="flex">
          <view class="label">门店名称</view>
          <view class="input">{{ item.name }}</view>
        </view>
        <view class="flex">
          <view class="label">入库金额</view>
          <view class="input">{{ item.money }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  inWarehouseProductAmountChart,
  currentMonthInWarehouseMoney,
} from "@/Api/purchaseSales.js";
export default {
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      index: 0,
      date: currentDate,
      list: [],
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
        padding: [30, 15, 0, 5],
        enableScroll: false,
        dataLabel: false,
        legend: {
          show: false,
        },
        xAxis: {
          disableGrid: true,
          fontColor: "#999999",
          fontSize: "11",
          marginTop: 8,
          axisLineColor: "#D1D3D5",
          rotateLabel: true,
          rotateAngle: 20,
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
            width: 24,
            activeBgColor: "#ffffff",
            activeBgOpacity: 0.08,
            linearType: "custom",
            customColor: ["#47A1FF", "#007DFF"],
          },
        },
      },
      pageNum: 1,
      pageSize: 10,
    };
  },
  onReady() {
    this.getEcharts();
    this.getList();
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
        duration: 1000,
      });
    } else {
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
      inWarehouseProductAmountChart(params)
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
    getEcharts() {
      currentMonthInWarehouseMoney({ date: this.date }).then((res) => {
        let data = {
          categories: res.data.xaxis.data,
          series: [
            {
              name: "",
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
  height: 547rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
  margin: 0rpx auto;
  border-radius: 30rpx;
  padding: 32rpx;
  position: relative;
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
  height: 340rpx;
  margin-top: 44rpx;
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
    min-height: 145rpx;
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
</style>