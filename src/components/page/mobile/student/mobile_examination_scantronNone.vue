<template>
	<div class="box" v-loading="loading">
		<!-- 左边 -->
		<div class="left-box" v-show="!show">
			<div class="answer">
				<div class="ts">距离考试结束还有</div>
				<div class="ts-time">{{ResidueTime}}</div>
				<div class="all-topic-box">
					<!-- <div class="at-top">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
						 :format="format"></el-progress>
					</div> -->
					<div class="li">
						<div class="li-i" v-for="(d,i) in topic" :key="i">
							<div class="at-title">第{{i+1}}部分</div>
							<div v-for="(d2,k) in d.items" :key="k">
								<div class="at-title-i" v-html="d2.topic_text"></div>
								<div class="at-number">
									<!-- <el-button class="button" :class="topicDefault==`${i+1}.${k+1}.${o+1}`?'i':''" v-for="(d3,o) in d2.items" :key="o" :label="o" @click="topicNumber(`${i+1}.${k+1}.${o+1}`)"
									 >第{{o+1}}小题</el-button> -->
									<el-checkbox-group v-model="topicDefault">
										<el-checkbox-button v-for="(d3,o) in d2.items" :key="o" :label="`${i+1}.${k+1}.${o+1}`" @change="checked=>topicLittleQuestions(d3,d3.question_type,d3.id,d3.sn,checked,`${i+1}.${k+1}.${o+1}`)">第{{o+1}}题</el-checkbox-button>
									</el-checkbox-group>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="affirm">
					<!-- <el-button class="previous" @click="goTopic('previous')">确认，上一题</el-button> -->
					<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">确认，下一题</el-button>
					<div class="bottom-ts">注意核实个人信息和考试信息，如有不符立刻联系老师</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box" v-show="show">
			<div class="questions">
				<div class="message-top">
					<div>{{topicIndex}}</div>
					<el-tag effect="dark" class="tag" @click="show=false">关闭</i></el-tag>
				</div>
				<!-- <div class="at-top" style="margin: .08rem 0;">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
					 :format="format"></el-progress>
				</div> -->
				<div class="content-b">
					<div class="c-title" v-html="Problemtitle"></div>
				</div>
				<div class="content-c">
					<div v-if="stateType=='1000'||stateType=='2000'">
						<el-radio-group v-model="choiceKey" class="choice">
							<!-- <el-radio-button label="A">A.备选项</el-radio-button>
							<el-radio-button label="B">B.备选项</el-radio-button>
							<el-radio-button label="C">C.备选项</el-radio-button>
							<el-radio-button label="D">D.备选项</el-radio-button> -->
							<!-- <el-radio-button  v-for="(d,i) in ProblemChoice" :label="choice[i]" :key="i" v-html="d.topic_text" >{{choice[i]}}{{d.topic_text.replace(/style=\"(.*)\"/gi, 'class="img-responsive"')}}</el-radio-button> -->
							<el-radio-button v-for="(d,i) in ProblemChoice" :label="choice[i]" :key="i"><span>{{choice[i]}}. </span><span
								 v-html="d.topic_text"></span></el-radio-button>
						</el-radio-group>
						<div class="userChoice"><span>你已选择： </span><span class="i">{{choiceKey}}</span></div>
						<div style="display: flex;justify-content: center;flex-wrap: wrap;">
							<el-button class="reset" style="margin: .2rem;" @click="upChoice(question_id_black)">确认上传选择题答案</el-button>
							<el-button class="previous" @click="goTopic('previous')">上一题</el-button>
							<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">下一题</el-button>
						</div>
					</div>
					<div v-else-if="stateType==''"></div>
					<div v-else>
						<div class="content-cc">
							<div class="cc-title">综合题</div>
							<!-- <el-image :src="problemImg" class="cc-img"></el-image> -->

							<div class="font-i">学生在答题卡上作答后，请家长完整拍照整个小题的作答区域，确认一下识别的结果，如果修改了答案，请重新上传。</div>
						</div>


						<div class="up-box" v-loading="loading">
							<el-upload class="upload-demo" action="" :http-request="uploadFild" accept="image/*,video/*" capture="camera" :before-upload="beforeUpload" :on-preview="handlePreview"
							 :on-remove="handleRemove" :file-list="fileList" list-type="picture">
								<el-button size="small" type="primary" class="button">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10m</div>
							</el-upload>
						</div>
						<div style="display: flex;justify-content: center;flex-wrap: wrap;">
							<el-button class="previous" @click="goTopic('previous')">上一题</el-button>
							<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">下一题</el-button>
						</div>
					</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">
					<div>上传日志</div>
					<!-- <div style="width: 100%;text-align: right"><span class="i">上传成功请按这里刷新按钮</span>
						<el-button type="primary" icon="el-icon-refresh-right" circle class="icon" @click="selectlog(question_id_black)"></el-button>
					</div> -->
				</div>
				<div class="questions-img" v-loading="loading_img">
					<div v-for="(url,i) in urls" :key="url.i" class="img-box">
						<div class="img-box-i" v-if="logtype=='img'">
							<el-image :src="url" lazy class="img" @click="img_shade(i)"></el-image>
							<transition name="el-zoom-in-top">
								<div class="img-shade" v-show="i==imgShadeIndex&&imgShade==true" @click="imgShade=false">
									<i class="icon el-icon-zoom-in" @click="openViewer()"></i>
									<i class="icon el-icon-delete-solid " @click="upImgDel(up_img_black_id_arr[i])"></i>
								</div>
							</transition>
						</div>
						<span class="i" v-if="logtype=='img'">{{topicDefault[topicDefault.length-1]}}</span>
					</div>
					<div class="answer" v-if="logtype=='choice'">该题上传答案的答案是：<span style="color: #1AAEFB;">{{answer_test}}</span></div>
				</div>
			</div>
		</div>
		<el-image-viewer v-if="bigImg" :initial-index="bigIndex" :on-close="closeViewer" :url-list="srcList" />
		<Tabbar />
	</div>
</template>

<script>
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
	import {
		Toast,
		Dialog
	} from 'vant';
	import Tabbar from '../common/tabbar.vue'
	import qrHost from '@/api/qrCode.js'
	import mobile from '@/assets/js/mobile.js'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		apiCommonExamSeleElementTestById,
		studentTestQuestionsLog,
		studentTestQuestionsdowonLogImg,
		studentTestQuestionsAdd,
		studentTestQuestionsString,
		StudentAccountInfo,
		studentTestQuestionsUpImg,
		studentTestQuestionsDelImg,
		studentTestQuestionsImg,
		studentQuestionSelectImg
	} from '@/api/api.js'
	export default {
		components: {
			ElImageViewer,
			Tabbar
		},
		created() {
			mobile();
		},
		data() {
			return {
				fileList: [],
				show: false,
				total: 0,
				pageSize: 9,
				pageNum: 1,
				currentPage: 1,
				download: 0,
				disabled: 0,
				loading: false,
				loading_img: false,
				loading_Exam: false,
				status: '',
				studentSn: '',
				examId: this.$route.query.id,
				examSn: '',
				examTitle: '',
				examParticular: '',
				papers: {},
				classes: '',
				qrHost: qrHost(),
				dialogVisible: false,
				percentage: 0,
				customColor: '#409eff',
				topicDefault: ['1.1.1'],
				topicDefaultSave: ['1.1.1'],
				topicIndex: '1.1.1',
				topicArr: [],
				choice: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
					"V", "W", "X", "Y", "Z"
				],
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
				choiceKey: '',
				bigImg: false,
				imgShade: false,
				imgShadeIndex: '',
				bigIndex: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType: '',
				topicButton: false,
				topicSum: 0,
				Problemtitle: '',
				ProblemChoice: [],
				problemImg: 'https://fuss10.elemecdn.com/a/3fproblem/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				ewm: '',
				question_id: '',
				urls: [],
				srcList: [],
				logtype: '',
				answer_test: '',
				question_id_black: '',
				question_sn_black: '',
				current_question: '0',
				black_log_data: '',
				up_img_black_id_arr: [],
				finish_arr: [],
				goTopicIndex: '',
				selectAllLog_one: 0,
				selectAllLog_order: [],
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
					studentTestQuestionsLog({
						'student_id': localStorage.getItem('userID'),
						'paper_id': this.examId,
						'id': this.question_id_black
					}).then(res2 => {
						let data = res2.data.data.list[0]
						studentTestQuestionsUpImg(this.question_sn_black).then(res => {
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
				let choice = this.topicDefault.length
				this.percentage = parseInt(choice / this.topicSum * 100)
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
					// this.$alert('考试时间结束！将自动提交试卷。', '提醒', {
					// 	confirmButtonText: '确定',
					// 	callback: action => {
					// 		this.finish()
					// 	}
					// });
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
			// 题目控制
			// topicNumber(num, all) {

			// },
			// 获取小题题目
			topicLittleQuestions(data, type, id, sn, checked, index) {
				//显示控制
				this.show = true
				// loading
				this.loading_img = true
				// 重置选项
				this.choiceKey = ''
				this.logtype = ''
				// 小题索引
				if (index != undefined) {
					this.topicIndex = index
				}
				// 判断选中的题目
				if (checked) {
					this.topicDefault = this.topicDefaultSave
				} else {
					this.topicDefault = this.topicDefaultSave
				}
				// 小题id
				this.question_id = id
				this.stateType = type
				// 小题title
				this.Problemtitle = data.topic_text
				//  小题选项
				this.ProblemChoice = data.items
				// 新增小题答案
				studentTestQuestionsAdd({
					'paper_id': this.examId,
					'paper_sn': this.examSn,
					'paper_title': this.examTitle,
					'student_id': localStorage.getItem('userID'),
					'student_name': localStorage.getItem('userName'),
					'student_sn': this.studentSn,
					'question_id': id,
					'question_sn': sn
				}).then(res0 => {
					console.log(res0)
					this.selectAllLog()
					// 小题日志
					studentTestQuestionsLog({
						'student_id': localStorage.getItem('userID'),
						'paper_id': this.examId,
						'question_id': id
					}).then(res => {
						console.log(res.data.data)
						this.loading_img = false
						let data = res.data.data.list[0]
						this.question_id_black = data.id
						this.question_sn_black = data.sn
						// console.log(data)
						// console.log(data.sn)
						// 小题上传答案二维码
						this.qrHost =
							`${qrHost()}mobile_examination_upfile?answer_id=${this.question_id_black}&type=none&websocket_sn=${this.websocket_sn}`
						// console.log(this.qrHost)
						// console.log(this.qrHost)
						// 判断是上传否有图片
						// console.log(data.sn)
						studentTestQuestionsUpImg(data.sn).then(res2 => {
							// console.log(res2)
							this.loading_img = false
							if (!res2.data.hasOwnProperty('data') && !data.hasOwnProperty('answer_test')) {
								this.loading_img = false
								this.logtype = 'none'
							} else if (data.hasOwnProperty('answer_test')) {
								this.logtype = 'choice', this.answer_test = data.answer_test, this.loading_img = false, this.choiceKey =
									data.answer_test
								// console.log(data.answer_test)
							} else if (res2.data.hasOwnProperty('data')) {
								this.logtype = 'img'
								this.up_img_black_id_arr = []
								this.urls = []
								this.srcList = []
								res2.data.data.map((x, i) => {
									// 返回的图片id
									this.up_img_black_id_arr[i] = x.id
									// console.log(x.id)
									this.urls[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
									this.srcList[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
								})
							}

						})
					})
				})

			},
			// 删除图片
			upImgDel(id) {
				studentTestQuestionsDelImg(id).then(res => {
					this.$message.success('删除图片成功！')
				})
				studentTestQuestionsUpImg(this.question_sn_black).then(res => {
					// 获取删除的索引
					let index = this.up_img_black_id_arr.findIndex(x => x == id)
					this.up_img_black_id_arr.splice(index, 1)
					this.urls.splice(index, 1)
					this.srcList.splice(index, 1)
				})
			},
			// 题目跳转
			goTopic(type) {

				let index, questionsType, next_data, before_data
				index = this.topicArr.findIndex(x => x.index == this.topicIndex)
				console.log(index)
				if (type == 'previous') {
					if (index != 0) {
						before_data = this.topicArr[index - 1]
						this.topicIndex = before_data.index
						this.topicIndex = before_data.index
						questionsType = before_data.type
						this.topicLittleQuestions(before_data.data, questionsType, before_data.id, before_data.sn)

					} else {
						Toast('考试完成5秒后自动跳转');
					}
				} else if (type == 'next') {
					if (this.topicSum != (index + 1)) {
						next_data = this.topicArr[index + 1]
						this.topicIndex = next_data.index
						this.topicIndex = next_data.index
						questionsType = next_data.type
						this.topicLittleQuestions(next_data.data, questionsType, next_data.id, next_data.sn)
					} else {
						Toast('现在是最后一题了');
						Dialog.confirm({
							title: '提示',
							message: '是否提交试卷',
						}).then(() => {
							this.finish()
						}).catch(() => {
							// on cancel
						});
					}

				}
			},
			// 上传选择题答案
			upChoice(id) {
				studentTestQuestionsString(this.choiceKey, id).then(res => {
					this.loading_img = true
					studentTestQuestionsLog({
						'student_id': localStorage.getItem('userID'),
						'paper_id': this.examId,
						'id': id
					}).then(res2 => {
						this.loading_img = false
						this.logtype = 'choice'
						let data = res2.data.data.list[0]
						console.log(data.answer_test)
						this.answer_test = data.answer_test
						this.selectAllLog()
					})
				})
			}, 
			// 提交
			finishAll() {
				let finish_num = 0
				this.finish_arr.map((x, i) => {
					if (x.finish) {
						finish_num++
					}
				})
				if (finish_num >= this.topicSum) {
					Dialog.alert({
						title: '提示',
						message: '是否提交试卷',
					}).then(() => {
						this.finishAll()
					}).catch(() => {
						// on cancel
					});
					// this.$confirm('全是题目已完成, 是否提交试卷?', '提示', {
					// 	confirmButtonText: '确定',
					// 	cancelButtonText: '取消',
					// 	type: 'warning'
					// }).then(() => {
					// 	this.$message({
					// 		type: 'success',
					// 		message: '提交成功!'
					// 	});
					// 	this.finish()
					// }).catch(() => {
					// 	this.$message({
					// 		type: 'info',
					// 		message: '暂时不提交'
					// 	});
					// });
				}
			},
			// 考试完成
			finish() {
				this.$router.push({
					name: 'mobile_examination_finish',
					query: {
						id: this.examId
					}
				})
			},
			// 判断完成
			selectAllLog(id) {
				studentQuestionSelectImg({
					'student_id': localStorage.getItem('userID'),
					'paper_id': this.examId,
					'pageSize': 999,
					'pageNum': 1,
				}).then(res => {
					let data = res.data.data.list
					this.selectAllLog_order
					// 判断数量
					// 判断第一次执行
					if (this.selectAllLog_one == 0) {
						// 获取正确排序id
						this.topicArr.map((x, i) => {
							this.selectAllLog_order.push(x.data.id)
							this.finish_arr.push({
								finish: false,
								index: i
							})
						})

						this.selectAllLog_one = 1
					}
					// 正确的排序数组
					data.sort((a, b) => {
						return this.selectAllLog_order.indexOf(a.question_id) - this.selectAllLog_order.indexOf(b.question_id);
					});
					// 获取题目已经做了的题目
					data.forEach((x, i) => {
						if (x.hasOwnProperty('item_imgs') || x.hasOwnProperty('answer_test')) {
							this.finish_arr[i]['finish'] = true
						} else {
							this.finish_arr[i]['finish'] = false
						}
					})
					// if (this.finish_arr.length == this.topicSum) {


					// }
					if (this.topicDefault.length - 1 <= this.topicSum) {
						this.topicDefault = []
						this.finish_arr.forEach((x, i) => {
							if (x.finish) {
								if (i != -1) {
									this.topicDefault.push(this.topicArr[i]['index'])
								}
							} else {
								this.topicDefault.splice(i, 1)
							}
						})
					}
				})
			},
			handleRemove(file, fileList) {
			
			},
			handlePreview(file) {
				console.log(file);
			}
		},
		mounted() {
			this.loading = true,
				// localStorage.getItem('topic') != null ? this.topicDefault = JSON.parse(localStorage.getItem('topic')) : '';
				StudentAccountInfo({
					id: localStorage.getItem('userID')
				}).then(res => {
					this.studentSn = res.data.data.list[0].sn
				})
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				this.examSn = res.data.data.sn
			})
			// ---查看试卷试题---
			apiCommonExamSeleElementTestById(this.examId).then(res => {
				let a, b, c = 1
				let d = JSON.parse(res.data.data.elementTest);
				console.log(d)
				this.topic = d.items
				d.items.forEach((x, i) => {
					x.items.map((y, o) => {
						this.topicSum = this.topicSum + y.items.length
						y.items.map((z, p) => {
							// 默认读取第一题
							this.topicArr.push({
								index: `${i+1}.${o+1}.${p+1}`,
								type: z.question_type,
								data: z,
								id: z.id,
								sn: z.sn
							})
						})
					})
				})
				// 获取做完的题目
				this.selectAllLog()
				// 默认读取当前题目
				let frist = this.topicDefault[this.topicDefault.length - 1]

				this.topicArr.map(x => {
					if (x.index == frist) {
						// this.topicLittleQuestions(next_data.data, questionsType, next_data.id, next_data.sn, true, next_data.index)
						this.topicLittleQuestions(x.data, x.type, x.id, x.sn, true, x.index)
					}
				})
				this.loading = false
			})
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
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}

	.box {
		display: flex;
		flex-direction: column;
	}

	.left-box {
		width: 100%;
		min-width: 100%;
	}

	.up-box {
		min-height: 200px;
	}
</style>
