<template>
	<view>
		<view>
			<view>
				<view class="header">
					<image src="/static/yddc.png"></image>
					<text>易道大咖商城</text>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>

		</view>
		<view class="maskFull" v-show="isCanUse">
			<view class="winChoose">
				<text class="win-tit">选择身份登录</text>
				<view class="win-cotent">
					<view class="win-cell-list" @click="toAuthLogin('person')">
						<view>
							<image src="/static/missing-face.png"></image>
						</view>
						<view>
							<text class="cell-user">我是个人用户</text>
							<text class="cell-tit">个人用户直接登录</text>
						</view>
						<view>
							<text class="cell-more yticon icon-you"></text>
						</view>
					</view>
					<view class="win-cell-list" @click="toAuthLogin('shop')">
						<view>
							<image src="/static/missing-face.png"></image>
						</view>
						<view>
							<text class="cell-user">我是门店用户</text>
							<text class="cell-tit">门店用户账号登录</text>
						</view>
						<view>
							<text class="cell-more yticon icon-you"></text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		web
	} from "../../Api/config.js"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				returnUrl : '',
				SessionKey: '',
				isShowMask: false,
				openId: '',
				nickName: null,
				avatarUrl: null,
				encryptedData: "",
				iv: '',
				isCanUse: false //默认为true
			}
		},
		async onLoad(option) { //默认加载
			console.log('参数：',option)
			this.returnUrl = option.returnUrl ?  '/' + option.returnUrl : '/pages/index/index';
			this.isCanUse = uni.getStorageSync('isCanUse') ? true : false;
			this.openId = uni.getStorageSync('openId') ? uni.getStorageSync('openId') : '',
			this.authLogin();
		
			console.log("isCanUse：", uni.getStorageSync('isCanUse'))
		},
		methods: {
			...mapMutations(['login']),
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: async function(infoRes) {
						console.log('用户信息：', infoRes)
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						let encryptedData = infoRes.encryptedData;
						let iv = infoRes.iv;
						//uni.setStorageSync('userInfo', infoRes.userInfo);
						//_this.$api.msg(nickName);
						try {
							uni.setStorageSync('isCanUse', true); //记录是否第一次授权  false:表示不是第一次授权
							_this.isCanUse = uni.getStorageSync('isCanUse')
							//_this.$api.msg(nickName);
							//_this.updateUserInfo();
							var params = {
								"encryptedData": encryptedData,
								"iv": iv,
								"openId": _this.openId
							}
							let resInfo = await _this.$axios(_this.$baseUrl.xcxDoAuth, params);
							console.log("resInfo：", resInfo)
						} catch (e) {}
					},
					fail(res) {}
				});
			},

			//登录
			authLogin() {
				let _this = this;
				// uni.showLoading({
				// 	title: '登录中...'
				// });

				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: async function(loginRes) {
						let code = loginRes.code;
						//_this.$api.msg(code);
						var params = {
							code: code,
						}
						let resDate = await _this.$axios(_this.$baseUrl.getXcxAuth, params);
						console.log("resDate：",resDate)
						_this.openId = resDate.data.data;
						uni.setStorageSync('openId', resDate.data.data);
						if (_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: async function(infoRes) {
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									let encryptedData = infoRes.encryptedData;
									let iv = infoRes.iv;
									//uni.setStorageSync('userInfo', infoRes.userInfo);
									//_this.$api.msg(nickName);
									console.log('用户信息2：', infoRes)
									//_this.updateUserInfo(); //调用更新信息方法
									var params = {
										"encryptedData": encryptedData,
										"iv": iv,
										"openId": _this.openId
									}
									console.log("params：", params);
									let resInfo = await _this.$axios(_this.$baseUrl.xcxDoAuth, params);
									console.log("resInfo：", resInfo)
								}
							});
						}

					},
				});
			},
			navBack() {
				uni.navigateBack();
			},
			async toAuthLogin(loginType) {
				//var _this = this;
				//_this.$api.msg(loginType)
				if (loginType == 'person') {
					const params = {
						"loginType": 0,
						"openId": this.openId,
						"password": "",
						"redirectUrl": "",
						"userName": ""
					}
					//console.log("params：", params);
					const result = await this.$axios(this.$baseUrl.mallMemberLogin, params);
					
					if(result.data.code === 200){
						//var rusult = res.data.data;
						this.login(result.data.data);
						uni.reLaunch({
							url: this.returnUrl
						})
					}
						
					
				}
				if (loginType == 'shop') {
					uni.navigateTo({
						url: '/pages/public/login?loginType=1&opeinId=' + this.openId + '&returnUrl=' + this.returnUrl
					})
				}
			}

		}
		
	}
</script>

<style lang='scss'>
	.header {
		margin: 90upx 0 90upx 50upx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650upx;
		height: 300upx;

		image {
			width: 200upx;
			height: 200upx;
		}

		text {
			display: block;
			margin-top: 10upx
		}

	}



	.content {
		text-align: center;

		text {
			display: block;
			color: #9d9d9d;
			margin-top: 40upx;
		}
	}


	.bottom {
		border-radius: 10upx;
		margin: 100upx 50upx 0 50upx;
		font-size: 35upx;
		height: 90upx;
		line-height: 90upx;
		background: #09bb07;
	}

	.maskFull {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 1
	}

	.winChoose {
		position: absolute;
		background: #fff;
		width: 570upx;
		height: 500upx;
		left: 50%;
		top: 50%;
		margin: -285upx 0 0 -288upx;
		border-radius: 10upx;
		padding: 38upx;

		.win-tit {
			display: block;
			height: 70upx;
			text-align: center;
		}

		.win-cell-list {
			background: #f8f8f8;
			display: flex;
			align-items: center;
			border-radius: 10upx;
			justify-content: space-between;
			padding: 26upx;
			margin-top: 26upx;

			view {
				display: flex;
				flex-direction: column;

				.cell-user {
					font-size: 30upx;
					margin-bottom: 10upx;
				}

				.cell-tit {
					font-size: 22upx
				}
			}

			image {
				width: 94upx;
				height: 94upx
			}
		}
	}
</style>
