<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: '',
      };
    },
    onLoad(params) {
      console.log(params.url);
      let {
        url
      } = params
      this.url = `/hybrid/html/pdf.html?url=${params.url}`
    },
    onBackPress() {}
  }
</script>

<style>
</style>