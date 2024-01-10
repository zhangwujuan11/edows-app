<template>
  <view>
    <view class="formcon">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>类型</view>
          <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" :value="typevalue" :range="array" :disabled="ischange">
              <view class="uni-input" style="width:550upx;height: 46upx;">{{ array[index] }}</view>
            </picker>
          </view>
        </view>
        <view class="uni-form-item uni-column" v-if="index == 1">
          <view class="title"><span>*</span>品牌编码</view>
          <input class="uni-input" v-model="form.brandCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column" v-if="index == 1">
          <view class="title"><span>*</span>品牌名称</view>
          <input class="uni-input" v-model="form.brandName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column" v-if="index == 0">
          <view class="title"><span>*</span>车型编码</view>
          <input class="uni-input" v-model="form.brandCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column" v-if="index == 0">
          <view class="title"><span>*</span>车型名称</view>
          <input class="uni-input" v-model="form.brandName" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">图片上传</view>
          <image class="cramchekimg" @click="checkimg" src="https://store.edows.cn//image/imageadd.png"></image>
          <image v-if="form.brandImg" :src="form.brandImg" class="cramchekimg" style="margin-left: 10upx;"></image>
        </view>
        <view class="uni-form-item uni-column" style="margin-top: 226upx;">
          <view class="title">备注</view>
          <input class="uni-input" v-model="form.remark" name="input" placeholder="请输入" />
        </view>
      </form>
    </view>
    <view class="modal-footer">
      <button type="button" @click="goback">取消</button>
              <button type="button" @click="subten('no')" style="background-color: #007DFF;color: white;"
        v-if="ischange">修改</button>
              <button type="button" @click="subten('yes')" style="background-color: #007DFF;color: white;"
        v-if="!ischange">确定</button>
    </view>
  </view>
</template>

<script>
import {
  bandsinfo,
  updatabands,
  addbands
} from '@/Api/invers.js'
import {
  web
} from "@/Api/config.js"
export default {
  data () {
    return {
      index: null,
      typevalue: '',
      array: ['车型', '品牌'],
      imgPath: '',
      form: {
        type: '',
        remark: ''
      },
      ischange: false
    }
  },
  onBackPress (event) {
    if (event.from == "navigateBack") {
      const pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage = prevPage.$vm;
      if (prevPage && prevPage.tabledata) {
        prevPage.geilist();
      }
    }
  },
  onLoad (option) {
    if (option.id) {
      bandsinfo(option.id).then(res => {
        this.form = res.data
        this.index = res.data.type
        this.ischange = true
      })
      uni.setNavigationBarTitle({
        title: '修改' + option.name
      });
    } else {
      this.ischange = false
      uni.setNavigationBarTitle({
        title: '新增' + option.name
      });
    }
    this.form.parentId = option.paramsid

  },
  methods: {
    bindPickerChange (e) {
      this.index = e.target.value
      this.form.type = e.target.value
    },
    // 长传图片
    checkimg () {
      var _self = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: res => {
          // wx.getFileSystemManager().readFile({
          // 	filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          // 	encoding: 'base64', //编码格式
          // 	success: res => { //成功的回调
          // 	}
          // })
          uni.uploadFile({
            url: web.invesUrl + 'ry/common/upload',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
              Authorization: "Bearer " + uni.getStorageSync('userInfo').token,
            },
            success: (uploadFileRes) => {
              let imgValue = JSON.parse(uploadFileRes.data)
              this.$set(this.form, 'brandImg', imgValue.url)
            }
          });
        },
        error: function (e) {
          console.log('error', e);
        }
      });
    },
    subten (e) {
      if (e == 'no') {
        updatabands(this.form).then(res => {
          if (res.code == 200) {
            if (res.code == 200) {
              this.$api.msg("修改成功")
              setTimeout(() => {
                uni.navigateBack({
                  data: 1
                })
              }, 1000)

            }
          }
        })
      } else {
        addbands(this.form).then(res => {
          if (res.code == 200) {
            if (res.code == 200) {
              this.$api.msg("创建成功")
              setTimeout(() => {
                uni.navigateBack({
                  data: 1
                })
              }, 1000)
            }
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
  min-height: 722rpx;
}

/deep/.uni-form-item {
  display: flex;
  min-height: 120upx;
}

.uni-form-item .title {
  width: 200upx;
}

.uni-form-item .title span {
  color: red;
}

/deep/.uni-button,
button {
  font-size: 28upx;
}

.cramchekimg {
  width: 216upx;
  height: 216upx;
  display: block;
}</style>
