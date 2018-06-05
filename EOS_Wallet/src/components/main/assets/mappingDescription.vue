<template>
	<div class="page">
		<header-item :title="$t('m.eosMappingDescription')"></header-item>
		<hr>
		<div class="content">
			<h4>为什么要做映射？</h4>
			<p>映射就像是搬家。目前我们手上的EOS都是暂是寄居在ETH网络上的，当EOS主网上线后，所有EOS Token都要迁移到EOS网络上。映射就可以看成是预先给自己的eos Token在EOS网络上找好房子，当6月1日主网上线的时候，就可以直接住进去。</p>
			<h4>如果不做映射会怎样</h4>
			<p>不做映射就意味着当EOS主网上线时，手上的EOS Token很可能会变得一文不值。所以建议大家抓紧时间做映射或存入会帮忙做映射的交易所啦。</p>
			<h4>做映射要注意什么？</h4>
			<p>务必通过安全的渠道进行映射，使用各类钱包映射，请确保钱包务必从官方渠道获取，避免被钓鱼。</p>
			<p>在ETH钱包里预存好足够的eth，推荐至少预存0.01eth。</p>
			<p>注意备份好EOS钱包的公钥和私钥，尤其私钥不要透露给别人，不要通过网络传输。</p>
			<p>确保映射已成功。</p>
			<h4>不会做映射，能不能直接放交易所？</h4>
			<p>先明确答案：可以！但需要确保交易所会帮忙做映射。自己进行映射有可能会因为操作失误丢币，建议比较稳妥的一种方式是放在支持映射的交易所，让交易所来帮忙做映射。</p>
			<p>对喜欢将EOS在交易所和钱包来回移动的朋友，建议在确定交易所会帮忙做映射的同时，再自己手动映射一个钱包，做好两手准备，以避免在快照时间前忘记把EOS及时提到交易所，造成资产损失。</p>
			<h4>映射和空投有什么关系？</h4>
			<p>没有关系。映射是将EOS token从以太坊网络上迁移到EOS网络上。空投是项目团队投放一定数量的项目token到你的EOS地址中。</p>
			<p>这里需要说明的是，如果你的EOS放在交易所，可能会等不到糖果。目前只有部分交易所支持eosDAC的空投计划，如：Bigone、OKex、火币、OTCBTC等。获得空投糖果的条件为：</p>
			<p>持有EOS数量大于100；</p>
			<p>在北京时间4月15日早上9点对EOS数量进行快照。</p>
			<p>如果把币放在不支持空投的交易所的用户，将不能得到空投糖果，币安等不支持eosDAC空投，持有EOS且存放在交易平台上的用户，请留意此事，如果交易所没有明确表态，建议提到钱包或是之际空投的交易所。</p>
			<h4>另外EOS持币者，接下来会有不少的DApp进行空投，而交易所未必会支持每一次的空投，如果你不想错过糖果，那就来学习EOS映射吧。最晚什么时候做映射？</h4>
			<p>UTC时间：2018年6月1日 22:59:59</p>
			<p>北京时间：2018年6月2日 6:59:59</p>
			<p>若需要手动映射，请务必在此时间前完成，否则可能造成损失。</p>
			<button-item class="btn" :title="$t('m.startMapping')" :width="'9rem'" :font-size="'.36rem'" v-tap="{methods:checkBalance}"></button-item>
		</div>
		
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import HeaderItem from '../../../commons/components/HeaderItem.vue'
	import ButtonItem from '../../../commons/components/ButtonItem.vue'
	import WEB3 from '../../../web3'
	export default{
		components:{
			HeaderItem,
			ButtonItem
		},
		data(){
			return {
				
			}
		},
		methods:{
			checkBalance(){
				let _this = this;
				let address = _this.$store.state.activeWallet.walletAddress;
				WEB3.get_balance(address,(obj)=>{
					if (WEB3.web3.fromWei(obj.data, 'ether').toNumber() < 0.01) {
						MessageBox({
							title:_this.$t('m.tips'),
							message:_this.$t('m.mappingPrompt')
						});
					}else{
						_this.$router.replace({
							path:'/mapping'
						})
					}
				});
			}
		}
	}
</script>
<style scoped>
	.page{
		height: 100%;
		overflow: auto;
	}
	.content{
		padding: 0.84rem 0.52rem .48rem;
		height: 16rem;
		overflow: scroll;
	}
	.content h4{
		margin-bottom: .6rem;
		font-size: .4rem;
		color: #374452;
	}
	.content p{
		margin-bottom: .5rem;
		font-size: .36rem;
		color: #374452;
		text-indent: 2em;
	}
	.content .btn{
		display: block;
		margin: 0 auto;
		width: 9rem;
		height: 1.5rem;
		color: #FFFFFF;
		background-color: #29DC54;
		border: none;
		border-radius: .75rem;
		outline: none;
	}
</style>