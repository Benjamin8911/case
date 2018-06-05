<template>
    <div class="register-page">
        <div class="close-box" v-tap="{ methods: closePassword }">
            <span class="close"></span>
        </div>
        <div class="frame-username" v-show="flow === 'username'">
            <h1 class="title">{{$t('m.registration')}}</h1>
            <input-light class="username" ref="input" clear :placeholder="$t('m.enterAccount')" v-model="username" :maxlength="50" @input="changeUsername"></input-light>
            <div class="false-hints" v-show="usernameError">{{$t('m.registered')}}</div>
            <button-item class="btn" :title="$t('m.next')" :disabled="legalUsername" v-tap="{methods: next}"></button-item>
            <div class="agreement">{{$t('m.readAngAgree')}}<a v-tap.prevent="{methods:toAgreement}">《{{$t('m.userProtocol')}}》</a></div>
        </div>
        <div class="frame-verify" v-show="flow === 'verify'">
            <h1 class="title">{{$t('m.verification')}}</h1>
            <div class="reminder">
                <p>{{$t('m.sentToAccount')}}</p>
                <p class="username">{{username}}</p>
                <p>{{$t('m.sentVerification')}}</p>
            </div>
            <p class="verify-label">{{$t('m.verificationPlaceholder')}}</p>
            <verification-code v-model="verify" @commit="commitVerification" @input="inputVerification"></verification-code>
            <div class="false-hints" v-show="versficationError">{{$t('m.versficationError')}}</div>
            <a class="regain" v-tap="{methods: getVerify}">{{$t('m.recapture')+recapture}}</a>
        </div>
        <div class="frame-password" v-show="flow === 'password'">
            <h1 class="title">{{$t('m.setPassword')}}</h1>
            <input-light v-model="password" clear :placeholder="$t('m.confirmPlaceholder')" type="password"></input-light>
            <div class="false-hints" v-show="checkPassword">{{$t('m.passwordNotice')}}</div>
            <input-light v-model="passwordAgain" clear :placeholder="$t('m.confirmPlaceholder')" type="password"></input-light>
            <div class="false-hints" v-show="checkPasswordAgain">{{$t('m.confirmNotice')}}</div>
            <button-item class="btn" :title="$t('m.confirm')" :disabled="canCommit" v-tap="{methods: commit}"></button-item>
        </div>
    </div>
</template>

