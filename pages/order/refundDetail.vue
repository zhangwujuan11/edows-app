<template>
	<view>
		<view class="state-section blueGradient">
			<image src="../../static/ok.png"></image>
			<text>{{orderInfo.refundStatusValue}}</text>
		</view>
		<view class="price-section">
			<view class="p-items">
				<view class="p-item">
					<text>退款总金额</text>
					<text class="red">￥{{orderInfo.refundPrice}}</text>
				</view>
			</view>
		</view>

		

		<view class="goods-section">
			<view class="g-header b-b">
				<text class="name">退款商品信息</text>
			</view>
			<!-- 商品列表 -->
			<block v-for="(item,index) in orderInfo.productList" :key="index">
			<!-- <navigator :url="`/pages/product/product?code=` + item.productCode" > -->
			<view class="g-item" @click='navToDetailPage(item)'>
				
				<image :src="item.imgPath"></image>
				<view class="right">
					<text class="title clamp">{{item.productName}}</text>
					<view class="spec">
						<text v-for="(subItem,subIndex) in item.attrValueVOList" :key="subIndex">
							{{subItem.attrValue}}
						</text>
					</view>
					<view class="price-box">
						<text class="price">￥{{item.productPrice}}</text>
						<text class="number">x {{item.productNum}}</text>
					</view>
				</view>
				
			</view>
			<!-- </navigator> -->
			</block>
		</view>
		
		<view class="facture-setion">
			<view class="f-item">
				<text class="grey ">退款原因</text>
				<text>{{orderInfo.refundReason}}</text>
			</view>
			<view class="f-item" v-if="orderInfo.auditDes">
				<text class="grey">商家说明</text>
				<text class="blue">{{orderInfo.auditDes}}</text>
			</view>
			<view class="f-item">
				<text class="grey">订单编号</text>
				<text>{{orderSn}}</text>
			</view>
			<!-- <view class="f-item">
				<text class="grey">提交时间</text>
				<text>{{orderInfo.createDate}}</text>
			</view>
			<view class="f-item">
				<text class="grey">实付金额</text>
				<text>￥{{orderInfo.totalPrice}}</text>
			</view> -->
			
		</view>

		

		<!-- 底部 -->
		<view class="footer">
			<view class="innerFooter">
				
				<block v-if="orderInfo.refundStatus == 200">
					<button class="action-btn red" @click="canncelRefundApply">取消退款</button>
				</block>
				<block v-if="orderInfo.refundStatus == 202">
					<button class="action-btn red" @click="refundOrder">申请退款</button>
				</block>
				<!-- <button class="action-btn red">删除订单</button>
				<button class="action-btn blue">申请售后</button>
				<button class="action-btn blue">立即支付</button>
				<button class="action-btn blue">再次购买</button> -->
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		fn
	} from '@/util/common.js';
	export default {
		data() {
			return {
				orderSn: '',
				serviceNo: "400-988-6868",
				orderInfo : {},
				outRefundNo:''
				
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
			this.orderSn = option.orderSn;
			//商品数据
			this.getData();
		},
		methods: {
			//获取数据
			async getData(){
				var params = {
					orderSn: this.orderSn
				}
				console.log(params)
				let res = await this.$axios(this.$baseUrl.getOrderRefundDetail, params);
				this.orderInfo = res.data.data;
				
				this.orderInfo.createDate = fn.formatTime(this.orderInfo.createDate,'Y-M-D h:m:s');
				if(this.orderInfo.payTime){
					this.orderInfo.payTime = fn.formatTime(this.orderInfo.payTime,'Y-M-D h:m:s')
				}
			},
			
			//跳转进详情
			navToDetailPage(item) {
				let code = item.productCode;
				if(item.isExpire){
					this.$api.msg('商品已下架');
				}else{
					uni.navigateTo({
						url: `/pages/product/product?code=${code}`
					})
				}
				
			},
			
			//取消退款
			async canncelRefundApply(){
				var params = {
					outRefundNo: this.orderInfo.outRefundNo
				}
				let res = await this.$axios(this.$baseUrl.canncelRefundApply, params);
				if(res.data.code == 200){
					this.$api.msg('取消退款成功');
					setTimeout(() => {
						
						uni.navigateTo({
							url: '/pages/order/order?state=0'
						})
					}, 1000)
				}
			},			
			
			//申请退款
			refundOrder(){
				uni.navigateTo({
					url : '/pages/order/refund?orderSn=' + this.orderSn
				})
			},
			
			//去评价
			toEvalu(){
				uni.navigateTo({
					url : '/pages/evaluate/evaluate?orderSn=' + this.orderSn
				})
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
			
			//取消订单
			async cancelOrder(){
				uni.showLoading({
					title: '请稍后'
				})
				var params = {
					orderSn: this.orderSn
				}
				let res = await this.$axios(this.$baseUrl.cancelOrder, params);
				if (res.data.code == 200) {
					this.getData();
					uni.hideLoading();
				}
			},
			//删除订单
			async deleteOrder() {
				uni.showModal({
					content: '确认删除此订单？',
					success: async (res) => {
						if (res.confirm) {
							var params = {
								orderSn: this.orderSn
							}
							let res = await this.$axios(this.$baseUrl.deleteOrder, params);
							if (res.data.code == 200) {
								this.$api.msg("删除订单成功！");
								setTimeout(() => {
									
									uni.navigateTo({
										url: '/pages/order/order?state=0'
									})
								}, 1000)
							}
						}
					}
				})
			},
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			//显示支付方式面板
			toggleMaskPay(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
			},
			submit() {
				uni.redirectTo({
					url: '/pages/money/pay'
				})
			},
			stopPrevent() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.state-section {
		padding: 50upx 70upx;
		position: relative;
		width: 100%;
		display: flex;
		color: #fff;
		align-items: center;

		image {
			width: 86upx;
			height: 86upx;
			margin-right: 20upx;
		}
	}

	.logistics-section {
		margin-bottom: 16upx
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
			.name{ line-height: 60upx;}
		}

		.m-icon-car {
			width: 36upx;
			height: 36upx;
			margin: 0 26upx 0 26upx
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
				padding: 10upx 12upx;
				text {
					padding-right: 10upx
				}
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
					color: $uni-color-primary
				}

				.number {
					font-size: 26upx;
					color: $font-color-blue;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.facture-setion {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
		font-size: $font-sm + 1upx;
		padding: 20upx 0;
		line-height: 60upx;

		.f-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10upx 26upx;
			text.grey{
				width: 200upx
			}
			text.red{
				color: $font-color-red;
				width: 200upx
			}
			text.blue{
				color: $font-color-blue;
			}

		}
	}

	.price-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
		font-size: $font-sm + 2upx;
		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}
		.p-items{
			padding: 20upx 0;
			line-height: 60upx;
		}
		.p-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 26upx;

			text {
				margin-right: 60upx
			}
			.red {
				font-size: $font-lg;
				color: $font-color-red;
			}

		}

	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $font-color-red;
			}

			&.blue {
				color: $font-color-blue;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		
		width: 100%;
		height: 90upx;
		font-size: $font-sm;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);
		.innerFooter{
			position: relative;
			width: 96%;
			display: flex;
			justify-content: flex-end;
			font-size: $font-sm;
			.action-btn {
				width: 160upx;
				height: 60upx;
				margin: 0;
				margin-left: 24upx;
				padding: 0;
				text-align: center;
				line-height: 60upx;
				font-size: $font-sm + 2upx;
				color: $font-color-dark;
				background: #fff;
			
				&:after {
					border: none;
					border-radius: 4upx;
				}
			
				&.red {
					color: $font-color-red;
					border: 2upx solid $font-color-red;
			
				}
				
				&.recom {
					color: $base-color;
					border: 2upx solid $base-color;
				}
			
				&.blue {
					background: $base-color;
					color: #fff;
					border: 2upx solid $base-color;
			
				}
			}
		}
		
	}
</style>
