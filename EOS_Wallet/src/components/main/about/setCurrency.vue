<template>
    <div class="page">
        <header-item :title="$t('m.currencySet')"></header-item>
        <hr />
        <radio-item :items="items" :value="currency" @checked="handlerChecked"></radio-item>
    </div>
</template>

<script>
    import RadioItem from '../../../commons/components/RadioItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { RMB, DOLLAR } from '../../../constant'

    export default {
        name: '',
        components: {
            RadioItem,
            HeaderItem
        },
        data () {
            return {
                currency: this.$store.state.currency
            }
        },
        computed: {
            items () {
                return [
                    {
                        title: this.$t('m.currencyType.RMB'),
                        value: RMB
                    },
                    {
                        title: this.$t('m.currencyType.USD'),
                        value: DOLLAR
                    }
                ]
            }
        },
        methods: {
            handlerChecked (value) {
                this.currency = value
                if (value === RMB) {
                    this.$store.commit('setRMB')
                } else if (value === DOLLAR) {
                    this.$store.commit('setDollar')
                }
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
</style>