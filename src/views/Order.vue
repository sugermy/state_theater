<template>
  <div class="order-content">
    <div class="pro-item">
      <img :src="imgUrl" class="">
      <div class="i-info">
        <div>
          <h3 class="info-title">{{CircusInfo.sCircusShowName}}</h3>
          <p class="info-time">时间：{{(CircusInfo.BeginDate?CircusInfo.BeginDate+' - '+CircusInfo.EndDate.split(' ')[1]:'')}}</p>
          <p class="info-explain">
            山和水相依，风与雨洗礼。桑干源头，锦绣春秋，以“朔”字为文化符号的城市根脉在追溯、绵延、传承。可以看见峙峪石镞的智慧光芒，可以听见蒙恬筑城的骏马嘶鸣，可以望见宋辽故垒的刀光剑影，可以遇见崇福古刹的禅意幽静;圪针沟大移民的生命悲壮，驼铃商道的蜿蜒而行，还有班婕妤的伤感诗篇，尉迟恭的忠勇美名。难以忘怀太阳照耀下清河行动的坚韧，更会铭刻塞上绿洲、美丽朔州70年播撒绿荫的艰辛。自古而今，岁月流金，这片土地交织着爱与火的热烈，演绎着情与意的隽永，诠释着幸福与首善的内涵，播种着希望与梦想的光荣。
          </p>
        </div>
        <p class="info-num">剩余：{{CircusInfo.nPersonNumber}}</p>
      </div>
    </div>
    <div class="post-order">
      <h3 class="p-title">请填写游客信息</h3>
      <div class="p-master">
        <p class="p-master-i">
          <label class="p-master-lab">姓名</label>
          <input class="p-master-ipt" type="text" :v-model="toterInfo.toterName"  @click="clickEvent" :value="toterInfo.toterName" @focus="downEvent"
            @input="changeData($event,1)" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">手机号</label>
          <input class="p-master-ipt" type="number" pattern="[0-9]*" :v-model="toterInfo.toterPhone" @click="clickEvent" :value="toterInfo.toterPhone" @focus="downEvent"
            @input="changeData($event,2)" />
        </p>
        <p class="p-master-i">
          <label class="p-master-lab">身份证</label>
          <input class="p-master-ipt" type="text" :v-model="toterInfo.toterNo" @keypress="keyEvent"  @click="clickEvent" :value="toterInfo.toterNo" @focus="downEvent" @input="changeData($event,3)" />
        </p>
      </div>
    </div>
    <div class="order-foot">
      <button class="btn" @click="initOrder">提交订单</button>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      imgUrl: require('../assets/theater_small.png'),
      CircusInfo: {},//初始化信息
      openID: '',
      toterInfo: {
        toterName: '',
        toterPhone: null,
        toterNo: ''
      },//提交实体
      flag: true,
    }
  },
  created () {
    this.openID = localStorage.getItem('openId') || '';
    if (this.$route.query.Circus_ID) {
      this.getProInfo(this.$route.query.Circus_ID)
    }
  },
  mounted () {

  },
  methods: {
    downEvent () {
      window.scrollTo({ top: 150, left: 0, behavior: 'smooth' })
    },
    clickEvent (e) {
      e.target.focus()
    },
    //控制键盘输入事件
    keyEvent(e){
      if(/[^A-Za-z0-9]/g.test(e.key)){
        e.preventDefault()
      }
    },
    //数据变化
    changeData (e, n) {
      switch (n) {
        case 1:
          this.toterInfo.toterName = e.target.value;
          break;
        case 2:
          if (e.target.value.length > 11) {
            e.target.value = e.target.value.slice(0, 11)
          }
          this.toterInfo.toterPhone = e.target.value;
          break;
        case 3:
          if (e.target.value.length > 18) {
            e.target.value = e.target.value.slice(0, 18)
          }
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
    //创建订单
    initOrder () {
      if (this.flag) {
        this.flag = false
        let params = {
          nSceneTimeId: this.CircusInfo.nT_Circus_ID,
          dSceneStartDate: this.CircusInfo.BeginDate.split(' ')[0],
          sStartTimeSlot: this.CircusInfo.BeginDate.split(' ')[1],
          dSceneEndDate: this.CircusInfo.EndDate.split(' ')[0],
          sEndTimeSlot: this.CircusInfo.EndDate.split(' ')[1],
          sIdCard: this.toterInfo.toterNo,
          sName: this.toterInfo.toterName,
          sTel: this.toterInfo.toterPhone,
          OpenID: this.openID
        }
        let PHONE_test = /^[1][3,4,5,7,8][0-9]{9}$/;
        let ID_test = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (this.toterInfo.toterName == '') {
          Toast('请输入游客姓名')
          this.flag = true
          return
        }
        if (this.toterInfo.toterPhone == '') {
          Toast('请输入手机号')
          this.flag = true
          return
        } else if (!PHONE_test.test(this.toterInfo.toterPhone)) {
          Toast('请输入正确手机号')
          this.flag = true
          return
        }
        if (this.toterInfo.toterNo == '') {
          Toast('请输入身份证号')
          this.flag = true
          return
        } else if (!ID_test.test(this.toterInfo.toterNo)) {
          Toast('请输入正确身份证号')
          this.flag = true
          return
        }
        Indicator.open('正在提交...');

        this.$ajax.get('SubmitOrder', { OrderJson: JSON.stringify(params) }).then(res => {
          if (res.Code == '200') {
            this.flag = true
            Indicator.close();
            Toast(res.Message);
            this.$router.push({
              path: '/OrderDetail',
              query: { OrderNo: res.Data.OrderNo, QrCode: res.Data.QrCode }
            })
          } else {
            this.flag = true
            Indicator.close();
            Toast(res.Message)
          }
        }).catch(err => {
          this.flag = true
          Indicator.close();
        })
      }
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


