<template>
  <section :class="{'hidden': maskFlag || picFlag}" class="commodity">
    <div id="commodity-nav" :class="{'scroll': scrollFlag}">
      <a :class="{'active':sku.country==='uk'}" @click="chooseCountry(sku.category[0], 'uk')">英国</a>
      <a :class="{'active':sku.country==='au'}" @click="chooseCountry(sku.category[0], 'au')">澳大利亚</a>
      <a :class="{'active':sku.country==='nzl'}" @click="chooseCountry(sku.category[0], 'nzl')">新西兰</a>
    </div>
    <div class="commodity-banner"><img :src="sku.app_cover_url"></div>
    <div class="commodity-info">
      <div class="commodity-info__card">
        <h2 class="card_title">{{ sku.name }}</h2>
        <div class="card_price">
          <span class="price__display">￥{{ sku.price }}</span>
          <span class="price__old">原价<b>￥{{ sku.display_price }}</b></span>
        </div>
        <div class="card_star">
          <span class="star__comment">累计评价 | {{ docsCount }}</span>
          <Star :score="sku.score" />
        </div>
      </div>
      <div class="commodity-info__select">
        <div
          v-for="(item,index) in secondClassify"
          :key="item._id"
          class="select__second"
        >
          <h4>{{ item.name }}</h4>
          <div class="select__tabs">
            <span
              v-for="(t,i) in item.values"
              :key="t._id"
              :class="{'active': pickedGroup[index]===t._id}"
              @click="chooseTab(t._id,index,i)">{{ t.name }}</span>
          </div>
        </div>
        <div class="select__meal">
          <h4>具体套餐</h4>
          <div class="select__tabs">
            <a
              v-for="item in skus_display"
              :key="item._id"
              :class="{'active': sku._id===item._id}"
              @click="chooseCommodity(item.short_id)"
            >
              {{ item.subtitle }}
            </a>
          </div>
          <div v-show="skus_display.length === 0">暂无套餐，请筛选其他分类</div>
        </div>
      </div>
    </div>
    <div class="commodity-format" @click="showFormat">
      <span>产品规格</span><b>产品参数<i class="dot"></i>消费者告知书</b>
    </div>
    <div class="commodity-activity">
      <image src="https://img.myoffer.cn/wxxcx/emall/WechatIMG348.png" @click="goToActivity" mode="widthFix" />
    </div>
    <div class="commodity-tabs">
      <div class="tabs__title">
        <div :class="{'active': tabNumber===1}" class="tabs__title--button" @click="tabNumber=1">产品描述</div>
        <div :class="{'active': tabNumber===2}" class="tabs__title--button" @click="tabNumber=2">服务流程</div>
        <div :class="{'active': tabNumber===3}" class="tabs__title--button" @click="tabNumber=3">费用详情</div>
        <div :class="{'active': tabNumber===4}" class="tabs__title--button" @click="tabNumber=4">用户评价</div>
      </div>
      <div class="tabs__content">
        <div v-show="tabNumber===1">
          <image v-for="item in sku.service_intro.m" :src="item" :key="item" mode="widthFix" />
        </div>
        <div v-show="tabNumber===2">
          <image v-for="item in sku.service_procedure.m" :src="item" :key="item" mode="widthFix" />
        </div>
        <div v-show="tabNumber===3">
          <image v-for="item in sku.service_fee.m" :src="item" :key="item" mode="widthFix" />
        </div>
        <div v-show="tabNumber===4" style="padding:0 24rpx;">
          <div v-for="item in docs" :key="item.id" class="tabs__content--box">
            <img class="box__icon" src="../../assets/images/icon_head.jpg">
            <div class="box__info">
              <h6>1***<random></random></h6>
              <div><Star :score="item.score" /></div>
              <p>{{ item.content }}</p>
              <div class="box__img">
                <image
                  v-for="(i, ind) in item.images"
                  :key="ind"
                  :src="i"
                  @click="showPic(item.images)"
                />
              </div>
              <div class="box__date">
                <span>{{ sku.name }}</span><span>{{ item.comment_time?item.comment_time.split('T')[0]:'' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commodity-footer">
      <button class="btn-contact" @click="goToContact">在线咨询</button>
      <button class="btn-pay" @click="goToBuy">购买</button>
    </div>
    <div v-show="maskFlag" class="commodity-mask">
      <div :class="{'flow': maskFlag}" class="mask-content">
        <h4><i class="lb"></i>商品参数</h4>
        <ul>
          <li v-for="item in sku.comment_attr" :key="item._id"><span>{{ item.key }}</span><b>{{ item.value }}</b></li>
        </ul>
        <h4><i class="lb"></i>消费者告知书</h4>
        <p>您好！为帮助您更好地选留学及签证相关商品，请您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。 请同意本告知书内容后再下单购买：
        1. 购买申请人必须符合中国公民自费出国留学的必备条件，未成年人须在家长的指导下完成在线留学商品的购买及支付流程；
        2. 在购买服务前，请您务必确认所购买的服务相关联信息与个人意愿相符；
        3. 购买签证服务商品后，发放签证或入境批准文件是申请人申请留学的前往国家或地区政府独立行使的权力，myOffer不承担责任；
        4. 如您需了解更多本网站服务条款详情，请见正式合同文件。</p>
        <div class="content-button" @click="closeFormat">完成</div>
      </div>
    </div>
    <div class="pic-mask" v-show="picFlag" @click.stop="picFlag = false">
      <swiper
        circular="true"
        indicator-dots="true"
        indicator-color="#989898"
        indicator-active-color="#05CBF9"
        class="swiper-container"
      >
        <swiper-item v-for="(item, index) in commentsImgs" :key="index">
          <image :src="item" mode="aspectFit" />
        </swiper-item>
      </swiper>
    </div>
    <div class="contact-mask" v-show="contactFlag">
      <div class="contact-mask__box">
        <div class="contact-mask__box--wx">【wxid_2ryy3ely5ath22】</div>
        <div class="contact-mask__box--info">了解更多服务详情<br>请复制微信号，添加微信小助手<br>在线为你答疑解惑~</div>
        <button  class="contact-mask__box--btn" @click="copyWx">复制微信号</button>
      </div>
    </div>
    <canvas id="canvas" style="position: absolute; top: -1000px; left: -1000px; width: 640px; height: 640px; background: #000" canvas-id="canvas"></canvas>
  </section>
</template>
<script>
  import api from '@/assets/js/api.js'
  import Star from '@/components/star.vue'
  import Random from '@/components/random.vue'
  export default {
    components: {
      Star,
      Random
    },
    data () {
      return {
        id: '',
        maskFlag: false,
        picFlag: false,
        scrollFlag: false,
        contactFlag: false,
        tabNumber: 1,
        docsCount: 0,
        docs: [],
        commentsImgs: [],
        imgUrl: '',
        secondClassify: {},
        sku: {
          service_fee: {
            m: []
          },
          service_intro: {
            m: []
          },
          service_procedure: {
            m: []
          }
        },
        skus: [],
        skus_display: [],
        group: [],
        pickedGroup: [],
        pickedNewGroup: []
      }
    },
    onLoad (e) {
      if (!wx.getStorageSync('userAuth')) {
        wx.redirectTo({
          url: '/pages/userinfo/main?id=' + e.id
        })
      }
      wx.showLoading({
        title: '加载中...'
      })
      this.tabNumber = 1
      this.fetchCommodityDetail(e.id)
    },
    onPageScroll (e) {
      if (e.scrollTop >= 50) {
        this.scrollFlag = true
      } else {
        this.scrollFlag = false
      }
    },
    onShareAppMessage () {
      return {
        title: this.sku.name,
        path: '/pages/sku/main?id=' + this.sku.short_id,
        imageUrl: this.sku.app_cover_url
      }
    },
    methods: {
      clipImageclipImage (src, imgW, imgH, cb) {
        let ctx = wx.createCanvasContext('canvas')
        let canvasW = 640
        let canvasH = imgH
        if (imgW / imgH > 5 / 4) {
          // 长宽比大于5:4
          canvasW = imgH * 5 / 4
        } else {
          canvasH = imgW * 4 / 5
        }
        // 将图片绘制到画布
        ctx.drawImage(src, (imgW - canvasW) / 2, 0, canvasW, canvasH, 0, 0, canvasW, canvasH)
        ctx.draw(false, () => {
          setTimeout(() => {
            wx.canvasToTempFilePath({
              width: canvasW,
              height: canvasH,
              destWidth: canvasW,
              destHeight: canvasH,
              canvasId: 'canvas',
              fileType: 'jpg',
              success: (res) => {
                typeof cb === 'function' && cb(res.tempFilePath)
              }
            })
          }, 1000)
        })
      },
      formatMoney (data) {
        data.price = (data.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        data.display_price = (data.display_price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return data
      },
      formatStr (arr) {
        arr.forEach(item => {
          item.subtitle = item.subtitle.length > 7 ? item.subtitle.slice(0, 7) + '...' : item.subtitle
        })
        return arr
      },
      fetchCommodityDetail (id) {
        api.fetchCommodityDetail(id).then(res => {
          this.secondClassify = res.result.secondClassify
          this.sku = this.formatMoney(res.result.sku)
          this.skus = res.result.skus
          this.skus_display = this.skus.filter((item) => {
            for (let i = 0; i < this.pickedNewGroup.length; i++) {
              if (item.group.indexOf(this.pickedNewGroup[i]) === -1) {
                return false
              }
            }
            return true
          })
          this.skus_display = this.formatStr(this.skus_display)
          this.fetchCommdityComment(this.sku._id)
        })
      },
      fetchCommdityComment (id) {
        api.fetchCommdityComment(id).then(res => {
          this.docs = res.result.docs
          this.docsCount = res.result.count
          wx.hideLoading()
        })
      },
      chooseCountry (categoryMark, countryCode) {
        wx.pageScrollTo({
          scrollTop: 0
        })
        wx.showLoading({
          title: '加载中...'
        })
        this.tabNumber = 1
        this.group = []
        this.pickedNewGroup = []
        this.pickedGroup = []
        api.fetchCommodityId(categoryMark, countryCode).then(res => {
          this.fetchCommodityDetail(res.result.short_id)
        })
      },
      chooseTab (id, index, i) {
        if (this.pickedGroup.length <= index) {
          if (index !== 0 && this.pickedGroup.length === 0) {
            const empty = Array(index).fill('')
            const initId = [id]
            this.pickedGroup = empty.concat(initId)
          } else {
            this.pickedGroup.push(id)
          }
        } else if (this.pickedGroup.includes(id)) {
          this.pickedGroup.splice(index, 1, '')
        } else if (!this.pickedGroup[index] || !this.pickedGroup.includes(id)) {
          this.pickedGroup.splice(index, 1, id)
        }
        this.pickedNewGroup = this.pickedGroup.filter((item) => {
          return item.length > 0
        })
        this.pickedNewGroup = [...new Set(this.pickedNewGroup)]

        this.group.length = this.secondClassify.length

        if (this.group[index] === id) {
          this.group[index] = ''
        } else {
          this.group.splice(index, 1, id)
        }

        const groups = this.pickedNewGroup
        this.skus_display = this.skus.filter((item) => {
          for (let i = 0; i < groups.length; i++) {
            if (item.group.indexOf(groups[i]) === -1 && groups[i]) {
              return false
            }
          }
          return true
        })
      },
      chooseCommodity (id) {
        wx.showLoading({
          title: '加载中...'
        })
        this.tabNumber = 1
        this.group = []
        this.fetchCommodityDetail(id)
      },
      showFormat () {
        this.maskFlag = true
      },
      closeFormat () {
        this.maskFlag = false
      },
      showPic (imgs) {
        this.commentsImgs = imgs
        this.picFlag = true
      },
      goToContact () {
        this.contactFlag = true
      },
      goToBuy () {
        const jumpFlag = wx.getStorageSync('ifGetPhone')
        if (jumpFlag) {
          this.$store.dispatch('setSku', this.sku)
          wx.navigateTo({
            url: '/pages/buy/main?id=' + this.sku.short_id
          })
        } else {
          wx.navigateTo({
            url: '/pages/authorization/main'
          })
        }
      },
      goToActivity () {
        wx.navigateToMiniProgram({
          appId: 'wx70a4aa6a77a6f729',
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
      copyWx () {
        wx.setClipboardData({
          data: 'wxid_2ryy3ely5ath22',
          success: () => {
            wx.showToast({
              title: '复制成功！',
              icon: 'none'
            })
            this.contactFlag = false
          }
        })
      }
    }
  }
</script>
<style lang="less">
.commodity-mask,
.pic-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  .swiper-container {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 300px;
    transform: translateY(-50%);

    img {
      height: 100%;
    }
  }

  .mask-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    padding: 20px 20px 10px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    opacity: 0.1;
    transition: all 2s ease;

    h4 {
      height: 22px;
      margin-bottom: 5px;
      font-size: 16px;
      line-height: 22px;
      color: #131313;
      opacity: 0.33;

      .lb {
        display: inline-block;
        width: 4px;
        height: 12px;
        margin-right: 7px;
        background-color: #979797;
        opacity: 0.5;
        vertical-align: middle;
      }
    }

    ul {
      margin-bottom: 24px;

      li {
        line-height: 27px;
      }
    }

    span {
      width: 58px;
      margin-right: 16px;
      font-size: 13px;
      color: #131313;
      opacity: 0.4;
    }

    b {
      display: inline-block;
      font-size: 13px;
      font-weight: normal;
      color: #131313;
      opacity: 0.8;
    }

    p {
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 20px;
      color: #131313;
      opacity: 0.8;
    }

    .content-button {
      height: 40px;
      font-size: 15px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      background-color: #05cbf9;
      border-radius: 17.5px;
    }
  }

  .flow {
    height: 550px;
    opacity: 1;
    overflow: scroll;
  }

  .big-img {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
  }

  img {
    display: block;
    width: 100%;
    max-height: 300px;
  }
}

.contact-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .contact-mask__box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 275px;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
    transform: translate(-50%, -50%);
  }

  .contact-mask__box--wx {
    font-size: 14px;
    text-align: center;
    color: #05cbf9;
  }

  .contact-mask__box--info {
    font-size: 14px;
    text-align: center;
    color: #323232;
  }

  .contact-mask__box--btn {
    height: 32px;
    margin-top: 23px;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    background-color: #f2237b;
    border-radius: 0;
  }
}

#commodity-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 47px;
  line-height: 47px;
  color: #fff;
  background-color: rgba(17, 17, 17, 0.15);

  a {
    display: block;
    height: 40px;
    font-size: 16px;
    line-height: 46px;
    color: #fff;
    text-decoration: none;
  }

  .active {
    font-weight: bold;
    border-bottom: 3px solid #fff;
  }
}

#commodity-nav.scroll {
  background-color: #6a808c;
}

.commodity.hidden {
  overflow-y: hidden;
}

.commodity {
  box-sizing: border-box;
  height: 100vh;
  overflow-y: visible;
  color: #000;
}

.commodity-banner {
  height: 250px;

  img {
    width: 100%;
    height: 250px;
    max-height: 250px;
  }
}

.commodity-info {
  position: relative;
  padding-top: 142px;
  background-color: #fff;
  border-bottom: 1px solid #edf0f3;

  .commodity-info__card {
    position: absolute;
    top: -0.32rem;
    left: 50%;
    width: 676rpx;
    height: 270rpx;
    padding: 12px 20px;
    background-color: #fff;
    border-radius: 0.133333rem;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.11);
    transform: translateX(-50%);

    .card_title {
      margin-bottom: 7px;
      font-size: 16px;
    }

    .card_price {
      b {
        font-weight: normal;
        color: #d2d2d2;
        text-decoration: line-through;
      }

      .price__display {
        font-size: 20px;
        line-height: 28px;
        color: #fd2460;
      }

      .price__old {
        font-size: 12px;
        line-height: 28px;
        color: #d2d2d2;

        b {
          display: inline;
          font-size: 12px;
        }
      }
    }

    .card_price,
    .card_star {
      display: flex;
      justify-content: space-between;
      vertical-align: top;
    }

    .card_star {
      position: absolute;
      bottom: 12px;
      left: 22px;
      width: 88%;
      line-height: 26px;

      .star__comment {
        font-size: 12px;
        color: #bcbcbc;
      }
    }
  }

  .commodity-info__select {
    padding-bottom: 20px;
    padding-left: 20px;

    h4 {
      margin-bottom: 5px;
      font-size: 14px;
    }

    span,
    a {
      display: inline-block;
      height: 32px;
      margin-right: 4%;
      margin-bottom: 12px;
      font-size: 12px;
      line-height: 32px;
      color: #4a4a4a;
      text-align: center;
      background-color: #e6e6e6;
      border-radius: 2px;
    }

    span.active {
      color: #fff;
      background-color: #05cbf9;
      opacity: 0.7;
    }

    a.active {
      color: #fff;
      background-color: #05cbf9;
      opacity: 0.7;
    }

    .select__tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .select__second {
      margin-bottom: 12px;

      span {
        display: inline-block;
        min-width: 77px;
        padding: 0 7px;
      }
    }

    .select__meal {
      margin-bottom: -12px;

      a {
        display: inline-block;
        padding: 0 7px;
        text-decoration: none;
      }

      div {
        font-size: 14px;
      }
    }
  }
}

