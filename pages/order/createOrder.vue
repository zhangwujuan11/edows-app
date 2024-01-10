<template>
	<view>
		<view v-show="!showCoupon">
			<!-- 地址 -->
			<navigator
				:url="`/pages/address/address?source=1&orderData=show&facdureData=` + JSON.stringify(facdureData)"
				class="address-section">
				<!-- <navigator url="/pages/address/address?source=1" class="address-section"> -->
				<view class="order-content">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen" v-if="addressData.name">
						<view class="top">
							<text class="name">{{addressData.name}}</text>
							<text class="mobile">{{addressData.mobile}}</text>
						</view>
						<text class="address">{{addressData.address}} {{addressData.roomNum}}</text>
					</view>
					<view class="cen" v-else>您还没有添加收货地址</view>
					<text class="yticon icon-you"></text>
				</view>

				<image class="a-bg"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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">
				</image>
			</navigator>

			<view class="goods-section">
				<view class="g-header b-b">
					<text class="name">商品信息</text>
				</view>
				<!-- 商品列表 -->
				<block v-for="(item,index) in goodsList" :key="index">
					<view style="margin-bottom: 20upx">
						<view class="g-item">
							<image :src="item.productList.imgPath"></image>
							<view class="right">
								<text class="title clamp">{{item.productList.productName}}</text>
								<view class="spec">
									<text v-for="(subItem,subIndex) in item.productList.attrValueVOList"
										:key="subIndex">
										{{subItem.attrValue}}
									</text>
								</view>
								<view class="price-box">
									<text class="price">￥{{item.productList.price}}</text>
									<text class="number">x {{item.productNum}}</text>
								</view>
							</view>
						</view>
						<block v-for="(subItem,subIndex) in item.productList.giftVOList" :key="subIndex">
							<navigator :url="`/pages/product/product?code=` + subItem.giftCode">
								<view class="g-item" style="margin: 20upx 20upx 20upx 80upx; ">
									<image :src="subItem.giftImg" style="width:120upx; height: 120upx;"></image>
									<view class="right">
										<text class="title clamp">{{subItem.giftName}}</text>
										<view class="spec">
											<text>数量： {{subItem.giftNum}}</text>
											<text v-if="subItem.remarks" class="grey"> ( {{subItem.remarks}} ) </text>
										</view>
										<view class="price-box">
											<text class="number" style="margin-left:0">赠品</text>
										</view>
									</view>
								</view>
							</navigator>
						</block>
						<!-- <view class="c-list b-b" v-if="item.productList.isGift">
						<view class="c-row">
							<text class="tit">赠品信息：</text>
							<view class="bz-list con">
								<block  v-for="(subItem,subIndex) in item.productList.giftVOList" :key="subIndex">
									<navigator :url="`/pages/product/product?code=` + subItem.giftCode">
										<text>{{subItem.giftName}} x {{subItem.giftNum}}</text>
										<text v-if="subItem.remarks" class="grey"> ( {{subItem.remarks}} ) </text>
									</navigator>
									
								</block>
							</view>
						</view>
					</view> -->
					</view>
				</block>
			</view>

			<!-- 优惠明细 -->
			<!-- <view class="yt-list">
			
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					选择优惠券
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
				
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">暂无可用优惠</text>
			</view>
		</view> -->
			<!-- 金额明细 -->
			<view class="yt-list">

				<navigator url="/pages/facture/facture?source=1">
					<view class="yt-list-cell b-b">
						<text class="cell-tit clamp">发票信息</text>
						<text class="cell-tip blue">{{facdureData.payable}}</text>
						<text class="yticon icon-you" style="color:#339cfe"></text>
					</view>
				</navigator>
				<view class="yt-list-cell b-b" @click="showCouponList">
					<text class="cell-tit clamp">优惠券</text>
					<text class="cell-tip blue">{{couponData.payable}}</text>
					<text class="yticon icon-you" style="color:#339cfe"></text>
				</view>
				
				<view class="yt-list-cell b-b" v-if="securityData.shopBalance && !usedisnshi" @click="showBalance">
					<text class="cell-tit clamp">余额支付 (￥{{securityData.securityBalance}})</text>
					<text class="cell-tip" :class="securityData.classN">{{securityData.payable}}</text>
					<text class="yticon icon-you" style="color:#339cfe" v-if="securityData.classN == 'blue'"></text>
				</view>
				<view class="yt-list-cell b-b" v-if="!usesecurityBalance" @click="showBalancexianshi">
					<text class="cell-tit clamp">限时余额支付 (￥{{securityData.limitedBalance}})</text>
					<text class="cell-tip" :class="securityData.classN">{{securityData.payabled}}</text>
					<text class="yticon icon-you" style="color:#339cfe" v-if="securityData.classN == 'blue'"></text>
				</view>

				<view class="yt-list-cell b-b" v-if="couponData.couponAmount">
					<text class="cell-tit clamp">优惠金额</text>
					<text class="cell-tip red">￥{{couponData.couponAmount}}</text>
				</view>

				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">商品合计</text>
					<text class="cell-tip red">￥{{goodsPrice}}</text>
				</view>
				<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥35</text>
			</view> -->
				<!-- <view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">免运费</text>
			</view> -->
				<view class="yt-list-cell desc-cell">
					<text class="cell-tit clamp">备注信息</text>
					<input class="desc" type="text" v-model="remarks" placeholder="选填,给商家留言"
						placeholder-class="placeholder" />
				</view>
			</view>

			<!-- 底部 -->
			<view class="footer">
				<view class="price-content">
					<text>应付金额</text>
					<text class="price-tip">￥</text>
					<text class="price">{{total}}</text>
				</view>
				<text class="submit" @click="submit">提交订单</text>
			</view>

			<!-- 优惠券面板 -->
			<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
				<view class="mask-content" @click.stop.prevent="stopPrevent">
					<!-- 优惠券页面，仿mt -->
					<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
						<view class="con">
							<view class="left">
								<text class="title">{{item.title}}</text>
								<text class="time">有效期至2019-06-30</text>
							</view>
							<view class="right">
								<text class="price">{{item.price}}</text>
								<text>满30可用</text>
							</view>

							<view class="circle l"></view>
							<view class="circle r"></view>
						</view>
						<text class="tips">限新用户使用</text>
					</view>
				</view>
			</view>
		</view>
		<view v-show="showCoupon">
			<view v-if="!couponList.length" class="no-data">暂无优惠券信息</view>
			<view class="order-items">
				<view class="order-item" v-for="(item,index) in couponList" :key="index" @click="selCoupon(item)">
					<view class="base-coupons" :class="item.stateTip">
						<view class="left-coupon">
							<view class="couponType">
								<text v-if="item.couponTypeCode!=`YDZKQ`">￥</text>
								<text class="price" v-if="item.couponTypeCode==`YDMJQ`">{{item.denomination}}</text>
								<text class="price" v-if="item.couponTypeCode==`YDZKQ`">{{item.denomination / 10}}
									折</text>
								<text class="price" v-if="item.couponTypeCode==`YDDKQ`">{{item.denomination}}</text>
							</view>
							<view class="couponTit" v-if="item.couponTypeCode==`YDMJQ`">满{{item.coupon.minPoint}}元减
							</view>
							<view class="couponTit" v-if="item.couponTypeCode==`YDZKQ`">满{{item.coupon.minPoint}}元可用
							</view>
							<view class="couponTit" v-if="item.couponTypeCode==`YDDKQ`">满{{item.coupon.minPoint}}元可用
							</view>
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
									<view class="greyTips " v-if="item.orderStatus == -1"></view>
									<view class="usedTips " v-if="item.orderStatus == 1"></view>
								</view>
								<view class="coupon-detail cell-item">
									<text>详细信息</text>
									<!-- <text class="cell-more"></text> -->
								</view>
							</view>
						</view>

					</view>
					<view class="coupon-intro">
						<view>{{item.coupon.remarks ? item.coupon.remarks : `暂无说明` }} </view>
					</view>
				</view>
			</view>
			<view class="goBack" @click="showCouponList">返回</view>
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
				showCoupon: false,
				arrProCode: [],
				arrProTypes: [],
				orderData: "",
				subFlag: true,
				total: 0, //总价格
				goodsPrice: 0, //商品价格
				goodsList: [],
				maskState: 0, //优惠券面板显示状态
				remarks: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [],

				addressData: {
					code: ''
				},
				facdureData: {
					code: '',
					payable: '不开发票'
				},
				couponData: {
					useCoupon: 0,
					couponTypeCode: "",
					couponCode: '',
					minPoint: 0,
					couponAmount: 0,
					payable: '不使用优惠券'
				},
				securityData: {
					shopBalance: 0,
					securityBalance: 0,
					couponAmount: 0,
					couponPrice: 0,
					payable: '不使用余额',
					useBalance: 0,
					balanceMany: 0,
					classN: 'blue',
					limitedBalance:0,
					payabled:'不使用限时余额'
				},
				usesecurityBalance:false,//是否使用了样板余额
				usedisnshi:false,//是否使用了限时余额
				savecouponAmount:0,
				savecouponPrice:0,
				tresscaod:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option) {
			// let returnUrl = getCurrentPages()[0].route;

			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }
			let tmpOrderData = uni.getStorageSync('tmpOrderData') || '';
			// console.log('临时数据：', tmpOrderData)
			this.orderData = option.data;
			//商品数据
			this.goodsList = tmpOrderData;

			for (var i in tmpOrderData) {
				this.arrProCode.push(tmpOrderData[i].productList.productCode);
				this.arrProTypes.push(tmpOrderData[i].productList.productType)
			}
			let couponAmounts = 0
			let couponPrice = 0
			tmpOrderData.forEach(item => {
				if (item.productList.useSecurityBalance == 1) {
					this.securityData.shopBalance = item.productList.useSecurityBalance
					couponAmounts += item.productList.price * item.productNum
				} else {
					couponPrice += item.productList.price * item.productNum
				}
			})
			this.securityData.couponAmount = couponAmounts
			this.securityData.couponPrice = couponPrice
			this.savecouponAmount=couponAmounts
			this.savecouponPrice=couponPrice
			this.getCouponList();
			this.getShopBalance()
			if (option.addressData) {
				this.addressData = JSON.parse(option.addressData)
			} else {
				this.getAddrData();
			}
			this.calcTotal(); //计算总价
		},
		methods: {
			async getShopBalance() {
				let res = await this.$axios(this.$baseUrl.getShopSecurityBalance);
				if (res.data.code == 200) {
					this.securityData.securityBalance =Number(res.data.data.securityBalance) 
					this.securityData.limitedBalance =  res.data.data.limitedBalance
				}
			},
			//得到优惠券列表
			async getCouponList() {
				var params = {
					productCodes: this.arrProCode.join(','),
					pageNo: 1,
					pageSize: 999
				}
				let res = await this.$axios(this.$baseUrl.getCouponProductList, params);
				if (res.data.code == 200) {
					if (res.data.data.length) {
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
			//使用余额
			showBalance() {
				const that = this
				wx.showModal({
					cancelText: '取消',
					confirmText: '确定',
					content: '是否使用余额支付',
					success(res) {
						if (res.confirm) {
							let totals = 0//临时需支付
							if (that.securityData.couponAmount <= Number(that.securityData.securityBalance)) {
								// 商品合计小于样板余额
								if (that.securityData.balanceMany == 0) {	
									if(that.securityData.couponAmount >=  Number(that.couponData.couponAmount)){
										that.securityData.payable = "-￥" +  ( Number(that.goodsPrice) -  Number(that.couponData.couponAmount))
										totals = 0
										that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2))
										that.securityData.classN = "red"
										that.securityData.useBalance = 1
										that.securityData.balanceMany = 1
										that.usesecurityBalance = true
									}else{
										that.securityData.payable = "-￥" +  ( that.securityData.couponAmount)
										totals = (that.securityData.couponAmount - that.couponData.couponAmount)< 0?   0 :(that.total - that.securityData.couponAmount) + that.securityData.couponPrice;
										that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2))
										that.securityData.classN = "red"
										that.securityData.useBalance = 1
										that.securityData.balanceMany = 1
										that.usesecurityBalance = true
									}
								}
							} else if (that.securityData.securityBalance != '0.00' && that.goodsPrice!=that.securityData.couponAmount) {
								// 样板余额有钱
								totals = that.goodsPrice - that.securityData.securityBalance - that.couponData.couponAmount
								that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2))
								that.securityData.payable = "-￥" + that.securityData.securityBalance
								that.securityData.classN = "red"
								that.securityData.useBalance = 1
								that.securityData.balanceMany = 1
								that.usesecurityBalance = true
							}else if (that.securityData.securityBalance != '0.00' && that.goodsPrice==that.securityData.couponAmount) {
								// 样板余额有钱
								let abc=( that.securityData.couponAmount - Number(that.couponData.couponAmount))>Number(that.securityData.securityBalance)? Number(that.securityData.securityBalance): ( that.securityData.couponAmount - Number(that.couponData.couponAmount))
								totals = (that.securityData.couponAmount - that.couponData.couponAmount -abc)
								that.total = Number(totals.toFixed(2));
								that.securityData.payable = "-￥" + abc
								that.securityData.classN = "red"
								that.securityData.useBalance = 1
								that.securityData.balanceMany = 1
								that.usesecurityBalance = true
							}  else {
								// 样板余额没钱
								that.$api.msg('余额不足');
								that.usesecurityBalance = false
							}
						} else if (res.cancel) {
							let totals = 0
							if (that.securityData.balanceMany == 1) {
								totals =  Number(that.securityData.couponAmount) + Number(that.securityData.couponPrice);
								that.total = Number(totals.toFixed(2));
								that.securityData.payable = "不使用余额"
								that.securityData.useBalance = 0
								that.securityData.balanceMany = 0
								that.securityData.classN = "blue"
								that.usesecurityBalance = false
							}
						}
					}
				})
			},
			//使用限时余额
			showBalancexianshi() {
				const that = this
				wx.showModal({
					cancelText: '取消',
					confirmText: '确定',
					content: '是否使用限时余额支付',
					success(res) {
						if (res.confirm) {
							let totals = 0//临时需支付
							let nota=that.securityData.couponAmount || that.securityData.couponPrice
							if ((nota <= Number(that.securityData.limitedBalance))){
								// 商品合计小于限时余额
								if (that.securityData.balanceMany == 0) {
									if(that.securityData.limitedBalance >=  that.goodsPrice){
										totals = that.securityData.limitedBalance -  (nota - that.couponData.couponAmount - (nota -  Number(that.couponData.couponAmount)))< 0?   0 :nota - that.couponData.couponAmount - (nota -  Number(that.couponData.couponAmount))
										that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2));
										that.securityData.payabled = "-￥" +  ( Number(that.goodsPrice) -  Number(that.couponData.couponAmount)).toFixed(2)
										that.securityData.classN = "red"
										that.securityData.useBalance =2
										that.securityData.balanceMany = 1
										that.usedisnshi = true
									}else{
										console.log(999)
										that.securityData.payabled = "-￥" + (that.securityData.limitedBalance).toFixed(2)
										totals = (that.goodsPrice - that.securityData.limitedBalance)< 0?   0 :(that.goodsPrice - that.securityData.limitedBalance);
										that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2))
										that.securityData.classN = "red"
										that.securityData.useBalance = 2
										that.securityData.balanceMany = 1
										that.usedisnshi = true
									}
								}
							}  else if (that.securityData.limitedBalance != '0.00' && that.goodsPrice!=nota) {
								// 样板余额有钱
								console.log(777)
								totals = that.goodsPrice - that.securityData.limitedBalance - that.couponData.couponAmount
								that.total = Number(totals.toFixed(2)) <0? 0 :  Number(totals.toFixed(2))
								that.securityData.payabled = "-￥" + Number(that.securityData.limitedBalance)- Number(that.couponData.couponAmount) || "-￥" +Number(that.securityData.limitedBalance)
								that.securityData.classN = "red"
								that.securityData.useBalance = 2
								that.securityData.balanceMany = 1
								that.usedisnshi = true
							}else if (that.securityData.limitedBalance != '0.00' && that.goodsPrice==nota) {
								console.log(666)
								// 样板余额有钱
								let abc=( nota - Number(that.couponData.couponAmount))>Number(that.securityData.limitedBalance)? Number(that.securityData.limitedBalance): ( nota - Number(that.couponData.couponAmount))
								totals = (nota - Number(that.couponData.couponAmount) - abc)
								that.total = Number(totals.toFixed(2));
								that.securityData.payabled = "-￥" + abc
								that.securityData.classN = "red"
								that.securityData.useBalance = 2
								that.securityData.balanceMany = 1
								that.usedisnshi = true
							}else {
								// 样板余额没钱
								that.$api.msg('限时余额不足');
								that.usedisnshi = false
							}
						} else if (res.cancel) {
							let totals = 0
								totals =  Number(nota) ;
								that.total = Number(totals.toFixed(2));
								that.securityData.payabled = "不使用限时余额"
								that.securityData.useBalance = 0
								that.securityData.balanceMany = 0
								that.securityData.classN = "blue"
								that.usedisnshi = false
						}
					}
				})
			},

			//显示、隐藏可用优惠券列表
			showCouponList() {
				this.showCoupon = !this.showCoupon;
				if (this.showCoupon) {
					if (this.securityData.balanceMany == 1) {
						this.total = Number(this.total) + Number(this.securityData.couponAmount);
						this.total = Number(this.total.toFixed(2));
						this.securityData.payable = "不使用余额"
						this.securityData.useBalance = 0
						this.securityData.balanceMany = 0
						this.securityData.classN = "blue"
						this.securityData.payabled = "不使用限时余额"
						this.usesecurityBalance=false//是否使用了样板余额
						this.usedisnshi=false//是否使用了限时余额
					}
					this.calcTotal();
				} else {
					if (this.couponData.couponAmount) {
						this.total = this.total - this.couponData.couponAmount;
						this.total = Number(this.total.toFixed(2));
					}
				}
			},

			//选择优惠券
			async selCoupon(e) {
				if (e.couponCode) {
					this.couponData.couponCode = e.couponCode;
					this.couponData.couponTypeCode = e.couponTypeCode;
					this.couponData.useCoupon = 1;
					this.calcTotal()
					this.securityData.couponAmount=this.savecouponAmount
					this.securityData.couponPrice = this.savecouponPrice
					//商品满减券
					if (e.couponTypeCode == "YDMJQ") {
						if (e.coupon.useType == 0) {
							if (this.total >= e.coupon.minPoint) {
								this.couponData.payable = '( 满' + e.coupon.minPoint + '减' + e.denomination + ' 元券 )'
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination
								this.showCoupon = false;
							} else {
								this.$api.msg('商品总价不满' + e.coupon.minPoint + '元，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 1) {
							var selProTypeLists = [];
							var couponPrice = 0;
							var arrProductTypes = e.coupon.productTypes.split(',');
							selProTypeLists = fn.getArrEqual(this.arrProTypes, arrProductTypes);
							var subArr = [];
							for (var i in this.goodsList) {
								for (var j in selProTypeLists) {
									if (this.goodsList[i].productList.productType == selProTypeLists[j]) {
										subArr.push(i);
									}
								}
							}
							subArr = fn.unique(subArr);
							for (var i in subArr) {
								couponPrice += this.goodsList[subArr[i]].productList.price * this.goodsList[subArr[i]]
									.productNum;
							}
							couponPrice = Number(couponPrice.toFixed(2));
							if (couponPrice >= e.coupon.minPoint) {
								this.couponData.payable = '指定分类商品( 满' + e.coupon.minPoint + '减' + e.denomination +
									' 元券 )'
								console.log(e.denomination)
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.tresscaod=Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定分类商品总价不满' + e.coupon.minPoint + '元，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 2) {
							var couponPrice = 0;
							for (var i in this.goodsList) {
								if (this.goodsList[i].productList.productCode == e.coupon.productCode) {
									couponPrice += this.goodsList[i].productList.price * this.goodsList[i].productNum;
								}
							}
							couponPrice = Number(couponPrice.toFixed(2));
							if (couponPrice >= e.coupon.minPoint) {
								this.couponData.payable = '指定商品( 满' + e.coupon.minPoint + '减' + e.denomination +
									' 元券 )'
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定商品总价不满' + e.coupon.minPoint + '元，请重新选择！');
								this.couponData.useCoupon = 0;
							}

						} else if (e.coupon.useType == 3) {
							var params = {
								couponCode: e.couponCode,
								productCodes: this.arrProCode.join(',')
							}
							let res = await this.$axios(this.$baseUrl.getCouponCheckUse, JSON.stringify(params));
							if (res.data.code == 200) {
								if (this.total >= e.coupon.minPoint) {
									this.couponData.payable = '( 满' + e.coupon.minPoint + '减' + e.denomination +
										' 元券 )'
									this.total = this.total - e.denomination;
									this.total = Number(this.total.toFixed(2));
									this.couponData.couponAmount = e.denomination
									
									this.showCoupon = false;
								} else {
									this.$api.msg('商品总价不满' + e.coupon.minPoint + '元，请重新选择！');
									this.couponData.useCoupon = 0;
								}
							}
						}
					}
					//商品折扣券
					if (e.couponTypeCode == "YDZKQ") {
						if (e.coupon.useType == 0) {
							if (this.total >= e.coupon.minPoint) {
								this.couponData.payable = '全场商品( ' + (e.denomination / 10) + ' 折优惠券 )';
								this.total =this.goodsPrice * e.denomination / 100
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount =  this.goodsPrice - (this.goodsPrice * e.denomination / 100)
								this.couponData.couponAmount = Number(this.couponData.couponAmount.toFixed(2));
								this.showCoupon = false;
							} else {
								this.$api.msg('商品总价不符合折扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 1) {

							var selProTypeLists = [];
							var couponPrice = 0;
							var arrProductTypes = e.coupon.productTypes.split(',');
							selProTypeLists = fn.getArrEqual(this.arrProTypes, arrProductTypes);

							var subArr = [];
							for (var i in this.goodsList) {
								for (var j in selProTypeLists) {
									if (this.goodsList[i].productList.productType == selProTypeLists[j]) {
										subArr.push(i);
									}
								}
							}
							subArr = fn.unique(subArr);

							for (var i in subArr) {
								couponPrice += this.goodsList[subArr[i]].productList.price * this.goodsList[subArr[i]]
									.productNum;
							}
							couponPrice = Number(couponPrice.toFixed(2));
							if (couponPrice >= e.coupon.minPoint) {
								console.log("couponPrice：", e.coupon.minPoint)
								this.couponData.payable = '指定分类商品( ' + (e.denomination / 10) + ' 折优惠券 )';
								this.total = this.total - couponPrice * ((100 - e.denomination) / 100);
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = couponPrice * ((100 - e.denomination) / 100)
								this.couponData.couponAmount = Number(this.couponData.couponAmount.toFixed(2));
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定分类商品总价不符合折扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 2) {
							var couponPrice = 0;
							for (var i in this.goodsList) {
								if (this.goodsList[i].productList.productCode == e.coupon.productCode) {
									couponPrice += this.goodsList[i].productList.price * this.goodsList[i].productNum;
								}
							}
							couponPrice = Number(couponPrice.toFixed(2));

							if (couponPrice >= e.coupon.minPoint) {
								this.couponData.payable = '指定商品( ' + (e.denomination / 10) + ' 折优惠券 )';
								this.total = this.total - couponPrice * ((100 - e.denomination) / 100);
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = couponPrice * ((100 - e.denomination) / 100);
								this.couponData.couponAmount = Number(this.couponData.couponAmount.toFixed(2));
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定商品总价不符合折扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}

						} else if (e.coupon.useType == 3) {
							var params = {
								couponCode: e.couponCode,
								productCodes: this.arrProCode.join(',')
							}
							let res = await this.$axios(this.$baseUrl.getCouponCheckUse, JSON.stringify(params));
							if (res.data.code == 200) {
								if (this.total >= e.coupon.minPoint) {
									this.couponData.payable = '全场商品( ' + (e.denomination / 10) + ' 折优惠券 )';
									this.total = this.total * e.denomination / 100;
									this.total = Number(this.total.toFixed(2));
									this.couponData.couponAmount = this.goodsPrice - (this.goodsPrice * e.denomination / 100)
									this.couponData.couponAmount = Number(this.couponData.couponAmount.toFixed(2));
									this.securityData.couponPrice = couponPrice - e.denomination;
									this.showCoupon = false;
								} else {
									this.$api.msg('商品总价不符合折扣条件，请重新选择！');
									this.couponData.useCoupon = 0;
								}
							}
						}
					}
					//商品抵扣券
					if (e.couponTypeCode == "YDDKQ") {
						if (e.coupon.useType == 0) {
							if (this.total >= e.denomination && this.total >= e.coupon.minPoint) {
								this.couponData.payable = '( 抵扣' + e.denomination + ' 元券 )'
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('商品总价不符合抵扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 1) {

							var selProTypeLists = [];
							var couponPrice = 0;
							var arrProductTypes = e.coupon.productTypes.split(',');
							selProTypeLists = fn.getArrEqual(this.arrProTypes, arrProductTypes);

							var subArr = [];
							for (var i in this.goodsList) {
								for (var j in selProTypeLists) {
									if (this.goodsList[i].productList.productType == selProTypeLists[j]) {
										subArr.push(i);
									}
								}
							}
							subArr = fn.unique(subArr);

							for (var i in subArr) {
								couponPrice += this.goodsList[subArr[i]].productList.price * this.goodsList[subArr[i]]
									.productNum;
							}
							couponPrice = Number(couponPrice.toFixed(2));
							if (couponPrice >= e.denomination && couponPrice >= e.coupon.minPoint) {
								this.couponData.payable = '指定分类商品( 抵扣' + e.denomination + ' 元券 )'
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination;
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定分类商品总价不符合抵扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}
						} else if (e.coupon.useType == 2) {

							var couponPrice = 0;
							for (var i in this.goodsList) {
								if (this.goodsList[i].productList.productCode == e.coupon.productCode) {
									couponPrice += this.goodsList[i].productList.price * this.goodsList[i].productNum;
								}
							}
							couponPrice = Number(couponPrice.toFixed(2));
							if (couponPrice >= e.denomination && couponPrice >= e.coupon.minPoint) {
								this.couponData.payable = '指定商品( 抵扣' + e.denomination + ' 元券 )'
								this.total = this.total - e.denomination;
								this.total = Number(this.total.toFixed(2));
								this.couponData.couponAmount = e.denomination;
								this.securityData.couponAmount = couponPrice - e.denomination;
								this.securityData.couponPrice = couponPrice - e.denomination;
								this.showCoupon = false;
							} else {
								this.$api.msg('指定商品总价不符合抵扣条件，请重新选择！');
								this.couponData.useCoupon = 0;
							}

						} else if (e.coupon.useType == 3) {

							var params = {
								couponCode: e.couponCode,
								productCodes: this.arrProCode.join(',')
							}

							let res = await this.$axios(this.$baseUrl.getCouponCheckUse, JSON.stringify(params));
							if (res.data.code == 200) {
								if (this.total >= e.denomination && this.total >= e.coupon.minPoint) {
									this.couponData.payable = '( 抵扣' + e.denomination + ' 元券 )'
									this.total = this.total - e.denomination;
									this.total = Number(this.total.toFixed(2));
									this.couponData.couponAmount = e.denomination;
									this.showCoupon = false;
								} else {
									this.$api.msg('商品总价不符合抵扣条件，请重新选择！');
									this.couponData.useCoupon = 0;
								}
							}
						}

					}

				}

				//this.showCoupon = false;
			},
			//获取地址
			async getAddrData() {
				//uni.showNavigationBarLoading();
				var params = {
					pageNo: 1,
					pageSize: 1
				}
				let res = await this.$axios(this.$baseUrl.getContactsList, JSON.stringify(params));
				if (res.data.code == 200) {
					if (res.data.data.length) {
						this.addressData = res.data.data[0];
					}

				}
			},
			//计算总价
			calcTotal() {
				let list = this.goodsList;
				let total = 0;
				list.forEach(item => {
					total += item.productList.price * item.productNum;
				})

				this.total = Number(total.toFixed(2));
				this.goodsPrice = Number(total.toFixed(2));
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
			async submit() {
				//this.$api.msg('收货地址不能为空');
				if (!this.addressData.code) {
					this.$api.msg('收货地址不能为空');
					return;
				}
				let list = this.goodsList;
				let productList = [];
				list.forEach(item => {
					productList.push({
						attrValues: item.productList.attrValueVOList,
						cartId: item.productList.id ? item.productList.id : "",
						num: item.productNum,
						productCode: item.productList.productCode,
						productName: item.productList.productName
					})
				})
				if (this.subFlag) {
					//this.subFlag = false;
					var params = {
						"invoiceCode": this.facdureData.code,
						"invoiceType": 0,
						"isInvoice": (this.facdureData.code ? 1 : 0),
						"productList": productList,
						"shopContactsCode": this.addressData.code,
						"yf": 0,
						"remarks": this.remarks,
						"useCoupon": this.couponData.useCoupon,
						"couponAmount": this.couponData.couponAmount,
						"couponCode": this.couponData.couponCode,
						"useSecurityBalance": this.securityData.useBalance
					}
					console.log("参数详情：", params)
					let res = await this.$axios(this.$baseUrl.submitOrder, params);
					if (res.data.code == 200) {
						//this.subFlag = true;
						uni.removeStorage({
							key: 'tmpOrderData'
						})
						uni.redirectTo({
							url: '/pages/money/pay?data=' + JSON.stringify({
								orderData: res.data.data,
							})
						})
					}
				}
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
					font-weight: 600;
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
				font-weight: 600;
				color: $font-color-red;
			}

			&.blue {
				color: $font-color-blue;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 120upx;
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

	.c-list {
		position: relative;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 30upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			line-height: 46upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			// &.blue {
			// 	color: $font-color-blue;
			// }

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			font-weight: 600;
			color: $uni-color-primary;
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
			font-weight: 600;
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
			background-color: $base-color;
		}
	}

	.goBack {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 2;
		height: 90upx;
		line-height: 90upx;
		background: $font-color-blue;
		color: #fff;
		text-align: center;
		border-radius: 12upx;
	}

	.order-items {
		padding-bottom: 100upx;
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
			height: 120upx;
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
