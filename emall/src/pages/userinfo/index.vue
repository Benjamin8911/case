<template>
  <section class="userinfo">
    <button class="userinfo-btn" open-type="getUserInfo" @getuserinfo="start">开始申请</button>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        id: ''
      }
    },
    methods: {
      start (e) {
        if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
          wx.showToast({
            title: '取消授权，请您重新授权',
            icon: 'none'
          })
        } else {
          wx.setStorageSync('userAuth', true)
          if (this.id) {
            wx.redirectTo({
              url: '/pages/sku/main?id=' + this.id
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/main'
            })
          }
        }
      }
    },
    onLoad (e) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#65cbf9'
      })
      if (!wx.getStorageSync('userAuth')) {
        return false
      } else {
        if (e.id) {
          this.id = e.id
          wx.redirctTo({
            url: '/pages/sku/main?id=' + e.id
          })
        } else {
          wx.redirectTo({
            url: '/pages/index/main'
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .userinfo {
    position: relative;
    display: block;
    width: 100%;
    height: 100vh;
    background: url("https://img.myoffer.cn/wxxcx/emall/home_new.jpg") no-repeat left top;
    background-size: 100% 100%;
    // background-position: center center;

    .userinfo-btn {
      position: absolute;
      bottom: 33px;
      left: 50%;
      width: 294px;
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      color: #FFF;
      background-color: #0acdfa;
      border-radius: 25px;
      box-shadow: 0 0 7px rgba(0,0,0,0.3);
      transform: translateX(-50%);
    }
  }
</style>
