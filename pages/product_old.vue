<template>
	<view class="container">
		<view class="carousel">
			<!-- <swiper indicator-dots circular=true duration="400" @change="swiperChange" > -->
			<swiper @change="swiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item ? item : `/static/404.jpg`" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<swiper-dot class="dot" :current="current" :list="imgList"></swiper-dot>
		</view>

		<view class="introduce-section">
			<text class="title">{{productInfo.name}}</text>
			<view class="subTit" v-if="productInfo.subName">
				<text>{{productInfo.subName}}</text>
			</view>

			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productInfo.price}}</text>
				<!-- <text class="m-price">¥488</text>
				<text class="coupon-tip">7折</text> -->
				<!-- <button class="yticon icon-share" open-type='share'>分享</button> -->
			</view>
			<view class="bot-row">
				<text>销量: {{productInfo.sellSum}}</text>
				<!-- <text>库存: 4690</text> -->
				<text>浏览量: {{productInfo.browseSum}}</text>
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
			<view class="c-row b-b" @click="toggleSpec('default')">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in defualtAttrList" :key="sIndex">
						{{sItem.attrValue}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>


		</view>

		<view class="attr-cells" :class="isFixed ? `attr-cells-fixed` : ``" id="attr-cells">
			<view class="attr-cell" :class="currentIndex == index ? `on` : ``" v-for="(item,index) in productNavs" :key="index"
			 @click="cngProNav(index)">{{item}}</view>
			<!-- <view class="attr-cell on">商品详情</view>
			<view class="attr-cell">商品评价</view> -->
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
		<view class="page-bottom">
			<!-- <view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="m-icon-cell m-icon-cell-help"></text>
				<button class="cell-tit" open-type='contact'>服务</button>
			</view> -->
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<!-- <view class="p-b-btn">
				<button class="cell-tit yticon icon-share" open-type='share'></button>
				<text>分享</text>
			</view> -->
			<view class="p-b-btn" @click="toCart">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
				<text class="showNo" v-if="productInfo.cartSum">{{productInfo.cartSum}}</text>
			</view>
			<!-- <view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view> -->

			<view class="action-btn-group blueGraShadow">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec('buy')">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="toggleSpec('cart')">加入购物车</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec('default')">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="inner-layer">
					<view class="a-t">
						<image :src="productInfo.masterImg ? productInfo.masterImg : `/static/404.jpg`"></image>
						<view class="right">
							<text class="price">¥{{productInfo.price}}</text>
							<!-- <text class="stock">库存：188件</text> -->
							<view class="selected">
								已选：
								<text class="selected-text" v-for="(sItem, sIndex) in defualtAttrList" :key="sIndex">
									{{sItem.attrValue}}
								</text>
							</view>
						</view>
					</view>
					<scroll-view scroll-y class="content-aside">
						<view v-for="(item,index) in attrList" :key="index" class="attr-list">
							<text>{{item.name}}</text>
							<view class="item-list">
								<text v-for="(subItem, subIndex) in item.valueList" v-if="subItem.pCode === item.code" :key="subIndex" class="tit"
								 :class="{selected: subItem.selected, disabled : subItem.isShow == 0}" @click="selectSpec(index, subIndex, subItem.pCode)">
									{{subItem.name}}
								</text>
							</view>
						</view>
						<view class="attr-number">
							<text>数量</text>
							<view>
								<uni-number-box class="step" :min="1" :max=max :value="productNum" v-model="productNum" :isMax="productNum > max ? true : false" :isMin="true"
								 :index="0" @eventChange="numberChange"></uni-number-box>
							</view>
						</view>
					</scroll-view>
					
				</view>
				<button class="btn" @click="toggleSpecSur">完成</button>
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
					<!-- <view class="item-service">
						<view class="item-service-tit">· 无忧退货</view>
						<text>7天无理由退货</text>
					</view> -->
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
				max:99999,
				optionType: '',
				productNum: 1,
				productCode: '',
				isFixed: false,
				productInfo: {},
				oldProductInfo: {},
				specClass: 'none',
				seviceClass: 'none',
				specSelected: [],
				defualtAttrList: [], //默认选中
				current: 0,
				favorite: true,
				shareList: [],
				imgList: [], //商品轮播图
				serviceList: [], //服务说明 
				desc: "",
				attrList: [], //规格列表
				productComments: [],
				productNavs: ['商品详情', '商品评价'],
				currentIndex: 0,
				userStar: [1, 2, 3, 4, 5]

			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		async onLoad(options) {
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.productCode = options.code;
			console.log(this.productCode)
			//this.$api.msg(this.productCode);
			this.getData();
			this.getProductComments();

// 			const query = wx.createSelectorQuery()
// 			query.select('#attr-cells').boundingClientRect()
// 			query.selectViewport().scrollOffset()
// 			query.exec(function(res) {
// 				res[0].top // #the-id节点的上边界坐标
// 				res[1].scrollTop // 显示区域的竖直滚动位置
// 
// 				console.log('打印高度', res[0].top);
// 				console.log('打印demo的元素的信息', res);
// 			})
		},
		onShareAppMessage(res) {
			return {
				title: this.productInfo.name,
				path: '/pages/product/product?code=' + this.productCode
			}
		},
		methods: {
			//请求数据 
			async getData() {
				var params = {
					attrValueDtos: this.defualtAttrList,
					productCode: this.productCode
				}
				let res = await this.$axios(this.$baseUrl.getProductByCode, params);
				this.productInfo = res.data.data;
				this.desc = res.data.data.detail;
				//this.desc = fn.replaceStr(res.data.data.detail);
				this.imgList = res.data.data.subImgList;
				this.serviceList = res.data.data.serviceList;
				this.attrList = res.data.data.attrList;
				//规格 默认选中第一条开始
				this.defualtAttrList = res.data.data.defualtAttrList;
				for (var i in this.attrList) {
					if (this.attrList[i].code == this.defualtAttrList[i].attrCode) {
						for (var j in this.attrList[i].valueList) {
							if (this.attrList[i].valueList[j].name == this.defualtAttrList[i].attrValue) {
								this.$set(this.attrList[i].valueList[j], 'selected', true);
							}
						}
					}
				}
				//规格 默认选中第一条结束

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
				// this.swiperCurrent = index;
				// this.titleNViewBackground = this.carouselList[index].background;
			},

			//跳转到购物车
			toCart() {
				uni.switchTab({
					url: '/pages/cart/cart',
					success: function(e) {
						var page = getCurrentPages().pop();
						if (page == undefined || page == null) return;
						page.onLoad();
					}
				});
			},
			//数量
			numberChange(data) {
				this.productNum = data.number;
				if(this.productNum > this.max) {
					this.productNum = this.max
				}
				console.log('数量：',this.productNum)
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
				this.optionType = type;
				console.log(type)
				this.defualtAttrList=[];
				this.getData();
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					//不记录状态					
					let sum = 0;
					let len = this.defualtAttrList.length;
					for (var i in this.defualtAttrList) {
						if (this.defualtAttrList[i].attrValue != " ") {
							sum += 1
						}
					}
					console.log(sum, ':', len)
					//if (sum != len) {
						// this.productInfo = this.oldProductInfo;
						// this.imgList = this.oldProductInfo.subImgList;
						// this.serviceList = this.oldProductInfo.serviceList;
						// this.defualtAttrList = this.oldProductInfo.defualtAttrList;
						// this.attrList = this.oldProductInfo.attrList;
						//规格 默认选中第一条
// 						for (var i in this.attrList) {
// 							if (this.attrList[i].code == this.defualtAttrList[i].attrCode) {
// 								for (var j in this.attrList[i].valueList) {
// 									if (this.attrList[i].valueList[j].name == this.defualtAttrList[i].attrValue) {
// 
// 										this.$set(this.attrList[i].valueList[j], 'selected', true);
// 									}
// 								}
// 							}
// 						}
						//不记录状态 
						//this.defualtAttrList=[];
						//this.getData();
					//}


					setTimeout(() => {
						this.specClass = 'none';
					}, 250);

				} else if (this.specClass === 'none') {
					this.defualtAttrList=[];
					this.specClass = 'show';
				}
			},
			//确定 
			async toggleSpecSur() {
				//let sum = 0;
				//let len = this.productInfo.defualtAttrList.length;

				for (var i = 0; i < this.defualtAttrList.length; i++) {
					if (this.defualtAttrList[i].attrValue == " ") {
						this.$api.msg('请选择' + this.attrList[i].name);
						return false;
					}
				}

				//加入购物车
				if (this.optionType == 'cart') {
					var params = {
						attrValues: this.defualtAttrList,
						num: this.productNum,
						productCode: this.productCode
					}
					let res = await this.$axios(this.$baseUrl.addShoppingCart, JSON.stringify(params));
					if (res.data.code == 200) {
						this.$api.msg('加入购物车成功！');
						
					}

				}
				//立即购买
				if (this.optionType == 'buy') {
					let goodsData = [];
					let useInfo = {
						productName: this.productInfo.name,
						price: this.productInfo.price,
						productCode: this.productInfo.productCode,
						imgPath: this.productInfo.masterImg,
						attrValueVOList: this.productInfo.defualtAttrList
					}
					goodsData.push({
						productList: useInfo,
						productNum: this.productNum
					})
					console.log(goodsData);
					uni.setStorage({ //缓存临时订单
						key: 'tmpOrderData',
						data: goodsData
					})
					uni.navigateTo({
						url: `/pages/order/createOrder`
						// url: `/pages/order/createOrder?data=${JSON.stringify({
						// 	goodsData: goodsData
						// })}`
					})

				}
				//this.specClass = 'hide';
				//this.specClass = 'none';
				setTimeout(() => {
					this.specClass = 'none';
					// this.defualtAttrList=[];
					// this.getData();
				}, 250);
			},
			//选择规格
			selectSpec(index, subIndex, pid) {
				console.log(index, subIndex)
				let list = this.attrList;
				let sum = 0;
				let len = this.productInfo.defualtAttrList.length;
				for (var i in this.productInfo.defualtAttrList) {
					if (this.productInfo.defualtAttrList[i].attrValue != " ") {
						sum += 1
					}
				}
				console.log(sum, ':', len)
				if (sum == len) {
					this.oldProductInfo = this.productInfo;
				}

				//可以取消当前项
				let flagSelected = list[index].valueList[subIndex].selected || false;
				if (list[index].valueList[subIndex].isShow) {

					for (var i in list[index].valueList) {

						if (list[index].valueList[i].pCode == pid) {
							this.$set(list[index].valueList[i], 'selected', false);
						}
					}
					console.log(flagSelected)
					if (flagSelected) {
						this.$set(list[index].valueList[subIndex], 'selected', false);
					} else {
						this.$set(list[index].valueList[subIndex], 'selected', true);
					}

					//this.$set(list[index].valueList[subIndex], 'selected', true);



					//存储已选择
					/**
					 * 修复选择规格存储错误
					 * 将这几行代码替换即可
					 * 选择的规格存放在defualtAttrList中
					 */
					this.defualtAttrList = [];

					list.forEach(item => {

						for (var i in item.valueList) {
							var obj = {};
							if (item.valueList[i].selected === true) {
								obj.attrCode = item.valueList[i].pCode;
								obj.attrValue = item.valueList[i].name;
								this.defualtAttrList.push(obj);
							}
						}
					})
					console.log(this.defualtAttrList)
					// for (var i = 0; i < this.defualtAttrList.length; i++) {
					// 	if (this.defualtAttrList[i].attrValue != " ") {
					// 		this.getData();
					// 	}
					// }
					this.getData();
					
				}

				//可以取消当前项结束	
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
					url: `/pages/order/createOrder`
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
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
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
			height: 60upx;
			line-height: 60upx;
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

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
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
				width:230upx;
				text-align:right;
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
		padding: 20upx;
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

	/* 规格选择弹窗 */
	.attr-content {
		position: relative;
		padding: 30upx 0;

		.inner-layer {
			padding: 0 30upx;
			margin-bottom: 100upx;
		}

		.content-aside {
			height: 600upx;
		}

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -60upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
					line-height: 50upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.attr-number {
			position: relative;
			padding: 20px 0;
			font-size: $font-base + 2upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.item-list {
			padding: 40upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #e8e8e8;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 10upx;
				min-width: 60upx;
				line-height: 60upx;
				/* height: 60upx; */
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				border: 1px solid $font-color-blue;
				background: #fff;
				color: $font-color-blue;
			}

			.disabled {
				background: #f8f8f8;
				color: #e1e1e1;
				border: 1px solid #f8f8f8;
			}
		}

		.btn {
			position: absolute;
			bottom: 0;
			left: 0;
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
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		/* border-radius: 16upx; */

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
