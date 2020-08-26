<template>
	<div>
		<div class="container">
			<el-button type="success" size="small"  @click="goAdd"  style="float:right;margin:10px">新建订单</el-button>
			<el-select v-model="orderStatus" placeholder="请选择" @change="changeSelect">
				<el-option
				v-for="item in options"
				:label="item.name"
				:value="item.id">
				</el-option>
			</el-select>
			<el-table
				:data="orderList"
				border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
				>
				<el-table-column
					prop="operator_name"
					label="学校"
					>
				</el-table-column>
				<el-table-column
					prop="contacts"
					label="联系人"
					>
				</el-table-column>
				<el-table-column
					prop="contact_phone"
					label="联系电话">
				</el-table-column>
				<el-table-column
					prop="contact_address"
					label="联系地址">
				</el-table-column>
				<el-table-column label="订单状态" align="center">
					 <template slot-scope="scope">
						 {{scope.row.status ===0?'待确认':scope.row.status ===1?'已确认等待分发':scope.row.status ===2?'已取消':scope.row.status == 3?'已分发':''}}
                    </template>
				</el-table-column>
				<el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
						<el-button type="success" size="small"  @click="uploadFile(scope.$index, scope.row)">导出合同</el-button>
						<el-button type="danger" size="small"  @click="DelFile(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
			</el-table>
			<!-- 分页 -->
            <div class="page" style="margin:10px">
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
		apiAdminOrderList,
		apiAdminOrderUpdate,
		AdminOrderGetFile,
		AdminOrderDel
	} from '@/api/api.js'
	export default {
		data() {
			return {
				currentPage:1,
				pageSize:4,
				pageNum:1,
				total:0,
				orderList:[],  //订单数据
				orderStatus:4,
				options:[
				{
					id:4,
					name:"全部"
				},
				{
					id:0,
					name:"待确认"
				},
				{
					id:1,
					name:"已确认等待分发"
				},
				{
					id:3,
					name:'已分发'
				},
				{
					id:2,
					name:"已取消"
				}
				]
			};
		},
		methods: {
		
			goAdd(){
				this.$router.push('order_school_add2')
			},
			changeSelect(){
				this.getItemTable()
			},
			getItemTable(){
				if(this.orderStatus == 4){
					apiAdminOrderList({
						"pageNum":this.pageNum,
						"pageSize":this.pageSize,
						"operator_id": this.operatorId,
						"operator_type":this.operatorType
						// "status":this.orderStatus
					}).then(res=>{
						this.orderList = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					})	
				}else{
					apiAdminOrderList({
						"pageNum":this.pageNum,
						"pageSize":this.pageSize,
						"operator_id": this.operatorId,
						"operator_type":this.operatorType,
						"status":this.orderStatus
					}).then(res=>{
						this.orderList = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					})	
				}
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getItemTable()
				// apiAdminOrderList({
				// 	"pageNum":this.pageNum,
				// 	"pageSize":this.pageSize,
				// 	"operator_id": this.operatorId,
				// 	"operator_type":this.operatorType
				// }).then(res=>{
				// 	this.orderList = res.data.data.list
				// 	this.total = res.data.data.total
				// 	this.currentPage = res.data.data.pageNum
				// })
			},
			handleCurrentChange(val) {
				this.pageNum = val
				console.log(this.orderStatus)
				this.getItemTable()
				// apiAdminOrderList({
				// 	"pageNum":this.pageNum,
				// 	"pageSize":this.pageSize,
				// 	"operator_id": this.operatorId,
				// 	"operator_type":this.operatorType
				// }).then(res=>{
				// 	this.orderList = res.data.data.list
				// 	this.total = res.data.data.total
				// 	this.currentPage = res.data.data.pageNum
				// })
			},
			// 下载合同
			uploadFile(index,row){
				AdminOrderGetFile(row.id).then(res=>{
					// console.log(res)
					const blob = new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'})
					let link = document.createElement('a');
				 	let objectUrl = URL.createObjectURL(blob);
					link.setAttribute("href",objectUrl);
					link.setAttribute("download",'订购合同.docx'); 
					link.click();
					//释放内存
					window.URL.revokeObjectURL(link.href)
				})
			},
			// 删除订单
			DelFile(index,row){
				this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        		  confirmButtonText: '确定',
        		  cancelButtonText: '取消',
        		  type: 'warning'
        		}).then(() => {
					AdminOrderDel(row.id).then(res=>{
						if(res.data.result){
							this.$message.success('删除成功')
							this.getItemTable()
						}else{
							this.$message.error(res.data.message)
						}
					})
        		}).catch(() => {
        		         
        		});
			}
		},
		mounted() {
			this.operatorId = Number(localStorage.getItem('userID'))
			this.operatorType = localStorage.getItem('loginUserType')
			// this.operatorId = 
			this.color = user().color;
			apiAdminOrderList({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize,
				"operator_id": this.operatorId,
				"operator_type":this.operatorType
			}).then(res=>{
				// console.log(res)
				this.orderList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
