<template>
	<div class="box">
		<div class="top">
			<div class="group">
				<div class="row-group">
					<div class="th-group">用户类型</div>
					<div class="td-group" change>
						<el-radio-group v-model="typeStatus" @change="getValue">
							<el-radio-button v-for="(d,k) in userType" :label="d.type" :key="d.k">{{ d.name }}</el-radio-button>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="search">
				<!-- <el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<el-button type="primary" @click="searchO" :style="{ 'background-color': color, 'border-color': color }" class="go">搜索</el-button> -->
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('student')"><span
					 class="el-icon-plus"></span> 新增学生</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('teacher')"><span
					 class="el-icon-plus"></span> 新增教师</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('school')"><span
					 class="el-icon-plus"></span> 新增学校</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('user')"><span
					 class="el-icon-plus"></span> 新增专家</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('admin')"><span
					 class="el-icon-plus"></span> 新增管理员</el-button>
			</div>
		</div>
		<!-- 管理 -->
		<div class="particular">
			<el-table :data="li" :height="tableHeight" style="width: 100%;" highlight-current-row lazy v-loading="loading">
				<el-table-column prop="id" sortable label="ID" width="180">
				</el-table-column>
				<el-table-column prop="name" sortable :label="(typeStatus=='student'?'学生姓名':typeStatus=='teacher'?'教师姓名':typeStatus=='school'?'学校名称':typeStatus=='user'?'专家姓名':'管理员姓名')">
				</el-table-column>
				<el-table-column prop="idCard" sortable label="身份证号码" width="180" v-if="typeStatus=='student'">
				</el-table-column>
				<el-table-column sortable :prop="(typeStatus=='user'||typeStatus=='admin')?'mobilePhone':'mobile'" v-else label="手机号码"
				 width="180">
				</el-table-column>
				<el-table-column sortable prop="schoolName" label="学校" width="180" v-if="typeStatus=='student'||typeStatus=='teacher'">
				</el-table-column>
				//学生年级班级
				<el-table-column prop="classes.grade" sortable v-if="typeStatus=='student'" label="年级" width="180" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="classes.name" sortable v-if="typeStatus=='student'" label="班级" width="180" :key="Math.random()">
				</el-table-column>
				//老师年级班级
				<el-table-column v-if="typeStatus=='teacher'" prop="list_cla.grade" label="年级" width="180" sortable :key="Math.random()">
					<template slot-scope="scope" v-if="typeStatus=='teacher'">
						<div v-for="(data, i) in scope.row.list_cla" :key="data.i">{{data.grade}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="list_cla.name" label="班级" v-if="typeStatus=='teacher'" width="180" sortable :key="Math.random()">
					<template slot-scope="scope" v-if="typeStatus=='teacher'">
						<div v-for="(data, i) in scope.row.list_cla" :key="data.i">{{data.name}}</div>
					</template>
				</el-table-column>
				//学校老师数量学生数量
				<el-table-column prop="teacher_num" v-if="typeStatus=='school'" sortable label="老师数量">
				</el-table-column>
				<el-table-column prop="student_num" v-if="typeStatus=='school'" sortable label="学生数量">
				</el-table-column>
				//管理员角色
				<el-table-column prop="teacher_num" v-if="typeStatus=='admin'" sortable label="管理员角色">
					<template slot-scope="scope" v-if="typeStatus=='admin'">
						<div v-for="(data, i) in scope.row.role_list" :key="data.i" :style="{color:color}">{{data.name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="createDate" sortable label="创建时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="table-icon">
							<el-button class="icon i el-icon-edit-outline ii" :style="{'cursor':'pointer','color':color}" @click="adminChange(scope.row.id)"
							 type="text" size="small">
							</el-button>
							<el-button class="icon i el-icon-close  ii" :style="{'cursor':'pointer','color':color}" @click="deleteLi(scope.row.id);dialogVisible=true"
							 type="text" size="small"></el-button>
						</div>
					</template>

				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确认删除？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false;deleteAffirm=true;deleteLi()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		ApiSchoolAccountSelectByOptions,
		StudentAccountInfo,
		schoolSelectTeacher,
		adminSelectRoleUser,
		adminSelectRoleAdmin,
		adminDeleteStuednt,
		adminDeleteTeacher,
		adminDeleteSchool,
		adminDeleteUser,
		adminDeleteAdmin,
		adminSelectRoleStudentId,
		adminSelectRoleTeacherId,
		adminSelectRoleSchoolId,
		adminSelectRoleUserId,
		adminSelectRoleAdminId,
		adminSelectRoleType
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				checkAll: false,
				isIndeterminate: true,
				tableHeight: 680,
				loading: false,
				array_nav: [], //存储el-chckbox数组
				array_nav2: [], //存储el-chckbox数组
				search: '',
				loading: '',
				value1: '',
				deleteID: '',
				deleteAffirm: false,
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				typeStatus: 'student',
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
				li: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				page: {
					pageNum: 1,
					pageSize: 10
				},
				//总条数
				total: 0
			};
		},
		methods: {
			//获取选择标签的内容
			getValue() {
				switch (this.typeStatus) {
					case 'student':
						this.selectSql(5);
						this.li = []
						break;
					case 'teacher':
						this.selectSql(4);
						this.li = []
						break;
					case 'school':
						this.selectSql(3);
						this.li = []
						break;
					case 'user':
						this.selectSql(1);
						this.li = []
						break;
					case 'admin':
						this.selectSql(2);
						this.li = []
						break;

				}
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);

			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.page.pageNum = val;
				this.getValue();
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
				this.multipleSelection = val;
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
				//go
				this.$router.push('distribution_admin_affirm')
			},
			goAdd(data) {
				this.$router.push({
					path: 'user_control_add',
					query: {
						typeStatus: data
					}
				})
			},
			//删除
			deleteLi(id) {
				if (this.deleteAffirm) {
					this.deleteAffirm = false;
					switch (this.typeStatus) {
						case 'student':
							adminDeleteStuednt(this.deleteID).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql(5);
							break;
						case 'teacher':
							adminDeleteTeacher(this.deleteID).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql(4);
							break;
						case 'school':
							adminDeleteSchool(this.deleteID).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql(3);
							break;
						case 'user':
							adminDeleteUser(this.deleteID).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql(1);
							break;
						case 'admin':
							adminDeleteAdmin(this.deleteID).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql(2);
							break;
					}
				} else {
					this.deleteID = id;
				}
			},
			//修改
			adminChange(data) {
				console.log(data)
				this.$router.push({
					name: 'user_control_change',
					params: {
						id: data,
						typeStatus: this.typeStatus
					}

				})
			},
			//数据查询
			selectSql(id) {
				// "1.专家2.管理员3.学校4.教师5.学生"
				this.loading = true;
				adminSelectRoleType({
					userType: id,
					pageSize: this.page.pageSize,
					pageNum: this.page.pageNum,
				}).then(res => {
					res.data ? (this.loading = false, this.li = res.data.data.list, this.total = res.data.data.total, console.log(
						res)) : this.$message.error(
						'查询超时,请刷新重新查询！')
				})
			}

		},
		mounted() {
			this.color = user().color;
			this.selectSql(5);
			//table高度自适应
			// this.$nextTick(() => {
			//         this.tableHeight = window.innerHeight - 63;
			//         //后面100一般是根据你上下导航栏的高度来减掉即可。
			//     })

		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
<style scoped>
	.synopsis {
		width: 90px;
		max-width: 200px;
	}

	.other {
		font-size: 14px;
		margin: 0 20px;
		color: #999999;
	}
</style>
