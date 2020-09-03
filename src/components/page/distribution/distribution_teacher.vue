<template>
	<div class="box">
		<!-- 管理 -->
		<div class="particular">
			<div class="li" v-for="(data, i) in papers" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain}}</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text}}</div>
				</div>
				<div class="right">
			
					<span   style="display: contents;">
						<el-button type="text" class="download hover"  @click="distribution(data.id)" >立即分发</el-button>
					</span>
				</div>
				</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 提示框 -->
		<!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
		<!-- Table -->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<el-select v-model="classId" placeholder="请选择班级" @change="changeClass" style="margin:10px">
					<el-option
					v-for="item in classList"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
				<el-table
                    :data="studentList"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="180">
                    </el-table-column>
					<el-table-column
                        label="学校"
                       
                        >
						<template slot-scope="scope">
							{{scope.row.student.schoolName}}
						</template>
                    </el-table-column>
                    <el-table-column
                        label="学号"
                       
                        >
						<template slot-scope="scope">
							{{scope.row.student.code}}
						</template>
                    </el-table-column>

                    <el-table-column
                        label="学生名称"
                       
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
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag>{{scope.row.paper_allot == true?'已分发':'未分发'}}</el-tag>
						</template>
					</el-table-column>

					
                </el-table>
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
	// import {handleSizeChange,handleCurrentChange,handleClose,TagTypePromise} from '@/assets/js/manage.js'
	import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		teacherIndex,
		teacherSelectTag,
		teacherDistributeselect,
		selectStudentWithPaperAllotByTeacherIdAndPaperId,
		studentStudentExamAdd,
		schoolSelectTeacher,
		ApiClassSelectListByOptions,
		apiCommonExamSelectList
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				paperId:'',
				checkAll: false,
				isIndeterminate: true,
				array_nav: [], //存储el-chckbox数组
				array_nav2: [], //存储el-chckbox数组
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				studentList:[],
				options:[],
				pageNum:1,
				pageSize:8,
				search: '',
				value1: '',
				disStatus:[],
				DisStatusList:[],
				total:0,
				studentPageNum:0,
				studentPageSize:0,
				typeClassStatus:'',
				studentTotal:0,
				userID:localStorage.getItem('userID'),
				tableData:[],
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
				checkboxGroup2: ['上海'],
				papers:'',
				dialogTableVisible: false,
				dialogFormVisible: false,


				classId:'',
				classList:[]
			};
		},
		methods: {
			//获取选择标签的内容
			handleSizeChange(val) {
				this.pageSize = val;
				apiCommonExamSelectList({
					'operator_id':this.userID,
					"operator_type":localStorage.getItem('loginUserType'),
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				apiCommonExamSelectList({
					'operator_id':this.userID,
					"operator_type":localStorage.getItem('loginUserType'),
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}).then(res => {
					// console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				// this.multipleSelection = val;
				// console.log(val)
				this.selectStudent = val
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			// submit() {
			// 	//关闭窗口
			// 	this.dialogTableVisible = false;
			// },
	
			async getTypeList(tagType, index) {
				await this.TagTypePromise(tagType, index)
				// return n 
			},
			setCurrent(row) {
			    this.$refs.singleTable.setCurrentRow(row);
			},
			// 查询分发试卷id
			distribution(id){
				this.dialogTableVisible = true
				this.classId = ''
				this.paperId = id
				// let teacherId = this.userID
				selectStudentWithPaperAllotByTeacherIdAndPaperId(this.classId,this.paperId,this.userID).then(res=>{
					// console.log(res)
					this.studentList = res.data.data
				})
			},

			changeClass(){
				selectStudentWithPaperAllotByTeacherIdAndPaperId(this.classId,this.paperId,this.userID).then(res=>{
					this.studentList = res.data.data
				})
			},
			async getStudentExamAdd(id){
				await this.examPromise(id)
			},
			examPromise(id){
				return new Promise((resolve, reject)=>{
					studentStudentExamAdd({
						"studentId": id,
						"examinationId":this.paperId
					}).then(res=>{
						
						resolve(res)
					})
				})
				
			},
			onSubmit(){
				for(var i=0;i<this.selectStudent.length;i++){
					this.getStudentExamAdd(this.selectStudent[i].student.id)
				}
				this.dialogTableVisible = false
				this.$message.success('操作成功')
			}

		},
		mounted() {
			this.color = user().color;
			apiCommonExamSelectList({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum,
				'operator_id':this.userID,
				"operator_type":localStorage.getItem('loginUserType')
			}).then(res=>{
				// console.log(res)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.pageSize=res.data.data.pageSize
				this.currentPage = res.data.data.pageNum
			})
			schoolSelectTeacher({
				"id":this.userID
			}).then(res=>{
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

<style scoped src="../../../assets/css/distribution.css"></style>
