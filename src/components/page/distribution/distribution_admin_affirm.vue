<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">小明</div>
							<div class="user-id">ID:6556565</div>
							<div class="identity" :style="{'background-color':color}">老师</div>
							<div class="message">
								<div class="school">北京师范小学</div>
							</div>
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
				<el-date-picker
				      v-model="value1"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
					  class="ids">
				    </el-date-picker>
			</el-form>
			<div class="buttom-box">
				<el-button class="buttom-true" :style="{'background-color':color}" @click="black()">确认订购</el-button>
				<el-button class="buttom-false" @click="black()">取消订购</el-button>
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
							<div>
								<span>
									单价{{item.price}}元
								</span>
								</div>
							<div>
								<span>
									总价{{item.total_price}}元
								</span></div>
							
							<div class="fault" v-if="!item.file_path"  @click="uploadFile(item)">学生信息未导入，点击导入</div>
							<div  v-if="item.file_path"  >已导入学生信息</div>
							<!-- <div class="" v-if=""></div> -->
						</div>
					</div>
					<el-button type="success" size="small" @click="addPaper" style="float:right" >分配试卷</el-button>
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
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<!-- <div class="t-title">请选择班级</div>
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
				</div> -->
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
							<el-button @click="submit()" class="out">取消选择</el-button>
							<el-button @click="submit()" class="affirm">确认</el-button>
						</div>
					</div>
		
				</div>
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
		selectAllUserTag
	} from '@/api/api.js'
	export default {
		data() {
			return {
				adminAffirmData:[],
				
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
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
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
				adminAffirmData:'',
				dialogTableVisible: false,
				dialogTableVisible2: false,
				pageSize:6,
				pageNum:1,

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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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
			submit() {
				//关闭窗口
				this.dialogTableVisible = false;
			},
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
				this.dialogTableVisible = true
				// 通过标签查询试卷
				let id = []
				for(var i=0;i<item.tag_list.length;i++){
					id.push(item.tag_list[i].id)
				}
				console.log(id)
				selectAllUserTag({
					"id":id,
					"pageSize":this.pageSize,
					"pageNum":this.pageNum
				}).then(res=>{
					console.log(res)
				})
				// apiPaperWithTagList
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
