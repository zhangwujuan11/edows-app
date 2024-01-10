<template>
  <view style="padding-bottom: 24rpx">
    <view class="top" style=" position: fixed;background-color: #fff; z-index: 999; ">
      <view class="top-first">
        <view class="search">
          <input v-model="params.orderNo" class="uni-input" placeholder-class="placeholder" placeholder="请输入单据编号"
            style="padding-left: 30upx;width: 100%;" />
          <image class="search-icon" src="/static/search.png" @click="search"></image>
        </view>
      </view>
      <view class="top-date">
        <uni-datetime-picker start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" ref="date" :clear-icon="true"
          v-model="range" type="daterange" @change="maskClick" :border="false">
          <template v-slot:icon>
            <image class="icon" src="/static/bottom.png"></image>
          </template>
        </uni-datetime-picker>
      </view>
    </view>
    <view class="top">

    </view>
    <view v-if="list&&list.length > 0">
      <view class="list" v-for="(item, index) in list" :key="index">
        <view class="flex">
          <view class="flex">
            <view class="name">{{ item.orderNo }}</view>
          </view>
          <view class="font"
            style="color: #00d400;background-color:#c7ffbb ;font-size: 24upx; width: 86upx; height: 46upx; text-align: center; line-height: 46upx; border-radius: 10upx;"
            v-show="item.status=='暂存'">
            {{ item.status}}
          </view>
          <view class="font"
            style="color: #008bff;background-color:#c2e8ff ; font-size: 24upx; width: 86upx; height: 46upx; text-align: center; line-height: 46upx; border-radius: 10upx;"
            v-show="item.status=='已出库'">
            {{ item.status}}
          </view>
        </view>
        <view class="contain" @click="goDetail(item.outWarehouseId)">
          <view class="row">
            <view class="label">门店名称</view>
            <view class="input" style="  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
