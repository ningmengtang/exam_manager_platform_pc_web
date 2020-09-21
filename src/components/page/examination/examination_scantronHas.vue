<template>
	<div class="box">
		<div class="big-box"  >
			<div class="header-top" style="border-bottom: 2px solid #EEEEEE;">
				<div class="time">
					<div>距离考试结束还有</div>
					<div class="ts-time">{{ResidueTime}}</div>
				</div>
				<div class="message-top" style="margin-top: 10px;margin-bottom: 16px;">
					<div class="i1">{{examTitle}}</div>
					<div class="i2">{{examParticular}}</div>
				</div>
			</div>
			<div class="ts">
				<div>1.下载答题卡</div>
				<el-button class="button" @click='downloadFile()'>
					<i class="icon el-icon-download"></i>下载
				</el-button>

			</div>
			<div class="ts">
				<div>2.作答完毕后拍照上传答案</div>
				<div class='ts-i'><i class="icon el-icon-info"></i>一次上传一面，多面就上传多次</div>
				<div class="other-box">
					<div class="ewm">
						<vue-qr :text="qrHost" :margin="0" colorDark="#000000" colorLight="#fff"  :size="160"></vue-qr>
						<div class="l">扫码快速上传</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import mobile from '@/assets/js/mobile.js'
	import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
	import VueQr from 'vue-qr'
	import qrHost from '@/api/qrCode.js'
	import {
		studentIndex,
		apicommonExamGetFile,
		apiStudentAccountSelectById,
		apiCommonExamSelectById,
		apiCommonExamSeleElementTestById,
		StudentAccountInfo
	} from '@/api/api.js'
	export default {
		components: {
			ElImageViewer,
			VueQr,
		},
		data() {
			return {
				total: 0,
				pageSize: 9,
				pageNum: 1,
				currentPage: 1,
				download: 0,
				disabled: 0,
				qrHost:qrHost(),
				loading: false,
				status: '',
				examId: this.$route.query.id,
				examSn: '',
				examTitle: '',
				examParticular:'',
				bigIndex: 0,
				ResidueTime: '00:00:00',
				timer: '',
				stateType: '',
				topicButton: false,
				topicSum: 0,
				Problemtitle: '',
				ProblemChoice: [],
				ewm: require("../../../assets/img/ewm.png"),
				question_id: '',
				urls: ['0'],
				srcList: ['0'],
				logtype: '',
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
			// 下载答题卡
			downloadFile() {
				StudentAccountInfo({
					"id": localStorage.getItem('userID')
				}).then(res => {
					if (res.data.data.list) {
						let list = res.data.data.list[0]
						let createTestPaperInfoObj = {
							testPaperId: this.examId,
							students: [{
								uid: localStorage.getItem('userID'),
								utype: "student",
								items: [],
								info: {
									"idCard": list.idCard,
									"schoolName": list.schoolName,
									"name": list.name,
									"className": list.classes.name
								}
							}],
						}
						this.$router.push({
							name: 'test_paper_maker_for_task',
							params: {
								createTestPaperInfoObj: createTestPaperInfoObj
							}
						})
					} else {
						this.$message.warning('查询不到用户信息')
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
		},
		mounted() {
			this.loading = true,

				// ---查询试卷---
				apiCommonExamSelectById(this.examId).then(res => {
					this.examTitle = res.data.data.title
					this.examParticular = res.data.data.examExplain
					this.examSn = res.data.data.sn
				})
				// 生成二维码
	          this.qrHost=`${qrHost()}mobile_examination_upfile?paper_id=${this.examId}&type=has`
			  console.log(this.qrHost)
			
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
