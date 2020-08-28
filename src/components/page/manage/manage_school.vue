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
					<div class="search">
						<!-- <el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
						<el-button type="primary" @click="" class="buttom" :style="{ 'background-color': color, 'border-color': color }">搜索</el-button> -->
						<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd"><span class="el-icon-plus"></span> 新增订购单</el-button>
					</div>
				</div>
				
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in papers" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain}}</div>
				</div>
				<div class="time">{{ data.time }}</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text}}</div>
				</div>
				<div class="right">
					<div class="ii" v-if="data.status ==  0">
						<div style="margin-bottom: 4px;" >
							<i class="icon el-icon-check i"></i>
							<span class="text">可以下载</span>
						</div>
					</div>
					<div class="ii" v-else-if="data.status == 1">
						<div style="margin-bottom: 4px;" >
							<i class="el-icon-close"></i>
							<span class="text">不可以下载</span>
						</div>
					</div>
					<div class="del">
						<!-- <i class="el-icon-download" @click="dialogVisible = true"></i>
						<i class="el-icon-delete-solid" ></i> -->
						<i class="el-icon-download"  @click="studentDownloadList(data)" :style="{'color':color}"></i>
						<i class="el-icon-s-custom"  @click="studentDownload(data.id,data.status)" :style="data.status=='0'?{'color':color}:{'color':'#999999'}"></i>

					</div>
					
				</div>
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
				<div class="student-box"  style="max-height: 580px;overflow: auto;">
                    <el-table
                        :data="tableData"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="学号"
                            prop="code"
                            >
                        </el-table-column>
                        <el-table-column
                            label="学校"
                            prop="schoolName"
                            >
                        </el-table-column>
						<el-table-column
                            label="姓名"
                            prop="name"
                            >
                        </el-table-column>
                        <el-table-column
                            label="性别"
                            prop="sex"
                            >
                        </el-table-column>
                    </el-table>
						<!-- <div class="page">
							<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
							:current-page.sync="currentPage1" :page-size="pageSize1" :total="total1"></el-pagination>
						</div> -->
					</div>
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
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		SchoolIndex,
		selectSchoolTag,
		schoolStudentAllow,
		schoolStudentUnAllow,
		selectBySchoolIdAndPaperIdAndClassId,
		ApiClassSelectListByOptions,
		apicommonExamGetFile
	} from '@/api/api.js'
