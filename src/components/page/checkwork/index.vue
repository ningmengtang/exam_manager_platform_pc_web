<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 考勤管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary"  style="display: block;margin-bottom: 20px;" @click="getExcel">导出Excel</el-button>
            <el-date-picker
                style="margin-bottom:20px"
                value-format="yyyy-MM-dd"
                v-model="getTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                />
            <el-select   v-model="userName" clearable  placeholder="请选择用户">
                <el-option
                    v-for="item in userList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <label style="padding-left:10px;" clearable>上班状态：</label>
                <el-select   v-model="toWorkState" placeholder="请选择">
                    <el-option
                        v-for="item in towork"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            <label  style="padding-left:10px;" clearable>下班状态：</label>
                <el-select  v-model="offWorkState" placeholder="请选择">
                    <el-option
                        v-for="item in towork"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            <el-button type="primary" @click="ResetDate" >重置</el-button>
            <el-button type="primary" @click="confirmDate" >查询</el-button>
            <!-- <el-button type="primary" @click="settingTime" style="float:right">设置打卡时间</el-button> -->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                v-loading="listLoading"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="attendance_date" label="日期" ></el-table-column>
                <el-table-column prop="attendance_user_name" label="姓名"></el-table-column>
                <el-table-column prop="attendance_msg_am" label="上班状态"></el-table-column>
                <el-table-column prop="attendance_time_am_1" label="上班打卡时间"></el-table-column>
                <el-table-column prop="attendance_msg_pm" label="下班状态"></el-table-column>
                <el-table-column prop="attendance_time_pm_2" label="下班打卡时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
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
                    :current-page="currentPage1"
                    :page-size="pageSize"
                    layout=" prev, pager, next , total"
                    :total="total">
                </el-pagination>
            </div>
        </div>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="上班状态：" :label-width="formLabelWidth">
                <el-select  v-model="form.toWorkState" placeholder="请选择">
                    <el-option
                        v-for="item in towork"
                         :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="下班状态：" :label-width="formLabelWidth">
                <el-select   v-model="form.offWorkState" placeholder="请选择">
                    <el-option
                        v-for="item in towork"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上班打卡时间：" :label-width="formLabelWidth">
                <el-time-picker
                    value-format="HH:mm:ss"
                    v-model="form.toWorkTime"
                    placeholder="选择时间">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="下班打卡时间：" :label-width="formLabelWidth">
                <el-time-picker
                    v-model="form.offWorkTime"
                    value-format="HH:mm:ss"
                    placeholder="选择时间">
                </el-time-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="pushEntry">确 定</el-button>
        </div>
    </el-dialog>

    </div>
