<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="total" />
							</div>
						</div>
						<div class="card-right"></div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple" :style="style.card_2">
						<div class="card-left">
							<div class="card-c">可以下载</div>
							<div class="card-cc">
								<ICountUp :endVal="mayDownload" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">下载失效</div>
							<div class="card-cc">
								<ICountUp :endVal="endVal3" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
			<!-- <div class="p-li">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title">2019年人教版第一单元测验</div>
					<div class="p-time">时间2020年10月10日~2020年10月20日</div>
					<div class="p-status">可以下载</div>
					<i class="p-status-icon el-icon-download"></i>
				</div>
			</div> -->
			<div class="p-li" :style="style.pLi" v-for="(d,i) in papers" :key="d.i" >
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">{{d.subject}}</div>
						<div class="grade">{{d.gradeClass}}</div>
					</div>
					<div class="p-title">{{d.elementTest}}</div>
					<div class="p-time">{{d.modifyDate}}</div>
					<div class="p-status" :style="d.status==1?(0):style.pStatus" >{{d.status==1?'可以下载':'下载失败'}}</div>
					<i class="p-status-icon" :class="d.status==1?'el-icon-download':'el-icon-close'"></i>
					
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
			</el-pagination>
		</div>
		<!-- 提示框 -->
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

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
	import Schart from 'vue-schart'
	import bus from '../../common/bus'
	import ICountUp from 'vue-countup-v2'
	import {studentIndex} from '@/api/api.js'
	import axios from 'axios'

	export default {
		name: 'index_student',
		data() {
			this.colors = ['#67C23A', '#409EFF', '#F56C6C']
			return {
				total:0,
				pageSize:6,
				pageNum:1,
				mayDownload:0,
				status:'',
				endVal: 100,
				endVal2: 0,
				endVal3: 0,
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
				currentPage: 1,
				papers:{},
				download: [{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '10',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '10',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '1',
						o: true
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '1',
						o: false
					},
				],
				dialogVisible: false,
			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
          studentIndex({}).then(res=>{
			  let papers=res.data.data;
			  //下载状态
			  let status=this.status=papers.list.status
			  // 一共条数
			  this.total=Number(papers.total);
			  // this.mayDownload=Number(papers.downloadStatus);

			  this.papers=papers.list;
			  // console.log(Number(papers[0]['eid']))
		  })




		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
<style scoped>
</style>
