<template>
	<view class="content">
			<view>
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty  v-if="listdata.length === 0 ">
					</empty>
				
					<!-- 流水列表 -->
					<view v-for="(item,index) in listdata" :key="index" class="list">
						<view class="wrapper">
							<view class="u-box">
								<view>门店：{{item.shopName}}</view>
								<view>单号：{{item.orderSn? item.orderSn:'-'}}</view>
								<view>业务类型：{{item.bizType == 1? '入账':'出账'}}</view> 
								<view>余额：{{item.balance}}</view> 
								<view>创建时间：{{item.createDate}}</view>
							</view>
							<view class="address-box">
								<text class="address">备注：{{item.remarks}}</text>
							</view>
						
						</view>
					</view>
				</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		fn
	} from '@/util/common.js';
	import empty from "@/components/empty";
	export default {
		components: {
			empty
		},
		data() {
			return {
				listdata:[],
				pageNo:1,
				pageSize:4,
				totalPage:0,
				id:null
			}
		},
		async onLoad(option) {
			this.id=option.id
			this.$nextTick(()=>{
				this.getData();
			})
			
		},
		onPullDownRefresh () {
			//下拉刷新的时候请求一次数据
			this.getData();
		},
		onReachBottom() { //触底事件
			if (this.pageNo * this.pageSize >= this.totalPage) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none',
					duration: 1000
				});
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			} else {
				if (this.pageNo <= this.pageNo - 1) {
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.pageNo++
					this.getData();
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
			// this.pageNo++
			// this.getData();
		},
		methods: {
			async getData(){
				this.page = 1;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				var params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					accountType:this.id
				}
				let res = await this.$axios(this.$baseUrl.getshopAccount, params)
				if (res.data.code == 200) {
					this.totalPage = res.data.count;
					this.listdata = [...this.listdata,...res.data.data]
					// for(let i=0;i<this.listdata.length;i++){
					// 	this.listdata[i].createDate = fn.formatTime(this.listdata[i].createDate ,'Y-M-D')
					// }
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.u-box {
		font-size: 26upx;
		color: $font-color-dark;
		margin: 18upx 0;
		line-height:38upx;
	
	}
	.list {
		display: flex;
		align-items: center;
		padding: 24upx;
		background: #fff;
		position: relative;
		margin-top: 30upx;
	}
	.address-box {
		display: flex;
		align-items: center;
	
		.address {
			font-size: 30upx;
			color: $font-color-light;
		}
	}
	
	
	

	
</style>