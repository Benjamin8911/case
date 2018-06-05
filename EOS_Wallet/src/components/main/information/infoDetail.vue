<template>
    <div class="info-detail">
        <header-item :title="$t('m.hotInfomation')"></header-item>
        <hr>
        <div class="info-detail__article">
            <h4>{{article.artcleName}}</h4>
            <div><span></span><b>{{article.artcleUpdatetime}}</b></div>
            <article class="info-article" v-html="article.artcleContent"></article>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    export default {
    	name: 'infoDetail',
        components:{
            HeaderItem
        },
    	data () {
    		return {
                article:{}
    		}
    	},
        methods:{
            fetchArticle(){
                let _this = this;
                axios.get('http://192.168.31.121:5656/information/eos/onearticle',{
                    params:{
                        articleId:_this.$route.params.id
                    }
                }).then(res=>{
                    const result = res.data;
                    _this.article = result.eosArticle;
                });
            }
        },
        mounted(){
            const _this = this;
            window.scrollTo(0,0);
            _this.fetchArticle();
        }
    }
</script>

<style scoped>
	.info-detail__article{
        padding: .5rem .5rem 0;
        height: 16rem;
        overflow: scroll;
    }
    .info-detail__article h4{
        margin-bottom: .6rem;
        font-size: .42rem;
        color: #374452;
    }
    .info-detail__article div{
        margin-bottom: .6rem;
        font-size: .3rem;
        color: #9FA9B4;
    }
    .info-detail__article p{
        margin-bottom: .6rem;
        font-size: .36rem;
        color: #374452;
        text-indent: 2em;
    }
</style>