<template>
	<view style="width: 100%;display: flex;justify-content: center;">
		<view class="custom-tab-bar">
			<view class="tab-bar-item" @click="switchToTab('/pages/category/category')">
				<image src="@/static/html/fenlei.png" v-if="currentTab == 'tab2'"></image>
				<image src="@/static/html/fenlei.png" v-if="currentTab != 'tab2'"></image>
			  <text :class="{ active: currentTab === 'tab2' }">分类</text>
			</view>
		  <view class="tab-bar-item" @click="switchToTab('/pages/accumulate/search')">
				<image src="@/static/html/jifen.png" v-if="currentTab == 'tab0'"></image>
				<image src="@/static/html/jifen.png" v-if="currentTab != 'tab0'"></image>
				<text :class="{ active: currentTab === 'tab0' }">
				  积分商城
			  </text>
		  </view>
		  <view class="tab-bar-item" @click="switchToTab('/pages/cart/cart')">
				<image src="@/static/html/cart.png" v-if="currentTab == 'tab3'"></image>
				<image src="@/static/html/cart.png" v-if="currentTab != 'tab3'"></image>
		    <text :class="{ active: currentTab === 'tab3' }">购物车</text>
		  </view>
			<view class="tab-bar-item" @click="switchToTab('/pages/user/user')">
				<image src="@/static/html/mysc.png" v-if="currentTab == 'tab4'"></image>
				<image src="@/static/html/mysc.png" v-if="currentTab != 'tab4'"></image>
			  <text :class="{ active: currentTab === 'tab4' }">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  props: {
    currentTab: String, // 当前选中的 Tab
  },
  methods: {
    switchToTab(tabName) {
		uni.navigateTo({
			url:tabName
		})
      this.$emit('switchTab', tabName);
    },
  },
};
</script>

<style scoped>
.custom-tab-bar {
  display: flex;
  width:90%;
  justify-content: space-around;
  align-items: center;
  background-color: #52AAFE;
  position: absolute;
  top: 104upx !important;
 border-radius: 20upx;
}

.tab-bar-item {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color:white;
  font-size: 10px;
}

.tab-bar-item .active {
  color: #007BFF; /* 选中的 Tab 文字颜色 */
}
image{
	width: 42upx;
	height: 45upx;
}

/* 添加更多的样式 */
</style>
