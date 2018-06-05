<template>
	<div id="headsearch">
		<div class="search"><span class="icon"></span><input id="input-search" :class="{dark:ifInput}" type="text" placeholder="以太坊钱包" v-model="searchStr" @keyup.enter="fetchInfo" @focus="infoFlag=true;" @blur="infoFlag=false;"><span class="clear" v-show="clearFlag" @click.self="clearInput"></span></div>
		<div class="search-info" :class="{transition:infoFlag}">
			<div class="search-info__main">
				<h4>大家都在搜</h4>
				<div class="search-label"><button v-for="(item,index) in btnArray" @click="chooseSearch(index)">{{item}}</button></div>
			</div>
		</div>
	</div>
</template>
<script>
	import API from '../../config/api.config.js';
	export default{
		data(){
			return {
				searchStr:'',
				clearFlag:false,
				ifInput:false,
				infoFlag:false,
				btnArray:[]
			}
		},
		watch:{
			searchStr(){
				if(this.searchStr.length>0){
					this.clearFlag = true;
					this.ifInput = true;
					this.infoFlag = true;
				}else{
					this.clearFlag = false;
					this.ifInput = false;
					this.infoFlag = false;
				}
			}
		},
		methods:{
			clearInput(){
				const _this = this;
				_this.searchStr = '';
			},
			chooseSearch(index){
				const _this = this;
				_this.searchStr = _this.btnArray[index];
				document.getElementById('input-search').focus();
			},
			fetchInfo(){
				const _this = this;
				const search = _this.searchStr;
				if(search.length<=0){
					return false;
				}else{
					_this.$router.push({path:'/result/'+search});
					_this.searchStr = '';
				}
			},
			fetchSearch(){
				const _this = this;
				_this.$http.get(API.baseUrl + '/daikuan/api/app/search/people').then(res=>{
					const result = res.data;
					if(result.code==200){
						_this.btnArray = result.data;
					}
				}).catch(err=>console.log(err));
			}
		},
		mounted(){
			const _this = this;
			_this.fetchSearch();
		}
	}
</script>
<style scoped>
	#headsearch{
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		padding: 0.106667rem 0.533333rem;
		height: 1.12rem;
		background-color: #F7F7F7;
		z-index: 1000;
	}
	.search{
		padding-left: 0.533333rem;
		width: 8.933333rem;
		height: 0.933333rem;
		background-color: #FFFFFF;
		border-radius: 8px;
	}
	.search .icon{
		margin-top: 0.213333rem;
		width: 0.533333rem;
		height: 0.533333rem;
		background: url("../../assets/images/search.png") no-repeat left top;
		background-size: 0.533333rem 0.533333rem;
		vertical-align: top;
	}
	.search input{
		padding-left: 0.32rem;
		width: 6.933333rem;
		height: 0.906667rem;
		line-height: 0.906667rem;
		font-size: 0.426667rem;
		color: #C2C2C2;
		border: none;
		vertical-align: top;
	}
	.search input.dark{
		color: #212121;
	}
	.search .clear{
		margin-top: 0.213333rem;
		width: 0.533333rem;
		height: 0.533333rem;
		vertical-align: top;
		background: url("../../assets/images/clear.png") no-repeat center center;
		background-size: 0.373333rem 0.373333rem;
	}
	.search-info{
		position: absolute;
		left: 0;
		top: 1.12rem;
		width: 100%;
		height: 0;
		transition: all 0.4s ease;
		overflow: hidden;
		z-index: 999;
		background-color: #F7F7F7;
	}
	.search-info.transition{
		/*height: 7.2rem;*/
		height: 20rem;
	}
	.search-info__main{
		padding: 0.533333rem 0 0.533333rem 0.533333rem;
	}
	.search-info__main h4{
		margin-bottom: 0.533333rem;
		font-size: 0.4rem;
	}
	.search-label{
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.search-label button{
		padding: 0 0.426667rem;
		margin-right: 0.32rem;
		margin-bottom: 0.426667rem;
		height: 0.746667rem;
		border: none;
		border-radius: 0.373333rem;
		color: #FFFFFF;
		background-color: #C5C9E9;
		vertical-align: top;
	}
</style>