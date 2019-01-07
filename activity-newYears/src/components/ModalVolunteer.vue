<template>
  <div class="volunteer">
    <div class="volunteer-title">详情介绍</div>
    <div class="volunteer-content">
      <div class="volunteer-content__item">可选地区分布于东南亚、欧洲、拉美、非洲等</div>
      <div class="volunteer-content__item">与来自全球各地志愿者组成国际化团队</div>
      <div class="volunteer-content__item">公益项目献力17个联合国可持续发展目标</div>
      <div class="volunteer-content__item">获得官方志愿者证书，提升背景</div>
    </div>
    <div class="volunteer-title">使用须知</div>
    <div class="volunteer-rules">
      <div class="volunteer-rules__item">1、海外志愿者地点，根据具体项目确定；</div>
      <div class="volunteer-rules__item">2、时间：2019年暑假期间；</div>
    </div>
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
.volunteer {
  width: 290px;
  margin: 0 auto;
  padding: 153px 15px 49px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/volunteer-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .volunteer-title {
    width: 70px;
    height: 20px;
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(-160deg, #44E5FF, #3BA2FB);
    border-radius: 16px;
  }

  .volunteer-content {
    margin-bottom: 20px;
  }

  .volunteer-content__item {
    padding-left: 14px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left 2px center;
    background-size: 9px 12px;
  }

  .volunteer-rules__item {
    padding-left: 5px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
  }
}
</style>
