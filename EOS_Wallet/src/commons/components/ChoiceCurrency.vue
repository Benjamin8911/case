<template>
    <div class="choice-currency">
        <div class="choice-currency-left">
            <img :src="currency.icon" alt="currency">
            <span>{{currency.name}}</span>
        </div>
        <a v-tap="{ methods:choiceCurrency }">{{$t('m.choiceCurrency')}}<span></span></a>
        <ul v-show="isShowCurrencyList" class="currency-list">
            <li v-for="(item, index) in currencyList" :key="index" v-tap="{ methods:selectedCurrency, item:item, index:index }">
                <img :src="item.icon">
                <p>{{item.name}}</p>
            </li>
        </ul>
        <input class="hidden" type="text" @blur="blur" @focus="focus" ref="input">
    </div>
</template>

<script>
    import { COIN } from '../../constant'
    export default {
        name: 'choiceCurrency',
        data () {
            return {
                currencyList: [],
                isShowCurrencyList: false,
                currency: {}
            }
        },
        model: {
            prop: 'coin',
            event: 'selected-coin'
        },
        props: {
            coin: {
                type: Number,
                default () {
                    return 0
                }
            }
        },
        mounted () {
            for (let coin in COIN) {
                let currency = {}
                currency.name = COIN[coin].name + " " + COIN[coin].symbol
                currency.icon = COIN[coin].icon
                this.currencyList.push(currency)
            }
            this.currency = this.currencyList[this.coin]
            // 初次挂载时触发一次选择事件
            this.$emit('selected-coin', this.coin, this.currencyList[this.coin])
        },
        methods: {
            choiceCurrency () {
                // this.isShowCurrencyList = !this.isShowCurrencyList
                if (this.isShowCurrencyList) {
                    this.$refs.input.blur()
                } else {
                    this.$refs.input.focus()
                }
            },
            selectedCurrency (params) {
                this.currency = params.item
                // this.isShowCurrencyList = false
                this.$refs.input.blur()
                this.$emit('selected-coin', params.index, this.currencyList[params.index])
            },
            focus () {
                this.isShowCurrencyList = true
            },
            blur () {
                this.isShowCurrencyList = false
            }
        }
    }
</script>

<style scoped>
    .choice-currency {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.52rem;
        margin: .6rem .48rem 0;
        border-radius: .15rem;
        background-color: #FFF;
    }
    .choice-currency-left {
        display: inline-flex;
        align-items: center;
        margin-left: .48rem;
    }
    .choice-currency img {
        width: .92rem;
        height: .92rem;
    }
    .choice-currency-left span {
        font-size: .42rem;
        color: #374452;
        margin-left: .23rem;
    }
    .choice-currency a {
        font-size: .36rem;
        margin-right: .48rem;
        color: #29DC54;
    }
    .choice-currency a span {
        background: url("../../../static/images/showMore.png") no-repeat;
        background-size: .3rem .18rem;
        display: inline-block;
        width: .3rem;
        height: .18rem;
        margin-left: .1rem;
    }
    .currency-list {
        position: absolute;
        top: 1.1rem;
        right: .3rem;
        width: 4.5rem;
        max-height: 7rem;
        border-radius: .1rem;
        background-color: #F4F7F9;
        z-index:1;
        overflow-y: auto;
    }
    .currency-list li {
        display: flex;
        align-items: center;
        height: 1.2rem;
    }
    .currency-list img {
        width: .63rem;
        height: .62rem;
        margin-left: .32rem;
    }
    .currency-list p {
        font-size: .36rem;
        margin-left: .55rem;
        color: #374452;
    }
    .hidden {
        position: fixed;
        left: -9999px;
    }
</style>