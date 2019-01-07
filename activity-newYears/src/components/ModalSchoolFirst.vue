<template>
  <div class="school" v-if="showModal">
    <div class="school-avatar">
      <div class="school-avatar__crown"></div>
      <img class="school-avatar__icon" :src="avatarUrl">
      <div class="school-avatar__star"></div>
      <div class="school-avatar__blue">院校许愿池第一名</div>
    </div>
    <div class="school-name">恭喜用户{{nickName}}</div>
    <img class="school-wish" src="../assets/images/mask-wish.png">
    <div class="school-content">
      <div class="school-content__text">院校形象在myOffer App开屏页为期一个月宣传展示；</div>
      <div class="school-content__text">全体学生凭学生证在myOffer处办理出国留学业务，均可享受8折优惠；</div>
      <div class="school-content__text">5G干货礼包【留学雅思资料+英澳新吃喝住行指南】；</div>
    </div>
    <div class="school-info">*优惠使用详情，届时请咨询我们的专业顾问</div>
    <div class="school-info">*更多详情请添加小助手微信【myoffer_cn】，并回复关键词【干货礼包】领取你的5G干货礼包，还能获知myOffer最新动态哦！</div>
    <div class="school-operate">
      <div class="school-operate__btn" @click="detail">查看详情</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['showModal'],
    computed: {
      nickName () {
        return this.$store.state.selfInRank.nickName
      },
      avatarUrl () {
        return this.$store.state.selfInRank.avatarUrls
      }
    },
    data () {
      return {}
    },
    methods: {
      detail () {
        this.$emit('closeAllModal')
        this.$store.dispatch('setRank', 'school')
        this.$store.dispatch('fetchRankSchool', {start: 0, end: 5, rankType: 'total'})
        wx.navigateTo({
          url: '/pages/rank/main'
        })
      }
    }
  }
</script>
<style lang="less">
.school {
  width: 303px;
  margin: 0 auto;
  padding: 93px 28px 26px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/school-first-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .school-avatar {
    position: relative;
    width: 241px;
    height: 128px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-shine.png") no-repeat left bottom;
    background-size: 100% 43px;

    .school-avatar__crown {
      position: absolute;
      top: -14px;
      left: 142px;
      width: 39px;
      height: 39px;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-crown.png") no-repeat left top;
      background-size: 100% 100%;
    }

    .school-avatar__icon {
      display: block;
      width: 98px;
      height: 98px;
      margin: 0 auto;
      border-radius: 50%;
    }

    .school-avatar__star {
      position: absolute;
      top: 66px;
      left: 97px;
      width: 50px;
      height: 32px;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-star.png") no-repeat left top;
      background-size: 100% 100%;
      z-index: 99;
    }

    .school-avatar__blue {
      position: absolute;
      top: 88px;
      left: 40px;
      width: 166px;
      height: 28px;
      font-size: 14px;
      font-weight: bold;
      line-height: 25px;
      text-align: center;
      color: #fff;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-blue.png") no-repeat left top;
      background-size: 100% 100%;
      z-index: 98;
    }
  }

  .school-name {
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 16px;
    color: #333;
    text-align: center;
  }

  .school-wish {
    display: block;
    width: 207px;
    height: 34px;
    margin: 0 auto;
  }

  .school-content {
    margin-top: 10px;
    margin-bottom: 13px;
  }

  .school-content__text {
    padding-left: 14px;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 17px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left top 2px;
    background-size: 9px 12px;
  }

  .school-info {
    margin-bottom: 8px;
    font-size: 11px;
    line-height: 18px;
    color: #696969;
  }

  .school-operate {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;

    .school-operate__btn {
      width: 120px;
      height: 42px;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 600;
      line-height: 42px;
      color: #fff;
      text-align: center;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-btn.png") no-repeat left top;
      background-size: 100% 100%;
    }
  }
}
</style>
