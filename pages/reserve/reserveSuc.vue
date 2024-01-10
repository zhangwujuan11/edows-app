<template>
	<view class="app">
		<view class="orderInfo-box">
			<image src="../../static/order.png"></image>
			<text>预约服务提交成功</text>
		</view>
		<view class="order-box">
			<text>耐心等待客服人员与您联系</text>
		</view>
		<view class="order-box">
			<text>请保持手机畅通</text>
		</view>
		<!-- <view class="price-box">
			<text>支付金额： </text>
			<text class="price">{{orderData.totalPrice}}</text>
		</view> -->

		
		<view class="mix-btn blueGraShadow" @click="toBack">返回首页</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				subFlag:true,
				payType: 1,
				orderData: {},
				accountType:0
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option) {
		// 	let returnUrl = getCurrentPages()[0].route;
		//	console.log('当前路由：', returnUrl , 'userInfo：', uni.getStorageSync('userInfo'));
		// 	if (!this.hasLogin) {
		// 		uni.reLaunch({
		// 			url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
		// 		})
		// 	}
		},

		methods: {
			
			//返回首页
			toBack(){
				//console.log(333)
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}
	.orderInfo-box{
		position: relative;
		padding-top:80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 234upx;
			height: 196upx;
		}
		text{ line-height: 100upx}
	}
	.order-box{
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
		.price{
			font-size: 50upx;
			color: $font-color-red;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
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
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
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
		background:#ccc
	}
	
	.goBack{
		position: relative; 
		width: 630upx;
		margin: 0 auto 30upx;
		height: 80upx;
		line-height: 80upx;
		background:#fff;
		font-size: $font-lg;
		color: #339CFE;
		text-align: center;
		border-radius: 12upx;
	}

</style>
