<template>
    <div class="feebackbox">

    <div class="box">
        <el-table
            :data="tableData"
            class="tableData"
            >
            <el-table-column
                type="index"
                label="序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
            >
            </el-table-column>
            <el-table-column
                prop="schoolName"
                label="学校"
            >
            </el-table-column>
            <el-table-column
                prop="examinationPaper.title"
                label="考试">
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="openList(scope.$index, scope.row)">查询详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        

    </div>
        <div class="page">
			<el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page.sync="currentPage" :page-size="pageSize" :total="total">
			</el-pagination>
		</div>
    </div>
</template>
<script>
import {
    teacherTestSelectTaskforStudent
	} from '@/api/api.js'
export default {
    data(){
        return{
            tableData:[],
            paper_id:'',
            task_id:'',
            paper_id:'',
            importPaper:'',
            pageNum:1,
			pageSize:10,
			total:0,
			currentPage:1,
        }
    },
    methods:{
        // 查看详情
        openList(index,row){
            console.log(row)
            this.$router.push({name:'webcats_teacher_feebacklist',query:{studenId:row.id}})
            
            // this.
        },
        handleSizeChange(val) {
			this.pageSize = val
			teacherTestSelectTaskforStudent({
                "pageNum": this.pageNum,
                "pageSize": this.pageSize,
                "task_id": this.task_id
            }).then(res=>{
                this.tableData = res.data.data.list
                this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
            })
        },
        handleCurrentChange(val) {
							
			this.pageNum = val;
			teacherTestSelectTaskforStudent({
                "pageNum": this.pageNum,
                "pageSize": this.pageSize,
                "task_id": this.task_id
            }).then(res=>{
                this.tableData = res.data.data.list
                this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
            })
		},
        
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
            this.paper_id = this.importPaper.paper_id
            this.task_id = this.importPaper.id


            teacherTestSelectTaskforStudent({
                "pageNum": this.pageNum,
                "pageSize": this.pageSize,
                "task_id": this.task_id
            }).then(res=>{
                console.log(res)
                this.tableData = res.data.data.list
                this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
            })

        }else{
            this.$message.warning('无试卷数据')
        }
    }
}
</script>
<style  scoped src="../../../assets/css/teacher_feeback.css">

</style>