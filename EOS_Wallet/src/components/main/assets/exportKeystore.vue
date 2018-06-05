<template>
    <div class="export-keystore">
        <header-item class="header" title="导出Keystore" bg="#fff"></header-item>
        <p class="warn">
            注意：<br>
            1.请复制黏贴Keystore文件到安全、离线的地方保存；<br>
            2.请勿使用网络传输；<br>
            3.二维码禁止保存、截图、以及拍照；<br>
            4.一旦被他人获取将造成不可挽回的资产损失。
        </p>
        <div class="content">
            <p class="keystore" v-text="keystore"></p>
            <button-item class="btn-copy" :title="$t('m.copy')" data-clipboard-action="copy" :data-clipboard-text="keystore" v-if="isSupported"></button-item>
            <!-- <button class="btn-copy" data-clipboard-action="copy" :data-clipboard-text="keystore">拷贝</button> -->
            <button-item class="btn-show-qr" title="显示二维码" v-tap="{ methods: showQR }"></button-item>
            <a class="keystore-link" v-tap="{ methods: whatKeystore }">{{$t('m.whatKeystore')}}</a>
        </div>
        <!-- 禁止截图 -->
        <mt-popup v-model="popupTips" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="tips-plane">
                <span class="close"  @click="closeTips"></span>
                <img class="camera-no" src="../../../../static/images/camera-no.png" alt="请勿截图">
                <p class="tips-title">{{$t('m.prohibitScreenshot')}}</p>
                <p class="tips-content">请确保四周无人及无任何摄像头！勿用截图或拍照到方式保存Keystore文件或对应二维码。</p>
                <button-item class="btn-tips-ok" title="确定" bg="#FF6D6E" @btn-click="closeTips"></button-item>
            </div>
        </mt-popup>
        <!-- 显示二维码 -->
        <mt-popup v-model="popupQR" popup-transition="popup-fade" style="border-radius: .1rem;">
            <div class="qr-plane">
                <canvas id="qr-code"></canvas>
                <p class="tips-content">扫一扫即可获得Keystore</p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { plusReady } from '../../../lib/js/plusReady'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'
    import QRCode from 'qrcode'
    import Clipboard from 'clipboard'
    import { Toast } from 'mint-ui'
    export default {
        name: 'exportKeystore',
        data () {
            return {
                keystore: "",
                popupTips: false,
                popupQR: false,
                isSupported: false
            }
        },
        components: {
            HeaderItem,
            ButtonItem
        },
        mounted () {
            this.keystore = JSON.stringify(this.$store.state.activeWallet.keystore)
            this.isSupported = Clipboard.isSupported()
            if (this.isSupported) {
                let clipboard = new Clipboard(".btn-copy")
                clipboard.on('success', e => {
                    Toast(this.$t('m.copySuccess'))
                })
            }
            plusReady(() => {
                let OSName = window.plus.os.name
                if (OSName === 'Android') {
                    let activity = window.plus.android.runtimeMainActivity()
                    let win = window.plus.android.invoke(activity, "getWindow")
                    window.plus.android.invoke(win, "setFlags", 0x00002000, 0x00002000)
                } else {
                    this.popupTips = true
                }
            })
        },
        methods: {
            whatKeystore () {
                this.$router.push({
                    path: '/question',
                    query: {
                        question: 'keystore'
                    }
                })
            },
            showQR () {
                this.makeQR()
                this.popupQR = true
            },
            closeTips () {
                this.popupTips = false
            },
            makeQR () {
                let opts = {
                    margin: 1
                }
                let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                opts.width = windowWidth / 10.8 * 5.32
                QRCode.toCanvas(document.getElementById("qr-code"), this.keystore, opts)
            }
        }
    }
</script>

<style scoped>
    .export-keystore {
        height: 100%;
        overflow: hidden;
        background-color: #F0F0F0;
    }
    .header {
        background-color: #FFF;
    }
    .warn {
        font-size: .36rem;
        padding: .2rem .83rem; 
        line-height: .64rem;
        color: #fff;
        background-color: #F43E3A;
    }
    .content {
        height: 13.6rem;
        padding-top: .38rem;
        margin-top: .18rem;
        background-color: #fff;
    }
    .keystore {
        font-size: .3rem;
        padding: .22rem .35rem;
        margin: 0 .48rem;
        line-height: .7rem;
        color: #374452;
        background-color: rgba(240,240,240,.5);
        word-break: break-all;
    }
    .btn-copy {
        display: block;
        margin: .7rem auto 0;
    }
    .btn-show-qr {
        display: block;
        margin: .31rem auto 0;
    }
    .keystore-link {
        font-size: .36rem;
        display: block;
        margin-top: .57rem;
        color: #29DC54;
        text-align: center;
    }
    .tips-plane {
        width: 9.08rem;
        height: 7rem;
        text-align: center;
    }
    .close{
         position:absolute;
         display: inline-block;
         top: .2rem;
         right: .67rem;
         width: .04rem;
         height: .848rem;
         background: #aaa;
         -webkit-transform: rotate(45deg);
         -moz-transform: rotate(45deg);
         -o-transform: rotate(45deg);
         -ms-transform: rotate(45deg);
         transform: rotate(45deg);
    }
    .close:after{
        content: "";
        position: absolute;
         top: 0;
         left: 0;
        width: .04rem;
        height: .848rem;
        background: #aaa;
         -webkit-transform: rotate(270deg);
         -moz-transform: rotate(270deg);
         -o-transform: rotate(270deg);
         -ms-transform: rotate(270deg);
         transform: rotate(270deg);
    }
    .camera-no {
        width: .68rem;
        height: .67rem;
        margin-top: .37rem;
    }
    .tips-title {
        font-size: .48rem;
        margin-top: .4rem;
        text-align: center;
        color: #555555;
    }
    .tips-content {
        font-size: .36rem;
        width: 7.39rem;
        margin: .62rem auto 0;
        line-height: .64rem;
        color: #aaa;
    }
    .btn-tips-ok {
        margin-top: .72rem;
    }
    .qr-plane {
        width: 9.84rem;
        height: 9.07rem;
        text-align: center;
    }
    #qr-code {
        width: 5.32rem;
        height: 5.32rem;
        margin-top: 1.58rem;
    }
    .tips-content {
        text-align: center;
        margin-top: .64rem;
    }
</style>