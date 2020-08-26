<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
					<!-- <div class="row-group">
						<div class="th-group">分发状态</div>
						<div class="td-group" change>
							<el-radio-group v-model="disStatus" @change="getQuery">
								<el-radio-button v-for="(item,index) in DisStatusList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div> -->
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">年份</div>
						<div class="td-group">
							<el-radio-group v-model="years" @change="getQuery">
								<el-radio-button v-for="(item,index) in YearsList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">教材版本</div>
						<div class="td-group">
							<el-radio-group v-model="version" @change="getQuery">
								<el-radio-button v-for="(item,index) in VersionList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习科目</div>
						<div class="td-group">
							<el-radio-group v-model="subject" @change="getQuery">
								<el-radio-button v-for="(item,index) in SubjectList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习年级</div>
						<div class="td-group">
							<el-radio-group v-model="grade" @change="getQuery">
								<el-radio-button v-for="(item,index) in GradeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">单元测试</div>
						<div class="td-group">
							<el-radio-group v-model="elementTest" @change="getQuery">
								<el-radio-button v-for="(item,index) in ElementTextList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">试卷用途</div>
						<div class="td-group">
							<el-radio-group v-model="purpose" @change="getQuery">
								<el-radio-button v-for="(item,index) in PurposeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="search">
						<!-- <el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
						<el-button type="primary" @click="" class="buttom" :style="{ 'background-color': color, 'border-color': color }">搜索</el-button> -->
						<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd"><span class="el-icon-plus"></span> 新增订购单</el-button>
					</div>
				</div>
				
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in papers" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain}}</div>
				</div>
				<div class="time">{{ data.time }}</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text}}</div>
				</div>
				<div class="right">
					<!-- <div class="ii" v-if="data.status == '0'">
						<div style="margin-bottom: 4px;" >
							<i class="icon el-icon-check i"></i>
							<span class="text">可以下载</span>
						</div>
					</div>
					<div class="ii" v-else-if="data.status == '1'">
						<div style="margin-bottom: 4px;" >
							<i class="icon el-icon-check i"></i>
							<span class="text">可以下载</span>
						</div>
					</div> -->
					<!-- <div class="ii" v-if="data.o == '3'">
						<div style="margin-bottom: 4px;" >
							<i class="icon el-icon-check i"></i>
							<span class="text">可以下载</span>
						</div>
					</div> -->
					<div class="del">
						<!-- <i class="el-icon-download" @click="dialogVisible = true"></i> -->
						<!-- <i class="el-icon-delete-solid" ></i>
						<i class="el-icon-s-custom" @click="studentDownload(data.id,data.status)" :style="data.status=='0'?{'color':color}:{'color':'#999999'}"></i> -->
					</div>
					
				</div>
			</div>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total"></el-pagination>
			</div>
		</div>
		<!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
			<div class="ts-box">
				<div class="big-icon  el-icon-success"></div>
				<div class="ii">自行下载试卷完成</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import user from '../../common/user';
import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		SchoolIndex,
		selectSchoolTag,
		schoolStudentAllow,
		schoolStudentUnAllow		
	} from '@/api/api.js'
export default {
	data() {
		return {
			color: '',
			array_nav: [], //存储el-chckbox数组
			search: '',
			currentPage: 1,
			dialogVisible: false,
			cities: ['全部', '上海', '北京', '广州', '深圳'],
			cities2: ['全部', '1', '2', '3', '4'],
			checkboxGroup2: ['上海'],
			pageNum:1,
			pageSize:6,
			currentPage: 1,
			disStatus: 0,
			paperList:[],
			DisStatusList:[],
			ElementTextList:[],
			PurposeList:[],
			SubjectList:[],
			GradeList:[],
			VersionList:[],
			YearsList:[],
			dialogVisible: false,
			elementTest:0,
			purpose:0,
			subject:0,
			grade:0,
			version:0,
			years:0,
			obj:[],
			papers:[],
			total:0,
			li: [
				{
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
				},
				{
					teacher: '古得老师',
					title: '2019年人教版一年级第一单元作业5656565656',
					synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
					time: '2020年10月11日上传',
					label: '2019',
					o: '3'
				}
			],
			
		};
		
	},
	methods: {
		getValue() {
			console.log(this.array_nav);
		},
		// handleSizeChange(val) {
		// 	console.log(`每页 ${val} 条`);
		// },
		// handleCurrentChange(val) {
		// 	console.log(`当前页: ${val}`);
		// },
		goAdd(){
			this.$router.push('order_school_add')
		},
		handleCurrentChange(val) {
			this.pageSize = val
			selectSchoolTag({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		handleSizeChange(val) {
			this.pageNum = val
			selectSchoolTag({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		getQuery() {
			this.obj = []
			// if (this.disStatus != 0 && this.disStatus) {
			// 	this.obj.push(this.disStatus)
			// }
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
			selectSchoolTag({
				"id":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				// console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
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
						// case '分发状态':
						// 	this.DisStatusList = children
						// 	break;
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
		// 学生下载权限
		studentDownload(id,status){
			if(status==0){
				// schoolStudentUnAllow(id)
				SchoolIndex({
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					console.log(res)
					this.papers=res.data.data.list
					this.total=res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			}else{
				// schoolStudentAllow(id)
				SchoolIndex({
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.papers=res.data.data.list
				this.total=res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
			}
			
		}
	},
	mounted() {
		this.color = user().color;
		console.log(this.color)
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
		//试卷
		selectSchoolTag({
			"pageSize":this.pageSize,
			"pageNum":this.pageNum,
		}).then(res=>{
			console.log(res.data)
			this.papers=res.data.data.list
			this.total=res.data.data.total
			this.currentPage = res.data.data.pageNum
		})
	}
};
</script>

<style scoped src="../../../assets/css/manage.css"></style>
<style scoped>
	.group {
		background-image: url(../../../assets/img/bg-willow.png);
		background-position: 100% 0%;
	}

	.right .download {
		background-color: #2bbb61;
	}

	.status {
		color: #2bbb61;
	}

	.group /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: rgb(43, 187, 97);
		border-color: rgb(43, 187, 97);
	}
</style>
