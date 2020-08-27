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
			<div class="li" v-for="(data, i) in li" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">ID:{{data.id}}</div>
				<div class="title-box">
					<div class="synopsis">{{ data.name }}</div>
				</div>
				<div class="title-box">
					<!-- <div class="title">{{ data.mobile }}</div> -->
					<div class="other" v-if="typeStatus=='student'">身份证:{{data.idCard}}</div>
					<div class="other" v-else>手机号码：{{ data.mobile }}</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<!-- <div class="label-box">
					<div class="label">{{ data.label }}</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div> -->
				<div class="right">
					<div class="ii">
						<div class="status_box">
							<i class="icon el-icon-check ii"></i>
							<span class="text ii">正常使用</span>
							<i class="icon i el-icon-edit-outline ii" style="cursor: pointer;" @click="teacherChange(data.id)"></i>
							<i class="icon i el-icon-close ii" style="cursor: pointer;" @click="deleteLi(data.id);dialogVisible=true"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 提示框 -->
		<!-- 	<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
		<!-- Table -->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<div class="t-title">请选择班级</div>
				<div class="t-content">
					<div class="group">
						<div class="row-group">
							<div class="th-group">分发状态</div>
							<div class="td-group" change>
								<el-checkbox-group v-model="array_nav2" @change="getValue()">
									<el-checkbox-button v-for="(d,i) in class2" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">分发状态</div>
							<div class="td-group" change>
								<el-checkbox-group v-model="array_nav3" @change="getValue()">
									<el-checkbox-button v-for="(d,i) in class1" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
					</div>
				</div>
				<div class="arr"><span>您已经选择：</span><span>{{array_nav4}}</span></div>
				<div class="student-box">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column label="学号" width="120">
							<template slot-scope="scope">
								{{ scope.row.date }}
							</template>
						</el-table-column>
						<el-table-column prop="name" label="名字" width="120">
							<template slot-scope="scope">
								<div style="display: flex;align-items: center;">
									<img src="../../../assets/img/img.jpg" class="user-img" />
									<div class="student-name">{{ scope.row.name }}</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="grade" label="年级" show-overflow-tooltip></el-table-column>
						<el-table-column prop="class" label="班级" show-overflow-tooltip></el-table-column>
					</el-table>
					<!-- <div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
						</el-pagination>
					</div> -->
					<div class="block-time">
						<div>
							<span style="margin-right:10px ;">选择日期</span>
							<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>
						<div class="block-a">
							<el-button @click="toggleSelection()" class="out">取消选择</el-button>
							<el-button @click="submit()" class="affirm">确认</el-button>
						</div>
					</div>

				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		schoolSelectTeacher,
		adminDeleteTeacher,
		StudentAccountInfo,
		adminDeleteStuednt
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				schoolId: localStorage.getItem('userID'),
				checkAll: false,
				isIndeterminate: true,
				disStatus: '',
				DisStatusList: ['正常', '冻结', '注销'],
				search: '',
				value1: '',
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
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
				li: '',
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
						StudentAccountInfo({
							pageNum: this.page.pageNum,
							pageSize: this.page.pageSize,
							schoolId: this.schoolId
						}).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;
					case 'teacher':
						schoolSelectTeacher({
							pageNum: this.page.pageNum,
							pageSize: this.page.pageSize,
							schoolId: this.schoolId
						}).then(res => {
							if (res.data) {
								this.li = res.data.data.list
								this.total = res.data.data.total
							} else {
								this.$message.error(
									'查询超时,请刷新重新查询！')
							}
						})
						break;
				}

			},
			handleSizeChange(val) {
				// this.pageNum = val
				// schoolSelectTeacher({
				// 	'pageNum': this.pageNum,
				// 	'pageSize': this.pageSize,
				// 	'schoolId': localStorage.getItem('userID')
				// }).then(res => {
				// 	console.log(res.data.data)
				// 	this.li = res.data.data.list
				// })
			},
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
				switch (this.typeStatus) {
					case 'student':
						adminDeleteStuednt(id).then(res => {
							this.$message.success('删除成功')
						})
						StudentAccountInfo(this.page).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;
					case 'teacher':
						adminDeleteTeacher(id).then(res => {
							this.$message.success('删除成功')
						})
						schoolSelectTeacher({
							'schoolId': localStorage.getItem('userID')
						}).then(res => {
							console.log(res.data.data)
							this.li = res.data.data.list
							this.total = res.data.data.total
						})
						break;
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
			}
		},
		mounted() {
			this.color = user().color;
			StudentAccountInfo({
				pageNum: this.page.pageNum,
				pageSize: this.page.pageSize,
				schoolId: this.schoolId
			}).then(res => {
				res.data ? (this.li = res.data.data.list, this.total = res.data.data.total, console.log(res)) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})

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
