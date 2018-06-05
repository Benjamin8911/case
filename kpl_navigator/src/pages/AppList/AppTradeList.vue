<template>
	<div class="appList">
		<h2><b class="back" @click="goback"></b>交易所app</h2>
		<ul class="list">
			<li class="list-item clearfix" v-for="(item,index) in appList" :key="index">
				<img class="fl" :src="item.dataImage.indexOf('http')>-1?item.dataImage:imgBaseUrl+item.dataImage">
				<div class="info fl"><h4>{{item.dataName}}</h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div>
				<div class="btn-download fr" @click="download(item.dataUrl,item.mainFriendsid,item.dataFriendsid)">下载</div>
			</li>
		</ul>
	</div>
</template>
<script>
    import {plusReady} from '../../lib/plusReady';
    import API from '../../config/api.config.js'
	export default {
		data(){
			return {
                imgBaseUrl:API.imgBaseUrl,
				appList:[]
			}
		},
        methods:{
            goback(){
                const _this = this;
                _this.$router.goBack();
            },
            download(str,id1,id2){
                plusReady(()=>{
                    plus.statistic.eventTrig(id1);
                    plus.statistic.eventTrig(id2);
                });
                window.open('http://www.lian2345.com/app/file/'+str);
            },
            fetchTradeList(){
                const _this = this;
                _this.$http.get(API.baseUrl+'/daikuan/api/app/apps/Kpl').then(res=>{
                    const result = res.data;
                    if(result.code==200){
                        _this.appList = result.data.hasOwnProperty('2')?result.data['2']:[];
                    }
                }).catch(err=>console.log(err));
            }
        },
        mounted(){
            const _this = this;
            _this.fetchTradeList();
        }
	}
</script>
<style scoped>
    .appList h2{
        position: fixed;
        width: 100%;
        height: 1.066667rem;
        line-height: 1.066667rem;
        font-size: 0.533333rem;
        text-align: center;
        background-color: #F7F7F7;
        z-index: 999;
    }
    .appList .back{
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
</style>