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
						</div>
					</div>
				</div>
			</div>
			<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-bottom: 20px;">
				<el-form-item label="订购总数">
					<el-input v-model="form.count" >
						<template slot="append">份</template>
					</el-input>
				</el-form-item>
				<el-form-item label="订购类型">
					<el-input v-model="form.style_count">
						<template slot="append">种</template>
					</el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.contact_phone"></el-input>
				</el-form-item>
				<el-form-item label="收货人员">
					<el-input v-model="form.contacts"></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="form.contact_address"></el-input>
				</el-form-item>
				<!-- <el-date-picker
				      v-model="value1"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
					  class="ids">
				    </el-date-picker> -->
			</el-form>
			<div class="buttom-box">
				<!-- <el-button class="buttom-true" :style="{'background-color':color}" @click="pushPerpar">确认分配</el-button> -->
				<!-- <el-button class="buttom-false" @click="black()">取消订购</el-button> -->
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
				<div class="li-box" v-for="(item,i) in papers">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.title}}
							<div class="label-box">
								<div class="label" v-for="tag in item.tag_list">{{tag.text}}</div>
							</div>
						</div>
						<div class="p-particular">
							<div><span>数量{{item.count}} 份</span></div>
			
							
							<div class="fault" v-if="!item.file_path"  @click="uploadFile(item)">学生信息未导入，点击导入</div>
							<div class="success" v-if="item.file_path"  @click="uploadFile(item)">学生信息已导入，点击重新导入</div>
							<!-- <div class="" v-if=""></div> -->
						</div>
					</div>
					<el-button type="success" size="small" @click="addPaper(item)" style="float:right" v-if="!item.status" >分配试卷</el-button>
					<el-button type="success" size="small" @click="addPaper(item)" style="float:right" v-if="item.status == 1" >已分配</el-button>
				</div>
			</div>
			<!-- <div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="100" :total="1000">
				</el-pagination>
			</div>
			<div class="bottom-box">
				<div class="discount">
					<div class="i">折扣：</div>
					<div class="ii">￥666,666.00</div>
				</div>
				<div class="last">
					<div class="remind">不同年级、不同科目价格不同，购买的数量越多，价格越优惠</div>
					<div class="discount">
						<div class="i">折扣：</div>
						<div class="ii">￥666,666.00</div>
					</div>
				</div>
			</div> -->
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
				<el-table-column
					prop="title"
					label="试卷状态"
					>
					<template slot-scope="scope">
                        <el-tag
                            :type="scope.row.putInto==1?'success':(scope.row.putInto==0?'danger ':'warning')"
                        >{{scope.row.putInto ===0?'入库失败':scope.row.putInto ===1?'入库成功':scope.row.putInto ===2?'正在入库':''}}</el-tag>
                    </template>
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
		improtSchoolAndTeachersAndStudentsInfoByAlredyUpload
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
				array_nav2: [],
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				array_nav9: [],
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
				pageSize:6,
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
					// console.log(res)
					if(res.data.result){
						this.$message.success('分配成功')
						this.dialogTableVisible = false
						apiAdminOrderItemList({
							"order_id":this.adminAffirmData.id
						}).then(res=>{
							if(res.data.data.list){
								this.papers = res.data.data.list
							}else{
								this.$message.error('查询不到订单项')
							}
						})
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
			uploadFile(item){
				var input =  document.createElement('input')
				input.type = 'file'
				input.accept = '.xls'
				input.addEventListener('change',(event)=>{
					let file = event.target.files[0]
					let data = new FormData()
					data.append('file',file)
					AdminOrderUpload(item.id,data).then(res=>{
						if(res.data.result){
							this.$message.success('上传成功')
							apiAdminOrderItemList({
								"order_id":this.adminAffirmData.id
							}).then(res=>{
								if(res.data.data.list){
									this.papers = res.data.data.list
								}else{
									this.$message.error('查询不到订单项')
								}
								console.log(res)
							})
						}else{
							this.$message.error(res.data.message)
						}
					})
				})
				input.click()
            	input.remove() 
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
			let adminAffirmData = JSON.parse(sessionStorage.getItem("adminAffirmData")) 
			if(adminAffirmData){
				this.adminAffirmData = adminAffirmData
				this.form.count = adminAffirmData.count
				this.form.style_count =adminAffirmData.style_count
				this.form.contact_phone = adminAffirmData.contact_phone
				this.form.contacts = adminAffirmData.contacts
				this.form.contact_address = adminAffirmData.contact_address
				this.form.id = adminAffirmData.id
				apiAdminOrderItemList({
					"order_id":adminAffirmData.id
				}).then(res=>{
					if(res.data.data.list){
						this.papers = res.data.data.list
					}else{
						this.$message.error('查询不到订单项')
					}
					console.log(res)
				})
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
<style>

</style>
