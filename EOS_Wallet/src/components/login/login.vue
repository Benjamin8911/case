<template>
    <div class="page">
        <!-- 导航页 -->
        <wizard-sheet></wizard-sheet>
        <div class="logo"><img :src="logo"></div>
        <p>{{msg}}</p>
        <input-light class="username" clear color="#374452" :placeholder="$t('m.usernamePlaceholder')" v-model="username" :maxlength="50"></input-light>
        <input-light class="password" clear color="#374452" :placeholder="$t('m.passwordPlaceholder')" v-model="password" :maxlength="50" type="password"></input-light>
        <button-item class="login" :title="$t('m.login')" bg="#29DC54" v-tap="{methods:login}"></button-item>
        <ul class="btns">
            <li><a class="register" v-tap="{methods:toRegister}">{{$t('m.register')}}</a></li>
            <li><a class="forget" v-tap="{methods:toForget}">{{$t('m.forgetPassword')}}</a></li>
        </ul>
        <div class="bottom"><img :src="bottomImg"></div>

        <mt-popup v-model="popupRegister" popup-transition="popup-fade" style="border-radius: .1rem;">
            <register @registered="registered" :popup-register="popupRegister"></register>
        </mt-popup>
    </div>
</template>
<script>
    import passwordHideImg from '../../../static/images/passwordHide.png'
    import passwordOpenImg from '../../../static/images/passwordOpen.png'
    import verificationCode from '../../commons/components/VerificationCode.vue'
    import inputLight from '../../commons/components/InputLight.vue'
    import ButtonItem from '../../commons/components/ButtonItem.vue'
    import WizardSheet from '../../commons/components/wizardSheet.vue'
    import register from './register.vue'
    import remote from '../../lib/js/remote'
    import { MessageBox, Toast } from 'mint-ui'
    import { getLanguage } from '../../lib/js/storage'
    import { plusReady } from '../../lib/js/plusReady'
    import { encryptKey } from '../../lib/js/crypto'
    export default {
        name: 'login',
        components:{
            verificationCode,
            inputLight,
            ButtonItem,
            WizardSheet,
            register
        },
        data () {
            return {
                logo: require('../../../static/images/LOGO.png'),
                msg: 'EOS钱包',
                bottomImg: require('../../../static/images/loginBak.png'),
                popupRegister: false,
                username: '',
                password: ''
            }
        },
        mounted () {
            // 获取行情
            remote.markets().then(response => {
                let market = {}
                let tokenspace = {}
                let data = response.data.data || []
                data.forEach((item, index) => {
                    let price = item.marketPrice.replace(/[¥,]/g,'')-0
                    market[item.marketDetail] = isNaN(price) ? 0 : price
                    tokenspace[item.marketDetail] = item.marketId
                })
                window.sessionStorage.setItem('tokenspace', JSON.stringify(tokenspace))
                window.sessionStorage.setItem('market', JSON.stringify(market))
            }).catch(error => {
                console.log(error)
            })
            if (this.$store.state.registerState) {
                this.popupRegister = true
            }
            // 设置语言
            let language = getLanguage() || 'CHINESE'
            this.$store.commit('setLanguage', language)
        },
        methods:{
            //注册框弹出
            toRegister(){
                this.popupRegister = true
            },
            // 注册完成
            registered () {
                this.popupRegister = false
            },
            //忘记密码页跳转
            toForget(){
                this.$router.push({
                    path: '/forget',
                    query: {
                        pageName: 'forgetPassword'
                    }
                })
            },
            //登陆逻辑
            login(){
                document.activeElement.blur()
                if (!this.username) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.usernamePlaceholder'))
                    return
                }
                if ( !this.password) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.passwordPlaceholder'))
                    return
                }
                let param = {
                    username: this.username,
                    password: encodeURIComponent(encryptKey(this.password)),
                    device: ''
                }
                if (window.plus) {
                    param.device = encodeURIComponent(encryptKey(window.plus.device.uuid))
                    let networkinfo = window.plus.networkinfo.getCurrentType()
                    if (networkinfo === window.plus.networkinfo.CONNECTION_NONE) {
                        Toast(this.$t('m.networkAnomaly'))
                        return false
                    }
                } else {
                    param.device = 1
                }
                plusReady(() => {
                    window.plus.nativeUI.showWaiting('正在登录...')
                })
                remote.login(param).then(response => {
                    if (response.data === -1) {
                        plusReady(() => {
                            window.plus.nativeUI.closeWaiting()
                        })
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.loginFailed'))
                        return
                    }
                    if (response.data === -2) {
                        plusReady(() => {
                            window.plus.nativeUI.closeWaiting()
                        })
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.loginFailed'))
                        return
                    }
                    if (response.data === -3) {
                        plusReady(() => {
                            window.plus.nativeUI.closeWaiting()
                        })
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.loginError'))
                        return
                    }
                    window.sessionStorage.setItem('token', response.data)
                    remote.query_user({ ticket: response.data }).then((response) => {
                        let user = {
                            username: response.data.username,
                            phone: response.data.phone,
                            email: response.data.email
                        }
                        window.sessionStorage.setItem('user', JSON.stringify(user))
                        // this.$store.commit('setUsername', user.username)
                        this.$router.replace({ path: '/assets'})
                    })
                    this.$store.commit('setToken', response.data)
                }).catch(error => {
                    console.log(error)
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.loginFailed'))
                })
            }
        }
    }
</script>
<style scoped>
    .page{
        width:100%;
        height:100%;
    }
    .logo{
        width:2rem;
        height:2rem;
        margin:0 auto;
        padding-top:2.04rem;
    }
    .logo img{
        width:100%;
        height:100%;
    }
    .logo~p{
        height:0.34rem;
        line-height:0.34rem;
        margin:0.47rem auto 0.96rem;
        font-size:0.36rem;
        text-align:center;
        color:#374452;
    }
    .username {
        width: 8.29rem;
        height: 1.43rem;
        border-width: 0 !important;
        border-radius: .2rem;
        background-color: #E2EAEE;
    }
    .password {
        width: 8.29rem;
        height: 1.43rem;
        border-width: 0 !important;
        border-radius: .2rem;
        margin-top: .37rem;
        background-color: #E2EAEE;
    }
    .login{
        display: block;
        margin:.61rem auto 0.6rem;
    }
    .btns{
        font-size:0.4rem;
        color:#29DC54;
        display: flex;
        justify-content: space-around;
    }
    .btns li{
        color:#29DC54;
    }
    .bottom{
        margin-top:1.15rem;
    }
</style>