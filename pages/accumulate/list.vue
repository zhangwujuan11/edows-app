<template>
	<view class="content">
		<wm-watermark text="易道大咖"></wm-watermark>
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				人气
				<view class="p-box">
					<text :class="{active: popularityOrder === 'asc' && filterIndex === 1}" class="yticon icon-shang"></text>
					<text :class="{active: popularityOrder === 'desc'  && filterIndex === 1}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">

				<text>销量</text>
				<view class="p-box">
					<text :class="{active: saleOrder === 'asc' && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: saleOrder === 'desc' && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 'asc' && filterIndex === 3}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 'desc' && filterIndex === 3}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<!-- <text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text> -->
		</view>
		<view class="guess-section">
			<empty v-if="goodsList.length === 0"></empty>
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.masterImg"></image>
				</view>
				<text class="title clamp2">{{item.name}}</text>
				<view class="price-box">
					<text class="price">{{item.minPrice}}</text>
					<text>已售 {{item.gmrs}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>

	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				classId: "",
				kw: "",
				"specialClassId":"",
				"brandCode" :"",
				"parentClassId":"",
				pageSize: 10,
				popularityOrder: '',
				priceOrder: '',
				saleOrder: '',
				searchModel: 101,
				page: 0,
				totalPage: 0,
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				//priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: []
			};
		},

		onLoad(options) {
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif
			this.classId = options.classId ? options.classId : "";
			this.specialClassId = options.specialClassId ? options.specialClassId : "";
			this.brandCode = options.brandCode ? options.brandCode : "";
			this.parentClassId = options.parentClassId ? options.parentClassId : "";
			//this.loadCateList(options.fid, options.sid);
			this.page = 1;
			this.loadData();
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {

			//加载分类
			async loadCateList(fid, sid) {
				let list = await this.$api.json('cateList');
				let cateList = list.filter(item => item.pid == fid);

				cateList.forEach(item => {
					let tempList = list.filter(val => val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more';

				}
				var params = {
					"classId": this.classId,
					"specialClassId" : this.specialClassId,
					"parentClassId": this.parentClassId,
					"brandCode" : this.brandCode,
					"kw": this.kw,
					"pageNo": this.page,
					"pageSize": this.pageSize,
					"popularityOrder": this.popularityOrder,
					"priceOrder": this.priceOrder,
					"saleOrder": this.saleOrder,
					"searchModel": this.searchModel
				}
				//let list = await this.$api.json('cateList');
				let res = await this.$axios(this.$baseUrl.searchProduct, params);
				if (this.page == 1) {
					this.totalPage = res.data.data.pages;
				}

				let goodsList = res.data.data.data;
				console.log('商品列表：',goodsList)
				if (type === 'refresh') {
					this.goodsList = [];
				}
				//筛选，测试数据直接前端筛选了
				// if (this.filterIndex === 1) {
				// 	goodsList.sort((a, b) => b.sales - a.sales)
				// }
				// if (this.filterIndex === 3) {
				// 	goodsList.sort((a, b) => {
				// 		if (this.priceOrder == 1) {
				// 			return a.price - b.price;
				// 		}
				// 		return b.price - a.price;
				// 	})
				// }

				this.goodsList = this.goodsList.concat(goodsList);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				//this.loadingType = this.goodsList.length > 20 ? 'nomore' : 'more';
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if (this.page >= this.totalPage) {
					uni.stopPullDownRefresh();
					this.page = this.totalPage + 1;
					this.loadingType = 'noMore';
				
				} else {
					this.page = this.page + 1;
					console.log(this.page)
					this.loadData();
					this.loadingType = 'more';
				}
				
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading()
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},
			//筛选点击
			tabClick(index) {
				this.page =1;
				// if (this.filterIndex === index && index !== 2) {
				// 	return;
				// }
				this.filterIndex = index;
				if (index === 1) {
					this.popularityOrder = this.popularityOrder === "asc" ? "desc" : "asc";
				} else {
					this.popularityOrder = "";
				}
				if (index === 2) {
					this.saleOrder = this.saleOrder === "asc" ? "desc" : "asc";
				} else {
					this.saleOrder = "";
				}
				if (index === 3) {
					this.priceOrder = this.priceOrder === "asc" ? "desc" : "asc";
				} else {
					this.priceOrder = "";
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item) {
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let code = item.code;
				uni.navigateTo({
					url: `/pages/accumulate/product?code=${code}`
				})
			},
			stopPrevent() {}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: #f8f8f8;
	}

	.content {
		padding-top: 140upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		justify-content: space-around;
		width: 100%;

		padding: 20upx 0;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			// flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 70upx;
			width: 150upx;
			font-size: 30upx;
			background: #f8f8f8;
			color: $font-color-dark;
			position: relative;
			border-radius: 10upx;

			&.current {
				color: $base-color;
				border: 2upx solid $base-color;
				background: #fff;
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #f8f8f8;
	
		.guess-item {
			display: flex;
			flex-direction: column;
			width: 330upx;
			padding: 20upx;
			margin-bottom: 30upx;
			background:#fff;
	
			&:nth-child(2n+1) {
				margin-right: 30upx;
			}
		}
	
		.image-wrapper {
			width: 290upx;
			height: 290upx;
			border-radius: 3px;
			overflow: hidden;
			background:#fff;
			image {
				width: 290upx;
				height: 290upx;
				opacity: 1;
			}
		}
	
		.title {
			padding:14upx 0 0 0;
			font-size: $font-base - 2upx;
			color: $font-color-dark;
			line-height: 38upx;
			height: 94upx;
		}
	
		.price-box {
			padding: 14uxp 10upx 0 10upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			font-size: 24upx;
			color: $font-color-light;
		}
		
		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		
			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding: 10upx 0;

			margin-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {

			width: 330upx;
			height: 330upx;
			padding: 0;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 330upx;
				height: 330upx;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 60upx;
			padding: 0 10upx;
		}

		
	}
</style>
