<template>
	<div class="box">
		<div class="finish-box">
			<div class="time-box">
				<div class="ts">距离考试结束还有</div>
				<div class="ts-time">{{ResidueTime}}</div>
			</div>
			<div class="last">
				<el-image :src="require('../../../../assets/img/exam-finish.png')" class='img'></el-image>
				<div class="ii">考试完成，真棒！</div>
				<div class="iii">您已经按时完成了考试，并提交了试卷</div>
			</div>
		</div>
		
		<Tabbar />
	</div>
</template>

<script>
	import Tabbar from '../common/tabbar.vue'
	import { Toast,Dialog } from 'vant';
	import mobile from '@/assets/js/mobile.js'
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
				affix: '',
				
			}
		},
		methods: {
			afterRead(file) {
			      // 此时可以自行将文件上传至服务器
			      console.log(file);
			    },
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
					// this.$alert('考试时间到了！', '提示', {
					// 	confirmButtonText: '确定',
					// 	callback: action => {
					// 		// this.$message({
					// 		// 	type: 'info',
					// 		// 	message: `action: ${ action }`
					// 		// });
					// 	}
					// });
					Dialog.alert({
					  title: '提示',
					  message: '跳转回考试试卷页面',
					}).then(() => {
					   this.$router.push('mobile_examination_manage')
					});
					// 清除计时器
					clearInterval(this.timer)
					// 清除时间cookic
					clearCookie('examTime')
					localStorage.removeItem('topic')
					ResidueTime = '00:00:00'

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
			clearInterval(this.timer)
			// 清除时间cookic
			this.clearCookie('examTime')
			localStorage.removeItem('topic')
			// this.ResidueTime = '00:00:00'
			// ---查询试卷---
			apiCommonExamSelectById(this.examId).then(res => {
				this.examTitle = res.data.data.title
				this.examParticular = res.data.data.examExplain
				// this.affix=res.data.data.affix
			})
			studentTestQuestionsFinish(this.examId,localStorage.getItem('userID')).then(res=>{
				console.log(res)
			})
			Toast('考试完成5秒后自动跳转');
			this.timer = setInterval(x => {
				this.ResidueTime = this.getResidueTime()
			}, 5000)
		},
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
// 修改element 自带样式
<style scoped="">
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}

/* 	.box {
		padding-bottom: 52px !important;
	} */
</style>
