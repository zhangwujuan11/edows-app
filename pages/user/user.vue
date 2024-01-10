<template>
  <view class="container">
    <view class="user-section blueGradient">
      <view class="user-info-box ">
        <block v-if="scores.name">
          <view class="portrait-box">
            <image class="portrait" :src="userInfo.avatar"></image>
          </view>
          <view class="info-box">
            <text class="username">{{scores.name}}</text>
            <!-- <view class="points" @click="onPoints">积分：{{scores.integration}}</view> -->
            <view class="points">限时余额：{{scores.limitedBalance}}</view>
            <view class="points">样板余额：{{scores.securityBalance}}</view>
          </view>
        </block>
        <block v-else>
          <view class="portrait-box">
            <image class="portrait" src="/static/missing-face.png"></image>
          </view>
          <!--   <view class="info-box" @click="navTo('/pages/user/user')">
            <text class="username">登录</text>
          </view> -->
        </block>
        <text class="i-shezhi" @click="navTo('/pages/set/set')"></text>
      </view>
      <!-- <view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="b-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					易到大咖商城会员
				</view>
				<text class="e-m">易到大咖商城会员</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text>
			</view> -->
    </view>

    <view class="cover-container">

      <!-- <view class="tj-sction">
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>积分</text>
				</view>
			</view> -->
      <!-- 订单 -->

      <view class="order-section">
        <view class="order-sec-tit">我的订单</view>
        <view class="order-section-inner">
          <view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"
            :hover-stay-time="50">
            <text class="m-icon m-icon-order"></text>
            <text>全部订单</text>
          </view>
          <view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover"
            :hover-stay-time="50">
            <text class="m-icon m-icon-orderPay"></text>
            <text>待付款</text>
          </view>
          <view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"
            :hover-stay-time="50">
            <text class="m-icon m-icon-orderReceive"></text>
            <text>待收货</text>
          </view>
          <view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"
            :hover-stay-time="50">
            <text class="m-icon m-icon-orderService"></text>
            <text>已完成</text>
          </view>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="history-section icon">
        <view class="cell-item">
          <!-- <view class="list-cell b-b m-t" @click="navTo('/pages/coupon/couponList?state=0')" hover-class="cell-hover" :hover-stay-time="50">
						<text class="m-icon-cell m-icon-cell-quan"></text>
						<text class="cell-tit">领取优惠券</text>
						<text class="cell-more yticon icon-you"></text>
					</view> -->

          <view class="list-cell b-b m-t" @click="navTo('/pages/coupon/index?state=0')" hover-class="cell-hover"
            :hover-stay-time="50">
            <text class="m-icon-cell m-icon-cell-quan"></text>
            <text class="cell-tit">优惠券</text>
            <text class="cell-more yticon icon-you"></text>
          </view>
          <!-- <view class="list-cell b-b m-t" @click="navTo('/pages/accumulate/myPoints')" hover-class="cell-hover" :hover-stay-time="50">
						<text class="m-icon-cell m-icon-cell-quan"></text>
						<text class="cell-tit">我的积分</text>
						<text class="cell-more yticon icon-you"></text>
					</view>
					 -->
          <view class="list-cell b-b m-t" @click="navTo('/pages/address/address')" hover-class="cell-hover"
            :hover-stay-time="50">
            <text class="m-icon-cell m-icon-cell-addr"></text>
            <text class="cell-tit">地址管理</text>
            <text class="cell-more yticon icon-you"></text>
          </view>
          <view class="list-cell b-b m-t" @click="navTo('/pages/facture/facture')" hover-class="cell-hover"
            :hover-stay-time="50">
            <text class="m-icon-cell  m-icon-cell-facture"></text>
            <text class="cell-tit">发票管理</text>
            <text class="cell-more yticon icon-you"></text>
          </view>
          <view class="list-cell b-b m-t" @click="navTo('/pages/shopAccount/shopAccount?id=2')" hover-class="cell-hover"
            :hover-stay-time="50">
            <text class="m-icon-cell  m-icon-cell-shui"></text>
            <text class="cell-tit">样板流水</text>
            <text class="cell-more yticon icon-you"></text>
          </view>
          <view class="list-cell b-b m-t" @click="navTo('/pages/shopAccount/shopAccount?id=3')" hover-class="cell-hover"
            :hover-stay-time="50">
            <text class="m-icon-cell  m-icon-cell-shui"></text>
            <text class="cell-tit">限时流水</text>
            <text class="cell-more yticon icon-you"></text>
          </view>
        </view>
        <!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg" mode="aspectFill"></image>
					<image @click="navTo('/pages/product/product')" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg" mode="aspectFill"></image>
				</scroll-view> -->
        <!-- <list-cell icon="icon-iconfontweixin" iconColor="#339cfe" title="我的优惠券" tips="10"></list-cell>
				<list-cell icon="icon-iconfontweixin" iconColor="#339cfe" title="我的积分" tips="100"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell icon="icon-share" iconColor="#5fcda2" title="发票管理" @eventClick="navTo('/pages/address/address')"></list-cell> -->
        <!-- <list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
				<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></list-cell> -->
        <!-- <list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell> -->
        <!-- <list-cell icon="icon-shezhi1" iconColor="#e07472" title="服务中心" border="" @eventClick="navTo('/pages/set/set')"></list-cell> -->
      </view>
      <!-- <view class="history-section icon">
        <view class="cell-item">
          <view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
            <text class="m-icon-cell m-icon-cell-help"></text>
            <button class="cell-tit" open-type='contact'>服务中心</button>
            <text class="cell-more yticon icon-you"></text>
          </view>
        </view>
      </view> -->
    </view>


  </view>
