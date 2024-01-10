<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" >
			<view>
				<text class="s-item">{{sTitle}}</text>
				<view class="t-list">
					<view @click="navToList(item)"  class="t-item" v-for="item in slist" :key="item.id">
						<image :src="item.logo ? item.logo : `/static/errorImage.jpg`"></image>
						<text class="clamp">{{item.name}}</text>
					</view>
					<!-- <view class="no-data" v-show="!slist.length">暂无数据</view> -->
				</view>
			</view>
		</scroll-view>
		<!-- <CustomTabBar :currentTab="currentTab"></CustomTabBar> -->
	</view>
</template>

<script>
	// import CustomTabBar from "@/components/CustomTabBar.vue"
	import { mapState } from 'vuex';
	export default {
		components: {
			// CustomTabBar
		},
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 0,
				flist: [],
				slist: [],
				sTitle:"",
				currentTab:'tab2'
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		created() {
		},
		async onLoad(){
			//隐藏原生的tabbar,有自定义tabbar的页面都要写一遍
			// let res = uni.getMenuButtonBoundingClientRect();
			// this.titletop = res.top;
			// this.titleheight = res.height	
			this.loadData();
		},
		//强制刷新 
		methods: {
			async loadData(){
				var params = {}
				//let list = await this.$api.json('cateList');
				// console.log(uni.getStorageSync('userInfo').token,"77777")
				let res = await this.$axios(this.$baseUrl.getProductFirstGroup, params);
				this.flist = res.data.data;
				this.tabtap(this.flist[0]);
				this.sTitle = this.flist[0].name;
				this.currentId = this.flist[0].id;
				
			},
			//一级分类点击
			async tabtap(item){
				this.sTitle =item.name;
				this.currentId = item.id;
				var params = {
					parentId: item.id
				}
				//let list = await this.$api.json('cateList');
				let res = await this.$axios(this.$baseUrl.getProductSecondGroup, params);
				this.slist = res.data.data;
				
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(item){
				uni.navigateTo({
					url: `/pages/product/list?classId=${item.id}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #ffffff;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 160upx;
		height: 100%;
		background-color: #f8f8f8;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		border-left: 2px solid #f8f8f8;
		position: relative;
		&.active{
			color: $base-color;
			background: #fff;
			border-left: 2px solid $base-color;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				/* background-color: $base-color; */
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		/* padding-bottom: 10upx; */
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 100upx;
		/* padding-top: 8upx; */
		text-indent: 20upx;
		font-size: 28upx;
		/* background: #fff; */
		color: $font-color-dark;
		font-weight: 600;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 574upx;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 175upx;
		font-size: $font-sm;
		color: #666;
		padding-bottom: 30upx;
		margin-left: 16upx;
		image{
			width: 175upx;
			height: 175upx;
		}
		text{
			padding-top:10upx;
			width: 175upx;
			text-align: center
		}
	}
</style>
