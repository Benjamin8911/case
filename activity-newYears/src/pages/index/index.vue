<template>
  <scroll-view class="home" :class="{ visible: maskFlag}" scroll-y="true">
    <div class="home-sign">
      <div
        v-show="!isHelper"
        class="home-sign__everyday" @click="signRule"
      >
        每日签到<span class="home-sign__everyday--icon">?</span>
      </div>
      <button class="home-sign__rule" @click="goToRules">活动规则</button>
      <button class="home-sign__award" @click="goToAward">奖品介绍</button>
      <ul
        class="home-sign__step"
        v-if="!isHelper" @click="clockIn"
      >
        <li
          class="home-sign__step--item"
          :class="{'active': item.value !== 'notClockIn', 'today': today === item.key && isBegin, 'nosign': isBegin && item.value === 'notClockIn' && today === item.key}"
          v-for="(item, index) in clockStatus"
          :key="item.key"
        >+{{index + 1}}</li>
      </ul>
      <div class="home-sign__operate" :class="{help: isHelper}">
        <!-- 为好友助愿 -->
        <form @submit="wishHelper" report-submit="true"><button v-if="isHelper" class="home-sign__help" form-type="submit"></button></form>
        <!-- 许愿 -->
        <button v-if="!ifGetSchool" class="home-sign__wish" @click="wishSponsor"></button>
        <button v-if="ifGetSchool&&!isHelper" class="home-sign__wish sponsor" open-type="share"></button>
        <button v-if="ifGetSchool&&isHelper" class="home-sign__wish sponsor-new" open-type="share"></button>
        <div class="home-sign__paper" @click="makePaper('main')">{{isHelper ? '生成ta的专属海报' : '生成你的专属海报'}}</div>
      </div>
    </div>
    <div class="home-rank">
      <Rank
        :showDetail="true"
        :showMore="false"
        :showAll="false"
        @showChoose="showModalChoose"
      />
    </div>
    <div class="home-title--news" v-if="!isHelper">最新动态</div>
    <div class="home-news" v-if="!isHelper">
      <News />
      <div class="home-news__border"></div>
    </div>
    <Personal
      @showModalGit="showModalGit"
      @showModalVolunteer="showModalVolunteer"
      @showModalAbroad="showModalAbroad"
    />
    <School
      @showModalStudent="showModalStudent"
    />
    <Sun
      @showModalSun="showModalSun"
    />
    <Info />
    <div class="toast-sign" v-show="toastFlag">
      <div class="toast-sign__text">恭喜小可爱签到打卡成功！<br>明天请继续加油签到~</div>
    </div>
    <div class="mask" v-show="maskFlag">
      <ModalChoose v-if="showChoose" @closeAllModal="closeAllModal" />
      <div class="mask-center">
        <ModalGit v-if="showGit" @closeAllModal="closeAllModal" />
        <ModalVolunteer v-if="showVolunteer" />
        <ModalAbroad v-if="showAbroad" />
        <ModalStudent v-if="showStudent" />
        <ModalSun
          @closeAllModal="closeAllModal"
          v-if="showSun" />
        <ModalSign v-if="showSign" />
        <ModalHelp v-if="showHelp" @showAward="showAward" />
        <ModalPersonalFirst :showModal="showPersonalFirst" @closeAllModal="closeAllModal" />
        <ModalPersonalSecond :showModal="showPersonalSecond" @closeAllModal="closeAllModal" />
        <ModalPersonalThird :showModal="showPersonalThird" @closeAllModal="closeAllModal" />
        <ModalPersonal :showModal="showPersonal" @closeAllModal="closeAllModal" />
        <ModalSchoolFirst :showModal="showSchoolFirst" @closeAllModal="closeAllModal" />
        <ModalSchoolSecond :showModal="showSchoolSecond" @closeAllModal="closeAllModal" />
        <ModalSchoolThird :showModal="showSchoolThird" @closeAllModal="closeAllModal" />
        <ModalPaper v-if="showPaper" :shareWho="paperWho" @closeAllModal="closeAllModal" />
        <button v-if="!showChoose&&!showPaper" class="mask-close" @click="closeAllModal"></button>
      </div>
    </div>
  </scroll-view>
</template>

