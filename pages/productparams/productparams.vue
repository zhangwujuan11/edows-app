<template>
  <view>
    <view class="topserchbox">
      <view class="tab">
        <view @click="switchToTab('tab1')" :class="{ active: currentTab === 'tab1' }">
          客户参数 <br>
          <text class="line" v-if="currentTab === 'tab1'"></text>
        </view>
        <view @click="switchToTab('tab2')" :class="{ active: currentTab === 'tab2' }">
          产品参数<br>
          <text class="line" v-if="currentTab === 'tab2'"></text>
        </view>
        <view @click="switchToTab('tab3')" :class="{ active: currentTab === 'tab3' }">
          销售参数<br>
          <text class="line" v-if="currentTab === 'tab3'"></text>
        </view>
        <view @click="switchToTab('tab4')" :class="{ active: currentTab === 'tab4' }">
          基础数据<br>
          <text class="line" v-if="currentTab === 'tab4'"></text>
        </view>
      </view>
      <view class="serboxdown">
        <text v-if="childrenlist[0]" @click="switchbt(childrenlist[0].id, childrenlist[0].label)"
          :class="{ activetwo: currentTabtwo === childrenlist[0].id }">{{ childrenlist[0].label }}</text>
        <text v-if="childrenlist[1]" @click="switchbt(childrenlist[1].id, childrenlist[1].label)"
          :class="{ activetwo: currentTabtwo === childrenlist[1].id }">{{ childrenlist[1].label }}</text>
        <text v-if="childrenlist[2]" @click="switchbt(childrenlist[2].id, childrenlist[2].label)"
          :class="{ activetwo: currentTabtwo === childrenlist[2].id }">{{ childrenlist[2].label }}</text>
        <text v-if="childrenlist.length > 3" @click="currentTabtwo = 'tab4'; visible = !visible"
          :class="visible ? 'activetwo' : 'downclass'">
          <block v-if="visible">▼</block>
          <block v-if="!visible" style="color: #333333;">▲</block>
        </text>
      </view>
    </view>
    <view class="dowcon">
      <view class="ul" v-if="tabledata && tabledata.length > 0">
        <!-- <checkbox-group> -->
        <view class="li" v-for="(item, index) in tabledata" :key="index">
          <view class="dowcontitle">
            <!-- <label>
								<checkbox color="#1862F5" value="cb" checked="true" />
							</label> -->
            <text>{{ item.paramCode }}</text>
          </view>
          <view class="licon">
            <view class="liconceng">
              <text>名称</text>
              <view>{{ item.paramName }}</view>
            </view>
            <view class="liconceng">
              <text>备注</text>
              <view>{{ item.remark }}</view>
            </view>
          </view>
          <view class="libtnbox">
            <text @click="delgo(item)" style="color: red;background-color: #FBF5F5;">删除</text>
            <text @click="goproductadd(item.value)">修改</text>
          </view>
        </view>
        <view v-show="aa" style="text-align: center; width: 100%;margin-top: 100upx;">没有更多数据了</view>
      </view>
      <view class="no-have" v-else>
        <image style="  width: 460rpx;
      height: 312rpx;" src="@/static/16701.png"></image>
        <text>暂无数据</text>
      </view>
    </view>
    <!--  -->
      <view class="modal" v-if="visible">
          <view class="modal-content">
        <view class="span" v-for="(item, index) in childrenlist" :key="item.id" @click="switchbt(item.id, item.label)"
          :class="{ activetwo: currentTabtwo == item.id }">
          {{ item.label }}
        </view>
      </view>
    </view>
    <!-- 删除 -->
    <!-- <view class="modaldel" v-if="visibledel">
			 <view class="modal-content">
				<view class="modal-header">
					  <h2 style="font-size: 32upx;">系统提示</h2><icon @click="isserch" type="cancel" color="#333333" size="18" />
				</view>
				    <view class="modal-body">
					<view style="text-align: center;">
						<image class="waring" src="https://store.edows.cn//image/waring.png"></image>
					</view>
					<view style="margin: 20upx 0;font-size: 32upx;color: #666666;width: 100%;text-align: center;">是否确认删除{{iname}}的数据项？</view>
				</view>
				 <view class="modal-footer">
			        <button type="button" style="background-color: #007DFF;color: white;" @click="checkdel">确定</button>
			        <button type="button">取消</button>
				</view>
			 </view>
		</view> -->
    <image class="addplus" @click="goproductadd('no')" src="@/static/addplus.png"></image>
  </view>
</template>


