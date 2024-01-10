<template>
  <view>
    <ss-preview :fileUrl="fileUrl" :fileType="fileType" :imageList="imageList"></ss-preview>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        fileUrl: '',
        fileType: '',
        imageList: [],
      }
    },
    onLoad(option) {

      let options = JSON.parse(decodeURIComponent(option.item))
      this.fileType = options.type;
      this.fileUrl = options.src;
      //此处仅为.doc,.docx,.xls,.xlsx示例，通过服务端接口把相关文件转换为pdf文件流
      // let types = options.src.substr(options.src.lastIndexOf('.'));
      // if(types ！== '.pdf'){
      // this.fileUrl = `https://xxxx?file==${encodeURIComponent(options.src)}`
      // }			
    },
  }
</script>