<template>
	<view class="content">
		<view class="orderInfo-box">
		<image src="../../static/orderPay.png"></image>
		<text>支付成功</text>
		</view>
		<view class="price-box">
			<text>支付金额 </text>
			<text class="price">{{totalPrice}}</text>
		</view>
		<view class="btn-group">
			<navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">查看订单</navigator>
			<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				totalPrice:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option) {
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：', returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }
			this.totalPrice = option.totalPrice;
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.orderInfo-box{
		position: relative;
		padding-top:80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 200upx;
			height: 200upx;
		}
		text{ line-height: 100upx}
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
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.btn-group{
		position: relative;
		width:80%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 260upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
