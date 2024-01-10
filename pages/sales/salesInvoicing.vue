<template>
  <view style="padding-bottom: 24rpx">
    <view class="top">
      <view class="top-first">
        <view class="search">
          <view class="left">
            <view class="label"></view>
            <!-- <image class="icon" src="/static/bottom.png"></image> -->
          </view>
          <input @confirm="search" v-model="searchValue" class="uni-input" placeholder-class="placeholder"
            placeholder="请输入单据编号" />
          <image @click="search" class="search-icon" src="/static/search.png"></image>
        </view>
      </view>
      <view class="top-second">
        <view class="top-date">
          <uni-datetime-picker start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" :border="false" :clear-icon="true"
            ref="date" v-model="single" type="daterange" @change="dateSelect">
            <template v-slot:icon>
              <image class="icon" src="/static/bottom.png"></image>
            </template>
          </uni-datetime-picker>
        </view>
        <view class="statussecond" @click="openSearch(1)">
          <view v-if="status" class="selectstatus">{{
            status
          }}</view>
          <view v-else class="pla">状态</view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
    </view>
    <view v-if="list && list.length > 0">
      <view class="list" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
        <view class="flex">
          <view class="flex">
            <!-- <image
            v-if="item.chioce"
            @click="chioce(item, index)"
            class="chioce"
            src="/static/check.png"
          ></image>
          <view
            v-else
            @click="chioce(item, index)"
            class="spacecheck"
            src="/static/select.png"
          ></view> -->
            <view class="name">{{ item.orderNo }}</view>
          </view>
          <view class="status" :style="{
              background:
                item.status == 3
                  ? '#cce5ff'
                  : item.status == 1
                  ? '#fff9c1'
                  : '#d4ffcc',
            }">
            <view class="font" :style="{
                color:
                  item.status == 3
                    ? '#007DFF'
                    : item.status == 1
                    ? '#E07000'
                    : '#1CB300',
              }">{{ item.status | status }}
            </view>
          </view>
        </view>
        <view class="contain">
          <view class="row">
            <view class="label">门店名称</view>
            <view class="input">{{ item.storeName }}</view>
          </view>
          <view class="row">
            <view class="label">单据日期</view>
            <view class="input">{{ item.createTime }}</view>
          </view>
          <view class="row">
            <view class="label">往来客户</view>
            <view class="input">{{ item.customer }}</view>
          </view>
          <view class="row">
            <view class="label">票据类型</view>
            <view class="input">{{ item.billType | billType }}</view>
          </view>
          <view class="row">
            <view class="label">包装方式</view>
            <view class="input">{{
              item.packagingMethod | packageMethod
            }}</view>
          </view>
          <view class="row">
            <view class="label">配送方式</view>
            <view class="input">{{ item.delivery | delivery }}</view>
          </view>
          <view class="row">
            <view class="label">结算方式</view>
            <view class="input">{{ item.paymentTerms | paymentTerms }}</view>
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
          <view class="del" v-if="item.status != '3'" @click.stop="open(item)">删除</view>
          <view v-if="item.status != '3'" class="edit" @click.stop="
              go(
                `/pages/sales/addSalesInvoice?outWarehouseId=${item.outWarehouseId}`
              )
            ">修改</view>
          <view class="edit" v-if="item.status != '3' && item.status != '0'" @click.stop="openAduit(item)">审核通过</view>
          <!-- <view class="edit">打印1</view>
        <view class="edit">打印2</view> -->
        </view>
      </view>
      <view v-show="is_show" style="
          text-align: center;
          width: 100%;
          margin-top: 100rpx;
          margin-bottom: 140rpx;
        ">没有更多数据了</view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <view>暂无数据</view>
    </view>
    <image class="add" src="/static/add.png" @click="go('/pages/sales/addSalesInvoice')"></image>
    <!-- <view class="operate">
      <view class="flex">
        <image
          @click="selectAll"
          v-if="allSelect"
          class="chioce"
          src="/static/check.png"
        ></image>
        <view
          @click="selectAll"
          v-else
          class="spacecheck"
          src="/static/select.png"
        ></view>
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
        <view class="content">是否确认删除单号为"{{ operate.orderNo }}"的数据项？</view>
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
        <picker-view :indicator-style="indicatorStyle" :value="currSearchIndex == 0 ? searchIndex : statusIndex"
          @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in searchList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>

    <uni-popup ref="audit" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认通过订单号为"{{ operate.orderNo }}"的审核？</view>
        <view class="bottom">
          <view class="sure" @click="throug">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import uniDatetimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
  import {
    outWarehouseList,
    delOutWarehouseSales,
    auditOutWarehouseSales,
  } from "@/Api/purchaseSales.js";
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
        currSearch: "全部",
        status: "",
        single: ["", ""],
        searchTitle: "",
        currSearchIndex: 0,
        searchIndex: [0],
        statusIndex: [0],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        operate: {},
        is_show: false,
      };
    },
    // computed: {
    //   selectSum() {
    //     return this.selectList.length;
    //   },
    // },
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
        if (e == 1) {
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
    onReachBottom() {
      if (this.list.length == this.total) {
        this.is_show = true;
      } else {
        this.is_show = false;
        this.pageNum++;
        this.getList();
      }
    },
    onLoad() {
      this.getList();
    },
    methods: {
      open(e) {
        this.$refs.popup.open();
        this.operate = e;
      },
      openAduit(e) {
        this.$refs.audit.open();
        this.operate = e;
      },
      cancel() {
        this.$refs.popup.close();
        this.$refs.audit.close();
      },
      go(e) {
        uni.navigateTo({
          url: e,
        });
      },
      openSearch(e) {
        this.currSearchIndex = e;
        this.$refs.search.open();
        switch (e) {
          case 0:
            this.searchTitle = "请选择搜索条件";
            this.searchList = ["全部", "单据编号"];
            break;
          case 1:
            this.searchTitle = "请选择状态";
            this.searchList = ["全部", "暂存", "提交", "出库"];
            break;
        }
      },
      bindChange(e) {
        this.currIndex = e.detail.value[0];
      },
      success() {
        if (this.currSearchIndex == 0) {
          this.currSearch = this.searchList[this.currIndex];
          this.searchIndex[0] = this.currIndex;
        } else {
          this.status = this.searchList[this.currIndex];
          this.statusIndex[0] = this.currIndex;
          this.list = [];
          this.getList();
        }
        this.$refs.search.close();
      },
      close() {
        this.$refs.search.close();
      },
      openDate() {
        this.$refs.date.show();
      },
      choice(item, index) {
        this.$set(this.groundingList[index], "choice", !item.choice);
      },
      goDetail(e) {
        uni.navigateTo({
          url: `/pages/sales/salesDetails?outWarehouseId=${e.outWarehouseId}`,
        });
      },
      getList(num, size) {
        let params = {
          pageNum: num ? num : this.pageNum,
          pageSize: size ? size : this.pageSize,
        };
        if (this.searchValue != "") {
          params.orderNo = this.searchValue;
        }

        if (this.single && this.single.length > 0) {
          params.startDate = this.single[0];
          params.endDate = this.single[1];
        }
        if (this.status != "") {
          if (this.status == "暂存") {
            params.status = 0;
          } else if (this.status == "提交") {
            params.status = 1;
          } else if (this.status == "出库") {
            params.status = 3;
          }
        }
        uni.showLoading({
          title: "加载中",
        });
        outWarehouseList(params).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.list = size ?
              res.data.items :
              [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        });
      },
      search() {
        this.pageNum = 1;
        this.list = [];
        this.getList();
      },
      dateSelect(e) {
        this.single = e;
        this.pageNum = 1;
        this.list = [];
        this.getList();
      },
      confirm() {
        uni.showLoading({
          title: "加载中",
        });
        delOutWarehouseSales(this.operate.outWarehouseId).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.$refs.popup.close();
            const number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1000,
            });
          }
        });
      },
      throug() {
        uni.showLoading({
          title: "加载中",
        });
        auditOutWarehouseSales({
          orderNo: this.operate.orderNo,
          outWarehouseId: this.operate.outWarehouseId,
        }).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.$refs.audit.close();
            const number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "审核成功",
              icon: "none",
              duration: 1000,
            });
          }
        });
      },
      // chioce(item, index) {
      //   this.list[index].chioce = !item.chioce;
      //   if (item.chioce) {
      //     let isTrue = this.selectList.every((ptem) => {
      //       return ptem.id != item.id;
      //     });
      //     if (isTrue) {
      //       this.selectList.push(item);
      //     }
      //   } else {
      //     for (var i = this.selectList.length; i > 0, i--; ) {
      //       if (this.selectList[i].id == item.id) {
      //         this.selectList.splice(i, 1);
      //         break;
      //       }
      //     }
      //     this.allSelect = false;
      //   }
      // },
      // selectAll() {
      //   this.allSelect = !this.allSelect;
      //   this.list.forEach((item) => {
      //     item.chioce = this.allSelect;
      //   });
      //   if (this.allSelect) {
      //     this.selectList = JSON.parse(JSON.stringify(this.list));
      //   } else {
      //     this.selectList = [];
      //   }
      // },
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
      margin-left: 40rpx;
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

    .selectstatus {
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
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

    .top-date ::v-deep .uni-date__x-input {
      width: 246rpx;
      height: 66rpx;
      background: #f1f1f1;
      border-radius: 40rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .top-date ::v-deep .icon-calendar {
      display: none;
    }
  }

  .list {
    width: 686rpx;
    min-height: 801rpx;
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
      min-height: 564rpx;
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
      }
    }

    .bottom {
      display: flex;
      justify-content: flex-end;
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