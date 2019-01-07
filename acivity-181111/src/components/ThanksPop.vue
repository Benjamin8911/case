<template>
  <div v-if="popStatus" class="rule-page">
    <div class="rule">
      <p class="font20 text-center title">感谢你的助攻</p>
      <div class="text font13">
        <p>
          留学雅思能量包诚挚奉上
        </p>
        <img src="https://img.myoffer.cn/wxxcx/20181111/pop2/book@2x.png" alt="" mode="widthFix">
      </div>
      <div class="getReward" @click="closePop">立即领取</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['popStatus'],
  methods: {
    closePop () {
      this.$emit('closePop', 'energy')
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
  height: 700rpx;
  margin-top: -350rpx;
  background: #fff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 13px;
  background: url('https://img.myoffer.cn/wxxcx/20181111/pop2/pop@2x.png') no-repeat left top;
  background-size: cover;
}

.rule-page .rule .text {
  padding: 0 8%;
  letter-spacing: 2rpx;
  text-align: center;
}

.rule-page .rule .text p {
  text-align: center;
  margin-bottom: 30rpx;
}

.rule-page .rule .text img {
  width: 292rpx;
}

.title {
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  padding: 65rpx 0 50rpx 0;
}

.getReward {
  width: 224rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 50rpx;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 5rpx;
  background: linear-gradient(to bottom, #F04F93, #F2237B);
  margin: 20rpx  auto;
  margin-top: 70rpx;
}
</style>
