<script>
export default {
  onLoad () {
    wx.authorize({
      scope: 'scope.userInfo'
    })
  },
  created () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showToast({
        title: '新的版本下载失败'
      })
    })
  }
}
</script>

<style>
view {
  box-sizing: border-box;
}
image {
  display: block;
  width: 100%;
}
button::after {
  border: none;
}
</style>
