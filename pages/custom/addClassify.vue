<template>
  <view style="padding-top: 24rpx">
    <view class="main">
      <view class="list">
        <view class="label"><text class="symbol">*</text>分类编号</view>
        <input
          :disabled="operate == 0 ? true : false"
          v-model="code"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="list">
        <view class="label"><text class="symbol">*</text>分类名称</view>
        <input
          v-model="name"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="list">
        <view class="label">备注</view>
        <textarea
          maxlength="300"
          class="uni-input"
          placeholder-class="placeholder"
          v-model="remark"
          auto-height
          placeholder="请输入"
        />
      </view>
    </view>
    <view class="bottom">
      <view class="cancel" @click="cancel">取消</view>
      <view class="sure" @click="sure">确定</view>
    </view>
  </view>
</template>

<script>
import {
  addCustomClassify,
  customClassifyDetails,
  editCustomClassify,
} from "@/Api/purchaseSales.js";

export default {
  data() {
    return {
      code: "",
      name: "",
      remark: "",
      classifyId: "",
      operate: "",
    };
  },
  onBackPress(event) {
    if (event.from == "navigateBack") {
      const pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage = prevPage.$vm;
      if (prevPage && prevPage.getTreeList) {
        prevPage.getTreeList(1, prevPage.list.length + 1);
      }
    }
  },
  onLoad(option) {
    this.classifyId = option.classifyId;
    this.operate = option.operate;
    if (option.operate == 0) {
      uni.setNavigationBarTitle({
        title: `修改${option.classifyName}`,
      });
      this.getDetails();
    } else {
      uni.setNavigationBarTitle({
        title: `新增客户分类`,
      });
    }
  },
  methods: {
    cancel() {
      uni.navigateBack({
        delta: 1,
      });
    },
    sure() {
      if (!this.code) {
        return uni.showToast({
          title: "分类编号不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.name) {
        return uni.showToast({
          title: "分类名称不能为空",
          icon: "none",
          duration: 1000,
        });
      }
      let params = {
        classifyCode: `${this.code}`,
        classifyName: `${this.name}`,
        remark: `${this.remark}`,
      };
      if (this.operate == 0) {
        params.customerClassifyId = this.classifyId;
        editCustomClassify(params).then((res) => {
          if (res.code == 200) {
            uni.showLoading({
              title: "修改成功",
              icon: "none",
              duration: 1000,
            });
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 500);
          }
        });
      } else {
        (params.parentId = this.classifyId),
          addCustomClassify(params).then((res) => {
            if (res.code == 200) {
              uni.showLoading({
                title: "新增成功",
                icon: "none",
                duration: 1000,
              });
            }
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 500);
          });
      }
    },
    getDetails() {
      customClassifyDetails(this.classifyId).then((res) => {
        this.code = res.data.classifyCode;
        this.name = res.data.classifyName;
        this.remark = res.data.remark;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 750rpx;
  min-height: 354rpx;
  background: #ffffff;
  .list {
    width: 750rpx;
    min-height: 118rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0rpx 32rpx 0rpx 32rpx;
    display: flex;
    justify-content: space-between;
    .label {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #010914;
    }
    .symbol {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #df0000;
      margin-right: 4rpx;
      vertical-align: middle;
    }
    .uni-input {
      text-align: right;
    }
    .placeholder {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #b4b5bf;
    }
  }
}
.bottom {
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  position: fixed;
  bottom: 0rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .cancel {
    width: 330rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #f5f7fb;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #010914;
    margin-left: 20rpx;
  }
  .sure {
    width: 330rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #007dff;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #ffffff;
    margin-right: 20rpx;
  }
}
</style>