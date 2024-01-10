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
          <view v-if="status" class="selectstatus">{{ status }}</view>
          <view v-else class="pla">状态</view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
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
              background:
                item.status == 2
                  ? '#cce5ff'
                  : item.status == 1
                  ? '#fff9c1'
                  : '#d4ffcc',
            }"
          >
            <view
              class="font"
              :style="{
                color:
                  item.status == 2
                    ? '#007DFF'
                    : item.status == 1
                    ? '#E07000'
                    : '#1CB300',
              }"
              >{{ item.status | status }}</view
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
            <view class="input">{{ item.shelveDate }}</view>
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
                `/pages/warehouse/addReturn?inWarehouseId=${item.inWarehouseId}`
              )
            "
            >修改</view
          >
          <view
            class="edit"
            v-if="item.status != 2 && item.status != 0"
            @click.stop="openAduit(item)"
            >审核通过</view
          >
          <!-- <view class="edit">打印</view> -->
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
      @click="go('/pages/warehouse/addReturn')"
    ></image>
    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content"
          >是否确认删除单号为"{{ operate.orderNo }}"的数据项？</view
        >
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
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import {
  inWarehouseList,
  delInWarehouseReturn,
  auditPurchaseReturn,
} from "@/Api/purchaseSales.js";
export default {
  components: {
    uniPopup: uniPopup,
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
      currSearch: "单据编号",
      status: "",
      statuList: ["正常", "提交"],
      searchTitle: "",
      currSearchIndex: 0,
      searchIndex: [0],
      statusIndex: [0],
      pageNum: 1,
      pageSize: 10,
      operate: {},
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
        return "常规退货";
      } else {
        return "采购退货";
      }
    },
    status(e) {
      if (e == 1) {
        return "提交";
      } else if (e == 0) {
        return "暂存";
      } else if (e == 2) {
        return "完成";
      }
    },
  },
  onLoad() {
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
    open(e) {
      this.$refs.popup.open();
      this.operate = e;
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
          this.searchList = ["单据编号", "门店编码", "门店名称"];
          this.searchTitle = "请选择搜索条件";
          break;
        case 1:
          this.searchList = ["全部", "暂存", "提交", "完成"];
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
    goDetail(e) {
      uni.navigateTo({
        url: `/pages/warehouse/returnDetail?inWarehouseId=${e}`,
      });
    },
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
        orderCategory: "2",
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

      if (this.status == "暂存") {
        params.status = "0";
      } else if (this.status == "提交") {
        params.status = "1";
      } else if (this.status == "完成") {
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
    confirm() {
      uni.showLoading({
        title: "加载中",
      });
      delInWarehouseReturn(this.operate.inWarehouseId).then((res) => {
        uni.hideLoading();
        if (res.code == 200) {
          this.$refs.popup.close();
          console.log(this.list);
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
    openAduit(e) {
      this.$refs.audit.open();
      this.operate = e;
    },
    cancel() {
      this.$refs.popup.close();
      this.$refs.audit.close();
    },
    throug() {
      uni.showLoading({
        title: "加载中",
      });
      auditPurchaseReturn({
        inWarehouseId: this.operate.inWarehouseId,
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
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 750rpx;
  height: 92rpx;
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