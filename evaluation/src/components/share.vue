<template>
	<div class="share">
		<button class="share-btn" open-type="contact">一对一咨询服务</button><button class="share-btn" @click="$emit('share')">分享给其他的小伙伴</button>
	</div>
</template>
<script>
export default{
  data () {
    return {
      id: '',
      timestamp: '',
      once: '',
      sign: ''
    }
  }
}
</script>
<style lang="less" scoped>
	.share{
		display: flex;
		justify-content: space-around;
	}
	.share-btn{
		width: 304rpx;
    height: 90rpx;
    margin: 0;
		line-height: 90rpx;
    text-align: center;
    font-size: 28rpx;
		color: #fff;
		background: url("https://img.myoffer.cn/wxxcx/bg_btn.png") no-repeat left top;
    background-size: 100% 100%;
    border: none;
	}
</style>
