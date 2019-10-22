<template>
  <div class="por-detail">
    <div>
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
        <!-- <div>
          <h3 class="d-info-h"><i class="d-info-i"></i>详细信息</h3>
          <p class="d-info-m">
            “寻梦桑源”大型山水实景文艺演出项目是朔城区委、区政府为了满足群众文化需求，发展生态休闲康养和文化旅游产业，构建现代服务产业体系，建设“幸福之城，首善之区”的重要举措。演出以天为幕、湖为台，山水为景，灯光炫彩，美轮美奂。盛夏之夜，传奇再现，金沙植物园，开启寻梦家园、寻梦桑源、寻梦朔州之旅。演出活动从2019年8月正式开始，以后每年从6月-10月演出4个月，每周五、周六晚上进行公演。
          </p>
        </div> -->
        <div>
          <h3 class="d-info-h"><i class="d-info-i"></i>订票方式</h3>
          <div class="d-info-m">
            <p>1、关注朔州市朔城区文化和旅游局微信公众号</p>
            <p>2、微信公众号点击【演出订票】</p>
            <p>3、进入抢票界面，可看到对应的可订票演出时间和剩余数量</p>
            <p>4、点击立即抢票</p>
            <p>5、进入详细信息介绍，马上点击立即预定</p>
            <p>6、填写姓名、手机号、身份证信息 ，即可提交订票，确定订单有余数后提示订票成功</p>
            <p>7、订票成功后，在微信公众号中点击【我的订单】</p>
            <p>8、点击订单详情后显示对应的二维码取票信息</p>
            <p>9、凭身份证到区文化和旅游局（朔城区鄯阳万佳电脑广场南文体大楼）二楼自助机打印门票进入观演会场</p>
          </div>
        </div>
      </div>
    </div>
    <button class="btn" @click="goOrder(CircusInfo.nT_Circus_ID)">立即预定</button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'

export default {
	data() {
		return {
			imgUrl: require('../assets/order.jpg'),
			rules: ['电子票', '线下选座', '身份证'],
			CircusInfo: {}
		}
	},
	created() {
		this.$route.query.Circus_ID ? this.getProInfo(this.$route.query.Circus_ID) : Toast('获取详情失败')
	},
	methods: {
		//获取产品详情
		getProInfo(id) {
			this.$ajax.get('GetProductList', { Circus_ID: id }).then(res => {
				res.Code == '200' ? (this.CircusInfo = res.Data[0] || {}) : Toast('获取详情失败')
			})
		},
		//判断余票数据
		hasNum(v) {
			this.$ajax.get('UpdateOccupancy', { Circus_ID: v }).then(res => {
				if (res.Data == 'true') {
					this.$router.push({
						path: '/Order',
						query: { Circus_ID: v }
					})
				} else {
					Toast('暂无余票')
				}
			})
		},
		//提交预定
		goOrder(Circus_ID) {
			if (Circus_ID) {
				this.$router.push({
					path: '/Order',
					query: { Circus_ID: Circus_ID }
				})
			}
		}
	}
}
</script>
<style lang="less" scoped>
.por-detail {
	width: 100%;
	min-height: 100%;
	-webkit-overflow-scrolling: touch;
	overflow: auto;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
			line-height: 22px;
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
					background-size: 100% 100%;
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
		display: flex;
		flex-direction: column;
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
			// min-height: calc(100% - 80px);
			padding: 0 12px;
			font-size: 12px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(149, 160, 163, 1);
			line-height: 22px;
			overflow: hidden;
		}
	}
	.btn {
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
</style>


