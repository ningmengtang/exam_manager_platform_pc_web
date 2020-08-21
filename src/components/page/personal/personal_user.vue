<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{this.personalInfo.name}}</div>
							<div class="user-id">ID:{{userID}}</div>
							<div class="identity" :style="{'background-color':color}">题库专家</div>
							<div class="message">
								<div class="school">综合管理平台</div>
								<div class="grade">题库专家</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="change-box">
				<div class="li" @click="showDialogVisibleEditPersonInfo">
					<i class="icon el-icon-user-solid"></i>
					<div class="name-change">个人信息</div>
				</div>
				<div class="li" @click="dialogVisibleEditPersonPwd = true">
					<i class="icon el-icon-thirdmima"></i>
					<div class="name-change">修改密码</div>
				</div>
				<div class="li" @click="showEditPersonMobileDialog">
					<i class="icon el-icon-thirdshouji"></i>
					<div class="name-change">修改手机</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-row">
				<el-row :gutter="20" type="flex" class="el-row-box">
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">我的上传</div>
							<div class="num"><ICountUp :endVal="alltotal" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库完成</div>
							<div class="num"><ICountUp :endVal="successtotal" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">正在入库</div>
							<div class="num"><ICountUp :endVal="loadtotal" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库失败</div>
							<div class="num"><ICountUp :endVal=" errortotal" /></div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 上次的试卷列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="item in paperList ">
					<!-- <div class="label"><img src="../../../assets/img/img.jpg" class="label" /></div> -->
					<div class="teacher" :style="{'color':color}">{{item.operator_name}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.title}}</div>
						<div class="p-particular">{{item.examExplain}}</div>
					</div>
					<div class="time">{{item.createDate}}</div>
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog
		title="修改个人信息"
		:visible.sync="dialogVisibleEditPersonInfo"
		width="600px"
		>
		
			<div>
				<span style="font-size:22pt;">姓名：</span>
				<el-input style="font-size:18pt;"
					placeholder="请输入内容"
					v-model="personalInfo.name">
				</el-input>
			</div>
			<div>
				<span style="font-size:22pt;">邮箱：</span>
				<el-input style="font-size:18pt;"
					placeholder="请输入内容"
					v-model="personalInfo.email">
				</el-input>
			</div>
			<div>
				<span style="font-size:22pt;">性别：</span>
				<el-radio v-model="personalInfo.sex" label="男">男</el-radio>
				<el-radio v-model="personalInfo.sex" label="女">女</el-radio>
			</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="info" @click="dialogVisibleEditPersonInfo = false">取 消</el-button>
			<el-button type="success" @click="editPersonInfo">确 定</el-button>
		</span>
		</el-dialog>

		<el-dialog
		title="修改密码"
		:visible.sync="dialogVisibleEditPersonPwd"
		width="600px"
		>
		<el-form :model="editPwdForm" ref="editPwdForm" :rules="rules" label-width="80px">
			
			<el-form-item label="验证码" prop="editPwdValidCode">
				<el-input
					style="width:200px;"
					placeholder="请输入内容"
					v-model="editPwdForm.editPwdValidCode">
				</el-input>
				<el-button type="success" round :disabled="waitingValidCode" @click="getValidCode">{{reloadWaitingValidCodeTime}}</el-button>
			 </el-form-item>
			 <el-form-item label="旧的密码" prop="oldPwd">
				<el-input
					show-password
					placeholder="请输入内容"
					v-model="editPwdForm.oldPwd">
				</el-input>
			 </el-form-item>
			<el-form-item label="新的密码" prop="newPwd">
				<el-input
					show-password
					placeholder="请输入内容"
					v-model="editPwdForm.newPwd">
				</el-input>
			 </el-form-item>
			 <el-form-item label="重复密码" prop="repeatNewPwd">
				<el-input
					show-password
					placeholder="请输入内容"
					v-model="editPwdForm.repeatNewPwd">
				</el-input>
			 </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="info" @click="dialogVisibleEditPersonPwd = false">取 消</el-button>
			<el-button type="success" @click="editPersonPwd">确 定</el-button>
		</span>
		</el-dialog>

		<el-dialog
		title="修改手机"
		:visible.sync="dialogVisibleEditPersonMobile"
		width="600px"
		>
		<el-form :model="editMobileForm" ref="editMobileForm" :rules="rulesForEditMobile" label-width="80px">
			
			<el-form-item label="验证码" prop="editValidCode">
				<el-input
					style="width:200px;"
					placeholder="请输入内容"
					v-model="editMobileForm.editValidCode">
				</el-input>
				<el-button type="success" round :disabled="waitingValidCode" @click="getValidCode">{{reloadWaitingValidCodeTime}}</el-button>
			 </el-form-item>
			 <el-form-item label="新手机" prop="newMobile">
				<el-input
					placeholder="请输入内容"
					v-model="editMobileForm.newMobile">
				</el-input>
			 </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="info" @click="dialogVisibleEditPersonMobile = false">取 消</el-button>
			<el-button type="success" @click="editPersonMobile">确 定</el-button>
		</span>
		</el-dialog>

	</div>
