<template>
  <section :class="{'hidden': maskFlag || picFlag}" class="commodity">
    <div id="commodity-nav" :class="{'scroll': scrollFlag}">
      <a :class="{'active':sku.country==='uk'}" @click="chooseCountry">英国</a>
      <a :class="{'active':sku.country==='au'}">澳大利亚</a>
      <a :class="{'active':sku.country==='nzl'}">新西兰</a>
    </div>
    <div class="commodity-banner"><img :src="sku.app_cover_url"></div>
    <div class="commodity-info">
      <div class="commodity-info__card">
        <h2 class="card_title">{{ sku.name }}</h2>
        <div class="card_price">
          <span class="price__display">￥{{ sku.price | money }}</span>
          <span class="price__old">原价<b>￥{{ sku.display_price | money }}</b></span>
        </div>
        <div class="card_star">
          <span class="star__comment">累计评价 | {{ docsCount }}</span>
          <Star :score="sku.score" />
        </div>
      </div>
      <div class="commodity-info__select">
        <div v-for="(item,index) in secondClassify" :key="item._id" class="select__second">
          <h4>{{ item.name }}</h4>
          <div class="select__tabs">
            <span
              v-for="(t,i) in item.values"
              :key="t._id"
              :class="{'active': group[index]===t._id}"
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
            >
              {{ item.name }}
            </a>
          </div>
          <div v-show="skus.length === 0">暂无套餐</div>
        </div>
      </div>
    </div>
    <div class="commodity-format" @click="showFormat">
      <span>产品规格</span><b>产品参数<i class="dot"></i>消费者告知书</b>
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
              <h6>1***{{ Math.floor(Math.random() * 1000) }}</h6>
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
      <span class="btn-contact">在线咨询</span><span class="btn-pay" @click="goToBuy">购买</span>
    </div>
    <div v-show="maskFlag" class="commodity-mask">
      <div :class="{'flow': maskFlag}" class="mask-content">
        <h4>商品参数</h4>
        <ul>
          <li v-for="item in sku.comment_attr" :key="item._id"><span>{{ item.key }}</span><b>{{ item.value }}</b></li>
        </ul>
        <h4>消费者告知书</h4>
        <p>您好！为帮助您更好地选留学及签证相关商品，请您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。 请同意本告知书内容后再下单购买：
        1. 购买申请人必须符合中国公民自费出国留学的必备条件，未成年人须在家长的指导下完成在线留学商品的购买及支付流程；
        2. 在购买服务前，请您务必确认所购买的服务相关联信息与个人意愿相符；
        3. 购买签证服务商品后，发放签证或入境批准文件是申请人申请留学的前往国家或地区政府独立行使的权力，myOffer不承担责任；
        4. 如您需了解更多本网站服务条款详情，请见正式合同文件。</p>
        <div class="content-button" @click="closeFormat">完成</div>
      </div>
    </div>
  </section>
