<template>
    <div class="mapping">
        <header-item class="header" bg="#ffffff" :title="title" overwrite @back="headerBack"></header-item>
        <ul class="nav">
            <li class="one active">1</li>
            <li class="one-two">
                <i :class="{ active: flow !== 'flow-1' }"></i>
                <i :class="{ active: flow !== 'flow-1' }"></i>
                <i :class="{ active: flow !== 'flow-1' }"></i>
            </li>
            <li class="two" :class="{ active: flow !== 'flow-1' }">2</li>
            <li class="two-three">
                <i :class="{ active: flow === 'flow-3' }"></i>
                <i :class="{ active: flow === 'flow-3' }"></i>
                <i :class="{ active: flow === 'flow-3' }"></i>
            </li>
            <li class="three" :class="{ active: flow === 'flow-3' }">3</li>
        </ul>
        <div class="flow-1" v-show="flow === 'flow-1'">
            <div class="warn">
                <p class="warn-title">{{$t('m.ParticularAttention')}}</p>
                <p class="warn-content">{{$t('m.noticeContent.msg10')}}</p>
            </div>
            <p class="tips">{{$t('m.noticeContent.msg9')}}</p>
            <div class="key">
                <span>{{$t('m.public')}}</span>
                <p v-text="publicKey"></p>
                <span>{{$t('m.private')}}</span>
                <p v-text="privateKey"></p>
            </div>
            <button-item class="btn" :title="$t('m.next')" v-tap="{ methods: toFlow2 }"></button-item>
        </div>
        <div class="flow-2" v-show="flow === 'flow-2'">
            <p class="tips">{{$t('m.noticeContent.msg11')}}</p>
            <div class="key">
                <span>{{$t('m.ETHWallet')}}</span>
                <p v-text="wallet"></p>
                <span>{{$t('m.public')}}</span>
                <p v-text="publicKey"></p>
                <span>{{$t('m.private')}}</span>
                <p class="input" contenteditable ref="input"></p>
            </div>
            <button-item class="btn" :title="$t('m.next')" v-tap="{ methods: toFlow3 }"></button-item>
        </div>
        <div class="flow-3" v-show="flow === 'flow-3'">
            <p class="tips">{{$t('m.noticeContent.msg12')}}</p>
            <div class="key">
                <span>{{$t('m.OfficialAddress')}}</span>
                <p v-text="officialAddress"></p>
                <span>{{$t('m.PaymentWallet')}}</span>
                <p v-text="wallet"></p>
                <span>{{$t('m.minerCost')}}</span>
                <div class="range-plane">
                    <mt-range 
                        class="range" 
                        v-model="rangeValue" 
                        :min="gasPrice*0.5"
                        :max="gasPrice*10"
                        :step="1"
                        :bar-height="5"
                    ></mt-range>
                </div>
            </div>
            <div class="range-label">
                <span>{{$t('m.slow')}}</span>
                <span>{{rangeValueComputed}}  ether</span>
                <span>{{$t('m.fast')}}</span>
            </div>
            <button-item class="btn" :title="$t('m.confirm')" v-tap="{ methods: openPassword }"></button-item>
        </div>

        <!-- 弹出框 -->
        <mt-popup v-model="passwordVisible" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="password-plane">
                <span class="close" @click="closePassword"></span>
                <p>{{$t('m.walletPassword')}}</p>
                <input-light class="password-input" type="password" clear :placeholder="$t('m.passwordPlaceholder')" v-model="password"></input-light>
                <button-item class="btn-confirm" :title="$t('m.confirm')" :disabled="!password" v-tap="{ methods: confirm }"></button-item>
            </div>
        </mt-popup>
        <mt-popup v-model="popupTips" popup-transition="popup-fade" style="border-radius: .1rem;" :closeOnClickModal="false">
            <div class="tips-plane">
                <p class="tips-title">{{$t('m.Reminder')}}</p>
                <p class="tips-content" v-show="state === 'waiting'">{{$t('m.noticeContent.msg15')}}</p>
                <p class="tips-content" v-show="state === 'success'">{{$t('m.noticeContent.msg13')}}</p>
                <div v-show="state === 'success'">
                    <p class="address-title">{{$t('m.ETHWallet')}}</p>
                    <p class="address-content">{{wallet}}</p>
                </div>
                <div>
                    <p class="address-title">{{$t('m.noticeContent.msg14')}}</p>
                    <p class="address-content">{{publicKey}}</p>
                </div>
                <button-item class="btn-back" :title="backText" :disabled="state === 'waiting'" v-tap="{ methods: back }"></button-item>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import InputLight from '../../../commons/components/InputLight.vue'
    import { decryptByKey } from '../../../lib/js/crypto'
    import { plusReady } from '../../../lib/js/plusReady'
    import WEB3 from '../../../web3'
    import eosjs from '../../../eosjs'
    import Transaction from 'ethereumjs-tx'
    import { MessageBox } from 'mint-ui'
    export default {
        name: 'mapping',
        data () {
            return {
                flow: 'flow-1',
                wallet: '',
                publicKey: '',
                privateKey: '',
                officialAddress: '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf',
                rangeValue: 0,
                gasPrice: 0,
                passwordVisible: false,
                password: '',
                popupTips: false,
                state: 'waiting',
            }
        },
        components: {
            HeaderItem,
            ButtonItem,
            InputLight
        },
        mounted () {
            eosjs.ecc.randomKey().then(privateKey => {
                this.privateKey = privateKey
                this.publicKey = eosjs.ecc.privateToPublic(privateKey)
                console.log(privateKey)
            })
            this.gasPrice = WEB3.web3.eth.gasPrice.toNumber()
            this.rangeValue = this.gasPrice
            this.wallet = this.$store.state.activeWallet.walletAddress
            plusReady(() => {
                // 添加返回事件
                window.plus.key.addEventListener('backbutton', () => {
                    this.headerBack()
                })
            })
        },
        computed: {
            rangeValueComputed () {
                let tem = WEB3.web3.fromWei(200000 * this.rangeValue, 'ether')-0
                return tem.toFixed(8)
            },
            backText () {
                if (this.state === 'waiting') {
                    return this.$t('m.PleaseWait')
                } else {
                    return this.$t('m.BackHome')
                }
            },
            title () {
                switch (this.flow) {
                    case 'flow-1': 
                        return this.$t('m.GeneratingEOS')
                    case 'flow-2': 
                        return this.$t('m.verifyPrivate')
                    case 'flow-3': 
                        return this.$t('m.paymentDetails')
                    default: 
                        return ''
                }
            }
        },
        methods: {
            headerBack () {
                switch (this.flow) {
                    case 'flow-1':
                        this.$router.goBack()
                        break
                    case 'flow-2':
                        this.flow = 'flow-1'
                        break
                    case 'flow-3':
                        this.flow = 'flow-2'
                        break
                }
            },
            toFlow2 () {
                this.flow = 'flow-2'
            },
            toFlow3 () {
                let privateKeyAgain = this.$refs.input.innerText
                if (!privateKeyAgain) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.enterPrivateKey'))
                    return
                }
                if (privateKeyAgain === this.privateKey) {
                    this.flow = 'flow-3'
                } else {
                    // 私钥验证错误
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.privateKeyErr'))
                }
            },
            openPassword () {
                this.password = '',
                this.passwordVisible = true
            },
            closePassword () {
                this.passwordVisible = false
            },
            confirm () {
                document.activeElement.blur()
                if (!this.password) {
                    return
                }
                this.passwordVisible = false
                WEB3.unlock_account(this.wallet, this.password, (params) => {
                    if (!params.isError) {
                        WEB3.contract['EOSSale'].register(this.publicKey, {
                            from: this.wallet,
                            gasPrice: this.rangeValue
                        }, (error, result) => {
                            console.log(result)
                            if (!error) {
                                WEB3.get_transaction(result, params => {
                                    let gasLimit = params.data.gas * 10
                                    let rawTx = {
                                        nonce: params.data.nonce+1,
                                        gasPrice: params.data.gasPrice.toNumber(),
                                        gasLimit: gasLimit,
                                        to: params.data.to,
                                        data: params.data.input
                                    }
                                    console.log(rawTx)
                                    let tx = new Transaction(rawTx);
                                    let privateKey = new Buffer(decryptByKey(this.$store.state.activeWallet.privateKey) , 'hex');
                                    tx.sign(privateKey);
                                    let serializedTx = tx.serialize();
                                    WEB3.web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'), (error, result) => {
                                        if (!error) {
                                            this.password = ''
                                            this.popupTips = true
                                            this.getKeys()
                                        }
                                    })
                                })
                            }
                        })
                    } else {
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.passwordError'))
                        this.password = ''
                    }
                })
            },
            getKeys () {
                setTimeout(() => {
                    WEB3.contract['EOSSale'].keys(this.wallet, {
                        from: this.wallet
                    }, (error, result) => {
                        if (result !== this.publicKey) {
                            this.getKeys()
                        } else {
                            this.state = 'success'
                        }
                        console.log(error, result)
                    })
                }, 1000);
            },
            back () {
                if (this.state === 'success') {
                    this.$router.goBack()
                }
            }
        }
    }
