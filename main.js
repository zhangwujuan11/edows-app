import Vue from 'vue'
import store from './store'
import App from './App'
import axios from './Api'
import baseUrl from './Api/baseUrl'
import invers from './Api/invers'
// import ww from './Api/ww'
// import "@/static/dispatch-master/js/mui.min.js";
// import "@/static/dispatch-master/js/mui.picker.min.js";
import Json from './Json' //测试用数据
// import wmWatermark from "@/components/wm-watermark/wm-watermark.vue";
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  });
}
const json = type => {
  //模拟异步请求数据
  return new Promise(resolve => {
    setTimeout(() => {
      //console.log("Json[type]：",Json)
      resolve(Json[type]);
    }, 500)
  })
}
global.Buffer = global.Buffer || require('buffer').Buffer
const prePage = () => {
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  console.log("页面：", prePage)
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;

}

const preToPage = () => {
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 3];
  console.log("页面：", prePage)
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;

}

const getCurPage = () => {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  return curPage
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
  msg,
  json,
  prePage,
  preToPage,
  getCurPage
};

Vue.prototype.$util = {
  msg
};
Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = baseUrl;


// Vue.component('wmWatermark',wmWatermark)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()