<template>
	<view class="big_out" @click="back_page" style="height: 40px;padding-top: 15px;">
		<!-- 左上角返回按钮 -->
		<!-- 这里为什么要加4px，是因为这个左箭头<的高度为16rpx需要下降一半，就是8rpx=4px,可以自己试一下，我这里没有问题 -->
		<view class="back"> 
			<view class="back_img">
				<image src="@/static/backhome.png" mode=""></image>
			</view>
			<view class="back_text">
				返回
			</view>
			<view class="back_text" style="border-left: 1px solid white;">
				易道大咖商城
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: "backPages",
		props: {
			backtext: String,
		},
 
		data() {
			return {
				titleheight: 0,
				titletop: 0
			};
		},
        //这里原来使用的onLoad一直有bug（不重新进入页面就会错位），
        // 后来使用onShow  更改于2022/09/30  以后再修改
		mounted() {
			//加载时调用 getHeight
			this.getHeight();
		},
		methods: {
			//利用胶囊按钮定位宽高
			getHeight() {
				let res = uni.getMenuButtonBoundingClientRect();
				this.titletop = res.top;
				this.titleheight = res.height
			},
 
			//直接返回上一级
			back_page() {
				 uni.$emit('refresh', { refresh: true });// 标记是否刷新tabbar页面
				uni.switchTab({
					
				  url: '/pages/appindex/appindex'
				});
			},
		}
 
	}
</script>
 
<style scoped>
	.big_out {
	    z-index: 999;
		background-color: #3A9EFE;
		width: 100%;
		position: fixed;
		top: 0;
		
	}
 
	.back {
		position: absolute;
		height: 32px;
		width:100%;
		color: white;
		display: flex;
		align-items: center;
		background-color: #3A9EFE ;
	}
 
	.back_img {
		/* 用border值来控制箭头粗细 */
		/* border: 3px solid white; */
		/* 上、右、下、左  四个边框的宽度 */
		/* border-width: 0px 2px 2px 0px; */
		/* padding值控制箭头大小 */
		padding: 5px;
		margin-left: 30rpx;
	}
 .back_img image{
	 width:42rpx;
	 height: 42rpx;
 }
	.back_text {
		padding: 0 20rpx;
		box-sizing: border-box;
		line-height: 42rpx;
	}
</style>