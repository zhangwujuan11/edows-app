<template>
	<view class="content">
		<view class="g-header">
			<text class="name">结算订单信息</text>
		</view>
		<view v-for="(item,index) in orderList" :key="index" class="order-item">

			<view class="order-item-info">
				<view class="i-top b-b">
					<text class="time">{{item.orderSn}}</text>
				</view>

				<scroll-view v-if="item.productList.length > 1" class="goods-box" scroll-x>
					<navigator :url="`/pages/order/orderDetail?orderSn=` + item.orderSn">
						<view v-for="(goodsItem, goodsIndex) in item.productList" :key="goodsIndex" class="goods-item">
							<image class="goods-img" :src="goodsItem.imgPath" mode="aspectFill"></image>
						</view>
					</navigator>
				</scroll-view>
				<navigator :url="`/pages/order/orderDetail?orderSn=` + item.orderSn">
					<view class="goods-box-single" v-if="item.productList.length === 1" v-for="(goodsItem, goodsIndex) in item.productList"
					 :key="goodsIndex">
						<image class="goods-img" :src="goodsItem.imgPath" mode="aspectFill"></image>
						<view class="right">
							<text class="title clamp">{{goodsItem.productName}}</text>
							<view class="attr-box">
								<text v-for="(subItem,subIndex) in goodsItem.attrValueVOList" :key="subIndex">
									{{subItem.attrValue}}
								</text>
							</view>
							<view class="price">
								<text class="red">{{goodsItem.productPrice}}</text>
								<text class="blue"> x {{goodsItem.productNum}}</text>
							</view>
						</view>
					</view>
				</navigator>
				<!-- <view class="price-box">
					共
					<text class="num">{{item.totalSum}}</text>
					件商品 &nbsp;&nbsp;&nbsp;&nbsp;应付金额
					<text class="price red">{{item.totalPrice}}</text>
				</view> -->

			</view>
		</view>

		<!-- <view class="g-header">
			<text class="name">支付金额信息</text>
		</view>
		<view class="row b-b">
			<text class="tit">支付金额</text>
			<input class="input price red" type="number" v-model="money" placeholder="请输入支付金额" @input="value=value.replace(/[^\d^\.]+/g,'')" />
		</view> -->

		<view class="g-header">
			<text class="name">付款凭证信息</text>
		</view>
		<view class="fiche-info">
			<view class="btn-fiche">
				<button @click="chioceView">上传付款凭证</button>
			</view>

			<view class="pic-fiche" v-if="imgPath">
				<image :src="imgPath" style="width:100%" mode="widthFix" />
			</view>
		</view>

		<view class="set-foot">
			<view class="set-foot-info">
				<!-- <view class="option-set-select" @click="allSel">
					<text class="icon-radio" :class="allSelect ? `icon-radio-ok` : ``"></text>
					<text>全选</text>
				</view> -->
				<view class="set-money">
					<text class="grey">结算金额：</text>
					<text class="red p16">¥ <text class="set-total-money">{{orderInfo.orderPrice}}</text></text>
				</view>
			</view>
			<view class="set-foot-btn" @click="toSettle">
				<text>确认结算</text>
			</view>
		</view>

		<view class="authority_mask" v-if="showMask">
			<view class="box">
				<view>相机、储存空间/照片权限使用说明：</view>
				<view>用于拍摄照片、扫码、上传图片等场景</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import Json from '@/Json';
	export default {

		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		data() {
			return {
				res: {},
				money: "",
				serviceNo: "400-988-6868",
				tabCurrentIndex: 0,
				orderStatus: '',
				orderList: [],
				orderSn: '',
				orderInfo:{},
				totalPrice: 0,
				imgPath: "",
				showMask: false
			};
		},

		onLoad(options) {
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：', returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }

			//console.log(options.orderSnList)
			this.orderSn = options.orderSnList;
			//if(options.orderSnList){
			this.getData();
			//}
		},

		methods: {
			//得到数据
			async getData() {
				var params = {
					orderSn: this.orderSn
				}
				let res = await this.$axios(this.$baseUrl.getSelectedOrderList, params);
				this.orderInfo = res.data.data;
				this.orderList = res.data.data.orderVOList;

			},
			chioceView() {
				var platform = uni.getSystemInfoSync().platform;
				if (platform == "android") {
					plus.android.checkPermission(
					"android.permission.CAMERA",
					(granted) => {
						if (granted.checkResult == -1) {
						//弹出
						this.showMask = true;
						}
					},
					(error) => {
						console.error("Error checking permission:", error.message);
					}
					);
					plus.android.requestPermissions(["android.permission.CAMERA","android.permission.READ_EXTERNAL_STORAGE"], (e) => {
					//关闭
					this.showMask = false;
					if (e.granted.length > 0) {
						this.upload()
						//执行你有权限后的方法
					}
					});
				}else{
					this.upload()
				}
			},
			//图片上传
			upload: function() {
				var _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						wx.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: async res => { //成功的回调
								//this.imgPath = 'data:image/png;base64,' + res.data;
								var base64Data = 'data:image/png;base64,' + res.data;
								var params = {
									"base64Data": base64Data,
									"bizType": 300
								};
								let result = await this.$axios(this.$baseUrl.uploadPic, params);
								if (result.data.code == 200) {
									this.imgPath = result.data.data.webPath;
								}
							}
						})

					},
					error: function(e) {
						console.log(e);
					}
				});
			},

			//判断信息
			chackInfo() {
				if (!this.imgPath) {
					this.$api.msg('请上传支付凭证');
					return false;
				}
				return true;
			},

			//一级供应商去结算
			async toSettle() {
				var _self = this;
				if (!this.chackInfo()) {
					return false;
				}
				var params = {
					"accountSn": "",
					"fkImg": this.imgPath,
					"orderSn": this.orderSn
				};
				let result = await this.$axios(this.$baseUrl.submitOrderAccount, params);
				if (result.data.code == 200) {
					this.$api.msg("结算成功！");
					setTimeout(() => {
						uni.navigateBack()
						uni.navigateTo({
							url: `/pages/order/orderSettle?state=1`
						})
					}, 800)
				}

			}


		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.g-header {
		position: relative;
		margin-top: 40upx;
		font-size: 30upx;
		border-bottom: 2upx solid #eaeaea;
		padding: 28upx 0;
		background: #fff;

		.name {
			border-left: 8upx solid #349cff;
			display: inline-block;
			margin-left: 20upx;
			height: 32upx;
			line-height: 32upx;
			text-indent: 20upx;
		}
	}

	.fiche-info {
		padding-bottom: 110upx;
	}

	.btn-fiche {
		position: relative;
		width: 680upx;
		margin: 40upx auto;

		button {
			height: 100upx;
			line-height: 100upx;
			color: #fff;
			background: #349cff;
		}
	}

	.pic-fiche {
		position: relative;
		width: 680upx;
		margin: 0upx auto 20upx;

		image {
			border-radius: 12upx;
		}
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}



	.order-item {
		position: relative;
		display: flex;
		align-items: center;
		background: #fff;
		margin-bottom: 16upx;

		.icon-select {
			width: 14%;
		}

		.order-item-info {
			width: 100%;
			padding-left: 30upx;

			&.inner-order-item {
				margin-left: auto;
				width: 86%;
				padding-left: 0;
			}
		}

		.refuseInfo {
			position: absolute;
			right: 30upx;
			top: 100upx;
			width: 160upx;
			height: 160upx;
			background: rgba(0, 0, 0, 0.06);
			border-radius: 50%;
			font-size: $font-base;
			color: #999;
			text-align: center;
			line-height: 160upx;
		}

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.red {
				color: #fff;
				background: $font-color-red;
				font-size: $font-sm;
				padding: 6upx 20upx;
				border-radius: 40upx;
				margin-right: 14upx;
			}

			.state {
				font-weight: 600;
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;

					text {
						padding-right: 10upx
					}
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					.red {
						color: $font-color-red;
						padding-right: 14upx;
					}

					.blue {
						color: $font-color-blue;

					}

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
						color: $font-color-red;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-blue;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-red;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;

				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

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

			&.blue {
				color: $base-color;
				border: 2upx solid $base-color;
			}

			&.recom {
				background: $base-color;
				color: #fff;
				border: 2upx solid $base-color;

			}
		}
	}


	.set-foot {
		position: fixed;
		width: 100%;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		height: 108upx;
		left: 0;
		bottom: 0;
		z-index: 9;
	}

	.set-foot-info {
		width: 72%;
		position: relative;
		display: flex;
		align-items: center;
		background: #fff;
	}

	.set-money {
		text-indent: 20upx;
	}

	.option-set-select {
		display: flex;
		flex-direction: column;
		width: 120upx;
		text-align: center;
		font-size: 12px
	}

	.set-total-money,
	.red {
		color: #f04c41
	}

	.set-foot-btn {
		width: 28%;
		background: #349cff;
		text-align: center;
		line-height: 108upx;
		color: #fff;
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}

.authority_mask {
  position:fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 998999999999999;
  transition: .3s;
  background: rgba(42, 45, 50, 0.7);
}
.box{
  margin: 100rpx auto 0;
  width: 600rpx;
  height: 210rpx;
  text-align: center;
  font-weight: 700;
  border-radius: 20rpx;
  background: #fff;
  line-height: 70rpx;
  padding: 34rpx;
}
</style>
