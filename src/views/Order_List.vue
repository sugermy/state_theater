<template>
  <div class="order-content">
    <div class="header-top">
      <div class="header-tabs">
        <div class="bar" :class="activeTab==index?'bar-active':''" v-for="(item,index) in tabBar" :key="index"
          @click="changeTab(index)">{{item}}
        </div>
      </div>
    </div>

    <div class="lists">
      <div class="item" v-for="item in 4" :key="item.key">
        <div class="item-img-div">
          <img :src="test.imgUrl" class="item-img" />
        </div>
        <div class="item-content">
          <div class="item-div">
            <div class="item-name">{{test.name}}</div>
            <div class="item-type">{{test.type}}</div>
          </div>
          <div class="item-time-div">
            <span class="item-time-span">场次信息:</span>
            <span class="item-time">{{test.time}}</span>
          </div>
          <div class="item-num-div">
            <span class="item-num-span">订单号:</span>
            <span class="item-num">{{test.id}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '1123',
      activeTab: 0,
      tabBar: ['全部', '已使用', '未使用'],
      test: {
        imgUrl: require('../assets/mini_code.jpg'),
        name: '话剧舞台演出',
        type: '已使用',
        time: '2019.08.08 12:00-14:00',
        id: '676736736736767'
      }
    }
  },
  methods: {
    changeTab(i) {
      this.activeTab = i
    }
  }
}
</script>

<style lang="less" scoped>
.order-content {
  position: relative;
  height: 100%;
  background: #f3f7fa;
  .header-top {
    background: #fff;
    .header {
      height: 40px;
      font-size: 17px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(56, 77, 86, 1);
      line-height: 40px;
      text-align: center;
    }
    .header-tabs {
      height: 40px;
      text-align: center;
      display: flex;
      justify-content: center;
      .bar {
        display: inline-block;
        padding: 6px 0;
        margin: 0 23px;
        align-items: center;
        display: flex;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(149, 160, 163, 1);
      }
      .bar-active {
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        border-bottom: 2px solid #3285ff;
        color: rgba(50, 133, 255, 1);
      }
    }
  }
  .lists {
    padding: 0 12px;
    background: #f3f7fa;
    overflow: hidden;
    .item {
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin: 8px 0;
      width: 100%;
      display: flex;
      padding: 10px;
      box-sizing: border-box;
    }
    .item-img-div {
      display: flex;
      align-items: center;
      .item-img {
        width: 120px;
        height: 80px;
      }
    }
    .item-content {
      padding-left: 8px;
      box-sizing: border-box;
      width: 100%;
      .item-div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .item-name {
          font-size: 15px;
          font-family: PingFangSC-Medium;
          font-weight: 600;
          color: rgba(56, 77, 86, 1);
        }
        .item-type {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(209, 209, 209, 1);
        }
      }
      .item-time-div {
        display: flex;
        font-size: 12px;
        margin-bottom: 20px;
      }
      .item-num-div {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(149, 160, 163, 1);
      }
    }
  }
}
</style>
