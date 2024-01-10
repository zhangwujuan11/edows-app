<template>
	<view class="content">
		<view class="row b-b">
			<span class="red iconD">*</span>
			<text class="tit">客户姓名</text>
			<input class="input" type="text" v-model="name" placeholder="客户姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<span class="red iconD">*</span>
			<text class="tit">联系方式</text>
			<input class="input" type="number" v-model="mobile" placeholder="联系方式" placeholder-class="placeholder" maxlength="11" />
		</view>
		<view class="row b-b">
			<span class="red iconD">*</span>
			<view class="uni-list">
				<view class="uni-list-cell">
					<text class="tit">服务类型</text>
					<view class="uni-list-cell-db input">
						<picker @change="bindPickerChange" :value="initStype" :range="sTypeList" range-key="name">
							<view class="uni-input" style="width:500upx">{{sTypeList[initStype].name}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<view class="row b-b">
			<text class="tit">车辆信息</text>
			<span class="input">
				{{carType ? carType : "车辆信息"}}
			</span>
		</view>

		<view class="row b-b">
			<view class="uni-list">
				<view class="uni-list-cell">
					<text class="tit">车牌号码</text>
					<view class="uni-list-cell-db input">
						<picker @change="cngProChange" :value="initProv" :range="provList" range-key="code">
							<view class="uni-input" style="width:60upx">{{provList[initProv].code}}</view>
						</picker>
					</view>
					<input class="input" type="text" v-model="carNo" placeholder="车牌号码" @input="toUpperCase()" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		
		<view class="row b-b">
			<text class="tit">备注信息</text>
			<input class="input" type="text" v-model="remarks" placeholder="备注信息" placeholder-class="placeholder" />
		</view>
		<view>
			<button class="add-btn blueGraShadow" @click="confirm">提交</button>
		</view>


	</view>
</template>

<script>
	import {
		fn
	} from '@/util/common.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				subFlag: true,
				name: "",
				mobile: "",
				initStype: "0",
				serviceType: "1",
				carList: [],
				arrWords: [],
				carTypeList: [],
				carInfoList: [],
				carType: "",
				carInfoId: "",
				brandId: '',
				provSelected: "京",
				initProv: "0",
				carNo: "",

				sTypeList: [
					{
						name: '拆装',
						value: '1'
					},
					{
						name: '更换',
						value: '2'
					},
					{
						name: '修复',
						value: '3'
					},
					{
						name: '贴膜',
						value: '4'
					},
					{
						name: '其他',
						value: '0'
					}
				],
				provList: [{
						code: '京',
						province: '北京',
						value: '1'
					},
					{
						code: '津',
						province: '天津',
						value: '2'
					},
					{
						code: '沪',
						province: '上海',
						value: '3'
					},
					{
						code: '渝',
						province: '重庆',
						value: '4'
					},
					{
						code: '冀',
						province: '河北',
						value: '5'
					},
					{
						code: '豫',
						province: '河南',
						value: '6'
					},

					{
						code: '云',
						province: '云南',
						value: '7'
					},
					{
						code: '辽',
						province: '辽宁',
						value: '8'
					},
					{
						code: '黑',
						province: '黑龙江',
						value: '9'
					},
					{
						code: '湘',
						province: '湖南',
						value: '10'
					},
					{
						code: '皖',
						province: '安徽',
						value: '11'
					},
					{
						code: '鲁',
						province: '山东',
						value: '12'
					},

					{
						code: '新',
						province: '新疆',
						value: '13'
					},
					{
						code: '苏',
						province: '江苏',
						value: '14'
					},
					{
						code: '浙',
						province: '浙江',
						value: '15'
					},
					{
						code: '赣',
						province: '江西',
						value: '16'
					},
					{
						code: '鄂',
						province: '湖北',
						value: '17'
					},
					{
						code: '桂',
						province: '广西',
						value: '18'
					},

					{
						code: '甘',
						province: '甘肃',
						value: '19'
					},
					{
						code: '晋',
						province: '山西',
						value: '20'
					},
					{
						code: '蒙',
						province: '内蒙古',
						value: '21'
					},
					{
						code: '陕',
						province: '陕西',
						value: '22'
					},
					{
						code: '吉',
						province: '吉林',
						value: '23'
					},
					{
						code: '闽',
						province: '福建',
						value: '24'
					},


					{
						code: '贵',
						province: '贵州',
						value: '25'
					},
					{
						code: '粤',
						province: '广东',
						value: '26'
					},
					{
						code: '青',
						province: '青海',
						value: '27'
					},
					{
						code: '藏',
						province: '西藏',
						value: '28'
					},
					{
						code: '川',
						province: '四川',
						value: '29'
					},
					{
						code: '宁',
						province: '宁夏',
						value: '30'
					},
					{
						code: '琼',
						province: '海南',
						value: '31'
					},
					{
						code: '使',
						province: '大使馆',
						value: '32'
					},
					{
						code: '领',
						province: '领士馆',
						value: '33'
					}
				],
				remarks: ""
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])

		},
		async onLoad(option) {
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：', returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }

		},
		methods: {
			//图片上传
			upload: function() {
				var _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						wx.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
								this.imgPath = 'data:image/png;base64,' + res.data;
							}
						})

					},
					error: function(e) {
						console.log(e);
					}
				});
			},

			bindPickerChange: function(e) {
				let index = e.target.value;
				this.initStype = this.sTypeList[index].value -1;
				this.serviceType = this.sTypeList[index].value;
				console.log('this.serviceType携带值为', this.serviceType)
			},
			//选择省份简写
			cngProChange: function(e) {
				let index = e.target.value;
				this.initProv = this.provList[index].value - 1;
				this.provSelected = this.provList[index].code;
				console.log('this.provSelected携带值为', this.provSelected)
			},

			//小写转大写
			toUpperCase(e) {
				console.log('e：',this.carNo)
				this.carNo = this.carNo.toUpperCase();
			},

			//提交
			async confirm() {

				if (!this.name) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}

				var params = this.addressData;
				console.log(params)
				if (this.subFlag) {
					this.subFlag = false;
					let res = await this.$axios(this.$baseUrl.upDataContacts, params);
					if (res.data.code == 200) {
						this.subFlag = true;
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(() => {
							if (this.source == 1) {
								this.$api.preToPage().addressData = res.data.data;
								uni.navigateBack({
									delta: 2
								})
							} else {
								uni.navigateTo({
									url: `/pages/address/address?orderData=${this.orderData}`
								})
							}


						}, 800)
					}
				}

				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				//this.$api.prePage().refreshList(data, this.manageType);
				//console.log(this.manageType)
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
			},
			//弹出层效果
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			stopPrevent() {}
		}

	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.goods-img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.iconD{
		position: absolute;
		top:34upx;
		color: $font-color-red;
		left: 6upx;
	}
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.uni-list-cell {
			display: flex;
			align-items: center;
		}

		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			// flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 140upx auto 40upx;
		font-size: $font-lg;
		color: #fff;
		border-radius: 10upx;
	}

	.del-btn {
		text-align: center;
		color: #f04c41;
		font-size: 30upx
	}

	// 弹出层内容
	.attr-content {
		padding: 0 30upx;

		view {
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			border-bottom: 1px solid #f8f8f8;
			font-size: $font-base + 2upx
		}

		.attr-title {
			text-align: left
		}

		.attr-sur {
			color: $font-color-blue
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			// min-height: 30vh;
			// border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;

				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
