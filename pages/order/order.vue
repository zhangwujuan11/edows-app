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

					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<!-- <view class="icon-select" @click="selSet(item)" v-if="tabCurrentIndex==1">
							<text class="icon-radio" :class="item.flagSel ? `icon-radio-ok` : `` "></text>
						</view> -->
						<view class="order-item-info">
							<view class="i-top b-b">
								<text class="time">{{item.orderSn}}</text>
								<text class="red"
									v-if="(item.orderStatus==102 || item.orderStatus==103) && (item.refundStatus &&  item.refundStatus !=206 ) ">{{item.refundStatusValue}}</text>
								<text class="state" :style="{color: item.stateTipColor}"> {{item.stateTip}} </text>

							</view>

							<scroll-view v-if="item.productList.length > 1" class="goods-box" scroll-x>
								<navigator :url="`/pages/order/orderDetail?orderSn=` + item.orderSn">
									<view v-for="(goodsItem, goodsIndex) in item.productList" :key="goodsIndex"
										class="goods-item">
										<image class="goods-img" :src="goodsItem.imgPath" mode="aspectFill"></image>
									</view>
								</navigator>
							</scroll-view>
							<navigator :url="`/pages/order/orderDetail?orderSn=` + item.orderSn">
								<view class="goods-box-single" v-if="item.productList.length === 1"
									v-for="(goodsItem, goodsIndex) in item.productList" :key="goodsIndex">
									<image class="goods-img" :src="goodsItem.imgPath" mode="aspectFill"></image>
									<view class="right">
										<text class="title clamp">{{goodsItem.productName}}</text>
										<view class="attr-box">
											<text v-for="(subItem,subIndex) in goodsItem.attrValueVOList"
												:key="subIndex">
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

							<block v-for="(subGiftItem, subGiftIndex) in item.giftVOList " :key="subGiftIndex"
								v-if="item.isGift">
								<navigator :url="`/pages/product/product?code=` + subGiftItem.giftCode">
									<view class="goods-box-single">
										<image class="goods-img" :src="subGiftItem.giftImg"></image>
										<view class="right">
											<text class="title clamp">{{subGiftItem.giftName}}</text>
											<view class="attr-box">
												<text>
													数量：{{subGiftItem.giftNum}}
												</text>
												<text v-if="subGiftItem.remarks" class="grey"> ( {{subGiftItem.remarks}}
													) </text>
											</view>
											<view class="attr-box">
												<text class="blue">赠品</text>
											</view>
										</view>
									</view>
								</navigator>
							</block>

							<view class="price-box">
								共
								<text class="num">{{item.totalSum}}</text>
								件商品 &nbsp;&nbsp;&nbsp;&nbsp;应付金额
								<text class="price red">{{item.totalPrice}}</text>
							</view>

							<view class="order-share blue"
								v-if="item.shareCoupon && (item.orderStatus != 102 || item.orderStatus != 103 || item.orderStatus != 104 || item.orderStatus != 107 )  ">
								点击付款（取消）时，共享付款的订单将一起支付（取消）
							</view>

							<view class="action-box b-t" v-if="item.payStatus==0 && item.orderStatus == 101">
								<block v-if="item.refundStatus">

								</block>
								<button class="action-btn red" @click="cancelOrder(item)"
									v-if="item.settleStatus==0">取消订单</button>
								<button class="action-btn recom" @click="toPay(item)"
									v-if="accountType!=3 && item.totalPrice != 0">立即支付</button>
								<button class="action-btn recom" @click="upload(item)" v-if="isOffline==1">线下支付</button>
							</view>
							<view class="action-box b-t" v-if="item.orderStatus==102">
								<block v-if="item.refundStatus">
									<!-- <button v-if="item.refundStatus ==200" class="action-btn red" @click="canncelRefundApply(item)">取消退款</button> -->
									<button v-if="item.refundStatus ==202 || item.refundStatus ==206"
										class="action-btn red" @click="refundOrder(item)">申请退款</button>
									<button v-if="item.refundStatus !=206" class="action-btn blue"
										@click="refundOrderDetail(item)">退款详情</button>

								</block>
								<block v-else>
									<button class="action-btn red" @click="refundOrder(item)">申请退款</button>
								</block>
							</view>
							<view class="action-box b-t" v-if="item.orderStatus==103">
								<block v-if="item.refundStatus">
									<!-- <button v-if="item.refundStatus ==200" class="action-btn red" @click="canncelRefundApply(item)">取消退款</button> -->
									<button v-if="item.refundStatus ==202 || item.refundStatus ==206"
										class="action-btn red" @click="refundOrder(item)">申请退款</button>
									<button v-if="item.refundStatus !=206" class="action-btn blue"
										@click="refundOrderDetail(item)">退款详情</button>

								</block>
								<block v-else>
									<button class="action-btn red" @click="refundOrder(item)">申请退款</button>

								</block>
								<button class="action-btn recom" @click="confirm(item)">确认收货</button>

							</view>
							<view class="action-box b-t" v-if="item.orderStatus==105">
								<!-- <button class="action-btn red" @click="deleteOrder(index,item)">删除订单</button> -->
							</view>
							<view class="action-box b-t" v-if="item.orderStatus == 107">
								<!-- <button class="action-btn red" @click="deleteOrder(index,item)">删除订单</button> -->
								<button class="action-btn blue" @tap="makePhoneCall">售后服务</button>
								<button class="action-btn recom" @click="toEvalu(item)"
									v-show="item.isComment">去评价</button>
							</view>
							<view class="action-box b-t" v-if="item.orderStatus==109">
								<button class="action-btn red" @click="refundOrder(item)">申请退款</button>
							</view>
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>

		<view class="set-foot" v-if="accountType==3">
			<!-- <view class="set-foot-info">
				<view class="option-set-select" @click="allSel">
					<text class="icon-radio" :class="allSelect ? `icon-radio-ok` : ``"></text>
					<text>全选</text>
				</view>
				<view class="set-money">
					<text class="grey">结算金额：</text>
					<text class="red p16">¥ <text class="set-total-money">{{totalPrice}}</text></text>
				</view>
			</view> -->
			<view class="set-foot-btn" @click="toSettle">
				<text>结算信息</text>
			</view>
		</view>


		<!-- 服务说明模态层弹窗 -->
		<view class="popup spec" :class="seviceClass" @touchmove.stop.prevent="stopPrevent" @click="toggleService()">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer service-content" @click.stop="stopPrevent">
				<view class="inner-service-content">
					<view class="service-title">
						<text>以下订单需一起{{optsType}}</text>
						<text class="blue">由于以下订单共享优惠，需要一起{{optsType}}</text>
					</view>
					<scroll-view scroll-y class="content-aside">
						<view class="item-service" v-for="(item,index) in shareCouponOrderList" :key="index">
							<text>{{item.productList[0].productName}} （共 {{item.totalSum}} 件）</text>
							<text class="price red">{{item.totalPrice}}</text>
						</view>
					</scroll-view>
					<view class="service-opts">
						<text class="back" @click="toggleService">返回</text>
						<text class="surPay" @click="toSurPay(shareCouponOrderList)"
							v-if="optsType==`付款`">确认{{optsType}}</text>
						<text class="surPay" @click="cancelSurOrder(shareCouponOrderList)"
							v-if="optsType==`取消`">确认{{optsType}}</text>
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
			 console.log(uni.getStorageSync('UmsMember').UmsMember.isOffline,uni.getStorageSync('UmsMember').UmsMember.accountType,66666)
			this.accountType =  uni.getStorageSync('UmsMember').UmsMember.accountType ?  uni.getStorageSync('UmsMember').UmsMember.accountType : 0;
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

				let res = await this.$axios(this.$baseUrl.getOrderList, JSON.stringify(params));
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

			//选择
			selSet(e) {
				//console.log(this.navList)
				e.flagSel = !e.flagSel;
				let list = this.navList[1].orderList; //正式改为1
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
					for (var i in this.navList[1].orderList) {
						this.navList[1].orderList[i].flagSel = false;

					}
					this.allSelect = false;
				} else {
					for (var i in this.navList[1].orderList) {
						//if (this.pdlist[i].bargainSucc != 1) {
						this.navList[1].orderList[i].flagSel = true;
						//}
					}
					this.allSelect = true;
				}
				this.calcTotal();
			},

			//计算总价
			calcTotal() {
				this.orderSnList = [];
				let list = this.navList[1].orderList;
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
				// if (!this.chackInfo()) {
				// 	return false;
				// }
				uni.navigateTo({
					url: '/pages/order/orderSettle?state=0'
				})
			},

			//服务说明 弹框开关
			toggleService() {
				if (this.seviceClass === 'show') {
					this.seviceClass = 'hide';
					setTimeout(() => {
						this.seviceClass = 'none';
					}, 250);
				} else if (this.seviceClass === 'none') {
					this.seviceClass = 'show';
				}
			},

			stopPrevent() {},
			//去付款
			async toPay(item) {
				var _self = this;
				this.optsType = "";
				this.shareCouponOrderList = "";
				if (item.shareCoupon) {
					console.log("上面的")
					this.shareCouponOrderList = item.shareCouponOrderList;
					this.optsType = "付款";
					this.toggleService();

				} else {
					this.toSurPay(item);
				}

			},

			//确定付款
			async toSurPay(item) {
				var orderSn = "";
				var arrOrderSn = [];
				const _self = this
				if (item.orderSn) {
					orderSn = item.orderSn;
				} else {
					for (var i in item) {
						arrOrderSn.push(item[i].orderSn)
					}
					orderSn = arrOrderSn.join(',')
				}
				console.log(item)
				var params = {
				  orderSn: orderSn,
				  payType: 'MWEB',
				  useSecurityBalance: item.totalPrice
				}
				let res = await this.$axios(this.$baseUrl.orderPayer, params);
				if (res.data.code == 200) {
				 let data = res.data.data
				 let mweb_url = res.data.data.mwebUrl
				 	const platform = uni.getSystemInfoSync().platform
				 	const domain = 'www.edows.cn'
				 	const webview = plus.webview.create('','custom-webview');
				 	switch (platform) {
				 		case 'android':
				 			webview.loadURL(mweb_url, {'Referer': 'https://' + domain});
				 			break;
				 		case 'ios':
				 			webview.loadURL(mweb_url, {'Referer': domain + '://'});
				 			break;
				 		default:
				 			break;	
				 	}
				}

				// uni.login({
				// 	provider: 'weixin',
				// 	success: async (loginRes) => {
				// 		var params = {
				// 			orderSn: orderSn,
				// 			openId: uni.getStorageSync('openId') ? uni.getStorageSync('openId') : ''
				// 		}
				// 		console.log(params)
				// 		let res = await this.$axios(this.$baseUrl.orderPayer, params);
				// 		console.log("返回数据：", res.data.data)
				// 		if (res.data.data.appId) {
				// 			uni.requestPayment({
				// 				provider: 'wxpay',
				// 				appId: res.data.data.appId,
				// 				timeStamp: res.data.data.timeStamp,
				// 				nonceStr: res.data.data.nonceStr,
				// 				package: res.data.data.packageValue,
				// 				signType: res.data.data.signType,
				// 				paySign: res.data.data.paySign,
				// 				success: function(res) {
				// 					uni.redirectTo({
				// 						url: '/pages/money/paySuccess?totalPrice=' +
				// 							item
				// 							.totalPrice
				// 					})
				// 				},
				// 				fail: function(err) {
				// 					_self.$api.msg('支付失败');
				// 					console.log('fail:' + JSON.stringify(err));
				// 				}
				// 			});
				// 		} else if (res.data.data == '支付成功') {
				// 			_self.$api.msg(res.data.data);
				// 			setTimeout(() => {
				// 				uni.redirectTo({
				// 					url: '/pages/money/paySuccess?totalPrice=' +
				// 						item.totalPrice
				// 				})
				// 			}, 1000)
				// 		}

				// 	}
				// });
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

				var _self = this;
				this.optsType = "";
				this.shareCouponOrderList = "";
				if (item.shareCoupon) {
					this.shareCouponOrderList = item.shareCouponOrderList;
					this.optsType = "取消";
					this.toggleService();
				} else {
					this.cancelSurOrder(item);
				}

			},
			//确认取消订单
			async cancelSurOrder(item) {
				uni.showLoading({
					title: '请稍后'
				})
				console.log(item)

				var orderSn = "";
				var arrOrderSn = [];
				if (item.orderSn) {
					orderSn = item.orderSn;
					console.log(orderSn)
				} else {
					for (var i in item) {
						arrOrderSn.push(item[i].orderSn)
					}
					orderSn = arrOrderSn[0]
					console.log(orderSn)
				}
				var params = {
					orderSn: orderSn
				}
				let res = await this.$axios(this.$baseUrl.cancelOrder, params);
				if (res.data.code == 200) {
					this.seviceClass = 'hide';

					setTimeout(() => {
						this.seviceClass = 'none';
						if (item.orderSn) {
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

							//this.navList[this.tabCurrentIndex].orderList;

						} else {
							uni.navigateTo({
								url: '/pages/order/order?state=0'
							})
						}
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
			async toOffline(item) {
				var _self = this;
				var orderSn = "";
				var arrOrderSn = [];
				if (item.orderSn) {
					orderSn = item.orderSn;
				} else {
					for (var i in item) {
						arrOrderSn.push(item[i].orderSn)
					}
					orderSn = arrOrderSn.join(',')
					console.log(orderSn)
				}
				var params = {
					orderSn: orderSn,
					pzImg: item.pzImg
				}
				let offlinePay = await _self.$axios(_self.$baseUrl.offlinePay, params)

				if (offlinePay.data.code == 200) {
					_self.$api.msg('提交成功');
					setTimeout(() => {
						_self.onLoad()
					}, 1600)
				}
			},
			upload: function(item) {
				var _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						console.log(res, 0)
						const tempFilePaths = res.tempFilePaths;
						wx.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: async res => { //成功的回调
								let imgPath = 'data:image/png;base64,' + res.data;
								console.log(res, 1)
								var params = {
									"base64Data": imgPath,
									"bizType": 0
								}
								let {
									data
								} = await _self.$axios(_self.$baseUrl.uploadPic, params)
								console.log(data)
								if (data.code == 200) {
									item.pzImg = data.data.webPath
									setTimeout(() => {
										_self.toOffline(item)
									}, 300)
								}
							}
						})
					},
					error: function(e) {
						console.log(e);
					}
				});
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

	.price {
		font-size: $font-base + 2upx;
		color: $font-color-dark;

		.red {
			font-weight: 600;
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
	}

	.set-foot-info {
		width: 72%;
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
		width: 30%;
		background: #349cff;
		text-align: center;
		line-height: 108upx;
		color: #fff;
		margin-left: auto;
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

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				/* border-radius: 10upx; */
				background: $font-color-blue;
				font-size: $font-base + 2upx;
				color: #fff;
				/* margin: 30upx auto 0; */
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	.order-share {
		font-size: $font-base;
		line-height: 40upx;
		padding: 0 16upx 16upx
	}

	.service-content {
		position: relative;

		.inner-service-content {
			padding: 20upx;
			font-size: $font-base;

			.service-title {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: $font-base;
				text-align: center;
				height: 120upx;
				line-height: 50upx;
				border-bottom: 2upx solid #eee
			}

			.content-aside {
				margin-top: 16upx;
				height: 600upx;
				padding-bottom: 100upx;

				.item-service {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 16upx 0;
				}
			}

			.service-opts {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				display: flex;
				height: 92upx;
				line-height: 92upx;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				font-size: 30upx;

				.back {
					width: 50%;
					background: #e1e1e1;
				}

				.surPay {
					width: 50%;
					background: #339cfe;
					color: #fff;
				}
			}
		}
	}
</style>
