<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">批阅状态</div>
						<div class="td-group">
							<el-radio-group v-model="status" @change="getQuery">
								<el-radio-button v-for="(item,index) in StatusList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">年份</div>
						<div class="td-group">
							<el-radio-group v-model="years" @change="getQuery">
								<el-radio-button v-for="(item,index) in YearsList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">教材版本</div>
						<div class="td-group">
							<el-radio-group v-model="version" @change="getQuery">
								<el-radio-button v-for="(item,index) in VersionList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习科目</div>
						<div class="td-group">
							<el-radio-group v-model="subject" @change="getQuery">
								<el-radio-button v-for="(item,index) in SubjectList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习年级</div>
						<div class="td-group">
							<el-radio-group v-model="grade" @change="getQuery">
								<el-radio-button v-for="(item,index) in GradeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学期</div>
						<div class="td-group">
							<el-radio-group v-model="semester" @change="getQuery">
								<el-radio-button v-for="(item,index) in SemesterList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">单元测试</div>
						<div class="td-group">
							<el-radio-group v-model="elementTest" @change="getQuery">
								<el-radio-button v-for="(item,index) in ElementTextList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">试卷用途</div>
						<div class="td-group">
							<el-radio-group v-model="purpose" @change="getQuery">
								<el-radio-button v-for="(item,index) in PurposeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
				
				</div>
				<div class="right">
					<div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i"  @click="addTask">新建考试任务</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in papers" :key="data.i">
				<div class="teacher-name">{{ data.operator_name }}</div>
				<div class="title-box">
					<div class="title">{{ data.paper_title }}</div>
					<div class="synopsis">{{data.status == 0?'考试准备开始,请做好准备。':data.status == 1?'考试已结束，尽快导入答题卡':data.status == 2?'等待批阅':data.status==3?'考试已结束，请注意审批试卷':data.strus==4?'考试已经批阅完成':data.status == 5?'本次考试取消':'' }}</div>
				</div>
				<div class="title-box" style="margin: 0 20px;">
					<div class="time">开始时间：{{data.start_time}}</div>
					<div class="time">结束时间：{{data.over_time}}</div>
				</div>
				<div class="label-box">
					<div class="label" v-for="i in data.examinationPaper.tag_list">{{i.text }}</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time" v-if="data.status == 0 || data.status == 1 ||data.status ==  2"></i>
					<i class="icon el-icon-circle-check" v-if="data.status == 3 || data.status == 4 "></i>
					<i class="icon el-icon-circle-close" v-if="data.status == 5  "></i>
					<div class="status" >{{data.status == 0?'待分配':data.status == 1?'待导入':data.status == 2?'等待批阅':data.status == 3 ?'正在批阅':data.status==4?'批阅完成':data.status == 5?'批阅取消':'暂无'}}</div>
					<el-button type="text" class="download"  v-if="data.status == 0" @click="importCard(data)">导入答题卡</el-button>
					<el-button type="text" class="download"  v-if="data.status == 0" @click="goradeOver(data)">查看批阅</el-button>
					<el-button type="text" class="download"  v-if="data.status == 0" @click="radeOver(data)">开始批阅</el-button>
				</div>
			</div>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChangeTask"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total"></el-pagination>
			</div>
		</div>

		<!-- 操作1 -->
		<el-dialog title="" :visible.sync="dialogTableVisible"  append-to-body>
			<div class="ts-select">
				<div class="t-title">请选试卷标签</div>
				<div class="t-content">
					<div class="group">
						<div class="row-group">
							<div class="th-group">年份</div>
							<div class="td-group" >
								<el-radio-group v-model="years_task" @change="getQuery_task">
									<el-radio-button v-for="(item,index) in YearsList" :label="item.id">
										{{item.text}}
									</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">教程版本</div>
							<div class="td-group" >
								<el-radio-group v-model="version_task"  @change="getQuery_task" >
									<el-radio-button v-for="(item,index) in VersionList" :label="item.id">
										{{item.text}}
									</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习科目</div>
							<div class="td-group" >
								<el-radio-group v-model="subject_task"   @change="getQuery_task">
									<el-radio-button v-for="(item,index) in SubjectList" :label="item.id">
										{{item.text}}
									</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习年级</div>
							<div class="td-group" >
								<el-radio-group v-model="grade_task"  @change="getQuery_task">
									<el-radio-button v-for="(item,index) in GradeList" :label="item.id">
										{{item.text}}
									</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">试卷用途</div>
							<div class="td-group" >
								<el-radio-group v-model="purpose_task" >
									<el-radio-button v-for="(item,index) in PurposeList" :label="item.id">
										{{item.text}}
									</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					
				</div>
			</div>

			<div class="ts-table">
				<div class="t-title">请选考试试卷</div>
				<div>
				<span>
					已选择:[
					<span style="color:red">
						{{ParperType.title}}
					</span>
					]
					
				</span>
				</div>
				<el-table
					:data="papers_task"
					highlight-current-row
					@current-change="selectTask"
					>
					<el-table-column
						type="index"
						width="50">
					</el-table-column>
					<el-table-column
						property="createDate"
						label="创建日期"
						>
					</el-table-column>
					<el-table-column
						property="operator_name"
						label="出卷人"
						>
					</el-table-column>
					<el-table-column
						property="title"
						label="试卷名称"
						>
					</el-table-column>
					
				</el-table>

				<div class="page">
					<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChangeTask1"
					:current-page.sync="currentPage1" :page-size="pageSize1" :total="total1">
					</el-pagination>
				</div>
			</div>
			<div>
				<el-button type="primary" @click="innerVisible = true">设置审批时间</el-button>
    			<el-button @click="dialogTableVisible = false">取消</el-button>
			</div>
			<el-dialog
      			width="60%"
				title="请选择试卷开始和结束下载时间"
				:visible.sync="innerVisible"
				append-to-body>
				<el-form label-width="120px">
					<el-form-item label="开始下载时间：">
						<el-date-picker
							class="selectTime"
							v-model="startTime"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结束下载时间：">
						<el-date-picker
							class="selectTime"
							v-model="overTime"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false">取 消</el-button>
					<el-button type="primary" @click="onSubmit">确定</el-button>
				</div>
			</el-dialog>
		</el-dialog>
	</div>
