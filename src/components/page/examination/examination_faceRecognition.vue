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
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="face-box">
				<div class="ts">请对准摄像头</div>
				<div class="ts2" v-if="FaceRecognition">进入考试前必须识别人脸</div>
				<div class="ts2" v-else>进入考试前必须录入人脸</div>
				<div class="face-img">
					<!-- <el-upload class="upload-demo" drag action="" accept=".jpg,.png" :http-request="uploadFild" :before-upload="beforeUpload"
					 :on-success="successUpload" :show-file-list="false" multiple v-loading="loading">
						<div v-if="!uploadFile">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2m</div>
						</div>
						<el-image :src="uploadBlackimgscr" style="min-width: 100px;min-height: 100px;" v-else-if='isFace'></el-image>
						<div v-if="isFace==false&&isFace!==''">请重新导入人脸</div>
					</el-upload> -->
					<div>
						<!-- <el-button type="primary" @click="cameraupload">拍照上传</el-button> -->

						<div class="upload-item">
							<span>摄像头切换：</span>
							<el-select ref="select" v-model="selectCamera" placeholder="请选择" size="mini" @change="cameraChange">
								<el-option v-for="item in selectOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
						<div class="upload-item">
							<span>拍照上传摄像头：</span>
							<video id="video" ref="video" width="100%" height="500" style="border-radius: 8px;" autoplay playsinline  v-show="upload_is==false"></video>
							<img :src="black_base64" style="width: 100%;border-radius: 8px;" height="500px" v-show="upload_is"></img>
						</div>
					</div>
				</div>
				<div>

				</div>
				<div class="bottom-box">
					<el-button class="photograph" @click="cameraupload" :disabled="upload_is"><i class="el-icon-camera-solid" style="margin-right: 8px;"></i>拍照</el-button>
					<el-button class="black" @click="goProcess()">确认进入考试</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		faceInsert,
		faceRecognition
	} from '@/api/api.js'
	import {
		getBase64,
		getUserMedia,
		gotDevices,
		getUserMediaSuccess,
		getUserMediaError,
		stopMediaTracks
	} from "@/assets/js/camera.js"
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
				examTime: this.$route.query.examTime,
				overTime: this.$route.query.overTime,
				examTitle: '',
				examParticular: '',
				papers: {},
				classes: '',
				dialogVisible: false,
				uploadFile: '',
				uploadBlackimgscr: '',
				isFace: '',
				FaceRecognition: false,
				hasFaceBase64: '',
				old_face: '',
				canvas: '',
				selectOption: [],
				selectCamera: '',
				upload_is: false,
				black_base64:''


			}
		},
		methods: {
			// ---回去--
			goProcess() {
				this.isFace ? (this.$router.push({
					name: 'examination_process',
					query: {
						id: this.examId,
						'examTime': this.examTime,
						'overTime': this.overTime
					}
				})) : (this.$message.error('考试进入要先导入人脸'))
			},
			uploadFild(param) {
				var that = this
				// console.log(param)
				var file = param.file
				this.uploadFile = new FormData()
				// this.uploadFile.append('file', file)
				this.loading = true
				this.FaceRecognition=false
				if (this.FaceRecognition) {
					this.uploadFile.append('file', file)
					faceRecognition(this.uploadFile).then(res => {
						this.loading = false
						if (res.data.result) {
							console.log(res)
							this.uploadBlackimgscr = res.data.data
							this.loading = false
							this.$message.success('人脸识别成功')
							this.isFace = true
						} else {
							document.title = '学生-考试-人脸录入'
							this.$alert(`${res.data.message}或者不是人脸！请重新导入`, '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$message.error(`${res.data.message}错误代码${res.data.stateCode}`)
								}
							});
							this.isFace = false
							this.loading = false
						}
					})
				} else {
					this.uploadFile.append('file', file)
					faceInsert(this.userID, this.uploadFile).then(res => {
						if (!res.data.result) {
							this.$alert(`${res.data.message}或者不是人脸！请重新导入`, '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$message.error(`${res.data.message}错误代码${res.data.stateCode}`)
								}
							});
							this.isFace = false
							this.loading = false
						} else {
							this.uploadBlackimgscr = res.data.data.headImg
							this.loading = false
							this.$message.success('人脸录入成功')
							this.isFace = true
						}

					})
				}
			},
			uploadBase64(imgBase64) {
				this.loading = true
				this.upload_is = true
				this.black_base64=imgBase64
				// this.FaceRecognition=false
				if (this.FaceRecognition) {
					faceRecognition({
						"base64str": imgBase64
					}).then(res => {
						this.loading = false
						this.upload_is=false
						if (res.data.result) {
							console.log(res)
							this.uploadBlackimgscr = res.data.data
							this.loading = false
							this.$message.success('人脸识别成功')
							this.isFace = true
							this.upload_is = true
						} else {
							document.title = '学生-考试-人脸录入'
							this.$alert(`${res.data.message}或者不是人脸！请重新导入`, '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$message.error(`${res.data.message}错误代码${res.data.stateCode}`)
								}
								
							});
							this.isFace = false
							this.loading = false
						}
					})
				} else {

					console.log(this.base64MakeImg(imgBase64))
					// this.uploadFile.append('file', file)
					faceInsert(this.userID, this.base64MakeImg(imgBase64)).then(res => {
						this.upload_is=false
						if (!res.data.result) {
							this.$alert(`${res.data.message}或者不是人脸！请重新导入`, '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$message.error(`${res.data.message}错误代码${res.data.stateCode}`)
								}
							});
							this.isFace = false
							this.loading = false
						} else {
							this.uploadBlackimgscr = res.data.data.headImg
							this.loading = false
							this.$message.success('人脸录入成功')
							this.isFace = true
						}

					})
				}
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
			},
			// base64转图片
			base64MakeImg(base64) {
				var arr = base64.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				var obj = new Blob([u8arr], {
					type: mime
				});
				var fd = new FormData();
				fd.append("file", obj, "image.jpg");
				return fd
			},

			cameraupload() {
				this.context.drawImage(video, 0, 0, 3264, 2448);
				let pageData = this.canvas.toDataURL("image/jpeg");
				// this.cameraupload=true
				this.uploadBase64(pageData)
				// console.log(pageData)
			},
			cameraChange() { //改变摄像头
				// console.log(this.selectCamera)
				navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: {
							exact: this.selectCamera
						},
						width: 3264,
						height: 2448
					},
					audio: false
				}).then(stream => {
					//console.log(stream)
					let video = this.$refs.video
					//兼容webkit核心浏览器
					let CompatibleURL = window.URL || window.webkitURL;
					//将视频流设置为video元素的源
					//console.log(stream);
					//video.src = CompatibleURL.createObjectURL(stream);
					video.srcObject = stream;
					video.play();
				}).catch(err => {
					console.log(err)
				})
			},


		},
		mounted() {
			// ---查询班级---
			apiStudentAccountSelectById(this.userID).then(res => {
				this.classes = res.data.data.classes.name
				// 判断是否有人脸录入
				if (res.data.data.hasOwnProperty('headImg')) {
					this.hasFaceBase64 = res.data.data.headImg
					// base64转图片
					this.base64MakeImg(this.hasFaceBase64)
					this.old_face = this.base64MakeImg(this.hasFaceBase64)
					this.FaceRecognition = true;
				} else {
					this.FaceRecognition = false;
				}
			})
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
			})


			//初始化canvas
			this.canvas = document.createElement('canvas');
			this.canvas.style.display = 'none';
			this.canvas.height = '2448';
			this.canvas.width = '3264';
			this.context = this.canvas.getContext('2d');

			const constraints = {
				video: {
					width: 3264,
					height: 2448
				},
				audio: false
			};
			//获取摄像头列表
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
					// console.log(stream)
					return navigator.mediaDevices.enumerateDevices();
				}).then(s => {
					// console.log(s)
					this.selectOption = []
					s.forEach(i => {
						// console.log(i)
						if (i.kind === 'videoinput') {
							this.selectOption.push({
								value: i.deviceId,
								label: i.label
							})
						}
					})
					this.selectCamera = this.selectOption[0].value
					this.cameraChange()
					// console.log(this.selectOption)

				})
		},
	};
</script>

<style scoped src="../../../assets/css/examination-other.css"></style>
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
	.box /deep/ .el-image__inner{height: 500px;}
</style>
