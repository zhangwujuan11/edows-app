<template>
	<view class='container' v-if="flag">
		<view v-if="step1" class="reserve-cont">

			<view class="inner-cont p40">
				<view class="reserve-top">
					<image src="../../static/service.png" height="54px" />
				</view>
				<view class="reserve-bot">
					<image src="../../static/options.png" height="120px" />
				</view>
				<view style="padding-top:20px">
					<view class="row b-b">
						<text class="red iconD">*</text>
						<text class="tit">客户姓名</text>
						<input class="input" type="text" v-model="name" placeholder="客户姓名" placeholder-class="placeholder" />
					</view>
					<view class="row b-b">
						<text class="red iconD">*</text>
						<text class="tit">联系方式</text>
						<input class="input" type="number" v-model="mobile" placeholder="联系方式" placeholder-class="placeholder" maxlength="11" />
					</view>
					<view class="row b-b">
						<text class="red iconD">*</text>
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

					<view class="row b-b" @click="showCar">
						<text class="tit">车辆信息</text>
						<text class="input">
							{{carType ? carType : "请选择车辆信息"}}
						</text>
					</view>

					<view class="row b-b">
						<view class="uni-list">
							<view class="uni-list-cell">
								<text class="tit">车牌号码</text>
								<view class="uni-list-cell-db input">
									<picker @change="cngProChange" :value="initProv" :range="provList" range-key="code">
										<view class="uni-input uni-prov">{{provList[initProv].code}}</view>
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
				</view>
			</view>
			<view>
				<button class="add-btn blueGraShadow" @click="confirm">提交</button>
			</view>
		</view>
		<list-index v-if="addressBook.length && step2" :dataList="addressBook" @click="chooseEvent"></list-index>
		<list-brand v-if="step3" :dataList="brandList" @click="chooseCarType"></list-brand>
		<uni-drawer :visible="showRigth" mode="right" @close="closeDrawer('right')">
			<scroll-view :scroll-top="0" scroll-y="true" :style="{ height: winHeight + 'px' }">
				<block v-for="(list, idx) in vehicle" :key="idx">
					<view class="vehicle-list-item">
						<!-- <view v-if="list.data && list.data.length" :id="list.letter" class="vehicle-list-item-title">{{ list.letter }}</view> -->
						<view v-if="list.data && list.data.length" class="uni-list">
							<view v-for="(item, index) in list.data" :key="index" class="vehicle-list-item-contect" hover-class="uni-list-item--hover"
							 @click="chooseVehicle(item)">
								<view class="uni-list-item__content">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
			<view></view>
		</uni-drawer>
	</view>

</template>

