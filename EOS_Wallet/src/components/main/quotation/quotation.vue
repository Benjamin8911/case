<template>
    <div class="quotation">
        <header-item :title="$t('m.quotation')" :back="false" :rightIcon="rightIcon" @right-click="toSearch"></header-item>
        <ul class="nav">
            <li>{{$t('m.name')}}</li>
            <li>{{$t('m.currentPrice')}}</li>
            <li>{{$t('m.change')}}(24h)</li>
        </ul>
        <div class="quotation-content">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="quotation-list">
                    <li v-for="(item, i) in quotationList" :key="i">
                        <quotation-item :assets="item.assetsName" :dollar="item.dollar" :RMB="item.RMB" :change="item.change" v-tap="{ methods: toDetail, item: item }"></quotation-item>
                        <hr />
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import QuotationItem from '../../../commons/components/QuotationItem.vue'
    import remote from '../../../lib/js/remote'
    export default {
    	name: 'quotation',
    	data () {
    		return {
                page: 1,
                pageSize: 8,
                rightIcon: require('../../../../static/images/search.png'),
                quotationList: [],
                allLoaded: false,
                symbol: [
                    'btcusdt', 'bchusdt', 'ethusdt', 'etcusdt', 'ltcusdt', 
                    'eosusdt', 'xrpusdt', 'omgusdt', 'dashusdt', 'zecusdt', 
                    'adausdt', 'steemusdt', 'iotausdt', 'ctxcusdt', 'actusdt', 
                    'btmusdt', 'btsusdt', 'ontusdt', 'iostusdt', 'htusdt', 
                    'trxusdt', 'dtausdt', 'neousdt', 'qtumusdt', 'elausdt', 
                    'venusdt', 'thetausdt', 'sntusdt', 'zilusdt', 'xemusdt', 
                    'nasusdt', 'ruffusdt', 'hsrusdt', 'letusdt', 'mdsusdt', 
                    'storjusdt', 'elfusdt', 'itcusdt', 'cvcusdt', 'gntusdt'
                ]
    		}
    	},
        mounted () {
            this.loadQuotation()
        },
        components: {
            HeaderItem,
            QuotationItem
        },
        methods: {
            loadBottom () {
                this.loadQuotation()
                this.$refs.loadmore.onBottomLoaded()
            },
            loadQuotation () {
                let start = this.pageSize * (this.page - 1)
                let end = this.pageSize * this.page
                if (end >= this.symbol.length) {
                    end = this.symbol.length
                    this.allLoaded = true
                }
                let symbol = this.symbol.slice(start, end).join(',')
                remote.get_market({
                    version: 'kPl',
                    symbol:  symbol,
                    period: 1,
                    size: 1,
                    type: 1
                }).then(response => {
                    if (response.data.code === 200) {
                        this.page++
                        response.data.data.forEach((item, index) => {
                            let quotation = {
                                assetsName: item.marketDetail.replace('usdt', '').toLocaleUpperCase(),
                                dollar: `$ ${item.marketPrice}`,
                                change: item.marketAmount.replace('00%', '%'),
                                open: `$ ${item.marketTrend}`,
                                volume: item.count,
                                high: `$ ${item.high}`,
                                low: `$ ${item.low}`,
                            }
                            let dollar = item.marketPrice - 0
                            quotation.RMB = `￥${(dollar * item.fixed).toFixed(2)}`
                            this.quotationList.push(quotation)
                        })
                    }
                })
            },
            toDetail (params) {
                let item = params.item
                this.$router.push({
                    path: '/quotationDetail',
                    query: item
                })
            },
            toSearch () {
                this.$router.push({
                    path: '/quotationSearch',
                   
                })
            }
        }
    }
</script>

<style scoped>
    .quotation {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
	.nav {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        height: 1.19rem;
        background-color: #F4F7F9;
    }
    .nav li {
        font-size: .36rem;
        width: 3.6rem;
        color: #374452;
        text-align: center;
    }
    .quotation-content {
        max-height: 13.2rem;
        max-height: -webkit-calc(100vh - 5.1rem);
        max-height: calc(100vh - 5.1rem);
        overflow: auto;
    }
    .quotation-list {
        margin-top: .13rem;
    }
</style>