<template>
  <div class="authorization">
    <div class="authorization-icon">
      <img class="authorization-icon__myoffer" src="https://img.myoffer.cn/wxxcx/20190101/logo.png">
      <img class="authorization-icon__arrow" src="https://img.myoffer.cn/wxxcx/20181111/icon_arrow.png">
      <img class="authorization-icon__wechat" src="https://img.myoffer.cn/wxxcx/20181111/icon_wechat.png">
    </div>
    <h4>授权后开发者将获得以下权限</h4>
    <p>● 授权你的微信绑定手机号码用于myOffer来了的活动信息核实</p>
    <button class="btn-authorize" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认授权</button>
  </div>
</template>
<script>
import api from '@/assets/js/api.js'
export default {
  data () {
    return {
      role: ''
    }
  },
  methods: {
    login (e) {
      wx.login({
        success: res => {
          api.login(res.code).then(res => {
            wx.setStorage({
              key: 'token',
              data: res.result.token
            })
            wx.setStorage({
              key: 'openid',
              data: res.result.openId
            })
            this.getUserInfo(e)
          })
        }
      })
    },
    getUserInfo (e) {
      wx.getUserInfo({
        success: (res) => {
          wx.setStorageSync('nickName', res.userInfo.nickName)
          wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
          api.loginState({
            token: wx.getStorageSync('token'),
            WXAppletSource: wx.getStorageSync('WXAppletSource'),
            userInfo: {
              ...res.userInfo,
              phonenumberInfo: {
                encryptedData: e.target.encryptedData,
                iv: e.target.iv
              },
              baseUserInfo: {
                encryptedData: res.encryptedData,
                iv: res.iv
              }
            }
          }).then(res => {
            wx.setStorage({
              key: 'ifGetPhone',
              data: true
            })
            wx.setStorage({
              key: 'apikey',
              data: res.result.accessToken
            })
            wx.setStorage({
              key: 'userId',
              data: res.result.userId
            })
            if (wx.getStorageSync('sponsor') && this.role !== 'sponsor') {
              if (res.result.userId === wx.getStorageSync('sponsor')) {
                this.$store.dispatch('setRoleHelper', false)
              } else {
                this.$store.dispatch('setRoleHelper', true)
              }
            } else {
              wx.setStorageSync('sponsor', res.result.userId)
              this.$store.dispatch('setRoleHelper', false)
            }
            wx.hideLoading()
            wx.navigateBack({
              delta: 1
            })
          }).catch(() => {
            wx.removeStorage({
              key: 'ifGetPhone'
            })
            wx.hideLoading()
          })
        },
        fail: (err) => {
          wx.hideLoading()
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
          wx.setStorageSync('userAuth', false)
          wx.navigateTo({
            url: '/pages/start/main'
          })
        }
      })
    },
    getPhoneNumber (e) {
      wx.showLoading({title: '授权中，请稍后'})
      if (e.target.errMsg !== 'getPhoneNumber:ok') {
        wx.removeStorage({
          key: 'ifGetPhone'
        })
        wx.hideLoading()
      } else {
        this.login(e)
      }
    }
  },
  onLoad (e) {
    this.role = e.role
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          return false
        } else {
          wx.authorize({
            scope: 'scope.userInfo'
          })
        }
      }
    })
  }
}
</script>
<style lang="less">
.authorization{
  box-sizing: border-box;
  height: 100vh;
  padding: 50px 30px 0;
  .authorization-icon{
    display: flex;
    justify-content: center;
    width: 315px;
    padding-bottom: 47px;
    margin: 0 auto 27px;
    border-bottom: 1px solid #dedede;
  }
  .authorization-icon__myoffer,.authorization-icon__wechat{
    width: 76px;
    height: 76px;
  }
  .authorization-icon__arrow{
    width: 21px;
    height: 17px;
    margin: 30px;
  }
  h4{
    font-size: 15px;
    color: #333;
  }
  p{
    margin-top: 10px;
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 20px;
    color: #808080;
  }
  .btn-authorize{
    display: block;
    width: 325px;
    height: 58px;
    line-height: 58px;
    margin: 0 auto;
    font-size: 18px;
    font-weight: normal;
    color: #fff;
    border: none;
    border-radius: 8px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/btn-auth.png") no-repeat left top;
    background-size: 100% 100%;
  }
}
</style>

