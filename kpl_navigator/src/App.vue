<template>
  <div id="app">
  	<transition :name="transitionName"><router-view class="router"></router-view></transition>
  </div>
</template>

<script>
import {plusReady} from './lib/plusReady';
export default {
  	name: 'App',
  	data(){
  		return {
  			transitionName:'slide-left'
  		}
  	},
  	watch: {
		'$route' (to, from) {
			let isBack = this.$router.isBack;
			if (isBack) {
			    this.transitionName = 'slide-right'
			} else {
			    this.transitionName = 'slide-left'
			}
			this.$router.isBack = false;
		}
	},
	mounted(){
		const _this = this;
	}
}
</script>

<style scoped lang="less">
	#app {
		height: 100%;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #212121;
	}
	.router{
		height: 100%;
		transition: all 0.3s ease;
		overflow-y: auto;
	}
	.slide-left-enter,.slide-right-leave-active {
		opacity: 0.1;
		transform: translate(100%, 0);
	}
	.slide-left-leave-active,.slide-right-enter {
		opacity: 0.1;
		transform: translate(-100% 0);
	}
</style>
