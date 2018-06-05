<template>
    <div>
        <p class="label">输入Keystore</p>
        <textarea class="enter-area" placeholder="请输入Keystore 文本内容" v-model="keystore" tabindex="-1"></textarea>
        <p class="label">输入钱包密码</p>
        <div class="enter-wrapper">
            <input-light placeholder="请输入钱包密码" type="password" clear v-model="password"></input-light>                          
        </div>
        <div class="bottom-wrapper">
            <radio-check class="radio" v-model="radioCheckOne" @check-agreement="checkAgreement"></radio-check>
            <button-item title="开始导入" :disabled="isDisabled" v-tap="{ methods: importKeystore }"></button-item>
            <div class="question" v-tap="{ methods: jump, path: 'question', question: 'keystore' }">{{$t('m.whatKeystore')}}？</div>
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
        name: 'ImportKeystore',
        data () {
            return {
                keystore: '',
                password: '',
                radioCheckOne: false
            }
        },
        components: {
            InputLight,
            RadioCheck,
            ButtonItem
        },
        computed: {
            isDisabled () {
                return !this.keystore || !this.password || !this.radioCheckOne
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
            importKeystore () {
                if (this.isDisabled) {
                    return
                }
                try {
                    JSON.parse(this.keystore)
                } catch (e) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.keystoreError'))
                    return
                } 
                plusReady(() => {
                    window.plus.nativeUI.showWaiting('正在导入钱包...')
                })
                // TODO 导入Keystore
                let ticket = this.$store.state.token
                let param = {
                    key: ticket,
                    iv: ticket.substr(0, 16),
                    password: encodeURIComponent(encryptByKey(this.password, ticket)),
                    keystore: encodeURIComponent(encryptByKey(this.keystore, ticket)),
                    ticket: ticket
                }
                remote.find_wallet_by_keystore(param).then(response => {
                    // 导入成功
                    this.$emit('import', response.data)
                }).catch(error => {

                })

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
        height: 1.06rem;
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
    .bottom-wrapper{
        margin-top: 3.83rem;
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