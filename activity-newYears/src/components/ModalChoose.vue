<template>
<div>
  <div class="choose">
    <div class="choose-title">选择代表院校</div>
    <div class="choose-input" :class="{'holder': schoolDisplay === '请输入在读或毕业院校'}" @click="showSchool">{{schoolDisplay}}</div>
    <div class="choose-text">*排名第一院校形象可在myOffer App开屏页进行展示，为期一个月；</div>
    <div class="choose-text">*院校许愿榜是累计该校所有同学的助愿人数并排名，前三名院校全体学生均享有8折留学全套服务优惠哦，快来邀请同学参加吧；</div>
    <div class="choose-text">*注意：院校一经选择无法更改！</div>
    <form @submit="submit" report-submit="true"><button class="choose-btn" :class="{enabled: schoolDisplay!== '请输入在读或毕业院校'}" :disabled="schoolDisplay === '请输入在读或毕业院校'" form-type="submit">提交</button></form>
  </div>
  <button class="choose-close" @click="closeAllModal"></button>
</div>
</template>
<script>
import api from '@/assets/js/api'
export default {
  computed: {
    schoolDisplay () {
      return this.$store.state.schoolDisplay
    }
  },
  methods: {
    closeAllModal () {
      this.$emit('closeAllModal')
    },
    showSchool () {
      wx.navigateTo({
        url: '/pages/school/main'
      })
    },
    submit (e) {
      api.schoolChoose({
        apikey: wx.getStorageSync('apikey'),
        schoolName: this.schoolDisplay
      }).then(res => {
        if (res.code === 0) {
          wx.showToast({
            icon: 'none',
            title: '提交成功！'
          })
          this.$store.dispatch('setSchool', true)
          api.sponsor({
            apikey: wx.getStorageSync('apikey'),
            formId: e.target.formId
          })
        }
        this.$emit('closeAllModal')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.choose {
  width: 290px;
  height: 354px;
  padding: 15px 15px 30px;
  margin: 115px auto 0;
  background-color: #fff;
  border-radius: 12px;

  .choose-title {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .choose-input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 42px;
    padding-left: 12px;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 42px;
    color: #333;
    box-shadow: inset 0 1px 4px 0 rgba(60,167,252,0.75);
    border-radius: 5px;
  }

  .choose-input.holder {
    color: #bfbfbf;
  }

  .choose-text {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #696969;
  }

  .choose-btn {
    width: 130px;
    height: 38px;
    margin: 40px auto 0;
    font-size: 16px;
    line-height: 38px;
    color: #fff;
    background-color: #d0d0d0;
    border-radius: 67px;
  }

  .choose-btn.enabled {
    width: 140px;
    height: 48px;
    margin: 32px auto 0;
    font-size: 16px;
    line-height: 48px;
    color: #fff;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-btn.png") no-repeat left top;
    background-size: 100% 100%;
  }
}
.choose-close {
  display: block;
  width: 30px;
  height: 30px;
  margin: 25px auto 0;
  background: url("https://img.myoffer.cn/wxxcx/20190101/mask-close.png") no-repeat left top;
  background-size: 100%;
}
.holder {
  color: #05cbf9;
}
</style>
