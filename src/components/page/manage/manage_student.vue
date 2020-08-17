<template>
	<div class="box">
		<div class="group">
			<div class="row-group">
				<div class="th-group">分发状态</div>
				<div class="td-group" change>
					<el-checkbox-group v-model="array_nav" @change="getValue()">
						<el-checkbox-button v-for="(d,i) in tag" :label="d" :key="d.i">{{d}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">年份</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_2" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">教材版本</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_3" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">学习科目</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_4" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">学习年级</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_5" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">单元测试</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_6" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="row-group" style="margin-top: 20px;">
				<div class="th-group">试卷用途</div>
				<div class="td-group">
					<el-checkbox-group v-model="array_nav_7" @change="getValue()">
						<el-checkbox-button v-for="city2 in cities2" :label="city2" :key="city2">{{city2}}</el-checkbox-button>
					</el-checkbox-group>
				</div>
			</div>
			<div class="search">
				<el-input placeholder="请输入内容" v-model="search">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				 <el-button type="primary" @click="" class="buttom" >搜索</el-button>
			</div>
		</div>
		
		<div class="particular">
			<div class="li">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">古得教师</div>
				<div class="title-box">
					<div class="title">2019年人教版一年级第一单元作业5656565656</div>
					<div class="synopsis">包含小学一年级语文2019年人教版单元作业65656566555555</div>
				</div>
				<div class="time">2020年10月11日上传</div>
				<div class="label-box">
					<div class="label">2019</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<i class="icon el-icon-check hover"></i>
					<div class="status hover">分发完成</div>
					<el-button type="text" class="download hover" @click="dialogVisible = true">立即下载</el-button>
				</div>
			</div>
			<div class="li">
				<img src="../../../assets/img/img.jpg" class="user-img" />
				<div class="teacher-name">古得教师</div>
				<div class="title-box">
					<div class="title">2019年人教版一年级第一单元作业5656565656</div>
					<div class="synopsis">包含小学一年级语文2019年人教版单元作业65656566555555</div>
				</div>
				<div class="time">2020年10月11日上传</div>
				<div class="label-box">
					<div class="label">2019</div>
					<div class="label">人教版</div>
					<div class="label">语文</div>
					<div class="label">一年级</div>
				</div>
				<div class="right">
					<i class="icon el-icon-time"></i>
					<div class="status">正在分发</div>
					<el-button type="text" class="download" @click="dialogVisible = true">立即下载</el-button>
				</div>
			</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="100" :total="1000">
				</el-pagination>
			</div>
		</div>
		<el-button type="text"  @click="dialogVisible = true" >点击打开 Dialog</el-button>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
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
		import {selectTag} from '@/api/api.js'
	export default {
		data() {
			return {
				tag:['全部'],
				tag2:['全部'],
				tag3:['全部'],
				tag4:['全部'],
				tag5:['全部'],
				tag6:['全部'],
				tag7:['全部'],
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
			      }
			,
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
		mounted() {
          selectTag().then(res=>{
			 let tag=res.data.data;
			 this.tag=this.tag.push(tag['8']['text'])
			 console.log(tag['8'][0]['text'])
			 this.tag
		  })
		}
		
	};
</script>

<style scoped src="../../../assets/css/manage.css">
</style>
