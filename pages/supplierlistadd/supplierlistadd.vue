<template>
  <view>
    <view class="formcon">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>编码</view>
          <input class="uni-input" v-model="form.supplierCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>名称</view>
          <input class="uni-input" v-model="form.supplierName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>联系电话</view>
          <input class="uni-input" v-model="form.telephone" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">供应商类型</view>
          <input class="uni-input" v-model="form.typeCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>简称</view>
          <input class="uni-input" v-model="form.simpleName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">纳税识别号</view>
          <input class="uni-input" v-model="form.nsrsbh" name="input" placeholder="请输入" />
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">开户行</view>
          <input class="uni-input" v-model="form.bankName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">银行账号</view>
          <input class="uni-input" v-model="form.bankNo" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>地址</view>
          <input class="uni-input" v-model="form.address" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>负责人</view>
          <input class="uni-input" v-model="form.contactsName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>负责人电话</view>
          <input class="uni-input" v-model="form.contactsMobile" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">负责人微信号</view>
          <input class="uni-input" v-model="form.contactsWx" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">负责人邮箱</view>
          <input class="uni-input" v-model="form.contactsEmail" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">状态</view>
          <radio-group @change="radioChange">
            <view style="display: flex;">
              <radio value="0" :checked="form.status == 0" />启用
              <view style="width: 30upx;"></view>
              <radio value="1" :checked="form.status == 1" />禁用
            </view>
          </radio-group>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">备注</view>
          <input class="uni-input" v-model="form.remark" name="input" placeholder="请输入" />
        </view>
      </form>
    </view>
    <view class="modal-footer">
      <button type="button" @click="goback">取消</button>
              <button type="button" style="background-color: #007DFF;color: white;" @click="submitForm">确定</button>
    </view>
  </view>
</template>

<script>
import {
  supperadd,
  supperinfo,
  supperupdata
} from '@/Api/invers.js'
export default {
  data () {
    return {
      form: {
        status: '0'
      },
      id: ''
    }
  },
  onBackPress (event) {
    if (event.from == "navigateBack") {
      const pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage = prevPage.$vm; 
      if (prevPage && prevPage.tabledata) {
        prevPage.getlist();
      }
    }
  },
  onLoad (option) {
    this.id = option.id
    if (option.id) {
      supperinfo(option.id).then(res => {
        this.form = res.data
      })
    }
  },
  methods: {
    // 状态
    radioChange (e) {
      this.form.status = e.target.value
    },
    submitForm () {
      if (!this.form.supplierCode) {
        this.$api.msg('编码不能为空')
        return;
      }
      if (!this.form.supplierName) {
        this.$api.msg('名称不能为空')
        return;
      }
      if (!this.form.telephone) {
        this.$api.msg('联系电话号不能为空')
        return;
      }
      if (!this.form.simpleName) {
        this.$api.msg('简称不能为空')
        return;
      }
      if (!this.form.address) {
        this.$api.msg('地址不能为空')
        return;
      }
	  if(!this.form.contactsName){
		  this.$api.msg('负责人不能为空')
		  return;
	  }
	  if(!this.form.contactsMobile){
		  this.$api.msg('负责人电话不能为空')
		  return;
	  }
      if (!this.form.status) {
        this.$api.msg('状态不能为空')
        return;
      }
      if (this.id) {
        supperupdata(this.form).then(res => {
          if (res.code == 200) {
            this.$api.msg("修改成功")
            setTimeout(() => {
              uni.navigateBack({
                data: 1
              })
            }, 1000)
          }
        })
      } else {
        supperadd(this.form).then(res => {
          if (res.code == 200) {
            this.$api.msg("添加成功")
            setTimeout(() => {
              uni.navigateBack({
                data: 1
              })
            }, 1000)
          }
        })
      }

    },
    goback () {
      uni.navigateBack({
        data: 1
      })
    }
  }
}
</script>

<style scoped>
.modal-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 35upx 0;
  z-index: 9;
}

.modal-footer button {
  width: 330upx;
  border: none;
  border-radius: 5upx;
  cursor: pointer;
}

.formcon {
  width: 100%;
  background-color: white;
  padding: 37upx;
  padding-bottom: 100upx;
  margin: 20upx 0;
}

/deep/.uni-form-item {
  display: flex;
  height: 120upx;
}

.uni-form-item .title {
  width: 190upx;
}

.uni-form-item .title span {
  color: red;
}

.uni-form-item .uni-input {
  width: calc(100% - 92px);
  text-align: right;
}

.mask {
  background-color: #ffffff;
}

.mask .row {
  display: flex;
  justify-content: space-between;
  padding: 37rpx 32rpx 37rpx 32rpx;
  width: 750rpx;
  height: 118rpx;
  background: #ffffff;
}

.mask .center {
  font-size: 36rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #303133;
}

.mask .success {
  font-size: 32rpx;
  font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
  color: #007dff;
}

.mask .close {
  font-size: 32rpx;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}

.picker-view {
  width: 750rpx;
  height: 500rpx;
}

.item {
  line-height: 100rpx;
  text-align: center;
}

.sel {
  font-size: 32rpx;
  font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
  font-weight: normal;
  color: #999999;
  margin-right: 20rpx;
  width: calc(100% - 92px);
  text-align: right;
}

.input {
  font-size: 32rpx;
  font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
  font-weight: normal;
  color: #333333;
  margin-right: 20rpx;
  width: calc(100% - 92px);
  text-align: right;
}

.expand {
  width: 16rpx;
  height: 24rpx;
  margin-top: 14upx;
  /* vertical-align: middle; */
}
</style>