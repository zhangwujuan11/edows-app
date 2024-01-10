<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="search">
        <picker
          @change="bindPickerChange"
          :value="currIndex"
          :range="searchList"
        >
          <view class="uni-input"></view>
          <view class="label">{{ searchList[currIndex] }}</view>
        </picker>
        <image class="icon" src="/static/bottom.png"></image>
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
    </view>
    <view v-if="list && list.length > 0">
      <view class="list" v-for="(item, index) of list" :key="index">
        <view class="flex">
          <view class="flex">
            <!-- <image
            v-if="item.chioce"
            @click="chioce(item, index)"
            class="check"
            src="/static/check.png"
          ></image>
          <view
            v-else
            @click="chioce(item, index)"
            class="spacecheck"
            src="/static/select.png"
          ></view> -->
            <view class="name">{{ item.name }}</view>
          </view>
          <view
            class="status"
            :style="{
              background: item.status == 1 ? '#E07000' : '#007DFF',
            }"
          ></view>
          <view
            class="font"
            :style="{ color: item.status == 1 ? '#E07000' : '#007DFF' }"
            >{{ item.status == 1 ? "禁用" : "正常" }}</view
          >
        </view>
        <view class="contain">
          <view class="row">
            <view class="label">简称</view>
            <view class="input">{{ item.shorterName }}</view>
          </view>
          <view class="row">
            <view class="label">信用度</view>
            <view class="input">{{ item.credit }}</view>
          </view>
          <view class="row">
            <view class="label">销售折扣</view>
            <view class="input">{{ item.salesRate }}</view>
          </view>
          <view class="row">
            <view class="label">电话</view>
            <view class="input">{{ item.phone }}</view>
          </view>
          <view class="row">
            <view class="label">地址</view>
            <view class="input">{{ item.customerAddress }}</view>
          </view>
          <view class="row">
            <view class="label">创建时间</view>
            <view class="input">{{ item.createTime }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="del" @click="open(item)">删除</view>
          <view
            class="edit"
            @click="go('/pages/custom/addCustom?id=' + item.customerId)"
            >修改</view
          >
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
      @click="go('/pages/custom/addCustom')"
    ></image>
    <!-- <view class="operate">
      <view class="flex">
        <image
          @click="selectAll"
          v-if="allSelect"
          class="check"
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
      <view class="mark">
        <view class="title">系统提示</view>
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <image class="sigh" src="/static/sigh.png"></image>
        <view class="content"
          >是否确认删除名称为"{{ currDel.name }}"的数据项？</view
        >
        <view class="bottom">
          <view class="sure" @click="confirm">确定</view>
          <view class="cancel" @click="cancel">取消</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import { customManagementList, delCustom } from "@/Api/purchaseSales.js";
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
      pageNum: 1,
      pageSize: 10,
      total: 0,
      currIndex: 0,
      searchList: ["客户名称", "电话", "地址"],
      currDel: {},
      is_show: false,
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
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      this.getList();
    }
  },
  methods: {
    chioce(item, index) {
      this.list[index].chioce = !item.chioce;
      if (item.chioce) {
        let isTrue = this.selectList.every((ptem) => {
          return ptem.id != item.id;
        });
        if (isTrue) {
          this.selectList.push(item);
        }
      } else {
        for (var i = this.selectList.length; i > 0, i--; ) {
          if (this.selectList[i].id == item.id) {
            this.selectList.splice(i, 1);
            break;
          }
        }
        this.allSelect = false;
      }
    },
    selectAll() {
      this.allSelect = !this.allSelect;
      this.list.forEach((item) => {
        item.chioce = this.allSelect;
      });
      if (this.allSelect) {
        this.selectList = JSON.parse(JSON.stringify(this.list));
      } else {
        this.selectList = [];
      }
    },
    open(e) {
      this.currDel = e;
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
    getList(num, size) {
      let params = {
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
      };
      if (this.searchValue != "") {
        switch (this.currIndex) {
          case 0:
            params.name = this.searchValue;
            break;
          case 1:
            params.phone = this.searchValue;
            break;
          case 2:
            params.customerAddress = this.searchValue;
            break;
        }
      }
      uni.showLoading({
        title: "加载中",
      });
      customManagementList(params).then((res) => {
        if (res.code == 200) {
          uni.hideLoading();
          this.list = size
            ? res.data.items
            : [...this.list, ...(res.data.items || [])];
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
    confirm() {
      uni.showLoading({
        title: "加载中",
      });
      delCustom(`${this.currDel.customerId}`).then((res) => {
        if (res.code == 200) {
          uni.hideLoading();
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
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 750rpx;
  height: 92rpx;
  background: #ffffff;
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
  height: 624rpx;
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
    height: 386rpx;
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