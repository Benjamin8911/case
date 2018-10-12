<template>
  <div class="star-box">
    <span
      :class="{
        'one': score < 2,
        'two': score < 3,
        'three': score < 4,
        'four':score <= 4.4,
        'fourfiv': score < 5 && score >= 4.5}"
      class="star">
      <b></b><b></b><b></b><b></b><b></b>
    </span>
    <span class="star__score">{{ score }}分</span>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 5.0
    }
  }
}
</script>
<style lang="less" scoped>

.star {
  margin-right: 10rpx;

  b {
    display: inline-block;
    width: 23rpx;
    height: 23rpx;
    margin-right: 3rpx;
    background: url('../assets/images/star_full.png') no-repeat left top;
    background-size: cover;
  }
}

.star.one {
  b:nth-child(2) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(3) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(4) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(5) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }
}

.star.two {
  b:nth-child(3) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(4) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(5) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }
}

.star.three {
  b:nth-child(4) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }

  b:nth-child(5) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }
}

.star.four {
  b:nth-child(5) {
    background: url('../assets/images/star_empty.png') no-repeat left top;
    background-size: cover;
  }
}

.star.fourfiv {
  b:nth-child(5) {
    background: url('../assets/images/star_half.png') no-repeat left top;
    background-size: cover;
  }
}

.star__score {
  font-size: 12px;
  color: #bcbcbc;
  vertical-align: middle;
}
</style>

