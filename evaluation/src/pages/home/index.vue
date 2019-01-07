<template>
  <div class="home">
    <button open-type="getUserInfo" @getuserinfo="start"></button>
    <div class="home-bottom"></div>
  </div>
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
        wx.navigateTo({
          url: '/pages/index/main'
        })
      }
    }
  },
  onShareAppMessage () {
    return {
      title: '出国留学测评',
      path: '/pages/home/main'
    }
  }
}
</script>
<style lang="less">
.home {
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  background: url("https://img.myoffer.cn/wxxcx/bg_home.jpg") no-repeat left top;
  background-size: 100% 100%;
  button {
    position: absolute;
    left: 50%;
    bottom: 405rpx;
    width: 750rpx;
    height: 244rpx;
    transform: translateX(-50%);
    background: url("https://img.myoffer.cn/wxxcx/btn_home.png") no-repeat left top;
    background-size: cover;
  }
  .home-bottom{
    position: absolute;
    bottom: -1rpx;
    left: 0;
    width: 100%;
    height: 530rpx;
    background: url("https://img.myoffer.cn/wxxcx/bg_home_bottom.png") no-repeat left top;
    background-size: 100% 530rpx;
  }
}
</style>

