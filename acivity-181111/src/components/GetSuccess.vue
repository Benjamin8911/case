<template>
  <div v-if="popStatus" class="rule-page">
    <div class="rule">
      <p class="font20 text-center title">恭喜领取成功</p>
      <div class="text font13">
        <p>
          <span>添加小助手微信号myoffer4u，核对收货信息，跟进礼品进度，发货时间，快递单号，还有更多第一手福利活动等你参加哦~</span>
        </p>
      </div>
      <div class="getReward"  @click="closePop">复制微信号</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['popStatus'],
  methods: {
    closePop () {
      const self = this
      wx.setClipboardData({
        data: 'myoffer4u',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功'
              })
              self.$emit('closePop', 'get-success')
            }
          })
        }
      })
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
  height: 440rpx;
  margin-top: -220rpx;
  background: #fff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 13px;
  background: url('https://img.myoffer.cn/wxxcx/20181111/pop2/pop@2x.png') no-repeat left top;
  background-size: cover;
}

.rule-page .rule .text {
  padding: 0 6%;
  letter-spacing: 2rpx;
  text-align: center;
}

.rule-page .rule .text p {
  display: flex;
  margin-bottom: 30rpx;
}

.title {
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
  text-align: center;
  line-height: 22px;
  padding: 65rpx 0 50rpx 0;
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
}
</style>
