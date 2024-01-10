<template>
  <view>
	  <view class="tabmian">
	  	<uni-breadcrumb separator="/">
	  	  <uni-breadcrumb-item v-for="(route,index) in  $store.state.barnlist" @click="test" :key="index" >
	  	    {{route.name}}
	  	  </uni-breadcrumb-item>
	  	</uni-breadcrumb>
	  </view>
	 
    <view class="dowcon">
      <view class="ul">
        <view v-if="tabledata" class="li" v-for="(item,index) in tabledata">
          <view class="dowcontitle">
            <text>{{item.brandName}}</text>
          </view>
          <view class="licon">
            <view class="liconceng">
              <text>类型</text>
              <view>{{item.type | type}}</view>
            </view>
            <view class="liconceng">
              <text>编码</text>
              <view>{{item.brandCode}}</view>
            </view>
            <view class="liconceng">
              <text>图片</text>
              <view>
                <image :src="item.brandImg" mode=""></image>
              </view>
            </view>
            <view class="liconceng">
              <text>状态</text>
              <view>{{item.status | shopType}}</view>
            </view>
            <view class="liconceng">
              <text>创建人</text>
              <view>{{item.createBy}}</view>
            </view>
            <view class="liconceng">
              <text>修改人</text>
              <view>{{item.updateBy}}</view>
            </view>
            <view class="liconceng">
              <text>创建时间</text>
              <view>{{item.createTime}}</view>
            </view>
            <view class="liconceng">
              <text>备注</text>
              <view>{{item.remark}}</view>
            </view>
          </view>
          <view class="libtnbox">
            <!-- <text @click="brandadd(null,item)">创建</text> -->
            <text @click="delgo(item)" v-if="item.parentId != null"
              style="color: red;background-color: #FBF5F5;">删除</text>
            <text @click="brandadd(item.productBrandId,item)" v-if="item.parentId != null">修改</text>
            <text @click="gobans(item.productBrandId,item.brandName)">进入品牌</text>
          </view>
        </view>
        <view class="nodata" v-if='!tabledata'>
          <image class="empty" src="@/static/16701.png">
            <text>暂无数据</text>
        </view>
      </view>
      <image class="addplus" @click="goproductadd()" src="@/static/addplus.png"></image>
    </view>
  </view>
</template>

