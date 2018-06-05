<template>
	<div class="layout">
		<HeadSearch></HeadSearch>
		<mt-swipe :show-indicators="false" class="banner">
			<mt-swipe-item v-for="(item,index) in bannerArr" :key="index"><img :src="'http://www.lian2345.com/images/qukuailian_app/'+item.dataImage"></mt-swipe-item>
		</mt-swipe>
		<router-view class="router-inner"></router-view>
		<FootNav></FootNav>
	</div>
</template>
<script>
	import API from '../../config/api.config.js'
	import HeadSearch from '../../components/HeadSearch/HeadSearch'
	import FootNav from '../../components/FootNav/FootNav'
	export default{
		components:{
			HeadSearch,
			FootNav
		},
		data(){
			return{
				transitionName:'slide-left',
				bannerArr:[]
			}
		},
		methods:{
			fetchBanner(){
				const _this = this;
				_this.$http.get(API.baseUrl+'/daikuan/api/app/banner/Kpl').then(res=>{
					const result = res.data;
					if(result.code==200){
						_this.bannerArr = result.data['0'];
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchBanner();
		}
	}
</script>
<style>
	.layout{
		padding-top: 1.12rem;
	}
	.mint-swipe{
		height: 4.16rem;
	}
	.banner img{
		display: block;
		width: 100%;
		height: 100%;
	}
	/*.router-inner{
		transition: all 0.3s ease;
	}
	.slide-left-enter,.slide-right-leave-active {
		opacity: 0.1;
		-webkit-transform: translate(80%, 0);
		transform: translate(100%, 0);
	}
	.slide-left-leave-active,.slide-right-enter {
		opacity: 0.1;
		-webkit-transform: translate(-80%, 0);
		transform: translate(-100% 0);
	}*/
</style>