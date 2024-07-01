<template>
  <view class="container">
    <view class="wxCode">
      <image src="../../static/yddc.png"></image>
      <text>易道大咖</text>
    </view>

    <!-- <view class="list-cell">
      <text class="cell-tit" @click="goChangePwd">修改密码</text>
      <text class="cell-more yticon icon-you"></text>
    </view> -->
    <view class="list-cell">
      <text class="cell-tit">个性化推荐</text>
      <!-- <text class="cell-more yticon icon-you"></text> -->
      <switch
        :checked="personalizat"
        class="cell-more yticon"
        @change="switchChange"
      />
    </view>

    <!-- <view class="list-cell top" @click="navTo('/pages/help/register')">
      <text class="cell-tit">用户注册协议</text>
      <text class="cell-more yticon icon-you"></text>
    </view> -->
    <view class="list-cell top" @click="goPolicy(21)">
      <text class="cell-tit">用户服务协议</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell" @click="goPolicy(20)">
      <text class="cell-tit">隐私政策</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell" @click="goPolicy(22)">
      <text class="cell-tit">软件许可使用协议</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell" @click="goPolicy(23)">
      <text class="cell-tit">用户注册协议</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <!-- 		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view> -->

    <view class="list-cell top" @click="is_call = true">
      <text class="cell-tit">帮助与客服</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell">
      <text class="cell-tit" @click="logoff">注销账号</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell">
      <text class="cell-tit">当前版本</text>
      <!-- <text class="cell-tip">{{version}}</text> -->
      <text class="cell-tip">V{{version}}</text>
      <!-- <text class="cell-more yticon icon-you"></text> -->
    </view>

    <!-- 帮助与客服 -->
    <view v-if="is_call" class="maskphoneBox">
      <view class="inside oh">
        <image
          class="close"
          src="/static/close.png"
          @click="is_call = false"
        ></image>
        <view class="title">请拨打电话</view>
        <view class="mobile">400-988-6868</view>
        <view class="btns flex">
          <!-- <view @click="is_call = false" class="btn">取消</view> -->
          <!-- <view class="btn sure" @click="copy">复制</view> -->
        </view>
      </view>
    </view>

    <uni-popup ref="popup" type="center">
      <view class="password">
        <image class="close" src="/static/close.png" @click="cancel"></image>
        <view class="item">
          <view class="label">旧密码</view>
          <input
            class="uni-input"
            placeholder="请输入旧密码"
            :password="showOldPassword"
          />
          <uni-icons
            :type="!showOldPassword ? 'eye' : 'eye-slash'"
            size="26"
            class="uni-icon"
            @click="changeOldPassword"
          ></uni-icons>
        </view>
        <view class="item">
          <view class="label">新密码</view>
          <input
            class="uni-input"
            placeholder="请输入新密码"
            :password="showPassword"
          />
          <uni-icons
            :type="!showPassword ? 'eye' : 'eye-slash'"
            size="26"
            class="uni-icon"
            @click="changePassword"
          ></uni-icons>
        </view>
        <view class="item">
          <view class="label">确认新密码</view>
          <input
            class="uni-input"
            placeholder="再次确认新密码"
            :password="showAgainPassword"
          />
          <uni-icons
            :type="!showAgainPassword ? 'eye' : 'eye-slash'"
            size="26"
            class="uni-icon"
            @click="changeAgainPassword"
          ></uni-icons>
        </view>
        <view class="konw" @click="confirm">确认修改</view>
        <!-- <text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']"
						@click="changePassword">&#xe568;</text> -->
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import { logout2, logoff } from "@/Api/ww.js";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  components: {
    uniPopup: uniPopup,
  },
  data() {
    return {
      is_call: false,
      showOldPassword: true,
      showPassword: true,
      showAgainPassword: true,
      personalizat: true,
      version: ""
    };
  },
  computed: {
    ...mapState(["hasLogin", "userInfo"]),
  },
  onLoad() {
    // let returnUrl = getCurrentPages()[0].route;
    // if (!this.hasLogin) {
    //   uni.reLaunch({
    //     url: "/pages/wxAuth/wxAuth?returnUrl=" + returnUrl,
    //   });
    // }
    this.version = uni.getSystemInfoSync().appVersion;
    if (this.personalizat != "") {
      this.personalizat = uni.getStorageSync("personalizat");
    } else {
      this.personalizat = true;
    }
  },
  methods: {
    ...mapMutations(["logout"]),

    navTo(url) {
      //this.$api.msg(`跳转到${url}`);
      uni.navigateTo({
        url,
      });
    },
    //退出登录
    toLogout() {
      uni.showModal({
        content: "确定要退出登录么",
        success: (e) => {
          if (e.confirm) {
            this.logout();
            setTimeout(() => {
              uni.navigateBack();
            }, 200);
          }
        },
      });
    },
    logoff() {
      uni.showModal({
        title: "提示",
        content: "确定要注销吗？注销后不能再使用",
        success: (res) => {
          if (res.confirm) {
            logoff({ token: uni.getStorageSync("userInfo").token })
              .then((res) => {
                if (res.code == 200) {
                  logout2().then();
                  this.logout();
                  uni.reLaunch({
                    url: "/pages/login/login",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            return;
          }
        },
      });
    },
    switchChange(e) {
      uni.setStorageSync("personalizat", e.detail.value);
      this.personalizat = e.detail.value;
    },
    goPolicy(e) {
      uni.navigateTo({
          url: "/pages/storepage/storepage?id=" + e,
        });
    },
    // copy() {
    //   uni.setClipboardData({
    //     data: 123,
    //     success: (res) => {
    //       this.is_call = false;
    //       uni.showToast({
    //         title: "复制成功",
    //         icon: "none",
    //       });
    //     },
    //   });
    // },
    goChangePwd() {
      this.$refs.popup.open();
    },
    cancel() {
      this.$refs.popup.close();
    },
    changePassword() {
      this.showPassword = !this.showPassword;
    },
    changeAgainPassword() {
      this.showAgainPassword = !this.showAgainPassword;
    },
    changeOldPassword() {
      this.showOldPassword = !this.showOldPassword;
    },
  },
};
</script>

<style lang='scss' scoped>
page {
  background: $page-color-base;
}

.wxCode {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50upx 0;

  image {
    width: 160upx;
    height: 160upx;
    margin-bottom: 20upx;
  }
}

.list-cell {
  display: flex;
  align-items: baseline;
  padding: 20upx $page-row-spacing;
  line-height: 60upx;
  position: relative;
  background: #fff;
  justify-content: center;
  border-bottom: rgb(240, 238, 238) solid 1px;

  &.log-out-btn {
    margin-top: 40upx;

    .cell-tit {
      color: $font-color-blue;
      text-align: center;
      margin-right: 0;
    }
  }

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b:after {
    left: 30upx;
  }

  &.m-t {
    margin-top: 16upx;
  }

  .cell-more {
    align-self: baseline;
    font-size: $font-lg;
    color: $font-color-light;
    margin-left: 10upx;
  }

  .cell-tit {
    flex: 1;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    margin-right: 10upx;
  }

  .cell-tip {
    font-size: $font-base;
    color: $font-color-light;
  }

  switch {
    transform: translateX(16upx) scale(0.84);
  }
}

.top {
  margin-top: 30rpx;
}

.maskphoneBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(42, 45, 50, 0.7);
  z-index: 9999999;

  .inside {
    margin: 400rpx auto;
    width: 600rpx;
    height: 220rpx;
    text-align: center;
    color: #000;
    font-weight: 700;
    border-radius: 20rpx;
    background: #fff;
    padding-top: 40rpx;

    .title {
      font-size: 34rpx;
      line-height: 48rpx;
      // margin-top: 40rpx;
    }

    .mobile {
      margin-top: 30rpx;
      font-size: 40rpx;
      line-height: 56rpx;
    }

    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .close {
      width: 60rpx;
      height: 60rpx;
      position: fixed;
      right: 80rpx;
      top: 400rpx;
    }
    .btns {
      margin-top: 40rpx;
    }
  }
}

.password {
  width: 680rpx;
  height: 520rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 60rpx 30rpx 60rpx 60rpx;
  position: relative;
  .close {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    right: 10rpx;
    top: 10rpx;
  }
  .item {
    display: flex;
    line-height: 100rpx;
    align-items: center;
  }
  .label {
    width: 200rpx;
  }
  .konw {
    width: 180rpx;
    height: 76rpx;
    line-height: 76rpx;
    border-radius: 20rpx;
    text-align: center;
    color: #fff;
    font-size: 26rpx;
    background-color: #359cff;
    margin: 0 auto;
    margin-top: 36rpx;
  }
}
</style>