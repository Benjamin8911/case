<template>
    <div class="wallet-detail">
        <!-- 标题 -->
        <header-item :title="$t('m.walletDetail')" back-icon="light" color="#374452"></header-item>
        <!-- 头像地址 -->
        <div class="radian">
            <div class="address">
                <span class="round round-1"></span>
                <span class="round round-2"></span>
                <span class="round round-3"></span>
                <span class="round round-4"></span>
                <span class="round round-5"></span>
                <img class="icon" src="../../../../static/images/icon/1.png" alt="头像">
                <p class="address-detail" :style="accountStyle">{{address}}</p>
                <button class="copy btn-copy" data-clipboard-action="copy" :data-clipboard-text="address" v-if="isSupported">{{$t('m.copyAddress')}}</button>
            </div>
        </div>
        <list-item class="wallet-name" :bg="bg" :title="$t('m.walletName')" :right-content="walletName" :right-content-style="rightContentStyle" edit @input="changeWalletName"></list-item>
        <hr />
        <list-item :bg="bg" :title="$t('m.modifyWalletPassword')" showArrow @click.native="jump('editPassword')"></list-item>
        <list-item class="export-key" :bg="bg" :title="$t('m.exportPrivate')" showArrow @click.native="exportKey"></list-item>
        <hr />
        <list-item :bg="bg" :title="$t('m.exportKeystore')" showArrow @click.native="exportKeystore"></list-item>

        <button-item class="btn-del" :title="$t('m.delete')" v-tap="{ methods: delWallet }"></button-item>

        <!-- 导出私钥弹出框 -->
        <mt-popup v-model="popupExportKey" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="export-plane" v-if="popupExportKey">
                <p class="title">{{$t('m.exportPrivate')}}</p>
                <p class="key">{{key}}</p>
                <p class="warn">{{$t('m.privateWarn')}}</p>
                <button class="btn-copy btn" id="copy" data-clipboard-action="copy" :data-clipboard-text="key" v-if="isSupported">{{$t('m.copy')}}</button>
                <a class="private-key" v-tap="{ methods: private }">{{$t('m.whatPrivate')}}?</a>
            </div>
        </mt-popup>
        <mt-popup v-model="popupWalletPassword" popup-transition="popup-fade" style="border-radius: .1rem;">
            <check-wallet-password @confirm="checkWalletPassword"></check-wallet-password>
        </mt-popup>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ListItem from '../../../commons/components/ListItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import CheckWalletPassword from '../../../commons/components/CheckWalletPassword.vue'
    import Clipboard from 'clipboard'
    import { MessageBox } from 'mint-ui'
    import { Toast } from 'mint-ui'
    import { encrypt, decrypt, decryptByKey } from '../../../lib/js/crypto'
    import { getList, updateList } from '../../../lib/js/storage'
    export default {
        name: 'walletDetail',
        data () {
            return {
                walletName: '',
                address: '',
                bg: '#FFF',
                rightContentStyle: { color: "#797985" },
                popupExportKey: false,
                key: '',
                popupWalletPassword: false,
                exportType: '',
                isSupported: false
            }
        },
        components: {
            HeaderItem,
            ListItem,
            ButtonItem,
            CheckWalletPassword
        },
        computed: {
            accountStyle () {
                if (!this.isSupported) {
                    return {
                        maxWidth: '10rem',
                        overflow: 'auto'
                    }
                }
                return {}
            }
        },
        mounted () {
            let wallet = this.$store.state.activeWallet
            this.address = wallet.walletAddress
            this.walletName = wallet.walletName
            this.key = decryptByKey(wallet.privateKey)
            this.isSupported = Clipboard.isSupported()
            if (this.isSupported) {
                let clipboard = new Clipboard(".btn-copy")
                clipboard.on('success', e => {
                    Toast({
                        message: this.$t('m.copySuccess'),
                        className: 'toast-class'
                    })
                })
            }
        },
        methods: {
            jump (path) {
                this.$router.push({
                    path: `/${path}`
                })
            },
            private () {
                this.$router.push({
                    path: '/question',
                    query: {
                        question: 'privateKey'
                    }
                })
            },
            checkWalletPassword (flag) {
                this.popupWalletPassword = false
                if (flag) {
                    if (this.exportType === 'privateKey') {
                        this.popupExportKey = true
                    }
                    if (this.exportType === 'keystore') {
                        this.jump('exportKeystore')
                    }
                } else {
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.passwordError'))
                }
                
            },
            exportKey () {
                this.exportType = 'privateKey'
                this.popupWalletPassword = true
                // this.popupExportKey = true
            },
            exportKeystore () {
                this.exportType = 'keystore'
                this.popupWalletPassword = true
            },
            delWallet () {
                MessageBox.close()
                MessageBox.confirm(this.$t('m.isDelete')).then(action => {
                    let wallet = this.$store.state.activeWallet
                    let encryptedWalletList = getList(this.$store.state.storageWallet)
                    let walletList = this.$store.state.walletList
                    walletList.forEach((item, index) => {
                        if (item.walletAddress === wallet.walletAddress) {
                            encryptedWalletList.splice(index, 1)
                            walletList.splice(index, 1)
                            this.$store.commit('setWalletList', walletList)
                        }
                    })
                    updateList(this.$store.state.storageWallet, encryptedWalletList)
                    this.$router.goBack()
                }).catch(error => {
                    console.log(error)
                })
            },
            copy () {
                Toast({
                    message: this.$t('m.copySuccess'),
                    className: 'toast-class',
                    // duration: -1
                });
            },
            changeWalletName (walletName) {
                this.walletName = walletName
                let wallet = this.$store.state.activeWallet
                wallet.walletName = walletName
                this.$store.commit('setActiveWallet', wallet)
                let encryptedWalletList = getList(this.$store.state.storageWallet)
                let walletList = this.$store.state.walletList
                walletList.forEach((item, index) => {
                    if (item.walletAddress === wallet.walletAddress) {
                        item.walletName = walletName
                        encryptedWalletList[index] = encrypt(JSON.stringify(item))
                    }
                })
                // this.$store.commit('setWalletList', walletList)
                updateList(this.$store.state.storageWallet, encryptedWalletList)
            }
        }
    }
