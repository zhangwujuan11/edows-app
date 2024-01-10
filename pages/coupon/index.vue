<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 优惠券列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">

						<view class="base-coupons" :class="tabCurrentIndex ? `base-coupons-grey` : item.stateTip">
							<view class="left-coupon">
								<view class="couponType">
									<text v-if="item.couponTypeCode!=`YDZKQ`">￥</text>
									<text class="price" v-if="item.couponTypeCode==`YDMJQ`">{{item.denomination}}</text>
									<text class="price" v-if="item.couponTypeCode==`YDZKQ`">{{item.denomination / 10}} 折</text>
									<text class="price" v-if="item.couponTypeCode==`YDDKQ`">{{item.denomination}}</text>
								</view>
								<view class="couponTit" v-if="item.couponTypeCode==`YDMJQ`">满{{item.coupon.minPoint}}元减</view>
								<view class="couponTit" v-if="item.couponTypeCode==`YDZKQ`">满{{item.coupon.minPoint}}元可用 </view>
								<view class="couponTit" v-if="item.couponTypeCode==`YDDKQ`">满{{item.coupon.minPoint}}元可用</view>
							</view>
							<view class="right-coupon">
								<view class="inner-coupon">
									<view class="coupon-cont">
										<view class="couponTitle clamp">
											<text class="tipType" v-if="item.couponTypeCode==`YDMJQ`">满减券</text>
											<text class="tipType" v-if="item.couponTypeCode==`YDZKQ`">折扣券</text>
											<text class="tipType" v-if="item.couponTypeCode==`YDDKQ`">抵扣券</text>
											<text class="tipName">{{item.coupon.name}}</text>
										</view>
										<view class="coupon-data">
											{{item.startTime}} 到 {{item.endTime}}
										</view>
										<view class="greyTips" v-if="tabCurrentIndex==2"></view>
										<view class="usedTips" v-if="tabCurrentIndex==1"></view>
									</view>
									<view class="coupon-detail cell-item" @click.native="showDatail(item)">
										<text>详细信息</text>
										<text class="cell-more" :class="item.openDetail ? `cell-more-up` : ``"></text>
									</view>
								</view>
							</view>

						</view>
						<view class="coupon-intro" v-show="item.openDetail">
							<view>{{item.coupon.remarks ? item.coupon.remarks : `暂无说明` }}  </view>
						</view>

					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view class="quanBar">
			<!-- <navigator url="/pages/coupon/couponList?state=0"> -->
			<view @click="navTo('/pages/coupon/couponList?state=0')">领取优惠券</view>
			<!-- </navigator> -->
			<view class="on">我的优惠券</view>
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
				serviceNo: "400-988-6868",
				tabCurrentIndex: 0,
				orderStatus: '',
				orderList: [],
				pageNo: 1,
				pageSize: 10,
				totalPage: 0,
				refundDetailVO: [],
				navList: [{
						state: 0,
						text: '待使用',
						orderStatus: 0,
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '已使用',
						loadingType: 'more',
						orderStatus: 1,
						orderList: []
					},
					{
						state: 2,
						text: '已过期',
						loadingType: 'more',
						orderStatus: -1, //已付款
						orderList: []
					}
				],
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
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

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

			//得到数据
			async getData(orderStatus, navItem) {
				this.res = {};
				var params = {
					useStatus: orderStatus,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}

				let res = await this.$axios(this.$baseUrl.getCouponList, JSON.stringify(params));
				for (var i in res.data.data) {
					res.data.data[i].openDetail = false;
				}
				
				this.res = res;
				if (this.pageNo == 1) {
					this.totalPage = this.res.data.pages;
				}
				
				this.orderList = this.res.data.data.filter(item => {
					item.startTime = fn.formatTime(item.startTime, "Y-M-D");
					item.endTime = fn.formatTime(item.endTime, "Y-M-D");
					//添加不同状态下订单的表现形式
					item = Object.assign(item, this.orderStateExp(item.couponTypeCode));
					//演示数据所以自己进行状态筛选
					// if (orderStatus === 0) {
					// 	//0为全部订单
					// 	return item;
					// }
					
					return item
				});
				this.orderList.forEach(item => {
					//item.openDetail = false;
					navItem.orderList.push(item);
				})
				
				console.log("this.orderList",this.orderList)
				
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				//if(!this.res.data.data.length){
				this.$set(navItem, 'loaded', true);
				//}

				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if (this.pageNo >= this.totalPage) {
					uni.stopPullDownRefresh();
					this.pageNo = this.totalPage + 1;
					navItem.loadingType = 'noMore';

				} else {
					this.pageNo = this.pageNo + 1;
					console.log(this.pageNo)
					this.getData(orderStatus, navItem);
					navItem.loadingType = 'more';
				}
			},

			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let orderStatus = navItem.orderStatus;
				console.log("来源：", source)

				if (source === 'tabChange' && navItem.loaded === true) {
					this.$set(navItem, 'loaded', false);
					//tab切换只有第一次需要加载数据
					//return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				this.getData(orderStatus, navItem);
				// setTimeout(() => {

				// }, 600);
			},

			//showDetail
			showDatail(e) {

				e.openDetail = !e.openDetail;
				console.log(e.openDetail)
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				
				this.orderList = [];
				this.pageNo = 1;
				this.totalPage = 0;
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let orderStatus = navItem.orderStatus;
				navItem.orderList = [];

				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},

			//订单状态文字和颜色
			orderStateExp(couponTypeCode) {
				let stateTip = 'base-coupons',
					stateTipColor = '#fa436a';

				switch (couponTypeCode) {
					case "YDMJQ":
						stateTip = 'base-coupons-mj';
						break;
					case "YDZKQ":
						stateTip = 'base-coupons-zk';
						stateTipColor = '#339cfe';
						break;
					case "YDDKQ ":
						stateTip = 'base-coupons';
						stateTipColor = '#339cfe';
						break;
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 86px);
	}

	.list-scroll-content {
		height: 100%;
	}
	.quanBar{
		display: flex;
		height: 46px;
		position: relative;
		justify-content:space-around;
		align-items: center;
		background: #fff;
		font-size: $font-lg + 2;
		.on{
			color: $font-color-blue;
		}
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		position: relative;
		display: flex;
		flex-direction: column;
		// background: #fff;
		margin-top: 40upx;
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
</style>
