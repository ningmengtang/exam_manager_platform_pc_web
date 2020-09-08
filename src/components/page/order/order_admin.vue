<template>
	<div class="box" 
		 v-loading="load"
		element-loading-text="正在导出"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(255, 255, 255, 0.8)">
		<div class="top">
			<div class="group">
				<div class="row-group">
					<div class="th-group">订单类型</div>
					<div class="td-group" >
						<el-radio-group v-model="orderType" @change="changeOrderType">
							<el-radio-button v-for="(item,index) in orderTypeList" :label="item.id">
								{{item.name}}
							</el-radio-button>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="group">
				<div class="row-group">
					<div class="th-group">订单状态</div>
					<div class="td-group" >
						<el-radio-group v-model="orderStatus" @change="changeOrder">
							<el-radio-button v-for="(item,index) in orderStatusList" :label="item.id">
								{{item.name}}
							</el-radio-button>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div style="margin: 15px 15px 0px 15px" class="orderAdd">
				<el-button size="medium" type="success" @click="clickEndOrder">新建期末考试订单</el-button>
				<el-button size="medium" type="success" @click="clickOrder">新建普通考试订单</el-button>
				<el-button size="medium" type="success" @click="downloadTable">导出报表</el-button>
			</div>
		
			
		</div>
		<!-- 管理 -->
		<div class="particular">
			<div class="li" v-for="(data, i) in orderList" :key="data.id">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">{{ data.teacher }}</div> -->
				<div class="title-box">
					<div class="title">
						{{ data.operator_name }}</div>
					<div class="synopsis">
						<span>
							订单号：{{data.sn}}
						</span>

					</div>
					<div class="synopsis">
						<span>
							订购类型：{{data.style_count}}种，总份数：{{data.count}}份
						</span>

					</div>
				</div>
				<div class="time">
					<span>
						{{ data.create_date }}申请订购
					</span>
				</div>
				<div class="right">
					<div class="ii" >
						<div class="status_box">
							<!-- <i class="icon el-icon-loading ii"></i> -->
							<span class="text ii">{{data.status == 0?'待确定':data.status == 1?'已确认':data.status == 2?'已取消':''}}</span>
							<el-button type="primary"   v-if="data.status == 0"  @click="addOrder(data)">缴费</el-button>
							<el-button type="success" size="small"  @click="loadFile(data)">上传合同</el-button>
							<el-button type="success" size="small"  @click="uploadFile(data)">导出合同</el-button>
							<el-button type="success" size="small"  @click="openFile(data)">查看详情</el-button>
						    <el-button   v-if="data.status == 0 || data.status == 1" type="danger" @click="DelFile(data)" >取消</el-button>
						</div>
					</div>
				</div>
			</div>
			<div class="page">
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
		AdminOrderUploadFile,
		AdminOrderGetFile,
		AdminOrderEndOfTermListAll,
		apiAdminOrderEndOfTermUpdate,
		AdminOrderEndOfTermDelAll,
		AdminlOrderEndOfTermGetFile,
		AdminOrderEndOfTermUploadFile,
		AdminOrderDel,
		AdminOrderDetailsList,
		AdminOrderEndOfTermDetailsList
	} from '@/api/api.js'
	export default {
		data() {
			return {
				orderList:[],  //订单数据
				pageSize:6,
				pageNum:1,
				currentPage:1,
				orderType:1,
				load:false,
				total:0,
				color: '',
				checkAll: false,
				isIndeterminate: true,
				array_nav: [], //存储el-chckbox数组
				array_nav2: [], //存储el-chckbox数组
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				search: '',
				value1: '',
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				orderStatus:4,
				orderStatusList:[
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
					name:"已确认"
				},{
					id:2,
					name:"已取消"
				}],
				orderTypeList:[
				{
					id:1,
					name:"普通订单"
				},
				{
					id:2,
					name:"期末订单"
				},
				]
			};
		},
		methods: {
			//改变订单类型
			clickEndOrder(){
				this.$router.push('order_admin_add3')
			},
			clickOrder(){
				this.$router.push('order_admin_add2')
			},
			changeOrderType(){
				this.currentPage = 1
				this.pageSize = 6
				this.pageNum = 1
				this.total = 0
				this.orderList = []
				this.orderStatus = 4
				this.getOrderList()
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.getOrderList()
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.getOrderList()
			},
			changeOrder(){
				this.currentPage = 1
				this.pageSize = 6
				this.pageNum = 1
				this.total = 0
				this.orderList = []  //订单数据
				this.getOrderList()
				
			},
			getOrderList(){
				if(this.orderType == 1){
					if(this.orderStatus == 4){
						apiAdminOrderList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize
						}).then(res=>{
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})
					}else{
						apiAdminOrderList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"status":this.orderStatus
						}).then(res=>{
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})
					}
				}else{
					if(this.orderStatus == 4){
						AdminOrderEndOfTermListAll({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize
						}).then(res=>{
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})
					}else{
						AdminOrderEndOfTermListAll({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize,
							"status":this.orderStatus
						}).then(res=>{
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})
					}
				}
			
			},
			// 查看详细
			openFile(data){
				sessionStorage.setItem('adminAffirmData', JSON.stringify(data))
				this.$router.push({name:'distribution_admin_order_affirm',query:{orderType:this.orderType}})
			},
			// 确认订单
			addOrder(data){
				if(this.orderType == 1){
				this.$confirm('是否已缴费?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					apiAdminOrderUpdate({
						"id":data.id,
						"status":1
					}).then(res=>{
						if(res.data.result){
							this.$message.success('确定订单成功，请前往分配')
							this.getOrderList()
						}else{
							this.$message.error(res.data.message)
						}
					})
					}).catch(() => {        
					});	
				}else{
					this.$confirm('是否已缴费?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						apiAdminOrderEndOfTermUpdate({
							"id":data.id,
							"status":1
						}).then(res=>{
							if(res.data.result){
								this.$message.success('确定订单成功，请前往分配')
								this.getOrderList()
							}else{
								this.$message.error(res.data.message)
							}
						})
						}).catch(() => {        
					});	
				}

			},
			// 删除该订单
			DelFile(data){
				if(this.orderType == 1){
					this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        			  confirmButtonText: '确定',
        			  cancelButtonText: '取消',
        			  type: 'warning'
        			}).then(() => {
						AdminOrderDel(data.id).then(res=>{
							if(res.data.result){
								this.$message.success('删除成功')
								this.getOrderList()
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
						AdminOrderEndOfTermDelAll(data.id).then(res=>{
							if(res.data.result){
								this.$message.success('删除成功')
								this.getOrderList()
							}else{
								this.$message.error(res.data.message)
							}
						})
        			}).catch(() => {
					
        			});
				}
			
			},
			// 下载合同
			uploadFile(row){
				if(this.orderType == 1){
					AdminOrderGetFile(row.id).then(res=>{
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
					AdminlOrderEndOfTermGetFile(row.id).then(res=>{
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
			loadFile(row){
				if(this.orderType == 1){
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
								this.getOrderList()
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
						AdminOrderEndOfTermUploadFile(row.id,data).then(res=>{
							if(res.data.result){
								this.$message.success('上传成功')
								this.getOrderList()
							}else{
								this.$message.error(res.data.message)
							}
						})
					})
					input.click()
					input.remove()
				}
			},
			goAdd(){
				this.$router.push('order_admin_add')
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
				if(this.orderType == 1){
					return new Promise((resolve,reject)=>{
						AdminOrderDetailsList({
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
						AdminOrderEndOfTermDetailsList({
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
			this.color = user().color;
			apiAdminOrderList({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize
			}).then(res=>{
				this.orderList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}
	};
</script>

<style scoped src="../../../assets/css/order.css"></style>

