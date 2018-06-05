<template>
	<div class="search-result">
		<h2 class="search-title"><b class="back" @click="goback"></b>搜索</h2>
		<!-- <HeadSearch></HeadSearch> -->
		<div class="result-box">
			<div class="result-app" v-for="(app,index) in apps">
				<h2>{{app[0].mainName}}</h2>
				<ul class="list">
					<li class="list-item clearfix" v-for="(item,index) in app" :key="index">
						<img class="fl" :src="item.dataImage.indexOf('http')>-1?item.dataImage:imgBaseUrl+item.dataImage">
						<div class="info fl"><h4>{{item.dataName}}</h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div>
						<div class="btn-download fr" @click="download(item.dataUrl,item.mainFriendsid,item.dataFriendsid)">下载</div>
					</li>
				</ul>
			</div>
			<div class="result-wechat" v-for="(wechat,index) in wechats">
				<h2>{{wechat[0].mainName}}</h2>
				<ul class="list">
		            <li class="list-item clearfix" v-for="(item,index) in wechat" :key="index">
		                <div class="icon fl"><img :src="imgBaseUrl+item.dataImage"></div>
		                <div class="info fl"><h4>{{item.dataName.length>6?item.dataName.slice(0,6)+'...':item.dataName}}<b>{{item.dataUrl.length>10?item.dataUrl.slice(0,10)+'...':item.dataUrl}}</b></h4><p>{{item.dataDetail.length>12?item.dataDetail.slice(0,12)+'...':item.dataDetail}}</p></div>
		                <div class="btn-box fr"><button class="btn-copy" style="marginBottom:0.186667rem" :data-clipboard-text="item.dataUrl">复制</button><button class="btn-code" @click="showCode(item.dataImageTop,item.dataType)">二维码</button></div>
		            </li>
		        </ul>
			</div>
			<div class="result-blog" v-for="(blog,index) in blogs">
				<h2>{{blog[0].mainName}}</h2>
				<ul class="list">
		            <li class="list-item clearfix" v-for="(item,index) in blog" :key="index">
		                <div class="icon fl"><img :src="imgBaseUrl+item.dataImageTop"></div>
		                <div class="info fl"><h4>{{item.dataName}}</h4><p><a :href="item.dataUrl">{{item.dataUrl.length>20?item.dataUrl.slice(0,20)+'...':item.dataUrl}}</a></p></div>
		                <div class="btn-box fr"><button :data-clipboard-text="item.dataUrl" class="btn-copy">复制</button></div>
		            </li>
		        </ul>
			</div>
		</div>
		<div id="mask" @click.self="hideMask" v-show="codeFlag">
			<img id="image" :src="codeUrl"><a id="image-download" :href="codeUrl" :download="downName"></a>
			<p>点击图片下载</p>
		</div>
	</div>
</template>
<script>
	import {plusReady} from '../../lib/plusReady';
	import API from '../../config/api.config.js';
	import { MessageBox } from 'mint-ui';
	import { stringify } from 'qs';
	import { Toast } from 'mint-ui';
    import Clipboard from 'clipboard';
	import HeadSearch from '../../components/HeadSearch/HeadSearch';
	export default{
		components:{
			HeadSearch
		},
		data(){
			return {
				imgBaseUrl:API.imgBaseUrl,
				codeFlag:false,
				codeUrl:'',
				downName:'',
				tradeApp:[],
				walletApp:[],
				wechatC:[],
				wechatP:[],
				blogC:[],
				blogP:[],
				apps:[],
				wechats:[],
				blogs:[]
			}
		},
		watch:{
			'$route'(to,from){
				this.fetchInfo();
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
			makeImg(str){
                const _this = this;
                _this.codeUrl = 'http://www.lian2345.com/images/qukuailian_app/'+str;
            },
			fetchInfo(){
				const _this = this;
				let str = _this.$route.params.name;
				_this.$http.post(API.baseUrl+'/daikuan/api/app/search',stringify({
					name:_this.$route.params.name
				})).then(res=>{
					let result = res.data;
					if(result.code==200){
						/*_this.tradeApp = result.data.hasOwnProperty('2')?result.data['2']:[];
						_this.walletApp = result.data.hasOwnProperty('3')?result.data['3']:[];
						_this.wechatC = result.data.hasOwnProperty('4')?result.data['4']:[];
						_this.wechatP = result.data.hasOwnProperty('5')?result.data['5']:[];
						_this.blogC = result.data.hasOwnProperty('6')?result.data['6']:[];
						_this.blogP = result.data.hasOwnProperty('7')?result.data['7']:[];*/
						_this.apps = result.data.hasOwnProperty('b')?result.data['b']:[];
						_this.wechats = result.data.hasOwnProperty('c')?result.data['c']:[];
						_this.blogs = result.data.hasOwnProperty('d')?result.data['d']:[];
					}
					if(Object.keys(result.data)==0){
						setTimeout(function(){
							MessageBox('提示', '暂无搜索内容');
						},500);
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchInfo();
		}
	}
</script>
<style scoped>
	.mint-msgbox{
		-ms-transform: translate3d(-50%, -50%, 0);
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
	}
	.search-title{
		position: fixed;
		width: 100%;
		height: 1.066667rem;
		line-height: 1.066667rem;
		font-size: 0.533333rem;
        text-align: center;
        background-color: #F7F7F7;
        z-index: 999;
	}
	.search-result .back{
        position: absolute;
        left: 0.266667rem;
        top: 0;
        width: 1.066667rem;
        height: 1.066667rem;
        background: url("../../assets/images/back.png") no-repeat left center;
        background-size: 0.24rem 0.453333rem;
    }
	.result-box{
		margin-top: 1.066667rem;
		padding-top: 0.533333rem;
	}
	.result-box h2{
		padding: 0 0.533333rem;
		font-size: 0.4rem;
	}
	.result-wechat button{
		display: block;
	}
	.result-wechat .list-item{
        padding: 0.4rem 0;
        height: 2.48rem;
    }
    .result-wechat .info b{
    	color: #FE4080;
    }
    .result-wechat .info h4{
    	padding-top: 0.333333rem;
    }
    .result-blog .icon{
    	padding-top: 0;
    }
    .result-blog .btn-box{
    	padding-top: 0.32rem;
    }
    .result-blog .btn-box button{
    	vertical-align: top;
    }
    .list-item a{
    	color:#FE4080;
    }
</style>