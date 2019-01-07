<template>
  <div class="container">
    <scroll-view scroll-y="true" :style="{height:deviceHeight+'px'}" :scroll-into-view="toView" scroll-with-animation="true" @scroll="scrolls">
    <div class="timer-bar">
      <div class="time-item" :class="{'timer-active':nowTime==='before'}">
        <span class="font10">11.09</span>
        <span class="font12">活动预热</span>
      </div>
      <div class="time-item" :class="{'timer-active':nowTime==='going'}">
        <span class="font10">11.11</span>
        <span class="font12">活动开启</span>
      </div>
      <div class="time-item" :class="{'timer-active':nowTime==='end'}">
        <span class="font10">11.20</span>
        <span class="font12">活动结束</span>
      </div>
    </div>
    <div class="section1">
      <img src="https://img.myoffer.cn/wxxcx/20181111/head-image.png" alt="" mode="widthFix">
      <div class="section1-rule font12" @click="showModel('rule')">活动规则></div>
    </div>
    <div class="calc-time">
      <p class="font13 text-center color333 mb15 font-blod">距结束倒计时</p>
      <div class="show-time">
        <div class="time-img" :class="{'num3': max100}">
          <span class="hour font26">{{ hour }}</span>
        </div>
        <p class="color333 font13 tw">时</p>
        <div class="time-img">
          <span class="hour font26">{{ minute }}</span>
        </div>
        <p class="color333 font13 tw">分</p>
        <div class="time-img">
          <span class="hour font26">{{ second }}</span>
        </div>
        <p class="color333 font13 tw">秒</p>
      </div>
      <div class="paport">
        <div class="time-line">
          <div class="first-reward">
            <img src="https://img.myoffer.cn/wxxcx/20181111/schoollogo@2x.png" mode="widthFix" />
            <span>院校加申</span>
          </div>
          <div class="last-reward">
            <img src="https://img.myoffer.cn/wxxcx/20181111/scraflogo@2x.png" mode="widthFix" />
            <span>定制围巾</span>
          </div>
          <div class="absolute peo1 img-div">
            <img :src="peo1" />
          </div>
          <div class="absolute peo2 img-div">
            <img :src="peo2" />
          </div>
          <div @click="showModel('schoolAdd')" class="absolute peo3 img-div">
            <img :src="peo3" />
          </div>
          <div class="absolute peo4 img-div">
            <img :src="peo4" />
          </div>
          <div class="absolute peo5 img-div">
            <img :src="peo5" />
          </div>
          <div class="absolute peo6 img-div">
            <img :src="peo6" />
          </div>
          <div class="absolute peo7 img-div">
            <img :src="peo7" />
          </div>
          <div @click="showModel('scraf')" class="absolute peo8 img-div">
            <img :src="peo8" />
          </div>
        </div>
        <button class="share-btn" open-type='share'>转发给留学战友 请求助攻</button>
      </div>
    </div>
    <div class="sponsor-page">
      <div class="sponsor-head text-center">
        发起者专享
      </div>
      <div class="gift school">
        <div id="school-add">
          <p class="title">【0元】专享<br/>院校加申</p>
          <p class="price">原价400元</p>
          <div class="go-get" :class="{active:schoolGetStatus}" @click="showModel('getSuccess')">立即领取</div>
          <img src="https://img.myoffer.cn/wxxcx/20181111/yxjs@2x.png" alt="" mode="widthFix" />
        </div>
        <div class="decr">专属myOffer®加申通道，增加院校录取几率 让<br/>出国梦，多一份可能!</div>
        <div class="progress">
          <p class="font12" style="margin-bottom: 3%">服务流程：</p>
          <div class="p-container">
            <div class="item1">
              <img src="https://img.myoffer.cn/wxxcx/20181111/buy@3x.png" alt="" mode="widthFix" />
              <span>购买产品</span>
            </div>
            <div class="sjt"></div>
            <div class="item1">
              <img src="https://img.myoffer.cn/wxxcx/20181111/contactteacher@2x.png" alt="" mode="widthFix" />
              <span>导师联系</span>
            </div>
            <div class="sjt"></div>
            <div class="item1">
              <img src="https://img.myoffer.cn/wxxcx/20181111/applyinfo@2x.png" alt="" mode="widthFix" />
              <span>递交材料</span>
            </div>
            <div class="sjt"></div>
            <div class="item1">
              <img src="https://img.myoffer.cn/wxxcx/20181111/confirru@2x.png" alt="" mode="widthFix" />
              <span>入学确认</span>
            </div>
          </div>
        </div>
      </div>
      <div class="gift school scraf">
        <div id="scraf-add">
          <img class="weijin" src="https://img.myoffer.cn/wxxcx/20181111/best%20custom@2x.png" alt="" mode="widthFix">
          <p class="title">【独家定制】<br/>Dream School 定制围巾</p>
          <p class="price">原价299元</p>
          <div class="go-get" :class="{active:scrafGetStatus}" @click="showModel('getScrafSuccess')">立即领取</div>
          <img src="https://img.myoffer.cn/wxxcx/20181111/weijing.png" alt="" mode="widthFix" />
        </div>
        <div class="decr">你对Dream School百里挑一；我们千挑万选出<br/>好物, 献给追梦的你</div>
        <div class="progress">
          <div class="p-container">
            <div class="item1">
              <div class="img-bg">
                <img src="https://img.myoffer.cn/wxxcx/20181111/buy@3x.png" alt="" mode="widthFix" />
              </div>
              <span>190cm*65cm<br/>高贵蓝与温暖米</span>
            </div>
            <div class="item1">
              <div class="img-bg">
                <img src="https://img.myoffer.cn/wxxcx/20181111/buy@3x.png" alt="" mode="widthFix" />
              </div>
              <span>柔滑轻盈<br/>细腻平整，亲夫百搭</span>
            </div>
            <div class="item1">
              <div class="img-bg">
                <img src="https://img.myoffer.cn/wxxcx/20181111/buy@3x.png" alt="" mode="widthFix" />
              </div>
              <span>梦校logo独特展示</span>
            </div>
            <div class="item1">
              <div class="img-bg">
                <img src="https://img.myoffer.cn/wxxcx/20181111/buy@3x.png" alt="" mode="widthFix" />
              </div>
              <span>刺绣细节独到把握</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sponsor-page helper-page">
      <div class="sponsor-head text-center">
        助力者专享
      </div>
      <div class="gift school scraf zlz">
        <div>
          <p class="title">【暖心回礼】<br/>能量满满留学资料包！</p>
          <div class="go-get" :class="{active:helperGetStatus}" @click="showModel('energy')">立即领取</div>
          <img src="https://img.myoffer.cn/wxxcx/20181111/book@2x.png" alt="" mode="widthFix" />
        </div>
        <div class="progress">
          <div class="p-container">
            <div class="item1">
              <img style="width:92rpx;height:120rpx;" src="https://img.myoffer.cn/wxxcx/20181111/ysztj@2x.png" alt="" mode="widthFix" />
              <span>雅思真题集<br/><span style="font-size:11px">屠鸭攻略，不走弯路</span></span>
            </div>
            <div class="item1">
              <img style="width:114rpx;height:120rpx;" src="https://img.myoffer.cn/wxxcx/20181111/lxjz@2x.png" alt="" mode="widthFix" />
              <span>留学申请讲座集锦<br/><span style="font-size:11px">直面名师,专业指导,提前备战</span></span>
            </div>
            <div class="item1">
              <img style="width:100rpx;height:120rpx;" src="https://img.myoffer.cn/wxxcx/20181111/lxws@2x.png" alt="" mode="widthFix" />
              <span>留学文书案例礼包<br/><span style="font-size:11px">覆盖全科，一招打动招生官</span></span>
            </div>
            <div class="item1">
              <img style="width:86rpx;height:126rpx;" src="https://img.myoffer.cn/wxxcx/20181111/lxgh@3x.png" alt="" mode="widthFix" />
              <span>留学规划书<br/><span style="font-size:11px">行前“加料”，构筑蓝图</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </scroll-view>
    <get-success :popStatus='getSuccessModel' @closePop="closeModel"></get-success>
    <Rule :popStatus='rulePop' @closePop="closeModel"></Rule>
    <three-reward :popStatus='schoolApplyModel' @closePop="closeModel"></three-reward>
    <eight-pop :popStatus='reward8Model' @closePop="closeModel"></eight-pop>
    <thanks-pop :popStatus='energyModel' @closePop="closeModel"></thanks-pop>
    <schoole-add :popStatus='schoolAddModel' @closePop="closeModel"></schoole-add>
    <Scraf :popStatus='scrafModel' @closePop="closeModel"></Scraf>
    <get-file :popStatus='getFileModel' @closePop="closeModel">12</get-file>
    <address-form :popStatus='addressFormModel' @closePop="closeModel">222</address-form>
  </div>
