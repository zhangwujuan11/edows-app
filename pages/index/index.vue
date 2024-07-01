<template>
  <view class="container">
    <!-- <backPages></backPages> -->
    <!-- <wm-watermark text="易道大咖"></wm-watermark> -->
    <view class="topBg">
      <view class="yd_top">
        <view class="mp-search-box" @click="toKeySearch">
          <text class="m-icon-search"></text>
          <text class="ser-input">您要买什么？</text>
        </view>
      </view>
	  <CustomTabBar :currentTab="currentTab"></CustomTabBar>
      <!-- <button open-type='contact'>点击进入客服会话</button> -->
      <!-- 头部轮播 -->
      <view class="carousel-section">

        <swiper class="carousel" @change="swiperChange">
          <swiper-item v-for="(item, index) in bannerList" :key="index" class="carousel-item" @click="visitLog(item)">
            <image :src="item.imgPath" />
          </swiper-item>
        </swiper>
        <swiper-dot class="dot" :current="current" :list="bannerList"></swiper-dot>
      </view>
    </view>

    <!-- 秒杀楼层 -->
    <view class="seckill-section m-t">
      <view class="inner-section">
        <view class="s-header">
          <!-- <text>人气产品</text> -->
          <!-- <text class="yticon icon-you" >更多推荐</text> -->
          <image src="../../static/floor1.png" class="pic-floor1"></image>
        </view>
        <!-- <scroll-view class="" scroll-x> -->
        <view class="scoll-wrapper">
          <view v-for="(item, index) in brandList" :key="index" class="floor-item" @click="navToProductListPage(item,1)"
            v-if="index<4">
            <image :src="item.coverImg"></image>
            <text class="title clamp">{{item.name}}</text>
            <!-- <text class="price">￥{{item.minPrice}}</text> -->
          </view>
        </view>

        <view class="s-header">
          <!-- <text>人气产品</text> -->
          <!-- <text class="yticon icon-you" >更多推荐</text> -->
          <image src="../../static/floor2.png" class="pic-floor2"></image>
          <view class="line-h"></view>
        </view>

        <view class="scoll-wrapper">
          <view v-for="(item, index) in glassSpecialClassList" :key="index" class="floor-item"
            @click="navToProductListPage(item,2)" v-if="index<4">
            <image :src="item.coverImg"></image>
            <text class="title clamp">{{item.name}}</text>
            <!-- <text class="price">￥{{item.minPrice}}</text> -->
          </view>
        </view>
        <!-- </scroll-view> -->
      </view>
    </view>

    <!-- 秒杀楼层 -->
    <view class="seckill-section m-t" style="padding:4rpx 30rpx 0rpx">
      <view class="inner-section">
        <view class="s-header">
          <!-- <text>热卖产品</text> -->
          <!-- <text class="yticon icon-you" >更多推荐</text> -->
          <image src="../../static/floor3.png" class="pic-floor3"></image>
        </view>
        <!-- <scroll-view class="" scroll-x> -->
        <view class="scoll-wrapper">
          <view v-for="(item, index) in hightBrandList" :key="index" class="floor-item"
            @click="navToProductListPage(item,1)" v-if="index<4">
            <image :src="item.coverImg"></image>
            <text class="title clamp">{{item.name}}</text>
            <!-- 	<text class="price">￥{{item.minPrice}}</text> -->
          </view>
        </view>

        <view class="s-header">
          <!-- <text>热卖产品</text> -->
          <!-- <text class="yticon icon-you" >更多推荐</text> -->
          <image src="../../static/floor4.png" class="pic-floor4"></image>
          <view class="line-h line-h2"></view>
        </view>
        <view class="scoll-wrapper">
          <view v-for="(item, index) in hotProductList" :key="index" class="floor-item" @click="navToDetailPage(item)"
            v-if="index<4">
            <image :src="item.masterImg"></image>
            <text class="title clamp">{{item.name}}</text>
            <text class="price">￥{{item.minPrice}}</text>
          </view>
        </view>
        <!-- </scroll-view> -->
      </view>
    </view>




    <!-- 猜你喜欢 -->
    <view class="f-header m-t">
      <image src="/static/new.png"></image>
      <view class="tit-box">

        <text class="tit">最新产品</text>
        <!-- <text class="tit2">Newest products</text> -->
      </view>
      <!-- <text class="yticon icon-you"></text> -->
    </view>

    <view class="guess-section">
      <view v-for="(item, index) in productList" :key="index" class="guess-item" @click="navToDetailPage(item)">
        <view class="image-wrapper">
          <image :src="item.masterImg"></image>
        </view>
        <view class="inner-guess">
          <text class="title clamp">{{item.name}}</text>
          <text class="price">￥{{item.minPrice}}</text>
        </view>
      </view>
    </view>

    <view class="showIcon" @click="toReserve" v-if="accountType==0">
      <image src="../../static/showIcon.png"></image>
    </view>
    <!-- <CustomTabBar :currentTab="currentTab"></CustomTabBar> -->
  </view>
