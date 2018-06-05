<template>
	<div class="wechat" v-cloak>
		<div class="appbox" v-for="(wechat,key) in wechats">
			<h3 class="appbox-title">{{wechat.title}}<span class="fr"><router-link :to="'/wechat/'+key">查看全部</router-link></span></h3>
			<div class="appbox-container clearfix">
				<div class="appbox-ulcontainer clearfix" :style="{width:countWidth(wechat.appVos)}">
					<ul class="appbox-main fl" v-for="(items,index) in wechat.appVos" :key="index" v-cloak>
						<li class="appbox-main__item clearfix" v-for="(item,dex) in items" :key="dex">
							<img class="fl" :src="imgBaseUrl+item.dataImage"><div class="info fl"><h4>{{item.dataName.length>5?item.dataName.slice(0,5)+'...':item.dataName}}<b>{{item.dataUrl.length>9?item.dataUrl.slice(0,9)+'...':item.dataUrl}}</b></h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div>
							<div class="fl btn-box"><button class="btn-copy fl" data-clipboard-action="copy" v-bind:data-clipboard-text="item.dataUrl">复制</button><button class="btn-code fl" @click="showCode(item.dataImageTop,item.dataType)">二维码</button></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
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
			return {
				imgBaseUrl:API.imgBaseUrl,
				codeFlag:false,
				wechats:{},
				codeUrl:'',
				downName:''
			}
		},
		methods:{
			countWidth(obj){
				return (Object.keys(obj).length)*11.3 + 'rem';
			},
			showCode(str,type){
				const _this = this;
				if(type==2){
					_this.codeFlag = true;
					document.body.style.overflow = 'hidden';
					_this.makeImg(str);
				}else{
					if(Toast){
						Toast({
						    message: '暂无此订阅号二维码',
						    position: 'middle',
						    duration: 600
						});
					}else{
						alert('暂无此订阅号二维码');
					}	
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
			fetchWechat(){
				const _this = this;
				_this.$http.get(API.baseUrl+'/daikuan/api/app/officialAppGroup/Kpl').then(res=>{
					const result = res.data;
					_this.wechats = result.data['c'];
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			window.scrollTo(0,0);
			_this.fetchWechat();
			_this.clipboardInit();
		}
	}
</script>
<style>
	.wechat{
		padding-bottom: 1.333333rem;
	}
	.wechat .appbox-main__item{
		width: 10.5rem;
	}
	.info b{
        margin-left: 0.32rem;
        color: #FE4080;
    }
</style>