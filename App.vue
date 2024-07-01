<script>
import { web } from "@/Api/config.js";
import silenceUpdate from "@/uni_modules/rt-uni-update/js_sdk/silence-update.js"; //引入静默更新
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["login"]),

    /**
     * 获取当前app最新版本
     */
    getAppCurrentVersion() {
      return new Promise((resolve, reject) => {
        // 需要改成自己的服务端的获取app最新版本的接口...
        // 接口返回值要跟要求的字段一样
        uni.request({
            method: "get",
            timeout: 10000,
            url: web.renew + "AppVersion",
            dataType: "json",
          }).then((response) => {
            let [error, res] = response;
            resolve(res.data);
          });
      });
    },
    /**
     * app端强制更新
     */
    // #ifdef APP-PLUS
    checkAppUpdate() {
      //ios市场地址
      let iosUrl = "itms-apps://itunes.apple.com/cn/app/id6473983098?mt=8";
      this.getAppCurrentVersion().then((res) => {
        const obj = {
          describe: res.data.appInfo, // 版本更新内容
          edition_url: uni.getSystemInfoSync().platform == "ios" ? iosUrl : res.data.appDownAddr, // apk、wgt包下载地址或者应用市场地址
          edition_force: res.data.isForceUpdate, // 是否强制更新 0代表否 1代表是
          package_type: 0, // 0是整包升级（apk或者appstore或者安卓应用市场） 1是wgt升级
          edition_issue: res.data.isForceUpdate, // 是否发行 0否 1是 为了控制上架应用市场审核时不能弹出热更新框
          // 版本号 最重要的manifest里的版本号 （检查更新主要以服务器返回的edition_number版本号是否大于当前app的版本号来实现是否更新）
          edition_number: res.data.appVersionCode,
          edition_name: res.data.appVersion, // 版本名称 manifest里的版本名称
          edition_silence: 0, // 是否静默更新 0代表否 1代表是
        };

        plus.runtime.getProperty(plus.runtime.appid, (inf) => {
          if (
            Number(obj.edition_number) > Number(inf.versionCode) &&
            obj.edition_issue == 1
          ) {
            /**
             * 如果是wgt升级，并且是静默更新
             * 注意！如果是手动检查新版本，就不用判断静默更新，请直接跳转更新页，不然点击检查新版本后会没反应
             */
            if (obj.package_type == 1 && obj.edition_silence == 1) {
              // 调用静默更新方法 传入下载地址
              silenceUpdate(obj.edition_url);
            } else {
              /**
               * 跳转更新页面
               */
              this.$nextTick(() => {
                uni.navigateTo({
                  url:
                    "/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=" +
                    JSON.stringify(obj),
                });
              });
            }
          } else {
            // 如果是手动检查新版本 需开启以下注释
            // uni.showModal({
            // 	title: '提示',
            // 	content: '已是最新版本',
            // 	showCancel: false
            // })
          }
        });
      });
    },
    // #endif
  },
  onLaunch: function () {
    let userInfo = uni.getStorageSync("userInfo") || "";
    if (userInfo.token) {
      //更新登陆状态
      uni.getStorage({
        key: "userInfo",
        success: (res) => {
          this.login(res.data);
        },
      });
    }
    //判断是否存在登录信息
    if (!userInfo.token) {
      //不存在则跳转登录页
      uni.reLaunch({
        url: "/pages/login/login",
        success: () => {
          //跳转完页面后再关闭启动页
          plus.navigator.closeSplashscreen();
          // #ifdef APP-PLUS
          this.checkAppUpdate();
          // #endif
        },
      });
    } else {
      //存在则关闭启动页进入首页
      uni.reLaunch({
        url: "/pages/appindex/appindex",
        success: () => {
          //跳转完页面后再关闭启动页
          plus.navigator.closeSplashscreen();
          // #ifdef APP-PLUS
          this.checkAppUpdate();
          // #endif
        },
      });
    }
  },
  globalData: {
    isIphoneX: false,
  },
  onShow: function () {
    // #ifdef APP-PLUS
    this.checkAppUpdate();
    // #endif
    let that = this;
    wx.getSystemInfo({
      success: (res) => {
        // console.log("手机信息res" + res.model);
        let modelmes = res.model;
        if (modelmes.search("iPhone X") != -1) {
          that.$options.globalData.isIphoneX = true;
        }
      },
    });
  },
  onHide: function () {},
};
</script>

