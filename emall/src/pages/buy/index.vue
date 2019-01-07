<template>
  <div class="order">
    <section class="order-sku">
      <p class="order-sku__discount" v-show="sku.reduce_flag"><b>优惠</b> 此商品参与优惠活动</p>
      <div class="order-sku__info">
        <div class="order-sku__info--pic">
          <img class="order-sku__info--banner" :src="sku.app_cover_url">
        </div>
        <div>
          <h1>{{ sku.name }}</h1>
        </div>
      </div>
      <div class="order-sku__price">
        <p>*购买商品后，请和相关咨询人员联系</p>
        <div>¥ {{ discount }}</div>
      </div>
    </section>
    <section v-show="coupons.length > 0" class="order-pass" @click="openCouponModal()">
      <h3>活动通道</h3>
    </section>
    <!-- <section v-show="sku.reduce_flag" class="order-pass" @click="openVipModal()">
      <h3>尊享通道</h3>
    </section> -->
    <section
      v-show="sku.contract_enable"
      class="order-contract"
      @click="openContract"
    >
      <h3>合同信息</h3>
      <p>
        合同名称：《留学产品合同》
        <span><i :class="{sign:payFlag}"></i><b>{{!payFlag?'未签署':'已签署'}}</b></span>
      </p>
      <p v-show="payFlag">
        <b class="btn-look" @click.stop="seeContract">查看</b>
        <!-- <b @click.stop="downloadContract">下载</b> -->
      </p>
    </section>
    <!-- <p class="agreement-label">
      <label><input type="checkbox" v-model="isCheckedAgreement"><i></i></label>
      <span @click="toggleAgreementModal()" :class="{'error': !isCheckedAgreement && hasSubmitted}">购买条款与协议，买家须知</span>
    </p> -->
    <p class="agreement-label">
      <span v-show="sku.contract_enable">（注：需签署合同后才可购买）</span>
    </p>
    <footer class="order-footer">
      <p class="order-footer__reduce" v-show="sku.reduce_flag">( 已优惠¥ {{ sku.reduce_value }} )</p>
      <p>总金额 <span>¥ {{ discount }}</span></p>
      <button @click="createOrder" :disabled="!payFlag">结算</button>
    </footer>
    <coupon-modal
      :showModal="isShowCouponModal"
      :coupons="coupons"
      v-on:hide-coupon-modal="toggleCouponModal"
    >
    </coupon-modal>
    <vip-modal
      :showModal="isShowVipModal"
      :price="sku.price"
      v-on:hide-vip-modal="toggleVipModal"
      v-on:get-discount="getDiscount"
    >
    </vip-modal>
    <div class="mask" v-show="maskFlag">
      <div class="mask-content">
        <span class="btn-close" @click="closeContract"></span>
        <form report-submit="true" @submit="submitContract">
          <h6>姓名</h6>
          <p><input type="text" v-model="IDCardName" :disabled="nextInput"></p>
          <h6>身份证号</h6>
          <p><input type="text" v-model="IDCardNo" :disabled="nextInput"></p>
          <h6>手机号</h6>
          <p><input type="text" v-model="mobile" :disabled="nextInput"></p>
          <button v-show="nextFlag" @click.prevent="nextContract">下一步</button>
          <button v-show="confirmFlag" formType="submit">确认信息</button>
        </form>
      </div>
    </div>
    <div class="contract-show" v-show="showContractFlag">
      <span class="btn-close" @click="showContractFlag=false"></span>
      <image v-for="(item,index) in imgUrls" :src="item" :key="index" mode="widthFix" />
    </div>
  </div>
