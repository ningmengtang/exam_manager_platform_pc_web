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
			<div class="face-box">
				<div class="ts">请对准摄像头</div>
				<div class="ts2">进入考试前必须录入人脸</div>
				<div class="face-img">
					<el-upload class="upload-demo" drag action="" accept=".jpg,.png" :http-request="uploadFild" :before-upload="beforeUpload"
					 :on-success="successUpload" :show-file-list="false" multiple v-loading="loading">
						<div v-if="!uploadFile">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2m</div>
						</div>
						<el-image :src="uploadBlackimgscr"  style="min-width: 100px;min-height: 100px;" v-else-if='isFace' ></el-image>
						<div v-if="isFace==false&&isFace!==''">请重新导入人脸</div>
					</el-upload>
				</div>
				<div class="bottom-box">
					<!-- <el-button class="photograph"><i class="el-icon-camera-solid" style="margin-right: 8px;"></i>拍照</el-button> -->
					<el-button class="black" @click="goProcess()">确认进入考试</el-button>
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
		Dialog,Toast
	} from 'vant'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		faceInsert
	} from '@/api/api.js'
	export default {
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
				overTime: this.$route.query.overTime,
				examTitle: '',
				examParticular: '',
				papers: {},
				classes: '',
				dialogVisible: false,
				uploadFile: '',
				uploadBlackimgscr:'',
				isFace: ''
			}
		},
		components: {
			Tabbar
		},
		methods: {
			// ---回去--
			goProcess() {
				this.$router.push({
					name: 'mobile_examination_process',
					query: {
						id: this.examId,
						overTime:this.overTime
					}
				})
			},
			uploadFild(param) {
				var that = this
				// console.log(param)
				var file = param.file
				this.uploadFile = new FormData()
				this.uploadFile.append('file', file)
				this.loading=true
				faceInsert(this.uploadFile).then(res => {
					if (!res.data.result) {
						this.$alert(`${res.data.message}或者不是人脸！请重新导入`, '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$message.error(`${res.data.message}错误代码${res.data.stateCode}`)
							}
						});
			            this.isFace=false
						this.loading = false
					} else {
						this.uploadBlackimgscr = res.data.data.headImg
						this.loading = false
						this.$message.success('人脸录入成功')
						this.isFace = true
					}
			
				})
			
			},
			// 上传控制
			beforeUpload(file) {
				// console.log(file)
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'png'
				const extension2 = testmsg === 'jpg'
				const isLt2M = file.size / 1024 / 1024 < 20
				if (!extension && !extension2) {
					this.$message({
						message: '上传文件只能是 png、jpg格式!',
						type: 'warning'
					});
				}
				if (!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 20MB!',
						type: 'warning'
					});
				}
				return extension || extension2 && isLt2M
			},
			// 上传成功
			successUpload(res) {
				// console.log(res)
				this.$message.success('图片上传成功')
			}

		},
		mounted() {
			
				// ---查询班级---
				apiStudentAccountSelectById(this.userID).then(res => {
					this.classes = res.data.data.classes.name
				})
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
			})
		},
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
<style scoped>
	.box /deep/ .upload-demo,
	.box /deep/ .el-upload-dragger,
	.box /deep/ .el-upload {
		width: 100%;
		height: 100%;
		min-height: 430px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.box /deep/ .el-upload-dragger .el-icon-upload {
		line-height: 250px;
	}
</style>
