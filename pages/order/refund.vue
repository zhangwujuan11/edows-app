<template>
	<view>
		<view class="yt-list">

			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip">{{orderInfo.orderSn}}</text>
			</view>

		</view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item,index) in productList" :key="index">
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
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">

			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<!-- <view class="cell-icon">
					券
				</view> -->
				<text class="cell-tit clamp">退款原因</text>
				<text class="cell-tip active">
					{{refundReason}}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>

			</view>
		</view>


		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>退款金额</text>
				<text class="price-tip">￥</text>
				<text class="price">{{total}}</text>
			</view>
			<text class="submit" @click="submit">申请退款</text>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con" @click="chooseReson(item)">
						<view class="left" >
							<text class="title" >{{item.title}}</text>
						</view>

					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				orderSn: '',
				total: 0, //总价格
				orderInfo: {},
				productList: [],
				refundReasonCode: "",
				refundReason: "",
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: []
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
			this.refundReason = this.refundReason ? this.refundReason : '选择退款原因';
			this.orderSn = option.orderSn;
			//商品数据
			this.getData();
			this.getOrderRefundInfo();

		},
		methods: {
			//获取数据
			async getData() {
				var params = {
					orderSn: this.orderSn
				}
				console.log(params)
				let res = await this.$axios(this.$baseUrl.getOrderDetail, params);
				this.orderInfo = res.data.data;
				this.productList = res.data.data.productList;
				this.total = res.data.data.totalPrice;
			},
			
			//说明退款原因
			async getOrderRefundInfo() {
				var params = {
					orderSn: this.orderSn
				}
				console.log(params)
				let res = await this.$axios(this.$baseUrl.getOrderRefundInfo, params);
				this.couponList = res.data.data.reasonVOList;
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

			//选择退款原因
			chooseReson(item) {
				this.refundReason = item.title;
				this.refundReasonCode = item.code;
				this.maskState = 0;
			},

			async submit() {
				if (!this.refundReasonCode) {
					this.$api.msg('请先选择退款原因');
					return;
				}

				var params = {
					"orderSn": this.orderSn,
					"refundPrice": this.total,
					"refundReasonCode": this.refundReasonCode
				}
				console.log("参数详情：", params)
				let res = await this.$axios(this.$baseUrl.orderRefundApply, params);
				this.$api.msg('退款申请成功，请耐心等待审核');
				setTimeout(()=>{
					uni.redirectTo({
						url: '/pages/order/order?state=0'
					})
				},1500)
				
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

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
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
		padding-top: 16upx;
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
				margin-top: 10upx;
				line-height: 40upx;

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

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
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
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $font-color-red;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $font-color-red;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $font-color-red;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 90upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $uni-color-primary;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
