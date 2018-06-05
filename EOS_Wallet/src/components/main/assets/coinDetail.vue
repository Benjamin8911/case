<template>
    <div class="page">
        <!-- 头部 -->
        <header-item :title="title" back-icon="light"></header-item>
        <!-- main info -->
        <div class="main-info">
            <div class="coin-bar">
                <div class="coin-info-bar">
                    <span class="round round-1"></span>
                    <span class="round round-2"></span>
                    <span class="round round-3"></span>
                    <span class="round round-4"></span>
                    <span class="round round-5"></span>
                    <div class="coin-info">
                        <span class="coin-number" v-text="coinNumber"></span>
                        <span class="coin-shorthand" v-text="coinShorthand"></span>
                    </div>
                    <div class="conversion">{{`≈ ${currencySymbol} ${conversion}`}}</div>
                </div>
            </div>
            <div class="label">{{`${title} ${$t('m.transactionRecord')}`}}</div>
            <!-- <ul>
                <trading-item class="tradding-item" v-for="(item, i) in items" :key="i" :trading-info="item" v-tap="{methods: jump, item: item}"></trading-item>
            </ul>  -->
            <assets-list :list="list" @click="toTransactionDetail"></assets-list>
        </div>
    </div>
</template>

<script>
    import { RMB, DOLLAR, COIN } from '../../../constant'
    import remote from '../../../lib/js/remote'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import AssetsList from '../../../commons/components/AssetsList.vue'
    import { formatDate } from '../../../lib/js/tools'
    import WEB3 from '../../../web3'
    // import TradingItem from '../../commons/components/TradingItem.vue'
    

    export default {
        name: '',
        components: {
            HeaderItem,
            // TradingItem
            AssetsList
        },
        data () {
            return {
                coinType: '比特币',
                coinShorthand: 'BTC',
                coinNumber: "100.00",
                conversion: "7143000.00",
                list: []
            }
        },
        mounted () {
            let query = this.$route.query
            this.coinType = query.name
            this.coinShorthand = query.coin
            this.coinNumber = query.num
            this.conversion = query.worth
            // 交易记录
            let tokenspace = JSON.parse(window.sessionStorage.getItem('tokenspace'))
            let market = JSON.parse(window.sessionStorage.getItem('market'))
            let currency = {}
            for (let coin in tokenspace) {
                currency[tokenspace[coin]] = coin
            }
            let param = {
                ticket: window.sessionStorage.getItem('token'),
                publicaddress: this.walletAddress
            }
            remote.get_transaction_record(param).then(response => {
                let status = response.data.data.data.status
                if (status === 239) {

                } else {
                    let recordList = response.data.data.data
                    recordList.forEach((item, index) => {
                        let coinName = currency[item.currency]
                        if (coinName !== this.coinShorthand) {
                            // 去掉交易记录中不属于当前币种记录
                            return
                        }
                        let record = {
                            img: COIN[coinName].icon,
                            name: COIN[coinName].name,
                            unit: COIN[coinName].symbol,
                            date: ''
                        }
                        let date = new Date(item.time-0)
                        record.date = formatDate(date, 'MM-dd hh:mm')
                        let num = !item.value ? 0 : (item.value-0)
                        if (this.walletAddress === item.publicaddress) {
                            record.num = '- ' + num.toFixed(5)
                            record.isMinus = true
                            record.account = item.receivepublic
                        } else {
                            record.num = '+ ' + num.toFixed(5)
                            record.account = item.publicaddress
                        }
                        record.worth = (market[coinName] * num).toFixed(2)
                        record.time = item.time
                        record.name = item.name
                        this.list.push(record)
                    })
                }
            })
        },
        computed: {
            title () {
                return `${this.coinType} ${this.coinShorthand}`
            },
            currencySymbol () {
                return this.$store.getters.currencySymbol
            },
            walletAddress () {
                return this.$store.state.activeWallet.walletAddress
            },
        },
        methods: {
            toTransactionDetail (data) {
                this.$router.push({
                    path: '/transactionDetail',
                    query: {
                        name: data.name,
                        account: data.account,
                        unit: data.unit,
                        coinName: this.coinType,
                        num: data.num,
                        worth: data.worth,
                        time: data.time
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100%;
    }
    .main-info{
        width: 100%;
        flex-grow: 1;
        overflow: hidden;
    }
    .coin-bar{
        width: 100%;
        height: 4rem;
        margin-bottom: 0.4rem;
    }
    .coin-bar>div{
        position: relative;
        z-index: 1;
        height: 2.67rem;
        background-color: #29DC54;
    }
    .coin-bar>div:after{
        content: ' ';
        position: absolute;
        left: -5%;
        bottom: -1.4rem;
        z-index: -2;
        width: 110%;
        height: 4rem;
        border-radius: 0 0 50% 50%;
        background-color: #29DC54;
    }
    .round{
        position: absolute;
    }
    .round-1 {
        top: 2.38rem;
        left: 1rem;
        width: .47rem;
        height: .47rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-2 {
        top: .4rem;
        left: 2.3rem;
        width: .23rem;
        height: .23rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-3{
        top: 1.25rem;
        left: 3.13rem;
        width: .74rem;
        height: .74rem;
        border: #5fe57f solid .04rem;
        border-radius: 100%;
    }
    .round-4 {
        top: .69rem;
        left: 6.92rem;
        width: .7rem;
        height: .7rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-5 {
        top: 2.47rem;
        left: 9.7rem;
        width: .3rem;
        height: .3rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .coin-info-bar{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .coin-info{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: baseline;
        margin-top: 1.15rem;
        z-index: 1;
    }
    .coin-number{
        color: #ffffff;
        font-size: 0.9rem;
        font-family: ArialMT;
        margin-right: 0.3rem;
        line-height: 1;
    }
    .coin-shorthand{
        color: #FFF;
        font-size: 0.48rem;
        font-family: ArialMT;
        line-height: 1;
    }
    .conversion{
        color: #FFF;
        font-size: 0.36rem;
        font-family: ArialMT;
        -webkit-transform: translateY(0.5rem);
        transform: translateY(0.5rem);
    }
    .label{
        width: 100%;
        color: #A6AFBA;
        font-size: 0.3rem;
        text-indent: 0.45rem;
        margin-top: 0.46rem;
        margin-bottom: 0.2rem;
    }
    .tradding-item{
        margin-bottom: 0.16rem;
    }
</style>