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
										<ICountUp :endVal="Alltotal" />
										
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">入库完成</div>
									<div class="num">
										<ICountUp :endVal="Successtotal" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">正在入库</div>
									<div class="num">
										<ICountUp :endVal="Loadtotal" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">入库失败</div>
									<div class="num">
										<ICountUp :endVal="Errortotal" />
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
										<ICountUp :endVal="AlltotalOrder" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购完成</div>
									<div class="num">
										<ICountUp :endVal="SuccesstotalOrder" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购申请</div>
									<div class="num">
										<ICountUp :endVal="LoadtotalOrder" />
									</div>
								</div>
							</div>
							<div class="son">
								<div class="card-box">
									<div class="card-t">订购失败</div>
									<div class="num">
										<ICountUp :endVal="ErrortotalOredr" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="papers-box"  v-loading="loading">
			<div class="p-li" v-for="(d,i) in ExamList" :key="d.i" :style="d.putInto==2?(style.pLi2):style.pLi1" >
				<div class="p-icon-box">
					<div class="p-icon"></div>
				</div>
				<div class="p-particula">
					<div class="p-title"  >{{d.title}}</div>
					<div class="p-time" >{{d.createDate}}</div>
					
					<div class="p-status">{{d.putInto ==0?'取消入库':d.putInto == 1?'入库成功':d.putInto==2?'正在入库':''}}</div>
					<!-- <i class="p-status-icon el-icon-time" v-if="d.o==1"></i>
					<i class="p-status-icon el-icon-shopping-cart-2" v-else-if="d.o==2"></i>
					<i class="p-status-icon el-icon-loading" v-else-if="d.o==3"></i>
					<i class="p-status-icon el-icon-close" v-else-if="d.o==4"></i> -->
					<!-- <i class="p-status-icon el-icon-download" v-if="d.putInto==1" @click="downloadFile(d)"></i> -->
					<i class="p-status-icon el-icon-close" v-if="d.putInto==0"></i> 
					<i class="p-status-icon el-icon-loading" v-if="d.putInto==2"></i>
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
			</el-pagination>
		</div>
		<!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

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
	import {
		apiCommonExamSelectList,
		apiCommonExamSelectUpdate,
		apiAdminOrderList,
		apicommonExamGetFile
	} from '@/api/api.js'
	export default {
		name: 'index_student',
		data() {
			return {
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
				
				dialogVisible: false,

				// 试卷统计
				currentPage:1,
				pageSize:9,
				pageNum:1,
				total:0,
				Alltotal:0,
				Successtotal:0,
				Loadtotal:0,
				Errortotal:0,
				ExamList:[],
				loading:false,
				// 订单统计
				OredrList:[],
				SuccesstotalOrder:0,
				LoadtotalOrder:0,
				ErrortotalOredr:0,
				AlltotalOrder:0


			}
		},
		components: {
			Schart,
			ICountUp
		},
		mounted() {
			// 获取首页数据
			this.loading = true
			// const loading = this.$loading({
			// 	lock: true,
			// 	spinner: 'el-icon-loading',
			// });
			this.getStatisticsOrder()
			this.getStatisticsExam()
			this.getStatisticsExamPage()
			
			
		},
		methods: {
			// 统计数据（订购）
			getStatisticsOrder(){
				this.SuccesstotalOrder = 0
				this.LoadtotalOrder = 0
				this.ErrortotalOredr = 0
				this.AlltotalOrder = 0
				// 统计数据（订购）
				apiAdminOrderList({
					"pageSize":999,
					"pageNum":1
				}).then(res=>{
					let list = res.data.data.list
					this.AlltotalOrder = res.data.data.total
					for(var k=0;k<list.length;k++){
						if(list[k].status == 0){
							this.LoadtotalOrder++
						}else if(list[k].status == 1 ||list[k].status == 3){
							this.SuccesstotalOrder++
						}else if(list[k].status == 2){
							this.ErrortotalOredr++
						}
						
					}
				})
			},
			// 统计数据（试卷）
			getStatisticsExam(){
				this.Successtotal = 0
				this.Loadtotal = 0
				this.Errortotal = 0
				this.Alltotal = 0
				apiCommonExamSelectList({
					"pageSize":999,
					"pageNum":1
				}).then(res=>{
					let list = res.data.data.list
					this.Alltotal = res.data.data.total
					
					for(var i=0;i<list.length;i++){
						if(list[i].putInto == 0){
							this.Errortotal++
						}else if(list[i].putInto == 1){
							this.Successtotal++
						}else if(list[i].putInto == 2){
							this.Loadtotal++
						}
						
					}
				})
			},
			// 统计数据（试卷分页）
			getStatisticsExamPage(){
				apiCommonExamSelectList({
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					this.loading = false
					this.ExamList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageSize = val
				this.getStatisticsExamPage()
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.getStatisticsExamPage()
			},
			// 首页下载试卷
			downloadFile(item){
				if(item.affix){
					apicommonExamGetFile(item.id).then(res=>{
						var headers = res.headers['content-disposition']
						headers = headers.substr(headers.indexOf('filename=\"')+'filename=\"'.length).split("\"")[0];
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
							utype:localStorage.getItem('loginUserType'),
				          	items:[],
							info:{
								"idCard":localStorage.getItem('userID'),
								"schoolName":'管理员',
								"name":'管理员',
								"classname":'管理员'
							}
				          }
				        ]
				      }
					this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
				}
			}


			
		}
	};
</script>

<style scoped src="../../../assets/css/index.css"></style>
<style scoped>
	.message-row {
		width: 100%;
	}
</style>
