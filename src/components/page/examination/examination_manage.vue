<template>
	<div class="box">
		<div class="group">
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">试卷用途</div>
				<div class="td-group">
					<el-radio-group v-model="purpose" @change="getQuery">
						<el-radio-button v-for="(item,index) in PurposeList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">考试状态</div>
				<div class="td-group">
					<el-radio-group v-model="examStatus" @change="examTagStatus">
						<el-radio-button v-for="(item,index) in examStatusList" :label="item.id" :key="index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">年份</div>
				<div class="td-group">
					<el-radio-group v-model="years" @change="getQuery">
						<el-radio-button v-for="(item,index) in YearsList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">教材版本</div>
				<div class="td-group">
					<el-radio-group v-model="version" @change="getQuery">
						<el-radio-button v-for="(item,index) in VersionList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">学习科目</div>
				<div class="td-group">
					<el-radio-group v-model="subject" @change="getQuery">
						<el-radio-button v-for="(item,index) in SubjectList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">学习年级</div>
				<div class="td-group">
					<el-radio-group v-model="grade" @change="getQuery">
						<el-radio-button v-for="(item,index) in GradeList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">学期</div>
				<div class="td-group">
					<el-radio-group v-model="semester" @change="getQuery">
						<el-radio-button v-for="(item,index) in SemesterList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">单元测试</div>
				<div class="td-group">
					<el-radio-group v-model="elementTest" @change="getQuery">
						<el-radio-button v-for="(item,index) in ElementTextList" :label="item.id" :key="item.index">
							{{item.text}}
						</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			
		</div>
		<div class="particular">
			<div class="li" v-for="(item,i) in paperList" :key="item.i">
				<!-- 				<div class="teacher-name">{{item.operator_name}}</div> -->
				<div class="tag">
					<el-tag effect="dark" size="medium">{{item.operator_name}}</el-tag>
					<!-- <div>{{item.operator_name}}</div> -->
				</div>
				<!-- <div class="user-img">开始考试</div> -->

				<div class="title-box">
					<div class="title">{{item.title}}</div>
					<!-- <div :class="(item.status=1,item.status==0)?'font-i3':item.status==3?'font-i1':'font-i'"  class="synopsis">{{item.examExplain}} 结束时间：{{item.overTime}}</div> -->
					<div :class="'font-i3'" class="synopsis" v-if="item.status==0">考试已经开始，将于<br>{{item.overTime}}结束<br>考试时长{{item.examTime}}分钟，请尽快提交试卷</div>
					<div :class="'font-i'" class="synopsis" v-else-if="item.status==1">考试时间：{{item.startTime}}至{{item.overTime}}<br>考试时长{{item.examTime}}分钟，请做好准备</div>
					<div :class="'font-i'" class="synopsis" v-else-if="item.status==2">你的试卷正在紧锣密鼓的批阅当中，请耐心等待</div>
					<div :class="'font-i1'" class="synopsis" v-else-if="item.status==3">最终得分：60分（120分），要好好学习，天天向上哦！</div>
					<div :class="'font-i'" class="synopsis" v-else-if="item.status==4">考试取消！详细请联系班主任或者科目老师</div>
				</div>
				<div class="title-box" style="min-width: 220px;margin-right: 20px;">
					<div class="time">上传时间：{{item.createDate}}</div>
				</div>

				<div class="label-box">
					<div class="label" v-for="(d,i) in item.tag_list" :key="d.i">
						{{d.text}}
					</div>
				</div>
				<div class="right">
					
				
					
					<!-- <div class="status" :class="item.status==0&&item.studentExam.finish_status!=1?'font-i3':(item.status==1&&item.studentExam.finish_status!=1||item.status==2||item.status==4)?'font-i':item.studentExam.finish_status==1&&item.status==0?'font-i1':''"  >{{ item.status==0&&item.studentExam.finish_status!=1?'开始考试':item.status==1&&item.studentExam.finish_status!=1?'准备考试':(!isDuringDate(item.startTime,item.overTime)&&item.studentExam.finish_status!=1)?'正在批阅':item.studentExam.finish_status==1&&item.status==0?'考试完成':'考试取消'}}</div> -->
					<i class="icon" :class="(item.studentExam.finish_status==2||item.studentExam.finish_status==1)?'el-icon-caret-right font-i3':(item.status==1||item.studentExam.finish_status!=1||item.status==2)?'el-icon-time font-i':item.studentExam.finish_status==5?'el-icon-check font-i1':'el-icon-close font-i'"></i>
					
					<!-- <div class="status" :class="item.status==0&&item.studentExam.finish_status!=1?'font-i3':(item.status==1&&item.studentExam.finish_status!=1||item.status==2||item.status==4)?'font-i':item.studentExam.finish_status==1&&item.status==0?'font-i1':''"  >{{ item.status==0&&item.studentExam.finish_status!=1?'开始考试':item.status==1&&item.studentExam.finish_status!=1?'准备考试':(!isDuringDate(item.startTime,item.overTime)&&item.studentExam.finish_status!=1)?'正在批阅':item.studentExam.finish_status==1&&item.status==0?'考试完成':'考试取消'}}</div> -->
					<div class="status  font-i3" v-if="item.studentExam.finish_status==0">未开始考试</div>
					<div class="status font-i3" v-if="item.studentExam.finish_status==1">开始考试</div>
					<div class="status font-i3" v-if="item.studentExam.finish_status==2">正在考试</div>
					<div class="status font-i" v-if="item.studentExam.finish_status==3">考试完成</div>
					<div class="status font-i" v-if="item.studentExam.finish_status==4">正在批阅</div>
					<div class="status font-i1" v-if="item.studentExam.finish_status==5">批阅完成</div>
					<div class="status font-i" v-if="item.studentExam.finish_status==6">考试结束</div>
						<el-button type="primary" plain v-if="(item.studentExam.finish_status==0||item.studentExam.finish_status==1||item.studentExam.finish_status==2)&&isDuringDate" size="medium" class="buttom i"  @click="goExam(item.id,item.examTime,item.overTime,item.startTime)">立即进入</el-button>
					 <el-button type="primary" v-else-if="item.status==3&&item.studentExam.finish_status!=1" style="background-color: #19ADFB;padding: 10px 34px;" size="medium" @click="goGrade()">查看</el-button>
					<el-button type="primary" v-else-if="item.studentExam.finish_status==5&&item.status==0" style="background-color: #19ADFB;"
					 size="medium" @click="goGrade(item.id,item.examTime)">查看反馈</el-button>
					<el-button type="primary" disabled v-else style="background-color: #999999;padding: 10px 34px;" size="medium">查看</el-button>
					
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="page.pageSize" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		studentIndex,
		apicommonExamGetFile,
		selectTag,
		ApiTagSelectList,
		paperWithTag,
	} from '@/api/api.js'
	export default {
		data() {
			return {
				total: 0,
				page: {
					pageNum: 1,
					pageSize: 10
				},
				currentPage: 1,
				loading: false,
				papers: {},
				dialogVisible: false,
				years: 0,
				YearsList: [],
				version: 0,
				VersionList: [],
				subject: 0,
				SubjectList: [],
				grade: 0,
				GradeList: [],
				semester: 0,
				SemesterList: [],
				elementTest: 0,
				ElementTextList: [],
				purpose: 0,
				PurposeList: [],
				TagType: [],
				paperList: [],
				examStatus:'',
				examStatusList:[{'id':'','text':'全部'},{'id':0,'text':'准备考试'},{'id':2,'text':'开始考试'},{'id':1,'text':'查看反馈'},]
			}
		},
		methods: {
			//---分页
			handleSizeChange(val) {

			},
			//---分页2
			handleCurrentChange(val) {
				this.page.pageNum = val
				this.selectPaper([],this.examStatus);
			},
			//---查询标签
			getQuery() {
				this.obj = []
				if (this.semester != 0 && this.semester) {
					this.obj.push(this.semester)
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
				this.selectPaper(this.obj)
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
							case '学期':
								this.SemesterList = children
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
			// ---跳转考试页面
			goExam(id, examTime, overTime, startTime) {
				this.isDuringDate(startTime, overTime) ?
					(this.$router.push({
						name: 'examination_faceRecognition',
						query: {
							'id': id,
							'examTime': examTime,
							'overTime': overTime
						}
					})) : (this.$message({
						message: '未到考试时间',
						type: 'warning'
					}))

			},
			// ---跳转考试成绩页面
			goGrade(id, examTime) {
				this.$router.push({
					name: 'examination_feedback',
					query: {
						'id': id,
						'examTime': examTime
					}
				})
			},

			//---查询全部标签
			selectAllTag() {
				ApiTagSelectList({
					"pageNum": 1,
					"pageSize": 999
				}).then(res => {
					// console.log(this.TagType)
					this.TagType = res.data.data.list
					var arr = []
					for (var i = 0; i < this.TagType.length; i++) {
						this.getTypeList(this.TagType[i], i)
					}

				})
			},
			//---全部试卷查询
			selectPaper(id,status) {
				paperWithTag({
					"id": id,
					"status":status,
					"pageNum": this.page.pageNum,
					"pageSize": this.page.pageSize
				}).then(res => {
					console.log(res)
					this.paperList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			// 考试状态标签查询
			examTagStatus(){
				this.selectPaper([],this.examStatus)
			},
			//---计算是否超时
			isDuringDate(beginDateStr, endDateStr) {
				var curDate = new Date()
				var beginDate = new Date(beginDateStr)
				var endDate = new Date(endDateStr)

				if (curDate >= beginDate && curDate <= endDate) {
					return true
				}
				return false
			}
		},
		mounted() {
			this.loading = true
			this.TagTypeList = [];
			this.selectAllTag();
			// 全部试卷查询
			this.selectPaper([],this.examStatus)
		},
	};
</script>

<style scoped src="../../../assets/css/examination.css"></style>
// 修改element 自带样式
<style>
	.box /deep/ .el-tag{display: block;white-space: break-spaces;height: auto;}
</style>
