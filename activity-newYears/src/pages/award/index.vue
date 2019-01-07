<template>
  <div class="award">
    <div class="award-content">
      <div class="award-content__title">【奖品介绍】</div>
      <div class="award-content__section first">
        <div class="award-content__section--title">许愿冠军（个人排行第1名），可获以下礼品：</div>
        <div class="award-content__section--text">GIT国籍金融实战训练营（价值5000元）</div>
        <div class="award-content__section--text">AIESEC海外志愿者（价值2000元）</div>
        <div class="award-content__section--text">myOffer留学全套服务5折优惠（原价4998元）</div>
      </div>
      <div class="award-content__section second">
        <div class="award-content__section--title">许愿亚军（个人排行第2名），可获：</div>
        <div class="award-content__section--text">GIT国际金融实战训练营（价值5000元）</div>
        <div class="award-content__section--title">许愿亚军（个人排行第3名），可获：</div>
        <div class="award-content__section--text">AIESEC海外志愿者（价值2000元）</div>
      </div>
      <div class="award-content__section third">
        <div class="award-content__section--title">许愿季军（个人排行第4、5名），同时可获：</div>
        <div class="award-content__section--text">同时可获myOffer全套留学服务5折优惠（原价4998元）</div>
      </div>
      <div class="award-content__section fourth">
        <div class="award-content__section--title">院校排行榜前3名院校的全体学生：</div>
        <div class="award-content__section--text">凭学生证到myOffer处办理出国留学业务，均可享受8折优惠（优惠使用详情，届时请咨询专业导师）；同时排名第一的院校，该院校形象可在myOffer App开屏页进行展示，为期一个月</div>
      </div>
      <div class="award-content__section fifth">
        <div class="award-content__section--title">所有参与活动的许愿者、助愿者：</div>
        <div class="award-content__section--text">均可获由myOffer提供的【阳光普照奖】（5G留学干货）</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="less">
.award {
  height: 100vh;
  padding: 14px 0 34px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/award-bg.png") no-repeat left top;
  background-size: 100% 100%;
  overflow: auto;

  .award-content {
    width: 351px;
    height: 649px;
    margin: 0 auto;
    padding: 54px 38px 45px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/award-content.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .award-content__title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #05cbf9;
    text-align: center;
  }

  .award-content__section {
    padding-left: 25px;
    margin-bottom: 20px;
  }

  .award-content__section.first {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-1.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .award-content__section.second {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-2.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .award-content__section.third {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-3.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .award-content__section.fourth {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-4.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .award-content__section.fifth {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-5.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .award-content__section--title {
    margin-bottom: 7px;
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    color: #05cbf9;
  }

  .award-content__section--text {
    margin-bottom: 5px;
    padding-left: 16px;
    font-size: 12px;
    line-height: 16px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left 2px top 1px;
    background-size: 9px 12px;
  }
}
</style>
