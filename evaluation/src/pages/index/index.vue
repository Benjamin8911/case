<template>
  <div class="index">
		<img class="index-banner" src="https://img.myoffer.cn/wxxcx/index_banner.png">
		<div class="index-choose">
			<div class="index-choose__item primary" @click="goToPrimary">
				<h6>菜鸟一枚</h6>
				<p>我适合去哪个国家留学？</p>
			</div>
			<div class="index-choose__item middle" @click="goToMiddle">
				<h6>身为高手</h6>
				<p>我要如何选择最佳留学专业？</p>
			</div>
			<view class="index-choose__item high" @click="goToSenior">
				<h6>我是大神</h6>
				<p>哪一所名校才配得上我？</p>
			</view>
		</div>
	</div>
</template>

<script>
export default {
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          wx.request({
            method: 'POST',
            url: 'https://api.myoffer.cn/api/v1/applet/login',
            data: {
              appletName: 'abroadTest',
              code: res.code
            },
            success (res) {
              const result = res.data
              wx.setStorage({
                key: 'token',
                data: result.result.token
              })
            }
          })
        }
      })
    },
    goToPrimary () {
      wx.navigateTo({
        url: '/pages/primary/main'
      })
    },
    goToMiddle () {
      wx.navigateTo({
        url: '/pages/middle/main'
      })
    },
    goToSenior () {
      wx.navigateTo({
        url: '/pages/senior/main'
      })
    }
  },
  onLoad () {
    wx.clearStorage()
    this.getUserInfo()
  },
  onShow () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
}
</script>

<style lang="less" scoped>
.index{
  height:100vh;
  overflow: scroll;
  background: url("https://img.myoffer.cn/wxxcx/bg.jpg") no-repeat left top;
  h2{
    padding-top: 60rpx;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
  }
  .index-banner{
    display: block;
    width: 750rpx;
    height: 360rpx;
  }
}
.index-choose{
  width: 670rpx;
  margin-top: -20rpx;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  .index-choose__item{
    width: 670rpx;
    height: 228rpx;
    margin-bottom: 50rpx;
    color: #fff;
    h6{
      width: 164rpx;
      padding-top: 61rpx;
      padding-left: 58rpx;
      margin-bottom: 32rpx;
      font-size: 30rpx;
      text-align: center;
    }
    p{
      padding-left: 52rpx;
      font-size: 34rpx;
      font-weight: bold;
    }
  }
  .primary{
    background-image: url("https://img.myoffer.cn/wxxcx/bg_low.png");
    background-size: cover;
  }
  .middle{
    background-image: url("https://img.myoffer.cn/wxxcx/bg_middle.png");
    background-size: cover;
  }
  .high{
    background-image: url("https://img.myoffer.cn/wxxcx/bg_high.png");
    background-size: cover;
  }
}
</style>