<script>
  import {
    bandsfirstlist,
    deletbands,
    detelbans,
	treelisrt
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
        if (e == "1") {
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
        firsttotal: 0,

        currentTab: 'tab1',
        currentTabtwo: 'tab1',


        keyword: '全部',
        paymode: [{
          type: '有效',
          typeid: 3
        }, {
          type: '失效',
          typeid: 4
        }, {
          type: '全部',
          typeid: 5
        }],
        tabledata: [],
		routes: [],
      }
    },
    async onLoad(option) {
      this.firstquery.parentId = option.id
      this.tabname = option.name
      uni.setNavigationBarTitle({
        title: option.name
      });
	  this.$store.state.barnlist.push({
		  name:option.name,
		  to:'/pages/productlistadd/productinfo?id=' + option.id + '&name=' + option.name
		})
    },
	onShow() {
		this.geilist()
		this.barnlistreset()
	},
    methods: {
		...mapMutations(['barnlistreset','delebarnlist']),
      geilist() {
        bandsfirstlist(this.firstquery).then(res => {
          if (res.code == 200) {
            this.tabledata = res.data.items
            this.firsttotal = res.total
          }
        })
      },
      delgo(i) {
        showConfirm('是否确认删除名称为"' + i.brandName + '"的数据项？').then(res => {
          if (res.confirm) {
            detelbans(i.productBrandId).then(da => {
              if (da.code == 200) {
                this.$api.msg('删除成功');
                this.geilist()
              }
            })
          }
        })
      },
      gobans(i, e) {
        uni.navigateTo({
          url: '/pages/productlistadd/productinfo?id=' + i + '&name=' + e
        })
      },

      switchToTab(tabName) {
        this.currentTab = tabName
      },
      switchbt(tabName) {
        this.currentTabtwo = tabName
      },

      showModal() {
        this.visible = true;
      },
      closeModal() {
        this.visible = false;
      },
      submit() {
        this.closeModal();
      },
      async getlist() {
        var params = {
          pageNo: 1,
          pageSize: 999
        }
      },
      // 新增父级
      goproductadd() {
        uni.navigateTo({
          url: '/pages/brandlistadd/brandlistadd?paramsid=' + this.firstquery.parentId + '&name=' + this.tabname
        })
      },
      selectitem(index, item) {
        this.payChannelid = item.typeid;
        if (index >= 0) {
          this.keyword = this.paymode[index].typeid;
        } else {
          this.keyword = ""
        }
      },
      // 库存分享
      sharebtn() {
        this.visible = true
      },
      // 修改
      brandadd(e, i) {
        uni.navigateTo({
          url: '/pages/brandlistadd/brandlistadd?id=' + e + '&paramsid=' + i.productBrandId + '&name=' + i.brandName
        })
        // if(e){
        // 	uni.navigateTo({
        // 		url:'/pages/brandlistadd/brandlistadd?id=' + e +'&paramsid='+ i.productBrandId
        // 	})
        // }else{
        // 	uni.navigateTo({
        // 		url:'/pages/brandlistadd/brandlistadd?paramsid=' + i.productBrandId
        // 	})
        // }
      }
    },
	onBackPress() {
		this.delebarnlist()
	},
    onReachBottom() { //触底事件
      if (this.firstquery.pageNum * this.firstquery.pageSize >= this.firsttotal) {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          uni.hideLoading()
        }, 500)
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

  /* .modal {
		position: fixed;
		left: 0;
		top: 208upx;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: top;
		z-index: 99;
	} */

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
    padding-top: 0upx;
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

  /* .modal .modal-content .modal-header {
		width: 750upx;
		background-color: white;
	}

	.modal .modal-content {
		background-color: white;
		width: 750upx;
		height: max-content;
		display: flex;
		justify-content: space-between;
		padding: 10upx;
		flex-wrap: wrap;
	}

	.modal .modal-content .span {
		padding: 18upx 30upx;
		margin-bottom: 17upx;
		color: #333333;
		font-size: 24upx;
		background-color: #F5F7FB;
		border-radius: 50upx;
	}

	.modal .modal-content .modal-body {
		background-color: white;
	}

	.modal .modal-content .modal-footer {
		background-color: #eeeeee;
		padding: 10upx;
		display: flex;
		justify-content: flex-end;
	}

	.modal .modal-content .modal-footer button {
		border: none;
		padding: 10upx 20upx;
		margin-left: 10upx;
		border-radius: 5upx;
		cursor: pointer;
	} */

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

  /* .modaldel {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modaldel .modal-content .modal-header {
		width: 560upx;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10upx;
	}

	.modaldel .modal-content {
		width: 616upx;
		background-color: white;
		border-radius: 10upx;
		padding: 28upx 10upx 50upx 40upx;
		border-radius: 10upx;
	}

	.modaldel .modal-content .modal-body {
		padding: 20upx;
	}

	.modaldel .modal-content .modal-footer {
		display: flex;
		justify-content: flex-end;
	}

	.modaldel .modal-content .modal-footer button {
		border: none;
		border-radius: 8upx;
		cursor: pointer;
	} */

  .waring {
    width: 88upx;
    height: 88upx;
  }

  .empty {
    width: 656upx;
    height: 438upx;
  }

  .nodata {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .addplus {
    width: 88upx;
    height: 88upx;
    position: fixed;
    z-index: 9999;
    bottom: 160upx;
    right: 0upx;
  }
  .tabmian{
	  height:50upx;
	  line-height: 50upx;
	  padding-left: 20upx;
	  background-color: white;
  }
</style>