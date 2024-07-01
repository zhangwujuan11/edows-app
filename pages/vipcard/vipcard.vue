<template>
	<view style="background:#efeff4" :style="{'padding-top':statusBarHeight*2+'px'}">
		    <view id="appContent">
		      <view class="innerCont pb40">
		        <view class="item-info">
		          <view class="inner-item">
		            <view class="item-tit"><text>基本信息</text></view>
		            <view class="item-lists">
		              <view class="item-list">
						 <text style="color: red;">*</text>
		                <view class="em">客户姓名</view>
		                <p>
		                  <input  type="text" v-model="form.userName" :disabled="action"  placeholder="请输入客户姓名"/>
		                </p>
		              </view>
		              <view class="item-list">
						  <text style="color: red;">*</text>
		                <view class="em">联系方式</view>
						<p>
							<input type="text"  v-model="form.mobile" :disabled="action" placeholder="请输入联系方式"  >
						 </p>
		              </view>
		              <view class="item-list">
						  <text style="color: red;">*</text>
		                <view class="em">车牌号码</view>
		                <p>
		                  <input type="text" name=""  v-model="form.carNo" :disabled="action" value="" placeholder="请输入车牌号码" />
		                </p>
		              </view>
		              <view class="item-list">
		                <view class="em">车辆车型</view>
		                <p>
		                  <input type="text"  v-model="form.carType" :disabled="action" placeholder="请输入车辆车型" />
		                </p>
		              </view>
					  <view class="item-list">
					    <view class="em">会员渠道</view>
					    <p>
					  		<input type="text"  disabled value="门店会员" />
					    </p>
					  </view>
					  <view class="item-list">
						  <text style="color: red;">*</text>
					    <view class="em">车架号vin</view>
					    <p>
					      <input type="text"  v-model="form.vin" :disabled="action" placeholder="请输入车架号vin" />
					    </p>
					  </view>
					  <view class="item-list">
					  	<text style="color: red;">*</text>
					    <view class="em">会员类型</view>
					    <p>
							<!-- <u-select v-model="show" mode="single-column" :list="cardviewst"></u-select> -->
							<view class="select">
							  <picker :disabled="action" :value="index" :range="cardviewst" @change="bindPickerChange">
							    <view class="uni-input">{{ cardviewst[index]}}</view>
							  </picker>
							</view>
							<!-- <select v-model="form.rightCardId" @change="toCngType(form.rightCardId)" :disabled="action">
							  <option v-for="(item,index) in cardviewst" :key="index" :value="item.id">{{item.title}}</option>
							</select> -->
					    </p>
					  </view>
		              <view>
		                <p style="padding: 5px 10px;color: #8f8f94;">{{selectnocie}}</p>
		              </view>
		            </view>
		          </view>
		        </view>
		        <view class="item-info">
		          <view class="inner-item">
		            <h3 class="item-tit"><text>会员验车照片</text></h3>
		            <ul class="item-lists" v-for="(item,index) in uploadimglist" :key="index">
		              <view class="upDrive">
						  <p style="color: black;padding: 5px 20px;" class="name">{{item.name}}</p>
						  <p style="padding:5px 20px;" class="remarks">{{item.remarks}}</p>
		                <view class="item-pic">
		                  <image :src="item.imgurl" width="100%" />
		                  <p>例图</p>
		                </view>
		                <view class="item-pic">
		                  <image :src="uploadimglist[index].checkItemImg ? uploadimglist[index].checkItemImg : 'https://img.edows.cn/wx/upload.jpg'" 
						  style="height:120px;"/>
						  <view  class="addUploadImg" 
							v-if="fromaction != 'info' && item.auditStatus==-1 || !item.auditStatus"
		                    @click="camergo(index)">
							</view>
							<view class="noPass" v-if="item.auditStatus==-1">
							  <text>待整改</text>
							  <p>重新上传</p>
							</view>
							
		                  <view class="maskUploadImg" v-show="uploadimglist[index].isShowMask">
		                    <text class="maskLoading"></text>
		                  </view>
		                </view>
		              </view>
		            </ul>
		          </view>
		        </view>
		      </view>
		      <view class="btns" @click="editShop" v-if="!action && fromaction != 'info'">
		        <button class="startOrder fullBtn">提交会员信息</button>
		      </view>
			  <view class="btns" @click="updateShop" v-if="fromaction == 'uplode'">
			    <button class="startOrder fullBtn">修改会员信息</button>
			  </view>
		  </view>
	</view>
