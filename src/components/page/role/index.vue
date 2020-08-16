<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>角色管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="primary" style="float:right;margin: 8px;" @click="addVisible =true">添加用户</el-button>
        <div class="container">
               <el-table
            :data="roletable"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            v-loading="listLoading"
        >
            <el-table-column prop="id" label="id" width="55" align="center"></el-table-column>
            <el-table-column prop="sn" label="编号"></el-table-column>
            <el-table-column prop="name" label="类型名称"></el-table-column>
            <el-table-column prop="summary" label="描述"></el-table-column>
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
                        @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-size="pageSize1"
                layout=" prev, pager, next , total"
                :total="total1">
            </el-pagination>
        </div>
        </div>
        <el-dialog title="编辑" :visible.sync="editVisible" >
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="角色名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input v-model="form.summary"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新建" :visible.sync="addVisible" >
            <el-form :model="add" label-width="120px">
                <el-form-item label="角色名称:">
                    <el-input v-model="add.name"></el-input>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input v-model="add.summary"></el-input>
                </el-form-item>
                <el-form-item label="类别:">
                    <el-radio v-model="add.isAdmin" :label="false">用户</el-radio>
                    <el-radio v-model="add.isAdmin" :label="true">管理员</el-radio>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {AdminroleList,adminRoleUpdate,adminRoleAdd,adminRoleDel} from "@/api/api.js"
export default {
    data(){
        return{
            roletable:[],
            listLoading:false,
            editVisible:false,
            addVisible:false,
            currentPage1: 1,
            total1: 0,
            page1: 1,
            pageSize1: 8,
            pageNum1:1,
            form:{},
            add:{
                name:'',
                summary:'',
                status:1,
                isAdmin:false,
                weight:0
            }
        }
    },
    methods:{
        init(){
            this.listLoading = true
            AdminroleList({
                "pageNum":this.pageNum1,
                "pageSize":this.pageSize1
            }).then(res=>{
                this.listLoading = false
                this.roletable = res.data.data.list
            })
        },
        handleEdit(index,row){
            this.form = row
            this.editVisible = true
        },
        saveEdit(){
            if(this.form.name == ''){
                this.$message.warning('请输入名称')
            }else{
                adminRoleUpdate(this.form).then(res=>{
                    if(res.data.result){
                        this.$message.success('修改成功')
                        this.editVisible = false
                        this.init()
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
           
        },
        handleDel(index,row){
            this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                adminRoleDel(row.id,{}).then(res=>{
                    if(res.data.result){
                        this.$message.success('删除成功')
                        this.init()
                    }else{
                         this.$message.error(res.data.message)
                    }
              })
            }).catch(() => {     
            });
        },
        saveAdd(){
            if(this.add.name == ''){
                this.$message.warning('请输入名称')
            }else{
                adminRoleAdd(this.add).then(res=>{
                    if(res.data.result){
                        this.$message.success('新增成功')
                        this.addVisible = false
                        this.init()
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
        }
    },
    created(){
        this.init()
    }
}
</script>

