<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{useName}}</div>
							<div class="user-id">ID：{{useId}}</div>
							<div class="identity" :style="{'background-color':color}">学校</div>
							<!-- <div class="message">
								<div class="school">北京师范小学</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
			<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-bottom: 20px;">
				<el-form-item label="订购总数">
					<el-input v-model="form.count" readonly>
						<template slot="append">份</template>
					</el-input>
				</el-form-item>
				<el-form-item label="订购类型">
					<el-input v-model="form.style_count" readonly>
						<template slot="append">种</template>
					</el-input>
				</el-form-item>
				<el-form-item label="联系电话" >
					<el-input v-model="form.contact_phone" readonly></el-input>
				</el-form-item>
				<el-form-item label="收货人员" >
					<el-input v-model="form.contacts" readonly></el-input>
				</el-form-item>
				<el-form-item label="收货地址" >
					<el-input v-model="form.contact_address" readonly></el-input>
				</el-form-item>
			</el-form>
			<div class="buttom-box">
				
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-top" :style="{'border-color':color}">订单详细
				<!-- <el-button type="success" class="buttom" @click="dialogTableVisible = true" :style="{'background-color': color, 'border-color': color }"><span
					 class="el-icon-plus"></span>
					新增订购单</el-button> -->
			</div>

			<!--订单列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="(item,i) in orderDetailsList">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">
                            <span>
                                {{item.classes}} ： 已选
                            </span>
                            <span>
                                {{item.subject}}
                            </span>
						</div>
						<div class="p-particular">
							<div>数量：各{{item.count}}份</div>
						    <!-- <div>单价{{item.price}}元</div> -->
							<div>总价：{{item.total_price }}元</div>
							<!-- <div class="fault" @click="upload(i)"  v-if="!item.uploadFile">学生信息未导入，点击重导</div> -->
						</div>
					</div>
					<el-button type="primary" size="small" style="float:right" v-if="!item.isOrderType"  @click="uploadFile(item,i)" >导入学生信息</el-button>
					<el-button type="success" size="small" style="float:right" v-if="item.isOrderType"  @click="uploadFile(item,i)" >已导入学生信息</el-button>
					<!-- <el-button type="success" size="small" style="float:right" v-if="item.status == 1" disabled >已分配</el-button> -->
				</div>
			</div>
		</div>
		<!-- 提示框 -->
		<el-dialog title="选择试卷" :visible.sync="dialogTableVisible" >
			<div>
				<span>
					已选择:[
					<span style="color:red">
						{{ParperType.title}}
					</span>
					]
					
				</span>
			</div>
			 <el-table
				:data="tableData"
				highlight-current-row
				@current-change="handleCurrentChangeSelect"
				>
				 <el-table-column
					type="index"
					width="50">
				</el-table-column>
				<el-table-column
					prop="createDate"
					label="上传时间"
					>
				</el-table-column>
				<el-table-column
					prop="operator_name"
					label="上传人"
					>
				</el-table-column>
				<el-table-column
					prop="title"
					label="试卷名称"
					>
				</el-table-column>
				
			</el-table>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>

			<div>
				<el-button type="primary" @click="onSubmit">确定分发</el-button>
    			<el-button @click="dialogTableVisible = false">取消</el-button>
			</div>
		</el-dialog>
	
	</div>
