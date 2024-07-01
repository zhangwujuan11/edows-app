<template>
	<view>
		 <web-view :src="url"></web-view>
  </view>
</template>

<script>
  import { web } from "@/Api/config.js"
  export default {
    data() {
      return {
        url: '',
        otoken: '',
        id: '',
        vinCodeValue: '',
		accountType:''
      }
    },
    onShow() {
      this.otoken = JSON.parse(JSON.stringify(uni.getStorageSync('userInfo').uuid || ''))
	  // let basi='http://dispatch.edows.cn/uniapp/'
	  // let basi ='http://127.0.0.1:8848/dispatch-master/uniapp/'
	  // let basi='https://api2.edows.cn/api2/uniapp/'
      var basi = web.basi
      if (this.id == 0) {
        this.url = basi + "index.html?userInfo=" + this.otoken + "&accountType=" + this.accountType
      } else if (this.id == 341) {
        this.url = basi + "imv.html?userInfo=" + this.otoken
      }else if (this.id == 511) {
        this.url =  basi + "shopUserManager.html?userInfo=" + this.otoken + "&accountType=" + this.accountType
      }else if (this.id == 212) {
        this.url = basi + "resetPwd.html?userInfo=" + this.otoken
      }else if (this.id == 9) {
        this.url =  basi + "shopsop.html?userInfo=" + this.otoken
      } else if (this.id == 10) {
        this.url =  basi + "settleSel.html?userInfo=" + this.otoken
      } else if (this.id == 11) {
        this.url =  basi + "shopUserManager.html?userInfo=" + this.otoken + "&accountType=" + this.accountType
      } else if (this.id == 12) {
        this.url =  basi + "saleList.html?userInfo=" + this.otoken
      } else if (this.id == 13) {
        this.url =  basi + "codePay.html?userInfo=" + this.otoken
      } else if (this.id == 14) {
        this.url =  basi + "shopInfo.html?userInfo=" + this.otoken + "&accountType=" + this.accountType
      } else if (this.id == 15) {
        this.url = basi +  `vinResults.html?parts=&carType=&vin=${this.vinCodeValue}&userInfo=${this.otoken}`
      } else if( this.id == 16 ){
        this.url =  basi + "queryGlass.html?userInfo=" + this.otoken
      } else if( this.id == 17 ){
        this.url =  basi + "annonce.html?userInfo=" + this.otoken
      }else if( this.id == 18 ){
        this.url =  basi + "messageCenter.html?userInfo=" + this.otoken
      }else if( this.id == 19 ){
        this.url = basi +  "queryCarg.html?userInfo=" + this.otoken
      }else if( this.id == 22 ){
        this.url = basi +  "imv.html?userInfo=" + this.otoken
      }else if(this.id==20){
        uni.setNavigationBarTitle({
          title: '隐私政策'
        });
        this.url = "https://store.edows.cn/易道大咖隐私权政策.html"
      }else if(this.id==21){
        uni.setNavigationBarTitle({
          title: '用户服务协议'
        });
        this.url = "https://store.edows.cn/易道大咖平台用户服务协议.html"
      }else if(this.id==22){
        uni.setNavigationBarTitle({
          title: '软件许可使用协议'
        });
        this.url = "https://store.edows.cn/软件许可使用协议.html"
      }else if(this.id==23){
        uni.setNavigationBarTitle({
          title: '用户注册协议'
        });
        this.url = "https://store.edows.cn/易道大咖用户注册协议.html"
      }else if(this.id==24){
        uni.setNavigationBarTitle({
          title: '注册'
        });
        this.url = basi +  "register.html?userInfo=" + this.otoken
      }else{
		  this.url = basi +  this.id
	  }
	  // else if (this.id == 1) {
   //      this.url =  basi + "shopQualApply.html?userInfo=" + this.otoken
   //    } else if (this.id == 2) {
   //      this.url =  basi + "orderList.html?userInfo=" + this.otoken
   //    } else if (this.id == 3) {
   //      this.url =  basi + "surveyList.html?userInfo=" + this.otoken + '&searchType=2'
   //    } else if (this.id == 4) {
   //      this.url =  basi + "queryMember.html?userInfo=" + this.otoken
   //    }else if (this.id == 211) {
   //      this.url = basi + "chargeIng.html?userInfo=" + this.otoken
   //    }else if (this.id == 112) {
   //      this.url = basi + "chargeIngtwo.html?userInfo=" + this.otoken
   //    }else if (this.id == 311) {
   //      this.url = basi + "unilist.html?userInfo=" + this.otoken
   //    }else if (this.id == 321) {
   //      this.url = basi + "provelisttwo.html?userInfo=" + this.otoken
   //    }else if (this.id == 331) {
   //      this.url = basi + "provelist.html?userInfo=" + this.otoken
   //    } else if (this.id == 5) {
   //      this.url =  basi + "saleAdd.html?userInfo=" + this.otoken
   //    } else if (this.id == 6) {
   //      this.url =  basi + "msgOrderList.html?userInfo=" + this.otoken
   //    } else if (this.id == 7) {
   //      this.url =  basi + "securityCode.html?userInfo=" + this.otoken
   //    } else if( this.id == 78 ){
   //      this.url = basi +  "vipcard.html?userInfo=" + this.otoken
   //    }
    },
    onLoad(option) {
      this.id = option.id
      this.vinCodeValue = option.vinCodeValue
	  this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType
    },
    onReady() {
      this.clearMuiBack()
    },
    methods: {
      // 关闭mui返回
      clearMuiBack() {
  // #ifdef APP-PLUS
			var currentWebview = this.$scope.$getAppWebview().children()[0];
			//监听注入的js
			currentWebview.addEventListener("loaded", function() {
				currentWebview.evalJS(
				 "mui.init({keyEventBind: {backbutton: false }});"
				);
			});
			// #endif
      },
    }
  }
</script>

<style>

</style>
