<template>
	<view class="content">
		<!-- 空白页 -->
		<empty v-if="addressList.length === 0"></empty>
		<view class="list" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<!-- <text class="m-icon-addr"></text> -->
			<view class="wrapper">

				<view class="u-box">

					<text class="name">{{item.securityCode}}</text>
					<!-- <text class="blue">{{item.saleStatusValue}}</text> -->
					<text class="blue">{{item.saleStatusValue}}</text>
					<!-- <text class="mobile">{{item.mobile}}</text>
					<text v-if="item.isDefult" class="tag">默认</text> -->
				</view>
				<!-- <view class="address-box">

					<text class="address">{{item.address}} {{item.roomNum}}</text>
				</view> -->

			</view>
			<!-- <text class="m-icon-edit" @click.stop="addAddress('edit', item)"></text> -->
		</view>
		<!-- <view class="no-data">
			暂无数据
		</view> -->
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		<!-- <button class="add-btn blueGraShadow" @click="addAddress('add')">新增地址</button> -->
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import empty from "@/components/empty";
	import {
		fn
	} from '@/util/common.js';
	import {
		mapState
	} from 'vuex';
	var _self,
		page = 1,
		timer = null;

	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				orderData:'',
				page : 1,
				pageSize : 10,
				totalPage: 1,
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '--END--'
				},
				source: 0,
				orderSn : '',
				addressList: [],
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		async onLoad(option) {
			// console.log(option.source);
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：', returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }
			this.orderSn= option.orderSn ? option.orderSn : '';
			this.getData();
		},
		onPullDownRefresh () {
			//下拉刷新的时候请求一次数据
			this.getData();
		},
		onReachBottom () {
			//触底的时候请求数据，即为上拉加载更多
			// 正常应为:
			 this.getmorenews();
		},
		methods: {
			//获取地址
			async getData() {
				this.page = 1;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				var params = {
					pageNo: this.page,
					pageSize: this.pageSize,
					orderSn : this.orderSn
				}
				let res = await this.$axios(this.$baseUrl.getSecurityCodeList, JSON.stringify(params));
				if (res.data.code == 200) {
					this.totalPage = res.data.pages;
					this.page = this.page + 1;
					this.addressList = res.data.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新

				}


			},
			async getmorenews() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				var params = {
					pageNo: this.page,
					pageSize: this.pageSize
				}
				let res = await this.$axios(this.$baseUrl.getContactsList, JSON.stringify(params));
				if (res.data.code == 200) {
					//this.addressList = res.data.data;
					//console.log(JSON.stringify(res));
					this.totalPage = res.data.pages;
					if (this.page > this.totalPage) { //没有数据
						this.loadingType = 2;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					this.page = this.page + 1; //每触底一次 page +1
					this.addressList = this.addressList.concat(res.data.data); //将数据拼接在一起
					
					this.loadingType = 0; //将loadingType归0重置
					uni.hideNavigationBarLoading(); //关闭加载动画
				}

			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
				// if(this.orderData=="show"){
				// 	//this.$api.prePage().addressData = item;
				// 	uni.navigateTo({
				// 		url: `/pages/order/createOrder?addressData=${JSON.stringify(item)}`
				// 	})
				// }
			},
			addAddress(type, item) {
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}&orderData=${this.orderData}`
				})
			},
			//添加或修改成功之后回调
// 			refreshList(data, type) {
// 				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
// 				this.addressList.unshift(data);
// 
// 				console.log(data, type);
// 			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
		background: #f8f8f8;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 24upx;
		background: #fff;
		position: relative;
		margin-top: 30upx;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-box {
		display: flex;
		align-items: center;

		.address {
			font-size: 30upx;
			color: $font-color-light;
		}
	}

	.u-box {
		font-size: 30upx;
		color: $font-color-dark;
		margin: 18upx 0;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name {
			margin-right: 30upx;
		}
		.blue {
			color:$font-color-light;
		}

		.tag {
			font-size: 20upx;
			color: #fff;
			margin-left: 20upx;
			background: $base-color;

			border-radius: 40upx;
			padding: 4upx 20upx;
			line-height: 1;
		}
	}

	.m-icon-edit {
		display: flex;
		align-items: center;
		width: 36upx;
		height: 36upx;
		background: url(../../static/icon/edit.png) no-repeat;
		background-size: contain;
		margin-left: 30upx;
	}

	.m-icon-addr {
		width: 46upx;
		height: 46upx;
		background: url(../../static/icon/address.png) no-repeat;
		background-size: contain;
		margin: 0 20upx 0 0;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		/* box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);	 */
	}
</style>
