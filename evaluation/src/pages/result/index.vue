<template>
  <div class="result" :class="{'full':shareFlag}">
		<div class="result-card">
			<h6>结果分析</h6>
			<div class="result-card__top">
				<h4 v-if="fromWho === 'primary'">{{ country }}</h4>
				<h4 v-else>{{ name_m }}</h4>
			</div>
			<div class="result-card__bottom">
				<div class="result-card__bottom-primary" v-if="fromWho==='primary'">
					<h4>{{ name }}</h4>
					<div class="result-card__bottom-scroll">
						<h6></h6>
						<p>{{ introduction }}</p>
					</div>
				</div>
				<div class="result-card__bottom-middle" v-else>
					<h4>{{ category }}</h4>
					<div class="result-card__bottom-scroll">
						<h6 class="icon-feature"></h6>
						<p>{{ feature }}</p>
						<h6 class="icon-subject"></h6>
						<p>{{ subject }}</p>
						<h6 class="icon-introduction"></h6>
						<p>{{ introduction_m }}</p>
					</div>
				</div>
			</div>
			<img v-if="fromWho === 'primary'" class="result-card__pic" :src="postUrl">
			<img v-else class="result-card__pic" :src="postUrl_m">
		</div>
    <University :universities="universities"></University>
    <Share @share="showShare"></Share>
    <div class="shareMask" v-show="shareFlag" @click="shareFlag=false">
      <canvas canvas-id="shareCanvas"></canvas>
    </div>
	</div>
