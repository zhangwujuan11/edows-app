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
        <view class="label"><text class="symbol"></text>业务员</view>
        <view class="flex" @click="openSalesman">
          <view class="input" v-if="agentUser">{{ agentUser }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">责任人</view>
        <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="params.customerUser" />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol"></text>责任单位</view>
        <view class="flex" @click="open(3)">
          <view class="input" v-if="customerAddress">{{ customerAddress }}</view>
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
        <view class="scan" @click="chioceView">扫描产品编码</view>
        <image class="icon" src="/static/clear.png" @click="clear"></image>
      </view>
      <view style="margin-bottom: 30upx;" v-for="(item, index) in params.detailList" :key="index">
        <view class="title">
          <view class="title-left">
            <view class="line"></view>
            <view class="title-label">产品{{index+1}}</view>
          </view>
          <image class="icon" src="/static/reduce.png" v-show="params.detailList.length>1" @click="del(index)">
          </image>
        </view>
        <view class="row-select" style="background-color: white">
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
          <uni-forms-item name="positionCode" style="margin: 0;">
            <view class="row">
              <view class="label"><text class="symbol">*</text>库位</view>
              <input class="uni-input" placeholder-class="placeholder" placeholder="请输入" v-model="item.positionCode" />
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
          <text style="color: #b3b5c4;">{{num(index)|decimalFormat}}</text>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn" @click="Return1" style="width: 335upx;" v-show="params.status==0">暂存</view>
      <view class="btn" @click="Return" style="width: 335upx;">确认</view>
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
            <view class="flex" @click="open(4)">
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
              <view class="name" style="width: 540upx;padding-top: 10upx;">{{ item.productName }}</view>
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

    <view class="authority_mask" v-if="showMask">
      <view class="box">
        <view>相机权限使用说明：</view>
        <view>用于拍摄照片、扫码、上传图片等场景</view>
      </view>
    </view>

    <uni-popup ref="salesman" type="bottom">
      <view class="salesman">
        <view class="header">
          <view class="title"
            >请选择业务员
            <image
              @click="closesalesman"
              class="fork"
              src="/static/close.png"
            ></image>
          </view>
        </view>
        <view class="content">
          <scroll-view scroll-y="true" class="scroll-Y">
            <view class="card" v-for="(item, index) of salesmanList" :key="index">
              <view class="crow">
                <image
                  v-if="item.choice"
                  @click="salesmanchoice(item)"
                  class="check"
                  src="/static/check.png"
                ></image>
                <view v-else @click="salesmanchoice(item)" class="spacecheck"></view>
                <view class="name">{{ item.userId }}</view>
              </view>
              <view class="main">
                <view class="flex-row">
                  <view class="label">用户名称</view>
                  <view class="val">{{ item.userName }}</view>
                </view>
                <view class="flex-row">
                  <view class="label">用户昵称</view>
                  <view class="val">{{ item.nickName }}</view>
                </view>
                <view class="flex-row">
                  <view class="label">手机号</view>
                  <view class="val">{{ item.phonenumber }}</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="salesman-bottom">
          <view class="btn" @click="submitSalesman">确定</view>
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
    addoutWarehouseReturn,

    getTransferStocks,
    delTransferStocks,
    detailTransferStocks,
    AuditTransferStocks,
    addTransferStocks,
    editTransferStocks,
    getinventory,
    adddamage,
    addbenefit,
    editdamage,
    detaildamage,
    getclassification,

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
        params3: {
          pageNum: 1,
          pageSize: 20,
        },
        item: {},
        array: ["移库", "调拨"],
        selectList2: [],
        inventoryId: '',
        warehouseId: '',
        customerAddress: '',
        classification: '',
        title: '',
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
          positionCode: {
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
         showMask: false,
         salesmanList: [],
         choiceSalesman: {}
      };
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
    filters: {
      decimalFormat(value) {
        return value.toFixed(2);
      }
    },
    computed: {
      num(i) {
        return function(i) {
          if (this.params.detailList[i].price != undefined && this.params
            .detailList[i].quantity != undefined) {
            this.params.detailList[i].num = this.params.detailList[i]
              .quantity *
              this.params.detailList[i].price
            this.params.detailList[i].num
            return this.params.detailList[i].num
          } else {
            return this.params.detailList[i].num = 0
          }
        }
      }
    },
    async onLoad(e) {
      const data9 = await detaildamage(e.id)
      this.params = data9.data
      this.params.constructionWork = data9.data.createBy
      this.customerAddress = this.params.customer
      this.outWarehouseName = this.params.storeName
      this.agentUser = this.params.createBy
      this.params1.warehouseId = data9.data.storeId
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
          // case 2:
          //   this.title = '请选择业务员'
          //   const data2 = await getwen(this.params3)
          //   if (data2.rows) {
          //     data2.rows.forEach(i => {
          //       this.selectList.push(i.userName)
          //       this.selectList1.push(i.userId)
          //     })
          //   } else {
          //     uni.showToast({
          //       title: "没有数据",
          //       icon: "none",
          //       duration: 1000,
          //     });
          //   }
          //   break;
          case 3:
            this.title = '请选择责任单位'
            const data3 = await getcustomer(this.params3)
            if (data3.data.items) {
              data3.data.items.forEach(i => {
                this.selectList.push(i.customerAddress)
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
          case 4:
            this.title = '请选择分类'
            const data4 = await getclassification(this.params3)
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
            this.outWarehouseName = this.selectList[this.selectIndex];
            if (this.params.storeName != this.outWarehouseName) {
              this.clear()
            }
            this.params.storeName = this.outWarehouseName
            this.params.warehouseId = this.selectList1[this.selectIndex];
            this.params.storeId = this.selectList1[this.selectIndex];
            this.params1.warehouseId = this.selectList1[this.selectIndex];
            this.warehouseId = this.selectList1[this.selectIndex];
            break;
          // case 2:
          //   this.agentUser = this.selectList[this.selectIndex];
          //   this.params.constructionWork = this.agentUser
          //   this.params.constructionWorkId = this.selectList1[this.selectIndex];
          //   break;
          case 3:
            this.customerAddress = this.selectList[this.selectIndex];
            this.params.customer = this.customerAddress
            this.params.customerId = this.selectList1[this.selectIndex];
            break;
          case 4:
            this.classification = this.selectList[this.selectIndex];
            this.params2.classify = this.classification
            break;
        }
        this.$refs.popup.close();
      },
      clear() {
        this.params.detailList = [{
          quantity: '',
          positionCode: '',
          price: ''
        }]
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
        }
      },
      async Return() {
        this.params.status = 1
        for (let i = 0; i <= this.Number; i++) {
          this.$refs.form[i].validate().then(async res66 => {
            const res1 = await editdamage(this.params)
            uni.hideToast()
            if (res1.code == 200) {
              uni.showToast({
                title: "修改成功",
                icon: "none",
                duration: 1000,
              });
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1,
                })
              }, 1000)
            }
          })
        }
      },
      async Return1() {
        this.params.status = 0
        for (let i = 0; i <= this.Number; i++) {
          this.$refs.form[i].validate().then(async res66 => {
            const res19 = await editdamage(this.params)
            uni.hideToast()
            if (res19.code == 200) {
              uni.showToast({
                title: "暂存成功",
                icon: "none",
                duration: 1000,
              });
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1,
                })
              }, 1000)
            }
          })
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
        this.$set(this.params.detailList[this.index], 'productName', this.item.productName)
        this.$set(this.params.detailList[this.index], 'productId', this.item.productId)
        this.$set(this.params.detailList[this.index], 'quantity', this.item.usableQuantity)
        this.$set(this.params.detailList[this.index], 'price', this.item.price)
        this.$refs.product.close();
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
              warehouseId: this.params1.warehouseId,
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
                      position: final.data.items[0].positionCode,
                      price: final.data.items[0].price,
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
      openSalesman() {
        let params = {
          pageNum: 1,
          pageSize: 1000
        }
        getwen(params).then((res)=>{
          this.salesmanList = res.rows
          this.$refs.salesman.open()
        })
      },
      closesalesman() {
        this.$refs.salesman.close()
      },
      salesmanchoice(item) {
      this.salesmanList.forEach((ptem, pndex) => {
        if (ptem.userId == item.userId) {
          this.$set(this.salesmanList[pndex], "choice", true);
          this.choiceSalesman = ptem;
        } else {
          this.$set(this.salesmanList[pndex], "choice", false);
        }
      });
    },
      submitSalesman (){
        this.agentUser = this.choiceSalesman.userName
        this.params.constructionWork = this.choiceSalesman.userName
        this.params.constructionWorkId = this.choiceSalesman.userId
        this.$refs.salesman.close()
      }
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
      justify-content: space-around;
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
        width: 656rpx;
        height: 72rpx;
        margin: 0 auto;
        // padding-left: 30upx;
        display: flex;
        // align-items: center;
        position: relative;
        top: 70rpx;
        justify-content: space-around;

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
      min-height: 660rpx;
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

  .salesman {
  .scroll-Y {
  height: 860rpx;
  }
  .header {
    width: 750rpx;
    height: 120rpx;
    line-height: 120rpx;
    background: #ffffff;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }
  .title {
    font-size: 36rpx;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #303133;
    text-align: center;
    position: relative;
  }
  .fork {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    right: 32rpx;
    top: 24rpx;
  }
  .content {
    height: 900rpx;
    background: #f1f1f1;
    padding: 24rpx 32rpx 24rpx 32rpx;
    overflow-y: hidden;
  }
  .card {
    width: 686rpx;
    height: 347rpx;
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
  }
  .main {
    width: 622rpx;
    height: 209rpx;
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
    width: 114rpx;
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
  .salesman-bottom {
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