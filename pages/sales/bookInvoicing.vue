<template>
  <view style="padding-bottom: 148rpx">
    <view class="top" style=" position: fixed;background-color: #fff; z-index: 999; ">
      <view class="top-first">
        <view class="search">
          <view class="left" @click="openSearch(0)">
            <view class="label">{{ currSearch }}</view>
            <image class="icon" src="/static/bottom.png"></image>
          </view>
          <input v-model="searchValue" class="uni-input" placeholder-class="placeholder" placeholder="请输入关键字搜索" />
          <image class="search-icon" src="/static/search.png" @click="search"></image>
        </view>
        <view class="status" @click="openSearch(1)">
          <view class="pla" v-if='currSearch1=="结算方式"'>{{ currSearch1 }}</view>
          <view class="pla" style="color: #000;" v-else>{{ currSearch1 }}</view>
          <view></view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
      <view class="top-second">
        <view class="top-date">
          <uni-datetime-picker start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" :border="false" :clear-icon="true"
            ref="date" v-model="range" type="daterange" @change="maskClick">
            <template v-slot:icon>
              <image class="icon" src="/static/bottom.png"></image>
            </template>
          </uni-datetime-picker>
        </view>
        <view class="statussecond" @click="openSearch(2)">
          <view class="pla" v-if='currSearch2=="状态"'>{{ currSearch2 }}</view>
          <view class="pla" style="color: #000;" v-else>{{ currSearch2 }}</view>
          <view></view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
    </view>
    <view class="top">

    </view>
    <view v-if="list && list.length > 0">
      <view class="list" v-for="(item, index) in list" :key="index">
        <view class="flex">
          <view class="flex">
            <!-- <image v-if="item.chioce" @click="chioce(item, index)" class="chioce" src="/static/check.png"></image> -->
            <!-- <view v-else @click="chioce(item, index)" class="spacecheck" src="/static/select.png"></view> -->
            <view class="name">{{ item.orderNo }}</view>
          </view>
          <view class="status"
            :style="{ background: item.status == '已完成' ? '#cce5ff' : item.status == '提交' ? '#fff9c1' : '#d4ffcc' }">
            <view class="font"
              :style="{ color: item.status == '已完成' ? '#007DFF' : item.status == '提交' ? '#E07000' : '#1CB300' }">
              {{ item.status }}
            </view>
          </view>
        </view>
        <view class="contain" @click="goDetail(item)">
          <view class="row">
            <view class="label">客户名称</view>
            <view class="input">{{ item.customer }}</view>
          </view>
          <view class="row">
            <view class="label">开单日期</view>
            <view class="input">{{ item.createTime }}</view>
          </view>
          <view class="row">
            <view class="label">车牌号</view>
            <view class="input">{{ item.plateNumber }}</view>
          </view>
          <view class="row">
            <view class="label">车主姓名</view>
            <view class="input">{{ item.carOwnerName }}</view>
          </view>
          <view class="row">
            <view class="label">联系电话</view>
            <view class="input">{{ item.phoneNumber }}</view>
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
            <view class="label">产品合计</view>
            <view class="input">{{ item.productAmount }}</view>
          </view>
          <view class="row">
            <view class="label">接车人</view>
            <view class="input">{{ item.constructionWork }}</view>
          </view>
          <view class="row">
            <view class="label">制单人</view>
            <view class="input">{{ item.createBy }}</view>
          </view>
          <view class="row">
            <view class="label">备注</view>
            <view class="input">{{ item.remark }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="del" @click="open(item)" v-show="item.status != '已完成'">删除</view>
          <view class="edit" v-show="item.status != '已完成'" @click="edit(item)">修改</view>
          <!-- <view class="edit">打印1</view>
       <view class="edit">打印2</view> -->
        </view>
      </view>
      <view v-show="aa" style="text-align: center; margin-top: 100upx;width: 100%;">
        没有更多数据了
      </view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <text>暂无数据</text>
    </view>
    <image class="add" src="/static/add.png" @click="go('/pages/sales/addOutbound')"></image>

    <!--   <view class="operate">
      <view class="flex">
        <image @click="selectAll" v-if="allSelect" class="chioce" src="/static/check.png"></image>
        <view @click="selectAll" v-else class="spacecheck" src="/static/select.png"></view>
        <view class="all">全选</view>
        <view class="tip">共选择：{{ selectSum }}条</view>
      </view>
      <view class="delbtn">删除</view>
    </view> -->

    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认删除单号为"{{ id }}"的数据项？</view>
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
    getoutWarehouse,
    deloutWarehouse
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
        searchList: [],
        list: [],
        searchValue: "",
        allSelect: false,
        selectList: [],
        currIndex: 0,
        currIndex1: 0,
        currIndex2: 0,
        currSearch: "单据编号",
        currSearch1: "结算方式",
        currSearch2: "状态",
        status: "",
        statuList: ["正常", "提交"],
        range: ["", ""],
        searchTitle: "",
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        pageNum: 1,
        pageSize: 10,
        total: '',
        id: '',
        outWarehouseId: '',
        openIndex: "",
        paymentTerms: '',
        status: '',
        startDate: '',
        endDate: '',
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

        switch (this.currSearch) {
          case '单据编号':
            params1.orderNo = this.searchValue;
            break;
          case '车牌号':
            params1.plateNumber = this.searchValue;
            break;
          case '往来客户':
            params1.customer = this.searchValue;
            break;
          case '联系电话':
            params1.phoneNumber = this.searchValue;
            break;
        }

        params1.status = this.status
        params1.paymentTerms = this.paymentTerms
        params1.startDate = this.startDate
        params1.endDate = this.endDate

        getoutWarehouse(params1).then((res) => {
          if (res.data.items != null) {
            res.data.items.forEach(i => {
              if (i.status == 1) {
                i.status = '提交'
              } else if (i.status == 4) {
                i.status = '已完成'
              } else {
                i.status = '暂存'
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
          uni.showLoading({
            title: "加载中",
          });
          if (res.code == 200) {
            uni.hideLoading();
            this.list = size ? res.data.items : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;

          }
        });
      },
      search() {
        this.params.pageNum = 1;
        this.list = [];
        this.getList();
      },
      open(e) {
        this.outWarehouseId = e.outWarehouseId
        this.id = e.orderNo
        this.$refs.popup.open();
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
        switch (e) {
          case 0:
            this.searchList = ["单据编号", '车牌号', '往来客户', '联系电话'],
              this.$refs.search.open();
            this.searchTitle = "请选择搜索条件";
            break;
          case 1:
            this.searchList = ["现金付款", '银行转账', '微信', '挂账', '全部'],
              this.$refs.search.open();
            this.searchTitle = "请选择结算方式";
            break;
          case 2:
            this.searchList = ['暂存', "提交", '已完成', '全部'],
              this.$refs.search.open();
            this.searchTitle = "请选择状态";
            break;
        }
        this.openIndex = e;
      },
      bindChange(e) {
        this.currIndex = e.detail.value[0];
        this.currIndex1 = e.detail.value[0];
        this.currIndex2 = e.detail.value[0];
      },
      success() {
        switch (this.openIndex) {
          case 0:
            this.currSearch = this.searchList[this.currIndex];
            this.value[0] = this.currIndex;
            break;
          case 1:
            this.currSearch1 = this.searchList[this.currIndex1];
            this.value[0] = this.currIndex1;
            if (this.currSearch1 == '现金付款') {
              this.paymentTerms = 1
            } else if (this.currSearch1 == '银行转账') {
              this.paymentTerms = 2
            } else if (this.currSearch1 == '微信') {
              this.paymentTerms = 3
            } else if (this.currSearch1 == '挂账') {
              this.paymentTerms = 0
            } else {
              this.paymentTerms = ''
            }
            this.search()
            break;
          case 2:
            this.currSearch2 = this.searchList[this.currIndex2];
            this.value[0] = this.currIndex2;
            if (this.currSearch2 == '提交') {
              this.status = 1
            } else if (this.currSearch2 == '已完成') {
              this.status = 4
            } else if (this.currSearch2 == '暂存') {
              this.status = 0
            } else {
              this.status = ''
            }
            this.search()
            break;
        }
        this.$refs.search.close();
      },
      close() {
        this.$refs.search.close();
      },
      maskClick(e) {
        this.startDate = e[0]
        this.endDate = e[1]
        this.search()
      },
      openDate() {
        this.$refs.date.show();
      },
      choice(item, index) {
        this.$set(this.groundingList[index], "choice", !item.choice);
      },
      goDetail(e) {
        uni.navigateTo({
          url: `/pages/sales/bookInvoicDetail?id=${e.outWarehouseId}`,
        });
      },
      confirm() {
        uni.showLoading({
          title: "加载中",
        });
        deloutWarehouse(this.outWarehouseId).then((data1) => {
          uni.hideLoading();
          if (data1.code == 200) {
            this.$refs.popup.close();
            let number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1500,
            });

          }
        });
      },
      edit(e) {
        uni.navigateTo({
          url: "/pages/sales/editOutbound?id=" + e.outWarehouseId
        })
      }
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
      width: 496rpx;
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
      width: 300rpx;
    }

    .search-icon {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 20rpx;
    }

    .status {
      width: 170rpx;
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

    .statussecond {
      width: 150rpx;
      height: 66rpx;
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

    .top-second {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .top-date {
      margin-top: 24rpx;
    }

    .top-date ::v-deep .text-center {
      width: 246rpx;
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
    // min-height: 919rpx;
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
      // min-height: 681rpx;
      background: #f5f7fb;
      margin-top: 22rpx;
      padding: 28rpx 32rpx 0rpx 32rpx;
      border-radius: 20rpx;

      .row {

        display: flex;
        padding-bottom: 24rpx;
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
        width: 410rpx;
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        margin-left: 27rpx;
        word-break: break-all;
        width: 400upx;
      }
    }

    .bottom {
      display: flex;
      margin-left: 320upx;
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

  .chioce {
    width: 60rpx;
    height: 60rpx;
  }

  .spacecheck {
    width: 60rpx;
    height: 60rpx;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  .operate {
    width: 750rpx;
    height: 148rpx;
    background: #ffffff;
    box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    padding: 44rpx 32rpx 44rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0rpx;

    .all {
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
      margin-left: 16rpx;
    }

    .tip {
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
      margin-left: 75rpx;
    }

    .delbtn {
      width: 270rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      background: #fbf5f5;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #e80000;
      float: right;
    }

    .flex {
      display: flex;
      align-items: center;
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