<template>
    <div class="page">
        <header-item :title="$t('m.aboutUs')"></header-item>
        <hr />
        <div class="app-info-bar">
            <span class="app-icon"></span>
            <p class="app-version" v-text="versionInfo"></p>
        </div>
        <list-item class="check-version" :bg="bg" :title="$t('m.checkUpgrade')" :title-style="titleStyle" :rightContent="$t('m.lastVersion')" :right-content-style="rightContentStyle" v-tap="{methods: checkVersion}"></list-item>
        <list-item class="list-item" :bg="bg" :title="$t('m.privacyPolicy')" :title-style="titleStyle" show-arrow v-tap="{methods: jump, path: 'private'}"></list-item>
        <list-item class="list-item" :bg="bg" :title="$t('m.useProtocol')" :title-style="titleStyle" show-arrow v-tap="{methods: jump, path: 'agreement'}"></list-item>
        <!-- 遮罩层 -->
        <mt-popup v-model="upgradeFlag" popup-transition="popup-fade">
            <div class="modal">
                <span class="close" v-tap="{methods: closeModal}"></span>
                <div class="upgrade-title" v-text="$t('m.newVersion')"></div>
                <span class="upgrade-icon"></span>
                <div class="upgrade-version">V.1.1.0</div>
                <ul class="upgrade-info">
                    <li>1.添加了设置金额功能。</li> 
                    <li>2.增加了交易记录分类筛选功能。</li>
                    <li>3.消息通知功能。</li>
                </ul>
                <button-item class="btn" :title="$t('m.upgradeNow')"></button-item>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import ListItem from '../../../commons/components/ListItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import { MessageBox } from 'mint-ui'
    export default {
        name: 'aboutUs',
        components: {
            ListItem,
            HeaderItem,
            ButtonItem
        },
        data () {
            return {
                version: '1.0.0',
                bg: '#F4F7F9',
                upgradeFlag: false
            }
        },
        mounted () {
            if (window.plus) {
                this.version = window.plus.runtime.version
            }
        },
        computed: {
            titleStyle () {
                return {
                    color: '#555555'
                }
            },
            rightContentStyle () {
                return {
                    color: '#29DC54'
                }
            },
            versionInfo () {
                return `${this.$t('m.version')} ${this.version}`
            }
        },
        methods: {
            checkVersion () {
                MessageBox.close()
                MessageBox(this.$t('m.tips'), this.$t('m.lastVersion'))
                // this.upgradeFlag = true
                console.log('check version ...')
            },
            jump (params) {
                this.$router.push({
                    path: `/agreement`,
                    query: {
                        pageName: params.path
                    }
                })
            },
            closeModal () {
                this.upgradeFlag = false
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .app-info-bar{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: start;
        align-items: center;
    }
    .app-icon{
        width: 2rem;
        height: 2rem;
        margin-top: 0.73rem;
        margin-bottom: 0.32rem;
        background-image: url(../../../../static/images/LOGO.png);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain; 
    }
    .app-version{
        font-size: 0.42rem;
        font-family: PingFangSC-Light;
        color: #aaaaaa;
        margin-bottom: 0.53rem;
    }
    .check-version{
        margin-bottom: 0.3rem;
    }
    .list-item{
        margin-bottom: 1px;
    }

    .v-modal{
        opacity: 0.7
    }
    .modal{
        width: 9.08rem;
        border-radius: 0.1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .close{
        width: 0.6rem;
        height: 0.6rem;
        background-image: url(../../../../static/images/close.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        position: absolute;
        top: 0.36rem;
        right: 0.36rem;
    }
    .upgrade-title{
        color: #555555;
        font-size: 0.48rem;
        font-family: PingFangSC-Light;
        margin-top: 0.48rem;
        margin-bottom: 0.47rem;
    }
    .upgrade-icon{
        width: 2.6rem;
        height: 2.6rem;
        background-image: url(../../../../static/images/upgrade.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        margin-bottom: 0.49rem;
    }
    .upgrade-version, .upgrade-info{
        width: 6.26rem;
        font-size: 0.36rem;
        color: #aaaaaa;
        margin-bottom: 0.27rem;
    }
    .upgrade-info{
        line-height: 0.62rem;
    }
    .btn{
        margin-bottom: 0.59rem;
    }
</style>