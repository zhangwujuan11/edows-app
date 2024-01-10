<template>
  <view class="container">
    <!-- 空白页 -->
    <view v-if="!hasLogin || empty===true" class="empty">
      <image src="/static/emptyCart.jpg" mode="aspectFit"></image>
      <view v-if="hasLogin" class="empty-tips">
        空空如也
        <navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛>
        </navigator>
      </view>
      <view v-else class="empty-tips">
        空空如也
        <view class="navigator" @click="navToLogin">去登陆></view>
      </view>
    </view>
    <view v-else>
      <!-- 列表 -->
      <view class="cart-list">
        <block v-for="(item, index) in cartList" :key="item.id">
          <view class="cart-item" :class="{'b-b': index!==cartList.length-1 && !item.isGift }">
            <view class="image-wrappers">
              <image :src="item.isExpire ? `/static/noGoods.jpg` : item.imgPath" mode="aspectFill"
                @click="navToDetailPage(item)"></image>
              <view v-if="item.isExpire==0" class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}"
                @click="check('item', index)"></view>
            </view>
            <view class="item-right">
              <text class="title clamp2" @click="navToDetailPage(item)">{{item.productName}}</text>
              <view class="attr">
                <text v-for="(subItem, subIndex) in item.attrValueVOList" :key="subIndex">
                  {{subItem.attrValue}}
                </text>
              </view>
              <text class="price">¥{{item.price}}</text>

            </view>
            <view v-if="item.isExpire==0">
              <uni-number-box class="step" :min="1" :max="stock" :value="item.num>stock?stock:item.num"
                :isMax="item.num>=stock?true:false" :isMin="item.num===1" v-model="item.num" :index="index"
                @eventChange="numberChange"></uni-number-box>
            </view>

            <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
          </view>

          <!-- <view class="c-list b-b"  v-if="item.isGift">
						<view class="c-row">
							<text class="tit  blue">赠品信息：</text>
							<view class="bz-list con">
								<block v-for="(subItem,subIndex) in item.giftVOList" :key="subIndex">
									<navigator :url="`/pages/product/product?code=` + subItem.giftCode">
										<text>{{subIndex+1}}、{{subItem.giftName}} x {{subItem.giftNum}}</text>
										<text v-if="subItem.remarks" class="grey"> ( {{subItem.remarks}} ) </text>
									</navigator>
								</block>
							</view>
						</view>
					</view> -->

          <block v-for="(subGiftItem, subGiftIndex) in item.giftVOList " :key="subGiftIndex" v-if="item.isGift">
            <navigator :url="`/pages/product/product?code=` + subGiftItem.giftCode">
              <view class="cart-item" style="padding:16upx 40upx 16upx 120upx">
                <view class="image-wrappers" style="width: 140upx; height: 140upx;">
                  <image :src="subGiftItem.giftImg" style="width: 140upx; height: 140upx;"></image>
                </view>
                <view class="item-right">
                  <text class="title clamp">{{subGiftItem.giftName}}</text>
                  <view class="attr">
                    <text>
                      数量：{{subGiftItem.giftNum}}
                    </text>
                    <text v-if="subGiftItem.remarks" class="grey"> ( {{subGiftItem.remarks}} )
                    </text>
                  </view>
                  <view class="price">
                    <text class="blue">赠品</text>
                  </view>
                </view>
              </view>
            </navigator>
          </block>

        </block>
      </view>
      <!-- 底部菜单栏 -->
      <view class="action-section">
        <view class="checkbox">
          <image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')">
          </image>
          <view class="clear-btn " :class="{show: allChecked}" @click="clearCart">
            清空
          </view>
        </view>
        <view class="total-box">
          <text class="price ">¥{{total}}</text>
          <!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
        </view>
        <button type="primary" class="no-border confirm-btn blueGraShadow" @click="createOrder">去结算</button>
      </view>
    </view>
    <!-- <CustomTabBar :currentTab="currentTab"></CustomTabBar> -->
  </view>
</template>

