<template>
	<div class="box">
		<div class="up-box">
			<el-upload v-loading="loading" class="upload-demo" action="" :http-request="uploadFild"  accept="image/*,video/*" capture="camera" :before-upload="beforeUpload"
			 :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
				<el-button size="small" type="primary" class="button">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
			</el-upload>


		</div>
		<!-- <Tabbar /> -->
	</div>
</template>

<script>
	import Tabbar from '../common/tabbar.vue'
	import mobile from '@/assets/js/mobile.js'
	import {
		Dialog,
		Toast
	} from 'vant'
	import {
		studentTestQuestionsImg,
		studentTestQuestionsAnswerSheet,
		studentTestQuestionsWebsocktImg
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
				uploadType: this.$route.query.type,
				fileList: [],
				total: 0,
				pageSize: 9,
				pageNum: 1,
				currentPage: 1,
				download: 0,
				disabled: 0,
				loading: false,
				status: '',
				examId: '',
				examTitle: '',
				examParticular: '',
				getData: this.$route.query,
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
				blackData: ''
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
				if (this.uploadType == 'none') {
					if (this.getData.websocket_sn == undefined) {
						Dialog.alert({
							message: '请重新扫描二维码',
						}).then(() => {
								this.$router.push({
									name: '404',	
									query: {
										id: this.examId
									}
								})
						});
						
					}
					studentTestQuestionsWebsocktImg(this.getData.answer_id, this.getData.websocket_sn, this.uploadFile).then(res => {
						Toast.success('图片上传成功,上传完全部答题卡请关闭改页面');
						this.loading = false
						setTimeout(x=>{
							this.$router.push({
								name: '404',	
								query: {
									id: this.examId
								}
							})
						},1000)
					})
				} else if (this.uploadType == 'has') {
					studentTestQuestionsAnswerSheet(5000, this.getData.paper_id, this.uploadFile).then(res => {

						Toast.success('图片上传成功,上传完答案请关闭该页面');
						this.loading = false
						console.log(res)
						for (let x in res.data.data) {
							this.blackData = res.data.data[x]
						}
						// Dialog.alert({
						//   message: JSON.stringify(this.blackData),
						// }).then(() => {
						//   // on close
						// });
						if (res.data.hasOwnProperty('data')) {
							Dialog.alert({
								message: JSON.stringify(this.blackData),
							}).then(() => {
								// on close
							});
						} else {
							Dialog.alert({
								message: res.data.message,
							}).then(() => {
								// on close
							});

						}
					})
				}
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
			// 上传成功
			successUpload(res) {
				console.log(res)
				Toast.success('图片上传成功');
			},
			format(percentage) {
				if (percentage == 100) {
					this.customColor = '#5cb87a'
				} else {
					this.customColor = '#409eff'
				}
				return percentage === 100 ? '已完成' : `${percentage}%`;
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
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		},
		mounted() {}
	};
</script>

<style scoped src="../../../../assets/css/examination-other-mobile.css"></style>
// 修改element 自带样式
<style>
	.el-pagination button:disabled {
		background-color: #f5f5f5;
	}

	.el-pager li.active {
		background-color: #f5f5f5;
	}

	.box {
		padding-bottom: 52px !important;
	}
</style>
