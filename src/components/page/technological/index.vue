<template>
    <div class="technological">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>流程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="technologicaltable"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                v-loading="listLoading"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="sn" label="编号"></el-table-column>
                <el-table-column prop="name" label="类型名称"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >分配权限</el-button>
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
        <el-dialog
            title="编辑权限"
            :visible.sync="dialogVisible"
            >
            <div style="margin:10px 0px">
                <el-button type="primary" @click="add" >添加审核人</el-button>
                <el-button type="warning" @click="del">删除审核人</el-button>
            </div>
           
           <el-form label-width="150px">
                <el-steps direction="vertical" :active="active" space="60px">
                    <el-step :title="item.user_name" description="审核人" v-for="item in selectList" >
                    </el-step>
                
                </el-steps>
                
           </el-form>
           <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveVisible">确 定</el-button>
            </span> -->
            <el-dialog
                width="50%"
                title="选择人员"
                :visible.sync="innerVisible"
                append-to-body>
                <el-select v-model="addId" placeholder="请选择人员">
                    <el-option
                    v-for="item in optionsList"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveinnerVisible">确 定</el-button>
                </span>
            </el-dialog>
           
        </el-dialog>

       
    </div>
</template>
<script>
import {adminExamineTypeList,adminExamineApprovalProcessList,adminUserAccountList,adminExamineApprovalProcessInsert,adminExamineApprovalProcessDelete} from "@/api/api.js"
import md5 from 'js-md5';
let id = 1000;
export default {
    data(){
    // const data = this.selectList;
        return{
            // data: JSON.parse(JSON.stringify(data)),
            // data: JSON.parse(JSON.stringify(data)),
            technologicaltable:[],
            selectList:[],
            listLoading:false,
            currentPage1: 1,
            total1: 0,
            page1: 1,
            pageSize1: 8,
            pageNum1:1,
            dialogVisible:false,
            innerVisible:false,
            active:1,
            addId:'',
            optionsList:'',
            addTypeId:'',
            addTypeSn:'',
            isNewAdd:false
        }
    },
    methods:{
        init(){
            this.listLoading = true
            adminExamineTypeList({
                "pageNum":this.pageNum1,
                "pageSize":this.pageSize1
            }).then(res=>{
                this.listLoading = false
                this.technologicaltable = res.data.data.list
                this.total1 = res.data.data.total;
                this.currentPage1 = res.data.data.pageNum;
            })
        },
        //改变时
        handleSizeChange(val) {
            this.pageSize1 = val;
            this.init()
        },
        //条目改变时
        handleCurrentChange(val) {
            this.pageNum1 = val;
            this.init()
        },
        // 分配权限
        handleEdit(index,row){
            this.dialogVisible = true
            this.addTypeId = row.id
            this.addTypeSn = row.sn
            adminExamineApprovalProcessList({
                "type_id": row.id,
                "type_sn": row.sn
            }).then(res=>{
                if(res.data.data.list){
                    // let list = res.data.data.list
                    this.selectList = res.data.data.list
                    this.selectList.sort(this.compare('level'))
                    this.active = this.selectList.length
                    // this.selectList
                }else{
                     this.selectList = []
                }
            })
        },
        // 按照大到小的排序
        compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        // 添加审核人
        add(){
            this.addId = ''
            this.optionsList = []
            this.innerVisible = true
            this.isNewAdd = false
            if(this.selectList && this.selectList != []){
                this.isNewAdd = false
                adminUserAccountList({
                    "status":3,
                    "pageNum": 1,
	                "pageSize": 9999
                }).then(res=>{
                    if(res.data.data.list){
                        let list = res.data.data.list
                        for(var i=0;i<list.length;i++){
                            var obj = list[i]
                            var objid = obj.id
                            var flag = false;
                            for(var j=0;j<this.selectList.length;j++){
                                var obj1 = this.selectList[j]
                                var objuser_id = obj1.user_id
                                if(objuser_id == objid){
                                    flag = true
                                    break;
                                }
                            }
                            if(!flag){
                                this.optionsList.push(obj)
                            }
                        }
                    }else{
                        this.optionsList = []   
                    }
                })
            }else{
                this.isNewAdd = true
                adminUserAccountList({
                    "status":3,
                    "pageNum": 1,
	                "pageSize": 9999
                }).then(res=>{
                    if(res.data.data.list){
                        this.optionsList = res.data.data.list
                    }else{
                        this.optionsList = []   
                    }
                })
            }
        },
        saveinnerVisible(){
            let obj = {}
            obj = this.optionsList.find((item)=>{
                return item.id === this.addId
            })
            if(this.isNewAdd){
                let parent_id = 0
                adminExamineApprovalProcessInsert({
                    "type_id":this.addTypeId,
                    "type_sn":  this.addTypeSn,
                    "user_id": obj.id,
                    "user_name": obj.name,
                    "user_sn": obj.sn,
                    "parent_id": parent_id
                }).then(res=>{
                    console.log(res)
                    if(res.data.result){
                        this.$message.success('新增成功')
                        adminExamineApprovalProcessList({
                            "type_id":this.addTypeId,
                            "type_sn": this.addTypeSn
                        }).then(res=>{
                            if(res.data.data.list){
                                this.selectList = res.data.data.list
                                this.selectList.sort(this.compare('level'))
                                this.active = this.selectList.length
                                this.innerVisible = false
                            }else{
                                this.selectList = []
                            }
                        })
                    }else{
                        this.$message.error(res.data.message)
                    }
                   
                })
            }else{
                adminExamineApprovalProcessInsert({
                    "type_id":this.addTypeId,
                    "type_sn":  this.addTypeSn,
                    "user_id": obj.id,
                    "user_name": obj.name,
                    "user_sn": obj.sn
                }).then(res=>{
                    console.log(res)
                    if(res.data.result){
                        this.$message.success('新增成功')
                        adminExamineApprovalProcessList({
                            "type_id":this.addTypeId,
                            "type_sn": this.addTypeSn
                        }).then(res=>{
                            if(res.data.data.list){
                                this.selectList = res.data.data.list
                                this.selectList.sort(this.compare('level'))
                                this.active = this.selectList.length
                                this.innerVisible = false
                            }else{
                                this.selectList = []
                            }
                        })
                    }else{
                         this.$message.error(res.data.message)
                    }
                })
            }
        },
        // 删除审核人
        del(){
            this.$confirm('此操作将永久删除该审核人, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                adminExamineApprovalProcessDelete(this.selectList[this.selectList.length - 1].id,{}).then(res=>{
                    console.log(res)
                    if(res.data.result){
                        this.$message.success('删除成功')
                        adminExamineApprovalProcessList({
                            "type_id":this.addTypeId,
                            "type_sn": this.addTypeSn
                        }).then(res=>{
                            if(res.data.data.list){
                                this.selectList = res.data.data.list
                                this.selectList.sort(this.compare('level'))
                                this.active = this.selectList.length
                            }else{
                                this.selectList = []
                            }
                        })
                    }else{
                         this.$message.error(res.data.message)
                    }
                })
            }).catch(() => {   

            });
            this.selectList.sort(this.compare('level'))
            this.active = this.selectList.length

        },
        append(data) {
            console.log(data)
            const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
        remove(node, data) {
            console.log(node)
            console.log(data)
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
            </span>);
        }
    },
    created(){
        this.init()
    }    
}
</script>
<style scoped>
.step_i{
    position: absolute;
    width: 20px;
    height: 20px;
}
</style>
