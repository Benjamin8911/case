<template>
	<div id="footnav" class="clearfix">
		<router-link class="footnav-item fl" to="/index"><div class="item__icon-index"></div><p>{{names[0]}}</p></router-link>
		<router-link class="footnav-item fl" to="/wechat"><div class="item__icon-wechat"></div><p>{{names[1]}}</p></router-link>
		<router-link class="footnav-item fl" to="/blog"><div class="item__icon-blog"></div><p>{{names[2]}}</p></router-link>
	</div>
</template>
<script>
	import API from '../../config/api.config.js';
	import axios from 'axios';
	export default {
		data(){
			return{
				names:[]
			}
		},
		methods:{
			fetchName(){
				let _this = this;
				axios.get(API.baseUrl+'/daikuan/app/navigations/all/all').then(res=>{
					const result = res.data;
					for(let i = 0; i<result.data.length;i++){
						_this.names.push(result.data[i].navigationName);
					}
				});
			}
		},
		mounted(){
			const _this = this;
			_this.fetchName();
		}
	}
</script>
<style scoped>
	#footnav{
		position: fixed;
		bottom: 0;
		left: 0;
		padding-top: 0.106667rem;
		width: 100%;
		height: 1.333333rem;
		border-top: 1px solid rgba(0,0,0,0.25);
		z-index: 999;
		background-color: rgba(255,255,255,0.9);
	}
	.footnav-item{
		width: 33.333333%;
	}
	.footnav-item .item__icon-index{
		margin: 0 auto 0.053333rem;
		width: 1.333333rem;
		height: 0.693333rem;
		background: url("../../assets/images/index.png") no-repeat center top;
		background-size: 0.72rem 0.693333rem;
	}
	.footnav-item .item__icon-wechat{
		margin: 0 auto 0.053333rem;
		width: 1.333333rem;
		height: 0.693333rem;
		background: url("../../assets/images/wechat.png") no-repeat center top;
		background-size: 0.853333rem 0.693333rem;
	}
	.footnav-item .item__icon-blog{
		margin: 0 auto 0.053333rem;
		width: 1.333333rem;
		height: 0.693333rem;
		background: url("../../assets/images/blog.png") no-repeat center top;
		background-size: 0.853333rem 0.693333rem;
	}
	.footnav-item p{
		text-align: center;
		font-size: 0.266667rem;
		color: #8E8E93;
	}
	.footnav-item.router-link-active p{
		color: #FE5D94;
	}
	.footnav-item.router-link-active .item__icon-index{
		background: url("../../assets/images/index-active.png") no-repeat center top;
		background-size: 0.72rem 0.693333rem;
	}
	.footnav-item.router-link-active .item__icon-wechat{
		background: url("../../assets/images/wechat-active.png") no-repeat center top;
		background-size: 0.853333rem 0.693333rem;
	}
	.footnav-item.router-link-active .item__icon-blog{
		background: url("../../assets/images/blog-active.png") no-repeat center top;
		background-size: 0.853333rem 0.693333rem;
	}
</style>