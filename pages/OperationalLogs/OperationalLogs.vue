<template>
  <view>
    <view class="dowcon">
      <view class="ul" v-if="list.length==0" style="padding-top: 30%;">
        <image src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
      <view class="ul" v-else>
        <view class="li" v-for="(item,index) in list" :key="index">
          <view class="dowcontitle">
            <view class="title">{{item.createBy}}</view>
            <view class="state" style="width: 300upx;font-size: 24upx;padding-left: 40upx;">{{item.createTime}}</view>
          </view>

          <view class="licon">
            <view class="liconceng">
              <text>CARG码</text>
              <view>{{item.carg}}</view>
            </view>
            <view class="liconceng">
              <text>产品名称</text>
              <view>{{item.productName}}</view>
            </view>
            <view class="liconceng">
              <text>类型</text>
              <view>{{item.busTypeDes}}</view>
            </view>
            <view class="liconceng">
              <text>单号</text>
              <view>{{item.busCode}}</view>
            </view>
            <view class="liconceng">
              <text>前值</text>
              <view>{{item.beforeQuantity}}</view>
            </view>
            <view class="liconceng">
              <text>增减量</text>
              <view>{{Num(index)}}</view>
            </view>
            <view class="liconceng">
              <text>后值</text>
              <view>{{item.afterQuantity}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    Operational
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        params: {
          pageNum: 1,
          pageSize: 10,
        },
        list: [],
        total: ''
      }
    },
    computed: {
      Num(i) {
        return function(i) {
          this.list[i].num = this.list[i].afterQuantity - this.list[i].beforeQuantity
          return this.list[i].num
        }
      }
    },
    async onLoad(e) {
      this.params.inventoryId = e.id
      this.getList()
    },
    onReachBottom() {
      if (this.list.length == this.total) {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
          duration: 1000,
        });
      } else {
        this.params.pageNum++;
        this.getList();
      }
    },
    methods: {
      getList(num, size) {
        this.params.pageNum = num ? num : this.params.pageNum
        this.params.pageSize = size ? size : this.params.pageSize
        uni.showLoading({
          title: "加载中",
        });
        Operational(this.params).then((res) => {
          if (res.code == 200) {
            uni.hideLoading();
            this.list = size ?
              res.data.items : [...this.list, ...(res.data.items || [])];
            this.total = res.data.total;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dowcon {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .dowcon .ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    uni-image {
      width: 460rpx;
      height: 312rpx;
    }
  }

  .dowcon .ul .li {
    width: 686upx;
    border-radius: 20upx;
    padding: 32upx;
    box-sizing: border-box;
    background-color: white;
    margin-top: 24upx;
  }

  .dowcontitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: black;
    font-size: 24upx;

    .title {
      font-size: 32upx;
      width: 300rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state {
      width: 86upx;
      height: 46upx;
      border-radius: 10upx;
      font-size: 20upx;
      line-height: 46upx;
      text-align: center;
      color: black;
    }
  }

  .licon {
    background-color: #F5F7FB;
    border-radius: 10upx;
    padding: 28upx 32upx;
    box-sizing: border-box;
    margin-top: 28upx;
    color: #333333;
    font-size: 24upx;
  }

  .liconceng text {
    color: #999999;
    width: 160upx !important;
    display: block;
    margin-right: 34upx;
  }

  .liconceng {
    font-size: 26upx;
    margin-bottom: 24upx;
    display: flex;
    align-items: center;
  }

  .liconceng view {
    width: 410upx;
  }
</style>