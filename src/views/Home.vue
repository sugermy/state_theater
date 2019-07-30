<template>
  <div class="home-content">
    <header class="header-show">
      <h3>Hi,<span class="login-name">{{loginName}}</span></h3>
      <div class="head-portrait">
        <img :src="userImg">
      </div>
    </header>
    <div class="content-main">
      <div class="main-header">
        <!-- <div class="btn-l">
          <span class="btn-i" v-for="(item,index) in tabCard" :key="index" :class="activeTab==index?'btn-active':''" @click="changeTab(index)">{{item}}</span>
        </div>
        <div class="select-r">
          <label class="label-btn" :v-model="seletID" @click="changePull">{{selectArr[seletID].name}}<i class="open-po" :class="pllMenuOpen?'pull-up':'pull-down'"></i>
            <ul class="pull-menu" v-show="pllMenuOpen">
              <li v-for="(item,index) in selectArr" :key="index" :v-model="item.value" :class="seletID==index?'pull-active':''" @click.stop="changeLabel(index)">
                {{item.name}}</li>
            </ul>
          </label>
        </div> -->
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style=" touch-action:pan-y">
        <div class="product-list">
          <div class="pro-item" v-for="(item,index) in prolist" :key="index">
            <img src="../assets/theater_small.png" class="">
            <div class="i-info">
              <h3 class="info-title">{{item.sCircusShowName}}</h3>
              <p class="info-time">时间：{{(item.BeginDate?item.BeginDate+' - '+item.EndDate.split(' ')[1]:'')}}</p>
              <p class="info-explain">{{item.sCircusShowDesc}}</p>
              <p class="info-less">剩余：{{item.nPersonNumber}}</p>
              <span class="ready-go" @click="toDetail(item.nPersonNumber,item.nT_Circus_ID)">立即抢票</span>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
      loginName: '小笼包',
      tabCard: ['最近', '最热'],
      activeTab: 0,
      pllMenuOpen: false, //下拉菜单显示隐藏
      seletID: 0,
      userImg: '',
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
      prolist: [],//产品列表
      allLoaded: false
    }
  },
  created () {
    if (this.$store.state.wxUser && this.$store.state.wxUser != {}) {
      this.userImg = this.$store.state.wxUser.headImg
      this.loginName = this.$store.state.wxUser.nickname
    } else {
      this.$ajax.get('getwxuser', {}).then(res => {
        this.$store.dispatch('setUser', res.Data)
      })
    }
    this.getProList()
  },
  mounted () {
    this.seletID = this.selectArr[0].index
  },
  methods: {
    //获取产品列表
    getProList () {
      this.$ajax.get('GetProductList', { Circus_ID: '' }).then(res => {
        console.log(res)
        this.prolist = res.Data || []
      })
    },
    getNum (id) {

    },
    //切换tab 热门 最新
    changeTab (i) {
      this.activeTab = i
    },
    //控制下拉菜单
    changePull () {
      this.pllMenuOpen = !this.pllMenuOpen
    },
    //切换li当前选择
    changeLabel (i) {
      this.seletID = i
      this.pllMenuOpen = false
    },
    loadTop () {
      // 加载更多数据
      this.getProList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      this.allLoaded = true // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    },

    //跳转详情查看购买页面
    toDetail (num, Circus_ID) {
      if (num == 0) {
        Toast('暂无余票')
      } else {
        this.$router.push({
          path: '/Detail',
          query: { Circus_ID: Circus_ID }
        })
      }

    }
  }
}
</script>
<style lang="less" scoped>
.home-content {
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
      img {
        width: 100%;
        height: 100%;
      }
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
            z-index: 10;
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
        height: 140px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        padding: 10px;
        img {
          width: 120px;
          height: 120px;
        }
        .i-info {
          position: relative;
          width: calc(100% - 120px);
          height: 120px;
          margin-left: 4%;
          display: flex;
          flex-direction: column;
          .info-title {
            font-size: 15px;
            font-weight: 600;
            color: rgba(56, 77, 86, 1);
          }
          .info-time {
            margin: 10px 0;
            line-height: 16px;
            color: rgba(149, 160, 163, 1);
          }
          .info-explain {
            font-size: 12px;
            line-height: 18px;
            min-height: 32px;
            color: rgba(149, 160, 163, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .info-less {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(56, 77, 86, 1);
            margin-top: 14px;
          }
          .ready-go {
            position: absolute;
            right: 0%;
            bottom: -14%;
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
}
</style>

