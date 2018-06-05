<template>
    <div class="td-code">
        <header-item :title="$t('m.scanQRcode')" color="#FFFFFF" bg="rgba(0,0,0,.3)"></header-item>
        <div id="bcid">
            <div style="height:40%"></div>
        </div>
        <p class="tip">请对准二维码，耐心等待</p>
    </div>
</template>

<script>
    import { plusReady } from '../../../lib/js/plusReady'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    export default {
        name: '',
        data () {
            return {
                scan: null
            }
        },
        components: {
            HeaderItem
        },
        mounted () {
            console.log('mounted')
            this.start()
        },
        activated () {
            console.log('activated')
            this.start()
        },
        deactivated () {
            console.log('deactivated')
            this.destroy()
        },
        beforeDestroy () {
            console.log('beforeDestroy')
            this.destroy()
        },
        methods: {
            start () {
                let from = this.$route.query.from
                plusReady(() => {
                    let ws = null,
                        wo = null
                    // 获取窗口对象
                    ws = window.plus.webview.currentWebview()
                    wo = ws.opener()

                    let filters = [
                        plus.barcode.QR
                    ]
                    let BarcodeStyles = {
                        frameColor: "#42BDFE",
                        scanbarColor: "#42BDFE",
                        background: "rgba(0,0,0,.7)"
                    }
                    // 开始扫描
                    window.setTimeout(() => {
                        this.scan = this.scan || new window.plus.barcode.Barcode('bcid', filters, BarcodeStyles)
                        this.scan.onmarked = (type, result) => {
                            if (result.substr(0, 10) === "kpl-QRCode") {
                                result = result.replace(/\n/g, '').replace('kpl-QRCode', '')
                                this.scan.close()
                                this.$store.commit('setQR', result)
                                if (from === 'assets') {
                                    this.$router.replace({ path: '/rollOut',})
                                } else {
                                    this.$router.goBack()
                                }
                            } else {
                                this.scan.cancel() 
                                alert(result)
                                this.scan.start()             
                            }
                        }
                        this.scan.start()
                    }, 100)
                })
            },
            destroy () {
                this.scan && this.scan.close()
                this.scan = null
            }
        }
    }
</script>

<style scoped>
    .td-code {
        position: relative;
        height: 100%;
        background-color: #000;
    }
    #bcid {
        width: 100%;
        position: absolute;
        top: 2.16rem;
        bottom: 5rem;
        text-align: center;
    }
    .tip {
        position: absolute;
        bottom: 4.37rem;
        width: 100%;
        color: #F0F0F0;
        text-align: center;
        z-index: 1
    }
</style>