<style lang='scss'>
/*
		全局公共样式和字体图标
	*/
@font-face {
  font-family: yticon;
  font-weight: normal;
  font-style: normal;
  src: url("https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf")
    format("truetype");
}

body {
  background-color: #f1f1f1;
}

.uni-app {
  background-color: #ffffff;
  /* 设置导航栏的背景色 */
  opacity: 1;
  /* 设置导航栏的透明度为不透明 */
}

.yticon {
  font-family: "yticon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-yiguoqi1:before {
  content: "\e700";
}

.icon-iconfontshanchu1:before {
  content: "\e619";
}

.icon-iconfontweixin:before {
  content: "\e611";
}

.icon-alipay:before {
  content: "\e636";
}

.icon-shang:before {
  content: "\e624";
}

.icon-shouye:before {
  content: "\e626";
}

.icon-shanchu4:before {
  content: "\e622";
}

.icon-xiaoxi:before {
  content: "\e618";
}

.icon-jiantour-copy:before {
  content: "\e600";
}

.icon-fenxiang2:before {
  content: "\e61e";
}

.icon-pingjia:before {
  content: "\e67b";
}

.icon-daifukuan:before {
  content: "\e68f";
}

.icon-pinglun-copy:before {
  content: "\e612";
}

.icon-dianhua-copy:before {
  content: "\e621";
}

.icon-shoucang:before {
  content: "\e645";
}

.icon-xuanzhong2:before {
  content: "\e62f";
}

.icon-gouwuche_:before {
  content: "\e630";
}

.icon-icon-test:before {
  content: "\e60c";
}

.icon-icon-test1:before {
  content: "\e632";
}

.icon-bianji:before {
  content: "\e646";
}

.icon-jiazailoading-A:before {
  content: "\e8fc";
}

.icon-zuoshang:before {
  content: "\e613";
}

.icon-jia2:before {
  content: "\e60a";
}

.icon-huifu:before {
  content: "\e68b";
}

.icon-sousuo:before {
  content: "\e7ce";
}

.icon-arrow-fine-up:before {
  content: "\e601";
}

.icon-hot:before {
  content: "\e60e";
}

.icon-lishijilu:before {
  content: "\e6b9";
}

.icon-zhengxinchaxun-zhifubaoceping-:before {
  content: "\e616";
}

.icon-naozhong:before {
  content: "\e64a";
}

.icon-xiatubiao--copy:before {
  content: "\e608";
}

.icon-shoucang_xuanzhongzhuangtai:before {
  content: "\e6a9";
}

.icon-jia1:before {
  content: "\e61c";
}

.icon-bangzhu1:before {
  content: "\e63d";
}

.icon-arrow-left-bottom:before {
  content: "\e602";
}

.icon-arrow-right-bottom:before {
  content: "\e603";
}

.icon-arrow-left-top:before {
  content: "\e604";
}

.icon-icon--:before {
  content: "\e744";
}

.icon-zuojiantou-up:before {
  content: "\e605";
}

.icon-xia:before {
  content: "\e62d";
}

.icon--jianhao:before {
  content: "\e60b";
}

.icon-weixinzhifu:before {
  content: "\e61a";
}

.icon-comment:before {
  content: "\e64f";
}

.icon-weixin:before {
  content: "\e61f";
}

.icon-fenlei1:before {
  content: "\e620";
}

.icon-erjiye-yucunkuan:before {
  content: "\e623";
}

.icon-Group-:before {
  content: "\e688";
}

.icon-you:after {
  content: "\e606";
}

.icon-forward:before {
  content: "\e607";
}

.icon-tuijian:before {
  content: "\e610";
}

.icon-bangzhu:before {
  content: "\e679";
}

.icon-share:before {
  content: "\e656";
}

.icon-yiguoqi:before {
  content: "\e997";
}

.icon-shezhi1:before {
  content: "\e61d";
}

.icon-fork:before {
  content: "\e61b";
}

