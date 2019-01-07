<template>
  <scroll-view class="ranks" :class="{'visible': maskFlag}" scroll-y="true">
    <div class="ranks-title">聚力排行榜</div>
    <div class="ranks-share">
      <div class="ranks-share__info" v-if="rank === 'school'">
        本校所有参与许愿同学获得的助愿总票数排名；为学校荣誉而战，许愿榜Top1院校可在myOffer App开屏页展示一个月；同时许愿榜Top3院校的全校学生均可享myOffer留学服务8折优惠！
      </div>
      <div class="ranks-share__info personal" v-else>
        个人获得的助愿总票数排名；攻占Top5，喜提【金融实战训练营/海外留学/海外志愿者】名额！今天又离愿望成真更近一步啦！
      </div>
      <button class="ranks-share__btn" @click="share"></button>
    </div>
    <Rank
      :showDetail="false"
      :showMore="true"
      :showAll="true"
      ref="rank"
    />
    <div class="mask" v-if="maskFlag">
      <div class="mask-center">
        <ModalPaper v-if="showPaper" :shareWho="shareWho" @closeAllModal="closeAllModal" />
      </div>
    </div>
  </scroll-view>
</template>

<script>
import Rank from '@/components/Rank'
import ModalPaper from '@/components/ModalPaper'
const app = getApp()
export default {
  components: {
    Rank,
    ModalPaper
  },
  computed: {
    rank () {
      return this.$store.state.rank
    }
  },
  data () {
    return {
      maskFlag: false,
      showPaper: false,
      timerP: null,
      timerS: null,
      who: false,
      shareWho: 'personal'
    }
  },
  methods: {
    share () {
      if (wx.getStorageSync('ifGetPhone')) {
        this.shareWho = this.rank
        if (this.rank === 'personal') {
          app.aldstat.sendEvent('个人榜单分享海报次数')
        } else {
          app.aldstat.sendEvent('院校榜单分享海报次数')
        }
        wx.showLoading({title: '图片生成中...'})
        this.maskFlag = true
        this.showPaper = true
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main'
        })
      }
    },
    closeAllModal () {
      this.maskFlag = false
      this.showPaper = false
    }
  },
  onLoad (e) {
  },
  onShow () {
    this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: 'total'})
    this.timerS = setTimeout(() => {
      this.$store.dispatch('fetchRankSchool', {start: 0, end: 5, rankType: 'total'})
    }, 300)
  },
  onHide () {
    clearInterval(this.timerP)
    this.timerP = null
  },
  onShareAppMessage () {
    return {
      title: '我需要你们的帮助，快来一起参与吧~',
      path: '/pages/start/main?id=' + wx.getStorageSync('sponsor'),
      imageUrl: 'https://img.myoffer.cn/wxxcx/20190101/share-bg.png'
    }
  },
  onReachBottom () {
    clearInterval(this.timerP)
    this.timerP = null
    this.$refs.rank.loadMore()
  }
}
</script>

<style scoped lang="less">
.ranks {
  background-color: #52ceff;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    overflow: auto;

    .mask-center {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .mask-close {
      display: block;
      width: 30px;
      height: 30px;
      margin: 25px auto 0;
      background: url("https://img.myoffer.cn/wxxcx/20190101/mask-close.png") no-repeat left top;
      background-size: 100%;
    }
  }
}

.visible {
  height: 100vh;
}

.ranks-title {
  position: relative;
  width: 266px;
  height: 36px;
  margin: 20px auto 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 36px;
  text-align: center;
  color: #fff;
}

.ranks-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 54px;
  height: 36px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/title-arrow.png") no-repeat left center;
  background-size: cover;
}

.ranks-title::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 54px;
  height: 36px;
  transform: rotate(180deg);
  background: url("https://img.myoffer.cn/wxxcx/20190101/title-arrow.png") no-repeat left center;
  background-size: cover;
}

.ranks-share {
  position: relative;
  width: 357px;
  height: 165px;
  margin: 0 auto 20px;
  padding-top: 22px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/rank-share.png") no-repeat left top;
  background-size: 100% 100%;
}

.ranks-share__info {
  width: 290px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #00a7eb;
}

.ranks-share__info.personal {
  padding-top: 20px;
}

.ranks-share__btn {
  position: absolute;
  bottom: -8px;
  left: 50%;
  width: 250px;
  height: 54px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/btn-share.png") no-repeat left top;
  background-size: cover;
  transform: translateX(-50%);
}
</style>
