<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 排版管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="primary" style="float:right;margin: 8px;" @click="handeleAdd">添加排班</el-button>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                v-loading="listLoading"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column  label="上午上班时间">
                    <template slot-scope="scope">
                        {{scope.row.startTime_am}} - {{scope.row.endTime_am}}
                    </template>
                </el-table-column>
                <el-table-column  label="下午上班时间">
                    <template slot-scope="scope">
                        {{scope.row.startTime_pm}} - {{scope.row.endTime_pm}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="formStatus(scope.$index, scope.row)"
                        >点击查看排班</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout=" prev, pager, next , total"
                    :total="total">
                </el-pagination>
            </div>
            <el-dialog title="设置打卡时间" :visible.sync="dialogFormVisibleTime">
                <el-form :model="setTimeWork">
                    <el-form-item label="早上开始时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            value-format="HH:mm:ss"
                            v-model="setTimeWork.startTime_am"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="早上结束时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="setTimeWork.endTime_am"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="下午开始时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="setTimeWork.startTime_pm"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="下午结束时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="setTimeWork.endTime_pm"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="选择上班日期：" :label-width="formLabelWidth">
                        <el-checkbox label="星期一" v-model="setTimeWork.monday"></el-checkbox>
                        <el-checkbox label="星期二" v-model="setTimeWork.tuesday"></el-checkbox>
                        <el-checkbox label="星期三" v-model="setTimeWork.wednesday"></el-checkbox>
                        <el-checkbox label="星期四" v-model="setTimeWork.thursday"></el-checkbox>
                        <el-checkbox label="星期五" v-model="setTimeWork.friday"></el-checkbox>
                        <el-checkbox label="星期六" v-model="setTimeWork.saturday"></el-checkbox>
                        <el-checkbox label="星期日" v-model="setTimeWork.sunday"></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleTime = false">取 消</el-button>
                    <el-button type="primary" @click="pushSettime">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 编辑排班 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisibleUpdate">
                 <el-form :model="update">
                    <el-form-item label="早上开始时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            value-format="HH:mm:ss"
                            v-model="update.startTime_am"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="早上结束时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="update.endTime_am"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="下午开始时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="update.startTime_pm"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="下午结束时间：" :label-width="formLabelWidth">
                        <el-time-picker
                            v-model="update.endTime_pm"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="选择上班日期：" :label-width="formLabelWidth">
                        <el-checkbox label="星期一" v-model="update.monday"></el-checkbox>
                        <el-checkbox label="星期二" v-model="update.tuesday"></el-checkbox>
                        <el-checkbox label="星期三" v-model="update.wednesday"></el-checkbox>
                        <el-checkbox label="星期四" v-model="update.thursday"></el-checkbox>
                        <el-checkbox label="星期五" v-model="update.friday"></el-checkbox>
                        <el-checkbox label="星期六" v-model="update.saturday"></el-checkbox>
                        <el-checkbox label="星期日" v-model="update.sunday"></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
                    <el-button type="primary" @click="pushSettimeUpdate">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="排班人员" :visible.sync="dialogFormVisibleUser" >
                <el-button type="primary" style="float:right;margin: 8px;" @click="handeleAddUser">添加排班人员</el-button>
                <el-table
                    :data="userData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    v-loading="Loading"
                >
                    <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="用户名"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column  label="角色">
                        <template slot-scope="scope">
                        <span v-if="scope.row.userRole">
                            {{scope.row.userRole.roleName}}
                        </span> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="post" label="职位"></el-table-column>
                    <el-table-column prop="department_name" label="所属部门"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDeleteUser(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="currentPage1"
                        :page-size="pageSize1"
                        layout=" prev, pager, next , total"
                        :total="total1">
                    </el-pagination>
                </div>

                <el-dialog
                    width="50%"
                    title="选择排班人员"
                    :visible.sync="innerVisible"
                    v-loading ="innerVisibleLoading"
                    append-to-body>
                    <el-form>
                        <el-form-item label="选择排班人员">
                            <el-select v-model="selectUserName" placeholder="请选择">
                                <el-option
                                    v-for="item in addUserList"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addpush">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 添加排班人员 -->



            </el-dialog>
        </div>
    </div>
</template>
<script>
import {adminAttendanceTimeList,adminAttendanceTimeInsert,adminUserAccountList,adminUserAccountUpdate,adminAttendanceTimeUpdate} from "@/api/api.js"
export default {
    data(){
        return{
            currentPage: 1,
            total: 0,
            page: 1,
            pageSize: 8,
            pageNum:1,
            currentPage1: 1,
            total1: 0,
            page1: 1,
            pageSize1: 8,
            pageNum1:1,
            tableData:[],
            listLoading:false,
            Loading:false,
            dialogFormVisibleTime:false,
            innerVisibleLoading:false,
            dialogFormVisibleUpdate:false,
            innerVisible:false,
            formLabelWidth:"120px",
            userData:[],
            personnelData:[],
            addUserList:[],
            dialogFormVisibleUser:false,
            addUserName:'',
            selectUserName:'',
            update:{},
            setTimeWork:{
                startTime_am:'',
                startTime_pm:'',
                endTime_am:'',
                endTime_pm:'',
                monday:false,
                tuesday:false,
                wednesday:false,
                thursday:false,
                friday:false,
                saturday:false,
                sunday:false
            }
        }
    },
    methods:{
        init(){
            this.listLoading = true
            adminAttendanceTimeList({
                "pageNum":this.pageNum,
                "pageSize":this.pageSize
            }).then(res=>{
                this.listLoading = false
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
            this.pageNum = val;
            this.init()
        },
        //改变时
        handleSizeChange1(val) {
            this.pageSize1 = val;
            this.Loading = true
            adminUserAccountList({
                "attendance_time_id": this.RowId,
                "status":3,
                "pageNum":this.pageNum1,
                "pageSize":this.pageSize1
            }).then(res=>{
                this.Loading = false
                this.userData = res.data.data.list
                this.total1 = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
            })
        },
        //条目改变时
        handleCurrentChange(val) {
            this.pageNum1 = val;
            this.Loading = true
            adminUserAccountList({
                "attendance_time_id": this.RowId,
                "status":3,
                "pageNum":this.pageNum1,
                "pageSize":this.pageSize1
            }).then(res=>{
                this.Loading = false
                this.userData = res.data.data.list
                this.total1 = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
            })
        },
        formStatus(index,row){
            this.RowId = row.id
            this.dialogFormVisibleUser = true
            this.Loading = true
            adminUserAccountList({
                "attendance_time_id": row.id,
                "status":3,
                "pageNum":this.pageNum1,
                "pageSize":this.pageSize1
            }).then(res=>{
                this.Loading = false
                this.userData = res.data.data.list
                this.total1 = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
            })
        },
        handleEdit(index,row){
            this.update = row
            this.dialogFormVisibleUpdate = true
            console.log(this.update)
            console.log(row)
        },
        pushSettimeUpdate(){
            adminAttendanceTimeUpdate(this.update).then(res=>{
                console.log(res)
                if(res.data.result){
                    this.$message.success('修改成功')
                    this.dialogFormVisibleUpdate = false
                    this.init()

                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        // 新增人员排班
        handeleAddUser(){
            this.addUserList = []
            this.innerVisible = true
            this.innerVisibleLoading = true
            // console.log(this.userData)
            adminUserAccountList({
                "status":3,
                "pageNum":1,
                "pageSize":9999
            }).then(res=>{
                 this.innerVisibleLoading = false
                //  console.log(res)
                if(res.data.data.list){
                    let list = res.data.data.list
                    for(var i=0;i<list.length;i++){
                        var obj = list[i]
                        var objid = obj.id
                        
                        var flag = false
                        for(var j=0;j<this.userData.length;j++){
                            var obj1 = this.userData[j]
                            var objuser_id = obj1.id
                            if(objuser_id == objid){
                                flag =true
                                break;
                            }
                        }
                        if(!flag){
                            this.addUserList.push(obj)
                        }
                    }
                    // console.log(this.addUserList)
                }else{
                    this.addUserList = []
                }
                
            })
        },
        addpush(){
            adminUserAccountUpdate({
                "id":this.selectUserName,
                "attendance_time_id":this.RowId
            }).then(res=>{
                if(res.data.result){
                    this.$message.success('新增成功')
                    this.innerVisible = false
                    this.Loading = true
                    adminUserAccountList({
                        "attendance_time_id": this.RowId,
                        "status":3,
                        "pageNum":this.pageNum1,
                        "pageSize":this.pageSize1
                    }).then(res=>{
                        this.Loading = false
                        this.userData = res.data.data.list
                        this.total1 = res.data.data.total
                        this.currentPage1 = res.data.data.pageNum
                    })
                }else{
                    this.$message.error(res.data.message)
                }
                
            })
        },
        // 删除排班人员
        handleDeleteUser(index,row){
            this.$confirm('此操作将删除该人员排班, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // this.userData.attendance_time_id = 0
                adminUserAccountUpdate({
                    "id":row.id,
                    "attendance_time_id":0
                }).then(res=>{
                    if(res.data.result){
                    adminUserAccountList({
                        "attendance_time_id": this.RowId,
                        "status":3,
                        "pageNum":this.pageNum1,
                        "pageSize":this.pageSize1
                    }).then(res=>{
                        this.Loading = false
                        this.userData = res.data.data.list
                        this.total1 = res.data.data.total
                        this.currentPage1 = res.data.data.pageNum
                    })
                    }else{

                    }
                   
                })
            }).catch(() => {

            });
           
        },
        handeleAdd(){
            this.dialogFormVisibleTime = true
        },
       
        pushSettime(){
            // console.log(this.setTimeWork)
            adminAttendanceTimeInsert(this.setTimeWork).then(res=>{
                if(res.data.result){
                    this.init()
                    this.$message.success('新增成功')
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    created(){
        this.init()
    }
}
</script>