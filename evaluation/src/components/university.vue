<template>
	<div class="university">
			<h4></h4>
			<div class="university__box">
				<div class="university__box--item" v-for="(item,index) in universities" :key="index">
					<img :src="item.logo">
					<p>{{ item.name }}</p>
				</div>
			</div>
		</div>
</template>
<script>
export default{
  props: {
    universities: Array
  }
}
</script>
<style lang="less" scoped>
.university{
  h4{
    margin: 0 auto 40rpx;
    width: 550rpx;
    height: 40rpx;
    background: url("https://img.myoffer.cn/wxxcx/result_title.png") no-repeat left top;
    background-size: contain;
  }
}
.university__box{
  display: flex;
  justify-content: space-around;
  margin-bottom: 80rpx;
}
.university__box--item{
  width: 120rpx;
  background: url("https://img.myoffer.cn/wxxcx/bg_university.png") no-repeat left top;
  background-size: contain;
  img{
    display: block;
    width: 100rpx;
    height: 100rpx;
    margin: 10rpx;
  }
  p{
    padding-top: 20rpx;
    font-size: 24rpx;
    color: #fff;
    text-align: center;
  }
}
</style>
