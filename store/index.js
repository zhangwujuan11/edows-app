import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: {},
    barnlist: []
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider
      })
    },
    logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo'
      })
    },
    barnlistreset(state) {
      var arr = state.barnlist,
        result = [],
        i,
        j,
        len = arr.length;
      for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
          if (arr[i].to === arr[j].to) {
            j = ++i;
          }
        }
        result.push(arr[i]);
      }
      return state.barnlist = result;
    },
    delebarnlist(state) {
      state.barnlist.pop()
    },
    delebarnnone(state) {
      state.barnlist = []
    }
  },

  actions: {

  }
})
export default store