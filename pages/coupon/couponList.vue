<template>
	<view class="content">
		<!-- <view v-if="!couponList.length" class="no-data">暂无优惠券信息</view> -->
		<view class="couponLists">
			<!-- 空白页 -->
			<empty v-if="!couponList.length"></empty>
			<view class="order-item" v-for="(item,index) in couponList" :key="index">
				<view class="base-coupons" :class="item.stateTip">
					<view class="left-coupon">
						<view class="couponType">
							<text v-if="item.couponTypeCode!=`YDZKQ`">￥</text>
							<text class="price" v-if="item.couponTypeCode==`YDMJQ`">{{item.amount}}</text>
							<text class="price" v-if="item.couponTypeCode==`YDZKQ`">{{item.amount / 10}} 折</text>
							<text class="price" v-if="item.couponTypeCode==`YDDKQ`">{{item.amount}}</text>
						</view>
						<view class="couponTit" v-if="item.couponTypeCode==`YDMJQ`">满{{item.minPoint}}元减</view>
						<view class="couponTit" v-if="item.couponTypeCode==`YDZKQ`">满{{item.minPoint}}元可用</view>
						<view class="couponTit" v-if="item.couponTypeCode==`YDDKQ`">满{{item.minPoint}}元可用</view>
						<view class="obtenu" @click="obtenu(item)">立即领取</view>
					</view>
					<view class="right-coupon">
						<view class="inner-coupon">
							<view class="coupon-cont">
								<view class="couponTitle clamp">
									<text class="tipType" v-if="item.couponTypeCode==`YDMJQ`">满减券</text>
									<text class="tipType" v-if="item.couponTypeCode==`YDZKQ`">折扣券</text>
									<text class="tipType" v-if="item.couponTypeCode==`YDDKQ`">抵扣券</text>
									<text class="tipName">{{item.name}}</text>
								</view>
								<view class="coupon-data">
									{{item.startTime}} 到 {{item.endTime}}
								</view>
								<view class="greyTips " v-if="item.orderStatus == -1"></view>
								<view class="usedTips " v-if="item.orderStatus == 1"></view>
							</view>
							<view class="coupon-detail cell-item" @click.native="showDatail(item)">
								<text>详细信息</text>
								<text class="cell-more" :class="item.openDetail ? `cell-more-up` : ``"></text>
							</view>
						</view>
					</view>

				</view>
				<view class="coupon-intro" v-show="item.openDetail">
					<view>{{item.remarks ? item.remarks : `暂无说明` }} </view>
				</view>
			</view>
		</view>
		
		<view class="quanBar">
			<view class="on">领取优惠券</view>
			<!-- <navigator url="/pages/coupon/index?state=0"> -->
				<view @click="navTo('/pages/coupon/index?state=0')">我的优惠券</view>
			<!-- </navigator> -->
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		data() {
			return {
				res: {},

				orderStatus: '',
				orderList: [],
				pageNo: 1,
				pageSize: 10,
				totalPage: 0,

				couponList: []

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
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			console.log(options.state)
			this.getAllCouponList();

		},

		methods: {
			
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				uni.navigateTo({
					url
				})
			},

			//得到优惠券列表
			async getAllCouponList() {
				var params = {}
				let res = await this.$axios(this.$baseUrl.getAllCouponList, params);
				if (res.data.code == 200) {
					if (res.data.data.length) {
						for (var i in res.data.data) {
							res.data.data[i].openDetail = false;
						}
						this.couponList = res.data.data;
						for (var i in this.couponList) {
							this.couponList[i].startTime = fn.formatTime(this.couponList[i].startTime, "Y-M-D");
							this.couponList[i].endTime = fn.formatTime(this.couponList[i].endTime, "Y-M-D");
							if (this.couponList[i].couponTypeCode == 'YDMJQ') {
								this.couponList[i].stateTip = "base-coupons-mj"
							}

							if (this.couponList[i].couponTypeCode == 'YDZKQ') {
								this.couponList[i].stateTip = "base-coupons-zk"
							}

							if (this.couponList[i].couponTypeCode == 'YDDKQ') {
								this.couponList[i].stateTip = "base-coupons"
							}
						}
					}

				}
			},
			//显示、隐藏可用优惠券列表
			showCouponList() {
				this.showCoupon = !this.showCoupon;
				if (this.showCoupon) {
					this.calcTotal();
				}
			},

			//showDetail
			showDatail(e) {

				e.openDetail = !e.openDetail;
				console.log(e.openDetail)
			},

			//领取优惠券
			async obtenu(e) {
				var params = {
					batch: e.batch
				}
				let res = await this.$axios(this.$baseUrl.receiveUserCoupon, params);
				if (res.data.code == 200) {
					this.$api.msg(res.data.message)
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
	
	.quanBar{
		display: flex;
		height: 46px;
		position: fixed;
		width: 100%;
		left:0;
		bottom:0;
		justify-content:space-around;
		align-items: center;
		background: #fff;
		font-size: $font-lg + 2;
		.on{
			color: $font-color-blue;
		}
	}

	.couponLists {
		padding-bottom: 140upx;
	}

	.order-item {
		margin-top: 40upx
	}

	// 优惠券信息
	.base-coupons {
		display: flex;

		width: 680upx;
		font-size: 24upx;
		height: 212upx;
		position: relative;
		margin: 0 auto;
		background: radial-gradient(circle at right top, transparent 20upx, #5fb1ff 0) top left / 200upx 51% no-repeat,
			radial-gradient(circle at right bottom, transparent 20upx, #5fb1ff 0) bottom left /200upx 51% no-repeat,
			radial-gradient(circle at left top, transparent 20upx, #fff 0) top right /480upx 51% no-repeat,
			radial-gradient(circle at left bottom, transparent 20upx, #fff 0) bottom right /70% 51% no-repeat;

		// filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, .3));
		.tipType {
			color: #fff;
			background: #5fb1ff;
			padding: 6upx 16upx;
			border-radius: 24upx;
			margin-right: 20upx;
		}
	}

	.coupon-intro {
		position: relative;
		width: 700upx;
		margin: 0 auto;
		padding: 20upx;
		line-height: 40upx;
		font-size: $font-base;
		background: #fff;
		color: #999
	}

	.base-coupons-zk {

		background: radial-gradient(circle at right top, transparent 20upx, #49eda7 0) top left / 200upx 51% no-repeat,
			radial-gradient(circle at right bottom, transparent 20upx, #49eda7 0) bottom left /200upx 51% no-repeat,
			radial-gradient(circle at left top, transparent 20upx, #fff 0) top right /480upx 51% no-repeat,
			radial-gradient(circle at left bottom, transparent 20upx, #fff 0) bottom right /480upx 51% no-repeat;

		.tipType {
			color: #fff;
			background: #49eda7;
			padding: 6upx 16upx;
			border-radius: 24upx;
			margin-right: 20upx;
		}
	}

	.base-coupons-mj {

		background: radial-gradient(circle at right top, transparent 20upx, #fcb057 0) top left / 200upx 51% no-repeat,
			radial-gradient(circle at right bottom, transparent 20upx, #fcb057 0) bottom left /200upx 51% no-repeat,
			radial-gradient(circle at left top, transparent 20upx, #fff 0) top right /480upx 51% no-repeat,
			radial-gradient(circle at left bottom, transparent 20upx, #fff 0) bottom right /480upx 51% no-repeat;

		.tipType {
			color: #fff;
			background: #fcb057;
			padding: 6upx 16upx;
			border-radius: 24upx;
			margin-right: 20upx;
		}
	}

	.base-coupons-grey {
		background: radial-gradient(circle at right top, transparent 20upx, #ccc 0) top left / 200upx 51% no-repeat,
			radial-gradient(circle at right bottom, transparent 20upx, #ccc 0) bottom left /200upx 51% no-repeat,
			radial-gradient(circle at left top, transparent 20upx, #fff 0) top right /480upx 51% no-repeat,
			radial-gradient(circle at left bottom, transparent 20upx, #fff 0) bottom right /480upx 51% no-repeat;

		.tipType {
			color: #fff;
			background: #ccc;
			padding: 6upx 16upx;
			border-radius: 24upx;
			margin-right: 20upx;
		}
	}


	.base-coupons::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 10upx;
		top: 0;
		left: -9upx;
		background-image: linear-gradient(to bottom, #5fb1ff 10upx, transparent 10upx, transparent),
			radial-gradient(20upx circle at 10upx 20upx, transparent 10upx, #5fb1ff 10upx);
		background-size: 10upx 30upx;
		transform: rotateY(180deg)
	}

	.base-coupons-grey::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 10upx;
		top: 0;
		left: -9upx;
		background-image: linear-gradient(to bottom, #ccc 10upx, transparent 10upx, transparent),
			radial-gradient(20upx circle at 10upx 20upx, transparent 10upx, #ccc 10upx);
		background-size: 10upx 30upx;
		transform: rotateY(180deg)
	}

	.base-coupons-zk::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 10upx;
		top: 0;
		left: -9upx;
		background-image: linear-gradient(to bottom, #49eda7 10upx, transparent 10upx, transparent),
			radial-gradient(20upx circle at 10upx 20upx, transparent 10upx, #49eda7 10upx);
		background-size: 10upx 30upx;
		transform: rotateY(180deg)
	}

	.base-coupons-mj::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 10upx;
		top: 0;
		left: -9upx;
		background-image: linear-gradient(to bottom, #fcb057 10upx, transparent 10upx, transparent),
			radial-gradient(20upx circle at 10upx 20upx, transparent 10upx, #fcb057 10upx);
		background-size: 10upx 30upx;
		transform: rotateY(180deg)
	}

	.base-coupons::after {
		content: '';
		position: absolute;
		height: 100%;
		width: 10upx;
		top: 0;
		right: -9upx;
		background-image: linear-gradient(to bottom, #fff 10upx, transparent 10upx, transparent),
			radial-gradient(20upx circle at 10upx 20upx, transparent 10upx, #fff 10upx);
		background-size: 10upx 30upx;
	}

	.left-coupon {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #fff;
		width: 200upx;
		height: 100%;

		.couponType {
			margin-bottom: 12upx;

			.price {
				font-size: 48upx;
			}
		}

	}

	.obtenu {
		background: #f04c41;
		color: #fff;
		padding: 10upx 22upx;
		border-radius: 12upx;
		margin-top: 12upx
	}

	.right-coupon {
		width: 480upx;
		height: 100%;
		color: #999;

		.inner-coupon {
			padding: 0 20upx;

			.coupon-cont {
				position: relative;
				height: 150upx;
				border-bottom: 1px dashed #e8e8e8;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-left: 10upx;

				.greyTips {
					width: 120upx;
					height: 120upx;
					position: absolute;
					right: 30upx;
					top: 30upx;
					background: url(../../static/timed.png) no-repeat;
					background-size: contain;
				}

				;

				.usedTips {
					width: 120upx;
					height: 120upx;
					position: absolute;
					right: 30upx;
					top: 30upx;
					background: url(../../static/used.png) no-repeat;
					background-size: contain;
				}

				;

				.couponTitle {
					width: 100%;
					text-align: left;
					margin-bottom: 10px;

					.tipName {
						font-size: 28upx;
						font-weight: 600;
						line-height: 40upx;
					}
				}

				;

				.coupon-data {
					width: 100%;
					text-align: left;
				}
			}

			.coupon-detail {
				position: relative;
				margin-left: 10upx;

				height: 60upx;
				line-height: 60upx;
				font-size: 24upx;

				.cell-more {
					display: block;
					position: absolute;
					width: 20upx;
					height: 36upx;
					right: 0;
					top: 4upx;
					background: url(../../static/arrDown.png) no-repeat;
					background-size: contain;

					&.cell-more-up {
						background: url(../../static/arrUp.png) no-repeat;
						background-size: contain;
					}
				}
			}
		}
	}
</style>
