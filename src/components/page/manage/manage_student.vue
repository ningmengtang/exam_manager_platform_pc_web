<template>
	<div class="box">
		<div class="group">
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
				<div class="th-group">学期</div>
				<div class="td-group">
					<el-radio-group v-model="semester" @change="getQuery">
						<el-radio-button v-for="(item,index) in SemesterList" :label="item.id">
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
			<!-- <div class="search">
				<el-input placeholder="请输入内容" v-model="search">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				 <el-button type="primary" @click="" class="buttom" >搜索</el-button>
			</div> -->
		</div>

		<div class="particular">
			<div class="li" v-for="item in paperList">
				<div class="teacher-name">{{item.operator_name}}</div>
				<div class="title-box">
					<div class="title">{{item.title}}</div>
					<div class="synopsis">{{item.examExplain}}</div>
				</div>
				<div class="title-box" style="margin: 0 20px;">
				<div class="time">创建时间：{{item.createDate}}</div>
				<div class="time">开始下载：{{item.startTime}}</div>
				<div class="time" style="color: #fb4919;">失效时间：{{item.overTime}}</div>
				</div>

				<div class="label-box">
					<div class="label" v-for="i in item.tag_list">
						{{i.text}}
					</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time"></i>
					<div class="status">{{item.status==0 && item.putInto == 1?'可以下载':'不允许下载'}}</div>

					<el-button type="primary" v-if="item.status==0 && item.putInto == 1 " @click="downloadFile(item)">立即下载</el-button>
					<el-button type="primary" disabled v-else style="background-color: #999999;">立即下载</el-button>
				</div>
			</div>
			<!-- <el-table :data="paperList" :height="tableHeight" style="width: 100%" element-loading-background="rgba(0, 0, 0, .3)">
				<el-table-column prop="id" label="ID" width="180">
				</el-table-column>
				<el-table-column prop="operator_name" label="组卷人" width="180">
					<template slot-scope="scope">
						<div class="teacher-name i">{{scope.row.operator_name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="试卷标题" width="240">
				</el-table-column>
				<el-table-column prop="examExplain" label="试卷简介" width="240">
					<template slot-scope="scope">
						<div class="font-i">{{scope.row.examExplain}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="createDate" label="创建时间">
					<template slot-scope="scope">
						<div class="font-i">{{scope.row.createDate}}</div>
					</template>
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
			</el-table> -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 弹窗 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
		getValue,
		handleSizeChange,
		handleCurrentChange,
		handleClose,
		TagTypePromise,
		getQuery
	} from '@/assets/js/manage.js'
	import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		apicommonExamGetFile
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				pageSize: 10,
				pageNum: 1,
				total: 0,
				tableHeight: 680,
				currentPage: 1,
				SemesterList: [],
				paperList: [],
				DisStatusList: [],
				ElementTextList: [],
				PurposeList: [],
				SubjectList: [],
				GradeList: [],
				VersionList: [],
				YearsList: [],
				disStatus: 0,
				elementTest: 0,
				purpose: 0,
				subject: 0,
				grade: 0,
				version: 0,
				years: 0,
				semester: 0,
				obj: [],
				array_nav: [], //存储el-chckbox数组
				array_nav_2: [],
				array_nav_3: [],
				array_nav_4: [],
				array_nav_5: [],
				array_nav_6: [],
				array_nav_7: [],
				TagType: [],
				TagTypeList: [],
				search: '',
				dialogVisible: false,
				download_status: 0,

			};
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			handleSizeChange(val) {
				console.log(val)
				this.pageSize = val
				paperWithTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					this.paperList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNum = val;
				paperWithTag({
					"id": this.obj,
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}).then(res => {
					this.paperList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
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
				paperWithTag({
					"id": this.obj,
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					this.paperList = res.data.data.list
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
			downloadFile(item) {

				if (item.startTime && item.overTime) {
					let arr = this.isDuringDate(item.startTime, item.overTime)
					if (arr) {
						if (item.affix) {
							apicommonExamGetFile(item.id).then(res => {
								var headers = res.headers['content-disposition']
								headers = headers.substr(headers.indexOf('filename=\"') + 'filename=\"'.length).split("\"")[0];
								const blob = new Blob([res.data], {
									type: ''
								})
								let link = document.createElement('a');
								let objectUrl = URL.createObjectURL(blob);
								link.setAttribute("href", objectUrl);
								link.setAttribute("download", headers);
								link.click();
								//释放内存
								window.URL.revokeObjectURL(link.href)
							})
						} else {
							let createTestPaperInfoObj = {
								testPaperId: item.id,
								students: [{
									uid: localStorage.getItem('userID'),
									utype: "student",
									items: []
								}]
							}
							this.$router.push({
								name: 'test_paper_maker_for_task',
								query: {
									createTestPaperInfoObj: createTestPaperInfoObj
								}
							})
						}

					} else {
						this.download_status = 1;
						this.$message.warning('未到下载时间，不允许下载')
					}
				} else {
					if(item.affix){
							apicommonExamGetFile(item.id).then(res=>{
								// console.log(res)
								var headers = res.headers['content-disposition']
								// console.log(headers)
								headers = headers.substring(headers.indexOf('filename=\"')+'filename=\"'.length).split("\"")[0];
								const blob = new Blob([res.data],{type:''})
								let link = document.createElement('a');
								let objectUrl = URL.createObjectURL(blob);
								link.setAttribute("href",objectUrl);
								link.setAttribute("download",headers); 
								link.click();
								//释放内存
								window.URL.revokeObjectURL(link.href)
							})
						}else{
							let  createTestPaperInfoObj = {
							 		testPaperId:item.id,
							        students:[
							          {
							            uid:localStorage.getItem('userID'),
										utype:"student",
				          				items:[]
							          }
							        ]
							      }
							this.$router.push({name :'test_paper_maker_for_task',query:{createTestPaperInfoObj:createTestPaperInfoObj}})
						}
				}


			},
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
			this.color = user().color;
			this.TagTypeList = [];
			ApiTagSelectList({
				"parentId": 0,
				"pageSize": 999,
				"pageNum": 1
			}).then(res => {
				console.log(res)
				this.TagType = res.data.data.list
				// console.log(this.TagType)
				var arr = []
				for (var i = 0; i < this.TagType.length; i++) {
					this.getTypeList(this.TagType[i], i)
				}

			})
			// 全部试卷查询
			paperWithTag({
				"id": [],
				"pageNum": this.pageNum,
				"pageSize": this.pageSize
			}).then(res => {
				console.log(res)
				this.paperList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}

	};
</script>

<style scoped src="../../../assets/css/manage.css">
</style>
<style scoped>

</style>
