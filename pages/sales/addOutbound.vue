<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>门店</view>
        <view class="flex" @click="open(0)">
          <view class="input" v-if="storeName">{{ storeName }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>往来客户</view>
        <view class="flex" @click="open(1)">
          <view class="input" v-if="customer">{{ customer }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>车主姓名</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.carOwnerName" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>车型</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.vehicleModel" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>车牌号</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.plateNumber"
          type="digit" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>联系电话</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.phoneNumber"
          type="digit" />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>接车人员</view>
        <view class="flex" @click="open(2)">
          <view class="input" v-if="constructionWork">{{ constructionWork }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>配送方式</view>
        <view class="flex" @click="open(3)">
          <view class="input" v-if="delivery">{{ delivery }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>结算方式</view>
        <view class="flex" @click="open(4)">
          <view class="input" v-if="paymentTerms">{{ paymentTerms }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label">预约时间</view>
        <view class="flex">
          <uni-datetime-picker type="datetime" :clear-icon="true" v-model="estimatedDelivery
" @change="maskClick1" :start="startDate" :end="endDate">
            <view class="input" v-if="estimatedDelivery">{{ estimatedDelivery}}</view>
            <view v-else class="sel">请选择</view>
          </uni-datetime-picker>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label">价格方式</view>
        <view class="flex" @click="open(6)">
          <view class="input" v-if="priceMode">{{ priceMode }}</view>
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
    <view class="main" v-for="(item, index) in params.detailList" :key="index">
      <view class="add" v-if="index == 0">
        <view class="left">
          <image class="icon" src="/static/smalladd.png" @click="Addproduct"></image>
          <view class="add-font">添加产品</view>
        </view>
        <view class="scan" @click="chioceView">扫描产品编码</view>
        <image class="icon" src="/static/clear.png" @click="clear"></image>
      </view>
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
        <uni-forms-item style="margin: 0;">
          <view class="row" style="background: #f6f6f8">
            <view class="label">库位</view>
            <input class="uni-input" v-model="item.positionCode" :disabled="true" />
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
        <view class="money">{{num(index)|decimalFormat}}</view>
      </view>
      <view class="row">
        <view class="label">备注</view>
        <!-- <text>{{item.remark}}</text> -->
        <textarea class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.remark"
          auto-height />
      </view>
    </view>
    <view class="bottom" style="display: flex;">
      <view class="btn" style="height: 88upx; width: 335upx;" @click="add1">暂存</view>
      <view class="btn" style="height: 88upx; width: 335upx;" @click="add">确认</view>
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
          <view class="search">
            <input v-model="params2.carg" class="uni-input" placeholder-class="placeholder" placeholder="请输入carg码" />
            <input v-model="params2.productName" class="uni-input" placeholder-class="placeholder"
              placeholder="请输入产品名称" />
            <input v-model="params2.warehouseCode" class="uni-input" placeholder-class="placeholder"
              placeholder="请输入门店编码" />
          </view>
          <view class="search1">
            <input v-model="params2.pinyin" class="uni-input" placeholder-class="placeholder" placeholder="请输入拼音" />
            <view class="flex" style="background-color: #009cff;" @click="search1">
              <image src="@/static/white_search.png"
                style="width: 32upx; height: 32upx; background-color: #009cff;margin-right: 12rpx;margin-top: 5upx;">
              </image>
              搜索
            </view>
            <view class="flex" style="background-color: #e5e5e5;color: black;" @click="reset">
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
              <image v-if="item.inventoryId == inventoryId" @click="choice(item, index)" class="check"
                src="/static/check.png"></image>
              <view v-else @click="choice(item, index)" class="spacecheck"></view>
              <view class="name">{{ item.productName }}</view>
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
                <view class="val">{{ item.warehouseCode }}</view>
              </view>
              <view class="flex-row">
                <view class="label">门店名字</view>
                <view class="val">{{ item.warehouseName }}</view>
              </view>
              <view class="flex-row">
                <view class="label">供应商编码</view>
                <view class="val">{{ item.vendorCode }}</view>
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

    <view class="authority_mask" v-if="showMask">
      <view class="box">
        <view>相机权限使用说明：</view>
        <view>用于拍摄照片、扫码、上传图片等场景</view>
      </view>
    </view>  
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import {
    getwarehouse,
    getcustomer,
    getwen,
    getdelivery,
    getpaymentTerms,
    getpriceMode,
    addoutWarehouse,
    getinventory
  } from "@/Api/ww.js"
  export default {
    components: {
      uniPopup: uniPopup,
    },
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        store: "",
        supplier: "",
        value: [0],
        selectList: [],
        selectList1: [],
        storeName: '',
        selectIndex: 0,
        openIndex: null,
        product: [{}, {}],
        productList: [],
        searchValue: "",
        params: {
          detailList: [{}]
        },
        params1: {
          pageNum: 1,
          pageSize: 20,
        },
        params2: {
          pageNum: 1,
          pageSize: 20,
        },
        customer: '',
        constructionWork: '',
        delivery: '',
        paymentTerms: '',
        priceMode: '',
        inventoryId: '',
        startDate: '',
        endDate: '',
        item: {},
        title: '',
        index: '',
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
        estimatedDelivery: '',
        showMask: false
      };
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
    mounted() {
      const currentDate = new Date();
      this.startDate = uni.getSystemInfoSync().version >= 1.2 ? currentDate.getFullYear() + '-' + (currentDate
        .getMonth() + 1) + '-' + currentDate.getDate() : currentDate.toLocaleDateString();
    },
    async onLoad() {
      const data88 = await getwarehouse(this.params1)
      if (data88.data.items) {
        this.storeName = data88.data.items[0].warehouseName
        this.params.storeName = this.storeName
        this.params.storeId = data88.data.items[0].warehouseId
        this.params.warehouseId = data88.data.items[0].warehouseId
      }
    },
    filters: {
      decimalFormat(value) {
        return value.toFixed(2);
      }
    },
    methods: {
      bindTextAreaBlur(e) {
        this.params.remark = e.detail.value
      },
      a(e) {
        this.index = e
      },
      bindTextAreaBlur1(e) {
        this.params.detailList[this.index].remark = e.detail.value
      },
      async open(e) {
        this.selectIndex = 0
        this.selectList = []
        this.selectList1 = []
        switch (e) {
          case 0:
            this.title = '请选择门店'
            const data = await getwarehouse(this.params1)
            if (data.data.items) {
              data.data.items.forEach(i => {
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
          case 1:
            this.title = '请选择往来客户'
            const data1 = await getcustomer(this.params1)
            if (data1.data.items) {
              data1.data.items.forEach(i => {
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
          case 2:
            this.title = '请选择接车人员'
            const data4 = await getwen(this.params1)
            if (data4.rows) {
              data4.rows.forEach(i => {
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
            this.title = '请选择配送方式'
            const data3 = await getdelivery(this.params1)
            if (data3.data) {
              data3.data.forEach(i => {
                this.selectList.push(i.dictLabel)
                this.selectList1.push(i.dictValue)
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
            this.title = '请选择结算方式'
            const data5 = await getpaymentTerms(this.params1)
            if (data5.data) {
              data5.data.forEach(i => {
                this.selectList.push(i.dictLabel)
                this.selectList1.push(i.dictValue)
              })
            } else {
              uni.showToast({
                title: "没有数据",
                icon: "none",
                duration: 1000,
              });
            }
            break;
          case 5:
            break;
          case 6:
            this.title = '请选择价格方式'
            const data6 = await getpriceMode(this.params1)
            if (data6.data) {
              data6.data.forEach(i => {
                this.selectList.push(i.dictLabel)
                this.selectList1.push(i.dictValue)
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
      cancel() {
        this.$refs.popup.close();
      },
      success() {
        switch (this.openIndex) {
          case 0:
            this.storeName = this.selectList[this.selectIndex];
            if (this.params.storeName != this.storeName) {
              this.clear()
            }
            this.params.storeName = this.storeName
            this.params.storeId = this.selectList1[this.selectIndex];
            this.params.warehouseId = this.selectList1[this.selectIndex];
            break;
          case 1:
            this.customer = this.selectList[this.selectIndex];
            this.params.customer = this.customer
            this.params.customerId = this.selectList1[this.selectIndex];
            break;
          case 2:
            this.constructionWork = this.selectList[this.selectIndex];
            this.params.constructionWork = this.constructionWork
            this.params.constructionWorkId = this.selectList1[this.selectIndex];
            break;
          case 3:
            this.delivery = this.selectList[this.selectIndex];
            this.params.delivery = this.selectList1[this.selectIndex];
            break;
          case 4:
            this.paymentTerms = this.selectList[this.selectIndex];
            this.params.paymentTerms = this.selectList1[this.selectIndex];
            break;
          case 6:
            this.priceMode = this.selectList[this.selectIndex];
            this.params.priceMode = this.selectList[this.selectIndex];
            break;
        }
        this.$refs.popup.close();
      },
      bindChange(e) {
        this.selectIndex = e.detail.value[0];
      },
      async reset() {
        // this.classification = ''
        this.productList = []
        let parems4 = {
          pageNum: 1,
          pageSize: 20,
        }
        parems4.warehouseId = this.params2.warehouseId
        this.params2 = {
          pageNum: 1,
          pageSize: 20,
          warehouseId: parems4.warehouseId,
          carg: '',
          productName: '',
          pinyin: '',
          warehouseCode: ''
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
      async openProduct(e) {
        this.inventoryId = ''
        this.index = e
        this.params2.pageNum = 1
        this.params2.pageSize = 20
        this.params2.warehouseId = this.params.warehouseId
        this.params1.warehouseId = this.params.warehouseId
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
        for (let i = 0; i < this.params.detailList.length; i++) {
          if (this.params.detailList[i].inventoryId == this.item.inventoryId) {
            return uni.showToast({
              title: '不能添加相同的产品',
              icon: "none",
              duration: 1000,
            })
          }
        }
        this.$set(this.params.detailList[this.index], 'inventoryId', this.item.inventoryId)
        this.$set(this.params.detailList[this.index], 'positionCode', this.item.positionCode)
        this.$set(this.params.detailList[this.index], 'price', this.item.price)
        this.$set(this.params.detailList[this.index], 'productId', this.item.productId)
        this.$set(this.params.detailList[this.index], 'productName', this.item.productName)
        this.$set(this.params.detailList[this.index], 'quantity', this.item.usableQuantity)
        this.$set(this.params.detailList[this.index], 'remark', this.item.remark)
        this.$refs.product.close();
      },
      maskClick1(e) {},
      async add() {
        this.params.status = 1
        this.params.type = 1
        if (this.estimatedDelivery) {
          this.params.estimatedDelivery = new Date(this.estimatedDelivery).toISOString()
        }
        if (this.params.customer == undefined) {
          return uni.showToast({
            title: "请选择往来客户",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.carOwnerName == undefined) {
          return uni.showToast({
            title: "请输入车主姓名",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.vehicleModel == undefined) {
          return uni.showToast({
            title: "请输入车型",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.plateNumber == undefined) {
          return uni.showToast({
            title: "请输入车牌号",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.phoneNumber == undefined) {
          return uni.showToast({
            title: "请输入联系电话",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.constructionWork == undefined) {
          return uni.showToast({
            title: "请选择接车人员",
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
              const res1 = await addoutWarehouse(this.params)
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
      async add1() {
        this.params.status = 0
        this.params.type = 1
        if (this.estimatedDelivery) {
          this.params.estimatedDelivery = new Date(this.estimatedDelivery).toISOString()
        }
        if (this.params.customer == undefined) {
          return uni.showToast({
            title: "请选择往来客户",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.carOwnerName == undefined) {
          return uni.showToast({
            title: "请输入车主姓名",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.vehicleModel == undefined) {
          return uni.showToast({
            title: "请输入车型",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.plateNumber == undefined) {
          return uni.showToast({
            title: "请输入车牌号",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.phoneNumber == undefined) {
          return uni.showToast({
            title: "请输入联系电话",
            icon: "none",
            duration: 1000,
          });
        } else
        if (this.params.constructionWork == undefined) {
          return uni.showToast({
            title: "请选择接车人员",
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
              const res2 = await addoutWarehouse(this.params)
              if (res2.code == 200) {
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
      // 增加产品
      Addproduct() {
        this.params.detailList.push({})
        this.Number++
      },
      // 删除产品
      del(e) {
        if (this.params.detailList.length > 1) {
          let array = this.params.detailList.filter((ele, index) => {
            return index !== e
          })
          this.params.detailList = array
        }
        if (this.Number > 0) {
          this.Number--
        }
      },
      clear() {
        this.params.detailList = [{
          quantity: '',
          price: '',
          remark: '',
          positionCode: ''
        }]
      },
      chioceView() {
          var platform = uni.getSystemInfoSync().platform;
          if (platform == "android") {
            plus.android.checkPermission(
              "android.permission.CAMERA",
              (granted) => {
                if (granted.checkResult == -1) {
                  //弹出
                  this.showMask = true;
                }
              },
              (error) => {
                console.error("Error checking permission:", error.message);
              }
            );
            plus.android.requestPermissions(["android.permission.CAMERA"], (e) => {
              //关闭
              this.showMask = false;
              if (e.granted.length > 0) {
                this.scanCarg()
                //执行你有权限后的方法
              }
            });
          }else{
            this.scanCarg()
          }
        },
      scanCarg() {
        uni.scanCode({
          onlyFromCamera: true,
          scanType: ["barCode"],
          success: (res) => {
            let params = {
              carg: res.result,
              pageNum: 1,
              pageSize: 1,
              warehouseId: this.params.warehouseId,
            };
            getinventory(params).then((final) => {
              if (final.code == 200) {
                if (final.data.items && final.data.items.length > 0) {
                  for (var i = 0; i < this.params.detailList.length; i++) {
                    if (
                      this.params.detailList[i].productId == final.data.items[0].productId
                    ) {
                      return uni.showToast({
                        title: "不能添加相同的产品",
                        icon: "none",
                        duration: 1000,
                      });
                    }
                  }
                  var is_push = true;
                  for (var i = 0; i < this.params.detailList.length; i++) {
                    if (!this.params.detailList[i].productName) {
                      this.$set(
                        this.params.detailList[i],
                        "productName",
                        final.data.items[0].productName
                      );
                      this.$set(
                        this.params.detailList[i],
                        "productId",
                        final.data.items[0].productId
                      );
                      this.$set(
                        this.params.detailList[i],
                        "quantity",
                        final.data.items[0].usableQuantity
                      );
                      this.$set(
                        this.params.detailList[i],
                        "inventoryId",
                        final.data.items[0].inventoryId
                      );
                      this.$set(
                        this.params.detailList[i],
                        "positionCode",
                        final.data.items[0].positionCode
                      );
                      this.$set(
                        this.params.detailList[i],
                        "price",
                        final.data.items[0].price
                      );
                      this.$set(
                        this.params.detailList[i],
                        "remark",
                        final.data.items[0].remark
                      );
                      is_push = false;
                      break;
                    }
                  }
                  if (is_push) {
                    let temp = {
                      productName: final.data.items[0].productName,
                      productId: final.data.items[0].productId,
                      quantity: final.data.items[0].usableQuantity,
                      inventoryId: final.data.items[0].inventoryId,
                      positionCode: final.data.items[0].positionCode,
                      price: final.data.items[0].price,
                      remark: final.data.items[0].remark,
                    };
                    this.params.detailList.push(temp);
                  }
                  uni.showToast({
                    title: "扫描添加成功",
                    icon: "none",
                    duration: 2000,
                  });
                } else {
                  uni.showToast({
                    title: "该产品不存在",
                    icon: "none",
                    duration: 2000,
                  });
                }
              } else {
                uni.showToast({
                  title: final.message,
                  icon: "none",
                  duration: 2000,
                });
              }
            });
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    min-height: 1440rpx;
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
    .scan {
    width: 204rpx;
    height: 72rpx;
    line-height: 72rpx;
    border: 2rpx solid #007dff;
    font-size: 24rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #007dff;
    border-radius: 40rpx;
    text-align: center;
    position: absolute;
    top: 24rpx;
    right: 102rpx;
  }
    .add {
      height: 120rpx;
      padding: 37rpx 31rpx 37rpx 31rpx;
      display: flex;
      justify-content: space-between;
      position: relative;
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
        justify-content: space-around;

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
        // padding-left: 30upx;
        display: flex;
        // align-items: center;
        position: relative;
        top: 70rpx;
        justify-content: space-around;

        .uni-input {
          width: 200rpx;
          height: 72rpx;
          background-color: #e5e5e5;
          border-radius: 40rpx;
          text-align: center;
          margin-left: 0;
        }

        .flex {
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
        // margin-left: 32rpx;
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
      height: calc(70vh);
      background: #f1f1f1;
      padding: 24rpx 32rpx 24rpx 32rpx;
      overflow-y: auto;
      padding-bottom: 148rpx;
    }

    .card {
      width: 686rpx;
      min-height: 701rpx;
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
      width: 540rpx;
      word-break: break-all;
    }

    .main {
      width: 622rpx;
      height: 563rpx;
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

.authority_mask {
    position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
    margin: 0 auto;
		z-index: 998999999999999;
		transition: .3s;
    background: rgba(42, 45, 50, 0.7);
.box{
      margin: 100rpx auto 0;
      width: 600rpx;
      height: 210rpx;
      text-align: center;
      font-weight: 700;
      border-radius: 20rpx;
      background: #fff;
      line-height: 70rpx;
      padding: 34rpx;
    }
}
</style>