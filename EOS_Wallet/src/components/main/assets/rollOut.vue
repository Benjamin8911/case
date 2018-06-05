<template>
    <div class="roll-out">
        <!-- 返回/标题 -->
        <header-item :title="$t('m.rollOut')" back-icon="light"></header-item>
        <hr />
        <choice-currency @selected-coin="selectedCurrency" v-model="currency"></choice-currency>
        <!-- 输入框 -->
        <div class="input-box">
            <input type="text" :placeholder="$t('m.otherAddress')" v-model="address" id="address" tabindex="-1">
            <span class="scan" v-tap="{ methods: scan }"></span>
            <span class="contact" @click="toContact"></span>
            <input type="number" v-model="transactionValue" :placeholder="$t('m.transferAmount')" tabindex="-1">
            <input type="text" v-model="remark" :placeholder="$t('m.remark')" tabindex="-1">
            <p>{{$t('m.minerCost')}}</p>
            <mt-range 
                class="range" 
                v-model="rangeValue" 
                :min="gasPrice*0.5"
                :max="gasPrice*10"
                :step="1"
                :bar-height="5"
            ></mt-range>
            <!-- <range class="range" v-model="rangeValue" max="100000"></range> -->
            <div class="range-label">
                <span>{{$t('m.slow')}}</span>
                <span>{{rangeValueComputed}}  ether</span>
                <span>{{$t('m.fast')}}</span>
            </div>
        </div>
        <!-- 下一步 -->
        <a class="next" @click="nextStep">{{$t('m.next')}}</a>
        <mt-popup v-model="passwordVisible" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="password-plane">
                <span class="close" @click="closePassword"></span>
                <p>{{$t('m.walletPassword')}}</p>
                <input-light class="password-input" type="password" clear :placeholder="$t('m.passwordPlaceholder')" v-model="password"></input-light>
                <button @click="commit" :class="{ disabled: isNotActive }">{{$t('m.confirm')}}</button>
            </div>
        </mt-popup>
        <mt-popup v-model="popupTips" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="tips-plane">
                <span class="close"  @click="closeTips"></span>
                <img class="confirm-ok" src="../../../../static/images/confirm-1.png" alt="成功">
                <p>{{$t('m.transferSuccess')}}</p>
                <button @click="closeTips">{{$t('m.confirm')}}</button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import ChoiceCurrency from '../../../commons/components/ChoiceCurrency.vue'
    import InputLight from '../../../commons/components/InputLight.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    // import Range from '../../commons/components/Range.vue'

    // 引入web3实例
    import WEB3 from '../../../web3'
    import remote from '../../../lib/js/remote'
    import {COIN} from '../../../constant'
    import { setRecordByHash } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'

    export default {
        data () {
            return {
                rangeValue: 0,
                passwordVisible: false,
                popupTips: false,
                password: "",
                address: "",
                transactionValue: null,
                remark: "",
                gasPrice: 0,
                currency: 9,
                choiceCoin: '',
                rate: '',
                tokenspace: {}
            }
        },
        components: {
            ChoiceCurrency,
            InputLight,
            HeaderItem
            // Range
        },
        computed: {
            rangeValueComputed () {
                let tem = WEB3.web3.fromWei(200000 * this.rangeValue, 'ether')-0
                return tem.toFixed(8)
            },
            // 发送交易钱包账户 from
            walletAddress () {
                return this.$store.state.activeWallet.walletAddress
            },
            // 转出数额换算为以太币
            wei () {
                if (this.transactionValue) {
                    let currency = this.choiceCoin.name.split(' ')[1]
                    return Math.floor(WEB3.web3.toWei(this.transactionValue * this.rate[currency], 'ether'))
                }
            },
            isNotActive () {
                return this.password === ""
            }
        },
        activated () {
            if (this.$store.state.address) {
                this.address = this.$store.state.address
                this.$store.commit('clearAddress')
            }
        },
        mounted () {
            if (this.$store.state.QRText) {
                let QRContent = JSON.parse(this.$store.state.QRText)
                this.address = QRContent.account
                this.currency = QRContent.currency
                this.transactionValue = QRContent.number
                this.$store.commit('clearQR')
            }
            if (this.$store.state.address) {
                this.address = this.$store.state.address
                this.$store.commit('clearAddress')
            }
            // 汇率
            let market = JSON.parse(window.sessionStorage.getItem('market'))
            if (market) {
                let ETH = market.ETH,
                    result = {}
                for (let key in market) {
                    result[key] = market[key] / ETH
                }
                this.rate = result
            }
            this.gasPrice = WEB3.web3.eth.gasPrice.toNumber()
            this.rangeValue = this.gasPrice
            this.tokenspace = JSON.parse(window.sessionStorage.getItem('tokenspace'))
        },
        methods: {
            scan () {
                this.$router.push({ path: '/TDCode'})
            },
            selectedCurrency (index, param) {
                this.choiceCoin = param
            },
            toContact () {
                this.$router.push({ path: '/contactList'})
            },
            nextStep () {
                // 判断地址
                if (!this.address || this.address.length != 42) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.correctAddress'))
                    return
                }
                if (this.address === this.walletAddress) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.theSameAddress'))
                    return
                }
                // 判断转出数额
                if (this.transactionValue-0 <= 0) {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.correctTransfer'))
                    return
                }

                this.passwordVisible = true
            },
            closePassword () {
                this.passwordVisible = false
            },
            commit () {
                if (!this.isNotActive) {
                    this.send_transaction()
                    // this.password = ""
                    // this.closePassword()
                    // this.popupTips = true
                }
            },
            // 发送交易
            send_transaction () {
                let account = this.walletAddress
                // let account = '0xf146bb31f44679128e88d62da756cb2dd1730d42'
                let psd = this.password
                WEB3.unlock_account(account, psd, (params) => {
                    // 解锁
                    if (!params.isError) {
                        // 查看发送方余额 判断余额是否充足
                        let gas = 100000 * this.rangeValue
                        let currency = this.choiceCoin.name.split(' ')[1] // 获取转出币种
                        if (currency === 'ETH') {
                            // 转出以太坊
                            WEB3.get_balance(account, param => {
                                // 获取以太坊余额
                                let balance = param.data.toNumber()
                                if (balance < WEB3.web3.toWei(this.transactionValue, 'ether')-0 + gas) {
                                    // 余额不足
                                    this.password = ""
                                    this.closePassword()
                                    MessageBox.close()
                                    MessageBox(this.$t('m.tips'), this.$t('m.notEnoughBalance'))
                                } else {
                                    WEB3.send_transaction({
                                        // 发起交易
                                        from: account,
                                        to: this.address,
                                        value: WEB3.web3.toWei(this.transactionValue, 'ether'),
                                        gasPrice: this.rangeValue
                                    }, params => {
                                        this.password = ""
                                        this.closePassword()
                                        this.popupTips = true
                                        // 写入交易记录
                                        this.setTransactionRecord(account, currency, params.data, this.transactionValue)
                                        // 修改账号余额
                                        let walletList = this.$store.state.walletList
                                        
                                    })
                                }
                            })
                        } else {
                            // 转出其他币种
                            WEB3.get_balance(account, param => {
                                if (!param.isError) {
                                    // 获取账户余额
                                    let ETHBalance = param.data.toNumber()
                                    let balance = WEB3.web3.fromWei(WEB3.contract[currency].balanceOf(account), 'ether').toNumber()
                                    if (ETHBalance < gas) {
                                        // 矿工费不足
                                        this.password = ""
                                        this.closePassword()
                                        MessageBox.close()
                                        MessageBox(this.$t('m.tips'), this.$t('m.notEnoughBalance'))
                                        return
                                    }
                                    if (balance < this.transactionValue) {
                                        // 余额不足
                                        this.password = ""
                                        this.closePassword()
                                        MessageBox.close()
                                        MessageBox(this.$t('m.tips'), this.$t('m.notEnoughBalance'))
                                        return
                                    }
                                    // 发起交易
                                    if (currency === 'GNT') {
                                        // GNT交易方法不一样
                                    } else {
                                        let wad = WEB3.web3.toWei(this.transactionValue, 'ether')
                                        let hashaddress = WEB3.contract[currency].transfer(this.address, wad, {
                                            from: account,
                                            gasPrice: this.rangeValue
                                        })
                                        this.setTransactionRecord(account, currency, hashaddress, this.transactionValue)
                                    }
                                    this.password = ""
                                    this.closePassword()
                                    this.popupTips = true
                                }
                            })
                        }
                    } else {
                        this.password = ''
                        this.closePassword()
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.passwordError'))
                    }
                })
            },
            closeTips () {
                this.popupTips = false
                this.$router.back()
            },
            setTransactionRecord (account, currency, hashaddress='0x000', value=0) {
                // 写入交易记录
                remote.set_transaction_record({
                    ticket: window.sessionStorage.getItem('token'),
                    hashaddress: hashaddress,
                    publicaddress: account,
                    receivepublic: this.address,
                    currency: this.tokenspace[currency],
                    time: new Date().getTime(),
                    name: this.remark,
                    value: value
                }).then(data => {
                    console.log(data)
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }
</script>

<style scoped>
    .roll-out {
        height: 100%;
        text-align: center;
    }
    .scan {
        position: absolute;
        top: .67rem;
        right: 1.37rem;
        width: .58rem;
        height: .58rem;
        background: url("../../../../static/images/scan.png") no-repeat;
        background-size: .58rem;
    }
    .contact {
        position: absolute;
        top: .66rem;
        right: .48rem;
        width: .49rem;
        height: .59rem;
        background: url("../../../../static/images/mine-empty.png") no-repeat;
        background-size: .49rem .59rem;
    }
    .input-box {
        position: relative;
        width: 9.84rem;
        height: 7.75rem;
        padding-top: .1rem;
        border-radius: .15rem;
        margin: .24rem auto 0;
        background-color: #FFF;
    }
    .input-box input {
        font-size: .42rem;
        display: block;
        width: 7.51rem;
        padding: .42rem;
        border-width: 0 0 1px;
        border-color: rgba(255,255,255,.1);
        margin: .14rem .48rem 0 1.01rem;
        color: #374452;
        background-color:transparent;
    }
    #address {
        width: 6.13rem;
        padding-right: 1.8rem;
    }
    .input-box p {
        font-size: .42rem;
        margin-top: .4rem;
        color: #F43E3A;
    }
    .range {
        width: 7.3rem;
        height: auto;
        margin: .4rem auto 0;
    }
    .range-label {
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .3rem 1.48rem 0;
    }
    .range-label span {
        font-size: .36rem;
        color: #A6AFBA;
    }
    .next {
        font-size: .48rem;
        display: block;
        width: 7.63rem;
        height: 1.49rem; 
        border-width: 0;
        border-radius: .75rem;
        margin: 1.71rem auto 0;
        line-height: 1.49rem;
        color: #FFF;
        background: #29DC54;
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
        color: #555555;
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
    .password-plane button {
        font-size: .48rem;
        width: 7.63rem;
        height: 1.49rem;
        border-width: 0;
        border-radius: .75rem;
        margin-top: 1.13rem;
        color: #fff;
        background-color: #29DC54;
        outline: none;
    }
    button.disabled {
        background-color: rgba(41,220,84,.5);
    }
    .tips-plane {
        width: 9.08rem;
        height: 7rem;
        background-color: #FFFFFF;
        border-radius: .1rem;
    }
    .tips-plane p {
        font-size: .48rem;
        margin-top: .54rem;
        text-align: center;
        color: #555555;
    }
    .tips-plane button {
        font-size: .48rem;
        width: 7.63rem;
        height: 1.49rem;
        border-width: 0;
        border-radius: .75rem;
        margin-top: 1.02rem;
        color: #fff;
        background-color: #29DC54;
        outline: none;
    }
    .confirm-ok {
        width: 1.2rem;
        height: 1.2rem;
        margin-top: 1.52rem;
    }
    input::-webkit-input-placeholder {
        color: #A6AFBA;
    }
</style>