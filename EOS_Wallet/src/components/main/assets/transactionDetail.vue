<template>
    <div class="page">
        <header-item :title="$t('m.transactionDetail')"></header-item>
        <div class="transaction-item margin-top">
            <span class="title" v-text="$t('m.receivablesAccount')"></span>
            <span class="font-white-small" v-text="data.account"></span>
            <span class="font-blue" id="copy" v-text="$t('m.copy')" data-clipboard-action="copy" :data-clipboard-text="data.account" v-if="isSupported"></span>
        </div>
        <hr />
        <div class="transaction-item">
            <span class="title" v-text="$t('m.remark')"></span>
            <span class="font-white" v-text="data.name"></span>
        </div>
        <div class="transaction-item margin-top">
            <span class="title" v-text="$t('m.transactioncurrency')"></span>
            <span class="font-white">{{data.coinName}}  {{data.unit}}</span>
        </div>
        <hr />
        <div class="transaction-item">
            <span class="title" v-text="$t('m.transcationNumber')"></span>
            <div class="asset-right">
                <p>
                    <span class="asset-num">{{data.num}}</span>
                    <span class="asset-unit">{{data.unit}}</span>
                </p>
                <p class="asset-worth">≈ {{symbol}} {{data.worth}}</p>
            </div>
        </div>
        <hr />
        <div class="transaction-item">
            <span class="title" v-text="$t('m.transactionTime')"></span>
            <span class="font-white">{{time}}</span>
        </div>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { formatDate } from '../../../lib/js/tools'
    import {RMB, DOLLAR} from '../../../constant'
    import remote from '../../../lib/js/remote'
    import Clipboard from 'clipboard'
    import { Toast } from 'mint-ui'

    export default {
        name: 'transactionDetail',
        components: {
            HeaderItem
        },
        data () {
            return {
                data: {
                    account:"",
                    coinName:"",
                    name:"",
                    num:"",
                    time:"",
                    unit:"",
                    worth:"",
                },
                time:'',
                isSupported: false
            }
        },
        created () {
            this.data = this.$route.query
            this.time = formatDate(new Date(this.data.time-0), 'yyyy-MM-dd hh:mm')
        },
        mounted() {
            this.isSupported = Clipboard.isSupported()
            if (this.isSupported) {
                let clipboard = new Clipboard("#copy")
                clipboard.on('success', e => {
                    Toast(this.$t('m.copySuccess'))
                })
            }
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
            }
        }
    }
</script>

<style>
    .transaction-item{
        height: 1.5rem;
        background-color: #F4F7F9;
        display: -webkit-flex;
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-top: 1px;
    }
    .transaction-item.margin-top{
        margin-top: 0.3rem;
    }
    .title{
        color: #A6AFBA;
        font-size: 0.42rem;
        margin-left: 0.46rem;
        flex-grow: 1;
        flex-shrink: 0;
    }
    .font-white{
        color: #374452;
        font-size: 0.42rem;
        margin-right: 0.42rem;
    }
    .font-white-small{
        color: #374452;
        font-size: 0.3rem;
        margin-left: 2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        flex-shrink: 1;
    }
    .font-blue{
        color: #29DC54;
        font-size: 0.42rem;
        flex-shrink: 0;
        width: 1.53rem;
        text-indent: 0.35rem;
        height: 100%;
        line-height: 1.5rem;
    }
    .asset-right {
        text-align: right;
        margin-right: 0.42rem;
    }
    .asset-num {
        font-size: 0.42rem;
        color: #374452;
    }
    .asset-unit {
        color: #374452;
        font-size: .3rem;
        margin-left: .26rem;
    }
    .asset-worth {
        color: #797985;
        font-size: .3rem;
    }
    .minus {
        color: #F43E3A;
    }
</style>