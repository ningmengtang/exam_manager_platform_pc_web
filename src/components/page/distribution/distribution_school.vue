<template>
	<div class="box">
		<!-- 管理 -->
		<div class="particular">
			<div class="li" v-for="(data, i) in papers" :key="data.i">
				<!-- <img src="../../../assets/img/img.jpg" class="user-img" /> -->
				<div class="teacher-name">{{ data.teacher }}</div>
				<div class="title-box">
					<div class="title">{{ data.title }}</div>
					<div class="synopsis">{{data.examExplain}}</div>
				</div>
				<div class="time">{{ data.createDate }}</div>
				<div class="label-box">
					<div class="label" v-for="i in data.tag_list">{{i.text}}</div>
				</div>
				<div class="right">
			
					<span   style="display: contents;">
						<el-button type="text" class="download hover"  @click="distribution(data.id)" >立即分发</el-button>
					</span>
				</div>
				</div>
			<div class="page">
				<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page.sync="currentPage" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 提示框 -->
		<!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
		<!-- Table -->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<div class="ts-select">
				<!-- <div class="arr"><span>您已经选择：</span><span>{{array_nav4}}</span></div> -->
				<div class="student-box">
                    <el-table
                        :data="tableData"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="学号"
                            prop="code"
                            >
                        </el-table-column>
                        <el-table-column
                            label="学生名称"
                            prop="name"
                            >
                        </el-table-column>
                        <el-table-column
                            label="性别"
                            prop="sex"
                            >
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-button type="primary" @click="onSubmit">立即分发</el-button>
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                    </div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import user from '../../common/user';
	// import {handleSizeChange,handleCurrentChange,handleClose,TagTypePromise} from '@/assets/js/manage.js'
	import {
        selectBySchoolIdAndPaperIdAndClassId,
        selectSchoolTag
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '',
				checkAll: false,
				isIndeterminate: true,
				array_nav: [], //存储el-chckbox数组
				array_nav2: [], //存储el-chckbox数组
				array_nav3: [],
				array_nav4: [],
				array_nav5: [],
				pageNum:1,
				pageSize:8,
				search: '',
				value1: '',
				disStatus:[],
				DisStatusList:[],
				total:0,
				studentPageNum:0,
				studentPageSize:0,
				studentTotal:0,
				userID:localStorage.getItem('userID'),
				multipleSelection: [],
				currentPage: 1,
				dialogVisible: false,
				cities: ['全部', '分发完成', '正在分发', '分发失败'],
				class2: ['全部', '一年级', '二年级', '三年级'],
				class1: ['全部', '一班', '二班', '三班'],
				student: [1, 2, 3, 4, 5],
				checkboxGroup2: ['上海'],
				papers:'',
				li: [{
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
					}
                ],
                testPaperId:'',
                tableData:[],
				dialogTableVisible: false,
				dialogFormVisible: false,
			};
		},
		methods: {
			//获取选择标签的内容
			getValue() {
				this.array_nav4 = this.array_nav2.concat(this.array_nav3)
				console.log(this.array_nav4);
			},
			searchO() {

            },
            handleSelectionChange(val){
                this.papaerType = val
            },
            // 分配试卷
            distribution(id){
                this.dialogTableVisible = true
                selectBySchoolIdAndPaperIdAndClassId(1,99,id).then(res=>{
                    this.tableData = res.data.data.list
                })
                this.testPaperId = id
            },
            onSubmit(){
				console.log(this.papaerType)
                this.dialogTableVisible = false
				let  createTestPaperInfoObj = {
					 	testPaperId:this.testPaperId,
					    students:[]
					}
				for(var i=0;i<this.papaerType.length;i++){
					createTestPaperInfoObj.students.push({
						"uid":this.papaerType[i].id,
						"utype":"student",
						"items":[]
					})
				}
				this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
                
            },
			handleSizeChange(val) {
				this.pageSize = val;
				selectSchoolTag({
					"id":[],
					"pageSize": this.pageSize,
					"pageNum": this.pageNum
				}).then(res => {
					console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				selectSchoolTag({
					"id":[],
					"pageNum": this.pageNum,
					"pageSize": this.pageSize
				}).then(res => {
					// console.log(res)
					this.papers = res.data.data.list
					this.total = res.data.data.total
					this.currentPage = res.data.data.pageNum
				})
			},
			// toggleSelection(rows) {
			// 	if (rows) {
			// 		rows.forEach(row => {
			// 			this.$refs.multipleTable.toggleRowSelection(row);
			// 		});
			// 	} else {
			// 		this.$refs.multipleTable.clearSelection();
			// 	}
			// },
			// handleSelectionChange(val) {
			// 	this.multipleSelection = val;
			// 	console.log(val)
			// },
			// toggleSelection(rows) {
			// 	if (rows) {
			// 		rows.forEach(row => {
			// 			this.$refs.multipleTable.toggleRowSelection(row);
			// 		});
			// 	} else {
			// 		this.$refs.multipleTable.clearSelection();
			// 	}
			// },
			// submit() {
			// 	//关闭窗口
			// 	this.dialogTableVisible = false;
			// },
			
		},
		mounted() {
			this.color = user().color;
			//标签查询
			this.TagTypeList = []
			//试卷
            selectSchoolTag({
                "pageSize":this.pageSize,
                "pageNum":this.pageNum,
                "id":[]
            }).then(res=>{
                // console.log(res.data.data)
                this.papers=res.data.data.list
                this.total=res.data.data.total
                this.currentPage = res.data.data.pageNum
            })
		}
	};
</script>

<style scoped src="../../../assets/css/distribution.css"></style>
