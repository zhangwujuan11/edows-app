<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>门店</view>
        <view class="flex" @click="open(0)">
          <view class="input" v-if="outWarehouseName">{{ outWarehouseName }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>业务员</view>
        <view class="flex" @click="open(2)">
          <view class="input" v-if="agentUser">{{ agentUser }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">备注</view>
        <textarea class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.remark"
          auto-height />
      </view>
    </view>

    <view class="main">
      <view class="add">
        <view class="left">
          <image class="icon" src="/static/smalladd.png" @click="add"></image>
          <view class="add-font">添加产品</view>
        </view>
        <image class="icon" src="/static/clear.png" @click="clear"></image>
      </view>
      <view style="margin-bottom: 30upx;" v-for="(item, index) in params.storeInWarehouseDetailBoList" :key="index">
        <view class="title">
          <view class="title-left">
            <view class="line"></view>
            <view class="title-label">产品{{index+1}}</view>
          </view>
          <image class="icon" src="/static/reduce.png" v-show="params.storeInWarehouseDetailBoList.length>1"
            @click="del(index)">
          </image>
        </view>
        <view class="row-select" style="background-color: #fff;">
          <view class="label"><text class="symbol">*</text>产品名称</view>
          <view class="flex" @click="openProduct(index)">
            <view class="input" v-if="item.productName" style="  margin-right: 6rpx;
        width: 510rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        text-align: right;">{{ item.productName }}</view>
            <view v-else class="sel">请选择</view>
            <image class="expand" src="/static/mine/to.png"></image>
          </view>
        </view>

        <uni-forms ref="form" :modelValue="item" :rules="rules">
          <uni-forms-item name="receivalQuantity" style="margin: 0;">
            <view class="row">
              <view class="label"><text class="symbol">*</text>数量</view>
              <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.receivalQuantity"
                type="digit" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="position" style="margin: 0;">
            <view class="row">
              <view class="label"><text class="symbol">*</text>库位</view>
              <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.position" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="price" style="margin: 0;">
            <view class="row">
              <view class="label"><text class="symbol">*</text>单价</view>
              <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.price"
                type="digit" />
            </view>
          </uni-forms-item>
        </uni-forms>

        <view class="row" style="background: #f6f6f8">
          <view class="label">金额</view>
          <view>
            <text style="color: #b3b5c4;">{{num(index)|decimalFormat}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn" @click="Return">确认</view>
    </view>


    <uni-popup ref="product" type="bottom">
      <view class="product">
        <view class="header">
          <view class="title">请选择产品
            <image @click="closeProduct" class="fork" src="/static/close.png"></image>
          </view>

          <view class="search">
            <input v-model="params2.carg" class="uni-input" placeholder-class="placeholder" placeholder="请输入carg码" />
            <input v-model="params2.productName" class="uni-input" placeholder-class="placeholder"
              placeholder="请输入产品名称" />
            <input v-model="params2.pinyin" class="uni-input" placeholder-class="placeholder" placeholder="请输入拼音" />
          </view>
          <view class="search1">
            <view class="flex" @click="open(3)">
              <view class="input" v-if="classification" style="font-size: 24upx;color: black;">{{ classification }}
              </view>
              <view v-else class="sel" style="font-size: 24upx;color: #999999;">请选择</view>
              <image class="expand" src="/static/bottom.png"></image>
            </view>
            <view class="flex1" style="background-color: #009cff;margin-left: 33upx;" @click="search1">
              <image src="@/static/white_search.png"
                style="width: 32upx; height: 32upx; background-color: #009cff;margin-right: 12rpx;margin-top: 5upx;">
              </image>
              搜索
            </view>
            <view class="flex1" style="background-color: #e5e5e5;margin-left: 33upx;color: black;" @click="reset">
              <image src="/static/clear.png"
                style="width: 32upx; height: 32upx; background-color: #e5e5e5;margin-right: 12rpx;margin-top: 5upx; ">
              </image>
              重置
            </view>
          </view>

        </view>
        <scroll-view class="content" scroll-y="true" @scrolltolower="scrolltolowerFun"
          v-if="productList&&productList.length > 0">
          <view class="card" v-for="(item, index) of productList" :key="index">
            <view class="crow">
              <image v-if="item.inventoryId==inventoryId" @click="choice(item, index)" class="check"
                src="/static/check.png"></image>
              <view v-else @click="choice(item, index)" class="spacecheck"></view>
              <view class="name" style=" height: 60upx; width: 540upx;     white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; padding-top: 10upx;">{{ item.productName }}</view>
            </view>
            <view class="main">
              <view class="flex-row">
                <view class="label">carg</view>
                <view class="val">{{ item.carg }}</view>
              </view>
              <view class="flex-row">
                <view class="label">库位名称</view>
                <view class="val">{{ item.positionCode }}</view>
              </view>
              <view class="flex-row">
                <view class="label">库存</view>
                <view class="val">{{ item.usableQuantity }}</view>
              </view>
              <view class="flex-row">
                <view class="label">分类</view>
                <view class="val">{{ item.classify }}</view>
              </view>
              <view class="flex-row">
                <view class="label">门店编码</view>
                <view class="val">{{ item.vendorCode }}</view>
              </view>
              <view class="flex-row">
                <view class="label">门店名字</view>
                <view class="val">{{ item.warehouseName }}</view>
              </view>
              <view class="flex-row">
                <view class="label">供应商编码</view>
                <view class="val">{{ item.warehouseCode }}</view>
              </view>
              <view class="flex-row">
                <view class="label">供应商名称</view>
                <view class="val">{{ item.vendorName }}</view>
              </view>
              <view class="flex-row">
                <view class="label">单价</view>
                <view class="val">{{ item.price }}</view>
              </view>
            </view>
          </view>
          <view v-show="aa" style="text-align: center; width: 100%;margin-top: 50rpx;padding-bottom: 50rpx;">没有更多数据了
          </view>
        </scroll-view>
        <view class="content" v-else>
          <view class="no-have">
            <image src="@/static/16701.png"></image>
            <text>暂无数据</text>
          </view>
        </view>
        <view class="bottom">
          <view class="btn" @click="join()">加入清单</view>
        </view>
      </view>
    </uni-popup>


    <uni-popup ref="popup" type="bottom">
      <view class="mask">
        <view class="mask-row">
          <view class="close" @click="cancel">取消</view>
          <view style="margin-top: 15upx;">
            {{title}}
          </view>
          <view class="success" @click="success">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in selectList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import {
    getcustomer,
    getwarehouse,
    getdelivery,
    getpaymentTerms,
    getwen,
    getBound,
    addoutWarehouseReturn,

    getTransferStocks,
    delTransferStocks,
    detailTransferStocks,
    AuditTransferStocks,
    addTransferStocks,
    editTransferStocks,
    getinventory,

    addbenefit,
    getclassification,
    editbenefit,
    detailinWarehouses
  } from "@/Api/ww.js"
  import {
    log
  } from "util";
  import {
    computed
  } from "vue";
  export default {
    components: {
      uniPopup: uniPopup,
    },
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        store: '',
        outWarehouseDelId: '',
        outWarehouseName: '',
        inWarehouseName: '',
        orderType: '',
        paymentTerms: '',
        agentUser: '',
        value: [0],
        selectList: [],
        selectList1: [],
        selectIndex: 0,
        openIndex: null,
        product: [{}, {}],
        productList: [],
        searchValue: "",
        params: {
          pageNum: 1,
          pageSize: 20,
          storeInWarehouseDetailBoList: [{}]
        },
        index: '',
        params1: {
          pageNum: 1,
          pageSize: 20,
        },
        params2: {
          pageNum: 1,
          pageSize: 20,
        },
        params3: {
          pageNum: 1,
          pageSize: 20,
        },
        item: {},
        array: ["移库", "调拨"],
        selectList2: [],
        inventoryId: '',
        warehouseId: '',
        classification: '',
        title: '',
        aa: false,
        Number: 0,
        // 校验规则
        rules: {
          receivalQuantity: {
            rules: [{
                required: true,
                errorMessage: '请输入正确数量'
              },
              {
                pattern: /^[1-9]\d*$/,
                errorMessage: '请输入大于零的整数'
              }
            ]
          },
          position: {
            rules: [{
              required: true,
              errorMessage: '请输入库位"'
            }]
          },
          price: {
            rules: [{
              required: true,
              errorMessage: '请输入单价"'
            }]
          },
        },
      };
    },
    computed: {
      num(i) {
        return function(i) {
          if (this.params.storeInWarehouseDetailBoList[i].price != undefined && this.params
            .storeInWarehouseDetailBoList[i].receivalQuantity != undefined) {
            this.params.storeInWarehouseDetailBoList[i].num = this.params.storeInWarehouseDetailBoList[i]
              .receivalQuantity *
              this.params.storeInWarehouseDetailBoList[i].price
            this.params.storeInWarehouseDetailBoList[i].num
            return this.params.storeInWarehouseDetailBoList[i].num
          } else {
            return this.params.storeInWarehouseDetailBoList[i].num = 0
          }
        }
      }
    },
    filters: {
      decimalFormat(value) {
        return value.toFixed(2);
      }
    },
    onBackPress(event) {
      if (event.from == "navigateBack") {
        const pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage = prevPage.$vm;
        if (prevPage && prevPage.getList) {
          prevPage.getList(1, prevPage.list.length + 1);
        }
      }
    },
    async onLoad(e) {
      const data9 = await detailinWarehouses(e.id)
      this.params = data9.data
      this.outWarehouseName = this.params.warehouseName
      this.agentUser = this.params.constructionWork
      this.params1.warehouseId = data9.data.warehouseId
      this.warehouseId = data9.data.warehouseId
    },
    methods: {
      async open(e) {
        this.selectIndex = 0
        this.selectList = []
        this.selectList1 = []
        this.selectList2 = []
        switch (e) {
          case 0:
            this.title = '请选择门店'
            const data1 = await getwarehouse(this.params3)
            if (data1.data.items) {
              data1.data.items.forEach(i => {
                this.selectList.push(i.warehouseName)
                this.selectList1.push(i.warehouseId)
                this.selectList2.push(i.warehouseCode)
              })
            } else {
              uni.showToast({
                title: "没有数据",
                icon: "none",
                duration: 1000,
              });
            }
            break;
          case 2:
            this.title = '请选择业务员'
            const data2 = await getwen(this.params3)
            if (data2.rows) {
              data2.rows.forEach(i => {
                this.selectList.push(i.userName)
                this.selectList1.push(i.userId)
              })
            } else {
              uni.showToast({
                title: "没有数据",
                icon: "none",
                duration: 1000,
              });
            }
            break;
          case 3:
            this.title = '请选择分类'
            const data3 = await getclassification(this.params3)
            if (data3.data) {
              data3.data.forEach(i => {
                this.selectList.push(i.dictLabel)
              })
            } else {
              uni.showToast({
                title: "没有数据",
                icon: "none",
                duration: 1000,
              });
            }
            break;
        }
        this.$refs.popup.open();
        this.openIndex = e;
      },
      bindTextAreaBlur(e) {
        this.params.remark = e.detail.value
      },
      async reset() {
        this.classification = ''
        this.productList = []
        let parems4 = {
          pageNum: 1,
          pageSize: 20
        }
        parems4.warehouseId = this.params2.warehouseId
        this.params2 = {
          pageNum: 1,
          pageSize: 20,
          warehouseId: parems4.warehouseId,
          carg: '',
          productName: '',
          pinyin: ''
        }
        const res88 = await getinventory(parems4)
        if (res88.data.items != null) {
          this.productList = res88.data.items
        }
        this.aa = false
      },
      // 上滑刷新
      async scrolltolowerFun() {
        this.params2.pageNum = this.params2.pageNum + 1
        const res7 = await getinventory(this.params2)
        if (res7.data.items != null) {
          res7.data.items.forEach(i => {
            this.productList.push(i)
          })
        } else {
          this.aa = true
          return
        }
      },
      // 增加产品
      add() {
        this.params.storeInWarehouseDetailBoList.push({})
        this.Number++
      },
      // 删除产品
      del(e) {
        if (this.params.storeInWarehouseDetailBoList.length > 1) {
          let arr = this.params.storeInWarehouseDetailBoList.filter((ele, index) => {
            return index !== e
          })
          this.params.storeInWarehouseDetailBoList = arr
        }
        if (this.Number > 0) {
          this.Number--
        }
      },
      cancel() {
        this.$refs.popup.close();
      },
      success() {
        switch (this.openIndex) {
          case 0:
            this.outWarehouseName = this.selectList[this.selectIndex];
            if (this.params.warehouseName != this.outWarehouseName) {
              this.clear()
            }
            this.params.warehouseName = this.outWarehouseName
            this.params.warehouseId = this.selectList1[this.selectIndex];
            this.params1.warehouseId = this.selectList1[this.selectIndex];
            this.warehouseId = this.selectList1[this.selectIndex];
            this.params.warehouseCode = this.selectList2[this.selectIndex];
            break;
          case 2:
            this.agentUser = this.selectList[this.selectIndex];
            this.params.constructionWork = this.agentUser
            this.params.constructionWorkId = this.selectList1[this.selectIndex];
            break;
          case 3:
            this.classification = this.selectList[this.selectIndex];
            this.params2.classify = this.classification
            break;
        }
        this.$refs.popup.close();
      },
      clear() {
        this.params.storeInWarehouseDetailBoList = [{
          receivalQuantity: '',
          position: '',
          price: ''
        }]
      },
      async Return() {
        this.params.orderCategory = 3
        this.params.status = 1
        if (!this.params.constructionWork) {
          return uni.showToast({
            title: "请选择业务员",
            icon: "none",
            duration: 1000,
          });
        }
        let id = this.params.storeInWarehouseDetailBoList.map(item => item.position)
        let idSet = new Set(id)
        if (idSet.size != id.length) {
          return uni.showToast({
            title: "产品库位重复",
            icon: "none",
            duration: 1000,
          });
        }
        for (let i = 0; i <= this.Number; i++) {
          this.$refs.form[i].validate().then(async res66 => {
            const res1 = await editbenefit(this.params)
            if (res1.code == 200) {
              uni.showToast({
                title: "修改成功",
                icon: "none",
                duration: 1000,
              });
              setTimeout(() => {
                uni.navigateBack({
                  data: 1
                })
              }, 1000)
            }
          })
        }
      },
      async search1() {
        this.productList = []
        const data7 = await getinventory(this.params2)
        if (data7.data.items != null) {
          this.productList = data7.data.items
        } else {
          uni.showToast({
            title: "没有数据",
            icon: "none",
            duration: 1000,
          });
          return
        }
      },
      bindChange(e) {
        this.selectIndex = e.detail.value[0];
      },
      async openProduct(e) {
        this.inventoryId = ''
        this.index = e
        this.params2.pageNum = 1
        this.params2.pageSize = 20
        this.params2.warehouseId = this.params1.warehouseId
        const res = await getinventory(this.params2)
        if (res.data.items != null) {
          this.productList = res.data.items
        }
        this.$refs.product.open();
      },
      closeProduct() {
        this.$refs.product.close();
      },
      choice(item) {
        this.inventoryId = item.inventoryId
        this.item = item
      },
      join() {
        if (this.inventoryId == '') {
          return uni.showToast({
            title: '请选择产品',
            icon: "none",
            duration: 1000,
          })
        }
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'inventoryId', this.item.inventoryId)
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'position', this.item.positionCode)
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'productName', this.item.productName)
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'productId', this.item.productId)
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'receivalQuantity', this.item.usableQuantity)
        this.$set(this.params.storeInWarehouseDetailBoList[this.index], 'price', this.item.price)
        this.$refs.product.close();
      },

    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    min-height: 360rpx;
    background: #ffffff;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin-top: 24rpx;
  }

  .row-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 37rpx 31rpx 37rpx 31rpx;
    width: 750rpx;
    height: 120rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;

    .label {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #010914;
    }

    .symbol {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #df0000;
      margin-right: 6rpx;
    }

    .expand {
      width: 16rpx;
      height: 24rpx;
      vertical-align: middle;
    }

    .sel {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #b4b5bf;
      margin-right: 20rpx;
    }

    .flex {
      display: flex;
      align-items: center;
    }

    .input {
      margin-right: 6rpx;
    }
  }

  .picker-view {
    width: 750rpx;
    height: 500rpx;
  }

  .item {
    line-height: 100rpx;
    text-align: center;
  }

  .mask {
    background-color: #ffffff;

    .mask-row {
      display: flex;
      justify-content: space-between;
      padding: 36rpx 32rpx 0px 32rpx;
    }

    .success {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      color: #007dff;
    }

    .close {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 37rpx 32rpx 37rpx 32rpx;
    width: 750rpx;
    min-height: 118rpx;
    background: #ffffff;

    .money {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #b4b5bf;
    }

    .label {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #010914;
    }

    .uni-input {
      text-align: right;
    }

    .placeholder {
      font-size: 32rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #b4b5bf;
    }

    .symbol {
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #df0000;
      vertical-align: middle;
      margin-right: 4rpx;
    }
  }

  .expand {
    width: 28rpx;
    height: 28rpx;
  }

  .expand-top {
    width: 24rpx;
    height: 15rpx;
  }

  .main {
    margin-top: 24rpx;
    background: #fcfbfc;

    .icon {
      width: 40rpx;
      height: 40rpx;
    }

    .left {
      display: flex;
    }

    .add {
      height: 120rpx;
      padding: 37rpx 31rpx 37rpx 31rpx;
      display: flex;
      justify-content: space-between;
    }

    .add-font {
      font-size: 29rpx;
      font-family: SourceHanSansCN-Medium-, SourceHanSansCN-Medium;
      font-weight: normal;
      color: #1862f5;
      margin-left: 9rpx;
    }

    .title {
      padding: 37rpx 31rpx 37rpx 31rpx;
      height: 120rpx;
      background: linear-gradient(90deg, #f5f8ff 0%, #ffffff 100%);
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      display: flex;
      justify-content: space-between;
    }

    .line {
      width: 8rpx;
      height: 28rpx;
      background: #1862f5;
      border-radius: 4rpx 4rpx 4rpx 4rpx;
    }

    .title-left {
      display: flex;
      align-items: center;
    }

    .title-label {
      font-size: 29rpx;
      font-family: SourceHanSansCN-Medium-, SourceHanSansCN-Medium;
      font-weight: normal;
      color: #010914;
      margin-left: 16rpx;
    }
  }

  .bottom {
    position: fixed;
    bottom: 0rpx;
    width: 750rpx;
    height: 148rpx;
    background: #ffffff;
    box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }

  .btn {
    margin: 0 auto;
    width: 686rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: #007dff;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #ffffff;
  }

  .product {
    .header {
      width: 750rpx;
      height: 280rpx;
      background: #ffffff;
      border-radius: 0rpx 0rpx 0rpx 0rpx;

      .search {
        width: 686rpx;
        height: 72rpx;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
        top: 50rpx;

        .uni-input {
          width: 200rpx;
          height: 72rpx;
          background-color: #e5e5e5;
          border-radius: 40rpx;
          text-align: center;
        }
      }

      .search1 {
        width: 686rpx;
        height: 72rpx;
        margin: 0 auto;
        padding-left: 30upx;
        display: flex;
        // align-items: center;
        position: relative;
        top: 70rpx;

        .flex {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-left: 30upx;
          padding-right: 20upx;
          background-color: #e5e5e5;
          width: 200rpx;
          height: 72rpx;
          border-radius: 40rpx;
        }

        .flex1 {
          width: 200rpx;
          height: 72rpx;
          background: #007dff;
          border-radius: 36rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 28rpx;
        }
      }

      .left {
        display: flex;
        align-items: center;
      }

      .left-label {
        font-size: 24rpx;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #333333;
        margin-left: 32rpx;
      }

      .placeholder {
        font-size: 24rpx;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
      }

      .uni-input {
        margin-left: 32rpx;
      }

      .search-icon {
        width: 32rpx;
        height: 32rpx;
        position: absolute;
        right: 20rpx;
      }
    }

    .title {
      font-size: 36rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #303133;
      text-align: center;
      position: relative;
      top: 34rpx;
    }

    .fork {
      width: 64rpx;
      height: 64rpx;
      position: absolute;
      right: 32rpx;
      top: -10rpx;
    }

    .content {
      height: 980rpx;
      background: #f1f1f1;
      padding: 24rpx 32rpx 24rpx 32rpx;
      overflow-y: auto;
      padding-bottom: 148rpx;
    }

    .card {
      width: 686rpx;
      height: 660rpx;
      background: #ffffff;
      box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(178, 178, 178, 0.16);
      border-radius: 20rpx;
      margin-bottom: 24rpx;
      padding: 26rpx 32rpx 32rpx 32rpx;
    }

    .check {
      width: 60rpx;
      height: 60rpx;
    }

    .crow {
      display: flex;
      align-items: center;
    }

    .spacecheck {
      width: 60rpx;
      height: 60rpx;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }

    .name {
      margin-left: 20rpx;
      font-size: 32rpx;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 540rpx;
    }

    .main {
      width: 622rpx;
      height: 533rpx;
      background: #f5f7fb;
      margin-top: 20rpx;
      border-radius: 20rpx;
      padding: 28rpx 32rpx 28rpx 32rpx;
    }

    .flex-row {
      display: flex;
      margin-bottom: 24rpx;
    }

    .label {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
      width: 146rpx;
      height: 35rpx;
      line-height: 35rpx;
    }

    .val {
      font-size: 24rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #333333;
      margin-left: 34rpx;
    }

    .bottom {
      width: 750rpx;
      height: 148rpx;
      background: #ffffff;
      box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn {
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      background: #007dff;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      font-size: 28rpx;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #ffffff;
    }
  }

  .no-have {
    padding-top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /deep/ .msg--active {
    z-index: 999;
    padding: 0;
  }
</style>