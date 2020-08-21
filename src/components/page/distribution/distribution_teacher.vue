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
						<el-button type="text" class="download hover"  @click="distribution(data.pid)" >立即分发</el-button>
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
				<!-- <el-select v-model="typeClassStatus" placeholder="请选择班级" style="margin:20px;">
					<el-option
					v-for="item in options"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select> -->
				<el-table
                    :data="studentList"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
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
		studentStudentExamAdd
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
				li: [{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
						time: '2020年10月11日上传',
						label: '2019',
						o: '1'
					},
					{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
						time: '2020年10月11日上传',
						label: '2019',
						o: '2'
					}
				],
				dialogTableVisible: false,
				dialogFormVisible: false,
			};
		},
		methods: {
			//获取选择标签的内容
			handleSizeChange(val) {
				this.pageSize = val;
				teacherIndex({
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
				teacherIndex({
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
			submit() {
				//关闭窗口
				this.dialogTableVisible = false;
			},
	
			async getTypeList(tagType, index) {
				await this.TagTypePromise(tagType, index)
				// return n 
			},
			setCurrent(row) {
			        this.$refs.singleTable.setCurrentRow(row);
			      },
			// 查询分发试卷id
			distribution(id){
				console.log(id)
				this.dialogTableVisible = true
				let classId = ''
				this.paperId = id
				let teacherId = this.userID
				selectStudentWithPaperAllotByTeacherIdAndPaperId(classId,this.paperId,teacherId).then(res=>{
					this.studentList = res.data.data
					console.log(res)
				})
			},
			onSubmit(){
				for(var i=0;i<this.selectStudent.length;i++){
					studentStudentExamAdd({
						"studentId": this.selectStudent[i].student.id,
						"examinationId":this.paperId
					}).then(res=>{
						if(res.data.result){
							this.$message.success('分发成功')
						}else{
							this.$message.error('分发失败')
						}
					})
				}

				setTimeout(() => {
					this.dialogTableVisible = false
				}, 1000);
			}

		},
		mounted() {
			this.color = user().color;
			teacherIndex({
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
			// this
		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
