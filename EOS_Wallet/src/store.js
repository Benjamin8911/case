import Vue from 'vue'
import Vuex from 'vuex'

import { CHINESE, ENGLISH, RMB, DOLLAR } from './constant'

Vue.use(Vuex);

const state = {
    language: CHINESE,
    currency: RMB,
    QRText: '',
    token: '',
    username: '',
    storageWallet: '',
    storageContacts: '',
    address: '',
    activeWallet: {},
    market: {}, //各币种行情,
    gasPrice: 0,
    registerState: '',
    walletList: [],
    user: {}
}

const getters = {
    currencySymbol(state) {
        switch (state.currency) {
        case RMB:
            return '￥'
        case DOLLAR:
            return '$'
        }
    }
}

const mutations = {
    setLanguage (state, language) {
        state.language = language
    },
    setChinese(state) {
        state.language = CHINESE
    },
    setEnglish(state) {
        state.language = ENGLISH
    },
    setRMB(state) {
        state.currency = RMB
    },
    setDollar(state) {
        state.currency = DOLLAR
    },
    setQR(state, QRText) {
        state.QRText = QRText
    },
    clearQR(state) {
        state.QRText = ''
    },
    setAddress(state, address) {
        state.address = address
    },
    clearAddress(state) {
        state.address = ''
    },
    setToken(state, token) {
        state.token = token
    },
    setUsername(state, username) {
        state.username = username
    },
    setStorageWallet(state, storageWallet) {
        state.storageWallet = storageWallet
    },
    setStorageContacts(state, storageContacts) {
        state.storageContacts = storageContacts
    },
    setActiveWallet(state, wallet) {
        state.activeWallet = wallet
    },
    setMarket(state, market) {
        state.market = market
    },
    setGasPrice(state, price) {
        state.gasPrice = price
    },
    setRegisterState(state, registerState) {
        state.registerState = registerState
    },
    setWalletList(state, walletList) {
        state.walletList = walletList
    },
    setUser(state, user) {
        state.user = user
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})