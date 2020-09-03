<template>
	<div class="box">
		<div class="card-box">
			<div class="card-box-a">
				<div class="title"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增{{form.roleDefault}}账号</div>
				<el-form class="form" :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
					<el-form-item :label="form.roleDefault+'名称:'" prop="userName">
						<el-input v-model="form.userName" maxlength="20" show-word-limit>
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
					<el-form-item label="密码:" prop="password">
						<el-input v-model="form.password" show-password>
						</el-input>
					</el-form-item>
					<el-form-item label="学校编号:" prop="schoolCode" v-if="typeStatus=='school'">
						<el-input v-model="form.schoolCode"  >
						</el-input>
					</el-form-item>
					<el-form-item label="学号:" prop="stuedntNum" v-if="typeStatus=='student'">
						<el-input v-model="form.stuedntNum" maxlength="18" minlength="18" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="性别:" prop="sex" v-if="typeStatus!='school'">
						<el-select v-model="form.sexDefault" placeholder="请选择">
							<el-option v-for="(item,i) in form.sex" :key="item.i" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所在学校:" prop="school" v-if="typeStatus!='school'&&typeStatus!='user'&& typeStatus!='admin'">
						<el-select v-model="form.schoolDefault" placeholder="请选择" @change="schoolList">
							<el-option v-for="(item,i) in form.school" :key="item.i" :label="item.name" :value="[{'id':item.id,'sn':item.sn,'schoolName':item.name}]">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班级:" prop="class" v-if="typeStatus=='student'">
						<el-select v-model="form.classDefault"   placeholder="请选择" @visible-change="classList">
							<el-option v-for="(item,i) in form.class" :key="item.i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班级:" prop="class" v-if="typeStatus=='teacher'">
						<el-select v-model="form.classDefault"  multiple placeholder="请选择" @visible-change="classList">
							<el-option v-for="(item,i) in form.class" :key="item.i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="管理员角色:" prop="sex" v-if="typeStatus=='admin'">
						<el-select v-model="form.adminRoleDefault" multiple placeholder="请选择">
							<el-option v-for="(item,i) in form.adminRole" :key="item.i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="角色:" prop="roleDefault">

						<el-input v-model="form.roleDefault" disabled>
						</el-input>
					</el-form-item>
					<el-form-item style="margin-top: 40px;">
						<el-button type="primary" :style="{'background-color':'#2CBC62'}" @click="submitForm()">立即创建</el-button>
						<el-button @click="black">取消</el-button>
					</el-form-item>

				</el-form>

			</div>
			
		</div>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		ApiSchoolAccountSelectByOptions,
		ApiClassSelectListByOptions,
		adminAddStuednt,
		adminAddTeacher,
		adminAddSchool,
		adminAddUser,
		adminAddAdmin,
		adminSelectRoleadminPower,
	} from '@/api/api.js';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				color: '',
				checkAll: false,
				isIndeterminate: true,
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				typeStatus: 'student',
				page: {
					pageNum: 1,
					pageSize: 999,
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
					stuedntNum: [{
						required: true,
						message: '请输入学号',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
					school: [{
						required: true,
						message: '请选择学校',
						trigger: 'blur'
					}],
					class: [{
						required: true,
						message: '请选择班级',
						trigger: 'blur'
					}],
					schoolCode:[{
						required: true,
						message: '请输入学校编号',
						trigger: 'blur'
					}]



				},
				form: {
					userName: '',
					idCard: '',
					password: '',
					sexDefault: '男',
					sex: ['男', '女'],
					classDefault: '',
					class: '',
					roleDefault: '学生',
					role: [{
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
					rolename:0,
					schoolDefault: '',
					school: '',
					stuedntNum: '',
					mobile: '',
					schoolCode:'',
					adminRoleDefault: [],
					adminRole: '',

				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				page: {
					pageNum: 1,
					pageSize: 999
				},
				//总条数
				total: 0,
				typeStatus: this.$route.query.typeStatus
			};
		},
		methods: {
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 选择学校事件
			schoolList(val) {
				let schoolId = this.form.schoolDefault[0].id;
				this.form.classDefault = '';
				//查询班级
				ApiClassSelectListByOptions({
					schoolId: schoolId
				}).then(res => {
					res.data ? (this.form.class = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
						'查询超时,请刷新重新查询！')
				})
			},
			// 选择班级事件
			classList() {
				if (this.form.class == '') {
					this.$message.error('请先选择学校')
				}
			},
			submit() {
				//go
				this.$router.push('distribution_admin_affirm')
			},
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let form = this.form
						// let json = {
						// 	name: form.userName,
						// 	id_card: form.idCard,
						// 	password: md5(form.password),
						// 	sex: form.sexDefault,
						// 	schoolName: form.schoolDefault[0].schoolName,
						// 	schoolId: form.schoolDefault[0].id,
						// 	schoolSn: form.schoolDefault[0].sn,
						// 	classesId: form.classDefault,
						// 	code: form.stuedntNum
						// }
						switch (this.$route.query.typeStatus) {
							case 'student':
								adminAddStuednt({
									name: form.userName,
									idCard: form.idCard,
									password: md5(form.password),
									sex: form.sexDefault,
									schoolName: form.schoolDefault[0].schoolName,
									schoolId: form.schoolDefault[0].id,
									schoolSn: form.schoolDefault[0].sn,
									classesId: form.classDefault,
									code: form.stuedntNum
								}).then(res => {
									this.$message.success('添加学生账号成功')
									this.black()
								})
								break;
							case 'teacher':
								adminAddTeacher({
									name: form.userName,
									mobile: form.mobile,
									password: md5(form.password),
									sex: form.sexDefault,
									schoolId: form.schoolDefault[0].id,
									classesId:form.classDefault
								}).then(res => {
									this.$message.success('添加教师账号成功')
									this.black()
								})
								break;
							case 'school':
								adminAddSchool({
									name: form.userName,
									mobile: form.mobile,
									password: md5(form.password),
									code:form.schoolCode
								}).then(res => {
									this.$message.success('添加学校账号成功')
									this.black()
								})
								break;
							case 'user':
								adminAddUser({
									mobilePhone: form.mobile,
									name: form.userName,
									password: md5(form.password),
									sex: form.sexDefault,
								}).then(res => {
									this.$message.success('添加专家账号成功')
									this.black()
								})
								break;
							case 'admin':
							var a = this.form.adminRoleDefault;
							let arr = []
							a.map((x, i) => {
								let json = {};
								json['roleId'] = a[i]
								arr.push(json)
							})
							
							adminAddAdmin({
								mobilePhone: form.mobile,
								name: form.userName,
								password: md5(form.password),
								sex: form.sexDefault,
								type:'admin',
								adminRoles:arr
							}).then(res => {
								this.$message.success('添加管理员账号成功')
								this.black()
							})
								break;
						}
					} else {
						this.$message.error('请填完必填输入框');
					}
				})

			},
			black() {
				this.$router.push('user_control')
			},
			// 查看角色
			SelectRoleadminPower(data){
				 adminSelectRoleadminPower({name:data}).then(res=>{
					console.log(res)
				})
			}

		},
		mounted() {
           let form = this.form
			switch (this.$route.query.typeStatus) {
				case 'student':
					this.form.roleDefault = '学生'
					this.SelectRoleadminPower('学生')
					break;
				case 'teacher':
					this.form.roleDefault = '教师'
					break;
				case 'school':
					this.form.roleDefault = '学校'
					break;
				case 'user':
					this.form.roleDefault = '专家'
					break;
				case 'admin':
				//查询全部角色
				adminSelectRoleadminPower({
					"isAdmin": true
				}).then(res => {
					form.adminRole = res.data.data.list;
				})
					this.form.roleDefault = '管理员'
					break;

			}
              this.SelectRoleadminPower();
			//查询学校
			ApiSchoolAccountSelectByOptions(this.page).then(res => {
				res.data ? (this.form.school = res.data.data.list, this.total = res.data.data.total,console.log(res)) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})
		}
	};
</script>

<style scoped src="../../../assets/css/user_control.css"></style>
