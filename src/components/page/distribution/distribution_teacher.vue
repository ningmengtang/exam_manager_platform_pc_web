<template>
	<div class="box">
		<div class="top">
			<div class="group">
				<div class="row-group">
					<div class="th-group">分发状态</div>
					<div class="td-group" change>
						<el-radio-group v-model="disStatus" @change="getQuery">
							<el-radio-button v-for="(item,index) in DisStatusList" :label="item.id">
								{{item.text}}
							</el-radio-button>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="search">
				<el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<el-button type="primary" @click="searchO" :style="{ 'background-color': color, 'border-color': color }" class="go" >搜索</el-button>
			</div>
		</div>
		<!-- 管理 -->
		<div class="particular">
			<div class="li" v-for="(data, i) in papers" :key="data.i">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">包含小学一年级语文2019年人教版单元作业65656566555555</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text}}</div>
				</div>
				<div class="right">
					<div class="ii" v-if="data.putInto == '2'">
						<div class="status_box">
							<i class="icon el-icon-time"></i>
							<span class="text">正在分发</span>
							<el-button type="text" class="download">立即分发</el-button></span>
						</div>
					</div>
					<span v-else  style="display: contents;">
						<el-button type="text" class="download hover"  @click="distribution(data.id)" >立即分发</el-button>
					</span>
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 提示框 -->
		<!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
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
					<div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="pageSize" :total="total"></el-pagination>
					</div>
					<div class="block-time">
						<div>
							<span style="margin-right:10px ;">选择日期</span>
							<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>
						<div class="block-a">
							<el-button @click="dialogTableVisible = false" class="out">取消选择</el-button>
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
	// import {handleSizeChange,handleCurrentChange,handleClose,TagTypePromise} from '@/assets/js/manage.js'
	import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		teacherIndex,
		teacherSelectTag,
		teacherDistributeselect
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
				pageNum:1,
				pageSize:3,
				search: '',
				value1: '',
				disStatus:[],
				DisStatusList:[],
				total:0,
				studentPageNum:0,
				studentPageSize:0,
				studentTotal:0,
				userID:localStorage.getItem('userID'),
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
				checkboxGroup2: ['上海'],
				papers:'',
				li: [{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
						time: '2020年10月11日上传',
						label: '2019',
						o: '1'
					},
					{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
						time: '2020年10月11日上传',
						label: '2019',
						o: '2'
					}
				],
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
				this.array_nav4 = this.array_nav2.concat(this.array_nav3)
				console.log(this.array_nav4);
			},
			searchO() {

			},
			handleSizeChange(val) {
				teacherIndex({
					'operator_id':this.userID,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				teacherIndex({
					'operator_id':this.userID,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}).then(res => {
					console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
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
			getQuery() {
				this.obj = []
				if (this.disStatus != 0 && this.disStatus) {
					this.obj.push(this.disStatus)
				}
				if (this.elementTest != 0 && this.elementTest) {
					this.obj.push(this.elementTest)
				}
				if (this.purpose != 0 && this.purpose) {
					this.obj.push(this.purpose)
				}
				if (this.subject != 0 && this.subject) {
					this.obj.push(this.subject)
				}
				if (this.grade != 0 && this.grade) {
					this.obj.push(this.grade)
				}
				if (this.version != 0 && this.version) {
					this.obj.push(this.version)
				}
				if (this.years != 0 && this.years) {
					this.obj.push(this.years)
				}
				teacherSelectTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			TagTypePromise(tagType, index) {
				return new Promise((resolve, reject) => {
					ApiTagSelectList({
						"pageSize": 999,
						"pageNum": 1,
						"parentId": tagType.id
					}).then(res => {
						let all = [{
							"id": 0,
							"sn": 0,
							"text": '全部'
						}]
						let children = all.concat(res.data.data.list)
						switch (tagType.text) {
							case '分发状态':
								this.DisStatusList = children
								break;
							case '年份':
								this.YearsList = children
								break;
							case '教材版本':
								this.VersionList = children
								break;
							case '学习科目':
								this.SubjectList = children
								break;
							case '学习年级':
								this.GradeList = children
								break;
							case '单元测试':
								this.ElementTextList = children
								break;
							case '试卷用途':
								this.PurposeList = children
								break;
						}
						resolve(res)
					})
				})
			},
			async getTypeList(tagType, index) {
				await this.TagTypePromise(tagType, index)
				// return n 
			},
			// 查询分发试卷id
			distribution(id){
				this.dialogTableVisible = true
				console.log(id)
				teacherDistributeselect({'examId':id}).then(res=>{
					console.log(res)
				})
				
			}
		},
		mounted() {
			this.color = user().color;
			//标签查询
			this.TagTypeList = []
			ApiTagSelectList({
				"parentId": 0,
				"pageSize": 999,
				"pageNum": 1
			}).then(res => {
			
				this.TagType = res.data.data.list
				var arr = []
				for (var i = 0; i < this.TagType.length; i++) {
					this.getTypeList(this.TagType[i], i)
				}
			})
			teacherIndex({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum,
				'operator_id':this.userID
			}).then(res=>{
				console.log(res)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.pageSize=res.data.data.pageSize
				this.currentPage = res.data.data.pageNum
				console.log(this.pageSize)
			})
		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
