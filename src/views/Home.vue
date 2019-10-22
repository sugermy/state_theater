<template>
  <div class="home-content">
    <header class="header-show">
      <h3>Hi,<span class="login-name" v-text="loginName"></span></h3>
      <div class="head-portrait">
        <img :src="imgSrc">
      </div>
    </header>
    <div class="content-main">
      <!-- <div class="main-header">
        <div class="btn-l">
          <span class="btn-i" v-for="(item,index) in tabCard" :key="index" :class="activeTab==index?'btn-active':''" @click="changeTab(index)">{{item}}</span>
        </div>
        <div class="select-r">
          <label class="label-btn" :v-model="seletID" @click="changePull">{{selectArr[seletID].name}}<i class="open-po" :class="pllMenuOpen?'pull-up':'pull-down'"></i>
            <ul class="pull-menu" v-show="pllMenuOpen">
              <li v-for="(item,index) in selectArr" :key="index" :v-model="item.value" :class="seletID==index?'pull-active':''" @click.stop="changeLabel(index)">
                {{item.name}}</li>
            </ul>
          </label>
        </div>
      </div> -->
      <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="min-heigth:100%;touch-action:pan-y"> -->
      <div class="product-list">
        <div class="pro-item" v-for="(item,index) in prolist" :key="index" @click="toDetail(item.nPersonNumber,item.nT_Circus_ID)">
          <img src="../assets/order.jpg" class="">
          <div class="i-info">
            <h3 class="info-title">{{item.sCircusShowName}}</h3>
            <p class="info-time">时间：{{(item.BeginDate?item.BeginDate+' - '+item.EndDate.split(' ')[1]:'')}}</p>
            <!-- <p class="info-explain">
              “寻梦桑源”大型山水实景文艺演出项目是朔城区委、区政府为了满足群众文化需求，发展生态休闲康养和文化旅游产业，构建现代服务产业体系，建设“幸福之城，首善之区”的重要举措。演出以天为幕、湖为台，山水为景，灯光炫彩，美轮美奂。盛夏之夜，传奇再现，金沙植物园，开启寻梦家园、寻梦桑源、寻梦朔州之旅。演出活动从2019年8月正式开始，以后每年从6月-10月演出4个月，每周五、周六晚上进行公演。
            </p> -->
            <p class="info-less">剩余：{{item.nPersonNumber}}</p>
            <span class="ready-go" @click.stop="toDetail(item.nPersonNumber,item.nT_Circus_ID)">立即抢票</span>
          </div>
        </div>
      </div>
      <!-- </mt-loadmore> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
	data() {
		return {
			loginName: '',
			tabCard: ['最近', '最热'],
			activeTab: 0,
			pllMenuOpen: false, //下拉菜单显示隐藏
			seletID: 0,
			openID: '',
			imgSrc: '',
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
			prolist: [], //产品列表
			allLoaded: false
		}
	},
	created() {
		this.getProList() //
		this.imgSrc = localStorage.getItem('headimgurl') || require('../assets/logo.jpg')
		this.loginName = localStorage.getItem('nickname') || '您好！'
		this.openID = localStorage.getItem('openId')
	},
	mounted() {
		this.seletID = this.selectArr[0].index
	},
	methods: {
		//获取产品列表
		getProList() {
			this.$ajax.get('GetProductList', { Circus_ID: '' }).then(res => {
				res.Code == '200' ? (this.prolist = res.Data || []) : Toast('当前时间段暂无场次信息')
			})
		},
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
		//下拉刷新数据
		loadTop() {
			this.getProList()
			this.$refs.loadmore.onTopLoaded()
		},
		//上拉加载分页--暂无
		loadBottom() {
			// 加载更多数据
			this.allLoaded = true // 若数据已全部获取完毕
			this.$refs.loadmore.onBottomLoaded()
		},
		//跳转详情查看购买页面
		toDetail(num, Circus_ID) {
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
	min-height: 100%;
	-webkit-overflow-scrolling: touch;
	overflow: auto;
	background: rgb(243, 247, 250);
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
			img {
				width: 100%;
				height: 100%;
				border: 0;
				border: none;
			}
		}
	}
	.content-main {
		background: rgb(243, 247, 250);
		padding: 0 12px;
		min-height: 100%;
		box-sizing: border-box;

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
			min-height: calc(100vh - 16px);
			// height: 100%;
			.pro-item {
				height: 140px;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;
				display: flex;
				align-items: center;
				margin-bottom: 8px;
				padding: 10px;
				margin-top: 8px;
				img {
					width: 120px;
					height: 120px;
				}
				.i-info {
					position: relative;
					width: calc(100% - 128px);
					height: 120px;
					margin-left: 4%;
					display: flex;
					flex-direction: column;
					.info-title {
						font-size: 15px;
						font-weight: 600;
						color: rgba(56, 77, 86, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.info-time {
						margin: 7px 0;
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
						bottom: -12%;
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