</template>
<script>
  import api from '@/assets/js/api.js'
  import CouponModal from '@/components/couponModal.vue'
  import VipModal from '@/components/vipModal.vue'
  export default {
    components: {
      CouponModal,
      VipModal
    },
    data () {
      return {
        id: '',
        sku: {},
        isShowCouponModal: false,
        isShowVipModal: false,
        showContractFlag: false,
        maskFlag: false,
        nextFlag: true,
        confirmFlag: false,
        payFlag: false,
        nextInput: false,
        IDCardName: '',
        IDCardNo: '',
        mobile: '',
        queryData: {
          no: '',
          notify_url: '',
          return_url: '',
          sign_type: '',
          sign_val: '',
          user_code: '',
          zqid: ''
        },
        pdfUrl: '',
        imgUrls: [],
        coupons: [],
        rules: 0
      }
    },
    computed: {
      skuId () {
        return this.$store.state.sku._id
      },
      discount () {
        return this.formatMoney(this.sku.price - this.$store.state.denomination)
      }
    },
    methods: {
      formatMoney (m) {
        return (m + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      openCouponModal () {
        this.isShowCouponModal = true
      },
      toggleCouponModal () {
        this.isShowCouponModal = false
      },
      openVipModal () {
        this.isShowVipModal = true
      },
      getDiscount (m) {
        this.rules = m
      },
      toggleVipModal () {
        this.isShowVipModal = false
      },
      openContract (e) {
        e.stopPropagation()
        if (this.payFlag) {
          return false
        } else {
          wx.showLoading({
            title: '读取中...'
          })
          this.checkIdentity()
        }
      },
      checkIdentity () {
        api.checkIdentity({
          apikey: wx.getStorageSync('apikey')
        }).then(res => {
          if (res.result.isAuthenticated) {
            this.nextInput = true
            this.mobile = res.result.mobile
            this.IDCardNo = res.result.IDCardNo
            this.IDCardName = res.result.IDCardName
            this.fetchContractForm()
          } else {
            this.nextFlag = true
            this.nextInput = false
          }
          wx.hideLoading()
          this.maskFlag = true
        })
      },
      checkContract () {
        api.checkContract({
          apikey: wx.getStorageSync('apikey'),
          id: this.sku._id
        }).then(res => {
          if (res.code === 11030) {
            wx.removeStorage({
              key: 'ifGetPhone'
            })
            wx.redirectTo({
              url: '/pages/authorization/main'
            })
          }
          if (res.result.contractEnable) {
            if (res.result.signStatus) {
              this.payFlag = res.result.signStatus
              this.fetchContract()
            } else {
              this.payFlag = false
            }
          } else {
            this.payFlag = true
          }
        })
      },
      seeContract () {
        this.showContractFlag = true
      },
      downloadContract () {
        const _this = this
        wx.downloadFile({
          url: _this.pdfUrl,
          success: (res) => {
            console.log(res.tempFilePath)
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res) => {
                console.log(res)
              }
            })
          }
        })
      },
      nextContract () {
        const namereg = /^([\u4e00-\u9fa5\u00b7]{2,8})$/
        const idreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        const phonereg = /^((1)3(\d){9}$)|(^(1)4[5-9](\d){8}$)|(^(1)5(\d){9}$)|(^(1)66(\d){8}$)|(^(1)7[0-8](\d){8}$)|(^(1)8(\d){9}$)|(^(1)9[8-9](\d){8}$)/
        if (!namereg.test(this.IDCardName)) {
          wx.showToast({
            title: '姓名输入有误',
            icon: 'none'
          })
          return false
        }
        if (!idreg.test(this.IDCardNo)) {
          wx.showToast({
            title: '身份证号输入有误',
            icon: 'none'
          })
          return false
        }
        if (!phonereg.test(this.mobile)) {
          wx.showToast({
            title: '手机号码输入有误',
            icon: 'none'
          })
          return false
        }
        wx.showLoading({
          title: '信息上传中'
        })
        api.submitInfo({
          apikey: wx.getStorageSync('apikey'),
          data: {
            mobile: this.mobile,
            IDCardNo: this.IDCardNo,
            IDCardName: this.IDCardName
          }
        }).then(res => {
          wx.hideLoading()
          if (res.code === 0) {
            this.nextInput = true
            this.fetchContractForm()
          } else {
            this.nextInput = false
            wx.showToast({
              title: '信息验证未通过'
            })
          }
        })
      },
      submitContract (e) {
        const no = this.queryData.no
        const userCode = this.queryData.user_code
        const zqid = this.queryData.zqid
        const signType = this.queryData.sign_type
        const signVal = encodeURIComponent(this.queryData.sign_val)
        const returnUrl = encodeURIComponent(this.queryData.return_url)
        const notifyUrl = encodeURIComponent(this.queryData.notify_url)
        let url = ''
        if (process.env.NODE_ENV === 'production') {
          url = encodeURIComponent('https://sign.zqsign.com/mobileSignView')
        } else {
          url = encodeURIComponent('http://test.sign.zqsign.com:8081/mobileSignView')
        }
        var parameters = 'no=' + no + '&user_code=' + userCode + '&sign_type=' + signType + '&zqid=' + zqid + '&sign_val=' + signVal + '&url=' + url + '&notify_url=' + notifyUrl + '&return_url=' + returnUrl
        this.maskFlag = false
        this.confirmFlag = false
        wx.redirectTo({
          url: '/pages/sign/main?' + parameters
        })
      },
      fetchContract () {
        api.fetchContract({
          apikey: wx.getStorageSync('apikey'),
          id: this.sku._id
        }).then(res => {
          this.imgUrls = res.result.imgUrls
          this.pdfUrl = res.result.pdfUrl
        })
      },
      fetchContractForm () {
        api.fetchContractForm({
          apikey: wx.getStorageSync('apikey'),
          id: this.sku._id,
          short_id: this.sku.short_id
        }).then(res => {
          if (res.code === 0) {
            this.queryData = res.result
            this.confirmFlag = true
            this.nextFlag = false
          } else {
            this.nextInput = false
            wx.showToast({
              title: '信息验证未通过',
              icon: 'none'
            })
          }
        })
      },
      fetchCoupons () {
        api.fetchCoupons({
          apikey: wx.getStorageSync('apikey'),
          skuId: this.skuId
        }).then(res => {
          this.coupons = res.result
          this.coupons.forEach(item => {
            item.startTime = (new Date(item.startTime).toLocaleDateString())
            item.endTime = (new Date(item.endTime).toLocaleDateString())
          })
        })
      },
      createOrder () {
        wx.navigateTo({
          url: '/pages/pay/main'
        })
      },
      closeContract () {
        this.maskFlag = false
      }
    },
    onLoad (e) {
      wx.showLoading({
        title: '加载中...'
      })
      this.showContractFlag = false
      this.isShowCouponModal = false
      this.isShowVipModal = false
      this.maskFlag = false
      this.confirmFlag = false
      this.payFlag = false
      this.nextInput = false
      this.IDCardName = ''
      this.IDCardNo = ''
      this.mobile = ''
      this.id = e.id
    },
    onShow () {
      this.$store.dispatch('setCoupon', {_id: '', coupon: {denomination: 0}})
    },
    mounted () {
      api.fetchCommodityDetail(this.id).then(res => {
        wx.hideLoading()
        this.sku = res.result.sku
        this.$store.dispatch('setSku', res.result.sku)
        this.checkContract()
      })
      this.fetchCoupons()
    }
  }
