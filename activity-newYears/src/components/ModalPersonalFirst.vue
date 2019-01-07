<template>
  <div class="personal" v-if="showModal">
    <div class="personal-avatar">
      <div class="personal-avatar__crown"></div>
      <img class="personal-avatar__icon" :src="avatarUrl">
      <div class="personal-avatar__star"></div>
      <div class="personal-avatar__blue">许愿冠军</div>
    </div>
    <div class="personal-name">恭喜用户{{nickName}}</div>
    <img class="personal-wish" src="../assets/images/mask-wish.png">
    <div class="personal-content">
      <div class="personal-content__text">价值￥5000 GIT国际金融实战训练营；</div>
      <div class="personal-content__text">价值￥2000海外志愿者；</div>
      <div class="personal-content__text">价值￥4998myOffer留学全套服务5折优惠；</div>
      <div class="personal-content__text">5G干货礼包【留学雅思资料+英澳新吃喝住行指南】</div>
    </div>
    <div class="personal-info">*即日起，我们的小助手会在48小时内联系你，请注意保持手机联系畅通谢谢！</div>
    <div class="personal-operate">
      <div class="personal-operate__btn" @click="detail">查看详情</div>
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
      return {
      }
    },
    methods: {
      detail () {
        this.$emit('closeAllModal')
        this.$store.dispatch('setRank', 'personal')
        wx.navigateTo({
          url: '/pages/rank/main'
        })
      }
    }
  }
</script>
<style lang="less">
.personal {
  width: 303px;
  margin: 0 auto;
  padding: 93px 28px 26px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/personal-first-bg.png") no-repeat left top;
  background-size: 100% 100%;

  .personal-avatar {
    position: relative;
    width: 241px;
    height: 128px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-shine.png") no-repeat left bottom;
    background-size: 100% 43px;

    .personal-avatar__crown {
      position: absolute;
      top: -14px;
      left: 142px;
      width: 39px;
      height: 39px;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-crown.png") no-repeat left top;
      background-size: 100% 100%;
    }

    .personal-avatar__icon {
      display: block;
      width: 98px;
      height: 98px;
      margin: 0 auto;
      border-radius: 50%;
    }

    .personal-avatar__star {
      position: absolute;
      top: 66px;
      left: 97px;
      width: 50px;
      height: 32px;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-star.png") no-repeat left top;
      background-size: 100% 100%;
      z-index: 99;
    }

    .personal-avatar__blue {
      position: absolute;
      top: 88px;
      left: 70px;
      width: 102px;
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

  .personal-name {
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 16px;
    color: #333;
    text-align: center;
  }

  .personal-wish {
    display: block;
    width: 207px;
    height: 34px;
    margin: 0 auto;
  }

  .personal-content {
    margin-top: 10px;
    margin-bottom: 13px;
  }

  .personal-content__text {
    padding-left: 14px;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 17px;
    color: #333;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-arrow.png") no-repeat left top 2px;
    background-size: 9px 12px;
  }

  .personal-info {
    margin-bottom: 35px;
    font-size: 11px;
    line-height: 18px;
    color: #696969;
  }

  .personal-operate {
    display: flex;
    justify-content: space-between;

    .personal-operate__btn {
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
