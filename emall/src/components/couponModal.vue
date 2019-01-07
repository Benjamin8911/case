<template>
  <div class="coupon" v-show="showModal">
    <div class="coupon-nouse" @click="selectCoupon(false)">不使用优惠券<i :class="{'checked': noCoupon}"></i></div>
    <div
      v-for="(item, index) in coupons"
      :key="item.coupon.id"
      class="coupon-item"
      @click="selectCoupon(item)"
    >
      <div class="coupon-item__container" :class="{'expired': item.isExpired}">
        <div class="coupon-item__container--price">
          <div class="price">￥{{item.coupon.denomination}}</div>
          <div class="text">现金券</div>
        </div>
        <div class="coupon-item__container--info">
          <div class="name">{{item.coupon.name}}</div>
          <div class="date">{{item.startTime}}~{{item.endTime}}</div>
        </div>
        <div class="coupon-item__container--rule" @click.stop="showRules(index)">使用规则</div>
      </div>
      <div class="coupon-item--rules" v-if="num === index">走秀礼品卡(以下简称礼品卡)只能在走秀网(www.xiu.com)购买产品时使用。购买产品使用的金额及配送费用将从礼品卡中扣除，每笔订单可以使用多张礼品卡。</div>
    </div>
    <div class="coupon-empty" v-if="coupons.length === 0">
      <img src="https://img.myoffer.cn/m/images/account/coupon-empty.png">
      <p>亲，没有可使用的优惠券，快去参加活动吧！</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      coupons: {
        type: Array,
        default: []
      },
      showModal: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        num: -1,
        noCoupon: false
      }
    },
    methods: {
      hide () {
        this.$emit('hide-coupon-modal')
      },
      showRules (index) {
        if (this.num !== index) {
          this.num = index
        } else {
          this.num = -1
        }
      },
      selectCoupon (item) {
        if (item) {
          this.noCoupon = false
          this.$store.dispatch('setCoupon', item)
        } else {
          this.noCoupon = false
          this.$store.dispatch('setCoupon', {coupon: {denomination: 0}, _id: ''})
        }
        this.hide()
      }
    }
  }
</script>
<style lang="less" scoped>
.coupon {
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  width: 100%;
  background: #fff;
  height: 100vh;
  overflow-y: auto;

  .coupon-nouse {
    position: relative;
    padding: 12px 10px;
    margin-bottom: 20px;
    display: block;
    font-size: 14px;
    border: 1px solid rgba(210,210,210,0.29);
    border-radius: 2px;
    line-height: 22px;

    i {
      position: absolute;
      top: 12px;
      right: 10px;
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url("../assets/images/check-4.png") center center no-repeat;
      background-size: 100%;
      &.checked {
        background-image: url("../assets/images/check-3.png");
      }
    }
  }

  .coupon-item {
    margin-bottom: 20px;
  }

  .coupon-item__container {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 169px;
    padding: 16px 27px 0 22px;
    background: url("https://img.myoffer.cn/wxxcx/emall/coupon-1-yes.png") no-repeat left top;
    background-size: 100%,100%;

    .coupon-item__container--price {
      width: 84px;
      height: 84px;
      padding-top: 20px;
      text-align: center;
      color: #05cbf9;
      border-radius: 50%;
      background-color: #fff;

      .price {
        font-size: 24px;
        font-weight: bold;
        line-height: 30px;
      }

      .text {
        font-size: 12px;
      }
    }

    .coupon-item__container--info {
      width: 180px;
      height: 95px;
      font-size: 12px;

      .name {
        line-height: 17px;
        color: #fff;
      }

      .date {
        margin-bottom: 5px;
        line-height: 17px;
        color: #e5e5e5;
      }

      .btn {
        width: 90px;
        height: 26px;
        margin: 0;
        padding: 0;
        font-size: 12px;
        line-height: 26px;
        text-align: center;
        color: #000;
        background-color: #fff;
        border-radius: 100px;
      }
    }

    .coupon-item__container--rule {
      position: absolute;
      right: 24px;
      bottom: 32px;
      font-size: 12px;
      color: #fff;
    }
  }

  .coupon-item__container.expired {
    background: url("https://img.myoffer.cn/wxxcx/emall/coupon-1-no.png") no-repeat left top;
    background-size: 100%,100%;

    .coupon-item__container--price {
      color: #808080;
      background-color: rgba(255, 255, 255, 0.7);
    }

    .coupon-item__container--info {
      .btn {
        color: #808080;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .coupon-item--rules {
    width: 321px;
    padding: 15px 20px;
    margin: -25px auto 0;
    font-size: 12px;
    color: #333;
    text-align: justify;
    background-color: #ececec;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .coupon-empty {
    padding-top: 172px;

    img {
      display: block;
      width: 128px;
      height: 128px;
      margin: 0 auto;
    }

    p {
      margin-top: 25px;
      font-size: 12px;
      color: #989898;
      text-align: center;
    }
  }
}
</style>

