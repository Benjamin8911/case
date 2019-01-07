<template>
  <section class="index">
    <button class="index-btn" open-type="getUserInfo" @getuserinfo="start"></button>
  </section>
</template>
<script>
  export default {
    methods: {
      start (e) {
        if (e.mp.detail.errMsg === 'getUserInfo:fail auth deny') {
          wx.showToast({
            title: '取消授权，请您重新授权',
            icon: 'none'
          })
        } else {
          wx.setStorageSync('userAuth', true)
          wx.redirectTo({
            url: '/pages/index/main?id=' + this.$store.state.sponsor
          })
        }
      }
    },
    onLoad (e) {
      if (e.source !== undefined) {
        wx.setStorageSync('WXAppletSource', e.source)
      }
      if (wx.getStorageSync('userAuth')) {
        if (e.id !== undefined) {
          wx.setStorageSync('sponsor', e.id)
          this.$store.dispatch('setSponsor', e.id)
          wx.redirectTo({
            url: '/pages/index/main?id=' + e.id
          })
        } else {
          wx.redirectTo({
            url: '/pages/index/main'
          })
        }
      } else {
        if (e.id !== undefined) {
          this.id = e.id
          wx.setStorageSync('sponsor', e.id)
          this.$store.dispatch('setSponsor', e.id)
        }
        return false
      }
    }
  }
</script>
<style lang="less">
  .index {
    position: relative;
    display: block;
    width: 100%;
    height: 100vh;
    background: url("https://img.myoffer.cn/wxxcx/20190101/start-bg.png") no-repeat left top;
    background-size: 100% 100%;

    .index-btn {
      position: absolute;
      bottom: 45px;
      left: 50%;
      width: 308px;
      height: 55px;
      font-weight: bold;
      line-height: 50px;
      color: #FFF;
      background: url("https://img.myoffer.cn/wxxcx/20190101/start-btn.png") no-repeat left top;
      background-size: 100% 100%;
      transform: translateX(-50%);
    }
  }
</style>
