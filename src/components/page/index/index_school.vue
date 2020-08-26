<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部订单</div>
							<div class="card-cc">
								<ICountUp :endVal="AlltotalOrder" />
							</div>
						</div>
						<div class="card-right"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_2">
						<div class="card-left">
							<div class="card-c">正在确认</div>
							<div class="card-cc">
								<ICountUp :endVal="LoadtotalOrder" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">订单完成</div>
							<div class="card-cc">
								<ICountUp :endVal="SuccesstotalOrder" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_4">
						<div class="card-left">
							<div class="card-c">订单取消</div>
							<div class="card-cc">
								<ICountUp :endVal="ErrortotalOredrL" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_4"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" :style="d.o==1?(0):d.o==2?style.pLi3:d.o==3?style.pLi2:style.pLi4">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject" style="width: auto;">收货人:{{d.contacts}}</div>
					</div>
					<div class="p-title">地址：{{d.contact_address}}</div>
					<div class="p-time">手机：{{d.contact_phone}}</div>
					<div class="p-particular">{{d.create_date}}</div>
					<div class="p-status">{{d.status == 2?'取消订单':d.status == 1?'确认订单':d.status=='3'?'已经全部分发':'待审核订单'}}</div>
					<!-- <i class="p-status-icon el-icon-download"></i> -->
				</div>
			</div>

		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="pageSize" :total="AlltotalOrder">
			</el-pagination>
		</div>
		<!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<div class="ts-box">
				<div class="big-icon  el-icon-success"></div>
				<div class="ii">自行下载试卷完成</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Schart from 'vue-schart'
	import bus from '../../common/bus'
	import ICountUp from 'vue-countup-v2'
	import {
		SchoolIndex,
		apiAdminOrderList
	} from '@/api/api.js'

	export default {
		name: 'index_student',
		data() {
			return {
				endVal: 100,
				pageNum: 1,
				pageSize: 9,
				total: 0,
				style: {
					card_2: 'background-color: #41dde3;',
					card_3: 'background-color: #41e386;',
					card_4: 'background-color: #e35841;',
					cardRight_2: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-4.png') + ')'
					},
					cardRight_3: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-5.png') + ')'
					},
					cardRight_4: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					cardRight_5: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					pLi: {
						backgroundImage: 'url(' + require('../../../assets/img/fail-download.png') + ')'
					},
					pLi2: {
						backgroundImage: 'url(' + require('../../../assets/img/index-loading.png') + ')'
					},
					pLi3: {
						backgroundImage: 'url(' + require('../../../assets/img/already_dowload.png') + ')'
					},
					pLi4: {
						backgroundImage: 'url(' + require('../../../assets/img/succes-dowload.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				currentPage: 1,
				papers: '',
				// papers: [{
				// 		title: '2019年人教版第一单元测验',
				// 		synopsis: '565656565',
				// 		time: '2020年10月11日',
				// 		status: '未到时间下载',
				// 		o: 1
				// 	},
				// 	{
				// 		title: '2019年人教版第一单元测验',
				// 		synopsis: '包含小学一年级语文2019年人教版单元测试',
				// 		time: '2020年10月11日',
				// 		status: '已下载10次',
				// 		o: 2
				// 	},
				// 	{
				// 		title: '2019年人教版第一单元测验',
				// 		synopsis: '包含小学一年级语文2019年人教版单元测试',
				// 		time: '2020年10月11日',
				// 		status: '正在确认',
				// 		o: 3
				// 	},
				// 	{
				// 		title: '2019年人教版第一单元测验',
				// 		synopsis: '包含小学一年级语文2019年人教版单元测试',
				// 		time: '2020年10月11日',
				// 		status: '下载已结束',
				// 		o: 4
				// 	},
				// ],
				dialogVisible: false,
				AlltotalOrder:0,
				LoadtotalOrder:0,
				ErrortotalOredrL:0,
				SuccesstotalOrder:0,
				
			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
			this.getStatisticsOrder()
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			goImport() {
				this.$router.push('manage_teacher_import')
			},
			handleSizeChange(val) {
				this.pageSize = val
				apiAdminOrderList({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"operator_id":localStorage.getItem('userID'),
					"operator_type":localStorage.getItem('loginUserType'),
				}).then(res => {
					this.papers = res.data.data.list
					this.AlltotalOrder= res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				apiAdminOrderList({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize,
					"operator_id":localStorage.getItem('userID'),
					"operator_type":localStorage.getItem('loginUserType'),
				}).then(res => {
					this.papers = res.data.data.list
					this.AlltotalOrder = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			// 统计数据（订购）
			getStatisticsOrder() {
				this.SuccesstotalOrder = 0
				this.LoadtotalOrder = 0
				this.ErrortotalOredr = 0
				this.AlltotalOrder = 0
				// 统计数据（订购）
				apiAdminOrderList({
					"operator_id":localStorage.getItem('userID'),
					"operator_type":localStorage.getItem('loginUserType'),
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					let list = res.data.data.list
					this.papers=list
					this.AlltotalOrder = Number(res.data.data.total)
					for (var k = 0; k < list.length; k++) {
						if (list[k].status == 0) {
							this.LoadtotalOrder++
						} else if (list[k].status == 1 || list[k].status == 3) {
							this.SuccesstotalOrder++
						} else if (list[k].status == 2) {
							this.ErrortotalOredr++
						}

					}
				})
			},

		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
<style scoped>
	.message-row {
		width: 100%;
	}
</style>
