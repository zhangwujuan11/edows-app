<template>
	<view class="container">
		<wm-watermark text="易道大咖"></wm-watermark>
		<view class="carousel">
			<!-- <swiper indicator-dots circular=true duration="400" @change="swiperChange" > -->
			<swiper @change="swiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :id="index" @tap="preview" :src="item ? item : `/static/404.jpg`" class="loaded"
							mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<swiper-dot class="dot" :current="current" :list="imgList"></swiper-dot>
		</view>

		<view class="introduce-section">

			<view class="subTit" v-if="productInfo.title">
				<text style="color: #000000;font-size: 36upx;">{{productInfo.title}}</text>
			</view>

			<view class="price-box">
				<view>
					<text class="price">{{productInfo.scoreNumber}}</text>
					<text class="price-tip">积分</text>
				</view>
				<text
					style="padding-left: 35upx;color: #999999;text-decoration: line-through;">市场价{{productInfo.salePrice}}</text>
			</view>
			<view class="bot-row">
				<text>已兑换: {{productInfo.saleNumber}}</text>
				<button class="m-icon-share" open-type='share'></button>
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleService">
				<text class="tit">服务说明</text>
				<view class="bz-list con">
					<text v-for="(item,index) in serviceList" :key="index">· {{item.title}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</view>

		<view class="attr-cells" :class="isFixed ? `attr-cells-fixed` : ``" id="attr-cells">
			<view class="attr-cell" :class="currentIndex == index ? `on` : ``" v-for="(item,index) in productNavs"
				:key="index" @click="cngProNav(index)">{{item}}</view>
		</view>
		<view class="detail-desc" v-if="currentIndex==0">
			<rich-text :nodes="desc | formatRichText"></rich-text>
		</view>

		<view class="evalu-cont" v-if="currentIndex==1">
			<view class="item-evalu" v-if="productComments.length" v-for="(item,index) in productComments" :key='index'>
				<view class="user-info-box">
					<view class="user-profile">
						<image :src="item.showImg ? item.showImg : `/static/missing-face.png`"></image>
					</view>
					<view class="user-nickName">
						<text>{{item.userName}}</text>
					</view>
					<view class="user-stars">
						<view class="star" v-for="(subItem,subIndex) in userStar" :key="subIndex">
							<image :src="subIndex < item.score ? `/static/starOn.png` : `/static/star.png`"></image>
						</view>

					</view>
					<view class="publishData">
						<text>{{item.createDate}}</text>
					</view>
				</view>
				<view class="evalu-conts">
					{{item.content ? item.content : `该用户暂无评论信息`}}
				</view>
				<view class="evalu-product">
					{{item.attrValueVOList}}
				</view>
			</view>

			<view v-if="!productComments.length" class="no-data">
				暂无评价信息
			</view>

		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom" :class="isIphoneX ? `isIPX` : ``" v-if="productInfo.giftFlag!=1">
			<view class="p-b-btn" hover-class="cell-hover" :hover-stay-time="50">
				<text class="m-icon-cell m-icon-cell-help"></text>
				<button class="cell-tit" open-type='contact'>客服</button>
			</view>
			<view class="p-b-btn" @click="toCart">
				<text class="yticon icon-tel"></text>
				<button>电话</button>
			</view>

			<view class="action-btn-group blueGraShadow">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec('buy')">
					积分购买
				</button>
			</view>
		</view>


		<!-- 服务说明模态层弹窗 -->
		<view class="popup spec" :class="seviceClass" @touchmove.stop.prevent="stopPrevent" @click="toggleService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer service-content" @click.stop="stopPrevent">
				<view class="inner-service-content">
					<view class="service-title">
						<text>服务说明</text>
					</view>
					<view class="item-service" v-for="(item,index) in serviceList" :key="index">
						<view class="item-service-tit">· {{item.title}}</view>
						<text>{{item.context ? item.context : `暂无说明` }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		fn
	} from '@/util/common.js';
	import share from '@/components/share';
	import swiperDot from "@/components/swiperDot.vue"
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			share,
			swiperDot,
			uniNumberBox
		},
		data() {
			return {
				max: 99999,
				isIphoneX: false,
				productNum: 1,
				productCode: '',
				isFixed: false,
				productInfo: {},
				oldProductInfo: {},
				specClass: 'none',
				seviceClass: 'none',
				specSelected: [],
				current: 0,
				favorite: true,
				shareList: [],
				imgList: [], //商品轮播图
				serviceList: [], //服务说明 
				desc: "",
				productComments: [],
				productNavs: ['商品详情', '商品评价'],
				currentIndex: 0,
				userStar: [1, 2, 3, 4, 5],


			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		async onLoad(options) {
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			if (options.scene != undefined) {
				const scene = decodeURIComponent(options.scene)
				let str = scene.lastIndexOf("\=")
				this.productCode = scene.substring(str + 1, scene.length)
			} else {
				this.productCode = options.code;
			}
			this.isIphoneX = getApp().globalData.isIphoneX;

			this.getData();
			this.getProductComments();

		},
		onShareAppMessage(res) {
			return {
				title: this.productInfo.name,
				path: '/pages/accumulate/product?code=' + this.productCode
			}
		},
		methods: {

			//请求数据 
			async getData() {
				var params = {
					goodsCode: this.productCode
				}
				let res = await this.$axios(this.$baseUrl.scoreGoodsDetail, params);
				this.productInfo = res.data.data;
				this.desc = res.data.data.detailDesc;
				this.imgList = res.data.data.subImgList;
				this.serviceList = res.data.data.serviceList;
			},
			//请求评论数据 
			async getProductComments() {
				var params = {
					pageNo: 1,
					pageSize: 999,
					productCode: this.productCode
				}
				let res = await this.$axios(this.$baseUrl.getProductComments, params);
				this.productComments = res.data.data;
				for (var i in this.productComments) {
					this.productComments[i].createDate = fn.formatTime(this.productComments[i].createDate, 'Y-M-D')
				}
			},
			//商品评价与详情切换
			cngProNav(index) {
				this.currentIndex = index;
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				this.current = e.detail.current;
			},
			preview(res) {
				let myindex = res.currentTarget.id;
				console.log(myindex)
				uni.previewImage({
					urls: this.imgList,
					current: myindex
				})
			},

			//跳转到购物车
			toCart() {
				uni.makePhoneCall({
					phoneNumber: '400-988-6868' //仅为示例
				});
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

			//规格弹窗开关
			toggleSpec(type) {
				console.log(type)
				let goodsData = [];

				goodsData.push({
					productName: this.productInfo.title,
					price: this.productInfo.salePrice,
					scoreNumber: this.productInfo.scoreNumber,
					productCode: this.productInfo.code,
					imgPath: this.productInfo.masterImg,
					productNum: this.productNum
				})
				uni.setStorage({ //缓存临时订单
					key: 'scoreOrderData',
					data: goodsData
				})
				uni.navigateTo({
					url: `/pages/accumulate/createOrder`
				})
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
			},
			buy() {
				uni.navigateTo({
					url: `/pages/accumulate/createOrder`
				})
			},
			stopPrevent() {}
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) { //控制小程序中图片大小
				if (html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
							'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;display:flex; flex-direction: column; margin:0 auto ;"'
					);
					return newContent;
				}

			}
		},
		onPageScroll(res) {
			if (res.scrollTop > 460) {
				this.isFixed = true
			} else {
				this.isFixed = false
			}
		}

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;
		margin-top: 40upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			/* height: 60upx; */
			line-height: 60upx;

			.selected-text {
				padding-left: 20upx;
			}
		}


		.subTit {
			font-size: 28upx;
			color: #999;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-weight: 600;
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}


	.c-list {
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

			&.blue {
				color: $font-color-blue;
			}

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
			color: $uni-color-primary;
		}
	}

	/* 分享 */
	.m-icon-share {
		width: 64upx;
		height: 64upx;
		background: url(../../static/share.png) no-repeat;
		background-size: contain;

		&:after {
			border: none
		}
	}

	/* 评价内容 */
	.evalu-cont {
		padding: 0 20upx
	}

	.item-evalu {
		background: #fff;
		padding: 20upx 0 40upx;
		font-size: $font-base;
		border-bottom: 1upx dashed #ccc;

		.user-info-box {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;

			.user-profile {
				width: 64upx;
				height: 64upx;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-right: 12upx;

				image {
					width: 64upx;
					height: 64upx;
				}
			}

			.user-stars {

				display: flex;
				margin-left: 12upx;
				align-items: center;

				.star {
					width: 40upx;
					height: 40upx;

					image {
						width: 40upx;
						height: 40upx;
					}
				}
			}

			.publishData {
				margin-left: auto;
				width: 230upx;
				text-align: right;
				color: #999;
			}
		}

		.evalu-conts {
			line-height: 48upx;
		}

		.evalu-product {
			line-height: 48upx;
			color: #999;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	.attr-cells {
		width: 100%;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1px solid #eaeaea;

		&.attr-cells-fixed {
			position: fixed;
			z-index: 99;
			left: 0;
			top: 0;

		}

		/* padding-bottom: 2upx ; */
		.attr-cell {
			font-size: $font-base + 6upx;

			&.on {
				color: $font-color-blue;
				/* border-bottom: 4upx solid $font-color-blue; */
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		padding: 40upx 20upx;
		font-size: $font-base;
		line-height: 60upx;
		text-align: justify;

		/* margin-top: 16upx; */
		rich-text {}

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 服务说明 */
	.service-content {
		position: relative;

		.inner-service-content {
			padding: 20upx;
			font-size: $font-base;

			.service-title {
				font-size: $font-base + 2upx;
				height: 80upx;
				line-height: 60upx;
				border-bottom: 2upx solid #eee
			}

			.item-service {
				margin: 20upx 0;
				line-height: 60upx;

				text {
					color: #999;
					font-size: $font-sm;
				}
			}
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

	.step {
		bottom: -6upx
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: #fff;
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .2);

		/* border-radius: 16upx; */
		&.isIPX {
			height: 160upx;
			padding-top: 6upx;
			padding-bottom: 60upx;
		}

		.p-b-btn {
			display: flex;
			position: relative;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			.showNo {
				position: absolute;
				color: $font-color-red;
				font-size: $font-sm - 2upx;
				right: 0upx;
				top: -6upx;
				background: $font-color-red;
				color: #fff;
				width: 34upx;
				height: 34upx;
				text-align: center;
				border-radius: 34upx;
				line-height: 34upx;
			}

			/* height: 80upx; */
			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.m-icon-cell-help {
				width: 40upx;
				height: 40upx;
				background: url(../../static/icon/custome.png) no-repeat;
				background-size: contain;
				margin-top: 12upx;
			}

			.icon-tel {
				width: 40upx;
				height: 40upx;
				background: url(../../static/phone.jpg) no-repeat;
				background-size: contain;
				margin-top: 12upx;
			}

			button {
				background: none;
				text-align: left;
				padding: 0;
				margin: 0;
				color: $font-color-light;
				height: 48upx;
				line-height: 48upx;
				font-size: $font-sm;
			}

			button:after {
				border: none;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			width: 70%;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			/* box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #359cff,#65b4ff); */
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
