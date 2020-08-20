<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{userName}}</div>
							<div class="user-id">ID:{{userID}}</div>
							<div class="identity" :style="{'background-color':color}">老师</div>
							<div class="message">
								<div class="school">{{userSchoolName}}</div>
								<!-- <div class="grade">一年级</div> -->
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
				<el-row :gutter="20" type="flex" class="el-row-box">
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">我的上传</div>
							<div class="num">
								<ICountUp :endVal="total" />
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库完成</div>
							<div class="num">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">正在入库</div>
							<div class="num">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="card-box">
							<div class="card-t">入库失败</div>
							<div class="num">
								<ICountUp :endVal="endVal2" />
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 上次的试卷列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="item in papers ">
					<div class="label"><img src="../../../assets/img/img.jpg" class="label" /></div>
					<div class="teacher" :style="{'color':color}">{{userName}}</div>
					<div class="papers-box">
						<div class="p-title">{{item.title}}</div>
						<div class="p-particular">包含小学一年级语文2019年人教版单元测试</div>
					</div>
					<div class="time">{{item.modifyDate}}</div>
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
	import Schart from 'vue-schart'
	import ICountUp from 'vue-countup-v2'
	import user from '../../common/user'
	import {
		ApiTagSelectList,
		teacherIndex,
		teacherPersonal
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				endVal1: 6,
				endVal2: 454,
				currentPage: 1,
				total: 0,
				pageSize: 2,
				pageNum: 1,
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName: localStorage.getItem('userSchoolName'),
				userGrade: localStorage.getItem('userGrade'),
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
			this.pageSize = val
			teacherIndex({
				"id":this.id,
				"pageSize":this.pageSize,
				"pageNum":this.pageNum
			}).then(res=>{
				this.papers = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNum = val;
				teacherIndex({
					"pageNum":this.pageNum,
					"pageSize":this.pageSize
				}).then(res=>{
					this.papers = res.data.data.list
					this.total= res.data.data.total
					this.currentPage= res.data.data.pageNum
				})
			},
			
		},
		mounted() {
			this.color = user().color;
			
			teacherIndex({
				"pageNum": this.pageNum,
				"pageSize": this.pageSize
			}).then(res => {
				console.log(res)
				this.papers = res.data.data.list
				this.total = res.data.data.total
				this.currentPage = res.data.data.pageNum
			})
			teacherPersonal({id:21}).then(res=>{
				console.log(res)
			})

		}
	};
</script>
<style scoped src="../../../assets/css/personal.css"></style>
