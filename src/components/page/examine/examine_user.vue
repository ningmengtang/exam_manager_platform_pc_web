<template>
    <div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="createDate" label="创建时间" ></el-table-column>
                <el-table-column prop="operator_name" label="专家名"></el-table-column>
                <el-table-column prop="title" label="试卷名称"></el-table-column>
                <el-table-column prop="examExplain" label="试卷说明"></el-table-column>
                <el-table-column label="试卷状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.putInto===1?'success':(scope.row.putInto===0?' danger ':'warning')"
                        >{{scope.row.putInto ===0?'入库失败':scope.row.putInto ===1?'入库成功':scope.row.putInto ===2?'正在入库':''}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-folder-checked"
                            @click="openFile(scope.$index, scope.row)"
                        >预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page" style="margin:10px">
                <el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    apiCommonExamSelectList,
    apiCommonExamSelectUpdate
} from '@/api/api.js'
export default {
    data(){
        return{
            tableData:[],
            currentPage:1,
            pageSize:6,
            pageNum:1,
            total:0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            apiCommonExamSelectList({
                "operator_type":'user',
                "operator_Id":Number(localStorage.getItem('userID')),
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
            }).then(res=>{
                console.log(res)
                this.tableData = res.data.data.list
                this.total = res.data.data.total
                this.currentPage = res.data.data.pageNum
            })
        },
        //改变时
        handleSizeChange(val) {
            this.pageSize = val;

            this.init()
        },
        //条目改变时
        handleCurrentChange(val) {
            this.pageNum = val
            // console.log(val)
            this.init()
        },
        // 预览试卷
        openFile(index,row){
            let  createTestPaperInfoObj = {
                 testPaperId:row.id,
                    students:[
                         {
                           suid:localStorage.getItem('userID')
                         }
                       ]
            }
            this.$router.push({name :'test_paper_maker',query:{createTestPaperInfoObj:createTestPaperInfoObj}})
        }
    }
}
</script>
<style >
.red {
    color: #ff0000;
}
</style>