</template>

<script>
	import imageTools from '@/uni_modules/niceui-image-tools/util/image-tools.js'
	import { cardListselect, uploadeimgvipcard, uplodeimg, addvipcard, infovipcard, updatevipcard } from "@/Api/invers.js";
	export default {
		data() {
			return {
				 index: 0,
				 pickdata:[],
				gons:false,
				dateCode: "",
				cardviewst:[],
				selectnocie:'',
				fromaction:'',
				form:{
					rightCardId:'',
					userName:'',
					mobile:'',
					carNo:'',
					carType:'',
					vin:'',
					rightCardId:'',
				},
				action:false,
				uploadimglist:[],
				uploadimglist:[],
				codevalue:'',
				serviceviewst: [],
				searchviewst: [],
				chioce: 0,
				statusBarHeight:'',
				titleBarHeight:'',
				passtitle:''
			}
		},
		onLoad(option) {
			this.getShopDetail()
			if(option.memberNo){
				let obj={
					memberNo:option.memberNo
				}
				infovipcard(obj).then(res=>{
					if (res.code == 200) {
						  this.form=res.data
						  this.uploadimglist=res.data.orderAuditList
					}
				})
				
				if(option.action == "uplode"){
					this.action=false
					  uni.setNavigationBarTitle({
					      title: '修改会员卡' 
					    });
				}else if(option.action == "info"){
					uni.setNavigationBarTitle({
					    title: '会员卡详情' 
					  });
					  this.action=true
				}else{
					uni.setNavigationBarTitle({
					    title: "新增会员卡" 
					  });
					   this.action=false
				}
				this.fromaction=option.action
			}
		},
		methods: {
			goback() {
					uni.redirectTo({
					  url: "/pages/vipcardlist/vipcardlist",
					});
				},
			camergo(item){
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera'],   //album 从相册选图，camera 使用相机
				     success: (res) => {
					let blob = res.tempFilePaths[0]
					//获取blob
					 imageTools.pathToBase64(res.tempFilePaths[0]).then(base64 => {
						let params = {
							    base64Data: base64,
							    bizType: 101
							}
							uplodeimg(params).then(ress=>{
								if (ress.code == 200) {
									 this.$set(this.uploadimglist[item],"checkItemImg",ress.data.webPath)
									 this.uploadimglist[item].isShowMask = false;
									 this.$set(this.uploadimglist[item],"auditStatus",1)
								}
							})
					})
					}
				});
			},
			        //获取数据
			        getShopDetail() {
						this.cardviewst=[]
						cardListselect().then(res=>{
							if (res.code == 200) {
								for(let i=0;i<res.data.length;i++){
									this.cardviewst.push(res.data[i].title)
								}
								this.form.rightCardId=res.data[0].id
								this.selectnocie=res.data[0].service
								this.pickdata=res.data
							}
						})
						
						uploadeimgvipcard().then(ress=>{
							if (ress.code == 200) {
								this.uploadimglist=ress.data
								this.uploadimglist.map.map(item=>{
									this.$set(item,"isShowMask",false)
									this.$set(item,"checkItemImg","")
								})
							 }
						})
			        },
					
					bindPickerChange: function(e) {
					  this.index = e.detail.value;
					  this.form.rightCardId=this.pickdata[e.detail.value].id
					  this.selectnocie=this.pickdata[e.detail.value].service
					},
			        //判断信息
			        chackInfo() {
			            if (!this.form.userName) {
			                this.$api.msg("客户姓名不能为空");
			                return false;
			            }
			            if (!this.form.mobile) {
			                this.$api.msg("联系方式不能为空");
			                return false;
			            }
			            if (!this.form.carNo) {
			                this.$api.msg("车牌号码不能为空");
			                return false;
			            }
			            if (!this.form.vin) {
			               this.$api.msg("车架号不能为空");
			                return false;
			            }
			            if (!this.form.rightCardId) {
			                this.$api.msg("请选择会员类型");
			                return false;
			              }
			            return true;
			        },
			         //提交
			        editShop() {
			            var that = this;
			            if (!this.chackInfo()) {
			                return false;
			            }
						that.form.orderAudits=that.uploadimglist
						addvipcard(that.form).then(res=>{
							if (res.code == 200) {
							    uni.redirectTo({
							      url: "/pages/vipcardlist/vipcardlist",
							    });
							}
						})
			        },
					// 修改
					updateShop() {
			            var that = this;
			            if (!this.chackInfo()) {
			                return false;
			            }
						that.form.orderAudits=that.uploadimglist
						updatevipcard(that.form).then(res=>{
							if (res.code == 200) {
								uni.redirectTo({
								  url: "/pages/vipcardlist/vipcardlist",
								});
							}
						})
			        },
			    }
			
	}
