<template>
  <view style="padding-bottom: 24rpx">
    <view class="top" style=" position: fixed;background-color: #fff; z-index: 999; ">
      <view class="top-first">
        <view class="search">
          <view class="left">
            <view class="label">单据编号</view>
            <!-- <image class="icon" src="/static/bottom.png"></image> -->
          </view>
          <input v-model="orderNo" class="uni-input" placeholder-class="placeholder" placeholder="请输入关键字搜索" />
          <image class="search-icon" src="/static/search.png" @click="search"></image>
        </view>
        <view class="status" @click="openSearch(1)">
          <view class="pla" v-if="currSearch1=='状态'">{{ currSearch1 }}</view>
          <view class="pla" v-else style="color: black;">{{ currSearch1 }}</view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
      <view class="top-date">
        <uni-datetime-picker start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" :border="false" :clear-icon="true"
          ref="date" v-model="range" type="daterange" @change="maskClick">
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
          <view class="status" style="background-color:#fff9c1 ; " v-show="item.status=='提交'">
            <view class="font" style="color: #E07000;" v-show="item.status=='提交'">
              {{ item.status}}
            </view>
          </view>
          <view class="status" style="background-color:#c2e8ff ; " v-show="item.status=='入库'">
            <view class="font" style="color: #008bff;" v-show="item.status=='入库'">
              {{ item.status}}
            </view>
          </view>
          <view class="status" style="background-color:#d4ffcc ; " v-show="item.status=='暂存'">
            <view class="font" style="color: #1CB300;" v-show="item.status=='暂存'">
              {{ item.status}}
            </view>
          </view>
        </view>
        <view class="contain" @click="goDetail(item.outWarehouseId)">
          <view class="row">
            <view class="label">门店名称</view>
            <view class="input" style="  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
