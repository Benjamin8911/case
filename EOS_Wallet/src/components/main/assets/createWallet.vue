<template>
    <div class="create-password">
        <header-item :title="$t('m.createWallet')" bg="#fff"></header-item>
        <p class="warn">
            {{$t('m.notice')}}<br>
            1.{{$t('m.noticeContent.msg4')}}<br />
            2.{{$t('m.noticeContent.msg5')}}
        </p>
        <div class="content">
            <input-light :placeholder="$t('m.walletName')" v-model="walletName" clear></input-light>
            <input-light type="password" :placeholder="$t('m.passwordPlaceholder')" v-model="password" @blur="changeCheck(true)" clear></input-light>
            <p class="warn-tips" v-show="checkPassword && checkFlag">{{$t('m.passwordNotice')}}</p>
            <input-light type="password" :placeholder="$t('m.confirmPlaceholder')" v-model="passwordAgain" clear @blur="changeCheckAgain(true)"></input-light>
            <p class="warn-tips" v-show="identifyPassword && checkFlagAgain">{{$t('m.confirmNotice')}}</p>
            <p class="tips">
                <span class="radio" :class="radioClass" @click="checkRadio"></span>
                {{$t('m.readAgree')}}
                <a class="agreement" v-tap="{methods: jump}">《{{$t('m.userProtocol')}}》</a>
            </p>
            <button-item class="btn-ok" :title="$t('m.confirm')" v-tap="{ methods: commit }" :disabled="isDisabled"></button-item>
            
        </div>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import InputLight from '../../../commons/components/InputLight.vue'
    import remote from '../../../lib/js/remote'
    import { addList, updateList } from '../../../lib/js/storage'
    import { encrypt, MD5 } from '../../../lib/js/crypto'
    import { plusReady } from '../../../lib/js/plusReady'

    export default {
        name: 'createPassword',
        data () {
            return {
                walletName: "",
                password: "",
                passwordAgain: "",
                isRadioChecked: false,
                checkFlag: false,
                checkFlagAgain: false
            }
        },
        computed: {
            isDisabled () {
                return !this.walletName || !this.password || !this.passwordAgain || this.checkPassword || this.identifyPassword || !this.isRadioChecked
            },
            radioClass () {
                return {
                    checked: this.isRadioChecked,
                    cancelChecked: !this.isRadioChecked
                }
            },
            checkPassword () {
                return !this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)
            },
            identifyPassword () {
                return this.password !== this.passwordAgain
            }
        },
        components: {
            HeaderItem,
               ButtonItem,
               InputLight
        },
        methods: {
            commit () {
                if (!this.isDisabled) {
                    plusReady(() => {
                        window.plus.nativeUI.showWaiting('正在新建钱包...')
                    })
                    let token = window.sessionStorage.getItem('token')
                    let tokenspace = JSON.parse(window.sessionStorage.getItem('tokenspace'))
                    remote.create_wallet({ password: this.password }, token).then(response => {
                        let data = response.data
                        let wallet = {
                            asset: 0,
                            walletName: this.walletName,               // 钱包名称
                            keystore: data.keystore,               // keystore
                            mnocis: data.mnocis,                   // 助记词
                            walletImg: '',                             // 钱包图片
                            walletAddress: '0x' + data.keystore.address,  // 钱包地址
                            assetsList: [],                             // 钱包下的资产列表
                            privateKey: data.privatekey             //私钥
                        }
                        wallet.walletImg = "wallet" + Math.floor(Math.random()*5+1)
                        // 加密钱包内容
                        addList(this.$store.state.storageWallet, encrypt(JSON.stringify(wallet)))
                        // let walletList = this.$store.state.walletList
                        // walletList.push(wallet)
                        this.$store.commit('setWalletList', [])
                        this.$router.goBack()
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            checkRadio () {
                this.isRadioChecked = !this.isRadioChecked
            },
            jump () {
                this.$router.push({
                    path: '/agreement',
                    query: {
                        pageName: 'agreement'
                    }
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
    .create-password {
        height: 100%;
        background-color: #FFFFFF;
    }
    .warn {
        font-size: .36rem;
        padding: .25rem .83rem; 
        line-height: .64rem;
        color: #fff;
        background-color: #F43E3A;
    }
    .content {
        height: 10.42rem;
        padding-top: .72rem;
        margin-top: .24rem;
        background-color: #fff;
    }
    .warn-tips {
        font-size: .36rem;
        padding-top: .1rem;
        margin-left: 1.8rem;
        color: #FF6D6E;
    }
    .btn-ok {
        display: block;
        margin: .76rem auto 0;
    }
    .tips {
        font-size: .36rem;
        margin-top: .8rem;
        color: #AAA;
        text-align: center;
    }
    .agreement {
        color: #29DC54;
    }
    .radio {
        position: relative;
        top: .12rem;
        display: inline-block;
        width: .52rem;
        height: .52rem;
    }
    .checked {
        background: url("../../../../static/images/confirm-1.png") no-repeat;
        background-size: contain;
    }
    .cancelChecked {
        border: #aaa solid 1px;
        border-radius: 100%;
        box-sizing: border-box;
    }
</style>