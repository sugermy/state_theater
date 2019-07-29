<template>
  <div class="por-detail">
    <img :src="imgUrl">
    <div class="pro-main">
      <h3 class="d-title">话剧舞台演出</h3>
      <p class="d-time">场次信息：2019.08.08 12:00-14:00</p>
      <p class="d-num">剩余：90</p>
      <div class="d-rules">
        <div class="d-rules-i" v-for="(item,index) in rules" :key="index">
          <i class="d-rules-icon"></i>
          <span class="d-rules-t">{{item}}</span>
        </div>
      </div>
      <p class="d-info">
        该剧保留了原歌剧的重要唱段，以清唱剧的形式，展现抒情和刻画心理活动为主体的音乐题材，并采用立体式的全新舞台效果。该剧由歌剧《江姐》第三代扮演者，著名女高音歌唱家、歌剧表演艺术家，北京大学歌剧研究院院长、教授、中国歌剧研究会常务副主席金曼担纲主演，著名指挥家高嵩担任指挥,深圳大剧院合唱团合唱，深圳大剧院爱乐乐团伴奏，为建国70周年献礼。
      </p>
    </div>
    <button class="btn" @click="goOrder">立即预定</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require('../assets/mini_code.jpg'),
      rules: ['电子票', '线下选座', '身份证']
    }
  },
  methods: {
    goOrder() {
      this.$router.push({
        path: '/Order'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.por-detail {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    width: 100%;
  }
  .pro-main {
    padding: 10px 12px;
    .d-title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(56, 77, 86, 1);
    }
    .d-time {
      height: 26px;
      line-height: 26px;
      background: rgba(243, 237, 225, 1);
      border-radius: 2px;
      font-size: 12px;
      text-indent: 8px;
      font-weight: 400;
      margin: 12px 0;
      color: rgba(192, 161, 95, 1);
    }
    .d-num {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(56, 77, 86, 1);
    }
    .d-rules {
      margin: 8px 0 14px 0;
      height: 18px;
      line-height: 18px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .d-rules-i {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 8px;
        .d-rules-icon {
          width: 12px;
          height: 12px;
          background: url('../assets/true_right.png') no-repeat;
        }
        .d-rules-t {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(149, 160, 163, 1);
        }
      }
    }
    .d-info {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(97, 109, 113, 1);
      line-height: 22px;
    }
  }
  .btn {
    border: none;
    height: 45px;
    background: rgba(50, 133, 255, 1);
    font-size: 17px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>


