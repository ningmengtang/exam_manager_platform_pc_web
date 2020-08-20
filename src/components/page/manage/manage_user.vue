<template>
	<div class="box">
		<div class="group">
			<div style="display: flex;">
				<div>
					<div class="row-group">
						<div class="th-group">分发状态</div>
						<div class="td-group" change>
							<el-radio-group v-model="disStatus" @change="getQuery">
								<el-radio-button v-for="(item,index) in DisStatusList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">年份</div>
						<div class="td-group">
							<el-radio-group v-model="years" @change="getQuery">
								<el-radio-button v-for="(item,index) in YearsList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">教材版本</div>
						<div class="td-group">
							<el-radio-group v-model="version" @change="getQuery">
								<el-radio-button v-for="(item,index) in VersionList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习科目</div>
						<div class="td-group">
							<el-radio-group v-model="subject" @change="getQuery">
								<el-radio-button v-for="(item,index) in SubjectList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">学习年级</div>
						<div class="td-group">
							<el-radio-group v-model="grade" @change="getQuery">
								<el-radio-button v-for="(item,index) in GradeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">单元测试</div>
						<div class="td-group">
							<el-radio-group v-model="elementTest" @change="getQuery">
								<el-radio-button v-for="(item,index) in ElementTextList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="row-group" style="margin-top: 20px;">
						<div class="th-group">试卷用途</div>
						<div class="td-group">
							<el-radio-group v-model="purpose" @change="getQuery">
								<el-radio-button v-for="(item,index) in PurposeList" :label="item.id">
									{{item.text}}
								</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="search">
						<el-input placeholder="请输入内容" v-model="search"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
						<el-button type="primary" @click="" :style="{ 'background-color': color, 'border-color': color }">搜索</el-button>
					</div>
				</div>
				<div class="right">
					<div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i" @click="goImport">提交试卷</div>
							<div class="card-other-ii">(按模板提交)</div>
						</div>
					</div>
					<div class="right-son">
						<div class="bg-purple">
							<div class="card-other-i o">下载模板</div>
							<div class="card-other-ii">(WORD提交模板)</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="particular">
			<div class="li" v-for="(data,i) in li" :key="data.i">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{ data.synopsis }}</div>
				</div>
				<div class="time">{{ data.time }}</div>
				<div class="label-box">
					<div class="label">{{ data.label }}</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<div class="ii" v-if="data.o == '1'">
						<div style="margin-bottom: 4px;" >
							<i class="icon el-icon-check i"></i>
							<span class="text">入库完成</span>
						</div>
					</div>
					<div class="ii" v-else-if="data.o == '2'">
						<div style="margin-bottom: 4px;cursor: pointer;" >
							<i class="icon el-icon-time i wait"></i>
							<span class="text wait">正在入库</span>
						</div>
					</div>
					<span v-else-if="data.o == '3'" style="display: contents;">
						<el-button type="text" class="download i"  @click="goImport">重新入库</el-button>
						<div class="status i">取消入库</div>
					</span>
					<div class="del">
						<i class="el-icon-delete-solid"></i>
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<div class="page">
				<el-pagination
					background
					layout="prev, pager, next, jumper"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="100"
					:total="1000"
				></el-pagination>
			</div>
		</div>
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
			<div class="ts-box">
				<div class="big-icon  el-icon-success"></div>
				<div class="ii">自行下载试卷完成</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import user from '../../common/user';
export default {
	data() {
		return {
			color: '',
			array_nav: [], //存储el-chckbox数组
			search: '',
			currentPage: 1,
			dialogVisible: false,
			cities: ['全部', '上海', '北京', '广州', '深圳'],
			cities2: ['全部', '1', '2', '3', '4'],
			checkboxGroup2: ['上海'],
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
			]
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
		goSubmit(){
			this.$router.push('manage_user_import')
		},
		goImport(){
			this.$router.push('manage_user_import')
		}
	},
	mounted() {
		this.color = user().color;
	}
};
</script>

<style scoped src="../../../assets/css/manage.css"></style>
<style scoped>
.group {
	background-image: url(../../../assets/img/bg-willow.png);
	background-position: 100% 0%;
}

.right .download {
	background-color: #2bbb61;
}

.status {
	color: #2bbb61;
}

.group /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
	background-color: rgb(43, 187, 97);
	border-color: rgb(43, 187, 97);
}
</style>
