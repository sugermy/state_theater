<template>
  <div class="order-content">
    <div style="height:8px"></div>
    <div class="pro-item">
      <img :src="imgUrl" class="">
      <div class="i-info">
        <div>
          <h3 class="info-title">话剧舞台演出</h3>
          <p class="info-time">时间：2019.08.08 12:00-14:00</p>
        </div>
        <p class="info-num">剩余：90</p>
      </div>
    </div>
    <div class="post-order">
      <h3 class="p-title">请填写游客信息</h3>
      <div class="p-master">
        <p class="p-master-i">
          <label class="p-master-lab">姓名</label>
          <input class="p-master-ipt" type="text" :v-model="toterName" value="饺子" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">手机号</label>
          <input class="p-master-ipt" type="text" :v-model="toterPhone" value="18520838663" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">身份证</label>
          <input class="p-master-ipt" type="text" :v-model="toterNo" value="411381199409054817" />
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
  data() {
    return {
      imgUrl: require('../assets/mini_code.jpg'),
      toterName: '',
      toterPhone: '',
      toterNo: ''
    }
  },
  methods: {
    initOrder() {
      this.$router.push({
        path: '/OrderDetail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order-content {
  width: 100%;
  height: 100%;
  background: rgba(243, 247, 250, 1);
  .pro-item {
    height: 100px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 16px;
    img {
      width: 100px;
      height: 80px;
    }
    .i-info {
      height: 80px;
      margin-left: 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info-title {
        font-size: 15px;
        font-weight: 500;
        color: rgba(56, 77, 86, 1);
      }
      .info-time {
        font-size: 12px;
        margin-top: 10px;
        color: rgba(149, 160, 163, 1);
      }
      .info-num {
        font-size: 12px;
        color: #ff4f4f;
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


