<template>
  <div class="git">
    <div class="git-title">详情介绍</div>
    <div class="git-text">
      <div class="git-text__item">全球经济形势、金融行业知识全方位探究分析</div>
      <div class="git-text__item">职业规划辅导，行业大咖经验分享</div>
      <div class="git-text__item">高含金量证书：名企实习证明&高管推荐信</div>
      <div class="git-text__item">金融实战投资训练：职场软、硬实力全面提升</div>
      <div class="git-text__item">实地考察，社会实践个人背景加分</div>
    </div>
    <div class="git-title">使用须知</div>
    <div class="git-rules">
      <div class="git-rules__item">1、训练营举办地点：上海（学生需自费住宿及来回路费）；</div>
      <div class="git-rules__item">2、训练营时长：7天；</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      closeAllModal () {
        this.$emit('closeAllModal')
      }
    }
  }
</script>
<style lang="less" scoped>
.git {
  width: 290px;
  height: 428px;
  padding: 158px 15px 0;
  margin: 0 auto;
  background: url("https://img.myoffer.cn/wxxcx/20190101/git-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .git-title {
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

  .git-text {
    margin-bottom: 20px;
  }

  .git-text__item {
    padding-left: 14px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left 2px center;
    background-size: 9px 12px;
  }

  .git-rules__item {
    padding-left: 5px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #333;
  }
}
</style>
