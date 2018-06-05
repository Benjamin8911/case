<template>
    <div class="record">
        <!-- 标题 -->
        <header-item :title="$t('m.transactionRecord')" back-icon="light" color="#374452"></header-item>
        <!-- 交易记录列表 -->
        <p class="label">{{$t('m.transactionRecordAll')}}</p>
        <assets-list class="assets-list" :list="list" @click="toTransactionDetail"></assets-list>
    </div>
</template>

<script>
    import AssetsList from '../../../commons/components/AssetsList.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { COIN } from '../../../constant'
    import remote from '../../../lib/js/remote'
    import { formatDate } from '../../../lib/js/tools'
    import WEB3 from '../../../web3'
    export default {
        name: 'record',
        data () {
            return {
                list: []
            }
        },
        mounted () {
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
        components: {
            AssetsList,
            HeaderItem
        },
        computed: {
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
                        coinName: data.coinName,
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
    .record {
        color: white;
        height: 100%;
    }
    .label {
        font-size: .3rem;
        margin: .21rem 0 .2rem .46rem;
        color: #797985;
    }
    .assets-list {
        height: 12.72rem;
        height: -webkit-calc(100vh - 3.1rem);
        height: calc(100vh - 3.1rem);
        overflow: auto;
    }
</style>