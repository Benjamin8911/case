<template>
    <div class="page">
        <header-item :title="$t('m.languageSet')"></header-item>
        <hr />
        <radio-item :items="items" :value="language" @checked="handlerChecked"></radio-item>
    </div>
</template>

<script>
    import RadioItem from '../../../commons/components/RadioItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { CHINESE, ENGLISH } from '../../../constant'
    import { getLanguage, setLanguage } from '../../../lib/js/storage'

    export default {
        name: '',
        components: {
            RadioItem,
            HeaderItem
        },
        data () {
            return {
                items: [
                    {
                        title: '简体中文',
                        value: CHINESE
                    },
                    {
                        title: 'English',
                        value: ENGLISH
                    }
                ],
                language: ''
            }
        },
        mounted () {
            this.language = getLanguage() == ENGLISH ? ENGLISH : CHINESE
        },
        methods: {
            handlerChecked (value) {
                this.language = value
                this.$i18n.locale = value
                this.$store.commit('setLanguage', value)
                setLanguage(value)
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