<template>
    <div style="padding: 24px 38px;">
        <div class="container">
            <el-select v-model="examineStatus" placeholder="请选择"  @change="changeStatus" style="margin:10px">
                <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
            <el-table
                v-loading="loading"
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
                        <el-button
                            v-if="scope.row.putInto == 2"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >入库成功</el-button>
                        <el-button
                            v-if="scope.row.putInto == 2"
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >入库失败</el-button>
                        <el-button
                            v-if="scope.row.putInto == 1"
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >取消入库</el-button>
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
    apiCommonExamSelectUpdate,
    apicommonExamGetFile
} from '@/api/api.js'
export default {
    data(){
        return{
            tableData:[],
            currentPage:1,
            pageSize:10,
            pageNum:1,
            total:0,
            loading:false,
            examineStatus:'',
            options:[{
                id:0,
                label:'入库失败'
            },
            {
                id:1,
                label:'入库成功'
            },
            {
                id:2,
                label:'正在入库'
            }]
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.loading = true
            apiCommonExamSelectList({
                "operator_type":'user',
                "pageSize":this.pageSize,
                "putInto":this.examineStatus,
                "pageNum":this.pageNum
            }).then(res=>{
                this.loading = false
                this.tableData = res.data.data.list
                this.total = res.data.data.total
                this.currentPage = res.data.data.pageNum
            })
        },
        changeStatus(){
            this.init()
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
        // 入库成功
        handleEdit(index,row){
            this.$confirm('是否入库成功?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                apiCommonExamSelectUpdate({
                    "putInto":1,
                    "id":row.id
                }).then(res=>{
                    if(res.data.result){
                        this.$message.success('操作成功')
                        this.init()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    
                })
            }).catch(() => {

            });
        },
        // 入库失败
        handleDelete(index,row){
            this.$confirm('是否取消入库?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                apiCommonExamSelectUpdate({
                    "putInto":0,
                    "id":row.id
                }).then(res=>{
                    if(res.data.result){
                        this.$message.success('操作成功')
                        this.init()
                    }else{
                        this.$message.error(res.data.message)
                    }
                   
                })
            }).catch(() => {

            });
        },
        // 预览试卷
        openFile(index,row){
            if(row.affix){
				apicommonExamGetFile(row.id).then(res=>{
					// console.log(res)
					var headers = res.headers['content-disposition']
					// console.log(headers)
					headers = headers.substring(headers.indexOf('filename=\"')+'filename=\"'.length).split("\"")[0];
					const blob = new Blob([res.data],{type:''})
					let link = document.createElement('a');
					let objectUrl = URL.createObjectURL(blob);
					link.setAttribute("href",objectUrl);
					link.setAttribute("download",headers); 
					link.click();
					//释放内存
					window.URL.revokeObjectURL(link.href)
				})
			}else{

				let  createTestPaperInfoObj = {
			 		testPaperId:row.id,
			        students:[
			          {
			            uid:localStorage.getItem('userID'),
						utype:"admin",
              			items:[],
                        info:{
                            "idCard":localStorage.getItem('userID'),
                            "schoolName":'试卷题库管理员',
                            "name":'试卷题库管理员',
                            "className":'试卷题库管理员'
                        }
			          }
                    ],
                    info:[
                        
                    ]
			      }
				this.$router.push({name :'test_paper_maker_for_task',params:{createTestPaperInfoObj:createTestPaperInfoObj}})
			}
        }
    }
}
</script>
<style >
.red {
    color: #ff0000;
}
</style>