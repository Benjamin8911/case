<template>
  <div class="home-sun">
    <div class="home-sun__title"></div>
    <div class="home-sun__box">
      <button class="home-sun__box--btn" @click="showAward"></button>
    </div>
    <div class="home-sun__info">特别鸣谢：职场先生、AIESEC对本次活动的大力支持及奖品赞助</div>
  </div>
</template>
<script>
  import api from '@/assets/js/api'
  const app = getApp()
  export default {
    computed: {
      isBegin () {
        return this.$store.state.isBegin
      }
    },
    methods: {
      showAward () {
        if (!this.isBegin) {
          wx.showToast({
            title: '活动已结束',
            icon: 'none'
          })
          return false
        }
        if (wx.getStorageSync('ifGetPhone')) {
          api.prizeDraw({
            apikey: wx.getStorageSync('apikey')
          })
          this.$emit('showModalSun')
          app.aldstat.sendEvent('发起者/助力者领取文书次数')
        } else {
          wx.navigateTo({
            url: '/pages/authorization/main'
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.home-sun {
  padding-top: 16px;
  padding-bottom: 10px;
  background-color: #fff;

  .home-sun__title {
    width: 259px;
    height: 46px;
    margin: 0 auto 16px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/title-sun.png") no-repeat center center;
    background-size: auto 100%;
  }

  .home-sun__box {
    height: 457px;
    padding-top: 294px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-sun-bg.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .home-sun__box--btn {
    width: 257px;
    height: 64px;
    margin: 0 auto;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-sun-new.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .home-sun__info {
    position: relative;
    width: 335px;
    padding-left: 48px;
    margin-top: 13px;
    font-size: 12px;
    line-height: 15px;
    color: #333;
  }

  .home-sun__info::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 37px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #808080;
  }
}
</style>
