<template>
  <div class="home-school">
    <div class="home-school__title"></div>
    <div class="home-school__container">
      <div class="home-school__box">
        <div class="home-school__box--pic"></div>
        <div class="home-school__box--title">全体学生享留学全套服务8折优惠（原价4998元）</div>
        <div class="home-school__box--text">你与成功留学只差一个myOffer</div>
        <button class="home-school__box--btn" @click="showAward"></button>
      </div>
      <div class="home-school__box">
        <div class="home-school__box--pic"></div>
        <div class="home-school__box--title">霸屏myOffer App开屏页一个月</div>
        <div class="home-school__box--text">优秀的学校 培养更优秀的人才</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      showAward () {
        wx.showLoading()
        this.$emit('showModalStudent')
        wx.hideLoading()
      }
    }
  }
</script>
<style lang="less" scoped>
.home-school {
  padding-top: 16px;
  padding-bottom: 14px;
  background-color: #fff;

  .home-school__title {
    width: 297px;
    height: 46px;
    margin: 0 auto 16px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/title-school.png") no-repeat center center;
    background-size: auto 100%;
  }

  .home-school__container {
    height: 504px;
    padding-top: 109px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-school-bg.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .home-school__box {
    position: relative;
    width: 303px;
    height: 150px;
    margin:0 auto 18px;
    padding-top: 20px;
    padding-left: 113px;
    padding-right: 10px;
  }

  .home-school__box--title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 15px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(66, 142, 170, 0.50);
  }

  .home-school__box--text {
    font-size: 14px;
    line-height: 15px;
    color: #fff;
  }

  .home-school__box--btn {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 136px;
    height: 38px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-detail.jpg") no-repeat left top;
    background-size: cover;
  }
}
</style>
