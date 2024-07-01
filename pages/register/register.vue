<template>
  <view style="padding-bottom: 100rpx">
    <view class="box">
      <view class="title">基本信息</view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>门店名称</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.name"
            placeholder="请按营业执照上的名称填写"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>联系电话</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.linktel"
            placeholder="请输入联系电话"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>统一社会信用代码</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.nsrsbh"
            placeholder="请输入统一社会信用代码"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>法人代表</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.legalPerson"
            placeholder="请输入法人代表"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>负责人姓名</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.chargeName"
            placeholder="请输入负责人姓名"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>负责人联系电话</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.chargeMobile"
            placeholder="请输入负责人联系电话"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>短信验证码</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.verifyCode"
            placeholder="请输入短信验证码"
            placeholder-class="placeholder"
          />
          <view class="codeName" @click="countdown">{{ codeName }}</view>
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>负责人微信</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.chargeWx"
            placeholder="请输入负责人微信"
            placeholder-class="placeholder"
          />
        </view>
      </view>
    </view>
    <view class="box">
      <view class="title">门店信息</view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>销售区域</view>
        <view class="item-input">
          <pick-regions @getRegion="handleGetRegion">
            <view style="display: flex; align-items: center">
              <view v-if="regionName">{{ regionName }}</view>
              <view v-else class="placeholder">请选择销售区域</view>
              <image class="expand" src="/static/mine/to.png"></image>
            </view>
          </pick-regions>
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>详细地址</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="text"
            v-model="formData.address"
            placeholder="请输入详细地址"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>门店数量</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.shopNum"
            placeholder="请输入门店数量"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>门店面积(m²)</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.shopArea"
            placeholder="请输入门店面积(m²)"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>安装工位(个)</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.azgwNum"
            placeholder="请输入安装工位(个)"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>安装技师(个)</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.azjsNum"
            placeholder="请输入安装技师(个)"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label"><text class="symbol">*</text>可提供服务</view>
        <view class="item-input">
          <checkbox-group @change="handleChange">
            <label
              v-for="(item, index) of serverList"
              :key="index"
              class="server-check"
            >
              <checkbox :value="item.value" />{{ item.label }}</label
            >
          </checkbox-group>
        </view>
      </view>
      <view class="box-item">
        <view class="label">营业时间</view>
        <view class="item-input">
          <picker mode="time" :value="formData.openb" @change="bindBTimeChange">
            <view style="display: flex; align-items: center">
              <text class="time-labelb">早</text>
              <view v-if="formData.openb" class="uni-input">{{
                formData.openb
              }}</view>
              <view v-else class="placeholder">请选择</view>
            </view>
          </picker>
          <picker mode="time" :value="formData.opene" @change="bindETimeChange">
            <view style="display: flex; align-items: center">
              <text class="time-labele">晚</text>
              <view v-if="formData.opene" class="uni-input">{{
                formData.opene
              }}</view>
              <view v-else class="placeholder">请选择</view>
            </view>
          </picker>
        </view>
      </view>
      <view class="box-item">
        <view class="label">户外安装工具车(辆)</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.hwazgjcNum"
            placeholder="请输入户外安装工具车(辆)"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label">仓库数量</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.warehousesNum"
            placeholder="请输入仓库数量"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label">仓库面积</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.warehousesArea"
            placeholder="请输入仓库面积"
            placeholder-class="placeholder"
          />
        </view>
      </view>
      <view class="box-item">
        <view class="label">库存情况(万元)</view>
        <view class="item-input">
          <input
            class="uni-inputs"
            type="number"
            v-model="formData.stores"
            placeholder="请输入库存情况"
            placeholder-class="placeholder"
          />
        </view>
      </view>
    </view>
    <view class="read-box">
      <checkbox value="1" :checked="isChecked" @click="readAgree" />
      <text class="label">我已阅读并同意</text>
      <text class="link" @click="gostorepage(20)"
        >《法律声明及隐私权政策》</text
      >
    </view>
    <view class="confirm" @click="confirm">立即提交</view>
  </view>
</template>

