<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>业务门店</view>
        <view class="flex" @click="open(0)">
          <view class="input" v-if="paramsList[0].value">{{
            paramsList[0].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>往来客户</view>
        <view class="flex" @click="open(1)">
          <view class="input" v-if="paramsList[1].value">{{
            paramsList[1].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>业务员</view>
        <view class="flex" @click="openSalesman">
          <view class="input" v-if="constructionWork">{{ constructionWork }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label">票据类型</view>
        <view class="flex" @click="open(2)">
          <view class="input" v-if="paramsList[2].value">{{
            paramsList[2].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">票据名称</view>
        <input v-model="submitParams.billName" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>包装方式</view>
        <view class="flex" @click="open(3)">
          <view class="input" v-if="paramsList[3].value">{{
            paramsList[3].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label">配送方式</view>
        <view class="flex" @click="open(4)">
          <view class="input" v-if="paramsList[4].value">{{
            paramsList[4].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">车牌号</view>
        <input v-model="submitParams.plateNumber" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>结算方式</view>
        <view class="flex" @click="open(5)">
          <view class="input" v-if="paramsList[5].value">{{
            paramsList[5].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>价格方式</view>
        <view class="flex" @click="open(6)">
          <view class="input" v-if="paramsList[6].value">{{
            paramsList[6].value
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">备注</view>
        <textarea maxlength="300" class="uni-input" placeholder-class="placeholder" v-model="submitParams.remark"
          auto-height placeholder="请输入" />
      </view>
    </view>
    <view class="main" v-for="(item, index) of product" :key="index">
      <view class="add" v-if="index == 0">
        <view class="left" @click="addProduct">
          <image class="icon" src="/static/smalladd.png"></image>
          <view class="add-font">添加产品</view>
        </view>
        <view v-if="!outWarehouseId" class="change" @click="goChange">预计转销售</view>
        <view class="scan" @click="chioceView">扫描产品编码</view>
        <image @click="cleanUp" class="icon" src="/static/clear.png"></image>
      </view>
      <view class="title">
        <view class="title-left">
          <view class="line"></view>
          <view class="title-label">产品{{ index + 1 }}</view>
        </view>
        <image class="icon" v-if="product.length > 1" @click="reduce(index)" src="/static/reduce.png"></image>
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>产品名称</view>
        <view class="flex" @click="openProduct(item, index)">
          <view class="input" v-if="item.productName">{{
            item.productName
          }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>数量</view>
        <input v-model="item.quantity" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row" style="background: #f6f6f8">
        <view class="label">库位</view>
        <input disabled="true" v-model="item.positionCode" class="uni-input" placeholder-class="placeholder"
          placeholder="请输入" />
      </view>
      <view class="row">
        <view class="label">单价</view>
        <input v-model="item.price" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row">
        <view class="label">备注</view>
        <textarea maxlength="300" class="uni-input" placeholder-class="placeholder" v-model="item.remark" auto-height
          placeholder="请输入" />
      </view>
      <view class="row" style="background: #f6f6f8">
        <view class="label">金额</view>
        <view v-if="item.price && item.quantity" class="money">{{
          Math.floor(Number(item.price) * Number(item.quantity) * 100) / 100
        }}</view>
      </view>
    </view>
    <view class="bottom">
      <view v-if="submitParams.status != 1" class="btn" style="width: 343rpx" @click="submit(0)">暂存</view>
      <view class="btn" :style="{
          width: submitParams.status != 1 ? '343rpx' : '686rpx',
        }" @click="submit(1)">{{ outWarehouseId && is_conversion ? "确认修改" : "提交" }}</view>
    </view>

    <uni-popup ref="popup" type="bottom">
      <view class="mask">
        <view class="mask-row">
          <view class="close" @click="cancel">取消</view>
          <view class="center">请选择{{ selectTitle }}</view>
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
          <view class="search-box">
            <view class="search">
              <input v-model="carg" class="uni-input" placeholder-class="placeholder" placeholder="请输入carg" />
            </view>
            <view class="search">
              <input v-model="productVal" class="uni-input" placeholder-class="placeholder" placeholder="请输入产品名称" />
            </view>
            <view class="search">
              <input v-model="pinyinVal" class="uni-input" placeholder-class="placeholder" placeholder="请输入拼音查找" />
            </view>
            <view class="search-second">
              <view class="search">
                <picker class="picker" @change="bindPickerChange" :value="classifyIndex" :range="classifySelectList">
                  <view v-if="classifyIndex == 0" class="placeholder">请选择分类</view>
                  <view v-else class="uni-input">{{
                    classifySelectList[classifyIndex]
                  }}</view>
                  <image class="bottom-icon" src="/static/bottom.png"></image>
                </picker>
              </view>
              <view class="search-btn" @click="search">
                <image class="search-icon" src="/static/white_search.png"></image>
                搜索
              </view>
            </view>
          </view>
        </view>
        <view class="content">
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
            <view v-if="productList && productList.length > 0">
              <view class="card" v-for="(item, index) in productList" :key="index">
                <view class="crow">
                  <image v-if="item.choice" @click="choice(item)" class="check" src="/static/check.png"></image>
                  <view v-else @click="choice(item)" class="spacecheck"></view>
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
              <view v-show="is_show" style="
                  text-align: center;
                  width: 100%;
                  line-height: 100rpx;
                  margin-bottom: 40rpx;
                ">没有更多数据了</view>
            </view>
            <view class="no-have" v-else>
              <image src="@/static/16701.png"></image>
              <view>暂无数据</view>
            </view>
          </scroll-view>
        </view>
        <view class="bottom">
          <view class="btn" @click="join">加入清单</view>
        </view>
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
    warehouseList,
    paymentTerms,
    customManagementList,
    storeUserlist,
    dictData,
    outWarehouseSalesDetails,
    inventoryList,
    editOutWarehouseSales,
    addOutWarehouseSales,
    queryOutWarehouse,
  } from "@/Api/purchaseSales.js";
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
        selectIndex: 0,
        openIndex: null,
        product: [{}],
        productList: [],
        carg: "",
        productVal: "",
        pinyinVal: "",
        classifyIndex: 0,
        classifySelectList: ["全部"],
        classifyList: ["全部"],
        outWarehouseId: "",
        paramsList: [{
            name: "业务门店",
            value: "",
            list: [],
            select: {},
          },
          {
            name: "往来客户",
            value: "",
            list: [],
            select: {},
          },
          {
            name: "票据类型",
            value: "",
            list: [{
                label: "普通发票",
                value: 0,
              },
              {
                label: "其他",
                value: 1,
              },
              {
                label: "指定物流",
                value: 2,
              },
              {
                label: "其他备注",
                value: 3,
              },
            ],
            select: {},
          },
          {
            name: "包装方式",
            value: "",
            list: [],
            select: {},
          },
          {
            name: "配送方式",
            value: "",
            list: [],
            select: {},
          },
          {
            name: "结算方式",
            value: "",
            list: [],
            select: {},
          },
          {
            name: "价格方式",
            value: "",
            list: [],
            select: {},
          },
        ],
        submitParams: {},
        selectList: [],
        selectTitle: "",
        productPageNum: 1,
        productPageSize: 10,
        productTotal: 0,
        productIndex: 0,
        is_show: false,
        is_conversion: true,
        showMask: false,
        salesmanList: [],
        choiceSalesman: {},
        constructionWork: '',
        constructionWorkId: ''
      };
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
    onLoad(option) {
      if (option.outWarehouseId) {
        this.outWarehouseId = option.outWarehouseId;
        uni.setNavigationBarTitle({
          title: "修改入库单",
        });
      }
      Promise.all([
        this.getWarehouseList(),
        this.getCustomManagementList(),
        this.getStoreUserlist(),
        this.getPackagingMethod(),
        this.getDeliveryMethod(),
        this.getPaymentTerms(),
        this.getPriceMode(),
      ]).then(() => {
        if (option.outWarehouseId) {
          this.getDetails();
        } else {
          this.paramsList[0].value =
            this.paramsList[0].list[this.selectIndex].warehouseName;
          this.paramsList[0].select = this.paramsList[0].list[this.selectIndex];
          this.productList = [];
          this.product = [{}];
          this.getProductList();
        }
      });
      this.getClassifyList();
    },
    methods: {
      open(e) {
        this.$refs.popup.open();
        this.openIndex = e;
        this.selectTitle = this.paramsList[e].name;
        this.selectIndex = 0;
        switch (e) {
          case 0:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.warehouseName;
            });
            break;
          case 1:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.name;
            });
            break;
          case 2:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.label;
            });
            break;
          case 3:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.dictLabel;
            });
            break;
          case 4:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.dictLabel;
            });
            break;
          case 5:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.dictLabel;
            });
            break;
          case 6:
            this.selectList = this.paramsList[e].list.map((res) => {
              return res.dictLabel;
            });
            break;
        }
      },
      cancel() {
        this.$refs.popup.close();
      },
      success() {
        switch (this.openIndex) {
          case 0:
            this.paramsList[0].value =
              this.paramsList[0].list[this.selectIndex].warehouseName;
            this.paramsList[0].select = this.paramsList[0].list[this.selectIndex];
            this.productList = [];
            this.productPageNum = 1;
            this.productPageSize = 10;
            this.getProductList();
            this.cleanUp();
            break;
          case 1:
            this.paramsList[1].value =
              this.paramsList[1].list[this.selectIndex].name;
            this.paramsList[1].select = this.paramsList[1].list[this.selectIndex];
            break;
          case 2:
            this.paramsList[2].value =
              this.paramsList[2].list[this.selectIndex].label;
            this.paramsList[2].select = this.paramsList[2].list[this.selectIndex];
            break;
          case 3:
            this.paramsList[3].value =
              this.paramsList[3].list[this.selectIndex].dictLabel;
            this.paramsList[3].select = this.paramsList[3].list[this.selectIndex];
            break;
          case 4:
            this.paramsList[4].value =
              this.paramsList[4].list[this.selectIndex].dictLabel;
            this.paramsList[4].select = this.paramsList[4].list[this.selectIndex];
            break;
          case 5:
            this.paramsList[5].value =
              this.paramsList[5].list[this.selectIndex].dictLabel;
            this.paramsList[5].select = this.paramsList[5].list[this.selectIndex];
            break;
          case 6:
            this.paramsList[6].value =
              this.paramsList[6].list[this.selectIndex].dictLabel;
            this.paramsList[6].select = this.paramsList[6].list[this.selectIndex];
            break;
        }
        this.$refs.popup.close();
      },
      bindChange(e) {
        this.selectIndex = e.detail.value[0];
      },
      openProduct(item, index) {
        this.operate = item;
        this.productIndex = index;
        this.chioceProduct(0);
        this.$refs.product.open();
        this.choiceProduct = {};
      },
      closeProduct() {
        this.$refs.product.close();
      },
      choice(item) {
        this.productList.forEach((ptem, pndex) => {
          if (ptem.productId == item.productId) {
            this.$set(this.productList[pndex], "choice", true);
            this.choiceProduct = ptem;
          } else {
            this.$set(this.productList[pndex], "choice", false);
          }
        });
      },
      goChange() {
        uni.navigateTo({
          url: "/pages/sales/conversionSales",
        });
      },
      getWarehouseList() {
        return new Promise((resolve, reject) => {
          warehouseList().then((res) => {
            if (res.code == 200) {
              this.paramsList[0].list = res.data.items;
              resolve(res);
            }
          });
        });
      },
      getCustomManagementList() {
        return new Promise((resolve, reject) => {
          customManagementList().then((res) => {
            if (res.code == 200) {
              this.paramsList[1].list = res.data.items;
              resolve(res);
            }
          });
        });
      },
      getStoreUserlist() {
        return new Promise((resolve, reject) => {
          storeUserlist({
            pageNum: 1,
            pageSize: 1500,
          }).then((res) => {
            if (res.code == 200) {
              this.salesmanList = res.rows;
              resolve(res);              
            }
          });
        });
      },
      getPackagingMethod() {
        return new Promise((resolve, reject) => {
          dictData("packagingMethod").then((res) => {
            if (res.code == 200) {
              this.paramsList[3].list = res.data;
              resolve(res);              
            }
          });
        });
      },
      getDeliveryMethod() {
        return new Promise((resolve, reject) => {
          dictData("delivery_method").then((res) => {
            if (res.code == 200) {
              this.paramsList[4].list = res.data;
              resolve(res);
            }
          });
        });
      },
      getPaymentTerms() {
        return new Promise((resolve, reject) => {
          paymentTerms().then((res) => {
            if (res.code == 200) {
              this.paramsList[5].list = res.data;
              resolve(res);              
            }
          });
        });
      },
      getPriceMode() {
        return new Promise((resolve, reject) => {
          dictData("priceMode").then((res) => {
            if (res.code == 200) {
              this.paramsList[6].list = res.data;
              resolve(res);
            }
          });
        });
      },
      getDetails(type) {
        uni.showLoading({
          title: "加载中",
        });
        outWarehouseSalesDetails(this.outWarehouseId).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            if (type) {
              res.data.type = type;
            }
            this.submitParams = res.data;
            this.product = res.data.detailList;
            if (res.data.storeId) {
              for (var i = 0; i < this.paramsList[0].list.length; i++) {
                if (this.paramsList[0].list[i].warehouseId == res.data.storeId) {
                  this.paramsList[0].value = res.data.storeName;
                  this.paramsList[0].select = this.paramsList[0].list[i];
                  break;
                }
              }
            }

            if (res.data.customerId) {
              for (var i = 0; i < this.paramsList[1].list.length; i++) {
                if (
                  this.paramsList[1].list[i].customerId == res.data.customerId
                ) {
                  this.paramsList[1].value = res.data.customer;
                  this.paramsList[1].select = this.paramsList[1].list[i];
                  break;
                }
              }
            }

            if (res.data.constructionWorkId) {
              this.constructionWorkId = res.data.constructionWorkId
              this.constructionWork = res.data.constructionWork
            }

            if (res.data.billType) {
              for (var i = 0; i < this.paramsList[2].list.length; i++) {
                if (this.paramsList[2].list[i].value == res.data.billType) {
                  this.paramsList[2].value = this.paramsList[2].list[i].label;
                  this.paramsList[2].select = this.paramsList[2].list[i];
                  break;
                }
              }
            }

            if (res.data.packagingMethod) {
              for (var i = 0; i < this.paramsList[3].list.length; i++) {
                if (
                  this.paramsList[3].list[i].dictValue == res.data.packagingMethod
                ) {
                  this.paramsList[3].value = this.paramsList[3].list[i].dictLabel;
                  this.paramsList[3].select = this.paramsList[3].list[i];
                  break;
                }
              }
            }

            if (res.data.delivery) {
              for (var i = 0; i < this.paramsList[4].list.length; i++) {
                if (this.paramsList[4].list[i].dictValue == res.data.delivery) {
                  this.paramsList[4].value = this.paramsList[4].list[i].dictLabel;
                  this.paramsList[4].select = this.paramsList[4].list[i];
                  break;
                }
              }
            }

            if (res.data.paymentTerms) {
              for (var i = 0; i < this.paramsList[5].list.length; i++) {
                if (
                  this.paramsList[5].list[i].dictValue == res.data.paymentTerms
                ) {
                  this.paramsList[5].value = this.paramsList[5].list[i].dictLabel;
                  this.paramsList[5].select = this.paramsList[5].list[i];
                  break;
                }
              }
            }

            if (res.data.priceMode) {
              for (var i = 0; i < this.paramsList[6].list.length; i++) {
                if (this.paramsList[6].list[i].dictValue == res.data.priceMode) {
                  this.paramsList[6].value = res.data.priceMode;
                  this.paramsList[6].select = this.paramsList[6].list[i];
                  break;
                }
              }
            }
            this.getProductList();
          }
        });
      },
      lower() {
        if (this.productList.length == this.productTotal) {
          this.is_show = true;
        } else {
          this.is_show = false;
          this.productPageNum++;
          this.getProductList();
        }
      },
      getProductList() {
        let params = {
          pageNum: this.productPageNum,
          pageSize: this.productPageSize,
          warehouseId: this.paramsList[0].select.warehouseId,
          carg: this.carg,
          productName: this.productVal,
          pinyin: this.pinyinVal,
        };

        if (this.classifyIndex > 0) {
          params.classify = this.classifyList[this.classifyIndex].dictValue;
        }

        inventoryList(params).then((res) => {
          if (res.code == 200) {
            this.productList = [...this.productList, ...(res.data.items || [])];
            this.productTotal = res.data.total;
            this.chioceProduct();
          }
        });
      },
      chioceProduct(e = 1) {
        this.productList.forEach((item) => {
          if (e == 1) {
            if (!item.choice) {
              this.$set(item, "choice", false);
            }
          } else {
            this.$set(item, "choice", false);
          }
        });
      },
      join() {
        if (Object.keys(this.choiceProduct).length == 0) {
          return uni.showToast({
            title: "请选择产品",
            icon: "none",
            duration: 1000,
          });
        }

        for (var i = 0; i < this.product.length; i++) {
          if (this.product[i].productId == this.choiceProduct.productId) {
            return uni.showToast({
              title: "产品已存在",
              icon: "none",
              duration: 1000,
            });
          }
        }
        this.$set(
          this.product[this.productIndex],
          "productName",
          this.choiceProduct.productName
        );
        this.$set(
          this.product[this.productIndex],
          "productId",
          this.choiceProduct.productId
        );
        this.$set(
          this.product[this.productIndex],
          "price",
          this.choiceProduct.price
        );
        this.$set(
          this.product[this.productIndex],
          "positionCode",
          this.choiceProduct.positionCode
        );
        this.$set(
          this.product[this.productIndex],
          "inventoryId",
          this.choiceProduct.inventoryId
        );
        this.$set(
          this.product[this.productIndex],
          "remark",
          this.choiceProduct.remark
        );

        this.$refs.product.close();
      },
      addProduct() {
        this.product.push({});
      },
      cleanUp() {
        this.product = [{
          productName: "",
          quantity: "",
          positionCode: "",
          price: "",
          remark: "",
        }, ];
      },
      reduce(index) {
        this.product.splice(index, 1);
      },
      submit(e) {
        if (!this.paramsList[0].value) {
          return uni.showToast({
            title: "业务门店不能为空",
            icon: "none",
            duration: 1000,
          });
        } else if (!this.paramsList[1].value) {
          return uni.showToast({
            title: "往来客户不能为空",
            icon: "none",
            duration: 1000,
          });
        } else if (!this.constructionWork) {
          return uni.showToast({
            title: "业务员不能为空",
            icon: "none",
            duration: 1000,
          });
        } else if (!this.paramsList[3].value) {
          return uni.showToast({
            title: "包装方式不能为空",
            icon: "none",
            duration: 1000,
          });
        } else if (!this.paramsList[5].value) {
          return uni.showToast({
            title: "结算方式不能为空",
            icon: "none",
            duration: 1000,
          });
        } else if (!this.paramsList[6].value) {
          return uni.showToast({
            title: "价格方式不能为空",
            icon: "none",
            duration: 1000,
          });
        }
        for (var i = 0; i < this.product.length; i++) {
          if (!this.product[i].productName) {
            return uni.showToast({
              title: `请选择产品${i + 1}`,
              icon: "none",
              duration: 1000,
            });
          } else if (!this.product[i].quantity) {
            return uni.showToast({
              title: `产品${i + 1}的数量不能为空`,
              icon: "none",
              duration: 1000,
            });
          } else if (
            this.product[i].quantity <= 0 ||
            String(this.product[i].quantity).indexOf(".") != -1
          ) {
            return uni.showToast({
              title: `产品${i + 1}的数量不能为0、负数、小数`,
              icon: "none",
              duration: 2000,
            });
          }
        }

        uni.showLoading({
          title: "加载中",
        });
        let paramsTrans = {
          outWarehouseId: this.outWarehouseId,
          storeName: this.paramsList[0].select.warehouseName,
          storeId: this.paramsList[0].select.warehouseId,
          customer: this.paramsList[1].select.name,
          customerId: this.paramsList[1].select.customerId,
          constructionWorkId: this.constructionWorkId,
          constructionWork: this.constructionWork,
          billType: this.paramsList[2].select.value,
          packagingMethod: this.paramsList[3].select.dictValue,
          delivery: this.paramsList[4].select.dictValue,
          paymentTerms: this.paramsList[5].select.dictValue,
          priceMode: this.paramsList[6].select.dictValue,
          state: 0,
          detailList: this.product,
        };

        let params = Object.assign({}, this.submitParams, paramsTrans);

        if (
          this.outWarehouseId &&
          this.outWarehouseId.length > 0 &&
          this.is_conversion
        ) {
          e == 0 ? (params.status = 0) : (params.status = 1);
          editOutWarehouseSales(params)
            .then((res) => {
              uni.hideLoading();
              if (res.code == 200) {
                uni.showToast({
                  title: e == 0 ? "暂存成功" : "修改成功",
                  icon: "none",
                  duration: 1500,
                });
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1,
                  });
                }, 500);
              }
            })
            .catch((err) => {
              uni.showToast({
                title: err.message,
                icon: "none",
                duration: 2500,
              });
            });
        } else {
          e == 0 ? (params.status = 0) : (params.status = 1);
          params.type = 3;
          addOutWarehouseSales(params)
            .then((res) => {
              uni.hideLoading();
              if (res.code == 200) {
                uni.showToast({
                  title: e == 0 ? "暂存成功" : "销售单保存成功",
                  icon: "none",
                  duration: 1500,
                });
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1,
                  });
                }, 500);
              }
            })
            .catch((err) => {
              uni.showToast({
                title: err.message,
                icon: "none",
                duration: 2500,
              });
            });
        }
      },
      search() {
        this.productList = [];
        this.productPageNum = 1;
        this.getProductList();
      },
      conversionSales(e, conversion) {
        this.is_conversion = conversion;
        queryOutWarehouse(e).then((res) => {
          this.outWarehouseId = res.data.outWarehouseId;
          this.getDetails(3);
        });
      },
      getClassifyList() {
        dictData("classification").then((res) => {
          res.data.map((item) => {
            this.classifySelectList.push(item.dictValue);
          });
          this.classifyList = [...this.classifyList, ...res.data];
        });
      },
      bindPickerChange(e) {
        this.classifyIndex = e.detail.value;
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
            this.scanCarg();
            //执行你有权限后的方法
          }
        });
      } else {
        this.scanCarg();
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
            warehouseId: this.paramsList[0].select.warehouseId,
          };
          inventoryList(params).then((final) => {
            if (final.code == 200) {
              if (final.data.items && final.data.items.length > 0) {
                for (var i = 0; i < this.product.length; i++) {
                  if (
                    this.product[i].productId == final.data.items[0].productId
                  ) {
                    return uni.showToast({
                      title: "产品已存在",
                      icon: "none",
                      duration: 1000,
                    });
                  }
                }
                var is_push = true;
                for (var i = 0; i < this.product.length; i++) {
                  if (!this.product[i].productName) {
                    this.$set(
                      this.product[i],
                      "productName",
                      final.data.items[0].productName
                    );
                    this.$set(
                      this.product[i],
                      "productId",
                      final.data.items[0].productId
                    );
                    this.$set(
                      this.product[i],
                      "price",
                      final.data.items[0].price
                    );
                    this.$set(
                      this.product[i],
                      "inventoryId",
                      final.data.items[0].inventoryId
                    );
                    this.$set(
                      this.product[i],
                      "positionCode",
                      final.data.items[0].positionCode
                    );
                    this.$set(
                      this.product[i],
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
                    price: final.data.items[0].price,
                    inventoryId: final.data.items[0].inventoryId,
                    positionCode: final.data.items[0].positionCode,
                    remark: final.data.items[0].remark
                  };
                  this.product.push(temp);
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
        storeUserlist(params).then((res)=>{
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
      this.constructionWork = this.choiceSalesman.userName
      this.constructionWorkId = this.choiceSalesman.userId
      this.$refs.salesman.close()
    }
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    min-height: 1320rpx;
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
    background: #ffffff;
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
      width: 510rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      text-align: right;
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

    .center {
      font-size: 36rpx;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #303133;
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

    .change {
      width: 170rpx;
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
      right: 314rpx;
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
      height: 296rpx;
      background: #ffffff;
      border-radius: 0rpx 0rpx 0rpx 0rpx;

      .search-box {
        position: relative;
        top: 60rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0rpx 32rpx;
      }

      .picker {
        margin: 0 auto;

        ::v-deep .icon {
          display: inline-block;
        }

        ::v-deep .uni-input {
          display: inline-block;
        }

        ::v-deep .placeholder {
          display: inline-block;
          height: 44rpx;
          line-height: 44rpx;
        }
      }

      .search-second {
        display: flex;
        justify-content: space-between;
        width: 452rpx;
      }

      .search {
        width: 218rpx;
        height: 72rpx;
        background: #f1f1f1;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 20rpx;
      }

      .search-btn {
        width: 218rpx;
        height: 72rpx;
        background: #007dff;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 28rpx;
      }

      .bottom-icon {
        width: 28rpx;
        height: 28rpx;
        margin-left: 12rpx;
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
        text-align: center;
      }

      .search-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
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
      overflow-y: hidden;
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

  .scroll-Y {
    height: calc(60vh - 44rpx);
  }

  .no-have {
    text-align: center;
    padding-top: 160rpx;
    font-size: 32rpx;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    color: #666666;

    uni-image {
      width: 460rpx;
      height: 312rpx;
    }
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
</style>