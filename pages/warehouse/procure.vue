<template>
  <view style="padding-bottom: 24rpx">
    <view class="top">
      <view class="top-first">
        <view class="search">
          <view class="left" @click="openSearch(0)">
            <view class="label">{{ currSearch }}</view>
            <image class="icon" src="/static/bottom.png"></image>
          </view>
          <input
            @confirm="search"
            v-model="searchValue"
            class="uni-input"
            placeholder-class="placeholder"
            placeholder="请输入关键字搜索"
          />
          <image
            @click="search"
            class="search-icon"
            src="/static/search.png"
          ></image>
        </view>
        <view class="status" @click="openSearch(1)">
          <view v-if="status" class="selectstatus">{{
            status
          }}</view>
          <view v-else class="pla">状态</view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
      <view class="top-date">
        <uni-datetime-picker
          start-placeholder="请选择开始日期"
          end-placeholder="请选择结束日期"
          :border="false"
          ref="date"
          type="daterange"
          @change="dateSelect"
          ><template v-slot:icon
            ><image class="icon" src="/static/bottom.png"></image></template
        ></uni-datetime-picker>
      </view>
    </view>
    <view v-if="list && list.length > 0">
      <view
        class="list"
        v-for="(item, index) of list"
        :key="index"
        @click="goDetail(item.inWarehouseId)"
      >
        <view class="flex">
          <view class="flex">
            <view class="name">{{ item.orderNo }}</view>
          </view>
          <view
            class="status"
            :style="{
              background: item.status == 1 ? '#fff9c1' : '#cce5ff',
            }"
          >
            <view
              class="font"
              :style="{ color: item.status == 1 ? '#E07000' : '#007DFF' }"
              >{{ item.status == 1 ? "提交" : "入库" }}</view
            ></view
          >
        </view>
        <view class="contain">
          <view class="row">
            <view class="label">门店名称</view>
            <view class="input">{{ item.warehouseName }}</view>
          </view>
          <view class="row">
            <view class="label">结算方式</view>
            <view class="input">{{ item.paymentTerms | paymentTerms }}</view>
          </view>
          <view class="row">
            <view class="label">单据类别</view>
            <view class="input">{{ item.orderCategory | orderCategory }}</view>
          </view>
          <view class="row">
            <view class="label">供货商编码</view>
            <view class="input">{{ item.vendorCode }}</view>
          </view>
          <view class="row">
            <view class="label">供应商名称</view>
            <view class="input">{{ item.vendorName }}</view>
          </view>
          <view class="row">
            <view class="label">门店编码</view>
            <view class="input">{{ item.warehouseCode }}</view>
          </view>
          <view class="row">
            <view class="label">总价</view>
            <view class="input">{{ item.totalPrice }}</view>
          </view>
          <view class="row">
            <view class="label">上架人</view>
            <view class="input">{{ item.shelveUser }}</view>
          </view>
          <view class="row">
            <view class="label">上架时间</view>
            <view class="input">{{ item.shelveDate | date }}</view>
          </view>
          <view class="row">
            <view class="label">备注</view>
            <view class="input">{{ item.remark }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="del" v-if="item.status != 2" @click.stop="open(item)"
            >删除</view
          >
          <view
            class="edit"
            v-if="item.status != 2"
            @click.stop="
              go(
                `/pages/warehouse/addWarehousing?inWarehouseId=${item.inWarehouseId}`
              )
            "
            >修改</view
          >
          <view
            class="edit"
            v-if="item.status != 2"
            @click.stop="openAduit(item)"
            >审核通过</view
          >
          <!-- <view class="edit">打印</view> -->
          <view class="edit" @click.stop="openGround(item)">指定上架</view>
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
    <image
      class="add"
      src="/static/add.png"
      @click="go('/pages/warehouse/addWarehousing')"
    ></image>
    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content"
          >是否确认删除订单号为"{{ operate.orderNo }}"的数据项？</view
        >
        <view class="bottom">
          <view class="sure" @click="confirm">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="audit" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content"
          >是否确认通过订单号为"{{ operate.orderNo }}"的审核？</view
        >
        <view class="bottom">
          <view class="sure" @click="throug">确定</view>
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
        <picker-view
          :indicator-style="indicatorStyle"
          :value="currSearchIndex == 0 ? searchIndex : statusIndex"
          @change="bindChange"
          class="picker-view"
        >
          <picker-view-column>
            <view
              class="item"
              v-for="(item, index) in searchList"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>

    <uni-popup ref="grounding" type="bottom">
      <view class="grounding">
        <view class="header">
          <view class="title"
            >请选择上架人
            <image
              @click="closeGround"
              class="fork"
              src="/static/close.png"
            ></image>
          </view>
        </view>
        <view class="content">
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
            <view class="card" v-for="(item, index) of shelveList" :key="index">
              <view class="crow">
                <image
                  v-if="item.choice"
                  @click="choice(item)"
                  class="check"
                  src="/static/check.png"
                ></image>
                <view v-else @click="choice(item)" class="spacecheck"></view>
                <view class="name">{{ item.userId }}</view>
              </view>
              <view class="main">
                <view class="flex-row">
                  <view class="label">用户名称</view>
                  <view class="val">{{ item.userName }}</view>
                </view>
                <view class="flex-row">
                  <view class="label">用户昵称</view>
                  <view class="val">{{ item.nickName }}</view>
                </view>
                <view class="flex-row">
                  <view class="label">手机号</view>
                  <view class="val">{{ item.phonenumber }}</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="bottom">
          <view class="btn" @click="submitShelve">确定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import uniDatetimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
import {
  inWarehouseList,
  delInWarehouse,
  auditInWarehouse,
  storeUserlist,
  shelveUser,
} from "@/Api/purchaseSales.js";
export default {
  components: {
    uniPopup: uniPopup,
    uniDatetimePicker: uniDatetimePicker,
  },
  data() {
    return {
      indicatorStyle: `height: 50px;`,
      searchIndex: [0],
      statusIndex: [0],
      searchList: [],
      list: [],
      searchValue: "",
      allSelect: false,
      selectList: [],
      currIndex: 0,
      currSearch: "单据编号",
      status: "",
      range: [],
      currSearchIndex: 0,
      list: [],
      searchTitle: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      operate: {},
      shelvePageNum: 1,
      shelvePageSize: 10,
      shelveList: [],
      shelveTotal: 0,
      choiceShelver: {},
      is_show: false,
    };
  },
  filters: {
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
    orderCategory(e) {
      if (e == "1") {
        return "常规入库";
      } else {
        return "采购入库";
      }
    },
    date(e) {
      if (e) {
        const date = new Date(e);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`;
        return formattedDate;
      } else {
        return;
      }
    },
  },
  onLoad() {
    this.getList();
    this.getStoreUserlist();
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
          this.currIndex = this.searchIndex[0];
          this.searchList = ["单据编号", "门店编码", "门店名称"];
          this.searchTitle = "请选择搜索条件";
          break;
        case 1:
          this.currIndex = this.statusIndex[0];
          this.searchList = ["全部", "提交", "入库"];
          this.searchTitle = "请选择状态";
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
    openGround(e) {
      this.$refs.grounding.open();
      this.operate = e;
      this.chioceShelve();
    },
    choice(item) {
      this.shelveList.forEach((ptem, pndex) => {
        if (ptem.userId == item.userId) {
          this.$set(this.shelveList[pndex], "choice", true);
          this.choiceShelver = ptem;
        } else {
          this.$set(this.shelveList[pndex], "choice", false);
        }
      });
    },
    closeGround() {
      this.$refs.grounding.close();
    },
    goDetail(e) {
      uni.navigateTo({
        url: `/pages/warehouse/warehousingDetail?inWarehouseId=${e}`,
      });
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        orderCategory: "1",
      };
      if (this.searchValue != "") {
        switch (this.currSearch) {
          case "单据编号":
            params.orderNo = this.searchValue;
            break;
          case "门店编码":
            params.warehouseCode = this.searchValue;
            break;
          case "门店名称":
            params.warehouseName = this.searchValue;
            break;
        }
      }

      if (this.range && this.range.length > 0) {
        params.startDate = this.range[0];
        params.endDate = this.range[1];
      }
      if (this.status == "提交") {
        params.status = "1";
      } else if (this.status == "入库") {
        params.status = "2";
      }
      uni.showLoading({
        title: "加载中",
      });
      inWarehouseList(params).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.list = size
            ? res.data.items
            : [...this.list, ...(res.data.items || [])];
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
      this.range = e;
      this.pageNum = 1;
      this.list = [];
      this.getList();
    },
    confirm() {
      uni.showLoading({
        title: "加载中",
      });
      delInWarehouse(this.operate.inWarehouseId)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.$refs.popup.close();
            const number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1500,
            });
          }
        })
        .catch((err) => {
          this.$refs.popup.close();
        });
    },
    throug() {
      uni.showLoading({
        title: "加载中",
      });
      auditInWarehouse({ inWarehouseId: this.operate.inWarehouseId })
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.$refs.audit.close();
            const number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "审核成功",
              icon: "none",
              duration: 1500,
            });
          }
        })
        .catch((err) => {
          this.$refs.audit.close();
        });
    },
    getStoreUserlist() {
      let params = {
        pageNum: this.shelvePageNum,
        pageSize: this.shelvePageSize,
      };
      storeUserlist(params).then((res) => {
        if (res.code == 200) {
          this.shelveList = [...this.shelveList, ...(res.rows || [])];
          this.shelveTotal = res.total;
          this.chioceShelve();
        }
      });
    },
    lower() {
      if (this.shelveList.length == this.shelveTotal) {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
          duration: 1500,
        });
      } else {
        this.shelvePageNum++;
        this.getStoreUserlist();
      }
    },
    chioceShelve() {
      this.shelveList.forEach((item) => {
        if (item.userId == this.operate.shelveBy) {
          this.$set(item, "choice", true);
          this.choiceShelver = item;
        } else {
          this.$set(item, "choice", false);
        }
      });
    },
    submitShelve() {
      let params = {
        inWarehouseId: this.operate.inWarehouseId,
        shelveBy: this.choiceShelver.userId,
        shelveUser: this.choiceShelver.userName,
      };
      uni.showLoading({
        title: "加载中",
      });
      shelveUser(params)
        .then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.$refs.grounding.close();
            const number = this.list.length;
            this.getList(1, number);
            uni.showToast({
              title: "指派成功",
              icon: "none",
              duration: 1500,
            });
          }
        })
        .catch((err) => {
          this.$refs.grounding.close();
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
    .selectstatus {
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
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
    justify-content: space-around;
    align-items: center;
  }
  .top-date ::v-deep .icon-calendar {
    display: none;
  }
}
.list {
  width: 686rpx;
  min-height: 860rpx;
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
    min-height: 622rpx;
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
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    right: 32rpx;
    top: 24rpx;
  }
  .content {
    height: 900rpx;
    background: #f1f1f1;
    padding: 24rpx 32rpx 24rpx 32rpx;
    overflow-y: hidden;
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

.scroll-Y {
  height: 860rpx;
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