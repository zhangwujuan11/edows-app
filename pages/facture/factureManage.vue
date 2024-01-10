<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">发票抬头</text>
			<input class="input" type="text" v-model="factureData.payable" placeholder="发票抬头" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">纳税人识别号</text>
			<input class="input" type="text" v-model="factureData.nsrsbh" placeholder="纳税人识别号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">注册地址</text>
			<input class="input" type="text" v-model="factureData.regAddress" placeholder="注册地址(非必填)" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">开户银行</text>
			<input class="input" type="text" v-model="factureData.bank" placeholder="开户银行(非必填)" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">开户账号</text>
			<input class="input" type="text" v-model="factureData.bankNo" placeholder="开户账号(非必填)" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">企业联系电话</text>
			<input class="input" type="number" v-model="factureData.mobile" placeholder="企业联系电话(非必填)" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">营业执照代码</text>
			<input class="input" type="text" v-model="factureData.licenseNo" placeholder="营业执照代码(非必填)" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="factureData.isDefult ? true : false"  color="#339cfe" @change="switchChange" />
		</view>
		<button class="add-btn blueGraShadow" @click="confirm">{{source==1 ? '保存并使用该发票' :'保存'}}</button>
		<view class="del-btn" v-show="isShowDel" @click="toggleSpec">
			<text>删除发票信息</text>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="attr-title">
					<text>确定要删除该发票信息吗？</text>
				</view>
				<view class="attr-sur" @click="surDel">确定</view>
				<view class="attr-cancel" @click="toggleSpec">取消</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				isShowDel: false,
				subFlag : true,
				source: 0,
				specClass: 'none',
				invoiceId: '',
				factureData: {
					"bank": "",
					"bankNo": "",
					"id": "",
					"isDefult": 0,
					"licenseNo": "",
					"mobile": "",
					"nsrsbh": "",
					"payable": "",
					"regAddress": ""
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
			let title = '新增发票信息';
			this.isShowDel = false;
			this.source = option.source;
			if (option.type === 'edit') {
				title = '编辑发票信息'
				this.invoiceId = option.invoiceId;
				//this.factureData = JSON.parse(option.data);
				this.getData(this.invoiceId);
				//this.isShowDel = true;
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e) {
				if (e.detail.value) {
					this.factureData.isDefult = 1
				} else {
					this.factureData.isDefult = 0
				}
			},
			//获取详情
			async getData(invoiceId) {
				var params = {
					invoiceId: invoiceId
				}
				let res = await this.$axios(this.$baseUrl.getInvoiceDetail, params);
				if (res.data.code == 200) {
					this.factureData = res.data.data;
					this.isShowDel = true;
				}
			
			
			},

			//删除地址
			async surDel() {
				var params = {
					invoiceId: this.invoiceId
				};
				let res = await this.$axios(this.$baseUrl.delInvoice, params);
				if (res.data.code == 200) {
					this.$api.msg('发票删除成功');
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/facture/facture`
						})
					}, 800)
				}
			},
			//提交
			async confirm() {
				//	this.$api.preToPage()
				//uni.navigateBack({delta : 2})
				let data = this.factureData;
				if (!data.payable) {
					this.$api.msg('发票抬头不能为空');
					return;
				}
				if (!data.nsrsbh) {
					this.$api.msg('纳税人识别号不能为空');
					return;
				}
				var params = this.factureData;
				console.log(params)
				if(this.subFlag){
					this.subFlag = false;
					let res = await this.$axios(this.$baseUrl.upDataInvoice, params);
					if (res.data.code == 200) {
						this.subFlag = true;
						this.$api.msg(`发票${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(() => {
							// uni.navigateBack()
							if(this.source == 1){
								this.$api.preToPage().facdureData = res.data.data;
								uni.navigateBack({delta : 2})
							}else{
								uni.navigateTo({
									url: `/pages/facture/facture`
								})
							}
							
						}, 800)
					}
				}
				
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
			width: 190upx;
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
		font-size: 30upx;
		padding-bottom:40upx
	}

	// 弹出层内容
	.attr-content {
		padding: 0 30upx;

		view {
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			border-bottom: 1px solid #f8f8f8;
			font-size: $font-base + 2upx;
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