</template>

<script>
import api from '@/utils/api.js'
import GetSuccess from '../../components/GetSuccess.vue'
import Rule from '../../components/Rule.vue'
import ThreeReward from '../../components/ThreePop.vue'
import EightPop from '../../components/EightPop.vue'
import ThanksPop from '../../components/ThanksPop.vue'
import SchooleAdd from '../../components/SchooleAdd.vue'
import Scraf from '../../components/Scraf.vue'
import GetFile from '../../components/GetFile.vue'
import AddressForm from '../../components/AddressForm.vue'
export default {
  components: {
    GetSuccess,
    Rule,
    ThreeReward,
    EightPop,
    ThanksPop,
    SchooleAdd,
    Scraf,
    GetFile,
    AddressForm
  },
  data () {
    return {
      rulePop: false,
      reward3Model: false,
      reward8Model: false,
      schoolAddModel: false,
      scrafModel: false,
      schoolApplyModel: false,
      getSuccessModel: false,
      energyModel: false,
      addressFormModel: false,
      getFileModel: false,
      toView: '',
      deviceHeight: 500,
      hour: null,
      minute: null,
      second: null,
      max100: true,
      pdata: {},
      helperList: [],
      peo1: 'https://img.myoffer.cn/wxxcx/20181111/juli1@2x.png',
      peo2: 'https://img.myoffer.cn/wxxcx/20181111/juli2@2x.png',
      peo3: 'https://img.myoffer.cn/wxxcx/20181111/juli3@2x.png',
      peo4: 'https://img.myoffer.cn/wxxcx/20181111/juli4@2x.png',
      peo5: 'https://img.myoffer.cn/wxxcx/20181111/juli5@2x.png',
      peo6: 'https://img.myoffer.cn/wxxcx/20181111/juli6@2x.png',
      peo7: 'https://img.myoffer.cn/wxxcx/20181111/juli7@2x.png',
      peo8: 'https://img.myoffer.cn/wxxcx/20181111/juli8@2x.png',
      schoolGetStatus: true,
      scrafGetStatus: true,
      helperGetStatus: true,
      timers: '',
      nowTime: 'before',
      sourceType: '',
      shareId: '',
      haveGotSchool: false,
      haveGotScraf: false
    }
  },
  methods: {
    showModel (type) {
      // const self = this
      if (type === 'rule') {
        this.rulePop = true
      }
      if (type === 'reward3') {
        this.reward3Model = true
      }
      if (type === 'scraf') {
        this.scrafModel = true
      }
      if (type === 'schoolAdd') {
        this.schoolAddModel = true
      }
      if (type === 'schoolApply') {
        this.schoolApplyModel = true
      }
      if (type === 'getSuccess') {
        // 院校加申
        if (!this.schoolGetStatus) {
          if (this.haveGotSchool) {
            wx.showToast({
              title: '您已经领取过啦',
              image: '../../static/images/failicon.png',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '未达到领取条件',
              image: '../../static/images/failicon.png',
              duration: 1500
            })
          }
        } else {
          // wx.getStorage({
          //   key: 'uinfo',
          //   success: (udata) => {
          //     api.schoolRewardService({token: udata.data.accessToken, skuId: '573043088c213602adcb8775'}).then((res) => {
          //       if (!res.code) {
          //         self.schoolGetStatus = false
          //         self.haveGotSchool = true
          //         self.getSuccessModel = true
          //       } else {
          //         wx.showToast({
          //           title: res.msg,
          //           image: '../../static/images/failicon.png',
          //           duration: 1500
          //         })
          //       }
          //     })
          //   }
          // })
        }
      }
      if (type === 'getScrafSuccess') {
        // 领取围巾
        if (!this.scrafGetStatus) {
          wx.showToast({
            title: '未达到领取条件',
            image: '../../static/images/failicon.png',
            duration: 1500
          })
        } else {
          this.addressFormModel = true
        }
      }
      if (type === 'energy') {
        this.getFileModel = true
      }
    },
    closeModel (v) {
      if (v === 'rule-pop') {
        this.rulePop = false
      }
      if (v === 'reward3-model') {
        this.reward3Model = false
      }
      if (v === 'scraf') {
        this.scrafModel = false
        this.toView = 'scraf-add'
      }
      if (v === 'addressFormModel') {
        this.addressFormModel = false
        this.getSuccessModel = true
      }
      if (v === 'addressFormModel-fail') {
        this.addressFormModel = false
      }
      if (v === 'school-add') {
        this.schoolAddModel = false
        this.toView = 'school-add'
      }
      if (v === 'reward8-model') {
        this.reward8Model = false
        this.toView = 'scraf-add'
      }
      if (v === 'school-apply') {
        this.schoolApplyModel = false
        this.toView = 'school-add'
      }
      if (v === 'get-success') {
        this.getSuccessModel = false
      }
      if (v === 'get-file-success') {
        this.getFileModel = false
      }
    },
    getSelectValue (value) {
      this.selected = value
    },
    fetchHelperList (data) {
      api.fetchHelperList({'sponsor': data.userId, token: data.accessToken, skuId: '592826796000ae965a2a4c26'}).then((res) => {
        // this.schoolGetStatus = res.result.schoolHelperEnable
        // this.scrafGetStatus = res.result.scarfHelperEnable
        // if (res.result.HelperCount >= 3 && res.result.HelperCount < 8) {
        //   this.schoolApplyModel = true
        // } else if (res.result.HelperCount >= 8) {
        //   this.schoolApplyModel = false
        //   this.reward8Model = true
        // }
        if (this.schoolGetStatus) {
          this.schoolApplyModel = true
        } else if (this.scrafGetStatus) {
          this.reward8Model = true
        }
        const imgData = res.result.avatarUrls.reverse()
        this.peo1 = imgData[0].helper.wechat.avatarUrl
        this.peo2 = imgData[1].helper.wechat.avatarUrl
        this.peo3 = imgData[2].helper.wechat.avatarUrl
        this.peo4 = imgData[3].helper.wechat.avatarUrl
        this.peo5 = imgData[4].helper.wechat.avatarUrl
        this.peo6 = imgData[5].helper.wechat.avatarUrl
        this.peo7 = imgData[6].helper.wechat.avatarUrl
        this.peo8 = imgData[7].helper.wechat.avatarUrl
      })
    },
    fetchSponsorData (data) {
      api.sponsor({'sponsor': data.userId, token: data.accessToken}).then((res) => {
        if (!res.code) {

        } else {
          console.log(res.msg)
        }
      })
    },
    scrolls () {
      this.toView = ''
    },
    calcTime () {
      this.timers = setInterval(() => {
        wx.getStorage({
          key: 'uinfo',
          success: (sdata) => {
            api.timer({token: sdata.data.accessToken}).then((res) => {
              if (!res.code) {
                const nowTime = res.result / 1000
                const hour1 = nowTime / (60 * 60)
                if (hour1 < 100) {
                  this.max100 = false
                }
                const hours = Math.floor((nowTime) / (60 * 60))
                const minute1 = (hour1 - hours) * 60
                const minutes = Math.floor((hour1 - hours) * 60)
                const seconds = Math.floor((minute1 - minutes) * 60)
                this.hour = hours
                this.minute = minutes
                this.second = seconds
              }
            })
          },
          fail: function (fdata) {

          }
        })
      }, 1000)
    }
  },
  created () {
    if (new Date() < new Date('2018-11-09')) {
      this.nowTime = 'before'
    } else if (new Date('2018-11-11') < new Date() < new Date('2018-11-21')) {
      this.nowTime = 'going'
    } else {
      this.nowTime = 'end'
    }
  },
  onShow (options) {
    this.calcTime()
  },
  destroyed () {
    clearInterval(this.timers)
  },
  onHide () {
    clearInterval(this.timers)
  },
  mounted () {
    // wx.authorize({
    //   scope: 'scope.userInfo'
    // })
    const _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.deviceHeight = res.windowHeight
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '出国留学双十一',
      path: '/pages/helper/main?userId=' + this.shareId,
      imageUrl: ''
    }
  },
  onLoad (options) {
    console.log('index: sponsor query.userId: ', this.$root.$mp.query.userId)
    wx.getStorage({
      key: 'uinfo',
      success: (udata) => {
        this.shareId = udata.data.userId
        this.fetchHelperList(udata.data)
        this.fetchSponsorData(udata.data)
      },
      fail: () => {
        wx.navigateTo({
          url: '/pages/authorization/main?userId=' + this.$root.$mp.query.userId
        })
      }
    })
  }
}
</script>

