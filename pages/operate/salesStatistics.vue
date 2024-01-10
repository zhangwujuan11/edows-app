<template>
  <view style="padding: 24rpx 0rpx">
    <view class="top">
      <view class="header">
        <view class="label">出库销售统计</view>
        <!-- <image class="icon" src="@/static/receipt.png"></image> -->
      </view>
      <view class="charts-box">
        <qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
      </view>
    </view>
    <view class="bottom">
      <view class="header">
        <view class="labeltitle">销售数据</view>
        <!-- <image class="icon" src="@/static/receipt.png"></image> -->
      </view>
      <view class="content">
        <view class="flex">
          <view class="labelone">月份</view>
          <view class="labeltop">今年销售额</view>
          <view class="labeltop">去年销售额</view>
        </view>
        <view class="flex" v-for="(item, index) of list" :key="index">
          <view class="month">{{ item.month }}</view>
          <view class="sales">{{ item.salesRevenueThisYear }}</view>
          <view class="sales">{{ item.lastYearsSales }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  annualMonthlyReport,
  annualMonthlySales,
} from "@/Api/purchaseSales.js";
export default {
  data() {
    return {
      chartData: {},
      opts: {
        color: ["#FF8927", "#5487FF"],
        padding: [30, 10, 0, 15],
        enableScroll: false,
        dataLabel: false,
        legend: {
          position: "top",
          float: "right",
        },
        xAxis: {
          disableGrid: true,
          fontColor: "#999999",
          fontSize: "10",
          marginTop: 8,
          axisLineColor: "#D1D3D5",
          rotateLabel: true,
          rotateAngle: 45,
          calibration: true,
        },
        yAxis: {
          data: [
            {
              min: 0,
              axisLine: false,
              title: "单位",
              titleOffsetX: -20,
              titleOffsetY: -20,
              titleFontSize: 12,
              titleFontColor: "#BEBEBE",
              fontColor: "#BEBEBE",
              fontSize: "11",
              dashLength: 7,
            },
          ],
          gridType: "dash",
          showTitle: true,
          splitNumber: 4,
        },
        extra: {
          line: {
            type: "straight",
            activeType: "hollow",
            width: 1,
          },
        },
      },
      list: [],
    };
  },
  onReady() {
    this.getEcharts();
    this.getList();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      }, 500);
    },
    getList() {
      uni.showLoading({
        title: "加载中",
      });
      annualMonthlyReport()
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = res.data || [];
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
      annualMonthlySales().then((res) => {
        let data = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: res.data.series,
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
  .icon {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }
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
    padding: 28rpx 72rpx 0rpx 32rpx;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24rpx;
  }
  .labeltop {
    min-width: 121rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  .labelone {
    min-width: 60rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  .month {
    min-width: 60rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    text-align: left;
  }
  .sales {
    min-width: 121rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    text-align: center;
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
.charts-box {
  width: 100%;
  height: 440rpx;
}
</style>