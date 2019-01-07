<template>
  <section class="detail">
    <h2 class="detail-state">订单{{ order.statusName }}</h2>
    <div class="detail-info">
      <h4 class="detail-info__title">{{ order.name }}</h4>
      <div class="detail-info__state">
        <div class="detail-info__state--order">订单号：{{ order.id }}</div>
        <div class="detail-info__state--name">{{ order.statusName }}</div>
      </div>
      <div class="detail-info__price">
        <div class="detail-info__price--num"><span class="color">{{ order.price }}</span>元</div>
        <div class="detail-info__price--btn">
          <button class="btn-cancel" v-show="order.status === 'ORDER_PAY_PENDING'" @click="cancelOrder(order.id)">取消订单</button>
          <button class="btn-pay" v-show="order.status === 'ORDER_PAY_PENDING'" @click="goToPay(order)">去支付</button>
          <button class="btn-pay" v-show="order.status === 'ORDER_CLOSED'" @click="goToSku">继续逛逛</button>
        </div>
      </div>
    </div>
    <div class="detail-history">
      <h4 class="detail-history__title">状态记录</h4>
      <ul class="detail-history__list">
        <li v-for="item in order.logs" :key="item">{{ item.createAt }}&nbsp;{{ item.operation==='CREATE'? '订单创建成功' : '取消订单，订单已关闭' }}</li>
        <li v-for="item in order.trades" :key="item">{{ item.create_at }}&nbsp;支付成功，订单完成</li>
      </ul>
    </div>
    <div class="detail-contract">
      <h4 class="detail-contract__title">合同信息</h4>
    </div>
    <p class="detail-service" v-show="serviceFlag"><span @click="getService">获取通道</span></p>
    <div class="detail-footer">
      <button class="btn-contact" open-type="contact">联系客服</button>
    </div>
    <div class="detail-mask" v-show="showMask">
      <div class="detail-mask__container">
        <span class="detail-close" @click="showMask=false"></span>
        <div class="detail-mask__container--box">
          <h2 class="detail-mask__title">{{ information.title }}</h2>
          <p class="detail-mask__content">{{ information.content }}</p>
          <h4 v-show="information.jumpLink" class="detail-mask__linktitle">链接：</h4>
          <p v-show="information.jumpLink" class="detail-mask__link">{{ information.jumpLink }}</p>
        </div>
        <img class="detail-mask__pic" :src="information.sketchMap" alt="">
      </div>
    </div>
  </section>
</template>
<script>
  import api from '@/assets/js/api.js'
  export default {
    data () {
      return {
        showMask: false,
        id: '',
        order: {},
        serviceFlag: false,
        information: {}
      }
    },
    onLoad (e) {
      this.id = e.id
    },
    onShow () {
      this.showMask = false
    },
    mounted () {
      wx.showLoading({
        title: '加载中...'
      })
      this.fetchOrderDetail()
    },
    methods: {
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
                wx.showToast({
                  title: '您的订单已取消'
                })
                this.fetchOrderDetail()
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
      fetchOrderDetail () {
        api.fetchOrderDetail({
          apikey: wx.getStorageSync('apikey'),
          id: this.id
        }).then(res => {
          this.order = res.result
          this.fetchService(res.result.skuId)
          wx.hideLoading()
        })
      },
      fetchService (id) {
        api.getService({
          apikey: wx.getStorageSync('apikey'),
          id: id
        }).then(res => {
          this.serviceFlag = res.result.flag
          this.information = res.result.information
        })
      },
      getService () {
        this.showMask = true
      }
    }
  }
</script>
<style lang="less">
.detail {
  padding-left: 35px;
}

.detail-state {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 20px;
}

.detail-info {
  padding: 10px 12px 15px 15px;
  margin-bottom: 16px;
  background-color: #f6f6f6;
  border-radius: 4px;
}

.detail-info__title {
  margin-bottom: 20px;
  font-size: 14px;
}

.detail-info__state {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
}

.detail-info__state--order {
  font-size: 12px;
  color: #a0a0a0;
}

.detail-info__state--name {
  display: inline-block;
  height: 18px;
  padding: 0 5px;
  font-size: 12px;
  line-height: 18px;
  color: #f2237b;
  border: 1px solid #f2237b;
  border-radius: 2px;
}

.detail-info__price {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}

.detail-info__price--num {
  font-size: 14px;

  .color {
    color: #f2237b;
  }
}

.detail-info__price--btn {
  .btn-pay,
  .btn-cancel {
    display: inline-block;
    width: 80px;
    height: 30px;
    margin-left: 4px;
    font-size: 12px;
    line-height: 30px;
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

.detail-history {
  padding: 10px 12px 15px 15px;
  margin-bottom: 16px;
  background-color: #f6f6f6;
  border-radius: 4px;
}

.detail-history__title {
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
}

.detail-history__list {
  font-size: 12px;
  color: #808080;
}

.detail-contract {
  padding: 10px 12px 15px 15px;
  margin-bottom: 16px;
  background-color: #f6f6f6;
  border-radius: 4px;

  .detail-contract__title {
    font-size: 14px;
    color: #333;
  }
}

.detail-service {
  padding-right: 12px;
  font-size: 12px;
  color: #05cbf9;
  text-align: right;
  text-decoration: underline;
}

.detail-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;

  .btn-contact {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #f2237b;
    border-radius: 0;
  }
}

.detail-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);

  .detail-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 13px;
    height: 13px;
    background: url("../../assets/images/close_01.png") no-repeat left top;
    background-size: cover;
  }

  .detail-mask__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24px 15px 34px;
    font-size: 14px;
    color: #808080;
    background-color: #fff;
  }

  .detail-mask__container--box {
    width: 244px;
  }

  .detail-mask__title {
    margin-bottom: 20px;
    font-weight: bold;
    color: #151515;
  }

  .detail-mask__content {
    line-height: 20px;
    word-wrap: break-word;
  }

  .detail-mask__linktitle {
    margin-top: 20px;
    color: #151515;
  }

  .detail-mask__link {
    color: #05cbf9;
    word-wrap: break-word;
    text-decoration: underline;
  }

  .detail-mask__pic {
    width: 86px;
    height: 86px;
  }
}
</style>