<script>
	import {
		fn
	} from '@/util/common.js';
	import {
		mapState
	} from 'vuex';
	import {
		carBrands,
		addressBook
	} from '@/data/allBrands.js'
	import listIndex from '@/components/list-index/list-index'
	import listBrand from '@/components/list-brand/list-brand'
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		data() {
			return {
				subFlag: true,
				flag: false,
				step1: true,
				step2: false,
				step3: false,
				brands: [],
				brandList: [],
				showRigth: false,
				vehicle: [],
				select_path: [],
				winHeight: 0,
				carList: [],
				arrWords: [],
				name: "",
				mobile: "",
				initStype: "0",
				serviceType: "",
				carTypeList: [],
				carInfoList: [],
				carType: "",
				carInfoId: "",
				brandId: '',
				provSelected: "京",
				initProv: "0",
				carNo: "",

				sTypeList: [{
						name: '请选择服务类型',
						value: '0',
						code: ''
					},
					{
						name: '拆装',
						value: '1',
						code: '1'
					},
					{
						name: '更换',
						value: '2',
						code: '2'
					},
					{
						name: '修复',
						value: '3',
						code: '3'
					},
					{
						name: '贴膜',
						value: '4',
						code: '4'
					},
					{
						name: '其他',
						value: '5',
						code: '0'
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
				//addressBook:{}
			}
		},
		async onLoad(option) {
			// let returnUrl = getCurrentPages()[0].route;
			// console.log('当前路由：', returnUrl);
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/wxAuth/wxAuth?returnUrl=' + returnUrl
			// 	})
			// }

			// 全局监听完选择完成
			uni.$on('vechice_computed', (e) => {
				this.select_path.computed = true;
				this.select_path.detail = typeof e === 'string' ? e : '';
				console.debug(this.select_path);
			})
			//this.getCarList();
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('vechice_computed');
		},
		created() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
			this.getCarList();


		},
		mounted() {},

		computed: {
			...mapState(['hasLogin', 'userInfo']),
			addressBook() {
				if (this.flag) {
					return addressBook.list.filter(item => {
						return item.data.length > 0
					})
				}


			}
		},
		components: {
			listIndex,
			listBrand,
			uniDrawer
		},
		methods: {

			bindPickerChange: function(e) {
				let index = e.target.value;
				this.initStype = this.sTypeList[index].value ;
				this.serviceType = this.sTypeList[index].code;
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
				console.log('e：', this.carNo)
				this.carNo = this.carNo.toUpperCase();
			},

			showCar() {
				this.step1 = false;
				this.step2 = true;
				this.step3 = false;
			},


			//得到车辆列表数组
			async getCarList() {
				var params = {}
				let res = await this.$axios(this.$baseUrl.getCarBrandList, params);
				if (res.data.code == 200) {
					var resData = res.data.data;
					//console.log(this.carList)
					let _obj = []
					_obj.push({
						'letter': 'TOP',
						'data': []
					});

					resData.filter(item => {
						//var _data = item['Brand'].split(' - ');
						var _index = _obj.findIndex(_item => {
							return _item.letter == item['firstletter'] ? true : false;
						})
						if (-1 == _index) {
							_obj.push({
								'letter': item['firstletter'],
								'data': [{
									'brand': item['name'],
									'name': item['name'],
									'id': item['id'],
									'img': item['img'],
									'md5': '12321313'
								}]
							})
						} else {
							_obj[_index].data.push({
								'brand': item['name'],
								'name': item['name'],
								'id': item['id'],
								'img': item['img'],
								'md5': '12321313'
							})

						}
					})
					addressBook.list = _obj;
					setTimeout(() => {
						this.flag = true;
						console.log('addressBook：', addressBook)
					}, 20)

				}
			},

			//选择车辆
			chooseVehicle(data) {
				console.log('最终车辆选择数据：', data);
				this.carType = data.name;
				this.step1 = true;
				this.step2 = false;
				this.step3 = false;
				this.showRigth = false
			},
			// 选择品牌
			async chooseEvent(data) {
				console.log('选择的数据：', data)
				this.step1 = false;
				this.step2 = false;
				this.step3 = true;
				// this.vehicle = this.select_path = []
				// this.select_path.computed = false
				// this.select_path.brand_name = data.data.name
				// this.select_path.brand_id = data.data.md5
				var id = data.data.id;
				var letter = data.letter;
				var params = {
					brandId: id
				}
				let _obj = []
				let res = await this.$axios(this.$baseUrl.getCarSeriesList, params);
				//let url = 'https://edows.txsofts.com/api/car/series/list?token=&brandId=' + id;
				if (res.data.code == 200) {
					this.brandList = res.data.data;
				}

			},

			//车辆品牌选择后信息
			async chooseCarType(data) {
				console.log('车辆品牌选择后信息：', data);
				var id = data.data.id;
				var letter = "";
				let _obj = [];
				var params = {
					"seriesId": id
				}
				let res = await this.$axios(this.$baseUrl.getCarInfoList, params);

				//let url = 'https://edows.txsofts.com/api/car/info/list?token=&seriesId=' + id;
				if (res.data.code == 200) {
					this.showRigth = true;
					res.data.data.filter(item => {
						var _index = _obj.findIndex(_item => {
							return _item.letter == letter;
						})
						if (-1 == _index) {
							_obj.push({
								'letter': letter,
								'data': [{
									'VehicleId': item['id'],
									'name': item['fullName']
								}]
							})
						} else {
							_obj[_index].data.push({
								'VehicleId': item['id'],
								'name': item['fullName']
							})

						}
					})
					this.vehicle = _obj;
				}

			},
			closeDrawer(e) {
				this.showRigth = false
			},
			//提交
			async confirm() {
				var _self = this;
				if (!this.name) {
					this.$api.msg('客户姓名不能为空');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!this.serviceType) {
					this.$api.msg('请选择服务类型');
					return;
				}

				var params = {
					"carNo": this.provSelected + this.carNo,
					"carType": this.carType,
					"mobile": this.mobile,
					"name": this.name,
					"remarks": this.remarks,
					"serviceType": this.serviceType
				};
				console.log(params)
				if (this.subFlag) {
					this.subFlag = false;
					let res = await this.$axios(this.$baseUrl.subReservationService, params);
					if (res.data.code == 200) {
						this.subFlag = true;
						uni.navigateTo({
							url: '/pages/reserve/reserveSuc'
						})
					}
					setTimeout(function() {
						_self.subFlag = true;
					}, 3000)
				}


			}
		}
	}
</script>
<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.reserve-cont {
		margin-top: 40px;
		position: relative;
	}

	.inner-cont {
		position: relative;
		width: 94%;
		margin: 10px auto;
		padding-bottom: 100px;
		background: #fff;
		border-radius: 12upx;

	}
	.uni-prov{ width:60upx; font-weight: 600; font-size: $font-lg; color:$font-color-blue}

	.reserve-top {
		position: absolute;
		z-index: 1;
		left: 0;
		top: -34px;
		width: 100%;
		text-align: center;
	}

	.reserve-top image {
		width: 240px;
		height: 54px;
	}

	.reserve-bot {
		position: absolute;
		z-index: 1;
		left: 0;
		bottom: -40px;
		width: 100%;
		text-align: center;
	}

	.reserve-bot image {
		width: 120px;
		height: 120px;
	}

	.goods-img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.iconD {
		position: absolute;
		top: 34upx;
		color: $font-color-red;
		left: 20upx;
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
			width: 180upx;
			text-indent: 20upx;
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

	.vehicle-list-item-title {
		padding: 24upx 30upx;
		line-height: 1.5;
		background-color: #f7f7f7;
		font-size: 32upx
	}

	.vehicle-list-item-contect {
		font-size: 32upx;
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-data: center;
		border-bottom: 1rpx solid #eee;
		;
	}
</style>
