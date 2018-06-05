<template>
	<div class="foot-info">
		<div class="inner clearfix">
			<div class="foot-left fl">
				<div class="foot-left__partner clearfix">
					<div class="foot-left__left fl">合作伙伴：</div>
					<div class="foot-left__right fl">
						<a href="">非小号</a>
						<a href="">比特时代</a>
						<a href="">比特大陆</a>
						<a href="">viabtc</a>
						<a href="">coinex</a>
						<a href="">EXX</a>
						<a href="">库神</a>
						<a href="">金塔</a>
						<a href="">比特资讯网</a>
						<a href="">比特币之家</a>
						<a href="">比特头条</a>
						<a href="">币源社区</a>
						<a href="">块讯</a>
						<a href="">比特币中文网</a>
						<a href="">金牛财经</a>
						<a href="">未来财经</a>
						<a href="">巴比特</a>
						<a href="">金色财经</a>
					</div>
				</div>
				<div class="foot-left__link clearfix">
					<div class="foot-left__left fl">友情链接：</div>
					<div class="foot-left__right fl">
						<a href="">非小号</a>
						<a href="">比特时代</a>
						<a href="">比特大陆</a>
						<a href="">viabtc</a>
						<a href="">coinex</a>
						<a href="">EXX</a>
						<a href="">库神</a>
						<a href="">金塔</a>
						<a href="">比特资讯网</a>
						<a href="">比特币之家</a>
						<a href="">比特头条</a>
						<a href="">币源社区</a>
						<a href="">块讯</a>
						<a href="">比特币中文网</a>
						<a href="">金牛财经</a>
						<a href="">未来财经</a>
						<a href="">巴比特</a>
						<a href="">金色财经</a>
					</div>
				</div>
				<div class="foot-left__link">
					<p>联系我们：</p>
					<p>电话：0571-86093123&nbsp;&nbsp;&nbsp;商务合作：bq#8btc.com/微信get-bitcoins&nbsp;&nbsp;landy#8btc.com/微信zlan630&nbsp;&nbsp;媒体合作：微信archie2</p>
					<p>捐赠地址：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
				</div>
			</div>
			<div class="foot-right fl">
				<img class="foot-right__logo" src="">
				<div class="foot-right__share">
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
				</div>
				<ul class="foot-right__link">
					<li><router-link to="/map">网站地图</router-link></li>
					<li><a>收藏网址</a></li>
					<li><router-link to="/statement">免责声明</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>
	.foot-info{
		padding: 85px 0;
		background-color: #293248;
	}
	.foot-left{
		width: 840px;
		height: 210px;
		color: #3F6C94;
		a{
			margin-right: 10px;
			color: #3F6C94;
		}
		a:hover{
			color: #FC4944;
		}
	}
	.foot-left__left{
		width: 80px;
		line-height: 20px;
	}
	.foot-left__right{
		width: 720px;
		line-height: 20px;
	}
	.foot-left__partner,.foot-left__link{
		margin-bottom: 38px;
	}
	.foot-right{
		padding-top: 10px;
		width:360px;
		height: 210px;
		border-left: 1px solid #D2D2D2;
	}
	.foot-right__logo{
		display: block;
		margin: 0 auto 48px;
		width: 90px;
		height: 38px;
	}
	.foot-right__share{
		display: flex;
		justify-content: space-around;
		margin-bottom: 40px;
		.item{
			width: 48px;
			height: 48px;
			border-radius: 24px;
			background-color: red;
		}
	}
	.foot-right__link{
		display: flex;
		justify-content: space-around;
	}
</style>