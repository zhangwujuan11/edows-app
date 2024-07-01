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
        <image @click="search" class="search-icon" src="@/static/search.png"></image>
      </view>
      <view class="serboxdown" style="display: flex;">
        <picker :value="index1" :range="array1" mode="selector" @change="bindPickerChange1"
          style="width: 285upx; height: 66upx; background-color: #f1f1f1;border-radius: 30upx; position: relative; margin-right: 30upx;">
          <view v-if="array1[index1] != null" class="uni-input" style="height: 66upx;line-height: 66upx; font-size: 24upx;padding-left: 20upx; width: 230upx; white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;">
            {{ array1[index1] }}
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx;position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
          <view v-else
            style="line-height: 66upx; margin-left: 30upx;font-weight: 400;font-size: 24upx; height: 66upx;color:#999999;">
            请选择供应商
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx;position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
        </picker>
        <picker :value="params.status" :range="array2" mode="selector" @change="bindPickerChange2"
          style="width: 140upx;padding-left: 30upx; height: 66upx; background-color: #f1f1f1;border-radius: 30upx; position: relative;margin-right: 20upx;">
          <view v-if="array2[index2] != null" class="uni-input"
            style="height: 66upx; line-height: 66upx;font-size: 24upx;">
            {{ array2[index2] }}
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx;position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
          <view v-else
            style="line-height: 66upx; margin-left: 10upx;font-weight: 400;font-size: 24upx;height: 66upx;color:#999999;">
            分类
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx; position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
        </picker>
        <picker :value="params.status" :range="array3" mode="selector" @change="bindPickerChange3"
          style="width: 180upx; height: 66upx; background-color: #f1f1f1;border-radius: 30upx; position: relative;">
          <view v-if="array3[index3] != null" class="uni-input"
            style="height: 66upx; padding-left: 30upx;line-height: 66upx;font-size: 24upx;">{{ array3[index3] }}
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx; position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
          <view v-else
            style="line-height: 66upx; margin-left: 30upx;font-weight: 400;font-size: 24upx;height: 66upx;color:#999999;">
            状态
            <uni-icons type="bottom" size="15"
              style="margin-left: 240upx; position: absolute;right: 15upx;color: #999999"></uni-icons>
          </view>
        </picker>
      </view>
    </view>
    <view class="top">

    </view>
    <view v-if="list&&list.length > 0">
      <view class="list" v-for="(item, index) in list" :key="index">
        <view>
          <view class="flex">
            <view class="name" style="  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
