<template>
	<div class="box">
		<div class="left">
			<div class="l-box-1">
				<div class="l-title">请选择试卷类型</div>
				<el-radio-group v-model="paperType" @change="changeType" style="margin-top:20px;">
					<el-radio label="图片试卷">图片试卷</el-radio>
					<el-radio label="在线组卷">在线组卷</el-radio>
					<el-radio label="公共试卷">公共试卷</el-radio>
				</el-radio-group>
			</div>
			<div class="l-box-1" v-if="!iscommon">
				<div class="l-title">标题</div>
				<el-input v-model="form.title" placeholder="请输入内容" maxlength="30" show-word-limit class="ids"></el-input>
			</div>
			<div class="l-box-1"  v-if="!iscommon">
				<div class="l-title">试卷说明</div>
				<el-input type="textarea" placeholder="请输入内容" v-model="form.examExplain" :autosize="{ minRows: 2, maxRows: 8}"></el-input>
			</div>
			<div class="l-box-1"  v-if="!iscommon">
				<div class="l-title">试卷作答时间</div>
				<el-input v-model="form.examTime" :min="1" :max="9999"   type="number" show-word-limit class="ids">
					<template slot="append">
						分钟
					</template>
				</el-input>
			</div>
			<div class="l-box-2" v-if="ispaperType && !iscommon">
				<el-upload 
				class="upload-demo" 
				drag action=""  
				:show-file-list="false"
                :http-request="uploadFild">
					<i class="el-icon-upload" v-if="!uploadFile"></i>
					<div class="el-upload__text"  v-if="!uploadFile">
						将文件拖到此处，或
						<em>点击上传</em>
					</div>
					<i class="el-icon-check" v-if="uploadFile"></i>
					<div class="el-upload__text" v-if="uploadFile">
							已上传文件
					</div>
				</el-upload>
				
			</div>
			<div class="l-box-1" v-if="iscommon">
				<div class="l-title">标题</div>
				<el-input v-model="iscommonTitle" placeholder="请输入内容" maxlength="30" show-word-limit class="ids"></el-input>
			</div>
			<div class="l-box-1" v-if="iscommon">
				<div class="l-title">选择试卷类型</div>
				<div class="group" style="margin-top:20px">
				
					<el-radio-group v-model="selectTag">
						<el-radio-button v-for="(d,i) in tagList.purpose" :label="d.id" >{{d.text}}</el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="l-box-1" v-if="!iscommon">
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
								<div class="th-group">学期</div>
								<div class="td-group" >
									<el-radio-group v-model="form.tag_list[3].id" >
										<el-radio-button v-for="(d,i) in tagList.semester" :label="d.id">{{d.text}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习年级</div>
							<div class="td-group" >
								<el-radio-group v-model="form.tag_list[4].id">
										<el-radio-button v-for="(d,i) in tagList.grade" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">单元</div>
							<div class="td-group" >
								<el-radio-group v-model="form.tag_list[5].id" >
									<el-radio-button v-for="(d,i) in tagList.element_test" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">试卷类型</div>
							<div class="td-group" >
								<el-radio-group v-model="form.tag_list[6].id">
									<el-radio-button v-for="(d,i) in tagList.purpose" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div  v-if="iscommon">
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
					highlight-current-row
    				@current-change="selectPaperonly"
					:data="tableData"
					style="width: 100%">
					<el-table-column
					 	type="index"
      					width="80"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="createDate"
						label="创建日期"
						>
					</el-table-column>
					<el-table-column
						prop="title"
						label="试卷名称"
						>
					</el-table-column>
					<el-table-column
						prop="operator_name"
						label="出卷人">
					</el-table-column>
				</el-table>

				<div class="page">
					<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page.sync="currentPage" :page-size="pageSize" :total="total">
					</el-pagination>
				</div>
			
			</div>
			
			<div style="margin-top:30px;max-height: 400px;overflow: auto;" v-if="!iscommon">
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
				    </el-table>
			</div>
			<div class="card-box" >
				<el-row :gutter="20">
					<el-col :span="8" v-if="!ispaperType &&!iscommon" :offset="3">
						<div class="grid-content bg-purple">
							<el-button class="i" @click="redictToTestPaperMaker(0)">进入组卷工具</el-button>
							<div class="ii">(在线组卷)</div>
						</div>
					</el-col>
					<el-col :span="8" v-if="!ispaperType && !iscommon" :disabled="!testPaperCacheReady" :offset="3">
						<div class="grid-content bg-purple">
							<el-button class="i"  @click="parperAddPic">确认提交试卷</el-button>
							<div class="ii">(在线组卷)</div>
						</div>
					</el-col>
					<el-col :span="8" v-if="ispaperType && !iscommon" :offset="8">
						<div class="grid-content bg-purple">
							<el-button class="i"  @click="parperAddPic">确认提交试卷</el-button>
							<div class="ii">(图片试卷)</div>
						</div>
					</el-col>
					<el-col :span="8" v-if="iscommon" :offset="8">
						<div class="grid-content bg-purple">
							<el-button class="i"  @click="ClickCommon">确认提交试卷</el-button>
							<div class="ii">(公共试卷)</div>
						</div>
					</el-col>
				</el-row>
			</div>
		
			
			<!-- <div class="hint">
				<div>温馨提示：</div>
				<span>1.下载word模板正确填写各项题目信息后，在本页面进行上传处理，上传后将提交管理员确认，确认完
				                      毕后会进入试卷库。复杂题目可以图片形式插入word模板文档。
				                      2.图片试卷仅能用于作业、练习，无法接入题库、评价系统等其他功能，建议优先选择按模板提交试卷。</span>
			</div> -->
		</div>
	</div>
</template>
<script>
import user from '../../common/user';
import {
	selectTag,StudentSelectByTeacher,selectListByOptions,apiCommonExamAdd,apiCommonExamUpload,studentStudentExamAdd,apiAdminExamUpdate,teacherSelectTag,CommonExamCopypaper,
	apiAdminExamBigQuestionInsert,apiAdminExamQuestionInsert,apiAdminExamQuestionAnwserInsert,apiAdminExamQuestionAnwserSheetInsert,apiAdminExamBigQuestionWithChildrenInsert

} from '@/api/api.js'
export default {
	data() {
		return {
			/**
			 * 用于上传的试卷
			 */
			testPaperObj:null,
			/**
			 * 是否已经组卷完毕
			 */
			testPaperCacheReady:false,
			color: '',
			array_nav: [], //存储el-chckbox数组
			title: '',
			textarea: '',
			selectTag:'',
			select: '',
			total:0,
			currentPage: 1,
			pageNum:1,
			pageSize:6,
			dialogVisible: false,
			iscommonTitle:'',
			ispaperType:true,
			paperType:'图片试卷',
			tagList:[],
			AllTagList:[],
			iscommon:false,
			StudenList:[],
			userID:localStorage.getItem('userID'),
			selectStudentList:[],
			ParperType:'',
			uploadFile:'',
			tableData:[],
			form:{
				title:'',
				examExplain:'',
				examTime:1,
				elementTest:'',
				startTime:'',
				overTime:'',
				tag_list:[
				{
					id:''
				},
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
					label: '在线组卷',
					value:'在线组卷'
				},
				{
					label: '公共试卷',
					value:'公共试卷'
				}
			],
		};
	},
	methods: {
		 //改变时
		handleSizeChange(val) {
			this.pageSize = val;
			teacherSelectTag({
				"id": [38],
				"pageSize": this.pageSize,
				"pageNum": this.pageNum
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum	
			})
			
		},
		//条目改变时
		handleCurrentChange(val) {
			this.pageNum = val;
			teacherSelectTag({
				"id": [38],
				"pageSize": this.pageSize,
				"pageNum": this.pageNum
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
					
			})
		},
		changeType(){
			console.log("切换组卷类型");
			if(this.paperType == '图片试卷'){
				this.ispaperType = true
				this.iscommon = false
			}else if(this.paperType == '在线组卷'){
				this.ispaperType = false
				this.iscommon = false
			}else if(this.paperType == '公共试卷'){
				this.iscommon = true

				// 请求老师的试卷

				//试卷
				teacherSelectTag({
					"id": [38],
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
					
				})
			}
		},
		handleSelectionChange(val){
			this.selectStudentList = val
		},
		selectPaperonly(val){
			this.ParperType = val
		},
		// 公共试卷
		ClickCommon(){
		
			if(this.selectTag && this.iscommonTitle && this.ParperType){
				CommonExamCopypaper(this.ParperType.id,this.selectTag,this.iscommonTitle).then(res=>{
					if(res.data.result){
						this.$message.success('操作成功')
						this.$router.push('/manage_teacher')	
					}else{
						this.$message.error(res.data.message)
					}
				})
			}else{
				this.$message.warning('请填写必要信息')
			}
			// CommonExamCopypaper(this.paperType.id,)
		},
		// 上传附件
		uploadFild(param){
			var that = this
			// console.log(param)
			var file = param.file
			this.uploadFile = new FormData()
			this.uploadFile.append('file',file)
			this.$message.success('导入成功')
		},
		getStudentExamListPromise(examId,id){
			return new Promise((resolve, reject) => {
				studentStudentExamAdd({
					"examinationId":examId,
					"studentId":id
				}).then(res=>{
					resolve(res)
					
				})
			})
		},
		async getStudentExamList(examId,id){
			await this.getStudentExamListPromise(examId,id)
		},

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
										this.getStudentExamList(examId,this.selectStudentList[i].id)
										// studentStudentExamAdd({
										// 	"examinationId":examId,
										// 	"studentId":this.selectStudentList[i].id
										// }).then(res=>{
											
										// 	if(res.data.result){

										// 	}else{
										// 		this.$message.error(res.data.message)
										// 	}
										// })
									}
									this.$message.success('操作成功')	
									this.$router.push('/manage_teacher')							
								}else{
									this.$message.success('操作完成，未绑定学生')
									this.$router.push('/manage_teacher')
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
			// 在线组卷

			else{
				
					// 新建试卷
					apiCommonExamAdd(this.form).then(res=>{
						
					// console.log(res)
					if(res.data.result){
						console.log("新增试卷完成")
						// 新建试卷完成后绑定试卷id
						let examId = res.data.data.id
						console.log("开始新增试题")
						this.$options.methods.startTestPaperUpdatePaperToServer.bind(this)(examId)

						if(this.selectStudentList !=[]){
							console.log("开始新增学生")
							// 有绑定学生
							for(var i=0;i<this.selectStudentList.length;i++){
								// 绑定学生
								studentStudentExamAdd({
									"examinationId":examId,
									"studentId":this.selectStudentList[i].id
								}).then(res=>{
									if(res.data.result){
										console.log("新增学生完成")
										
									}else{
										this.$message.error(res.data.message)
									}
								})
							}
							this.$message.success('操作成功')								
						}else{
							this.$message.success('操作成功')
							// 没有绑定学生
						}

					}else{
						this.$message.error(res.data.message)
						console.log("发生错误")
					}
				})
		
				
			
			}
		},
		/**
		 * 全屏加载等待
		 */
		startFullscreenLoading() {
		this.fullscreenLoading = true;
		const loading = this.$loading({
			lock: true,
			text: "正在加载中，请稍候...",
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
			});
			//以免长时间无响应，每秒检查一次后主动取消
			var checkExec = setInterval(() => {
			if(this.fullscreenLoading == false)
			{
				clearInterval(checkExec);
				loading.close();
			}
			}, 3000);
			//以免长时间无响应，30秒后主动取消
			setTimeout(() => {
			loading.close();
			this.fullscreenLoading = false
			clearInterval(checkExec);
			}, 30000);
		},
		/**
		 * 清除缓存数据
		 */
		clearTestPaperCache() {
			localStorage.removeItem("testPaperCacheReady")
			localStorage.removeItem("newTestPaperInfo")
			localStorage.removeItem("testPaperCache")
			
		},
		/**
		 * 开始任务，完成组卷，插入数据库
		 */
		startTestPaperUpdatePaperToServer(testPaperObjId){
				
		this.$options.methods.startFullscreenLoading.bind(this)()
		
			setTimeout(() => {
			this.$options.methods.testPaperUpdatePaperToServer.bind(this)(testPaperObjId)
			
			//关闭屏蔽层
			//this.fullscreenLoading = false
			
			}, 300);

		},
		/**
		 * 完成组卷，插入数据库
		 */
		testPaperUpdatePaperToServer(testPaperObjId)
		{

			//读取缓存中的json试卷

		this.testPaperObj.id = testPaperObjId
		
		if(null == this.testPaperObj.items)
		{
			console.log("试卷为空，无法插入数据库")
			return false
		}
		console.log("插入试卷")
		//循环输出试卷部分================================================================================================
		//只要上传图片一直没出错，就显示为true
		this.uploadQuestionImgHandleExecFlag = true
		this.testPaperObj.items.forEach((questionPartItem,questionPartItemIndex )=> {
			//console.log("插入部分")
			//将现有对象重新封装
			var questionPartItemJson = {
			"is_include_items": true,
			"paper_id": testPaperObjId,
			"parent_id": null,
			"score": questionPartItem.score,
			"topic_text": questionPartItem.topic_text,
			"weight": this.testPaperObj.items.length - questionPartItemIndex
			}

			//var addQuestionPartUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/insert"

			apiAdminExamBigQuestionInsert(questionPartItemJson)
			.then(res =>{
			//循环输出大题================================================================================================
			console.log(res)
			if(!res.data.result)
			{
				this.$message.error('同步试卷至服务器出错！添加试卷部分失败！停止操作！')
				return false
			}

			var resResultData = res.data

			//将id、sn绑定过来
			questionPartItem.id = resResultData.data.id
			questionPartItem.sn = resResultData.data.sn
			//console.log("questionPartItem.id:" + questionPartItem.id)
			//console.log("questionPartItem.sn:" + questionPartItem.sn)

			//同步上传图片==========================================
			/*this.$options.methods.uploadQuestionPartImg.bind(this)(questionPartItem.id,questionPartItem.imgFile).then(res =>{
				if(!res.data.result)
				{
				this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
				this.uploadQuestionImgHandleExecFlag = false
				return false
				}
			})
			.catch(err=>{
				this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
				this.uploadQuestionImgHandleExecFlag = false
				return false
			})*/
			//同步上传图片结束==========================================
			
			questionPartItem.items.forEach((questionBigItem,questionBigItemIndex) => {
				//console.log("插入大题")

				//将现有对象重新封装
				var questionBigItemJson = {
				"is_include_items": true,
				"paper_id": testPaperObjId,
				"parent_id": questionPartItem.id,
				"score": questionBigItem.score,
				"topic_text": questionBigItem.topic_text,
				"weight": questionPartItem.items.length - questionBigItemIndex
				}

				//var addQuestionBigUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/insert"

				apiAdminExamBigQuestionInsert(questionBigItemJson)
				.then(res =>{
				if(!res.data.result)
				{
					this.$message.error('同步试卷至服务器出错！添加大题失败！停止操作！')
					return false
				}

				var resResultData = res.data

				questionBigItem.id = resResultData.data.id
				questionBigItem.sn = resResultData.data.sn

				questionBigItem.parent_id = questionPartItem.id
				questionBigItem.parent_sn = questionPartItem.sn

				//同步上传图片==========================================
				/*this.$options.methods.uploadQuestionBigImg.bind(this)(questionBigItem.id,questionBigItem.imgFile).then(res =>{
					if(!res.data.result)
					{
					this.$message.error('同步试卷至服务器出错！添加大题图片失败！')
					this.uploadQuestionImgHandleExecFlag = false
					return false
					}
				})
				.catch(err=>{
					this.$message.error('同步试卷至服务器出错！添加大题图片失败！')
					this.uploadQuestionImgHandleExecFlag = false
					return false
				})*/
				//同步上传图片结束==========================================

				//循环输出小题================================================================================================
				questionBigItem.items.forEach((questionItem,questionItemIndex) => {

					//将现有对象重新封装
					var questionItemJson = {
						"is_include_images": true,
						"is_include_items": (questionItem.items.length > 0),
						"parent_id": null,
						"parent_sn": null,
						"question_type": questionItem.question_type,
						"score": questionItem.score,
						"topic_text": questionItem.topic_text,
						"weight": questionBigItem.items.length - questionItemIndex
					}

					var addQuestionUrl = "/api/"+this.userTypeForMethods+"/exam/question/insert"

					apiAdminExamQuestionInsert(questionItemJson)
					.then(res =>{
					if(!res.data.result)
					{
						this.$message.error('同步试卷至服务器出错！添加小题失败！停止操作！')
						return false
					}

					var resResultData = res.data

					questionItem.id = resResultData.data.id
					questionItem.sn = resResultData.data.sn

					//同步上传图片==========================================
					/*this.$options.methods.uploadQuestionImg.bind(this)(questionItem.id,questionItem.imgFile).then(res =>{
						if(!res.data.result)
						{
						this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
						this.uploadQuestionImgHandleExecFlag = false
						return false
						}
					})
					.catch(err=>{
						this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
						this.uploadQuestionImgHandleExecFlag = false
						return false
					})*/
					//同步上传图片结束==========================================

					//循环输出大题绑定小题选项================================================================================================
					

					//将现有对象重新封装
					var questionToBigItemJson = {
						"big_question_id": questionBigItem.id,
						"big_question_sn": questionBigItem.sn,
						"question_id": questionItem.id,
						"question_sn": questionItem.sn,
						"weight": questionBigItem.weight
					}

					//var addQuestionToBigUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestionWithChildren/withQuestionWithChildren/insert"
					console.log(res)
					apiAdminExamBigQuestionWithChildrenInsert(questionToBigItemJson)
					.then(res =>{
						if(!res.data.result)
						{
						this.$message.error('同步试卷至服务器出错！添加大题绑定小题失败！停止操作！')
						return false
						}

						var resResultData = res.data
						
						//循环输出小题的答题卡================================================================================================
						var questionAnwserSheetItem = questionItem.anwserSheet
						//将现有对象重新封装
						var questionAnwserSheetItemJson = {
						"is_include_images": true,
						"question_id": questionItem.id,
						"question_sn": questionItem.sn,
						"topic_text": questionAnwserSheetItem.topic_text
						}

						//var addQuestionAnwserUrl = "/api/"+this.userTypeForMethods+"/exam/question/answer/sheet/insert"
						var resResultData = res.data

						questionAnwserSheetItem.id = resResultData.data.id
						questionAnwserSheetItem.sn = resResultData.data.sn

						apiAdminExamQuestionAnwserSheetInsert(questionAnwserSheetItemJson)
						.then(res =>{
						if(!res.data.result)
						{
							this.$message.error('同步试卷至服务器出错！添加小题的答案卡失败！停止操作！')
							return false
						}

						//循环输出小题的答案================================================================================================
							var questionAnwserItem = questionItem.anwser
							//将现有对象重新封装
							var questionAnwserItemJson = {
							"analysis_text": questionAnwserItem.analysis_text,
							"answer_text": questionAnwserItem.answer_text,
							"is_include_images": true,
							"question_id": questionItem.id,
							"question_sn": questionItem.sn,
							}

							//var addQuestionAnwserUrl = "/api/"+this.userTypeForMethods+"/exam/question/answer/insert"
							var resResultData = res.data

							questionAnwserItem.id = resResultData.data.id
							questionAnwserItem.sn = resResultData.data.sn

							apiAdminExamQuestionAnwserInsert(questionAnwserItemJson)
							.then(res =>{
							if(!res.data.result)
							{
								this.$message.error('同步试卷至服务器出错！添加小题的答案失败！停止操作！')
								return false
							}

							//此时已经结束，关闭屏蔽层
							if(questionItem.items.length <= 0)
							{
								apiAdminExamUpdate({id:this.testPaperObj.id,elementTest:JSON.stringify(this.testPaperObj)}).then(res =>{
									if(!res.data.result)
									{
										this.$message.error('同步试卷至服务器出错！更新试卷试题ID失败！停止操作！')
										return false
									}

									console.log(this.testPaperObj)
									//关闭屏蔽层
									this.fullscreenLoading = false
									this.$message.success('同步试卷至服务器完成！')
									this.$options.methods.clearTestPaperCache.bind(this)()
									this.$router.push('/manage_teacher')
								})
								
							}


							//循环输出小题选项================================================================================================
							questionItem.items.forEach((questionOptionItem,questionOptionItemIndex) => {

								//将现有对象重新封装
								var questionOptionItemJson = {
									"is_include_images": true,
									"is_include_items": (questionOptionItem.items.length > 0),
									"parent_id": questionItem.id,
									"parent_sn": questionItem.sn,
									"question_type": questionOptionItem.question_type,
									"score": questionOptionItem.score,
									"topic_text": questionOptionItem.topic_text,
									"weight": questionItem.items.length - questionOptionItemIndex
								}

								//var addQuestionOptionUrl = "/api/"+this.userTypeForMethods+"/exam/question/insert"

								apiAdminExamQuestionInsert(questionOptionItemJson)
								.then(res =>{
								if(!res.data.result)
								{
									this.$message.error('同步试卷至服务器出错！添加小题选项失败！停止操作！')
									return false
								}

								var resResultData = res.data

								questionOptionItem.id = resResultData.data.id
								questionOptionItem.sn = resResultData.data.sn
								
								//此时已经结束，关闭屏蔽层
								if(questionItem.items.length <= 0)
								{
									apiAdminExamUpdate({id:this.testPaperObj.id,elementTest:JSON.stringify(this.testPaperObj)}).then(res =>{
										if(!res.data.result)
										{
											this.$message.error('同步试卷至服务器出错！更新试卷试题ID失败！停止操作！')
											return false
										}

										console.log(this.testPaperObj)

										//关闭屏蔽层
										this.fullscreenLoading = false
										this.$message.success('同步试卷至服务器完成！')
										this.$options.methods.clearTestPaperCache.bind(this)()
										this.$router.push('/manage_teacher')
									})
									
								}
								
								})
								// .catch(err=>{
								// this.$message.error('同步试卷至服务器出错！添加小题选项失败！系统错误！')
								// return false
								// })

							})
							//循环输出小题选项，完成================================================================================================

							
							})
							// .catch(err=>{
							// this.$message.error('同步试卷至服务器出错！添加小题的答案失败！系统错误！')
							// return false
							// })
							
							//循环输出小题的答案，完成================================================================================================
						
						})
						// .catch(err=>{
						// this.$message.error('同步试卷至服务器出错！添加小题的答案失败！系统错误！')
						// return false
						// })
						
						//循环输出小题的答题卡，完成================================================================================================
						
					})
					// .catch(err=>{
					// 	this.$message.error('同步试卷至服务器出错！添加大题绑定小题失败！系统错误！')
					// 	return false
					// })

					
					//循环输出大题绑定小题选项，完成================================================================================================

					})
					// .catch(err=>{
					// this.$message.error('同步试卷至服务器出错！添加小题失败！系统错误！')
					// return false
					// })

				})
				//循环输出小题，完成================================================================================================

				})
				// .catch(err=>{
				// 	this.$message.error('同步试卷至服务器出错！添加小题失败！系统错误！')
				// 	return false
				// })

			})
			//循环输出大题，完成================================================================================================
			})
			// .catch(err=>{
			// this.$message.error('同步试卷至服务器出错！添加试卷部分失败！系统错误！')
			// return false
			// })
			return true
		})
		//循环输出试卷部分，完成================================================================================================
		
		console.log("试卷插入数据库完成 <<<<< ")
		
		
		},
		/**
		 * 新页面跳转到组卷工具
		 */
		redictToTestPaperMaker (param) {

			if(this.form.title.length <= 0 || this.form.examExplain.length <= 0 )
			{
				this.$message.warning('请先输入标题和试卷说明再开始组卷！')
				return
			}
			
			localStorage.removeItem("testPaperCacheReady")

			var testPaperInfoJsonObj = {
				
				paperType: this.paperType,
				form:this.form,

			}
			
			localStorage.setItem("newTestPaperInfo",JSON.stringify(testPaperInfoJsonObj))
			this.$router.push(`/test_paper_maker`)
			//this.$router.push({path: '/test_paper_maker', query: {title: this.form.title , examExplain:this.form.examExplain, examTime : this.form.examTime}})
			//window.open(newPage.href,'_blank')
		},
	
		//方法结束======================================
	},
	mounted() {
		this.color = user().color;
		selectTag().then(res=>{
			this.tagList = res.data.data
			
		})
		StudentSelectByTeacher(this.userID,1,999).then(res=>{
			this.StudenList = res.data.data.list
			// this.total = res.data.data.total
			// this.currentPage = res.data.data.pageNum
		})
		

		this.$nextTick(() => {
			if(null != localStorage.getItem('newTestPaperInfo'))
			{
				var newTestPaperInfo = JSON.parse(localStorage.getItem('newTestPaperInfo'))
				var newTestPaperInfoForm = newTestPaperInfo.form
				//console.log(this.form)
				this.form.id = newTestPaperInfoForm.id
				this.form.title = newTestPaperInfoForm.title
				this.form.examExplain = newTestPaperInfoForm.examExplain
				this.form.examTime = newTestPaperInfoForm.examTime
				this.form.elementTest = newTestPaperInfoForm.elementTest
				this.form.overTime = newTestPaperInfoForm.overTime
				this.form.startTime = newTestPaperInfoForm.startTime
				if(newTestPaperInfoForm.tag_list.length > 0)
				{
					this.form.tag_list = newTestPaperInfoForm.tag_list
				}
				
				this.paperType = newTestPaperInfo.paperType
				if(this.paperType == "图片试卷")
				{
					this.ispaperType = true
				}
				else{
					this.ispaperType = false
				}
			}
			if(null != localStorage.getItem('testPaperCacheReady') && null != localStorage.getItem('testPaperCache'))
			{
				this.testPaperCacheReady = true

				this.testPaperObj = JSON.parse(localStorage.getItem('testPaperCache'))
				//console.log(this.testPaperObj)
				this.form.elementTest = JSON.stringify(this.testPaperObj)
			}
			else{
				this.testPaperCacheReady = false
			}
		})

		// 获取相应试卷
	}
};
</script>

<style scoped src="../../../assets/css/manage-import.css"></style>

<style>
	.box .left .el-input__inner{
		border: 1px solid #DCDFE6;
		padding: 0 15px;
	}
	.box .left .selectTime .el-input__inner{
		 /* margin-top: 20px; */
		padding: 0 30px; 
	}
</style>
