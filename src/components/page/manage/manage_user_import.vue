<template>
	<div class="box">
		<div class="left">
			<div class="l-box-1">
				<div class="l-title">标题</div>
				<el-input v-model="form.title" placeholder="请输入内容" maxlength="30" show-word-limit class="ids"></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷说明</div>
				<el-input type="textarea" placeholder="请输入内容" v-model="form.examExplain" maxlength="30" show-word-limit></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷作答时间</div>
				<el-input v-model="form.examTime" :min="1" :max="9999"   type="number" show-word-limit class="ids">
					<template slot="append">
						分钟
					</template>
				</el-input>
			</div>
			
		</div>
		<div class="right">
			<div class="card-box">
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-button class="i">开始组件</el-button>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-button class="i" @click="parperAdd" >确认提交</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="hint">
				<div>温馨提示：</div>
				<span>1.下载word模板正确填写各项题目信息后，在本页面进行上传处理，上传后将提交管理员确认，确认完
				                      毕后会进入试卷库。复杂题目可以图片形式插入word模板文档。
				                      2.图片试卷仅能用于作业、练习，无法接入题库、评价系统等其他功能，建议优先选择按模板提交试卷。</span>
			</div>
		</div>
	</div>
</template>
<script>
import user from '../../common/user';
export default {
	data() {
		return {
			form:{
				title:'',
				examExplain:'',
				examTime:1
			},
			color: '',

		};
	},
	methods: {
		getValue() {
			console.log(this.array_nav);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		// 确认提交
		parperAdd(){

		}
	},
	mounted() {
		this.color = user().color;
	}
};
</script>

<style scoped src="../../../assets/css/manage-import.css"></style>
