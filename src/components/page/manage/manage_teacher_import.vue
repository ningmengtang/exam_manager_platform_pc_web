<template>
	<div class="box">
		<div class="left">
			<div class="l-box-1">
				<div class="l-title">请选择试卷类型</div>
				<!-- <el-select v-model="paperType" placeholder="请选择" class="ids" @change="changeType">
					<el-option v-for="item in options"  :label="item.label" :value="item.label"></el-option>
				</el-select> -->
				<el-radio-group v-model="paperType" @change="changeType" style="margin-top:20px">
					<el-radio label="图片试卷">图片试卷</el-radio>
					<el-radio label="组件试卷">组件试卷</el-radio>
				</el-radio-group>
			</div>
			<div class="l-box-1">
				<div class="l-title">标题</div>
				<el-input v-model="form.title" placeholder="请输入内容" maxlength="30" show-word-limit class="ids"></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷说明</div>
				<el-input type="textarea" placeholder="请输入内容" v-model="form.examExplain" maxlength="30" show-word-limit></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷作答时间</div>
				<el-input v-model="form.examTime" :min="1" :max="9999"   type="number" show-word-limit class="ids">
					<template slot="append">
						分钟
					</template>
				</el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷标签</div>
				<div class="t-content">
					<div class="group">
							<div class="row-group">
								<div class="th-group">年份</div>
								<div class="td-group" >
									<el-radio-group v-model="form.tag_list[0].id">
										<el-radio-button v-for="(d,i) in tagList.years" :label="d.id" >{{d.text}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
					</div>
					<div class="group">
							<div class="row-group">
								<div class="th-group">教程版本</div>
								<div class="td-group" >
									<el-radio-group v-model="form.tag_list[1].id" >
										<el-radio-button v-for="(d,i) in tagList.version" :label="d.id">{{d.text}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
					</div>
					<div class="group">
							<div class="row-group">
								<div class="th-group">学习科目</div>
								<div class="td-group" >
									<el-radio-group v-model="form.tag_list[2].id" >
										<el-radio-button v-for="(d,i) in tagList.subject" :label="d.id">{{d.text}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习年级</div>
							<div class="td-group" >
								<el-radio-group v-model="form.tag_list[3].id">
										<el-radio-button v-for="(d,i) in tagList.grade" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">单元</div>
							<div class="td-group" >
								<el-radio-group v-model="form.tag_list[4].id" >
									<el-radio-button v-for="(d,i) in tagList.element_test" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
				</div>
			</div>
			

			<div class="l-box-2" v-if="ispaperType">
				<el-upload 
				class="upload-demo" 
				drag action=""  
				:show-file-list="false"
                :http-request="uploadFild">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到此处，或
						<em>点击上传</em>
					</div>
				</el-upload>
			</div>
		</div>
		<div class="right">
			<div class="card-box" >
				<el-row :gutter="20">
					<el-col :span="8" v-if="!ispaperType">
						<div class="grid-content bg-purple">
							<el-button class="i" >开始组件</el-button>
						</div>
					</el-col>
					<el-col :span="8" >
						<div class="grid-content bg-purple">
							<el-button class="i" >确认提交试卷</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="group" style="margin-top:20px">
				<el-table
				      :data="StudenList"
				      style="width: 100%"
					   @selection-change="handleSelectionChange">
					   <el-table-column
						type="selection"
						width="55">
					</el-table-column>
				      <el-table-column
				        prop="code"
				        label="学号"
				        width="180">
				      </el-table-column>
				      <el-table-column
				        prop="name"
				        label="姓名"
				        width="180">
				      </el-table-column>

					  <el-table-column
					    prop="schoolName"
					    label="学校"
						>
					  </el-table-column>


					  <!-- <el-table-column
					    prop="classesId"
					    label="班级"
						:formatter="formStatus"
						>
					  </el-table-column> -->
				    </el-table>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
			
			<div class="hint">
				<div>温馨提示：</div>
				<span>1.下载word模板正确填写各项题目信息后，在本页面进行上传处理，上传后将提交管理员确认，确认完
				                      毕后会进入试卷库。复杂题目可以图片形式插入word模板文档。
				                      2.图片试卷仅能用于作业、练习，无法接入题库、评价系统等其他功能，建议优先选择按模板提交试卷。</span>
			</div>
		</div>
	</div>
</template>
<script>
import user from '../../common/user';
import {selectTag,StudentSelectByTeacher,selectListByOptions,apiCommonExamAdd,apiCommonExamUpload,studentStudentExamAdd} from '@/api/api.js'
export default {
	data() {
		return {
			color: '',
			array_nav: [], //存储el-chckbox数组
			title: '',
			textarea: '',
			select: '',
			total:0,
			currentPage: 1,
			pageNum:1,
			pageSize:6,
			dialogVisible: false,
			ispaperType:true,
			paperType:'图片试卷',
			tagList:[],
			AllTagList:[],
			StudenList:[],
			selectStudentList:[],
			uploadFile:'',
			form:{
				title:'',
				examExplain:'',
				examTime:1,
				elementTest:'',
				tag_list:[
				{
					id:''
				},
				{
					id:''
				},
				{
					id:''
				},{
					id:''
				},
				{
					id:''
				}
				]
			},
			array:[],
			cities: ['全部', '上海', '北京', '广州', '深圳'],
			cities2: ['全部', '1', '2', '3', '4'],
			checkboxGroup2: ['上海'],
			options: [
				{
					label: '图片试卷',
					value:'图片试卷'
				},
				{
					label: '组件试卷',
					value:'组件试卷'
				}
			],
			li: [
				{
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
				},
				{
					teacher: '古得老师',
					title: '2019年人教版一年级第一单元作业5656565656',
					synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
					time: '2020年10月11日上传',
					label: '2019',
					o: '3'
				}
			],
			tableData: [{
			            date: '2016-05-02',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄'
			          }, {
			            date: '2016-05-04',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1517 弄'
			          }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1519 弄'
			          }, {
			            date: '2016-05-03',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1516 弄'
			          }]
		};
	},
	methods: {
		 //改变时
		handleSizeChange(val) {
			this.pageSize = val;
			StudentSelectByTeacher({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize
			}).then(res=>{
				this.StudenList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		//条目改变时
		handleCurrentChange(val) {
			this.pageNum = val;
			StudentSelectByTeacher({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize
			}).then(res=>{
				this.StudenList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		getValue() {
			console.log(this.array_nav);
		},
		// handleSizeChange(val) {
		// 	console.log(`每页 ${val} 条`);
		// },
		// handleCurrentChange(val) {
		// 	console.log(`当前页: ${val}`);
		// },
		changeType(){
			if(this.paperType == '图片试卷'){
				this.ispaperType = true
			}else if(this.paperType == '组件试卷'){
				this.ispaperType = false
			}
		},
		handleSelectionChange(val){
			this.selectStudentList = val
		},
		// 上传附件
		uploadFild(param){
			var that = this
			console.log(param)
			var file = param.file
			this.uploadFile = new FormData()
			this.uploadFile.append('file',file)
		},
		// 班级信息
		// formStatus(row,colum){
		// 	console.log(row)
		// 	selectListByOptions({
		// 		"id":row.classesId
		// 	}).then(res=>{
		// 		console.log(res)
		// 		return res.data.data.list[0].name			
		// 		// studentStudentExamAdd
		// 	})
		// },
		// 试卷图片上传
		parperAddPic(){

			if(this.paperType == '图片试卷'){
				// 新建试卷
				if(this.uploadFile){
					apiCommonExamAdd(this.form).then(res=>{
					// console.log(res)
					if(res.data.result){
						// 上传附件
						let examId = res.data.data.id
						apiCommonExamUpload(examId,this.uploadFile).then(res=>{
							if(res.data.result){
								if(this.selectStudentList !=[]){
									// 有绑定学生
									for(var i=0;i<this.selectStudentList.length;i++){
										// 绑定学生
										studentStudentExamAdd({
											"examinationId":examId,
											"studentId":this.selectStudentList[i].id
										}).then(res=>{
											if(res.data.result){
											}else{
												this.$message.error(res.data.message)
											}
										})
									}
									this.$message.error('操作成功')								
								}else{
									this.$message.error('操作成功')
									// 没有绑定学生
								}
							}else{
								this.$message.error(res.data.message)
							}
						})
						
						
					}else{
						this.$message.error(res.data.message)
					}
				})
				}else{
					this.$message.error('请先上传附件')
				}
				
			}
			// 组件试卷
			else{
				// 新建试卷的信息
				cosnsole.log(this.form)
			}
		}
	},
	mounted() {
		this.color = user().color;
		selectTag().then(res=>{
			this.tagList = res.data.data
		})
		let id = localStorage.getItem('userID');
		if(id){
			this.teacherId = localStorage.getItem('userID')
			StudentSelectByTeacher(this.teacherId,this.pageNum,this.pageSize).then(res=>{
				this.StudenList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}else{
			this.teacherId = ''
			this.$message.error(res.data.message)
		}
		
		// let teacherId = 
		
		// // 获取全部标签
		// ApiTagSelectList({
		// 	"pageNum": 1,
		// 	"pageSize": 999
		// }).then(res=>{
		// 	console.log(res)
		// 	this.AllTagList = res.data.data.list
		// })
	}
};
</script>

<style scoped src="../../../assets/css/manage-import.css"></style>