export default {
	data() {
		return {
			color: '',
			array_nav: [], //存储el-chckbox数组
			tableData:[],
			search: '',
			classList:[],
			
			dialogTableVisible: false,

			pageNum:1,
			pageSize:6,
			disStatus: 0,
			currentPage: 1,
			total:0,
			paperList:[],
			DisStatusList:[],
			ElementTextList:[],
			PurposeList:[],
			SubjectList:[],
			GradeList:[],
			VersionList:[],
			YearsList:[],
			SemesterList:[],
			dialogVisible: false,
			elementTest:0,
			purpose:0,
			subject:0,
			grade:0,
			version:0,
			years:0,
			semester:0,

			obj:[],
			schoolId:'',
			classId:'',
			papers:[],
			
			testPaperId:'',

			pageNum1:1,
			pageSize1:999,
			currentPage1: 1,
			total1:0,
			papaerType:[]
		};
		
	},
	methods: {
		getValue() {
			console.log(this.array_nav);
		},
		goAdd(){
			this.$router.push('order_school_add2')
		},
		handleCurrentChange(val) {
			this.pageNum = val
			selectSchoolTag({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				// console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		handleSizeChange(val) {
			this.pageSize = val
			selectSchoolTag({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				// console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		getQuery() {
			this.obj = []
			if (this.semester != 0 && this.semester) {
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
			selectSchoolTag({
				"id":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				// console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
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
		// 学生下载权限
		studentDownload(id,status){
			if(status==0){
				this.$confirm('是否不允许学生下载该试卷?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
        		}).then(() => {
					schoolStudentUnAllow(id,{}).then(res=>{
						if(res.data.result){
							this.$message.success('操作成功')
							selectSchoolTag({
								"pageSize":this.pageSize,
								"pageNum":this.pageNum,
							}).then(res=>{
								this.papers=res.data.data.list
								this.total=res.data.data.total
								this.currentPage = res.data.data.pageNum
							})
						}else{
							this.$message.error(res.data.message)
						}
					})
        		}).catch(() => {     

        		});
			}else{
				this.$confirm('是否允许学生下载该试卷?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
        		}).then(() => {
					schoolStudentAllow(id,{}).then(res=>{
						if(res.data.result){
							this.$message.success('操作成功')
							selectSchoolTag({
								"pageSize":this.pageSize,
								"pageNum":this.pageNum,
							}).then(res=>{
								this.papers=res.data.data.list
								this.total=res.data.data.total
								this.currentPage = res.data.data.pageNum
							})
						}else{
							this.$message.error(res.data.message)
						}
					})
        		}).catch(() => {     

        		});
			}
			
		},
		// 学校批量下载
		studentDownloadList(data){
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
				selectBySchoolIdAndPaperIdAndClassId(this.pageNum1,this.pageSize1,this.testPaperId,this.classId,this.schoolId).then(res=>{
					this.tableData = res.data.data.list
					this.total1=res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			}
			
            
		},
		handleCurrentChange1(val){
			this.pageNum1 = val
		
			selectBySchoolIdAndPaperIdAndClassId(this.pageNum1,this.pageSize1,this.testPaperId,this.classId,this.schoolId).then(res=>{
				this.tableData = res.data.data.list
				this.total1=res.data.data.total
				this.currentPage1 = res.data.data.pageNum
			})
		},
		handleSizeChange1(val){
			this.pageSize1 = val
			
			selectBySchoolIdAndPaperIdAndClassId(this.pageNum1,this.pageSize1,this.testPaperId,this.classId,this.schoolId).then(res=>{
				this.tableData = res.data.data.list
				this.total1=res.data.data.total
				this.currentPage1 = res.data.data.pageNum
			})
		},
		changeClass(){
			this.pageNum1 = 1
			this.pageSize1 = 999
			selectBySchoolIdAndPaperIdAndClassId(this.pageNum1,this.pageSize1,this.testPaperId,this.classId,this.schoolId).then(res=>{
				this.tableData = res.data.data.list
				this.total1=res.data.data.total
				this.currentPage1 = res.data.data.pageNum
			})
		},
		// 选择人员
		handleSelectionChange(val){
			this.papaerType = val
        },
		// 批量下载
		onSubmit(){
			this.dialogTableVisible = false
				let  createTestPaperInfoObj = {
					 	testPaperId:this.testPaperId,
					    students:[]
					}
				for(var i=0;i<this.papaerType.length;i++){
					createTestPaperInfoObj.students.push({
						"uid":this.papaerType[i].id,
						"utype":"student",
						"items":[]
					})
				}
				this.$router.push({name :'test_paper_maker_for_task',query:{createTestPaperInfoObj:createTestPaperInfoObj}})
		}


	},
	mounted() {
		this.color = user().color;
		
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
		selectSchoolTag({
			"pageSize":this.pageSize,
			"pageNum":this.pageNum,
		}).then(res=>{
			this.papers=res.data.data.list
			this.total=res.data.data.total
			this.currentPage = res.data.data.pageNum
		})
		// 获取学校班级
		this.schoolId = localStorage.getItem('userID')

		ApiClassSelectListByOptions({
			"schoolId": this.schoolId
		}).then(res=>{
			
			this.classList = res.data.data.list
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

	.status {
		color: #2bbb61;
	}

	.group /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: rgb(43, 187, 97);
		border-color: rgb(43, 187, 97);
	}
</style>
