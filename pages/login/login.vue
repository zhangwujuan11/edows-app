<template>
  <view class="content">
    <image src="@/static/top.jpg" style="width: 100%;"></image>
    <view class="form-control">
      <uni-forms :modelValue="formData" ref="form" :rules="rules">
        <uni-forms-item name="userName">
          <image src="@/static/user.png" style="height: 50rpx; width: 50rpx;margin-bottom: 10rpx;margin-left: 10rpx;">
          </image>
          <input class="uni-input" type="text" v-model="formData.userName" placeholder="请输入登录账号" />
        </uni-forms-item>
        <uni-forms-item name="password">
          <image src="@/static/pwd.png" style="height: 50rpx; width: 50rpx;margin-bottom: 10rpx;margin-left: 10rpx;">
          </image>
          <input class="uni-input" type="password" v-model="formData.password" placeholder="请输入登录密码" />
        </uni-forms-item>
      </uni-forms>
    </view>
    <view class="bottom">
      <view class="login" @click="Loginbtn('form')">登录</view>
    </view>
    <view class="agreeInfo" style="margin-bottom: 20rpx;">
      <checkbox @click="check1" :checked='show1'></checkbox>
      <label style="font-size: 28rpx;">是否记住账号密码</label>
    </view>
    <view class="agreeInfo">
      <checkbox @click="check"></checkbox>
      <label>我已阅读并同意</label>
      <label class="blue" @click="policy">《法律声明及隐私权政策》</label>
      <label>和</label>
      <label class="blue" @click="pdf">《协作门店合作协议》</label>
      <label>内容</label>
    </view>

    <uni-popup ref="popup" type="center" :is-mask-click="false">
      <view class="iframe-box">
        <view class="iframe">
              <iframe src="https://store.edows.cn/易道大咖隐私权政策.html" frameborder="0" width="100%" height="100%"></iframe>
        </view>
          <view class="konw" @click="cancel">同意并继续</view>
          <view class="nokonw" @click="exit">不同意并退出</view>
      </view>
    </uni-popup>
  
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import {
    mapMutations
  } from 'vuex'
  import config, {
    web
  } from "@/Api/config.js"
  import {
    loginss,
    login1,
    userInfo1,
  } from '@/Api/ww.js'
  export default {
  components: {
    uniPopup: uniPopup,
  },
    data() {
      return {
        formData: {},
        // 校验规则
        rules: {
          userName: {
            rules: [{
              required: true,
              errorMessage: '账号不能为空'
            }]
          },
          password: {
            rules: [{
              required: true,
              errorMessage: '密码不能为空'
            }]
          }
        },
        show: false,
        show1: false,
        pdf1: {
          type: '2',
          src: 'http://27.155.120.108:51085/api/sop/webview?file=images/cooperate.pdf'
        },
      }
    },
    onLoad() {
      uni.removeStorage({
        key: 'jump'
      })
      //取出缓存中的账号、密码
      const HBuserName = uni.getStorageSync("HBuserName");
      const HBpassword = uni.getStorageSync("HBpassword");
      const HBshow = uni.getStorageSync('HBshow')
      if (HBuserName && HBpassword && HBshow) {
        this.formData.userName = HBuserName;
        this.formData.password = HBpassword;
        this.show1 = HBshow
      }
    },
    onReady(){
      let is_show = uni.getStorageSync('privacyPopup') || 'yes' 
      if(is_show == 'yes'){
        this.openIframe()
      }
    },
    methods: {
      ...mapMutations(['login']),
      policy() {
        uni.navigateTo({
          url: "/pages/storepage/storepage?id=" + 20,
        });
      },
      pdf() {
        uni.navigateTo({
          url: '/pages/login/agreement?item=' + encodeURIComponent(JSON.stringify(this.pdf1))
        })
      },
       Loginbtn(ref) {
        let that = this
        uni.showLoading()
        if (this.show == true) {
          this.$refs[ref].validate().then( res => {
            login1(this.formData).then(data=>{
				if (data.code == 200) {
				  // uni.showToast({
				  //   title: `登录成功`
				  // })
				  // 如果勾选了记住账号密码就保存账号密码到缓存中
				  if (this.show1) {
				    uni.setStorageSync("HBuserName", this.formData.userName);
				    uni.setStorageSync("HBpassword", this.formData.password);
				    uni.setStorageSync("HBshow", this.show1);
				  } else {
				    // 销毁缓存中的账号、密码
				    uni.removeStorageSync("HBuserName");
				    uni.removeStorageSync("HBpassword");
				    uni.removeStorageSync("HBshow");
				  }
				} else {
				  return
				}
				let obj= { //存的数据可以是很多条
				  'token': data.data.token,
				  "uuid": data.data.uuid,
				}
				uni.setStorageSync('userInfo',obj)
				 let userInfo = uni.getStorageSync('userInfo') || '';
				 if (userInfo.token) {
				 	userInfo1().then(data1=>{
				 		uni.setStorageSync( 'UmsMember',{
						   StoreUser: data1.data.storeUser,
						   UmsMember: data1.data.umsMember,
						 })
						 //更新登陆状态
						 // that.login(res.data);
						 setTimeout(() => {
							  uni.reLaunch({
								url: "/pages/appindex/appindex",
							  })
							   uni.hideLoading()
							}, 500)
						 
				 	})
				 }
			})
          }).catch(err => {})
        } else {
          return uni.showToast({
            title: "您还未阅读并同意此协议",
            icon: "none",
            duration: 1000,
          });
        }
      },
      check() {
        this.show = !this.show
      },
      openIframe(){
        this.$refs.popup.open()
      },
      cancel() {
      this.$refs.popup.close();
      uni.setStorageSync("privacyPopup", 'no')
      },
      exit(){
        switch (uni.getSystemInfoSync().platform) {
          case 'android':
            plus.runtime.quit();
            break;
          case 'ios':
            plus.ios.import('UIApplication').sharedApplication().performSelector('exit');
            break;
        }
      },
      check1() {
        this.show1 = !this.show1
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    background-color: #fff;
    width: 100%;
    height: 100vh;
    // height: 100%;

    .form-control {
      margin-top: 100rpx;
    }

    /deep/ .uni-forms-item {

      width: 90vw;
      margin-left: 5vw;
      border-bottom: 1rpx solid gainsboro;
      font-size: 30rpx;

      .uni-input {
        display: inline-block;
        width: 80%;
        height: 100%;
        padding-left: 4vw;
      }
    }

    .bottom {
      width: 90vw;
      margin-left: 5vw;
      margin-bottom: 50rpx;

      .login {
        width: 100%;
        margin-top: 80rpx;
        height: 92rpx;
        line-height: 92rpx;
        border-radius: 20rpx;
        text-align: center;
        color: #fff;
        font-size: 32rpx;
        background-color: #359cff;
      }

    }

    .agreeInfo {
      font-size: 24rpx;
      width: 90vw;
      margin-left: 6vw;
    }

    a {
      text-decoration: none;
    }

    ::v-deep .uni-checkbox-input {
      width: 30rpx;
      height: 30rpx;
      margin-bottom: 10rpx;
    }
  }
  .iframe-box{
    position: relative;
    padding: 60rpx 2rpx 110rpx 0rpx;
    width: 680rpx;
    height: 900rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .iframe{
      width: 680rpx;
      height: 730rpx;
      -webkit-overflow-scrolling: touch; 
      overflow-y:scroll;
      &::-webkit-scrollbar {
      display: none;
    }
    }
    .nokonw{
        width: 50%;
        height: 96rpx;
        line-height: 96rpx;
        border-bottom-left-radius: 20rpx;
        text-align: center;
        color: #e2dede;
        font-size: 28rpx;
        background-color: #359cff;
        position: absolute;
        left: 0%;
        transform:translate(0%,19%);
        border-right: 1rpx solid rgb(214, 204, 204);
    }
    .konw{
        width: 50%;
        height: 96rpx;
        line-height: 96rpx;
        border-bottom-right-radius: 20rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
        background-color: #359cff;
        position: absolute;
        right: 0%;
        transform:translate(0%,19%)
    }
  }
</style>