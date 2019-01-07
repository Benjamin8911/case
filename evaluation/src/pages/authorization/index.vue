<template>
  <div class="authorization">
    <div class="authorization-icon">
      <img class="authorization-icon__myoffer" src="../../assets/images/icon_myoffer.png">
      <img class="authorization-icon__arrow" src="../../assets/images/icon_arrow.png">
      <img class="authorization-icon__wechat" src="../../assets/images/icon_wechat.png">
    </div>
    <h4>授权后开发者将获得以下权限</h4>
    <p>● 授权你的微信绑定手机号码用于出国留学测评的结果查询及保存</p>
    <button class="btn-authorize" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认授权</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      from: 'primary'
    }
  },
  methods: {
    getPhoneNumber (e) {
      let _this = this
      if (e.target.errMsg !== 'getPhoneNumber:ok') {
        wx.removeStorage({
          key: 'ifGetPhone'
        })
        wx.navigateTo({
          url: '/pages/index/main'
        })
      } else {
        wx.request({
          method: 'PUT',
          url: 'https://api.myoffer.cn/api/v1/mo-eva/update-phonenumber',
          data: {
            id: _this.id,
            token: wx.getStorageSync('token'),
            encryptedData: e.target.encryptedData,
            iv: e.target.iv
          }
        })
        wx.setStorage({
          key: 'ifGetPhone',
          data: 'true'
        })
        if (_this.from === 'senior') {
          wx.redirectTo({
            url: '/pages/match/main?id=' + _this.id
          })
        } else {
          wx.redirectTo({
            url: '/pages/result/main?id=' + _this.id + '&from=' + _this.from
          })
        }
      }
    }
  },
  onLoad (e) {
    this.id = e.id
    this.from = e.from
  }
}
</script>
<style lang="less">
.authorization{
  box-sizing: border-box;
  height: 100vh;
  padding: 100rpx 60rpx 0;
  .authorization-icon{
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
}
</style>

