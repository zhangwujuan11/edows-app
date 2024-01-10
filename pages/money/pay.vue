<template>
  <view class="app">
    <view class="orderInfo-box">
      <image src="../../static/order.png"></image>
      <text>订单提交成功</text>
    </view>
    <!-- <view class="order-box">
			<text>订单编号： </text>
			<text>{{orderData.orderSn}}</text>
		</view> -->
    <view class="price-box">
      <text>支付金额： </text>
      <text class="price">{{orderData.totalPrice}}</text>
    </view>

    <view class="pay-type-list">

      <!-- <view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#339cfe" :checked='payType == 1' />
					</radio>
				</label>
			</view> -->
      <!-- <view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
    </view>
    <block v-if="accountType!=3">
      <view class="mix-btn blueGraShadow" :class="{'greyShadow' : subFlag == false}" @click="confirm(orderData)">
        确认支付</view>
      <view v-show="orderData.isOffline == 1" class="mix-btn blueGraShadow" :class="{'greyShadow' : subFlag == false}"
        @click="upload(orderData)">线下支付</view>
      <view class="goBack" @click="toMyOrder">我的订单</view>
    </block>
    <block v-else>
      <view class="mix-btn blueGraShadow" @click="toMyOrder">我的订单</view>
    </block>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        subFlag: true,
        payType: 1,
        orderData: {},
        accountType: 0
      };
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo'])
    },
    onLoad(option) {
      // let returnUrl = getCurrentPages()[0].route;
      // console.log('当前路由：', returnUrl, 'userInfo：', uni.getStorageSync('userInfo'));
      // if (!this.hasLogin) {
      //   uni.reLaunch({
      //     url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
      //   })
      // }
      this.orderData = JSON.parse(option.data).orderData;
      this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType ? uni.getStorageSync('UmsMember').UmsMember.accountType : 0;
    },

    methods: {
      //确认支付
      async confirm(item) {
        var _self = this;

        var params = {
          orderSn: item.orderSn,
          payType: 'MWEB',
          useSecurityBalance: _self.orderData.useSecurityBalance
        }
        let res = await this.$axios(this.$baseUrl.orderPayer, params);
        
        if (res.data.code == 200) {
		 let data = res.data.data
		 let mweb_url = res.data.data.mwebUrl
		 	const platform = uni.getSystemInfoSync().platform
		 	const domain = 'www.edows.cn'
		 	const webview = plus.webview.create('','custom-webview');
		 	switch (platform) {
		 		case 'android':
		 			webview.loadURL(mweb_url, {'Referer': 'https://' + domain});
		 			break;
		 		case 'ios':
		 			webview.loadURL(mweb_url, {'Referer': domain + '://'});
		 			break;
		 		default:
		 			break;	
		 	}
        }

        // uni.requestPayment({
        //   provider: 'wxpay',
        //   appId: 1,
        //   timeStamp: 1,
        //   nonceStr: 1,
        //   package: 1,
        //   signType: 1,
        //   paySign: 1,
        //   success: function(res) {
        //     _self.$api.msg('支付成功');
        //     // uni.redirectTo({
        //     //   url: '/pages/money/paySuccess?totalPrice=' +
        //     //     item.totalPrice
        //     // })
        //   },
        //   fail: function(err) {
        //     _self.$api.msg('支付失败');
        //     console.log('fail:' + JSON.stringify(err));
        //   }
        // });

        // var _self = this;
        // if (_self.subFlag) {
        //   _self.subFlag = false;
        //   console.log(_self.subFlag)
        //   uni.login({
        //     provider: 'weixin',
        //     success: async (loginRes) => {
        //       var params = {
        //         orderSn: item.orderSn,
        //         openId: uni.getStorageSync('openId') ? uni.getStorageSync('openId') : '',
        //         useSecurityBalance: _self.orderData.useSecurityBalance
        //       }
        //       console.log(params)
        //       let res = await this.$axios(this.$baseUrl.orderPayer, params);
        //       console.log("返回数据：", res.data.data)
        //       if (res.data.data.appId) {
        //         uni.requestPayment({
        //           provider: 'wxpay',
        //           appId: res.data.data.appId,
        //           timeStamp: res.data.data.timeStamp,
        //           nonceStr: res.data.data.nonceStr,
        //           package: res.data.data.packageValue,
        //           signType: res.data.data.signType,
        //           paySign: res.data.data.paySign,
        //           success: function(res) {
        //             uni.redirectTo({
        //               url: '/pages/money/paySuccess?totalPrice=' +
        //                 item.totalPrice
        //             })
        //           },
        //           fail: function(err) {
        //             _self.$api.msg('支付失败');
        //             console.log('fail:' + JSON.stringify(err));
        //           }
        //         });
        //       } else if (res.data.data == '支付成功') {
        //         _self.$api.msg(res.data.data);
        //         setTimeout(() => {
        //           uni.redirectTo({
        //             url: '/pages/money/paySuccess?totalPrice=' +
        //               item.totalPrice
        //           })
        //         }, 1000)
        //       }
        //     }
        //   });
        //  
		
        // }
      },
      //跳转我的订单
      toMyOrder() {
        uni.navigateTo({
          url: '/pages/order/order?state=0'
        })
      },
      async toOffline(item) {
        var _self = this;
        var orderSn = "";
        var arrOrderSn = [];
        if (item.orderSn) {
          orderSn = item.orderSn;
        } else {
          for (var i in item) {
            arrOrderSn.push(item[i].orderSn)
          }
          orderSn = arrOrderSn.join(',')
          console.log(orderSn)
        }
        var params = {
          orderSn: orderSn,
          pzImg: item.pzImg
        }
        let {
          data
        } = await _self.$axios(_self.$baseUrl.offlinePay, params)
        console.log(data)
        if (data.code == 200) {
          _self.$api.msg('提交成功');
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/order/order?state=0'
            })
          }, 1600)

        }
      },
      upload: function(item) {
        var _self = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], //从相册选择
          success: res => {
            console.log(res, 0)
            const tempFilePaths = res.tempFilePaths;
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: async res => { //成功的回调
                let imgPath = 'data:image/png;base64,' + res.data;
                console.log(res, 1)
                var params = {
                  "base64Data": imgPath,
                  "bizType": 0
                }
                let {
                  data
                } = await _self.$axios(_self.$baseUrl.uploadPic, params)
                console.log(data)
                if (data.code == 200) {
                  item.pzImg = data.data.webPath
                  setTimeout(() => {
                    _self.toOffline(item)
                  }, 300)
                }
              }
            })
          },
          error: function(e) {
            console.log(e);
          }
        });
      },

    }
  }
