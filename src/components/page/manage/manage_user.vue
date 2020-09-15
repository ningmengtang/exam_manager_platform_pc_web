<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
					<!-- <div class="row-group">
						<div class="th-group">分发状态</div>
						<div class="td-group" >
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
							<el-radio-group v-model="years"   @change="getQuery">
								<el-radio-button v-for="(item,index) in YearsList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">教材版本</div>
						<div class="td-group">
							<el-radio-group v-model="version"  @change="getQuery">
								<el-radio-button v-for="(item,index) in VersionList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习科目</div>
						<div class="td-group">
							<el-radio-group v-model="subject"   @change="getQuery">
								<el-radio-button v-for="(item,index) in SubjectList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习年级</div>
						<div class="td-group">
							<el-radio-group v-model="grade"   @change="getQuery">
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
							<el-radio-group v-model="elementTest"  @change="getQuery">
								<el-radio-button v-for="(item,index) in ElementTextList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">试卷用途</div>
						<div class="td-group">
							<el-radio-group v-model="purpose"   @change="getQuery">
								<el-radio-button v-for="(item,index) in PurposeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					
				</div>
				<div class="right">
					<div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i" @click="addPaper" >开始组卷</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in paperList" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{ data.examExplain }}</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<div class="label-box" >
					<div class="label" v-for="card in data.tag_list">{{ card.text }}</div>

				</div>
				<div class="right">	
					<div class="time" style="width:120px">{{data.putInto == 0?'入库失败':data.putInto == 1?'入库成功':data.putInto==2?'正在入库':''}}</div>
					<div >
						<el-button type="success" size="medium" @click="openFile(data)" >预览</el-button>
					</div>
				</div>
				
			</div>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import user from '../../common/user';
import {
		selectTag,
		ApiTagSelectList,
		paperWithTag,
		teacherIndex,
		teacherSelectTag,
		teacherDistributeselect,
		apiPaperWithTagList,
		apicommonExamGetFile
	} from '@/api/api.js'
export default {
	data() {
		return {
			color: '',
			array_nav: [], //存储el-chckbox数组
			search: '',
			
			dialogVisible: false,
			paperList:[],
			DisStatusList:[],
			ElementTextList:[],
			PurposeList:[],
			SubjectList:[],
			GradeList:[],
			VersionList:[],
			YearsList:[],
			TagType:[],
			SemesterList:[],
			disStatus:0,
			elementTest:0,
			purpose:0,
			subject:0,
			grade:0,
			version:0,
			years:0,
			semester:0,

			total:0,
			pageNum:1,
			pageSize:4,
			currentPage: 1,
		};
	},
	methods: {
		handleSizeChange(val) {
			this.pageSize = val
			apiPaperWithTagList({
				"id":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		handleCurrentChange(val) {
			this.pageNum = val
			apiPaperWithTagList({
				"id":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		// 查询
		getQuery(){
			this.obj = []
			if(this.semester != 0 && this.semester){
				this.obj.push(this.semester)
			}
			if(this.elementTest !=0 && this.elementTest){
				this.obj.push(this.elementTest)
			}
			 if(this.purpose !=0 && this.purpose){
				this.obj.push(this.purpose)
			}
			if(this.subject !=0 && this.subject){
				this.obj.push(this.subject)
			}
			if(this.grade !=0 && this.grade){
				this.obj.push(this.grade)
			}
			if(this.version !=0 && this.version){
				this.obj.push(this.version)
			}
			if(this.years !=0 && this.years){
				this.obj.push(this.years)
			}
			apiPaperWithTagList({
				"id":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				console.log(res)
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		openFile(item){
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
						utype:"user",
			  			items:[],
						info:{
							"idCard":localStorage.getItem('userID'),
							"schoolName":'专家',
							"name":'专家',
							"classname":'专家'
						}
			          }
			        ]
			      }
				this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
			}
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
			addPaper(){
				this.$router.push('manage_user_import')
			},
	},
	mounted() {
		this.color = user().color;
		// this.TagTypeList = []
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

		// 查询全部试卷
		apiPaperWithTagList({
			"id":[],
			"pageNum": this.pageNum,
			"pageSize": this.pageSize
		}).then(res=>{
			console.log(res)
			this.paperList = res.data.data.list
			this.total= res.data.data.total
			this.currentPage= res.data.data.pageNum
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

.group /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
	background-color: rgb(43, 187, 97);
	border-color: rgb(43, 187, 97);
}
.group /deep/  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
	background-color: rgb(43, 187, 97);
}
.right .download {
		background-color: #2bbb61;
	}

	.status {
		color: #2bbb61;
	}

	
</style>