</script>
<style lang="less">
.order {
  height: 100vh;
  padding-bottom: 100px;
  background-color: #f3f3f3;
  overflow-y: scroll;
}

.order-sku {
  padding: 12px 12px 20px;
  margin-bottom: 10px;
  background-color: #fff;

  .order-sku__discount {
    margin-bottom: 12px;
    font-size: 13px;
    color: #a2a2a2;

    b {
      display: inline-block;
      padding: 0 4px;
      font-size: 13px;
      color: #fff;
      background-color: #f2237b;
      border-radius: 2px;
    }
  }

  .order-sku__info {
    display: flex;

    h1 {
      margin-bottom: 5px;
      font-size: 16px;
      color: #333;
    }

    .order-sku__info--label {
      display: inline-block;
      height: 21px;
      padding: 0 5px;
      margin-bottom: 5px;
      font-size: 12px;
      line-height: 20px;
      color: #05cbf9;
      border: 1px solid #05cbf9;
      border-radius: 3px;

      i {
        display: inline-block;
        width: 11px;
        height: 20px;
        background: url("../../assets/images/icon-account.png") no-repeat left center;
        background-size: contain;
        vertical-align: top;
      }
    }

    .order-sku__info--text {
      font-size: 12px;
      color: #989898;
    }
  }

  .order-sku__info--pic {
    margin-right: 30px;
  }

  .order-sku__info--banner {
    display: inline-block;
    width: 140px;
    height: 98px;
  }

  .order-sku__price {
    display: flex;
    justify-content: space-between;
    line-height: 33px;

    p {
      font-size: 12px;
      color: #989898;
      vertical-align: middle;
    }

    div {
      font-size: 24px;
      font-weight: bold;
      color: #f2237b;
    }
  }
}

