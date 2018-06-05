<template>
    <div class="page">
        <header-item :title="title"></header-item>
        <div class="wrapper">
            <input-light :placeholder="$t('m.enterAccount')" v-model="phoneNumber" @blur="checkPhone(true)" @focus="checkPhone(false)" clear></input-light>
            <span class="notice" v-show="isError" v-text="accountNotice"></span>
            <input-light type="number" :placeholder="$t('m.verificationPlaceholder')" v-model="vCode" :verifyDisabled="verifyDisabled" :verificationCode="$t('m.verificationCode')" @get-VCode="getvcode"></input-light>
            <input-light type="password" :placeholder="$t('m.passwordPlaceholder')" v-model="password" @blur="startValidate('psdFlag')" @focus="endValidate('psdFlag')" clear></input-light>
            <span class="notice" v-show="isValid" v-text="$t('m.passwordNotice')"></span>
            <input-light type="password" :placeholder="$t('m.confirmPlaceholder')" v-model="confirmPassword" @blur="startValidate('cfmPsdFlag')" @focus="endValidate('cfmPsdFlag')" clear></input-light>
            <span class="notice" v-show="isEqual" v-text="$t('m.confirmNotice')"></span>
            <button-item class="btn" :title="btnTitle" :disabled="btnDisabled" v-tap="{methods: submit}"></button-item>
        </div>
    </div>
</template>

<script>
    import InputLight from '../../commons/components/InputLight.vue'
    import HeaderItem from '../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../commons/components/ButtonItem.vue'
    import remote from '../../lib/js/remote'
    import {REGS} from '../../constant'
    import { MessageBox, Toast } from 'mint-ui'
    import { decryptByKey, encryptKey } from '../../lib/js/crypto'

    export default {
        name: '',
        components: {
            InputLight,
            HeaderItem,
            ButtonItem
        },
        data () {
            return {
                phoneNumber: null,
                vCode: null,
                vCodeFromServer: '',
                password: '',
                confirmPassword: '',
                phoneFlag: false,
                psdFlag: false,
                cfmPsdFlag: false,
                pageName: '',
                verifyDisabled: false,
                accountNotice: ''
            }
        },
        computed: {
            title () {
                return this.pageName === 'editPassword' ? this.$t('m.modifyLoginPassword') : this.$t('m.forgetPassword')
            },
            btnTitle () {
                return this.pageName === 'editPassword' ? this.$t('m.confirm') : this.$t('m.getBackPassword')
            },
            isError () {
                if (this.phoneFlag === 'phone') {
                    return !REGS.phone.test(this.phoneNumber)
                } else if (this.phoneFlag === 'email') {
                    return !REGS.email.test(this.phoneNumber)
                }
                return false
            },
            isValid () {
                if (this.psdFlag) {
                    return !REGS.loginPsd.test(this.password)
                }
                return false
            },
            isEqual () {
                if (this.cfmPsdFlag) {
                    return this.confirmPassword !== this.password
                }
                return false
            },
            btnDisabled () {
                // 手机号合法&&密码合法&&密码确认
                return !(!this.isError && REGS.vcode.test(this.vCode) && REGS.loginPsd.test(this.password) && this.password === this.confirmPassword)
            }
        },
        methods: {
            // 验证手机
            checkPhone (flag) {
                if (!this.phoneNumber) {
                    return
                }
                if (flag) {
                    let isPhone = this.phoneNumber.indexOf('@') === -1
                    this.phoneFlag = isPhone ? 'phone' : 'email'
                    this.accountNotice = isPhone ? this.$t('m.correctPhone') : this.$t('m.correctMailbox')
                } else {
                    this.phoneFlag = ''
                }
            },
            // 获取验证码
            getvcode (vm) {
                if (window.plus) {
                    let networkinfo = window.plus.networkinfo.getCurrentType()
                    if (networkinfo === plus.networkinfo.CONNECTION_NONE) {
                        Toast(this.$t('m.networkAnomaly'))
                        return false
                    }
                }
                if (!this.phoneNumber) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.enterAccount'))
                    return
                }
                this.checkPhone(true)
                if (this.isError) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.accountNotice)
                }
                // this.verifyDisabled = true
                this.vCodeFromServer = ''
                let type = this.phoneNumber.indexOf('@') === -1 ? '2' : '1'
                remote.send_sms({
                    data: this.phoneNumber,
                    type: type,
                    code: 2
                }).then((res) => {
                    if ([0, 200].indexOf(res.data.status) !== -1) {
                        this.vCodeFromServer = decryptByKey(res.data.data, this.$store.state.token)
                        vm.setinterval()
                        this.verifyDisabled = true
                    } else if (res.data.status === 510) {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.unregistered'))
                        vm.interval = 'null'
                    }
                }).catch((err) => {
                    console.log('获取验证码失败')
                    vm.interval = 'null'
                })
            },
            // 设置开始输入验证
            startValidate (key) {
                this[key] = true
            },
            // 设置停止输入验证
            endValidate (key) {
                this[key] = false
            },
            // 提交
            submit () {
                if (!this.btnDisabled) {
                    if (this.vCodeFromServer !== this.vCode) {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.versficationError'))
                        return
                    }
                    remote.find_password({
                        telephone: this.phoneNumber,
                        newPassword: encodeURIComponent(encryptKey(this.password, '869cce8344e7ea8562070e511946cb03')),
                        code: this.vCode
                    }).then(res => {
                        if (res.data.data === '209') {
                            // 修改成功
                            MessageBox.close()
                            MessageBox.alert(this.$t('m.modifySuccess'), this.$t('m.tips')).then(action => {
                                this.$router.goBack()
                            })
                        } else {
                            // 修改失败
                            MessageBox.close()
                            MessageBox(this.$t('m.tips'), this.$t('m.modifyFailure'))
                        }
                    }).catch(err => {
                        // 请求错误
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.modifyFailure'))
                    })
                }
            }
        },
        created () {
            /**
             * editPassword    修改密码
             * forgetPassword  忘记密码(找回)
             */ 
            this.pageName = this.$route.query.pageName
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
        font-family: PingFangSC-Light;
        text-indent: 0.44rem;
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
    }
    .btn{
        margin-top: 1.08rem;
        margin-bottom: 1.2rem;
    }
</style>