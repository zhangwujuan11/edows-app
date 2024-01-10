<template>
  <view class="app-mine">
    <view class="banner">
      <image class="photo" src="../../static/mine/photo.png" mode=""></image>
      <view class="name">{{form.name}}</view>
      <view class="info">门店编号：{{form.code}}</view>
      <view class="info">门店星级：
        <text v-for="(item,index) in arr" :key="index">
          <image class="star" src="../../static/mine/star.png" mode=""></image>
        </text>

      </view>
    </view>
    <view style="position: relative;top: -60rpx">
      <view class="mine-panel">
        <!-- <view class="tit">我的工单</view> -->
        <view class="content">
          <view class="item" @click="navTo('/pages/shopAccount/shopAccount?id=3')">
            <view class="l1">
              <image class="icon" src="../../static/mine/r1.png" mode=""></image>
            </view>
            <view class="l2">限时余额：{{scores.limitedBalance}}</view>
          </view>
          <!-- <view class="item">
						<view class="l1"><image  class="icon" src="../../static/mine/r2.png" mode=""></image></view>
						<view class="l2">待接单</view>
					</view>
					<view class="item">
						<view class="l1"><image  class="icon" src="../../static/mine/r3.png" mode=""></image></view>
						<view class="l2">已接单</view>
					</view> -->
          <view class="item" @click="navTo('/pages/shopAccount/shopAccount?id=2')">
            <view class="l1">
              <image class="icon" src="../../static/mine/r4.png" mode=""></image>
            </view>
            <view class="l2">样板余额：{{scores.securityBalance}}</view>
          </view>
        </view>
      </view>
      <view class="mine-panel2">
        <view class="item" @click="gopage(10)">
          <view class="c1">
            <image class="icon" src="../../static/mine/i1.png" mode=""></image>
          </view>
          <view class="c2">结算管理</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
        <view class="item" @click="gopage(11)">
          <view class="c1">
            <image class="icon" src="../../static/mine/i2.png" mode=""></image>
          </view>
          <view class="c2">店员管理</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
        <view class="item" @click="gopage(12)">
          <view class="c1">
            <image class="icon" src="../../static/mine/i3.png" mode=""></image>
          </view>
          <view class="c2">销售单列表</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
        <view class="item" @click="gopage(7)">
          <view class="c1">
            <image class="icon" src="../../static/mine/i4.png" mode=""></image>
          </view>
          <view class="c2">太阳膜防伪码</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
      </view>
      <view class="mine-panel2">
        <view class="item" @click="gopage(13)">
          <view class="c1">
            <image class="icon" src="../../static/mine/d1.png" mode=""></image>
          </view>
          <view class="c2">收款码配置</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
        <view class="item" @click="gopage(14)">
          <view class="c1">
            <image class="icon" src="../../static/mine/d2.png" mode=""></image>
          </view>
          <view class="c2">门店信息</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
        <!--      <view class="item">
          <view class="c1">
            <image class="icon" src="../../static/mine/d3.png" mode=""></image>
          </view>
          <view class="c2">更换密码</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view> -->
      </view>
      <view class="mine-panel2" @click="goSet">
        <view class="item">
          <view class="c1">
            <uni-icons class="icon" type="gear" size="28"></uni-icons>
          </view>
          <view class="c2">设置中心</view>
          <view class="c3">
            <image class="to" src="../../static/mine/to.png" mode=""></image>
          </view>
        </view>
      </view>
      <view class="full-btn" @click="logout1">退出</view>
    </view>


  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import {
    logout2
  } from '@/Api/ww.js'
  export default {
    data() {
      return {
        value: 0,
        scores: {
          limitedBalance: 0,
          securityBalance: 0
        },
        form: {},
        arr: []
      }
    },
    onLoad() {
      this.getData()
    },
    onShow() {
      this.arr = []
      this.getData1()
    },
    methods: {
      ...mapMutations(['logout']),
      gopage(e) {
        uni.navigateTo({
          url: "/pages/storepage/storepage?id=" + e,
        });
      },
      async getData() {
        let score = await this.$axios(this.$baseUrl.scoreone)
        if (score.data.code == 200) {
          this.scores = score.data.data
        } else {
          this.scores.limitedBalance = 0
          this.scores.securityBalance = 0
        }
      },
      async getData1() {
        const res = await this.$axios(this.$baseUrl.shopDetail)
        if (res.data.code == 200) {
          this.form = res.data.data
        }
        for (let i = 0; i < this.form.starNumber; i++) {
          this.arr.push({})
        }
      },
      navTo(url) {
        uni.navigateTo({
          url
        })
      },
      logout1() {
        uni.showModal({
          title: '提示',
          content: '确定退出登录?',
          success: (res) => {
            if (res.confirm) {
              logout2().then()
              this.logout()
              uni.reLaunch({
                url: '/pages/login/login'
              })
            } else {
              return
            }
          }
        });
      },
      goSet(){
        uni.navigateTo({
          url: "/pages/set/set",
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .app-mine {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 20rpx;
    background: #F1F1F1;
  }

  .app-mine .banner {
    background: #359BFF;
    background-size: 100% auto;
    padding: 50rpx 0 80rpx 220rpx;
    position: relative;
  }

  .app-mine .banner .photo {
    width: 170rpx;
    height: 170rpx;
    position: absolute;
    left: 32rpx;
    top: 50rpx;
  }

  .app-mine .banner .name {
    height: 49rpx;
    font-size: 34rpx;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 49rpx;
  }

  .app-mine .banner .info {
    margin-top: 10rpx;
    width: 318rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #FFFFFF;
    font-size: 24rpx;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
    border-radius: 25rpx;
    padding-left: 14rpx;
  }

  .app-mine .banner .star {
    width: 25rpx;
    height: 23rpx;
    margin-right: 10rpx;
  }

  .app-mine .mine-panel {
    margin: 24rpx 32rpx 20rpx 32rpx;
    background: #FFFFFF;
    box-shadow: 0px 8px 8px 1px rgba(178, 178, 178, 0.16);
    border-radius: 20rpx;
    padding: 28rpx 0;
    position: relative;
  }

  .mine-panel .tit {
    width: 128rpx;
    height: 47rpx;
    line-height: 47rpx;
    font-size: 32rpx;
    font-family: Source Han Sans SC-Medium, Source Han Sans SC;
    font-weight: 500;
    color: #333333;
    margin-left: 40rpx;
    position: relative;
  }

  .mine-panel .text {
    position: relative;
    z-index: 5;
  }

  .mine-panel .content {
    display: flex;
    margin-top: 38rpx;
  }

  .mine-panel .content .item {
    flex: 1;
    text-align: center;
  }

  .mine-panel .content .l1 {
    line-height: 46rpx;
    font-size: 32rpx;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #007DFF;
  }

  .mine-panel .content .l2 {
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    margin-top: 14rpx;
  }

  .mine-panel .content .icon {
    width: 56rpx;
    height: 56rpx;
  }

  .app-mine .mine-panel2 {
    margin: 24rpx 32rpx 20rpx 32rpx;
    background: #FFFFFF;
    box-shadow: 0px 8px 8px 1px rgba(178, 178, 178, 0.16);
    border-radius: 20rpx;
    overflow: hidden;
  }

  .mine-panel2 .item {
    display: flex;
    padding: 34rpx 0;
    line-height: 52rpx;
    height: 110rpx;
    overflow: hidden;
  }

  .mine-panel2 .item .c1 {
    width: 107rpx
  }

  .mine-panel2 .item .c2 {
    flex: 1;
  }

  .mine-panel2 .item .c3 {
    width: 45rpx;
  }

  .mine-panel2 .item .icon {
    width: 52rpx;
    height: 52rpx;
    margin-left: 32rpx;
  }

  .mine-panel2 .item .to {
    width: 16rpx;
    height: 24rpx;
  }

  .full-btn {
    margin: 24rpx 32rpx 20rpx 32rpx;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(306deg, #FF6D58 0%, #FF4931 100%);
    border-radius: 16rpx;
    font-size: 30rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #FFFFFF;
  }
</style>