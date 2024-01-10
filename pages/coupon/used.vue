<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder"
			 maxlength="11" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.address}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.roomNum" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefult ? true : false" color="#339cfe" @change="switchChange" />
		</view>
		<button class="add-btn blueGraShadow" @click="confirm">保存</button>
		<view class="del-btn" v-show="isShowDel" @click="toggleSpec">
			<text>删除收货地址</text>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="attr-title">
					<text>确定要删除该收货人信息吗？</text>
				</view>
				<view class="attr-sur" @click="surDel">确定</view>
				<view class="attr-cancel" @click="toggleSpec">取消</view>
			</view>
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
				orderData:'',
				subFlag : true,
				specClass: 'none',
				isShowDel: false,
				contactsId: '',
				addressData: {
					id: '',
					name: '',
					mobile: '',
					addressName: '在地图上选择',
					address: '在地图上选择',
					roomNum: '',
					isDefult: 0
				}
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
			this.orderData = option.orderData;
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data);
				this.contactsId = this.addressData.id;
				this.isShowDel = true;

			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
			//console.log("是否删除：",this.isShowDel)
			//this.$api.msg(this.manageType)
		},
		methods: {
			switchChange(e) {
				console.log(e.detail.value)
				if (e.detail.value) {
					this.addressData.isDefult = 1
				} else {
					this.addressData.isDefult = 0
				}
				//this.addressData.isDefult = e.detail;
				console.log(this.addressData.isDefult)
			},

			//地图选择地址
			chooseLocation() {
				var _self = this;
				// uni.chooseLocation({
				// 	success: (data)=> {
				// 		this.addressData.addressName = data.name;
				// 		this.addressData.address = data.name;
				// 	}
				// })
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userLocation']) {
							uni.authorize({
								scope: 'scope.userLocation',
								success() {
									uni.chooseLocation({
										success: function(res) {
											console.log("地址：",res)
											_self.addressData.addressName = res.address +' ' + res.name
											_self.addressData.address = res.address +' ' + res.name
										}
									});
								}
							})
						} else {
							uni.chooseLocation({
								success: function(res) {
									console.log("地址：",res)
									_self.addressData.addressName = res.address +' ' + res.name
									_self.addressData.address = res.address +' ' + res.name
								}
							});
						}
					}
				})
			},
			//删除地址
			async surDel() {
				var params = {
					contactsId: this.contactsId
				};
				let res = await this.$axios(this.$baseUrl.delContacts, params);
				if (res.data.code == 200) {
					this.$api.msg('地址删除成功');
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/address/address?orderData=${this.orderData}`
						})
					}, 800)
				}
			},
			//提交
			async confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!data.address || data.address == '在地图上选择') {
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if (!data.roomNum) {
					this.$api.msg('请填写门牌号信息');
					return;
				}
				var params = this.addressData;
				console.log(params)
				if(this.subFlag){
					this.subFlag = false;
					let res = await this.$axios(this.$baseUrl.upDataContacts, params);
					if (res.data.code == 200) {
						this.subFlag = true;
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(() => {
							// uni.navigateBack()
							uni.navigateTo({
								url: `/pages/address/address?orderData=${this.orderData}`
							})
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

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
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
