<template>
	<div class="box">
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
				<el-input placeholder="请输入内容" v-model="search">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				 <el-button type="primary" @click="" class="buttom" >搜索</el-button>
			</div>
		</div>
		
		<div class="particular">
			<div class="li">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">古得教师</div>
				<div class="title-box">
					<div class="title">2019年人教版一年级第一单元作业5656565656</div>
					<div class="synopsis">包含小学一年级语文2019年人教版单元作业65656566555555</div>
				</div>
				<div class="time">2020年10月11日上传</div>
				<div class="label-box">
					<div class="label">2019</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<i class="icon el-icon-check hover"></i>
					<div class="status hover">分发完成</div>
					<el-button type="text" class="download hover" @click="dialogVisible = true">立即下载</el-button>
				</div>
			</div>
			<div class="li" v-for="item in paperList">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">古得教师</div> -->
				<div class="title-box">
					<div class="title">{{item.title}}</div>
					<div class="synopsis">包含小学一年级语文2019年人教版单元作业65656566555555</div>
				</div>
				<div class="time">{{item.createDate}}</div>
				<div class="label-box" >
					<div class="label">2019</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time"></i>
					<div class="status">正在分发</div>
					<el-button type="text" class="download" @click="dialogVisible = true">立即下载</el-button>
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="100" :total="1000">
				</el-pagination>
			</div>
		</div>
		<!-- <el-button type="text"  @click="dialogVisible = true" >点击打开 Dialog</el-button> -->

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
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
	import {getValue,handleSizeChange,handleCurrentChange,handleClose,getQuery,TagTypePromise} from '@/assets/js/manage.js'
	import {selectTag,ApiTagSelectList,paperWithTag} from '@/api/api.js'
	export default {
		data() {
			return {
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
				paperList:0,
				array_nav: [], //存储el-chckbox数组
				array_nav_2: [],
				array_nav_3: [],
				array_nav_4: [],
				array_nav_5: [],
				array_nav_6: [],
				array_nav_7: [],
				TagType:[],
				TagTypeList:[],
				search: '',
				currentPage: 1,
				dialogVisible: false,

			};
		},
		methods: {
			getValue,handleSizeChange,handleCurrentChange,handleClose,getQuery,TagTypePromise,
			async getTypeList(tagType,index){
				await this.TagTypePromise(tagType,index)
				// return n 
			}

		},
		mounted() {
			this.TagTypeList = []
			ApiTagSelectList({
				"parentId":0,
				"pageSize":999,
				"pageNum":1
			}).then(res=>{
				// console.log(res)
				this.TagType = res.data.data.list
				var arr = []
				for(var i=0;i<this.TagType.length;i++){
					this.getTypeList(this.TagType[i],i)
				}
			})
			// 全部试卷查询
			paperWithTag().then(res=>{
				// console.log(res)
				if(res.data.data){
					if(res.data.data){
						this.paperList = res.data.data
					}else{
						this.paperList = []
					}
					
				}
			})
		}
		
	};
</script>

<style scoped src="../../../assets/css/manage.css">
</style>