<script>
import api from '@/assets/js/api.js'
import Rank from '@/components/Rank'
import News from '@/components/News'
import Personal from '@/components/Personal'
import School from '@/components/School'
import Sun from '@/components/Sun'
import Info from '@/components/Info'
import ModalGit from '@/components/ModalGit'
import ModalVolunteer from '@/components/ModalVolunteer'
import ModalAbroad from '@/components/ModalAbroad'
import ModalStudent from '@/components/ModalStudent'
import ModalSun from '@/components/ModalSun'
import ModalSign from '@/components/ModalSign'
import ModalHelp from '@/components/ModalHelp'
import ModalPersonalFirst from '@/components/ModalPersonalFirst'
import ModalPersonalSecond from '@/components/ModalPersonalSecond'
import ModalPersonalThird from '@/components/ModalPersonalThird'
import ModalPersonal from '@/components/ModalPersonal'
import ModalSchoolFirst from '@/components/ModalSchoolFirst'
import ModalSchoolSecond from '@/components/ModalSchoolSecond'
import ModalSchoolThird from '@/components/ModalSchoolThird'
import ModalChoose from '@/components/ModalChoose'
import ModalPaper from '@/components/ModalPaper'
const app = getApp()
export default {
  components: {
    Rank,
    News,
    Personal,
    School,
    Sun,
    Info,
    ModalGit,
    ModalVolunteer,
    ModalAbroad,
    ModalStudent,
    ModalSun,
    ModalSign,
    ModalHelp,
    ModalPersonalFirst,
    ModalPersonalSecond,
    ModalPersonalThird,
    ModalPersonal,
    ModalSchoolFirst,
    ModalSchoolSecond,
    ModalSchoolThird,
    ModalChoose,
    ModalPaper
  },
  computed: {
    isBegin () {
      return this.$store.state.isBegin
    },
    today () {
      return this.$store.state.today
    },
    isHelper () {
      return this.$store.state.isHelper
    },
    ifGetSchool () {
      return this.$store.state.ifGetSchool
    },
    rankPersonal () {
      return this.$store.state.selfInRank.rank
    },
    rankSchool () {
      return this.$store.state.selfSchoolRank.rank
    }
  },
  data () {
    return {
      paperWho: 'main',
      timerP: null,
      timerS: null,
      timerT: null,
      timerA: null,
      ifHelper: false,
      maskFlag: false,
      toastFlag: false,
      moveFlag: false,
      showGit: false,
      showVolunteer: false,
      showAbroad: false,
      showStudent: false,
      showSun: false,
      showSign: false,
      showHelp: false,
      showPersonalFirst: false,
      showPersonalSecond: false,
      showPersonalThird: false,
      showPersonal: false,
      showSchoolFirst: false,
      showSchoolSecond: false,
      showSchoolThird: false,
      showChoose: false,
      showPaper: false,
      clockStatus: [
        {
          key: '',
          value: 'notClockIn'
        },
        {
          key: '',
          value: 'notClockIn'
        },
        {
          key: '',
          value: 'notClockIn'
        },
        {
          key: '',
          value: 'notClockIn'
        },
        {
          key: '',
          value: 'notClockIn'
        },
        {
          key: '',
          value: 'notClockIn'
        }
      ]
    }
  },
  onLoad (e) {
    if (e.id !== undefined) {
      if (e.id === wx.getStorageSync('userId')) {
        this.$store.dispatch('setRoleHelper', false)
        wx.setStorageSync('sponsor', e.id)
      } else {
        this.$store.dispatch('setRoleHelper', true)
      }
    } else {
      this.$store.dispatch('setRoleHelper', false)
      wx.setStorageSync('sponsor', wx.getStorageSync('userId'))
    }
  },
  onShow () {
    this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: ''})
    this.timerS = setTimeout(() => {
      this.$store.dispatch('fetchRankSchool', {start: 0, end: 5, rankType: ''})
    }, 300)
    this.timerP = setInterval(() => {
      this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: ''})
    }, 10000)
    this.$store.dispatch('setRank', 'personal')
    if (wx.getStorageSync('ifGetPhone')) {
      this.fetchClockStatus()
      this.fetchSchoolStatus()
      if (this.isBegin) {
        this.$store.dispatch('fetchHelpers')
        this.timerA = setInterval(() => {
          this.$store.dispatch('fetchHelpers')
        }, 10000)
      } else {
        clearInterval(this.timerP)
        this.timerP = null
      }
      setTimeout(() => {
        this.checkPrize()
      }, 600)
    }
  },
  onHide () {
    clearInterval(this.timerP)
    clearTimeout(this.timerS)
    clearInterval(this.timerA)
    this.timerP = null
    this.timerS = null
    this.timerA = null
  },
  onShareAppMessage () {
    if (this.isHelper) {
      app.aldstat.sendEvent('助力者成发起者次数')
    } else {
      app.aldstat.sendEvent('发起者聚力次数')
    }
    if (!this.showPaper) {
      this.$store.dispatch('setRoleHelper', false)
      wx.setStorageSync('sponsor', wx.getStorageSync('userId'))
    }
    this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: ''})
    this.$store.dispatch('fetchHelpers')
    return {
      title: '我需要你们的帮助，快来一起参与吧~',
      path: '/pages/start/main?id=' + wx.getStorageSync('sponsor'),
      imageUrl: 'https://img.myoffer.cn/wxxcx/20190101/share-bg.png'
    }
  },
  methods: {
    signRule () {
      this.closeAllModal()
      this.maskFlag = true
      this.showSign = true
    },
    goToRules () {
      wx.navigateTo({
        url: '/pages/rules/main'
      })
    },
    goToAward () {
      wx.navigateTo({
        url: '/pages/award/main'
      })
    },
    wishSponsor () {
      if (!this.isBegin) {
        wx.showToast({
          title: '活动暂未开始',
          icon: 'none'
        })
        return false
      }
      if (wx.getStorageSync('ifGetPhone')) {
        if (!this.ifGetSchool) {
          wx.setStorageSync('sponsor', wx.getStorageSync('userId'))
          this.$store.dispatch('setRoleHelper', false)
          this.maskFlag = true
          this.showChoose = true
          this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: ''})
        }
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main?role=sponsor'
        })
      }
    },
    wishHelper (e) {
      if (wx.getStorageSync('ifGetPhone')) {
        api.helper({
          formId: e.target.formId,
          sponsor: wx.getStorageSync('sponsor'),
          apikey: wx.getStorageSync('apikey')
        }).then(res => {
          if (res.code === 0) {
            app.aldstat.sendEvent('助力者聚力次数')
            this.maskFlag = true
            this.showHelp = true
          } else {
            if (res.code === 11030) {
              wx.setStorageSync('ifGetPhone', false)
              wx.navigateTo({
                url: '/pages/authorization/main'
              })
            }
            if (res.code === 1) {
              if (res.msg === 'Internal Server Error') {
                wx.showToast({
                  title: '请稍后再试',
                  icon: 'none'
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            }
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main?role=helper'
        })
      }
    },
    clockIn () {
      if (!this.isBegin) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none'
        })
        return false
      }
      const jumpFlag = wx.getStorageSync('ifGetPhone')
      if (jumpFlag) {
        if (this.ifGetSchool) {
          api.clockIn({
            apikey: wx.getStorageSync('apikey')
          }).then(res => {
            if (res.code === 11030) {
              wx.setStorageSync('ifGetPhone', false)
              wx.navigateTo({
                url: '/pages/authorization/main'
              })
            } else {
              if (res.code === 0) {
                this.fetchClockStatus()
                this.toastFlag = true
                this.timerT = setTimeout(() => {
                  this.toastFlag = false
                }, 2000)
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            }
          })
        } else {
          this.maskFlag = true
          this.showChoose = true
        }
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main'
        })
      }
    },
    makePaper (s) {
      if (!this.isBegin) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none'
        })
        return false
      }
      this.paperWho = s
      if (this.isHelper) {
        app.aldstat.sendEvent('助力者分享海报次数')
      } else {
        app.aldstat.sendEvent('发起者分享海报次数')
      }
      if (wx.getStorageSync('ifGetPhone')) {
        this.maskFlag = true
        this.showPaper = true
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main'
        })
      }
    },
    showAward () {
      this.showHelp = false
      this.maskFlag = true
      this.showSun = true
    },
    closeAllModal () {
      this.maskFlag = false
      this.showGit = false
      this.showVolunteer = false
      this.showAbroad = false
      this.showStudent = false
      this.showSun = false
      this.showSign = false
      this.showHelp = false
      this.showPersonalFirst = false
      this.showPersonalSecond = false
      this.showPersonalThird = false
      this.showPersonal = false
      this.showSchoolFirst = false
      this.showSchoolSecond = false
      this.showSchoolThird = false
      this.showChoose = false
      this.showPaper = false
    },
    showModalGit () {
      this.closeAllModal()
      this.maskFlag = true
      this.showGit = true
    },
    showModalVolunteer () {
      this.closeAllModal()
      this.maskFlag = true
      this.showVolunteer = true
    },
    showModalAbroad () {
      this.closeAllModal()
      this.maskFlag = true
      this.showAbroad = true
    },
    showModalStudent () {
      this.closeAllModal()
      this.maskFlag = true
      this.showStudent = true
    },
    showModalSun () {
      this.closeAllModal()
      this.maskFlag = true
      this.showSun = true
    },
    showModalChoose () {
      this.maskFlag = true
      this.showChoose = true
    },
    async checkPrize () {
      if (this.$store.state.serverTime > 1546790400000) {
        await this.$store.dispatch('setBegin', false)
        if (this.isHelper === false) {
          const personalPromise = await api.rankPersonal({
            rankType: 'total',
            sponsor: wx.getStorageSync('sponsor'),
            start: 0,
            end: 5
          })
          const schoolPromise = await api.rankSchool({
            rankType: 'total',
            sponsor: wx.getStorageSync('sponsor'),
            start: 0,
            end: 2
          })
          Promise.all([personalPromise, schoolPromise]).then(([personal, school]) => {
            const rankP = personal.result.selfInRank[0].rank
            const rankS = school.result.selfSchoolRank[0].rank
            if (rankP < 6) {
              if (rankP === 1) {
                this.showPersonalFirst = true
              }
              if (rankP === 2) {
                this.showPersonalSecond = true
              }
              if (rankP === 3) {
                this.showPersonalThird = true
              }
              if (rankP > 3) {
                this.showPersonal = true
              }
              this.maskFlag = true
            } else {
              if (rankS === 1) {
                this.showSchoolFirst = true
                this.maskFlag = true
              }
              if (rankS === 2) {
                this.showSchoolSecond = true
                this.maskFlag = true
              }
              if (rankS === 3) {
                this.showSchoolThird = true
                this.maskFlag = true
              }
            }
          })
        }
      }
    },
    fetchClockStatus () {
      api.clockStatus({
        apikey: wx.getStorageSync('apikey')
      }).then(res => {
        if (res.code === 11030) {
          wx.setStorageSync('ifGetPhone', false)
          wx.navigateTo({
            url: '/pages/authorization/main'
          })
        }
        if (res.code === 0) {
          this.clockStatus = res.result
        }
        if (res.code === 1) {
          this.clockStatus = [
            {
              key: '',
              value: 'notClockIn'
            },
            {
              key: '',
              value: 'notClockIn'
            },
            {
              key: '',
              value: 'notClockIn'
            },
            {
              key: '',
              value: 'notClockIn'
            },
            {
              key: '',
              value: 'notClockIn'
            },
            {
              key: '',
              value: 'notClockIn'
            }
          ]
        }
      })
    },
    fetchSchoolStatus () {
      api.schoolStatus({
        apikey: wx.getStorageSync('apikey')
      }).then(res => {
        if (res.code === 11030) {
          wx.setStorageSync('ifGetPhone', false)
          wx.navigateTo({
            url: '/pages/authorization/main'
          })
        }
        if (res.code === 0) {
          this.$store.dispatch('setSchool', res.result)
        }
        if (res.code === 1) {
          this.$store.dispatch('setSchool', true)
        }
      })
    }
  }
}
</script>

