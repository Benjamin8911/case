<template>
    <div class="wechatList">
        <h2><b class="back" @click="goback"></b>{{title}}</h2>
        <ul class="list">
            <li class="list-item clearfix" v-for="(item,index) in wechatList" :key="index">
                <div class="icon fl"><img :src="imgBaseUrl+item.dataImage"></div>
                <div class="info fl"><h4>{{item.dataName.length>6?item.dataName.slice(0,6)+'...':item.dataName}}<b>{{item.dataUrl.length>10?item.dataUrl.slice(0,10)+'...':item.dataUrl}}</b></h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div>
                <div class="btn-box fr"><button class="btn-copy" :data-clipboard-text="item.dataUrl">复制</button><button class="btn-code" @click="showCode(item.dataImageTop,item.dataType)">二维码</button></div>
            </li>
        </ul>
        <div id="mask" @click.self="hideMask" v-show="codeFlag">
            <img id="image" :src="codeUrl"><a id="image-download" :href="codeUrl" :download="downName"></a>
            <p>点击图片下载</p>
        </div>
    </div>
</template>
<script>
    import API from '../../config/api.config.js';
    import { Toast } from 'mint-ui';
    import Clipboard from 'clipboard';
    export default {
        data(){
            return{
                imgBaseUrl:API.imgBaseUrl,
                codeFlag:false,
                title:'',
                wechatList:[],
                codeUrl:'',
                downName:''
            }
        },
        methods:{
            goback(){
                const _this = this;
                _this.$router.goBack();
            },
            showCode(str,type){
                const _this = this;
                if(type==2){
                    _this.codeFlag = true;
                    document.body.style.overflow = 'hidden';
                    _this.makeImg(str);
                }else{
                    Toast({
                        message: '暂无此订阅号二维码',
                        position: 'middle',
                        duration: 600
                    });
                }  
            },
            hideMask(){
                const _this = this;
                _this.codeFlag = false;
                document.body.style.overflow = 'auto';
            },
            clipboardInit() {
                const _this = this;
                let clipboard = new Clipboard('.btn-copy');
                clipboard.on('success', function(e) {
                    Toast({
                        message: '复制成功',
                        position: 'middle',
                        duration: 600
                    });
                    e.clearSelection();
                });
            },
            makeImg(str){
                const _this = this;
                _this.codeUrl = 'http://www.lian2345.com/images/qukuailian_app/'+str;
            },
            fetchWechatCompany(){
                const _this = this;
                _this.$http.get(API.baseUrl+'/daikuan/api/app/officialApp/Kpl').then(res=>{
                    const result = res.data;
                    if(result.code==200){
                        _this.wechatList = result.data[_this.$route.params.num];
                        _this.title = result.data[_this.$route.params.num][0].mainName;
                    }
                }).catch(err=>console.log(err));
            }
        },
        mounted(){
            const _this = this;
            _this.fetchWechatCompany();
            _this.clipboardInit();
        }
    }
</script>
<style scoped>
    .wechatList .back{
        position: absolute;
        left: 0.266667rem;
        top: 0;
        width: 1.066667rem;
        height: 1.066667rem;
        background: url("../../assets/images/back.png") no-repeat left center;
        background-size: 0.24rem 0.453333rem;
    }
    .list{
        margin-top: 1.066667rem;
    }
    .list-item{
        padding: 0.4rem 0;
        height: 2.48rem;
    }
    .info {
        padding-top: 0.16rem;
    }
    .info b{
        margin-left: 0.32rem;
        color: #FE4080;
    }
    .btn-box button{
        display: block;
        margin-bottom: 0.186667rem;
    }
</style>