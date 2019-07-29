<template>
  <div class="home-content">
    <header class="header-show">
      <h3>Hi,<span class="login-name">{{loginName}}</span></h3>
      <div class="head-portrait"></div>
    </header>
    <div class="content-main">
      <div class="main-header">
        <div class="btn-l">
          <span class="btn-i" v-for="(item,index) in tabCard" :key="index" :class="activeTab==index?'btn-active':''"
            @click="changeTab(index)">{{item}}</span>
        </div>
        <div class="select-r">
          <label class="label-btn" :v-model="seletID" @click="changePull">{{selectArr[seletID].name}}<i class="open-po"
              :class="pllMenuOpen?'pull-up':'pull-down'"></i>
            <ul class="pull-menu" v-show="pllMenuOpen">
              <li v-for="(item,index) in selectArr" :key="index" :v-model="item.value"
                :class="seletID==index?'pull-active':''" @click.stop="changeLabel(index)">
                {{item.name}}</li>
            </ul>
          </label>
        </div>
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
        style=" touch-action:pan-y">
        <div class="product-list">
          <div class="pro-item" v-for="(item,index) in prolist" :key="index">
            <img :src="item.imgUrl" class="">
            <div class="i-info">
              <h3 class="info-title">{{item.name}}</h3>
              <p class="info-explain">{{item.explain}}</p>
              <span class="ready-go" @click="toDetail(item)">立即预定</span>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="back-home" @click="goList"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginName: '小笼包',
      tabCard: ['最近', '最热'],
      activeTab: 0,
      pllMenuOpen: false, //下拉菜单显示隐藏
      seletID: 0,
      selectArr: [
        {
          name: '全部时间',
          index: 0,
          value: 1
        },
        {
          name: '每周时间',
          index: 1,
          value: 2
        },
        {
          name: '每月时间',
          index: 2,
          value: 3
        }
      ],
      prolist: [
        {
          imgUrl: require('../assets/mini_code.jpg'),
          name: '话剧舞台演出',
          time: '时间：2019.08.08 12:00-14:00',
          explain: '该剧保留了原歌剧的重要唱段，以清唱剧的形式...'
        },
        {
          imgUrl: require('../assets/mini_code.jpg'),
          name: '话剧舞台演出',
          time: '时间：2019.08.08 12:00-14:00',
          explain: '该剧保留了原歌剧的重要唱段，以清唱剧的形式...'
        },
        {
          imgUrl: require('../assets/mini_code.jpg'),
          name: '话剧舞台演出',
          time: '时间：2019.08.08 12:00-14:00',
          explain: '该剧保留了原歌剧的重要唱段，以清唱剧的形式...'
        },
        {
          imgUrl: require('../assets/mini_code.jpg'),
          name: '话剧舞台演出',
          time: '时间：2019.08.08 12:00-14:00',
          explain: '该剧保留了原歌剧的重要唱段，以清唱剧的形式...'
        }
      ],
      allLoaded: false
    }
  },
  created() {},
  mounted() {
    this.seletID = this.selectArr[0].index
  },
  methods: {
    //切换tab 热门 最新
    changeTab(i) {
      this.activeTab = i
    },
    //控制下拉菜单
    changePull() {
      this.pllMenuOpen = !this.pllMenuOpen
    },
    //切换li当前选择
    changeLabel(i) {
      this.seletID = i
      this.pllMenuOpen = false
    },
    loadTop() {
      // 加载更多数据
      this.prolist = this.prolist
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom() {
      // 加载更多数据
      this.allLoaded = true // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    },
    //查看列表
    goList() {
      this.$router.push({
        path: '/OrderList'
      })
    },
    //跳转详情查看购买页面
    toDetail(item) {
      this.$router.push({
        path: '/Detail',
        query: { id: item.value }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home-content {
  position: relative;
  .header-show {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3285ff;
    font-size: 22px;
    padding: 0 12px;
    .login-name {
      color: #384d56;
    }
    .head-portrait {
      width: 40px;
      height: 40px;
      background: red;
    }
  }
  .content-main {
    height: calc(100vh - 60px);
    background: rgb(243, 247, 250);
    padding: 0 12px;
    .main-header {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn-l {
        color: #384d56;
        .btn-i {
          display: inline-block;
          width: 48px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          margin: 0 4px;
          background: rgba(228, 233, 235, 1);
          border-radius: 13px;
        }
        .btn-active {
          background: rgba(82, 152, 255, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
      .select-r {
        .label-btn {
          color: #384d56;
          width: 103px;
          height: 26px;
          line-height: 26px;
          background: rgba(228, 233, 235, 1);
          border-radius: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .open-po {
            display: inline-block;
            width: 8px;
            height: 5px;
            margin-left: 5px;
            background: url('../assets/pull_down.png') no-repeat;
          }
          .pull-menu {
            position: absolute;
            top: 120%;
            width: 100%;
            background: #fff;
            border-radius: 4px;
            text-align: center;
            .pull-active {
              background: #5298ff;
              color: #fff;
            }
          }
        }
      }
    }
    .product-list {
      height: calc(100% - 60px);
      .pro-item {
        height: 100px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        padding: 10px;
        img {
          width: 120px;
          height: 80px;
        }
        .i-info {
          position: relative;
          height: 80px;
          margin-left: 4%;
          display: flex;
          flex-direction: column;
          .info-title {
            font-size: 15px;
            font-weight: 500;
            color: rgba(56, 77, 86, 1);
          }
          .info-explain {
            font-size: 12px;
            margin-top: 5px;
            color: rgba(149, 160, 163, 1);
          }
          .ready-go {
            position: absolute;
            right: 0%;
            bottom: 0%;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 18px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(50, 133, 255, 1);
            border: 1px solid rgba(50, 133, 255, 1);
          }
        }
      }
    }
  }
  .back-home {
    position: fixed;
    bottom: 4%;
    right: 0%;
    width: 85px;
    height: 85px;
    background: url('../assets/go_list.png') no-repeat;
  }
}
</style>

