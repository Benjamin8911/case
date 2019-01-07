<template>
  <div class="loading">
		<div class="loading-result">
			<div class="loading-result__circle">
				<img v-if="headUrl==''" :src="avatarUrl"><img v-else :src="headUrl">
				<button class="btn-low" @click="seeRank('low')"></button>
				<button class="btn-middle" @click="seeRank('middle')"></button>
				<button class="btn-high" @click="seeRank('high')"></button>
			</div>
			<div class="loading-result__content">
				<div class="loading-result__content--title">
					<p>这一刻在<b>{{ rank.total }}名</b>成功申请的学生中战胜了<b>{{ rank.rate }}%</b></p>
					<p>No.<strong>{{ rank.rank }}</strong></p>
				</div>
				<div class="loading-result__content--text">
					<p v-for="(item,index) in info[level]" :key="index">{{ item }}</p>
				</div>
				<div class="loading-result__content--chart">
					<img src="https://img.myoffer.cn/wxxcx/chart.png">
				</div>
			</div>
			<Share @share="showShare"></Share>
		</div>
		<div class="rank-mask" v-show="rankFlag">
			<ul class="schools-list">
				<li v-for="(item,index) in rankList" :key="index">
					<div class="list-left"><img :src="item.logo"></div>
					<div class="list-right">
						<h4>{{ item.name }}</h4>
						<h6>{{ item.officialName }}</h6>
						<p>{{ item.country }}|{{ item.state }}</p>
						<div>本国排名： <strong>{{ item.localRank }}</strong></div>
					</div>
				</li>
			</ul>
			<button class="btn-close" @click="rankFlag=false"></button>
		</div>
    <div class="share-mask" v-show="shareFlag" @click="shareFlag=false">
      <canvas canvas-id="shareCanvas"></canvas>
    </div>
	</div>
