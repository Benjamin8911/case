<template>
	<div class="eos-learn">
		<Banner></Banner>
		<section class="eos-learn__content inner">
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<article class="article-item clearfix" @click="$router.push({path:'/article'})">
				<img class="article-item__img fl" src="">
				<div class="fl">
					<h2>EOS 你还敢不敢再屌一些</h2>
					<p>本次活动升级维护后。我们增加了个更好玩的环节，每次用户在答题结束后在查看战绩中可以了解到自己的荣誉称号喔。</p>
					<div><span></span><b>12分钟前</b></div>
				</div>
			</article>
			<div class="btn-more"><b>+ </b> 显示更多的资讯</div>
		</section>
	</div>
</template>
<script>
	import Banner from '../../components/Banner/Banner'
	export default {
		components:{
			Banner
		},
		data(){
			return {

			}
		},
		mounted(){
			const _this = this;
			window.scrollTo(0,0);
		}
	}
</script>
<style lang="less" scoped>
	.eos-learn__content{
		padding-top: 24px;
	}
</style>