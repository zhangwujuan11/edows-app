<template>
  <view>
    <view class="topserchbox">
      <view class="topserchboxcon">
        <view class="uni-input-wrapper" style="position: relative; width: 686upx; height: 72upx; padding-left: 40upx;">
          <input class="uni-input" placeholder="请输入产品名称" style="height: 100%;width: 606upx;"
            v-model="params.productName" />
          <icon type="search" size="18" style="position: absolute;right:20upx;top: 20upx;z-index: 99;"
            @click="search" />
        </view>
      </view>

    </view>

    <view class="dowcon">
      <view class="ul">
        <view class="li" v-for="(item,index) in list" :key="index" @click="change(item.inventoryId)">
          <view class="dowcontitle">
            <view class="state" style="position: relative;">
              <uni-icons type="checkmarkempty" size="26" v-show="item.inventoryId==id"
                style="color: #0067ff; position: absolute;  background-color: #f3f7ff; border-radius: 50%;width: 100%;height: 100%;"></uni-icons>
            </view>
            <view class="text" style="height: 60upx; width: 540upx;     white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; padding-top: 10upx;">
              {{item.productName}}
            </view>
          </view>

          <view class="licon">
            <view class="liconceng">
              <text>库位名称</text>
              <view>{{item.positionCode}}</view>
            </view>
            <view class="liconceng">
              <text>库存</text>
              <view>{{item.usableQuantity}}</view>
            </view>
            <view class="liconceng">
              <text>carg</text>
              <view>{{item.carg}}</view>
            </view>
            <view class="liconceng">
              <text>产品名称</text>
              <view>{{item.productName}}</view>
            </view>
            <view class="liconceng">
              <text>分类</text>
              <view>{{item.classify}}</view>
            </view>
            <view class="liconceng">
              <text>门店编码</text>
              <view>{{item.vendorCode}}</view>
            </view>
            <view class="liconceng">
              <text>门店名字</text>
              <view>{{item.warehouseName}}</view>
            </view>
            <view class="liconceng">
              <text>供应商编码</text>
              <view>{{item.warehouseCode}}</view>
            </view>
            <view class="liconceng">
              <text>供应商名称</text>
              <view>{{item.vendorName}}</view>
            </view>
            <view class="liconceng">
              <text>单价</text>
              <view>{{item.price}}</view>
            </view>
          </view>
        </view>

      </view>
    </view>
    <view class="bottom">
      <button type="primary" style="height: 88upx; width: 686upx;" @click="doList(id)">加入清单</button>
    </view>
    <view style="height: 150upx; width: 686upx;">

    </view>
  </view>
</template>

<script>
  import {
    getTransferStocks,
    delTransferStocks,
    detailTransferStocks,
    AuditTransferStocks,
    addTransferStocks,
    editTransferStocks,
    getinventory,
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        scrollTop: 0,
        show: false,
        id: "",
        list: [],
        params: {
          pageNum: 1,
          pageSize: 20,

        },
        form: {},
        productName: '',
        inventoryQuantity: '',
        obj: {},
        obj1: {},
        index: '',
        total: ''
      }
    },
    async onLoad(e) {
      this.index = e.index
      if ('id' in e) {
        this.obj1 = JSON.parse(decodeURIComponent(e.id));
        this.params.warehouseId = this.obj1.warehouseId
      }
      this.getlist();
    },
    onReachBottom() {
      if (this.list.length == this.total) {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
          duration: 1000,
        });
      } else {
        this.pageNum++;
        this.getlist();
      }
    },
    methods: {
      async getlist() {
        const res = await getinventory(this.params)
        this.list = res.data.items
        this.total = res.data.total
      },

      // 搜索
      async search() {
        this.getlist(this.params)
      },
      change(e) {
        this.id = e
      },
      doList(e) {
        this.list.forEach(i => {
          if (i.inventoryId == e) {
            this.obj = encodeURIComponent(JSON.stringify(i))
          }
        })
        this.obj1 = encodeURIComponent(JSON.stringify(this.obj1))
        uni.navigateTo({
          url: '/pages/editLoss/editLoss?obj=' + this.obj + '&obj1=' + this.obj1 +
            `&index=` +
            this.index
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .uni-input-wrapper .uni-input-placeholder {}


  .topserchbox {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
    height: 1100upx;
  }

  .dowcon .ul {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dowcon .ul .li {
    height: 750upx;
    width: 686upx;
    border-radius: 20upx;
    padding: 32upx;
    box-sizing: border-box;
    background-color: white;
    margin-top: 24upx;
    /* margin-bottom: 88upx; */
  }

  .dowcontitle {
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    /* color: #999999; */
    /* font-size: 24upx; */

    .state {
      width: 60upx;
      height: 60upx;
      border-radius: 50%;
      background-color: #f1f1f1;
      margin-right: 20upx;
      /* margin-bottom: 10upx; */
    }
  }

  .dowcontitle text {
    color: #333333;
    font-size: 32upx;

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
    width: 460upx;
    margin-left: 160upx;
    display: flex;
    justify-content: flex-end;
    margin-top: 28upx;
  }

  .libtnbox button {
    background-color: #F5F7FB;
    border-radius: 50upx;
    color: #007DFF;
    border: none;
    outline: none;
    font-size: 28upx;
    margin: 0;
    height: 70upx;
    width: 140upx;
    line-height: 70upx;
    margin-left: 20upx;
  }

  .modal {
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

  /*  .modal .modal-content .modal-header {
   width: 400upx;
   background-color: white;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10upx;
 } */

  .modal .modal-content {
    width: 616upx;
    height: 490upx;
    background-color: white;
    border-radius: 30upx;
    position: relative;

    .exclamation {
      width: 88upx;
      height: 88upx;
      background-color: #ffb200;
      color: white;
      border-radius: 50%;
    }
  }

  .modal .modal-content .modal-body {
    display: flex;
    /* padding: 20upx; */
    padding-top: 20upx;
    padding-left: 20upx;
    padding-bottom: 43upx;
  }

  .modal .modal-content .modal-footer {
    // background-color: #eeeeee;
    position: absolute;
    bottom: 50upx;
    padding: 10upx;
    display: flex;
  }

  .modal .modal-content .modal-footer button {
    border: none;
    width: 260upx;
    height: 88upx;
    // margin-left: 40upx;
    // border-radius: 5upx;
    text-align: center;
  }

  /* 
	.modal .modal-content .modal-footer button {
	  border: none;
	  padding: 10rpx 20rpx;
	  margin-left: 10rpx;
	  border-radius: 5rpx;
	  cursor: pointer;
	} 
	
	.modal .modal-content .modal-footer button:first-child {
	  background-color: #337ab7;
	  color: #ffffff;
	}
	.modal .modal-content .modal-footer button:last-child {
	  background-color: #dddddd;
	  color: #333333;
	} */

  /deep/ .input-placeholder {
    width: 100%;
    height: 72upx;
    text-align: center;
    line-height: 72upx;
  }


  .add {
    position: fixed;
    bottom: 144upx;
    right: 32upx;
  }

  .add button {

    width: 88upx;
    height: 88upx;
    border-radius: 50%;
    background-color: #006bff;
    color: #ffffff;
    font-size: 70upx;
  }

  .bottom {
    height: 148upx;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    padding-top: 30upx;

  }
</style>