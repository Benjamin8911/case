<template>
    <div class="page">
        <header-item :title="title"></header-item>
        <div class="wrapper">
            <private-one v-if="title === $t('m.useProtocol')"></private-one>
            <private-two v-else></private-two>
        </div>
        <button class="btn" v-if="btnFlag" v-tap="{methods: back}" v-text="$t('m.agreeTerm')"></button>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import PrivateOne from '../../../commons/components/private1.vue'
    import PrivateTwo from '../../../commons/components/private2.vue'
    import {CHINESE, ENGLISH} from '../../../constant'

    export default {
        name: 'agreement',
        components: {
            HeaderItem,
            PrivateOne,
            PrivateTwo
        },
        data () {
            return {
                pageName: ''
            }
        },
        computed: {
            title () {
                return this.pageName === 'agreement' ? this.$t('m.useProtocol') : this.$t('m.privacyPolicy')
            },
            btnFlag () {
                return this.pageName === 'fromRegister'
            }
        },
        methods: {
            back () {
                this.$router.goBack()
            }
        },
        created () {
            /**
             * agreement    关于我们/使用协议
             * private      关于我们/隐私条列
             * fromRegister 注册页
             */
            this.pageName = this.$route.query.pageName
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .wrapper{
        height: 100vh;
        overflow: scroll;
        color: #777777;
        font-size: 0.36rem;
        line-height: 1.8;
    }
    .btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.62rem;
        border: none;
        border-top: 1px solid #AAAAAA;
        outline: none;
        color: #ffffff;
        font-size: 0.48rem;
        font-family: PingFangSC-Light;
        background-color: #42BDFE;
    }
</style>