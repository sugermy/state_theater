<template>
  <div class="order-content">
    <div class="pro-item">
      <img :src="imgUrl" class="">
      <div class="i-info">
        <div>
          <h3 class="info-title">{{CircusInfo.sCircusShowName}}</h3>
          <p class="info-time">时间：{{(CircusInfo.BeginDate?CircusInfo.BeginDate+' - '+CircusInfo.EndDate.split(' ')[1]:'')}}</p>
          <p class="info-explain">{{CircusInfo.sCircusShowDesc}}</p>
        </div>
        <p class="info-num">剩余：{{CircusInfo.nPersonNumber}}</p>
      </div>
    </div>
    <div class="post-order">
      <h3 class="p-title">请填写游客信息</h3>
      <div class="p-master">
        <p class="p-master-i">
          <label class="p-master-lab">姓名</label>
          <input class="p-master-ipt" type="text" :v-model="toterInfo.toterName" :value="toterInfo.toterName" @input="changeData($event,1)" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">手机号</label>
          <input class="p-master-ipt" type="text" :v-model="toterInfo.toterPhone" :value="toterInfo.toterPhone" @input="changeData($event,2)" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">身份证</label>
          <input class="p-master-ipt" type="text" :v-model="toterInfo.toterNo" :value="toterInfo.toterNo" @input="changeData($event,3)" />
        </p>
      </div>
    </div>
    <div class="order-foot">
      <button class="btn" @click="initOrder">提交订单</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: require('../assets/theater_small.png'),
      CircusInfo: {},//初始化信息
      toterPhone: '18520838663',

      toterInfo: {
        toterName: '张满意',
        toterPhone: '18520838663',
        toterNo: '411381199409054817'
      }//提交实体
    }
  },
  created () {
    if (this.$route.query.Circus_ID) {
      this.getProInfo(this.$route.query.Circus_ID)
    }
  },
  methods: {
    //数据变化
    changeData (e, n) {
      switch (n) {
        case 1:
          this.toterInfo.toterName = e.target.value;
          break;
        case 2:
          this.toterInfo.toterPhone = e.target.value;
          break;
        case 3:
          this.toterInfo.toterNo = e.target.value;
          break;
        default:
          break;
      }
    },
    //获取产品详情
    getProInfo (id) {
      this.$ajax.get('GetProductList', { Circus_ID: id }).then(res => {
        this.CircusInfo = res.Data[0] || {}
      })
    },
    initOrder () {
      console.log(this.toterInfo)
      // this.$router.push({
      //   path: '/OrderDetail'
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.order-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(243, 247, 250, 1);
  .pro-item {
    height: 140px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px 22px;
    margin-bottom: 16px;
    margin-top: 8px;
    img {
      width: 120px;
      height: 120px;
    }
    .i-info {
      height: 120px;
      margin-left: 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info-title {
        font-size: 15px;
        font-weight: 600;
        color: rgba(56, 77, 86, 1);
      }
      .info-time {
        font-size: 12px;
        margin-top: 10px;
        color: rgba(149, 160, 163, 1);
      }
      .info-explain {
        font-size: 12px;
        line-height: 18px;
        margin-top: 10px;
        color: rgba(149, 160, 163, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .info-num {
        font-size: 12px;
        color: rgba(56, 77, 86, 1);
      }
    }
  }
  .post-order {
    .p-title {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      margin-left: 12px;
      color: rgba(149, 160, 163, 1);
    }
    .p-master {
      background: #fff;
      margin-top: 16px;
      .p-master-i {
        height: 66px;
        line-height: 66px;
        padding: 0 22px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        position: relative;
        .p-master-lab {
          position: absolute;
        }
        .p-master-ipt {
          width: 100%;
          text-align: right;
        }
      }
    }
  }
  .order-foot {
    margin-top: 20%;
    text-align: center;
    .btn {
      width: 80%;
      border: none;
      height: 45px;
      background: rgba(50, 133, 255, 1);
      border-radius: 23px;
      font-size: 17px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>


