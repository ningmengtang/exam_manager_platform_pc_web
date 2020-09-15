<template>
	<div style="padding:20px">
		<div class="container"  v-loading="load"  
		element-loading-text="正在导出"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(255, 255, 255, 0.8)">
			
			<el-button type="success" size="small"  @click="goAdd"  style="float:right;margin:10px">新建订单</el-button>
			<el-switch
				@change="changeOrderType"
				style="display: block;margin:15px;float:right"
				v-model="orderType"
				active-color="#13ce66"
				inactive-color="#409EFF"
				active-text="普通试卷订购"
				inactive-text="期末试卷订购">
			</el-switch>
			<el-select v-model="orderStatus" placeholder="请选择" @change="changeSelect">
				<el-option
				v-for="item in options"
				:label="item.name"
				:value="item.id">
				</el-option>
			</el-select>
			<el-button type="primary" size="small"  @click="downloadTable">导出报表</el-button>
			<el-table
				v-loading="loading"
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
				<el-table-column label="操作" width="480" align="center">
                    <template slot-scope="scope">

						<el-button type="primary" size="small"  @click="loadFile(scope.$index, scope.row)">上传合同</el-button>
						<el-button type="success" size="small"  @click="uploadFile(scope.$index, scope.row)">导出合同</el-button>
						<el-button type="success" size="small"  @click="openFile(scope.$index, scope.row)">查看详情</el-button>
						<el-button type="danger" size="small"  @click="DelFile(scope.$index, scope.row)">取消</el-button>
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
		AdminOrderDel,
		AdminOrderUpload,
		AdminOrderUploadFile,
		AdminOrderEndOfTermList,
		AdminOrderEndOfTermDel,
		SchoolOrderEndOfTermUploadFile,
		SchoolOrderEndOfTermGetFile,
		SchoolOrederDetailsList,
		SchoolOrederEndOfTermDetailsAdd,
		SchoolOrederEndOfTermDetailsList,
		SchoolOrederDel
	} from '@/api/api.js'
	export default {
		data() {
			return {
				currentPage:1,
				pageSize:8,
				pageNum:1,
				total:0,
				orderList:[],  //订单数据
				orderStatus:4,
				orderType:true,
				loading:false,
				load:false,
				tabelDownloadList:[],
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
				],
				userId:localStorage.getItem('userID')
			};
		},
		methods: {
			goAdd(){
				if(this.orderType){
					this.$router.push('order_school_add2')
				}else{
					this.$router.push('order_school_add3')
				}	
			},
			changeSelect(){
				this.currentPage = 1
				this.pageSize = 8
				this.pageNum = 1
				this.total = 0
				this.orderList = []  //订单数据
				this.getItemTable()
				

			},
			changeOrderType(){
				this.currentPage = 1
				this.pageSize = 8
				this.pageNum = 1
				this.total = 0
				this.orderList = []  //订单数据
				this.orderStatus = 4
				this.getItemTable()
			},
			getItemTable(){
				this.loading  = true
				if(this.orderType){
					if(this.orderStatus == 4){
						apiAdminOrderList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"school_id": this.userId,
							// "operator_type":this.operatorType
						}).then(res=>{
							this.loading  = false
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})	
					}else{
						apiAdminOrderList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"school_id": this.userId,
							// "operator_id": this.operatorId,
							// "operator_type":this.operatorType,
							"status":this.orderStatus
						}).then(res=>{
							this.loading  = false
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})	
					}
				}else{
					if(this.orderStatus == 4){
						AdminOrderEndOfTermList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"school_id": this.userId,
							// "operator_id": this.operatorId,
							// "operator_type":this.operatorType
						}).then(res=>{
							this.loading  = false
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})	
					}else{
						AdminOrderEndOfTermList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"school_id": this.userId,
							// "operator_id": this.operatorId,
							// "operator_type":this.operatorType,
							"status":this.orderStatus
						}).then(res=>{
							this.loading  = false
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})	
					}
				}
				
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getItemTable()

			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.getItemTable()

			},
			// 下载合同
			uploadFile(index,row){
				if(this.orderType){
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
				}else{
					SchoolOrderEndOfTermGetFile(row.id).then(res=>{
						// console.log(res)
						const blob = new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'})
						let link = document.createElement('a');
						let objectUrl = URL.createObjectURL(blob);
						link.setAttribute("href",objectUrl);
						link.setAttribute("download",'期末订购合同.docx'); 
						link.click();
						//释放内存
						window.URL.revokeObjectURL(link.href)
					})
				}
				
			},
			// 上传合同
			loadFile(index,row){
				if(this.orderType){
					var input =  document.createElement('input')
					input.type = 'file'
					input.accept = '.docx,.DOCX,.doc,.DOC,.pdf,.PDF'
					input.addEventListener('change',(event)=>{
						let file = event.target.files[0]
						var data = new FormData()
						data.append('file',file)
						AdminOrderUploadFile(row.id,data).then(res=>{
							if(res.data.result){
								this.$message.success('上传成功')
								apiAdminOrderList({
									"pageNum":this.pageNum,
									"pageSize":this.pageSize,
									"operator_id": this.operatorId,
									"operator_type":this.operatorType
								}).then(res=>{
									this.orderList = res.data.data.list
									this.total = res.data.data.total
									this.currentPage = res.data.data.pageNum
								})
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
					input.accept = '.docx,.DOCX,.doc,.DOC,.pdf,.PDF'
					input.addEventListener('change',(event)=>{
						let file = event.target.files[0]
						var data = new FormData()
						data.append('file',file)
						SchoolOrderEndOfTermUploadFile(row.id,data).then(res=>{
							if(res.data.result){
								this.$message.success('上传成功')
								apiAdminOrderList({
									"pageNum":this.pageNum,
									"pageSize":this.pageSize,
									"school_id": this.userId
									// "operator_id": this.operatorId,
									// "operator_type":this.operatorType
								}).then(res=>{
									this.orderList = res.data.data.list
									this.total = res.data.data.total
									this.currentPage = res.data.data.pageNum
								})
							}else{
								this.$message.error(res.data.message)
							}
						})
					})
					input.click()
					input.remove()
				}

			},
			// 删除订单
			DelFile(index,row){
				if(this.orderType){
					this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						SchoolOrederDel(row.id).then(res=>{
							if(res.data.result){
								this.$message.success('删除成功')
								this.getItemTable()
							}else{
								this.$message.error(res.data.message)
							}
						})
					}).catch(() => {
							
					});
				}else{
					this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						AdminOrderEndOfTermDel(row.id).then(res=>{
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
			openFile(index,row){
				sessionStorage.setItem('schoolAffirmData', JSON.stringify(row))
				this.$router.push({name: "distribution_school_affirm", query:{orderType:this.orderType}});
				
			},
			// 导出报表
			downloadTable(){
				this.tabelDownloadList = []
				for(var i=0;i<this.orderList.length;i++){
					this.getTableList(this.orderList[i],i)
				}
				
				this.load = true
				setTimeout(()=>{
					this.getDownloadList()
				},1000)
				
			
			},
			getDownloadList(){
				let allOrderTable = []
				for(let a=0;a<this.tabelDownloadList.length;a++){
					let data = this.tabelDownloadList[a].data
					let orderTable = {
						"order_status":this.tabelDownloadList[a].order_status,
						"schoolCode":this.tabelDownloadList[a].schoolCode,
						"schoolName":this.tabelDownloadList[a].schoolName,
						"create_date":this.tabelDownloadList[a].create_date,
						"chinens_1":'',
						"math_1":'',
						"eng_1":'',
						"poper_1":'',
						"money_1":'',
						"chinens_2":'',
						"math_2":'',
						"eng_2":'',
						"poper_2":'',
						"money_2":'',
						"chinens_3":'',
						"math_3":'',
						"eng_3":'',
						"poper_3":'',
						"money_3":'',
						"chinens_4":'',
						"math_4":'',
						"eng_4":'',
						"poper_4":'',
						"money_4":'',
						"chinens_5":'',
						"math_5":'',
						"eng_5":'',
						"poper_5":'',
						"money_5":'',
						"chinens_6":'',
						"math_6":'',
						"eng_6":'',
						"poper_6":'',
						"money_6":'',
						"allpoper":'',
						"allmoney":'',
						"memo":''
					}
					for( let b=0;b<data.length;b++){
						// console.log((data[b].subject)
						let subject = JSON.parse(data[b].subject)
						if(data[b].classes == '一年级'){
							orderTable.poper_1 = data[b].count
							orderTable.money_1 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_1 =  data[b].count
								}else if(element == '英语'){
									orderTable.math_1 = data[b].count
								}else if(element == '数学'){
									orderTable.eng_1 =  data[b].count
								}
							});
						}else if(data[b].classes == '二年级'){
							orderTable.poper_2 = data[b].count
							orderTable.money_2 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_2 =  data[b].count
								}else if(element == '英语'){
									orderTable.math_2 =  data[b].count
								}else if(element == '数学'){
									orderTable.eng_2 =  data[b].count
								}
							});
						}else if(data[b].classes == '三年级'){
							orderTable.poper_3 = data[b].count
							orderTable.money_3 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_3 =  data[b].count
								}else if(element == '英语'){
									orderTable.math_3 = data[b].count
								}else if(element == '数学'){
									orderTable.eng_3 = data[b].count
								}
							});
						}else if(data[b].classes == '四年级'){
							orderTable.poper_4 = data[b].count
							orderTable.money_4 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_4 = data[b].count
								}else if(element == '英语'){
									orderTable.math_4 = data[b].count
								}else if(element == '数学'){
									orderTable.eng_4 =  data[b].count
								}
							});
						}else if(data[b].classes == '五年级'){
							orderTable.poper_5 = data[b].count
							orderTable.money_5 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_5 =  data[b].count
								}else if(element == '英语'){
									orderTable.math_5 =  data[b].count
								}else if(element == '数学'){
									orderTable.eng_5 = data[b].count
								}
							});
						}else if(data[b].classes == '六年级'){
							orderTable.poper_6 = data[b].count
							orderTable.money_6 = data[b].total_price
							subject.forEach(element => {
								if(element == '语文'){
									orderTable.chinens_6 = data[b].count
								}else if(element == '英语'){
									orderTable.math_6 = data[b].count
								}else if(element == '数学'){
									orderTable.eng_6 = data[b].count
								}
							});
						}
					}
					allOrderTable.push(orderTable)
					for(var c=0;c<allOrderTable.length;c++){
						let allmoney = ''
						let allpoper = ''
						let item = allOrderTable[c]
						allOrderTable[c].allmoney = item.money_1 + item.money_2+item.money_3+item.money_4+item.money_5+item.money_6
						allOrderTable[c].allpoper = item.poper_1 +  item.poper_2+item.poper_3+item.poper_4+item.poper_5+item.poper_6
					}
				}
				setTimeout(()=>{
					this.handleDownload(allOrderTable)
					this.load = false
				},500)
			},
			handleDownload(allOrderTable){
				const {export_json_to_excel} = require('./Export2Excel2'); //引入文件
				const multiHeader = [['代码', '学校', '订单日期', '订单状态', '一年级', '', '', '', '','二年级', '', '', '', '','三年级', '', '', '', '','四年级', '', '', '', '','五年级', '', '', '', '','六年级', '', '', '', '','总人数','总费用','备注']] //对应表格输出的title
				const multiHeader2 = [['', '', '', '', '一年级', '一年级', '一年级',  '一年级',  '一年级','二年级', '二年级', '二年级', '二年级', '二年级','三年级', '三年级', '三年级', '三年级', '三年级','四年级', '四年级', '四年级', '四年级', '四年级','五年级', '五年级', '五年级', '五年级', '五年级','六年级', '六年级', '六年级', '六年级', '六年级','','','']] //对应表格输出的title

				const tHeader = [['', '', '', '', '语文', '数学', '英语', '人数', '费用','语文', '数学', '英语', '人数', '费用','语文', '数学', '英语', '人数', '费用','语文', '数学', '英语', '人数', '费用','语文', '数学', '英语', '人数', '费用','语文', '数学', '英语', '人数', '费用', '','','']] //对应表格输出的title
				const filterVal = ['schoolCode','schoolName','create_date','order_status','chinens_1','math_1','eng_1','poper_1','money_1','chinens_2','math_2','eng_2','poper_2','money_2','chinens_3','math_3','eng_3','poper_3','money_3','chinens_4','math_4','eng_4','poper_4','money_4','chinens_5','math_5','eng_5','poper_5','money_5','chinens_6','math_6','eng_6','poper_6','money_6','allpoper','allmoney','memo']
				const header = []
				//进行所有表头的单元格合并，建议一行一行来，不然容易整乱
				const merges = [
					"A1:A3",
					"B1:B3",
					"C1:C3",
					"D1:D3",
					"E1:I1",
					"J1:N1",
					"O1:S1",
					"T1:X1",
					"Y1:AC1",
					"AD1:AH1",
					"AI1:AI3",
					"AJ1:AJ3",
					"AK1:AK3"
				];
				
				const list = allOrderTable
				const data = this.formatJson(filterVal,list)
				export_json_to_excel(multiHeader, tHeader,multiHeader2, data, '试卷订购统计表', merges)
			},
			formatJson(filterVal, jsonData) {
				console.log(jsonData.map(v => filterVal.map(j => v[j])))
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			async getTableList(list,index){
				await this.tabelPromise(list,index)
			},
			tabelPromise(list,index){
				if(this.orderType){
					return new Promise((resolve,reject)=>{
						SchoolOrederDetailsList({
							"order_id":list.id
						}).then(res=>{
							let data = res.data.data.list
							this.tabelDownloadList.push({
								"schoolCode":list.school_code,
								"order_status":list.status ==0?'待缴费':list.status == 1?'已缴费':list.status == 2?'已分发':list.status == 3?'已取消':'暂无',
								"schoolName":list.school_name,
								"create_date":list.create_date,
								"data":data
							})
							resolve(res)
						})
					})	
				}else{
					return new Promise((resolve,reject)=>{
						SchoolOrederEndOfTermDetailsList({
							"order_id":list.id
						}).then(res=>{
							let data = res.data.data.list
							this.tabelDownloadList.push({
								"schoolCode":list.school_code,
								"order_status":list.status ==0?'待缴费':list.status == 1?'已缴费':list.status == 2?'已分发':list.status == 3?'已取消':'暂无',
								"schoolName":list.school_name,
								"create_date":list.create_date,
								"data":data
							})
							resolve(res)
						})
					})
				}
			},
		},
		mounted() {
			this.operatorId = Number(localStorage.getItem('userID'))
			this.operatorType = localStorage.getItem('loginUserType')
			// this.operatorId = 
			this.color = user().color;
			apiAdminOrderList({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize,
				"school_id": this.userId
				// "operator_id": this.operatorId,
				// "operator_type":this.operatorType
			}).then(res=>{
				this.orderList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
