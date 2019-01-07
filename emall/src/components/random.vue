<template>
  <b class="num">{{ num }}</b>
</template>
<script>
  export default {
    computed: {
      num () {
        return Math.floor(Math.random() * 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
.num {
  display: inline-block;
  font-size: 14px;
  color: #131313;
  vertical-align: top;
}
</style>

