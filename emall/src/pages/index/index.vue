<template>
  <section class="emall">
    <order-icon v-on:go-to-list="getOrderList" />
    <div class="emall-banner">
      <swiper
        circular="true"
        indicator-dots="true"
        indicator-color="#989898"
        indicator-active-color="#05CBF9"
        class="emall-banner__swiper"
      >
        <swiper-item v-for="(item, index) in emallBanners" :key="index" @click="goToPage(item.images.m.target)">
          <image
            class="emall-banner__pic"
            :src="item.images.m.url"
            mode="widthFix"
          />
        </swiper-item>
      </swiper>
    </div>
    <a
      class="emall-pic"
      @click="chooseCountry('study_abord_full_service', 'uk')"
    >
      <img class="emall-pic__item" src="https://img.myoffer.cn/wxxcx/emall/pic_01.png">
      <h6 class="title-1">智能匹配+申请状态实时查</h6>
      <button class="btn-more1">进一步了解 ></button>
    </a>
    <a
      class="emall-pic"
      @click="chooseCountry('study_abord_diy_service', 'uk')"
    >
      <img class="emall-pic__item" src="https://img.myoffer.cn/wxxcx/emall/pic_02.png">
      <h6 class="title-2">15年无差错审核+VIP申请通道</h6>
      <button class="btn-more2">进一步了解 ></button>
    </a>
    <a
      class="emall-pic"
      @click="chooseCountry('certificate_service', 'uk')"
    >
      <img class="emall-pic__item" src="https://img.myoffer.cn/wxxcx/emall/pic_03.png">
      <h6 class="title-3">指导搜集材料+专业翻译+递交申请</h6>
      <button class="btn-more3">进一步了解 ></button>
    </a>
    <a
      class="emall-pic"
      @click="chooseCountry('study_abord_service','uk')"
    >
      <img class="emall-pic__item" src="https://img.myoffer.cn/wxxcx/emall/pic_04.png">
      <h6 class="title-4">斩获名校指南+雅思秘籍+留学规划书</h6>
      <button class="btn-more4">进一步了解 ></button>
    </a>
  </section>
</template>

<script>
import api from '@/assets/js/api.js'
import orderIcon from '@/components/orderIcon.vue'
export default {
  components: {
    orderIcon
  },
  data () {
    return {
      env: process.env.NODE_ENV,
      userInfo: {},
      emallBanners: []
    }
  },
  methods: {
    chooseCountry (categoryMark, countryCode) {
      this.fetchCommodityId(categoryMark, countryCode)
    },
    goToPage (target) {
      if (target.indexOf('applet') > -1) {
        wx.navigateToMiniProgram({
          appId: 'wx70a4aa6a77a6f729'
        })
      } else {
        wx.navigateTo({
          url: '/pages/article/main?url=' + encodeURIComponent(target)
        })
      }
    },
    getOrderList () {
      wx.navigateTo({
        url: '/pages/order/main'
      })
    },
    fetchBanners () {
      api.fetchBanners().then(res => {
        this.emallBanners = res.result.items
      })
    },
    fetchCommodityId (categoryMark, countryCode) {
      api.fetchCommodityId(categoryMark, countryCode).then(res => {
        wx.navigateTo({
          url: '/pages/sku/main?id=' + res.result.short_id
        })
      })
    }
  },
  onLoad () {
    if (!wx.getStorageSync('userAuth')) {
      wx.redirectTo({
        url: '/pages/userinfo/main'
      })
    } else {
      return false
    }
  },
  onShow () {
    this.fetchBanners()
  },
  onShareAppMessage () {
    return {
      title: '留学DIY-名校申请',
      path: '/pages/index/main',
      imageUrl: 'https://img.myoffer.cn/wxxcx/emall/share.png'
    }
  }
}
</script>

<style lang="less">
.emall {
  color: #000;

  .emall-banner {
    height: 261px;
    margin-bottom: 35px;
  }

  .emall-banner__swiper {
    height: 261px;
  }

  .emall-pic {
    position: relative;
    display: block;
    margin-bottom: 18px;

    .title-1 {
      position: absolute;
      top: 53px;
      left: 167px;
      font-size: 12px;
      font-weight: normal;
      color: #520d4b;
      letter-spacing: 1px;
    }

    .title-2 {
      position: absolute;
      top: 58px;
      left: 43px;
      font-size: 12px;
      color: #520d4b;
      font-weight: normal;
      color: #0e2660;
      letter-spacing: 1.8px;
    }

    .title-3 {
      position: absolute;
      top: 52px;
      left: 169px;
      font-size: 12px;
      color: #0e3260;
      font-weight: normal;
      letter-spacing: 0;
    }

    .title-4 {
      position: absolute;
      top: 54px;
      left: 158px;
      font-size: 12px;
      color: #520d3b;
      font-weight: normal;
      letter-spacing: 0;
    }

    .btn-more1 {
      position: absolute;
      right: 40px;
      bottom: 30px;
      width: 108.5px;
      height: 28px;
      padding: 0;
      line-height: 28px;
      font-size: 14px;
      color: #fff;
      background-image: linear-gradient(-90deg, #f9734e 0%, #fc0f82 100%);
      border: none;
      border-radius: 14px;
    }

    .btn-more2 {
      position: absolute;
      bottom: 33px;
      left: 41px;
      width: 77px;
      height: 20px;
      padding: 0;
      line-height: 20px;
      font-size: 10px;
      color: #fff;
      background-image: linear-gradient(90deg, #4dabff 0%, #e375d0 100%);
      border: none;
      border-radius: 10px;
    }

    .btn-more3 {
      position: absolute;
      right: 32px;
      bottom: 44px;
      width: 77px;
      height: 20px;
      padding: 0;
      line-height: 20px;
      font-size: 10px;
      color: #fff;
      background-image: linear-gradient(-90deg, #19d5f1 0%, #09b7fe 100%);
      border: none;
      border-radius: 10px;
    }

    .btn-more4 {
      position: absolute;
      right: 42px;
      bottom: 35px;
      width: 77px;
      height: 20px;
      padding: 0;
      line-height: 20px;
      font-size: 10px;
      color: #fff;
      background-image: linear-gradient(90deg, #4cc5fb 0%, #7f6afb 100%);
      border: none;
      border-radius: 10px;
    }
  }

  .emall-pic__item {
    display: block;
    width: 356px;
    height: 202px;
    margin: 0 auto;
  }
}
</style>
