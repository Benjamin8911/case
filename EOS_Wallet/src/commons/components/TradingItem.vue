<template>
    <div class="tradding-item" :style="{background: bg}">
        <span class="coin-icon" :style="{backgroundImage: `url(${coin.icon})`}"></span>
        <div class="wrapper-left">
            <span class="coin-name" v-text="coin.name"></span>
            <span class="coin-trading-time" v-if="tradingInfo.tradingTime" v-text="tradingInfo.tradingTime"></span>
        </div>
        <div class="wrapper-right">
            <div class="trading-info">
                <span class="trading-number" :style="tradingNumberStyle" v-text="tradingInfo.tradingNumber"></span>
                <span class="coin-symbol" v-text="coin.symbol"></span>
            </div>
            <span class="conversion">{{`≈ ${currencySymbol} ${tradingInfo.conversion}`}}</span>
        </div>
    </div>
</template>

<script>
    /**
     * 传入交易信息结构
     * {
     *      coinType: '0',
     *      tradingTime: '12-19 18:23',
     *      tradingNumber: + 0.00, - 100.00
     *      conversion: 123123
     * }
     */ 
    import {COIN} from '../../constant' 

    export default {
        name: 'tradingItem',
        data () {
            return {
                coinType: '',
                coin: COIN[this.tradingInfo.coinType]
            }
        },
        props: {
            // 交易信息
            tradingInfo: Object,
            // 背景色
            bg: {
                type: String,
                default: 'linear-gradient(to right, #2E3047, #3B3247)'
            }
        },
        computed: {
            currencySymbol () {
                return this.$store.getters.currencySymbol
            },
            tradingNumberStyle () {
                return {
                    color: parseFloat(this.tradingInfo.tradingNumber) >= 0 ? '#ffffff' : '#FF6D6E'
                }
            }
        },
        created () {
            this.coinType = this.$route.query.coinType
        }
    }
</script>

<style scoped>
    .tradding-item{
        width: 100%;
        height: 1.96rem;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .coin-icon{
        width: 0.92rem;
        height: 0.92rem;
        margin-left: 0.46rem;
        border-radius: 50%;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .wrapper-left, .wrapper-right{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }
    .wrapper-left{
        margin-left: 0.29rem;
        flex-grow: 1;
        align-items: flex-start;
    }
    .wrapper-right{
        margin-right: 0.37rem;
        align-items: flex-end;
    }
    .coin-name{
        color: #ffffff;
        font-size: 0.42rem;
    }
    .coin-trading-time{
        color: #aaaaaa;
        font-size: 0.3rem;
        font-family: ArialMT;
    }
    .trading-number{
        font-size: 0.6rem;
        font-family: ArialMT;
        margin-right: 0.26rem;
    }
    .coin-symbol, .conversion{
        color: #797985;
        font-size: 0.3rem;
        font-family: ArialMT;
    }
</style>
