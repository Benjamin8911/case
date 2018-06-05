<template>
    <div class="quotation-search">
        <header>
            <span class="back" v-tap="{ methods: goBack }"></span>
            <div class="search-form">
                <span class="search-icon"></span>
                <input class="search-input" type="text" name="search-input" v-model="searchText" placeholder="EOS">
                <span class="search-clear" v-tap="{ methods: clearInput }"></span>
            </div>
            <button class="btn-search" v-tap="{ methods: search }">搜索</button>
        </header>
        <hr />
        <div v-show="!showSearchList">
            <p class="search-title">大家都在搜</p>
            <ul class="search-list">
                <li class="search-item" v-for="item in list" v-text="item.name" v-tap="{ methods: toSearch, text: item.name }"></li>
            </ul>
        </div>
        <ul class="quotation-list" v-show="showSearchList">
            <li v-if="item.assetsName">
                <quotation-item :assets="item.assetsName" :dollar="item.dollar" :RMB="item.RMB" :change="item.change" v-tap="{ methods: toDetail, item: item }"></quotation-item>
                <hr />
            </li>
        </ul>
    </div>
</template>

<script>
    import QuotationItem from '../../../commons/components/QuotationItem.vue'
    import remote from '../../../lib/js/remote'
    export default {
    	name: 'quotationSearch',
    	data () {
    		return {
                searchText: '',
                list: [],
                showSearchList: false,
                item: {}
    		}
    	},
        mounted () {
            remote.search_people().then(response => {
                this.list = response.data.data
            })
        },
        components: {
            QuotationItem
        },
        methods: {
            goBack () {
                this.$router.goBack()
            },
            clearInput () {
                this.searchText = ''
            },
            toSearch (params) {
                if (params) {
                    this.searchText = params.text
                }
            },
            toDetail (params) {
                this.$router.push({
                    path: '/quotationDetail',
                    query: params.item
                })
            },
            search () {
                remote.search_wallet({ data: this.searchText }).then(response => {
                    this.showSearchList = true
                    response.data.data.forEach(item => {
                        if (item.marketName === `${this.searchText}usdt`) {
                            this.item = {
                                assetsName: this.searchText.toLocaleUpperCase(),
                                dollar: `$ ${item.marketPrice}`,
                                change: item.marketAmount.replace('00%', '%'),
                                open: `$ ${item.marketTrend}`,
                                volume: item.count,
                                high: `$ ${item.high}`,
                                low: `$ ${item.low}`,
                            }
                            let dollar = item.marketPrice - 0
                            this.item.RMB = `￥${(dollar * item.fixed).toFixed(2)}`
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .quotation-search {

    }
    header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: .72rem;
    }
	.back{
        display: inline-block;
        width: .8rem;
        height: 1.44rem;
        background-image: url('../../../../static/images/back.png');
        background-position: 0.27rem center;
        background-size: 0.32rem 0.6rem;
        background-repeat: no-repeat;
    }
    .search-form {
        display: inline-flex;
        align-items: center;
        width: 7.46rem;
        height: .8rem;
        border: #29DC54 solid 1px;
        border-radius: .4rem; 
    }
    .search-icon {
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background-image: url('../../../../static/images/search-gray.png');
        background-size: .4rem .44rem;
        background-position: center;
        background-repeat: no-repeat;
    }
    .search-input {
        font-size: .36rem;
        display: inline-block;
        width: 6rem;
        height: .6rem;
        border: 0;
        color: #374452;
        outline: none;
        background-color: transparent;
    }
    ::-webkit-input-placeholder{
        color: #A6AFBA;
    }
    .search-clear {
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background-image: url('../../../../static/images/clear.png');
        background-size: .48rem;
        background-position: center;
        background-repeat: no-repeat;
    }
    .btn-search {
        /*width: .8rem;*/
        font-size: .42rem;
        padding: 0;
        border: 0;
        color: #29DC54;
        background-color: transparent;
        outline: none;
    }
    .search-title {
        font-size: .36rem;
        margin: .47rem .45rem;
        color: #A6AFBA;
    }
    .search-list {
        margin: 0 .22rem;
    }
    .search-item {
        font-size: .36rem;
        display: inline-block;
        width: 2.35rem;
        height: .73rem;
        line-height: .73rem;
        border-radius: .37rem;
        margin-left: .24rem;
        color: #FFF;
        background-color: #29DC54;
        text-align: center;
    }
</style>