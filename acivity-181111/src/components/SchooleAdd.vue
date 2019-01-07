<template>
  <div v-if="popStatus" class="rule-page">
    <div class="rule">
      <div style="height: 396rpx;"></div>
      <span class="type">对位款</span>
      <p class="font20 text-center title">院校加申</p>
      <p class="left-explain">—聚力人数:3人</p>
      <div class="text font13">
        <p>
          <span>梦校你选，院校加申我送，搭配留学全套服务</span>
        </p>
      </div>
      <div class="getReward" @click="closePop">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['popStatus'],
  data () {
    return {
      text: '立即领取'
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop', 'school-add')
    }
  },
  created () {
    if (this.$parent.schoolGetStatus === false) {
      this.text = '了解详情'
    }
    if (this.$parent.schoolGetStatus === true) {
      this.text = '立即领取'
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
  height: 800rpx;
  margin-top: -400rpx;
  background: #fff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 13px;
  background: url('https://img.myoffer.cn/wxxcx/20181111/pop2/schoolAdd .png') no-repeat left top;
  background-size: cover;
}

.type {
  position: absolute;
  right: 40rpx;
  top: 10rpx;
  color: #fff;
  font-size: 11px;
}

.rule-page .rule .text {
  padding: 0 8%;
  letter-spacing: 2rpx;
  text-align: center;
}

.rule-page .rule .text p {
  display: flex;
  margin-bottom: 30rpx;
}

.left-explain {
  text-align: right;
  font-size: 11px;
  padding-right: 8%;
  padding-bottom: 30rpx;
  font-weight: 600;
  background: linear-gradient(to bottom, #69CBF5, #6579F2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title {
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  line-height: 18px;
  padding: 30rpx 0 10rpx 0;
  font-weight: 600;
  background: linear-gradient(to bottom, #69CBF5, #6579F2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.getReward {
  width: 224rpx;
  height: 76rpx;
  line-height: 76rpx;
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
