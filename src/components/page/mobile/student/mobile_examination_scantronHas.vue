<template>
	<div class="box">
		<!-- 左边 -->
		<div class="left-box">
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
										<el-checkbox-button  v-for="(d3,o) in d2.items" :key="o" :label="`${i+1}.${k+1}.${o+1}`"  @change="topicLittleQuestions(d3,d3.question_type)" >第{{o+1}}题</el-checkbox-button>
									 </el-checkbox-group>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="affirm">
					<el-button class="previous" @click="goTopic('previous')">确认，上一题</el-button>
					<el-button class="next" style="background-color: #19AEFB;" @click="goTopic('next')">确认，下一题</el-button>
					<div class="bottom-ts">注意核实个人信息和考试信息，如有不符立刻联系老师</div>
				</div>
			</div>
		</div>
		<!-- 右边 -->
		<div class="right-box">
			<div class="questions">
				<div class="message-top">
					<div>{{this.topicDefault[this.topicDefault.length-1]}}</div>
					<el-tag effect="dark" class="tag">有答题卡作答</el-tag>
				</div>
				<div class="content-b">
					<div class="c-title" v-html="Problemtitle"></div>
					<div class="ewm">
						<el-image :src="ewm"></el-image>
						<div class="l">扫码快速上传</div>
					</div>
				</div>
				<div class="content-c">
					<div v-if="stateType=='1000'">
						<el-radio-group v-model="choiceKey" class="choice">
							<!-- <el-radio-button label="A">A.备选项</el-radio-button>
							<el-radio-button label="B">B.备选项</el-radio-button>
							<el-radio-button label="C">C.备选项</el-radio-button>
							<el-radio-button label="D">D.备选项</el-radio-button> -->
							<!-- <el-radio-button  v-for="(d,i) in ProblemChoice" :label="choice[i]" :key="i" v-html="d.topic_text" >{{choice[i]}}{{d.topic_text.replace(/style=\"(.*)\"/gi, 'class="img-responsive"')}}</el-radio-button> -->
							<el-radio-button  v-for="(d,i) in ProblemChoice" :label="choice[i]" :key="i"  ><span>{{choice[i]}}. </span><span v-html="d.topic_text"></span></el-radio-button>
						</el-radio-group>
						<div class="userChoice"><span>你已选择： </span><span class="i">{{choiceKey}}</span></div>
						<div style="display: flex;justify-content: center;">
							<el-button class="reset" @click="choiceKey=''">清空本题答案</el-button>
						</div>
					</div>
					<div v-else-if="stateType=='7000'">
						<div class="content-cc">
							<div class="cc-title">综合题</div>
							<!-- <el-image :src="problemImg" class="cc-img"></el-image> -->
							<div class="font-i" style="margin-bottom: 20px;">学生在答题卡上作答后，请家长完整拍照整个小题的作答区域，确认一下识别的结果，如果修改了答案，请重新上传。</div>
						</div>
					</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">上传日志</div>
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
						<span class="i">5545</span>
					</div>
				</div>
			</div>
		</div>
		<el-image-viewer v-if="bigImg" :initial-index="bigIndex" :on-close="closeViewer" :url-list="srcList" />
	</div>
</template>

<script>
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		apiCommonExamSeleElementTestById
	} from '@/api/api.js'
	export default {
		components: {
			ElImageViewer
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
				examId: this.$route.query.id,
				examTitle: '',
				examParticular: '',
				papers: {},
				classes: '',
				dialogVisible: false,
				percentage: 0,
				customColor: '#409eff',
				topicDefault: [],
				choice:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
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
				topicButton: false,
				topicSum: 0,
				Problemtitle:'',
			    ProblemChoice:[],
				problemImg: 'https://fuss10.elemecdn.com/a/3fproblem/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
				ewm: require("../../../assets/img/ewm.png"),
				urls: [
					'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
					'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
					'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
					'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
					'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
				],
				srcList: [

					'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
					'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
					'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
					'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
					'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
				]
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
			// 题目控制
			topicNumber(num, all) {
				
			},
			// 获取小题题目
			topicLittleQuestions(data,type){
				 this.stateType=type
				 // 小题title
				this.Problemtitle=data.topic_text
				//  小题选项
				this.ProblemChoice=data.items
				console.log(this.ProblemChoice)
			},
			// 题目跳转
			goTopic(type) {
				this.schedule();
				console.log(this.topicDefault)
				if (type == 'previous') {
                    
				} else if (type == 'next') {

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

				// ---查询试卷---
				apiCommonExamSelectById(this.examId).then(res => {
					this.examTitle = res.data.data.title
					this.examParticular = res.data.data.examExplain
					console.log(res.data.data)
				})
			// ---查看试卷试题---
			apiCommonExamSeleElementTestById(this.examId).then(res => {
				let d = JSON.parse(res.data.data.elementTest);
				console.log(d)
				this.topic = d.items
				d.items.map(x => {
					x.items.forEach(y => {
						this.topicSum = this.topicSum + y.items.length
					})
				})
				console.log(this.topicSum)

			})
			// ---定时器计算剩余时间
			this.timer = setInterval(x => {
				this.ResidueTime = this.getResidueTime()
			}, 1000)

		},
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
