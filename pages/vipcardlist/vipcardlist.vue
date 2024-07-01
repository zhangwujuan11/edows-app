<template>
	<view style="background:#f8f8f8">
		<view class="contant">
			<view class="queryWarp">
				<view class="query-item">
					<view class="query-title" @click="showNormal">
						<text ref="titStatus">会员状态</text> <text class="detailMore"></text>
					</view>
					<view class="query-title" @click="showDate">
						<text ref="titDates">申请时间</text> <text class="detailMore"></text>
					</view>
				</view>
				<view class="query-select query-selectFull" v-if="titStatus">
					<view class="query-sel-item bline" :class="{ 'active' : search.orderLevel == index  }"
						:score="index" :status="item.status" :relDate="item.name" v-for="(item,index) in arrLevel"
						@click="searchLevel(0,index)">
						<view v-text="item.name"></view><text class="hock_iconFill icon_fill"></text>
					</view>
				</view>
				<view class="query-select query-selectDate" v-if="titDates">
					<view class="query-sel-item bline">
						<view class="query-sel-item ">
							<view class="choiceDate">
								<view class="section">
									<label class="date-label">选择开始日期：</label>
									<view class="mbsc-comp">
										<uni-datetime-picker v-model="startDate" type="date" @change="dateSelect">
										</uni-datetime-picker>
									</view>

									<!-- <uni-datetime-picker type="date" :border="true" v-model="enteringTheFactoryDate" @change="maskClick">
		               <view class="input" v-if="enteringTheFactoryDate">
		                 <uni-dateformat :date="enteringTheFactoryDate" format="yyyy-MM-dd"></uni-dateformat>
		               </view>
		               <view v-else class="sel">请选择</view>
		             </uni-datetime-picker> -->
								</view>
							</view>
							<view class="choiceDate">
								<view class="section">
									<label class="date-label">选择截止日期：</label>
									<view class="mbsc-comp">
										<uni-datetime-picker v-model="endDate" type="date" @change="dateSelectend">
										</uni-datetime-picker>
									</view>
									<!-- <input type="text" id="end_date" class="mbsc-comp" readonly=""> -->
									<!-- <uni-datetime-picker :border="false" ref="date"
					   @change="dateSelect">
					  </uni-datetime-picker> -->
								</view>
							</view>
						</view>
						<view class="btnOpts fixed">
							<text class="orangeGradient fl" @click="searchLevel(2)">重置</text>
							<text class="blueGradient fr" @click="searchLevel()" style="line-height: 32px;">确定</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 头部信息结束 -->
			<view class="content nobottom orderList_content">
				<view id="mescroll" class="notice-content selService-content mescroll">
					<!-- 待支付 -->
					<view id="dataList" class="order-items dataList">
						<view class="orderList" v-for="item in pdlist">
							<view class="orderList_title">
								<view class="orderTit"
									style="display: flex;justify-content: space-between;width: 100%;">
									<text>会员单号：{{item.memberNo}}</text>
									<text :class="item.status==40? 'redcolor':'greem'">{{item.status | status}}</text>
								</view>
							</view>
							<view class="order_panel" :orderSn="item.orderSn" :orderStatus="item.orderStatus">
								<view class="dataMsg">
									<view class="p1">会员名称：</view>
									<view class="p2">{{item.userName}} （{{item.mobile}}）</view>
								</view>
								<view class="dataMsg">
									<view class="p1">车牌号：</view>
									<view class="p2">{{item.carNo}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">接待人：</view>
									<view class="p2">{{item.memberName}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">门店信息：</view>
									<view class="p2">{{item.shopName}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">权益次数：</view>
									<view class="p2 ">更换{{item.replaceNumAll}}次，修复{{item.repairNumAll}}次</view>
								</view>
								<view class="dataMsg">
									<view class="p1">会员类型：</view>
									<view class="p2 ">{{item.cardName}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">会员渠道：</view>
									<view class="p2 ">{{item.source}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">权益部位：</view>
									<view class="p2 ">{{item.changePart}}</view>
								</view>
								<view class="dataMsg" v-if="item.beginDt">
									<view class="p1">会员时间：</view>
									<view class="p2 ">{{item.beginDt}} 至 {{item.endDt}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">申请时间：</view>
									<view class="p2 ">{{item.createDate}}</view>
								</view>
								<view class="dataMsg">
									<view class="p1">支付状态：</view>
									<view class="p2">{{item.payStatus | paystatus}}</view>
								</view>
								<!-- <view class="dataMsg">
						  <view class="p1" :class="item.status==40? 'redcolor':''">状态：</view>
						  <view class="p2">{{item.status | status}}</view>
						</view> -->
							</view>

							<view class="orderList" v-if="pdlist.length==0">暂无数据</view>
							<view class="btnbox">
								<button class="blueGradient" @click="startOrder(item,'info')">查看</button>
								<button class="blueGradient" @click="startOrder(item,'uplode')"
									v-if="item.status == 10 || item.status == 40">上传照片</button>
							</view>
						</view>
						<view v-show="aa"
							style="text-align: center; width: 100%;margin-top: 52upx;margin-bottom: 120upx;">没有更多数据了
						</view>
					</view>
				</view>
				<view class="btns">
					<button style="height: 50px;line-height: 50px;" class="startOrder fullBtn"
						@click="startOrder()">新建会员卡</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { memberCarlist } from "@/Api/invers.js";
	export default {
		filters: {
			status(e) {
				if (e == 10) {
					return "申请"
				} else if (e == 20) {
					return "审核中"
				} else if (e == 30) {
					return "通过"
				} else if (e == 40) {
					return "不通过"
				} else if (e == 50) {
					return "生效"
				} else if (e == 35) {
					return "待生效"
				}
			},
			paystatus(e) {
				if (e == 10) {
					return "待支付"
				} else if (e == 20) {
					return "已支付"
				} else if (e == 30) {
					return "退款"
				}
			}
		},
		onBackPress() {
			uni.switchTab({
				url: '/pages/appindex/appindex'
			});
			return true;
		},
		data() {
			return {
				enteringTheFactoryDate: '',
				titStatus: false,
				titDates: false,
				pageNo: 1,
				pageSize: 3,
				count: '',
				mescroll: null,
				status: '',
				finishDate: "",
				startDate: "",
				endDate: "",
				pdlist: [],
				userTypeList: [],
				totalPage: 1,
				search: {
					orderLevel: 0, 
					level: 0,
					sex: 0
				},
				arrLevel: [{
						name: "全部",
						score: 0,
						status: ''
					}, {
						name: "申请",
						score: 1,
						status: 10
					},
					{
						name: "审核中",
						score: 2,
						status: 20
					},
					{
						name: "通过",
						score: 3,
						status: 30
					},
					{
						name: "不通过",
						score: 4,
						status: 40
					},
					{
						name: "生效",
						score: 5,
						status: 50
					},
					{
						name: "待生效",
						score: 6,
						status: 35
					}
				],
				refuseMsg: "",
				orderSn: "",
				orderStatus: 0,
				searchType: 1,
				aa: false
			}
		},
		onLoad() {
			this.getListDataFromNet()
		},
		onReachBottom() { //触底事件
			if (this.pageNo * this.pageSize >= this.count) {
				this.aa = true
			} else {
				if (this.pageNo <= this.pageNo - 1) {
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.pageNo++
					var params = {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						status: this.status,
						endDate: this.endDate,
						startDate: this.startDate,
					}
					memberCarlist(params).then(res => {
						if (res.code == 200) {
							this.count = res.count
							this.pdlist = [...this.pdlist, ...res.data]
						}
					})
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
		},
		methods: {
			dateSelect(e) {
				this.startDate = e
			},
			dateSelectend(e) {
				this.endDate = e
			},
			getListDataFromNet() {
				var params = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					status: this.status,
					endDate: this.endDate,
					startDate: this.startDate,
				}
				memberCarlist(params).then(res => {
					if (res.code == 200) {
						this.count = res.count
						this.pdlist = res.data
					}
				})
			},
			//订单状态筛选
			showNormal() {
				this.titStatus = true
				this.titDates = false
				// $('.query-selectFull,.query-selectDate').hide();
			},
			showDate() {
				this.titDates = true
				this.titStatus = false
			},
			searchLevel(index, num) {
				// var el = event.currentTarget;
				// var score = el.getAttribute('score');
				// var relDate = el.getAttribute('relDate');
				// var status = el.getAttribute('status');
				var ids = index;
				if (index == 0) {
					this.arrLevel.map(item => {
						if (item.score == num) {
							this.search.orderLevel = item.score;
							this.status = item.status;
						}
					})
				}
				if (index == 2) { //日期清空
					this.startDate = "";
					this.endDate = "";
				}
				this.pageNo = 1
				this.pageSize = 3
				this.getListDataFromNet()
				this.titStatus = false
				this.titDates = false
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			//隐藏或关闭弹框
			hideMask() {
				$('.query-select,.mask').hide();
			},
			//确定筛选结果
			querySur() {
				this.hideMask();
				this.pdlist = [];
				this.mescroll.resetUpScroll();
				this.mescroll.scrollTo(0, 300); //回到顶部
			},

			//订单类型筛选
			showFull() {
				$('.query-selectFull').css('height', (window.innerHeight - 44) + 'px');
				$('.query-selectFull,.mask').show();
				$('.hock_query-select,.query-selectDate').hide();
			},
			//新建会员卡/详情
			startOrder(e, i) {
				if (e) {
					if (i == "info") { //查看
						uni.navigateTo({
							url: "/pages/vipcard/vipcard?memberNo=" + e.memberNo + "&action=info"
						});
					} else if (i == "uplode") { //修改
						uni.navigateTo({
							url: "/pages/vipcard/vipcard?memberNo=" + e.memberNo + "&action=uplode"
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/vipcard/vipcard?action=add'
					});
					// window.location.href="vipcardadd.html?action=add"
				}
			},
			changType(index) {
				var el = event.currentTarget;
				this.field = index;
				this.pdlist = [];
				this.mescroll.resetUpScroll();
			},


		},
	}
</script>

<style scoped>
	.wheel-scroll.wheel-scroll-hook {
		margin: 0;
		padding: 0;
	}

	#picker {
		padding: 10px;
		width: 69%;
		background: #f4f6f8;
		border-radius: 6px;
		font-size: 14px;
		text-indent: 10px;
		border: none;
	}

	.blueGradient {
		width: 70px;
		padding: 5px 8px;
		color: white;
		margin-right: 15px;
	}

	.redcolor {
		color: red;
	}

	.greem {
		color: green;
	}

	.queryWarp {
		position: fixed;
		left: 0;
		width: 100%;
		z-index: 900;
		box-sizing: border-box;
		background: #fff;
		top: 0px;
	}

	.query-item {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 44px;
		box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
		line-height: 44px;
		background: white;
		position: relative;
	}

	.query-title {
		display: flex;
		height: auto;
		font-size: 15px;
		justify-content: center;
		align-items: center;
	}

	.query-select {
		padding: 3% 0 3% 3%;
		background-color: white;
	}

	.query-sel-item.active,
	.sel-query.active {
		color: #359cff;
	}

	.query-sel-item {
		width: 100%;
		line-height: 44px;
		position: relative;
	}

	.bline {
		border-bottom: 1px solid #f8f8f8;
	}

	.query-sel-item.active .icon_fill,
	.sel-query.active .icon_fill {
		position: absolute;
		width: 16px;
		height: 12px;
		right: 3%;
		top: 16px;
		background: url(@/static/selected.png) no-repeat;
		background-size: contain;
	}

	.mescroll {
		/* position: fixed; */
		width: 100%;
		left: 0;
		top: 50px;
		bottom: 0px;
		height: auto;
		overflow-y: scroll;
	}

	.mescroll-downwarp {
		position: relative;
		width: 100%;
		height: 0;
		overflow: hidden;
		text-align: center;
	}

	.mescroll-downwarp .downwarp-content {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 30px;
		padding: 10px 0;
	}

	.mescroll-downwarp .downwarp-progress,
	.mescroll-upwarp .upwarp-progress {
		display: inline-block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid gray;
		margin-right: 8px;
		border-bottom-color: transparent;
		vertical-align: middle;
	}

	.order-items {
		position: relative;
		width: 94%;
		margin: 10px auto;
		margin-top: 50px;
	}

	.orderList {
		position: relative;
		background: #fff;
		margin-bottom: 20px;
		border-radius: 6px;
		padding: 10px;
		border-left: 3px solid #60b2ff;
		color: #8f8f94;
	}

	.orderList_title {
		display: flex;
		height: 44px;
		line-height: 44px;
		border-bottom: 1px solid #eaeaea;
	}

	.orderTit text {
		font-size: 15px;
		font-weight: normal;
	}

	.order_panel {
		margin-top: 10px;
	}

	.btnbox {
		width: 100%;
		text-align: center;
		margin-top: 15px;
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
	}

	.startOrder {
		background: #60b2ff;
		color: #fff;
	}

	.contant {
		height: 100%;
		overflow: scroll;
	}

	.choiceDate,
	.btnOpts {
		position: relative;
		width: 270px;
		margin: 0 auto;
	}

	.section {
		position: relative;
		height: 32px;
		margin-bottom: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.mbsc-comp {
		width: 166px;
		height: 33px;
		line-height: 32px;
		background: #f4f6f8;
		border-radius: 6px;
		border: none;
		font-size: 15px;
	}

	.uni-label-pointer {
		cursor: pointer;
		font-size: 14px;
	}

	.uni-date-editor {
		border: 1px solid red !important;
	}

	/deep/.uni-date__icon-clear {
		display: none !important;
	}

	.btnOpts {
		margin: 20px auto 10px;
		display: flex;
		justify-content: space-between;
	}

	.orangeGradient {
		background: #f04c41;
		font-size: 14px;
	}

	.btnOpts text {
		display: block;
		width: 40%;
		height: 32px;
		line-height: 32px;
		text-align: center;
		color: #fff;
		border-radius: 6px;
	}

	.blueGradient {
		background: linear-gradient(left, #359cff, #65b4ff);
		background: -ms-linear-gradient(left, #359cff, #65b4ff);
		background: -moz-linear-gradient(left, #359cff, #65b4ff);
		background: -webkit-linear-gradient(left, #359cff, #65b4ff);
		background: -o-linear-gradient(left, #359cff, #65b4ff);
	}

	.dataMsg view {
		/* margin-right: 8px; */
		width: 30%;
		margin-right: 2%;
		font-size: 13px;
	}

	.dataMsg {
		display: flex;
		line-height: 30px;
	}

	.dataMsg .p2 {
		width: 68%;
	}

	.btnbox {
		width: 100%;
		margin-top: 15px;
		display: flex;
		justify-content: center;
	}

	.blueGradient {
		width: 70px;
		padding: 0;
		color: white;
		font-size: 14px;
		height: 30px;
		line-height: 30px;
		margin-left: 0;
	}
</style>