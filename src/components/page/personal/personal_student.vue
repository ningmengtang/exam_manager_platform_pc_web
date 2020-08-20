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
							<div class="identity">学生</div>
							<div class="message">
								<div class="school">{{userSchoolName}}</div>
								<div class="grade">{{userGrade}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="change-box">
				<div class="li" @click="userInfo">
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
				<div class="message-top">试卷管理</div>
				<el-row :gutter="20" type="flex">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<div class="card-left">
								<div class="card-c">全部试卷</div>
								<div class="card-cc">
									<ICountUp :endVal="total" />
								</div>
							</div>
							<div class="card-right"></div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple" :style="style.card_2">
							<div class="card-left">
								<div class="card-c">可下载试卷</div>
								<div class="card-cc">
									<ICountUp :endVal="download" />
								</div>
							</div>
							<div class="card-right" :style="style.cardRight_2"></div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple" :style="style.card_3">
							<div class="card-left">
								<div class="card-c">失效试卷</div>
								<div class="card-cc">
									<ICountUp :endVal="disabled" />
								</div>
							</div>
							<div class="card-right" :style="style.cardRight_3"></div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 上次的试卷列表 -->
			<div class="upload-papers">
				<div class="li-box" v-for="(item,i) in papers " :key="item.i">
					<!-- <div class="label"><img src="../../../assets/img/img.jpg" class="label" /></div> -->
					<!-- <div class="teacher">{{item.label}}</div> -->
					<div class="papers-box">
						<div class="p-title">{{item.title}}</div>
						<div class="p-particular">包含小学一年级语文2019年人教版单元作业65656566555555</div>
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
	import {
		StudentAccountInfo,
		studentIndex,
		paperWithTag
	} from '@/api/api.js'
	export default {
		data() {
			return {
				pageSize:4,
				pageNum:1,
				total:0,
				currentPage:1,
				paperList:[],
				DisStatusList:[],
				ElementTextList:[],
				PurposeList:[],
				SubjectList:[],
				GradeList:[],
				VersionList:[],
				YearsList:[],
				disStatus:0,
				elementTest:0,
				purpose:0,
				subject:0,
				grade:0,
				version:0,
				years:0,
				obj:[],
				endVal1: 6,
				endVal2: 454,
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName:localStorage.getItem('userSchoolName'),
				userGrade:localStorage.getItem('userGrade'),
				total: 0,
				total1: 0,
				pageSize1: 6,
				pageNum1: 1,
                currentPage:0,
				download: 0,
				disabled: 0,

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
				papers: []
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
			//改变时
			handleSizeChange(val) {
				this.pageSize1 = val;
				studentIndex({
					"pageNum": this.pageNum1,
					"pageSize": this.pageSize1
				}).then(res => {
					this.papers = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			//条目改变时
			handleCurrentChange(val) {
				this.pageNum1 = val;
				studentIndex({
					"pageNum": this.pageNum1,
					"pageSize": this.pageSize1
				}).then(res => {
					this.papers = res.data.data.list
					this.total1 = res.data.data.total
					this.currentPage1 = res.data.data.pageNum
				})
			},
			userInfo() {
				StudentAccountInfo({
					"id": this.userID
				}).then(res => {
					if (res.data.data.list) {
						this.userInfoList = res.data.data.list[0]
						console.log(res)

					} else {
						this.$message.error('查询不到个人信息')
					}
				})
			},
			// 修改密码
			userUpdatePwd() {

			}
		},
		mounted() {
			//获取用户信息
			let userID = this.userID;
			if (userID) {
				this.userID = userID
			} else {
				this.$message.error('查询不到个人信息')
			}
			//查询个人信息
			StudentAccountInfo({
				"id": this.userID
			}).then(res => {
				if (res.data.data.list) {
					this.userInfoList = res.data.data.list[0]
					// console.log(res)

				} else {
					this.$message.error('查询不到个人信息')
				}
			})
			// 统计数据全部数据
			this.total = 0
			this.download = 0
			this.disabled = 0
			studentIndex({
				"pageNum": 1,
				"pageSize": 999
			}).then(res => {
				if (res.data.data.list) {
					// }
					this.total = res.data.data.total
					this.disabled = res.data.data.disabled
					this.download = res.data.data.download
				}
			})
			paperWithTag({
				"id":[],
				"pageNum": this.pageNum,
				"pageSize": this.pageSize
			}).then(res=>{
				console.log(res.data.data)
				//赋给试卷管理试卷
				this.papers=res.data.data.list
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		}
	};
</script>
<style scoped src="../../../assets/css/personal.css"></style>
