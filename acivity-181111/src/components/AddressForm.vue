<template>
  <div v-if="popStatus" class="rule-page">
    <div class="rule">
      <p class="font20 text-center title">填写信息</p>
      <div class="text font13">
        <p>
          <span>请填写收货信息，坐等定制的[Dream <br/>School围巾]到手哦~</span>
        </p>
      </div>
      <form class="address-form">  
        <div class="group">
          <input type="text" name="username" placeholder="姓名" v-model="form.username" @blur="exexValue(form.username, 'username')">
          <p v-if="showExec1" class="waring">用户名不能为空</p>
        </div>
        <div class="group">
          <input type="number" name="phone" placeholder="手机号" v-model="form.phone" @blur="exexValue(form.phone, 'phone')">
          <p v-if="showExec2" class="waring">手机号格式错误</p>
        </div>
        <div class="group">
          <!-- <input class="picker" type="text" name="school" placeholder="定制院校" v-model="form.school" @blur="exexValue(form.school, 'school')"> -->
          <picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
            <input class="picker" type="text" name="school" placeholder="定制院校" v-model="array[index].name">
          </picker>
          <p style="color: #666">该学校还剩：{{ array[index].inventory }} 条</p>
        </div>
        <div class="group">
          <input type="text" name="address" placeholder="收货地址" v-model="form.address" @blur="exexValue(form.address, 'address')">
          <p v-if="showExec4" class="waring">收货地址不能为空</p>
        </div>
        <p class="notice">注：如心仪的院校已被抢光，可选择随机发送哦~随机院校全部为G5精英大学。</p>
      </form>  
      <div :class="{'getReward': canSubmit}" class="subbtn" @click="submitForm">提交</div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api.js'
export default {
  props: ['popStatus'],
  data () {
    return {
      form: {
        username: '',
        phone: '',
        school: '',
        address: ''
      },
      showExec1: false,
      showExec2: false,
      showExec4: false,
      canSubmit: false,
      array: [{name: '美国', value: '1'}, {name: '中国', value: '11'}, {name: '巴西', value: '116'}, {name: '日本', value: '011'}],
      index: 0
    }
  },
  created () {
    const self = this
    wx.getStorage({
      key: 'uinfo',
      success: function (uinfo) {
        api.schoolList({token: uinfo.data.accessToken}).then((res) => {
          if (!res.code) {
            self.array = res.result
          }
        })
      }
    })
  },
  methods: {
    bindPickerChange: function (e) {
      this.index = e.target.value
    },
    exexValue (v, t) {
      if (t === 'username') {
        if (v.length > 0) {
          console.log(1)
          this.showExec1 = false
        } else {
          console.log(v)
          this.showExec1 = true
        }
      }
      if (t === 'phone') {
        if (!v || !(/^[1][3,4,5,7,8][0-9]{9}$/.test(v))) {
          this.showExec2 = true
        } else {
          this.showExec2 = false
        }
      }
      if (t === 'address') {
        if (!v) {
          this.showExec4 = true
        } else {
          this.showExec4 = false
        }
      }
      if (this.form.username.length > 0 && this.form.phone.length > 0 && this.form.address.length > 0 && this.showExec2 === false) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    },
    submitForm () {
      const self = this
      const name = this.form.username
      const phone = this.form.phone
      const school = this.array[this.index].name
      const likeSchoolId = this.array[this.index]._id
      const address = this.form.address
      wx.getStorage({
        key: 'uinfo',
        success: function (res) {
          api.addressAdd({token: res.data.accessToken, name, phone, shippingAddress: address, likeSchool: school, likeSchoolId}).then((res1) => {
            if (!res1.code) {
              self.$emit('closePop', 'addressFormModel')
            } else {
              wx.showToast({
                title: res1.msg,
                image: '../../static/images/failicon.png',
                duration: 1000,
                success: function () {
                  self.$emit('closePop', 'addressFormModel-fail')
                }
              })
            }
          })
        }
      })
    }
  },
  watch: {
    'form.address' () {
      if (this.showExec2 === false && this.showExec1 === false && this.form.address.length > 0) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    }
  }
}
</script>

<style scoped>
.rule-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
}

.rule-page .rule {
  position: absolute;
  left: 11%;
  top: 50%;
  width: 78%;
  height: 980rpx;
  margin-top: -490rpx;
  background: #fff;
  border-radius: 12rpx;
  text-align: center;
  font-size: 13px;
}

.rule-page .rule .text {
  padding: 0 6%;
  letter-spacing: 2rpx;
  text-align: center;
}

.rule-page .rule .text p {
  display: flex;
  margin-bottom: 30rpx;
}

.title {
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
  text-align: center;
  line-height: 26px;
  padding: 35rpx 0 30rpx 0;
}

.subbtn {
  background: #D0D0D0;
  margin: 20rpx  auto;
  margin-top: 60rpx;
  width: 224rpx;
  height: 76rpx;
  line-height: 76rpx;
  text-align: center;
  border-radius: 50rpx;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 5rpx;
}

.getReward {
  background: linear-gradient(to bottom, #F04F93, #F2237B);
}

::-webkit-input-placeholder {
    color:    #BFBFBF;
}
:-moz-placeholder {
    color:    rgb(54, 46, 46);
}
::-moz-placeholder {
    color:    #BFBFBF;
}
:-ms-input-placeholder {
    color:    #BFBFBF;
}

.rule-page .rule .address-form .group {
  height: 116rpx;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10rpx;
  text-align: left;
}

.rule-page .rule .address-form .group:last-child {
  margin-bottom: 0;
}

.address-form .group input {
  height: 84rpx;
  padding-left: 12rpx;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.18) inset;
  border-radius: 8rpx;
  text-align: left;
}

.notice {
  padding: 0 6%;
  font-size: 11px;
  color: #696969;
  letter-spacing: 0;
  line-height: 18px;
  text-align: left;
}

.waring {
  font-size: 11px;
  color: red;
}
</style>
