<template>
	<div class="box">
		<!-- 左边 -->
		<!-- <div class="left-box">
			<div class="box-card">
				<div class="card-top">
					<img src="../../../../assets/img/img.jpg" class="user-img" />
					<div class="user-top">
						<div class="username">
							<div class="name">{{userName}}</div>
							<div class="user-id">ID:{{userID}}</div>
							<div class="identity">学生</div>
							<div class="message">
								<div class="school">{{userSchoolName}}</div>
								<div class="grade">年级：{{userGrade}}</div>
								<div class="grade">班级：{{classes}}</div>
							</div>
							<div class="exam-box">
								<div class="e-title">{{examTitle}}</div>
								<div class="e-particular">{{examParticular}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<!-- 右边 -->
		<div class="right-box">
			<div class="process">
				<!-- <div class="ts">距离考试结束还有</div> -->
				<!-- <div class="ts-time">01:50:55</div> -->
				<div class="ts">考试时长</div>
				<div class="ts-time">{{examTime}}分钟</div>
				<div class="ts-a-box">
					<div class="t1">欢迎使用在线考试辅助系统</div>
					<div class="t2">修正程序错误的第一步是要重现这个错误</div>
					<div class="t3">图片试卷无法使用本系统辅助大部分功能，仅可以直接上传答案图片</div>
				</div>
				<div class="go-box">
					<div class="go">
						<div class="ts">我有打印机</div>
						<el-button class="buttom" v-if="FaceRecognition==true&&isexamImg==false" @click="goScantronHas()">使用答题卡辅助作答</el-button>
						<el-button class="buttom font-i2" v-else disabled @click="goScantronHas()">使用答题卡辅助作答</el-button>
						<div class="ts1">
							<p>1、进入系统下载答题卡</p>
							<p>2、打印答题卡</p>
							<p>3、在答题卡上作答</p>
							<p>4、作答完毕后逐题拍照上传答案</p>
							<p>5、交卷</p>
						</div>
					</div>
					<div class="go">
						<div class="ts">人脸识别</div>
						<el-button class="buttom" v-if="FaceRecognition==true" @click="goFaceRecognition()">人脸识别</el-button>
						<el-button class="buttom" v-else @click="goFaceRecognition()">人脸录入</el-button>
						<div class="ts1">
							<p>1.进入考试前必须进行人脸录入</p>
						</div>
					</div>
					<div class="go">
						<div class="ts">我没有办法打印</div>
						<el-button class="buttom" v-if="FaceRecognition==true&&isexamImg==false" @click="goScantronNone()">在线考试辅助</el-button>
						<el-button class="buttom font-i2" v-else disabled @click="goScantronNone()">在线考试辅助</el-button>
						<div class="ts1">
							<p>1、进入在线考试系统</p>
							<p>2、在线完成选择题的作答</p>
							<p>3、扫码上传其他题的作答</p>
							<p>4、交卷</p>
						</div>
					</div>
					<div class="go">
						<div class="ts">图片试卷</div>
						<el-button class="buttom i" v-if="FaceRecognition==true&&isexamImg==true" @click="goScantronImg()">图片试卷上传答案</el-button>
						<el-button class="buttom font-i2" v-else disabled @click="goScantronImg()">使用答题卡辅助作答</el-button>
						<div class="ts1">
							<p>1、适用于图片试卷上传答案图片</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Tabbar />
	</div>
</template>

<script>
	import Tabbar from '../common/tabbar.vue'
	import mobile from '@/assets/js/mobile.js'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		studentTestQuestionsStart
	} from '@/api/api.js'
	export default {
		components: {
			Tabbar
		},
		created() {
			mobile();
		},
		data() {
			return {
				total: 0,
				pageSize: 9,
				pageNum: 1,
				currentPage: 1,
				download: 0,
				disabled: 0,
				loading: false,
				status: '',
				userName: localStorage.getItem('userName'),
				userID: localStorage.getItem('userID'),
				userSchoolName: localStorage.getItem('userSchoolName'),
				userGrade: localStorage.getItem('userGrade'),
				examId: this.$route.query.id,
				examTime: this.$route.query.examTime,
				examTitle: '',
				overTime:this.$route.query.overTime,
				examParticular: '',
				papers: {},
				classes: '',
				dialogVisible: false,
				FaceRecognition: false,
				isexamImg: false,
			}
		},
		methods: {
			//---分页---
			handleSizeChange(val) {

			},
			//---分页2---
			handleCurrentChange(val) {
				this.page.pageNum = val
				this.selectPaper();
			},
			// ---跳转有答题卡--
			goScantronHas() {
				if (this.getCookie('examTime') == '') {
					this.setCookie('examTime', new Date())
				}
				this.$router.push({
					name: 'mobile_examination_scantronHas',
					query: {
						id: this.examId,
						examTime: this.examTime
					}
				})
				studentTestQuestionsStart({
					examinationId: this.examId,
					studentId: this.userID
				}).then(res => {
					// console.log(res)
				})
			},
			//---跳转无答题卡---
			goScantronNone() {
				if (this.getCookie('examTime') == '') {
					this.setCookie('examTime', new Date())
				}
				this.$router.push({
					name: 'mobile_examination_scantronNone',
					query: {
						id: this.examId,
						examTime: this.examTime
					}
				})
				studentTestQuestionsStart({
					examinationId: this.examId,
					studentId: this.userID
				}).then(res => {
					// console.log(res)
				})
			},
			//---跳转人脸---
			goFaceRecognition() {
				this.$router.push({
					name: 'mobile_examination_faceRecognition',
					query: {
						id: this.examId
					}
				})
			},
			// ---跳转图片试卷---
			goScantronImg() {
				if (this.getCookie('examTime') == '') {
					this.setCookie('examTime', new Date())
				}
				this.$router.push({
					name: 'mobile_examination_scantronImg',
					query: {
						id: this.examId,
						examTime: this.examTime
					}
				})
				studentTestQuestionsStart({
					examinationId: this.examId,
					studentId: this.userID
				}).then(res => {
					// console.log(res)
				})
			},
			// 获取cookie
			getCookie(name) {
				var strCookie = document.cookie;
				//cookie的保存格式是 分号加空格 "; "  
				var arrCookie = strCookie.split("; ");
				for (var i = 0; i < arrCookie.length; i++) {
					var arr = arrCookie[i].split("=");
					if (arr[0] == name) {
						return unescape(arr[1]);
					}
				}
				return "";
			},
			//设置cookie时间 value是时间
			setCookie(name, value) {
				if (value) {
					var Days = 1;
					var exp = new Date();
					exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
					document.cookie = name + "=" + escape(this.getTimestamp(this.overTime)) + ";expires=" + exp.toGMTString();
				}
			},
			//---日期转时间戳---
			getTimestamp(str) {
				// timestamp2 = timestamp2 / 1000;
				let strtime = str.replace(new RegExp("-", "gm"), "/");
				var starttimeHaoMiao = (new Date(strtime)).getTime();
				return starttimeHaoMiao;
			}
		},
		mounted() {
			this.loading = true,
				// ---查询班级---
				apiStudentAccountSelectById(this.userID).then(res => {
					this.classes = res.data.data.classes.name
					// 判断是否有人脸录入
					if (res.data.data.hasOwnProperty('headImg')) {
						this.FaceRecognition = true;
					} else {
						this.FaceRecognition = false;
					}
				})
			console.log(this.examId)
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTime = res.data.data.examTime
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				if (res.data.data.hasOwnProperty('affix')) {
					this.isexamImg = true
				} else {
					this.isexamImg = false
				}

			})
		},
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
// 修改element 自带样式
<style>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}

	.font-i2 {
		background-color: #999999 !important;
	}
</style>
