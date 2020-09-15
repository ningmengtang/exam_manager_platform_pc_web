<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
					<!-- <div class="row-group">
						<div class="th-group">分发状态</div>
						<div class="td-group" change>
							<el-radio-group v-model="disStatus" @change="getQuery">
								<el-radio-button v-for="(item,index) in DisStatusList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div> -->
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
					<!-- <div class="search">
						<el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
						<el-button type="primary" @click="" :style="{ 'background-color': color, 'border-color': color }">搜索</el-button>
					</div> -->
				</div>
				<div class="right">
					<div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i" @click="goImport">提交试卷</div>
							<!-- <div class="card-other-ii">(按模板提交)</div> -->
						</div>
					</div>
					<!-- <div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i o">下载模板</div>
							<div class="card-other-ii">(WORD提交模板)</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>

		<div class="particular">
			<!-- 			<div class="li" v-for="(data,i) in li" :key="data.i">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{ data.synopsis }}</div>
				</div>
				<div class="time">{{ data.time }}</div>
				<div class="label-box">
					<div class="label">{{ data.label }}</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<div class="ii" v-if="data.o == '1'">
						<div style="margin-bottom: 4px;">
							<i class="icon el-icon-check i"></i>
							<span class="text">入库完成</span>
						</div>
						<div @click="goSubmit" style="cursor: pointer;">学生信息已导入，点击重导</div>
					</div>
					<div class="ii" v-else-if="data.o == '2'">
						<div style="margin-bottom: 4px;cursor: pointer;">
							<i class="icon el-icon-check i"></i>
							<span class="text">入库完成</span>
						</div>
						<div class="fault" @click="goSubmit" style="cursor: pointer;">学生信息已导入，点击重导</div>
					</div>
					<span v-else-if="data.o == '3'" style="display: contents;">
						<el-button type="text" class="download" @click="goImport">重新入库</el-button>
						<div class="status">取消入库</div>
					</span>
					<div class="del">
						<i class="el-icon-download"></i>
						<i class="el-icon-delete-solid"></i>
					</div>
				</div>
			</div> -->
			<div class="li" v-for="(data,i) in papers" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.operator_name }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain}}</div>
				</div>
				<div class="title-box" style="margin: 0 20px;">
					<div class="time">创建时间：{{data.createDate}}</div>
					<div class="time">试卷类型：{{data.affix == true?'图片试卷':'在线组卷'}}</div>
				</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text }}</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time"></i>
					<div class="status" >{{data.putInto == '0'?'入库失败':data.putInto == '1'?'入库成功':data.putInto == '2'?'正在入库':''}}</div>
					<!-- <el-button type="text" class="error" v-if="data.putInto == 1" @click="cancelData(data)">取消入库</el-button>
					<el-button type="text" class="warning" v-if="data.putInto == 0" @click="againData(data)">重新入库</el-button> -->
					<el-button type="text" class="download"  v-if="data.putInto == 1" @click="teachDownloadList(data)">立即下载</el-button>
				</div>
				<!-- <div class="right">
					<div class="ii" v-if="data.status == '1'">
						<div style="margin-bottom: 4px;">
							<i class="icon el-icon-check i"></i>
							<span class="text">入库完成</span>
						</div>
						<div @click="goSubmit" style="cursor: pointer;">学生信息已导入，点击重导</div>
					</div>
					<span v-else-if="data.status == '0'" style="display: contents;">
						<el-button type="text" class="download" @click="goImport">重新入库</el-button>
						<div class="status">取消入库</div>
					</span>
					<div class="del">
						<i class="el-icon-download" @click="dialogVisible = true"></i> 
						<i class="el-icon-delete-solid"></i>
					</div>
				</div> -->
			</div>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total"></el-pagination>
			</div>
			</div>
			<el-dialog title="批量下载" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<el-select v-model="classId" placeholder="请选择班级" @change="changeClass" style="margin:10px">
					<el-option
					v-for="item in classList"
				
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
				<div class="student-box" style="max-height: 580px;overflow: auto;">
                    <el-table
                        :data="tableData"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            label="学号"
                            >
							<template slot-scope="scope">
								{{scope.row.student.code}}
							</template>
                        </el-table-column>
                        <el-table-column
                            label="学校"
                            >
							<template slot-scope="scope">
								{{scope.row.student.schoolName}}
							</template>

                        </el-table-column>
						<el-table-column
                            label="姓名"
                            
                            >
							<template slot-scope="scope">
								{{scope.row.student.name}}
							</template>
                        </el-table-column>
                        <el-table-column
                            label="性别"
                            >
							<template slot-scope="scope">
								{{scope.row.student.sex}}
							</template>
                        </el-table-column>
                    </el-table>
					</div>
						<!-- <div class="page">
							<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
							:current-page.sync="currentPage1" :page-size="pageSize1" :total="total1"></el-pagination>
						</div> -->
                    <div style="margin:10px">
                        <el-button type="primary" @click="onSubmit">立即分发</el-button>
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                    </div>
				
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		handleSizeChange,
		handleCurrentChange,
		handleClose,
	} from '@/assets/js/manage.js'
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
		apiCommonExamSelectUpdate
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
				elementTest: 0,
				purpose: 0,
				subject: 0,
				grade: 0,
				version: 0,
				years: 0,
				semester:0,
				obj: [],
				papers: [],
				total: 0,
				userID: localStorage.getItem('userID'),

				classList:[],
				pageNum1:1,
				pageSize1:8,
				currentPage1:1,
				total1:'',
				classId:'',
				testPaperId:'',
				dialogTableVisible:false,
				papaerType:[],
				tableData:[]

			};
		},
		methods: {
			goSubmit() {
				this.$router.push('manage_teacher_submit')
			},
			goImport() {
				this.$router.push('manage_teacher_import')
			},
			handleSizeChange(val) {
				this.pageSize = val
				teacherSelectTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					// console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				teacherSelectTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					// console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
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
				teacherSelectTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {

					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
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
				// return n 
			},
			teachDownloadList(data){
				this.classId = ''
				this.testPaperId = data.id
				if(data.affix){
					apicommonExamGetFile(data.id).then(res=>{
						var headers = res.headers['content-disposition']
						headers = headers.substr(headers.indexOf('filename=\"')+'filename=\"'.length).split("\"")[0];
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
					this.dialogTableVisible =  true
					selectStudentWithPaperAllotByTeacherIdAndPaperId(this.classId,this.testPaperId,this.userID).then(res=>{
						this.tableData = res.data.data
					})
				}
				
			},
		

			// 选择人员
			handleSelectionChange(val){
				this.papaerType = val
				
			},
			changeClass(){
				selectStudentWithPaperAllotByTeacherIdAndPaperId(this.classId,this.testPaperId,this.userID).then(res=>{
					this.tableData = res.data.data
					
				})
			},
			onSubmit(){
				this.dialogTableVisible = false
				let  createTestPaperInfoObj = {
					 	testPaperId:this.testPaperId,
					    students:[]
					}
				console.log(this.papaerType)
				for(var i=0;i<this.papaerType.length;i++){
					createTestPaperInfoObj.students.push({
						"uid":this.papaerType[i].student.id,
						"utype":"student",
						"items":[],
						"info":{
							"idCard":this.papaerType[i].student.idCard,
							"schoolName":this.papaerType[i].student.schoolName,
							"name":this.papaerType[i].student.name,
							"classname":this.papaerType[i].student.classes.name
						}
					})
				}
				// console.log(createTestPaperInfoObj)
				this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
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
			teacherSelectTag({
				"id": this.obj,
				"pageSize": this.pageSize,
				"pageNum": this.pageNum
			}).then(res => {
				// console.log(res)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
			
			schoolSelectTeacher({
				"id":this.userID
			}).then(res=>{
				console.log(res)
				let id = res.data.data.list[0].schoolId
				ApiClassSelectListByOptions({
					"schoolId": id
				}).then(res=>{
					this.classList = res.data.data.list
				})
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