.commodity-format {
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  background: url("../../assets/images/arrow_right.png") no-repeat right 30px center;
  background-color: #fff;
  background-size: 4px 8px;

  span {
    margin-right: 8.27%;
    font-size: 14px;
    color: #131313;
  }

  b {
    display: inline;
    font-size: 12px;
    font-weight: normal;
    color: #c2c2c2;
  }

  .dot {
    display: inline-block;
    width: 2px;
    height: 2px;
    margin: 0 10px;
    vertical-align: middle;
    background-color: #c2c2c2;
    border-radius: 50%;
  }
}

.commodity-tabs {
  padding-bottom: 67px;
  background-color: #fbfbfb;

  .tabs__title {
    display: flex;
    justify-content: space-between;
    height: 57px;
    padding: 0 20px;
    line-height: 60px;
  }

  .tabs__title--button {
    font-size: 14px;
  }

  .tabs__title--button.active {
    height: 46px;
    font-weight: bold;
    border-bottom: 3px solid #05cbf9;
  }

  .tabs__content {
    img {
      display: block;
      width: 100%;
    }
  }

  .tabs__content--box {
    position: relative;
    padding: 15px 14px 18px 58px;
    margin-bottom: 12px;
    background-color: #fff;
    box-shadow: 0 2px 15px 6px rgba(0, 0, 0, 0.03);

    .box__icon {
      position: absolute;
      top: 18px;
      left: 14px;
      display: block;
      width: 32px;
      height: 32px;
    }

    .box__info {
      h6 {
        font-size: 14px;
        color: #131313;
      }

      div {
        color: #a2a2a2;
      }

      p {
        margin-bottom: 7px;
        font-size: 14px;
        color: #131313;
      }

      span {
        font-size: 12px;
        color: #c2bebe;
      }
    }

    .box__img {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      image {
        display: block;
        width: 88px;
        height: 88px;
        margin-bottom: 5px;
      }
    }

    .box__date {
      display: flex;
      justify-content: space-between;
    }
  }
}

.commodity-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 998;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;

  .btn-contact {
    display: inline-block;
    width: 35%;
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 0;
  }

  .btn-pay {
    display: inline-block;
    width: 65%;
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    color: #fff;
    background-color: #ff1b7c;
    border-radius: 0;
  }
}
</style>
