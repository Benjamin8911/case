<template>
	<div class="blog" v-cloak>
		<div class="appbox" v-for="(blog,key) in blogs">
			<h3 class="appbox-title">{{blog.title}}<span class="fr"><router-link :to="'/blog/'+key">查看全部</router-link></span></h3>
			<div class="appbox-container clearfix">
				<div class="appbox-ulcontainer clearfix" :style="{width:countWidth(blog.appVos)}">
					<ul class="appbox-main fl" v-for="(items,index) in blog.appVos" :key="index" v-cloak>
						<li class="appbox-main__item clearfix" v-for="(item,dex) in items" :key="dex">
							<img class="fl" :src="imgBaseUrl+item.dataImageTop"><div class="info fl"><h4>{{item.dataName}}</h4><p><a :href="item.dataUrl">{{item.dataUrl.length>20?item.dataUrl.slice(0,20)+'...':item.dataUrl}}</a></p></div><div class="fl btn-box"><button class="btn-copy fl" :data-clipboard-text="item.dataUrl">复制</button></div>
						</li>
					</ul>
				</div>
			</div>
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
				blogs:{}
			}
		},
		methods:{
			countWidth(obj){
				return Object.keys(obj).length*9.5 + 'rem';
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
			fetchBlog(){
				const _this = this;
				_this.$http.get(API.baseUrl+'/daikuan/api/app/microblogAppGroup/Kpl').then(res=>{
					const result = res.data;
					_this.blogs = result.data['d'];
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchBlog();
			_this.clipboardInit();
			window.scrollTo(0,0);
		}
	}
</script>
<style scoped>
	.blog{
		padding-bottom: 1.333333rem;
	}
	.blog .appbox-main__item{
		width: 8.633333rem;
	}
	.blog .appbox-main a{
		color:#FE4080;
	}
</style>