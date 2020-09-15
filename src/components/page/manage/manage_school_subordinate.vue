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
				<el-button type="primary" @click="searchO" :style="{ 'background-color': color, 'border-color': color }">搜索</el-button> -->
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('student')"><span
					 class="el-icon-plus"></span> 新增学生</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd('teacher')"><span
					 class="el-icon-plus"></span> 新增教师</el-button>
			</div>
		</div>
		<!-- 管理 -->
		<div class="particular">
			<div class="select_box">
				<el-select v-model="gradeDefault" placeholder="请选择年级" class="ll" clearable @change="selectCondition">
					<el-option v-for="(item,i) in classes" :key="item.i" :label="item.grade" :value="item.grade">
					</el-option>
				</el-select>
				<el-select v-model="classDefault" placeholder="请选择班级" class="ll" clearable @change="selectCondition">
					<el-option v-for="(item,i) in classes" :key="item.i" :label="item.name" :value="item.sort">
					</el-option>
				</el-select>
			</div>
			<el-table v-loading="loading" :data="li" :height="680" style="width: 100%" header-cell-class-name="table-header">
				<el-table-column prop="id" sortable label="ID" width="180">
				</el-table-column>
				<el-table-column prop="name" sortable :label="(typeStatus=='student'?'学生姓名':'教师姓名')">
				</el-table-column>
				<el-table-column prop="idCard" sortable label="身份证号码" width="180" v-if="typeStatus=='student'">
				</el-table-column>
				<el-table-column prop="mobile" sortable label="手机号码" width="180" v-if="typeStatus=='teacher'">
				</el-table-column>
				<el-table-column prop="schoolName" sortable label="学校" width="180" v-if="typeStatus=='student'||typeStatus=='teacher'">
				</el-table-column>
				//学生年级班级
				<el-table-column prop="classes.grade" sortable v-if="typeStatus=='student'" label="年级" width="180" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="classes.name" sortable v-if="typeStatus=='student'" label="班级" width="180" :key="Math.random()">
				</el-table-column>
				//老师年级班级
				<el-table-column v-if="typeStatus=='teacher'" prop="list_cla.grade" label="年级" sortable width="180" :key="Math.random()">
					<template slot-scope="scope" v-if="typeStatus=='teacher'">
						<div v-for="(data, i) in scope.row.list_cla" :key="data.i">{{data.grade}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="list_cla.name" label="班级" v-if="typeStatus=='teacher'" sortable width="180" :key="Math.random()">
					<template slot-scope="scope" v-if="typeStatus=='teacher'">
						<div v-for="(data, i) in scope.row.list_cla" :key="data.i">{{data.name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="createDate" sortable label="创建时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="table-icon">
							<el-button class="icon i el-icon-edit-outline ii" :style="{'cursor':'pointer','color':color}" @click="teacherChange(scope.row.id)"
							 type="text" size="small">
							</el-button>
							<el-button class="icon i el-icon-close  ii" :style="{'cursor':'pointer','color':color}" @click="deleteLi(scope.row.id)"
							 type="text" size="small"></el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
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
				<el-button type="primary" @click="deleteAffirm=true;deleteLi()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		schoolSelectTeacher,
		adminDeleteTeacher,
		StudentAccountInfo,
		adminDeleteStuednt,
		adminSelectRoleType,
		selectListByOptions
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				loading: true,
				schoolId: localStorage.getItem('userID'),
				tableHeight: 680,
				checkAll: false,
				isIndeterminate: true,
				disStatus: '',
				deleteAffirm:false,
				DisStatusList: ['正常', '冻结', '注销'],
				search: '',
				value1: '',
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				deleteId:'',
				class1: [],
				class2: [],
				classes: '',
				gradeDefault: '',
				classDefault: '',
				student: [1, 2, 3, 4, 5],
				checkboxGroup2: ['上海'],
				page: {
					pageNum: 1,
					pageSize: 10
				},
				array_nav2: [],
				array_nav3: [],
				array_nav4: {},
				total: 0,
				li: [],
				typeStatus: 'student',
				userType: [{
					name: '学生',
					type: 'student'
				}, {
					name: '教师',
					type: 'teacher'
				}],
				tableData: [{
					date: '1',
					name: '王小虎',
					grade: '一年级',
					class: '1'
				}, {
					date: '2',
					name: '王小虎',
					grade: '二年级',
					class: '1'
				}, {
					date: '3',
					name: '王小虎',
					grade: '三年级',
					class: '1'
				}, {
					date: '4',
					name: '王小虎',
					grade: '四年级',
					class: '1'
				}],
				dialogTableVisible: false,
				dialogFormVisible: false,
			};
		},
		methods: {
			//获取选择标签的内容
			getValue() {
				switch (this.typeStatus) {
					case 'student':
						this.selectSql('student')
						this.li = [];
						break;
					case 'teacher':
						this.selectSql('teacher')
						this.li = [];
						break;
				}
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.page.pageNum = val;
				this.getValue();
			},
			searchO() {

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
				//关闭窗口
				this.dialogTableVisible = false;
			},
			goAdd(data) {
				this.$router.push({
					path: 'manage_school_add',
					query: {
						typeStatus: data
					}
				})

			},
			// 删除
			deleteLi(id) {
				this.dialogVisible=true
				if(this.deleteAffirm){
					switch (this.typeStatus) {
						case 'student':
							adminDeleteStuednt(this.deleteId).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql('student')
							this.deleteAffirm=false
							this.dialogVisible=false
							break;
						case 'teacher':
							adminDeleteTeacher(this.deleteId).then(res => {
								this.$message.success('删除成功')
							})
							this.selectSql('teacher')
							this.deleteAffirm=false
							this.dialogVisible=false
							break;
					}
				}else{
					this.deleteId=id
				}
				

			},
			//修改
			teacherChange(data) {
				this.$router.push({
					name: 'manage_school_change',
					params: {
						id: data,
						typeStatus: this.typeStatus
					}

				})
			},
			// 班级查询
			selectClass() {
				selectListByOptions({
					schoolId: this.schoolId
				}).then(res => {
					res.data ? (this.classes = res.data.data.list, console.log(res.data.data)) : this.$message.error(
						'查询超时,请刷新重新查询！')
				})
			},
			//数据查询
			selectSql(type, condition) {
				let json = {
					schoolId: this.schoolId
				}
				if (condition != undefined) {
					json = Object.assign({}, json, condition)
					console.log(json)
				}
				if (type == 'student') {
					this.loading = true
					StudentAccountInfo(json).then(res => {
						res.data ? (this.loading = false, this.li = res.data.data.list, this.total = res.data.data.total, console.log(
							res)) : this.$message.error(
							'查询超时,请刷新重新查询！')
					})
				} else if (type == 'teacher') {
					this.loading = true
					schoolSelectTeacher(json).then(res => {
						res.data ? (this.loading = false, this.li = res.data.data.list, this.total = res.data.data.total, console.log(
							res)) : this.$message.error(
							'查询超时,请刷新重新查询！')
					})
				}
			},
			//条件查询
			selectCondition() {
				this.selectSql(this.typeStatus, {
					'grade': this.gradeDefault,
					'sort': this.classDefault
				})

			}
		},
		mounted() {
			this.color = user().color;
			this.selectClass();
			this.selectSql('student');
			this.loading = false;

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

	.particular {
		background-color: #FFFFFF;
		border-radius: 8px;
	}
</style>
