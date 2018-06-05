<template>
	<section class="eos-nav">
		<Banner></Banner>
		<div class="inner">
			<h2 class="card-title"><span>钱包</span></h2>
			<div class="card-box">
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
			</div>
			<h2 class="card-title"><span>交易所</span></h2>
			<div class="card-box">
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
				<div class="card-box__nav">eos token</div>
				<div class="card-box__nav">mytoken</div>
				<div class="card-box__nav">okextoken</div>
				<div class="card-box__nav">火币钱包</div>
			</div>
		</div>
	</section>
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
<style lang="less" scoped></style>