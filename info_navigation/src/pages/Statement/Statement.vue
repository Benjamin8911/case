<template>
	<div class="statement inner">
		<h2 class="title"><span>免责声明</span></h2>
		<div class="statement-content">
			<h1>免责声明</h1>
			<p>本网站所收集的部分公开资料来源于互联网，转载的目的在于传递更多信息及用于网络分享，并不代表本站赞同其观点和对其真实性负责，也不构成任何其他建议。如果您发现网站上有侵犯您的知识产权的作品，请与我们取得联系，我们会及时修改或删除。</p>
			<p>本网站所提供的信息，只供参考之用。本网站不保证信息的准确性、有效性、及时性和完整性。在法律允许的范围内，本网站在此声明，不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿。</p>
		</div>
	</div>
</template>
<script>
	export default {
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
	.statement-content{
		padding: 48px;
		height: 350px;
		background-color: #FFFFFF;
		h1{
			margin-bottom: 40px;
			text-align: center;
			font-size: 24px;
		}
		p{
			margin-bottom: 40px;
			font-size: 16px;
			text-indent: 2em;
		}
	}
</style>
