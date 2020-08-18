<template>
	<div class="box">
		<div class="message-row">
			<el-row :gutter="20" type="flex">
				<el-col :span="12">
					<div class="grid-content bg-purple flex" :style="style.card_5">
						<div class="el-row-box flex">
							<div class="son">
								<div class="card-box">
									<div class="card-t">全部试卷</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">入库完成</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">正在入库</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">入库失败</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple flex" :style="style.card_6">
						<div class="el-row-box flex">
							<div class="son">
								<div class="card-box">
									<div class="card-t">全部订购</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购完成</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购申请</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购失败</div>
									<div class="num">
										<ICountUp :endVal="endVal2" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box">
			<div class="p-li" v-for="(d,i) in papers" :key="d.i" :style="d.o==1?(style.pLi2):style.pLi1" >
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="top-box">
						<div class="subject">语文</div>
						<div class="grade">一年级</div>
					</div>
					<div class="p-title" v-if="d.o==1" >{{d.title}}</div>
					<div class="p-time" v-if="d.o==1">{{d.time}}</div>
					<div class="p-indent" v-if="d.o==2">{{d.time}}</div>
					<div class="p-indent" v-if="d.o==2">{{d.time}}</div>
					<div class="p-indent" v-if="d.o==2">{{d.time}}</div>
					<div class="p-status  ts" v-if="d.o==1">{{d.status}}</div>
					<div class="p-status" v-else>{{d.status}}</div>
					<i class="p-status-icon el-icon-time" v-if="d.o==1"></i>
					<i class="p-status-icon el-icon-shopping-cart-2" v-else-if="d.o==2"></i>
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
					card_5: 'background-color: #2CBC62;min-height: 188px;',
					card_6: 'background-color: #2878ff;min-height:188px',
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
					cardRight_6: {
						backgroundImage: 'none'
					},
					pLi: {
						backgroundImage: 'url(' + require('../../../assets/img/fail-download.png') + ')'
					},
					pLi2: {
						backgroundImage: 'url(' + require('../../../assets/img/index-loading.png') + ')'
					},
					pLi3: {
						backgroundImage: 'url(' + require('../../../assets/img/already_dowload.png') + ')'
					},
					pLi4: {
						backgroundImage: 'url(' + require('../../../assets/img/succes-dowload.png') + ')'
					},
					pStatus: 'color:#e2633b'
				},
				currentPage: 1,

				papers: [{
						title: '2019年人教版第一单元测验',
						synopsis: '565656565',
						time: '2020年10月11日',
						status: '入库申请，请及时处理',
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
		mounted() {},
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