<style scoped>

.container {
  overflow: scroll;
  overflow-x: hidden;
  background: url("https://img.myoffer.cn/wxxcx/20181111/bg@2x.jpg") no-repeat left top;
  background-size: cover;
}

.timer-bar {
  display: flex;
  width: 90%;
  height: 60rpx;
  margin: 10rpx auto;
  background: url('https://img.myoffer.cn/wxxcx/20181111/timebarbg@3x.png') no-repeat left top;
  background-size: cover;
}

.timer-bar .time-item {
  display: flex;
  flex: 0 0 33.33%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  color: #fff;
}

.timer-bar .timer-active {
  color: #F65CD9;
}

.section1 {
  position: relative;
}

.section1 img {
  width: 375px;
}

.section1 .section1-rule {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 168rpx;
  height: 52rpx;
  margin: -26rpx 0 0 -84rpx;
  text-align: center;
  line-height: 52rpx;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 36rpx;
}

.calc-time {
  position: relative;
  z-index: 99;
  width: 90%;
  margin: 0 auto;
  margin-top: -45rpx;
  padding: 6% 0 35% 0;
  background: #fff;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.show-time {
  display: flex;
  justify-content: center;
  color: #fff;
}

.show-time .time-img {
  width: 88rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: url('https://img.myoffer.cn/wxxcx/20181111/num2@3x.png') no-repeat left top;
  background-size: cover;
}

