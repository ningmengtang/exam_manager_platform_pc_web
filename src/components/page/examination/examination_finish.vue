<template>
	<div class="box">
		<div class="finish-box">
            <div class="time-box">
				<div class="ts">距离考试结束还有</div>
				<div class="ts-time">{{ResidueTime}}</div>
			</div>
			<div class="last">
				<el-image :src="require('../../../assets/img/exam-finish.png')" class='img'></el-image>
					<div class="ii">考试完成，真棒！</div>
					<div class="iii">您已经按时完成了考试，并提交了试卷</div>
					<div class="iii">该页面5秒后自动关闭</div>
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
		studentTestQuestionsFinish
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
				// let newTime = new Date().getTime();
				// let timeDifference = this.getCookie('examTime') - newTime;
				// 清除计时器
				clearInterval(this.timer)
				// 清除时间cookic
				this.clearCookie('examTime')
				localStorage.removeItem('topic')
				return ResidueTime = '00:00:00';
				this.$router.push({
					name: 'examination_manage',
				})
				// if (timeDifference <= 0) {
				// 	this.$router.push({
				// 		name: 'examination_manage',
				// 	})
				// 	// 清除计时器
				// 	clearInterval(this.timer)
				// 	// 清除时间cookic
				// 	this.clearCookie('examTime')
				// 	localStorage.removeItem('topic')
				// 	return ResidueTime = '00:00:00';
				// }
				// ResidueTime = this.getLocalTime(timeDifference)
				return ResidueTime;
			
			},
			// 题目跳转
			goTopic() {

			}
		},
		mounted() {
			this.loading = true,
		// 		localStorage.getItem('topic') != null ? this.topicDefault = JSON.parse(localStorage.getItem('topic')) : '';
  
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				// this.affix=res.data.data.affix
			})
			studentTestQuestionsFinish(this.examId,localStorage.getItem('userID')).then(res=>{
				console.log(res)
			})
			this.timer = setInterval(x => {
				// this.ResidueTime = this.getResidueTime()
				this.$router.push({
					name: 'examination_manage',
				})
				clearInterval(this.timer)
			}, 5000)
			
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