<script>
    import VerificationCode from '../../commons/components/VerificationCode.vue'
    import InputLight from '../../commons/components/InputLight.vue'
    import ButtonItem from '../../commons/components/ButtonItem.vue'
    import remote from '../../lib/js/remote'
    import { decryptByKey } from '../../lib/js/crypto'
    import { MessageBox, Toast } from 'mint-ui'
    export default {
        name: 'register',
        props: {
            popupRegister: Boolean
        },
        watch: {
            popupRegister (nv, ov) {
                this.flow = 'username',
                this.username = '',
                this.usernameError = false,
                this.verify = '',
                this.verifyServer = '',
                this.versficationError = false,
                this.password = '',
                this.passwordAgain = '',
                this.recapture = ''
            }
        },
        data () {
            return {
                flow: 'username',
                username: '',
                usernameError: false,
                verify: '',
                verifyServer: '',
                versficationError: false,
                password: '',
                passwordAgain: '',
                recapture: ''
            }
        },
        mounted () {
            // 获取用户名并清空store中的用户名
            let registerState = this.$store.state.registerState
            this.username = registerState === 'register' ? '' : registerState
            setTimeout(() => {
                this.$store.commit('setRegisterState', '')
            }, 100);
        },
        components:{
            VerificationCode,
            InputLight,
            ButtonItem
        },
        computed: {
            legalUsername () {
                let isPhone = !!this.username.match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)
                let isEmail = !!this.username.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
                return !isPhone && !isEmail
            },
            checkPassword () {
                return !this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)
            },
            checkPasswordAgain () {
                return this.password !== this.passwordAgain
            },
            canCommit () {
                return this.checkPassword || this.checkPasswordAgain
            }
        },
        methods: {
            init () {
                this.flow = 'username'
                this.username = ''
                this.usernameError = false
                this.verify = ''
                this.verifyServer = ''
                this.versficationError = false
                this.password = ''
                this.passwordAgain = ''
            },
            changeUsername () {
                this.usernameError = false
            },
            toAgreement () {
                // 把用户名保存
                if (this.username) {
                    this.$store.commit('setRegisterState', this.username)
                } else {
                    this.$store.commit('setRegisterState', 'register')
                }
                this.$router.push({
                    path: '/protocol',
                    query: {
                        pageName: 'fromRegister'
                    }
                })
            },
            next () {
                document.activeElement.blur()
                if (this.legalUsername) {
                    return false
                }
                // 判断注册类型是邮箱还是手机
                if (this.username.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
                    this.userType = 'email'
                }
                if (this.username.match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)) {
                    this.userType = 'phone'
                }
                if (window.plus) {
                    let networkinfo = window.plus.networkinfo.getCurrentType()
                    if (networkinfo === window.plus.networkinfo.CONNECTION_NONE) {
                        Toast({
                            message: this.$t('m.networkAnomaly'),
                            className: 'toast-class'
                        })
                        return false
                    }
                }
                // 判断是否可以注册
                let checkParams = {
                    param: this.username,
                    type: ''
                }
                checkParams.type = this.userType === 'email' ? '3' : '2'
                remote.check_user_legality(checkParams).then((response) => {
                    if (response.data) {
                        // 可以注册发送验证码
                        this.getVerify()
                    } else {
                        this.usernameError = true
                    }
                })
            },
            getVerify () {
                if (this.recapture) {
                    return
                }
                // 可以注册发送验证码
                let param = {
                    data: this.username,
                    type: '',
                    code: '1'
                }
                param.type = this.userType === 'email' ? '1' : '2'
                remote.send_sms(param).then(response => {
                    if (response.status === 200 || response.status === 0) {
                        let verifyCode = response.data.data
                        if (verifyCode.length === 6) {
                            this.verifyServer = verifyCode
                        } else {
                            this.verifyServer = decryptByKey(response.data.data, '83ecc5e88e4e98fc7d2ef7cd5af00236')
                        }
                        this.flow = 'verify'
                        this.recaptureVerification()
                    }
                }).catch(error => {
                    console.log(error);
                });
                this.versficationError = false
            },
            inputVerification () {
                this.versficationError = false
            },
            commitVerification () {
                if (this.verify === this.verifyServer) {
                    // 前端验证码校验通过
                    this.flow = 'password'
                } else {
                    this.versficationError = true
                }
            },
            recaptureVerification () {
                let recapture = 60
                let interval = setInterval(() => {
                    this.recapture = ` ${recapture}`
                    recapture -= 1
                    if (recapture === 0) {
                        this.recapture = ''
                        clearInterval(interval)
                    }
                }, 1000)
            },
            commit () {
                if (this.canCommit) {
                    return false
                }
                let param = {
                    username: this.username,
                    password: this.password,
                    code: this.verify
                }
                param[this.userType] = this.username
                if (this.userType === 'email') {
                    param.username = param.username.substr(0, param.username.indexOf('@'))
                    param.username = param.username.replace(/[^0-9A-Za-z]/g, '')
                }
                remote.register(param).then(response => {
                    if (response.data === 200) {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.SuccessfulRegistration'))
                        this.username = param.username
                        this.password = param.password
                    } else {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.FailRegister'))
                    }
                    this.init()
                    this.$emit('registered')
                }).catch(error => {
                    console.log(error)
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.FailRegister'))
                    this.$emit('registered')
                })
            },
            closePassword () {
                this.flow = 'username'
                this.$emit('registered')
            }
        }
    }
</script>

<style scoped>
.register-page {
    width:9.08rem;
    height:7.57rem; 
    background: #fff;
    border-radius: .10rem; 
    padding-top: 1.06rem;
}
.frame-username, .frame-password {
    padding: 0 .51rem;
}
.frame-username .title{
    margin-bottom:1.39rem;
}
.title {
    font-size:.54rem;
    font-weight: normal;
    color:#29DC54;
    text-align: center;
}
.false-hints {
    font-size:0.36rem;
    color:#FF6D6E;
    margin: 0.2rem 5% 0;
}
.frame-verify .false-hints {
    text-align: center;
}
.btn {
    display: block;
    margin: .46rem auto 0;
}
.reminder {
    width:5.8rem;
    height:1.72rem;
    font-size:0.36rem;
    color:rgba(170,170,170,1);
    margin:0 auto 0.71rem auto;
    text-align:center;
}
p.username {
    font-size:0.42rem;
    color:#555555;
}
.verify-label {
    height:0.4rem;
    line-height:0.4rem;
    font-size:0.42rem;
    color:rgba(85,85,85,1);
    text-align:center;
    margin-bottom:0.42rem;
}
.regain {
    height:0.39rem;
    display: block;
    line-height:0.39rem;
    font-size:0.4rem;
    color:rgba(66,189,254,1);
    text-align:center;
    margin-top:0.68rem;
}
.agreement {
    font-size:0.3rem;
    margin-top:0.64rem;
    text-align:center;
    color:#AAA;
}
.agreement a {
    color:#42BDFE;
}
.close-box {
    position: absolute;
    top: .2rem;
    right: .2rem;
}
.close{
    display: inline-block;
    width: .04rem;
    height: .848rem;
    margin: 0 .4rem;
    background: #aaa;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.close:after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: .04rem;
    height: .848rem;
    background: #aaa;
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
}
</style>