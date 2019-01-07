<template>
  <web-view :src="url"></web-view>
</template>
<script>
  export default {
    data () {
      return {
        url: ''
      }
    },
    onLoad (options) {
      var signUrl = ''
      if (process.env.NODE_ENV === 'production') {
        signUrl = 'https://www.myoffer.cn/statics/contract/sign.html'
      } else {
        signUrl = 'https://www.myofferdemo.com/statics/contract/sign.html'
      }
      signUrl += '?no=' + options.no
      signUrl += '&user_code=' + options.user_code
      signUrl += '&sign_type=' + options.sign_type
      signUrl += '&sign_val=' + options.sign_val
      signUrl += '&zqid=' + options.zqid
      signUrl += '&notify_url=' + options.notify_url
      signUrl += '&return_url=' + options.return_url
      signUrl += '&url=' + options.url
      this.url = signUrl
    }
  }
</script>
