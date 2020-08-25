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
			<!-- <div class="group">
				<div class="row-group">
					<div class="th-group">用户状态</div>
					<div class="td-group" change>
						<el-checkbox-group v-model="array_nav2" @change="getValue()">
							<el-checkbox-button v-for="(d,k) in userState" :label="d" :key="city">{{ d }}</el-checkbox-button>
						</el-checkbox-group>
					</div>
				</div>
			</div>
			<div class="group">
				<div class="row-group">
					<div class="th-group">年级</div>
					<div class="td-group" change>
						<el-checkbox-group v-model="array_nav3" @change="getValue()">
							<el-checkbox-button v-for="(d,k) in grade" :label="d" :key="city">{{ d }}</el-checkbox-button>
						</el-checkbox-group>
					</div>
				</div>
			</div>
			<div class="group">
				<div class="row-group">
					<div class="th-group">班级</div>
					<div class="td-group" change>
						<el-checkbox-group v-model="array_nav4" @change="getValue()">
							<el-checkbox-button v-for="(d,k) in classNum" :label="d" :key="city">{{ d }}</el-checkbox-button>
						</el-checkbox-group>
					</div>
				</div>
			</div> -->
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
			<div class="li" v-for="(data, i) in li" :key="data.i">

				<div class="teacher-name">ID:{{ data.id }}</div>
				<div class="title-box">
					<div class="synopsis">{{ data.name }}</div>
				</div>
				<div class="other">{{data.sex}}</div>
				<div class="other" v-if="typeStatus=='student'">{{data.idCard}}</div>
				<div class="other" v-else-if="typeStatus=='user'||typeStatus=='admin'">{{data.mobilePhone}}</div>
				<div class="other" v-else>{{data.mobile}}</div>
				<div class="other">{{data.schoolName}}</div>
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
							<i class="icon i el-icon-close  ii" style="cursor: pointer;" @click="deleteLi(typeStatus)"></i>
						</div>
					</div>
					<!-- <span v-else-if="data.o == '2'" style="display: contents;">
						<el-button type="text" class="download hover" @click="submit">立即分发</el-button>
					</span> -->
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 提示框 -->
		<!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
		<!-- Table -->
		<!-- <el-dialog title="" :visible.sync="dialogTableVisible">
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
					<div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="100" :total="1000">
						</el-pagination>
					</div>
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
		</el-dialog> -->
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
		adminSelectRoleSchoolId
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				checkAll: false,
				isIndeterminate: true,
				array_nav: [], //存储el-chckbox数组
				array_nav2: [], //存储el-chckbox数组
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				search: '',
				value1: '',
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
				userState: ['全部', '正常', '冻结', '注销'],
				grade: ['全部', '一班', '二班', '三班'],
				classNum: ['全部', '一班', '二班', '三班'],
				checkboxGroup2: ['上海'],
				li: [],
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
				page: {
					pageNum: 1,
					pageSize: 2
				},
				//总条数
				total: 0
			};
		},
		methods: {
			//获取选择标签的内容
			getValue() {
				// if(this.typeStatus == '专家'){

				// }else if(this.typeStatus == '教师'){
				// 	TeachAccoundList({}).then(res=>{
				// 		console.log(res)
				// 	})
				// }else if(this.typeStatus == '学生'){

				// }
				switch (this.typeStatus) {
					case 'student':
						StudentAccountInfo(this.page).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;
					case 'teacher':
						schoolSelectTeacher(this.page).then(res => {
							if (res.data) {
								this.li = res.data.data.list
								this.total = res.data.data.total
								// 获取遍历每个老师的学校id
								// this.li.forEach((x, i) => {
								// 	//通过学校id查询学校名称
								// 	adminSelectRoleSchoolId(x.schoolId).then(res => {
								// 		this.$set(x, 'schoolName', res.data.data.name)
								// 	})
								// })
							} else {
								this.$message.error(
									'查询超时,请刷新重新查询！')
							}
						})

						break;
					case 'school':
						ApiSchoolAccountSelectByOptions(this.page).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total): this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;
					case 'user':
						adminSelectRoleUser(this.page).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;
					case 'admin':
						adminSelectRoleAdmin(this.page).then(res => {
							res.data ? (this.li = res.data.data.list, this.total = res.data.data.total, console.log(res)) : this.$message.error(
								'查询超时,请刷新重新查询！')
						})
						break;

				}
			},
			// 新增教师
			goAddTeach() {

			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
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
				//go
				this.$router.push('distribution_admin_affirm')
			},
			goAdd(data){
				this.$router.push({path:'user_control_add',params:{'typeStatus':this.typeStatus}})
			},
			deleteLi(data){
				console.log(data)
			}

		},
		mounted() {
			this.color = user().color;
			// ApiSchoolAccountSelectByOptions({
			// 	"pageNum": 1,
			// 	"pageSize": 999
			// }).then(res => {
			// 	console.log(res)
			// })
			// ApiClassSelectListByOptions({}).then(res => {
			// 	console.log(res)
			// })
			StudentAccountInfo(this.page).then(res => {
				res.data ? (this.li = res.data.data.list, this.total = res.data.data.total) : this.$message.error(
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
