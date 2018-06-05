<template>
	<div class="check-password">
	    <h1 class="title" v-text="$t('m.walletPassword')"></h1>
	    <input-light class="password" ref="input" clear :placeholder="$t('m.passwordPlaceholder')" type="password" v-model="walletPassword"></input-light>
	    <button-item class="btn" :title="$t('m.confirm')" :disabled="!walletPassword" v-tap="{methods: confirm}"></button-item>
	</div>
</template>

<script>
	import WEB3 from '../../web3'
	import InputLight from './InputLight.vue'
	import ButtonItem from './ButtonItem.vue'
	export default {
		name: 'CheckWalletPassword',
		data () {
			return {
				walletPassword: ''
			}
		},
		components: {
			InputLight,
			ButtonItem
		},
		computed: {
			walletAddress () {
				return this.$store.state.activeWallet.walletAddress
			}
		},
		methods: {
			confirm () {
				WEB3.unlock_account(this.walletAddress, this.walletPassword, (params) => {
					this.walletPassword = ''
					this.$emit('confirm', !params.isError)
				})
			}
		}
	}
</script>

<style scoped>
.check-password {
	width:9.08rem;
    height:6rem; 
    background: #fff;
    border-radius: .10rem; 
    padding-top: 1.06rem;
}
.title {
	font-size:.54rem;
    color:#555;
    text-align: center;
    margin-bottom: 1rem;
}
.password {
	width: 7.61rem;
}
.btn {
	display: block;
    margin: .46rem auto .3rem;
}
</style>