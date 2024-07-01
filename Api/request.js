import {
  web
} from "./config.js"
import {
  toast,
  showConfirm,
  tansParams
} from '@/Api/common'

import store from '@/store/index.js'

let timeout = 10000
const baseUrl = web.invesUrl + 'app/'
const appUrl = web.Domain
const loginurl = web.loginUrl
const vipcardurl = web.renew

const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (uni.getStorageSync('userInfo').token && !isToken) {
    config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('userInfo').token
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout || timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          uni.showToast({
            title: error.message || '出错啦，请稍后再试～',
            icon: "none",
            duration: 2000
          })
          reject('后端接口连接异常')
          return
        }
        const code = res.data.code || 200
        const msg = res.data.message || res.data.msg
        if (code === 401 || code === 406) {
          let jump = uni.getStorageSync('jump')
          if (!jump) {
            setTimeout(() => {
              showConfirm('登录状态已过期，请重新登录').then(res => {
                if (res.confirm) {
                  store.commit('logout')
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              })
            }, 100)
            uni.setStorageSync('jump', 'true')
          }
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg || "系统繁忙")
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        if (message === 'Network Error') {
          message = '系统繁忙'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

const sendRequest = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (uni.getStorageSync('userInfo').token && !isToken) {
    config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('userInfo').token
    config.header.token = uni.getStorageSync('userInfo').token
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }

  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout || timeout,
        url: config.appUrl || appUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          uni.showToast({
            title: error.message || '出错啦，请稍后再试～',
            icon: "none",
            duration: 2000
          })
          reject('系统繁忙')
          return
        }
        const code = res.data.code || 200
        const msg = res.data.message || res.data.msg

        if (code === 401 || code === 406) {
          let jump = uni.getStorageSync('jump')
          if (!jump) {
            setTimeout(() => {
              showConfirm('登录状态已过期，请重新登录').then(res => {
                if (res.confirm) {
                  store.commit('logout')
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              })
            }, 100)
            uni.setStorageSync('jump', 'true')
          }
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg || "系统繁忙")
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        if (message === 'Network Error') {
          message = '系统繁忙'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}


const loginRequest = config => {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  // config.header = config.header || {}
  // if (uni.getStorageSync('userInfo').token && !isToken) {
  //   config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('userInfo').token
  // }
  config.header = config.header || {}
  if (config.params && config.params.token) {
    config.header['Authorization'] = 'Bearer ' + config.params.token
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }

  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method,
        timeout: config.timeout || timeout,
        url: web.loginUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          uni.showToast({
            title: error.message || '出错啦，请稍后再试～',
            icon: "none",
            duration: 2000
          })
          reject('系统繁忙')
          return
        }
        const code = res.data.code || 200
        const msg = res.data.message || res.data.msg

        if (code === 401 || code === 406) {
          let jump = uni.getStorageSync('jump')
          if (!jump) {
            setTimeout(() => {
              showConfirm('登录状态已过期，请重新登录').then(res => {
                if (res.confirm) {
                  store.commit('logout')
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              })
            }, 100)
            uni.setStorageSync('jump', 'true')
          }
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg || "系统繁忙")
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        if (message === 'Network Error') {
          message = '系统繁忙'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

const Request1 = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (uni.getStorageSync('userInfo').token && !isToken) {
    config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('userInfo').token
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout || timeout,
        url: web.loginUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          uni.showToast({
            title: error.message || '出错啦，请稍后再试～',
            icon: "none",
            duration: 2000
          })
          reject('系统繁忙')
          return
        }
        const code = res.data.code || 200
        const msg = res.data.message || res.data.msg

        if (code === 401 || code === 406) {
          let jump = uni.getStorageSync('jump')
          if (!jump) {
            setTimeout(() => {
              showConfirm('登录状态已过期，请重新登录').then(res => {
                if (res.confirm) {
                  store.commit('logout')
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              })
            }, 100)
            uni.setStorageSync('jump', 'true')
          }
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg || "系统繁忙")
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        if (message === 'Network Error') {
          message = '系统繁忙'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

const requestvipcard = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (uni.getStorageSync('userInfo').token && !isToken) {
    config.header['Token'] = uni.getStorageSync('userInfo').token
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout || timeout,
        url: config.renew || vipcardurl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          uni.showToast({
            title: error.message || '出错啦，请稍后再试～',
            icon: "none",
            duration: 2000
          })
          reject('后端接口连接异常')
          return
        }
        const code = res.data.code || 200
        const msg = res.data.message || res.data.msg
        if (code === 401 || code === 406) {
          let jump = uni.getStorageSync('jump')
          if (!jump) {
            setTimeout(() => {
              showConfirm('登录状态已过期，请重新登录').then(res => {
                if (res.confirm) {
                  store.commit('logout')
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              })
            }, 100)
            uni.setStorageSync('jump', 'true')
          }
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg || "系统繁忙")
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        if (message === 'Network Error') {
          message = '系统繁忙'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

module.exports = {
  request,
  sendRequest,
  loginRequest,
  Request1,
  requestvipcard
}