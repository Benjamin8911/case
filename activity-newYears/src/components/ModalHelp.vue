<template>
  <div class="help">
    <div class="help-text">真是一位给力的小伙伴！好友邀你领取留学元旦礼。</div>
    <div class="help-btn" @click="showAward">查看礼品</div>
  </div>
</template>
<script>
  export default {
    methods: {
      showAward () {
        this.$emit('showAward')
      }
    }
  }
</script>
<style lang="less" scoped>
.help {
  width: 290px;
  padding: 80px 12px 25px;
  margin: 0 auto;
  background: url("https://img.myoffer.cn/wxxcx/20190101/help-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .help-text {
    margin-bottom: 35px;
    font-size: 12px;
    color: #333;
    line-height: 18px;
    text-align: center;
  }

  .help-btn {
    display: block;
    width: 140px;
    height: 48px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 48px;
    color: #fff;
    text-align: center;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-btn.png") no-repeat left top;
    background-size: 100% 100%;
  }
}
</style>
