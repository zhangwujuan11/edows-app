<template>
  <view style="padding-bottom: 148rpx">
    <view class="top" style=" position: fixed;background-color: #fff; z-index: 999; ">
      <view class="search">
        <picker @change="bindPickerChange" :value="currIndex" :range="searchList">
          <view class="uni-input"></view>
          <view class="label">{{ searchList[currIndex] }}</view>
        </picker>
        <image class="icon" src="/static/bottom.png"></image>
        <input @confirm="search" v-model="searchValue" class="uni-input" placeholder-class="placeholder"
          placeholder="请输入关键字搜索" />
        <image @click="search" class="search-icon" src="/static/search.png"></image>
      </view>
      <view class="serboxdown" style="display: flex;">
        <picker :value="index1" :range="array1" mode="selector" @change="bindPickerChange1"
          style="width: 430upx; height: 66upx; background-color: #f1f1f1;border-radius: 30upx; position: relative; margin-right: 30upx;">
          <view v-if="array1[index1]!=null" class="uni-input"
            style="height: 66upx; line-height: 66upx;font-size: 24upx;padding-left: 10upx;">
            {{array1[index1]}}
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx;position: absolute;left: 130upx;color: #999999"></uni-icons>
          </view>
          <view v-else
            style="line-height: 66upx; margin-left: 30upx;font-weight: 400;font-size: 24upx; height: 66upx; color: #999;">
            请选择单据类型
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx;position: absolute;left: 130upx;color: #999999"></uni-icons>
          </view>
        </picker>
        <picker :value="params.status" :range="array2" mode="selector" @change="bindPickerChange2"
          style="width: 230upx; height: 66upx; background-color: #f1f1f1;border-radius: 30upx; position: relative;">
          <view v-if="array2[index2]!=null" class="uni-input"
            style="height: 66upx; line-height: 66upx;font-size: 24upx;padding-left: 10upx;">
            {{array2[index2]}}
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx; position: absolute;left: -70upx;color: #999999"></uni-icons>
          </view>
          <view v-else
            style="line-height: 66upx; margin-left: 30upx;font-weight: 400;font-size: 24upx;height: 66upx;color: #999;">
            状态
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx; position: absolute;left: -70upx;color: #999999"></uni-icons>
          </view>
        </picker>
      </view>
    </view>
    <view class="top">

    </view>
    <view v-if="list&&list.length > 0">
      <view class="list" v-for="(item, index) of list" :key="index">
        <view>
          <view class="flex">
            <view class="name">{{item.orderNo}}</view>

            <view class="status" v-if="item.status =='保存'" style="background-color: #c7ffbb; color: #00d500;">
              {{ item.status }}
            </view>
            <view class="status" v-else style="background-color: #c2e8ff; color: #007DFF;">{{ item.status }}</view>
          </view>
          <view class="contain" @click="toList(item.inventoryTransferId)">
            <view class="row">
              <view class="label">移入门店名称</view>
              <view class="input" style="  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
width: 300upx;">{{ item.inWarehouseName }}</view>
            </view>
            <view class="row">
              <view class="label">移入门店编码</view>
              <view class="input">{{ item.inWarehouseCode }}</view>
            </view>
            <view class="row">
              <view class="label">单据类型</view>
              <view class="input">{{ item.orderType }}</view>
            </view>
            <view class="row">
              <view class="label">移出门店编码</view>
              <view class="input">{{ item.outWarehouseCode }}</view>
            </view>
            <view class="row">
              <view class="label">移出门店名称</view>
              <view class="input" style="  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
