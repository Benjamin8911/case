<template>
  <div class="home-personal">
    <div class="home-personal__title"></div>
    <div class="home-personal__container">
      <div class="home-personal__box">
        <div class="home-personal__box--title">GIT国际金融实战训练营</div>
        <div class="home-personal__box--text">成为金融行家第一步，迈向更好的平台</div>
        <div class="home-personal__box--price">
          <div>现价<span class="home-personal__box--price-num">0</span>元</div>
          <div class="home-personal__box--price-old">原价5000元</div>
        </div>
        <button class="home-personal__box--btn" @click="showAward(1)"></button>
      </div>
      <div class="home-personal__box">
        <div class="home-personal__box--title">【AIESEC】海外志愿者</div>
        <div class="home-personal__box--text">深度跨国文化体验，公益与自我成长</div>
        <div class="home-personal__box--price">
          <div>现价<span class="home-personal__box--price-num">0</span>元</div>
          <div class="home-personal__box--price-old">原价2000元</div>
        </div>
        <button class="home-personal__box--btn" @click="showAward(2)"></button>
      </div>
      <div class="home-personal__box">
        <div class="home-personal__box--title">留学全套服务5折优惠（原价4998元）</div>
        <div class="home-personal__box--text">拉近你与成功留学的距离</div>
        <div class="home-personal__box--price">
          <div>现价<span class="home-personal__box--price-num">2499</span>元</div>
          <div class="home-personal__box--price-old">原价4998元</div>
        </div>
        <button class="home-personal__box--btn" @click="showAward(3)"></button>
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
      showAward (n) {
        wx.showLoading()
        if (n === 1) {
          this.$emit('showModalGit')
        }
        if (n === 2) {
          this.$emit('showModalVolunteer')
        }
        if (n === 3) {
          this.$emit('showModalAbroad')
        }
        wx.hideLoading()
      }
    }
  }
</script>
<style lang="less" scoped>
.home-personal {
  padding-top: 16px;
  background-color: #fff;

  .home-personal__title {
    width: 297px;
    height: 46px;
    margin: 0 auto;
    background: url("https://img.myoffer.cn/wxxcx/20190101/title-personal.png") no-repeat center center;
    background-size: auto 100%;
  }

  .home-personal__container {
    height: 835px;
    padding-top: 142px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-personal-bg.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .home-personal__box {
    position: relative;
    width: 298px;
    height: 180px;
    padding-top: 20px;
    padding-left: 123px;
    padding-right: 10px;
    margin: 0 auto 25px;
  }

  .home-personal__box--title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 1px 2px rgba(66, 142, 170, 0.50);
  }

  .home-personal__box--text {
    width: 156px;
    padding-bottom: 12px;
    margin-bottom: 9px;
    font-size: 14px;
    line-height: 15px;
    color: #fff;
    border-bottom: 1px dashed #fff;
  }

  .home-personal__box--price {
    display: flex;
    justify-content: space-between;
    width: 156px;
    height: 16px;
    line-height: 16px;
    font-size: 13px;
    color: #fff;
  }

  .home-personal__box--price-num {
    margin: 0 1px;
    line-height: 16px;
    font-size: 16px;
    color: #f2237b;
    vertical-align: top;
  }

  .home-personal__box--price-old {
    line-height: 16px;
    text-decoration: line-through;
  }

  .home-personal__box--btn {
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
