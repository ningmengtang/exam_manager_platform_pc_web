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
				<div class="other-box">
					<div class="status">图片试卷上传答案</div>
					<div class="ewm">
						<vue-qr :text="qrHost" :margin="0" colorDark="#000000" colorLight="#fff" :size="100"></vue-qr>
						<div class="l">扫码快速上传</div>
					</div>
				</div>
			</div>
			<div class="content-b">
				<div class="exam-img">
					<div>
						<el-image :src="affix" class="img" :preview-src-list="srcList_i">
							<div class="img-shade" v-show="imgShadeIndex_i&&imgShade_i==true" @click="imgShade_i=false">
								<i class="icon el-icon-zoom-in" @click="openViewer_i()"></i>
								<i class="icon el-icon-delete-solid "></i>
							</div>
						</el-image>
						
					</div>

				</div>
				<div class="message-top" style="margin-top: 20px;">上传一览</div>
				<div class="ts">学生在答题卡上作答后，请家长完整拍照整个小题的作答区域，确认一下上传的结果，如果上传了错误的答案，请重新上传，请不要重复上传同样的题目答案。</div>
				<div class="questions-img">
					<div v-for="(url,i) in urls" :key="url.i" class="img-box">
						<div class="img-box-i">
							<el-image :src="url" lazy class="img" @click="img_shade(i)"></el-image>
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
		<el-image-viewer v-if="bigImg_i" :initial-index="bigIndex_i" :on-close="closeViewer_i" :url-list="srcList_i" />
		<el-image-viewer v-if="bigImg" :initial-index="bigIndex" :on-close="closeViewer" :url-list="srcList" />
	</div>
</template>

<script>
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
		studentTestQuestionsUpImg,
		studentTestQuestionsDelImg
	} from '@/api/api.js'
	export default {
		components: {
			ElImageViewer,
			VueQr
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
				loading_img: false,
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
				bigImg_i: false,
				imgShade: false,
				imgShade_i: false,
				imgShadeIndex: '',
				imgShadeIndex_i: '',
				bigIndex: 0,
				bigIndex_1: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType: '',
				problemImg: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				ewm: require("../../../assets/img/ewm.png"),
				urls: [],
				srcList: [],
				srcList_i:[ 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
				affix: '',
				question_id_black: '',
				question_sn_black: '',
				up_img_black_id_arr: [],
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
			img_shade_i(index) {
				this.imgShade_i = true;
				this.imgShadeIndex_i = index
			},
			img_shade(index) {
				this.imgShade = true;
				this.imgShadeIndex = index
			},
			//---开控制预览大图片---
			openViewer(index) {
				this.bigImg = true
				this.bigIndex = this.imgShadeIndex
			},
			openViewer_i(index) {
				this.bigImg_i = true
				this.bigIndex_i = this.imgShadeIndex_i
			},

			//---关闭控制预览大图片---
			closeViewer() {
				this.bigImg = false
			},
			closeViewer_i() {
				this.bigImg_i = false
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
			// 考试完成
			finish() {
				this.$router.push({
					name: 'examination_finish',
					query: {
						id: this.examId
					}
				})
			}
		},
		mounted() {
			this.loading = true,
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

<style scoped src="../../../assets/css/examination-other.css"></style>
// 修改element 自带样式
<style>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}
</style>
