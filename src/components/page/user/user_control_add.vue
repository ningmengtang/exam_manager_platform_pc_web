<template>
	<div class="box">
		<div class="card-box">
			<div class="card-box-a">
				<div class="title"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增学生账号</div>
				<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-bottom: 20px;">
					<el-form-item label="姓名:">
						<el-input v-model="form.userName" maxlength="10" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="身份证:">
						<el-input v-model="form.idCard" maxlength="18" minlength="18" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="密码:">
						<el-input v-model="form.password" show-password>
						</el-input>
					</el-form-item>
					<el-form-item label="学号:">
						<el-input v-model="form.stuedntNum" maxlength="18" minlength="18" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="性别:">
						<el-select v-model="form.sexDefault" placeholder="请选择">
							<el-option v-for="(item,i) in form.sex" :key="item.i" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="所在学校:">
						<el-select v-model="form.schoolDefault" placeholder="请选择">
							<el-option v-for="(item,i) in form.school" :key="item.i" :label="item.name" :value="{'id':item.id,'sn':item.sn,'schoolName':item.name}">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="班级:">
						<el-select v-model="form.classDefault" placeholder="请选择">
							<el-option v-for="(item,i) in form.class" :key="item.i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="角色:">
						<el-select v-model="form.roleDefault" placeholder="请选择">
							<el-option v-for="(item,i) in form.role" :key="item.i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-top: 40px;">
						<el-button type="primary" :style="{'background-color':'#2CBC62'}" @click="submitForm()">立即创建</el-button>
						<el-button @click="black">取消</el-button>
					</el-form-item>

				</el-form>

			</div>
			<div class="card-box-b">

			</div>
		</div>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		ApiSchoolAccountSelectByOptions,
		ApiClassSelectListByOptions,
		adminAddStuednt
	} from '@/api/api.js';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				color: '',
				checkAll: false,
				isIndeterminate: true,
				search: '',
				value1: '',
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				typeStatus: 'student',
				page: {
					pageNum: 1,
					pageSize: 999,
				},
				userType: [{
						name: '学生',
						type: 'student'
					}, {
						name: '教师',
						type: 'teacher'
					}, {
						name: '学校',
						type: 'school'
					},
					{
						name: '专家',
						type: 'user'
					}, {
						name: '管理员',
						type: 'admin'
					}
				],
				userState: ['全部', '正常', '冻结', '注销'],
				grade: ['全部', '一班', '二班', '三班'],
				classNum: ['全部', '一班', '二班', '三班'],
				checkboxGroup2: ['上海'],
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
					schoolDefault: '',
					school: '',
					stuedntNum: '',

				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				page: {
					pageNum: 1,
					pageSize: 2
				},
				//总条数
				total: 0
			};
		},
		methods: {
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
			},
			searchO() {

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			submit() {
				//go
				this.$router.push('distribution_admin_affirm')
			},
			submitForm() {
				let form = this.form
				let json = {
					name: form.userName,
					id_card: form.idCard,
					password: md5(form.password),
					sex: form.sexDefault,
					schoolName: form.schoolDefault.schoolName,
					schoolId: form.schoolDefault.id,
					schoolSn: form.schoolDefault.sn,
					classesId: form.classDefault,
					code: form.stuedntNum
				}
				console.log(json)
				switch (this.form.roleDefault) {
					case 'student':
						adminAddStuednt(json).then(res => {
							console.log(res)
						})
						break;
				}
			},
			black() {
				this.$router.push('user_control')
			}

		},
		mounted() {
			//查询班级
			ApiClassSelectListByOptions({}).then(res => {
				res.data ? (this.form.class = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})
			//查询学校
			ApiSchoolAccountSelectByOptions(this.page).then(res => {
				res.data ? (this.form.school = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})

		}
	};
</script>

<style scoped src="../../../assets/css/user_control.css"></style>
