<template>
  <div class="vip" v-show="showModal">
    <span class="vip-close" @click="hide"></span>
    <div class="vip-search">
      <div class="vip-search__content">
        <img src="../assets/images/vip.png">
        <p>尊享码</p>
        <div class="vip-input">
          <input type="text" placeholder="输入尊享码" v-model="keywords">
        </div>
        <button class="btn-primary" @click="submit()">使用</button>
      </div>
    </div>
    <div class="vip-rule">
      <p>使用规则：</p>
      <p>1.尊享码不可给予他人，或转增，交易。一经发现将不视于该尊享码</p>
      <p>2.尊享码不可与优惠券同时使用</p>
      <p>3.每一个尊享码的有效时间为一天</p>
      <p>4.输入有效尊享码，立即享受优惠</p>
    </div>
    <div class="vip-modal" v-show="isShowTip" @click="toggleTip">
      <div class="vip-modal__content">
        <p class="vip-modal__content--text">{{tipText}}</p>
        <button @click="toggleTip">{{buttonText}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/assets/js/api.js'
  export default {
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
      price: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        keywords: '',
        isShowTip: false,
        tipText: '尊享码不存在',
        buttonText: '知道了'
      }
    },
    methods: {
      hide () {
        this.keywords = ''
        this.$emit('hide-vip-modal')
      },
      submit () {
        if (this.keywords.length === 0) {
          this.isShowTip = true
          this.tipText = '请输入尊享码'
          this.buttonText = '去填写'
        } else {
          api.checkPromote({
            apikey: wx.getStorageSync('apikey'),
            id: this.keywords
          }).then(res => {
            if (res.code === 80012) {
              this.isShowTip = true
              this.tipText = res.msg
              this.buttonText = '重新输入'
              this.keywords = ''
            } else {
              if (res.result.rules > this.$store.state.sku.price) {
                this.isShowTip = true
                this.tipText = '该尊享码不在活动范围内'
              } else {
                this.$store.dispatch('setVipId', res.result.promote_id)
                this.$emit('get-discount', res.result.rules)
                wx.showToast({
                  title: '使用成功'
                })
                this.hide()
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      toggleTip () {
        this.isShowTip = false
      }
    }
  }
</script>
<style lang="less" scoped>
.vip {
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 12px 20px;
  width: 100%;
  background: #fff;
  height: 100vh;
  overflow-y: auto;

  .vip-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 19px;
    height: 19px;
    background: url("../assets/images/close.png") no-repeat left top;
    background-size: cover;
  }

  .vip-search {
    padding: 0 24px;
    margin-bottom: 20px;
  }

  .vip-search__content {
    padding: 45px 50px;
    text-align: center;
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    border-radius: 3px;

    img {
      display: block;
      width: 38px;
      height: 38px;
      margin: 0 auto;
    }

    p {
      margin-bottom: 80px;
      font-size: 22px;
    }

    button {
      display: block;
      width: 100%;
      height: 44px;
      margin-top: 25px;
      font-size: 16px;
      line-height: 44px;
      color: #fff;
      background-color: #f2237b;
      border-radius: 3px;
    }
  }

  .vip-input {
    position: relative;
    input {
      font-size: 14px;
    }
  }

  .vip-input::before {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 10px;
    border: 1px solid #ddd;
    border-top-color: transparent;
  }

  .vip-rule {
    font-size: 12px;
    color: #989898;
  }

  .vip-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 998;

    .vip-modal__content {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 280px;
      height: 120px;
      padding: 25px 60px 20px;
      text-align: center;
      color: #989898;
      background-color: #fff;
      border-radius: 6px;
      transform: translate(-50%,-50%);

      button {
        display: block;
        width: 100%;
        height: 32px;
        margin-top: 20px;
        font-size: 12px;
        color: #989898;
        background-color: #f2f2f2;
        border: 1px solid transparent;
        border-radius: 1px;
      }
    }

    .vip-modal__content--text {
      font-size: 14px;
    }
  }
}
</style>

