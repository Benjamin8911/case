<template>
  <div class="home-info">
    <div class="home-info__border"></div>
    <div class="home-info__box"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="less" scoped>
.home-info {
  padding-bottom: 57px;
  background-color: #52ceff;

  .home-info__border {
    height: 24px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-border-up.png") no-repeat left top;
    background-size: 100% 100%;
  }

  .home-info__box {
    width: 357px;
    height: 567px;
    margin: 33px auto 0;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-info.png") no-repeat left top;
    background-size: 100% 100%;
  }
}
</style>
