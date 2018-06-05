<template>
    <div class="page">
        <header-item :title="$t('m.systemSet')"></header-item>
        <hr />
        <list-item class="list-item" :bg="bg" :title="$t('m.languageSet')" :title-style="titleStyle" :right-content="language" :right-content-style="rightContentStyle" show-arrow v-tap="{methods: jump, path: 'setLanguage'}"></list-item>
        <!-- <hr />
        <list-item :bg="bg" :title="$t('m.currencySet')" :title-style="titleStyle" :right-content="currency" :right-content-style="rightContentStyle" show-arrow v-tap="{methods: jump, path: 'setCurrency'}"></list-item> -->
    </div>
</template>

<script>
    import ListItem from '../../../commons/components/ListItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { CHINESE, ENGLISH, RMB, DOLLAR } from '../../../constant'
    import { getLanguage } from '../../../lib/js/storage'

    export default {
        name: '',
        components: {
            ListItem,
            HeaderItem
        },
        data () {
            return {
                bg: '#ffffff'
            }
        },
        computed: {
            language () {
                switch (getLanguage()) {
                    case CHINESE:
                        return '简体中文'
                        break
                    case ENGLISH:
                        return 'English'
                        break
                }
            },
            currency () {
                switch (this.$store.state.currency) {
                    case RMB:
                        return this.$t('m.currencyType.RMB')
                        break
                    case DOLLAR:
                        return this.$t('m.currencyType.USD')
                        break
                }
                return 
            },
            titleStyle () {
                return {
                    color: '#555555'
                }
            },
            rightContentStyle () {
                return {
                    color: '#777777'
                }
            }
        },
        methods: {
            jump (params) {
                this.$router.push({
                    path: `/${params.path}`
                })
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .list-item{
        margin-top: 0.24rem;
    }
</style>