<script>
  // import CustomTabBar from "@/components/CustomTabBar.vue"
  import {
    mapState
  } from 'vuex';
  import uniNumberBox from '@/components/uni-number-box.vue'
  export default {
    components: {
      uniNumberBox,
      // CustomTabBar
    },
    data() {
      return {
        stock: 99999,
        total: 0, //总价格
        allChecked: false, //全选状态  true|false
        empty: false, //空白页现实  true|false
        cartList: [],
        currentTab: 'tab3'
      };
    },
    //强制刷新 
    async onShow() {
      this.loadData();

    },
    created() {
      // uni.hideTabBar()
    },
    async onLoad() {

      this.loadData();
      //this.cartList = [];

    },
    watch: {
      //显示空白页
      cartList(e) {
        let empty = e.length === 0 ? true : false;
        if (this.empty !== empty) {
          this.empty = empty;
        }
      }
    },
    computed: {
      ...mapState(['hasLogin'])
    },
    methods: {
      //请求数据
      async loadData() {
        //let list = await this.$api.json('cartList'); 
        var params = {
          pageNo: 1,
          pageSize: 999
        }
        let res = await this.$axios(this.$baseUrl.getShoppingCartList, params);
        if (res.data.code == 200) {
          let cartList = res.data.data.map(item => {
            // if(item.isExpire == 1){
            // 	item.checked = false;
            // }else{
            // 	item.checked = false;
            // }
            return item;
          });
          this.cartList = cartList;
          //console.log(this.cartList[0].num)
          this.calcTotal(); //计算总价
        }

      },
      //监听image加载完成
      onImageLoad(key, index) {
        this.$set(this[key][index], 'loaded', 'loaded');
      },
      //监听image加载失败
      onImageError(key, index) {
        this[key][index].image = '/static/404.jpg';
      },
      navToLogin() {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      },
      //跳转进详情
      navToDetailPage(item) {
        let code = item.productCode;
        if (item.isExpire == 1) {
          this.$api.msg('商品已下架');
        } else {
          uni.navigateTo({
            url: `/pages/product/product?code=${code}`
          })
        }

      },
      //选中状态处理
      async check(type, index) {
        if (type === 'item') {

          this.cartList[index].checked = !this.cartList[index].checked;
          var params = {
            cartId: this.cartList[index].id,
            checked: this.cartList[index].checked
          }
          let res = await this.$axios(this.$baseUrl.shoppingCartChecked, params);
        } else {

          const checked = !this.allChecked

          const list = this.cartList;
          list.forEach(item => {
            if (item.isExpire == 0) {
              item.checked = checked;
            }

          })
          this.allChecked = checked;
          console.log(this.allChecked)
          var params = {
            allChecked: this.allChecked
          }
          let res = await this.$axios(this.$baseUrl.shoppingCartChecked, params);
        }
        this.calcTotal(type);
      },
      //数量
      async numberChange(data) {
        //this.cartList[data.index].num 

        if (this.cartList[data.index].num < 1 || data.number < 1) {
          this.cartList[data.index].num = 1;
          data.number = 1;
        }
        console.log('数据信息：', data)
        var params = {
          id: this.cartList[data.index].id,
          num: data.number
        }
        let res = await this.$axios(this.$baseUrl.editSumShoppingCart, params);
        if (res.data.code == 200) {
          //this.loadData();
          this.cartList[data.index].num = data.number;
          this.calcTotal();
        }
        // this.cartList[data.index].num = data.number;
        // this.calcTotal();
      },
      //删除
      deleteCartItem(index) {
        uni.showModal({
          content: '确定从购物车中移除？',
          success: async (res) => {
            if (res.confirm) {
              console.log(this.cartList[index].id);
              var params = {
                cartIds: this.cartList[index].id
              }
              let res = await this.$axios(this.$baseUrl.delShoppingCart, params);
              if (res.data.code == 200) {
                this.loadData();
              }
            }
          }
        });
      },
      //清空
      clearCart() {
        uni.showModal({
          content: '清空购物车？',
          success: async (e) => {
            if (e.confirm) {
              var cartIds = [];
              for (var i in this.cartList) {
                cartIds.push(this.cartList[i].id)
              }
              console.log(cartIds.join(','))
              var params = {
                cartIds: cartIds.join(',')
              }
              let res = await this.$axios(this.$baseUrl.delShoppingCart, params);
              if (res.data.code == 200) {
                this.loadData();
              }
            }
          }
        })
      },
      //计算总价
      calcTotal() {
        let list = this.cartList;
        if (list.length === 0) {
          this.empty = true;
          return;
        }
        let total = 0;
        let checked = true;
        list.forEach(item => {
          if (item.isExpire == 0) {
            if (item.checked === true) {
              total += item.price * item.num;
            } else if (checked === true) {
              checked = false;
            }
          }

        })
        this.allChecked = checked;
        this.total = Number(total.toFixed(2));
      },
      //创建订单
      async createOrder() {
        let list = this.cartList;
        //let productsData = [];
        let goodsData = [];
        list.forEach(item => {
          console.log(item)
          if (item.checked) {
            // productsData.push({
            // 	attrValues : item.attrValueVOList,
            // 	cartId : item.id,
            // 	num: item.num,
            // 	productCode: item.productCode,
            // 	productName : item.productName
            // })
            goodsData.push({
              productList: item,
              productNum: item.num,
            })
          }
        })
        if (!goodsData.length) {
          this.$api.msg('请先选择购物车商品！');
          return;
        }
        //console.log(productsData);
        // var params = {
        // 	productList: productsData
        // }
        //let res = await this.$axios(this.$baseUrl.toBuyProduct, params);
        uni.setStorage({ //缓存临时订单
          key: 'tmpOrderData',
          data: goodsData
        })
        uni.navigateTo({
          url: `/pages/order/createOrder`
        })
        //this.$api.msg('跳转下一页 sendData');
      }
    }
  }