width: 300upx;">{{ item.warehouseName }}</view>
            <view style="font-size: 24upx;">
              {{ item.createTime }}
            </view>
          </view>
          <view class="contain">
            <view class="row">
              <view class="label">CARG码</view>
              <view class="input">{{ item.carg }}</view>
            </view>
            <view class="row">
              <view class="label">产品名称</view>
              <view class="input">{{ item.productName }}</view>
            </view>
            <view class="row">
              <view class="label">库位</view>
              <view class="input">{{ item.positionCode }}</view>
            </view>
            <view class="row">
              <view class="label">参考量</view>
              <view class="input">{{ item.inventoryQuantity }}</view>
            </view>
            <view class="row">
              <view class="label">可用量</view>
              <view class="input">{{ item.usableQuantity }}</view>
            </view>
            <view class="row">
              <view class="label">单价</view>
              <view class="input">{{ item.price }}</view>
            </view>
          </view>
          <view class="bottom">
            <view class="edit" @click="goOperationalLogs(item.inventoryId)">操作日志</view>
            <view class="edit" style="margin-left: 20rpx; margin-right: 20rpx;" @click="goDetails(item.inventoryId)">
              进/出货明细</view>
            <view class="edit" @click="open1(item)" v-if="item.usableQuantity > 0">分享库存</view>
          </view>
        </view>
      </view>
      <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;">没有更多数据了</view>
    </view>
    <view class="no-have" v-else>
      <image src="@/static/16701.png"></image>
      <text>暂无数据</text>
    </view>

    <uni-popup ref="popup1" type="center">
      <view class="mark">
        <view style="display: flex;">
          <view class="title">共享库存</view>
          <uni-icons type="closeempty" size="24" @click="cancel1"></uni-icons>
        </view>
          <input type="number" class="edit-input" placeholder-class="placeholder" placeholder="请输入共享数量"
            v-model="currDel.shareQuantity" />
        <view class="bottom">
          <view class="sure" @click="confirm1">共享</view>
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
    editTransferStocks,
    getAllinventory,
    addshare,
    getclassification,
    getsupplier
  } from "@/Api/ww.js"
  import {
    log
  } from "util";
  export default {
    components: {
      uniPopup: uniPopup,
    },
    data() {
      return {
        status: "保存",
        list: [],
        searchValue: "",
        allSelect: false,
        selectList: [],
        title: '',
        total: 0,
        currIndex: 0,
        index1: '',
        index2: '',
        index3: '',
        searchList: ["门店名称", "门店编码", "产品名称", 'carg'],
        currDel: {},
        array1: ['全部'],
        array11: [],
        array2: ['全部'],
        array3: ["有效", '失效', '全部'],
        array33: ["1", '2', '3'],
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        pageNum: 1,
        pageSize: 10,
        valid: 3,
        visible: true,
        vendorName: '',
        vendorCode: '',
        classify: '',
        valid: 3,
        aa: false
      };
    },
    computed: {
      selectSum() {
        return this.selectList.length;
      },
    },
    async onLoad() {
      this.getList();
      const data = await getclassification()
      for (let i = 0; i < data.data.length; i++) {
        this.array2.push(data.data[i].dictValue)
      }
      const res = await getsupplier()
      for (let i = 0; i < res.data.items.length; i++) {
        this.array1.push(res.data.items[i].supplierName)
        this.array11.push(res.data.items[i].supplierCode)
      }
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
        this.vendorName = this.array1[e.detail.value]
        this.vendorCode = this.array11[e.detail.value - 1]
        if (this.vendorName == '全部') {
          this.vendorName = ''
          this.vendorCode = ''
        }
        this.search();
      },
      bindPickerChange2(e) {
        this.index2 = e.detail.value
        this.classify = this.array2[e.detail.value - 1]
        if (this.classify == '全部') {
          this.classify = ''
        }
        this.search();
      },
      bindPickerChange3(e) {
        this.index3 = e.detail.value
        this.valid = this.array33[e.detail.value]
        this.search();
      },
      goDetails(e) {
        uni.navigateTo({
          url: "/pages/Details/Details?id=" + e
        })
      },
      open1(e) {
        this.currDel.shareQuantity = ''
        this.currDel = e;
        this.$refs.popup1.open();
      },
      cancel1() {
        this.$refs.popup1.close();
      },
      goOperationalLogs(e) {
        uni.navigateTo({
          url: "/pages/OperationalLogs/OperationalLogs?id=" + e
        })
      },
      getList(num, size) {
        let params1 = {
          pageNum: num ? num : this.pageNum,
          pageSize: size ? size : this.pageSize,
          valid: this.valid
        }
        if (this.searchValue != "") {
          switch (this.currIndex) {
            case 0:
              params1.warehouseName = this.searchValue;
              break;
            case 1:
              params1.warehouseCode = this.searchValue;
              break;
            case 2:
              params1.productName = this.searchValue;
              break;
            case 3:
              params1.carg = this.searchValue;
              break;
          }
        }
        params1.vendorName = this.vendorName
        params1.vendorCode = this.vendorCode
        params1.classify = this.classify
        params1.valid = this.valid
        uni.showLoading({
          title: "加载中",
        });
        getAllinventory(params1).then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.list = size ?
              res.data.items : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        });
      },
      bindPickerChange(e) {
        this.currIndex = e.detail.value;
      },
      search() {
        this.pageNum = 1;
        this.list = [];
        this.getList();
      },
      confirm1() {
        uni.showLoading({
          title: "加载中",
        });
        addshare(this.currDel).then((res) => {
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
    // height: 560upx;
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
      opacity: 0.2;
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
      // height: 350upx;
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
      flex-direction: row-reverse;
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
        width: 200rpx;
        height: 72rpx;
        background: #f5f7fb;
        line-height: 72rpx;
        text-align: center;
        border-radius: 40rpx;
        font-size: 24rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #007dff;
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
    height: 412rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 28rpx 40rpx 50rpx 37rpx;
    position: relative;

    .title {
      padding-left: 20upx;
      font-size: 32rpx;
      width: 500upx;
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
      .edit-input {
        width: 536rpx;
        height: 72rpx;
        background: #ffffff;
        border-radius: 12rpx 12rpx 12rpx 12rpx;
        border: 1px #707070 solid;
        padding-left: 32rpx;
        margin-top: 72rpx;
        margin-bottom: 56rpx;
    }
      .placeholder {
        font-size: 28rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
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