.icon-kafei:before {
  content: "\e66a";
}

.icon-iLinkapp-:before {
  content: "\e654";
}

.icon-saomiao:before {
  content: "\e60d";
}

.icon-shezhi:before {
  content: "\e60f";
}

.icon-shouhoutuikuan:before {
  content: "\e631";
}

.icon-gouwuche:before {
  content: "\e609";
}

.icon-dizhi:before {
  content: "\e614";
}

.icon-fenlei:before {
  content: "\e706";
}

.icon-xingxing:before {
  content: "\e70b";
}

.icon-tuandui:before {
  content: "\e633";
}

.icon-zuanshi:before {
  content: "\e615";
}

.icon-zuo:before {
  content: "\e63c";
}

.icon-shoucang2:before {
  content: "\e62e";
}

.icon-shouhuodizhi:before {
  content: "\e712";
}

.icon-yishouhuo:before {
  content: "\e71a";
}

.icon-dianzan-ash:before {
  content: "\e617";
}

.icon-caiwuliushui:before {
  content: "\e67c";
}

view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
  box-sizing: border-box;
}

.no-data {
  position: relative;
  width: 100%;
  font-size: $font-base;
  text-align: center;
  line-height: 100upx;
}

/* 骨架屏替代方案 */
.Skeleton {
  background: #f3f3f3;
  padding: 20upx 0;
  border-radius: 8upx;
}

/* 图片载入替代方案 */
.image-wrapper {
  font-size: 0;
  background: #f3f3f3;
  border-radius: 4px;

  image {
    width: 100%;
    height: 100%;
    transition: 0.6s;
    opacity: 0;

    &.loaded {
      opacity: 1;
    }
  }
}

uni-rich-text img {
  max-width: 100% !important;
}

.clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.clamp2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.common-hover {
  background: #f5f5f5;
}

/*边框*/
.b-b:after,
.b-t:after {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  height: 0;
  content: "";
  transform: scaleY(0.5);
  border-bottom: 1px solid $border-color-base;
}

.b-b:after {
  bottom: 0;
}

.b-t:after {
  top: 0;
}

/* button样式改写 */
uni-button,
button {
  height: 80upx;
  line-height: 80upx;
  font-size: $font-lg + 2upx;
  font-weight: normal;

  &.no-border:before,
  &.no-border:after {
    border: 0;
  }
}

uni-button[type="default"],
button[type="default"] {
  color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
  color: #999999;
}

.blue {
  color: #339cfe;
}

.placeholder,
.grey {
  color: #999999;
}

.blueGradient {
  /* background: -ms-linear-gradient(left, #359cff, #65b4ff);
		background: -moz-linear-gradient(left, #359cff, #65b4ff);
		background: -webkit-linear-gradient(left, #359cff, #65b4ff);
		background: -o-linear-gradient(left, #359cff, #65b4ff);
		background: linear-gradient(left, #359cff, #65b4ff); */
  background-color: #359cff;
}

.blueGraShadow {
  /* background: -ms-linear-gradient(left, #359cff, #65b4ff);
		background: -moz-linear-gradient(left, #359cff, #65b4ff);
		background: -webkit-linear-gradient(left, #359cff, #65b4ff);
		background: -o-linear-gradient(left, #359cff, #65b4ff);
		background: linear-gradient(left, #359cff, #65b4ff); */
  -webkit-box-shadow: 0 0 5px 5px #d9ecff;
  -moz-box-shadow: 0 0 5px 5px #d9ecff;
  box-shadow: 0 0 5px 5px #d9ecff;
  background-color: #359cff;
}

.greyShadow {
  -webkit-box-shadow: 0 0 4upx 4upx #fafafa;
  -moz-box-shadow: 0 0 4upx 4upx #fafafa;
  box-shadow: 0 0 4upx 4upx #fafafa;
}

.orangeGradient {
  background: -ms-linear-gradient(left, #f04c41, #f07741);
  background: -moz-linear-gradient(left, #f04c41, #f07741);
  background: -webkit-linear-gradient(left, #f04c41, #f07741);
  background: -o-linear-gradient(left, #f04c41, #f07741);
  background: linear-gradient(left, #f04c41, #f07741);
}
</style>