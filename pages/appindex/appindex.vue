<template>
  <view class="app-index">
    <view class="banner">
      <view class="info">今日日期码：{{ datecode
      }}
      </view>
      <view @click="gostorepage(18)" class="message-box"
          ><image
            class="message"
            src="../../static/message.png"
            mode=""
          ></image>
          <view v-if="messageNum > 0" class="message-num">{{ messageNum>100 ? '99+' : messageNum }}</view>
        </view>
      <view class="search">
        <view class="select">
          <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
          </picker>
        </view>
        <view class="input">
          <input style="width: 264rpx" @input="toUpperCase" @confirm="collect(15)" v-model="vinCodeValue"
            class="serinput" confirm-type="search" placeholder="输入或扫描VIN查询" />
        </view>
        <image @click="chioceView" class="scan" src="../../static/appIndex/scan_icon.png" mode=""></image>
      </view>
      <view class="panel">
        <view class="tit">
          <view class="text">营收情况</view>
        </view>
        <view class="content">
          <view class="item">
            <view class="l1">{{ orderData.orderNum }}</view>
            <view class="l2">今日开单</view>
          </view>
          <view class="item">
            <view class="l1">{{ orderData.amount }}</view>
            <view class="l2">今日收款</view>
          </view>
          <view class="item">
            <view class="l1">{{ orderData.monOrderNum }}</view>
            <view class="l2">本月开单</view>
          </view>
          <view class="item">
            <view class="l1">{{ orderData.monAmount }}</view>
            <view class="l2">本月产值</view>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="tit">
          <view class="text">门店服务</view>
        </view>
        <view class="more" @click="gostorepage(0)" v-if="accountType != 4 && accountType != 6">查看更多>></view>
        <view class="content">
			<!--  -->
			<!-- <view class="item" @click="ttttt()" >
			  <view class="l1">
			    <image class="icon" src="../../static/appIndex/shop-icon4.png" mode=""></image>
			  </view>
			  <view class="l2">会员卡测试</view>
			</view> -->
			
			<!--  -->
			
			
			<view class="item" v-for="(item,index) in shoplist" @click="gostorepage(item.href,item.menuType)" :key="index">
			   <view class="l1">
			     <image class="icon" :src="item.icon" mode=""></image>
			   </view>
			   <view class="l2">{{item.name}}</view>
			 </view>
        </view>
      </view>
      <view v-if="noteList && noteList.length > 0" class="information" @click="gostorepage(17)">
        <view class="line"></view>
        <image class="img" src="../../static/appIndex/information.png"></image>
        <view class="t1">{{ noteList[0].title }}</view>
        <view class="t2">{{ noteList[0].introduct }}</view>
      </view>
      <view class="swiper-panel">
        <swiper class="swiper" circular :indicator-dots="true" indicator-active-color="#fff" :autoplay="true"
          :interval="5000">
          <swiper-item v-for="(item, index) of viewList" :key="index">
            <image class="img" :src="item.imgPath"></image>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="authority_mask" v-if="showMask">
      <view class="box">
        <view>相机权限使用说明：</view>
        <view>用于拍摄照片、扫码、上传图片等场景</view>
      </view>
    </view>
  </view>
</template>