width: 300upx;
margin-left: 0;">{{ item.storeName}}</view>
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
            <view class="label">配送方式</view>
            <view class="input">{{ item.delivery }}</view>
          </view>
          <view class="row">
            <view class="label">结算方式</view>
            <view class="input">{{ item.paymentTerms }}</view>
          </view>
          <view class="row">
            <view class="label">制单人</view>
            <view class="input">{{ item.customer }}</view>
          </view>
          <view class="row">
            <view class="label">备注</view>
            <view class="input">{{ item.remark }}</view>
          </view>
        </view>
        <view class="bottom">


          <view class="edit" @click.stop="open1(item)" v-show="item.status!='入库' && item.status!='暂存'">审核通过</view>
          <view class="edit" v-show="item.status!='入库'" @click="edit(item)">修改</view>
          <view class="del" @click.stop="open(item)" v-show="item.status!='入库'">删除</view>

        </view>
      </view>
      <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;padding-bottom: 100upx;">没有更多数据了
      </view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <text>暂无数据</text>
    </view>
    <image class="add" src="/static/add.png" @click="go('/pages/sales/addSaleReturns')"></image>
    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认删除单号为"{{title}}"的数据项？</view>
        <view class="bottom">
          <view class="sure" @click="confirm">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popup1" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel1"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认审核通过单号为"{{title}}"的数据项？</view>
        <view class="bottom">
          <view class="sure" @click="confirm1">确定</view>
          <view class="cancel" @click="cancel1">取消</view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="search" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close">取消</view>
          <view class="title">请选择搜索条件</view>
          <view class="success" @click="success">确定</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in searchList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
    <uni-popup ref="search1" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close1">取消</view>
          <view class="title">请选择状态</view>
          <view class="success" @click="success1">确定</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="value1" @change="bindChange1" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in searchList1" :key="index">{{ item }}</view>
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
    getoutWarehouseReturn,
    deloutWarehouseReturn,
    AuditoutWarehouseReturn
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
        value1: [0],
        searchList: ["单据编号"],
        searchList1: ["入库", '提交', '暂存', '全部'],
        list: [],
        searchValue: "",
        allSelect: false,
        selectList: [],
        currIndex: 0,
        currIndex1: 0,
        currSearch: "单据编号",
        currSearch1: "状态",
        status: "",
        range: ["", ""],
        groundingList: [],
        searchTitle: "",
        params: {
          pageNum: 1,
          pageSize: 100,
        },
        pageNum: 1,
        pageSize: 100,
        total: '',
        title: '',
        outWarehouseId: '',
        currDel: {},
        status: '',
        startDate: '',
        endDate: '',
        orderNo: '',
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
        this.pageNum++;
        this.getList();
      }
    },
    methods: {
      getList(num, size) {
        let params1 = {
          pageNum: num ? num : this.pageNum,
          pageSize: size ? size : this.pageSize,
        }
        params1.orderNo = this.orderNo
        params1.status = this.status
        params1.startDate = this.startDate
        params1.endDate = this.endDate

        uni.showLoading({
          title: "加载中",
        });
        getoutWarehouseReturn(params1).then((res) => {
          if (res.data.items != null) {
            res.data.items.forEach(i => {
              if (i.orderType == 1) {
                i.orderType = '提交'
              } else {
                i.orderType = '出库'
              }
              if (i.status == 1) {
                i.status = '提交'
              } else if (i.status == 0) {
                i.status = '暂存'
              } else {
                i.status = '入库'
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
      open(e) {
        this.$refs.popup.open();
        this.title = e.orderNo
        this.currDel = e;
      },
      open1(e) {
        this.$refs.popup1.open();
        this.title = e.orderNo
        this.currDel = e;
      },
      cancel() {
        this.$refs.popup.close();
      },
      cancel1() {
        this.$refs.popup1.close();
      },
      go(e) {
        uni.navigateTo({
          url: e,
        });
      },
      confirm() {
        uni.showLoading({
          title: "加载中",
        });
        deloutWarehouseReturn(this.currDel.outWarehouseId).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            const number = this.list.length;
            this.getList(1, number);
            this.$refs.popup.close();
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1000,
            });
          }
        });
      },
      confirm1() {
        uni.showLoading({
          title: "加载中",
        });
        this.currDel.orderType == '提交' ? this.currDel.orderType = 1 : this.currDel.orderType = 0
        if (this.currDel.status == '暂存') {
          this.currDel.status = 0
        } else if (this.currDel.status == '提交') {
          this.currDel.status = 1
        } else {
          this.currDel.status = 3
        }
        this.currDel.paymentTerms == '现金付款' ? this.currDel.paymentTerms = 1 : this.currDel.paymentTerms = 0
        if (this.currDel.paymentTerms == '现金付款') {
          this.currDel.paymentTerms = 1
        } else if (this.currDel.paymentTerms == '银行转账') {
          this.currDel.paymentTerms = 2
        } else if (this.currDel.paymentTerms == '微信') {
          this.currDel.paymentTerms = 3
        } else {
          this.currDel.paymentTerms = 0
        }
        if (this.currDel.delivery == '自提') {
          this.currDel.delivery = 0
        } else if (this.currDel.delivery == '送货') {
          this.currDel.delivery = 1
        } else if (this.currDel.delivery == '物流代收') {
          this.currDel.delivery = 2
        } else {
          this.currDel.delivery = 3
        }
        AuditoutWarehouseReturn(this.currDel).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            const number = this.list.length;
            this.getList(1, number);
            this.$refs.popup1.close();
            uni.showToast({
              title: "审核成功",
              icon: "none",
              duration: 1000,
            });
          }
        });
      },
      //修改
      edit(e) {
        uni.navigateTo({
          url: "/pages/sales/editsalesReturn?id=" + e.outWarehouseId
        })
      },
      openSearch(e) {
        switch (e) {
          case 0:
            this.$refs.search.open();
            break;
          case 1:
            this.$refs.search1.open();
            break;
        }
      },
      search() {
        this.pageNum = 1;
        this.list = [];
        this.getList();
      },
      bindChange(e) {
        this.currIndex = e.detail.value[0];
      },
      bindChange1(e) {
        this.currIndex1 = e.detail.value[0];

      },
      success() {
        this.currSearch = this.searchList[this.currIndex];
        this.value[0] = this.currIndex;
        this.$refs.search.close();
      },
      success1() {
        this.currSearch1 = this.searchList1[this.currIndex1];
        this.status = this.searchList1[this.currIndex1]
        this.value1[0] = this.currIndex1;
        if (this.status == "提交") {
          this.status = 1
        } else if (this.status == '暂存') {
          this.status = 0
        } else if (this.status == '入库') {
          this.status = 2
        } else(
          this.status = ''
        )
        this.search();
        this.$refs.search1.close();
      },

      close() {
        this.$refs.search.close();
      },
      close1() {
        this.$refs.search1.close();
      },

      maskClick(e) {
        this.startDate = e[0]
        this.endDate = e[1]
        this.search()
      },
      openDate() {
        this.$refs.date.show();
      },
      openGround() {
        this.$refs.grounding.open();
      },
      choice(item, index) {
        this.$set(this.groundingList[index], "choice", !item.choice);
      },
      closeGround() {
        this.$refs.grounding.close();
      },
      goDetail(e) {
        uni.navigateTo({
          url: `/pages/sales/saleReturnDetails?id=${e}`,
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
      width: 516rpx;
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

    .status {
      width: 150rpx;
      height: 72rpx;
      background: #f1f1f1;
      border-radius: 36rpx 36rpx 36rpx 36rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .pla {
        font-size: 24rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #999999;
      }
    }

    .top-date {
      margin-top: 24rpx;
    }

    .top-date ::v-deep .text-center {
      width: 316rpx;
      height: 66rpx;
      background: #f1f1f1;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .top-date ::v-deep .icon-calendar {
      display: none;
    }
  }

  .list {
    width: 686rpx;
    // height: 660rpx;
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

    .status {
      width: 86rpx;
      height: 46rpx;
      line-height: 46rpx;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      text-align: center;
    }

    .font {
      right: 19rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }

    .contain {
      width: 622rpx;
      // height: 440rpx;
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
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        margin-left: 27rpx;
        width: 500upx;
        word-break: break-all;
      }
    }

    .bottom {
      display: flex;
      margin-top: 28rpx;
      flex-direction: row-reverse;

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
        color: #e80000;
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