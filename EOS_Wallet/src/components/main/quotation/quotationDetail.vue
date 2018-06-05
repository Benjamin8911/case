<template>
    <div class="quotation-detail">
        <header-item class="header" :title="titleName"></header-item>
        <hr />
        <div class="money">
            <p class="dollar" v-text="dollar"></p>
            <p class="RMB" v-text="RMB"></p>
        </div>
        <ul class="info">
            <li>
                <div class="info-title">{{$t('m.open')}}</div>
                <div class="info-content" v-text="info.open"></div>
            </li>
            <li>
                <div class="info-title">{{$t('m.high')}}</div>
                <div class="info-content" v-text="info.high"></div>
            </li>
            <li>
                <div class="info-title">{{$t('m.low')}}</div>
                <div class="info-content" v-text="info.low"></div>
            </li>
            <li>
                <div class="info-title">{{$t('m.volume')}}</div>
                <div class="info-content" v-text="info.volume"></div>
            </li>
        </ul>
        <ul class="time">
            <li :class="{ active: active === '1min'}"  v-tap="{ methods: changeTime, time: '1min' } ">{{$t('m.min') }}</li>
            <li :class="{ active: active === '60min'}" v-tap="{ methods: changeTime, time: '60min' }">{{$t('m.hour')}}</li>
            <li :class="{ active: active === '1day'}"  v-tap="{ methods: changeTime, time: '1day' } ">{{$t('m.day') }}</li>
            <li :class="{ active: active === '1week'}" v-tap="{ methods: changeTime, time: '1week' }">{{$t('m.week')}}</li>
        </ul>
        <!-- 行情图 -->
        <div class="chart" id="chart"></div>
    </div>
</template>
<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import remote from '../../../lib/js/remote'
    import { formatDate } from '../../../lib/js/tools'
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/bar')
    export default {
    	name: 'quotationDetail',
    	data () {
    		return {
                titleName: '',
                dollar: '',
                RMB: '',
                info: {
                    open: '',
                    high: '',
                    low: '',
                    volume: ''
                },
                isActivat: false,
                active: '1min',
                format: {
                    '1min': 'hh:mm',
                    '60min': 'hh:mm',
                    '1day': 'MM-dd',
                    '1week': 'MM-dd'
                },
                option: {
                    xAxis: {
                        data: [],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#293248'
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#293248'
                        },
                        position: 'right'
                    },
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            color: '#29DC54'
                        },
                        itemStyle: {
                            opacity: 0
                        },
                        smooth: true
                    }]
                }
    		}
    	},
        mounted () {
            this.getMarket()
        },
        activated () {
            if (this.isActivat) {
                this.getMarket()
            }
        },
        deactivated () {
            this.isActivat = true
        },
        components: {
            HeaderItem
        },
        methods: {
            changeTime (param) {
                this.active = param.time
                this.getMarket()
            },
            getMarket () {
                let xAxis = []
                let series = []
                this.titleName = this.$route.query.assetsName
                this.info.open = this.$route.query.open
                this.info.volume = this.$route.query.volume
                this.info.high = this.$route.query.high
                this.info.low = this.$route.query.low
                this.dollar = this.$route.query.dollar
                this.RMB = this.$route.query.RMB


                let myChart = echarts.init(document.getElementById('chart'))
                // myChart.setOption(this.option)
                remote.get_market({
                    version: 'kPl',
                    symbol:  `${this.titleName.toLocaleLowerCase()}usdt`,
                    period: this.active,
                    size: 30,
                    type: 2
                }).then(response => {
                    if (response.data.code === 200) {
                        // console.log(response.data.data)

                        response.data.data.forEach((item, index) => {
                            let date = new Date(item.id * 1000)
                            xAxis.unshift(formatDate(date, this.format[this.active]))
                            series.unshift(item.marketPrice-0)
                        })
                        let newQuotation = response.data.data[0]
                        
                        this.option.xAxis.data = xAxis
                        this.option.series[0].data = series

                        myChart.setOption(this.option)
                    }
                })
            }
        }
    }
</script>

<style scoped>
	.quotation-detail {
        text-align: center;
    }
    .money {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: .62rem;
    }
    .dollar {
        font-size: .6rem;
        color: #29DC54;
    }
    .RMB {
        font-size: .36rem;
        color: #A6AFBA;
    }
    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2.5rem;
        margin: .51rem .48rem 0;
        background-color: #E6EEF2;
    }
    .info-title {
        font-size: .36rem;
        height: .92rem;
        color: #374452;
    }
    .info-content {
        font-size: .3rem;
        color: #374452;
    }
    .time {
        display: flex;
        justify-content: space-around;
        margin: .6rem;
    }
    .time li {
        font-size: .36rem;
        width: 1.56rem;
        height: .57rem;
        line-height: .57rem;
        border: #29DC54 solid 1px;
        border-radius: .29rem;
        color: #29DC54;
        box-sizing: border-box;
    }
    .time li.active {
        border: 0;
        color: #FFF;
        background-color: #29DC54;
    }
    .chart {
        height: 8rem;
    }
</style>