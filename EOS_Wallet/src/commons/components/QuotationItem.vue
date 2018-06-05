<template>
    <ul>
        <li class="assetsName">
            <img :src="coin.img" :alt="assets">
            <span v-text="assets"></span>
        </li>
        <li class="price">
            <span class="dollar" v-text="dollar"></span>
            <span class="RMB" v-text="RMB"></span>
        </li>
        <li>
            <span class="change" :style="changeStyle" v-text="change"></span>
        </li>
    </ul>
</template>

<script>
    import { getCoin } from '../../lib/js/coin'
    export default {
        name: 'QuotationItem',
        data () {
            return {
            }
        },
        props: {
            assets: String,
            dollar: String,
            RMB: String,
            change: String
        },
        computed: {
            changeStyle () {
                let change = this.change.replace("%", '') - 0
                if (change < 0) {
                    return {
                        'backgroundColor': '#F43E3A'
                    }
                } else {
                    return {
                        'backgroundColor': '#29DC54'
                    }
                }
            },
            coin () {
                return getCoin(this.assets)
            }
        }
    }
</script>

<style scoped>
    ul {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        height: 1.88rem;
        background-color: #F4F7F9;
    }
    li {
        font-size: .36rem;
        width: 3.6rem;
        color: #374452;
        text-align: center;
    }
    .assetsName {
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .assetsName img {
        width: .92rem;
        height: .92rem;
    }
    .assetsName span {
        font-size: .42rem;
        width: 2rem;
    }
    .price {
        display: inline-flex;
        align-items: flex-end;
        flex-flow: column;
        padding-right: 1rem;
        box-sizing: border-box;
    } 
    .dollar {
        font-size: .42rem;
    } 
    .RMB {
        font-size: .3rem;
        color: #A6AFBA;
    } 
    .change {
        display: inline-block;
        width: 1.56rem;
        height: .57rem;
        line-height: .57rem;
        border-radius: .285rem;
        color: #FFF;
    }

</style>