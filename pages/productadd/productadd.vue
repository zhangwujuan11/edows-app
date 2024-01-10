<template>
  <view>
    <view class="formcon">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span> 参数名称</view>
          <input class="uni-input" v-model="form.paramType" name="input" disabled />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>参数编号</view>
          <input class="uni-input" :disabled="!hasdata" v-model="form.paramCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">名称</view>
          <input class="uni-input" v-model="form.paramName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">备注</view>
          <input class="uni-input" v-model="form.remark" name="input" placeholder="请输入" />
        </view>
      </form>
    </view>
    <view class="modal-footer">
      <button type="button" @click="goback">取消</button>
              <button type="button" @click="subform" v-if="!hasdata"
        style="background-color: #007DFF;color: white;">修改</button>
              <button type="button" @click="addsubform" v-if="hasdata"
        style="background-color: #007DFF;color: white;">确认</button>
    </view>
  </view>
</template>

<script>
import {
  typeDatainfo,
  updatetypeData,
  addtypeData,
  delettypeData
} from '@/Api/invers.js'
import {
  toast,
  showConfirm,
  tansParams
} from '@/Api/common'
export default {
  data () {
    return {
      form: {},
      hasdata: true
    }
  },
  onBackPress (event) {
    if (event.from == "navigateBack") {
      const pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage = prevPage.$vm; 
      if (prevPage && prevPage.gettabledata) {
        prevPage.gettabledata();
      }
    }
  },
  onLoad (option) {
    if (option.paramId) {
      typeDatainfo(option.paramId).then(res => {
        if (res.code == 200) {
          this.form = res.data
          uni.setNavigationBarTitle({
            title: "修改参数"
          })
        }
      })
      this.hasdata = false
    } else {
      this.form.typeId = option.ids
      this.form.paramType = option.name
    }
  },
  methods: {
    // 修改提交
    subform () {
      if (!this.form.paramType) {
        this.$api.msg('请填写参数名称');
        return false;
      } else if (!this.form.paramCode) {
        this.$api.msg('请填参数编号');
        return false;
      } else {
        updatetypeData(this.form).then(res => {
          if (res.code == 200) {
            this.$api.msg("修改成功")
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
      uni.navigateTo({
        url: '/pages/productparams/productparams'
      })
    },
    addsubform () {
      if (!this.form.paramType) {
        this.$api.msg('请填写参数名称');
        return false;
      } else if (!this.form.paramCode) {
        this.$api.msg('请填参数编号');
        return false;
      } else {
        addtypeData(this.form).then(res => {
          if (res.code == 200) {
            toast("添加成功")
            setTimeout(() => {
              uni.navigateBack({
                data: 1
              })
            }, 1000)

          }
        })
      }
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
}

.modal-footer button {
  width: 330upx;
  border: none;
  border-radius: 5upx;
  cursor: pointer;
}

.formcon {
  width: 100%;
  min-height: 552rpx;
  background-color: white;
  padding: 37upx;
  margin-top: 20upx;
}

/deep/.uni-form-item {
  display: flex;
  min-height: 120upx;
}

.uni-form-item .title {
  width: 160upx;
}

.uni-form-item .title span {
  color: red;
}</style>