</template>
<script>
  import listCell from '@/components/mix-list-cell';
  import {
    mapState
  } from 'vuex';
  let startY = 0,
    moveY = 0,
    pageAtTop = true;
  export default {
    components: {
      listCell
    },
    data() {
      return {
        coverTransform: 'translateY(0px)',
        coverTransition: '0s',
        moving: false,
        scores: 0
      }
    },

    onLoad(option) {
      // console.log('hasLogin：',this.hasLogin, 'option：',option);
      // let returnUrl = getCurrentPages()[0].route;
      // console.log('当前路由：',returnUrl);
      // if (!this.hasLogin) {
      // 	uni.reLaunch({
      // 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
      // 	})
      // }

    },
    onShow() {
      this.getData()
    },

    // #ifndef MP
    onNavigationBarButtonTap(e) {
      const index = e.index;
      if (index === 0) {
        this.navTo('/pages/set/set');
      } else if (index === 1) {
        // #ifdef APP-PLUS
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        const currentWebview = page.$getAppWebview();
        currentWebview.hideTitleNViewButtonRedDot({
          index
        });
        // #endif
        uni.navigateTo({
          url: '/pages/notice/notice'
        })
      }
    },
    // #endif
    computed: {
      ...mapState(['hasLogin', 'userInfo'])
    },
    methods: {
      async getData() {
        let score = await this.$axios(this.$baseUrl.scoreone)
        this.scores = score.data.data
      },
      /**
       * 统一跳转接口,拦截未登录路由
       * navigator标签现在默认没有转场动画，所以用view
       */
      navTo(url) {
		  console.log(!this.hasLogin)
        // if (!this.hasLogin) {
        //   url = '/pages/wxAuth/wxAuth?returnUrl=' + url.substr(1);
        //   //url = '/pages/public/login';

        // }
        uni.navigateTo({
          url
        })
      },

      /**
       *  会员卡下拉和回弹
       *  1.关闭bounce避免ios端下拉冲突
       *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
       *    transition设置0.1秒延迟，让css来过渡这段空窗期
       *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
       */
      coverTouchstart(e) {
        if (pageAtTop === false) {
          return;
        }
        this.coverTransition = 'transform .1s linear';
        startY = e.touches[0].clientY;
      },
      coverTouchmove(e) {
        moveY = e.touches[0].clientY;
        let moveDistance = moveY - startY;
        if (moveDistance < 0) {
          this.moving = false;
          return;
        }
        this.moving = true;
        if (moveDistance >= 80 && moveDistance < 100) {
          moveDistance = 80;
        }

        if (moveDistance > 0 && moveDistance <= 80) {
          this.coverTransform = `translateY(${moveDistance}px)`;
        }
      },
      coverTouchend() {
        if (this.moving === false) {
          return;
        }
        this.moving = false;
        this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
        this.coverTransform = 'translateY(0px)';
      },
      onPoints() {
        uni.navigateTo({
          url: '/pages/accumulate/myPoints'
        })
      },
    }
  }
