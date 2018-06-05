<template>
	<div>
		<HeaderNav></HeaderNav>
		<div class="content">
			<router-view></router-view>
		</div>
		<FootInfo></FootInfo>
	</div>
</template>
<script>
	import HeaderNav from '../../components/HeaderNav/HeaderNav'
	import FootInfo from '../../components/FootInfo/FootInfo'
	export default{
		components:{
			HeaderNav,
			FootInfo
		}
	}
</script>
<style lang="less" scoped></style>