</template>
<script>
import user from '../../common/user';
import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		teacherIndex,
		teacherSelectTag,
		teacherDistributeselect,
		selectStudentWithPaperAllotByTeacherIdAndPaperId,
		schoolSelectTeacher,
		ApiClassSelectListByOptions,
		apicommonExamGetFile,
		apiCommonExamSelectUpdate,
		TeacherTaskAdd,
		TeacherTaskList,
		TeacherTaskSelectTask,
		TeacherQuestionExamList
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				array_nav: [], //存储el-chckbox数组
				search: '',
				pageNum: 1,
				pageSize: 4,
				currentPage: 1,
				disStatus: 0,
				paperList: [],
				DisStatusList: [],
				ElementTextList: [],
				PurposeList: [],
				SubjectList: [],
				GradeList: [],
				VersionList: [],
				YearsList: [],
				SemesterList:[],
				dialogVisible: false,
				innerVisible:false,
				ParperType:'',
				years_task:0,
				version_task:0,
				subject_task:0,
				grade_task:0,
				purpose_task:0,
				elementTest: 0,
				purpose: 0,
				subject: 0,
				grade: 0,
				version: 0,
				years: 0,
				semester:0,
				obj:[],
				obj_task: [],
				papers: [],
				total: 0,
				userID: localStorage.getItem('userID'),
				classList:[],
				pageNum1:1,
				pageSize1:6,
				currentPage1:1,
				total1:0,
				classId:'',
				testPaperId:'',
				status:'',
				dialogTableVisible:false,
				papaerType:[],
				tableData:[],
				papers_task:[],
				StatusList:[
					{
						"id":'',
						"text":'全部'
					},
					{
						"id":0,
						"text":'待分配'
					},
					{
						"id":1,
						"text":'待导入'
					},
					{
						"id":2,
						"text":'等待批阅'
					},
					{
						"id":3,
						"text":'正在批阅'
					},
					{
						"id":4,
						"text":'批阅完成'
					},
					{
						"id":5,
						"text":'批阅取消'
					},
				],
				overTime:'',
				startTime:''

			};
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val
				TeacherQuestionExamList({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					if(res.data.data){
						this.papers = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					}else{
						this.papers = []
					}
				})
			},
			handleCurrentChangeTask(val) {
				this.pageNum = val
				TeacherQuestionExamList({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					if(res.data.data){
						
						this.papers = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					}else{
						this.papers = []
					}
				})
			},
			handleSizeChange1(val){
				this.pageSize1 = val
				teacherSelectTag({
					"id": this.obj_task,
					"pageSize": this.pageSize1,
					"pageNum": this.pageNum1
				}).then(res => {
					console.log(res)
					this.papers_task = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			handleCurrentChangeTask1(val){
				this.pageNum1 = val
				teacherSelectTag({
					"id": this.obj_task,
					"pageSize": this.pageSize1,
					"pageNum": this.pageNum1
				}).then(res => {
					console.log(res)
					this.papers_task = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			getQuery() {
				this.obj = []
				if(this.semester != 0 && this.semester){
					this.obj.push(this.semester)
				}
				if (this.elementTest != 0 && this.elementTest) {
					this.obj.push(this.elementTest)
				}
				if (this.purpose != 0 && this.purpose) {
					this.obj.push(this.purpose)
				}
				if (this.subject != 0 && this.subject) {
					this.obj.push(this.subject)
				}
				if (this.grade != 0 && this.grade) {
					this.obj.push(this.grade)
				}
				if (this.version != 0 && this.version) {
					this.obj.push(this.version)
				}
				if (this.years != 0 && this.years) {
					this.obj.push(this.years)
				}
				TeacherQuestionExamList({
					"id": this.obj,
					"status":this.status,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					if(res.data.data){
						this.papers = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					}else{
						this.papers = []
					}
				})
			},
			getQuery_task() {
				this.obj_task = []

			
				if (this.purpose_task != 0 && this.purpose_task) {
					this.obj_task.push(this.purpose_task)
				}
				if (this.subject_task != 0 && this.subject_task) {
					this.obj_task.push(this.subject_task)
				}
				if (this.grade_task != 0 && this.grade_task) {
					this.obj_task.push(this.grade_task)
				}
				if (this.version_task != 0 && this.version_task) {
					this.obj_task.push(this.version_task)
				}
				if (this.years_task != 0 && this.years_task) {
					this.obj_task.push(this.years_task)
				}
				teacherSelectTag({
					"id": this.obj_task,
					"pageSize": this.pageSize1,
					"pageNum": this.pageNum1
				}).then(res => {

					this.papers_task = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			TagTypePromise(tagType, index) {
				return new Promise((resolve, reject) => {
					ApiTagSelectList({
						"pageSize": 999,
						"pageNum": 1,
						"parentId": tagType.id
					}).then(res => {
						let all = [{
							"id": 0,
							"sn": 0,
							"text": '全部'
						}]
						let children = all.concat(res.data.data.list)
						switch (tagType.text) {
							case '学期':
								this.SemesterList = children
								break;
							case '年份':
								this.YearsList = children
								break;
							case '教材版本':
								this.VersionList = children
								break;
							case '学习科目':
								this.SubjectList = children
								break;
							case '学习年级':
								this.GradeList = children
								break;
							case '单元测试':
								this.ElementTextList = children
								break;
							case '试卷用途':
								this.PurposeList = children
								break;
						}
						resolve(res)
					})
				})
			},
			async getTypeList(tagType, index) {
				await this.TagTypePromise(tagType, index)
			},

			// 导入答题卡
			importCard(data){
				sessionStorage.setItem('importPaper', JSON.stringify(data))
				this.$router.push('webcats_teacher_import')
			},
			// 批阅
			goradeOver(data){
				sessionStorage.setItem('importPaper', JSON.stringify(data))
				this.$router.push('webcats_teacher_redeoverlist')
			},

			// 前往批阅
			radeOver(data){
				sessionStorage.setItem('importPaper', JSON.stringify(data))
				this.$router.push('webcats_teacher_redeover')
			},
			// 新建任务
			addTask(){
				this.dialogTableVisible = true
				teacherSelectTag({
					"id": this.obj_task,
					"pageSize": this.pageSize1,
					"pageNum": this.pageNum1
				}).then(res=>{
					console.log(res)
					this.papers_task = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			// 选择试卷
			selectTask(val){
				this.ParperType = val
			},
			// 确定新建
			onSubmit(){
				if(this.ParperType && this.overTime && this.startTime){
					TeacherTaskAdd({
						"paper_id": this.ParperType.id,
						"paper_sn": this.ParperType.sn,
						"paper_title":this.ParperType.title,
						"status":0,
						"start_time":this.startTime,
						"over_time": this.overTime
					}).then(res=>{
						if(res.data.result){
							this.$message.success('操作成功')
							this.dialogTableVisible = false
							this.innerVisible = false
							this.pageNum = 1
							this.pageSize = 4
							this.status = ''
							TeacherQuestionExamList({
								"id": [],
								"status":this.status,
								"pageSize": this.pageSize,
								"pageNum":this.pageNum
							}).then(res => {
							if(res.data.data){
									this.papers = res.data.data.list
									this.total = res.data.data.total
									this.currentPage = res.data.data.pageNum
								}else{
									this.papers = []
								}
							})
						}else{
							this.$message.error(res.data.message)
						}
					})
				}else{
					this.$message.warning('请选择考试试卷')
				}
			}
		},
		mounted() {
			this.color = user().color;
			//标签查询
			this.TagTypeList = []
			ApiTagSelectList({
				"parentId": 0,
				"pageSize": 999,
				"pageNum": 1
			}).then(res => {

				this.TagType = res.data.data.list
				var arr = []
				for (var i = 0; i < this.TagType.length; i++) {
					this.getTypeList(this.TagType[i], i)
				}
			})
			//试卷
			TeacherQuestionExamList({
				"id": this.obj,
				"status":'',
				"pageSize": this.pageSize,
				"pageNum": this.pageNum
			}).then(res => {
				if(res.data.data){
					console.log(res.data.data)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				}else{
					this.papers = []
				}
				
			})
			
			
		}
	};
</script>

<style scoped src="../../../assets/css/manage.css"></style>
<style scoped>
	.group {
		background-image: url(../../../assets/img/bg-willow.png);
		background-position: 100% 0%;
	}

	.right .download {
		background-color: #2bbb61;
	}
	.right .error{
		background-color: #F56C6C;
	}
	.right .warning{
		background-color: #E6A23C;
	}
	.status {
		color: #2bbb61;
	}

	.group /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: rgb(43, 187, 97);
		border-color: rgb(43, 187, 97);
	}
</style>
