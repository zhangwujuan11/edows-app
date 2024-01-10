<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>往来客户</view>
        <view class="flex" @click="open(0)">
          <view class="input" v-if="customer">{{ customer }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>业务门店</view>
        <view class="flex" @click="open(1)">
          <view class="input" v-if="storeName">{{ storeName }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>

      <view class="row-select">
        <view class="label"><text class="symbol">*</text>业务员</view>
        <view class="flex" @click="open(4)">
          <view class="input" v-if="constructionWork">{{ constructionWork }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">车牌号</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.plateNumber" />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>配送方式</view>
        <view class="flex" @click="open(2)">
          <view class="input" v-if="delivery">{{delivery }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>结算方式</view>
        <view class="flex" @click="open(3)">
          <view class="input" v-if="paymentTerms">{{paymentTerms }}</view>
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

      <view style="margin-bottom: 30upx;" v-for="(item, index) in params.detailList" :key="index">
        <view class="title">
          <view class="title-left">
            <view class="line"></view>
            <view class="title-label">产品{{index+1}}</view>
          </view>
          <image class="icon" src="/static/reduce.png" v-show="params.detailList.length>1" @click="del(index)"></image>
        </view>
        <view class="row-select" style="background-color: white;">
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
          <uni-forms-item name="quantity" style="margin: 0;">
            <view class="row">
              <view class="label"><text class="symbol">*</text>数量</view>
              <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.quantity"
                type="digit" />
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
          <view class="money">{{num(index) |decimalFormat}}</view>
        </view>
        <view class="row">
          <view class="label">备注</view>
          <textarea class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.remark"
            auto-height />
        </view>
      </view>

    </view>
    <view class="bottom" style="display: flex;">
      <view class="btn" style="height: 88upx; width: 335upx;" @click="Return1">暂存</view>
      <view class="btn" style="height: 88upx; width: 335upx;" @click="Return">确认</view>
    </view>

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

    <uni-popup ref="product" type="bottom">
      <view class="product">
        <view class="header">
          <view class="title">请选择产品
            <image @click="closeProduct" class="fork" src="/static/close.png"></image>
          </view>
        </view>
        <scroll-view class="content" scroll-y="true" @scrolltolower="scrolltolowerFun"
          v-if="productList&&productList.length > 0">
          <view class="card" v-for="(item, index) of productList" :key="index">
            <view class="crow">
              <image v-if="item.outWarehouseDelId==outWarehouseDelId" @click="choice(item, index)" class="check"
                src="/static/check.png"></image>
              <view v-else @click="choice(item, index)" class="spacecheck"></view>
              <view class="name" style=" height: 60upx; width: 540upx;     white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; padding-top: 10upx;">{{ item.customer }}</view>
            </view>
            <view class="main">
              <view class="flex-row">
                <view class="label">库位</view>
                <view class="val">{{ item.positionCode }}</view>
              </view>
              <view class="flex-row">
                <view class="label">产品名称</view>
                <view class="val">{{ item.productName }}</view>
              </view>
              <view class="flex-row">
                <view class="label">数量</view>
                <view class="val">{{ item.usableQuantity }}</view>
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
    addoutWarehouseReturn
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
        customer: '',
        storeName: '',
        delivery: '',
        paymentTerms: '',
        constructionWork: '',
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
          detailList: [{}]
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
        item: {},
        title: '',
        index1: '',
        aa: false,
        Number: 0,
        // 校验规则
        rules: {
          quantity: {
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
          price: {
            rules: [{
              required: true,
              errorMessage: '请输入单价"'
            }]
          },
        },
      };
    },
    filters: {
      decimalFormat(value) {
        return value.toFixed(2);
      }
    },
    async onLoad() {
      const data11 = await getcustomer(this.params)
      if (data11.data.items) {
        this.customer = data11.data.items[0].name
        this.params.customer = this.customer
        this.params.customerId = data11.data.items[0].customerId
      }
      const data12 = await getwarehouse(this.params)
      if (data12.data.items) {
        this.storeName = data12.data.items[0].warehouseName
        this.params.storeName = this.storeName
        this.params.storeId = data12.data.items[0].warehouseId
      }
    },
    computed: {
      num(i) {
        return function(i) {
          if (this.params.detailList[i].price != undefined && this.params.detailList[i].quantity != undefined) {
            this.params.detailList[i].num = this.params.detailList[i].quantity * this.params.detailList[i].price
            this.params.detailList[i].totalPrice = this.params.detailList[i].num
            return this.params.detailList[i].num
          } else {
            return this.params.detailList[i].num = 0
          }
        }
      }
    },
    onBackPress(event) {
      if (event.from == "navigateBack") {
        const pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage = prevPage.$vm;
        if (prevPage && prevPage.getList) {
          if (prevPage.list == null) {
            prevPage.getList(1, 1);
          } else {
            prevPage.getList(1, prevPage.list.length + 1);
          }
        }
      }
    },
    methods: {
      bindTextAreaBlur(e) {
        this.params.remark = e.detail.value
      },
      a(e) {
        this.index1 = e
      },
      bindTextAreaBlur1(e) {
        this.params.detailList[this.index1].remark = e.detail.value
      },
      async open(e) {
        this.selectIndex = 0
        this.selectList = []
        this.selectList1 = []

        switch (e) {
          case 0:
            this.title = '请选择往来客户'
            const data = await getcustomer(this.params)
            if (data.data.items) {
              data.data.items.forEach(i => {
                this.selectList.push(i.name)
                this.selectList1.push(i.customerId)
              })
            } else {
              uni.showToast({
                title: "没有数据",
                icon: "none",
                duration: 1000,
              });
            }
            break;
          case 1:
            this.title = '请选择业务门店'
            const data1 = await getwarehouse(this.params)
            if (data1.data.items) {
              data1.data.items.forEach(i => {
                this.selectList.push(i.warehouseName)
                this.selectList1.push(i.warehouseId)
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
            this.title = '请选择配送方式'
            const data2 = await getdelivery(this.params)
            if (data2.data) {
              data2.data.forEach(i => {
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
          case 3:
            this.title = '请选择结算方式'
            const data4 = await getpaymentTerms(this.params)
            if (data4.data) {
              data4.data.forEach(i => {
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
          case 4:
            this.title = '请选择业务员'
            const data3 = await getwen(this.params)
            if (data3.rows) {
              data3.rows.forEach(i => {
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
        }
        this.$refs.popup.open();
        this.openIndex = e;
      },
      // 上滑刷新
      async scrolltolowerFun() {
        this.params1.pageNum = this.params1.pageNum + 1
        this.params1.storeId = this.params.storeId
        this.params1.customerId = this.params.customerId
        const res7 = await getBound(this.params1)
        console.log(res7)
        if (res7.data.items.length != 0) {
          res7.data.items.forEach(i => {
            this.productList.push(i)
          })
        } else {
          this.aa = true
          return
        }
      },
      clear() {
        this.params.detailList = [{
          quantity: '',
          price: '',
          remark: ''
        }]
      },
      // 增加产品
      add() {
        this.params.detailList.push({})
        this.Number++
      },
      // 删除产品
      del(e) {
        if (this.params.detailList.length > 1) {
          let arr = this.params.detailList.filter((ele, index) => {
            return index !== e
          })
          this.params.detailList = arr
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
            this.customer = this.selectList[this.selectIndex];
            if (this.params.customer != this.customer) {
              this.clear()
            }
            this.params.customer = this.customer
            this.params.customerId = this.selectList1[this.selectIndex];
            break;
          case 1:
            this.storeName = this.selectList[this.selectIndex];
            if (this.params.storeName != this.storeName) {
              this.clear()
            }
            this.params.storeName = this.storeName
            this.params.storeId = this.selectList1[this.selectIndex];
            break;
          case 2:
            this.delivery = this.selectList[this.selectIndex];
            this.params.delivery = this.selectList[this.selectIndex];
            if (this.params.delivery == '自提') {
              this.params.delivery = 0
            } else if (this.params.delivery == '送货') {
              this.params.delivery = 1
            } else if (this.params.delivery == '物流代收') {
              this.params.delivery = 2
            } else {
              this.params.delivery = 3
            }
            break;
          case 3:
            this.paymentTerms = this.selectList[this.selectIndex];
            this.params.paymentTerms = this.selectList[this.selectIndex];
            if (this.params.paymentTerms == '现金付款') {
              this.params.paymentTerms = 1
            } else if (this.params.paymentTerms == '银行转账') {
              this.params.paymentTerms = 2
            } else if (this.params.paymentTerms == '微信') {
              this.params.paymentTerms = 3
            } else {
              this.params.paymentTerms = 0
            }
            break;
          case 4:
            this.constructionWork = this.selectList[this.selectIndex];
            this.params.constructionWork = this.constructionWork
            this.params.constructionWorkId = this.selectList1[this.selectIndex];
            break;
        }
        this.$refs.popup.close();
      },
      async Return() {
        this.params.type = 5
        this.params.status = 1
        this.params.orderType = 1
        if (this.params.constructionWork == undefined) {
          return uni.showToast({
            title: "请选择业务员",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.delivery == undefined) {
          return uni.showToast({
            title: "请选择配送方式",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.paymentTerms == undefined) {
          return uni.showToast({
            title: "请选择结算方式",
            icon: "none",
            duration: 1000,
          });
        } else {
          for (let i = 0; i <= this.Number; i++) {
            this.$refs.form[i].validate().then(async res66 => {
              const res1 = await addoutWarehouseReturn(this.params)
              if (res1.code == 200) {
                uni.showToast({
                  title: "新增成功",
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
        }
      },
      async Return1() {
        this.params.type = 5
        this.params.status = 0
        this.params.orderType = 1
        if (this.params.constructionWork == undefined) {
          return uni.showToast({
            title: "请选择业务员",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.delivery == undefined) {
          return uni.showToast({
            title: "请选择配送方式",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.paymentTerms == undefined) {
          return uni.showToast({
            title: "请选择结算方式",
            icon: "none",
            duration: 1000,
          });
        } else {
          for (let i = 0; i <= this.Number; i++) {
            this.$refs.form[i].validate().then(async res66 => {
              const res1 = await addoutWarehouseReturn(this.params)
              if (res1.code == 200) {
                uni.showToast({
                  title: "暂存成功",
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
        }
      },
      bindChange(e) {
        this.selectIndex = e.detail.value[0];
      },
      async openProduct(e) {
        this.outWarehouseDelId = ''
        this.index = e
        this.params.pageNum = 1
        this.params.pageSize = 20
        const res = await getBound(this.params)
        if (res.data.items != null) {
          this.productList = res.data.items
        }
        this.$refs.product.open();
      },
      closeProduct() {
        this.$refs.product.close();
      },
      choice(item) {
        this.outWarehouseDelId = item.outWarehouseDelId
        this.item = item
      },
      join() {
        if (this.outWarehouseDelId == '') {
          return uni.showToast({
            title: '请选择产品',
            icon: "none",
            duration: 1000,
          })
        }
        for (let i = 0; i < this.params.detailList.length; i++) {
          if (this.params.detailList[i].outWarehouseDelId == this.item.outWarehouseDelId) {
            return uni.showToast({
              title: '不能添加相同的产品',
              icon: "none",
              duration: 1000,
            })
          }
        }
        this.$set(this.params.detailList[this.index], 'inventoryId', this.item.inventoryId)
        this.$set(this.params.detailList[this.index], 'outWarehouseDelId', this.item.outWarehouseDelId)
        this.$set(this.params.detailList[this.index], 'positionCode', this.item.positionCode)
        this.$set(this.params.detailList[this.index], 'productName', this.item.productName)
        this.$set(this.params.detailList[this.index], 'productId', this.item.productId)
        this.$set(this.params.detailList[this.index], 'usableQuantity', this.item.usableQuantity)
        this.$set(this.params.detailList[this.index], 'price', this.item.price)
        this.$refs.product.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    min-height: 840rpx;
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
      height: 100rpx;
      background: #ffffff;
      border-radius: 0rpx 0rpx 0rpx 0rpx;

      .search {
        width: 686rpx;
        height: 72rpx;
        background: #f1f1f1;
        margin: 0 auto;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        position: relative;
        top: 90rpx;
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
      height: 1080rpx;
      background: #f1f1f1;
      padding: 24rpx 32rpx 24rpx 32rpx;
      overflow-y: auto;
      padding-bottom: 148rpx;
    }

    .card {
      width: 686rpx;
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