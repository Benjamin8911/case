<template>
  <div class="pay">
    <div class="pay-info">
      <div class="pay-info__img">
        <p v-if="!ifZero">您的订单已提交，请在24小时内完成支付</p>
        <p v-else>您的订单已完成支付，请联系客服</p>
      </div>
      <div class="pay-info__padding">
        <div class="pay-info__name">
          <label>商品名称</label>
          <p>{{ name }}</p>
        </div>
        <div class="pay-info__order">
          <label>订单号</label>
          <p>{{ orderId }}</p>
        </div>
        <div class="pay-info__price">
          <label>支付金额</label>
          <p>￥ <span>{{ amount }}</span></p>
        </div>
      </div>
    </div>
    <div class="pay-methods" v-show="!ifZero">
      <h2>选择支付方式</h2>
      <ul>
        <li @click="pay">
          <img src="https://img.myoffer.cn/m/images/orderPay/weixin.png">
          <span>微信支付</span>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '@/assets/js/api.js'
  export default {
    computed: {
      skuId () {
        return this.$store.state.sku._id
      },
      userCouponId () {
        return this.$store.state.userCouponId
      }
    },
    data () {
      return {
        id: '',
        amount: '',
        name: '',
        orderId: '',
        ifZero: false
      }
    },
    onLoad (e) {
      wx.showLoading({
        title: '加载中...'
      })
      if (e.id) {
        this.amount = e.amount
        this.name = e.name
        this.orderId = e.id
        wx.hideLoading()
      } else {
        this.createOrder(this.userCouponId)
      }
    },
    methods: {
      formatMoney (val) {
        return (val + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      createOrder (id) {
        let params = {
          apikey: wx.getStorageSync('apikey'),
          source: 'applet-emall',
          skuId: this.skuId,
          userCouponId: this.userCouponId
        }
        if (this.$store.state.pId) {
          params = Object.assign(params, {
            pId: this.$store.state.pId
          })
        }
        api.createOrder(params).then(res => {
          if (res.result.amount === 0) {
            this.ifZero = true
            wx.redirectTo({
              url: '/pages/order/main'
            })
          }
          this.amount = this.formatMoney(res.result.amount)
          this.name = res.result.name
          this.orderId = res.result.orderId
          this.$store.dispatch('setCoupon', {_id: '', coupon: {denomination: 0}})
          this.$store.dispatch('setVipId', '')
          wx.hideLoading()
        })
      },
      pay () {
        wx.showLoading({
          title: '加载中...'
        })
        wx.request({
          method: 'GET',
          url: 'https://www.myoffer.cn/account/wechatpay',
          data: {
            openid: wx.getStorageSync('openid'),
            WX_type: 'emall',
            order_id: this.orderId
          },
          success: res => {
            wx.hideLoading()
            const result = res.data.paramsObj
            wx.requestPayment({
              timeStamp: result.timeStamp.toString(),
              nonceStr: result.nonceStr,
              package: result.package,
              signType: result.signType,
              paySign: result.paySign,
              success: (res) => {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  success: () => {
                    wx.navigateTo({
                      url: '/pages/order/main'
                    })
                  }
                })
              },
              fail: () => {
                wx.showToast({
                  title: '支付失败，请重试',
                  icon: 'none'
                })
              }
            })
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    }
  }
</script>
<style lang="less">
.pay {
  box-sizing: border-box;
  height: 100vh;
  padding: 30px 12px 0;
  color: #333;
  background-color: #f3f3f3;

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .content {
    margin: 30px 12px 190px;
    background: #fff;

    .tip {
      position: relative;
      font-size: 0;

      img {
        width: 100%;
      }

      p {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        text-align: center;
      }
    }

    .name,
    .number,
    .price {
      margin-left: 16px;
      margin-right: 16px;
      padding-top: 16px;

      label {
        float: left;
        font-weight: 500;
        color: #989898;
      }
    }

    .number,
    .price {
      label {
        font-size: 12px;
      }

      p {
        float: right;
      }
    }

    .name {
      padding-bottom: 25px;
      border-bottom: 1px solid #EDF0F3;

      p {
        margin-left: 86px;
        font-weight: 600;
        color: #333;
      }
    }

    .price {
      padding-bottom: 16px;

      span {
        font-size: 18px;
        font-weight: 600;
        color: #f2237b;
      }
    }
}

.pay-info {
  background-color: #fff;
}

.pay-info__img {
  height: 123px;
  font-size: 12px;
  font-weight: 600;
  line-height: 123px;
  color: #fff;
  text-align: center;
  background: url("https://img.myoffer.cn/m/images/orderPay/bg.png") no-repeat left top;
  background-size: cover;
}

.pay-info__padding {
  padding: 0 16px;
}

.pay-info__name,
.pay-info__order,
.pay-info__price {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 12px;

  label {
    color: #989898;
  }
}

.pay-info__name {
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #edf0f3;

  p {
    font-size: 14px;
    font-weight: 600;
  }
}

.pay-info__order {
  p {
    font-size: 14px;
  }
}

.pay-info__price {
  p {
    font-size: 18px;
    font-weight: 600;
  }

  span {
    color: #f2237b;
  }
}

.pay-methods {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;

    h2 {
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 12px;
      font-size: 14px;
      font-weight: 500;
      line-height: 32px;
      color: #989898;
      border-top: 1px solid #F7F7F7;
      border-bottom: 1px solid #F7F7F7;
    }

    li {
      position: relative;
      padding: 16px 12px;
    }

    img {
      display: inline-block;
      margin-right: 15px;
      width: 42px;
      height: 42px;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      font-size: 14px;
    }

    i {
      position: absolute;
      top: 50%;
      right: 20px;
      contain: "";
      width: 12px;
      height: 12px;
      border-top: 1px solid #C3C3C3;
      border-right: 1px solid #C3C3C3;
      border-bottom: 1px solid transparent;
      border-left: 1px solid transparent;
      transform: rotateZ(45deg) translateY(-50%);
    }
  }
}
</style>