</template>
<script>
import University from '../../components/university'
import Share from '../../components/share'
export default {
  components: {
    University,
    Share
  },
  data () {
    return {
      //  canvas用
      postUrlCanvas: '',
      avatarUrlCanvas: '',
      width: 0,
      avatarUrl: '',
      nickName: '',
      shareFlag: false,
      id: '',
      fromWho: 'primary',
      // 菜鸟结果
      postUrl: '',
      country: '',
      name: '',
      introduction: '',
      universities: [],
      // 高手结果
      postUrl_m: '',
      name_m: '',
      category: '',
      feature: '',
      subject: '',
      introduction_m: ''
    }
  },
  methods: {
    getResult () {
      // 菜鸟结果
      if (this.fromWho === 'primary') {
        this.fetchPrimary()
      }
      // 高手结果
      if (this.fromWho === 'middle') {
        this.fetchMiddle()
      }
    },
    // 点击分享触发
    showShare () {
      let _this = this
      wx.showLoading({
        title: '图片生成中...'
      })
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success () {
                _this.drawShare(_this.postUrlCanvas)
                _this.shareFlag = true
              },
              fail () {
                wx.hideLoading()
                wx.showToast({
                  icon: 'none',
                  title: '功能未开启，无法保存图片'
                })
              }
            })
          } else {
            _this.drawShare(_this.postUrlCanvas)
            _this.shareFlag = true
          }
        }
      })
    },
    drawShare (postUrl) {
      const _this = this
      const cWidth = this.width * 0.8
      const cHeight = this.width * 0.8 * 1.778
      wx.getImageInfo({
        src: 'https://img.myoffer.cn/wxxcx/bg_code.jpg?v=1',
        success (res) {
          const ctx = wx.createCanvasContext('shareCanvas')
          //  底图
          ctx.drawImage(res.path, 0, 0, cWidth, cHeight)
          //  照片
          ctx.drawImage(postUrl, 106 * cWidth / 375, 122 * cHeight / 667, 163 * cWidth / 375, 122 * cHeight / 667)
          //  详情
          if (_this.fromWho === 'primary') {
            //  描述
            ctx.setTextAlign('center')
            ctx.setFillStyle('#4df4fc')
            ctx.setFontSize(16)
            ctx.fillText(_this.country, cWidth / 2, 326 * cHeight / 667)
            ctx.setFontSize(12)
            ctx.fillText(_this.name, cWidth / 2, 353 * cHeight / 667)
            ctx.setTextAlign('left')
            ctx.setFontSize(18)
            ctx.fillText(_this.nickName, 82 * cWidth / 375, 50 * cHeight / 667)

            ctx.setTextAlign('left')
            ctx.setFontSize(12)
            ctx.fillText('描述', 44 * cWidth / 375, 379 * cHeight / 667)
            ctx.setFillStyle('#fff')
            let text = _this.introduction
            let chr = text.split('')
            let temp = ''
            let row = []
            for (let i = 0; i < chr.length; i++) {
              if (ctx.measureText(temp).width < 280 * cWidth / 375) {
                temp += chr[i]
              } else {
                i--
                row.push(temp)
                temp = ''
              }
            }
            row.push(temp)

            if (row.length > 6) {
              let rowCut = row.slice(0, 6)
              let rowEnd = rowCut[1]
              let text = ''
              for (let i = 0; i < rowEnd.length; i++) {
                if (ctx.measureText(text).width < 250 * cWidth / 375) {
                  text += rowEnd[i]
                } else {
                  break
                }
              }
              text = text + '...'
              rowCut.splice(5, 1, text)
              row = rowCut
            }
            for (let i = 0; i < row.length; i++) {
              ctx.fillText(row[i], 44 * cWidth / 375, 400 * cHeight / 667 + i * 20)
            }
          } else {
            //  描述
            ctx.setTextAlign('center')
            ctx.setFillStyle('#4df4fc')
            ctx.setFontSize(16)
            ctx.fillText(_this.name_m, cWidth / 2, 326 * cHeight / 667)
            ctx.setFontSize(12)
            ctx.fillText(_this.category, cWidth / 2, 353 * cHeight / 667)
            ctx.setTextAlign('left')
            ctx.setFontSize(18)
            ctx.fillText(_this.nickName, 82 * cWidth / 375, 50 * cHeight / 667)

            ctx.setTextAlign('left')
            ctx.setFontSize(12)
            ctx.fillText('特性', 44 * cWidth / 375, 379 * cHeight / 667)
            ctx.fillText('技能', 44 * cWidth / 375, 425 * cHeight / 667)
            ctx.fillText('个性', 44 * cWidth / 375, 471 * cHeight / 667)
            ctx.setFillStyle('#fff')
            ctx.fillText(_this.feature, 44 * cWidth / 375, 400 * cHeight / 667)
            ctx.fillText(_this.subject, 44 * cWidth / 375, 446 * cHeight / 667)

            let text = _this.introduction_m
            let chr = text.split('')
            let temp = ''
            let row = []
            for (let i = 0; i < chr.length; i++) {
              if (ctx.measureText(temp).width < 280 * cWidth / 375) {
                temp += chr[i]
              } else {
                i--
                row.push(temp)
                temp = ''
              }
            }
            row.push(temp)

            if (row.length > 2) {
              let rowCut = row.slice(0, 2)
              let rowEnd = rowCut[1]
              let text = ''
              for (let i = 0; i < rowEnd.length; i++) {
                if (ctx.measureText(text).width < 250 * cWidth / 375) {
                  text += rowEnd[i]
                } else {
                  break
                }
              }
              text = text + '...'
              rowCut.splice(1, 1, text)
              row = rowCut
            }

            for (let i = 0; i < row.length; i++) {
              ctx.fillText(row[i], 44 * cWidth / 375, 492 * cHeight / 667 + i * 20)
            }
          }

          //  头像
          ctx.arc(44 * cWidth / 375, 44 * cHeight / 667, 24 * cWidth / 375, 0, 2 * Math.PI)
          ctx.clip()
          ctx.drawImage(_this.avatarUrlCanvas, 20 * cWidth / 375, 20 * cHeight / 667, 48 * cWidth / 375, 48 * cWidth / 375)
          ctx.restore()
          ctx.draw()

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
          wx.hideLoading()
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    fetchPrimary () {
      let _this = this
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/rookie/result/' + this.id,
        dataType: 'json',
        success: (res) => {
          const result = res.data
          this.postUrl = result.result.postUrl
          this.country = result.result.country
          this.name = result.result.name
          this.introduction = result.result.introduction
          this.universities = result.result.universities
          wx.downloadFile({
            url: result.result.postUrl,
            success (resp) {
              _this.postUrlCanvas = resp.tempFilePath
            }
          })
          wx.hideLoading()
        }
      })
    },
    fetchMiddle () {
      let _this = this
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/master/result/' + this.id,
        dataType: 'json',
        success: (res) => {
          const result = res.data
          this.postUrl_m = result.result.postUrl
          this.name_m = result.result.name
          this.category = result.result.category
          this.feature = result.result.feature
          this.subject = result.result.subject.join('、')
          this.introduction_m = result.result.introduction
          this.universities = result.result.universities
          wx.downloadFile({
            url: result.result.postUrl,
            success (resp) {
              _this.postUrlCanvas = resp.tempFilePath
            }
          })
          wx.hideLoading()
        }
      })
    }
  },
  onShow () {
    this.shareFlag = false
    let _this = this

    wx.getSystemInfo({
      success (res) {
        _this.width = res.windowWidth
      }
    })
    wx.getUserInfo({
      success (res) {
        _this.avatarUrl = res.userInfo.avatarUrl
        _this.nickName = res.userInfo.nickName
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success (resp) {
            _this.avatarUrlCanvas = resp.tempFilePath
          },
          fail (err) {
            console.log(err)
          }
        })
      }
    })
  },
  onLoad (e) {
    this.fromWho = e.from
    this.id = e.id
  },
  mounted () {
    wx.showLoading({
      title: '匹配中...'
    })
    this.getResult()
  }
}
</script>
<style lang="less">
.result{
  box-sizing: border-box;
  padding-top: 68rpx;
  padding-bottom: 84rpx;
  height: 100vh;
  background: url("https://img.myoffer.cn/wxxcx/bg.jpg") no-repeat left top;
  background-size: cover;
  overflow: scroll;
}
.result-card{
  position: relative;
  margin: 0 auto 80rpx;
  width: 704rpx;
  height: 1120rpx;
  background: url("https://img.myoffer.cn/wxxcx/result_card.png") no-repeat left top;
  background-size: cover;
  z-index: 100;
  h6{
    padding-left: 118rpx;
    padding-top: 8rpx;
    font-size: 20rpx;
    color: #4DF4FC;
  }
}
.result-card__top{
  position: absolute;
  left: -24rpx;
  top: 94rpx;
  width: 750rpx;
  height: 492rpx;
  background: url("https://img.myoffer.cn/wxxcx/card_top.png") no-repeat left top;
  background-size: cover;
  z-index: 999;
  h4{
    padding-top: 12rpx;
    text-align: center;
    color: #4df4fc;
    font-size: 30rpx;
  }
}
.result-card__bottom{
  position: absolute;
  top: 630rpx;
  left: 70rpx;
  width: 560rpx;
  h4{
    height: 32rpx;
    margin-bottom: 34rpx;
    font-size: 28rpx;
    color: #fff;
  }
  h6{
    margin-bottom: 22rpx;
    width: 116rpx;
    height: 50rpx;
  }
  p{
    margin-bottom: 30rpx;
    min-height: 50rpx;
    line-height: 50rpx;
    text-align: justify;
    color: #fff;
    font-size: 24rpx;
    word-wrap: break-word;
  }
  .result-card__bottom-primary{
    h6{
      background: url("https://img.myoffer.cn/wxxcx/low_label.png") no-repeat left top;
      background-size: contain;
    }
  }
  .result-card__bottom-middle{
    .icon-feature{
      background: url("https://img.myoffer.cn/wxxcx/icon_feature.png") no-repeat left top;
      background-size: contain;
    }
    .icon-subject{
      background: url("https://img.myoffer.cn/wxxcx/icon_subject.png") no-repeat left top;
      background-size: contain;
    }
    .icon-introduction{
      background: url("https://img.myoffer.cn/wxxcx/icon_introduction.png") no-repeat left top;
      background-size: contain;
    }
  }
}
.result-card__bottom-scroll{
  height: 340rpx;
  margin-bottom: -30rpx;
  overflow: scroll;
}
.result-card__pic{
  display: block;
  position: absolute;
  top: 126rpx;
  left: 48rpx;
  width: 602rpx;
  height: 460rpx;
  z-index: 99;
}
.shareMask{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.9);
  z-index: 999;
  canvas{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600rpx;
    //width: 300px;
    height: 1067rpx;
    //height: 534px;
    transform: translate(-50%,-50%);
  }
}
</style>
