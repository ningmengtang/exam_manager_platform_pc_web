<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="all" />
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
								<ICountUp :endVal="already" />
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
								<ICountUp :endVal="cancel" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple other">
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
		<div class="papers-box" v-loading="loading">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" :style="d.putInto == 0?style.pLi:d.putInto == 1?style.pLi5:style.pLi1" style="cursor: pointer;" @click="d.putInto==1?downloadFile(d):(0)">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<!-- <div class="subject">语文</div> -->
						<div class="grade">{{d.gradeClass}}</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.createDate}}</div>
					<div class="p-particular">{{d.examExplain}}</div>
					<div class="p-status">{{d.putInto == 0?'入库失败':d.putInto == 1?'入库完成':'正在入库'}}</div>
					<el-tooltip class="item" effect="dark" content="预览试卷" placement="top">
					<i @click="downloadFile(d)" class="p-status-icon el-icon-download" v-if="d.putInto == 1">
					</i>
					</el-tooltip>
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
	import {
		ApiTeacherMangerList,
		teacherIndex,
		teacherIndexStatus,
		apicommonExamGetFile
	} from '@/api/api.js'
	export default {
		name: 'index_student',
		data() {
			return {
				endVal: 100,
				endVal1: 5000,
				endVal2: 454,
				total: 0,
				loading:false,
				userID: localStorage.getItem('userID'),
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

				papers: [],
				//状态
				all:0,
				cancel:0,
				already:0,
				dialogVisible: false,
				alltotal: 0,
				disabled: 0,
				download: 0,
				pageNum: 1,
				pageSize: 6,
				currentPage: 1,
			}
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			//改变时
			handleSizeChange(val) {
				this.pageSize = val
				teacherIndex({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
					// 'operator_id': this.userID
				}).then(res => {
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			//条目改变时
			handleCurrentChange(val) {
				this.pageNum = val
				teacherIndex({
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
					// 'operator_id': this.userID
				}).then(res => {
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			//提交试卷
			submit() {

				this.$router.push('manage_teacher_import')
			},
			downloadFile(item){
				if(item.affix){
				apicommonExamGetFile(item.pid).then(res=>{
					// console.log(res)
					var headers = res.headers['content-disposition']
					// console.log(headers)
					headers = headers.substring(headers.indexOf('filename=\"')+'filename=\"'.length).split("\"")[0];
					const blob = new Blob([res.data],{type:''})
					let link = document.createElement('a');
					let objectUrl = URL.createObjectURL(blob);
					link.setAttribute("href",objectUrl);
					link.setAttribute("download",headers); 
					link.click();
					//释放内存
					window.URL.revokeObjectURL(link.href)
				})
				}else{

					let  createTestPaperInfoObj = {
					 		testPaperId:item.pid,
					        students:[
					          {
					            uid:localStorage.getItem('userID'),
								utype:"teacher",
			          			items:[],
								info:{
									"idCard":localStorage.getItem('userID'),
									"schoolName":'教师',
									"name":'教师',
									"className":'教师'
								}
					          }
					        ]
					      }
					this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
				}
				
			}
		},
		mounted() {
		//查询状态
		this.loading = true
		teacherIndexStatus({}).then(res=>{
			
			this.all=res.data.data.all
			this.already=res.data.data.already
			this.cancel=res.data.data.cancel
		})
         //查询试卷
			teacherIndex({
				"pageSize": this.pageSize,
				"pageNum": this.pageNum
				// 'operator_id': this.userID
			}).then(res => {
				console.log(res)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
			this.loading = false
		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
<style scoped>
	.message-row {
		width: 100%;
	}
</style>
