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
							<div class="card-c">已入库</div>
							<div class="card-cc">
								<ICountUp :endVal="download" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">取消入库</div>
							<div class="card-cc">
								<ICountUp :endVal="disabled" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple other" >
						<el-button class="card-other-i" @click="submit">提交试卷</el-button>
						<!-- <div class="card-other-ii">(按模板提交)</div> -->
					</div>
				</el-col>
				<!-- <el-col :span="5">
					<div class="grid-content bg-purple other" >
							<el-button class="card-other-i o">下载模板</el-button>
							<div class="card-other-ii">(WORD提交模板)</div>
					</div>
				</el-col> -->
			</el-row>
		</div>
		<div class="papers-box">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">{{d.gradeClass}}</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.modifyDate}}</div>
					<div class="p-status">{{d.status == 0?'取消入库':d.status == 1?'已入库':''}}</div>
					<!-- <i class="p-status-icon el-icon-download"></i> -->
					<i class="p-status-icon el-icon-download"></i>
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

		<!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
			<div class="ts-box">
				<div class="big-icon  el-icon-success"></div>
				<div class="ii">自行下载试卷完成</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	import Schart from 'vue-schart'
	import bus from '../../common/bus'
	import ICountUp from 'vue-countup-v2'
	import {ApiTeacherMangerList,teacherIndex} from '@/api/api.js'
	export default {
		name: 'index_student',
		data() {
			return {
				endVal: 100,
				endVal1: 5000,
				endVal2: 454,
				total:0,
				userID:localStorage.getItem('userID'),
				style: {
					card_2: 'background-color: #41dde3;',
					card_3: 'background-color: #e35841;',
					cardRight_2: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-2.png') + ')'
					},
					cardRight_3: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					cardRight_4: {
						backgroundImage: 'none'
					},
					pLi: {
						backgroundImage: 'url(' + require('../../../assets/img/fail-download.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				

				papers: [
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
				alltotal:0,
				disabled:0,
				download:0,
				pageNum:1,
				pageSize:3,
				currentPage: 1,

			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
			teacherIndex({
				"pageSize":999,
				"pageNum":1,
				'operator_id':this.userID
			}).then(res=>{
				this.alltotal = 0
				this.disabled = 0
				this.download = 0
				// console.log(res)
				let data  = res.data.data.list
				for(var i=0;i<data.length;i++){
					if(data[i].status == 0){
						this.disabled++
					}else if(data[i].status == 1){
						this.download++
					}
				}

				this.alltotal  =  res.data.data.total
				// this.disabled = res.data.data.disabled
				// this.download = res.data.data.download
			})

			teacherIndex({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum,
				'operator_id':this.userID
			}).then(res=>{
				console.log(res.data.data.list)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			 //改变时
			handleSizeChange(val) {
				this.pageSize = val
				
				teacherIndex({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize,
					'operator_id':this.userID
				}).then(res=>{
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			//条目改变时
			handleCurrentChange(val) {
				this.pageNum = val
				teacherIndex({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize,
					'operator_id':this.userID
				}).then(res=>{
					this.papers = res.data.data.list
					this.total= res.data.data.total
					this.currentPage= res.data.data.pageNum
				})
			},
			//提交试卷
			submit(){
				
				this.$router.push('manage_teacher_import')
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
