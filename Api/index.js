import Vue from 'vue'
import {
	web
} from "./config.js"
const axios = (opts, data) => {
	// uni.showToast({
	// 	title: opts.url,
	// 	icon: "none",
	// 	duration: 2000
	// });
	let httpDefaultOpts = {
		url: opts.url,
		data: data,
		method: opts.method,
		dataType: 'json',
		header: { 
			'token':uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo').token : '' ,
			'Authorization':'Bearer ' + uni.getStorageSync('userInfo').token
		},
	}

	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				//new Vue().$util.msg("测试弹框");
				if (res[1].data.code == 200) {
					resolve(res[1])
				} else if( res[1].data.code == 406 ) {
					//console.log(httpDefaultOpts.url , ' web.apiUrl：' + web.apiUrl)
					let carUrl = web.apiUrl + 'mall/shoppingCart/List?token='
					if( httpDefaultOpts.url == carUrl ){
						
					}else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
					// uni.showToast({
					// 	title: res[1].data.message || '出错啦，请稍后再试～',
					// 	icon: "none",
					// 	duration: 2000
					// });
					
				} else {
					uni.showToast({
						title: res[1].data.message || '出错啦，请稍后再试～',
						icon: "none",
						duration: 2000
					});
					resolve(res[1])
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})

	return promise

}

export default axios
