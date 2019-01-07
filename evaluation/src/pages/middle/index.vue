<template>
  <section class="middle">
		<div class="answer-card" v-show="initShow">
			<span class="answer-card__num"><b>{{ currentSubject+1 }}</b><i>/</i><b>{{ subjects.length }}</b></span>
			<p class="answer-card__subject">{{ subjects[currentSubject].title }}</p>
			<ul class="answer-card__answer">
				<li @click="chooseAnswer(index,item.option)" :class="{active:index==currentAnswer}" v-for="(item,index) in subjects[currentSubject].answer" :key="index">{{ item.text }}</li>
			</ul>
			<button class="answer-card__button" v-if="!completeAll" @click="nextSubject">下一题</button>
			<button class="answer-card__button--complete" v-else @click="submitSubject">完成</button>
		</div>
	</section>
</template>
<script>
export default {
  data () {
    return {
      initShow: false,
      totalSubject: 0,
      currentSubject: 0,
      currentAnswer: -1,
      currentAnswerOption: '',
      subjects: [{title: '', answer: []}],
      totalAnswer: []
    }
  },
  computed: {
    completeAll () {
      if (this.currentSubject + 1 === this.subjects.length) {
        //  最后一题
        return true
      } else {
        //  未到最后一题
        return false
      }
    }
  },
  methods: {
    chooseAnswer (index, option) {
      this.currentAnswer = index
      this.currentAnswerOption = option
    },
    // 下一题
    nextSubject () {
      if (this.currentAnswer === -1) {
        wx.showModal({
          title: '提示',
          content: '请选择答案',
          showCancel: false,
          confirmColor: '#36bdd2'
        })
        return false
      }
      this.currentSubject++
      this.currentAnswer = -1
      this.totalAnswer.push(this.currentAnswerOption)
    },
    //  完成，提交答案
    submitSubject () {
      if (this.currentAnswer === -1) {
        wx.showModal({
          title: '提示',
          content: '请选择答案',
          showCancel: false,
          confirmColor: '#36bdd2'
        })
        return false
      }
      this.totalAnswer.push(this.currentAnswerOption)
      this.submitAnswer()
    },
    //  请求-->获取题目
    fetchMiddle () {
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/master/question',
        dataType: 'json',
        success: (res) => {
          const result = res.data
          if (result.code === 0) {
            this.subjects = result.result
            wx.hideLoading()
            this.initShow = true
          } else {
            wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: '服务器异常，请稍后再试'
            })
          }
        },
        fail () {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '服务器异常，请稍后再试'
          })
        }
      })
    },
    //  请求-->提交答案
    submitAnswer () {
      wx.request({
        method: 'POST',
        url: 'https://api.myoffer.cn/svc/mo-eva/master/submit',
        data: {
          redirect: 'applet',
          options: this.totalAnswer
        },
        dataType: 'json',
        success: (res) => {
          const result = res.data
          if (result.code === 0) {
            wx.hideLoading()
            const ifPhoneExist = wx.getStorageSync('ifGetPhone')
            if (ifPhoneExist) {
              wx.navigateTo({
                url: '/pages/result/main?id=' + result.result.id + '&from=middle'
              })
            } else {
              wx.navigateTo({
                url: '/pages/authorization/main?id=' + result.result.id + '&from=middle'
              })
            }
          } else {
            wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: '服务器出错，请稍后再试'
            })
          }
        },
        fail () {
          wx.showToast({
            icon: 'none',
            title: '服务器出错，请稍后再试'
          })
        }
      })
    }
  },
  onShow () {
    wx.showLoading({
      title: '加载中...'
    })
    this.initShow = false
    this.totalSubject = 0
    this.currentSubject = 0
    this.currentAnswer = -1
    this.currentAnswerOption = ''
    this.subjects = [{title: '', answer: []}]
    this.totalAnswer = []
    this.fetchMiddle()
  }
}
</script>
<style lang="less">
.middle{
  box-sizing: border-box;
  height: 100vh;
  padding-top: 40rpx;
  background: url("https://img.myoffer.cn/wxxcx/bg.jpg") no-repeat left top;
  background-size: cover;
  overflow: scroll;
}
.answer-card{
  position: relative;
  margin: 0 auto 0;
  padding-top: 106rpx;
  width: 670rpx;
  height: 912rpx;
  background: url("https://img.myoffer.cn/wxxcx/answer_card.png") no-repeat left top;
  background-size: 100% auto;
}
.answer-card__num{
  position: absolute;
  left: 24rpx;
  top: 32rpx;
  color: #36bdd2;
  font-size: 32rpx;
  font-weight: 500;
  b{
    display: inline-block;
    font-size: 32rpx;
    font-weight: 500;
  }
  i{
    display: inline;
  }
}
.answer-card__subject{
  margin: 0 auto 68rpx;
  width: 574rpx;
  line-height: 50rpx;
  text-align: justify;
  font-size: 30rpx;
}
.answer-card__answer{
  font-size: 28rpx;
  li{
    margin: 0 auto 40rpx;
    padding-left: 40rpx;
    width: 574rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    background-color: #ebebeb;
  }
  li.active{
    background-color: #36bdd2;
  }
}
.answer-card__button{
  display: block;
  margin: 120rpx auto 0;
  padding: 0;
  width: 456rpx;
  height: 100rpx;
  line-height: 100rpx;
  border: none;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #36BDD2;
}
.answer-card__button--complete{
  display: block;
  margin: 120rpx auto 0;
  padding: 0;
  width: 456rpx;
  height: 100rpx;
  line-height: 100rpx;
  border: none;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #36BDD2;
}
</style>
