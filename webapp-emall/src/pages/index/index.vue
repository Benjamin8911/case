<template>
  <section class="emall">
    <div class="emall-banner">
      <swiper
        circular="true"
        indicator-dots="true"
        indicator-color="#989898"
        indicator-active-color="#05CBF9"
        class="emall-banner__swiper"
      >
        <swiper-item v-for="(item, index) in emallBanners" :key="index">
          <img class="emall-banner__pic" :src="item.images.m.url">
        </swiper-item>
      </swiper>
    </div>
    <a href="/pages/sku/main" class="emall-pic">
      <img src="https://m.myoffer.cn/dist/public/m/images/emall/index/pic_01.png?b41d9">
      <h6 class="title-1">智能匹配+申请状态实时查</h6>
      <button class="btn-more1">进一步了解 ></button>
    </a>
    <a href="/emall/categories/study_abord_diy_service/countries/uk/default-sku" class="emall-pic">
      <img src="https://m.myoffer.cn/dist/public/m/images/emall/index/pic_02.png?131a6">
      <h6 class="title-2">15年无差错审核+VIP申请通道</h6>
      <button class="btn-more2">进一步了解 ></button>
    </a>
    <a href="/emall/categories/certificate_service/countries/uk/default-sku" class="emall-pic">
      <img src="https://m.myoffer.cn/dist/public/m/images/emall/index/pic_03.png?d4b5c">
      <h6 class="title-3">指导搜集材料+专业翻译+递交申请</h6>
      <button class="btn-more3">进一步了解 ></button>
    </a>
  </section>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      emallBanners: []
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    fetchBanners () {
      wx.request({
        methods: 'GET',
        url: 'http://api.myofferdemo.com/api/v1/banners',
        data: {
          type: 'SPHD',
          source: 'm'
        },
        success: (res) => {
          const result = res.data
          this.emallBanners = result.result.items
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.fetchBanners()
  }
}
</script>

<style lang="less">
.emall {
  color: #000;

  .emall-banner {
    height: 528rpx;
    margin-bottom: 70rpx;

    img {
      width: 100%;
    }
  }

  .emall-banner__swiper {
    height: 528rpx;
  }

  .emall-banner__pic {
    height: 528rpx;
  }

  .emall-pic {
    position: relative;
    display: block;
    margin-bottom: 36rpx;

    img {
      display: block;
      width: 712rpx;
      height: 404rpx;
      margin: 0 auto;
    }

    h6 {
      position: absolute;
      font-size: 24rpx;
      color: #520d4b;
    }

    .title-1 {
      top: 106rpx;
      left: 334rpx;
      font-weight: normal;
      letter-spacing: 2rpx;
    }

    .title-2 {
      top: 116rpx;
      left: 86rpx;
      font-weight: normal;
      color: #0e2660;
      letter-spacing: 3.7rpx;
    }

    .title-3 {
      top: 128rpx;
      left: 346rpx;
      font-weight: normal;
    }

    .btn-more1 {
      position: absolute;
      right: 80rpx;
      bottom: 60rpx;
      width: 217rpx;
      height: 56rpx;
      line-height: 56rpx;
      font-size: 28rpx;
      color: #fff;
      background-image: linear-gradient(-90deg, #f9734e 0%, #fc0f82 100%);
      border: none;
      border-radius: 28rpx;
    }

    .btn-more2 {
      position: absolute;
      bottom: 66rpx;
      left: 82rpx;
      width: 154rpx;
      height: 40rpx;
      line-height: 40rpx;
      font-size: 20rpx;
      color: #fff;
      background-image: linear-gradient(90deg, #4dabff 0%, #e375d0 100%);
      border: none;
      border-radius: 20rpx;
    }

    .btn-more3 {
      position: absolute;
      right: 64rpx;
      bottom: 88rpx;
      width: 154rpx;
      height: 40rpx;
      line-height: 40rpx;
      font-size: 20rpx;
      color: #fff;
      background-image: linear-gradient(-90deg, #19d5f1 0%, #09b7fe 100%);
      border: none;
      border-radius: 20rpx;
    }
  }
}
</style>
