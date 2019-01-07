<template>
  <div class="student">
    <div class="student-title">详情介绍</div>
    <div class="student-content">
      <div class="student-content__item">金牌导师咨询</div>
      <div class="student-content__item">匹配院校/专业</div>
      <div class="student-content__item">名校高端文书撰写</div>
      <div class="student-content__item">签证服务</div>
    </div>
    <div class="student-title">使用须知</div>
    <div class="student-rules">
      <div class="student-rules__item">1、本优惠不适用于myOffer留学DIY、签证类、院校/专业加申请产品；</div>
      <div class="student-rules__item">2、本优惠使用详情，届时请咨询专业导师；</div>
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
.student {
  width: 290px;
  margin: 0 auto;
  padding: 150px 15px 49px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/student-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .student-title {
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

  .student-content {
    margin-bottom: 20px;
  }

  .student-content__item {
    padding-left: 14px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left 2px center;
    background-size: 9px 12px;
  }

  .student-rules__item {
    padding-left: 5px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
  }
}
</style>