</template>

<script>
  import backPages from "@/components/backPages.vue"
  // import swiperDot from "@/components/swiperDot.vue"
  import CustomTabBar from "@/components/CustomTabBar.vue"

  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      // swiperDot,
      backPages,
      CustomTabBar
    },

    data() {
      return {
        titleNViewBackground: '',
        swiperCurrent: 0,
        swiperLength: 0,
        indicatorDots: false,
        accountType: "",
        autoplay: true,
        interval: 2000,
        duration: 500,
        current: 0,
        bannerList: [],
        popularityProductList: [],
        hotProductList: [],
        productList: [],
        brandList: [],
        glassSpecialClassList: [],
        hightBrandList: [],
        carouselList: [],
        goodsList: [],
        titletop: 0,
        titleheight: 0,
        currentTab: 'tab1', // 初始选中的 Tab
      };
    },
    created() {
      // uni.hideTabBar()
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo'])
    },
    async onLoad() {
      //隐藏原生的tabbar,有自定义tabbar的页面都要写一遍
      // let res = uni.getMenuButtonBoundingClientRect();
      // this.titletop = res.top;
      // this.titleheight = res.height
      this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType ? uni.getStorageSync('userInfo')
        .accountType : "";
      this.getData();
    },
    //强制刷新 
    async onShow() {
      this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType ? uni.getStorageSync('userInfo')
        .accountType : "";
      this.getData();
    },
    methods: {
      //请求数据 
      async getData() {
        var params = {}
        let res = await this.$axios(this.$baseUrl.getHomePageData, params);

        this.bannerList = res.data.data.bannerList;
        this.popularityProductList = res.data.data.popularityProductList;
        this.productList = res.data.data.productList;
        this.hotProductList = res.data.data.hotProductList;
        this.brandList = res.data.data.brandList;
        this.glassSpecialClassList = res.data.data.glassSpecialClassList;
        this.hightBrandList = res.data.data.hightBrandList;

      },

      //记录广告访问Log
      async visitLog(e) {
        var params = {
          "advertisementId": e.id
        }
        let res = await this.$axios(this.$baseUrl.visitLog, params);

      },
      //轮播图切换修改背景色
      swiperChange(e) {
        this.current = e.detail.current;
        // this.swiperCurrent = index;
        // this.titleNViewBackground = this.carouselList[index].background;
      },
      //去搜索页
      toKeySearch() {
        uni.navigateTo({
          url: `/pages/keySearch/keySearch`
        })
      },
      //详情页
      navToDetailPage(item) {
        //测试数据没有写id，用title代替
        let code = item.code;
        uni.navigateTo({
          url: `/pages/product/product?code=${code}`
        })
      },
      //列表页
      navToProductListPage(item, type) {
        if (type == 2) {
          let specialClassId = item.id;
          uni.navigateTo({
            url: `/pages/product/list?specialClassId=${specialClassId}`
          })
        } else if (type == 1) {
          let brandCode = item.code;
          let parentClassId = item.parentClassId
          uni.navigateTo({
            url: `/pages/product/list?brandCode=${brandCode}&parentClassId=${parentClassId}`
          })
        }

      },

      //预约服务
      toReserve() {
        uni.navigateTo({
          url: `/pages/reserve/reserve`
        })
      }

    },
  }
</script>

