<template>
	<view class="container">
		<view class="points_top">
			<text>总积分</text>
			<view class="num">{{scores.integration}}</view>
		</view>
		<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
			<empty v-if=" pointsList.length === 0" style="top: 60rpx;"></empty>
			<black v-for="(item,index) of pointsList" :key="index">
				<view class="points_list">
					<view class="points_item_top">
						<text>{{item.typeValue}}</text>
					</view>
					<view class="points_item_context">
						<view class="points_items">
							<view class="points_items_left">
								<!-- <view >{{item.name}}</view> -->
								<view class="title">兑换渠道：{{item.remarks}}</view>
								<view>下单时间：{{item.createDate}}</view>
							</view>
							<view class="points_items_right">{{item.type == 2?'-':'+'}} {{item.score}}</view>
						</view>

					</view>
				</view>
			</black>
		</scroll-view>

		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import {
		mapState
	} from 'vuex';
	import {
		fn
	} from '@/util/common.js';
	import share from '@/components/share';

	export default {
		components: {
			share,
			empty
		},
		data() {
			return {
				pointsList: [],
				tabCurrentIndex: 0,
				totalPage: 0,
				pageNo: 1,
				pageSize: 10,
				scores: null

			};
		},
		computed: {

		},
		async onLoad(options) {
			this.loadData()
			let score = await this.$axios(this.$baseUrl.score)
			this.scores = score.data.data
		},

		methods: {
			//获取订单列表
			loadData(source) {
				if (source === 'tabChange') {
					//tab切换只有第一次需要加载数据
					//return;
				}
				this.getData();
				setTimeout(() => {

				}, 600);
			},
			async getData() {
				this.res = {};
				var params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}

				let res = await this.$axios(this.$baseUrl.scoreGoodsRecord, JSON.stringify(params));
				console.log(res.data.data, 1111)

				for (var i in res.data.data) {
					res.data.data[i].flagSel = false;
				}
				this.res = res;
				if (this.pageNo == 1) {
					this.totalPage = this.res.data.pages;
				}

				this.pointsList = this.pointsList.concat(res.data.data)


				if (this.pageNo >= this.totalPage) {
					uni.stopPullDownRefresh();
					this.pageNo = this.totalPage + 1;

				} else {
					this.pageNo = this.pageNo + 1;
					this.getData(orderStatus, navItem);
				}
			}
		},


	}
</script>

<style lang='scss'>
	page {
		background: #F9F9F9;
	}

	.points_top {
		height: 222upx;
		text-align: center;
		padding: 60upx 0;
		background: linear-gradient(90deg, #349CFF, #65B4FF);
		color: #FFFFFF;
		z-index: 100;

		.num {
			width: 100%;
			text-align: center;
			font-size: 60upx;
			font-family: PingFang SC;
			font-weight: 600;
			text-shadow: 0px 4upx 27upx rgba(0, 0, 0, 0.27);
		}
	}

	.list-scroll-content {
		.empty-content {
			top: 140px !important;
		}
	}

	.points_list {
		width: 100%;
		background: #fff;
		margin-bottom: 20upx;

		.points_item_top {
			height: 80upx;
			padding: 0 30upx;
			border-bottom: solid 1px #F0F0F0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32upx;
			font-weight: 600;
			color: #333333;

			view {
				color: #666666;
				font-weight: 400;
			}
		}

		.points_items {
			display: flex;
			padding: 10upx;
			margin: 20upx 20upx;
			border-bottom: solid 2px #F0F0F0;

			.points_items_right {
				width: 15%;
				text-align: center;
			}

			.points_items_left {
				flex: 1;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;

				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
					color: #333333;
				}

				view {
					line-height: 50upx;
				}
			}
		}
	}
</style>
