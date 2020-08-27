<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="alltotal" />
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
								<ICountUp :endVal="loadtotal" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">入库完成</div>
							<div class="card-cc">
								<ICountUp :endVal="successtotal" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_4">
						<div class="card-left">
							<div class="card-c">取消入库</div>
							<div class="card-cc">
								<ICountUp :endVal="errortotal" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_4"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="message-box">
			<div class="message-top" :style="{'border-color':'#2BBB61'}">快速操作</div>
			<el-row :gutter="20" type="flex">
				<el-col :span="5">
					<div class="grid-content bg-purple other" >
						<el-button class="card-other-i o" @click="addPaper">开始组卷</el-button >
						<div class="card-other-ii"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
			<div class="p-li" v-for="(d,i) in ExamList" :key="d.i" :style="d.putInto==1?(0):d.putInto==2?(0):d.putInto==0?style.pLi:(0)">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.createDate}}</div>
					<div class="p-status">{{d.putInto ==0?'取消入库':d.putInto == 1?'入库成功':d.putInto==2?'正在入库':''}}</div>
					<!-- <div class="p-status">{{d.status}}</div> -->
					<!-- <i class="p-status-icon el-icon-time" v-if="d.putInto==1"></i> -->
					<!-- <i class="p-status-icon el-icon-download" v-if="d.putInto==1"></i>
					
					<i class="p-status-icon el-icon-loading" v-if="d.putInto==2"></i> -->
				</div>
			</div>

		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
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
		selectListByOptions,
		apiCommonExamSelectList
	} from '@/api/api.js'

	export default {
		name: 'index_student',
		data() {
			return {
				endVal: 100,
				endVal1: 5000,
				endVal2: 454,
				
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
					pLi5: {
						backgroundImage: 'url(' + require('../../../assets/img/go_bank.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				

				papers: [{
						title: '2019年人教版第一单元测验',
						synopsis: '565656565',
						time: '2020年10月11日',
						status: '未到时间下载',
						o: 1
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '已下载10次',
						o: 2
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '正在确认',
						o: 3
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '下载已结束',
						o: 4
					},
				],
				download: [{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '10',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '10',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '1',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '1',
						o: false
					},
				],
				dialogVisible: false,
				total: 0,
				pageSize: 6,
				pageNum: 1,
				currentPage: 1,
				alltotal:0,
				loadtotal:0,
				successtotal:0,
				errortotal:0,
				ExamList:[]
			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
			//查询专家数据
			apiCommonExamSelectList({
				'operator_id':Number(localStorage.getItem('userID')),
				'operator_type': localStorage.getItem('loginUserType'),
				"pageSize":999,
				"pageNum":1
			}).then(res => {
				let data = res.data.data.list
				this.alltotal = res.data.data.total
				this.loadtotal = 0
				this.successtotal = 0
				this.errortotal = 0
				for(var i=0;i<data.length;i++){
					if(data[i].putInto == 0){
						this.errortotal++
					}else if(data[i].putInto == 1){
						this.successtotal++
					}else if(data[i].putInto == 2){
						this.loadtotal++
					}
				}
			})

			// 统计数据
			apiCommonExamSelectList({
				'operator_id':Number(localStorage.getItem('userID')),
				'operator_type': localStorage.getItem('loginUserType'),
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				this.ExamList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})

		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			addPaper(){
				this.$router.push('manage_user_import')
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageSize = val
				// 统计数据
				apiCommonExamSelectList({
					'operator_id':Number(localStorage.getItem('userID')),
					'operator_type': localStorage.getItem('loginUserType'),
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					this.ExamList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				// 统计数据
				apiCommonExamSelectList({
					'operator_id':Number(localStorage.getItem('userID')),
					'operator_type': localStorage.getItem('loginUserType'),
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					this.ExamList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			// handleSizeChange(val) {
			// 	console.log(`每页 ${val} 条`);
			// },
			// handleCurrentChange(val) {
			// 	console.log(`当前页: ${val}`);
			// },
			submit() {
				this.$router.push('manage_user_import')
			}

		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
<style scoped>
	.message-row {
		width: 100%;
	}
</style>
