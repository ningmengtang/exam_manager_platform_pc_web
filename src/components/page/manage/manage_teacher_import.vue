<template>
	<div class="box">
		<div class="left">
			<div class="l-box-1">
				<div class="l-title">标题</div>
				<el-input v-model="title" placeholder="请输入内容" maxlength="30" show-word-limit class="ids"></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">试卷说明</div>
				<el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit></el-input>
			</div>
			<div class="l-box-1">
				<div class="l-title">请选择试卷用途</div>
				<el-select v-model="select" placeholder="请选择" class="ids">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<div class="l-box-2">
				<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到此处，或
						<em>点击上传</em>
					</div>
				</el-upload>
			</div>
		</div>
		<div class="right">
			<div class="group">
				<el-table
				      :data="tableData"
				      style="width: 100%">
				      <el-table-column
				        prop="date"
				        label="学号"
				        width="180">
				      </el-table-column>
				      <el-table-column
				        prop="name"
				        label="姓名"
				        width="180">
						<template slot-scope="scope">
							<div style="display: flex;align-items: center;">
								<img src="../../../assets/img/img.jpg" class="user-img" />
								<div class="student-name">{{ scope.row.name }}</div>
							</div>
						</template>
				      </el-table-column>
				      <el-table-column
				        prop="address"
				        label="年级">
				      </el-table-column>
					  <el-table-column
					    prop="address"
					    label="班级">
					  </el-table-column>
				    </el-table>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="100" :total="1000">
				</el-pagination>
			</div>
			<div class="card-box">
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<div class="i">确认提交试卷</div>
							<div class="ii">(按模板提交)</div>
						</div>
						</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<div class="i" style="background-color: #2BBB61;">下载模板</div>
							<div class="ii">(WORD提交模板)</div>
						</div>
						</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<div class="i" >确认提交</div>
							<div class="ii">(图片试卷)</div>
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
			color: '',
			array_nav: [], //存储el-chckbox数组
			title: '',
			textarea: '',
			select: '',
			currentPage: 1,
			dialogVisible: false,
			cities: ['全部', '上海', '北京', '广州', '深圳'],
			cities2: ['全部', '1', '2', '3', '4'],
			checkboxGroup2: ['上海'],
			options: [
				{
					value: '选项1',
					label: '黄金糕'
				},
				{
					value: '选项2',
					label: '双皮奶'
				},
				{
					value: '选项3',
					label: '蚵仔煎'
				},
				{
					value: '选项4',
					label: '龙须面'
				},
				{
					value: '选项5',
					label: '北京烤鸭'
				}
			],
			li: [
				{
					teacher: '古得老师',
					title: '2019年人教版一年级第一单元作业5656565656',
					synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
					time: '2020年10月11日上传',
					label: '2019',
					o: '1'
				},
				{
					teacher: '古得老师',
					title: '2019年人教版一年级第一单元作业5656565656',
					synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
					time: '2020年10月11日上传',
					label: '2019',
					o: '2'
				},
				{
					teacher: '古得老师',
					title: '2019年人教版一年级第一单元作业5656565656',
					synopsis: '包含小学一年级语文2019年人教版单元作业65656566555555',
					time: '2020年10月11日上传',
					label: '2019',
					o: '3'
				}
			],
			tableData: [{
			            date: '2016-05-02',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄'
			          }, {
			            date: '2016-05-04',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1517 弄'
			          }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1519 弄'
			          }, {
			            date: '2016-05-03',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1516 弄'
			          }]
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
		}
	},
	mounted() {
		this.color = user().color;
	}
};
</script>

<style scoped src="../../../assets/css/manage-import.css"></style>
