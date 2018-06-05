<template>
    <ul class="asset-list">
        <li v-for="(item, i) in list" :key="i" v-tap="{methods: clickLi, item: item}">
            <div class="asset-left">
                <img class="asset-img" :src="item.img" />
                <span class="asset-label">
                    <p class="name">{{item.name}}</p>
                    <p class="date" v-if="item.date">{{item.date}}</p>
                </span>
                <span class="mapping" v-if="item.unit === 'EOS' && isAssets" v-tap.stop="{ methods: mapping }">{{isMapped}}</span>
                <!-- <span class="mapping" v-if="item.unit === 'EOS' && isAssets && isMapped">已映射</span> -->
            </div>
            <div class="asset-right">
                <p>
                    <span class="asset-num" :class="{ minus: item.isMinus }">{{item.num}}</span>
                    <span class="asset-unit">{{item.unit}}</span>
                </p>
                <p class="asset-worth">≈{{symbol}}{{item.worth}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
    import { RMB, DOLLAR } from '../../constant'
    import WEB3 from '../../web3'
    export default {
        name: 'AssetList',
        props: {
            list: Array
        },
        computed: {
            symbol() {
                switch (this.$store.state.currency) {
                    case RMB:
                        return '￥'
                        break
                    case DOLLAR:
                        return '$'
                        break
                }
            },
            isAssets () {
                return this.$route.path === '/assets'
            },
            isMapped () {
                let walletAddress = this.$store.state.activeWallet.walletAddress
                let result = WEB3.contract['EOSSale'].keys(walletAddress, {
                    from: walletAddress
                })
                return !!result ? '已映射' : '映射'
            }
        },
        methods: {
            clickLi (param) {
                this.$emit('click', param.item)
            },
            mapping () {
                this.$emit('mapping')
            }
        }
    }
</script>

<style scoped>
    .asset-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.96rem;
        margin-bottom: .16rem;
        background-color: #F4F7F9;
        box-shadow:.05rem .05rem .05rem rgba(226,234,238,1) 
    }
    .asset-left {
        display: inline-flex;
        align-items: center;
        font-size: .42rem;
        line-height: .92rem;
    }
    .asset-img {
        height: .92rem;
        margin: 0 .29rem 0 .46rem;
    }
    .asset-label {
        display: inline-flex;
        flex-direction: column;
    }
    .name {
        line-height: normal;
        color: #374452;
    }
    .date {
        font-size: .3rem;
        line-height: normal;
        color: #374452;
    }
    .asset-right {
        text-align: right;
        margin-right: .37rem;
    }
    .asset-num {
        font-size: .6rem;
        color: #374452;
    }
    .asset-unit {
        color: #A6AFBA;
        font-size: .3rem;
        margin-left: .26rem;
    }
    .asset-worth {
        color: #A6AFBA;
        font-size: .3rem;
    }
    .minus {
        color: #F43E3A;
    }
    .mapping {
        font-size: .36rem;
        /*width: 1.5rem;*/
        height: .6rem;
        line-height: .6rem;
        border-radius: .3rem;
        margin-left: .29rem;
        padding: 0 .4rem;
        color: #FFF;
        background-color: #29DC54;
        text-align: center;
    }
</style>