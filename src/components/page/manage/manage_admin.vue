<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
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
				
				</div>
				
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in paperList" >
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.operator_name }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain }}</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<div class="label-box">
					<!-- <div class="label">{{ data.label }}</div> -->
					<div class="label" v-for="card in data.tag_list">{{card.text}}</div>
					<!-- <div class="label">语文</div>
					<div class="label">一年级</div> -->
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
import {selectTag,ApiTagSelectList,paperWithTag,selectAllUserTag,ExamSelectPapersWithTagsForAllPapers} from '@/api/api.js'
export default {
	data() {
		return {
			color: '',
			DisStatusList:[],
			ElementTextList:[],
			PurposeList:[],
			SubjectList:[],
			GradeList:[],
			VersionList:[],
			YearsList:[],
			disStatus:0,
			elementTest:0,
			purpose:0,
			subject:0,
			grade:0,
			version:0,
			years:0,
			obj:[],
			TagType:[],

			pageNum:1,
			pageSize:4,
			total:0,
			currentPage:1,
			paperList:[]
		};
	},
	methods: {
		getQuery(){
			this.obj = []
			if(this.disStatus != 0 && this.disStatus){
				this.obj.push(this.disStatus)
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
			ExamSelectPapersWithTagsForAllPapers({
				"tag_list": this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				this.paperList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		},
		handleSizeChange(val) {
			console.log(val)
			this.pageSize = val
			ExamSelectPapersWithTagsForAllPapers({
				"tag_list":this.obj,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		handleCurrentChange(val) {
			console.log(val)
			this.pageNum = val;
			ExamSelectPapersWithTagsForAllPapers({
				"pageNum":this.pageNum,
				"tag_list":this.obj,
				"pageSize":this.pageSize
			}).then(res=>{
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		TagTypePromise(tagType,index){
			return new Promise((resolve,reject)=>{
				ApiTagSelectList({
					"pageSize":999,
					"pageNum":1,
					"parentId":tagType.id
				}).then(res=>{
					let all = [{
						"id":0,
						"sn":0,
						"text":'全部'
					}]
					let children = all.concat(res.data.data.list)
					switch(tagType.text){
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
							this.PurposeList= children
						break;
					}
					resolve(res)
				})
			})
		},
		async getTypeList(tagType,index){
			await this.TagTypePromise(tagType,index)
			// return n 
		}
	},
	mounted() {
		ApiTagSelectList({
			"parentId":0,
			"pageSize":999,
			"pageNum":1
		}).then(res=>{
			this.TagType = res.data.data.list
			var arr = []
			for(var i=0;i<this.TagType.length;i++){
				this.getTypeList(this.TagType[i],i)
			}
		})

		// 全部试卷查询
		ExamSelectPapersWithTagsForAllPapers({
			"tag_list": [],
			"pageSize":this.pageSize,
			"pageNum":this.pageNum
		}).then(res=>{
			console.log(res)
			this.paperList = res.data.data.list
			this.total= res.data.data.total
			this.currentPage= res.data.data.pageNum
		})
		this.color = user().color;
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
.group /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
	background-color: rgb(43, 187, 97)
}
</style>
