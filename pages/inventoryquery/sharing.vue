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
          <view v-else class="pla">分类</view>
          <image class="icon" src="/static/bottom.png"></image>
        </view>
      </view>
    </view>
    <view v-if="list && list.length > 0">
      <view class="list" v-for="(item, index) of list" :key="index">
        <view class="flex">
          <view class="flex">
            <view class="name">{{ item.productName }}</view>
          </view>
          <view class="date">{{ item.updateTime }}</view>
        </view>
        <view class="contain">
          <view class="row">
            <view class="label">carg</view>
            <view class="input">{{ item.carg }}</view>
          </view>
          <view class="row">
            <view class="label">门店名称</view>
            <view class="input">{{ item.warehouseName }}</view>
          </view>
          <view class="row">
            <view class="label">库位编码</view>
            <view class="input">{{ item.positionCode }}</view>
          </view>
          <view class="row">
            <view class="label">供应商名称</view>
            <view class="input">{{ item.vendorName }}</view>
          </view>
          <view class="row">
            <view class="label">单位</view>
            <view class="input">{{ item.unit }}</view>
          </view>
          <view class="row">
            <view class="label">分类</view>
            <view class="input">{{ item.classify }}</view>
          </view>
          <view class="row">
            <view class="label">分享数量</view>
            <view class="input">{{ item.shareQuantity }}</view>
          </view>
          <view class="row">
            <view class="label">创建时间</view>
            <view class="input">{{ item.time }}</view>
          </view>
          <view class="row">
            <view class="label">备注</view>
            <view class="input">{{ item.createTime.split(" ")[0] }}</view>
          </view>
        </view>
        <view class="bottom" v-if="tid == item.tenantId">
          <view class="del" @click.stop="openDel(item)">删除</view>
          <view class="edit" @click.stop="openEdit(item)">修改</view>
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
    <uni-popup ref="popup" type="center">
      <view class="tipmask">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content"
          >是否确认删除产品名称为"{{ operate.productName }}"的数据项？</view
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

    <uni-popup ref="edit" type="center">
      <view class="editmask">
        <view class="title">修改共享</view>
        <image class="close" src="/static/close.png" @click="revoke"></image>
        <input
          type="number"
          v-model="shareValue"
          class="edit-input"
          placeholder-class="placeholder"
          placeholder="请输入共享数量"
        />
        <view class="bottom">
          <view class="sure" @click="share">共享</view>
          <view class="cancel" @click="revoke">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import {
  shareList,
  delShare,
  editStoreShare,
  dictData,
} from "@/Api/purchaseSales.js";
export default {
  components: {
    uniPopup: uniPopup,
  },
  data() {
    return {
      indicatorStyle: `height: 50px;`,
      searchIndex: [0],
      statusIndex: [0],
      searchList: [],
      list: [],
      searchValue: "",
      currIndex: 0,
      currSearch: "carg",
      status: "",
      searchTitle: "",
      shareValue: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      operate: {},
      currSearchIndex: 0,
      is_show: false,
      classify: [],
      tid: "",
    };
  },
  onLoad() {
    if (uni.getStorageSync("UmsMember").StoreUser) {
      this.tid = uni.getStorageSync("UmsMember").StoreUser.tenantId;
    }
    this.getShareList();
    this.getClassify();
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      this.getShareList();
    }
  },
  methods: {
    openDel(e) {
      this.operate = e;
      this.$refs.popup.open();
    },
    openEdit(e) {
      this.operate = e;
      this.$refs.edit.open();
    },
    cancel() {
      this.$refs.popup.close();
    },
    revoke() {
      this.$refs.edit.close();
    },
    share() {
      if (!this.shareValue) {
        return uni.showToast({
          title: "共享数量不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (this.shareValue <= 0 || this.shareValue.indexOf(".") != -1) {
        return uni.showToast({
          title: `共享数量不能为0、负数、小数`,
          icon: "none",
          duration: 2000,
        });
      }
      uni.showLoading({
        title: "加载中",
      });
      let params = {
        inventoryId: `${this.operate.inventoryId}`,
        inventoryShareId: `${this.operate.inventoryShareId}`,
        shareQuantity: this.shareValue,
      };
      editStoreShare(params)
        .then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.$refs.edit.close();
            const number = this.list.length;
            this.getShareList(1, number);
            this.shareValue = "";
            uni.showToast({
              title: "共享成功",
              icon: "none",
              duration: 1500,
            });
          }
        })
        .catch((err) => {
          this.shareValue = "";
          this.$refs.edit.close();
        });
    },
    openSearch(e) {
      this.currSearchIndex = e;
      this.$refs.search.open();
      switch (e) {
        case 0:
          this.currIndex = this.searchIndex[0];
          this.searchList = [
            "carg",
            "产品名称",
            "库位编码",
            "拼音查找",
            "门店名字",
            "供应商名称",
          ];
          this.searchTitle = "请选择搜索条件";
          break;
        case 1:
          this.currIndex = this.statusIndex[0];
          this.searchList = this.classify.map((item) => {
            return item.dictValue;
          });
          this.searchList.unshift("全部");
          this.searchTitle = "请选择分类";
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
        this.getShareList();
      }
      this.$refs.search.close();
    },
    close() {
      this.$refs.search.close();
    },
    getShareList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
      };
      if (this.searchValue != "") {
        switch (this.currSearch) {
          case "carg":
            params.carg = this.searchValue;
            break;
          case "产品名称":
            params.productName = this.searchValue;
            break;
          case "库位编码":
            params.positionCode = this.searchValue;
            break;
          case "拼音查找":
            params.pinyin = this.searchValue;
            break;
          case "门店名字":
            params.warehouseName = this.searchValue;
            break;
          case "供应商名称":
            params.vendorName = this.searchValue;
            break;
        }
      }
      if (this.status != "" && this.status != "全部") {
        params.classify = this.classify[this.statusIndex[0] - 1].dictValue;
      }
      uni.showLoading({
        title: "加载中",
      });
      shareList(params).then((res) => {
        if (res.code == 200) {
          uni.hideLoading();
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
      this.getShareList();
    },
    confirm() {
      uni.showLoading({
        title: "加载中",
      });
      delShare(`${this.operate.inventoryShareId}`)
        .then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.$refs.popup.close();
            const number = this.list.length;
            this.getShareList(1, number);
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
    getClassify() {
      dictData("classification").then((res) => {
        if (res.code == 200) {
          this.classify = res.data;
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
  height: 801rpx;
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
    width: 364rpx;
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    margin-left: 20rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .date {
    width: 238rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  .contain {
    width: 622rpx;
    height: 563rpx;
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
    }
  }
  .bottom {
    display: flex;
    float: right;
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
.tipmask {
  width: 616rpx;
  min-height: 490rpx;
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
.editmask {
  width: 616rpx;
  height: 412rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 28rpx 40rpx 50rpx 37rpx;
  position: relative;
  .close {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    right: 10rpx;
    top: 10rpx;
  }
  .title {
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
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