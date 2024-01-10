<template>
  <view>
    <view class="top">
      <view class="model">
        <view class="Purchase" :style="{color:incolor}" @click="choose(2)">
          进货明细
        </view>
        <view class="Shipping" :style="{color:outcolor}" @click="choose(3)">
          出货明细
        </view>
      </view>
      <view class="date" style="margin-top: 30upx; padding-left: 30upx; padding-right: 30upx;">
        <view class="top-date">
          <uni-datetime-picker start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" :border="false" ref="date"
            type="daterange" @change="dateSelect">
            <template v-slot:icon>
              <image class="icon" src="/static/bottom.png"></image>
            </template>
          </uni-datetime-picker>
        </view>
      </view>
    </view>
    <view class="dowcon" v-show="params.status ==2">
      <view class="ul" v-if="list.length==0" style="padding-top: 30%;">
        <image src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
      <view class="ul" v-else>
        <view class="li" v-for="(item,index) in list" :key="index">
          <view class="dowcontitle">
            <view class="title">{{item.vendorName}}</view>
            <view class="state" style="width: 300upx;font-size: 24upx;padding-left: 30upx;">{{item.auditTime}}</view>
          </view>

          <view class="licon">
            <view class="liconceng">
              <text>原厂件号</text>
              <view>{{item.partNumber}}</view>
            </view>
            <view class="liconceng">
              <text>本厂编码</text>
              <view>{{item.factoryCode}}</view>
            </view>
            <view class="liconceng">
              <text>产品名称</text>
              <view>{{item.productName}}</view>
            </view>
            <view class="liconceng">
              <text>数量</text>
              <view>{{item.receivalQuantity}}</view>
            </view>
            <view class="liconceng">
              <text>单价</text>
              <view>{{item.price}}</view>
            </view>
            <view class="liconceng">
              <text>分类</text>
              <view>{{item.productManufacturer}}</view>
            </view>
            <view class="liconceng">
              <text>厂家</text>
              <view>{{item.productClassification}}</view>
            </view>
            <view class="liconceng">
              <text>库位</text>
              <view>{{item.position}}</view>
            </view>
            <view class="liconceng">
              <text>折率</text>
              <view>{{item.discountRate}}</view>
            </view>
            <view class="liconceng">
              <text>折后单价</text>
              <view>{{item.discountedUnitPrice}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="dowcon" v-show="params.status ==3">
      <view class="ul" v-if="list.length==0" style="padding-top: 30%;">
        <image src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
      <view class="ul" v-else>
        <view class="li" v-for="(item,index) in list" :key="index">
          <view class="dowcontitle">
            <view class="title">{{item.storeName}}</view>
            <view class="state" style="width: 300upx;font-size: 24upx;padding-left: 30upx;">{{item.auditTime}}</view>
          </view>

          <view class="licon">
            <view class="liconceng">
              <text>客户</text>
              <view>{{item.customer}}</view>
            </view>
            <view class="liconceng">
              <text>本厂编码</text>
              <view>{{item.factoryCode}}</view>
            </view>
            <view class="liconceng">
              <text>产品名称</text>
              <view>{{item.productName}}</view>
            </view>
            <view class="liconceng">
              <text>数量</text>
              <view>{{item.quantity}}</view>
            </view>
            <view class="liconceng">
              <text>单价</text>
              <view>{{item.price}}</view>
            </view>
            <view class="liconceng">
              <text>金额</text>
              <view>{{item.totalPrice}}</view>
            </view>
            <view class="liconceng">
              <text>车型</text>
              <view>{{item.motorcycleType}}</view>
            </view>
            <view class="liconceng">
              <text>库位</text>
              <view>{{item.positionCode}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getinWarehouseDetail,
    getoutWarehouseDetail
  } from "@/Api/ww.js"
  export default {
    data() {
      return {
        range: [],
        list: [],
        params: {
          pageNum: 1,
          pageSize: 10,
          status: 2
        },
        incolor: '#0880ff',
        outcolor: '',

      }
    },
    onLoad(e) {
      this.params.inventoryId = e.id
      this.getList()
    },
    onReachBottom() {
      if (this.list.length == this.total) {

      } else {
        this.params.pageNum++;
        this.getList();
      }
    },
    methods: {
      dateSelect(e) {
        this.params.startDate = e[0]
        this.params.endDate = e[1]
        this.pageNum = 1;
        this.list = [];
        this.getList();
      },
      choose(e) {
        this.params.status = e
        if (e == 2) {
          this.incolor = '#0880ff'
          this.outcolor = ''
          this.list = []
          this.getList()
        } else {
          this.incolor = ''
          this.outcolor = '#0880ff'
          this.list = []
          this.getList()
        }
      },
      getList(num, size) {
        this.params.pageNum = num ? num : this.params.pageNum
        this.params.pageSize = size ? size : this.params.pageSize

        uni.showLoading({
          title: "加载中",
        });
        if (this.params.status == 2) {
          getinWarehouseDetail(this.params).then((res) => {

            if (res.code == 200) {
              uni.hideLoading();
              this.list = size ?
                res.data.items : [...this.list, ...(res.data.items || [])];
              this.total = res.data.total;
            }
          });
        } else {
          getoutWarehouseDetail(this.params).then((res) => {
            if (res.code == 200) {
              uni.hideLoading();
              this.list = size ?
                res.data.items : [...this.list, ...(res.data.items || [])];
              this.total = res.data.total;
            }
          });
        }

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
      width: 400rpx;
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

  .top {
    width: 100%;
    height: 200upx;
    background-color: #fff;


    .model {
      display: flex;
      padding-top: 25upx;
    }

    .Purchase {
      font-size: 32upx;
      margin-left: 126upx;
      margin-right: 242upx;
    }

    .Shipping {
      font-size: 32upx;
    }
  }

  /deep/ .icon-calendar {
    display: none;
  }

  .top-date {
    margin-top: 24rpx;
  }

  .top-date ::v-deep .text-center {
    width: 316rpx;
    height: 66rpx;
    background: #f1f1f1;
    border-radius: 40rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .top-date ::v-deep .icon-calendar {
    display: none;
  }

  .icon {
    width: 28rpx;
    height: 28rpx;
    margin-left: 30upx;
  }
</style>