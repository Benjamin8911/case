<template>
  <div class="rank">
    <ul class="rank-tabs">
      <li class="rank-tabs__item item-left" :class="{active: rank === 'personal'}" @click="showPersonalRank">{{showAll ? '个人榜': '今日个人榜'}}</li>
      <li class="rank-tabs__item item-right" :class="{active: rank === 'school'}" @click="showSchoolRank">{{showAll ? '院校榜': '今日院校榜'}}</li>
    </ul>
    <div class="rank-container" :class="{'move': rank === 'school', 'more': hasMore && showMore}">
      <div class="rank-container--list personal-list" :class="{more: showMore}">
        <!-- 前三名 -->
        <div
          class="personal-list__item"
          :class="{
            dis: item.rank >= 4,
            first: item.rank === 1,
            second: item.rank === 2,
            third: item.rank === 3
          }"
          v-for="(item, index) in sponsorsRank"
          :key="index"
        >
          <img class="personal-list__item-icon" :src="item.avatarUrls">
          <div class="personal-list__item-nickname">{{item.nickName}}</div>
          <div class="personal-list__item-count">{{item.helperCount}}人</div>
        </div>
        <!-- 个人排名 -->
        <div
          v-if="selfInRank.helperCount !== 0"
          class="personal-list__item self"
          :class="{
            up: selfInRank.trend === '+',
            down: selfInRank.trend === '-'
          }"
        >
          <div class="personal-list__item--rank">
            <span class="personal-list__item--rank-num self">{{selfInRank.rank}}</span>
          </div>
          <div class="personal-list__item--info">
            <span class="personal-list__item--info-name"><img class="personal-list__item--info-icon" :src="selfInRank.avatarUrls">{{selfInRank.nickName}}</span>
            <span class="personal-list__item--info-count">{{selfInRank.helperCount}}人</span>
          </div>
        </div>
        <!-- 总排名 -->
        <div
          class="personal-list__item"
          :class="{
            up: item.trend === '+',
            down: item.trend === '-',
            dis: item.rank < 4 || item.rank > 6 && !showAll
          }"
          v-for="(item, index) in sponsorsRank"
          :key="index"
        >
          <div class="personal-list__item--rank">
            <span class="personal-list__item--rank-num">{{item.rank}}</span>
          </div>
          <div class="personal-list__item--info">
            <span class="personal-list__item--info-name"><img class="personal-list__item--info-icon" :src="item.avatarUrls">{{item.nickName}}</span>
            <span class="personal-list__item--info-count">{{item.helperCount}}人</span>
          </div>
        </div>
        <div v-show="showMore" class="personal-list__more">{{hasMore ? '上拉查看更多（截止前50）' : '已经到底了'}}</div>
        <span v-show="showDetail" class="personal-list--btn" @click="jumpToRank">查看总榜</span>
      </div>
      <div class="rank-container--list school-list" :class="{more: showMore}">
        <div class="school-list__item self" v-if="selfSchoolRank.rank !== 0">
          <div class="school-list__item--rank">
            <span class="school-list__item--rank-num">{{selfSchoolRank.rank}}</span>
          </div>
          <div class="school-list__item--info">
            <span class="school-list__item--info-name">{{selfSchoolRank.value}}</span>
            <span class="school-list__item--info-count">{{selfSchoolRank.helperCount}}人</span>
          </div>
        </div>
        <div
          class="school-list__item"
          :class="{
            up: item.trend === '+',
            down: item.trend === '-',
            first: item.rank === 1,
            second: item.rank === 2,
            third: item.rank === 3,
            dis: item.rank > 5 && !showAll
          }"
          v-for="item in schoolRank"
          :key="item.rank"
        >
          <div class="school-list__item--rank">
            <span class="school-list__item--rank-num">{{item.rank}}</span>
          </div>
          <div class="school-list__item--info">
            <span class="school-list__item--info-name">{{item.value}}</span>
            <span class="school-list__item--info-count">{{item.helperCount}}人</span>
          </div>
        </div>
        <div v-show="showMore" class="school-list__more">{{hasMore ? '上拉查看更多（截止前50）' : '已经到底了'}}</div>
        <span v-show="showDetail" class="school-list--btn" @click="jumpToRank">查看总榜</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showDetail: Boolean,
      showMore: Boolean,
      showAll: Boolean
    },
    computed: {
      isBegin () {
        return this.$store.state.isBegin
      },
      ifGetSchool () {
        return this.$store.state.ifGetSchool
      },
      rank () {
        return this.$store.state.rank
      },
      sponsorsRank () {
        return this.$store.state.sponsorsRank
      },
      selfInRank () {
        return this.$store.state.selfInRank
      },
      schoolRank () {
        return this.$store.state.allSchoolRank
      },
      selfSchoolRank () {
        return this.$store.state.selfSchoolRank
      }
    },
    data () {
      return {
        hasMore: true
      }
    },
    methods: {
      loadMore () {
        if (this.rank === 'personal') {
          this.$store.dispatch('fetchRankPersonal', {start: 0, end: 49, rankType: 'total'})
        } else {
          this.$store.dispatch('fetchRankSchool', {start: 0, end: 49, rankType: 'total'})
        }
        this.hasMore = false
      },
      showPersonalRank () {
        this.hasMore = true
        this.$store.dispatch('setRank', 'personal')
        if (this.showAll) {
          this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: 'total'})
        } else {
          this.$store.dispatch('fetchRankPersonal', {start: 0, end: 5, rankType: ''})
        }
      },
      showSchoolRank () {
        this.hasMore = true
        this.$store.dispatch('setRank', 'school')
        if (this.showAll) {
          this.$store.dispatch('fetchRankSchool', {start: 0, end: 5, rankType: 'total'})
        } else {
          this.$store.dispatch('fetchRankSchool', {start: 0, end: 5, rankType: ''})
        }
      },
      jumpToRank (s) {
        if (!this.isBegin) {
          wx.showToast({
            title: '活动暂未开始',
            icon: 'none'
          })
          return false
        }
        wx.navigateTo({
          url: '/pages/rank/main'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
.rank {
  width: 335px;
  margin: 0 auto 36px;
  border-radius: 0 0 4px 4px;
  overflow: hidden;

  .rank-tabs {
    display: flex;
    align-items: flex-end;
  }

  .rank-tabs__item {
    width: 50%;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    color: #666;
    text-align: center;
    background-color: #f4f4f4;
  }

  .rank-tabs__item.item-left {
    border-radius: 6px 0 0 0;
  }

  .rank-tabs__item.item-right {
    border-radius: 0 6px 0 0;
  }

  .rank-tabs__item.active {
    height: 38px;
    font-size: 15px;
    font-weight: bold;
    line-height: 38px;
    color: #333;
    background-color: #fff;
    border-radius: 6px 6px 0 0;
  }

  .rank-container {
    display: flex;
    transition: all 0.2s linear;
  }

  .rank-container.more {
    height: 461px;
  }

  .rank-container.move {
    transform: translateX(-100%);
  }

  .rank-container--list {
    flex-shrink: 0;
    flex-basis: 100%;
    background-color: #fff;
  }

  .personal-list {
    position: relative;
    padding-top: 186px;

    .personal-list--btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 48px;
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      color: #808080;
    }

    .personal-list__item.first {
      display: block;
      position: absolute;
      top: 26px;
      left: 139px;
    }

    .personal-list__item.first::before {
      position: absolute;
      top: -8px;
      left: 44px;
      content: '';
      width: 24px;
      height: 24px;
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-first.png") no-repeat left top;
      background-size: cover;
    }

    .personal-list__item.first::after {
      position: absolute;
      top: 42px;
      left: -1px;
      content: 'TOP1';
      width: 64px;
      height: 22px;
      padding-top: 10px;
      font-size: 12px;
      line-height: 18px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-top.png") no-repeat left top;
      background-size: 100% 100%;
    }

    .personal-list__item.second {
      display: block;
      position: absolute;
      top: 51px;
      left: 35px;
    }

    .personal-list__item.second::after {
      position: absolute;
      top: 42px;
      left: -1px;
      content: 'TOP2';
      width: 64px;
      height: 22px;
      padding-top: 10px;
      font-size: 12px;
      line-height: 18px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-top.png") no-repeat left top;
      background-size: 100% 100%;
    }

    .personal-list__item.third {
      display: block;
      position: absolute;
      top: 51px;
      right: 35px;
    }

    .personal-list__item.third::after {
      position: absolute;
      top: 42px;
      left: -1px;
      content: 'TOP3';
      width: 64px;
      height: 22px;
      padding-top: 10px;
      font-size: 12px;
      font-weight: bold;
      line-height: 18px;
      text-align: center;
      color: #fff;
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-top.png") no-repeat left top;
      background-size: 100% 100%;
    }

    .personal-list__item {
      display: flex;
      height: 60px;
      line-height: 60px;
    }

    .personal-list__more {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      color: #808080;
      text-align: center;
      background-color: #e7e7e7;
    }
  }

  .personal-list.more {
    padding-bottom: 35px;
  }

  .personal-list__item {
    .personal-list__item--rank {
      width: 58px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .personal-list__item--rank-num {
      display: inline-block;
      height: 24px;
      padding: 0 5px;
      font-size: 12px;
      font-weight: bold;
      line-height: 24px;
      color: #fff;
      text-align: center;
      background-color: #05cbf9;
      border-radius: 2px;
    }

    .personal-list__item--rank-num.self {
      background-color: #f2237b;
    }

    .personal-list__item--info {
      flex-grow: 1;
      font-size: 12px;
      color: #333;
      border-bottom: 1px dotted #e1e1e1;
    }

    .personal-list__item--info-name {
      display: inline-block;
      width: 200px;
      height: 60px;
    }

    .personal-list__item--info-count {
      display: inline-block;
      height: 60px;
    }

    .personal-list__item--info-icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-right: 19px;
      vertical-align: middle;
      border-radius: 50%;
      border: 2px solid #05cbf9;
    }
  }

  .personal-list__item.self {
    background-color: #eff2f5;

    .school-list__item--info-name {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .personal-list__item.up {
    background: url("https://img.myoffer.cn/wxxcx/20190101/rank-up.png") no-repeat right 16px center;
    background-size: 14px 18px;
  }

  .personal-list__item.down {
    background: url("https://img.myoffer.cn/wxxcx/20190101/rank-down.png") no-repeat right 16px center;
    background-size: 14px 18px;
  }

  .personal-list__item.dis {
    display: none;
  }

  .personal-list__item-icon {
    display: block;
    width: 60px;
    height: 60px;
    margin-bottom: 24px;
    border-radius: 50%;
  }

  .personal-list__item-nickname {
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 12px;
    color: #333;
    text-align: center;
  }

  .personal-list__item-count {
    font-size: 12px;
    line-height: 12px;
    font-weight: bold;
    color: #05cbf9;
    text-align: center;
  }

  .school-list {
    position: relative;
    padding-top: 66px;

    .school-list--btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 48px;
      height: 12px;
      font-size: 12px;
      line-height: 12px;
      color: #808080;
    }

    .school-list__more {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      color: #808080;
      text-align: center;
      background-color: #e7e7e7;
    }
  }

  .school-list.more {
    padding-bottom: 35px;
  }

  .school-list__item {
    display: flex;
    height: 60px;
    line-height: 60px;

    .school-list__item--rank {
      width: 79px;
      height: 60px;
      text-align: center;
    }

    .school-list__item--rank-num {
      display: inline-block;
      width: 18px;
      height: 24px;
      font-size: 12px;
      font-weight: bold;
      line-height: 24px;
      color: #fff;
      text-align: center;
      background-color: #05cbf9;
      border-radius: 2px;
    }

    .school-list__item--info {
      flex-grow: 1;
      font-size: 12px;
      color: #333;
      border-bottom: 1px dotted #e1e1e1;
    }

    .school-list__item--info-name {
      display: inline-block;
      width: 172px;
      padding-left: 12px;
    }
  }

  .school-list__item.dis {
    display: none;
  }

  .school-list__item.self {
    background-color: #eff2f5;

    .school-list__item--rank-num {
      background-color: #f2237b;
    }

    .school-list__item--info-name {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .school-list__item.up {
    background: url("https://img.myoffer.cn/wxxcx/20190101/rank-up.png") no-repeat right 16px center;
    background-size: 14px 18px;
  }

  .school-list__item.down {
    background: url("https://img.myoffer.cn/wxxcx/20190101/rank-down.png") no-repeat right 16px center;
    background-size: 14px 18px;
  }

  .school-list__item.first {
    .school-list__item--rank {
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-1.png") no-repeat center center;
      background-size: 23px 37px;
    }

    .school-list__item--rank-num {
      display: none;
    }
  }

  .school-list__item.second {
    .school-list__item--rank {
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-2.png") no-repeat center center;
      background-size: 30px 38px;
    }

    .school-list__item--rank-num {
      display: none;
    }
  }

  .school-list__item.third {
    .school-list__item--rank {
      background: url("https://img.myoffer.cn/wxxcx/20190101/rank-3.png") no-repeat center center;
      background-size: 32px 35px;
    }

    .school-list__item--rank-num {
      display: none;
    }
  }
}
</style>