</script>

<style scoped>
	.item-viewsts{
		padding: 0;
	}
	
	.innerCont{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding-bottom: 60px;
	}
	.item-info {
		margin-top: 10px;
	    margin-bottom: 10px;
	    background: #fff;
	    border-radius: 6px;
	    font-size: 13px;
		width: 95%;
	}
	.inner-item {
	    padding: 10px;
	}
	.item-tit {
	    font-size: 15px;
	    border-bottom: 1px solid #eaeaea;
	    padding-bottom: 10px;
	}
	.item-tit text {
	    display: inline-block;
	    border-left: 4px solid #349cff;
	    text-indent: 10px;
	    height: 18px;
	    line-height: 18px;
	}
	.item-list {
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    line-height: 20px;
	    margin: 5px 0;
	}
	.em {
	    color: #999;
		}
		.item-list p {
		    position: relative;
		    margin-left: auto;
		    width: 69%;
		    line-height: 22px;
		    /* text-align: right; */
		    /* height: 40px; */
		}
		.item-list p uni-input, .item-list p .select{
		    display: block;
		    width: 100%;
		    background: #f4f6f8;
		    border-radius: 6px;
		    margin: 5px 0 0 -10px;
		    padding: 9px 10px 9px 0;
		    font-size: 14px;
		    text-indent: 10px;
		    border: none;
			line-height: 21px;
			 height: 40px;
		}
		.upDrive .remarks{
			font-size: 14px;
			margin-top: 0;
			margin-bottom: 10px;
			color: #8f8f94;
		}
		.item-lists{
			padding: 0;
		} 
		.item-pic {
		    position: relative;
		    display: inline-block;
		    vertical-align: middle;
		    margin-left: 4%;
		    margin-bottom: 10px;
		}
		.item-pic image {
		    display: block;
		    width: 120px;
		    height: 90px;
		}
		.item-pic p {
		    height: 30px;
		    line-height: 30px;
		    text-align: center;
		    background: #f3f3f3;
		    color: #666;
		}
		.addUploadImg {
		    border: 1px solid #000;
		    display: block;
		    height: 120px;
		    left: 0;
		    opacity: 0;
		    position: absolute;
		    top: 0;
		    width: 120px;
		    z-index: 1;
			background-color: red;
		}
		.btns {
		    position: fixed;
		    width: 100%;
		    left: 0;
		    bottom: 0;
		    display: flex;
		    height: 50px;
		    line-height: 50px;
		    background: #fff;
		    z-index: 11;
		}
		.btns button.fullBtn {
		    width: 100%;
			font-size: 16px;
			background: #60b2ff;
			color: #fff;
			height:50px;
			line-height:50px;
		}
		.noPass {
		    position: absolute;
		    width: 100%;
		    height: 100%;
		    left: 0;
		    top: 0;
		    background: rgba(0, 0, 0, .5);
		    border: 2px solid #ff0000;
		}
		.noPass text {
		    display: block;
		    width: 50px;
		    height: 50px;
		    position: absolute;
		    right: 4px;
		    top: 4px;
		    border-radius: 50px;
		    text-align: center;
		    color: #fff;
		    line-height: 50px;
		    background: #ff0000;
		}
		.noPass p {
		    position: absolute;
		    width: 100%;
		    background: none;
		    color: #ff0000;
		    font-size: 16px;
		    left: 0;
		    bottom: 10px;
		    text-align: center;
		}
		
</style>
