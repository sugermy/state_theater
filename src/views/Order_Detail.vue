<template>
  <div class="order-info">
    <div class="main-info">
      <div class="main-head">
        <img :src="imgUrl">
        <div class="main-head-info">
          <h3 class="info-title">{{OrderInfo.sCircusShowName}}</h3>
          <p class="info-time">场次信息：{{(OrderInfo.dSceneStartDate?OrderInfo.dSceneStartDate.split('T')[0]+' ' +OrderInfo.sStartTimeSlot+'-'+OrderInfo.sEndTimeSlot:'')}}</p>
          <p class="info-no"> 订单号：{{OrderInfo.sOrderNo}} </p>
          <p class="info-status">订单状态：<span :style="(OrderInfo.nOrderState==1?'color:red':'')">{{(OrderInfo.nOrderState==1?'未使用':'已使用')}}</span></p>
        </div>
        <i class="position-icon position-left"></i>
        <i class="position-icon position-right"></i>
      </div>
      <div class="main-qr">
        <div class="qrcode" ref="qrCodeUrl"></div>
        <p class="qrcode-t">请凭身份证前往自助机取票</p>
        <p class="qrcode-t">座位号：{{OrderInfo.Seat}}</p>
      </div>
    </div>
    <div class="tourist-info">
      <h3 class="tourist-info-head">游客信息</h3>
      <div class="tourist-info-main">
        <p>姓名：{{OrderInfo.sName}}</p>
        <p>手机号：{{OrderInfo.sTel}}</p>
        <p>身份证：{{OrderInfo.sIdCard}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import QRCode from 'qrcodejs2'
export default {
	data() {
		return {
			imgUrl: require('../assets/order.jpg'),
			OrderInfo: {}
		}
	},
	created() {
		this.$route.query.OrderNo ? this.getDetail() : Toast('获取订单详情失败')
	},
	methods: {
		//获取用户生成订单详情
		getDetail() {
			this.$ajax.get('GetOrderDetail', { OrderNo: this.$route.query.OrderNo }).then(res => {
				if (res.Code == '200') {
					this.OrderInfo = res.Data[0] || {}
					this.OrderInfo.sName = this.OrderInfo.sName.slice(0, 1) + '**'

					this.OrderInfo.sTel = this.OrderInfo.sTel.slice(0, 3) + '****' + this.OrderInfo.sTel.slice(7, 11)
					this.OrderInfo.sIdCard = this.OrderInfo.sIdCard.slice(0, 4) + '******' + this.OrderInfo.sIdCard.slice(14, 18)
					this.creatQrCode(this.$route.query.QrCode)
				}
			})
		},
		//创建二维码
		creatQrCode(IDcard) {
			new QRCode(this.$refs.qrCodeUrl, {
				text: IDcard,
				width: 100,
				height: 100,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			})
		}
	}
}
</script>
<style lang="less" scoped>
.order-info {
	width: calc(100% - 20px);
	height: 100%;
	background: rgba(50, 133, 255, 1);
	-webkit-overflow-scrolling: touch;
	overflow: auto;
	padding: 0 10px;
	.main-info {
		width: 100%;
		height: 350px;
		background: #fff;
		border-radius: 10px;
		margin-top: 10px;
		.main-head {
			width: 100%;
			height: 140px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px dashed #3285ff;
			position: relative;
			.position-icon {
				position: absolute;
				width: 14px;
				height: 14px;
				border-radius: 50%;
				background: #3285ff;
			}
			.position-left {
				left: -2%;
				bottom: -5%;
			}
			.position-right {
				right: -2%;
				bottom: -5%;
			}
			img {
				width: 90px;
				height: 90px;
				margin: 0 20px;
			}
			.main-head-info {
				height: 90px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.info-title {
					font-size: 15px;
					font-family: PingFangSC-Medium;
					font-weight: 600;
					color: rgba(56, 77, 86, 1);
					margin-bottom: 8px;
				}
			}
		}
		.main-qr {
			height: calc(100% - 140px);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.qrcode-t {
				margin-top: 16px;
				font-size: 12px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(149, 160, 163, 1);
			}
		}
	}
	.tourist-info {
		height: 136px;
		background: #fff;
		border-radius: 8px;
		margin-top: 16px;
		padding: 0 12px;
		.tourist-info-head {
			height: 48px;
			line-height: 48px;
			border-bottom: 1px solid #ccc;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(149, 160, 163, 1);
		}
		.tourist-info-main {
			height: calc(100% - 68px);
			padding: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(56, 77, 86, 1);
		}
	}
}
</style>