<script>
  import {
    listInventoryall,
    treelist,
    delettypeData
  } from '@/Api/invers.js'
  import {
    toast,
    showConfirm,
    tansParams
  } from '@/Api/common'
  export default {
    onLaunch() {
      // 修改导航栏的样式
      uni.setNavigationBarStyle({
        backgroundColor: '#ffffff', // 设置导航栏的背景色
        opacity: 1 // 设置导航栏的透明度为不透明
      });
    },
    data() {
      return {
        tablist: [],
        childrenlist: [],
        currentTab: '',
        currentTabtwo: '',
        keyword: '全部',
        paymode: [{
          type: '有效',
          typeid: 3
        }, {
          type: '失效',
          typeid: 4
        }, {
          type: '全部',
          typeid: 5
        }],
        tabledata: [],
        visible: false,
        visibledel: false,
        queryform: {
          pageNum: 1,
          pageSize: 10
        },
        total: 0,
        label: '',
        aa: false
      }
    },
    // async onLoad() {
    // 	this.getlist()
    // },
    mounted() {
      this.getlist()
      this.gettabledata()
    },
    methods: {
      delgo(i) {
		  let that=this
		  uni.showModal({
		  	content: '是否确认删除基础参数数据编号为"' + i.paramCode + '"的数据项？',
		  	showCancel: true,
		  	confirmText: '确定',
		  	success: function(res) {
		  		if (res.confirm) {
		  			delettypeData(i.value).then(da => {
		  			  if (da.code == 200) {
		  			    that.$api.msg('删除成功');
		  			    that.gettabledata()
		  			  }
		  			})
		  		} else {
		  			console.log('cancel') //点击取消之后执行的代码
		  		}
		  	}
		  })
      },
      switchToTab(tabName) {
        this.currentTab = tabName
        this.currentTabtwo = ''
        if (tabName == 'tab1') {
          this.childrenlist = this.tablist[0].children
          this.queryform.typeId = 40
          this.queryform.pageNum = 1
          this.queryform.pageSize = 10
          this.gettabledata()
        } else if (tabName == 'tab2') {
          this.childrenlist = this.tablist[1].children
          this.queryform.typeId = 13
          this.queryform.pageNum = 1
          this.queryform.pageSize = 10
          this.gettabledata()
        } else if (tabName == 'tab3') {
          this.queryform.typeId = 4
          this.queryform.pageNum = 1
          this.queryform.pageSize = 10
          this.gettabledata()
          this.childrenlist = this.tablist[2].children
        } else if (tabName == 'tab4') {
          this.queryform.typeId = 1
          this.queryform.pageNum = 1
          this.queryform.pageSize = 10
          this.gettabledata()
          this.childrenlist = this.tablist[3].children
        }
        this.visible = false
      },
      switchbt(tabName, label) {
        this.currentTabtwo = tabName
        this.queryform.typeId = tabName
        this.queryform.pageNum = 1
        this.queryform.pageSize = 10
        this.label = label
        this.gettabledata()
        this.visible = false
      },
      getlist() {
        treelist().then(res => {
          if (res.code == 200) {
            this.tablist = res.data
            this.childrenlist = this.tablist[0].children
          }
        })
      },
      gettabledata() {
        listInventoryall(this.queryform).then(res => {
          if (res.code == 200) {
            this.tabledata = res.data.items
            this.total = res.data.total
          }
        })
      },
      // 搜索
      isserch() {
        this.visibledel = false
      },
      // 新增
      goproductadd(e) {
        if (e != 'no') {
          uni.navigateTo({
            url: '/pages/productadd/productadd?paramId=' + e
          })
        } else {
          if (!this.queryform.typeId || this.queryform.typeId == 40 || this.queryform.typeId == 13 || this.queryform
            .typeId == 4 || this.queryform.typeId == 1) {
            this.$api.msg('请先选择基础参数');
          } else {
            uni.navigateTo({
              url: '/pages/productadd/productadd?name=' + this.label + '&ids=' + this.queryform.typeId
            })
          }
        }

      }
    },
    onReachBottom() { //触底事件
      if (this.queryform.pageNum * this.queryform.pageSize >= this.total) {
        this.aa = true
      } else {
        if (this.queryform.pageNum <= this.queryform.pageNum - 1) {
          setTimeout(() => {
            uni.hideLoading()
          }, 500)
        } else {
          uni.showLoading({
            title: '加载中'
          });
          this.queryform.pageNum++
          listInventoryall(this.queryform).then(res => {
            if (res.code == 200) {
              this.tabledata = [...this.tabledata, ...res.data.items]
              this.total = res.data.total
            }
          })
        }
        setTimeout(() => {
          uni.hideLoading()
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .topserchbox {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 999;
    position: fixed;
    padding-top: env(safe-area-inset-top);
  }

  .modal {
    position: fixed;
    left: 0;
    top: 208upx;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: top;
    z-index: 99;
  }

  /deep/.uni-select-lay .uni-select-lay-select {
    border: none !important;
  }

  /deep/.uni-select-lay .uni-select-lay-select .uni-select-lay-icon.data-v-392314c6::before {
    width: 0 !important;
  }

  .seclectpaytype {
    width: 160upx;
  }

  .topserchboxcon {
    display: flex;
    width: 686upx;
    background-color: #F1F1F1;
    border-radius: 90upx;
    margin: 10upx 0 24upx 0;
  }

  .serboxdown {
    display: flex;
    justify-content: left;
    width: 686upx;
    margin-bottom: 24upx;
  }

  .serboxdown text {
    display: block;
    width: 156upx;
    height: 72upx;
    margin-left: 10upx;
    line-height: 72upx;
    background-color: #F5F7FB;
    border-radius: 70upx;
    text-align: center;
    font-size: 24upx;
  }

  .dowcon {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 216upx;
    padding-bottom: 50upx;
  }

  .dowcon .ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dowcon .ul .li {
    width: 686upx;
    border-radius: 20upx;
    padding: 32upx;
    box-sizing: border-box;
    background-color: white;
    margin-top: 24upx;
  }

  .dowcontitle {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    color: #999999;
    font-size: 24upx;
  }

  .dowcontitle text {
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: normal;
    color: #333333;
  }

  .licon {
    background-color: #F5F7FB;
    border-radius: 10upx;
    padding: 28upx 32upx;
    box-sizing: border-box;
    margin-top: 28upx;
    color: #333333;
    font-size: 24upx;
  }

  .liconceng text {
    color: #999999;
    width: 160upx !important;
    display: block;
    margin-right: 34upx;
  }

  .liconceng {
    word-break: break-all;
    width: 570upx;
    margin-bottom: 24upx;
    display: flex;
    align-items: center;
  }

  .liconceng view {
    width: 410upx;
  }

  .libtnbox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 28upx;
  }

  .libtnbox text {
    background-color: #F5F7FB;
    border-radius: 70upx;
    color: #007DFF;
    font-size: 24upx;
    padding: 18upx 46upx;
    margin-right: 10upx;
  }

  .modal .modal-content .modal-header {
    width: 750upx;
    background-color: white;
  }

  .modal .modal-content {
    background-color: white;
    width: 750upx;
    height: max-content;
    display: flex;
    justify-content: space-between;
    padding: 10upx;
    flex-wrap: wrap;
    margin-top: 0px;
    box-sizing: border-box;
  }

  .modal .modal-content::after {
    content: "";
    width: 168upx;
  }


  .modal .modal-content .span {
    width: 168upx;
    height: 72upx;
    line-height: 72upx;
    text-align: center;
    margin-bottom: 17upx;
    color: #333333;
    font-size: 24upx;
    background-color: #F5F7FB;
    border-radius: 50upx;
    margin-right: 10upx;
    flex: auto
  }

  .modal .modal-content .activetwo {
    background-color: #1862F5;
    color: white;
  }

  .modal .modal-content .modal-body {
    background-color: white;
  }

  .modal .modal-content .modal-footer {
    background-color: #eeeeee;
    padding: 10upx;
    display: flex;
    justify-content: flex-end;
  }

  .modal .modal-content .modal-footer button {
    border: none;
    padding: 10upx 20upx;
    margin-left: 10upx;
    border-radius: 5upx;
    cursor: pointer;
  }

  .tab {
    width: 100%;
    display: flex;
    justify-content: space-around;
    line-height: 90upx;
    margin-bottom: 16upx;
  }

  .active {
    color: #2979FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .active .line {
    display: block;
    width: 60upx;
    border-bottom: 3px solid #2979FF;
  }

  .serboxdown .activetwo {
    background-color: #1862F5;
    color: white;
  }


  .dowcontitle image {
    width: 60upx;
    height: 60upx;
    margin-right: 20upx;
  }

  .addplus {
    width: 88upx;
    height: 88upx;
    position: fixed;
    z-index: 9999;
    bottom: 160upx;
    right: 0upx;
  }

  .no-have {
    padding-top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


  }
</style>