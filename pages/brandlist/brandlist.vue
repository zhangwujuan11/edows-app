<template>
  <view>
    <view class="topserchbox">
      <view class="tab" v-if="toptable && toptable.length != 0">
        <view @click="switchToTab('tab1')" :class="{ active: currentTab === 'tab1' }">
          {{ toptable[0].brandName }} <br>
          <text class="line" v-if="currentTab === 'tab1'"></text>
        </view>
      </view>
    </view>
    <view class="dowcon" v-if='tabledata'>
      <view class="ul">
        <view class="li" v-for="(item, index) in tabledata" v-if="tabledata && tabledata.length != 0">
          <view class="dowcontitle">
            <text>{{ item.brandName }}</text>
          </view>
          <view class="licon">
            <view class="liconceng">
              <text>类型</text>
              <view>{{ item.type | type }}</view>
            </view>
            <view class="liconceng">
              <text>编码</text>
              <view>{{ item.brandCode }}</view>
            </view>
            <view class="liconceng">
              <text>图片</text>
              <view>
                <image :src="item.brandImg" mode=""></image>
              </view>
            </view>
            <view class="liconceng">
              <text>状态</text>
              <view>{{ item.status | shopType }}</view>
            </view>
            <view class="liconceng">
              <text>创建人</text>
              <view>{{ item.createBy }}</view>
            </view>
            <view class="liconceng">
              <text>修改人</text>
              <view>{{ item.updateBy }}</view>
            </view>
            <view class="liconceng">
              <text>创建时间</text>
              <view>{{ item.createTime }}</view>
            </view>
            <view class="liconceng">
              <text>备注</text>
              <view>{{ item.remark }}</view>
            </view>
          </view>
          <view class="libtnbox">
            <!-- <text @click="brandadd(null,item)">创建</text> -->
            <text @click="delgo(item)" v-if="item.parentId != null"
              style="color: red;background-color: #FBF5F5;">删除</text>
            <text @click="brandadd(item.productBrandId, item)" v-if="item.parentId != null">修改</text>
            <text @click="gobans(item.productBrandId, item.brandName)">进入品牌</text>
          </view>
        </view>
        <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;">没有更多数据了</view>
      </view>
    </view>
    <image class="addplus" @click="goproductadd()" src="@/static/addplus.png"></image>
    <view class="nodata" v-if='!tabledata'>
      <image style="  width: 460rpx;
      height: 312rpx;" class="empty" src="@/static/16701.png">
        <text>暂无数据</text>
    </view>
  </view>
</template>

<script>
  import {
    bandsfirstlist,
    deletbands,
    firstLevel,
    detelbans
  } from '@/Api/invers.js'
  import {
    toast,
    showConfirm,
    tansParams
  } from '@/Api/common'
  import {
  		mapState,
  		mapMutations,
  		mapGetters
  	} from 'vuex'
  export default {
    filters: {
      type(e) {
        if (e == "0") {
          return "车型"
        } else {
          return "品牌"
        }
      },
      shopType(e) {
        if (e == 0) {
          return "启用"
        } else {
          return "禁用"
        }
      },
    },
    data() {
      return {
        firstquery: {
          pageNum: 1,
          pageSize: 10
        },
        pageNum: 1,
        pageSize: 100000,
        total: 0,
        firsttotal: 0,
        currentTab: 'tab1',
        currentTabtwo: 'tab1',
        tabledata: [],
        toptable: [],
        aa: false
      }
    },
    async onLoad() {
      firstLevel({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.toptable = res.data.items
        this.firstquery.parentId = res.data.items[0].productBrandId
        this.geilist()
      })
    },
    onShow() {
      this.geilist()
    },
    methods: {
		...mapMutations(['delebarnnone']),
      geilist() {
        bandsfirstlist(this.firstquery).then(res => {
          if (res.code == 200) {
            this.tabledata = res.data.items
            this.firsttotal = res.data.total
          }
        })
      },
      switchToTab(tabName) {
        this.currentTab = tabName
      },
      // 修改
      brandadd(e, i) {
        uni.navigateTo({
          url: '/pages/brandlistadd/brandlistadd?id=' + e + '&paramsid=' + i.productBrandId + '&name=' + i.brandName
        })
        // if(e){
        // 	uni.navigateTo({
        // 		url:'/pages/brandlistadd/brandlistadd?id=' + e +'&paramsid='+ i.productBrandId + 
        // 	})
        // }else{
        // 	uni.navigateTo({
        // 		url:'/pages/brandlistadd/brandlistadd?paramsid=' + i.productBrandId
        // 	})
        // }
      },
      // 新增父级
      goproductadd() {
        uni.navigateTo({
          url: '/pages/brandlistadd/brandlistadd?paramsid=' + this.firstquery.parentId + '&name=' + this.toptable[0]
            .brandName
        })
      },
      gobans(i, e) {
        uni.navigateTo({
          url: '/pages/productlistadd/productinfo?id=' + i + '&name=' + e
        })
      },
      delgo(i) {
		  let that=this
		  uni.showModal({
		  	content: '是否确认删除名称为"' + i.brandName + '"的数据项？',
		  	showCancel: true,
		  	confirmText: '确定',
		  	success: function(res) {
		  		if (res.confirm) {
		  			detelbans(i.productBrandId).then(da => {
		  			  if (da.code == 200) {
		  			    that.$api.msg('删除成功');
		  			    that.geilist()
		  			  }
		  			})
		  		} else {
		  			console.log('cancel') //点击取消之后执行的代码
		  		}
		  	}
		  })
      },
    },
    onReachBottom() { //触底事件
      if (this.firstquery.pageNum * this.firstquery.pageSize >= this.firsttotal) {
        this.aa = true
      } else {
        if (this.firstquery.pageNum <= this.firstquery.pageNum - 1) {
          setTimeout(() => {
            uni.hideLoading()
          }, 500)
        } else {
          uni.showLoading({
            title: '加载中'
          });
          this.firstquery.pageNum++


          bandsfirstlist(this.firstquery).then(res => {
            if (res.code == 200) {
              this.tabledata = [...this.tabledata, ...res.data.items]
              this.firsttotal = res.data.total
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

<style scoped>
  .topserchbox {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 999;
    position: fixed;
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

  .serboxdown text {
    display: block;
    width: 156upx;
    height: 72upx;
    line-height: 72upx;
    background-color: #F5F7FB;
    border-radius: 70upx;
    text-align: center;
    font-size: 24upx;
  }

  .dowcon {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 128upx;
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
    justify-content: left;
    align-items: center;
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
    word-break: break-all;
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
    padding: 18upx 30upx;
    margin-right: 10upx;
  }

  .liconceng image {
    width: 58upx;
    height: 58upx;
  }

  .tab {
    padding-left: 32upx;
    width: 100%;
    display: flex;
    justify-content: left;
    line-height: 90upx;
    margin-bottom: 16upx;
  }

  .active {
    color: #2979FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .active .line {
    display: block;
    width: 60upx;
    border-bottom: 3px solid #2979FF;
  }

  .serboxdown .activetwo {
    background-color: #1862F5;
    color: white;
  }

  .dowcontitle image {
    width: 60upx;
    height: 60upx;
    margin-right: 20upx;
  }


  .waring {
    width: 88upx;
    height: 88upx;
  }

  .addplus {
    width: 88upx;
    height: 88upx;
    position: fixed;
    z-index: 9999;
    bottom: 160upx;
    right: 0upx;
  }

  .nodata {
    padding-top: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>