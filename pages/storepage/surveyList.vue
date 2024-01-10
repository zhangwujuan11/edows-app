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
				url:'',
				searchType: ""
			}
		},
		onLoad(e){
			this.searchType = e.searchType
		},
		mounted(){
		     this.url="../../static/dispatch-master/surveyList.html?searchType=" + this.searchType
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
