<template>
	<div class="header-nav">
		<div class="inner clearfix">
			<img class="logo fl">
			<ul class="fr clearfix">
				<li class="fl"><router-link to="/index">首页</router-link></li>
				<li class="fl"><router-link to="/eoslearn">大佬讲EOS</router-link></li>
				<li class="fl"><router-link to="/eosinfo">EOS介绍</router-link></li>
				<li class="fl"><router-link to="/eosnav">EOS导航</router-link></li>
			</ul>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.header-nav{
		position: fixed;
		width: 100%;
		height: 68px;
		top: 0;
		left: 0;
		line-height: 68px;
		border-bottom: 1px solid #E4E4E4;
		/*box-shadow:6px 6px 6px rgba(227,227,227,1);*/
		background-color: #FFFFFF;
		z-index: 999;
		.logo{
			display: block;
			margin-top: 15px;
			width: 90px;
			height: 38px;
			background: red;
		}
		ul{
			li{
				padding: 0 30px;
			}
			a{
				display: inline-block;
				height: 68px;
				line-height: 68px;
				border-bottom: 2px solid #FC4944; 
			}
		}
	}
</style>