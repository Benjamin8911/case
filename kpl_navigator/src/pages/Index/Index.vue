<template>
	<div class="index" v-cloak>
		<div class="appbox" v-for="(app,key) in apps">
			<h3 class="appbox-title">{{app.title}}<span class="fr"><router-link :to="'/index/'+key">查看全部</router-link></span></h3>
			<div class="appbox-container clearfix">
				<div class="appbox-ulcontainer clearfix" :style="{width:countWidth(app.appVos)}">
					<ul class="appbox-main fl" v-for="(items,index) in app.appVos" :key="index" v-cloak>
						<li class="appbox-main__item clearfix" v-for="(item,index1) in items" :key="index1">
							<img class="fl" :src="item.dataImage.indexOf('http')>-1?item.dataImage:imgBaseUrl+item.dataImage"><div class="info fl"><h4>{{item.dataName}}</h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div><div class="btn-download fr" @click="download(item.dataUrl,item.mainFriendsid,item.dataFriendsid)">下载</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {plusReady} from '../../lib/plusReady';
	import API from '../../config/api.config.js';
	import HeadSearch from '../../components/HeadSearch/HeadSearch'
	import FootNav from '../../components/FootNav/FootNav'
	export default {
		components:{
			HeadSearch,
			FootNav
		},
		data(){
			return {
				imgBaseUrl:API.imgBaseUrl,
				apps:{}
			}
		},
		methods:{
			countWidth(obj){
				return Object.keys(obj).length*9.3+'rem';
			},
			download(str,id1,id2){
				plusReady(()=>{
					plus.statistic.eventTrig(id1);
					plus.statistic.eventTrig(id2);
				});
				window.open('http://www.lian2345.com/app/file/'+str);
			},
			fetchApp(){
				const _this = this;
				_this.$http.get(API.baseUrl+'/daikuan/api/app/appsGroup/Kpl').then(res=>{
					const result = res.data;
					if(result.code==200){
						_this.apps = result.data['b'];
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchApp();
		}
	}
</script>
<style scoped>
	.index{
		padding-bottom: 1.333333rem;
		min-height: 2.666667rem;
	}
	.index .appbox-main__item{
		width: 8.533333rem;
	}
</style>