.order-pass {
  position: relative;
  padding: 15px 12px;
  margin-bottom: 10px;
  background-color: #fff;

  h3 {
    font-size: 16px;
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #f2237b;
  }
}

.order-pass::after {
  position: absolute;
  top: 50%;
  right: 15px;
  width: 10px;
  height: 10px;
  border-top: 1px solid rgba(0,0,0,0.6);
  border-right: 1px solid rgba(0,0,0,0.6);
  transform: translateY(-50%) rotate(45deg);
  pointer-events: none;
  content: '';
}

.order-contract {
  position: relative;
  padding: 15px 12px;
  background-color: #fff;

  h3 {
    font-size: 16px;
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #bbb;
  }

  span,i,b,a {
    display: inline-block;
    font-size: 12px;
  }

  i {
    width: 11px;
    height: 11px;
    margin-right: 2px;
    background: url("../../assets/images/sign-no.png") no-repeat left center;
    background-size: cover;
    vertical-align: middle;
  }
  .sign {
    background: url("../../assets/images/sign.png") no-repeat left center;
    background-size: cover;
  }

  b {
    color: #333;
    text-decoration: underline;
  }

  a {
    color: #333;
    text-decoration: underline;
  }

  .btn-look {
    margin: 0 5px;
  }
}

.order-contract::after {
  position: absolute;
  top: 50%;
  right: 15px;
  width: 10px;
  height: 10px;
  border-top: 1px solid rgba(0,0,0,0.6);
  border-right: 1px solid rgba(0,0,0,0.6);
  transform: translateY(-50%) rotate(45deg);
  pointer-events: none;
  content: '';
}

.agreement-label {
  padding: 0 12px;
  margin-top: 10px;

  span {
    font-size: 12px;
    color: #989898;
  }
}

.order-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 12px 6px;
  background-color: #fff;

  p {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .order-footer__reduce {
    font-size: 12px;
    color: #989898;
  }

  span {
    font-weight: 600;
    color: #F2237B;
  }

  button {
    height: 54px;
    font-size: 16px;
    line-height: 54px;
    color: #fff;
    background-color: #F2237B;
  }

  button[disabled] {
    width: 100%;
    height: 54px;
    line-height: 54px;
    background-color: #bcbcbc;
  }
}

.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);

  .btn-close {
    position:absolute;
    top: 14px;
    right: 10px;
    width: 19px;
    height: 19px;
    background: url("../../assets/images/btn-close.png") no-repeat left top;
    background-size: cover;
  }

  .mask-content {
    position: relative;
    display: block;
    width: 632rpx;
    padding: 36px 24px 10px;
    background-color: #fff;
    border-radius: 4px;

    h6, input {
      width: 250px;
    }

    h6 {
      font-size: 10px;
    }

    input {
      padding-left: 10px;
      margin-bottom: 13px;
      font-size: 14px;
      background-color: #d8d8d8;
    }

    button {
      width: 113px;
      height: 28px;
      font-size: 14px;
      line-height: 28px;
      color: #fff;
      background-color: #f2237b;
      border-radius: 2px;
    }
  }
}

.contract-show {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,1);
  overflow: scroll;

  .btn-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 19px;
    height: 19px;
    background: url("../../assets/images/btn-close.png") no-repeat left top;
    background-size: cover;
  }
}
</style>
