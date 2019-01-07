<template>
  <div class="paper">
    <canvas canvas-id="shareCanvas" class="paper-img"></canvas>
    <button v-if="closeFlag" class="paper-btn__save" @click="saveImage">保存海报到相册</button>
    <button v-if="closeFlag" class="paper-close" @click="closeModal"></button>
  </div>
</template>
<script>
import api from '@/assets/js/api'
export default {
  props: ['shareWho'],
  data () {
    return {
      closeFlag: false,
      width: 0,
      avatarUrlCanvas: '',
      qrcode: ''
    }
  },
  onLoad (e) {
    this.id = e.id
    wx.getSystemInfo({
      success: res => {
        this.width = res.windowWidth
      }
    })
  },
  mounted () {
    this.draw()
  },
  methods: {
    closeModal () {
      this.$emit('closeAllModal')
    },
    saveImage () {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                wx.canvasToTempFilePath({
                  canvasId: 'shareCanvas',
                  success (res) {
                    wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success () {
                        wx.showToast({
                          title: '已保存到相册'
                        })
                      },
                      fail () {
                        wx.showToast({
                          icon: 'none',
                          title: '保存图片失败'
                        })
                      }
                    })
                  },
                  fail (err) {
                    console.log(err)
                  }
                }, this)
              },
              fail: (err) => {
                console.log(err)
                wx.showToast({
                  icon: 'none',
                  title: '功能未开启，无法保存图片'
                })
              }
            })
          } else {
            wx.canvasToTempFilePath({
              canvasId: 'shareCanvas',
              width: this.width * 0.768 * 2,
              height: this.width * 0.768 * 1.762 * 2,
              destWidth: this.width * 0.768 * 4,
              destHeight: this.width * 0.768 * 1.762 * 4,
              fileType: 'jpg',
              quality: 1,
              success (res) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success () {
                    wx.showToast({
                      title: '已保存到相册'
                    })
                  },
                  fail () {
                    wx.showToast({
                      icon: 'none',
                      title: '保存图片失败'
                    })
                  }
                })
              },
              fail (err) {
                console.log(err)
              }
            }, this)
          }
        }
      })
    },
    draw () {
      wx.showLoading({title: '海报生成中...'})
      if (this.shareWho === 'personal') {
        this.drawPersonal()
      }
      if (this.shareWho === 'school') {
        this.drawSchool()
      }
      if (this.shareWho === 'main') {
        this.drawMain()
      }
    },
    drawMain () {
      api.wxCode().then(res => {
        const cWidth = this.width * 0.768
        const cHeight = this.width * 0.768 * 1.762
        const backgroundPromise = api.getImageInfo('https://img.myoffer.cn/wxxcx/20190101/share-main-new.jpg')
        const avatarPromise = api.getImageInfo(this.$store.state.selfInRank.avatarUrls)
        const qrcodePromise = api.getImageInfo(res.result.url)

        Promise.all([backgroundPromise, avatarPromise, qrcodePromise]).then(([background, avatar, qrcode]) => {
          const ctx = wx.createCanvasContext('shareCanvas')
          // 底图
          ctx.drawImage(background.path, 0, 0, cWidth * 1, cHeight * 1)
          // 二维码
          ctx.drawImage(qrcode.path, 570 * cWidth / 750 * 1, 1148 * cHeight / 1334 * 1, 133 * cWidth / 750 * 1, 133 * cHeight / 1334 * 1)
          // 名字
          ctx.setFillStyle('#05cbf9')
          ctx.setFontSize(13 * 1)
          ctx.fillText(this.$store.state.selfInRank.nickName, 156 * cWidth / 750 * 1, 1200 * cHeight / 1334 * 1)
          // 头像
          ctx.arc(103 * cWidth / 750 * 1, 1188 * cHeight / 1334 * 1, 44 * cWidth / 750 * 1, 0, 2 * Math.PI)
          ctx.clip()
          ctx.drawImage(avatar.path, 57 * cWidth / 750 * 1, 1144 * cHeight / 1334 * 1, 88 * cWidth / 750 * 1, 88 * cHeight / 1334 * 1)
          ctx.restore()
          ctx.draw()
          wx.hideLoading()
          this.closeFlag = true
        })
      })
    },
    drawPersonal () {
      api.wxCode().then(res => {
        const cWidth = this.width * 0.768
        const cHeight = this.width * 0.768 * 1.762
        const backgroundPromise = api.getImageInfo('https://img.myoffer.cn/wxxcx/20190101/share-personal-new.jpg')
        const avatarPromise = api.getImageInfo(this.$store.state.selfInRank.avatarUrls)
        const qrcodePromise = api.getImageInfo(res.result.url)
        Promise.all([backgroundPromise, avatarPromise, qrcodePromise]).then(([background, avatar, qrcode]) => {
          const ctx = wx.createCanvasContext('shareCanvas')
          // 底图
          ctx.drawImage(background.path, 0, 0, cWidth, cHeight)
          // 二维码
          ctx.drawImage(qrcode.path, 556 * cWidth / 750, 1126 * cHeight / 1334, 154 * cWidth / 750, 154 * cHeight / 1334)
          // 名字
          ctx.setFillStyle('#05cbf9')
          ctx.setFontSize(12)
          ctx.fillText(this.$store.state.selfInRank.nickName, 152 * cWidth / 750, 1153 * cHeight / 1334)
          // 头像
          ctx.arc(98 * cWidth / 750, 1157 * cHeight / 1334, 40 * cWidth / 750, 0, 2 * Math.PI)
          ctx.clip()
          ctx.drawImage(avatar.path, 58 * cWidth / 750, 1116 * cHeight / 1334, 80 * cWidth / 750, 80 * cHeight / 1334)
          ctx.restore()
          ctx.draw()
          wx.hideLoading()
          this.closeFlag = true
        })
      })
    },
    drawSchool () {
      api.wxCode().then(res => {
        const cWidth = this.width * 0.768
        const cHeight = this.width * 0.768 * 1.762
        const backgroundPromise = api.getImageInfo('https://img.myoffer.cn/wxxcx/20190101/share-school-new.jpg')
        const avatarPromise = api.getImageInfo(this.$store.state.selfInRank.avatarUrls)
        const qrcodePromise = api.getImageInfo(res.result.url)
        Promise.all([backgroundPromise, avatarPromise, qrcodePromise]).then(([background, avatar, qrcode]) => {
          const ctx = wx.createCanvasContext('shareCanvas')
          // 底图
          ctx.drawImage(background.path, 0, 0, cWidth, cHeight)
          // 二维码
          ctx.drawImage(qrcode.path, 556 * cWidth / 750, 1126 * cHeight / 1334, 154 * cWidth / 750, 154 * cHeight / 1334)
          // 名字
          ctx.setFillStyle('#05cbf9')
          ctx.setFontSize(12)
          ctx.fillText(this.$store.state.selfInRank.nickName, 152 * cWidth / 750, 1153 * cHeight / 1334)
          // 头像
          ctx.arc(98 * cWidth / 750, 1157 * cHeight / 1334, 40 * cWidth / 750, 0, 2 * Math.PI)
          ctx.clip()
          ctx.drawImage(avatar.path, 58 * cWidth / 750, 1116 * cHeight / 1334, 80 * cWidth / 750, 80 * cHeight / 1334)
          ctx.restore()
          ctx.draw()
          wx.hideLoading()
          this.closeFlag = true
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.paper {
  position: relative;

  .paper-img {
    position: relative;
    width: 288px;
    height: 509px;
    margin: 0 auto 20px;
    z-index: -1;
  }

  .paper-btn__save {
    width: 288px;
    height: 37px;
    margin: 0 auto 14px;
    font-size: 16px;
    line-height: 37px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 67px;
  }

  .paper-close {
    position: absolute;
    top: -14px;
    right: 16px;
    width: 25px;
    height: 25px;
    background: url("https://img.myoffer.cn/wxxcx/20190101/mask-close.png") no-repeat left top;
    background-size: 100% 100%;
    z-index: 2;
  }
}
</style>
