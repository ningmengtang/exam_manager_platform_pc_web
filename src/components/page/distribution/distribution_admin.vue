<template>
	<div class="box">
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
					<div class="th-group">分发状态</div>
					<div class="td-group" >
						<el-radio-group v-model="orderStatus" @change="changeOrder">
								<el-radio-button v-for="(item,index) in orderStatusList" :label="item.id">
									{{item.name}}
								</el-radio-button>
						</el-radio-group>
					</div>
				</div>
			</div>
		</div>
		<!-- 管理 -->
		<div class="particular">
			<div class="li" v-for="(data, i) in orderList" :key="data.id">
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
				<div class="right">
					<div class="ii" >
						<div class="status_box">
							<span class="text ii">{{data.status == 0?'待确定':data.status == 1?'等待分发':data.status == 2?'已取消':data.status == 3?'分发完成':''}}</span>
							<el-button type="primary"   v-if="data.status == 1"  @click="addOrder(data)">立即分发</el-button>
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
		apiAdminOrderUpdate,
		AdminOrderEndOfTermListAll
	} from '@/api/api.js'
	export default {
		data() {
			return {
				orderStatus:1,
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
				orderType:1,
				orderStatusList:[
				{
					id:1,
					name:"正在分发"
				},
				{
					id:3,
					name:"分发完成"
				},{
					id:2,
					name:"已取消"
				}
				],
				orderTypeList:[
				{
					id:1,
					name:"普通订单"
				},
				{
					id:2,
					name:"期末订单"
				},
				],
				dialogTableVisible: false,
				dialogFormVisible: false,
			};
		},
		methods: {
			//获取选择标签的内容
			changeOrderType(){
				this.currentPage = 1
				this.pageSize = 6
				this.pageNum = 1
				this.total = 0
				this.orderList = []  //订单数据
				this.getOrderList()
			},
			getOrderList(){
				if(this.orderType == 1){
					apiAdminOrderList({
						"pageNum":this.pageNum,
						"pageSize":this.pageSize,
						"status":this.orderStatus
					}).then(res=>{
						// console.log(res)
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
				this.getOrderList()
				
			},
			//立即分发
			addOrder(data){
				sessionStorage.setItem('adminAffirmData', JSON.stringify(data))
				this.$router.push({name:'distribution_admin_affirm',query:{orderType:this.orderType}})
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

			submit() {
				
			}
		},
		mounted() {
			this.color = user().color;
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
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
