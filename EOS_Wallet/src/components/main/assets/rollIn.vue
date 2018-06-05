<template>
    <div class="roll-in">
        <!-- 返回/标题 -->
        <header-item :title="$t('m.rollIn')" back-icon="light"></header-item>
        <hr />
        <!-- 选择币种 -->
        <choice-currency v-model="currency" @selected-coin="selectedCurrency"></choice-currency>
        <!-- 二维码 -->
        <div class="qr">
            <input type="text" :placeholder="$t('m.enterTransfers')" v-model="number" @blur="changeNumber">
            <canvas class="qr-code" id="qr-code"></canvas>
            <!-- <img :src="imgSrc"> -->
            <p class="tips">{{$t('m.transferAssets')}}</p>
        </div>
        <img scr="base64data"> 
        <!-- 账号复制操作 -->
        <div class="copy">
            <p class="account" :style="accountStyle">{{account}}</p>
            <button id="copy" data-clipboard-action="copy" :data-clipboard-text="account" v-if="isSupported">{{$t('m.copy')}}</button>
        </div>
    </div>
</template>

<script>
    import ChoiceCurrency from '../../../commons/components/ChoiceCurrency.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import QRCode from 'qrcode'
    import Clipboard from 'clipboard'
    import { Toast } from 'mint-ui'
    
    export default {
        data () {
            return {
                account: "",
                currency: 9,
                number: '',
                opts: { margin: 1 },
                // imgSrc: ''
                isSupported: false
            }
        },
        components: {
            ChoiceCurrency,
            HeaderItem
        },
        computed: {
            accountStyle () {
                if (!this.isSupported) {
                    return {
                        maxWidth: '10rem',
                        marginLeft: 0,
                        overflow: 'auto'
                    }
                }
                return {}
            }
        },
        mounted () {
            this.account = this.$store.state.activeWallet.walletAddress
            let QRContent = {
                account: this.account,
                currency: this.currency,
                number: this.number
            }
            let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.opts.width = windowWidth / 10.8 * 5.32
            this.isSupported = Clipboard.isSupported()
            if (this.isSupported) {
                let clipboard = new Clipboard("#copy")
                clipboard.on('success', e => {
                    Toast(this.$t('m.copySuccess'))
                })
            }
            this.toCanvas(QRContent)
        },
        methods: {
            selectedCurrency (index, param) {
                let QRContent = {
                    account: this.account,
                    currency: index,
                    number: this.number
                }
                this.toCanvas(QRContent)
            },
            changeNumber () {
                let QRContent = {
                    account: this.account,
                    currency: this.currency,
                    number: this.number
                }
                this.toCanvas(QRContent)
            },
            toCanvas (QRContent) {
                QRCode.toCanvas(document.getElementById("qr-code"), "kpl-QRCode" + JSON.stringify(QRContent), this.opts)
            }
        }
    }
</script>

<style scoped>
    .roll-in {
        height: 100%;
    }
    .qr {
        height: 9.07rem;
        margin: .24rem .48rem 0;
        border-radius: .15rem;
        text-align: center;
        background-color: #FFF;
    }
    .qr > input {
        font-size: .42rem;
        width: 6.03rem;
        height: 1rem;
        margin-top: .56rem;
        border-width: 0 0 1px;
        border-color: rgba(41,220,84,0.5);
        color: #374452;
        background-color:transparent;
        text-align: center;
    }
    .qr-code {
        width: 5.32rem;
        height: 5.32rem;
        margin: .47rem auto 0;
        background-color: #fff;
    }
    .tips {
        font-size: .36rem;
        margin-top: .61rem;
        color: #F43E3A;
        text-align: center;
    }
    .copy {
        position: relative;
        height: 1.79rem;
        margin: .24rem .48rem 0;
        border-radius: .15rem;
        background-color: #FFF;
    }
    .account {
        height: 1.79rem;
        line-height: 1.79rem;
        max-width: 7.5rem;
        margin-left: .5rem;
        font-size: .3rem;
        text-align: center;
        color: #797985;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .copy > button {
        position: absolute;
        right: .47rem;
        top: 0;
        height: 1.79rem;
        border: 0;
        line-height: 1.79rem;
        font-size: .36rem;
        color: #29DC54;
        background-color: transparent;
        outline: none;
    }
    input::-webkit-input-placeholder {
        color: #A6AFBA;
    }
</style>