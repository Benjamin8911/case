<template>
    <div class="page">
        <header-item :title="title" fixed bg="#ffffff"></header-item>
        <hr />
        <div class="wrapper" v-html="content"></div>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import question from '../../../../static/question.json'

    export default {
        name: 'question',
        components: {
            HeaderItem
        },
        data () {
            return {
                pageName: ''
            }
        },
        computed: {
            title () {
                let title = {
                    'privateKey': this.$t('m.whatPrivate'),
                    'mnemonic': this.$t('m.whatMnemonic'),
                    'keystore': this.$t('m.whatKeystore')
                }
                return title[this.pageName]
            },
            content () {
                return question[this.$store.state.language][this.pageName]
            }
        },
        methods: {
            back () {
                this.$router.goBack()
            }
        },
        created () {
            this.pageName = this.$route.query.question
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
        overflow: auto;
    }
    .wrapper {
        padding: .5rem;
        color: #555;
        word-break: break-all;
    }
</style>