<style lang="less">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
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

.toast-sign {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 203px;
  height: 50px;
  padding-top: 7px;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  z-index: 999;
  transform: translate(-50%, -50%);

  .toast-sign__text {
    font-size: 13px;
  }
}

.visible {
  overflow: hidden;
}

.home {
  width: 100%;
  height: 100vh;
  background-color: #52ceff;
  overflow: auto;
}

.home-sign {
  position: relative;
  height: 501px;
  padding-top: 343px;
  margin-bottom: 18px;
  background: url("https://img.myoffer.cn/wxxcx/20190101/sign-head_new.jpg") no-repeat left top;
  background-size: 100% 100%;

  .home-sign__everyday {
    position: absolute;
    top: 312px;
    left: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }

  .home-sign__everyday--icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 7px;
    line-height: 20px;
    text-align: center;
    background-image: linear-gradient(0deg, #F13996 20%, #FF75A8 100%);
    background-size: cover;
    border-radius: 50%;
    vertical-align: top;
  }

  .home-sign__rule {
    position: absolute;
    top: 270px;
    right: 20px;
    width: 68px;
    height: 21px;
    font-size: 12px;
    line-height: 21px;
    color: #fff;
    background-image: linear-gradient(0deg, #F13996 20%, #FF75A8 100%);
    border-radius: 23px;
  }

  .home-sign__award {
    position: absolute;
    top: 305px;
    right: 20px;
    width: 68px;
    height: 21px;
    font-size: 12px;
    line-height: 21px;
    color: #fff;
    background-image: linear-gradient(0deg, #F13996 20%, #FF75A8 100%);
    border-radius: 23px;
  }

  .home-sign__step {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 318px;
    margin: 0 auto 48px;

    .home-sign__step--item {
      position: relative;
      width: 36px;
      height: 36px;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      border: 3px solid #fff;
      border-radius: 50%;
      background-image: linear-gradient(-180deg, #a3bcc6 0%, #718991 98%);
      box-shadow: 0 0 1px 1px rgba(165, 180, 189, 0.3);
      z-index: 1;
    }

    .today {
      width: 42px;
      height: 42px;
      line-height: 36px;
      font-size: 14px;
    }

    .nosign::after {
      content: '';
      position: absolute;
      top: 2px;
      right: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-image: linear-gradient(0deg, #f13996 20%, #ff75a8 100%);
    }

    .home-sign__step--item.active {
      background-image: linear-gradient(-180deg, #44e5ff 0%, #3a99fb 100%);
      box-shadow: 0 0 1px 1px rgba(115, 183, 251, 0.27);
    }
  }

  .home-sign__step:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 316px;
    height: 6px;
    background-color: #fff;
    z-index: 0;
    transform: translate(-50%, -50%);
  }

  .home-sign__operate {
    position: absolute;
    left: 20px;
    bottom: 0;
    width: 335px;
    height: 71px;
    padding-top: 42px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
  }

  .home-sign__operate.help {
    height: 133px;
  }

  .home-sign__wish {
    position: absolute;
    bottom: 40px;
    left: 11px;
    width: 313px;
    height: 64px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-wish-new.png") no-repeat left top;
    background-size: cover;
  }

  .home-sign__wish.sponsor {
    position: absolute;
    bottom: 40px;
    left: 11px;
    width: 313px;
    height: 64px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-share-new.png") no-repeat left top;
    background-size: cover;
  }

  .home-sign__wish.sponsor-new {
    position: absolute;
    bottom: 40px;
    left: 11px;
    width: 313px;
    height: 64px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-wish-new.png") no-repeat left top;
    background-size: cover;
  }

  .home-sign__help {
    position: absolute;
    top: -32px;
    left: 11px;
    width: 313px;
    height: 64px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-help.png") no-repeat left top;
    background-size: cover;
  }

  .home-sign__paper {
    position: absolute;
    left: 50%;
    bottom: 15px;
    width: 154px;
    height: 14px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #05cbf9;
    transform: translate(-50%);
  }

  .home-sign__paper::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 12px;
    height: 14px;
    background: url("../../assets/images/paper-arrow.png") no-repeat center center;
    background-size: 12px 11px;
  }

  .home-sign__paper::after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 12px;
    height: 14px;
    transform: rotate(180deg);
    background: url("../../assets/images/paper-arrow.png") no-repeat center center;
    background-size: 12px 11px;
  }
}

.home-title--news {
  position: relative;
  width: 228px;
  height: 26px;
  margin:0 auto;
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
  color: #fff;
  text-align: center;
}

.home-title--news::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 54px;
  height: 26px;
  background: url("../../assets/images/title-arrow.png") no-repeat left center;
  background-size: cover;
}

.home-title--news::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 54px;
  height: 26px;
  transform: rotate(180deg);
  background: url("../../assets/images/title-arrow.png") no-repeat left center;
  background-size: cover;
}

.home-news {
  position: relative;
  backface-visibility: hidden;
  perspective: 1000;
  width: 100%;
  z-index: 1;
  overflow: hidden;

  .home-news__border {
    height: 24px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/home-border-up.png") no-repeat left top;
    background-size: 100% 100%;
    transform: rotate(180deg);
  }
}

@keyframes move {
  0% {
    opacity: 0.5;
    transform: translate3d(390px, 0, 0)
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0.5;
    transform: translate3d(-230px, 0, 0)
  }
}
</style>