width: 300upx;">{{ item.outWarehouseName }}</view>
            </view>
            <view class="row">
              <view class="label">经办人</view>
              <view class="input">{{ item.agentUser }}</view>
            </view>

            <view class="row">
              <view class="label">创建日期</view>
              <view class="input">{{ item.createTime }}</view>
            </view>
            <view class="row">
              <view class="label">备注</view>
              <view class="input">{{ item.remark }}</view>
            </view>
          </view>
          <view class="bottom">
            <view class="del" @click="open(item)" v-show="item.status=='保存'">删除</view>
            <view class="edit" @click="edit(item)" v-show="item.status=='保存'">修改</view>
            <view class="edit" @click="open1(item)" v-show="item.status=='保存'">审核通过</view>
          </view>
        </view>
      </view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <text>暂无数据</text>
    </view>
    <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;">没有更多数据了</view>
    <image class="add" src="/static/add.png" @click="add"></image>

    <uni-popup ref="popup" type="center">
      <view class="mark">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认通过订单号为"{{currDel.orderNo }}"的删除？</view>
        <view class="bottom">
          <view class="sure" @click="confirm">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popup1" type="center">
      <view class="mark">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel1"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content">是否确认通过订单号为"{{currDel.orderNo }}"的审核？</view>
        <view class="bottom">
          <view class="sure" @click="confirm1">确定</view>
          <view class="cancel" @click="cancel1">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import {
    getTransferStocks,
    delTransferStocks,
    detailTransferStocks,
    AuditTransferStocks,
    addTransferStocks,
    editTransferStocks
  } from "@/Api/ww.js"
  export default {
    components: {
      uniPopup: uniPopup,
    },
    data() {
      return {
        list: [],
        searchValue: "",
        allSelect: false,
        selectList: [],
        title: '',
        total: 0,
        currIndex: 0,
        index1: '',
        index2: '',
        searchList: ["移入门店名称", "单据编号", "经办人"],
        currDel: {},
        array1: ["移库", '调拨', '全部'],
        array2: ["保存", '完成', '全部'],
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        pageNum: 1,
        pageSize: 10,
        orderType: '',
        status: '',
        aa: ''
      };
    },
    computed: {
      selectSum() {
        return this.selectList.length;
      },
    },
    onLoad() {
      this.getList();
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
      bindPickerChange1(e) {
        this.index1 = e.detail.value
        this.orderType = this.array1[e.detail.value]
        if (this.orderType == "移库") {
          this.orderType = 1
        } else if (this.orderType == "调拨") {
          this.orderType = 2
        } else {
          this.orderType = ''
        }
        this.search();
      },
      bindPickerChange2(e) {
        this.index2 = e.detail.value
        this.status = this.array2[e.detail.value]
        if (this.status == "完成") {
          this.status = 1
        } else if (this.status == "保存") {
          this.status = 0
        } else {
          this.status = ''
        }
        this.search();
      },
      toList(e) {
        uni.navigateTo({
          url: `/pages/TransferStocksdetail/TransferStocksdetail?id=${e}`
        })
      },

      open(e) {
        this.currDel = e;
        this.$refs.popup.open();
      },
      open1(e) {
        this.currDel = e;
        this.$refs.popup1.open();
      },
      cancel() {
        this.$refs.popup.close();
      },
      cancel1() {
        this.$refs.popup1.close();
      },
      add() {
        uni.navigateTo({
          url: "/pages/addTransferStocks/addTransferStocks"
        })
      },
      edit(e) {
        uni.navigateTo({
          url: "/pages/editTransferStocks/editTransferStocks?id=" + e.inventoryTransferId
        })
      },
      getList(num, size) {
        let params1 = {
          pageNum: num ? num : this.pageNum,
          pageSize: size ? size : this.pageSize,
        }
        switch (this.currIndex) {
          case 0:
            params1.inWarehouseName = this.searchValue;
            break;
          case 1:
            params1.orderNo = this.searchValue;
            break;
          case 2:
            params1.agentUser = this.searchValue;
            break;
        }
        params1.status = this.status
        params1.orderType = this.orderType
        uni.showLoading({
          title: "加载中",
        });
        getTransferStocks(params1).then((res) => {
          if (res.data.items != null) {
            res.data.items.forEach(i => {
              if (i.orderType == 1) {
                i.orderType = '移库'
              } else {
                i.orderType = '调拨'
              }
              if (i.status == 1) {
                i.status = '完成'
              } else {
                i.status = '保存'
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
      bindPickerChange(e) {
        this.currIndex = e.detail.value;
      },
      search() {
        this.params.pageNum = 1;
        this.list = [];
        this.getList();
      },
      confirm() {
        uni.showLoading({
          title: "加载中",
        });
        delTransferStocks(`${this.currDel.inventoryTransferId}`).then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.$refs.popup.close();
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1000,
            });
            const number = this.list.length;
            this.getList(1, number);
          }
        });
      },
      confirm1() {
        if (this.currDel.orderType == '移库') {
          this.currDel.orderType = 1
        } else {
          this.currDel.orderType = 0
        }
        uni.showLoading({
          title: "加载中",
        });
        AuditTransferStocks(this.currDel).then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.$refs.popup1.close();
            uni.showToast({
              title: "审核成功",
              icon: "none",
              duration: 1000,
            });
            const number = this.list.length;
            this.getList(1, number);
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    height: 192rpx;
    background: #ffffff;

    .serboxdown {
      margin-top: 25upx;
      margin-left: 30upx;
    }


    .search {
      width: 686rpx;
      height: 72rpx;
      background: #f1f1f1;
      margin: 0 auto;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      position: relative;
    }

    .label {
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
  }

  .list {
    width: 686rpx;
    // height: 750upx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
    margin: 24rpx auto;
    border-radius: 30rpx;
    padding: 24rpx 32rpx 32rpx 32rpx;

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
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
      font-size: 24upx
    }

    .font {
      position: absolute;
      right: 19rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }

    .contain {
      width: 622rpx;
      // height: 540upx;
      background: #f5f7fb;
      margin-top: 22rpx;
      padding: 28rpx 32rpx 28rpx 32rpx;
      border-radius: 20rpx;

      .row {
        width: 550upx;
        word-break: break-all;
        display: flex;
        margin-bottom: 24rpx;
      }

      .label {
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        width: 150rpx;
        height: 35rpx;
      }

      .input {
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        margin-left: 27rpx;
      }
    }

    .bottom {
      display: flex;
      margin-left: 160upx;
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

  .check {
    width: 60rpx;
    height: 60rpx;
  }

  .spacecheck {
    width: 60rpx;
    height: 60rpx;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  .mark {
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