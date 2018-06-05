<template>
	<div class="blogList">
		<h2><b class="back" @click="goback"></b>个人微博</h2>
        <ul class="list">
            <li class="list-item clearfix" v-for="(item,index) in blogList" :key="index">
                <div class="icon fl"><img :src="imgBaseUrl+item.dataImageTop"></div>
                <div class="info fl"><h4>{{item.dataName}}</h4><p><a :href="item.dataUrl">{{item.dataUrl.length>20?item.dataUrl.slice(0,20)+'...':item.dataUrl}}</a></p></div>
                <div class="btn-box fr"><button :data-clipboard-text="item.dataUrl" class="btn-copy">复制</button></div>
            </li>
        </ul>
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
				blogList:[]
			}
		},
		methods:{
            goback(){
                const _this = this;
                _this.$router.goBack();
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
            fetchBlogPersonal(){
                const _this = this;
                _this.$http.get(API.baseUrl+'/daikuan/api/app/microblogApp/Kpl').then(res=>{
                    const result = res.data;
                    if(result.code==200){
                        _this.blogList = result.data.hasOwnProperty('7')?result.data['7']:[];
                    }
                }).catch(err=>console.log(err));
            }
        },
        mounted(){
            const _this = this;
            _this.fetchBlogPersonal();
            _this.clipboardInit();
        }
	}
</script>
<style scoped>
    .info p{
        width: 0.9375rem;
    	color: #FE4080;
    }
    .blogList .back{
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
    .list-item a{
        color:#FE4080;
    }
    .list-item .icon{
        padding-top: 0;
    }
    .list-item h4{
        padding-top: 0.213333rem;
    }
    .list-item .info p{
        width: 4.813333rem;
    }
    .list-item .btn-box{
        padding-top: 0.32rem;
    }
    .list-item button{
        vertical-align: top;
    }
</style>