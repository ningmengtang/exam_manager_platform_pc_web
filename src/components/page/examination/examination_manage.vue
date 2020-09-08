<template>
	<div class="box">
<!-- 		<div class="group">
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
		</div> -->
		<div class="particular">
			<div class="li" v-for="(item,i) in paperList" :key="item.i">
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
					<div class="label" v-for="(d,i) in item.tag_list" :key="d.i">
						{{d.text}}
					</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time"></i>
					<div class="status">{{item.status==0 && item.putInto == 1?'可以下载':'不允许下载'}}</div>

					<el-button type="primary" v-if="item.status==0 && item.putInto == 1 " @click="downloadFile(item)">立即下载</el-button>
					<el-button type="primary" disabled v-else style="background-color: #999999;">立即下载</el-button>
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="page.pageSize" :total="page.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		studentIndex,
		apicommonExamGetFile
	} from '@/api/api.js'
	export default {
		data() {
			return {
				total: 0,
				page: {
					pageNum: 1,
					pageSize: 0
				},
				currentPage: 1,
				loading: false,
				status: '',
				papers: {},
				dialogVisible: false,
				paperList:[
					{operator_name:123,status:0,tag_list:[{text:'k'},{text:'k'},{text:'k'}]},
					{operator_name:123,status:1,tag_list:[{text:'k'},{text:'k'},{text:'k'}]},
					{operator_name:123,status:2,tag_list:[{text:'k'},{text:'k'},{text:'k'}]},
					{operator_name:123}
				]
			}
		},
		methods: {
			//分页
			handleSizeChange(val) {},
			// 分页2
			handleCurrentChange() {

			},
			//查询标签
			getQuery(){},

		},
		mounted() {
			this.loading = true

		},
	};
</script>

<style scoped src="../../../assets/css/examination.css"></style>
// 修改element 自带样式
<style>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}
</style>
