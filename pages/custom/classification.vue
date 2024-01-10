<template>
  <view style="padding: 24rpx 0rpx">
    <view v-if="list && list.length > 0">
      <view class="list-box" v-for="(item, index) of list" :key="index">
        <view class="title">{{ item.classifyName }}</view>
        <view class="content">
          <view class="flex">
            <view class="label">分类编号</view>
            <view class="input">{{ item.classifyCode }}</view>
          </view>
          <view class="flex">
            <view class="label">创建时间</view>
            <view class="input">{{ item.createTime }}</view>
          </view>
          <view class="flex">
            <view class="label">备注</view>
            <view class="input">{{ item.remark }}</view>
          </view>
        </view>
        <view class="btn-box">
          <view
            class="btn"
            @click="
              go(
                `/pages/custom/addClassify?classifyId=${item.customerClassifyId}&classifyName=${item.classifyName}&operate=0`
              )
            "
            >修改</view
          >
          <view
            class="btn"
            @click="
              go(
                `/pages/custom/classification?classifyId=${item.customerClassifyId}&classifyName=${item.classifyName}`
              )
            "
            >进入分类</view
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
      @click="
        go(`/pages/custom/addClassify?classifyId=${classifyId}&operate=1`)
      "
      class="add"
      src="@/static/add.png"
    ></image>
  </view>
</template>

<script>
import { customList } from "@/Api/purchaseSales.js";
export default {
  data() {
    return {
      list: [],
      classifyId: "",
      classifyName: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      initId: "",
      is_show: false,
    };
  },
  onLoad(option) {
    if (option.classifyName) {
      uni.setNavigationBarTitle({
        title: `${option.classifyName}分类`,
      });
      this.classifyName = option.classifyName;
    }
    this.classifyId = option.classifyId;
    this.getTreeList();
  },
  onReachBottom() {
    if (this.list.length == this.total) {
      this.is_show = true;
    } else {
      this.is_show = false;
      this.pageNum++;
      this.getTreeList();
    }
  },
  methods: {
    go(e) {
      uni.navigateTo({
        url: e,
      });
    },
    getTreeList(num, size) {
      uni.showLoading({
        title: "加载中",
      });
      let params = {
        parentId: this.classifyId ? this.classifyId : `${this.initId}`,
        pageNum: num ? num : this.pageNum,
        pageSize: size ? size : this.pageSize,
      };
      customList(params).then((res) => {
        if (res.code == 200) {
          if (res.data.items && res.data.items[0].parentId == null) {
            this.classifyId = res.data.items[0].customerClassifyId;
            this.initId = res.data.items[0].customerClassifyId;
            this.getTreeList(num, size);
          } else {
            uni.hideLoading();
            this.list = size
              ? res.data.items
              : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-box {
  width: 686rpx;
  min-height: 447rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
  border-radius: 30rpx;
  margin: 0rpx auto;
  margin-bottom: 24rpx;
  padding: 32rpx;
  .title {
    font-size: 32rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: bold;
    color: #333333;
  }
  .content {
    width: 622rpx;
    min-height: 209rpx;
    background: #f5f7fb;
    border-radius: 20rpx;
    margin-top: 28rpx;
    padding: 28rpx 32rpx 0rpx 32rpx;
    .flex {
      display: flex;
      padding-bottom: 24rpx;
    }
    .label {
      width: 114rpx;
      height: 35rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 500;
      color: #999999;
      margin-right: 34rpx;
    }
    .input {
      width: 420rpx;
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      word-break: break-all;
    }
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 28rpx;
    .btn {
      width: 140rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      background: #f5f7fb;
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normbal;
      color: #007dff;
      border-radius: 40rpx;
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