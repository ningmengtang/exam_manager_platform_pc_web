<template>
	<div class="box">
		<div class="top">
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
			<!-- <div class="search">
				<el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<el-button type="primary"  :style="{ 'background-color': color, 'border-color': color }">搜索</el-button>
				<el-button type="success" class="buttom" :style="{ 'background-color': color, 'border-color': color }" @click="goAdd()"><span class="el-icon-plus"></span> 新增订购单</el-button>
			</div> -->
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
							订购类型：{{data.style_count}}种，总份数：{{data.count}}份
						</span>

					</div>
				</div>
				<div class="time">
					<span>
						{{ data.create_date }}申请订购
					</span>
				</div>
				<!-- <div class="label-box">
					<div class="label">{{ data.label }}</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div> -->
				<div class="right">
					<div class="ii" >
						<div class="status_box">
							<!-- <i class="icon el-icon-loading ii"></i> -->
							<span class="text ii">{{data.status == 0?'待确定':data.status == 1?'已确认':data.status == 2?'已取消':''}}</span>
							 <el-button type="primary"   v-if="data.status == 0"  @click="addOrder(data)">立即确定</el-button>
						    <el-button   v-if="data.status == 0" type="danger"  >取消</el-button>
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
		<!-- 提示框 -->
		<!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
		<!-- Table -->
		<!-- <el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<div class="t-title">请选择班级</div>
				<div class="t-content">
					<div class="group">
						<div class="row-group">
							<div class="th-group">分发状态</div>
							<div class="td-group" change>
								<el-checkbox-group v-model="array_nav2" @change="getValue()">
									<el-checkbox-button v-for="(d,i) in class2" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">分发状态</div>
							<div class="td-group" change>
								<el-checkbox-group v-model="array_nav3" @change="getValue()">
									<el-checkbox-button v-for="(d,i) in class1" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
					</div>
				</div>
				<div class="arr"><span>您已经选择：</span><span>{{array_nav4}}</span></div>
				<div class="student-box">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column label="学号" width="120">
							<template slot-scope="scope">
								{{ scope.row.date }}
							</template>
						</el-table-column>
						<el-table-column prop="name" label="名字" width="120">
							<template slot-scope="scope">
								<div style="display: flex;align-items: center;">
									<img src="../../../assets/img/img.jpg" class="user-img" />
									<div class="student-name">{{ scope.row.name }}</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="grade" label="年级" show-overflow-tooltip></el-table-column>
						<el-table-column prop="class" label="班级" show-overflow-tooltip></el-table-column>
					</el-table>
					<div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="100" :total="1000">
						</el-pagination>
					</div>
					<div class="block-time">
						<div>
							<span style="margin-right:10px ;">选择日期</span>
							<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>
						<div class="block-a">
							<el-button @click="toggleSelection()" class="out">取消选择</el-button>
							<el-button @click="submit()" class="affirm">确认</el-button>
						</div>
					</div>

				</div>
			</div>
		</el-dialog> -->
	</div>
</template>
<script>
	import user from '../../common/user';
	import {
		apiAdminOrderList,
		apiAdminOrderUpdate
	} from '@/api/api.js'
	export default {
		data() {
			return {
				orderList:[],  //订单数据
				pageSize:6,
				pageNum:1,
				currentPage:1,
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
				cities: ['全部', '待确定', '已确定', '已取消'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
				checkboxGroup2: ['上海'],
				li: [{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '北京师范小学 教师',
						time: '2020年10月11日上传',
						label: '2019',
						o: '1'
					},
					{
						teacher: '古得老师',
						title: '2019年人教版一年级第一单元作业5656565656',
						synopsis: '北京师范小学 教师',
						time: '2020年10月11日上传',
						label: '2019',
						o: '2'
					}
				],
				tableData: [{
					date: '1',
					name: '王小虎',
					grade: '一年级',
					class: '1'
				}, {
					date: '2',
					name: '王小虎',
					grade: '二年级',
					class: '1'
				}, {
					date: '3',
					name: '王小虎',
					grade: '三年级',
					class: '1'
				}, {
					date: '4',
					name: '王小虎',
					grade: '四年级',
					class: '1'
				}],
				dialogTableVisible: false,
				dialogFormVisible: false,
			};
		},
		methods: {
			//获取选择标签的内容
			// getValue() {
			// 	this.array_nav4 = this.array_nav2.concat(this.array_nav3)
			// 	console.log(this.array_nav4);
			// },
			handleSizeChange(val) {
				this.pageSize = val
				apiAdminOrderList({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize
				}).then(res=>{
					// console.log(res)
					this.orderList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				apiAdminOrderList({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize
				}).then(res=>{
					// console.log(res)
					this.orderList = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			changeOrder(){
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
						console.log(res)
						this.orderList = res.data.data.list
						this.total = res.data.data.total
						this.currentPage = res.data.data.pageNum
					})
				}
				
			},
			// 确认订单
			addOrder(data){
				apiAdminOrderUpdate({
					"id":data.id,
					"status":1
				}).then(res=>{
					if(res.data.result){
						this.$message.success('确定订单成功，请前往分配')
						apiAdminOrderList({
							"pageNum":this.pageNum,
							"pageSize":this.pageSize
						}).then(res=>{
							// console.log(res)
							this.orderList = res.data.data.list
							this.total = res.data.data.total
							this.currentPage = res.data.data.pageNum
						})
						this.$router.push('/distribution_admin')
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			// searchO() {

			// },
			// toggleSelection(rows) {
			// 	if (rows) {
			// 		rows.forEach(row => {
			// 			this.$refs.multipleTable.toggleRowSelection(row);
			// 		});
			// 	} else {
			// 		this.$refs.multipleTable.clearSelection();
			// 	}
			// },
			// handleSelectionChange(val) {
			// 	this.multipleSelection = val;
			// },
			// toggleSelection(rows) {
			// 	if (rows) {
			// 		rows.forEach(row => {
			// 			this.$refs.multipleTable.toggleRowSelection(row);
			// 		});
			// 	} else {
			// 		this.$refs.multipleTable.clearSelection();
			// 	}
			// },
			// submit() {
			// 	//关闭窗口
			// 	this.dialogTableVisible = false;
			// },
			goAdd(){
				this.$router.push('order_admin_add')
			}
		},
		mounted() {
			this.color = user().color;
			console.log(11)
			apiAdminOrderList({
				"pageNum":this.pageNum,
				"pageSize":this.pageSize
			}).then(res=>{
				console.log(res)
				this.orderList = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
		}
	};
</script>

<style scoped src="../../../assets/css/order.css"></style>
