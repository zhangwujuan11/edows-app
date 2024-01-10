<template>
	<view class="content">
		<view class="searchBox">
			<view class="inputBox">
				<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search" focus=true>
			</view>
		</view>
		<view class="search-keyword">
			<scroll-view class="keywordListBox" v-show="isShowKeywordList" scroll-y>
				<view class="keywordEntry" hover-class="keywordEntryTap" v-for="row in keywordList" :key="row.keyword">
					<view class="keywordText" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keywordImg" @tap="setkeyword(row)">
						<image src="../../static/back.png"></image>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="keywordBox" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="../../static/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="key in oldKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'../../static/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="key in hotKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
					</view>
					<view class="hideHotTis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false
			}
		},
		onLoad() {
			
			this.init();
			
		},
		methods: {
			init() {
				this.loadOldKeyword();
				this.loadHotKeyword();
				this.defaultKeyword = "关键字";
			},
			//加载历史搜索
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['玻璃'];
			},
			//监听输入
			async inputChange(event) {
				var keyword = event.detail.value;
				if (!keyword) {
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				var params = {
					keyWord: keyword
				}
				let res = await this.$axios(this.$baseUrl.getSearchKeywords, params);
				this.keywordList = this.drawCorrelativeKeyword(res.data.data, keyword);
				// uni.request({
				// 	url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
				// 	success: (res) => {
				// 		this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
				// 	}
				// });
			},
			//高亮关键字
			drawCorrelativeKeyword: function(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row.name.replace(keyword, "<span style='color: #339cfe;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row.name,
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : '';
				
				if (!key) {
					this.$api.msg('关键字不能为空');
					return;
				}
				this.keyword = key;
				this.saveKeyword(key); //保存为历史 
				
				uni.navigateTo({
					url: "/pages/search/search?kw=" + key
				})
				//以下是示例跳转淘宝搜索
				//#ifdef APP-PLUS
				plus.runtime.openURL('taobao://s.taobao.com/search?q=' + key);
				//#endif
				//#ifdef H5
				window.location.href = 'taobao://s.taobao.com/search?q=' + key
				//#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>

<style>
	.searchBox {
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 7.5px 2.5%;
		display: flex;
		justify-content: space-between;
	}

	.searchBox .inputBox {
		width: 100%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}



	.searchBox .inputBox>input {
		width: 100%;
		height: 30px;
		font-size: 14px;
		border: 0;
		border-radius: 30px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keywordListBox {
		height: calc(100vh - 55px);
		padding-top: 5px;
		border-radius: 10px 10px 0 0;
		background-color: #fff;
	}

	.keywordEntryTap {
		background-color: #eee;
	}

	.keywordEntry {
		width: 94%;
		height: 40px;
		margin: 0 3%;
		font-size: 15px;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #e7e7e7;
	}

	.keywordEntry image {
		width: 30px;
		height: 30px;
	}

	.keywordEntry .keywordText,
	.keywordEntry .keywordImg {
		height: 40px;
		display: flex;
		align-items: center;
	}

	.keywordEntry .keywordText {
		width: 90%;
	}

	.keywordEntry .keywordImg {
		width: 10%;
		justify-content: center;
	}

	.keywordBox {
		height: calc(100vh - 55px);
		border-radius: 10px 10px 0 0;
		background-color: #fff;
	}

	.keywordBox .keyword-block {
		padding: 5px 0;
	}

	.keywordBox .keyword-block .keyword-list-header {
		width: 94%;
		padding: 5px 3%;
		font-size: 13.5px;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keywordBox .keyword-block .keyword-list-header image {
		width: 20px;
		height: 20px;
	}

	.keywordBox .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keywordBox .keyword-block .hideHotTis {
		display: flex;
		justify-content: center;
		font-size: 14px;
		color: #6b6b6b;
	}

	.keywordBox .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		padding: 0 10px;
		margin: 5px 10px 5px 0;
		height: 30px;
		font-size: 14px;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
