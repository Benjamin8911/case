import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/assets/js/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isBegin: false,
    serverTime: 0,
    today: '',
    sponsor: '',
    ifGetSchool: false,
    schoolDisplay: '请输入在读或毕业院校',
    isHelper: false,
    showNews: false,
    rank: 'personal',
    sponsorsRank: [
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 1,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 2,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 3,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 4,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 5,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 6,
        trend: '0'
      }
    ],
    sponsorsRankDefault: [
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 1,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 2,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 3,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 4,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 5,
        trend: '0'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        helperCount: 0,
        nickName: '--',
        rank: 6,
        trend: '0'
      }
    ],
    selfInRank: {
      avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
      helperCount: 0,
      nickName: '--',
      rank: 0,
      trend: '0'
    },
    allSchoolRank: [
      {
        helperCount: 0,
        rank: 1,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 2,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 3,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 4,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 5,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 6,
        trend: '0',
        value: '---'
      }
    ],
    allSchoolRankDefault: [
      {
        helperCount: 0,
        rank: 1,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 2,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 3,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 4,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 5,
        trend: '0',
        value: '---'
      },
      {
        helperCount: 0,
        rank: 6,
        trend: '0',
        value: '---'
      }
    ],
    selfSchoolRank: {
      avatarUrls: '',
      helperCount: 0,
      rank: 0,
      trend: '0',
      value: '---'
    },
    helpers: [
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        nickName: '益力多',
        time: '刚刚'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        nickName: '益力多',
        time: '刚刚'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        nickName: '益力多',
        time: '刚刚'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        nickName: '益力多',
        time: '刚刚'
      },
      {
        avatarUrls: 'https://img.myoffer.cn/wxxcx/20190101/head.png',
        nickName: '益力多',
        time: '刚刚'
      }
    ]
  },
  actions: {
    setBegin ({commit}, data) {
      commit('setBegin', data)
    },
    setSchool ({commit}, data) {
      commit('setSchool', data)
    },
    setSchoolDisplay ({commit}, data) {
      commit('setSchoolDisplay', data)
    },
    setRank ({commit}, data) {
      commit('setRank', data)
    },
    setServerTime ({commit}, data) {
      commit('setServerTime', data)
    },
    setToday ({commit}, data) {
      commit('setToday', data)
    },
    setSponsor ({commit}, data) {
      commit('setSponsor', data)
    },
    setRoleHelper ({commit}, data) {
      commit('setRoleHelper', data)
    },
    fetchRankPersonal ({commit}, t) {
      api.rankPersonal({
        rankType: t.rankType,
        sponsor: wx.getStorageSync('sponsor'),
        start: t.start,
        end: t.end
      }).then(res => {
        if (res.code === 0) {
          commit('setBegin', true)
          const date = new Date()
          date.setTime(res.result.serverTime)
          const today = date.toLocaleDateString().replace(/\//g, '-')
          commit('setToday', today)
          commit('setServerTime', res.result.serverTime)
          let arr = this.state.sponsorsRankDefault.slice(0)
          const sponsors = res.result.sponsorsRank
          for (let i = 0; i < sponsors.length; i++) {
            arr[i] = sponsors[i]
            if (!sponsors[i].avatarUrls) {
              arr[i].avatarUrls = 'https://img.myoffer.cn/wxxcx/20190101/head.png'
            }
            if (!sponsors[i].nickName) {
              arr[i].nickName = '***'
            } else {
              arr[i].nickName = sponsors[i].nickName.slice(0, 3) + '***'
            }
          }
          commit('setSponsorsRank', arr)
          commit('setSelfInRank', Object.assign(this.state.selfInRank, res.result.selfInRank[0]))
        } else {
          commit('setBegin', false)
        }
      })
    },
    fetchRankSchool ({commit}, t) {
      api.rankSchool({
        rankType: t.rankType,
        sponsor: wx.getStorageSync('sponsor'),
        start: t.start,
        end: t.end
      }).then(res => {
        if (res.code === 0) {
          let arr = this.state.allSchoolRankDefault.slice(0)
          const allSchoolRank = res.result.allSchoolRank
          for (let i = 0; i < allSchoolRank.length; i++) {
            arr[i] = allSchoolRank[i]
          }
          commit('setSchoolRank', arr)
          commit('setSelfSchoolRank', Object.assign(this.state.selfSchoolRank, res.result.selfSchoolRank[0]))
        }
      })
    },
    fetchHelpers ({commit}) {
      api.listHelpers({
        apikey: wx.getStorageSync('apikey'),
        sponsor: wx.getStorageSync('sponsor')
      }).then(res => {
        if (res.code === 0) {
          commit('showNews', true)
          commit('setHelpers', res.result)
        }
        if (res.code === 1) {
          commit('showNews', false)
          commit('setHelpers', [])
        }
      })
    }
  },
  mutations: {
    setBegin: (state, data) => {
      state.isBegin = data
    },
    setSchool: (state, data) => {
      state.ifGetSchool = data
    },
    setSchoolDisplay: (state, data) => {
      state.schoolDisplay = data
    },
    setRank: (state, data) => {
      state.rank = data
    },
    setServerTime: (state, data) => {
      state.serverTime = data
    },
    setToday: (state, data) => {
      state.today = data
    },
    setSponsor: (state, data) => {
      state.sponsor = data
    },
    showNews: (state, data) => {
      state.showNews = data
    },
    setRoleHelper: (state, data) => {
      state.isHelper = data
    },
    setSponsorsRank: (state, data) => {
      state.sponsorsRank = data
    },
    setSelfInRank: (state, data) => {
      state.selfInRank = data
    },
    setSchoolRank: (state, data) => {
      state.allSchoolRank = data
    },
    setSelfSchoolRank: (state, data) => {
      state.selfSchoolRank = data
    },
    setHelpers: (state, data) => {
      state.helpers = data
    }
  }
})

export default store
