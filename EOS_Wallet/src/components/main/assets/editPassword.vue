<template>
    <div class="edit-password">
        <header-item class="header" :title="$t('m.modifyPassword')" bg="#fff"></header-item>
        <p class="warn">
            {{$t('m.notice')}}<br>
            1.{{$t('m.noticeContent.msg4')}}<br />
            2.{{$t('m.noticeContent.msg5')}}
        </p>
        <div class="content">
            <input-light type="password" :placeholder="$t('m.currentPassword')" v-model="passwordOld" clear></input-light>
            <input-light type="password" :placeholder="$t('m.newPassword')" v-model="passwordNew" clear @blur="changeCheck(true)"></input-light>
            <p class="warn-tips" v-show="checkPassword && checkFlag">{{$t('m.passwordNotice')}}</p>
            <input-light type="password" :placeholder="$t('m.confirmNewPassword')" v-model="passwordAgain" clear @blur="changeCheckAgain(true)"></input-light>
            <p class="warn-tips" v-show="identifyPassword && checkFlagAgain">{{$t('m.confirmNotice')}}</p>
            <button-item class="btn-ok" :title="$t('m.confirm')" v-tap="{methods:commit}" :disabled="isDisabled"></button-item>
            <p class="tips">{{$t('m.noticeContent.msg8')}}</p>
            <a class="import-key" v-tap="{ methods: toImportWallet }">{{$t('m.immediatelyImport')}}</a>
        </div>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import InputLight from '../../../commons/components/InputLight.vue'
    import { MD5, encryptByKey, encrypt, decrypt } from '../../../lib/js/crypto'
    import remote from '../../../lib/js/remote'
    import { getList, updateList } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'
    export default {
        name: 'editPassword',
        data () {
            return {
                passwordOld: "",
                passwordNew: "",
                passwordAgain: ""
            }
        },
        computed: {
            checkPassword () {
                return !this.passwordNew.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)
            },
            identifyPassword () {
                return this.passwordNew !== this.passwordAgain
            },
            isDisabled () {
                return !this.passwordOld || !this.passwordNew || !this.passwordAgain || this.checkPassword || this.identifyPassword
            }
        },
        components: {
            HeaderItem,
               ButtonItem,
               InputLight
        },
        methods: {
            commit () {
                let ticket = this.$store.state.token
                let old_p = encodeURIComponent(encryptByKey(this.passwordOld, ticket))
                let new_p = encodeURIComponent(encryptByKey(this.passwordNew, ticket))
                let data = encodeURIComponent(encryptByKey(JSON.stringify(this.$store.state.activeWallet.keystore), ticket))
                let iv = MD5(ticket).substr(0, 16)
                let key = MD5(ticket)
                let param = {
                    ticket,
                    old_p,
                    new_p,
                    data,
                    iv,
                    key
                }
                remote.modify_wallert_password(param).then(response => {
                    if (response.data.data === '505') {
                        MessageBox(this.$t('m.tips'), this.$t('m.passwordError'))
                        return
                    }
                    let keystore = response.data.keystore
                    let activeWallet = this.$store.state.activeWallet
                    activeWallet.keystore = keystore
                    this.$store.commit('setActiveWallet', activeWallet)
                    let walletList = this.$store.state.walletList
                    let encryptedWalletList = getList(this.$store.state.storageWallet)
                    walletList.forEach((wallet, index) => {
                        if (wallet.walletAddress === '0x' + keystore.address) {
                            let temWallet = {
                                asset: wallet.asset,
                                walletName: wallet.walletName,
                                keystore: keystore,
                                mnocis: wallet.mnocis,
                                walletImg: wallet.walletImg,
                                walletAddress: wallet.walletAddress,
                                assetsList: wallet.assetsList,
                                privateKey: wallet.privateKey
                            }
                            encryptedWalletList[index] = encrypt(JSON.stringify(temWallet))
                            updateList(this.$store.state.storageWallet, encryptedWalletList)
                            walletList[index] = temWallet
                            this.$store.commit('setWalletList', walletList)
                        }
                    })
                    MessageBox(this.$t('m.tips'), this.$t('m.modifySuccess'))
                    this.$router.goBack()
                }).catch(error => {
                    console.log(error)
                    MessageBox(this.$t('m.tips'), this.$t('m.modifyFailure'))
                })
            },
            toImportWallet () {
                this.$router.push({
                    path: '/importWallet'
                })
            },
            changeCheck (bool) {
                this.checkFlag = bool
            },
            changeCheckAgain (bool) {
                this.checkFlagAgain = bool
            }
        }
    }
</script>

<style scoped>
    .edit-password {
        height: 100%;
    }
    .header {
        background-color: #FFF;
    }
    .warn {
        font-size: .36rem;
        padding: .25rem .83rem; 
        line-height: .64rem;
        color: #fff;
        background-color: #F43E3A;
    }
    .content {
        height: 11.6rem;
        padding-top: .72rem;
        margin-top: .24rem;
        background-color: #fff;
    }
    .warn-tips {
        font-size: .36rem;
        padding-top: .1rem;
        margin-left: 1.8rem;
        color: #F43E3A;
    }
    .btn-ok {
        display: block;
        margin: 1.14rem auto 0;
    }
    .tips {
        font-size: .36rem;
        margin-top: .54rem;
        color: #AAA;
        text-align: center;
    }
    .import-key {
        font-size: .4rem;
        display: block;
        color: #29DC54;
        text-align: center;
    }
</style>