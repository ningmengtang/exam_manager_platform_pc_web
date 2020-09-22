<template>
	<div class="box" v-loading="loading">
		<!-- 左边 -->
		<div class="left-box" v-show="!show">
			<div class="answer">
				<div class="ts">距离考试结束还有</div>
				<div class="ts-time">{{ResidueTime}}</div>
				<div class="all-topic-box">
					<div class="at-top">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
						 :format="format"></el-progress>
					</div>
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
				<div class="at-top" style="margin: .08rem 0;">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
					 :format="format"></el-progress>
				</div>
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
							<el-upload class="upload-demo" action="" :http-request="uploadFild" :before-upload="beforeUpload" :on-preview="handlePreview"
							 :on-remove="handleRemove" :file-list="fileList" list-type="picture">
								<el-button size="small" type="primary" class="button">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
							</el-upload>
						</div>
						<div style="display: flex;justify-content: center;flex-wrap: wrap;">
						<el-button class="previous" @click="goTopic('previous')">上一题</el-button>
						<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">下一题</el-button>
						</div>
					</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">上传日志</div>
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
						<span class="i" v-if="logtype=='img'">{{topicDefault[topicDefault.length-1]}}</span>
						<div class="answer" v-else-if="logtype=='choice'">该题上传答案的答案是：<span style="color: #1AAEFB;">{{answer_test}}</span></div>
					</div>
				</div>
			</div>
		</div>
		<el-image-viewer v-if="bigImg" :initial-index="bigIndex" :on-close="closeViewer" :url-list="srcList" />
		<Tabbar />
	</div>
</template>

<script>
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
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
		studentTestQuestionsImg,
		studentTestQuestionsAnswerSheet,
		StudentAccountInfo
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
				fileList:[],
				show: false,
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
				question_id_black: ''
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
						this.urls[0] = ('/api/student/question/getImage/' + this.question_id_black + '?id=1' + "&d=" + new Date().getTime()),
						this.srcList[0] = ('/api/student/question/getImage/' + this.question_id_black + '?id=1' + "&d=" + new Date().getTime())
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
				// 清空选项
				this.fileList=[]
				// 显示
				if(checked){
					this.show = true
				}
				// 重置选项
				this.choiceKey=''
				// 小题索引
				if(index!=undefined){
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
					console.log(res.data)
				})
				// 小题日志
				studentTestQuestionsLog({
					'student_id': localStorage.getItem('userID'),
					'paper_id': this.examId,
					'question_id': id
				}).then(res => {
					let data = res.data.data.list[0]
					console.log(data.id)
					this.question_id_black = data.id
					// 小题上传答案二维码
					this.qrHost = `${qrHost()}mobile_examination_upfile?answer_id=${this.question_id_black}&type=none`
					console.log(data.id)
					if (!data.hasOwnProperty('answer_test') && !data.hasOwnProperty('student_image')) {
						this.logtype = 'none'
					} else {
						data.hasOwnProperty('answer_test') ? (this.logtype = 'choice', this.answer_test = data.answer_test) :
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
				
				let index, questionsType, next_data,before_data
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

					if(index!=0){
						before_data=this.topicArr[index-1]
						questionsType =before_data.type
						this.topicLittleQuestions(before_data.data, questionsType, before_data.id, before_data.sn)
					}
				} else if (type == 'next') {
					if (this.topicDefault.length >= this.topicSum) {
						this.$confirm('全是题目已完成, 是否提交试卷?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '提交成功!'
							});
							this.finish()
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '暂时不提交'
							});
						});
					} else {
						next_data = this.topicArr[index + 1]
						this.topicIndex=next_data.index
						questionsType = next_data.type
						//判断是否重复
						
						// this.topicDefault.push(next_data.index)
						
						if (!this.topicDefault.includes(next_data.index)) {
							this.topicDefault.push(next_data.index)
						} else {
							for( const [ i, x ] of this.topicArr.entries()){
									if (!this.topicDefault.includes(x.index)) {
										this.topicDefault.push(x.index)
										console.log(x.index)
										return false
									}
							}
						}
						this.schedule();
						this.topicLittleQuestions(next_data.data, questionsType, next_data.id, next_data.sn)
						
					}
				}
			},
			// 上传选择题答案
			upChoice(id) {
				studentTestQuestionsString(this.choiceKey, id).then(res => {
					studentTestQuestionsLog({
						'student_id': localStorage.getItem('userID'),
						'paper_id': this.examId,
						'id': id
					}).then(res2 => {
						let data = res2.data.data.list[0]
						this.answer_test = data.answer_test
					})
				})
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
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
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
				console.log(res.data.data)
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
				// 默认读取当前题目
				let frist = this.topicDefault[this.topicDefault.length - 1]
				this.topicArr.map(x => {
					if (x.index == frist) {
						this.topicLittleQuestions(x.data, x.type, x.id)
					}
				})
				this.loading = false
				// console.log(this.topicArr)
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
	.up-box{min-height: 200px;}
</style>
