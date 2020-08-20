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
			<el-form ref="form" :model="form" label-width="80px" class="form">
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
				<el-form-item label="联系电话">
					<el-input v-model="form.contact_phone"></el-input>
				</el-form-item>
				<el-form-item label="收货人员">
					<el-input v-model="form.contacts"></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="form.contact_address"></el-input>
				</el-form-item>
			</el-form>
			<div class="buttom-box">
				<el-button class="buttom-true" :style="{'background-color':color}" @click="placeOrder">确认订购</el-button>
				<el-button class="buttom-false" @click="black()">取消订购</el-button>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-top" :style="{'border-color':color}">订单详细
				<el-button type="success" class="buttom" @click="addOrderItem " :style="{'background-color': color, 'border-color': color }"><span
					 class="el-icon-plus"></span>
					新增订购单</el-button>
			</div>

			<!--订单列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="(item,i) in orderList ">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.name}}
							<div class="label-box">
								<div class="label" v-for="d in item.childrenName ">
									{{d}}
								</div>
								<!-- <div class="label">人教版</div>
								<div class="label">语文</div>
								<div class="label">一年级</div>
								<div class="label">一年级</div> -->
							</div>
						</div>
						<div class="p-particular">
							<div>数量{{item.orderItemNum}}份</div>
							<div>单价{{item.price}}元</div>
							<div>总价{{item.total_price }}元</div>
							<div class="fault" @click="upload(i)"  v-if="!item.uploadFile">学生信息未导入，点击重导</div>
						</div>
					</div>
					<i class="close el-icon-close" :style="{'color':color}"></i>
				</div>
			</div>


			<div class="bottom-box">
				<div class="discount">
					<div class="i">总价：</div>
					<div class="ii">{{form.total_price}}</div>
				</div>
				<div class="last">
					<div class="remind">不同年级、不同科目价格不同，购买的数量越多，价格越优惠</div>
					<div class="discount">
						<div class="i">折扣：</div>
						<div class="ii">{{form.total_price}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 操作1 -->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<div class="t-title">请选试卷标签</div>
				<div class="t-content">
					<div class="group">
						<div class="row-group">
							<div class="th-group">
								订单项名称
							</div>
							<div class="tb-group">
								<el-input v-model="array_nav" ></el-input>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">
								数量
							</div>
							<div class="tb-group">
								<el-input-number v-model="orderItemNum" :min="1" :max="999"> </el-input-number>
								<!-- <el-input  ></el-input> -->
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">年份</div>
							<div class="td-group" >
								<el-radio-group v-model="array_nav1">
									<el-radio-button v-for="(d,i) in tagList.years" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">教程版本</div>
							<div class="td-group" >
								<el-radio-group v-model="array_nav2" >
									<el-radio-button v-for="(d,i) in tagList.version" :label="d.id">{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习科目</div>
							<div class="td-group" >
								<el-radio-group v-model="array_nav3" >
									<el-radio-button v-for="(d,i) in tagList.subject" :label="d.id">{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">学习年级</div>
							<div class="td-group" >
								<el-radio-group v-model="array_nav4">
									<el-radio-button v-for="(d,i) in tagList.grade" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">单元</div>
							<div class="td-group" >
								<el-radio-group v-model="array_nav5" >
									<el-radio-button v-for="(d,i) in tagList.element_test" :label="d.id" >{{d.text}}</el-radio-button>
								</el-radio-group>
							</div>
						</div>
					</div>
					
					<el-button size="small" type="success" @click="getValue">确认</el-button>
				</div>
				<div class="arr"><div>您已经选择：</div>
					<div v-for="item in orderItemList">{{item.childrenName}}</div>
				</div>
				<div class="student-box">
					<!-- <div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="100" :total="1000">
						</el-pagination>
					</div> -->
					<div class="block-time">
						<div></div>
						<!-- 	<div>
							<span style="margin-right:10px ;">选择日期</span>
							<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div> -->
						<div class="block-a">
							<el-button @click="dialogTableVisible = false" class="out">取消选择</el-button>
							<el-button @click="submit" class="affirm">全部确认新增</el-button>
						</div>
					</div>

				</div>
			</div>
		</el-dialog>
		<!-- 操作二 -->
		<el-dialog title="" :visible.sync="dialogTableVisible2">
			<div class="ts-select i">
				<div class="t-title">试卷信息导入向导<el-progress :percentage="percentage"></el-progress>
				</div>
				<div class="t-box">
					<div class="t-left">
						<div class="arr"><span>您已经选择：</span></div>
						<div class="choice">1.<span class="i">2017、人教版、英语、一年级、第一单元 </span></div>
						<div class="choice">2.<span class="i">2017、人教版、英语、一年级、第一单元 </span></div>
						<div class="lead">请导入 <span class="i">[一年级]</span> 信息</div>
						<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">
								将文件拖到此处，或
								<em>点击上传</em>
							</div>
						</el-upload>
					</div>
					<div class="t-right">
						<div class="log">导入日志</div>
						<div class="other">正在上传“北京师范小学2017级学生1班学生信息.xls”...<br>
							上传成功<br>
							导入学生信息成功！<br>
							已识别到导入学生信息{201}条<br>
							正在上传“北京师范小学2017级学生1班学生信息.xls”...<br>
							上传成功<br>
							导入学生信息成功！<br>
							已识别到导入学生信息{201}条<br>
						</div>
					</div>
				</div>
				<div class="student-box">
					<div class="block-time">
						<div></div>
						<div class="block-a">
							<el-button @click="toggleSelection()" class="out">稍后导入</el-button>
							<el-button @click="netx()" class="affirm">下一步</el-button>
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
	import {selectTag,AdminOrderTagAdd,AdminOrderItemAdd,ApiTagSelectList,AdminOrderAdd,AdminOrderUpload} from '@/api/api.js'

	export default {
		data() {
			return {
				color: '',
				endVal1: 6,
				endVal2: 454,
				currentPage: 1,
				allcostmoney:0,
				array_nav:'',
				array_nav1: '',
				array_nav2: '',
				array_nav3: '',
				array_nav4: '',
				array_nav5: '',
				orderItemNum:1,
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
					count:0,
					style_count: 0,
					contacts:'凯里' ,
					contact_phone: '1888888',
					contact_address: '北京市海淀区北京路1号',
					total_price:0
				},
				papers: [{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
					{
						label: '好老师',
						title: '2019年人教版一年级第一单元测验',
						particular: '包含小学一年级语文2019年人教版单元测试',
						time: '2020年10月11日上传'
					},
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
				dialogTableVisible2: false,
				// 标签属性
				tagList:[],
				orderItemList:[],
				AllTagList:[],
				orderList:[],
				
			};
		},
		components: {
			Schart,
			ICountUp
		},
		methods: {
			getValue() {
				if(this.orderItemNum > 0 && this.array_nav1 != '' && this.array_nav2 != '' && this.array_nav3 != '' && this.array_nav4 != '' && this.array_nav5 != '' && this.array_nav != '' ){
					let name1,
					name2,
					name3,
					name4,
					name5
					var price = 0
					
					for(var i=0;i<this.AllTagList.length;i++){
						if(this.AllTagList[i].id == this.array_nav1){
							name1 = this.AllTagList[i].text
							price = price + this.AllTagList[i].price
						}else if(this.AllTagList[i].id == this.array_nav2){
							name2 = this.AllTagList[i].text
							price = price + this.AllTagList[i].price
						}else if(this.AllTagList[i].id == this.array_nav3){
							name3 = this.AllTagList[i].text
							price = price + this.AllTagList[i].price
						}else if(this.AllTagList[i].id == this.array_nav4 ){
							name4 = this.AllTagList[i].text
							price = price + this.AllTagList[i].price
						}else if(this.AllTagList[i].id == this.array_nav5){
							name5 = this.AllTagList[i].text
							price = price + this.AllTagList[i].price
						}
					}

					
					this.orderItemList.push({
						"children":[this.array_nav1,this.array_nav2,this.array_nav3,this.array_nav4,this.array_nav5],
						"childrenName":[name1,name2,name3,name4,name5],
						"price":price,
						"total_price": price * this.orderItemNum,
						"orderItemNum":this.orderItemNum,
						"name":this.array_nav,
						"uploadFile":''
					})


					this.array_nav = ''
					this.array_nav1 = ''
					this.array_nav2 = ''
					this.array_nav3 = ''
					this.array_nav4 = ''
					this.array_nav5 = ''
					this.orderItemNum = 1
				}else{
					this.$message.warning('缺少必要标签')
				}

			},


			// 上传学生信息
			upload(i){
				// console.log(i)
				var input =  document.createElement('input')
				input.type = 'file'
				input.accept = '.xls'
				input.addEventListener('change',(event)=>{
					let file = event.target.files[0]
					// console.log(file)
					this.orderList[i].uploadFile = new FormData()
					this.orderList[i].uploadFile.append('file',file)
				})
				input.click()
            	input.remove() 		
			},
			addOrderItem(){
				this.dialogTableVisible = true
				this.orderItemList = []

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
				for(var i=0;i<this.orderItemList.length;i++){
					this.orderList.push(this.orderItemList[i])
				}

				
				// console.log(this.orderList)
				this.dialogTableVisible = false;
			},
			netx(){
				this.percentage=100;
			   	this.dialogTableVisible2 = false;
			},
			// 新建订单项
			getOrderItem(id,sn,orderItem){
				// console.log(orderItem)
				AdminOrderItemAdd({
					"count":orderItem.orderItemNum,
					"total_price":orderItem.total_price,
					"title":orderItem.name,
					"order_sn":sn,
					"order_id":id,
					"price":orderItem.price
				}).then(res=>{
					if(res.data.result){
						let itemId = res.data.data.id
						if(orderItem.uploadFile){
							AdminOrderUpload(itemId,orderItem.uploadFile).then(res=>{
								if(res.data.result){
									for(var i=0;i<orderItem.children.length;i++){
										let item = orderItem.children[i]
										AdminOrderTagAdd({
											"item_id":itemId,
											"tag_id":item
										}).then(res=>{
											if(res.data.result){

											}else{
												this.$message.error(res.data.message)
											}
										})
									}
									this.$message.success('新增成功')
									this.$router.go(-1)
								}else{
									this.$message.error(res.data.message)
								}
							})
						}else{
							for(var i=0;i<orderItem.children.length;i++){
								let item = orderItem.children[i]
								AdminOrderTagAdd({
									"item_id":itemId,
									"tag_id":item
								}).then(res=>{
									if(res.data.result){

									}else{
										this.$message.error(res.data.message)
									}
								})
							}
							this.$message.success('新增成功')
							this.$router.go(-1)
						}
					}
				})
			},
			placeOrder(){
				// console.log(this.orderList)
				AdminOrderAdd(this.form).then(res=>{
					if(res.data.result){
						// console.log(res)
						let id = res.data.data.id
						let sn = res.data.data.sn
						for(var i=0;i<this.orderList.length;i++){
							this.getOrderItem(id,sn,this.orderList[i])
						}
					}else{
						this.$message.error(res.data.message)
					}
				})
				// this.$router.push('order_school')
			}
		},
		mounted() {
			this.color = user().color;
			// 获取各个标签
			selectTag().then(res=>{
				this.tagList = res.data.data
			})
			// 获取全部标签
			ApiTagSelectList({
				"pageNum": 1,
				"pageSize": 999
			}).then(res=>{
				console.log(res)
				this.AllTagList = res.data.data.list
			})
		},
		watch:{
			orderList:{
				handler(){
					this.form.total_price = 0
					this.form.count = 0
					this.form.style_count = this.orderList.length
					for(var a=0;a<this.orderList.length;a++){
						this.form.total_price = this.form.total_price + this.orderList[a].total_price
						this.form.count = this.form.count + this.orderList[a].orderItemNum
					}
					console.log(this.orderList)
				}
			}
		}
	};
</script>
<style scoped src="../../../assets/css/order-add.css"></style>
