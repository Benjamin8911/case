<template>
  <div class="rule-page" v-if="showPop">
    <div class="rule">
      <div style="height: 280rpx"></div>
      <p class="font20 text-center title">活动规则</p>
      <div class="text font12">
        <p>
          <b><img src="https://img.myoffer.cn/wxxcx/20181111/pop1/1@2x.png" alt=""></b>
          <span>发起人集齐3人助攻能量可免费获得myOffer®提供的价值400元「院校加申」服务，如继续邀好友助攻，达到8人，则能另获得价值299元「myOffer®独家定制版Dream School围巾」一条。</span>
        </p>
        <p>
          <b><img src="https://img.myoffer.cn/wxxcx/20181111/pop1/2@2x.png" alt=""></b>
          <span>助攻队友可获由myOffer®提供的「留学雅思能量包」，内含雅思真题集+留学规划书+留学院校/专业申请讲座集锦（共40期）+留学文书案例礼包。</span>
        </p>
        <p>
          <b><img src="https://img.myoffer.cn/wxxcx/20181111/pop1/3@2x.png" alt=""></b>
          <span>1人只可发起助攻请求1次，以及1位好友只能助攻1次，也可主动发起助攻请求。</span>
        </p>
        <p>
          <b><img src="https://img.myoffer.cn/wxxcx/20181111/pop1/4@2x.png" alt=""></b>
          <span>活动期间，若因不可抗因素、用户作弊等原因导致异常，myOffer®有权调整；最终解释权归myOffer®所有。</span>
        </p>
      </div>
    <img @click="closePop" class="close" src="https://img.myoffer.cn/wxxcx/20181111/pop1/closePop@2x.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['popStatus'],
  data () {
    return {

    }
  },
  computed: {
    showPop () {
      return this.popStatus
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop', 'rule-pop')
    }
  }
}
</script>

<style scoped>
.rule-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
}

.rule-page .rule {
  position: absolute;
  left: 11%;
  top: 50%;
  width: 78%;
  height: 1020rpx;
  margin-top: -610rpx;
  background: #fff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 13px;
  background: url('https://img.myoffer.cn/wxxcx/20181111/pop1/close@2x.png') no-repeat left top;
  background-size: cover;
}

.rule-page .rule .text {
  padding: 0 4%;
  letter-spacing: 2rpx;
  text-align: left;
}

.rule-page .rule .text p {
  display: flex;
  margin-bottom: 30rpx;
}

.rule-page .rule .text b {
  flex: 0 0 9%;
}

.rule-page .rule .text img {
  width: 36rpx;
  height: 36rpx;
  vertical-align: text-bottom;
}

.rule-page .rule .title {
  padding: 30rpx;
  font-weight: 600;
  letter-spacing: 5rpx;
  background: linear-gradient(to bottom, #BA7BF8, #6671F3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.rule-page .close {
  position: absolute;
  left: 50%;
  bottom: -130rpx;
  z-index: 1000;
  width: 100rpx;
  height: 100rpx;
  margin-left: -50rpx;
}
</style>
