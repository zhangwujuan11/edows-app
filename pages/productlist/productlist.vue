<template>
  <view>
    <view class="topserchbox">
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
        <input @confirm="isserch" v-model="serchinput" class="uni-input" style="padding-left: 20upx;"
          placeholder-class="placeholder" placeholder="请输入关键字搜索" />
        <image @click="isserch" class="search-icon" src="/static/search.png"></image>
      </view>
    </view>

    <view class="dowcon">
      <view class="ul" v-if="tabledata&&tabledata.length > 0">
        <view class="li" v-for="item in tabledata" :key="item.carg">
          <view class="dowcontitle">
            <text>{{item.carg}}</text>
            <text class="no" v-if="item.status == 1">禁用</text>
            <text class="yes" v-if="item.status == 0">启用</text>
          </view>
          <view class="licon">
            <view class="liconceng">
              <text>产品名称</text>
              <view>{{item.name}}</view>
            </view>
            <view class="liconceng">
              <text>工艺图纸</text>
              <view>{{item.technologyImg}}</view>
            </view>
            <view class="liconceng">
              <text>车型</text>
              <view>{{item.motorcycleType}}</view>
            </view>
            <view class="liconceng">
              <text>类型</text>
              <view>{{ item.classify }}</view>
            </view>
            <view class="liconceng">
              <text>长度</text>
              <view>{{item.prodLength}}</view>
            </view>
            <view class="liconceng">
              <text>中高</text>
              <view>{{item.risingFalling}}</view>
            </view>
            <view class="liconceng">
              <text>对角</text>
              <view>{{item.diagonal}}</view>
            </view>
            <view class="liconceng">
              <text>零售价</text>
              <view>{{item.retailPrice}}</view>
            </view>
            <view class="liconceng">
              <text>本厂编码</text>
              <view>{{item.factoryCode}}</view>
            </view>
            <view class="liconceng">
              <text>原厂件号</text>
              <view>{{item.partNumber}}</view>
            </view>
            <view class="liconceng">
              <text>颜色</text>
              <view>{{item.prodColour}}</view>
            </view>
            <view class="liconceng">
              <text>彩带</text>
              <view>{{item.coloredRibbon}}</view>
            </view>
            <view class="liconceng">
              <text>单位</text>
              <view>{{item.unit}}</view>
            </view>
            <view class="liconceng">
              <text>库存预警</text>
              <view>{{item.inventoryAlert}}</view>
            </view>
            <view class="liconceng">
              <text>产品备注</text>
              <view>{{item.remark}}</view>
            </view>
          </view>
          <view class="libtnbox" v-if="item.tenantId==tid">
            <text @click="delgo(item)" style="color: red;background-color: #FBF5F5;">删除</text>
            <text @click="prodadd(item)">修改</text>
          </view>
        </view>
        <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;">没有更多数据了</view>
      </view>
      <view class="no-have" v-else>
        <image style="  width: 460rpx;
      height: 312rpx;" src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
    </view>
    <image class="addplus" @click="goproductadd" src="@/static/addplus.png"></image>
  </view>
</template>

<script>
  import {
    productlist,
    seleclass,
    detelprodu
  } from '@/Api/invers.js'
  import {
    showConfirm
  } from '@/Api/common'
  export default {
    data() {
      return {
        querform: {
          pageNum: 1,
          pageSize: 10
        },
        tatol: 0,
        tabledata: [],
        classlist: [],
        index: 0,
        typevalue: '',
        keyword: '全部',
        paymode: ['carg码', '产品名称', '本厂编码'],
        visibledel: false,
        serchinput: '',
        aa: false,
		tid:''
      }
    },
    async onLoad() {

      this.getlist();
      seleclass().then(res => {
        this.classlist = res.data
      })

    },
	onShow() {
		this.tid=uni.getStorageSync('UmsMember').StoreUser.tenantId
	},
    methods: {
      getlist() {
        productlist(this.querform).then(res => {
          this.tabledata = res.data.items
          this.tatol = res.data.tatol
        })
      },
      // 删除
      delgo(i) {
		  let that=this
		  uni.showModal({
		  	content: '是否确认删除名称为"' + i.name + '"的数据项？',
		  	showCancel: true,
		  	confirmText: '确定',
		  	success: function(res) {
		  		if (res.confirm) {
		  			detelprodu(i.productId).then(da => {
		  			  if (da.code == 200) {
		  			    that.$api.msg('删除成功');
		  			    that.getlist()
		  			  }
		  			})
		  		} else {
		  			console.log('cancel') //点击取消之后执行的代码
		  		}
		  	}
		  })
      },
      prodadd(i) {
        uni.navigateTo({
          url: '/pages/productlistadd/productlistadd?id=' + i.productId
        })
      },

      // 新增产品
      goproductadd() {
        uni.navigateTo({
          url: '/pages/productlistadd/productlistadd'
        })
      },
      bindPickerChange(e) {
        if (e) {
          this.index = e.target.value
        }
        if (this.index == 0) {
          this.querform.carg = this.serchinput
          this.querform.name = ''
          this.querform.factoryCode = ''
        } else if (this.index == 1) {
          this.querform.carg = ''
          this.querform.name = this.serchinput
          this.querform.factoryCode = ''
        } else if (this.index == 2) {
          this.querform.carg = ''
          this.querform.name = ''
          this.querform.factoryCode = this.serchinput
        }
        this.querform.pageNum = 1
        this.querform.pageSize = 10

      },
      // 搜索
      isserch() {
        this.bindPickerChange()
        this.getlist()
      },
      selectitem(index, item) {
        this.payChannelid = item.typeid;
      },
      // 库存分享
      sharebtn() {
        this.visible = true
      }
    },
    onReachBottom() { //触底事件
      if (this.querform.pageNum * this.querform.pageSize >= this.tatol) {
        this.aa = true
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
          productlist(this.querform).then(res => {
            if (res.code == 200) {
              this.tabledata = [...this.tabledata, ...res.data.items]
              this.tatol = res.data.total
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
	word-wrap: break-word;
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
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }

  .search-icon {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    right: 20rpx;
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