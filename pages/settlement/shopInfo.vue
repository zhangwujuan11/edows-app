<template>
	<view >
		<view >
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		mounted(){
		     this.url="../../static/dispatch-master/shopInfo.html"
		    },
		onReady() {
		    this.clearMuiBack()
		},
				
		methods: {
		    // 关闭mui返回
		    clearMuiBack() {
		        // #ifdef APP-PLUS
		        let currentWebview = this.$scope.$getAppWebview().children()[0]
		        //监听注入的js
		        currentWebview.addEventListener("loaded", function() {
		            currentWebview.evalJS("mui.init({keyEventBind: {backbutton: false }});");
		        });
		        // #endif
		    },
		},
	}
</script>

<style>

</style>
