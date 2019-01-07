<template>
  <div class="school">
    <div class="school__input">
      <input placeholder-style="color: #bfbfbf;" class="school__input--item" type="text" v-model="schoolPicker" @input="onSchoolChange" placeholder="请输入在读或毕业院校">
      <button
        v-show="schoolPicker.length > 0"
        class="school__btn"
        @click="saveSchool"
      >保存</button>
    </div>
    <ul class="school__list" v-if="schoolListFlag">
      <li
        class="school__list--item"
        v-for="(item,index) in schoolsArr" :key="index" @click="chooseSchool(item)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {

  },
  data () {
    return {
      schoolListFlag: false,
      schoolPicker: '',
      schools: [],
      schoolsArr: []
    }
  },
  mounted () {
    this.fetchSchool()
  },
  methods: {
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
    chooseSchool (school) {
      this.schoolListFlag = false
      this.schoolPicker = school
    },
    saveSchool () {
      //  判定下输入的学校是否在索引内
      for (let i = 0; i < this.schools.length; i++) {
        if (this.schoolPicker === this.schools[i]) {
          this.$store.dispatch('setSchoolDisplay', this.schoolPicker)
          wx.navigateBack({delta: 1})
          return false
        }
      }
      wx.showToast({
        icon: 'none',
        title: '没找到该学校，请重新输入'
      })
    },
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
    }
  }
}
</script>
<style lang="less">
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
    height: 40px;
    line-height: 40px;
    border: none;
    font-size: 16px;
    background-color: transparent;
  }

  .school__input{
    position: relative;
    width: 100%;
    padding: 15px 20px;
    line-height: 40px;

    .school__input--item {
      box-sizing: border-box;
      display: block;
      width: 335px;
      color: #333;
      box-shadow: inset 0 1px 4px 0 rgba(60,167,252,0.75);
      border-radius: 5px;
    }
  }

  .school__btn {
    position: absolute;
    top: 20px;
    left: 290px;
    z-index: 999;
    width: 60px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #fff;
    background-color: #05cbf9;
    border: none;
  }

  .school__list {
    height: 1120rpx;
    overflow: scroll;
  }

  .school__list--item{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 16px;
    color: #393939;
  }
}
</style>