</script>
<style scoped>
    .wallet-detail {
        color: #374452;
        height: 100%;
        overflow: hidden;
    }
    .radian {
        height: 3.71rem;
    }
    .address {
        position: relative;
        z-index: 1;
        height: 2.67rem;
        text-align: center;
        background-color: #29DC54;
    }
    .address:after {
        content: ' ';
        position: absolute;
        left: -5%;
        bottom: -1.4rem;
        z-index: -2;
        width: 110%;
        height: 4rem;
        border-radius: 0 0 50% 50%;
        background-color: #29DC54;
    }
    .round {
        position: absolute;
        display: block;
        z-index: -1;
    }
    .round-1 {
        top: 2.38rem;
        left: 1rem;
        width: .47rem;
        height: .47rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-2 {
        top: .4rem;
        left: 2.3rem;
        width: .23rem;
        height: .23rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-3{
        top: 1.25rem;
        left: 3.13rem;
        width: .74rem;
        height: .74rem;
        border: #5fe57f solid .04rem;
        border-radius: 100%;
    }
    .round-4 {
        top: .69rem;
        left: 6.92rem;
        width: .7rem;
        height: .7rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-5 {
        top: 2.47rem;
        left: 9.7rem;
        width: .3rem;
        height: .3rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .icon {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: .36rem;
    }
    .address-detail {
        font-size: .3rem;
        max-width: 3.6rem;
        color: #FFF;
        line-height: normal;
        margin: .5rem auto 0;
        overflow:hidden;
        text-overflow: ellipsis;
    }
    .copy {
        font-size: .36rem;
        width: 2.9rem;
        border: 0;
        border-radius: .35rem;
        margin-top: .19rem;
        line-height: .7rem;
        color: #29DC54;
        background-color: #FFF;
    }
    .wallet-name {
        margin-top: .64rem;
    }
    .export-key {
        margin-top: .3rem;
    }
    .export-plane {
        width: 9.84rem;
        height: 7.96rem;
        text-align: center;
    }
    .title {
        font-size: .48rem;
        margin-top: .51rem;
        line-height: .48rem;
        color: #555555;
    }
    .key {
        font-size: .36rem;
        width: 8.34rem;
        padding: .27rem .27rem;
        margin: .5rem auto 0;
        color: #555555;
        background-color: #F0F0F0;
        text-align: left;
        word-break: break-all;
    }
    .warn {
        font-size: .4rem;
        width: 7.6rem;
        margin: .25rem auto 0;
        line-height: .66rem;
        color: #FF6D6E;
        word-break: break-all;
    }
    .btn-copy {
        display: block;
        margin: .42rem auto 0;
    }
    .btn {
        color: rgb(255, 255, 255);
        background-color: rgb(66, 189, 254);
        box-shadow: none;
        width: 7.63rem;
        height: 1.49rem;
        font-size: 0.48rem;
        opacity: 1;
        outline: none;
        border: none;
        border-radius: 0.75rem;
    }
    .private-key {
        font-size: .4rem;
        display: block;
        margin: .63rem auto 0;
        color: #42BDFE;
    }
    .btn-del {
        display: block;
        margin: 2.3rem auto 0;
    }
</style>