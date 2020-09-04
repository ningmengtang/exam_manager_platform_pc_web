<template>
	<div class="box">
		<div class="employ">
			<div class="form-login">
				<div class="form-login-box">
					<div class="title">考试综合管理平台</div>
					<div class="user-face flex">
						<img src="../../../assets/img/img.jpg" class="user-img" />
					</div>
					<el-form class="form" :model="param" :rules="rules" ref="login" label-width="100px" label-position="right">
						<!-- <el-form-item label="国家" prop="country">
							<el-select v-model="param.country" placeholder="请选择国家" class="i">
								<el-option label="中国" value="China"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item prop="username">
							<span slot="label">
								<i class="icon el-icon-user-solid"></i>
							</span>
							<el-input size="medium" :placeholder="placeholder" v-model="param.username" class="i" v-on:blur="vcodeRefresh">
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<span slot="label">
								<i class="icon el-icon-thirdmima"></i>
							</span>
							<el-input show-password size="medium" placeholder="密码" v-model="param.password" class="i">
							</el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code">
							<span slot="label">
								<i class="icon el-icon-thirdyanzhengmatianchong"></i>
							</span>
							<el-input size="medium" placeholder="验证码" v-model="param.code" class="i"></el-input>
							<img class="main_content_login_img_vcode" style="height:32px;width:100px;box-shadow: 0 0 20px 0px rgba(0,0,0,0.2);"
							 :src="vcodeimg" alt="验证码" @click="vcodeRefresh">
						</el-form-item>
						<el-select v-model="value" placeholder="请选择" class="select" @change="identity">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-button type="primary" @click="submitForm()" class="submit">登录</el-button>
					</el-form>
					<!-- <div class="forget">
						<router-link to="/index_student" class="i">忘记了密码</router-link>
					</div> -->
				</div>
			</div>
			<!-- <div class="right-nav">
				<div class="navigation" @click="identity('admin')">管理员登录</div>
				<div class="navigation" @click="identity('user')">专家登录</div>
				<div class="navigation" @click="identity('school')">学校登录</div>
				<div class="navigation" @click="identity('teacher')">教师登录</div>
				<div class="navigation" @click="identity('student')">学生登录</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import axios from 'axios';
	import {
		userCode,
		userLogin
	} from '@/api/api.js'
	export default {
		data: function() {
			return {
				type: 'student',
				placeholder: '账号',
				param: {
					country: '',
					username: '',
					password: '',
					code: '',
				},
				options: [{
					label: '学生',
					value: 'student'
				}, {
					label: '教师',
					value: 'teacher'
				}, {
					label: '学校',
					value: 'school'
				}, {
					label: '专家',
					value: 'user'
				}, {
					label: '管理员',
					value: 'admin'
				}],
				value: '学生',
				vcodeimg: require("../../../assets/img/img_gray_sample.jpg"),
				rules: {
					country: [{
						required: true,
						message: '请选择国家',
						trigger: 'blur',
					}],
					username: [{
							required: true,
							message: '请输入身份证号码',
							trigger: 'change'
						},
						{
							min: 18,
							max: 18,
							pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
							message: '请输入正确的身份证号码',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 5,
							message: '请输入正确的验证码',
							trigger: 'change'
						}
					],

				},
			};
		},
		methods: {
			//身份判断
			identity(name) {
				switch (name) {
					case 'student':
						document.title = '学生-登录';
						break;
					case 'teacher':
						document.title = '老师-登录'
						break;
					case 'school':
						document.title = '学校-登录'
						break;
					case 'user':
						document.title = '专家-登录'
						break;
					case 'admin':
						document.title = '管理员-登录'
						break;
				}
				// console.log(name)
				//记录现在谁登录
				this.type = name;
				// console.log(this.type)
				let type = localStorage.setItem('loginUserType', this.type);
				this.type == 'student' ?
					(this.placeholder = '身份证号码',
						this.param.username = '',
						this.rules.username = [{
								required: true,
								message: '请输入身份证号码',
								trigger: 'change'
							},
							{
								min: 18,
								max: 18,
								pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
								message: '请输入正确的身份证号码',
								trigger: 'blur'
							}
						]
					) :
					(this.placeholder = '手机号码',
						this.param.username = '',
						this.rules.username = [{
								required: true,
								message: '请输入手机号码',
								trigger: 'change'
							},
							{
								min: 11,
								max: 11,
								pattern: /^1[0-9]{10}$/,
								message: '请输入正确的手机证号码',
								trigger: 'blur'
							}
						]
					)
			},
			//获取验证码
			vcodeRefresh() {
				if (this.param.username) {
					this.vcodeimg = "/api/user/account/vcodeimg?key=" + this.param.username + "&d=" + new Date().getTime()
				}
			},
			submitForm() {
				this.$refs.login.validate((valid) => {
					if (valid) {
						let type = localStorage.getItem('loginUserType')
						let form = this.param;
						let data
						type == 'student' ? (data = {
							idCard: form.username,
							passWord: md5(form.password),
							verificationCode: form.code
						}) : data = ({
							mobilePhone: form.username,
							passWord: md5(form.password),
							verificationCode: form.code
						})
						userLogin(`${type}`, data).then(res => {
							let wd = res.data;

							switch (wd.stateCode) {
								case 200:
									//存登录数据

									localStorage.setItem('loginToken', wd.data.token)
									localStorage.setItem('userID', wd.data.id)
									localStorage.setItem('userName', wd.data.name)
									if (wd.data.roleList) {
										localStorage.setItem('roleList', JSON.stringify(wd.data.roleList))
									}

									//判断是否是学生
									if (type == 'student') {
										localStorage.setItem('userSchoolName', wd.data.schoolName)
										localStorage.setItem('userGrade', wd.data.grade)
									}
									//判断是否老师
									if (type == 'teacher') {
										localStorage.setItem('userSchoolName', wd.data.schoolName)
									}
									this.$message.success('登录成功')
									this.$router.push(`/index_${type}`)
									break;
								case 300033:
									this.$message.error('用户已登录')
									break;
								case 300020:
									this.$message.error('验证码错误')
									break;
								case 300049:
									this.$message.error('密码错误')
									break;
								case 300014:
									this.$message.error('用户名不存在');
								default:
									this.$message.error('用户名不存在或者密码错误');
							}
							console.log(wd);
						}).catch(error => {
							console.log(error);
						});

					} else {
						if (this.param.code == 'null' || this.param.code == '') {
							this.$message.error('请输入验证玛');
							return false
						} else {
							this.$message.error('请输入账号和密码');
							return false
						}

					}
				})
			},
			getCookie(name) {
				//取出cookie   
				var strCookie = document.cookie;
				//cookie的保存格式是 分号加空格 "; "  
				var arrCookie = strCookie.split("; ");
				for (var i = 0; i < arrCookie.length; i++) {
					var arr = arrCookie[i].split("=");
					if (arr[0] == name) {
						return unescape(arr[1]);
					}
				}
				return "";
			},
			setCookie(name, value) {
				if (value) {
					var days = 1; //定义一天
					var exp = new Date();
					exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
					// 写入Cookie, toGMTString将时间转换成字符串
					document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString;
					// document.cookie.Expires = DateTime.Now.AddDays(1)
				}
			}
		},
		mounted() {
			let loginUserType = localStorage.getItem('loginUserType');
			// this.setCookie('p',65);
			let HistoryUserType = this.getCookie('HistoryUserType');
			if (!loginUserType) {
				if (HistoryUserType) {
					localStorage.setItem('loginUserType', HistoryUserType);
				} else {
					localStorage.setItem('loginUserType', this.type);
				}

			}
			if (HistoryUserType) {
				this.value = HistoryUserType;
				this.identity(HistoryUserType)
			}

			// userCode().then(res => this.vcodeimg = window.URL.createObjectURL(res.data))
		}
	};
