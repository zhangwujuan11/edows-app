<template>
  <view class="con">
    <view class="ul">
      <view class="title">
        仓储中心
      </view>
      <view class="ulcon">
        <view class="li" @click="goindex('/pages/inventoryquery/inventoryquery')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc1.png"></image><br>
          </view>
          <text>库存查询</text>
        </view>
        <!--  <view class="li">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc2.png"></image><br>
          </view>
          <text>盘点</text>
        </view> -->
        <view class="li" @click="goindex('/pages/Reimbursement/Reimbursement')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc3.png"></image><br>
          </view>
          <text>报溢单</text>
        </view>
        <view class="li" @click="goindex('/pages/lossNote/lossNote')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc4.png"></image><br>
          </view>
          <text>报损单</text>
        </view>
        <view class="li" @click="goindex('/pages/inventoryquery/sharing')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc5.png"></image><br>
          </view>
          <text>库存共享</text>
        </view>
        <view class="li" @click="goindex('/pages/warehouse/procure')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc6.png"></image><br>
          </view>
          <text>采购入库</text>
        </view>
        <view class="li" @click="goindex('/pages/warehouse/return')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc7.png"></image><br>
          </view>
          <text>采购退货</text>
        </view>
        <view class="li" @click="goindex('/pages/sales/salesReturn')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc22.png"></image><br>
          </view>
          <text>销售退货</text>
        </view>
        <view class="li" @click="goindex('/pages/sales/bookInvoicing')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc8.png"></image><br>
          </view>
          <text>预计开单</text>
        </view>
        <view class="li" @click="goindex('/pages/sales/salesInvoicing')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc9.png"></image><br>
          </view>
          <text>销售开单</text>
        </view>
        <view class="li" @click="goindex('/pages/sales/receptionInvoicing')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc10.png"></image><br>
          </view>
          <text>前台开单</text>
        </view>
        <view class="li" @click="goindex('/pages/TransferStocks/TransferStocks')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc11.png"></image><br>
          </view>
          <text>移库调拨</text>
        </view>
      </view>
    </view>


    <view class="ul">
      <view class="title">
        行政基础
      </view>
      <view class="ulcon">
        <view class="li" @click="goindex('/pages/productparams/productparams')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc12.png"></image><br>
          </view>
          <text>产品参数</text>
        </view>
        <view class="li" @click="goindex('/pages/brandlist/brandlist')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc13.png"></image><br>
          </view>
          <text>品牌管理</text>
        </view>
        <view class="li" @click="goindex('/pages/productlist/productlist')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc14.png"></image><br>
          </view>
          <text>产品管理</text>
        </view>
        <view class="li" @click="goindex('/pages/storelist/storelist')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc15.png"></image><br>
          </view>
          <text>门店管理</text>
        </view>
      </view>
    </view>

    <view class="ul">
      <view class="title">
        客户中心
      </view>
      <view class="ulcon">
        <view class="li" @click="goindex('/pages/custom/classification')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc16.png"></image><br>
          </view>
          <text>客户分类</text>
        </view>
        <view class="li" @click="goindex('/pages/custom/management')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc17.png"></image><br>
          </view>
          <text>客户管理</text>
        </view>
        <view class="li" @click="goindex('/pages/supplierlist/supplierlist')">
          <view class="licon">
            <image src="https://store.edows.cn//image/jxc18.png"></image><br>
          </view>
          <text>供应商</text>
        </view>
      </view>
    </view>

    <view class="ul">
      <view class="title">
        经营分析
      </view>
      <view class="ulcon">
        <view class="li" @click="goindex('/pages/operate/salesStatistics')">
          <view class="licon">
            <image src="@/static/jxc19.png"></image><br>
          </view>
          <text>出库销售统计</text>
        </view>
        <view class="li" @click="goindex('/pages/operate/receiptDetails')">
          <view class="licon">
            <image src="@/static/jxc20.png"></image><br>
          </view>
          <text>入库明细汇总</text>
        </view>
        <view class="li" @click="goindex('/pages/operate/salesRevenue')">
          <view class="licon">
            <image src="@/static/jxc13.png"></image><br>
          </view>
          <text>产品销售额汇总</text>
        </view>
        <view class="li" @click="goindex('/pages/operate/receiptAmount')">
          <view class="licon">
            <image src="@/static/jxc21.png"></image><br>
          </view>
          <text>入库金额汇总</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		hasid:'',
		hasidsend:''
      }
    },
	onShow() {
		// this.hasid=uni.getStorageSync('userInfo').StoreUser
		// this.hasidsend=uni.getStorageSync('userInfo').StoreUser.tenantId
		if(uni.getStorageSync('UmsMember').StoreUser && uni.getStorageSync('UmsMember').StoreUser.tenantId){
			console.log("进销存权限")
		}else{
			 this.$api.msg('请联系管理员进行授权');
			 setTimeout(() => {
			   uni.switchTab({
				  url:'/pages/appindex/appindex'
			   })
			 }, 1000)
		}
		// if(!this.hasid || !this.hasidsend){
		// 	 this.$api.msg('请联系管理员进行授权');
		// 	 setTimeout(() => {
		// 	   uni.switchTab({
		// 	      url:'/pages/appindex/appindex'
		// 	   })
		// 	 }, 1000)
		// }
	},

    methods: {
      goindex(e) {
		  if(uni.getStorageSync('UmsMember').StoreUser && uni.getStorageSync('UmsMember').StoreUser.tenantId){
			  uni.navigateTo({
			    url: e
			  })
        }else{
          return false
        }
      }
    },
  }
</script>

<style scoped>
  .con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .ul {
    background: white;
    width: 686upx;
    border-radius: 20upx;
    margin-top: 32upx;
    padding: 29upx 41upx;
    box-sizing: border-box;
  }

  .ul .ulcon {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .ul .li {
    margin-bottom: 32upx;
    margin-right: 71upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .ul .licon {
    width: 96rpx;
    height: 96rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F7F7F7;
    border-radius: 32upx;
    margin-bottom: 16upx;
  }

  .ul .li:nth-child(4n) {
    margin-right: 0;
  }

  .ul .li image {
    width: 56upx;
    height: 56upx;
  }

  .ul .li text {
    font-size: 24upx;
    color: #666666;
    width: 96upx;
    display: block;
    text-align: center;
  }

  .ul .title {
    font-size: 32upx;
    color: #333333;
    margin-bottom: 30upx;
    font-weight: 500;
    /* background: url(); */
  }
</style>