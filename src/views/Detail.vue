<template>
  <div class="por-detail">
    <div class="pro-main">
      <img :src="imgUrl">
      <h3 class="d-title">{{CircusInfo.sCircusShowName}}</h3>
      <div class="d-time">场次信息：{{(CircusInfo.BeginDate?CircusInfo.BeginDate+' - '+CircusInfo.EndDate.split(' ')[1]:'')}}</div>
      <p class="d-num">剩余：{{CircusInfo.nPersonNumber}}</p>
      <div class="d-rules">
        <div class="d-rules-i" v-for="(item,index) in rules" :key="index">
          <i class="d-rules-icon"></i>
          <span class="d-rules-t">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="detail-info">
      <h3 class="d-info-h"><i class="d-info-i"></i>详细信息</h3>
      <p class="d-info-m">{{CircusInfo.sCircusShowDesc}}</p>
      <button class="btn" @click="goOrder(CircusInfo.nT_Circus_ID)">立即预定</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: require('../assets/theater_big.png'),
      rules: ['电子票', '线下选座', '身份证'],
      CircusInfo: {}
    }
  },
  created () {
    if (this.$route.query.Circus_ID) {
      this.getProInfo(this.$route.query.Circus_ID)
    }
  },
  methods: {
    //获取产品详情
    getProInfo (id) {
      this.$ajax.get('GetProductList', { Circus_ID: id }).then(res => {
        this.CircusInfo = res.Data[0] || {}
      })
    },
    goOrder (Circus_ID) {
      if (Circus_ID) {
        this.$router.push({
          path: '/Order',
          query: { Circus_ID: Circus_ID }
        })
      }
    },
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
    padding-bottom: 6px;
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
    .d-time {
      height: 26px;
      line-height: 26px;
      background: rgba(243, 237, 225, 1);
      border-radius: 2px;
      margin: 8px 12px;
      text-indent: 6px;
      color: rgba(192, 161, 95, 1);
      font-size: 13px;
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
    height: calc(100vh - 381px);
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


