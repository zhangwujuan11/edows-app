<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{current: tabCurrentIndex === index}" @click="tabClick(index)">
				{{accountType!=3 ? item.text : item.textSpec}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" :class="accountType==3 ? `p50` : ``" duration="300"
			@change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">

						<view class="order-item-info">
							<view class="i-top b-b">
								<text class="time">{{item.orderSn}}</text>
								<text class="red"
									v-if="(item.orderStatus==102 || item.orderStatus==103) && (item.refundStatus &&  item.refundStatus !=206 ) ">{{item.refundStatusValue}}</text>
								<text class="state" :style="{color: item.stateTipColor}"> {{item.stateTip}} </text>
							</view>

							<navigator :url="`/pages/accumulate/orderDetail?orderSn=` + item.orderSn">
								<view class="goods-box-single">
									<image class="goods-img" :src="item.masterImg" mode="aspectFill"></image>
									<view class="right">
										<text class="title clamp">{{item.goodsTitle}}</text>
										<view class="price">
											<text class="red">{{item.scoreNumber}}</text>
											<text class="blue"> x {{item.totalSum}}</text>
										</view>
									</view>
								</view>
							</navigator>


							<view class="price-box">
								共
								<text class="num">{{item.totalSum}}</text>
								件商品 &nbsp;&nbsp;&nbsp;&nbsp;应付
								<text class="price red">{{item.totalScoreNumber}}</text>
							</view>

							<view class="action-box b-t" v-if="item.orderStatus==103">
								<button class="action-btn recom" @click="confirm(item)">确认收货</button>
							</view>
							<view class="action-box b-t" v-if="item.orderStatus==105">
								<button class="action-btn red" @click="deleteOrder(index,item)">删除订单</button>
							</view>
							<view class="action-box b-t" v-if="item.orderStatus == 107">
								<button class="action-btn blue" @tap="makePhoneCall">售后服务</button>
								<button class="action-btn recom" @click="toEvalu(item)"
									v-show="item.isComment">去评价</button>
							</view>

						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
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
				seviceClass: 'none',
				shareCouponOrderList: [],
				optsType: '',
				navList: [{
						state: 0,
						text: '全部',
						textSpec: '全部',
						orderStatus: "",
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						textSpec: '已下单',
						loadingType: 'more',
						orderStatus: "101",
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						textSpec: '待收货',
						loadingType: 'more',
						orderStatus: "102", //已付款
						orderList: []
					},
					{
						state: 3,
						text: '已完成',
						textSpec: '已完成',
						loadingType: 'more',
						orderStatus: "107", //已完成
						orderList: []
					}
				],
				allSelect: false,
				totalPrice: 0,
				orderSnList: [],
				accountType: 0,
				isOffline: 0
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
			this.isOffline = uni.getStorageSync('UmsMember').UmsMember.isOffline ? uni.getStorageSync('UmsMember').UmsMember.isOffline : 0;
			this.accountType = uni.getStorageSync('UmsMember').UmsMember.accountType ? uni.getStorageSync('UmsMember').UmsMember.accountType : 0;
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
			//得到数据
			async getData(orderStatus, navItem) {
				this.res = {};
				var params = {
					orderStatus: orderStatus,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}

				let res = await this.$axios(this.$baseUrl.scoreGoodsOrderList, JSON.stringify(params));
				for (var i in res.data.data) {
					res.data.data[i].flagSel = false;

				}
				this.res = res;
				if (this.pageNo == 1) {
					this.totalPage = this.res.data.pages;
				}

				this.orderList = this.res.data.data.filter(item => {
					//添加不同状态下订单的表现形式
					item = Object.assign(item, this.orderStateExp(item.orderStatus));
					//演示数据所以自己进行状态筛选
					if (orderStatus === "") {
						//0为全部订单
						return item;
					}
					if (orderStatus === "102") {
						return item.orderStatus === "102" || item.orderStatus === "103"
					}
					return item.orderStatus === orderStatus
				});
				this.orderList.forEach(item => {
					navItem.orderList.push(item);
				})
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
				setTimeout(() => {

				}, 600);
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

			//确认收货 
			async confirm(item) {
				var _self = this;
				uni.showModal({
					content: '确认已收货？',
					success: async (res) => {
						if (res.confirm) {
							var params = {
								orderSn: item.orderSn
							}
							let res = await this.$axios(this.$baseUrl.scoreGoodsConfirmation, params);
							uni.redirectTo({
								url: '/pages/order/order?state=3'
							})
						}
					}
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
			//去评价
			toEvalu(item) {
				uni.navigateTo({
					url: '/pages/evaluate/evaluate?orderSn=' + item.orderSn
				})
			},
			//删除订单
			async deleteOrder(index, item) {
				uni.showModal({
					content: '确认删除此订单？',
					success: async (res) => {
						if (res.confirm) {
							var params = {
								orderSn: item.orderSn
							}
							let res = await this.$axios(this.$baseUrl.scoreGoodsDelete, params);
							if (res.data.code == 200) {
								setTimeout(() => {
									this.navList.splice(index, 1);
								}, 600)
							}
						}
					}
				})
			},


			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 101:
						stateTip = (this.accountType == 3 ? '已下单' : '待付款');
						break;
					case 102:
						stateTip = '已付款';
						stateTipColor = '#339cfe';
						break;
					case 103:
						stateTip = '已发货';
						stateTipColor = '#339cfe';
						break;
					case 104:
						stateTip = '已签收';
						stateTipColor = '#339cfe';
						break;
					case 105:
						stateTip = '已取消';
						stateTipColor = '#909399';
						break;
					case 106:
						stateTip = '已退款';
						stateTipColor = '#333333';
						break;
					case 107:
						stateTip = '已完成';
						stateTipColor = '#339cfe';
						break;
					case 108:
						stateTip = '退款中';
						stateTipColor = '#333333';
						break;
					case 109:
						stateTip = '退款拒绝';
						stateTipColor = '#f04c41';
						break;
						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			},

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
		height: calc(100% - 40px);

		&.p50 {
			padding-bottom: 110upx;
		}
	}

	.list-scroll-content {
		height: 100%;
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
		align-items: center;
		background: #fff;
		margin-top: 16upx;

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
				font-weight: 600;
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
				font-weight: 600;
				font-size: $font-lg;
				color: $font-color-red;

				&:before {
					content: ' ';
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

	.price {
		font-size: $font-base + 2upx;
		color: $font-color-dark;

		.red {
			font-weight: 600;
			color: $font-color-red;
			padding-right: 14upx;

			&:after {
				content: '积分';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
				color: $font-color-red;
			}
		}

		.blue {
			color: $font-color-blue;
		}
	}
</style>
