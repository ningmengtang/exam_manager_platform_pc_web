<template>
	<div class="box">
		<div class="big-box">
			<div class="header-top">
				<div class="time">
					<div>距离考试结束还有</div>
					<div class="ts-time">{{ResidueTime}}</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">
					<div class="i1">{{examTitle}}</div>
					<div class="i2">{{examParticular}}</div>
				</div>
				<div>
					<el-button class="buttom" @click="finish()">交卷</el-button>
				</div>
				<div class="other-box" style="margin-top: .3rem;">
					<div class="status">图片试卷上传答案</div>
					<div class="up-box" v-loading="loading">
						<el-upload class="upload-demo" action="" :http-request="uploadFild" :before-upload="beforeUpload" :on-preview="handlePreview"
						 :on-remove="handleRemove" list-type="picture">
							<el-button size="small" type="primary" class="button">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
						</el-upload>
					</div>
				</div>
			</div>
			<div class="content-b">
				<div class="exam-img">
					<img :src="affix" class="img" @click="img_shade(i)"></img>
				</div>
				<div class="message-top" style="margin-top: 20px;">上传一览</div>
				<div class="ts">学生在答题卡上作答后，请家长完整拍照整个小题的作答区域，确认一下上传的结果，如果上传了错误的答案，请重新上传，请不要重复上传同样的题目答案。</div>
				<div class="questions-img">
					<div v-for="(url,i) in urls" :key="url.i" class="img-box">
						<div class="img-box-i">
							<el-image :src="url" lazy class="img" @click="img_shade(i)" style="width: 100%;"></el-image>
							<transition name="el-zoom-in-top">
								<div class="img-shade" v-show="i==imgShadeIndex&&imgShade==true" @click="imgShade=false">
									<i class="icon el-icon-zoom-in" @click="openViewer()"></i>
									<i class="icon el-icon-delete-solid "></i>
								</div>
							</transition>
						</div>
						<!-- <span class="i">5545</span> -->
					</div>
				</div>
			</div>
		</div>
		<Tabbar />
	</div>
</template>

<script>
	import Tabbar from '../common/tabbar.vue'
	import {
		Dialog
	} from 'vant';
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
		studentTestQuestionsAdd,
		StudentAccountInfo,
		studentTestQuestionsLog,
		studentTestQuestionsImg,
		studentTestQuestionsUpImg,
		studentTestQuestionsDelImg
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
				examTitle: '',
				examSn: '',
				studentSn: '',
				examParticular: '',
				papers: {},
				classes: '',
				dialogVisible: false,
				percentage: 0,
				customColor: '#409eff',
				topicDefault: [1],
				topic: [{
						id: 1,
						name: '第一题'
					}, {
						id: 2,
						name: '第二题',
					},
					{
						id: 3,
						name: '第三题'
					}
				],
				topic2: ['第7题', '第8题', '第9题', '第10题', '第11题', '第12题', '第13题', '第14题'],
				choiceKey: '',
				bigImg: false,
				imgShade: false,
				imgShadeIndex: '',
				bigIndex: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType: '',
				problemImg: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				urls: [

				],
				srcList: [


				],
				affix: ''
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
				studentTestQuestionsImg(this.question_id_black, this.uploadFile).then(res => {
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
			format(percentage) {
				if (percentage == 100) {
					this.customColor = '#5cb87a'
				} else {
					this.customColor = '#409eff'
				}
				return percentage === 100 ? '已完成' : `${percentage}%`;
			},
			// ---计算完成度---
			schedule(type) {
				localStorage.setItem('topic', JSON.stringify(this.topicDefault))

				switch (type) {
					case 'choice':
						this.stateType = 'choice'
						if (this.choiceKey != '') {
							let arr = this.topic.concat(this.topic2).length
							let choice = this.topicDefault.length
							this.percentage = parseInt(choice / arr * 100)
						}
						break;
					case 'synthesize':
						this.stateType = 'synthesize'
						if (this.problemImg != '') {
							let arr = this.topic.concat(this.topic2).length
							let choice = this.topicDefault.length
							this.percentage = parseInt(choice / arr * 100)
						}
						break;
				}
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
					Dialog.confirm({
							title: '提醒',
							message: '考试时间结束！将自动提交试卷。',
						})
						.then(() => {
							this.finish()
						})
						.catch(() => {
							// on cancel
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
			// 考试完成
			finish() {
				Dialog.alert({
				  title: '提示',
				  message: '跳转回考试试卷页面',
				}).then(() => {
				 this.$router.push({
				 	name: 'mobile_examination_finish',
				 	query: {
				 		id: this.examId
				 	}
				 })
				});
				
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		},

		mounted() {
			// this.loading = true,
				// ---查看学生信息
				StudentAccountInfo({
					id: localStorage.getItem('userID')
				}).then(res => {
					this.studentSn = res.data.data.list[0].sn
				})
			// 新增答案
			studentTestQuestionsAdd({
				'paper_id': this.examId,
				'paper_sn': this.examSn,
				'paper_title': this.examTitle,
				'student_id': localStorage.getItem('userID'),
				'student_name': localStorage.getItem('userName'),
				'student_sn': this.studentSn,
			}).then(res => {
				let id = res.data.data
				// 返回的id和sn
		
				studentTestQuestionsLog({
					'student_id': localStorage.getItem('userID'),
					'paper_id': this.examId,
					'id': id
				}).then(res => {
					let data = res.data.data.list[0]
					this.question_id_black = data.id
					this.question_sn_black = data.sn
		
					studentTestQuestionsUpImg(data.sn).then(res => {
						this.loading_img = false
						if (res.data.data != undefined) {
							res.data.data.map((x, i) => {
								// 返回的图片id
								this.up_img_black_id_arr[i] = x.id
								this.urls[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
								this.srcList[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
							})
						}
		
					})
		
		
				})
			})
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				this.examSn = res.data.data.sn
				console.log(res.data.data)
			})
			// 返回图片试卷
			apicommonExamGetFile(this.examId).then(res => {
				let blob = new Blob([res.data]);
				let url = window.URL.createObjectURL(blob);
				this.affix=url
				this.srcList_i[0]=url
			})
			this.timer = setInterval(x => {
				this.ResidueTime = this.getResidueTime()
			}, 0)
			
		},
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
// 修改element 自带样式
<style scoped>
	.up-box {
		min-height: 200px;
	}
</style>
