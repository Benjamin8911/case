<template>
    <div class="import-mnocis">
        <p class="label">输入助记词</p>
        <textarea class="enter-area" placeholder="请输入助记词，以空格分隔" v-model="mnocis" tabindex="-1"></textarea>
        <p class="label">设置钱包密码</p>
        <div class="enter-wrapper">
            <input-light :placeholder="$t('m.passwordPlaceholder')" type="password" clear v-model="password" @blur="changeCheck(true)"></input-light>
            <p class="notice" v-show="checkPassword && checkFlag">{{$t('m.passwordNotice')}}</p>
            <input-light :placeholder="$t('m.confirmPlaceholder')" type="password" clear v-model="passwordAgain" @blur="changeCheckAgain(true)"></input-light>
            <p class="notice" v-show="identifyPassword && checkFlagAgain">{{$t('m.confirmNotice')}}</p>                              
        </div>
        <div class="bottom-wrapper">
            <radio-check class="radio" v-model="radioCheckOne" @check-agreement="checkAgreement"></radio-check>
            <button-item title="开始导入" :disabled="isDisabled" v-tap="{ methods: importMnocis }"></button-item>
            <div class="question" v-tap="{ methods: jump, path: 'question', question: 'mnemonic'}">{{$t('m.whatMnemonic')}}？</div>
        </div>
    </div>
</template>

<script>
    import InputLight from './InputLight.vue'
    import RadioCheck from './RadioCheck.vue'
    import ButtonItem from './ButtonItem.vue'
    import remote from '../../lib/js/remote'
    import { encryptByKey } from '../../lib/js/crypto'
    import { plusReady } from '../../lib/js/plusReady'
    import { MessageBox } from 'mint-ui'
    export default {
        name: 'ImportMnocis',
        data () {
            return {
                mnocis: '',
                password: '',
                passwordAgain: '',
                radioCheckOne: false,
                checkFlag: false,
                checkFlagAgain: false
            }
        },
        components: {
            InputLight,
            RadioCheck,
            ButtonItem
        },
        computed: {
            checkPassword () {
                return !this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)
            },
            identifyPassword () {
                return this.password !== this.passwordAgain
            },
            isDisabled () {
                return this.mnocis === '' || this.checkPassword || this.identifyPassword || !this.radioCheckOne
            }
        },
        methods: {
            checkAgreement () {
                this.$router.push({
                    path: '/agreement',
                    query: {
                        pageName: 'private'
                    }
                })
            },
            jump (params) {
                this.$router.push({
                    path: `/${params.path}`,
                    query: {
                        question: params.question
                    }
                })
            },
            importMnocis () {
                if (this.isDisabled) {
                    return
                }
                this.mnocis = this.mnocis.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g,'')
                if (this.mnocis.split(' ').length !== 12) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.mnemonicError'))
                    return
                }
                plusReady(() => {
                    window.plus.nativeUI.showWaiting('正在导入钱包...')
                })
                // TODO 导入助记词
                let ticket = this.$store.state.token
                let param = {
                    password: encodeURIComponent(encryptByKey(this.password, ticket)),
                    mnocis: encodeURIComponent(encryptByKey(this.mnocis, ticket)),
                    ticket: ticket
                }
                remote.find_wallet(param).then(response => {
                    // 导入成功
                    this.$emit('import', response.data)
                }).catch(error => {

                })
            },
            changeCheck (bool) {
                this.checkFlag = bool
            },
            changeCheckAgain (bool) {
                this.checkFlagAgain = bool
            }
        }
    }
</script>

<style scoped> 
    .label{
        width: 9.84rem;
        font-size: 0.3rem;
        line-height: 1;
        color: #A6AFBA;
        padding: 0.2rem 0;
    }
    .enter-area{
        width: 9rem;
        padding: 0.42rem;
        min-height: 2.61rem;
        resize: none;
        outline: none;
        border: none;
        border-radius: 0.15rem;
        color: #A6AFBA;
        font-size: 0.42rem;
        text-align: center;
        line-height: 2;
    }
    .enter-wrapper{
        width: 9.84rem;
        height: 4.09rem;
        background-color: #ffffff;
        padding: 1.1rem 0;
        border-radius: 0.15rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .notice{
        color: #F43E3A;
        font-size: 0.36rem;
        width: 8.09rem;
        line-height: 1;
        text-indent: 0.44rem;
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
    }
    .bottom-wrapper{
        margin-top: .8rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .radio{
        margin-bottom: 0.35rem;
    }
    .question{
        color: #29DC54;
        font-size: 0.4rem;
        margin-top: 0.92rem;
    }
    ::-webkit-input-placeholder{
        color: #A6AFBA;
        font-size: 0.42rem;
        text-align: center;
    }
</style>