<script>
import { web } from "@/Api/config.js";
  import {
    pathToBase64
  } from "image-tools";
  import {
    loginss,
    login1,
    userInfo1
  } from "@/Api/ww.js";
  import {
    mapMutations
  } from "vuex";
  import {
    datecode,
    bannerList,
    orderData,
    notesList,
    vinCode,
    messageNum,
	indexlist
  } from "@/Api/purchaseSales.js";
  export default {
    data() {
      return {
        value: 0,
        array: ["VIN码查询", "车型查询", "carg查询"],
        index: 0,
        duration: [],
        token: "",
        datecode: "",
        viewList: [],
        orderData: {},
        noteList: [],
        vinCodeValue: "",
        messageNum: null,
		accountType:uni.getStorageSync('UmsMember').UmsMember.accountType,
        showMask: false,
		shoplist:[]
      };
    },
    async onLoad() {
		this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType
		
      // let userInfo2 = uni.getStorageSync("userInfo") || "";
      // let that = this;
      // if (userInfo2.token) {
      //   const data1 = await userInfo1();
      //   uni.setStorage({
      //     //存入Storage
      //     key: "userInfo", //自己取个名字
      //     data: {
      //       //存的数据可以是很多条
      //       token: userInfo2.token,
      //       StoreUser: data1.data.storeUser,
      //       UmsMember: data1.data.umsMember,
      //       uuid: userInfo2.uuid,
      //     },
      //     success: () => {
      //       let userInfo = uni.getStorageSync("userInfo") || "";
      //       if (userInfo.token) {
      //         //更新登陆状态
      //         uni.getStorage({
      //           key: "userInfo",
      //           success: (res) => {
      //             that.login(res.data);
      //           },
      //         });
      //       }
      //     },
      //   });
      // }
    },
    onShow() {
		this.accountType=uni.getStorageSync('UmsMember').UmsMember.accountType
      let userInfo = uni.getStorageSync("userInfo") || "";
      if (userInfo.token) {
        this.token = userInfo.token;
        this.getDatecode();
        this.getBannerList();
        this.getOrderData();
        this.getNotesList();
        this.getMessageNum()
        this.getCertificate()
      }
	  
	  indexlist().then(res=>{
		  this.shoplist=res.data
	  })
    },
    methods: {
      ...mapMutations(["login"]),
      bindPickerChange: function(e) {
        this.index = e.detail.value;
        if (e.detail.value == 1) {
          this.gostorepage(16);
          this.$nextTick(() => {
            this.index = 0;
          });
        }else if(e.detail.value == 2){
          this.gostorepage(19);
          this.$nextTick(() => {
            this.index = 0;
          });
        }
      },
      gostorepage(e,menuType) {
		  if(menuType == 0){
			  uni.navigateTo({
			    url: e
			  });
		  }else{
			  uni.navigateTo({
			    url: "/pages/storepage/storepage?id=" + e,
			  });
		  }
        
      },
      getDatecode() {
        datecode({
          token: this.token,
        }).then((res) => {
          if (res.code == 200) {
            this.datecode = res.data;
          }
        });
      },
      getBannerList() {
        bannerList({
          token: this.token,
        }).then((res) => {
          if (res.code == 200) {
            this.viewList = res.data;
          }
        });
      },
      getOrderData() {
        orderData(this.token).then((res) => {
          if (res.code == 200) {
            this.orderData = res.data;
          }
        });
      },
      getNotesList() {
        notesList({
          token: this.token,
        }).then((res) => {
          if (res.code == 200) {
            this.noteList = res.data.records;
          }
        });
      },
    chioceView() {
      var platform = uni.getSystemInfoSync().platform;
      if (platform == "android") {
        plus.android.checkPermission(
          "android.permission.CAMERA",
          (granted) => {
            if (granted.checkResult == -1) {
              //弹出
              this.showMask = true;
            }
          },
          (error) => {
            console.error("Error checking permission:", error.message);
          }
        );
        plus.android.requestPermissions(["android.permission.CAMERA"], (e) => {
          //关闭
          this.showMask = false;
          if (e.granted.length > 0) {
            this.chooseImage()
            //执行你有权限后的方法
          }
        });
      }else{
        this.chooseImage()
      }
    },
    chooseImage() {
      uni.chooseImage({
        count: 1, // 图片数量
        sizeType: ["compressed"], // 指定选择的图片类型，可以选择原图和压缩图，这里设置为压缩图
        sourceType: ['album',"camera"], // 指定选择图片的来源，这里设置为相机
        success: (res) => {
          uni.getImageInfo({
            src: res.tempFilePaths[0],
            success: (path) => {
              pathToBase64(path.path).then((base64) => {
                this.queryVinCode(base64);
              });
            },
          });
        },
      });
    },
      queryVinCode(val) {
        let params = {
          base64Data: val,
          bizType: "1",
          token: this.token,
        };
        vinCode(params).then((res) => {
        this.vinCodeValue = JSON.parse(res.data.words_result)[0].words;
        this.collect();
      });

      },
      collect() {
        if (this.vinCodeValue == "") {
          uni.showToast({
            title: "请输入VIN码",
            icon: "none",
            duration: 1500,
          });
        } else {
          uni.navigateTo({
            url: `/pages/storepage/storepage?id=15&vinCodeValue=${this.vinCodeValue}`,
          });
        }
      },
      toUpperCase() {
        this.vinCodeValue = this.vinCodeValue.toUpperCase();
      },
      getMessageNum(){
        messageNum({token:this.token}).then((res)=>{
          if(res.code == 200){
            this.messageNum = res.data;
          }
        })
      },
      getCertificate() {
        var config = {};
        config.token = uni.getStorageSync("userInfo").token;
        uni
          .request({
            method: "post",
            timeout: 10000,
            url:
              web.renew +
                "member/updateCertificate?token=" +
                uni.getStorageSync("userInfo").token || "",
            dataType: "json",
            header: config,
          })
          .then((response) => {
            let [error, res] = response;
            if (res.data.code == 200) {
              if (res.data.data) {
                uni.showToast({
                  title: "证书已过期",
                  icon: "none",
                  duration: 3500,
                });
              }
            }
          });
      },
	  // ttttt(){
		 //  uni.navigateTo({
		 //    url: `/pages/vipcard/vipcard`,
		 //  });
	  // }
    }
  }
</script>