</script>

<style lang='scss'>
  .container {
    padding-bottom: 134upx;

    /* 空白页 */
    .empty {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      padding-bottom: 100upx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background: #fff;

      image {
        width: 240upx;
        height: 160upx;
        margin-bottom: 30upx;
      }

      .empty-tips {
        display: flex;
        font-size: $font-sm+2upx;
        color: $font-color-disabled;

        .navigator {
          color: $font-color-blue;
          margin-left: 16upx;
        }
      }
    }
  }

  .c-list {
    position: relative;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    background: #fff;

    .c-row {
      display: flex;
      align-items: center;
      padding: 30upx 30upx;
      position: relative;
    }

    .tit {
      width: 140upx;
    }

    .con {
      flex: 1;
      color: $font-color-blue;

      .selected-text {
        margin-right: 10upx;
      }
    }

    .bz-list {
      line-height: 46upx;
      font-size: $font-sm+2upx;
      color: $font-color-dark;

      /* &.blue{
				color: $font-color-blue;
			} */
      text {
        display: inline-block;
        margin-right: 30upx;
      }
    }

    .con-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: $font-color-dark;
      line-height: 40upx;
    }

    .red {
      color: $uni-color-primary;
    }
  }

  /* 购物车列表项 */
  .cart-item {
    display: flex;
    position: relative;
    padding: 30upx 40upx;

    .image-wrappers {
      width: 230upx;
      height: 230upx;
      flex-shrink: 0;
      position: relative;

      image {
        width: 230upx;
        height: 230upx;
        border-radius: 8upx;
      }
    }

    .checkbox {
      position: absolute;
      left: -16upx;
      top: -16upx;
      z-index: 8;
      font-size: 44upx;
      line-height: 1;
      padding: 4upx;
      color: $font-color-disabled;
      background: #fff;
      border-radius: 50px;
    }

    .item-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;
      padding-left: 30upx;

      .title {
        font-size: $font-base;
        color: $font-color-dark;
        line-height: 40upx;
      }

      .attr {
        font-size: $font-sm + 2upx;
        color: $font-color-light;
        margin-top: 10upx;
        /* height: 50upx; */
        line-height: 40upx;

        text {
          padding-right: 10upx
        }
      }

      .price {
        font-weight: 600;
        font-size: $font-base + 2upx;
        position: absolute;
        bottom: 0upx;
        color: $uni-color-primary;
        left: 30upx;
        height: 50upx;
        line-height: 50upx;
      }
    }

    .del-btn {
      padding: 4upx 10upx;
      font-size: 34upx;
      height: 50upx;
      color: $font-color-light;
    }
  }

  /* 底部栏 */
  .action-section {
    /* #ifdef H5 */
    margin-bottom: 100upx;
    /* #endif */
    position: fixed;
    left: 30upx;
    bottom: 30upx;
    z-index: 95;
    display: flex;
    align-items: center;
    width: 690upx;
    height: 100upx;
    padding: 0 30upx;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
    border-radius: 16upx;

    .checkbox {
      height: 52upx;
      position: relative;

      image {
        width: 52upx;
        height: 100%;
        position: relative;
        z-index: 5;
      }
    }

    .clear-btn {
      position: absolute;
      left: 26upx;
      top: 0;
      z-index: 4;
      width: 0;
      height: 52upx;
      line-height: 52upx;
      padding-left: 38upx;
      font-size: $font-base;
      color: #fff;
      background: $font-color-disabled;
      border-radius: 0 50px 50px 0;
      opacity: 0;
      transition: .2s;

      &.show {
        opacity: 1;
        width: 120upx;
      }
    }

    .total-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: right;
      padding-right: 40upx;

      .price {
        font-weight: 600;
        font-size: $font-lg;
        color: $uni-color-primary;
      }

      .coupon {
        font-size: $font-sm;
        color: $font-color-light;

        text {
          color: $font-color-dark;
        }
      }
    }

    .confirm-btn {
      padding: 0 38upx;
      margin: 0;
      border-radius: 100px;
      height: 76upx;
      line-height: 76upx;
      font-size: $font-base + 2upx;
      /* background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72) */
    }
  }

  /* 复选框选中状态 */
  .action-section .checkbox.checked,
  .cart-item .checkbox.checked {
    color: $font-color-blue;
  }
</style>