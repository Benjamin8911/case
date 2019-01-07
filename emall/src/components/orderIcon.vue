<template>
  <section class="emall-icon__order" @click="goToOrderList"></section>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goToOrderList () {
      const jumpFlag = wx.getStorageSync('ifGetPhone')
      if (jumpFlag) {
        this.$emit('go-to-list')
      } else {
        wx.navigateTo({
          url: '/pages/authorization/main'
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.emall-icon__order {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 999;
  width: 60px;
  height: 60px;
  background: url("../assets/images/group.png") no-repeat left top;
  background-size: cover;
}
</style>
