<template>
    <div>
        <ul class="mnemonicWordBtn" v-if="tepOne && !tepTwo">
            <li v-for="item in words" :style="wordStyleOne">{{item}}&nbsp;</li>
        </ul>
        <ul class="mnemonicWordBtn mnemonicWordBtnTwo" v-else-if="tepTwo">
            <li v-for="item in words" v-tap="{methods:getSet, value:item}" :style="{'color':hasSelected[item]==undefined?'#555555':'#42BDFE'}">{{item}}</li>
        </ul>
        <div class="WordPlaceholder" v-else>{{$t('m.clickMnemonic')}}</div>
    </div>
</template>

<script>
    export default {
        name: "MnemonicWordItem",
        data(){
            return{

            }
        },
        props:{
            tepOne:{
                type:Boolean,
                default:true,
            },
            tepTwo:{
                type:Boolean,
                default:false,
            },
            words:Array,
            hasSelected:{
                type:Object,
                default: () => {
                    return {}
                }
            },
        },
        computed:{
            wordStyleOne(){
                return{
                    color:'#555555',
                }
            },
        },
        methods:{
            //取值
            getSet(param){
                this.$emit('click-value',param.value);
            },
            //打乱顺序
            shuffle(a) {
                var length = a.length;
                var shuffled = Array(length);

                for (var index = 0, rand; index < length; index++) {
                    rand = ~~(Math.random() * (index + 1));
                    if (rand !== index)
                        shuffled[index] = shuffled[rand];
                    shuffled[rand] = a[index];
                }
                return shuffled;
            },
        }
    }
</script>

<style scoped>
    .mnemonicWordBtn{
        zoom:1;
        padding:0.46rem 0.5rem 0 0.5rem;
    }
    .mnemonicWordBtn .mnemonicWordBtnTwo{
        padding:0.49rem 0.75rem 0.6rem 0.72rem;
    }
    .mnemonicWordBtnTwo li{
        width:2.96rem;
        height:1.5rem;
        line-height:1.5rem;
        text-align:center;
        font-size:0.48rem;
        color:#555555;
        border-radius:0.15rem;
        background:#fff;
        line-height:1.5rem;
        margin:0 0 0.22rem 0.27rem;
    }
    .mnemonicWordBtn:after{
        content:'.';display:block;visibility:hidden;clear:both;height:0;
    }
    .mnemonicWordBtn li{
        display:inline-block;
    }
    .WordPlaceholder{
        font-size:0.42rem;
        font-family:PingFangSC-Light;
        color:rgba(170,170,170,1);
        padding-top:0.46rem;
    }
    .mnemonicWordBtnTwo li{
        float:left;
    }
</style>