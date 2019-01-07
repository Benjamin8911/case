<template>
  <scroll-view class="orderlist" scroll-y="true" @scrolltolower="scrolltolower">
    <div class="orderlist-info">
      <img :src="avatarUrl">
      <h2>{{ nickName }}</h2>
    </div>
    <ul class="orderlist-ul" v-show="items.length > 0">
      <li v-for="item in items" :key="item" @click="goToDetail(item.id)">
        <h3 class="orderlist-ul">{{ item.name }}</h3>
        <p class="orderlist-state">
          <span class="orderlist-state__order">订单号：{{ item.id }}</span>
          <span class="orderlist-state__label">{{ item.statusName }}</span>
        </p>
        <div class="orderlist-price">
          <span>价格：{{ item.price }}元</span>
          <div>
            <button class="btn-cancel" v-show="item.status === 'ORDER_PAY_PENDING'" @click.stop="cancelOrder(item.id)">取消订单</button>
            <button class="btn-pay" v-show="item.status === 'ORDER_PAY_PENDING'" @click.stop="goToPay(item)">去支付</button>
            <button class="btn-pay" v-show="item.status === 'ORDER_CLOSED'" @click.stop="goToSku">继续逛逛</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="orderlist-empty" v-show="!items.length > 0">
      <img src="../../assets/images/order-empty.png">
      <p>亲，您还没有订单</p>
    </div>
  </scroll-view>
</template>
<script>
  import api from '@/assets/js/api.js'
  export default {
    data () {
      return {
        scrollFlag: true,
        nickName: '',
        avatarUrl: '',
        count: 0,
        items: [],
        page: 0
      }
    },
    methods: {
      formatMoney (arr) {
        arr.forEach(item => {
          item.price = (item.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
        return arr
      },
      fetchOrderList () {
        api.fetchOrderList({
          apikey: wx.getStorageSync('apikey'),
          page: this.page,
          size: 10
        }).then(res => {
          if (res.code === 11030) {
            wx.removeStorage({
              key: 'ifGetPhone'
            })
            wx.redirectTo({
              url: '/pages/authorization/main'
            })
          } else {
            this.count = res.result.count
            if (this.page === 0) {
              this.items = this.formatMoney(res.result.items)
            } else {
              if (res.result.items.length < 10) {
                this.scrollFlag = false
              }
              const arrs = this.formatMoney(res.result.items)
              this.items.push(...arrs)
            }
          }
          wx.hideLoading()
        })
      },
      scrolltolower (e) {
        wx.showLoading({
          title: '加载中...'
        })
        if (this.scrollFlag) {
          this.page++
          this.fetchOrderList()
          wx.hideLoading()
        } else {
          wx.hideLoading()
          return false
        }
      },
      cancelOrder (id) {
        wx.showModal({
          title: '提示',
          content: '是否取消订单',
          success: (res) => {
            if (res.confirm) {
              api.deleteOrder({
                apikey: wx.getStorageSync('apikey'),
                order_id: id
              }).then(res => {
                this.scrollFlag = true
                this.items = []
                this.page = 0
                this.fetchOrderList()
                wx.showToast({
                  title: '您的订单已取消'
                })
              })
            }
          }
        })
      },
      goToPay (data) {
        wx.navigateTo({
          url: '/pages/pay/main?id=' + data.id + '&amount=' + data.price + '&name=' + data.name
        })
      },
      goToSku () {
        wx.navigateTo({
          url: '/pages/index/main'
        })
      },
      goToDetail (id) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + id
        })
      }
    },
    onLoad () {
      wx.showLoading({
        title: '加载中...'
      })
      this.page = 0
      this.nickName = wx.getStorageSync('nickName')
      this.avatarUrl = wx.getStorageSync('avatarUrl')
      this.fetchOrderList()
    }
  }
</script>
<style lang="less">
.orderlist {
  height: 100vh;
  overflow: scroll;
  background-color: #f3f3f3;
}
.orderlist-info {
  height: 36vh;
  padding: 65px 0 42px;
  background: url("https://img.myoffer.cn/wxxcx/emall/2841541147099_.pic_hd.jpg") no-repeat left top;
  background-size: cover;

  img {
    width: 93px;
    height: 93px;
    margin: 0 auto 9px;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }

  h2 {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }
}

.orderlist-ul {
  li {
    padding: 15px 12px;
    margin-bottom: 16px;
    background-color: #fff;
  }

  h3 {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

.orderlist-state {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  font-size: 12px;
  border-bottom: 1px solid #f6f6f6;
}

.orderlist-state__order {
  color: #a0a0a0;
}

.orderlist-state__label {
  height: 18px;
  padding: 0 5px;
  font-size: 12px;
  line-height: 18px;
  color: #f2237b;
  border: 1px solid #f2237b;
  border-radius: 2px;
}

.orderlist-price {
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-top: 15px;

  span {
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
  }

  button {
    display: inline-block;
    width: 80px;
    height: 30px;
    margin-left: 4px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
  }

  .btn-cancel {
    background-color: #d2d2d2;
  }

  .btn-pay {
    background-color: #f2237b;
  }
}

.orderlist-empty {
  box-sizing: border-box;
  height: 64vh;
  padding: 80px 0;
  background-color: #fff;
  img {
    width: 110px;
    height: 110px;
    margin: 0 auto;
  }

  p {
    margin-top: 30px;
    font-size: 12px;
    color: #989898;
    text-align: center;
  }
}
</style>

