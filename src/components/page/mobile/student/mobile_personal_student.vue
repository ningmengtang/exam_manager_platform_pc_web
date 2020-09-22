<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{userName}}</div>
							<div class="user-id">ID:{{userID}}</div>
							<div class="identity">学生</div>
							<div class="message">
								<div class="school">{{userSchoolName}}</div>
								<div class="grade">年级：{{userGrade}}</div>
								<div class="grade">班级：{{classes}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="change-box">
				<div class="li" @click="showDialogVisibleEditPersonInfo" v-if="null != personalInfo.mobile">
					<i class="icon el-icon-user-solid"></i>
					<div class="name-change">个人信息</div>
				</div>
				<div class="li" @click="dialogVisibleEditPersonPwd = true" v-if="null != personalInfo.mobile">
					<i class="icon el-icon-thirdmima"></i>
					<div class="name-change">修改密码</div>
				</div>
				<div class="li" @click="showEditPersonMobileDialog" v-if="null != personalInfo.mobile">
					<i class="icon el-icon-thirdshouji"></i>
					<div class="name-change">修改手机</div>
				</div>
				<div class="li" @click="showBindPersonMobileDialog" v-if="null == personalInfo.mobile">
					<i class="icon el-icon-thirdshouji"></i>
					<div class="name-change">绑定手机</div>
				</div>
				
			</div>
			<div>
				<el-button class="button" @click="outLogin">退出登录</el-button>
			</div>
		</div>

		<el-dialog
		title="修改个人信息"
		:visible.sync="dialogVisibleEditPersonInfo"
		width="300px"
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
		width="100%"
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
		width="100%"
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

		<el-dialog
		title="绑定手机"
		:visible.sync="dialogVisibleBindPersonMobile"
		width="100%"
		>
		<el-form :model="bindMobileForm" ref="bindMobileForm" :rules="rulesForBindMobile" label-width="80px">
		
			 <el-form-item label="新手机" prop="mobile">
				<el-input
					placeholder="请输入内容"
					v-model="bindMobileForm.mobile">
				</el-input>
			 </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="info" @click="dialogVisibleBindPersonMobile = false">取 消</el-button>
			<el-button type="success" @click="bindPersonMobile">确 定</el-button>
		</span>
		</el-dialog>
        <Tabbar />
	</div>
</template>
<script>
	import Tabbar from '../common/tabbar.vue'
	import { Toast,Dialog } from 'vant';
	import mobile from '@/assets/js/mobile.js'
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import md5 from 'js-md5';
	import {
		StudentAccountInfo,
		studentIndex,
		paperWithTag,
		apiStudentAccountUpdate,apiStudentAccountSelectById,apiStudentAccountUpdatePwd,apiStudentAccountUpdateMobile,
		apiSendSmsCode,userLoginOut,apiStudentAccountBindMobile
	} from '@/api/api.js'
	export default {
		created() {
			mobile();
		},
		data() {
			return {
				/**
				 * 显示绑定手机dialog
				 */
				dialogVisibleBindPersonMobile:false,
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
				 * 验证信息
				 */
				rulesForBindMobile:{
					mobile:[
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
					 * 手机
					 */
					newMobile: "",
					/**
					 * 手机验证码
					 */
					editValidCode: "",
				},
				/**
				 * 绑定手机表单
				 */
				bindMobileForm: {
					/**
					 * 手机
					 */
					mobile: "",
				},
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
					idCard:null,
				},
				/**
				 * 页面显示个人信息
				 */
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName: localStorage.getItem('userSchoolName'),
				userGrade: localStorage.getItem('userGrade'),
				pageSize:4,
				pageNum:1,
				total:0,
				currentPage:1,
				paperList:[],
				DisStatusList:[],
				ElementTextList:[],
				PurposeList:[],
				SubjectList:[],
				GradeList:[],
				VersionList:[],
				YearsList:[],
				disStatus:0,
				elementTest:0,
				purpose:0,
				subject:0,
				grade:0,
				version:0,
				years:0,
				obj:[],
				endVal1: 6,
				endVal2: 454,
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName:localStorage.getItem('userSchoolName'),
				userGrade:localStorage.getItem('userGrade'),
				total: 0,
				total1: 0,
				pageSize1: 6,
				pageNum1: 1,
                currentPage:0,
				download: 0,
				disabled: 0,
				classes:'',

				style: {
					card_2: 'background-color: #41dde3;',
					card_3: 'background-color: #e35841;',
					pStatus: 'color:#e2633b'
				},
				papers: []
			};
		},
		components: {
			Schart,
			ICountUp,
			Tabbar
		},
		methods: {
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
			handleSizeChange(val) {
			this.pageSize = val
			teacherIndex({
				"id":this.id,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum,
				'operator_id':this.userID,
				'operator_type':localStorage.getItem('loginUserType')
			}).then(res=>{
				this.papers = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNum = val;
				teacherIndex({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize,
					'operator_id':this.userID,
					'operator_type':localStorage.getItem('loginUserType')
				}).then(res=>{
					this.papers = res.data.data.list
					this.total= res.data.data.total
					this.currentPage= res.data.data.pageNum
				})
			},
			/**
			 * 显示修改个人信息框
			 */
			showDialogVisibleEditPersonInfo() {
				apiStudentAccountSelectById(localStorage.getItem("userID")).then(res => {
					if(!res.data.result)
					{
						this.$message.error('获取用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)

					var myMobile = resResultData.tel

					if(null == myMobile || myMobile == "")
					{
						this.$message.error('请先绑定手机号码再修改个人信息')
						return
					}

					this.personalInfo.id = resResultData.id
					this.personalInfo.email = resResultData.email
					this.personalInfo.mobile = resResultData.tel
					this.personalInfo.name = resResultData.name
					this.personalInfo.tel = resResultData.tel
					this.personalInfo.sex = resResultData.sex
					this.personalInfo.idCard = resResultData.idCard

					this.dialogVisibleEditPersonInfo = true
				})
			},
			/**
			 * 修改个人信息
			 */
			editPersonInfo() {
				apiStudentAccountUpdate(this.personalInfo).then(res => {
					if(!res.data.result)
					{
						this.$message.error('更新用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)

					this.$message.success('更新用户信息成功')
					this.localStorage.setItem("userName",this.personalInfo.name)
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
						apiStudentAccountUpdatePwd({
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
			 * 显示修改个人绑定手机对话框
			 */
			showBindPersonMobileDialog() {

				//初始化数据
				//this.newMoble = null
				
				this.dialogVisibleBindPersonMobile = true

			},
			/**
			 * 绑定个人手机
			 */
			bindPersonMobile() {
				
				this.$refs['bindMobileForm'].validate((valid) => {
					if (valid) {
						apiStudentAccountBindMobile({
							"idCard": this.personalInfo.idCard,
							"mobile": this.bindMobileForm.mobile,
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
						apiStudentAccountUpdateMobile({
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			//改变时
			handleSizeChange(val) {
				this.pageSize1 = val;
				studentIndex({
					"pageNum": this.pageNum1,
					"pageSize": this.pageSize1
				}).then(res => {
					this.papers = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			//条目改变时
			handleCurrentChange(val) {
				this.pageNum1 = val;
				studentIndex({
					"pageNum": this.pageNum1,
					"pageSize": this.pageSize1
				}).then(res => {
					this.papers = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			userInfo() {
				StudentAccountInfo({
					"id": this.userID
				}).then(res => {
					if (res.data.data.list) {
						this.userInfoList = res.data.data.list[0]
						console.log(res)

					} else {
						this.$message.error('查询不到个人信息')
					}
				})
			},
			// 修改密码
			userUpdatePwd() {
			},
			//设置cookie时间
			setCookie(name, value) {
				if (value) {
					var Days = 1;
					var exp = new Date(); 
					exp.setTime(exp.getTime() + Days*24*60*60*1000);
					document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
				}
			},
			// 退出登录
			outLogin(){
				var token = localStorage.getItem('loginToken');
				userLoginOut({}).then(res => {
					console.log(res.data)
					if (res.data.result) {
						this.setCookie('HistoryUserType',this.loginUserType)
						localStorage.clear();
						this.$message.success('登出成功！')
						this.$router.push('/login');
					} else {
						localStorage.clear();
						// this.$message.error('登出失败！');
						this.$router.push('/login');
					}
				})
			}
		},
		mounted() {
			//获取用户信息
			let userID = this.userID;
			if (userID) {
				this.userID = userID
			} else {
				this.$message.error('查询不到个人信息')
			}
			//查询个人信息
			StudentAccountInfo({
				"id": this.userID
			}).then(res => {
				if (res.data.data.list) {
					this.userInfoList = res.data.data.list[0]
					// console.log(res)

				} else {
					this.$message.error('查询不到个人信息')
				}
			})
			// 统计数据全部数据
			this.total = 0
			this.download = 0
			this.disabled = 0
			studentIndex({
				"pageNum": 1,
				"pageSize": 999
			}).then(res => {
				if (res.data.data.list) {
					// }
					this.total = res.data.data.total
					this.disabled = res.data.data.disabled
					this.download = res.data.data.download
				}
			})
			paperWithTag({
				"id":[],
				"pageNum": this.pageNum,
				"pageSize": this.pageSize
			}).then(res=>{
				console.log(res.data.data)
				//赋给试卷管理试卷
				this.papers=res.data.data.list
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})

			this.$nextTick(() => {
				apiStudentAccountSelectById(localStorage.getItem("userID")).then(res => {
					if(!res.data.result)
					{
						this.$message.error('获取用户信息失败')
						return
					}
					var resResultData = res.data.data

					console.log(resResultData)
                    this.classes=resResultData.classes.name
					this.personalInfo.id = resResultData.id
					this.personalInfo.email = resResultData.email
					this.personalInfo.mobile = resResultData.tel
					this.personalInfo.name = resResultData.name
					this.personalInfo.tel = resResultData.tel
					this.personalInfo.sex = resResultData.sex
					this.personalInfo.idCard = resResultData.idCard

				})
			})
		}
	};
</script>
<style scoped src="../../../../assets/css/personal.css"></style>
<style scoped>
	.box{padding: .3rem;margin-bottom: 52px;}
	.left-box{width: 100%;min-height: 100%;}
	.button{padding: .3rem 1rem;color: #FFFFFF;font-size: 18px;font-weight: bold;background-color: #E2633B;}
</style>