</script>
<style lang='scss'>
  %flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  %section {
    display: flex;
    justify-content: space-around;
    align-content: center;
    background: #fff;
    border-radius: 10upx;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #f5f5f5
  }

  .user-section {
    height: 300upx;
    padding: 50upx 30upx 0;
    position: relative;

  }

  .user-info-box {
    height: 180upx;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;

    .portrait {
      width: 130upx;
      height: 130upx;
      border: 5upx solid #fff;
      border-radius: 50%;
    }

    .username {
      display: block;
      font-size: $font-lg + 6upx;
      color: $font-color-blanc;
      margin-left: 20upx;
    }

    .points {

      background: linear-gradient(90deg, #349CFF, #65B4FF);
      color: #fff;
      font-size: 22upx;
      margin-left: 20upx;
      margin-top: 10upx;
      padding: 10upx 15upx;
      border-radius: 50upx;
    }

  }

  .i-shezhi {
    position: absolute;
    top: 10upx;
    right: 0;
    display: block;
    width: 36upx;
    height: 36upx;
    background: url(../../static/icon/set.png) no-repeat;
    background-size: contain
  }

  .m-icon {
    display: block;
    width: 48upx;
    height: 48upx;
    background: url(../../static/icon/order.png) no-repeat;
    background-size: contain;
    margin: 20upx 0
  }

  .m-icon-orderPay {
    background: url(../../static/icon/order_pay.png) no-repeat;
    background-size: contain;
  }

  .m-icon-orderReceive {
    background: url(../../static/icon/order_receive.png) no-repeat;
    background-size: contain;
  }

  .m-icon-orderService {
    background: url(../../static/icon/order_service.png) no-repeat;
    background-size: contain;
  }

  .cover-container {
    background: $page-color-base;
    /* margin-top: -150upx; */
    width: 94%;
    margin: -70upx auto 0;
    position: relative;
    background: #f5f5f5;
    padding-bottom: 20upx;
    border-radius: 4px;

    .arc {
      position: absolute;
      left: 0;
      top: -34upx;
      width: 100%;
      height: 36upx;
    }
  }

  .order-section {
    background: #fff;
    border-radius: 10upx;
    padding: 28upx 0 50upx;
    margin-top: 20upx;

    .order-sec-tit {
      margin: 0upx 40upx 30upx;
      font-weight: 600
    }

    .order-section-inner {
      @extend %section;

      .order-item {
        @extend %flex-center;
        width: 120upx;
        height: 120upx;
        border-radius: 10upx;
        font-size: $font-sm;
        color: $font-color-dark;
      }

      .yticon {
        font-size: 48upx;
        margin-bottom: 18upx;
        color: #339cfe;
      }

      .icon-shouhoutuikuan {
        font-size: 44upx;
      }
    }
  }

  .history-section {
    /* padding: 30upx 0 0; */
    margin-top: 20upx;
    background: #fff;
    border-radius: 10upx;

    .sec-header {
      display: flex;
      align-items: center;
      font-size: $font-base;
      color: $font-color-dark;
      line-height: 40upx;
      margin-left: 30upx;

      .yticon {
        font-size: 44upx;
        color: #5eba8f;
        margin-right: 16upx;
        line-height: 40upx;
      }
    }

    .h-list {
      white-space: nowrap;
      padding: 30upx 30upx 0;

      image {
        display: inline-block;
        width: 160upx;
        height: 160upx;
        margin-right: 20upx;
        border-radius: 10upx;
      }
    }
  }

  .list-cell {
    display: flex;
    align-items: center;
    padding: 30upx $page-row-spacing;
    border-radius: 10upx;
    line-height: 60upx;
    position: relative;
    background: #fff;
    justify-content: center;

    &.log-out-btn {
      margin-top: 40upx;

      .cell-tit {
        color: $uni-color-primary;
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


    .m-icon-cell {
      width: 60upx;
      height: 60upx;
      margin-right: 18upx;
      background: url(../../static/icon/address.png) no-repeat;
      background-size: contain;
    }

    .m-icon-cell-facture {
      background: url(../../static/icon/facture.png) no-repeat;
      background-size: contain;
    }

    .m-icon-cell-quan {
      background: url(../../static/icon/quan.png) no-repeat;
      background-size: contain;
    }

    .m-icon-cell-shui {
      background: url(../../static/icon/liushui.png) no-repeat;
      background-size: contain;
    }

    .m-icon-cell-help {
      background: url(../../static/icon/help.png) no-repeat;
      background-size: contain;
    }

    button {
      background: none;
      text-align: left;
      padding: 0;
      margin: 0;
      height: 60upx;
      line-height: 60upx;
    }

    button:after {
      border: none;
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
      transform: translateX(16upx) scale(.84);
    }
  }
</style>