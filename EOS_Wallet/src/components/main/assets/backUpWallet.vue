<template>
    <div class="page">
        <header-item :title="$t('m.backUpWallet')"></header-item>
        <hr />
        <div class="backupNav">
            <span class="step1">1</span>
            <div class="step1Content">{{$t('m.transcribisMnemonic')}}</div>
            <p class="process">
                <i :style="processContinue"></i>
                <i :style="processContinue"></i>
                <i :style="processContinue"></i>
            </p>
            <span class="step2" :style="processContinue">2</span>
            <div class="step2Content" :style="processContinueContent">{{$t('m.verifyingMnemonic')}}</div>
        </div>
        <!--输入框-->
        <mnemonic-word-item :tep-one="tepOne" :words="userSeleted?selectWords:mnemonicWords" class="mnemonicWord"></mnemonic-word-item>
        <div class="warning" v-show="warnHidden">
            <div>{{$t('m.notice')}}<br/>{{$t('m.noticeContent.msg1')}}</div>
        </div>
        <!--助记词按钮区-->
        <mnemonic-word-item ref="words" :hasSelected="tmpSelected" @click-value="pushValue" :tep-one="false" :tep-two="tepTwo" v-show="tepTwoShow" :words="mnemonicWords" class="wordsBtn"></mnemonic-word-item>
        <buttom-item v-text="$t('m.next')" class="next" v-tap="{methods:next}" v-show="nextShow"></buttom-item>
        <buttom-item v-text="$t('m.confirm')" class="ensure" v-tap="{methods:ensure}" v-show="ensureShow"></buttom-item>
        <div class="problem" v-tap="{methods:getQuestion}" v-show="explainWords">{{$t('m.whatMnemonic')}}？</div>
        
        <mt-popup popup-transition="popup-fade" v-model="popupVisible" id="popBox" :closeOnClickModal="false">
            <img :src="closeImg" class="close" v-tap="{methods:closeBox}">
            <div class="printscreen" v-show="printShow">
                <img :src="cameraImg">
                <div>{{$t('m.prohibitScreenshot')}}</div>
                <div class="content">{{$t('m.noticeContent.msg7')}}</div>
                <buttom-item v-text="$t('m.ok')" class="know" v-tap="{methods:closeBox}" :bg="'#FF6D6E'"></buttom-item>
            </div>
            <div class="walletSuccess" v-show="walletShow">
                <img :src="confirmImg">
                <div class="content">{{$t('m.noticeContent.msg6')}}</div>
                <buttom-item v-text="$t('m.ok')" v-tap="{methods:closeBox,type:'success'}"></buttom-item>
            </div>
            <div class="walletSuccess" v-show="walletErrorShow">
                <!-- <img :src="confirmImg"> -->
                <div class="content">{{$t('m.validationFailure')}}</div>
                <div class="content">{{$t('m.fillInAgain')}}</div>
                <buttom-item class="btn-error" v-text="$t('m.ok')" v-tap="{methods:closeBox,type:'error'}"></buttom-item>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { plusReady } from '../../../lib/js/plusReady'
    import buttomItem from '../../../commons/components/ButtonItem.vue'
    import MnemonicWordItem from '../../../commons/components/mnemonicWordItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import { decryptByKey, encrypt } from '../../../lib/js/crypto'
    import { updateList, getList } from '../../../lib/js/storage'
    import { MessageBox } from 'mint-ui'
    export default {
        name: '',
        components:{
            buttomItem,
            MnemonicWordItem,
            HeaderItem
        },
        data () {
            return {
                isContinue:false,
                warnHidden:true,
                mnemonicWords:[],
                selectWords:[],
                tmpSelected:{},
                wordContent:'',
                tepOne:true,
                tepTwo:false,
                tepTwoShow:false,
                explainWords:true,
                nextShow:true,
                ensureShow:false,
                userSeleted:false,//用户开始选择助记词
                closeImg:require('../../../../static/images/close.png'),
                popupVisible:false,
                cameraImg:require('../../../../static/images/camera-no.png'),
                printShow:false,
                walletShow:false,
                walletErrorShow:false,
                confirmImg:require('../../../../static/images/confirm-big.png'),
                mnocis: ''
            }
        },
        mounted () {
            console.log(decryptByKey(this.$store.state.activeWallet.mnocis))
            this.mnocis = decryptByKey(this.$store.state.activeWallet.mnocis)
            this.mnemonicWords = this.mnocis.split(' ')
            plusReady(() => {
                let OSName = window.plus.os.name
                if (OSName === 'Android') {
                    let activity = window.plus.android.runtimeMainActivity()
                    let win = window.plus.android.invoke(activity, "getWindow")
                    window.plus.android.invoke(win, "setFlags", 0x00002000, 0x00002000)
                } else {
                    this.popupVisible = true
                    this.printShow = true
                }
            })
        },
        computed:{
            processContinue(){
                if(this.isContinue){
                    return{backgroundColor:'#29DC54'}
                }else{
                    return{backgroundColor:'#AAAAAA'}
                }
            },
            processContinueContent(){
                if(this.isContinue){
                    return{color:'#29DC54'}
                }else{
                    return{color:'#AAAAAA'}
                }
            }
        },
        methods:{
            //问题跳转
            getQuestion(){
                this.$router.push({
                    path:'/question',
                    query:{
                        question:'mnemonic'
                    }
                })
            },
            //下一步
            next(){
                this.isContinue=true;
                this.tepOne=false;
                this.warnHidden=false;
                this.tepTwo=true;
                this.tepTwoShow=true;
                this.explainWords=false;
                this.nextShow=false;
                this.ensureShow=true;
                this.mnemonicWords=this.$refs.words.shuffle(this.mnemonicWords);//打乱顺序
            },
            //确定
            ensure(){
                // 对比助记词是否正确
                // console.log(this.selectWords.join(' '))
                // console.log(this.mnocis)
                if (this.selectWords.join(' ') === this.mnocis) {
                    this.printShow=false;
                    this.walletShow=true;
                    this.popupVisible=true;
                } else {
                    this.printShow=false;
                    this.walletShow=false;
                    this.walletErrorShow = true
                    this.popupVisible=true;
                }
            },
            //选值
            pushValue(userClick){
                // console.log(this.tmpSelected);
                if(this.tmpSelected[userClick]==undefined){
                    this.selectWords.push(userClick);
                    this.tepOne=true;
                    this.userSeleted=true;
                    this.tmpSelected[userClick]=userClick;
                }else{
                    //已选 再次点击取消
                    delete this.tmpSelected[userClick]
                    this.selectWords.splice(this.selectWords.indexOf(userClick), 1)
                    // return;
                }
                this.mnemonicWords=this.$refs.words.shuffle(this.mnemonicWords);//打乱顺序
            },
            //关闭提示框
            closeBox(param){
                this.printShow = false
                this.popupVisible = false
                if (param.type === 'success') {
                    // 备份钱包成功
                    MessageBox.close()
                    MessageBox.confirm('钱包备份成功，是否删除助记词（注：删除后无法恢复）').then(action => {
                        // 删除助记词
                        let activeWallet = this.$store.state.activeWallet
                        let walletList = this.$store.state.walletList
                        let encryptedWalletList = getList(this.$store.state.storageWallet)
                        walletList.forEach((wallet, index) => {
                            if (wallet.walletAddress === activeWallet.walletAddress) {
                                delete activeWallet.mnocis
                                encryptedWalletList[index] = encrypt(JSON.stringify(activeWallet))
                                console.log(activeWallet)
                                updateList(this.$store.state.storageWallet, encryptedWalletList)
                            }
                        })
                        this.$router.goBack()
                    }).catch(error => {
                        console.log(error)
                        this.$router.goBack()
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .page{
        width:100%;
        height:100vh;
    }
    .backupNav{
        width:9.84rem;
        height:2.02rem;
        background:#fff;
        border-radius:0.15rem;
        margin:0.25rem auto 0.23rem auto;
        position:relative;
    }
    .step1,.step2{
        width: 0.52rem;
        height: 0.52rem;
        line-height: 0.52rem;
        background: #29DC54;
        color: #fff;
        border-radius:50%;
        position:absolute;
        top:0.42rem;
        text-align:center;
    }
    .step1Content,.step2Content{
        height: .39rem;
        line-height: .39rem;
        font-size: .42rem;
        color: #29DC54;
        position: absolute;
        bottom: .38rem;
        word-break: normal;
    }
    .step1{
        left:1.93rem;
    }
    .step2{
        right:1.92rem;
    }
    .step1Content{
        left:1.14rem;
    }
    .step2Content{
        right:1.14rem;
    }
    .process{
        width:0.83rem;
        height:0.13rem;
        position:absolute;
        top:0.68rem;
        left:0;
        right:0;
        margin:0 auto;
    }
    .process i{
        display:inline-block;
        width:0.13rem;
        height:0.13rem;
        border-radius:50%;
    }
    .process i:nth-child(1){
        position:absolute;
        left:0;
    }
    .process i:nth-child(2){
        position:absolute;
        left:0;
        right:0;
        margin:0 auto;
    }
    .process i:nth-child(3){
        position:absolute;
        right:0;
    }
    .mnemonicWord{
        height:2.61rem;
        width:9.84rem;
        margin:0 auto;
        background:#fff;
        border-radius:0.15rem;
        text-align:center;
    }
    .warning{
        width: 9.84rem;
        height: 2.61rem;
        background: #F43E3A;
        border-radius: 0.15rem;
        margin: 1.03rem auto 4.17rem auto;
    }
    .warning div{
        font-size: 0.36rem;
        color: #FFF;
        padding: 0.49rem 0.73rem 0.5rem 0.73rem;
    }
    .next{
        display: block;
        margin: 4.17rem auto 0 auto;
    }
    .problem{
        text-align: center;
        font-size: 0.36rem;
        color: #29DC54;
        margin-top: 0.95rem;
    }
    .ensure{
        display:block;
        margin:0.6rem auto 0 auto;
    }
    #popBox{
        width:9.08rem;
        height:7rem;
        background:#fff;
        border-radius:0.10rem;
    }
    .close{
        position:absolute;
        left: 8.11rem;
        width:0.6rem;
        height:0.6rem;
        margin:0.39rem 0.37rem 0 0;
    }
    .printscreen{
        text-align:center;
        margin-top:0.37rem;
    }
    .printscreen img{
        margin:0 auto;
        width:0.68rem;
        height:0.67rem;
    }
    .printscreen div{
        font-size:0.48rem;
        color:rgba(85,85,85,1);
        margin-top:0.45rem;
    }
    .printscreen div.content{
        width:7.30rem;
        height:0.97rem;
        font-size:0.36rem;
        color:#AAAAAA;
        margin:0.98rem auto 0.86rem auto;
        text-align:left;
    }
    .walletSuccess{
        text-align:center;
    }
    .walletSuccess img{
        width:1.2rem;
        height:1.2rem;
        margin-top:1.54rem;
    }
    .walletSuccess div.content{
        font-size:0.48rem;
        color:rgba(85,85,85,1);
        margin:0.53rem auto 0.88rem auto;
    }
    .btn-error {
        margin-top: 1rem;
    }
</style>