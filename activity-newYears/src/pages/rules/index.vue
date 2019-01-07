<template>
  <div class="rules">
    <div class="rules-content">
      <div class="rules-content__title">【活动规则】</div>
      <div class="rules-content__section first">
        许愿发起人邀请好友助愿，获得个人许愿池票数，活动结束后票数前5名即可获本次活动大奖（详见【奖品介绍】）；如个人票数相同，以最新投票时间为最终结果；
      </div>
      <div class="rules-content__section second">
        院校许愿榜是累积该校所有参与许愿的同学获得的助愿人数并进行排名，活动结束后票数前3名即可获本次活动院校大奖（详见【奖品介绍】）；如院校票数相同，以最新投票时间为最终结果；
      </div>
      <div class="rules-content__section third">
        1人只可发起助愿请求一次，以及一位好友每日可助愿1次，也可主动发起许愿请求；
      </div>
      <div class="rules-content__section fourth">
        当日排行榜只显示前五位，用户可通过排行总榜查看自己累积的许愿池票数，以及对应院校票数；
      </div>
      <div class="rules-content__section fifth">
        活动期间，若因不可抗因素、用户作弊等原因导致异常，myOffer有权进行调整；*本活动最终解释权归myOffer所有。
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="less">
.rules {
  height: 100vh;
  padding-top: 14px;
  padding-bottom: 35px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/rules-bg.png") no-repeat left top;
  background-size: 100% 100%;
  overflow: auto;

  .rules-content {
    width: 354px;
    height: 554px;
    margin: 0 auto;
    padding: 54px 45px 85px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/rules-content.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .rules-content__title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #05cbf9;
    text-align: center;
  }

  .rules-content__section {
    margin-bottom: 25px;
    padding-left: 25px;
    font-size: 12px;
    line-height: 17px;
    color: #333;
  }

  .rules-content__section.first {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-1.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .rules-content__section.second {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-2.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .rules-content__section.third {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-3.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .rules-content__section.fourth {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-4.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .rules-content__section.fifth {
    background: url("https://img.myoffer.cn/wxxcx/20190101/index-5.png") no-repeat left top;
    background-size: 18px 18px;
  }
}
</style>
