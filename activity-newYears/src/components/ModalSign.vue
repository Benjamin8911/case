<template>
  <div class="sign">
    <div class="sign-text first">每位许愿者每日可签到一次，票数将累计计入总票数当中；</div>
    <div class="sign-text second">完成签到打卡，均可获得额外票数赠送。第一天+1票，第二天+2票，第三天+3票，以此类推，活动期间完成全部打卡最高可+21票；</div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="less" scoped>
.sign {
  width: 290px;
  padding: 140px 12px 49px;
  margin: 0 auto;
  background: url("https://img.myoffer.cn/wxxcx/20190101/sign-bg.png") no-repeat left top;
  background-size: 100%;

  .sign-text {
    padding-left: 25px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #333;
    line-height: 17px;
  }

  .sign-text.first {
    background: url("https://img.myoffer.cn/wxxcx/20190101/sign-index-1.png") no-repeat left top;
    background-size: 18px 18px;
  }

  .sign-text.second {
    background: url("https://img.myoffer.cn/wxxcx/20190101/sign-index-2.png") no-repeat left top;
    background-size: 18px 18px;
  }
}
</style>
