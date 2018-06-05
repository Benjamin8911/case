<template>
    <div class="info">
        <mt-swipe class="info-banner" :show-indicators="false">
            <mt-swipe-item v-for="(item,index) in bannerList" :key="index"><img :src="item.importantImage"></mt-swipe-item>
        </mt-swipe>
        <h6 class="info-title">热门资讯</h6>
        <mt-loadmore :top-method="fresh" ref="loadmore">
            <ul 
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <li class="info-box clearfix" v-for="(item,index) in infoList" :key="index" @click="jumpToDetail(item.articleId)">
                    <img :src="item.artcleImageLogo" class="info-box__icon fl">
                    <div class="info-box__text fl">
                        <h3>{{item.artcleName.length>14?item.artcleName.slice(0,14)+'...':item.artcleName}}</h3>
                        <p>{{item.artcleWordpress.length>26?item.artcleWordpress.slice(0,26)+'...':item.artcleWordpress}}</p>
                        <div><span></span><b>{{item.artcleUpdatetime}}</b></div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
    	name: 'info',
    	data () {
    		return {
                page:1,         //  当前页
                pages:1,        //  总页数
                loading:false,
                bannerList:[],  //  广告列表
                infoList:[]     //  资讯列表
    		}
    	},
        methods:{
            //  下拉刷新
            fresh(){
                let _this = this;
                _this.page = 1;
                _this.fetchInfo();
                this.$refs.loadmore.onTopLoaded();
            },
            loadMore(){
                let _this = this;
                _this.loading = true;
                _this.fetchMore();
                _this.loading = false;
            },
            jumpToDetail(id){
                let _this = this;
                _this.$router.push({
                    path:'/infoDetail/'+id
                });
            },
            fetchBanner(){
                let _this = this;
                axios.get('http://192.168.31.121:5656/information/eos/important').then(res=>{
                    const result = res.data;
                    _this.bannerList = result.importantPageInfo.list;
                });
            },
            fetchInfo(){
                let _this = this;
                axios.get('http://192.168.31.121:5656/information/eos/eoswalletapp',{
                    params:{
                        typeTwoId:1
                    }
                }).then(res=>{
                    const result = res.data;
                    _this.infoList = result.eosArticleHotInfoList.list;
                    _this.pages = result.eosArticleHotInfoList.pages;
                });
            },
            fetchMore(){
                let _this = this;
                if(_this.page>_this.pages){return}
                _this.page++;
                axios.get('http://192.168.31.121:5656/information/eos/eoswalletapp',{
                    params:{
                        pageNum:_this.page,
                        typeTwoId:1
                    }
                }).then(res=>{
                    const result = res.data;
                    if(_this.page<=result.eosArticleHotInfoList.pages){
                        for(let i = 0;i<result.eosArticleHotInfoList.list.length;i++){
                            _this.infoList.push(result.eosArticleHotInfoList.list[i]);
                        }
                    }else{
                        return
                    }
                });
            }
        },
        mounted(){
            window.scrollTo(0,0);
            this.fetchBanner();
            this.fetchInfo();
        }
    }
</script>

<style scoped>
    .info{
        padding-bottom: 1.8rem;
    }
    .info-banner{
        display: block;
        height: 4.5rem;
    }
    .info-banner img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .info-title{
        padding-left: .48rem;
        height: .7rem;
        line-height: .7rem;
        font-size: .3rem;
        color: #9FA9B4;
    }
    .info-box{
        padding: .48rem;
        margin-bottom: .2rem;
        background-color: #FFFFFF;
    }
	.info-box__icon{
        display: block;
        margin-right: .23rem;
        width: 4rem;
        height: 3rem;
    }
    .info-box__text{
        width: 5.4rem;
    }
    .info-box__text h3{
        margin-bottom: .12rem;
        font-size: .38rem;
        color: #374452;
    }
    .info-box__text p{
        margin-bottom: .52rem;
        height: 1.35rem;
        font-size: .3rem;
        color: #9FA9B4;
    }
    .info-box__text div{
        height: .3rem;
        line-height: .3rem;
        font-size: .28rem;
        color: #9FA9B4;
    }
    .info-box__text div span{
        display: inline-block;
        margin-right: .12rem;
        width: .3rem;
        height: .3rem;
        background: url("../../../../static/images/timer.png") no-repeat left top;
        background-size: .3rem .3rem;
        vertical-align: top;
    }
</style>