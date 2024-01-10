<template>
  <view>
    <view class="formcon">
      <form @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>carg码</view>
          <input class="uni-input" v-model='form.carg' name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>产品名称</view>
          <input class="uni-input" v-model="form.name" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">工艺图纸</view>
          <input class="uni-input" v-model="form.technologyImg" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column" @click="openClassify">
          <view class="title"><span>*</span>品牌</view>
          <view class="input" v-if="classifyValue" style="width: calc(100% -92px);">{{ classifyValue }}</view>
          <view class="sel" v-else>请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
        <view class="uni-form-item uni-column" v-if="cheoption != null" @click="openchexin">
          <view class="title">车型</view>
          <view class="input" v-if="chexinValue" style="width: calc(100% -92px);">{{ chexinValue }}</view>
          <view class="sel" v-else>请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
          <!-- <input class="uni-input"  v-model="form.motorcycleId" name="input" placeholder="请输入" /> -->
        </view>
        <view class="uni-form-item uni-column" @click="openClassifycla">
          <view class="title">分类</view>
          <view class="input" v-if="classname" style="width: calc(100% -92px);">{{ classname }}</view>
          <view class="sel" v-else>请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>


        <view class="uni-form-item uni-column">
          <view class="title">长度</view>
          <input class="uni-input" v-model="form.prodLength" name="input" placeholder="请输入" />
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">宽度</view>
          <input class="uni-input" v-model="form.prodWidth" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">中高</view>
          <input class="uni-input" v-model="form.risingFalling" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">对角</view>
          <input class="uni-input" v-model="form.diagonal" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>零售价</view>
          <input class="uni-input" v-model="form.retailPrice" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">本厂编码</view>
          <input class="uni-input" v-model="form.factoryCode" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">原厂件号</view>
          <input class="uni-input" v-model="form.partNumber" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">颜色</view>
          <input class="uni-input" v-model="form.prodColour" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">彩带</view>
          <input class="uni-input" v-model="form.coloredRibbon" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">单位</view>
          <input class="uni-input" v-model="form.unit" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>库存预警</view>
          <input class="uni-input" v-model="form.inventoryAlert" name="input" placeholder="请输入" />
        </view>
        <view class="uni-form-item uni-column" @click="superclick">
          <view class="title"><span>*</span>供应商</view>
          <!-- <input class="uni-input" v-model="form.suppliers" name="input" placeholder="请输入" /> -->
          <view class="input" v-if="supername" style="width: calc(100% -92px);">{{ supername }}</view>
          <view class="sel" v-else>请选择</view>
          <image class="expand" src="/static/mine/to.png"></image>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title" @tap="showTree">产品参数</view>
          <view class="input" @tap="showTree" v-if="storeProductParamRelList" style="width: calc(100% -92px);">
            <text style="margin-left: 5upx;" v-for="(item, index) in storeProductParamRelList">{{ "“" + item.paramName +
              "”" }}</text>
          </view>
          <view class="sel" @tap="showTree" v-else>请选择</view>
          <image class="expand" @tap="showTree" src="/static/mine/to.png"></image>
          <tki-tree ref="tkitree" :multiple="true" :range="list" rangeKey="label" @confirm="treeConfirm"></tki-tree>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title"><span>*</span>状态</view>
          <radio-group @change="radioChange">
            <view style="display: flex;">
              <radio value="0" :checked="form.status == '0'" />启用
              <view style="width: 30upx;"></view>
              <radio value="1" :checked="form.status == '1'" />禁用
            </view>
          </radio-group>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">产品备注</view>
          <input class="uni-input" v-model="form.remark" name="input" placeholder="请输入" />
        </view>
      </form>
    </view>
    <view class="modal-footer">
      <button type="button" @click="goback">取消</button>
              <button type="button" style="background-color: #007DFF;color: white;" @click="subform">确定</button>
    </view>
    <!-- 品牌 -->
    <uni-popup ref="classify" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="close">取消</view>
          <view class="center">请选择品牌</view>
          <view class="success" @click="confirm">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" class="picker-view" @change="classifyChange">
          <picker-view-column>
            <view class="item" v-for="(item, index) in paramsList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
    <!-- 分类 -->
    <uni-popup ref="classifycla" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="closecla">取消</view>
          <view class="center">请选择分类</view>
          <view class="success" @click="confirmcla">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" class="picker-view" @change="classifyChangecla">
          <picker-view-column>
            <view class="item" v-for="(item, index) in classList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
    <!-- 供应商 -->
    <uni-popup ref="superfy" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="closesuper">取消</view>
          <view class="center">请选择供应商</view>
          <view class="success" @click="confirmsuper">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" class="picker-view" @change="superChange">
          <picker-view-column>
            <view class="item" v-for="(item, index) in superList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>

    <!-- 车型 -->
    <uni-popup ref="chexinfy" type="bottom">
      <view class="mask">
        <view class="row">
          <view class="close" @click="closechexin">取消</view>
          <view class="center">请选择车型</view>
          <view class="success" @click="confirmchexin">完成</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" class="picker-view" @change="chexinChange">
          <picker-view-column>
            <view class="item" v-for="(item, index) in chexinList" :key="index">{{ item }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import {
    producinfo,
    pinpailist,
    classlist,
    superlist,
    canshutree,
    cehcalss,
    getTypeData,
    listTypeData,
    updatapouduct,
    addapouduct
  } from '@/Api/invers.js'
  import tkiTree from '@/components/tki-tree.vue';
  export default {
    components: {
      tkiTree
    },
    data() {
      return {
        // 表单参数
        form: {
          status: "0",
          productParams: [],
          suppliers: []
        },
        // 品牌
        bans: [],
        paramsList: [],
        classifyValue: '',
        classifyIndex: 0,
        // 分类
        csslist: [],
        classList: [],
        classname: '',
        classifyclaIndex: 0,
        // 供应商
        sulist: [],
        superList: [],
        supername: '',
        superIndex: 0,
        list: [],
        flod: false,
        cheoption: null,

        // chexing
        chelist: [],
        chexinList: [],
        chexinValue: '',
        chexinIndex: 0,
        storeProductParamRelList: [],
        id: '',
        indicatorStyle: `height: 50px;`,
      }
    },
    onBackPress(event) {
      if (event.from == "navigateBack") {
        const pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage = prevPage.$vm;
        if (prevPage && prevPage.tabledata) {
          prevPage.getlist();
        }
      }
    },
    onLoad(option) {

      // 品牌下拉框
      pinpailist().then(res => {
        this.bans = res.data.items
        res.data.items.map(item => {
          this.paramsList.push(item.brandName)
        })
      })

      // 分类下拉框
      classlist().then(res => {
        this.csslist = res.data
        res.data.map(item => {
          this.classList.push(item.dictLabel)
        })
      })

      // 供应商下拉框
      superlist().then(res => {
        this.sulist = res.data.items
        res.data.items.map(item => {
          this.superList.push(item.supplierName)
        })
      })

      // 车型下拉列表
      cehcalss().then(res => {
        this.chelist = res.data.items
        res.data.items.map(item => {
          this.chexinList.push(item.brandName)
        })
      })
      // 产品参数
      canshutree().then(res => {
        res.data.map(item => {
          if (item.children) {
            this.list.push(item)
          }
        })
      })
      this.$nextTick(() => {
        this.id = option.id
        if (option.id) {
          producinfo(option.id).then(res => {
            this.form = res.data
            if (res.data.productBrandId) {
              this.classifyValue = this.bans.filter(item => item.productBrandId == res.data.productBrandId)[0]
                .brandName
            }
            if (res.data.motorcycleId) {
              this.chexinValue = this.chelist.filter(item => item.productBrandId == res.data.motorcycleId)[0]
                .brandName
            }
            if (res.data.classify) {
              this.classname = this.csslist.filter(item => item.dictValue == res.data.classify)[0].dictLabel
            }
            if (res.data.suppliers) {
              this.supername = this.sulist.filter(item => item.supplierId == res.data.suppliers[0])[0].supplierName
            }else{
				this.form.suppliers=[]
			}
            if (res.data.storeProductParamRelList) {
              this.storeProductParamRelList = res.data.storeProductParamRelList
              let addarray = []
              this.list.map(item => {
                for (let i = 0; i < item.children.length; i++) {
                  for (let j = 0; j < res.data.storeProductParamRelList.length; j++) {
                    if (item.children[i].id == res.data.storeProductParamRelList[j].paramId) {
                      this.$set(item, 'checked', true)
                      this.$set(item.children[i], 'checked', true)
                      this.$set(item, 'checked', false)
                    }
                  }
                }
                return this.list
              })
            }
            // getTypeData(res.data.productBrandId).then(ress => {
            //   listTypeData({
            //     parentId: ress.data.parentId,
            //     type: 1
            //   }).then(datas => {
            //     this.cheoption = datas.data.items
            //   })
            // })
          })
          this.paramsid = option.id
        }
      })

    },
    methods: {
      // 品牌下拉框显示
      openClassify() {
        this.$refs.classify.open();
        this.classifyIndex = 0
      },
      // 品牌下拉框隐藏
      close() {
        this.$refs.classify.close();
      },
      //品牌下拉框变动
      classifyChange(e) {
        this.classifyIndex = e.detail.value[0]
      },
      //品牌下拉框确定
      confirm() {
        this.classifyValue = this.paramsList[this.classifyIndex]
        this.form.productBrandId = this.bans[this.classifyIndex].productBrandId
        getTypeData(this.bans[this.classifyIndex].productBrandId).then(res => {
          listTypeData({
            parentId: res.data.parentId,
            type: 1
          }).then(datas => {
            this.cheoption = datas.data.items
          })
        })
        this.$refs.classify.close();

      },

      // 分类
      openClassifycla() {
        this.$refs.classifycla.open();
        this.classifyclaIndex = 0
      },
      closecla() {
        this.$refs.classifycla.close();
      },
      classifyChangecla(e) {
        this.classifyclaIndex = e.detail.value[0]
      },
      confirmcla() {
        this.classname = this.classList[this.classifyclaIndex]
        this.form.classify = this.csslist[this.classifyclaIndex].dictValue
        this.$refs.classifycla.close();
      },
      goback() {
        uni.navigateTo({
          url: '/pages/productlist/productlist'
        })
      },

      // 供应商
      superclick() {
        this.$refs.superfy.open();
        this.superIndex = 0
      },
      closesuper() {
        this.$refs.superfy.close();
      },
      superChange(e) {
        this.superIndex = e.detail.value[0]
      },
      confirmsuper() {
        this.supername = this.superList[this.superIndex]
        this.form.suppliers.push(this.sulist[this.superIndex].supplierId)
        this.$refs.superfy.close();
      },


      // 状态
      radioChange(e) {
        this.form.status = e.target.value
      },


      // 车型
      openchexin() {
        this.$refs.chexinfy.open();
        this.chexinIndex = 0
      },
      closechexin() {
        this.$refs.chexinfy.close();
      },
      chexinChange(e) {
        this.chexinfy = e.detail.value[0]
      },
      confirmchexin() {
        this.chexinValue = this.chexinList[this.chexinIndex]
        this.form.motorcycleId = this.chelist[this.chexinIndex].productBrandId
        this.$refs.chexinfy.close();
      },
      // 产品参数
      treeConfirm(e) {
        this.form.productParams = []
        this.storeProductParamRelList = e
        e.map(item => {
          this.form.productParams.push(item.paramId)
        })
        this.$forceUpdate()
      },
      // 显示树形选择器
      showTree() {
        this.$refs.tkitree._show();
      },

      // 提交
      subform() {
        if (!this.form.carg) {
          this.$api.msg('carg码不能为空')
          return;
        }
        if (!this.form.name) {
          this.$api.msg('产品名称不能为空')
          return;
        }
        if (this.form.prodLength && !/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/.test(this.form.prodLength)) {
          this.$api.msg('长度格式不正确')
          return;
        }
        if (this.form.prodWidth && !/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/.test(this.form.prodWidth)) {
          this.$api.msg('宽度格式不正确')
          return;
        }
        if (this.form.risingFalling && !/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/.test(this.form.risingFalling)) {
          this.$api.msg('中高格式不正确')
          return;
        }
        if (this.form.diagonal && !/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/.test(this.form.diagonal)) {
          this.$api.msg('对角格式不正确')
          return;
        }
        if (this.form.retailPrice && !/^(0|([1-9][0-9]*))(\.[\d]{1,2})?$/.test(this.form.retailPrice)) {
          this.$api.msg('零售价格式不正确')
          return;
        }
		if(this.form.suppliers.length == 0){
			this.$api.msg('供应商不能为空')
			return;
		}
        if (!this.form.retailPrice) {
          this.$api.msg('零售价不能为空')
          return;
        }
		if(!this.form.productBrandId){
			this.$api.msg('品牌不能为空')
			return;
		}
        if (!this.form.status) {
          this.$api.msg('状态不能为空')
          return;
        }
        if (!this.form.inventoryAlert) {
          this.$api.msg('库存预警不能为空')
          return;
        }
        if (!/^[+]{0,1}(\d+)$/.test(this.form.inventoryAlert)) {
          this.$api.msg('库存预警格式不正确')
          return;
        }
        if (this.id) {
			console.log(this.form)
          updatapouduct(this.form).then(res => {
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
          addapouduct(this.form).then(res => {
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
    width: 160upx;
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