<template>
  <div class="news">
    <div class="news-icon" v-if="showNews">
      <img
        class="news-icon__item"
        v-for="item in helpers"
        :key="item.nickName"
        :src="item.avatarUrls"
      >
    </div>
    <div class="news-barrage" v-if="showNews">
      <div
        class="news-barrage__item"
        v-for="(item, index) in helpers"
        :key="item.nickName"
      >
        <img class="news-barrage__item-icon" :src="item.avatarUrls">
        <div class="news-barrage__item-name">
          <div>{{item.nickName}}</div>
          <div>{{item.time}}助愿</div>
        </div>
        <div class="news-barrage__item-text">{{comments[index]}}</div>
      </div>
    </div>
    <div class="news-empty" v-if="!showNews && helpers.length !== 0" @click="goToAuth">
      <img class="news-empty__icon" src="../assets/images/news-empty.png">
      <div class="news-empty__text">请登录后查看最新动态</div>
    </div>
    <div class="news-empty" v-if="!showNews && helpers.length === 0">
      <img class="news-empty__icon" src="../assets/images/news-empty.png">
      <div class="news-empty__text">暂无动态</div>
    </div>
    <div class="news__bg"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      comments: [
        '已pick，我看好你哦',
        '愿小可爱C位出道领大奖',
        '帮你喽，我真skr小天使',
        '助愿了，小可爱冲鸭',
        '一起为学校荣誉而战！'
      ]
    }
  },
  computed: {
    isBegin () {
      return this.$store.state.isBegin
    },
    showNews () {
      return this.$store.state.showNews
    },
    helpers () {
      return this.$store.state.helpers
    }
  },
  methods: {
    goToAuth () {
      if (!this.isBegin) {
        wx.showToast({
          title: '活动未开始',
          icon: 'none'
        })
        return false
      }
      if (wx.getStorageSync('ifGetPhone')) {
        return false
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.news {
  position: relative;
  backface-visibility: hidden;
  perspective: 1000;
  width: 100%;
  padding-top: 36px;
  z-index: 2;
  overflow: hidden;

  .news-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    width: 335px;
    justify-content: space-around;
  }

  .news-icon__item {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 5px solid #fff;
    border-radius: 50%;
  }

  .news-barrage {
    position: relative;
  }

  .news-empty {
    position: absolute;
    width: 120px;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);

    .news-empty__icon {
      display: block;
      width: 96px;
      height: 74px;
      margin: 0 auto 5px;
    }

    .news-empty__text {
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }

  .news__bg {
    width: 357px;
    height: 317px;
    margin: 0 auto;
    background-color: #fff;
    background: url("https://img.myoffer.cn/wxxcx/20190101/news-bg.png") no-repeat left top;
    background-size: contain;
  }
}

.news-barrage__item {
  position: relative;
  width: 208px;
  height: 58px;
}

.news-barrage__item-icon {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: -22px;
  width: 58px;
  height: 58px;
  border: 4px solid #fff;
  border-radius: 50%;
}

.news-barrage__item-name {
  display: flex;
  height: 22px;
  padding-left: 44px;
  font-size: 12px;
  line-height: 22px;
  color: #fff;
  justify-content: space-between;
}

.news-barrage__item-text {
  width: 208px;
  height: 36px;
  font-size: 12px;
  line-height: 36px;
  color: #333;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
}

.news-barrage__item {
  position: absolute;
  transform: translate3d(-230px, 0, 0);
}

.news-barrage__item:nth-child(1) {
  top: 42px;
  left: 0;
  animation: move 6s linear infinite;
}

.news-barrage__item:nth-child(2) {
  top: 110px;
  left: 0;
  animation: move 6s 2.5s linear infinite;
}

.news-barrage__item:nth-child(3) {
  top: 190px;
  left: 0;
  animation: move 6s 1.5s linear infinite;
}

.news-barrage__item:nth-child(4) {
  top: 42px;
  left: 0;
  animation: move 6s 3.5s linear infinite;
}

.news-barrage__item:nth-child(5) {
  top: 190px;
  left: 0;
  animation: move 6s 4.5s linear infinite;
}

@keyframes move {
  0% {
    opacity: 0.6;
    transform: translate3d(390px, 0, 0)
  }
  25%{
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  75%{
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
    transform: translate3d(-230px, 0, 0)
  }
}
</style>