<style lang="scss" scoped>
  page {
    .cate-section {
      position: relative;
      z-index: 5;
      border-radius: 16upx 16upx 0 0;
      margin-top: -20upx;
    }

    .carousel-section {
		margin-top: 120upx;
      .titleNview-placing {
        padding-top: 0;
        height: 0;
      }

      .carousel {
        .carousel-item {
          padding: 0;
        }
      }

      .swiper-dots {
        left: 45upx;
        bottom: 40upx;
      }
    }
  }




  page {
    background: #399eff;
  }

  // .yd_gray{ -webkit-filter: grayscale(100%);
  //     filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  // }
  .topBg {
    width: 100%;
    // background: url(../../static/bg.jpg) center no-repeat;
	background-color:  rgb(57, 158, 255);
    background-size: contain;
  }

  .yd_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
	background: #399eff;
  }

  .jifen {
    width: 15%;
    text-align: center;
    margin-right: 15upx;
    margin-top: 15upx;

    image {
      width: 40upx;
      height: 40upx;
    }

    view {
      font-size: 24upx;
      color: #fff;
    }
  }

  .showIcon {
    position: fixed;
    right: 1%;
    bottom: 150upx;
    z-index: 10;
    width: 180upx;
    height: 180upx;

    image {
      width: 180upx;
      height: 180upx;
    }
  }

  .m-t {
    margin-top: 16upx;
  }

  .mp-search-box {
    position: relative;
    width: 100%;
    // background: rgba(255, 255, 255, .6);
    padding:10upx;

    .m-icon-search {
      position: absolute;
      display: block;
      width: 40upx;
      height: 40upx;
      left: 70upx;
      top: 28upx;
      background: url(../../static/search.png) no-repeat;
      background-size: contain;
      z-index: 1;
    }

    .ser-input {
      position: relative;
      display: block;
      width: 92%;
      margin: 0 auto;
      flex: 1;
      height: 70upx;
      line-height: 70upx;
      text-indent: 100upx;
      font-size: 28upx;
      color: $font-color-base;
      border-radius: 70upx;
      background: #ffffff;
    }
  }

  /* 头部 轮播图 */
  .carousel-section {
    position: relative;

    .titleNview-placing {
      height: var(--status-bar-height);
      padding-top: 44px;
      box-sizing: content-box;
    }

    .titleNview-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 426upx;
      transition: .4s;
    }
  }

  .carousel {
    width: 710upx;
    padding-top: 20upx;
    margin: 0 auto;
    height: 280upx;

    .carousel-item {
      width: 710upx;
      height: 256upx;
      overflow: hidden;
    }

    image {
      width: 710upx;
      height: 256upx;
      border-radius: 20upx;
    }
  }


  /* 分类 */
  .cate-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 30upx 22upx;
    background: #fff;

    .cate-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $font-sm + 2upx;
      color: $font-color-dark;
    }

    /* 原图标颜色太深,不想改图了,所以加了透明度 */
    image {
      width: 88upx;
      height: 88upx;
      margin-bottom: 14upx;
      border-radius: 50%;
      opacity: .7;
      box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
    }
  }

  .ad-1 {
    width: 100%;
    height: 210upx;
    padding: 10upx 0;
    background: #fff;

    image {
      width: 100%;
      height: 100%;
    }
  }

  /* 秒杀专区 */
  .seckill-section {
    padding: 4upx 30upx 24upx;

    // background: #fff;
    .inner-section {
      background: #f3f8fe;
      border-radius: 20rpx;


    }

    .s-header {
      // display: flex;
      position: relative;
      align-items: center;
      height: 86upx;
      // line-height: 1;

      .pic-floor1 {
        width: 282upx;
        height: 50upx;
      }

      .pic-floor2 {
        width: 262upx;
        height: 50upx;
      }

      .pic-floor3,
      .pic-floor4 {
        width: 222upx;
        height: 50upx;
      }


      .line-h {
        height: 4upx;
        width: 424upx;
        position: absolute;
        right: 0;
        top: 4upx;
        background: #218fe6
      }

      .line-h2 {
        width: 464upx
      }

      .s-img {
        width: 140upx;
        height: 30upx;
      }

      .tip {
        font-size: $font-base;
        color: $font-color-light;
        margin: 0 20upx 0 40upx;
      }

      .timer {
        display: inline-block;
        width: 40upx;
        height: 36upx;
        text-align: center;
        line-height: 36upx;
        margin-right: 14upx;
        font-size: $font-sm+2upx;
        color: #fff;
        border-radius: 2px;
        background: rgba(0, 0, 0, .8);
      }

      .icon-you {
        font-size: $font-lg;
        color: $font-color-light;
        flex: 1;
        text-align: right;
      }

      .icon-you:before {
        content: ''
      }

      .icon-you:after {
        content: "\E606"
      }
    }

    .floor-list {
      white-space: nowrap;
    }

    .scoll-wrapper {
      padding: 0 10px 10px;
      display: flex;
      align-items: flex-start;
      // justify-content: space-between;
      // margin-bottom: 40upx;
    }

    .floor-item {

      width: 150upx;
      margin-right: 18upx;
      font-size: $font-sm+2upx;
      color: $font-color-dark;
      line-height: 1.8;

      image {
        width: 150upx;
        height: 150upx;
        text-align: center;
        border-radius: 20upx;
        border: 4upx solid #2a9fe6;
      }

      .title {
        padding: 14upx 0 0 0;
        font-size: $font-sm;
        text-align: center;
        color: $font-color-dark;
        line-height: 38upx;
        height: 60upx;
      }


      .price {
        font-weight: 600;
        color: $uni-color-primary;
      }
    }
  }

  .f-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140upx;
    padding: 6upx 30upx 0;
    color: #fff;
    text-align: center;
    // background: #f8f8f8;

    image {
      flex-shrink: 0;
      width: 50upx;
      height: 50upx;
      margin-right: 20upx;
    }

    .tit-box {
      // flex: 1;
      // display: flex;
      // flex-direction: column;
    }

    .tit {
      font-size: $font-lg +2upx;
    }

    .tit2 {
      font-size: $font-sm;
      color: $font-color-light;
    }

    .icon-you {
      font-size: $font-lg +2upx;
      color: $font-color-light;
    }
  }

  /* 团购楼层 */
  .group-section {
    // background: #fff;

    .g-swiper {
      height: 650upx;
      padding-bottom: 30upx;
    }

    .g-swiper-item {
      width: 100%;
      padding: 0 30upx;
      display: flex;
    }

    image {
      width: 100%;
      height: 460upx;
      border-radius: 4px;
    }

    .g-item {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .left {
      flex: 1.2;
      margin-right: 24upx;

      .t-box {
        padding-top: 20upx;
      }
    }

    .right {
      flex: 0.8;
      flex-direction: column-reverse;

      .t-box {
        padding-bottom: 20upx;
      }
    }

    .t-box {
      height: 160upx;
      font-size: $font-base+2upx;
      color: $font-color-dark;
      line-height: 1.6;
    }

    .price {
      font-weight: 600;
      color: $uni-color-primary;
    }

    .m-price {
      font-size: $font-sm+2upx;
      text-decoration: line-through;
      color: $font-color-light;
      margin-left: 8upx;
    }

    .pro-box {
      display: flex;
      align-items: center;
      margin-top: 10upx;
      font-size: $font-sm;
      color: $font-base;
      padding-right: 10upx;
    }

    .progress-box {
      flex: 1;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 8upx;
    }
  }

  /* 分类推荐楼层 */
  .hot-floor {
    width: 100%;
    overflow: hidden;
    margin-bottom: 20upx;

    .floor-img-box {
      width: 100%;
      height: 320upx;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(255, 255, 255, .06) 30%, #f8f8f8);
      }
    }

    .floor-img {
      width: 100%;
      height: 100%;
    }

    .floor-list {
      white-space: nowrap;
      padding: 20upx;
      padding-right: 50upx;
      border-radius: 6upx;
      margin-top: -140upx;
      margin-left: 30upx;
      background: #fff;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
      position: relative;
      z-index: 1;
    }

    .scoll-wrapper {
      display: flex;
      align-items: flex-start;
    }

    .floor-item {
      width: 200upx;
      display: inline-block;
      margin-right: 20upx;
      font-size: $font-sm;
      color: $font-color-dark;
      line-height: 1.8;

      image {
        // width: 180upx;
        // height: 180upx;
        border-radius: 6upx;
      }

      .price {
        color: $uni-color-primary;
      }
    }

    .more {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex-shrink: 0;
      width: 180upx;
      height: 180upx;
      border-radius: 6upx;
      background: #f3f3f3;
      font-size: $font-base;
      color: $font-color-light;

      text:first-child {
        margin-bottom: 4upx;
      }
    }
  }

  /* 猜你喜欢 */
  .guess-section {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30upx;
    // background: #f8f8f8;

    .guess-item {
      display: flex;
      flex-direction: column;
      width: 330upx;
      // padding: 20upx;
      margin-bottom: 30upx;
      border-radius: 20upx;
      background: #fff;

      &:nth-child(2n+1) {
        margin-right: 30upx;
      }
    }

    .image-wrapper {
      width: 330upx;
      height: 330upx;
      border-radius: 20upx 20upx 0 0;
      overflow: hidden;
      background: #fff;

      image {
        width: 330upx;
        height: 330upx;
        opacity: 1;
        border-radius: 20upx 20upx 0 0;
      }
    }

    .inner-guess {
      padding: 20upx
    }

    .title {
      padding: 14upx 0 0 0;
      font-size: $font-base - 2upx;
      color: $font-color-dark;
      line-height: 38upx;
      height: 60upx;
      // height: 94upx;
    }

    .price {
      font-weight: 600;
      padding-top: 14upx;
      font-size: $font-lg;
      color: $uni-color-primary;
      line-height: 1;
    }
  }
  .container{
	  background-color: rgb(57, 158, 255);
  }
</style>