<template>
    <div class="asset">
        <!-- 资产页 -->
        <!-- 扫描二维码 -->
        <div class="scan" v-tap="{methods: scanCode}">
            <img v-show="walletList.length!==0" src="../../../../static/images/scan.png" class="scan-img">
        </div>
        <mt-loadmore :top-method="loadTop" ref="loadmore">
            <!-- 钱包轮播图 -->
            <div class="wallet">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item, i) in walletList" :key="i">
                        <div class="wallet-item" v-tap="{ methods: jump, path:'walletDetail' }" :style="walletBackground(item.walletImg)">
                            <div class="wallet-row">
                                <span class="wallet-name">{{item.walletName}}</span>
                                <a class="record" v-tap.stop="{ methods: jump, path:'record' }" v-text="$t('m.transactionRecord')"></a>
                            </div>
                            <div class="wallet-label">{{`${$t('m.totalAssets')}(${symbol})`}}</div>
                            <div class="wallet-asset"><span>{{item.asset.toFixed(2)}}</span></div>
                            <a class="back-up-wallet" v-if="!!item.mnocis" v-tap.stop="{ methods: jump, path:'backUpWallet' }" v-text="$t('m.backUpWallet')"></a>
                            <a class="back-up-wallet" v-if="!item.mnocis" v-text="$t('m.backedUp')"></a>
                        </div>
                        <div class="wallet-modal" v-show="activeIndex !== i"></div>
                    </swiper-slide>
                    <swiper-slide v-if="walletList.length===0">
                        <div class="wallet-item" v-tap="{ methods: createWallet }" :style="walletBackground('wallet1')">
                            <div class="wallet-row">
                                <span class="wallet-name">{{$t('m.myWallet')}}</span>
                                <a class="record" v-text="$t('m.transactionRecord')"></a>
                            </div>
                            <div class="wallet-asset"><span>0.00</span></div>
                            <div class="wallet-label">{{`${$t('m.totalAssets')}(${symbol})`}}</div>
                            <a class="back-up-wallet" v-text="$t('m.backUpWallet')"></a>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="wallet-item wallet-new">
                            <a class="create-wallet" v-tap.stop="{ methods: jump, path: 'createWallet' }" v-text="$t('m.createWallet')"></a>
                            <a class="import-wallet" v-tap.stop="{ methods: jump, path: 'importWallet' }" v-text="$t('m.importWallet')"></a>
                        </div>
                        <div class="wallet-modal" v-show="walletNewModal"></div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination" style="bottom: 0"></div>
                  </swiper>
            </div>

            <!-- 转入/转出 -->
            <ul class="roll">
                <li><a class="roll-label" v-tap="{ methods: jump, path: 'rollIn' }"><img src="../../../../static/images/roll-in.png" class="roll-img" />{{$t('m.rollIn')}}</a></li>
                <li><a class="roll-label" v-tap="{ methods: jump, path: 'rollOut' }"><img src="../../../../static/images/roll-out.png" class="roll-img" />{{$t('m.rollOut')}}</a></li>
            </ul>

            <!-- 资产详情列表 -->
            <p class="details-label" v-text="$t('m.assetsDetail')"></p>
            <assets-list :list="assetsList" @click="toCoinDetail" class="assets-list" @mapping="mapping"></assets-list>
        </mt-loadmore>

        <!-- 资产/我的 -->
        <!-- <tabbar :items="tabItems"></tabbar> -->
        <!-- 弹出初始化钱包设置密码框 -->
        <mt-popup v-if="walletList.length===0" v-model="popupSetPassword" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="set-password">
                <h1 class="title" v-text="$t('m.setWalletPassword')"></h1>
                <input-light class="password" ref="input" clear :placeholder="$t('m.passwordPlaceholder')" type="password" v-model="walletPassword"></input-light>
                <div class="tips" v-show="checkPassword">{{$t('m.passwordNotice')}}</div>
                <button-item class="btn" :title="$t('m.confirm')" :disabled="checkPassword" v-tap="{methods: confirm}"></button-item>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import Tabbar from '../../../commons/components/Tabbar.vue'
    import AssetsList from '../../../commons/components/AssetsList.vue'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { getCoin } from '../../../lib/js/coin'
    import { getContent, setContent, getList, updateList, addList } from '../../../lib/js/storage'
    import remote from '../../../lib/js/remote'
    import { decrypt, MD5, encrypt } from '../../../lib/js/crypto'
    import { RMB, DOLLAR } from '../../../constant'
    import WEB3 from '../../../web3'
    import inputLight from '../../../commons/components/InputLight.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import { MessageBox, Loadmore } from 'mint-ui'
    import { plusReady } from '../../../lib/js/plusReady'

    export default {
        name: "asset",
        data () {
            return {
                list: [],
                // walletList: [],
                swiperOption: {
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 250,
                        depth: 100,
                        modifier: 1,
                        slideShadows : false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        bulletActiveClass: 'wallet-bullet-active',
                    },
                    on: {
                        slideChange: () => {
                            this.OnSlideChange(this.swiper.activeIndex)
                        }
                    }
                },
                walletColor: {
                    wallet1: '41,220,84',
                    wallet2: '241,89,136',
                    wallet3: '32,89,232',
                    wallet4: '244,62,58',
                    wallet5: '255,150,0',
                    walletNew: '22,167,252'
                },
                activeWallet: {},
                popupSetPassword: false,
                walletPassword: '',
                walletNewModal: false,
                activeIndex: 0
            }
        },
        components: {
            swiper,
            swiperSlide,
            Tabbar,
            AssetsList,
            inputLight,
            ButtonItem
        },
        computed: {
            symbol() {
                switch (this.$store.state.currency) {
                    case RMB:
                        return '￥'
                        break
                    case DOLLAR:
                        return '$'
                        break
                }
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            checkPassword () {
                return !this.walletPassword.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)
            },
            walletList () {
                return this.$store.state.walletList
            },
            assetsList () {
                if (this.activeWallet.assetsList) {
                    return this.activeWallet.assetsList
                } else {
                    return this.list
                }
            }
        },
        mounted() {
            let tokenspace = JSON.parse(window.sessionStorage.getItem('tokenspace'))
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            let username = user.username
            let content = getContent(username)
            let update = false // 是否需要更新用户数据记录
            let wallet = content.wallet
            let contacts = content.contacts
            let market = JSON.parse(window.sessionStorage.getItem('market'))

            // 首次登陆提醒用户创建钱包
            let fristLogin = window.localStorage.getItem(username + 'fristLogin')
            if (fristLogin !== 'fristLogin') {
                window.localStorage.setItem(username + 'fristLogin', 'fristLogin')
                this.popupSetPassword = true
            }

            this.$store.commit('setUsername', username)

            if (!wallet) {
                // 没有钱包记录
                content.wallet = MD5(username + 'Wallet')
                update = true
            }

            if (!contacts) {
                // 没有联系人记录
                content.contacts = MD5(username + 'Contacts')
                update = true
            }
            update && setContent(username, content)
            this.$store.commit('setStorageWallet', content.wallet)
            this.$store.commit('setStorageContacts', content.contacts)
            if (this.$store.state.walletList.length === 0) {
                let temWalletList = []
                let walletList = getList(content.wallet) || []
                walletList.forEach((wallet, index) => {
                    wallet = JSON.parse(decrypt(wallet))
                    wallet.asset = 0
                    wallet.assetsList = []
                    // 通过钱包地址查询资产列表
                    let address = wallet.walletAddress
                    for (let tem in tokenspace) {
                        let coin = getCoin(tem)
                        if (tem === 'ETH') {
                            WEB3.get_balance(address, (params) => {
                                coin.num = WEB3.web3.fromWei(params.data, 'ether').toFixed(4)
                                coin.worth = (parseFloat(coin.num) * market[coin.unit]).toFixed(2)
                                wallet.assetsList.unshift(coin)
                                wallet.asset += coin.worth-0
                            })
                        } else if (tem === 'DPY') {

                        } else {
                            WEB3.contract[tem].balanceOf(address, (error, result) => {
                                let num = WEB3.web3.fromWei(result, 'ether').toNumber()
                                if (num !== 0 || tem === 'EOS') {
                                    coin.num = WEB3.web3.fromWei(WEB3.contract[tem].balanceOf(address), 'ether').toFixed(4)
                                    coin.worth = (parseFloat(coin.num) * market[coin.unit]).toFixed(2)
                                    wallet.assetsList.push(coin)
                                    wallet.asset += coin.worth-0
                                }
                            })
                        }
                    }
                    temWalletList.push(wallet)
                })
                this.$store.commit('setWalletList', temWalletList)
            }
            plusReady(() => {
                window.plus.nativeUI.closeWaiting()
            })
            // 选中第一个钱包
            this.OnSlideChange(0)

        },
        methods: {
            walletBackground (wallet) {
                return {
                    'backgroundColor': `rgba(${this.walletColor[wallet]},1)`,
                    'box-shadow': `0 .09rem .09rem rgba(${this.walletColor[wallet]},.3)`
                }
            },
            jump (param) {
                let path = param.path
                if (!this.activeWallet.walletAddress) {
                    let passRoute = ['createWallet', 'importWallet']
                    if (passRoute.indexOf(path) !== -1) {
                        this.$router.push({
                            path: `/${param.path}`
                        })
                    } else {
                        if (this.walletList.length > 0) {
                            MessageBox.close()
                            MessageBox(this.$t('m.tips'), this.$t('m.chooseWallet'))
                        } else {
                            MessageBox.close()
                            MessageBox(this.$t('m.tips'), this.$t('m.notCreateWallet'))
                        }
                    }
                } else {
                    this.$router.push({
                        path: `/${param.path}`
                    })
                }
            },
            OnSlideChange (activeIndex) {
                this.activeIndex = activeIndex
                if (activeIndex < this.walletList.length) {
                    // 选中钱包
                    this.activeWallet = this.walletList[activeIndex]
                    this.$store.commit('setActiveWallet', this.activeWallet)
                    this.list = this.activeWallet.assetsList
                    this.walletNewModal = true
                } else {
                    // 选中新建钱包
                    this.list = []
                    this.activeWallet = {}
                    this.$store.commit('setActiveWallet', {})
                    this.walletNewModal = false
                }
                if (this.walletList.length === 0 && !this.swiper.isEnd) {
                    // 显示初始化钱包时，默认显示以太坊
                    let coin = getCoin('ETH')
                    coin.num = 0
                    coin.worth = 0
                    this.list = [coin]
                }
            },
            scanCode () {
                if (this.walletList.length === 0) {
                    return
                }
                this.$router.push({ 
                    path: '/TDCode',
                    query: {
                        from: 'assets'
                    }
                })
            },
            toCoinDetail (data) {
                this.$router.push({
                    path: '/coinDetail',
                    query: {
                        name: data.name,
                        coin: data.unit,
                        num: data.num,
                        worth: data.worth
                    }
                })
            },
            createWallet () {
                // 创建钱包
                this.popupSetPassword = true
            },
            confirm () {
                if (!this.checkPassword) {
                    this.popupSetPassword = false
                    let token = window.sessionStorage.getItem('token')
                    remote.create_wallet({ password: this.walletPassword }, token).then(response => {
                        let data = response.data
                        let wallet = {
                            walletName: '我的钱包',               // 钱包名称
                            keystore: data.keystore,               // keystore
                            mnocis: data.mnocis,                   // 助记词
                            walletImg: 'wallet1',                             // 钱包图片
                            walletAddress: '0x' + data.keystore.address,  // 钱包地址
                            assetsList: [],                             // 钱包下的资产列表
                            privateKey: data.privatekey             //私钥
                        }
                        // 加密钱包内容
                        addList(this.$store.state.storageWallet, encrypt(JSON.stringify(wallet)))
                        wallet.asset = 0
                        let coin = getCoin('ETH')
                        wallet.assetsList.push(coin)
                        this.walletList.push(wallet)
                        this.walletPassword = ''
                        this.OnSlideChange(0)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            loadTop () {
                let market = JSON.parse(window.sessionStorage.getItem('market'))
                let tokenspace = JSON.parse(window.sessionStorage.getItem('tokenspace'))
                let wallet = this.activeWallet
                if (wallet.walletAddress) {
                    let address = wallet.walletAddress
                    let asset = 0
                    let count = 0
                    wallet.assetsList = []
                    for (let tem in tokenspace) {
                        let coin = getCoin(tem)
                        if (tem === 'ETH') {
                            WEB3.get_balance(address, (params) => {
                                coin.num = WEB3.web3.fromWei(params.data, 'ether').toFixed(4)
                                coin.worth = (parseFloat(coin.num) * market[coin.unit]).toFixed(2)
                                wallet.assetsList.unshift(coin)
                                asset += coin.worth-0
                                count++
                                this.updateAsset(tokenspace, asset, count)
                            })
                        } else if (tem === 'DPY') {
                            count++
                            this.updateAsset(tokenspace, asset, count)
                        } else {
                            WEB3.contract[tem].balanceOf(address, (error, result) => {
                                let num = WEB3.web3.fromWei(result, 'ether').toNumber()
                                if (num !== 0 || tem === 'EOS') {
                                    coin.num = WEB3.web3.fromWei(WEB3.contract[tem].balanceOf(address), 'ether').toFixed(4)
                                    coin.worth = (parseFloat(coin.num) * market[coin.unit]).toFixed(2)
                                    wallet.assetsList.push(coin)
                                    wallet.asset += coin.worth-0
                                }
                            })
                            count++
                            this.updateAsset(tokenspace, asset, count)
                        }
                    }
                    this.list = this.activeWallet.assetsList
                    this.activeWallet = wallet
                }
                this.$refs.loadmore.onTopLoaded();
            },
            updateAsset (tokenspace, asset, count) {
                let length = Object.keys(tokenspace).length
                if (length === count) {
                    this.activeWallet.asset = asset
                }
            },
            mapping () {
                this.$router.push({
                    path: '/mappingDescription'
                })
            }
        }
    }
</script>

<style scoped>
    .asset {
        /*background:rgba(24,26,42,1);*/
        color: white;
        height: 100%;
    }
    .scan {
        height: .61rem;
        text-align: right;
        padding: 1.14rem .41rem 0 0;
    }
    .scan-img {
        width: .62rem;
    }
    .wallet {
        height: 4.88rem;
        margin-top: .65rem;
    }
    .wallet-item {
        width: 9.07rem;
        height: 4.41rem;
        margin: 0 auto .4rem;
        background-size: 107%;
        background-repeat: no-repeat;
        background-position: -.3rem -.28rem;
        border-radius: .15rem;
        text-align: center;
        
    }
    .wallet-modal {
        position: absolute;
        width: 9.07rem;
        height: 4.41rem;
        top: 0;
        left: .9rem;
        background-color: rgba(55,55,55,0.5);
    }
    .wallet-row {
        display: flex;
        justify-content: space-between;
        padding-top: .41rem;
    }
    .wallet-name {
        font-size: .4rem;
        margin-left: .57rem;
        color: #F4F7F9;
    }
    .record {
        font-size: .40rem;
        margin-right: .52rem;
        color: white;
    }
    .wallet-asset {
        text-align: center;
        font-size: .9rem;
    }
    .wallet-asset > span {
        position: relative;
    }
    .wallet-asset > span:before {
        content: "\2248";
        position: absolute;
        left: -.3rem;
        bottom: 0;
        font-size: .36rem;
    }
    .wallet-label {
        font-size: .3rem;
        text-align: center;
        color: #E6EEF2;
    }
    .back-up-wallet {
        display: inline-block;
        width: 2.9rem;
        height: .54rem;
        font-size: .36rem;
        color: #fff;
        background-color: rgba(255,255,255,0.1);
        border: rgba(255,255,255,.3) solid 1px;
        border-radius: .4rem;
        padding: .12rem 0;
        margin-top: .33rem;
    }
    .wallet-new {
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .5rem;
        box-sizing: border-box;
        background-color: rgba(22,167,252,1);
        box-shadow: 0 .09rem .09rem rgba(22,167,252,.3);
    }
    .create-wallet, .import-wallet {
        width: 2.71rem;
        font-size: .42rem;
        color: #fff;
        border: rgba(255,255,255,.2) solid 1px;
        border-radius: .53rem;
        padding: .195rem 0;
        background-color: rgba(255,255,255,0.1);
    }
    .roll {
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
    }
    .roll-label {
        font-size: .42rem;
        width: 5.4rem;
        height: 1.19rem;
        line-height: 1.19rem;
        display: block;
        text-align: center;
        color: #29DC54;
        background-color: #F4F7F9;
        box-shadow:.13rem 0 0 #E2EAEE; 
    }
    .roll-img {
        width: .48rem;
        margin-right: .31rem;
        vertical-align: middle;
    }
    .details-label {
        font-size: .3rem;
        color: #A6AFBA;
        margin: .21rem 0 .21rem .45rem;
    }
    .assets-list {
        height: 8.48rem;
        height: -webkit-calc(100vh - 10.39rem);
        height: calc(100vh - 10.39rem);
        overflow: auto;
    }

    .set-password {
        position: relative;
        height: 6rem;
        padding: .5rem;
        color: #555;
    }
    .title {
        font-size: .54rem;
        margin-bottom: 1.39rem;
        text-align: center;
    }
    .password {
        width: 7.61rem;
    }
    .tips {
        width: 7.61rem;
        color: #FF6D6E;
        font-size: 0.4rem;
        text-indent: 0.44rem;
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
    }
    .btn {
        position: absolute;
        bottom: .2rem;
        display: block;
        margin: .46rem auto .3rem;
    }

</style>