</template>
<script>
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import md5 from 'js-md5';
	import {
		ApiTagSelectList,
		apiSendSmsCode,
		userLoginOut,
		apiCommonExamSelectList,
		apiUserAccountUpdate,apiUserAccountSelectById,apiUserAccountUpdatePwd,apiUserAccountUpdateMobile
	} from '@/api/api.js'
	export default {
		data() {
			return {
				/**
				 * 个人信息
				 */
				personalInfo:{
					id:null,
					email:null,
					name:null,
					sex:null,
					mobile:null,
					tel:null,
				},
				/**
				 * 显示修改手机dialog
				 */
				dialogVisibleEditPersonMobile:false,
				/**
				 * 获取手机验证码标志
				 */
				waitingValidCode:false,
				/**
				 * 获取手机验证码倒计时
				 */
				reloadWaitingValidCodeTime:"获取验证码",
				/**
				 * 验证信息
				 */
				rules:{
					oldPwd:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
					newPwd:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
					repeatNewPwd:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
					editPwdValidCode:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
				},
				/**
				 * 验证信息
				 */
				rulesForEditMobile:{
					newMobile:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
					editValidCode:[
						{required:true,message:'不能为空', trigger: 'blur'},
					],
				},
				/**
				 * 个人信息修改对话框
				 */
				dialogVisibleEditPersonInfo: false,
				/**
				 * 修改密码对话框
				 */
				dialogVisibleEditPersonPwd: false,
				/**
				 * 修改密码表单
				 */
				editPwdForm: {
					/**
					 * 旧密码
					 */
					oldPwd: "",
					/**
					 * 新密码
					 */
					newPwd: "",
					/**
					 * 新密码
					 */
					repeatNewPwd: "",
					/**
					 * 新手机
					 */
					newMobile: "",
					/**
					 * 手机验证码
					 */
					editPwdValidCode: "",
				},
				/**
				 * 修改手机表单
				 */
				editMobileForm: {
					/**
					 * 旧密码
					 */
					newMobile: "",
					/**
					 * 手机验证码
					 */
					editValidCode: "",
				},
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName: localStorage.getItem('userSchoolName'),
				userGrade: localStorage.getItem('userGrade'),
				color: '',
				endVal1: 6,
				endVal2: 454,
			
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
				paperList:[],
				papers: [
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
				],


				pageSize:6,
				pageNum:1,
				currentPage: 1,
				alltotal:0,
				loadtotal: 0,
				successtotal : 0,
				errortotal:0,
				total:0

			};
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
			handleSizeChange(val) {
				// console.log(val)
				this.pageSize = val
				apiCommonExamSelectList({
					'operator_id':Number(localStorage.getItem('userID')),
					'operator_type': localStorage.getItem('loginUserType'),
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res => {
					this.paperList = res.data.data.list
					this.total= res.data.data.total
					this.currentPage= res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				// console.log(val)
				this.pageNum = val;
				apiCommonExamSelectList({
					'operator_id':Number(localStorage.getItem('userID')),
					'operator_type': localStorage.getItem('loginUserType'),
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res => {
					this.paperList = res.data.data.list
					this.total= res.data.data.total
					this.currentPage= res.data.data.pageNum
				})
			},
			/**
			 * 获取手机验证码
			 */
			getValidCode(){
				if(null == this.personalInfo.mobile || this.personalInfo.mobile == "")
				{
					this.$message.error('请先绑定手机号码再修改个人信息')
					return
				}
				apiSendSmsCode(this.personalInfo.mobile).then(res =>{
					if(res.data.code != "OK")
					{
						this.$message.error('获取验证码错误，请稍候再试')
						return
					}

					this.$message.success('获取验证码成功！')
					return
				})
				this.waitingValidCode = true
				var timeWait = 0
				var checkExec = setInterval(() => {
					timeWait++
					if(timeWait >= 60)
					{
						clearInterval(checkExec);
						this.reloadWaitingValidCodeTime = "获取验证码"
						this.waitingValidCode = false
					}
					else{
						this.reloadWaitingValidCodeTime = 60-timeWait+"秒"
					}
				}, 1000);
			},
			getValue() {
				console.log(this.array_nav)
			},
			// handleSizeChange(val) {
			// this.pageSize = val
			// 	teacherIndex({
			// 		"id":this.id,
			// 		"pageSize":this.pageSize,
			// 		"pageNum":this.pageNum,
			// 		'operator_id':this.userID
			// 	}).then(res=>{
			// 		this.papers = res.data.data.list
			// 		this.total= res.data.data.total
			// 		this.currentPage= res.data.data.pageNum
			// 	})
			// },
			// handleCurrentChange(val) {
			// 	console.log(val)
			// 	this.pageNum = val;
			// 	teacherIndex({
			// 		"pageNum":this.pageNum,
			// 		"pageSize":this.pageSize,
			// 		'operator_id':this.userID
			// 	}).then(res=>{
			// 		this.papers = res.data.data.list
			// 		this.total= res.data.data.total
			// 		this.currentPage= res.data.data.pageNum
			// 	})
			// },
			/**
			 * 显示修改个人信息框
			 */
			showDialogVisibleEditPersonInfo() {
				apiUserAccountSelectById(localStorage.getItem("userID")).then(res => {
					if(!res.data.result)
					{
						this.$message.error('获取用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)

					var myMobile = resResultData.phone

					if(null == myMobile || myMobile == "")
					{
						this.$message.error('请先绑定手机号码再修改个人信息')
						return
					}

					this.personalInfo.id = resResultData.id
					this.personalInfo.email = resResultData.email
					this.personalInfo.mobile = resResultData.phone
					this.personalInfo.name = resResultData.name
					this.personalInfo.tel = resResultData.phone
					this.personalInfo.sex = resResultData.sex

					this.dialogVisibleEditPersonInfo = true
				})
			},
			/**
			 * 修改个人信息
			 */
			editPersonInfo() {
				apiUserAccountUpdate(this.personalInfo).then(res => {
					if(!res.data.result)
					{
						this.$message.error('更新用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)

					this.$message.success('更新用户信息成功')
					localStorage.setItem("userName",this.personalInfo.name)
					this.dialogVisibleEditPersonInfo = false
				})
			},
			/**
			 * 修改个人密码
			 */
			showEditPersonPwdDialog() {

				//初始化数据
				this.oldPwd = null
				this.newPwd = null
				this.newMoble = null
				this.repeatNewPwd = null

				this.dialogVisibleEditPersonPwd = true

			},
			/**
			 * 修改个人密码
			 */
			editPersonPwd() {
				
				if(null == this.personalInfo.mobile || this.personalInfo.mobile == "")
				{
					this.$message.error('请先绑定手机号码再修改个人信息')
					this.dialogVisibleEditPersonPwd = false
					return
				}

				if(this.editPwdForm.repeatNewPwd != this.editPwdForm.newPwd)
				{
					this.$message.error('重复密码错误')
					return
				}

				this.$refs['editPwdForm'].validate((valid) => {
					if (valid) {
						apiUserAccountUpdatePwd({
							"code": this.editPwdForm.editPwdValidCode,
							"newMobile": null,
							"newPwd": md5(this.editPwdForm.newPwd),
							"oldMobile": this.personalInfo.mobile,
							"oldPwd": md5(this.editPwdForm.oldPwd),
						}).then(res =>{
							if(!res.data.result)
							{
								this.$message.error('更新密码失败')
								return
							}

							this.$message.success('更新用户密码成功')
							this.dialogVisibleEditPersonPwd = false

							userLoginOut({}).then(res=>{
								console.log(res.data)
								if(res.data.result){
									localStorage.clear();
									this.$message.success('请重新登录！')
									this.$router.push('/login');
								}else{
										localStorage.clear();
										this.$message.success('请重新登录！')
									// this.$message.error('登出失败！');
									this.$router.push('/login');
								}
							})
							
						})
						
					} else {
						this.$message.error('更新用户密码失败')
						return false;
					}
				});
			},
			/**
			 * 显示修改个人手机对话框
			 */
			showEditPersonMobileDialog() {

				//初始化数据
				this.newMoble = null
				
				this.dialogVisibleEditPersonMobile = true

			},
			/**
			 * 修改个人手机
			 */
			editPersonMobile() {
				
				if(null == this.personalInfo.mobile || this.personalInfo.mobile == "")
				{
					this.$message.error('请先绑定手机号码再修改个人信息')
					this.dialogVisibleEditPersonMobile = false
					return
				}

				this.$refs['editMobileForm'].validate((valid) => {
					if (valid) {
						apiUserAccountUpdateMobile({
							"code": this.editMobileForm.editValidCode,
							"newMobile": this.editMobileForm.newMobile,
							"newPwd": null,
							"oldMobile": this.personalInfo.mobile,
							"oldPwd": null,
						}).then(res =>{
							if(!res.data.result)
							{
								this.$message.error('更新失败')
								return
							}

							this.$message.success('更新成功')
							this.personalInfo.mobile = this.editMobileForm.newMobile
							this.dialogVisibleEditPersonMobile = false
							
							userLoginOut({}).then(res=>{
								console.log(res.data)
								if(res.data.result){
									localStorage.clear();
									this.$message.success('请重新登录！')
									this.$router.push('/login');
								}else{
										localStorage.clear();
										this.$message.success('请重新登录！')
									// this.$message.error('登出失败！');
									this.$router.push('/login');
								}
							})
							
						})
						
					} else {
						this.$message.error('更新失败')
						return false;
					}
				});
			},
			getValue() {
				console.log(this.array_nav)
			},
			// handleSizeChange(val) {
			// 	console.log(`每页 ${val} 条`);
			// },
			// handleCurrentChange(val) {
			// 	console.log(`当前页: ${val}`);
			// },
		},
		mounted() {
			this.color = user().color;

			this.$nextTick(() => {
				apiUserAccountSelectById(localStorage.getItem("userID")).then(res => {
					if(!res.data.result)
					{
						this.$message.error('获取用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)

					this.personalInfo.id = resResultData.id
					this.personalInfo.email = resResultData.email
					this.personalInfo.mobile = resResultData.phone
					this.personalInfo.name = resResultData.name
					this.personalInfo.tel = resResultData.tel
					this.personalInfo.sex = resResultData.sex
				})
			})


			//查询专家数据
			apiCommonExamSelectList({
				'operator_id':Number(localStorage.getItem('userID')),
				'operator_type': localStorage.getItem('loginUserType'),
				"pageSize":999,
				"pageNum":1
			}).then(res => {
				let data = res.data.data.list
				// this.
				
				this.alltotal = res.data.data.total
				this.loadtotal = 0
				this.successtotal = 0
				this.errortotal = 0
				for(var i=0;i<data.length;i++){
					if(data[i].putInto == 0){
						this.errortotal++
					}else if(data[i].putInto == 1){
						this.successtotal++
					}else if(data[i].putInto == 2){
						this.loadtotal++
					}
				}
			})

			//查询专家数据
			apiCommonExamSelectList({
				'operator_id':Number(localStorage.getItem('userID')),
				'operator_type': localStorage.getItem('loginUserType'),
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res => {
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})




		}
	};
</script>
<style scoped src="../../../assets/css/personal.css"></style>
