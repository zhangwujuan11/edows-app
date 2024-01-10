<template>
	<view class="dot-main">
		<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in list" :key="index"></view>
	</view>
</template>
<style>
	.dot-main {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dot-item {
		width: 14upx;
		height: 10upx;
		background: #d2d2d2;
		margin: 30upx 5upx 10upx;
		border-radius: 10upx;
		box-sizing: border-box;
		
	}
	.active {
		width:20px;
		background: #47c1ff;
	}
</style>
<script>
	export default {
		props: [ 'list','current'],
		data() {
			return {
				
			};
		}
	}
</script>