.show-time .time-img.num3 {
  background: url('https://img.myoffer.cn/wxxcx/20181111/num3@3x.png') no-repeat left top;
  width: 102rpx;
  background-size: cover;
}

.show-time .tw {
  margin: 0 16rpx;
  align-self: center;
  font-weight: bold;
}

.paport {
  position: relative;
  height: 640rpx;
  margin-top: 50rpx;
}
.paport .time-line {
  position: relative;
  width: 100%;
  height: 600rpx;
  background: url('https://img.myoffer.cn/wxxcx/20181111/2323.png') no-repeat left center;
  background-size: 100% auto;
}

.time-line .first-reward {
  position: absolute;
  top: 4%;
  right: 4%;
}

.time-line .first-reward img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 6rpx;
  vertical-align: middle;
}

.time-line .first-reward span {
  font-size: 12px;
  color: #5E66EB;
}

.time-line .last-reward {
  position: absolute;
  bottom: 10%;
  right: 2%;
}

.time-line .last-reward img {
  width: 38rpx;
  height: 44rpx;
  margin-right: 6rpx;
  vertical-align: middle;
}

.time-line .last-reward span {
  font-size: 12px;
  color: #F2237B;
}

.paport .img-div {
  border-radius: 50%;
  overflow: hidden;
}

