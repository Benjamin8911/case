import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sku: {},
    userCouponId: '',
    denomination: 0,
    pId: ''
  },
  actions: {
    setSku ({commit}, data) {
      commit('setSku', data)
    },
    setCoupon ({commit}, data) {
      commit('setCoupon', data)
    },
    setVipId ({commit}, data) {
      commit('setVipId', data)
    }
  },
  mutations: {
    setSku: (state, data) => {
      state.sku = data
    },
    setCoupon: (state, data) => {
      state.userCouponId = data._id
      state.denomination = data.coupon.denomination
    },
    setVipId: (state, data) => {
      state.pId = data
    }
  }
})

export default store