<style lang="scss" scoped>
  .app-index {
    height: calc(100vh);
    overflow-y: auto;
    padding-bottom: 300rpx;
    background-color: white;
  }

  .app-index .banner {
    background: url(../../static/appIndex/banner.png) 0 0 no-repeat;
    background-size: 100% auto;
    height: 600rpx;
  }

  .app-index .info {
    padding-top: 70rpx;
    text-align: center;
    height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .app-index .message-box {
    position: relative;
    width: 100rpx;
    height: 100rpx;
    left: 620rpx;
    top: -32rpx;
  }

  .app-index .message {
    width: 30rpx;
    height: 36rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
  }

  .message-num {
    position: absolute;
    top: 24rpx;
    right: 8rpx;
    font-size: 14rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    width: 34rpx;
    height: 18rpx;
    background: #f72626;
    border-radius: 9rpx 9rpx 9rpx 9rpx;
    text-align: center;
  }

  .app-index .search {
    margin-top: 80rpx;
    width: 500rpx;
    margin-left: 32rpx;
    display: flex;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;
  }

  .app-index .select {
    width: 184rpx;
    background: url(../../static/appIndex/down.png) 160rpx 20rpx no-repeat;
    background-size: 28rpx 28rpx;
    font-size: 24rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #333333;
    padding-left: 20rpx;
  }

  .app-index .input {
    flex: 1;
    font-size: 24rpx;
  }

  .serinput {
    height: 70rpx;
    font-size: 24rpx;
    line-height: 70rpx;
    padding-left: 20rpx;
  }

  .app-index .scan {
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    width: 28rpx;
    height: 28rpx;
    z-index: 10;
  }

  .app-index .panel {
    margin: 24rpx 32rpx 0 32rpx;
    background: #ffffff;
    box-shadow: 0px 8px 8px 1px rgba(178, 178, 178, 0.16);
    border-radius: 20rpx;
    padding: 28rpx 0;
    position: relative;
  }

  .app-index .panel2 {
    margin: 28rpx 0 0 0;
    background: #ffffff;
    box-shadow: none;
    border-radius: 20rpx;
    padding: 1rpx 0 28rpx 0;
    position: relative;
  }

  .panel .tit {
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

  .panel .tit::before {
    content: "";
    width: 128rpx;
    height: 10rpx;
    position: absolute;
    left: -4rpx;
    bottom: 5rpx;
    background: linear-gradient(90deg, rgba(0, 125, 255, 0) 0%, #007dff 100%);
    border-radius: 10rpx;
    z-index: 0;
  }

  .panel .text {
    position: relative;
    z-index: 5;
  }

  .panel .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24rpx;
  }

  .panel .content .item {
    width: 161rpx;
    text-align: center;
    margin-bottom: 8rpx;
  }
  .panel .content .item:last-child:nth-child(4n - 1) {
        margin-right: calc(24% + 4% / 4);
    }
   .panel .content .item:last-child:nth-child(4n - 2) {
		margin-right: calc(48% + 8% / 4);
	}

  .panel .content .l1 {
    line-height: 46rpx;
    font-size: 32rpx;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #007dff;
  }

  .app-index .panel2 .content .l1 {
    height: 96rpx;
    width: 96rpx;
    border-radius: 24rpx;
    background: #f7f7f7;
    margin: 0 auto;
    display: block;
    padding: 20rpx;
  }

  .panel .content .l2 {
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    margin-top: 14rpx;
  }

  .panel .content .icon {
    width: 96rpx;
    height: 96rpx;
  }

  .panel .content .icon2 {
    width: 56rpx;
    height: 56rpx;
  }

  .panel .more {
    height: 35rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #007dff;
    position: absolute;
    top: 32rpx;
    right: 28rpx;
  }

  .app-index .information {
    margin: 24rpx 32rpx 0 32rpx;
    background: #f1f8ff;
    border-radius: 20rpx;
    padding: 28rpx 0 28rpx 150rpx;
    position: relative;
    height: 160rpx;
  }

  .app-index .information .img {
    position: absolute;
    width: 80rpx;
    height: 82rpx;
    left: 28rpx;
    top: 39rpx;
  }

  .app-index .information .t1 {
    font-size: 30rpx;
    font-family: Source Han Sans SC-Medium, Source Han Sans SC;
    font-weight: 500;
    color: #333333;
    line-height: 38rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .app-index .information .t2 {
    margin-top: 10rpx;
    font-size: 22rpx;
    font-family: Source Han Sans SC-Normal, Source Han Sans SC;
    font-weight: 400;
    line-height: 34rpx;
    height: 68rpx;
    color: #999;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .app-index .information .line {
    position: absolute;
    background: #d7d7d7;
    height: 42rpx;
    width: 2rpx;
    position: absolute;
    left: 130rpx;
    top: 58rpx;
  }

  .swiper-panel {
    height: 248rpx;
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
  }

  .swiper-panel .img {
    width: 686rpx;
    height: 248rpx;
  }

  .swiper-panel .swiper {
    height: 248rpx;
  }
  .authority_mask {
    position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
    margin: 0 auto;
		z-index: 998999999999999;
		transition: .3s;
    background: rgba(42, 45, 50, 0.7);
    .box{
      margin: 100rpx auto 0;
      width: 600rpx;
      height: 210rpx;
      text-align: center;
      font-weight: 700;
      border-radius: 20rpx;
      background: #fff;
      line-height: 70rpx;
      padding: 34rpx;
    }
  }
</style>