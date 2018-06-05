<template>
    <div class="page">
        <!-- 头部 -->
        <header-item class="header" bg="#ffffff" :title="$t('m.importWallet')"></header-item>
        <ul class="navbar">
            <li :class="{ active: isActiveMnocis }" v-tap="{ methods: selectSwiper, swiperIndex: '0' }">{{$t('m.mnemonic')}}</li>
            <li :class="{ active: isActiveKeystore }" v-tap="{ methods: selectSwiper, swiperIndex: '1' }">Keystore</li>
            <li :class="{ active: isActivePrivatekey }" v-tap="{ methods: selectSwiper, swiperIndex: '2' }">{{$t('m.private')}}</li>
        </ul>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="tab-container">
                <import-mnocis @import="importSuccess"></import-mnocis>
            </swiper-slide>
            <swiper-slide class="tab-container">
                <import-keystore @import="importSuccess"></import-keystore>
            </swiper-slide>
            <swiper-slide class="tab-container">
                <import-privatekey @import="importSuccess"></import-privatekey>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ImportMnocis from '../../../commons/components/ImportMnocis.vue'
    import ImportKeystore from '../../../commons/components/ImportKeystore.vue'
    import ImportPrivatekey from '../../../commons/components/ImportPrivatekey.vue'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { encrypt } from '../../../lib/js/crypto'
    import { addList, updateList, getList } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'
    import { plusReady } from '../../../lib/js/plusReady'

    export default {
        name: '',
        components: {
            HeaderItem,
            ImportMnocis,
            ImportKeystore,
            ImportPrivatekey,
            swiper,
            swiperSlide
        },
        data () {
            return {
                scanIcon: require('../../../../static/images/scan-deep.png'),
                activeSwiper: 'mnocis',
                swiperOption: {
                    on: {
                        slideChange: () => {
                            this.activeSwiper = this.swiperName[this.swiper.activeIndex]
                        }
                    }
                },
                swiperName: ['mnocis', 'keystore', 'privatekey']
            }
        },
        computed: {
            swiper () {
                return this.$refs.mySwiper.swiper
            },
            isActiveMnocis () {
                return this.activeSwiper === 'mnocis'
            },
            isActiveKeystore () {
                return this.activeSwiper === 'keystore'
            },
            isActivePrivatekey () {
                return this.activeSwiper === 'privatekey'
            }
        },
        methods: {
            scan () {
                console.log('scan')
            },
            selectSwiper (param) {
                this.activeSwiper = this.swiperName[param.swiperIndex]
                this.swiper.slideTo(param.swiperIndex, 500, false)
            },
            importSuccess (data) {
                if (!data.keystore) {
                    // 导入失败
                    console.log(data)
                    MessageBox.close()
                    MessageBox(this.$t('m.tips'), this.$t('m.importWalletFail'))
                    plusReady(() => {
                        window.plus.nativeUI.closeWaiting()
                    })
                } else {
                    let walletList = this.$store.state.walletList
                    let encryptedWalletList = getList(this.$store.state.storageWallet)
                    let isAdd = true
                    walletList.forEach((wallet, index) => {
                        if (wallet.walletAddress === '0x' + data.keystore.address) {
                            // 存在重复钱包
                            plusReady(() => {
                                window.plus.nativeUI.closeWaiting()
                            })
                            isAdd = false
                            if (this.isActiveKeystore) {
                                MessageBox.alert(this.$t('m.walletExisted'), this.$t('m.tips')).then(action => {
                                    this.$router.goBack()
                                })
                            } else {
                                MessageBox.confirm(this.$t('m.importWalletTips')).then(action => {
                                    let temWallet = {
                                        asset: wallet.asset,
                                        walletName: wallet.walletName,
                                        keystore: data.keystore,
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
                                    MessageBox.alert(this.$t('m.resetPassword'), this.$t('m.tips')).then(action => {
                                        this.$router.goBack()
                                    })
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                        }
                    })
                    if (isAdd) {
                        // 导入成功
                        let wallet = {
                            walletName: this.$t('m.importWallet'), // 钱包名称
                            keystore: data.keystore,               // keystore
                            // mnocis: data.mnocis,                   // 助记词
                            walletImg: '',                             // 钱包图片
                            walletAddress: '0x' + data.keystore.address,  // 钱包地址
                            assetsList: [],                             // 钱包下的资产列表
                            privateKey: data.privatekey             //私钥
                        }
                        wallet.walletImg = "wallet" + Math.floor(Math.random()*5+1)
                        // 加密钱包内容
                        addList(this.$store.state.storageWallet, encrypt(JSON.stringify(wallet)))
                        this.$store.commit('setWalletList', [])
                        MessageBox.close()
                        MessageBox(this.$t('m.tips'), this.$t('m.importWalletSuccess'))
                        this.$router.goBack()
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100%;
    }
    .header {
        background-color: #FFF;
    }
    .navbar{
        font-size: .42rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        align-items: center;
        height: .96rem;
        background-color: #FFF;
        color: #555;
    }
    .active {
        position: relative;
        color:#29DC54;
    }
    .active:after{
        content: '';
        background-color: #29DC54;
        display: block;
        width: 0.48rem;
        height: 0.06rem;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        position: absolute;
        left: 50%;
        bottom: -.16rem;
        border-radius: .03rem;
    }
    .tab-container{
        display: flex;
        display: -webkit-flex;
        flex-flow: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
</style>