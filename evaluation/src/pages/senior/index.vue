<template>
  <div class="senior" @click.self="pickerFlag=false" :class="{loading:loadingFlag}" ref="senior">
		<div class="senior-content" v-show="!loadingFlag">
			<div class="senior-content__item">
				<h4>姓名</h4>
				<input type="text" placeholder-style="color:#bfbfbf" placeholder="请输入姓名" maxlength="8" v-model="name" @focus="pickerFlag=false;" @blur="checkName(name)">
			</div>
			<div class="senior-content__item">
				<h4>意向国家</h4>
        <picker mode="selector" :range="countryArr" range-key="name" @change="onCountryChange">
          <view class="senior-content__item--input" :class="{'no-text':isCountryEmpty}">{{ country }}</view>
        </picker>
			</div>
			<div class="senior-content__item">
				<h4>在读或毕业院校</h4>
        <div class="div-input" :class="{'no-text':school==='请输入在读或毕业院校'}" @click="showSchool">{{ school }}</div>
      </div>
			<div class="senior-content__item">
				<h4>就读专业</h4>
        <picker mode="selector" :range="majors" range-key="name" @change="onMajorChange">
          <view class="senior-content__item--input" :class="{'no-text':isMajorEmpty}">{{ major }}</view>
        </picker>
			</div>
			<div class="senior-content__item">
				<h4>平均成绩（百分制）</h4>
				<input type="number" min="0" max="100" placeholder-style="color:#bfbfbf" placeholder="0~100" v-model.number="score">
			</div>
			<button class="btn-start" :disabled="startFlag" @click="startMatch">开始匹配</button>
		</div>
		<div class="senior-loading" v-show="loadingFlag">
			<div class="loading-3d" v-show="num !== 10">
				<div class="rot"><div class="key near">人文与科学</div></div>
				<div class="rot"><div class="key far">机械设计</div></div>
				<div class="rot"><div class="key near">厦门大学</div></div>
				<div class="rot"><div class="key far">美国</div></div>
				<div class="rot"><div class="key strong">{{ name }}</div></div>
				<div class="rot"><div class="key near">复旦大学</div></div>
				<div class="rot"><div class="key far">88.90</div></div>
				<div class="rot"><div class="key near">香港</div></div>
				<div class="rot"><div class="key far">心理学</div></div>
				<div class="rot"><div class="key strong">{{ country }}</div></div>
				<div class="rot"><div class="key far">北京大学</div></div>
				<div class="rot"><div class="key near">79.50</div></div>
				<div class="rot"><div class="key strong">{{ school }}</div></div>
				<div class="rot"><div class="key far">四川大学</div></div>
				<div class="rot"><div class="key strong">{{ major }}</div></div>
				<div class="rot"><div class="key far">87.00</div></div>
				<div class="rot"><div class="key near">自动化</div></div>
				<div class="rot"><div class="key strong">{{ score }}</div></div>
				<div class="rot"><div class="key far">新西兰</div></div>
				<div class="rot"><div class="key near">92.40</div></div>
				<div class="rot"><div class="key far">计算机科学</div></div>
			</div>
			<p class="loading-info" v-show="num === 10">方案加载完毕</p>
			<button class="btn-result" @click="seeResult">查看结果</button>
		</div>
		<div class="school" v-show="schoolFlag">
			<p class="school-input"><input ref="school" type="text" v-model="schoolPicker" @input="onSchoolChange" placeholder="请输入在读或毕业院校"><button v-show="schoolPicker.length > 0" class="btn-save" @click="saveSchool">保存</button></p>
      <ul v-show="schoolListFlag">
				<li v-for="(item,index) in schoolsArr" :key="index" @click="chooseSchool(item)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      /* loading相关 */
      move: false,
      loadingFlag: false,
      timer: null,
      num: 1,
      title: '智能匹配',
      showSaveBtn: false,
      //  过滤学校列表
      schoolListFlag: false,
      showC: false,
      showM: false,
      //  遮罩层学校表单标志
      schoolFlag: false,
      pickerFlag: false,
      pickerValue: '',
      //  姓名
      name: '',
      isCountryEmpty: true,
      //  用于picker的国家列表
      countries: [{
        values: []
      }],
      //  用于保存obj的国家列表
      countryArr: [],
      //  意向国家
      country: '请选择意向国家',
      //  picker意向国家
      countryPicker: '',
      schools: [],
      //  过滤的学校列表
      schoolsArr: [],
      //  在读或毕业院校
      school: '请输入在读或毕业院校',
      schoolPicker: '',
      isMajorEmpty: true,
      //  用于picker的专业列表
      majors: [],
      //  就读专业
      major: '请选择就读专业',
      //  picker就读专业
      majorPicker: '',
      //  平均成绩
      score: ''
    }
  },
  computed: {
    //  是否禁用开始按钮
    startFlag () {
      if (this.getLength(this.name) >= 3 && this.getLength(this.name) <= 16 && this.score && this.score >= 0 && this.score <= 100 && this.school.length > 0 && this.major.length > 0 && this.country.length > 0) {
        return false
      } else {
        return true
      }
    },
    countryCode () {
      let code = ''
      for (let i = 0; i < this.countryArr.length; i++) {
        if (this.countryArr[i].name === this.country) {
          code = this.countryArr[i].code
        }
      }
      return code
    }
  },
  methods: {
    //  验证特殊字符
    checkName (str) {
      let reg = /[\d~#^$@%&!*()<>:;'"{}【】]/gi
      if (reg.test(str)) {
        wx.showToast({
          icon: 'none',
          title: '姓名不能包含数字和特殊字符'
        })
        return true
      } else {
        return false
      }
    },
    //  获取输入字符实际长度
    getLength (str) {
      let realLenth = 0
      let charCode = -1
      for (let i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
          realLenth += 1
        } else {
          realLenth += 2
        }
      }
      return realLenth
    },
    showCountry () {
      this.pickerFlag = true
      this.showC = true
      this.showM = false
    },
    //  显示学校输入板块
    showSchool () {
      this.title = ''
      this.schoolFlag = true
      //  显示保存按钮
      this.showSaveBtn = true
    },
    showMajor () {
      this.pickerFlag = true
      this.showC = false
      this.showM = true
    },
    //  picker国家变更
    onCountryChange (obj) {
      // this.countryPicker = obj.values[0]
      this.isCountryEmpty = false
      this.country = this.countryArr[obj.target.value].name
      this.countryCode = this.countryArr[obj.target.value].code
    },
    //  输入学校-->提示更新
    onSchoolChange () {
      //  显示过滤的学校列表
      this.schoolListFlag = true
      this.schoolsArr = []
      for (let i = 0; i < this.schools.length; i++) {
        if (this.schools[i].indexOf(this.schoolPicker) > -1) {
          this.schoolsArr.push(this.schools[i])
        }
      }
    },
    //  点击选择学校
    chooseSchool (school) {
      this.schoolListFlag = false
      this.schoolPicker = school
    },
    // picker专业变更
    onMajorChange (obj) {
      this.isMajorEmpty = false
      this.major = this.majors[obj.target.value].name
    },
    saveSchool () {
      //  判定下输入的学校是否在索引内
      for (let i = 0; i < this.schools.length; i++) {
        if (this.schoolPicker === this.schools[i]) {
          this.school = this.schoolPicker
          this.showSaveBtn = false
          this.schoolFlag = false
          return false
        }
      }
      wx.showToast({
        icon: 'none',
        title: '没找到该学校，请重新输入'
      })
    },
    //  开始匹配
    startMatch () {
      //  先执行动画
      this.loadingFlag = true
      this.move = true
      this.num = 1
      this.timer = setInterval(() => {
        this.num++
        if (this.num === 10) {
          clearInterval(this.timer)
          this.num = 10
        }
      }, 500)
      //  去掉标题
      this.title = ''
    },
    //  查看结果
    seeResult () {
      wx.request({
        method: 'POST',
        url: 'https://api.myoffer.cn/svc/mo-eva/immortal/submit',
        dataType: 'json',
        data: {
          redirect: 'applet',
          score: this.score,
          country: this.countryCode
        },
        success: (res) => {
          const result = res.data
          if (result.code === 0) {
            const ifPhoneExist = wx.getStorageSync('ifGetPhone')
            console.log(ifPhoneExist)
            if (ifPhoneExist) {
              wx.navigateTo({
                url: '/pages/match/main?id=' + result.result.id
              })
            } else {
              wx.navigateTo({
                url: '/pages/authorization/main?id=' + result.result.id + '&from=senior'
              })
            }
          }
        }
      })
    },
    //  获取国家
    fecthCountry () {
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/country-items',
        dataType: 'json',
        success: (res) => {
          const result = res.data
          this.countryArr = result.result
          wx.hideLoading()
        }

      })
    },
    //  获取学校
    fetchSchool () {
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/university-items',
        dataType: 'json',
        success: (res) => {
          const result = res.data
          this.schools = result.result.items
        }
      })
    },
    //  获取专业
    fetchMajor () {
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/subject-items',
        dataType: 'json',
        success: (res) => {
          const result = res.data
          if (result.code === 0) {
            this.majors = result.result
          }
        }
      })
    }
  },
  onShow () {
    this.schoolFlag = false
    this.name = ''
    this.isCountryEmpty = true
    this.country = '请选择意向国家'
    this.school = '请输入在读或毕业院校'
    this.schoolPicker = ''
    this.isMajorEmpty = true
    this.major = '请选择就读专业'
    this.score = ''
    this.loadingFlag = false
    this.num = 1
  },
  mounted () {
    wx.showLoading({
      title: '加载中...'
    })
    this.fecthCountry()
    this.fetchSchool()
    this.fetchMajor()
  }
}
</script>
<style lang="less">
.senior{
  position: relative;
  padding-top: 40rpx;
  padding-bottom: 80rpx;
  height: 100vh;
  background: url("https://img.myoffer.cn/wxxcx/bg.jpg") no-repeat left top;
  overflow: scroll;
}
.senior.loading{
  height: 100vh;
  box-sizing: border-box;
  background: url("https://img.myoffer.cn/wxxcx/bg_loading.jpg") no-repeat left top;
  background-size: 100% 100%;
  overflow: visible;
  .loading-info{
    position: absolute;
    left: 0;
    top: 284rpx;
    width: 100%;
    text-align: center;
    font-size: 36rpx;
    color: #4df4fc;
    font-weight: 600;
  }
  .btn-result{
    position: absolute;
    left: 50%;
    bottom: 84rpx;
    display: block;
    padding: 0;
    width: 456rpx;
    height: 100rpx;
    line-height: 100rpx;
    border: 1px solid #4df4fc;
    border-radius: 10rpx;
    background-color: transparent;
    font-size: 28rpx;
    color: #4df4fc;
    transform: translateX(-50%);
  }
  ul{
    padding-top: 265rpx;
    margin: 0 auto 0;
    width: 5.333333rem;
    transition: all 3s linear;
    li{
      text-align: center;
      opacity: 0.5;
      transition: all 0.5s linear;
      font-size: 30rpx;
      color: #4df4fc;
      span{
        font-weight: 600;
      }
    }
    li.active{
      opacity: 1;
      font-size: 40rpx;
    }
  }
  ul.move-list{
    transform: translateY(-2.666667rem);
  }
}
.senior-content{
  margin: 0 auto;
  padding-bottom: 88rpx;
  width: 670rpx;
  background-color: #fff;
  border-radius: 10rpx;
  button{
    display: block;
    margin: 120rpx auto 0;
    width: 456rpx;
    height: 100rpx;
    line-height: 100rpx;
    color: #fff;
    background-color: #36BDD2;
    border: none;
    border-radius: 10rpx;
    font-size: 28rpx;
  }
  button[disabled="disabled"]{
    border: none;
    color: #bfbfbf;
    background-color: #e6e6e6;
  }
}
.senior-content__item{
  padding: 40rpx;
  border-bottom: 1px dashed #e6e6e6;
  h4{
    margin-bottom: 40rpx;
    font-size: 30rpx;
    color: #393939;
  }
  input, .div-input{
    display: block;
    padding-left: 20rpx;
    height: 84rpx;
    line-height: 84rpx;
    border: 1px solid #e6e6e6;
    border-radius: 10rpx;
    font-size: 30rpx;
  }
  .senior-content__item--input{
    padding-left: 20rpx;
    height: 84rpx;
    line-height: 84rpx;
    border: 1px solid #e6e6e6;
    border-radius: 10rpx;
    font-size: 30rpx;
  }
  .no-text{
    color: #bfbfbf;
  }
}
.school{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vh;
  height: 100vh;
  background-color: #fff;
  input{
    display: block;
    padding-left: 40rpx;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    border: none;
    font-size: 30rpx;
    background-color: transparent;
  }
  button {
    position: absolute;
    top: 20rpx;
    left: 572rpx;
    z-index: 999;
    width: 140rpx;
    height: 60rpx;
    font-size: 28rpx;
    line-height: 60rpx;
    color: #fff;
    background-color: #36bdd2;
    border: none;
    border-radius: 10rpx;
  }
  .school-input{
    position: relative;
    height: 100rpx;
    line-height: 100rpx;
    border-bottom:1px solid #e6e6e6;
  }
  ul{
    height: 1120rpx;
    overflow: scroll;
    li{
      padding-left: 40rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-bottom: 1px solid #e6e6e6;
      font-size: 30rpx;
      color: #393939;
    }
  }
}
/* 3D */
.loading-3d{
  height: 500rpx;
  margin-top: 0rpx;
  position: relative;
  perspective: 1560rpx;
  transform-style: preserve-3d;
  .rot{
    position: absolute;
    left: 50%;
    transform-style: preserve-3d;
    transform-origin: left;
    font-size: 28rpx;
    animation: rotY 0s linear infinite;
  }
  .key{
    min-width: 100rpx;
    animation: rotY 0s linear infinite;
    animation-direction: reverse;
    transform-origin: center;
    text-align: center;
  }
  .strong{
    font-weight: 600;
    color: #4df4fc;
  }
  .near{
    color: #0097ab;
    font-size: 20rpx;
  }
  .far{
    color: #006897;
    font-size: 20rpx;
  }
  .rot:nth-child(1) {
      margin-top: 80rpx;
  }
  .rot:nth-child(1) .key {
      margin-left: 8rpx;
  }
  .rot:nth-child(1), .rot:nth-child(1) .key {
      animation-duration: 7s;
      animation-delay: -2.28s;
  }

  .rot:nth-child(2) {
      margin-top: 120rpx;
  }
  .rot:nth-child(2) .key {
      margin-left: 160rpx;
  }
  .rot:nth-child(2), .rot:nth-child(2) .key {
      animation-duration: 6s;
      animation-delay: -5.28s;
  }

  .rot:nth-child(3) {
    margin-top: 160rpx;
  }
  .rot:nth-child(3) .key {
    margin-left: 60rpx;
  }
  .rot:nth-child(3), .rot:nth-child(3) .key {
      animation-duration: 3s;
      animation-delay: -6.72s;
  }

  .rot:nth-child(4) {
    margin-top: 190rpx;
  }
  .rot:nth-child(4) .key {
    margin-left: 200rpx;
  }
  .rot:nth-child(4), .rot:nth-child(4) .key {
    animation-duration: 5s;
    animation-delay: -6.72s;
  }

  .rot:nth-child(5) {
      margin-top: 150rpx;
  }
  .rot:nth-child(5) .key {
      margin-left: 75rpx;
  }
  .rot:nth-child(5), .rot:nth-child(5) .key {
      animation-duration: 10s;
      animation-delay: -4.16s;
  }

  .rot:nth-child(6) {
    margin-top: 180rpx;
  }
  .rot:nth-child(6) .key {
    margin-left: 260rpx;
  }
  .rot:nth-child(6), .rot:nth-child(6) .key {
    animation-duration: 8s;
    animation-delay: -7.21s;
  }

  .rot:nth-child(7) {
      margin-top: 200rpx;
  }
  .rot:nth-child(7) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(7), .rot:nth-child(7) .key {
    animation-duration: 8s;
    animation-delay: -5.95s;
  }

  .rot:nth-child(8) {
      margin-top: 224rpx;
  }
  .rot:nth-child(8) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(8), .rot:nth-child(8) .key {
    animation-duration: 8s;
    animation-delay: -8.86s;
  }

  .rot:nth-child(9) {
      margin-top: 240rpx;
  }
  .rot:nth-child(9) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(9), .rot:nth-child(9) .key {
    animation-duration: 8s;
    animation-delay: -2.32s;
  }

  .rot:nth-child(10) {
      margin-top: 240rpx;
  }
  .rot:nth-child(10) .key {
      margin-left: 112rpx;
  }
  .rot:nth-child(10), .rot:nth-child(10) .key {
    animation-duration: 10s;
    animation-delay: -2.7s;
  }

  .rot:nth-child(11) {
      margin-top: 265rpx;
  }
  .rot:nth-child(11) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(11), .rot:nth-child(11) .key {
    animation-duration: 8s;
    animation-delay: -5.12s;
  }

  .rot:nth-child(12) {
      margin-top: 284rpx;
  }
  .rot:nth-child(12) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(12), .rot:nth-child(12) .key {
    animation-duration: 8s;
    animation-delay: -0.65s;
  }

  .rot:nth-child(13) {
      margin-top: 300rpx;
  }
  .rot:nth-child(13) .key {
      margin-left: 75rpx;
  }
  .rot:nth-child(13), .rot:nth-child(13) .key {
    animation-duration: 8s;
    animation-delay: -6.42s;
  }

  .rot:nth-child(14) {
      margin-top: 318rpx;
  }
  .rot:nth-child(14) .key {
      margin-left: 112rpx;
  }
  .rot:nth-child(14), .rot:nth-child(14) .key {
    animation-duration: 8s;
    animation-delay: -3.65s;
  }

  .rot:nth-child(15) {
      margin-top: 332rpx;
  }
  .rot:nth-child(15) .key {
      margin-left: 30rpx;
  }
  .rot:nth-child(15), .rot:nth-child(15) .key {
    animation-duration: 8s;
    animation-delay: -8.65s;
  }

  .rot:nth-child(16) {
      margin-top: 374rpx;
  }
  .rot:nth-child(16) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(16), .rot:nth-child(16) .key {
    animation-duration: 8s;
    animation-delay: -7.42s;
  }

  .rot:nth-child(17) {
      margin-top: 392rpx;
  }
  .rot:nth-child(17) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(17), .rot:nth-child(17) .key {
    animation-duration: 8s;
    animation-delay: -4.57s;
  }

  .rot:nth-child(18) {
      margin-top: 392rpx;
  }
  .rot:nth-child(18) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(18), .rot:nth-child(18) .key {
    animation-duration: 8s;
    animation-delay: -2.76s;
  }

  .rot:nth-child(19) {
      margin-top: 410rpx;
  }
  .rot:nth-child(19) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(19), .rot:nth-child(19) .key {
    animation-duration: 8s;
    animation-delay: -6.41s;
  }

  .rot:nth-child(20) {
      margin-top: 448rpx;
  }
  .rot:nth-child(20) .key {
      margin-left: 175rpx;
  }
  .rot:nth-child(20), .rot:nth-child(20) .key {
    animation-duration: 8s;
    animation-delay: -3.65s;
  }

  .rot:nth-child(21) {
      margin-top: 430rpx;
  }
  .rot:nth-child(21) .key {
      margin-left: 258rpx;
  }
  .rot:nth-child(21), .rot:nth-child(21) .key {
    animation-duration: 8s;
    animation-delay: -0.65s;
  }
}
@keyframes rotY{
  to {
    transform: rotateY(1turn);
  }
}
</style>
