<template>
    <div class="page">
        <header-item :title="title"></header-item>
        <hr />
        <div class="wrapper">
            <input-light type="text" :placeholder="$t('m.emailPlaceholder')" v-model="emailAddress" clear @blur="checkemail(true)"></input-light>
            <span class="notice" v-show="isError" v-text="$t('m.emailNotice')"></span>
            <span class="notice" v-show="isRepeat" v-text="$t('m.phoneRepeat')"></span>
            <input-light type="number" :placeholder="$t('m.verificationPlaceholder')" v-model="vCode" :verificationCode="$t('m.verificationCode')" @get-VCode="getvcode"></input-light>
            <span></span>
            <button-item class="btn" :title="$t('m.confirm')" :disabled="!btnAbled" v-tap="{methods: submit}"></button-item>
        </div>
    </div>
</template>

<script>
    import InputLight from '../../../commons/components/InputLight.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import remote from '../../../lib/js/remote'
    import {REGS} from '../../../constant'
    import { decryptByKey } from '../../../lib/js/crypto'
    import { MessageBox } from 'mint-ui'

    export default {
        name: '',
        components: {
            InputLight,
            HeaderItem,
            ButtonItem
        },
        data () {
            return {
                title: '',
                emailAddress: '',
                vCode: null,
                isError: false,
                isRepeat: false,
                vCodeFromServer: ''
            }
        },
        mounted () {
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            if (user.email) {
                this.title = this.$t('m.change') + this.$t('m.mailboxBind')
            } else {
                this.title = this.$t('m.mailboxBind')
            }
        },
        computed: {
            btnAbled () {
                // return this.vCode === parseInt(this.vCodeFromServer) && REGS.email.test(this.emailAddress)
                // 邮箱合法及验证码合法时可提交
                return this.emailAddress && REGS.email.test(this.emailAddress) && !this.isError && REGS.vcode.test(this.vCode)
            }
        },
        methods: {
            checkemail (flag) {
                if (flag) {
                    if (!REGS.email.test(this.emailAddress)) {
                        this.isError = true
                    } else {
                        remote.check_user_legality({
                            param: this.emailAddress,
                            type: 3
                        }).then((res) => {
                            this.isRepeat = !res.data
                        }).catch((err) => {
                            // 
                        })
                    }
                } else {
                    this.isError = false
                    this.isRepeat = false
                }
            },
            getvcode (vm) {
                document.activeElement.blur()
                if (!this.emailAddress) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.emailPlaceholder'))
                    return
                }
                if (!REGS.email.test(this.emailAddress)) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.emailNotice'))
                    return
                }
                if (this.isError || this.isRepeat) {
                    return
                }
                remote.check_user_legality({
                    param: this.emailAddress,
                    type: 3
                }).then((res) => {
                    if (res.data) {
                        this.vCodeFromServer = ''
                        remote.send_sms({
                            data: this.emailAddress,
                            type: '1',
                            code: '1'
                        }).then((res) => {
                            if ([0, 200].indexOf(res.data.status) !== -1) {
                                let verifyCode = res.data.data
                                if (verifyCode.length === 6) {
                                    this.vCodeFromServer = verifyCode
                                } else {
                                    this.vCodeFromServer = decryptByKey(res.data.data, '83ecc5e88e4e98fc7d2ef7cd5af00236')
                                }
                                vm.setinterval()
                            } else {
                                if (res.data.status === 507) {
                                    // MessageBox(this.$t('m.tips'), this.$t('m.bound'))
                                }
                                if (res.data.status === 503) {
                                    MessageBox.close()
                                    MessageBox(this.$t('m.tips'), this.$t('m.frequentOperation'))
                                }
                                vm.interval = 'null'
                            }
                        }).catch((error) => {
                            console.log('获取验证码失败')
                            vm.interval = 'null'
                        })
                    }
                }).catch((err) => {
                    // 
                })
            },
            submit () {
                if (this.btnAbled) {
                    // 提交请求
                    if (this.vCodeFromServer === this.vCode) {
                        remote.bing_email({
                            param: this.emailAddress,
                            ticket: this.$store.state.token
                        }).then(res => {
                            if (res.data.data === '244') {
                                MessageBox.close()
                                MessageBox(this.$t('m.tips'), this.$t('m.bindFail'))
                            } else {
                                MessageBox.close()
                                MessageBox(this.$t('m.tips'), this.$t('m.bindSuccess'))
                                let user = JSON.parse(window.sessionStorage.getItem('user'))
                                user.email = this.emailAddress
                                window.sessionStorage.setItem('user', JSON.stringify(user))
                                this.$router.goBack()
                            }
                        })
                    } else {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.versficationError'))
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .wrapper{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.28rem;
    }
    .notice{
        width: 8.09rem;
        color: #FF6D6E;
        font-size: 0.4rem;
        text-indent: 0.44rem;
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
    }
    .btn{
        margin-top: 1.08rem;
        margin-bottom: 1.2rem;
    }
</style>