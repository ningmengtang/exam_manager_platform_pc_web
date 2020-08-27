<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<div class="title"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增{{form.roleDefault}}</div>
					<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
					<div class="user-top">
						<div class="username">
							<!-- <div class="name">小明</div>
							<div class="user-id">ID:6556565</div> -->
							<div class="identity" :style="{'background-color':color}">{{form.roleDefault}}</div>
							<div class="message">
								<div class="school">{{school}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<el-form ref="form" :model="form" :rules="rules" label-width="100px" class="form">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="form.userName" maxlength="20" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="学号:" prop="stuedntNum" v-if="typeStatus=='student'">
					<el-input v-model="form.stuedntNum" maxlength="18" minlength="18" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="身份证:" prop="idCard" v-if="typeStatus=='student'">
					<el-input v-model="form.idCard" maxlength="18" minlength="18" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="mobile" v-else>
					<el-input v-model="form.mobile" maxlength="11" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="性别:" prop="sex">
					<el-select v-model="form.sexDefault" placeholder="请选择">
						<el-option v-for="(item,i) in form.sex" :key="item.i" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input v-model="form.password" show-password>
					</el-input>
				</el-form-item>
				<el-form-item label="班级:" prop="class" v-if="typeStatus=='student'">
					<el-select v-model="form.classDefault"  placeholder="请选择" @visible-change="classList">
						<el-option v-for="(item,i) in form.class" :key="item.i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班级:" prop="class" v-else>
					<el-select v-model="form.classDefault" multiple placeholder="请选择" @visible-change="classList">
						<el-option v-for="(item,i) in form.class" :key="item.i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="bottom-box">
				<el-button class="bottom-i" @click="submitForm">确认新增</el-button>
				<el-button class="bottom-i" style="background-color: #FFFFFF;color: #2BBB61;" @click="black()">取消新增</el-button>
			</div>

		</div>
		<!-- 中间 -->
		<!-- 	<div class="middle-box">
			<div class="message-top" :style="{'border-color':color}">负责班级</div>
			<div class="message-box">
				<div class="i">1.2017年2班班主任、语文老师、英语老师 </div>
				<div class="i">1.2017年2班班主任、语文老师、英语老师 </div>
				<div class="bottom-box">
					<el-button class="bottom" @click="goClass()">分配班级</el-button>
				</div>
			</div>
		</div> -->
		<!-- 右边 -->
		<!-- <div class="right-box">
			<div class="message-top" :style="{'border-color':color}">是否冻结账号</div>
			<div class="message-box">
				<el-switch style="display: block" v-model="value2" active-color="#13ce66" inactive-color="#F0F0F0" active-text="是"
				 inactive-text="否">
				</el-switch>
				<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-top: 20px;">
					<el-form-item label="手机号:">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
				</el-form>
				<div class="message-top" :style="{'border-color':color}">修改密码</div>
				<el-switch style="display: block" v-model="value3" active-color="#13ce66" inactive-color="#F0F0F0" active-text="是"
				 inactive-text="否">
				</el-switch>
				<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-top: 20px;">
					<el-form-item label="旧密码:">
						<el-input v-model="form.passsword"></el-input>
					</el-form-item>
					<el-form-item label="新密码:">
						<el-input v-model="form.reusePassword"></el-input>
					</el-form-item>
				</el-form>
				<div class="bottom-box">
					<el-button class="bottom-i" @click="black()">确认修改</el-button>
					<el-button class="bottom-i ii" @click="black()">取消修改</el-button>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import {
		schoolAddTeacher,
		adminAddStuednt,
		ApiClassSelectListByOptions,
		adminSelectRoleSchoolId
	} from '@/api/api.js';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				color: '',
				currentPage: 1,
				school: localStorage.getItem('userName'),
				schoolId: localStorage.getItem('userID'),
				schoolSn:'',
				schoolName:'',
				typeStatus: this.$route.query.typeStatus,
				value2: true,
				value3: true,
				percentage: 50,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
				value1: '',
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
				rules: {
					idCard: [{
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
					mobile: [{
							required: true,
							message: '请输入',
							trigger: 'change'
						},
						{
							min: 11,
							max: 11,
							pattern: /^1[0-9]{10}$/,
							message: '请输入正确的手机证号码',
							trigger: 'blur'
						}
					],
					userName: [{
						required: true,
						message: '请输入名字',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],

					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
				},
				form: {
					username: '',
					sexDefault: '男',
					sex: ['男', '女'],
					role: '',
					school: '',
					type: '',
					phone: '',
					password: '',
					personnel: '',
					site: '',
					roleDefault: '',
					classDefault: '',
					class: '',
				},
				dialogTableVisible: false,
				dialogTableVisible2: false,
			};
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			// 提交表单
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let form = this.form
						switch (this.$route.query.typeStatus) {
							case 'student':
								adminAddStuednt({
									name: form.userName,
									idCard: form.idCard,
									password: md5(form.password),
									sex: form.sexDefault,
									schoolName: this.schoolName,
									schoolId: this.schoolId,
									schoolSn: this.schoolSn,
									classesId: form.classDefault,
									code: form.stuedntNum
								}).then(res => {
									// console.log(form.classDefault)
									this.$message.success('添加学生账号成功')
									this.black()
								})
								break;
							case 'teacher':
								let json = {
									name: form.userName,
									sex: form.sexDefault,
									passsword: md5(form.password),
									schoolId: this.schoolId,
									mobile: form.mobile
								}

								schoolAddTeacher(json).then(res => {
									this.$message.success('添加教师账号成功')
									this.black();
								})
								break;
						}


					} else {
						this.$message.error('请填完必填输入框');
					}
				})
			},
			goAdd() {
				this.$router.push(`/order_school`)

			},
			black() {
				this.$router.push(`/manage_school_subordinate`)
			},
			goClass() {
				this.$router.push(`/manage_school_class`)
			},
			//修改
			TeacherChange(data) {
				this.$router.push({
					name: 'user_control_change',
					params: {
						id: data,
					}

				})
			},
			// 选择班级事件
			classList() {
				if (this.form.class == '') {
					this.$message.error('请先选择学校')
				}
			}
		},
		mounted() {
			this.color = user().color;
			ApiClassSelectListByOptions({
				schoolId: this.schoolId
			}).then(res => {
				res.data ? (this.form.class = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})
			adminSelectRoleSchoolId(this.schoolId
			).then(res => {
				console.log(res.data.data.id)
                 this.schoolSn=res.data.data.sn
				 this.schoolName=res.data.data.name
			})
			
			switch (this.typeStatus) {
				case 'student':
					this.form.roleDefault = '学生'
					break;
				case 'teacher':
					this.form.roleDefault = '教师'
					break;

			}
		}
	};
</script>
<style scoped src="../../../assets/css/manage-add.css"></style>
