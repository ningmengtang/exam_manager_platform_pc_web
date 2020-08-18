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
				<el-form-item label="姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="form.sex"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-input v-model="form.role"></el-input>
				</el-form-item>
				<el-form-item label="所在单位">
					<el-input v-model="form.school"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 中间 -->
		<div class="middle-box">
			<div class="message-top" :style="{'border-color':color}">负责班级</div>
			<div class="message-box">
				<div class="i">1.2017年2班班主任、语文老师、英语老师 </div>
				<div class="i">1.2017年2班班主任、语文老师、英语老师 </div>
				<div class="bottom-box">
					<el-button class="bottom" @click="goClass()">分配班级</el-button>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-top" :style="{'border-color':color}">是否冻结账号</div>
			<div class="message-box">
				<el-switch style="display: block" v-model="value2" active-color="#13ce66" inactive-color="#F0F0F0" active-text="是"
				 inactive-text="否">
				</el-switch>
				<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-top: 20px;">
					<el-form-item label="手机号:">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
				</el-form>
				<div class="message-top" :style="{'border-color':color}">修改密码</div>
				<el-switch style="display: block" v-model="value3" active-color="#13ce66" inactive-color="#F0F0F0" active-text="是"
				 inactive-text="否">
				</el-switch>
				<el-form ref="form" :model="form" label-width="80px" class="form" style="margin-top: 20px;">
					<el-form-item label="旧密码:">
						<el-input v-model="form.passsword"></el-input>
					</el-form-item>
					<el-form-item label="新密码:">
						<el-input v-model="form.reusePassword"></el-input>
					</el-form-item>
				</el-form>
				<div class="bottom-box">
					<el-button class="bottom-i" @click="black()">确认修改</el-button>
					<el-button class="bottom-i ii" @click="black()">取消修改</el-button>
				</div>
			</div>
		</div>
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
				value2: true,
				value3: true,
				percentage: 50,
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
					sex: '',
					role: '',
					school: '',
					type: '',
					phone: '',
					passsword: '',
					reusePassword: '',
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
			goAdd() {
				this.$router.push(`/order_school`)
			},
			black() {
				this.$router.push(`/manage_school_subordinate`)
			},
			goClass() {
               this.$router.push(`/manage_school_class`)
			}

		},
		mounted() {
			this.color = user().color;
		}
	};
</script>
<style scoped src="../../../assets/css/manage-add.css"></style>
