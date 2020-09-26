<template>
	<div class="box" v-loading="loading">
		<!-- 左边 -->
		<div class="left-box">
			<div class="answer">
				<div class="ts">距离考试结束还有</div>
				<div class="ts-time">{{ResidueTime}}</div>
				<div class="all-topic-box">
					<!-- 	<div class="at-top">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
						 :format="format"></el-progress>
					</div> -->
					<div class="li">
						<div class="li-i" v-for="(d,i) in topic" :key="i">
							<div class="at-title">第{{i+1}}部分</div>
							<div v-for="(d2,k) in d.items" :key="k">
								<div class="at-title-i" v-html="d2.topic_text"></div>
								<div class="at-number">
									<el-checkbox-group v-model="topicDefault">
										<!-- <el-checkbox-button    v-for="(d3,o) in d2.items" :key="o" :label="`${i+1}.${k+1}.${o+1}`" @change="checked=>topicLittleQuestions(d3,d3.question_type,d3.id,d3.sn,checked,`${i+1}.${k+1}.${o+1}`)" @change.native="currentQuestion">第{{o+1}}题</el-checkbox-button> -->
										<el-checkbox-button v-for="(d3,o) in d2.items" :key="o" :label="`${i+1}.${k+1}.${o+1}`" @change="checked=>topicLittleQuestions(d3,d3.question_type,d3.id,d3.sn,checked,`${i+1}.${k+1}.${o+1}`)">第{{d3.no}}题</el-checkbox-button>
									</el-checkbox-group>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="affirm">
					<!-- <el-button class="previous" @click="goTopic('previous')">上一题</el-button> -->
					<!-- <el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">下一题</el-button> -->
					<el-button class="next" style="background-color: #19AEFB;" @click="finishAll">全部完成提交</el-button>
					<div class="bottom-ts">注意核实个人信息和考试信息，如有不符立刻联系老师</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="questions">
				<div class="message-top">
					<div>{{topicIndex}}</div>
					<el-tag effect="dark" class="tag">无答题卡作答</el-tag>
				</div>
				<div class="content-b">
					<div class="c-title" v-html="Problemtitle"></div>
					<div class="ewm" v-show="stateType!=1000&&stateType!=2000" v-loading="loading_ewm">
						<vue-qr :text="qrHost" :margin="0" colorDark="#000000" colorLight="#fff" :size="100"></vue-qr>
						<div class="l">扫码快速上传</div>
					</div>
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
						<div style="display: flex;justify-content: center;">
							<el-button class="reset" @click="upChoice(question_id_black)">确认上传选择题答案</el-button>
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
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">
					<div>上传日志</div>
					<!-- <div><span class="i">上传成功请按这里刷新按钮</span>
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
						<span class="i" v-if="logtype=='img'">{{topicIndex}}</span>
					</div>
					<div class="answer" v-if="logtype=='choice'">该题上传答案的答案是：<span style="color: #1AAEFB;">{{answer_test}}</span></div>
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
		studentTestQuestionsUpImg,
		studentTestQuestionsDelImg,
		studentQuestionSelectImg
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
				loading_img: false,
				loading_Exam: false,
				loading_ewm: true,
				is_checkbox_click: false,
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
				unfinished_arr: [],
				websock_frist: 0,
				websocket_sn: '',
				websocket_old: '',
				websocket_black_change: false,
				selectAllLog_one: 0,
				selectAllLog_order: [],
				finishAll_t:false
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
			// currentQuestion() {

			// 	console.log(this.topicDefaultSave)
			// },
			// 获取小题题目
			topicLittleQuestions(data, type, id, sn, checked, index) {

				// loading
				// this.loading_img = true
				// 重置选项
				this.choiceKey = ''
				this.logtype = ''
				// 小题索引
				if (index != undefined) {
					this.topicIndex = index
				}
				// 判断选中的题目
				// checked?(this.topicDefaultSave = this.topicDefault):(this.topicDefault = this.topicDefaultSave)
				// checked?(this.topicDefault = this.topicDefaultSave):(this.topicDefault = this.topicDefaultSave)

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
				// console.log(sn)
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
					this.selectAllLog()
					// 小题日志
					studentTestQuestionsLog({
						'student_id': localStorage.getItem('userID'),
						'paper_id': this.examId,
						'question_id': id
					}).then(res => {
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
					this.img_size--;
				})
				studentTestQuestionsUpImg(this.question_sn_black).then(res => {
					// 获取删除的索引
					let index = this.up_img_black_id_arr.findIndex(x => x == id)
					this.up_img_black_id_arr.splice(index, 1)
					this.urls.splice(index, 1)
					this.srcList.splice(index, 1)
					console.log(this.urls.length)
					if (this.urls.length == 0) {
						let t_index = this.topicArr.findIndex(x => x.index == this.topicIndex)
						this.topicDefault.splice(t_index, 1)
						this.selectAllLog()
					}
				})
			},
			// 题目跳转
			goTopic(type) {
				this.schedule();
				let i = 1;
				let index, questionsType, next_data, before_data
				// JSON.stringify(this.topicDefault) === '[]' ? this.topicDefault = ['1.1.1'] :
				// 	(this.topicArr.map((x, i) => {
				// 		if (x.index == this.topicDefault[this.topicDefault.length - 1]) {
				// 			index = i
				// 		}
				// 	}));
				// index=this.topicArr.findIndex(x=>x.index==this.topicDefault[this.topicDefault.length - 1])
				index = this.topicArr.findIndex(x => x.index == this.topicIndex)

				if (type == 'previous') {
					if (index != 0) {
						before_data = this.topicArr[index - 1]
						this.topicIndex = before_data.index
						questionsType = before_data.type
						// this.topicLittleQuestions(before_data.data, questionsType, before_data.id, before_data.sn)
						// let data = this.topicDefault
						// data.splice(data.length - 1, 1, this.topicArr[index - 1].index)
						// data = Array.from(new Set(data))
						// this.topicDefault = data
						// console.log(data)
						// this.topicIndex=this.topicArr[index-1].index
						this.topicLittleQuestions(before_data.data, questionsType, before_data.id, before_data.sn, true, before_data.index)
					}

					// console.log(this.topicDefault)

				} else if (type == 'next') {
					console.log(this.topicDefault)
					if (this.topicDefault.length >= this.topicSum) {

						this.finishAll()
					} else {
						let data = Array.from(new Set(this.topicArr))
						next_data = data[index + 1]
						this.topicIndex = next_data.index
						questionsType = next_data.type
						//判断是否重复
						if (!this.topicDefault.includes(next_data.index)) {
							this.topicDefault.push(next_data.index)
						} else {
							for (const [i, x] of this.topicArr.entries()) {
								if (!this.topicDefault.includes(x.index)) {
									this.topicDefault.push(x.index)
									return false
								}
							}
						}
						this.topicLittleQuestions(next_data.data, questionsType, next_data.id, next_data.sn, true, next_data.index)
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
				}
			},
			//初始化weosocket
			initWebSocket() { //初始化weosocket
				const wsuri = "ws://10.0.0.13:8082";
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen() { //连接建立之后执行send方法发送数据
				// let actions = {
				// 	"test": "12345"
				// };
				// this.websocketsend(JSON.stringify(actions));
			},
			websocketonerror() { //连接建立失败重连
				this.initWebSocket();
			},
			websocketonmessage(e) { //数据接收
				this.websocket_black_change = true
				//  判断第一次链接
				if (this.websock_frist == 0) {
					this.websock_frist = 1
					if (this.loading_Exam) {
						this.loading = false
						this.loading_ewm = false
						const redata = JSON.parse(e.data);
						this.websocket_sn = redata.websocket_sn
					}
				}
				let index = this.topicArr.findIndex(x => x.index == this.topicIndex)
				let data = this.topicArr[index]
				console.log(data)
				this.topicLittleQuestions(data.data, data.type, data.id, data.sn, true, data.index)

			},
			websocketsend(Data) { //数据发送
				this.websock.send(Data);
			},
			websocketclose(e) { //关闭
				console.log('断开连接', e);
			},
			// 查询日志
			selectlog() {
				this.loading_img = true
				studentTestQuestionsLog({
					'student_id': localStorage.getItem('userID'),
					'paper_id': this.examId,
					'pageSize': 999,
					'pageNum': 1,
					'id': this.question_id_black
				}).then(res => {
					let data = res.data.data.list[0]
					this.black_log_data = res.data.data.list
					this.up_img_black_id_arr = [];
					if (!data.hasOwnProperty('answer_test')) {
						this.logtype = 'img',
							this.up_img_black_id_arr = [],
							this.urls = [],
							this.srcList = [],

							studentTestQuestionsUpImg(data.sn).then(res => {
								this.loading_img = false
								res.data.data.map((x, i) => {
									// 返回的图片id
									this.up_img_black_id_arr[i] = x.id
									console.log(x.id)
									this.urls[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
									this.srcList[i] = ('/api/student/question/getImage/' + x.id + '?id=1' + "&d=" + new Date().getTime())
								})
							})
					} else {
						this.logtype = 'choice', this.answer_test = data.answer_test, this.loading_img = false, this.choiceKey = this.answer_test
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
							console.log(i)
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
			// 考试完成
			finish() {
				this.$router.push({
					name: 'examination_finish',
					query: {
						id: this.examId
					}
				})
			}
			// 计时器循环获取题目
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
				this.loading_Exam = true
				this.initWebSocket();
			})

			// ---定时器计算剩余时间
			this.timer = setInterval(x => {
				this.ResidueTime = this.getResidueTime()
			}, 1000)
			let data_old = []

		}


	};
</script>

<style scoped src="../../../assets/css/examination-other.css"></style>
// 修改element 自带样式
<style scoped>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}
</style>
