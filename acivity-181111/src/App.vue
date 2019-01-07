<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.font10 {
  font-size: 10px;
  font-size: 20rpx;
}

.font12 {
  font-size: 12px;
  font-size: 24rpx;
}

.font13 {
  font-size: 26rpx;
  font-size: 13px;
}

.font26 {
  font-size: 26px;
  font-size: 52rpx;
}

.font22 {
  font-size: 22px;
  font-size: 44rpx;
  padding: 25rpx 0;
}

.font20 {
  font-size: 20px;
  font-size: 40rpx;
}


.color333 {
  color: #333;
}

.text-center {
  text-align: center;
}

.font-blod {
  font-weight: bold;
}

.mb15 {
  margin-bottom: 15px;
}

.absolute {
  position: absolute;
}
</style>
