<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{usserName}}</div>
							<div class="user-id">ID:{{userId}}</div>
							<div class="identity" :style="{'background-color':color}">管理员</div>
							<!-- <div class="message">
								<div class="school">北京师范小学</div>
								<div class="grade">一年级</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="change-box">
				<div class="li">
					<i class="icon el-icon-user-solid"></i>
					<div class="name-change">个人信息</div>
				</div>
				<div class="li">
					<i class="icon el-icon-thirdmima"></i>
					<div class="name-change">修改密码</div>
				</div>
				<div class="li">
					<i class="icon el-icon-thirdshouji"></i>
					<div class="name-change">修改手机</div>
				</div>
			</div> -->
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-row">
				<el-row :gutter="20" type="flex" class="el-row-box">
					<el-col :span="8">
						<div class="card-box">
							<div class="card-t">班级数量</div>
							<div class="num">
								<ICountUp :endVal="total" />
							</div>
						</div>
					</el-col>
					<!-- <el-col :span="6">
						<div class="card-box">
							<div class="card-t">负责科目</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col> -->
					<el-col :span="8">
						<div class="card-box">
							<div class="card-t">教师数量</div>
							<div class="num">
								<ICountUp :endVal="teacher_num" />
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="card-box">
							<div class="card-t">学生数量</div>
							<div class="num">
								<ICountUp :endVal="student_num" />
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 班级列表 -->
			<div class="upload-papers">
				<el-button class="li-box top" @click="operation('add')"><i class="i el-icon-plus"></i>新增班级</el-button>
				<!--<div class="li-box" v-for="item in classList ">
					<div class="papers-box">
						<div class="p-title">{{item.grade}}
						<div class="label-box">
							<div class="label">2019</div>
							<div class="label">人教版</div>
							<div class="label">语文</div>
							<div class="label">一年级</div>
							<div class="label">一年级</div>
						</div>
						</div>
						<div class="p-particular">{{item.name}}</div>
					</div>
					<div class="time"><i class="icon el-icon-close"></i></div>
				</div> -->
				<el-table :data="classList" height="480" style="width: 100%">
					<el-table-column prop="id" label="ID" width="180">
					</el-table-column>
					<el-table-column prop="grade" label="年级" width="180">
					</el-table-column>
					<el-table-column prop="name" label="班级">
					</el-table-column>
					<el-table-column prop="createDate" label="创建时间">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button class="icon el-icon-edit-outline" type="text" size="small" @click="operation('update',{grade:scope.row.grade,sort:scope.row.sort,id:scope.row.id,schoolId:scope.row.schoolId})">
							</el-button>
							<el-button class="icon el-icon-close" type="text" size="small" @click="operation('delete',scope.row.id);dialogVisible=true">
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
				</el-pagination>
			</div>


			<!--  -->
			<!-- 弹窗 -->
			<!--  -->
			<el-dialog title="" :visible.sync="dialogTableVisible">
				<div class="ts-select">
					<div class="t-title">请选择班级</div>
					<div class="t-content">
						<div class="group">
							<div class="row-group">
								<div class="th-group">年份(年)</div>
								<div class="td-group" change>
									<el-input-number v-model="table_yearNum" controls-position="right" @change="handleChange" :min="2000" :max="2099"></el-input-number>
								</div>
							</div>
						</div>
						<div class="group">
							<div class="row-group">
								<div class="th-group">班级(班号)</div>
								<div class="td-group" change>
									<el-radio-group v-model="table_classNum">
										<el-radio-button label="1">1班</el-radio-button>
										<el-radio-button label="2">2班</el-radio-button>
										<el-radio-button label="3">3班</el-radio-button>
										<el-radio-button label="4">4班</el-radio-button>
										<el-radio-button label="5">5班</el-radio-button>
										<el-radio-button label="6">6班</el-radio-button>
									</el-radio-group>
								</div>
							</div>
						</div>
						<div class="group">
							<div class="row-group">
								<div class="th-group">学校</div>
								<div class="td-group" change>
									<el-select v-model="schoolDefault" placeholder="请选择" >
										<el-option v-for="(item,i) in school" :key="item.i" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
									</el-radio-group>
								</div>
							</div>
						</div>

					</div>
					<div class="arr"><span>您已经选择：</span><span>{{table_yearNum}}年级,{{table_classNum}}班</span></div>
					<div class="student-box">

						<div class="block-time">
							<div></div>
							<div class="block-a">
								<el-button @click="cancel()" class="out">取消选择</el-button>
								<el-button @click="submit(operation_type)" class="affirm">确认{{operation_type=='add'?'新增':'修改'}}</el-button>
							</div>
						</div>

					</div>
				</div>
			</el-dialog>
			<!-- 删除提示框 -->
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
				<span>确认删除？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel()">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false;deleteAffirm=true;submit('delete')">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import {
		ApiClassSelectListByOptions,
		schoolSelectTeacher,
		StudentAccountInfo,
		ApiClassAdd,
		ApiClassUpdate,
		ApiClassDelete,
		apiSchoolAccountSelectByOptions
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				endVal1: 6,
				endVal2: 454,
				currentPage: 1,
				class_num: 0,
				teacher_num: 0,
				student_num: 0,
				table_yearNum: 2000,
				table_classNum: 1,
				operation_type: '',
				update_data: '',
				delete_id: '',
				dialogTableVisible: false,
				dialogVisible: false,
				array_nav2: [],
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				array_nav9: [],
				page: {
					pageSize: 8,
					pageNum: 1
				},
				schoolDefault: '',
				school: [1, 2],
				total: 0,
				usserName: localStorage.getItem('userName'),
				userId: localStorage.getItem('userID'),
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
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
				classList: [{
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
				]
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleChange(val) {
				console.log(val)
			},
			handleCurrentChange(val) {
				this.page.pageNum = val
				ApiClassSelectListByOptions({
					pageSize: this.page.pageSize,
					pageNum: this.page.pageNum
				}).then(res => {
					this.page.pageNum = res.data.data.pageNum;
					this.page.pageSize = res.data.data.pageSize;
					this.total = res.data.data.total;
					this.classList = res.data.data.list;
				});
			},
			cancel() {
				this.dialogTableVisible = false
			},
			submit(type) {
				if (type == 'add') {
					ApiClassAdd({
						"sort": this.table_classNum,
						"grade": `${this.table_yearNum}级`,
						"name": `${this.table_yearNum}级${this.table_classNum}班`,
						"schoolId": this.schoolDefault,
					}).then(res => {
						this.$message.success('新增班级成功!')
						this.cancel();
					})
					// 查询班级
					ApiClassSelectListByOptions({
						pageSize: this.page.pageSize,
						pageNum: this.page.pageNum
					}).then(res => {
						// console.log(res)
						this.page.pageNum = res.data.data.pageNum;
						this.page.pageSize = res.data.data.pageSize;
						this.total = res.data.data.total;
						this.classList = res.data.data.list;
					});
				} else if (type == 'update') {
					ApiClassUpdate({
						"id": this.update_data.id,
						"sort": this.table_classNum,
						"grade": `${this.table_yearNum}级`,
						"name": `${this.table_yearNum}级${this.table_classNum}班`,
						"schoolId": this.update_data.schoolId,
					}).then(res => {
						this.$message.success('修改班级成功!')
						this.cancel();
					})
					// 查询班级
					ApiClassSelectListByOptions({
						pageSize: this.page.pageSize,
						pageNum: this.page.pageNum
					}).then(res => {
						// console.log(res)
						this.page.pageNum = res.data.data.pageNum;
						this.page.pageSize = res.data.data.pageSize;
						this.total = res.data.data.total;
						this.classList = res.data.data.list;
					});
				} else if (type == 'delete') {
					ApiClassDelete(this.delete_id).then(res => {
						this.$message.success('删除班级成功!')
					});
					// 查询班级
					ApiClassSelectListByOptions({
						pageSize: this.page.pageSize,
						pageNum: this.page.pageNum
					}).then(res => {
						// console.log(res)
						this.page.pageNum = res.data.data.pageNum;
						this.page.pageSize = res.data.data.pageSize;
						this.total = res.data.data.total;
						this.classList = res.data.data.list;
					});

				}
			},
			// 操作
			operation(type, data) {
				if (type == 'add') {
					this.operation_type = type
					this.dialogTableVisible = true
				} else if (type == 'update') {
					this.dialogTableVisible = true
					this.operation_type = type;
					this.update_data = data;
					this.table_classNum = data.sort;
					this.schoolDefault=data.schoolId;
					this.table_yearNum = data.grade.replace(/(\级*$)/g, "");
				} else if (type == 'delete') {
					this.dialogVisible = true;
					this.delete_id = data
				}
			}
		},
		mounted() {
			this.color = user().color;
			// 查询学校
			apiSchoolAccountSelectByOptions({
				pageSize: 999,
				pageNum: 1
			}).then(res => {
				this.school=res.data.data.list
			})
			// 查询班级
			ApiClassSelectListByOptions({
				pageSize: this.page.pageSize,
				pageNum: this.page.pageNum
			}).then(res => {
				// console.log(res)
				this.page.pageNum = res.data.data.pageNum;
				this.page.pageSize = res.data.data.pageSize;
				this.total = res.data.data.total;
				this.classList = res.data.data.list;
			});
			//查询教师数量
			schoolSelectTeacher({}).then(res => {
				// console.log(res)
				this.teacher_num = res.data.data.total
			})
			//查询学生数量
			StudentAccountInfo({
				pageNum: this.page.pageNum,
				pageSize: this.page.pageSize,
			}).then(res => {
				res.data ? (this.student_num = res.data.data.total) : this.$message.error(
					'查询超时,请刷新重新查询！')
			})
		}
	};
</script>
<style scoped src="../../../assets/css/manage-class.css"></style>
