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
								<div class="grade">一年级</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="change-box">
				<div class="li">
					<i class="icon el-icon-user-solid"></i>
					<div class="name-change">个人信息</div>
				</div>
				<div class="li">
					<i class="icon el-icon-thirdmima"></i>
					<div class="name-change">修改密码</div>
				</div>
				<div class="li">
					<i class="icon el-icon-thirdshouji"></i>
					<div class="name-change">修改手机</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="message-row">
				<div class="message-top i" :style="{'border-color':color}">试卷入库</div>
				<el-row :gutter="20" type="flex" class="el-row-box">
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">全部试卷</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库完成</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">正在入库</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库完成</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="message-row">
				<div class="message-top i" :style="{'border-color':color}">订购管理</div>
				<el-row :gutter="20" type="flex" class="el-row-box" style="background-color: #E35841;">
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">全部订购</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">订购完成</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">订购申请</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">订购失败</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="message-row i">
				<div class="message-top i" :style="{'border-color':color}">用户管理</div>
				<el-row :gutter="20" type="flex" class="el-row-box" style="background-color: #3B66E2;">
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">全部试卷</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库完成</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">正在入库</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库失败</div>
							<div class="num"><ICountUp :endVal="endVal2" /></div>
						</div>
					</el-col>
				</el-row>
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
				]
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
		},
		mounted() {
			this.color = user().color;
		}
	};
</script>
<style scoped src="../../../assets/css/personal.css"></style>