</script>

<style lang='scss'>
  .app {
    width: 100%;
  }

  .orderInfo-box {
    position: relative;
    padding-top: 80upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    image {
      width: 234upx;
      height: 196upx;
    }

    text {
      line-height: 100upx
    }
  }

  .order-box {
    text-align: center;
    font-size: $font-base;
    color: #909399;
  }

  .price-box {
    background-color: #fff;
    height: 160upx;
    display: flex;

    justify-content: center;
    align-items: baseline;
    font-size: 28upx;
    color: #909399;

    .price {
      font-size: 50upx;
      color: $font-color-red;
      margin-top: 12upx;

      &:before {
        content: '￥';
        font-size: 40upx;
      }
    }
  }

  .pay-type-list {
    margin-top: 20upx;
    background-color: #fff;
    padding-left: 60upx;

    .type-item {
      height: 120upx;
      padding: 20upx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 60upx;
      font-size: 30upx;
      position: relative;
    }

    .icon {
      width: 100upx;
      font-size: 52upx;
    }

    .icon-erjiye-yucunkuan {
      color: #fe8e2e;
    }

    .icon-weixinzhifu {
      color: #36cb59;
    }

    .icon-alipay {
      color: #01aaef;
    }

    .tit {
      font-size: $font-lg;
      color: $font-color-dark;
      margin-bottom: 4upx;
    }

    .con {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: $font-sm;
      color: $font-color-light;
    }
  }

  .mix-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 630upx;
    height: 80upx;
    margin: 80upx auto 30upx;
    font-size: $font-lg;
    color: #fff;
    background-color: $base-color;
    border-radius: 10upx;

  }

  .greyShadow {
    background-color: #ccc;
    background: #ccc
  }

  .goBack {
    position: relative;
    width: 630upx;
    margin: 0 auto 30upx;
    height: 80upx;
    line-height: 80upx;
    background: #fff;
    font-size: $font-lg;
    color: #339CFE;
    text-align: center;
    border-radius: 12upx;
  }
</style>