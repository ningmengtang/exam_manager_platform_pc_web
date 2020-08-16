<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div class="card-left">
							<div class="card-c">全部试卷</div>
							<div class="card-cc">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
						<div class="card-right"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_2">
						<div class="card-left">
							<div class="card-c">正在确认</div>
							<div class="card-cc">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_2"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_3">
						<div class="card-left">
							<div class="card-c">预定完成</div>
							<div class="card-cc">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_3"></div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple" :style="style.card_4">
						<div class="card-left">
							<div class="card-c">预定取消</div>
							<div class="card-cc">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
						<div class="card-right" :style="style.cardRight_4"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
<!-- 			<div class="p-li" v-for="(d,i) in papers" :key="d.i" v-if="d.o==1">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.time}}</div>
					<div class="p-status">{{d.status}}</div>
					<i class="p-status-icon el-icon-time"></i>
				</div>
			</div>
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" v-if="d.o==2" :style="style.pLi">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.time}}</div>
					<div class="p-status" style="color: #cccccc;">{{d.status}}</div>
					<i class="p-status-icon el-icon-download" ></i>
				</div>
			</div>
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" v-if="d.o==3" :style="style.pLi2">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.time}}</div>
					<div class="p-status" style="color:#fb4919">{{d.status}}</div>
					<i class="p-status-icon el-icon-loading"></i>
				</div>
			</div> -->
			<div class="p-li" v-for="(d,i) in papers" :key="d.i"  :style="d.o==1?(0):d.o==2?style.pLi3:d.o==3?style.pLi2:style.pLi4">
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title">{{d.title}}</div>
					<div class="p-time">{{d.time}}</div>
					<div class="p-status" >{{d.status}}</div>
					<i class="p-status-icon el-icon-time" v-if="d.o==1"></i>
					<i class="p-status-icon el-icon-download" v-else-if="d.o==2"></i>
					<i class="p-status-icon el-icon-loading" v-else-if="d.o==3"></i>
					<i class="p-status-icon el-icon-close" v-else-if="d.o==4"></i>
				</div>
			</div>
			
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="100" :total="1000">
			</el-pagination>
		</div>
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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

	export default {
		name: 'index_student',
		data() {
			return {
				endVal: 100,
				endVal1: 5000,
				endVal2: 454,
				style: {
					card_2: 'background-color: #41dde3;',
					card_3: 'background-color: #41e386;',
					card_4: 'background-color: #e35841;',
					cardRight_2: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-4.png') + ')'
					},
					cardRight_3: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-5.png') + ')'
					},
					cardRight_4: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					cardRight_5: {
						backgroundImage: 'url(' + require('../../../assets/img/bg-3.png') + ')'
					},
					pLi: {
						backgroundImage: 'url(' + require('../../../assets/img/fail-download.png') + ')'
					},
					pLi2: {
						backgroundImage: 'url(' + require('../../../assets/img/index-loading.png') + ')'
					},
					pLi3:{
						backgroundImage: 'url(' + require('../../../assets/img/already_dowload.png') + ')'
					},
					pLi4:{
						backgroundImage: 'url(' + require('../../../assets/img/succes-dowload.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				currentPage: 1,

				papers: [{
						title: '2019年人教版第一单元测验',
						synopsis: '565656565',
						time: '2020年10月11日',
						status: '未到时间下载',
						o: 1
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '已下载10次',
						o: 2
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '正在确认',
						o: 3
					},
					{
						title: '2019年人教版第一单元测验',
						synopsis: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日',
						status: '下载已结束',
						o: 4
					},
				],
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
	.message-row {
		width: 100%;
	}
</style>
