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
					<el-button class="buttom">交卷</el-button>
				</div>
				<div class="other-box">
					<div class="status">图片试卷上传答案</div>
					<div class="ewm">
						<el-image :src="ewm"></el-image>
						<div class="l">扫码快速上传</div>
					</div>
				</div>
			</div>
			<div class="content-b">
				<div class="message-top">上传一览</div>
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
						<span class="i">5545</span>
					</div>
				</div>
				<div class="exam-img">
					<img :src="affix"  class="img" @click="img_shade(i)"></img>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		apiCommonExamSeleElementTestById,
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
				ewm: require("../../../assets/img/ewm.png"),
				urls: [
					'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
					'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
					'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
					'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
					'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
					'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
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
				],
				affix:''
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
			// 题目跳转
			goTopic() {

			}
		},
		mounted() {
			this.loading = true,
				localStorage.getItem('topic') != null ? this.topicDefault = JSON.parse(localStorage.getItem('topic')) : '';

			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				// this.affix=res.data.data.affix
			})
			// 返回图片试卷
			apicommonExamGetFile(this.examId).then(res=>{
				let blob = new Blob([res.data]);
				let url = window.URL.createObjectURL(blob);
			     this.affix=url
			})
			// ---查看试卷试题---
			// apiCommonExamSeleElementTestById(this.examId).then(res => {
			// 	console.log(res.data.data.elementTest)
			// })
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
