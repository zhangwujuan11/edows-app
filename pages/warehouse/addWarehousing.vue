<template>
  <view style="padding-bottom: 148rpx">
    <view class="top">
      <view class="row-select" v-for="(item, index) of paramsList" :key="index">
        <view class="label"><text class="symbol">*</text>{{ item.name }}</view>
        <view class="flex" @click="open(index)">
          <view class="input" v-if="paramsList[index].value">{{
            item.value
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
        <view class="scan" @click="chioceView">扫描产品编码</view>
        <image @click="cleanUp" class="icon" src="/static/clear.png"></image>
      </view>
      <view class="title">
        <view class="title-left">
          <view class="line"></view>
          <view class="title-label">产品{{ index + 1 }}</view>
        </view>
        <image v-if="product.length > 1" @click="reduce(index)" class="icon" src="/static/reduce.png"></image>
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
        <input type="number" v-model="item.receivalQuantity" class="uni-input" placeholder-class="placeholder"
          placeholder="请输入" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>库位</view>
        <input v-model="item.position" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>单价</view>
        <input type="digit" v-model="item.price" class="uni-input" placeholder-class="placeholder" placeholder="请输入" />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>折率</view>
        <input type="digit" v-model="item.discountRate" class="uni-input" placeholder-class="placeholder"
          placeholder="请输入" />
      </view>
      <view class="row" style="background: #f6f6f8">
        <view class="label">金额</view>
        <view v-show="item.receivalQuantity && item.price && item.discountRate" class="money">{{
            Math.floor(
              Number(item.receivalQuantity) *
                Number(item.price) *
                Number(item.discountRate) *
                100
            ) / 100
          }}</view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn" @click="submit">保存入库单</view>
    </view>

    <uni-popup @change="closeMask" ref="popup" type="bottom">
      <view class="mask">
        <view class="mask-row">
          <view class="close" @click="cancel">取消</view>
          <view class="center">请选择{{ selectTitle }}</view>
          <view class="success" @click="success">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="paramsList[this.currIndex].selected" @change="bindChange"
          class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item, index) in paramsList[this.currIndex].list" :key="index">{{
                currIndex == 0
                  ? item.warehouseName
                  : currIndex == 1
                  ? item.supplierName
                  : item.dictLabel
              }}</view>
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
              <input v-model="factoryCode" class="uni-input" placeholder-class="placeholder" placeholder="请输入本厂编码" />
            </view>
            <view class="search">
              <input v-model="pinyinVal" class="uni-input" placeholder-class="placeholder" placeholder="请输入拼音查找" />
            </view>
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
        <view class="content">
          <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
            <view v-if="productList && productList.length > 0">
              <view class="card" v-for="(item, index) of productList" :key="index">
                <view class="crow">
                  <image v-if="item.choice" class="check" src="/static/check.png"></image>
                  <view v-else @click="choice(item)" class="spacecheck"></view>
                  <view class="name">{{ item.name }}</view>
                </view>
                <view class="main">
                  <view class="flex-row">
                    <view class="label">carg</view>
                    <view class="val">{{ item.carg }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">分类</view>
                    <view class="val">{{ item.classify }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">工艺图纸</view>
                    <view class="val">{{ item.technologyImg }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">车型</view>
                    <view class="val">{{ item.motorcycleType }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">长度</view>
                    <view class="val">{{ item.prodLength }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">中高</view>
                    <view class="val">{{ item.risingFalling }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">对角</view>
                    <view class="val">{{ item.diagonal }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">单价</view>
                    <view class="val">{{ item.retailPrice }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">本厂编码</view>
                    <view class="val">{{ item.factoryCode }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">原厂件号</view>
                    <view class="val">{{ item.partNumber }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">颜色</view>
                    <view class="val">{{ item.prodColour }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">彩带</view>
                    <view class="val">{{ item.coloredRibbon }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">单位</view>
                    <view class="val">{{ item.unit }}</view>
                  </view>
                  <view class="flex-row">
                    <view class="label">库存</view>
                    <view class="val">{{ item.inventoryAlert }}</view>
                  </view>
                </view>
              </view>
              <view v-show="is_show" style="text-align: center; width: 100%; line-height: 100rpx">没有更多数据了</view>
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
  </view>
</template>

<script>
  import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
  import {
    warehouseList,
    supplierList,
    paymentTerms,
    inWarehouseDetails,
    productList,
    editStoreInWarehouse,
    addStoreInWarehouse,
    dictData,
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
        selectList: [],
        currIndex: 0,
        product: [{}],
        productList: [],
        carg: "",
        productVal: "",
        factoryCode: "",
        pinyinVal: "",
        classifyIndex: 0,
        classifySelectList: ["全部"],
        classifyList: ["全部"],
        inWarehouseId: "",
        selectTitle: "",
        paramsList: [{
            name: "门店",
            value: "",
            selected: [0],
            list: [],
            selectIndex: 0,
          },
          {
            name: "供应商",
            value: "",
            selected: [0],
            list: [],
            selectIndex: 0,
          },
          {
            name: "结算方式",
            value: "",
            selected: [0],
            list: [],
            selectIndex: 0,
          },
        ],
        productPageNum: 1,
        productPageSize: 10,
        productTotal: 0,
        operate: {},
        choiceProduct: {},
        productIndex: 0,
        submitParams: {},
        is_show: false,
        showMask: false
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
      if (option.inWarehouseId) {
        this.inWarehouseId = option.inWarehouseId;
        uni.setNavigationBarTitle({
          title: "修改入库单",
        });
      }
      Promise.all([
        this.getWarehouseList(),
        this.getSupplierList(),
        this.getPaymentTerms(),
      ]).then(() => {
        if (option.inWarehouseId) {
          this.getinWarehouseDetails();
        }
      });
      this.getProductList();
      this.getClassifyList();
    },
    methods: {
      open(e) {
        this.$refs.popup.open();
        this.currIndex = e;
        switch (e) {
          case 0:
            this.selectTitle = "门店";
            break;
          case 1:
            this.selectTitle = "供应商";
            break;
          case 2:
            this.selectTitle = "结算方式";
            break;
        }
      },
      cancel() {
        this.$refs.popup.close();
      },
      success() {
        this.paramsList[this.currIndex].selected = [
          this.paramsList[this.currIndex].selectIndex,
        ];
        switch (this.currIndex) {
          case 0:
            this.paramsList[0].value =
              this.paramsList[0].list[
                this.paramsList[0].selectIndex
              ].warehouseName;
            break;
          case 1:
            this.paramsList[1].value =
              this.paramsList[1].list[
                this.paramsList[1].selectIndex
              ].supplierName;
            break;
          case 2:
            this.paramsList[2].value =
              this.paramsList[2].list[this.paramsList[2].selectIndex].dictLabel;
            break;
        }
        this.$refs.popup.close();
      },
      bindChange(e) {
        this.paramsList[this.currIndex].selectIndex = e.detail.value[0];
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
      getSupplierList() {
        return new Promise((resolve, reject) => {
          supplierList({
            status: 0
          }).then((res) => {
            if (res.code == 200) {
              this.paramsList[1].list = res.data.items;
              resolve(res);
            }
          });
        });
      },
      getPaymentTerms() {
        return new Promise((resolve, reject) => {
          paymentTerms().then((res) => {
            if (res.code == 200) {
              this.paramsList[2].list = res.data;
              resolve(res);
            }
          });
        });
      },
      getinWarehouseDetails() {
        inWarehouseDetails(this.inWarehouseId).then((res) => {
          if (res.code == 200) {
            this.product = res.data.storeInWarehouseDetailBoList;
            this.submitParams = res.data;
            if (res.data.storeInWarehouseDetailBoList) {
              if (res.data.warehouseName) {
                for (var i = 0; i < this.paramsList[0].list.length; i++) {
                  if (
                    this.paramsList[0].list[i].warehouseId == res.data.warehouseId
                  ) {
                    this.paramsList[0].value = res.data.warehouseName;
                    this.paramsList[0].selected = [i];
                    this.paramsList[0].selectIndex = i;
                    break;
                  }
                }
              }

              if (res.data.vendorName) {
                for (var i = 0; i < this.paramsList[1].list.length; i++) {
                  if (
                    this.paramsList[1].list[i].supplierCode == res.data.vendorCode
                  ) {
                    this.paramsList[1].value = res.data.vendorName;
                    this.paramsList[1].selected = [i];
                    this.paramsList[1].selectIndex = i;
                    break;
                  }
                }
              }

              if (res.data.paymentTerms) {
                for (var i = 0; i < this.paramsList[2].list.length; i++) {
                  if (
                    this.paramsList[2].list[i].dictValue == res.data.paymentTerms
                  ) {
                    this.paramsList[2].value =
                      this.paramsList[2].list[i].dictLabel;
                    this.paramsList[2].selected = [i];
                    this.paramsList[2].selectIndex = i;
                    break;
                  }
                }
              }
            }
          }
        });
      },
      getProductList() {
        let params = {
          pageNum: this.productPageNum,
          pageSize: this.productPageSize,
          status: 0,
          carg: this.carg,
          name: this.productVal,
          factoryCode: this.factoryCode,
          pinyin: this.pinyinVal,
        };

        if (this.classifyIndex > 0) {
          params.classify = this.classifyList[this.classifyIndex].dictValue;
        }
        uni.showLoading({
          title: "加载中",
        });

        productList(params).then((res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.productList = [...this.productList, ...(res.data.items || [])];
            this.productTotal = res.data.total;
            this.chioceProduct();
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

        this.$set(
          this.product[this.productIndex],
          "productName",
          this.choiceProduct.name
        );
        this.$set(
          this.product[this.productIndex],
          "productId",
          this.choiceProduct.productId
        );
        this.$set(
          this.product[this.productIndex],
          "price",
          this.choiceProduct.retailPrice
        );
        this.$set(this.product[this.productIndex], "position", null);
        this.$set(this.product[this.productIndex], "receivalQuantity", null);
        this.$set(this.product[this.productIndex], "discountRate", "1");
        this.$refs.product.close();
      },
      addProduct() {
        this.product.push({});
      },
      search() {
        this.productList = [];
        this.productPageNum = 1;
        this.getProductList();
      },
      submit() {
        for (var i = 0; i < this.paramsList.length; i++) {
          if (!this.paramsList[i].value) {
            return uni.showToast({
              title: `${this.paramsList[i].name}不能为空`,
              icon: "none",
              duration: 1000,
            });
          }
        }

        for (var i = 0; i < this.product.length; i++) {
          if (!this.product[i].productName) {
            return uni.showToast({
              title: `请选择产品${i + 1}`,
              icon: "none",
              duration: 1000,
            });
          } else if (!this.product[i].receivalQuantity) {
            return uni.showToast({
              title: `产品${i + 1}的数量不能为空`,
              icon: "none",
              duration: 1000,
            });
          } else if (
            this.product[i].receivalQuantity <= 0 ||
            String(this.product[i].receivalQuantity).indexOf(".") != -1
          ) {
            return uni.showToast({
              title: `产品${i + 1}的数量不能为0、负数、小数`,
              icon: "none",
              duration: 2000,
            });
          } else if (!this.product[i].position) {
            return uni.showToast({
              title: `产品${i + 1}的库位不能为空`,
              icon: "none",
              duration: 1000,
            });
          } else if (!this.product[i].price) {
            return uni.showToast({
              title: `产品${i + 1}的单价不能为空`,
              icon: "none",
              duration: 1000,
            });
          } else if (!this.product[i].discountRate) {
            return uni.showToast({
              title: `产品${i + 1}的折率不能为空`,
              icon: "none",
              duration: 1000,
            });
          }
        }

        uni.showLoading({
          title: "加载中",
        });
        let paramsTrans = {
          inWarehouseId: this.inWarehouseId,
          warehouseId: this.paramsList[0].list[this.paramsList[0].selectIndex].warehouseId,
          vendorId: this.paramsList[1].list[this.paramsList[1].selectIndex].supplierId,
          paymentTerms: this.paramsList[2].list[this.paramsList[2].selectIndex].dictValue,
          storeInWarehouseDetailBoList: this.product,
          status: 1,
        };
        let params = Object.assign({}, this.submitParams, paramsTrans);
        if (this.inWarehouseId && this.inWarehouseId.length > 0) {
          editStoreInWarehouse(params)
            .then((res) => {
              uni.hideLoading();
              if (res.code == 200) {
                uni.showToast({
                  title: "修改成功",
                  icon: "none",
                  duration: 1000,
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
          addStoreInWarehouse(params)
            .then((res) => {
              uni.hideLoading();
              if (res.code == 200) {
                uni.showToast({
                  title: "新增成功",
                  icon: "none",
                  duration: 1000,
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
      reduce(index) {
        this.product.splice(index, 1);
      },
      closeMask(e) {
        if (e.show == false) {
          this.paramsList[this.currIndex].selectIndex = [
            this.paramsList[this.currIndex].selected[0],
          ];
        }
      },
      cleanUp() {
        this.product = [{
          productName: "",
          receivalQuantity: "",
          position: "",
          price: "",
          discountRate: "",
        }, ];
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
              status: 0,
            };
            productList(params).then((final) => {
              if (final.code == 200) {
                if (final.data.items && final.data.items.length > 0) {
                  var is_push = true;
                  for (var i = 0; i < this.product.length; i++) {
                    if (Object.keys(this.product[i]).length == 0) {
                      this.$set(
                        this.product[i],
                        "productName",
                        final.data.items[0].name
                      );
                      this.$set(
                        this.product[i],
                        "productId",
                        final.data.items[0].productId
                      );
                      this.$set(
                        this.product[i],
                        "price",
                        final.data.items[0].retailPrice
                      );
                      this.$set(this.product[i], "position", null);
                      this.$set(this.product[i], "receivalQuantity", null);
                      this.$set(this.product[i], "discountRate", "1");
                      is_push = false;
                      break;
                    }
                  }
                  if (is_push) {
                    let temp = {
                      productName: final.data.items[0].name,
                      productId: final.data.items[0].productId,
                      price: final.data.items[0].retailPrice,
                      position: null,
                      receivalQuantity: null,
                      discountRate: "1",
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
    },
  };
</script>

<style lang="scss" scoped>
  .top {
    width: 750rpx;
    min-height: 480rpx;
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

      .search {
        width: 218rpx;
        height: 72rpx;
        background: #f1f1f1;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
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
      min-height: 1000rpx;
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
      min-height: 864rpx;
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