</template>
<script>
import Share from '../../components/share'
export default {
  components: {
    Share
  },
  data () {
    return {
      width: 0,
      avatarUrl: '',
      avatarUrlCanvas: '',
      nickName: '',
      id: '',
      // 分享页标志
      shareFlag: false,
      // 排名页标志
      rankFlag: false,
      title: '测试结果',
      level: '',
      headUrl: '',
      rank: {
        rank: 5555,
        rate: 80,
        total: 6785
      },
      info: {
        low: [
          '匹配的结果没有你的dream school吗？不要灰心，看看是哪里的条件还没有达到，是在校成绩不够，还是雅思成绩待提高，这些都是可以通过努力来提高的，相信自己可以的，准备迈出留学这一步，你就已经超越了很多身边的人了，继续加油，向梦想中的学校迈进。',
          '过去的努力决定了今天的位置，今天的努力决定了你未来可以站在哪里，即使现在没有达到你理想中的目标，也不要灰心，认真准备，踏踏实实地努力，属于你的光明未来一定会到来'
        ],
        middle: [
          '经过大学期间的努力，你现在具备的成绩和条件已经可以申请到不错的国外院校了，这时候，不妨再努把力，让自己向更好的学校迈进，相信你，继续努力向前，能看见名校已经在向你招手了。',
          '成功没有你想象的那么难，名校并非遥不可及，你已经具备了不错的基础和条件，现在只需百尺竿头更进一步，继续努力，不逼自己一把，你都不知道自己有多优秀。'
        ],
        high: [
          '各方面都很优秀的你，在申请递出的那一刻，想必会引来各大名校的争抢，但此刻，你必须稳住，充实自己，沉下心来好好想一想，哪一所学校是自己真正的dream school，认真了解和分析学校的历史、师资力量、学术权威等等，相信你会做出最好的选择，成为最好的自己。',
          '从读书以来，相信你都是同学眼中的学霸、老师眼中的尖子、父母眼中的骄傲，经过了多年的不断努力学习，现在你的目光放在是世界级的名校，准备出国继续深造，海阔凭鱼跃，天高任鸟飞，属于你的时代即将到来。这时候，需要保持耐心，稳稳地完成留学申请，拿到自己梦想中的offer。'
        ]
      },
      schools: {
        low: [],
        middle: [],
        high: []
      },
      rankList: []
    }
  },
  methods: {
    //  查看各档位录取学校信息
    seeRank (level) {
      this.rankFlag = true
      this.rankList = this.schools[level]
    },
    //  点击分享触发
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
                _this.drawShare()
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
            _this.drawShare()
            _this.shareFlag = true
          }
        }
      })
    },
    drawShare () {
      let _this = this
      const cWidth = this.width * 0.8
      const cHeight = this.width * 0.8 * 1.778
      let shareImg = ''
      if (_this.level === 'low') {
        shareImg = 'https://img.myoffer.cn/wxxcx/bg_codesenior_low.jpg'
      }
      if (_this.level === 'middle') {
        shareImg = 'https://img.myoffer.cn/wxxcx/bg_codesenior_middle.jpg'
      }
      if (_this.level === 'high') {
        shareImg = 'https://img.myoffer.cn/wxxcx/bg_codesenior_high.jpg'
      }
      wx.getImageInfo({
        src: shareImg,
        success (res) {
          const ctx = wx.createCanvasContext('shareCanvas')
          // 底图
          ctx.drawImage(res.path, 0, 0, cWidth, cHeight)
          // 名字
          ctx.setFillStyle('#4df4fc')
          ctx.setFontSize(18)
          ctx.fillText(_this.nickName, 167 * cWidth / 375, 73 * cHeight / 667)
          //  查看你的测试报告
          ctx.setFillStyle('#fff')
          ctx.setFontSize(12)
          ctx.fillText('请查看你的测试报告', 167 * cWidth / 375, 100 * cHeight / 667)
          //  排行
          ctx.setFillStyle('#fff')
          ctx.setFontSize(14)
          ctx.fillText('这一刻在', 54 * cWidth / 375, 170 * cHeight / 667)
          ctx.setFillStyle('#4df4fc')
          ctx.fillText(_this.rank.total + '名', 130 * cWidth / 375, 170 * cHeight / 667)
          ctx.setFillStyle('#fff')
          ctx.fillText('成功申请的学生中', 190 * cWidth / 375, 170 * cHeight / 667)

          ctx.fillText('战胜了', 140 * cWidth / 375, 200 * cHeight / 667)
          ctx.setFillStyle('#4df4fc')
          ctx.fillText(_this.rank.rate + '%', 196 * cWidth / 375, 200 * cHeight / 667)

          ctx.setFillStyle('#fff')
          ctx.fillText('No.', 150 * cWidth / 375, 230 * cHeight / 667)
          ctx.setFillStyle('#4df4fc')
          ctx.fillText(_this.rank.rank, 184 * cWidth / 375, 230 * cHeight / 667)

          // 头像
          ctx.arc(79 * cWidth / 375, 76 * cHeight / 667, 35 * cWidth / 375, 0, 2 * Math.PI)
          ctx.clip()
          ctx.drawImage(_this.avatarUrlCanvas, 44 * cWidth / 375, 41 * cHeight / 667, 70 * cWidth / 375, 70 * cHeight / 667)
          ctx.restore()

          ctx.draw()
          wx.hideLoading()

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
        fail (err) {
          console.log(err)
        }
      })
    },
    fetchResult () {
      wx.request({
        method: 'GET',
        url: 'https://api.myoffer.cn/svc/mo-eva/immortal/result/' + this.id,
        dataType: 'json',
        success: (res) => {
          const result = res.data
          if (result.code === 0) {
            this.headUrl = result.result.avatarUrl
            this.level = result.result.level
            this.rank = result.result.rank
            this.schools.high = result.result.universities[0]
            this.schools.middle = result.result.universities[1]
            this.schools.low = result.result.universities[2]
            wx.hideLoading()
          }
        },
        fail () {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '服务器异常，请稍后再试'
          })
        }
      })
    }
  },
  onShow () {
    this.shareFlag = false
    this.rankFlag = false
  },
  onLoad (e) {
    let _this = this
    this.id = e.id
    wx.pageScrollTo({
      scrollTop: 0
    })
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
  mounted () {
    wx.showLoading({
      title: '加载中...'
    })
    this.fetchResult()
  }
}
</script>
<style lang="less">
.loading{
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  background: url("https://img.myoffer.cn/wxxcx/bg_loading.jpg") no-repeat left top;
  background-size: cover;
  overflow: scroll;
  .loading-result{
    padding-bottom: 84rpx;
    background: url("https://img.myoffer.cn/wxxcx/bg_result.jpg") no-repeat left top;
    background-size: cover;
  }
  .loading-result__circle{
    position: relative;
    height: 604rpx;
    background: url("https://img.myoffer.cn/wxxcx/result_circle.png") no-repeat left top;
    background-size: cover;
    img{
      position: absolute;
      left: 296rpx;
      top: 236rpx;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
    }
    button{
      position: absolute;
      width: 190rpx;
      height: 60rpx;
      border: none;
    }
    .btn-low{
      left: 74rpx;
      top: 84rpx;
      background: url("https://img.myoffer.cn/wxxcx/btn_low.png") no-repeat left top;
      background-size: cover;
    }
    .btn-middle{
      right: 60rpx;
      top: 114rpx;
      background: url("https://img.myoffer.cn/wxxcx/btn_middle.png") no-repeat left top;
      background-size: cover;
    }
    .btn-high{
      left: 328rpx;
      bottom: 54rpx;
      background: url("https://img.myoffer.cn/wxxcx/btn_high.png") no-repeat left top;
      background-size: cover;
    }
  }
  .loading-result__content{
    margin: 0 auto;
    width: 670rpx;
    .loading-result__content--title{
      margin-top: 8rpx;
      margin-bottom: 40rpx;
      p{
        margin-bottom: 24rpx;
        text-align: center;
        color: #fff;
        font-size: 36rpx;
        b,strong{
          display: inline;
          font-weight: bold;
          color: #4df4fc;
        }
        strong{
          font-size: 48rpx;
          font-weight: bold;
        }
      }
    }
    .loading-result__content--text{
      margin-bottom: 80rpx;
      font-size: 24rpx;
      color: #fff;
      p{
        margin-bottom: 40rpx;
        padding-left: 44rpx;
        line-height: 40rpx;
        background: url("https://img.myoffer.cn/wxxcx/info.png") no-repeat left 5rpx;
        background-size: 30rpx 30rpx;
      }
    }
    .loading-result__content--chart{
      margin-bottom: 94rpx;
      img{
        display: block;
        width: 100%;
      }
    }
  }
  .rank-mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
    .schools-list{
      margin: 200rpx auto 0;
      width: 670rpx;
      background-color: #fff;
      border-radius: 10rpx;
      overflow: hidden;
      li{
        padding: 20rpx 24rpx 20rpx 64rpx;
        display: flex;
        border-bottom: 1px solid #e6e6e6;
      }
      .list-left{
        margin-right: 34rpx;
        margin-top: 22rpx;
        img{
          display: block;
          width: 140rpx;
          height: 140rpx;
        }
      }
      .list-right{
        h4{
          font-size: 36rpx;
          color: #393939;
        }
        h6{
          font-size: 24rpx;
          color: #BFBFBF
        }
        p{
          font-size: 28rpx;
          color: #BFBFBF
        }
        div{
          font-size: 28rpx;
          color: #36BDD2;
        }
        strong {
          display: inline;
        }
      }
    }
    .btn-close{
      display: block;
      margin: 50rpx auto 0;
      width: 80rpx;
      height: 80rpx;
      border: none;
      background: url("https://img.myoffer.cn/wxxcx/btn_close.png") no-repeat left top;
      background-size: cover;
    }
  }
  .share-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
}
</style>

