<template>
	<div class="box">
		<div class="big-box">
			<div class="header-top" style="border-bottom: 2px solid #EEEEEE;">
				<div class="time">
					<div>距离考试结束还有</div>
					<div class="ts-time">{{ResidueTime}}</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">
					<div class="i1">{{examTitle}}</div>
					<div class="i2">{{examParticular}}</div>
				</div>
			</div>
			<div class="ts">
				<div>1.下载答题卡</div>
				<el-button class="button" @click='downloadFile()'>
					<i class="icon el-icon-download"></i>下载
				</el-button>

			</div>
			<div class="ts">
				<div>2.作答完毕后拍照上传答案</div>
				<div class='ts-i'><i class="icon el-icon-info"></i>一次上传一面，多面就上传多次</div>
			</div>
			<div class="up-box" v-loading="loading">
				<el-upload class="upload-demo" action="" :http-request="uploadFild" :before-upload="beforeUpload" :on-preview="handlePreview"
				 :on-remove="handleRemove"  list-type="picture">
					<el-button size="small" type="primary" class="button">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
				</el-upload>
			</div>
			<Tabbar />

		</div>
	</div>
</template>

<script>
	import Tabbar from '../common/tabbar.vue'
	import mobile from '@/assets/js/mobile.js'
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
	import VueQr from 'vue-qr'
	import qrHost from '@/api/qrCode.js'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		apiCommonExamSeleElementTestById,
		StudentAccountInfo,
		studentTestQuestionsAnswerSheet
	} from '@/api/api.js'
	export default {
		components: {
			ElImageViewer,
			VueQr,
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
				qrHost: qrHost(),
				loading: false,
				status: '',
				examId: this.$route.query.id,
				examSn: '',
				examTitle: '',
				examParticular: '',
				bigIndex: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType: '',
				topicButton: false,
				topicSum: 0,
				Problemtitle: '',
				ProblemChoice: [],
				question_id: '',
				urls: ['0'],
				srcList: ['0'],
				logtype: '',
			}

		},
		methods: {
			// 上传文件
			uploadFild(param) {
				var that = this
				var file = param.file
				this.uploadFile = new FormData()
				this.uploadFile.append('file', file)
				this.loading = true
				studentTestQuestionsAnswerSheet(5000,this.examId,this.uploadFile).then(res=>{
					console.log(res)
					this.$message.success('上传成功')
					this.loading = false
				})
			},
			// 上传控制
			beforeUpload(file) {
				// console.log(file)
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'png'
				const extension2 = testmsg === 'jpg'
				const isLt2M = file.size / 1024 / 1024 < 50
				if (!extension && !extension2) {
					this.$message({
						message: '上传文件只能是 png、jpg格式!',
						type: 'warning'
					});
				}
				if (!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 50MB!',
						type: 'warning'
					});
				}
				return extension || extension2 && isLt2M
				// return extension 
			},
			// 图片遮罩
			img_shade(index) {
				this.imgShade = true;
				this.imgShadeIndex = index
			},
			//---开控制预览大图片---
			openViewer(index) {
				this.bigImg = true
				this.bigIndex = this.imgShadeIndex
			},

			//---关闭控制预览大图片---
			closeViewer() {
				this.bigImg = false
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
			//  删除cookie
			clearCookie(name, value) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				// 这里需要判断一下cookie是否存在
				var c = this.getCookie(name);
				if (c != null) {
					document.cookie = name + "=" + c + ";expires=" + exp.toGMTString();
				}
			},
			//根据时间戳生成的时间对象
			getLocalTime(nS) {
				var d = new Date(nS);
				var date =
					(d.getHours() - 8) + ":" +
					(d.getMinutes()) + ":" +
					(d.getSeconds());
				return date;
			},
			//计算考试剩余时间
			getResidueTime() {
				let ResidueTime
				let newTime = new Date().getTime();
				let timeDifference = this.getCookie('examTime') - newTime;
				if (timeDifference <= 0) {
					this.$alert('考试时间结束！将自动提交试卷。', '提醒', {
						confirmButtonText: '确定',
						callback: action => {
							this.finish()
						}
					});
					// 清除计时器
					clearInterval(this.timer)
					// 清除时间cookic
					this.clearCookie('examTime')
					localStorage.removeItem('topic')
					return ResidueTime = '00:00:00';
				}
				ResidueTime = this.getLocalTime(timeDifference)
				return ResidueTime;
			},
			// 下载答题卡
			downloadFile() {
				StudentAccountInfo({
					"id": localStorage.getItem('userID')
				}).then(res => {
					if (res.data.data.list) {
						let list = res.data.data.list[0]
						let createTestPaperInfoObj = {
							testPaperId: this.examId,
							students: [{
								uid: localStorage.getItem('userID'),
								utype: "student",
								items: [],
								info: {
									"idCard": list.idCard,
									"schoolName": list.schoolName,
									"name": list.name,
									"className": list.classes.name
								}
							}],
						}
						this.$router.push({
							name: 'test_paper_maker_for_task',
							params: {
								createTestPaperInfoObj: createTestPaperInfoObj
							}
						})
					} else {
						this.$message.warning('查询不到用户信息')
					}
				})
			},

			// 考试完成
			finish() {
				this.$router.push({
					name: 'examination_finish',
					query: {
						id: this.examId
					}
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		},
		
		mounted() {

				// ---查询试卷---
				apiCommonExamSelectById(this.examId).then(res => {
					this.examTitle = res.data.data.title
					this.examParticular = res.data.data.examExplain
					this.examSn = res.data.data.sn
				})
			// 生成二维码
			this.qrHost = `${qrHost()}mobile_examination_upfile?paper_id=${this.examId}&type=has`
			console.log(this.qrHost)

			// ---定时器计算剩余时间
			this.timer = setInterval(x => {
				this.ResidueTime = this.getResidueTime()
			}, 1000)


		},
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
// 修改element 自带样式
<style scoped>
	.box{font-size: 18px;}
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}
	.up-box{min-height: 200px;z-index: 1;}
</style>