</template>
<script>
  import api from '@/assets/js/api.js'
  import Star from '@/components/star.vue'
  export default {
    components: {
      Star
    },
    data () {
      return {
        maskFlag: false,
        picFlag: false,
        scrollFlag: false,
        //  产品信息
        tabNumber: 1,
        docsCount: 0,
        docs: [],
        //  评论图片地址
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
        group: []
      }
    },
    mounted () {
      this.fetchCommodityDetail(72)
    },
    methods: {
      fetchCommodityDetail (id) {
        api.fetchCommodityDetail(id).then(res => {
          this.secondClassify = res.result.secondClassify
          this.sku = res.result.sku
          this.skus = res.result.skus
          this.skus_display = res.result.skus
          this.fetchCommdityComment(this.sku._id)
        })
      },
      fetchCommdityComment (id) {
        api.fetchCommdityComment(id).then(res => {
          this.docs = res.result.docs
          this.docsCount = res.result.count
        })
      },
      chooseCountry () {
        wx.request({
          methods: 'GET',
          url: 'http://m.myoffer.cn/emall/categories/' + this.sku.category[0] + '/countries/uk/default-sku',
          success: (res) => {
            console.log(res)
          }
        })
      },
      //  选择二级分类
      chooseTab (id, index, i) {
        // this.$store.dispatch('FILTER_GROUP')
        if (index === 0) {
          this.group = []
          this.skus_display = this.skus
        }
        this.group.splice(index, 1, id)

        const groups = this.group
        this.skus_display = this.skus_display.filter((item) => {
          for (let i = 0; i < groups.length; i++) {
            if (item.group.indexOf(groups[i]) === -1) {
              return false
            }
          }
          return true
        })
      },
      showMEIQIA () {
        window._MEIQIA('showPanel')
      },
      showFormat () {
        this.maskFlag = true
      },
      closeFormat () {
        this.maskFlag = false
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 50) {
          this.scrollFlag = true
          document.getElementById('commodity-nav').style.top = 0
        } else {
          this.scrollFlag = false
          document.getElementById('commodity-nav').style.top = 50 - scrollTop + 'rpx'
        }
      },
      //  查看评论图片
      showPic (imgs) {
        this.commentsImgs = imgs
        this.picFlag = true
      },
      //  购买操作
      goToBuy () {
        // if (location.host.indexOf('myofferdemo') > -1) {
        //   location.href = 'https://m.myofferdemo.com/emall/confirm-order/' + this.sku.short_id
        // }
        // else {
        //   location.href = 'https://m.myoffer.cn/emall/confirm-order/' + this.sku.short_id
        // }
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
    transform: translateY(-50%);
  }

  .mask-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    padding: 0.586667rem 0.586667rem 0.266667rem;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0 0;
    opacity: 0.1;
    transition: all 2s ease;

    h4 {
      height: 44rpx;
      margin-bottom: 10rpx;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #131313;
      opacity: 0.33;
    }

    ul {
      margin-bottom: 48rpx;

      li {
        line-height: 54rpx;
      }
    }

    span {
      width: 116rpx;
      margin-right: 32rpx;
      font-size: 26rpx;
      color: #131313;
      opacity: 0.4;
    }

    b {
      display: inline-block;
      font-size: 26rpx;
      font-weight: normal;
      color: #131313;
      opacity: 0.8;
    }

    p {
      margin-bottom: 20rpx;
      font-size: 24rpx;
      line-height: 40rpx;
      color: #131313;
      opacity: 0.8;
    }

    .content-button {
      height: 80rpx;
      font-size: 30rpx;
      line-height: 80rpx;
      color: #fff;
      text-align: center;
      background-color: #05cbf9;
      border-radius: 35rpx;
    }
  }

  .flow {
    height: auto;
    opacity: 1;
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

#commodity-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
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

.hidden {
  overflow: hidden;
}

.commodity {
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  color: #000;
}

.commodity-banner {
  height: 500rpx;

  img {
    width: 100%;
    height: 500rpx;
    max-height: 500rpx;
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
    padding: 24rpx 40rpx;
    background-color: #fff;
    border-radius: 0.133333rem;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.11);
    transform: translateX(-50%);

    .card_title {
      margin-bottom: 14rpx;
      font-size: 32rpx;
    }

    .card_price {
      b {
        font-weight: normal;
        color: #d2d2d2;
        text-decoration: line-through;
      }

      .price__display {
        font-size: 40rpx;
        line-height: 56rpx;
        color: #fd2460;
      }

      .price__old {
        font-size: 24rpx;
        line-height: 56rpx;
        color: #d2d2d2;

        b {
          display: inline;
          font-size: 24rpx;
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
      bottom: 24rpx;
      left: 44rpx;
      width: 88%;
      line-height: 52rpx;

      .star__comment {
        font-size: 24rpx;
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
    }
  }
}

.commodity-format {
  height: 100rpx;
  padding-left: 40rpx;
  line-height: 100rpx;
  // background: url("../../../../public/m/images/emall/sku/arrow_right.png") no-repeat right 30px center;
  background-color: #fff;
  background-size: 8rpx 16rpx;

  span {
    margin-right: 8.27%;
    font-size: 28rpx;
    color: #131313;
  }

  b {
    display: inline;
    font-size: 24rpx;
    font-weight: normal;
    color: #c2c2c2;
  }

  .dot {
    display: inline-block;
    width: 4rpx;
    height: 4rpx;
    margin: 0 20rpx;
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
    height: 114rpx;
    padding: 0 40rpx;
    line-height: 120rpx;
  }

  .tabs__title--button {
    font-size: 28rpx;
  }

  .tabs__title--button.active {
    height: 92rpx;
    font-weight: bold;
    border-bottom: 6rpx solid #05cbf9;
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
      top: 36rpx;
      left: 28rpx;
      display: block;
      width: 64rpx;
      height: 64rpx;
    }

    .box__info {
      h6 {
        font-size: 28rpx;
        color: #131313;
      }

      div {
        color: #a2a2a2;
      }

      p {
        margin-bottom: 14rpx;
        font-size: 28rpx;
        color: #131313;
      }

      span {
        font-size: 24rpx;
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
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;

  .btn-contact {
    display: inline-block;
    width: 35%;
    font-size: 30rpx;
    background-color: #fff;
  }

  .btn-pay {
    display: inline-block;
    width: 65%;
    font-size: 30rpx;
    color: #fff;
    background-color: #ff1b7c;
  }
}
</style>