</template>
<script>
import {adminAttendanceList,adminUserAccountList,adminAttendanceUpdate} from "@/api/api.js"
export default {
    data(){
        return{
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            dialogFormVisible:false,
            getTime:'',
            toWorkState:'',
            toWorkState1:'',
            offWorkState:'',
            offWorkState1:'',
            userName:null,
            userList:[],
            towork:[
            {
                value:1,
                label:'正常'
            },
            {
                value:2,
                label:'迟到'
            },
            {
                value:3,
                label:'早退'
            },
            {
                value:4,
                label:'缺勤'
            },
            {
                value:5,
                label:'加班'
            },
            {
                value:6,
                label:'外勤'
            },
            {
                value:7,
                label:'补卡'
            },
            {
                value:8,
                label:'请假'
            },
             {
                value:9,
                label:'出差'
            }
            ],
            form:{
                toWorkState:'',
                toWorkStateVal:'',
                toWorkTime:'',
                offWorkState:'',
                offWorkStateVal:'',
                offWorkTime:'',
                use_id:'',
                use_sn:'',
                use_name:'',
                id:'',
                sn:''
            },
            formLabelWidth:"120px",
            currentPage1: 1,
            total: 0,
            page: 1,
            pageSize: 8,
            pageNum:1,
            tableData:[],
            listLoading:false,
        }
    },
    methods:{
        init(){
            this.listLoading = true
            adminAttendanceList({
                "pageNum":this.pageNum,
                "pageSize":this.pageSize
            }).then(res=>{
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
                console.log(res)
            })
        },
        // 改变时
        handleSizeChange(val){
            this.pageSize = val
            this.confirmDate()
        },
        //条目改变时
        handleCurrentChange(val) {
            this.pageNum = val
            this.confirmDate()
        },
        // 条件查询列表
        confirmDate(){
            this.listLoading = true
            if(this.userName == '' || this.userName == undefined){
                this.userName = null
            }
            if(this.getTime !='' && this.toWorkState =='' && this.offWorkState == '' ){
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_date":this.getTime,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime !='' && this.toWorkState!='' && this.offWorkState== '' ){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_date":this.getTime,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime !='' && this.offWorkState !='' && this.toWorkState == ''){
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_date":this.getTime,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime !='' && this.offWorkState !='' && this.toWorkState != ''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_date":this.getTime,

                    "attendance_msg_am":this.toWorkState1,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime =='' && this.offWorkState =='' && this.toWorkState == ''){
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime == '' &&this.offWorkState !=''&& this.toWorkState !=''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime == '' &&this.offWorkState ==''&& this.toWorkState!=''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }else if(this.getTime == '' && this.offWorkState !=''&& this.toWorkState ==''){
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                // console.log(res.data)
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
            }
        },
        // 重置
        ResetDate(){
            this.toWorkState1 = ''
            this.offWorkState1 = ''
            this.toWorkState = ''
            this.offWorkState = ''
            this.getTime = ''
            this.userName = null
            this.listLoading = true
            adminAttendanceList({
                "pageNum":this.pageNum,
                "pageSize":this.pageSize
            }).then(res=>{
                this.total = res.data.data.total
                this.currentPage1 = res.data.data.pageNum
                this.tableData = res.data.data.list
                this.listLoading = false
            })
        },
        // 编辑
        handleEdit(index,row){
            console.log(row)
            if(row.status_pm === 0){
                this.form.offWorkState = ''
            }else{
                this.form.offWorkState= row.status_pm
            }
            this.form.toWorkStateVal = row.attendance_msg_am
            this.form.toWorkTime = row.attendance_time_am_1
            this.form.toWorkState = row.status_am

            this.form.offWorkStateVal = row.attendance_msg_pm
            this.form.offWorkTime = row.attendance_time_pm_2
            

            this.form.use_id = row.attendance_user_id
            this.form.use_sn = row.attendance_user_sn
            this.form.use_name = row.attendance_user_name

            this.form.id = row.id
            this.form.sn = row.sn 
            this.dialogFormVisible = true
        },
        // 确定修改
        pushEntry(){
            // 获取上班状态
            let obj = {}
            obj = this.towork.find((item)=>{
                return item.value ==  this.form.toWorkState
            })
            this.form.toWorkStateVal = obj.label

            // 获取下班状态
            if(this.form.offWorkState === 0 || this.form.offWorkState == ''){
                this.form.offWorkStateVal = ''
                this.form.offWorkState = 0
            }else{
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.form.offWorkState
                })
                this.form.offWorkStateVal = obj2.label
                // console.log(this.form.offWorkStateVal)
            }
            adminAttendanceUpdate({
                "attendance_msg_am":this.form.toWorkStateVal,
                "attendance_msg_pm":this.form.offWorkStateVal,
                "attendance_time_am_1":this.form.toWorkTime,
                "attendance_time_pm_2":this.form.offWorkTime,
                "attendance_user_id":this.form.use_id,
                "attendance_user_name":this.form.use_name,
                "attendance_user_sn":this.form.use_sn,
                "status_am":this.form.toWorkState,
                "status_pm":this.form.offWorkState,
                "id":this.form.id,
                "sn":this.form.sn
            }).then(res=>{
                console.log(res)
                if(res.data.result){
                    this.dialogFormVisible = false
                    this.$message.success('修改成功！')
                    // showMessage('修改成功！' , 'success')
                    this.confirmDate()
                }else{
                    this.$message.error(res.data.result)
                    // showMessage('修改失败！' , 'error')
                }
            })
        },
        // 导出excel
        getExcel(){
            if(this.userName == '' || this.userName == undefined){
                this.userName = null
            }
            if(this.getTime !='' && this.toWorkState =='' && this.offWorkState == '' ){
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_date":this.getTime,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
            })
            }else if(this.getTime !='' && this.toWorkState!='' && this.offWorkState== '' ){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_date":this.getTime,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime !='' && this.offWorkState !='' && this.toWorkState == ''){
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_date":this.getTime,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime !='' && this.offWorkState !='' && this.toWorkState != ''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_date":this.getTime,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime =='' && this.offWorkState =='' && this.toWorkState == ''){
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime == '' &&this.offWorkState !=''&& this.toWorkState !=''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime == '' &&this.offWorkState ==''&& this.toWorkState!=''){
                let obj = {}
                obj = this.towork.find((item)=>{
                    return item.value ==  this.toWorkState
                })
                this.toWorkState1 = obj.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_msg_am":this.toWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }else if(this.getTime == '' && this.offWorkState !=''&& this.toWorkState ==''){
                let obj2 = {}
                obj2 = this.towork.find((item)=>{
                    return item.value ==  this.offWorkState
                })
                this.offWorkState1 = obj2.label
                adminAttendanceList({
                    "pageNum":1,
                    "pageSize":9999,
                    "attendance_msg_pm":this.offWorkState1,
                    "attendance_user_id":this.userName
                }).then(res=>{
                    var list = res.data.data.list
                    this.download(list)
                })
            }
        },
        download(arry){
            require.ensure([], () => {
                const { export_json_to_excel } = require('../excel/Export2Excel');//注意这个Export2Excel路径
                const tHeader = [ '日期', '姓名','上班状态','上班打卡时间','下班状态','下班打卡时间']  //表头
                const title= ['考勤数据统计表','','','','','']  //标题
                const filterVal = [ 'attendance_date', 'attendance_user_name','attendance_msg_am','attendance_time_am_1','attendance_msg_pm','attendance_time_pm_2']; // 上面的index、nickName、name是tableData里对象的属性key值
                const list = arry 
                const data = this.formatJson(filterVal, list)
                data.map(item => {
                    // console.log(item)
                    item.map((i, index) => {
                    if (!i) {
                        item[index] = ''
                    }
                    })
                })
                const merges = ['A1:F1'] //合并单元格
                export_json_to_excel({
                    title: title,
                    header: tHeader,
                    data,
                    merges,
                    filename: '考勤数据统计表',
                    autoWidth: true,
                    bookType: 'xlsx',
                    myRowFont: 2
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    },
    created(){
        this.init()
        adminUserAccountList({
            "status":3,
            "pageNum": 1,
            "pageSize": 99999
        }).then(res=>{
            this.userList = res.data.data.list
            // console.log(res)
        })
    }
}
</script>