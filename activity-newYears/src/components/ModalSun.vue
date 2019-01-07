<template>
  <div class="sun">
    <div class="sun-text">请添加小助手微信【myoffer_cn】，回复关键词‘干货礼包’获取你的5G干货礼包</div>
    <div class="sun-btn" @click="copy">复制微信号</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      copy () {
        this.$emit('closeAllModal')
        wx.setClipboardData({
          data: 'myoffer_cn',
          success: () => {
            wx.showToast({
              title: '复制成功！',
              icon: 'none'
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
.sun {
  width: 290px;
  height: 243px;
  margin: 0 auto;
  padding: 99px 17px 25px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/sun-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .sun-text {
    margin-bottom: 35px;
    font-size: 12px;
    color: #333;
    line-height: 18px;
    text-align: center;
  }

  .sun-btn {
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
