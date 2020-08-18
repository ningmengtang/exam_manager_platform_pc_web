<template>
	<div class="box">
		<div class="flex-box">
			<div class="flex-box-first">
				<div class="top">
					<div class="title">2019年人教版一年级第一单元测验</div>
				</div>
				<div class="appear">
					<div>出题老师：凹凸曼</div>
					<div class="i">2020年10月10日</div>
				</div>
				<div class="label-box">
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
					<div class="label">一年级</div>
				</div>
				<div class="particular">
					包含2019年人教版一年级第一单元测验
				</div>
				<div class="message-top">试卷详情</div>
				<div class="impersonality">
					<div>【 客观题 】</div>
					<div>填空题：8题</div>
					<div>判断题：5题</div>
					<div>单选题：5题</div>
				</div>
				<div class="subjectivity">
					<div>【 主观题 】</div>
					<div>填空题：8题</div>
					<div>判断题：5题</div>
					<div>单选题：5题</div>
				</div>
				<div class="bottom">
					<el-button class="go" @click="black">同意入库</el-button>
					<el-button class="cancel" @click="black">拒绝入库</el-button>
				</div>
			</div>
			<div class="flex-box-second">
				<el-image 
				    style="width: 100%; height: 100%"
				    :src="url" 
				    :preview-src-list="srcList">
				  </el-image>
				  <i class="icon el-icon-zoom-in"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		selectTag
	} from '@/api/api.js'
	export default {
		data() {
			return {
				tag: ['全部'],
				tag2: ['全部'],
				tag3: ['全部'],
				tag4: ['全部'],
				tag5: ['全部'],
				tag6: ['全部'],
				tag7: ['全部'],
				array_nav: [], //存储el-chckbox数组
				array_nav_2: [],
				array_nav_3: [],
				array_nav_4: [],
				array_nav_5: [],
				array_nav_6: [],
				array_nav_7: [],
				search: '',
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '上海上海', '北京', '广州', '深圳'],
				cities2: ['全部', '1', '2', '3', '4'],
				checkboxGroup2: ['上海'],
				 url: require('../../../assets/img/paper.png'),
				  srcList: [
				          require('../../../assets/img/paper.png'),
				           'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				         ]

			};
		},
		methods: {
			getValue() {
				console.log(this.array_nav)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			black(){
				this.$router.push('manage_admin')
			}
		},
		mounted() {
			
		}

	};
</script>

<style scoped src="../../../assets/css/manage.css">
</style>