.paport .img-div>img {
  max-width: 100%;
  max-height: 100%;
}

.paport .peo1 {
  width: 56rpx;
  height: 56rpx;
  top: 10%;
  left: 9%;
}

.paport .peo2 {
  width: 64rpx;
  height: 64rpx;
  top: 10%;
  left: 36%;
}

.paport .peo3 {
  width: 72rpx;
  height: 72rpx;
  top: 12%;
  right: 22%;
}

.paport .peo4 {
  width: 80rpx;
  height: 80rpx;
  top: 29%;
  right: 6%;
}

.paport .peo5 {
  width: 88rpx;
  height: 88rpx;
  top: 34%;
  left: 33%;
}

.paport .peo6 {
  width: 96rpx;
  height: 96rpx;
  top: 55%;
  left: 5%;
}

.paport .peo7 {
  width: 104rpx;
  height: 104rpx;
  bottom: 3%;
  left: 27%;
}

.paport .peo8 {
  width: 112rpx;
  height: 112rpx;
  bottom: -4%;
  right: 22%;
}

.sponsor-page {
  width: 90%;
  margin: 15% 5%;
  border-radius: 12rpx;
  background: #fff;
  overflow: hidden;
}

.sponsor-page .sponsor-head {
  height: 46rpx;
  text-align: center;
  background: url('https://img.myoffer.cn/wxxcx/20181111/zsq@2x.png') no-repeat center center;
  background-size: cover;
  font-size: 16px;
  color: #333;
  margin: 8% 0 10% 0;
}

