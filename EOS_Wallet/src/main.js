require('es6-promise').polyfill()
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
// import Mint from 'mint-ui'
import VueTap from './lib/js/v-tap'
import App from './app.vue'

import { plusReady } from './lib/js/plusReady'

import { Popup, Loadmore, Header, Range, Swipe, SwipeItem, InfiniteScroll } from 'mint-ui'

Vue.component(Popup.name, Popup)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Header.name, Header)
Vue.component(Range.name, Range)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);


// 引人样式
import './lib/css/base.css'
import 'swiper/dist/css/swiper.css'
import './lib/css/pluginCustom.css'

// 引入route、store、i18n
import routes from './router'
import store from './store'
import i18nConfig from './i18n'

// 引人WEB3
import WEB3 from './web3'
import { MessageBox } from 'mint-ui'

Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(Mint)
Vue.directive('tap', VueTap)
Vue.use(VueI18n)

VueRouter.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}

const router = new VueRouter(routes)
const i18n = new VueI18n(i18nConfig)

router.beforeEach((to, from, next) => {
    plusReady(() => {
        if (to.path === '/mappingDescription') {
            window.plus.navigator.setStatusBarStyle('light')
        } else {
            window.plus.navigator.setStatusBarStyle('dark')
        }
    })
    if (to.meta.passAuth) {
        // 不拦截的路由
        next()
    } else {
        let token = store.state.token || window.sessionStorage.getItem('token')
        if (token) {
            if (!store.state.token) {
                // token放到store
                store.commit('setToken', token)
            }
            next()
        } else {
            // next()
            next({ path: '/login' })
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {
        App
    },
    render: (h) => {
        return h('app')
    },
    mounted() {
        this.init()

        plusReady(() => {
            // 添加返回事件
            window.plus.key.addEventListener('backbutton', () => {
                if (this.$route.meta.isQuit) {
                    MessageBox.close()
                    MessageBox.confirm(this.$t('m.isLogout')).then(action => {
                        window.plus.runtime.quit()
                    }).catch(cancel => {
                        console.log(cancel)
                    })
                } else {
                    router.goBack()
                }
            })
        })
    },
    methods: {
        init() {
            // 获取gasPrice
            WEB3.get_gas_price((p) => {
                if (!p.isError) {
                    this.$store.commit('setGasPrice', parseFloat(p.data))
                }
            })
        }
    }
})