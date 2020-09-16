<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="8">
					<router-link :to="{path:'manage_student'}">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="total" />
							</div>
						</div>
						<div class="card-right"></div>
					</div>
					</router-link>
				</el-col>
				<el-col :span="8">
					<router-link :to="{path:'manage_student'}">
					<div class="grid-content bg-purple" :style="style.card_2">
						<div class="card-left">
							<div class="card-c">可以下载</div>
							<div class="card-cc">
								<ICountUp :endVal="download" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
					</router-link>
				</el-col>
				<el-col :span="8">
					<router-link :to="{path:'manage_student'}">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">下载失效</div>
							<div class="card-cc">
								<ICountUp :endVal="disabled" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
					</router-link>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box" v-loading="loading">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" :style="d.status==0?(1):style.pLi" @click="downloadFile(d)" style="cursor: pointer">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<!-- <div class="subject">{{d.subject}}</div> -->
						<div class="grade">{{d.gradeClass}}</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.modifyDate}}</div>
					<div class="p-time">
						开始下载时间：{{d.startTime}}
					</div>
					<div class="p-time">
						结束下载时间：{{d.overTime}}
					</div>
					<div class="p-status" :style="d.status==0?(1):style.pStatus">{{d.status==0 && d.putInto == 1?'可以下载':'不允许下载'}}</div>
					<i  class="p-status-icon el-icon-download" v-if="d.status == 0 && d.putInto == 1">
						
					</i>
					<i  class="p-status-icon   el-icon-close " style="color: rgb(242, 94, 67);"   v-if="d.status == 1 || d.putInto == 0"  >
						
					</i>

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
		studentIndexData,
		
		
	} from '@/assets/js/index.js'
	import {
		studentIndex,
		StudentAccountInfo,
		apicommonExamGetFile,
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
				loading:false,
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
		methods: {
			handleSizeChange,handleCurrentChange,studentIndexData
			,
			downloadFile(item){
				if(item.status == 0){
					if(item.startTime && item.overTime){
					let arr = this.isDuringDate(item.startTime,item.overTime)
					if(arr){
						if(item.affix){
							apicommonExamGetFile(item.id).then(res=>{
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
							StudentAccountInfo({
								"id":localStorage.getItem('userID')
							}).then(res=>{
								if(res.data.data.list){
									let list = res.data.data.list[0]
									let  createTestPaperInfoObj = {
								 		testPaperId:item.id,
								        students:[
								          {
								            uid:localStorage.getItem('userID'),
											utype:"student",
						          			items:[],
											info:{
												"idCard":list.idCard,
												"schoolName":list.schoolName,
												"name":list.name,
												"className":list.classes.name
											}
								          }
								        ],
							      	}
								
									this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
								}else{
									this.$message.warning('查询不到用户信息')
								}
							})	
						}	
					}else{
						this.$message.warning('未到下载时间，不允许下载')
					}
					}else{
						if(item.affix){
							apicommonExamGetFile(item.id).then(res=>{
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
							StudentAccountInfo({
								"id":localStorage.getItem('userID')
							}).then(res=>{
								if(res.data.data.list){
									let list = res.data.data.list[0]
									let  createTestPaperInfoObj = {
								 		testPaperId:item.id,
								        students:[
								          {
								            uid:localStorage.getItem('userID'),
											utype:"student",
						          			items:[],
											info:{
												"idCard":list.idCard,
												"schoolName":list.schoolName,
												"name":list.name,
												"className":list.classes.name
											}
								          }
								        ],
							      	}
									this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
								}else{
									this.$message.warning('查询不到用户信息')
								}
							})	
						}
					}
				}
			},
			isDuringDate(beginDateStr,endDateStr){
				var curDate = new Date()
				var	beginDate = new Date(beginDateStr)
				var endDate = new Date(endDateStr)
				
				if(curDate >= beginDate && curDate <=endDate){
					return true
				}
				return false
			}
		},
		mounted() {
			this.loading = true
			let that =this;
			// 统计数据全部数据
			that.studentIndexData()
			this.loading = false
		},
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