width: 300upx;">{{ item.storeName }}</view>
          </view>
          <view class="row">
            <view class="label">单据日期</view>
            <view class="input">{{ item.documentDate }}</view>
          </view>
          <view class="row">
            <view class="label">往来客户</view>
            <view class="input">{{ item.customer }}</view>
          </view>
          <view class="row">
            <view class="label">车主姓名</view>
            <view class="input">{{ item.carOwnerName }}</view>
          </view>
          <view class="row">
            <view class="label">配送方式</view>
            <view class="input">{{ item.delivery }}</view>
          </view>
          <view class="row">
            <view class="label">结算方式</view>
            <view class="input">{{ item.paymentTerms }}</view>
          </view>
          <view class="row">
            <view class="label">进厂日期</view>
            <view class="input">
              <uni-dateformat :date=" item.enteringTheFactoryDate"></uni-dateformat>
            </view>
          </view>
          <view class="row">
            <view class="label">到期日期</view>
            <view class="input">
              <uni-dateformat :date=" item.expirationDate"></uni-dateformat>
            </view>
          </view>
          <view class="row">
            <view class="label">车辆类别</view>
            <view class="input">{{ item.vehicleCategory }}</view>
          </view>
          <view class="row">
            <view class="label">备注</view>
            <view class="input">{{ item.remark }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="del" @click.stop="open(item)" style="background-color: #f4f7fd;">修改</view>
          <!-- <view class="edit">打印1</view> -->
          <!-- <view class="edit">打印2</view> -->
          <!-- <view class="edit">打印</view> -->
          <!-- <view class="edit" @click.stop="openGround">指定上架</view> -->
        </view>
      </view>
      <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;padding-bottom: 100upx;">没有更多数据了
      </view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <text>暂无数据</text>
    </view>
    <image class="add" src="/static/add.png" @click="go('/pages/sales/addFrontendInvoicing')"></image>
    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认删除单号为"RC2023100300 0001"的数据项？</view>
        <view class="bottom">
          <view class="sure" @click="confirm">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="search" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close">取消</view>
          <view class="title">{{ searchTitle }}</view>
          <view class="success" @click="success">确定</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in searchList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import uniDatetimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
  import {
    getoutWarehouseForeground,
    detailoutWarehouseForeground
  } from "@/Api/ww.js"
  export default {
    components: {
      uniPopup: uniPopup,
      uniDatetimePicker: uniDatetimePicker,
    },
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        value: [0],
        searchList: ["全部", "门店名称"],
        list: [],
        searchValue: "",
        allSelect: false,
        selectList: [],
        currIndex: 0,
        currSearch: "全部",
        status: "",
        statuList: ["正常", "提交"],
        range: ["", ""],
        groundingList: [{
            check: false,
            title: "用户编号展示",
            name: "fq-admin",
            nickname: "易道大咖-体验门店",
            phone: "13888888888",
          },
          {
            check: false,
            title: "用户编号展示",
            name: "fq-admin",
            nickname: "易道大咖-体验门店",
            phone: "13888888888",
          },
        ],
        searchTitle: "",
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        aa: false
      };
    },
    computed: {
      selectSum() {
        return this.selectList.length;
      },
    },
    onLoad() {
      this.getList()
    },
    onReachBottom() {
      if (this.list.length == this.total) {
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
        getoutWarehouseForeground(this.params).then((res) => {
          if (res.data.items != null) {
            res.data.items.forEach(i => {
              if (i.status == 0) {
                i.status = '暂存'
              } else {
                i.status = '已出库'
              }
              if (i.delivery == 0) {
                i.delivery = '自提'
              } else if (i.delivery == 1) {
                i.delivery = '送货'
              } else if (i.delivery == 2) {
                i.delivery = '物流代收'
              } else {
                i.delivery = '物流不代收'
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
            this.list = size ? res.data.items : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        });
      },
      // 搜索
      search() {
        this.params.pageNum = 1;
        this.list = [];
        this.getList();
      },
      open(e) {
        uni.navigateTo({
          url: "/pages/sales/editFrontendInvoicing?id=" + e.outWarehouseId
        })
      },
      cancel() {
        this.$refs.popup.close();
      },
      go(e) {
        uni.navigateTo({
          url: e,
        });
      },
      openSearch(e) {
        this.$refs.search.open();
        switch (e) {
          case 0:
            this.searchTitle = "请选择搜索条件";
            break;
          case 1:
            this.searchTitle = "请选择对话";
            break;
        }
      },
      bindChange(e) {
        this.currIndex = e.detail.value[0];
      },
      success() {
        this.currSearch = this.searchList[this.currIndex];
        this.value[0] = this.currIndex;
        this.$refs.search.close();
      },
      close() {
        this.$refs.search.close();
      },
      maskClick(e) {
        console.log(e);
        this.params.startDate = e[0]
        this.params.endDate = e[1]
        this.params.pageNum = 1;
        this.list = [];
        this.getList();
      },
      openDate() {
        this.$refs.date.show();
      },

      choice(item, index) {
        this.$set(this.groundingList[index], "choice", !item.choice);
      },
      closeGround() {
        this.$refs.grounding.close();
      },
      goDetail(e) {
        uni.navigateTo({
          url: `/pages/sales/receptionDetails?id=${e}`,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    height: 186rpx;
    background: #ffffff;
    padding: 0rpx 32rpx 24rpx 32rpx;

    .top-first {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .search {
      width: 686rpx;
      height: 72rpx;
      background: #f1f1f1;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      position: relative;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .label {
      white-space: nowrap;
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
      margin-left: 32rpx;
    }

    .icon {
      width: 28rpx;
      height: 28rpx;
      margin-left: 10rpx;
    }

    .placeholder {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }

    .uni-input {
      margin-left: 16rpx;
    }

    .search-icon {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 20rpx;
    }

    .top-date {
      margin-top: 24rpx;
    }

    .top-date ::v-deep .uni-date__x-input {
      width: 316rpx;
      height: 66rpx;
      background: #f1f1f1;
      border-radius: 40rpx;
      display: flex;
      padding-left: 60upx;
      align-items: center;
    }

    .top-date ::v-deep .icon-calendar {
      display: none;
    }
  }

  .list {
    width: 686rpx;
    // height: 830rpx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
    margin: 24rpx auto;
    border-radius: 30rpx;
    padding: 24rpx 32rpx 32rpx 32rpx;

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    .name {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      margin-left: 20rpx;
    }

    .contain {
      width: 622rpx;
      // height: 622rpx;
      background: #f5f7fb;
      margin-top: 22rpx;
      padding: 28rpx 32rpx 28rpx 32rpx;
      border-radius: 20rpx;

      .row {
        display: flex;
        margin-bottom: 24rpx;
      }

      .label {
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        width: 121rpx;
        height: 35rpx;
      }

      .input {
        width: 400upx;
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        margin-left: 27rpx;
        word-break: break-all;
      }
    }

    .bottom {
      display: flex;
      margin-left: 470upx;
      margin-top: 28rpx;

      .del {
        width: 140rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        background: #fbf5f5;
        border-radius: 40rpx;
        font-size: 24rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #007dff;
      }

      .edit {
        width: 140rpx;
        height: 72rpx;
        background: #f5f7fb;
        line-height: 72rpx;
        text-align: center;
        border-radius: 40rpx;
        font-size: 24rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #007dff;
        margin-left: 20rpx;
      }
    }
  }

  .add {
    width: 88rpx;
    height: 88rpx;
    position: fixed;
    bottom: 185rpx;
    right: 32rpx;
  }

  .tipmask {
    width: 616rpx;
    height: 490rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 28rpx 40rpx 50rpx 37rpx;
    position: relative;

    .title {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #333333;
    }

    .sigh {
      width: 88rpx;
      height: 88rpx;
      margin: 0 auto;
      display: block;
      margin-top: 40rpx;
    }

    .content {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #666666;
      margin: 24rpx auto;
      margin-bottom: 32rpx;
    }

    .close {
      width: 60rpx;
      height: 60rpx;
      position: absolute;
      right: 10rpx;
      top: 10rpx;
    }

    .bottom {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .cancel {
        width: 260rpx;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        background: #f5f7fb;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        font-size: 28rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #010914;
      }

      .sure {
        width: 260rpx;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        background: #007dff;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        font-size: 28rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }

  .picker-view {
    width: 750rpx;
    height: 500rpx;
  }

  .item {
    line-height: 100rpx;
    text-align: center;
  }

  .mask {
    background-color: #ffffff;

    .row {
      display: flex;
      justify-content: space-between;
      padding: 18px 16px 18px 16px;
    }

    .title {
      font-size: 36rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #303133;
    }

    .success {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      color: #007dff;
    }

    .close {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }

  .grounding {
    .header {
      width: 750rpx;
      height: 120rpx;
      line-height: 120rpx;
      background: #ffffff;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }

    .title {
      font-size: 36rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #303133;
      text-align: center;
      position: relative;
    }

    .fork {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 32rpx;
      top: 44rpx;
    }

    .content {
      height: 900rpx;
      background: #f1f1f1;
      padding: 24rpx 32rpx 24rpx 32rpx;
      overflow-y: auto;
      padding-bottom: 148rpx;
    }

    .card {
      width: 686rpx;
      height: 347rpx;
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
    }

    .main {
      width: 622rpx;
      height: 209rpx;
      background: #f5f7fb;
      margin-top: 20rpx;
      border-radius: 20rpx;
      padding: 28rpx 32rpx 28rpx 32rpx;
    }

    .flex-row {
      display: flex;
      margin-bottom: 24rpx;
    }

    .label {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
      width: 114rpx;
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

    .bottom {
      width: 750rpx;
      height: 148rpx;
      background: #ffffff;
      box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn {
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      background: #007dff;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
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

    uni-image {
      width: 460rpx;
      height: 312rpx;
    }
  }
</style>