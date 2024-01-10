<template>

	<view class="container">

		<view class="topImg">
			<image src="/static/yddc.png"></image>
			<text @tap="makePhoneCall" class="serviceNo">联系客服</text>
		</view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="input-content">
				<view class="input-item">
					<text class="tit icon-user"></text>
					<input type="text"  v-model="userName" placeholder="请输入门店账号" maxlength="20" data-key="mobile" @input="inputChange" />
				</view>
				<view class="input-item">
					<text class="tit icon-password"></text>
					<input type="password" value="" v-model="password" placeholder="请输入登录密码" placeholder-class="input-empty" maxlength="20" password
					 data-key="password" @input="inputChange" @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn blueGraShadow" @click="toLogin" >登录</button>
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		<view class="register-section">
			<text class="m-icon-index"></text>
			<text>福建易道大咖商业管理有限公司</text>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				opeinId: '',
				returnUrl : '',
				serviceNo: "400-988-6868",
				userName: '',
				password: '',
				logining: false
			}
		},
		onLoad(option) {
			console.log(option)
			this.returnUrl = option.returnUrl ?   option.returnUrl : 'pages/index/index';
			this.openId = uni.getStorageSync('openId') ? uni.getStorageSync('openId') : '';
			if(!this.openId){
				uni.navigateBack();
			}
			
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				this.$api.msg('去注册');
			},
			//联系客服
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.serviceNo,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			//判断验证
			chackInfo() {
				if (!this.userName) {
					this.$api.msg("门店账号不能为空");
					return false;
				}
				if (!this.password) {
					this.$api.msg("门店密码不能为空");
					return false;
				}

				return true;
			},
			//登录
			async toLogin() {
				if (!this.chackInfo()) {
                return false;
            }
				this.logining = true;
				const params = {
					"loginType": 1,
					"openId": this.openId,
					"password": this.password,
					"redirectUrl": "",
					"userName": this.userName
				}
				//console.log("params：", params);
				const result = await this.$axios(this.$baseUrl.mallMemberLogin, params);
				
				if(result.data.code === 200){
					//var rusult = res.data.data;
					this.login(result.data.data);
					uni.reLaunch({
						url: this.returnUrl
					})
				} else {
					this.$api.msg(result.data.message);
					this.logining = false;
				}
				// const result = await this.$api.json('userInfo');
				// if (result.status === 1) {
				// 	this.login(result.data);
				// 	uni.navigateBack();
				// } else {
				// 	this.$api.msg(result.msg);
				// 	this.logining = false;
				// }
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #f8f8f8;
	}

	.container {

		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #f8f8f8;
	}

	.topImg {
		position: relative;
		text-align: center;
		padding: 100upx 0;

		.serviceNo {
			position: absolute;
			right: 30upx;
			top: 30upx;
			font-size: 30upx;
		}

		image {
			width: 165upx;
			height: 165upx;
		}
	}

	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		position: relative;
		padding: 0 70upx;

		border-bottom: 1px solid #c8e4ff;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			position: absolute;
			left: 0;
			top: 40upx;
			width: 40upx;
			height: 40upx;
			display: inline-block;
			vertical-align: middle;
			background: url(../../static/user.png) no-repeat;
			background-size: contain;

			&.icon-password {
				background: url(../../static/pwd.png) no-repeat;
				background-size: contain;
			}
		}



		input {
			height: 120upx;
			text-indent: 0;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 10upx;
		margin-top: 160upx;

		color: #fff;
		font-size: $font-lg;


	}

	.forget-section {
		font-size: $font-sm+2upx;
		width: 630upx;
		text-align: right;
		margin: 40upx auto 0;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		.m-icon-index {
			width: 46upx;
			height: 46upx;
			background: url(../../static/tab-home-current.png) no-repeat;
			background-size: contain
		}

		text {
			display: inline-block;
			vertical-align: middle;
			margin-left: 10upx;
		}
	}
</style>
