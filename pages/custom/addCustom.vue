<template>
  <view>
    <view style="padding-top: 24rpx">
      <view class="row">
        <view class="label"><text class="symbol">*</text>名称</view>
        <input
          v-model="formData.name"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>简称</view>
        <input
          v-model="formData.shorterName"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label">主营</view>
        <input
          v-model="formData.principal"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>信用度</view>
        <input
          type="digit"
          v-model="formData.credit"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>销售折扣</view>
        <input
          type="digit"
          v-model="formData.salesRate"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入，0.1为1折"
        />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>电话</view>
        <input
          type="tel"
          v-model="formData.phone"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label"><text class="symbol">*</text>地址</view>
        <input
          v-model="formData.customerAddress"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label">银行</view>
        <input
          v-model="formData.customerBank"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row">
        <view class="label">银行卡号</view>
        <input
          type="number"
          v-model="formData.customerBankAccount"
          class="uni-input"
          placeholder-class="placeholder"
          placeholder="请输入"
        />
      </view>
      <view class="row-select">
        <view class="label"><text class="symbol">*</text>分类</view>
        <view class="flex" @click="openClassify">
          <view class="input" v-if="classifyValue">{{ classifyValue }}</view>
          <view v-else class="sel">请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
      </view>
      <view class="row">
        <view class="label">客户参数</view>
        <image
          v-if="isExpand"
          @click="isExpand = !isExpand"
          class="expand-top"
          src="/static/arrow_top.png"
        ></image>
        <image
          v-else
          @click="isExpand = !isExpand"
          class="expand"
          src="/static/bottom.png"
        ></image>
      </view>
      <view v-show="isExpand">
        <view
          class="row-child"
          v-for="(item, index) of paramsList"
          :key="index"
        >
          <view class="label">{{ item.name }}</view>
          <view class="flex" @click="open(index)">
            <view class="input" v-if="paramsList[index].value">{{
              item.value
            }}</view>
            <view v-else class="sel">请选择</view>
            <image class="expand" src="/static/mine/to.png"></image>
          </view>
        </view>
      </view>
      <view class="row">
        <view class="label">状态</view>
        <!-- <switch
          @change="switchStatus"
          :checked="formData.status == '0' ? false : true"
          color="#007DFF"
        /> -->
        <radio-group @change="switchStatus">
          <label class="radio"
            ><radio value="0" :checked="formData.status == '0'" />启用</label
          >
          <label style="margin-left: 20rpx" class="radio"
            ><radio value="1" :checked="formData.status == '1'" />禁用</label
          >
        </radio-group>
      </view>
      <view class="row">
        <view class="label">备注</view>
        <textarea
          maxlength="300"
          class="uni-input"
          placeholder-class="placeholder"
          v-model="formData.remark"
          auto-height
          placeholder="请输入"
        />
      </view>
      <view class="bottom">
        <view class="cancel" @click="cancel">取消</view>
        <view class="sure" @click="submit">确定</view>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close">取消</view>
          <view class="center">{{ selectDisplay }}</view>
          <view class="success" @click="success">完成</view>
        </view>
        <picker-view
          :indicator-style="indicatorStyle"
          :value="paramsList[this.currIndex].selected"
          @change="bindChange"
          class="picker-view"
        >
          <picker-view-column>
            <view
              class="item"
              v-for="(item, index) in paramsList[this.currIndex].list"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>

    <uni-popup ref="classify" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close">取消</view>
          <view class="center">请选择分类</view>
          <view class="success" @click="confirm">完成</view>
        </view>
        <picker-view
          :indicator-style="indicatorStyle"
          :value="classifySelected"
          @change="classifyChange"
          class="picker-view"
        >
          <picker-view-column>
            <view
              class="item"
              v-for="(item, index) in classifyList"
              :key="index"
              >{{ item.classifyName }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import {
  customManagementDetail,
  listAll,
  customerClassifyList,
  editCustomManagement,
  addCustomManagement,
} from "@/Api/purchaseSales.js";
export default {
  components: {
    uniPopup: uniPopup,
  },
  data() {
    return {
      isExpand: false,
      indicatorStyle: `height: 50px;`,
      customParams: [],
      paramsList: [
        {
          id: 44,
          name: "省份",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 45,
          name: "市县",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 43,
          name: "片区",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 46,
          name: "网点大区",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 47,
          name: "网点小区",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 42,
          name: "客户状态",
          value: "",
          selected: [0],
          list: [],
        },
        {
          id: 41,
          name: "业绩分类",
          value: "",
          selected: [0],
          list: [],
        },
      ],
      currIndex: 0,
      selectIndex: 0,
      formData: {
        name: "",
        shorterName: "",
        principal: "",
        credit: null,
        salesRate: null,
        phone: "",
        customerAddress: "",
        customerBank: "",
        customerBankAccount: "",
        status: "0",
        remark: "",
        storeTypeDataVoList: [],
      },
      selectDisplay: "",
      classifyList: [],
      classifySelected: [0],
      classifyValue: "",
      classifyIndex: 0,
      customId: "",
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
  async onLoad(option) {
    if (option.id) {
      uni.setNavigationBarTitle({
        title: "修改客户",
      });
    }
    this.getParams();
    await this.getClassifyList();
    if (option.id) {
      this.customId = option.id;
      this.getDetail(option.id);
    }
  },
  methods: {
    open(e) {
      this.$refs.popup.open();
      this.currIndex = e;
      this.selectDisplay = `请选择${this.paramsList[this.currIndex].name}`;
    },
    bindChange(e) {
      this.selectIndex = e.detail.value[0];
    },
    close() {
      this.$refs.popup.close();
      this.$refs.classify.close();
    },
    success() {
      this.paramsList[this.currIndex].value =
        this.paramsList[this.currIndex].list[this.selectIndex].label;
      this.paramsList[this.currIndex].selected = [this.selectIndex];
      this.$refs.popup.close();
    },
    cancel() {
      uni.navigateBack({
        delta: 1,
      });
    },
    getDetail(id) {
      uni.showLoading({
        title: "加载中",
      });
      customManagementDetail(id).then((res) => {
        if (res.code == 200) {
          uni.hideLoading();
          this.formData = res.data;
          for (var i = 0; i < this.classifyList.length; i++) {
            if (
              this.classifyList[i].customerClassifyId == res.data.classifyId
            ) {
              this.classifyValue = this.classifyList[i].classifyName;
              this.classifySelected = [i];
              break;
            }
          }
          if (res.data.storeTypeDataVoList) {
            this.paramsList.forEach((item) => {
              for (var i = 0; i < res.data.storeTypeDataVoList.length; i++) {
                if (item.id == res.data.storeTypeDataVoList[i].typeId) {
                  item.value = res.data.storeTypeDataVoList[i].label;
                  item.selected = [i];
                  break;
                }
              }
            });
          }
        }
      });
    },
    getParams() {
      this.paramsList.forEach((item) => {
        listAll({ typeId: item.id }).then((res) => {
          item.list = res.data ? res.data : [];
        });
      });
    },
    classifyChange(e) {
      this.classifyIndex = e.detail.value[0];
    },
    openClassify() {
      this.$refs.classify.open();
    },
    getClassifyList() {
      return new Promise((resolve, reject) => {
        customerClassifyList().then((res) => {
          if (res.code == 200) {
            this.classifyList = res.data.items;
            resolve(res);
          }
        });
      });
    },
    confirm() {
      this.classifyValue = this.classifyList[this.classifyIndex].classifyName;
      this.$refs.classify.close();
    },
    switchStatus(e) {
      this.formData.status = e.detail.value;
    },
    submit() {
      if (!this.formData.name) {
        return uni.showToast({
          title: "名称不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.formData.shorterName) {
        return uni.showToast({
          title: "简称不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.formData.credit) {
        return uni.showToast({
          title: "信用度不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.formData.salesRate) {
        return uni.showToast({
          title: "销售折扣不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.formData.phone) {
        return uni.showToast({
          title: "电话不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.formData.customerAddress) {
        return uni.showToast({
          title: "地址不能为空",
          icon: "none",
          duration: 1000,
        });
      } else if (!this.classifyValue) {
        return uni.showToast({
          title: "分类不能为空",
          icon: "none",
          duration: 1000,
        });
      }
      let classify_id =
        this.classifyList[this.classifyIndex].customerClassifyId;
      let typedatavo_list = [];
      this.paramsList.forEach((item) => {
        if (item.list.length > 0) {
          typedatavo_list.push(...item.list);
        }
      });
      let customer_id = typedatavo_list.map((item) => {
        return item.paramId;
      });
      let params = {
        ...this.formData,
        classifyId: classify_id,
        storeCustomerParamIdList: customer_id,
        storeTypeDataVoList: typedatavo_list,
      };

      if (this.customId && this.customId.length > 0) {
        editCustomManagement(params).then((res) => {
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
        });
      } else {
        addCustomManagement(params).then((res) => {
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
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  padding: 37rpx 32rpx 37rpx 32rpx;
  width: 750rpx;
  min-height: 118rpx;
  background: #ffffff;
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
  .expand {
    width: 28rpx;
    height: 28rpx;
  }
  .expand-top {
    width: 24rpx;
    height: 15rpx;
  }
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
  }
}
.row-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 37rpx 32rpx 37rpx 100rpx;
  width: 750rpx;
  height: 120rpx;
  background: #fcfbfc;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  .label {
    font-size: 32rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #010914;
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
  .row {
    display: flex;
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
.bottom {
  width: 750rpx;
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx -6rpx 12rpx 1rpx rgba(0, 0, 0, 0.1);
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20rpx;
  .cancel {
    width: 330rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #f5f7fb;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #010914;
    margin-left: 20rpx;
  }
  .sure {
    width: 330rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background: #007dff;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-size: 28rpx;
    font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
    font-weight: normal;
    color: #ffffff;
    margin-right: 20rpx;
  }
}
</style>