<template>
	<view class="content">
		<view class="list" v-for="(item, index) in factureList" :key="index" @click="checkAddress(item)">
			<text class="m-icon-addr"></text>
			<view class="wrapper">
				
				<view class="u-box">
					
					<text class="name">{{item.payable}}</text>
					
					<text v-if="item.isDefult" class="tag">默认</text>
				</view>
				<view class="address-box">

					<text class="address">{{item.nsrsbh}}</text>
				</view>
				
			</view>
			<text class="m-icon-edit" @click.stop="addAddress('edit', item)"></text>
		</view>
		
		<button class="add-btn blueGraShadow" @click="addAddress('add')">新增发票信息</button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				source: 0,
				factureList: []
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		async onLoad(option){
			console.log(option.source);
			this.source = option.source ? option.source : 0;
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：',returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }
			this.getData();
		},
		methods: {
			//获取地址
			async getData() {
				var params = {
					pageNo: 1,
					pageSize: 999
				}
				let res = await this.$axios(this.$baseUrl.getInvoiceList, JSON.stringify(params));
				if (res.data.code == 200) {
					this.factureList = res.data.data;
			
				}
			
			
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().facdureData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				console.log(type)
				if(type == 'add') {
					uni.navigateTo({
						url: `/pages/facture/factureManage?type=${type}&source=${this.source}`
					})
				}else {
					uni.navigateTo({
						url: `/pages/facture/factureManage?type=${type}&source=${this.source}&invoiceId=${item.id}`
					})
				}
				
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
		background: #f8f8f8;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 24upx ;
		background: #fff;
		position: relative;
		margin-top:30upx;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		
		.address{
			font-size: 30upx;
			color: $font-color-light;
		}
	}
	.u-box{
		font-size: 30upx;
		color: $font-color-dark;
		margin: 18upx 0;
		.name{
			margin-right: 30upx;
		}
		.tag{
			font-size: 20upx;
			color: #fff;
			margin-left: 20upx;
			background: $base-color;
			
			border-radius: 40upx;
			padding: 4upx 20upx;
			line-height: 1;
		}
	}
	.m-icon-edit{
		display: flex;
		align-items: center;
		width: 36upx;
		height: 36upx;
		background: url(../../static/icon/edit.png) no-repeat;
		background-size:contain;
		margin-left: 30upx;
	}
	.m-icon-addr{
		width: 46upx;
		height: 46upx;
		background: url(../../static/icon/facture.png) no-repeat;
		background-size:contain;
		margin: 0 20upx 0 0;
	}
	
	.add-btn{
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
