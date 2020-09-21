<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
			<div class="answer">
				<div class="ts">考试标题：{{examTitle}}</div>
				<div class="ts" style="color: #999999;font-size: 14px;">考试介绍：{{examParticular}}</div>
				<div class="ts" style="font-size: 14px;">最终得分 <span style="color: #FB4C1C;">{{Performance}}分</span>（满分{{total_points}}分）</div>
				<!-- <div class="ts-time">{{ResidueTime}}</div> -->
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
									<!-- <el-checkbox-group v-model="topicDefault">
										<el-checkbox-button v-for="(d3,o) in d2.items" :key="o" :label="`${i+1}.${k+1}.${o+1}`" @change="topicLittleQuestions(d3,d3.question_type,d3.id,d3.sn),kkk()">第{{o+1}}题</el-checkbox-button>
									</el-checkbox-group> -->
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
					<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">查看，下一题</el-button>
					<div class="bottom-ts">注意核实个人信息和考试信息，如有不符立刻联系老师</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="questions">
				<div class="message-top">
					<div>{{topicIndex}}</div>
					<div>得分：<span style="color: #FB4C1C;">{{questions_gain_score}}分</span>（满分{{questions_score}}分）</div>
					<el-tag effect="dark" class="tag">试卷反馈</el-tag>
				</div>
				<div class="content-b">
					<div class="c-title" v-html="Problemtitle"></div>
					<!-- <div class="ewm" v-show="stateType!=1000&&stateType!=2000">
						<vue-qr :text="qrHost" :margin="0" colorDark="#000000" colorLight="#fff" :size="100"></vue-qr>
						<div class="l">扫码快速上传</div>
					</div> -->
				</div>
				<div class="content-c">
					<div v-if="stateType=='1000'||stateType=='2000'">
						<el-radio-group v-model="choiceKey" class="choice">
							<el-radio-button v-for="(d,i) in ProblemChoice" :label="choice[i]" :key="i"><span>{{choice[i]}}. </span><span
								 v-html="d.topic_text"></span></el-radio-button>
						</el-radio-group>
						<div class="userChoice"><span>你已选择： </span><span class="i">{{choiceKey}}</span></div>
						<div style="display: flex;justify-content: center;">
							<el-button class="reset" @click="choiceKey=''">清空本题答案</el-button>
						</div>
					</div>
					<div v-else-if="stateType==''"></div>
					<div v-else>
						<div class="content-cc">
							<div class="cc-title">综合题</div>
							<div class="font-i" style="margin-bottom: 20px;">学生在答题卡上作答后，请家长完整拍照整个小题的作答区域，确认一下识别的结果，如果修改了答案，请重新上传。</div>
						</div>
					</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">我上传的答案</div>
				<div class="questions-img">
					<div v-for="(url,i) in urls" :key="url.i" class="img-box">
						<div class="img-box-i" v-if="logtype=='img'">
							<el-image :src="url" lazy class="img" @click="img_shade(i)"></el-image>
							<transition name="el-zoom-in-top">
								<div class="img-shade" v-show="i==imgShadeIndex&&imgShade==true" @click="imgShade=false">
									<i class="icon el-icon-zoom-in" @click="openViewer()"></i>
									<i class="icon el-icon-delete-solid "></i>
								</div>
							</transition>
						</div>
						<span class="i" v-if="logtype=='img'">{{topicIndex}}</span>
						<div class="answer" v-else-if="logtype=='choice'">该题上传答案的答案是：<span style="color: #1AAEFB;">{{answer_test}}</span></div>
					</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">参考答案</div>
				<div class="rv">
					<div v-html="analysis_text" ></div>
					<div>{{consult_answer_text}}</div>
				</div>
			</div>
		</div>
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
		studentTestQuestionsLog,
		studentTestQuestionsdowonLogImg,
		studentTestQuestionsAdd,
		studentTestQuestionsString,
		StudentAccountInfo,
		studentPerformance
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
				loading: false,
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
				urls: ['0'],
				srcList: ['0'],
				logtype: '',
				answer_test: '',
				question_id_black: '',
				current_question: '0',
				total_points: 100,
				Performance: 0,
				analysis_text:'',
				consult_answer_text:'',
				questions_score:'',
				questions_gain_score:''
				
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
			// 判断是否选中状态
			currentQuestion(val) {
				console.log(val)
				// console.log(this.topicDefault)
			},
			// 获取小题题目
			topicLittleQuestions(data, type, id, sn,checked, index) {
				
                // 参考答案
				this.analysis_text=data.anwser.analysis_text
				this.consult_answer_text=data.anwser.answer_text
				// 小题分数
				this.questions_score=data.score
				// 小题索引
				if (index != undefined) {
					this.topicIndex = index
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
				}).then(res => {
					// console.log(res.data)
				})
				// 小题日志
				studentTestQuestionsLog({
					'student_id': localStorage.getItem('userID'),
					'paper_id': this.examId,
					'question_id': id
				}).then(res => {
					
					let data = res.data.data.list[0]
					this.question_id_black = data.id
					// 小题获取的分数
					if(data.hasOwnProperty('score')){
						this.questions_gain_score=data.score
					}else{
						this.questions_gain_score=0
					}
					// 小题上传答案二维码
					this.qrHost = `${qrHost()}mobile_examination_upfile?answer_id=${this.question_id_black}&type=none`
					// console.log(data.id)
					if (!data.hasOwnProperty('answer_test') && !data.hasOwnProperty('student_image')) {
						this.logtype = 'none'
					} else {
						data.hasOwnProperty('answer_test') ? (this.logtype = 'choice', this.answer_test = data.answer_test,
						// 学生选的答案
						this.choiceKey=data.answer_test) :
							(
								this.logtype = 'img',
								this.urls[0] = ('/api/student/question/getImage/' + data.id + '?id=1' + "&d=" + new Date().getTime()),
								this.srcList[0] = ('/api/student/question/getImage/' + data.id + '?id=1' + "&d=" + new Date().getTime())
							)
					}
				})

			},
			// 题目跳转
			goTopic(type) {
				this.schedule();
				let index, questionsType, next_data
				JSON.stringify(this.topicDefault) === '[]' ? this.topicDefault = ['1.1.1'] :
					(this.topicArr.map((x, i) => {
						if (x.index == this.topicDefault[this.topicDefault.length - 1]) {
							index = i
							if (index > this.topicSum - 2) {
								index = -1
							}
						}
					}));

				if (type == 'previous') {
					questionsType = this.topicArr[index - 1].type
					// console.log(this.topicDefault)
					let data = this.topicDefault
					data.splice(data.length - 1, 1, this.topicArr[index - 1].index)
					data = Array.from(new Set(data))
					this.topicDefault = data
					console.log(data)
					this.topicLittleQuestions(this.topicArr[index - 1].data, questionsType)
				} else if (type == 'next') {
					if (this.topicDefault.length >= this.topicSum) {
						this.$confirm('没有下一题了', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							// this.$message({
							// 	type: 'success',
							// 	message: '提交成功!'
							// });
							// this.finish()
						}).catch(() => {
							// this.$message({
							// 	type: 'info',
							// 	message: '暂时不提交'
							// });
						});
					} else {
						next_data = this.topicArr[index + 1]
						this.topicIndex = next_data.index
						questionsType = next_data.type
						//判断是否重复
						if (!this.topicDefault.includes(next_data.index)) {
							this.topicDefault.push(next_data.index)
						} else {
							for (const [i, x] of this.topicArr.entries()) {
								if (!this.topicDefault.includes(x.index)) {
									this.topicDefault.push(x.index)
									console.log(x.index)
									return false
								}
							}
						}
						this.topicLittleQuestions(next_data.data, questionsType, next_data.id, next_data.sn)

					}
				}
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
				// localStorage.getItem('topic') != null ? this.topicDefault = JSON.parse(localStorage.getItem('topic')) : '';
				// ---查看学生信息
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
			// 读取学生获取分数
			studentPerformance(this.examId, localStorage.getItem('userID')).then(res => {
				this.Performance = res.data.data.score
			})
			// ---查看试卷试题---
			apiCommonExamSeleElementTestById(this.examId).then(res => {
				let a, b, c = 1
				let d = JSON.parse(res.data.data.elementTest);
				console.log(d)
				// 总分
				this.total_points = d.score
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
				// 默认读取当前题目
				let frist = this.topicDefault[this.topicDefault.length - 1]

				this.topicArr.map(x => {
					if (x.index == frist) {
						this.topicLittleQuestions(x.data, x.type, x.id)
					}
				})
			})

		},

	};
</script>

<style scoped src="../../../assets/css/examination-other.css"></style>
// 修改element 自带样式
<style scoped>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.left-box .answer .ts {
		font-size: 18px;
		font-weight: bold;
		width: 100%;
		margin-bottom: 10px;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}

	.left-box .answer .all-topic-box .li {}
	.rv{line-height: 1.8;font-weight: bold;}
</style>
