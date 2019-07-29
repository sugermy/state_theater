<template>
  <div class="por-detail">
    <div class="pro-main">
      <img :src="imgUrl">
      <h3 class="d-title">话剧舞台演出</h3>
      <div class="d-rules">
        <div class="d-rules-i" v-for="(item,index) in rules" :key="index">
          <i class="d-rules-icon"></i>
          <span class="d-rules-t">{{item}}</span>
        </div>
      </div>
      <p class="d-num">剩余：90</p>
    </div>
    <div class="date-pick" @click="selectDate">
      <span>请选择场次时间</span>
      <span>{{selectWhich}}<i class="tile-p"></i></span>
    </div>
    <mt-actionsheet :actions="actions" v-model="selectTime">
    </mt-actionsheet>
    <div class="detail-info">
      <h3 class="d-info-h"><i class="d-info-i"></i>详细信息</h3>
      <p class="d-info-m">
        该剧保留了原歌剧的重要唱段，以清唱剧的形式，展现抒情和刻画心理活动为主体的音乐题材，并采用立体式的全新舞台效果。该剧由歌剧《江姐》第三代扮演者，著名女高音歌唱家、歌剧表演艺术家，北京大学歌剧研究院院长、教授、中国歌剧研究会常务副主席金曼担纲主演，著名指挥家高嵩担任指挥,深圳大剧院合唱团合唱，深圳大剧院爱乐乐团伴奏，为建国70周年献礼。
      </p>
      <button class="btn" @click="goOrder">立即预定</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require('../assets/mini_code.jpg'),
      rules: ['电子票', '线下选座', '身份证'],
      selectTime: false,
      selectWhich: '',
      actions: [
        {
          name: '12:00-14:00',
          vale: 1,
          method: this.changeData
        },
        {
          name: '13:00-14:00',
          vale: 2,
          method: this.changeData
        },
        {
          name: '15:00-14:00',
          vale: 3,
          method: this.changeData
        }
      ]
    }
  },
  methods: {
    goOrder() {
      this.$router.push({
        path: '/Order'
      })
    },
    selectDate() {
      this.selectTime = true
    },
    changeData(v) {
      this.selectWhich = v.name
    }
  }
}
</script>
<style lang="less" scoped>
.por-detail {
  width: 100%;
  height: 100%;
  background: rgba(243, 247, 250, 1);
  display: flex;
  flex-direction: column;
  .pro-main {
    background: #fff;
    padding-bottom: 14px;
    img {
      width: 100%;
      height: 250px;
    }
    .d-title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(56, 77, 86, 1);
      margin-top: 16px;
      padding: 0 12px;
    }
    .d-rules {
      padding: 0 12px;
      margin: 8px 0;
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
    .d-num {
      padding: 0 12px;
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #ff4f4f;
    }
  }
  .date-pick {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0 12px;
    margin: 8px 0;
    .tile-p {
      display: inline-block;
    }
  }
  .detail-info {
    background: #fff;
    height: calc(100vh - 413px);
    .d-info-h {
      padding: 0 12px;
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(97, 109, 113, 1);
      margin: 7px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .d-info-i {
        width: 3px;
        height: 11px;
        background: rgba(50, 133, 255, 1);
        margin-right: 4px;
      }
    }
    .d-info-m {
      float: left;
      min-height: calc(100% - 80px);
      padding: 0 12px;
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(149, 160, 163, 1);
      line-height: 22px;
      overflow: hidden;
    }
    .btn {
      float: left;
      border: none;
      width: 100%;
      height: 45px;
      background: rgba(50, 133, 255, 1);
      font-size: 17px;
      margin-top: 8px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>