</script>

<style scoped>
    .mapping{
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .header {
        background-color: #FFF;
    }
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 5.98rem;
        height: 1.36rem;
        border-radius: .15rem; 
        padding: 0 1.93rem;
        margin: .25rem auto .2rem;
        background-color: #FFF;
    }
    .one, .two, .three {
        font-size: .36rem;
        width: .52rem;
        height: .52rem;
        border-radius: 50%;
        line-height: .52rem;
        text-align: center;
        color: #FFF;
        background-color: #AAA;
    }
    .one-two, .two-three {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        width: .83rem;
    }
    .one-two>i, .two-three>i {
        display: block;
        height: .12rem;
        width: .12rem;
        background-color: #AAA;
        border-radius: 50%;
    }
    .active, i.active {
        background-color: #25C64B;
    }
    .flow-1, .flow-2, .flow-3 {
        text-align: center;
    }
    .warn {
        width: 9.84rem;
        height: 3.21rem;
        border-radius: .15rem;
        margin: auto;
        color: #FFF;
        background-color: #F43E3A;
        text-align: left;
    }
    .warn-title {
        font-size: .4rem;
        padding: .42rem .73rem 0;
    }
    .warn-content {
        font-size: .36rem;
        padding: .39rem .73rem 0;
    }
    .tips {
        font-size: .36rem;
        margin-top: .57rem;
        color: #374452;
        background-color: transparent;
        text-align: center;
    }
    .key {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 9.84rem;
        margin: .57rem auto 0;
    }
    .key span {
        font-size: .36rem;
        width: .8rem;
        margin-left: .17rem;
        color: #374452;
        text-align: center;
    }
    .key p {
        font-size: .36rem;
        width: 7.5rem;
        height: 1.4rem;
        padding: .3rem .5rem;
        border: 0;
        border-radius: .15rem;
        margin: .195rem 0;
        color: #374452;
        background-color: #FFF;
        word-break: break-all;
        line-height: .7rem;
        text-align: left;
        outline: none;
    }
    .range-plane {
        height: 1.2rem;
        width: 8.5rem;
    }
    .range {
        width: 7rem;
        height: auto;
        margin: .4rem auto 0;
    }
    .range-label {
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 1rem 0 2.6rem;
    }
    .range-label span {
        font-size: .36rem;
        color: #A6AFBA;
    }
    .btn {
        position: absolute;
        left: 1.585rem;
        top: 15.63rem;
    }
    .password-plane {
        width: 9.08rem;
        height: 6rem;
        background-color: #FFFFFF;
        border-radius: .1rem;
    }
    .close{
        position:absolute;
        display: inline-block;
        top: .2rem;
        right: .67rem;
        width: .04rem;
        height: .848rem;
        background: #aaa;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
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
        -moz-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }
    .password-plane p {
        font-size: .48rem;
        margin-top: 1rem;
        text-align: center;
        color: #29DC54;
    }
    .password-input {
        width: 7.28rem;
        padding: .4rem;
        border: rgba(66,189,254,.3) solid 0;
        border-bottom-width: 1px;
        margin: 0 .5rem;
    }
    .password-input .input-item {
        font-size: .32rem;
    }
    .btn-confirm {
        display: block;
        margin: 1.13rem auto 0;
    }
    .tips-plane {
        width: 9.08rem;
        background-color: #FFFFFF;
        border-radius: .1rem;
    }
    .tips-title {
        font-size: .48rem;
        margin-top: .53rem;
        color: #29DC54;
        text-align: center;
    }
    .tips-content {
        font-size: .36rem;
        color: #374452;
        padding: .62rem 1.13rem 0;
        text-align: left;
    }
    .tips-plane div {
        margin: .06rem 1.14rem 0;
        padding: .3rem;
    }
    .address-title {
        font-size: .36rem;
        color: #374452;
        text-align: left;
    }
    .address-content {
        font-size: .3rem;
        margin-top: .4rem;
        color: #374452;
        text-align: left;
        word-break: break-all;
    }
    .btn-back {
        display: block;
        margin: .91rem auto .76rem;
    }
    .input {
        overflow: auto;
    }
</style>