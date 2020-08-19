<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="total" />
							</div>
						</div>
						<div class="card-right"></div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple" :style="style.card_2">
						<div class="card-left">
							<div class="card-c">可以下载</div>
							<div class="card-cc">
								<ICountUp :endVal="download" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">下载失效</div>
							<div class="card-cc">
								<ICountUp :endVal="disabled" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" :style="d.status==1?(0):style.pLi">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">{{d.subject}}</div>
						<div class="grade">{{d.gradeClass}}</div>
					</div>
					<div class="p-title">{{d.elementTest}}</div>
					<div class="p-time">{{d.modifyDate}}</div>
					<div class="p-status" :style="d.status==1?(0):style.pStatus">{{d.status==1?'可以下载':'下载失败'}}</div>
					<i class="p-status-icon" :class="d.status==1?'el-icon-download':'el-icon-close'"></i>

				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Schart from 'vue-schart'
	import bus from '../../common/bus'
	import ICountUp from 'vue-countup-v2'
	import {
		handleSizeChange,
		handleCurrentChange,
		studentIndexData
	} from '@/assets/js/index.js'
	import {
		studentIndex
	} from '@/api/api.js'
	export default {
		name: 'index_student',
		data() {
			this.colors = ['#67C23A', '#409EFF', '#F56C6C']
			return {
				total: 0,
				pageSize: 9,
				pageNum: 1,
				currentPage: 1,
				download: 0,
				disabled: 0,
				status: '',
				style: {
					card_2: 'background-color: #41dde3;',
					card_3: 'background-color: #e35841;',
					cardRight_2: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-2.png') + ')'
					},
					cardRight_3: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					pLi: {
						backgroundImage: 'url(' + require('../../../assets/img/fail-download.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				papers: {},
				dialogVisible: false,
			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
			let that =this;
			// 统计数据全部数据
			console.log(that.studentIndexData())
			// studentIndex({
			// 	"pageNum": this.pageNum,
			// 	"pageSize": this.pageSize
			// }).then(res => {
			// 	console.log(res)
			// 	this.papers = res.data.data.list
			// 	this.total = res.data.data.total
			// 	this.currentPage = res.data.data.pageNum
			// 	this.download = res.data.data.download
			// 	this.disabled = res.data.data.disabled
			// })
		},
		methods: {
			handleSizeChange,handleCurrentChange,studentIndexData
		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
// 修改element 自带样式
<style>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}
</style>
