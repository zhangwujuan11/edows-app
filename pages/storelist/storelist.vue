<template>
  <view>
    <view class="topserchbox">
      <!-- <view class="topserchboxcon" >
					<picker @change="bindPickerChange" :value="typevalue" :range="paymode">
						<view class="uni-input" style="width:180upx;height: 80upx;line-height: 80upx;">
						{{paymode[index]}} 
						<image src="@/static/bottom.png" class="serchdown" mode=""></image>
						</view>
					</picker>
				<view class="uni-input-wrapper" style="position: relative;">
					<input class="uni-input" v-model="serchinput" placeholder="请输入关键字搜索" style="height: 100%;width: 488upx;" />
					<image class="search-icon" src="/static/search.png" @click="isserch"></image>
				</view>
			</view> -->


      <view class="search">
        <!-- <select-lay class="seclectpaytype" :value="keyword" slabel="type" svalue="typeid" placeholder="全部"
					:zindex="1211" :options="paymode" @selectitem="selectitem"></select-lay> -->
        <picker @change="bindPickerChange" :value="typevalue" :range="paymode">
          <view class="uni-input" style="font-size: 28upx;display: flex;align-items: center;">
            {{paymode[index]}}
            <image src="@/static/bottom.png" class="icon" mode=""></image>
          </view>
        </picker>
        <!-- <view class="uni-input-wrapper" style="position: relative;">
					<input class="uni-input" v-model="serchinput" placeholder="请输入关键字搜索" style="height: 100%;width: 350upx;" />
					<image class="search-icon" src="/static/search.png" @click="isserch"></image>
				</view> -->
        <input @confirm="getlist" v-model="serchinput" class="uni-input" style="padding-left: 20upx;"
          placeholder-class="placeholder" placeholder="请输入关键字搜索" />
        <image @click="getlist" class="search-icon" src="/static/search.png"></image>
      </view>

    </view>
    <view class="dowcon">
      <view class="ul" v-if="tabledata&&tabledata.length > 0">
        <view class="li" v-for="(item,index) in tabledata" :key="index">
          <view class="dowcontitle">
            <text>{{item.warehouseName}}</text>
            <text class="yes" v-if="item.status == 0">启用</text>
            <text class="no" v-if="item.status == 1">禁用</text>
          </view>
          <view class="licon">
            <view class="liconceng">
              <text>门店编码</text>
              <view>{{item.warehouseCode}}</view>
            </view>
            <view class="liconceng">
              <text>门店管理员</text>
              <view>{{item.warehouseAdmin}}</view>
            </view>
            <view class="liconceng">
              <text>管理员电话</text>
              <view>{{item.adminPhone}}</view>
            </view>
            <view class="liconceng">
              <text>门店电话</text>
              <view>{{item.warehousePhone}}</view>
            </view>
            <view class="liconceng">
              <text>门店地址</text>
              <view>{{item.detailedAddress}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="no-have" v-else>
        <image style="  width: 460rpx;
      height: 312rpx;" src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    storelist
  } from '@/Api/invers.js'
  export default {
    data() {
      return {
        paymode: ['门店名称', '门店编码'],
        index: 0,
        querform: {
          pageNum: 1,
          pageSize: 10,
		  warehouseName:"",
		  warehouseCode:''
        },
        typevalue: '',
        total: 0,
        tabledata: [],
        serchinput: ''
      }
    },
    async onLoad() {
      this.getlist()
    },
    methods: {
      getlist() {
		  this.bindPickerChange()
        storelist(this.querform).then(res => {
          this.tabledata = res.data.items
          this.total = res.data.total
        })
      },
      bindPickerChange(e) {
        if (e) {
          this.index = e.target.value
        }
        if (this.index == 0) {
          this.querform.warehouseName = this.serchinput
          this.querform.warehouseCode = ''
        } else if (this.index == 1) {
			console.log(this.serchinput)
		  this.querform.warehouseCode = this.serchinput
          this.querform.warehouseName = ''
        }
        this.querform.pageNum = 1
        this.querform.pageSize = 10
      },
      // 搜索
      isserch() {
        this.bindPickerChange()
        this.getlist()
      },
    },
    onReachBottom() { //触底事件
      if (this.querform.pageNum * this.querform.pageSize >= this.total) {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          uni.hideLoading()
        }, 500)
      } else {
        if (this.querform.pageNum <= this.querform.pageNum - 1) {
          setTimeout(() => {
            uni.hideLoading()
          }, 500)
        } else {
          uni.showLoading({
            title: '加载中'
          });
          this.querform.pageNum++
          storelist(this.querform).then(res => {
            if (res.code == 200) {
              this.tabledata = [...this.tabledata, ...res.data.items]
              this.total = res.data.total
            }
          })
        }
        setTimeout(() => {
          uni.hideLoading()
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 686rpx;
    height: 72rpx;
    background: #f1f1f1;
    margin: 0 auto;
    border-radius: 36rpx;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 40upx;
    margin-bottom: 40upx;
  }

  .label {
    font-size: 24rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #333333;
    margin-left: 32rpx;
  }

  .icon {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }

  .topserchbox {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 999;
    position: fixed;
  }

  .topserchboxcon {
    padding-left: 18px;
    width: 100%;
    display: flex;
    justify-content: left;
    line-height: 52px;
    margin-bottom: 9px;
  }

  .top {
    width: 750rpx;
    height: 92rpx;
    background: #ffffff;

    .search {
      width: 686rpx;
      height: 72rpx;
      background: #f1f1f1;
      margin: 0 auto;
      border-radius: 36rpx;
      display: flex;
      align-items: center;
      position: relative;
    }

    .label {
      font-size: 24rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #333333;
      margin-left: 32rpx;
    }

    .icon {
      width: 28rpx;
      height: 28rpx;
      margin-left: 10rpx;
    }

    .placeholder {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }

    .uni-input {
      margin-left: 16rpx;
    }

    .search-icon {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      right: 20rpx;
    }
  }

  /deep/.uni-select-lay .uni-select-lay-select {
    border: none !important;
  }

  /deep/.uni-select-lay .uni-select-lay-select .uni-select-lay-icon.data-v-392314c6::before {
    width: 0 !important;
  }

  .seclectpaytype {
    width: 160upx;
  }

  .topserchboxcon {
    display: flex;
    width: 686upx;
    background-color: #F1F1F1;
    border-radius: 90upx;
    margin: 10upx 0 24upx 0;
  }

  .serboxdown {
    display: flex;
    justify-content: space-between;
    width: 686upx;
    margin-bottom: 24upx;
  }

  .seclectdon1 {
    width: 268upx;
    border-radius: 90upx;
    background-color: #F1F1F1;
  }

  .seclectdon2 {
    width: 180upx;
    border-radius: 90upx;
    background-color: #F1F1F1;
  }

  .seclectdon3 {
    width: 180upx;
    border-radius: 90upx;
    background-color: #F1F1F1;
  }

  .dowcon {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100upx;
    padding-bottom: 50upx;
  }

  .dowcon .ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    color: #999999;
    font-size: 24upx;
  }

  .dowcontitle text {
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: normal;
    color: #333333;
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
    margin-bottom: 24upx;
    display: flex;
    align-items: center;
  }

  .liconceng view {
    width: 410upx;
  }

  .libtnbox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 28upx;
  }

  .libtnbox text {
    background-color: #F5F7FB;
    border-radius: 70upx;
    color: #007DFF;
    font-size: 24upx;
    padding: 18upx 46upx;
    margin-right: 10upx;
  }

  .dowcontitle .no {
    width: 120upx;
    height: 56upx;
    font-weight: normal;
    line-height: 56upx;
    text-align: center;
    display: block;
    background: rgba(224, 112, 0, 0.2);
    border-radius: 8upx;
    color: #E07000;
    margin-left: 10upx;
    font-size: 14px !important;
  }

  .dowcontitle .yes {
    width: 120upx;
    height: 56upx;
    font-weight: normal;
    line-height: 56upx;
    text-align: center;
    display: block;
    background: rgba(0, 125, 255, 0.2);
    border-radius: 8upx;
    color: #007DFF;
    margin-left: 10upx;
    font-size: 14px !important;
  }

  .addplus {
    width: 88upx;
    height: 88upx;
    position: fixed;
    z-index: 9999;
    bottom: 160upx;
    right: 0upx;
  }

  .waring {
    width: 88upx;
    height: 88upx;
  }

  .serchdown {
    width: 28upx;
    height: 28upx;
    position: absolute;
    top: 30upx;
    right: 20upx;
  }

  .search-icon {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    right: 40rpx;
    z-index: 99;
  }

  .no-have {
    padding-top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>