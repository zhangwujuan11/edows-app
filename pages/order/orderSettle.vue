<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box p50"  duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<view v-if="tabCurrentIndex==0">
						<!-- 订单列表 -->
						<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item" @click="selSet(item)">
							<!-- <view class="icon-select">
								<text class="icon-radio" :class="item.flagSel ? `icon-radio-ok` : `` "></text>
							</view> -->
							<view class="order-item-info">
								<view class="i-top b-b">
									<text class="time">{{item.orderSn}}</text>
									<text class="state">待结算 </text>
								</view>

								<scroll-view v-if="item.productList.length > 1" class="goods-box" scroll-x>
									<navigator :url="`/pages/order/orderDetail?orderSn=` + item.orderSn">
									<view>
										<view v-for="(goodsItem, goodsIndex) in item.productList" :key="goodsIndex" class="goods-item">
											<image class="goods-img" :src="goodsItem.imgPath" mode="aspectFill"></image>
										</view>
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
								<view class="order-share" v-if="item.shareCoupon">优惠金额：<text class="price red">{{item.couponAmount}}</text></view>
								</navigator>
								<view class="price-box">
									共
									<text class="num">{{item.totalSum}}</text>
									件商品 &nbsp;&nbsp;&nbsp;&nbsp;应付金额
									<text class="price red">{{item.totalPrice}}</text>
								</view>


							</view>
						</view>

					</view>

					<view v-if="tabCurrentIndex!=0">
						<view class="order-items">
							
							<view v-for="(item,index) in tabItem.orderList" :key="index" class="settleList chargeList" @click="toSettleDetail(item)">
					
								<view class="settleInfo">
									
									<view class="settle-tit" style="border:none">
										<text class="time">{{item.createDate}}</text>
										<text class="state">{{tabCurrentIndex ==1 ? `结算中` : `已结算`}}</text>
									</view>
									<view class="settle-context">
										<view class="item-info">
											<text class="grey">结算单号：</text>
											<text>{{item.accountSn}}</text>
										</view>
										
										<view class="item-info">
											<text class="grey">包含订单：</text>
											<text class="red">{{item.orderCount}} </text>
										</view>
										
										<view class="item-info">
											<text class="grey">结算金额：</text>
											<text class="red">¥ {{item.orderPrice}}</text>
										</view>
										<text class="showMore" style="top:40%"></text>
									</view>
								
								</view>
								
							</view>
							
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>

		<view class="set-foot">
			<view class="set-foot-info">
				<!-- <view class="option-set-select" @click="allSel">
					<text class="icon-radio" :class="allSelect ? `icon-radio-ok` : ``"></text>
					<text>全选</text>
				</view> -->
				<view class="set-money">
					<text class="grey">期初余额：</text>
					<text class="red p16">¥ <text class="set-total-money">{{accountBalance}}</text></text>
				</view>
			</view>
			<!-- <view class="set-foot-btn" @click="toSettle">
				<text>去结算</text>
			</view> -->
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
				accountBalance:0,
				refundDetailVO: [],
				navList: [{
						state: 0,
						text: '待结算',
						orderStatus: "",
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '结算中',
						loadingType: 'more',
						orderStatus: "101",
						orderList: []
					},
					{
						state: 2,
						text: '已结算',
						loadingType: 'more',
						orderStatus: "102", //已付款
						orderList: []
					}
				],
				allSelect: false,
				totalPrice: 0,
				orderSnList: [],
				accountType: 0
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
				console.log(this.tabCurrentIndex)
				if(this.tabCurrentIndex == 0){
					var params = {
						orderStatus: orderStatus,
						pageNo: this.pageNo,
						pageSize: this.pageSize
					}
					let res = await this.$axios(this.$baseUrl.getDjsOrderList, JSON.stringify(params));
					if(res.data.data.length){
						this.accountBalance = res.data.data[0].accountBalance ? res.data.data[0].accountBalance : 0;
					}
					
					for (var i in res.data.data) {
						res.data.data[i].flagSel = false;
					}
					this.res = res;
					
					
				}
				
				if(this.tabCurrentIndex != 0){  
					var settleStatus =  this.tabCurrentIndex==1 ? 1 : 2; 
					var params = {
						settleStatus: settleStatus,
						pageNo: this.pageNo,
						pageSize: this.pageSize
					}
					let res = await this.$axios(this.$baseUrl.getOrderAccountList, JSON.stringify(params));
					
					this.res = res;
					for(var i in this.res.data.data) {
						this.res.data.data[i].createDate = fn.formatTime(this.res.data.data[i].createDate, "Y-M-D");
					}
				}
				
				
				if (this.pageNo == 1) {
					this.totalPage = this.res.data.pages;
				}
				this.orderList = this.res.data.data;
				
				
				// this.orderList = this.res.data.data.filter(item => {
				// 	//添加不同状态下订单的表现形式
				// 	item = Object.assign(item, this.orderStateExp(item.orderStatus));
				// 	//演示数据所以自己进行状态筛选
				// 	if (orderStatus === "") {
				// 		//0为全部订单
				// 		return item;
				// 	}
				// 	if (orderStatus === "102") {
				// 		return item.orderStatus === "102" || item.orderStatus === "103"
				// 	}
				// 	return item.orderStatus === orderStatus
				// });
				this.orderList.forEach(item => {
					navItem.orderList.push(item);
				})
				
				//this.accountBalance = navItem.orderList[0].accountBalance ? navItem.orderList[0].accountBalance : 0;
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
				this.allSelect = false;
				this.loadData('tabChange');

			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},

			//选择
			selSet(e) {
				//console.log(this.navList)
				e.flagSel = !e.flagSel;
				let list = this.navList[0].orderList; //正式改为1
				var len = list.length;
				var sumLen = 0;
				for (var i = 0; i < len; i++) {
					if (list[i].flagSel) {
						sumLen += 1;
					}
				}
				console.log('订单长度：', len, ' 选中长度：', sumLen)
				if (len == sumLen) {
					this.allSelect = true;
				} else {
					this.allSelect = false;
				}
				this.calcTotal();


			},

			//全选
			allSel() {
				//this.allSelect = !this.allSelect;

				if (this.allSelect) {
					for (var i in this.navList[0].orderList) {
						this.navList[0].orderList[i].flagSel = false;

					}
					this.allSelect = false;
				} else {
					for (var i in this.navList[0].orderList) {
						//if (this.pdlist[i].bargainSucc != 1) {
						this.navList[0].orderList[i].flagSel = true;
						//}
					}
					this.allSelect = true;
				}
				this.calcTotal();
			},

			//计算总价
			calcTotal() {
				this.orderSnList = [];
				let list = this.navList[0].orderList;
				if (list.length === 0) {
					return;
				}
				let total = 0;
				list.forEach(item => {
					if (item.flagSel === true) {
						total += parseFloat(item.totalPrice);
						this.orderSnList.push(item.orderSn);
					}
				})
				this.totalPrice = total.toFixed(2);
				console.log("订单序号：", this.orderSnList)
			},
			
			toSettleDetail(e){
				uni.navigateTo({
					url: '/pages/order/settleDetail?accountSn=' + e.accountSn
				})
			},

			//判断信息
			chackInfo() {
				if (!this.orderSnList.length) {
					this.$api.msg('请先选择订单号!');
					return false;
				}
				return true;
			},

			//一级供应商去结算
			toSettle() {
				var _self = this;
				if (!this.chackInfo()) {
					return false;
				}
				uni.navigateTo({
					url: '/pages/order/toSettle?orderSnList=' + this.orderSnList.join(',')
				})
			},
			//去付款
			async toPay(item) {
				var _self = this;
				uni.login({
					provider: 'weixin',
					success: async (loginRes) => {
						var params = {
							orderSn: item.orderSn,
							openId: uni.getStorageSync('openId') ? uni.getStorageSync('openId') : ''
						}
						console.log(params)
						let res = await this.$axios(this.$baseUrl.orderPayer, params);
						console.log("返回数据：", res.data.data)
						uni.requestPayment({
							provider: 'wxpay',
							appId: res.data.data.appId,
							timeStamp: res.data.data.timeStamp,
							nonceStr: res.data.data.nonceStr,
							package: res.data.data.packageValue,
							signType: res.data.data.signType,
							paySign: res.data.data.paySign,
							success: function(res) {
								uni.redirectTo({
									url: '/pages/money/paySuccess?totalPrice=' + item.totalPrice
								})
							},
							fail: function(err) {
								_self.$api.msg('支付失败');
								console.log('fail:' + JSON.stringify(err));
							}
						});

					}
				});
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
							let res = await this.$axios(this.$baseUrl.orderConfirmation, params);
							uni.redirectTo({
								url: '/pages/order/order?state=3'
							})
						}
					}
				})

			},
			//申请退款
			refundOrder(item) {
				uni.navigateTo({
					url: '/pages/order/refund?orderSn=' + item.orderSn
				})
			},

			//取消退款
			// async canncelRefundApply(item){
			// 	var params = {
			// 		outRefundNo: item.outRefundNo
			// 	}
			// 	let res = await this.$axios(this.$baseUrl.canncelRefundApply, params);
			// 	if(res.data.code == 200){
			// 		this.$api.msg('取消退款成功');
			// 		setTimeout(() => {
			// 			
			// 			uni.navigateTo({
			// 				url: '/pages/order/order?state=2'
			// 			})
			// 		}, 1000)
			// 	}
			// },	

			//退款详情操作
			refundOrderDetail(item) {
				uni.navigateTo({
					url: '/pages/order/refundDetail?orderSn=' + item.orderSn
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
							let res = await this.$axios(this.$baseUrl.deleteOrder, params);
							if (res.data.code == 200) {
								setTimeout(() => {
									this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
								}, 600)
							}
						}
					}
				})
			},
			//取消订单
			async cancelOrder(item) {
				uni.showLoading({
					title: '请稍后'
				})
				console.log(item)
				var params = {
					orderSn: item.orderSn
				}
				let res = await this.$axios(this.$baseUrl.cancelOrder, params);
				if (res.data.code == 200) {
					setTimeout(() => {
						let {
							stateTip,
							stateTipColor
						} = this.orderStateExp(105);
						item = Object.assign(item, {
							orderStatus: 105,
							stateTip,
							stateTipColor
						})

						//取消订单后删除待付款中该项
						let list = this.navList[1].orderList;
						let index = list.findIndex(val => val.id === item.id);
						index !== -1 && list.splice(index, 1);

						uni.hideLoading();
					}, 600)
				}

			},

			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 101:
						stateTip = '待付款';
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

	.order-items {
		position: relative;
		width: 680upx;
		margin: 10px auto;

		.settleList {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background: #fff;
			border-radius: 12upx;
			margin-bottom: 24upx;
			padding: 4upx 20upx 36upx 20px;
			.settleInfo{
				width: 100%;
				.state{
					color: #339CFE;
				}
			}
			.settle-tit {
				height: 80upx;
				line-height: 80upx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				.time{
					font-weight: 600;
				}
			}

			.settle-context {
				position: relative;

				.item-info {
					margin-bottom: 20upx;
					margin-top: 24upx;
					background: #fff;
					border-radius: 12upx;
					font-size: 26upx;
					.grey{
						color: #999;
					}
					.red{
						font-weight: 600;
						font-size: 32upx;
						color: #e71e1e;
					}
				}
			}
		}

	}
	
	.showMore {
	    display: block;
	    position: absolute;
	    right: 20upx;
	    top: 40%;
	    width: 20upx;
	    height: 36upx;
	    background: url(../../static/go.png) no-repeat;
	    background-size: contain;
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
				padding: 6upx 20upx;
				border-radius: 40upx;
				margin-right: 14upx;
			}

			.state {
				font-weight: 600;
				color: #339cfe;
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

	.icon-radio {
		width: 24px;
		height: 24px;
		display: block;
		margin: 0 auto;
		background: url(../../static/radios.png) no-repeat;
		background-size: contain;

		&.icon-radio-ok {
			background: url(../../static/ok.png) no-repeat;
			background-size: contain;
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
	
	.order-share {
		font-size: $font-base;
		color: #999;
		line-height: 40upx;
		padding: 10upx 30upx;
		text-align: right;
	}

	.set-foot {
		position: fixed;
		z-index:9;
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
		margin-left:26upx;
		position: relative;
		display: flex;
		align-items: center;
		background: #fff;
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
</style>
