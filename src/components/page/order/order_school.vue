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
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="订购类型">
					<el-input v-model="form.type"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="收货人员">
					<el-input v-model="form.personnel"></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="form.site"></el-input>
				</el-form-item>
			</el-form>
			<div class="buttom-box">
				<el-button class="buttom-true" :style="{'background-color':color}" @click="black()">确认订购</el-button>
				<el-button class="buttom-false" @click="black()">取消订购</el-button>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-top" :style="{'border-color':color}">订单详细
				<el-button type="success" class="buttom" @click="dialogTableVisible = true" :style="{'background-color': color, 'border-color': color }"><span
					 class="el-icon-plus"></span>
					新增订购单</el-button>
			</div>

			<!--订单列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="(item,i) in papers " :key="item.i">
					<div class="ranking">{{i+1}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.title}}
							<div class="label-box">
								<div class="label">2019</div>
								<div class="label">人教版</div>
								<div class="label">语文</div>
								<div class="label">一年级</div>
								<div class="label">一年级</div>
							</div>
						</div>
						<div class="p-particular">
							<div>数量20份</div>
							<div>单价20元</div>
							<div>总价400元</div>
							<div class="fault">学生信息未导入，点击重导</div>
						</div>
					</div>
					<i class="close el-icon-close" :style="{'color':color}"></i>
				</div>
			</div>
			<div class="page">
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
			</div>
		</div>
		<!-- 操作1 -->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<div class="t-title">请选试卷标签</div>
				<div class="t-content">
					<div class="group">
						<div class="row-group">
							<div class="th-group">年份</div>
							<div class="td-group" change>
								<el-checkbox-group v-model="array_nav2" @change="getValue()">
									<el-checkbox-button v-for="(d,i) in class2" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="row-group">
							<div class="th-group">教程版本</div>
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
					<div class="page">
						<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="currentPage" :page-size="100" :total="1000">
						</el-pagination>
					</div>
					<div class="block-time">
						<div></div>
						<!-- 	<div>
							<span style="margin-right:10px ;">选择日期</span>
							<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div> -->
						<div class="block-a">
							<el-button @click="toggleSelection()" class="out">取消选择</el-button>
							<el-button @click="submit()" class="affirm">确认新增</el-button>
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
	export default {
		data() {
			return {
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
					name: '454',
					type: '',
					phone: '',
					personnel: '',
					site: ''
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
				this.dialogTableVisible2 = true;
			},
			netx(){
				this.percentage=100;
			   this.dialogTableVisible2 = false;
			},
			black(){
				this.$router.push('manage_school')
			}
		},
		mounted() {
			this.color = user().color;
		}
	};
</script>
<style scoped src="../../../assets/css/order.css"></style>