</script>

<style scoped>
	img {
		width: 100%;
		height: 100%;
	}

	input {
		background: none;
		border: none;
		outline: none;
	}

	a {
		text-decoration: none
	}

	a:hover {
		text-decoration: none;
	}

	.box {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../../../assets/img/login.png);
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.employ {
		display: flex;
		position: relative;
	}

	.form-login {
		width: 331px;
		background-color: rgb(249, 249, 249);
		border-radius: 20px;
		box-shadow: 0px 0px 20px 0px rgb(25, 18, 18, );
		filter: alpha(opacity=90);
		-moz-opacity: 0.9;
		-khtml-opacity: 0.9;
		opacity: 0.9;
	}

	.form-login-box {
		padding: 40px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.form {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.icon {
		font-size: 14px;
	}

	.form>>>.el-input__inner,
	.el-checkbox__inner,
	.el-textarea__inner,
	.el-button {
		background: none;
		border: none;
		outline: none;
	}

	.form>>>.i .el-input__inner {
		padding: 0;
		line-height: 36px;
	}

	.form>>>.el-form-item__label,
	.el-input--medium .el-input__inner {
		text-align: center;
		line-height: 36px;
		height: 36px;
	}

	.form>>>.el-select {
		line-height: 36px;
		height: 36px;
	}

	.select>>>.el-input__inner {
		text-align: center;
		border-bottom: 1px solid rgb(48, 49, 51);
	}

	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26px;
		color: #9c8989;
	}

	.user-face {
		width: 100%;
		margin: 20px 0;
	}

	.user-face .user-img {
		width: 82px;
		height: 82px;
		border-radius: 50%;
	}

	.row {
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 5px;
		padding: 10px 0;
		width: 100%;
	}



	.row .remind {
		margin-right: 24px;
		margin-left: 10px;
		font-size: 16px;
	}

	.row .username,
	.password {
		font-size: 14px;
		color: rgb(128, 128, 128);
	}

	.submit {
		border-radius: 20px;
		width: 200px;
		height: 36px;
		color: #FFFFFF;
		font-size: 14px;
		background-color: rgb(153, 153, 153);
		filter: alpha(opacity=100);
		-moz-opacity: 1;
		-khtml-opacity: 1;
		opacity: 1;
		margin-top: 8px;
	}

	.forget {
		margin-top: 14px;
	}

	.forget .i {
		font-size: 13px;
		color: rgb(65, 26, 26);
	}

	.right-nav {
		width: 200px;
		position: absolute;
		margin-left: 379px;
	}

	.navigation:first-child {
		margin-top: 255px;
	}

	.right-nav .navigation {
		width: 100%;
		border-radius: 18px;
		color: #FFFFFF;
		text-align: center;
		font-size: 14px;
		background-color: rgb(153, 153, 153);
		padding: 8px 0;
		display: block;
		cursor: pointer;
	}

	.navigation+.navigation {
		margin-top: 16px;
	}


	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slectColor {
		background-color: #409EFF;
	}
</style>