.sponsor-page .gift {
  position: relative;
  height: 666rpx;
  margin: 8% 0;
  border-radius: 8rpx;
  background: url('https://img.myoffer.cn/wxxcx/20181111/block1@2x.png') no-repeat left top;
  background-size: cover;
}

.sponsor-page .scraf {
  height: 1000rpx;
  background: url('https://img.myoffer.cn/wxxcx/20181111/block2@3x.png') no-repeat left top;
  background-size: cover;
  margin-top: 13%;
}

.helper-page .gift {
  position: relative;
  height: 860rpx;
  margin: 8% 0;
  border-radius: 8rpx;
  background: url('https://img.myoffer.cn/wxxcx/20181111/helperbg@3x.png') no-repeat left top;
  background-size: cover;
}
.sponsor-page .school .title {
  position: absolute;
  left: 15%;
  top: 6%;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 1.6em;
}

.sponsor-page .scraf .title {
  left: 9%;
}

.sponsor-page .school .price {
  position: absolute;
  left: 20%;
  top: 23%;
  font-size: 12px;
  color: #F2237B;
  text-align: center;
  line-height: 1.6em;
}

.sponsor-page .scraf .price {
  left: 25%;
  top: 16%;
}

.sponsor-page .school .go-get {
  position: absolute;
  left: 11%;
  top: 33%;
  width: 222rpx;
  height: 60rpx;
  font-size: 16px;
  line-height: 60rpx;
  color: #fff;
  background: #D0D0D0;
  border-radius: 50px;
  text-align: center;
}