</template>
<script>
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import {
		apiAdminOrderItemList,
		AdminOrderUpload,
		selectAllUserTag,
		improtSchoolAndTeachersAndStudentsInfoByAlredyUpload,
		selectTag,
		SchoolOrederDetailsList,
		SchoolOrderEndOfTermDetailsList,
		AdminOrderEndOfTermUpload
	} from '@/api/api.js'
	export default {
		data() {
			return {
				adminAffirmData:[],
                useId:localStorage.getItem('userID'),
                useName:localStorage.getItem('userName'),
				color: '',
				endVal1: 6,
				endVal2: 454,
				currentPage: 1,
				orderDetailsList:[],
				array_nav2: [],
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				array_nav9: [],
				orderType:'',
				percentage:50,
				value1: '',
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
				form: {
					count: '',
					style_count: '',
					contact_phone: '',
					contacts: '',
					contact_address: '',
					
				},
				papers: [],
				tableData: [],
				adminAffirmData:'',
				dialogTableVisible: false,
				dialogTableVisible2: false,
				pageSize:8,
				pageNum:1,
				total:0,
				id:[],
				ParperType:[],

			};
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
			getValue() {

				console.log(this.array_nav)

			},
			pushPerpar(){

				// improtSchoolAndTeachersAndStudentsInfoByAlredyUpload()
			},
			onSubmit(){
				// 分配学生
				improtSchoolAndTeachersAndStudentsInfoByAlredyUpload(this.Itemid,this.ParperType.id).then(res=>{
					console.log(res)
					if(res.data.result){
						this.$message.success('分配成功')
						this.dialogTableVisible = false
						// apiAdminOrderItemList({
						// 	"order_id":this.adminAffirmData.id
						// }).then(res=>{
						// 	if(res.data.data.list){
						// 		this.papers = res.data.data.list
						// 	}else{
						// 		this.$message.error('查询不到订单项')
						// 	}
						// })
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			handleCurrentChangeSelect(val){
				this.ParperType = val
			},
			handleSizeChange(val) {
				this.pageSize = val;
				selectAllUserTag({
					"id":this.id,
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
					// console.log(res)
				})
			},
			handleCurrentChange(val){
				this.pageNum = val
				selectAllUserTag({
					"id":this.id,
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
					// console.log(res)
				})
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//进度条
			format(percentage) {
				return percentage === 100 ? '满' : `${percentage}%`;
			},
			// submit() {
			// 	//关闭窗口
			// 	this.dialogTableVisible = false;
			// },
			netx(){
				this.percentage=100;
			   this.dialogTableVisible2 = false;
			},
			black(){
				this.$router.push('order_school')
			},
			uploadFile(item,index){
				if(this.orderType){
					var input =  document.createElement('input')
					input.type = 'file'
					input.accept = '.xls'
					input.addEventListener('change',(event)=>{
						let file = event.target.files[0]
						let data = new FormData()
						data.append('file',file)
						AdminOrderUpload(item.order_item_ids,data).then(res=>{
							if(res.data.result){
								
								this.orderDetailsList[index].isOrderType = true
								 this.$forceUpdate();
								// console.log(this.orderDetailsList[index])
								this.$message.success('上传成功')
								
							}else{
								this.$message.error(res.data.message)
							}
						})
					})
					input.click()
					input.remove() 
				}else{
					
					var input =  document.createElement('input')
					input.type = 'file'
					input.accept = '.xls'
					input.addEventListener('change',(event)=>{
						let file = event.target.files[0]
						let data = new FormData()
						data.append('file',file)
						AdminOrderEndOfTermUpload(item.order_item_ids,data).then(res=>{
							if(res.data.result){
								this.orderDetailsList[index].isOrderType = true
								 this.$forceUpdate();
								// console.log(this.orderDetailsList[index])
								this.$message.success('上传成功')
							}else{
								this.$message.error(res.data.message)
							}
						})
					})
					input.click()
					input.remove() 
					
				}
				
				
			},
			// 分配试卷
			addPaper(item){
				if(item.file_path){
					this.Itemid = item.id
					this.dialogTableVisible = true
					// 通过标签查询试卷
					this.id = []
					this.ParperType = ''
					for(var i=0;i<item.tag_list.length;i++){
						this.id.push(item.tag_list[i].id)
					}
					selectAllUserTag({
						"id":this.id,
						"pageSize":this.pageSize,
						"pageNum":this.pageNum
					}).then(res=>{

						this.tableData = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					})
				}else{
					this.$message.error('请先分配学生信息')
				}
			}
		},
		mounted() {
			this.color = user().color;
			this.orderType = this.$route.query.orderType
			console.log(this.orderType)
			let adminAffirmData = JSON.parse(sessionStorage.getItem("schoolAffirmData")) 
			if(adminAffirmData){
                // console.log(adminAffirmData)
				this.adminAffirmData = adminAffirmData
				this.form.count = adminAffirmData.count
				this.form.style_count =adminAffirmData.style_count
				this.form.contact_phone = adminAffirmData.contact_phone
				this.form.contacts = adminAffirmData.contacts
				this.form.contact_address = adminAffirmData.contact_address
				this.form.id = adminAffirmData.id
				if(this.orderType){
					SchoolOrederDetailsList({
						"order_id":adminAffirmData.id,
						"order_sn":adminAffirmData.sn
					}).then(res=>{
						this.orderDetailsList = res.data.data.list
						for(var i=0;i<this.orderDetailsList.length;i++){
							this.orderDetailsList[i].isOrderType = false
						}
					})
				}else{
					SchoolOrderEndOfTermDetailsList({
						"order_id":adminAffirmData.id,
						"order_sn":adminAffirmData.sn
					}).then(res=>{
						this.orderDetailsList = res.data.data.list
						for(var i=0;i<this.orderDetailsList.length;i++){
							this.orderDetailsList[i].isOrderType = false
						}
					})
				}
				
			}else{
				this.$message.error('查询不到订单信息')
			}
		}
	};
</script>
<style scoped src="../../../assets/css/distribution-affirm.css"></style>
<style scoped src="../../../assets/css/distribution.css"></style>
<style scoped>
	.title{
		width: 250px;
	}
	.synopsis{
		width: 250px;
	}
</style>