<script>
import pickRegions from "@/components/pick-regions/pick-regions.vue";
import { web } from "@/Api/config.js";
export default {
  components: { pickRegions },
  data() {
    return {
      formData: {
        name: "",
        linktel: "",
        nsrsbh: "",
        legalPerson: "",
        chargeName: "",
        chargeMobile: "",
        verifyCode: "",
        chargeWx: "",
        provinceId: "", //: 省 ,
        cityId: "", //: 市 ,
        zoneId: "", //: 区 ,
        address: "", //地址
        shopNum: "", //门店数量
        shopArea: "", //门店面积
        azjsNum: "", //安装技师
        openb: "",
        opene: "",
        hwazgjcNum: "", // 户外安装工具车（辆）
        warehousesNum: "", // 仓库数量
        warehousesArea: "", //仓库面积
        stores: "", //库存情况（万元）
        shopArea: "", //门店面积
        serviceProvide: "", //可供服务
        saleArea: "",
      },
      codeName: "获取验证码",
      anti_shake: true,
      timer: null,
      region: [],
      isChecked: true,
      serverList: "",
    };
  },
  computed: {
    regionName() {
      return this.region.map((item) => item.text).join(" ");
    },
  },
  onLoad() {
    this.getServer();
  },
  methods: {
    countdown() {
      let time = 60;
      this.getCode().then((res) => {
        if (res.code == 200) {
          let interval = setInterval(() => {
            time--;
            this.codeName = time + "s";
            if (time <= 0) {
              clearInterval(interval);
              this.codeName = "获取验证码";
            }
          }, 1000);
        } else {
          uni.showToast({
            title: `${res.message}`,
            icon: "none",
            duration: 1500,
          });
        }
      });
    },
    checkPhone() {
      var reg =
        /^(0|86|17951)?(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
      return reg.test(this.formData.chargeMobile);
    },
    getCode() {
      clearTimeout(this.timer);

      return new Promise((resolve, reject) => {
        if (!this.checkPhone()) {
          uni.showToast({
            title: "请正确填写负责人电话",
            icon: "none",
            duration: 1500,
          });
        } else if (
          this.formData.chargeMobile &&
          this.codeName == "获取验证码" &&
          this.anti_shake
        ) {
          this.anti_shake = false;
          let params = { telephone: this.formData.chargeMobile };
          uni
            .request({
              method: "get",
              timeout: 10000,
              url: web.renew + "member/getAuthCode",
              dataType: "json",
              data: params,
            })
            .then((response) => {
              let [error, res] = response;
              resolve(res.data);
            });
        }
        this.timer = setTimeout(() => {
          this.anti_shake = true;
        }, 1000);
      });
    },
    handleGetRegion(region) {
      this.formData.provinceId = region[0].value;
      this.formData.cityId = region[1].value;
      this.formData.zoneId = region[2].value;
      this.formData.saleAreaId = region[2].value;
      this.region = region;
      this.formData.saleArea = region[0].text + region[1].text + region[2].text
    },
    bindBTimeChange(e) {
      this.formData.openb = e.detail.value;
    },
    bindETimeChange(e) {
      this.formData.opene = e.detail.value;
    },
    confirm() {
      if (this.chackInfo() === true) {
        uni
          .request({
            method: "post",
            timeout: 10000,
            url: web.renew + "member/register",
            dataType: "json",
            data: this.formData,
          })
          .then((response) => {
            let [error, res] = response;
            if (res.data.code == 200) {
              uni.showToast({
                title: "感谢您注册易道大咖，请耐心等待审核！",
                icon: "none",
                duration: 2000,
              });
            } else {
              uni.showToast({
                title: `${res.data.message}`,
                icon: "none",
                duration: 2000,
              });
            }
          });
      }
    },
    readAgree() {
      this.isChecked = !this.isChecked;
    },
    gostorepage(e) {
      uni.navigateTo({
        url: "/pages/storepage/storepage?id=" + e,
      });
    },
    getServer() {
      uni
        .request({
          method: "get",
          timeout: 10000,
          url: web.renew + "shopAudit/getServiceProvide",
          dataType: "json",
        })
        .then((response) => {
          let [error, res] = response;
          if (res.data.code == 200) {
            this.serverList = res.data.data;
          }
        });
    },
    handleChange(e) {
      if (e.detail.value.length > 0) {
        this.formData.serviceProvide = "," + e.detail.value.join(",") + ",";
      } else {
        this.formData.serviceProvide = "";
      }
    },
    chackInfo() {
      if (!this.formData.name) {
        return uni.showToast({
          title: "门店名称不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.linktel) {
        return uni.showToast({
          title: "联系电话不能为空",
          icon: "none",
          duration: 1500,
        });
      }

      if (!this.formData.nsrsbh) {
        return uni.showToast({
          title: "统一社会信用代码不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.legalPerson) {
        return uni.showToast({
          title: "法人代表不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.chargeName) {
        return uni.showToast({
          title: "负责人姓名不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.chargeMobile) {
        return uni.showToast({
          title: "负责人联系电话不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.checkPhone()) {
        return uni.showToast({
          title: "请正确输入负责人联系电话",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.verifyCode) {
        return uni.showToast({
          title: "短信验证码不能为空",
          icon: "none",
          duration: 1500,
        });
      }

      if (!this.formData.chargeWx) {
        return uni.showToast({
          title: "负责人微信不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.zoneId) {
        return uni.showToast({
          title: "销售区域不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.address) {
        return uni.showToast({
          title: "详细地址不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.shopNum) {
        return uni.showToast({
          title: "门店数量不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.shopArea) {
        return uni.showToast({
          title: "门店面积不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.azgwNum) {
        return uni.showToast({
          title: "安装工位不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.azjsNum) {
        return uni.showToast({
          title: "安装技师不能为空",
          icon: "none",
          duration: 1500,
        });
      }
      if (!this.formData.serviceProvide.split(",")[1]) {
        return uni.showToast({
          title: "可供服务不能为空",
          icon: "none",
          duration: 1500,
        });
      }

      if (!this.isChecked) {
        return uni.showToast({
          title: "您还未阅读并同意此协议",
          icon: "none",
          duration: 1500,
        });
      }

      return true;
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  margin: 20rpx 20rpx 0rpx 20rpx;
  background: #fff;
  border-radius: 6px;
  padding: 20rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  .expand {
    width: 16rpx;
    height: 24rpx;
    vertical-align: middle;
    display: inline-block;
    margin-left: 20rpx;
  }
  .title {
    height: 64rpx;
    border-bottom: 1px solid #eee;
    &::before {
      content: " ";
      padding: 1rpx 4rpx 0rpx 4rpx;
      background: #349cff;
      margin-right: 20rpx;
    }
  }
  .symbol {
    color: red;
  }
  .label {
    color: #999;
    text-indent: 6rpx;
    width: 180rpx;
  }
  .item-input {
    display: flex;
    width: 69%;
    background: #f4f6f8;
    border-radius: 12rpx;
    margin: 0rpx 10rpx 0rpx 0rpx;
    padding: 18rpx 20rpx 18rpx 20rpx;
    font-size: 28rpx;
    align-items: center;
    .uni-inputs /deep/ input {
      font-size: 26rpx;
      width: 270rpx;
    }
    .uni-input {
      font-size: 26rpx;
    }
  }
  .placeholder {
    font-size: 26rpx;
  }
  .box-item {
    display: flex;
    justify-content: space-between;
    min-height: 90rpx;
    align-items: center;
    margin-top: 10rpx;
  }
  .server-check {
    display: inline-block;
    margin-right: 10rpx;
  }
  .codeName {
    font-size: 28rpx;
    width: 220rpx;
    color: #999;
    line-height: 46rpx;
    text-align: center;
  }
  .time-labelb {
    margin-right: 20rpx;
  }
  .time-labele {
    margin-left: 20rpx;
    margin-right: 20rpx;
  }
}
.read-box {
  display: flex;
  margin: 32rpx 0 20rpx 5%;
  .label {
    font-size: 26rpx;
  }
  .link {
    color: #349cff;
    font-size: 26rpx;
    margin-left: 10rpx;
  }
}
.confirm {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  background-color: #359cff;
}
::v-deep .uni-checkbox-input {
  width: 30rpx;
  height: 30rpx;
  margin-bottom: 10rpx;
}
</style>