.sponsor-page .school .go-get.active {
  background-image: linear-gradient(-154deg, #F04F93 0%, #F2237B 100%);
}

.sponsor-page .scraf .go-get {
  left: 17%;
  top: 22%;
  background: #D0D0D0;
}

.sponsor-page .scraf .go-get.active {
  background-image: linear-gradient(-154deg, #F04F93 0%, #F2237B 100%);
}

.sponsor-page .zlz .go-get {
  left: 17%;
  top: 22%;
  background: #D0D0D0;
}

.sponsor-page .zlz .go-get.active {
  background-image: linear-gradient(-154deg, #F04F93 0%, #F2237B 100%);
}

.sponsor-page .school>div>img {
  position: absolute;
  top: -6%;
  right: 8%;
  width: 280rpx;
  height: 380rpx;
}

.sponsor-page .scraf>div>img {
  position: absolute;
  top: -3%;
  right: -6%;
  width: 360rpx;
  height: 400rpx;
}

.helper-page .scraf>div>img {
  position: absolute;
  top: 3%;
  right: 0;
  width: 300rpx;
  height: 324rpx;
}

.sponsor-page .scraf>div>img.weijin {
  position: absolute;
  top: -7%;
  left: 0;
  width: 226rpx;
  height: 200rpx;
}

.sponsor-page .school .decr {
  position: absolute;
  left: 10%;
  top: 51%;
  font-size: 12px;
  color: #FFFFFF;
}

.sponsor-page .scraf .decr {
  position: absolute;
  left: 10%;
  top: 33%;
  font-size: 12px;
  color: #FFFFFF;
}

.sponsor-page .school .progress {
  position: absolute;
  left: 10%;
  top: 66%;
  width: 80%;
  font-size: 11px;
  color: #FFFFFF;
}

.sponsor-page .scraf .progress {
  position: absolute;
  left: 10%;
  top: 66%;
  width: 80%;
  font-size: 11px;
  color: #FFFFFF;
}

.sponsor-page .scraf .progress {
  position: absolute;
  left: 10%;
  top: 46%;
  width: 80%;
  font-size: 11px;
  color: #FFFFFF;
}

.helper-page .scraf .progress {
  width: 85%;
  margin-left: -5%;
}

.helper-page .scraf .progress {
  top: 40%;
}

.sponsor-page .school .progress .p-container {
  display: flex;
  justify-content: space-between;
}

.sponsor-page .scraf .progress .p-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 12px;
}

.sponsor-page .school .progress .p-container img {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 4%;
}

.sponsor-page .scraf .progress .p-container img {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 5%;
  align-self: center;
}

.sponsor-page .school .progress .p-container .item1 {
  display: flex;
  flex-direction: column;
  text-align: center
}

.sponsor-page .scraf .progress .p-container .item1 {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 5%;
  justify-content: space-around;
}

.sponsor-page .scraf .progress .p-container .item1 .img-bg {
  width: 160rpx;
  height: 160rpx;
  align-self: center;
  background: url('https://img.myoffer.cn/wxxcx/20181111/f5cbc49aca6c68249836f2ebe7998d9a-536-89x85.png');
  background-size: 100% 100%;
}

.helper-page .scraf .progress .p-container .item1 {
  margin-bottom: 1%;
}

.sponsor-page .school .progress .p-container .sjt {
  width: 18rpx;
  height: 18rpx;
  background: url('https://img.myoffer.cn/wxxcx/20181111/sjt@2x.png') no-repeat;
  background-size: cover;
  margin-top: 8%;
}

.sponsor-page .scraf {
  /* width: 86%;
  height: 600rpx;
  margin: 3%;
  border-radius: 8rpx;
  background: #f3f; */
}

.share-btn {
  width: 80%;
  height: 86rpx;
  line-height: 86rpx;
  margin-top: 20%;
  margin-left: 10%;
  border-radius: 50rpx;
  text-align: center;
  background-image: linear-gradient(-154deg, #F04F93 0%, #F2237B 100%);
  box-shadow: 0 10px 17px 1px rgba(255,25,123,0.24);
  font-size: 16px;
  color: #FFFFFF;
}
</style>
