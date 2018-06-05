<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <tabbar v-show="showTabbar" :items="tabItems" :index="index" @change-tab="jump"></tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../commons/components/Tabbar.vue'
    import remote from '../../lib/js/remote'
    import { MessageBox } from 'mint-ui'

    export default {
        name: '',
        components: {
            Tabbar
        },
        data () {
            return {
                index: 0,
                transitionName: 'slide-right'
            }
        },
        mounted () {
            this.checkIsLogout()
        },
        computed: {
            tabItems () {
                return [
                    {
                        title: this.$t('m.assets'),
                        routePath: '/assets',
                        defaultImg: require('../../../static/images/assets-gray.png'),
                        activeImg: require('../../../static/images/assets.png')
                    },
                    {
                        title: this.$t('m.quotation'),
                        routePath: '/quotation',
                        defaultImg: require('../../../static/images/quotation-gray.png'),
                        activeImg: require('../../../static/images/quotation.png')
                    },
                    {
                        title: this.$t('m.info'),
                        routePath: '/info',
                        defaultImg: require('../../../static/images/info-gray.png'),
                        activeImg: require('../../../static/images/info.png')
                    },
                    {
                        title: this.$t('m.mine'),
                        routePath: '/about',
                        defaultImg: require('../../../static/images/mine-gray.png'),
                        activeImg: require('../../../static/images/mine.png')
                    }
                ]
            },
            showTabbar () {
                return this.$route.meta.tabbar
            }
        },
        methods: {
            jump (index) {
                this.$router.replace({
                    path: this.tabItems[index].routePath
                })
            },
            checkIsLogout () {
                remote.query_user({ticket: window.sessionStorage.getItem('token')}).then(response => {
                    if (response.data.username) {
                        setTimeout(() => {
                            this.checkIsLogout()
                        }, 10000);
                    } else {
                        this.logout(response.data.device)
                    }
                }).catch(error => {
                    this.logout()
                })
            },
            logout (device) {
                MessageBox.close()
                let logoutTips = this.$t('m.loginAgain')
                if (device === '666') {
                    logoutTips = this.$t('m.loggedInOther')
                }
                MessageBox.alert(logoutTips, {
                    title: this.$t('m.tips'),
                    confirmButtonText: this.$t('m.ok')
                }).then(action => {
                    window.sessionStorage.clear()
                    this.$router.push({ path: '/login'})
                    this.$store.commit('setWalletList', [])
                    this.$store.commit('setToken', '')
                })
            }
        },
        created () {
            switch (this.$route.path) {
                case '/assets':
                    this.index = 0
                    break
                case '/quotation':
                    this.index = 1
                    break
                case '/info':
                    this.index = 2
                    break
                case '/about':
                    this.index = 3
                    break
            }
        }
    }
</script>