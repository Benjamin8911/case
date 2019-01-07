<template>
  <div class="authorization">
    <div class="authorization-icon">
      <img class="authorization-icon__myoffer" src="https://img.myoffer.cn/wxxcx/20181111/icon_wechat.png">
      <img class="authorization-icon__arrow" src="https://img.myoffer.cn/wxxcx/20181111/icon_arrow.png">
      <img class="authorization-icon__wechat" src="https://img.myoffer.cn/wxxcx/20181111/icon_wechat.png">
    </div>
    <h4>授权后开发者将获得以下权限</h4>
    <p>● 授权你的微信绑定手机号码方便发起或者助力哟</p>
    <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">先授权获取用户信息</button>
    <button class="btn-authorize" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认授权</button>
  </div>
</template>
<script>
import api from '@/utils/api.js'
export default {
  data () {
    return {
      id: '',
      from: 'primary',
      userInfoData: {},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      source: 'index',
      userId: ''
    }
  },
  methods: {
    bindGetUserInfo (e) {
      if (e.target.userInfo) {
        this.userInfoData = e.target
      } else {
        wx.showToast({
          title: '拒绝授权无法登陆',
          image: '../../static/images/failicon.png'
        })
      }
    },
    getPhoneNumber (e) {
      const self = this
      if (e.target.errMsg !== 'getPhoneNumber:ok') {
        wx.removeStorage({
          key: 'ifGetPhone'
        })
        wx.showToast({
          title: '拒绝授权无法登陆',
          image: '../../static/images/failicon.png'
        })
      } else {
        const _userInfoData = this.userInfoData
        wx.getStorage({
          key: 'token',
          success: (token) => {
            api.loginState({
              token: token.data,
              appletName: 'applet',
              userInfo: {
                ..._userInfoData.userInfo,
                phonenumberInfo: {
                  encryptedData: e.target.encryptedData,
                  iv: e.target.iv
                },
                baseUserInfo: {
                  encryptedData: _userInfoData.encryptedData,
                  iv: _userInfoData.iv
                }
              }
            }).then((res1) => {
              if (!res1.code) {
                wx.setStorage({
                  key: 'uinfo',
                  data: res1.result
                })
                console.log('auth: query.id-------->', self.userId, res1.result.userId)
                console.log(self.userId === 'undefined')
                if (self.userId === 'undefined' || res1.result.userId === self.userId) {
                  wx.navigateTo({
                    url: '/pages/index/main'
                  })
                } else {
                  wx.navigateTo({
                    url: '/pages/helper/main?userId=' + self.userId
                  })
                }
              } else {
                this.login()
                wx.showToast({
                  title: 'token失效，重新授权',
                  image: '../../static/images/failicon.png'
                })
              }
            })
          }
        })
        // wx.getUserInfo({
        //   success: (userData) => {
        //     wx.getStorage({
        //       key: 'token',
        //       success: (token) => {
        //         api.loginState({
        //           token: token.data,
        //           userInfo: {
        //             ...userData.target.userInfo,
        //             phonenumberInfo: {
        //               encryptedData: e.target.encryptedData,
        //               iv: e.target.iv
        //             },
        //             baseUserInfo: {
        //               encryptedData: userData.target.encryptedData,
        //               iv: userData.target.iv
        //             }
        //           }
        //         }).then((res1) => {
        //           if (!res1.code) {
        //             wx.setStorage({
        //               key: 'uinfo',
        //               data: res1.result
        //             })
        //             if (self.userId === 'undefined' || res1.result.userId === self.userId) {
        //               wx.navigateTo({
        //                 url: '/pages/index/main'
        //               })
        //             } else {
        //               wx.navigateTo({
        //                 url: '/pages/helper/main?userId=' + self.userId
        //               })
        //             }
        //           } else {
        //             wx.showToast({
        //               title: res1.msg,
        //               image: '../../static/images/failicon.png'
        //             })
        //           }
        //         })
        //       }
        //     })
        //   },
        //   fail: function (r) {
        //     wx.showToast({
        //       title: '拒绝授权无法登陆',
        //       image: '../../static/images/failicon.png'
        //     })
        //   }
        // })
      }
    },
    login () {
      wx.login({
        success: res => {
          api.login(res.code).then(res => {
            wx.setStorage({
              key: 'token',
              data: res.result.token
            })
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    checkLoginStatus () {
      wx.getStorage({
        key: 'uinfo',
        success: (sdata) => {
          console.log('logined in auth')
          if (this.userId !== sdata.data.userId) {
            wx.navigateTo({
              url: '/pages/helper/main?userId=' + this.userId
            })
          } else {
            wx.navigateTo({
              url: '/pages/index/main'
            })
          }
        },
        fail: (fdata) => {
          this.login()
        }
      })
    }
  },
  onShow (options) {
    wx.showLoading({
      title: '加载中'
    })
  },
  mounted () {
    wx.hideLoading()
  },
  onLoad (options) {
    console.log('auth: onLoad---->', this.$root.$mp.query)
    this.userId = this.$root.$mp.query.userId
    this.login()
    // if (e.userId) {
    //   this.source = 'helper'
    // } else {
    //   this.source = 'index'
    // }
    // console.log('----------')
    // this.source = e.source
    // this.id = e.id
    // this.from = e.from
    // this.checkLoginStatus()
  }
}
</script>
<style scoped>
.authorization {
  box-sizing: border-box;
  height: 100vh;
  padding: 100rpx 60rpx 0;
}
.authorization-icon {
  display: flex;
  justify-content: center;
  width: 630rpx;
  padding-bottom: 94rpx;
  margin: 0 auto 54rpx;
  border-bottom: 1px solid #dedede;
}
.authorization-icon__myoffer,.authorization-icon__wechat{
  width: 152rpx;
  height: 152rpx;
}
.authorization-icon__arrow{
  width: 42rpx;
  height: 34rpx;
  margin: 60rpx;
}
h4{
  font-size: 30rpx;
  color: #333;
}
p{
  margin-top: 20rpx;
  margin-bottom: 80rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #808080;
}
.btn-authorize{
  display: block;
  width: 630rpx;
  height: 96rpx;
  line-height: 96rpx;
  margin: 0 auto;
  font-size: 36rpx;
  font-weight: normal;
  color: #fff;
  background-color: #44b035;
  border: none;
  border-radius: 16rpx;
}
</style>

