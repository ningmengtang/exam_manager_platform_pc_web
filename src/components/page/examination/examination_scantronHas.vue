<template>
	<div class="box">

		<!-- 左边 -->
		<div class="left-box">
			<div class="box-card">
				<div class="answer">
					<div class="ts">距离考试结束还有</div>
					<div class="ts-time">{{ResidueTime}}</div>
					<div class="all-topic-box">
						<div class="at-top">作答进度:<el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor"
							 :format="format"></el-progress>
						</div>
						<div class="li">
							<div class="at-title">第一大题、选择题</div>
							<div class="at-number">
								<el-checkbox-group v-model="topicDefault" size="medium" @change="schedule('choice')">
									<el-checkbox-button v-for="(d,i) in topic" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
							<div class="at-title">第二大题、综合题</div>
							<div class="at-number">
								<el-checkbox-group v-model="topicDefault" size="medium" @change="schedule('synthesize')">
									<el-checkbox-button v-for="(d,i) in topic2" :label="d" :key="d.i">{{d}}</el-checkbox-button>
								</el-checkbox-group>
							</div>

						</div>
					</div>
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
					<div class="c-title">请问唧唧复唧唧的下一句是什么？</div>
				</div>
				<div class="content-c">
					<div v-if="stateType=='choice'">
						<el-radio-group v-model="choiceKey" class="choice">
							<el-radio-button label="A">A.备选项</el-radio-button>
							<el-radio-button label="B">B.备选项</el-radio-button>
							<el-radio-button label="C">C.备选项</el-radio-button>
							<el-radio-button label="D">D.备选项</el-radio-button>
						</el-radio-group>
						<div class="userChoice"><span>你已选择： </span><span class="i">{{choiceKey}}</span></div>
						<div style="display: flex;justify-content: center;">
							<el-button class="reset" @click="choiceKey=''">清空本题答案</el-button>
						</div>
					</div>
					<div v-else>
							<el-image :src="'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'" lazy class="img-box" ></el-image>
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
		apiCommonExamSelectById
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
				topicDefault: ['第1题'],
				topic: ['第1题', '第2题', '第3题', '第4题', '第5题'],
				topic2: ['第7题', '第8题', '第9题', '第10题', '第11题', '第12题', '第13题', '第14题'],
				choiceKey: '',
				bigImg: false,
				imgShade: false,
				imgShadeIndex: '',
				bigIndex: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType:'',
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
				
				switch (type){
					case 'choice' :
					this.stateType='choice'
					if (this.choiceKey != '') {
						let arr = this.topic.concat(this.topic2).length
						let choice = this.topicDefault.length
						this.percentage = parseInt(choice / arr * 100)
					}
					break;
					case 'synthesize':
					this.stateType='synthesize'
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
					this.$alert('这是一段内容', '标题名称', {
						confirmButtonText: '确定',
						callback: action => {
							this.$message({
								type: 'info',
								message: `action: ${ action }`
							});
						}
					});
					// 清除计时器
					clearInterval(this.timer)
					// 清除时间cookic
					clearCookie('examTime')
					ResidueTime = '00:00:00'

				}
				ResidueTime = this.getLocalTime(timeDifference)
				return ResidueTime;
			}
		},
		mounted() {
			this.loading = true,
				// ---查询试卷---
				apiCommonExamSelectById(this.examId).then(res => {
					this.examTitle = res.data.data.title
					this.examParticular = res.data.data.examExplain
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
