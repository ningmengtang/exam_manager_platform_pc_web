<template>
    <div class="box">
        <div class="left_box">
            <div class="left_box_title">
                <h3>分配任务</h3>
            </div>
            <div class="left_box_time">
                <div class="time">
                    <span>阅卷时间：</span>
                    <el-date-picker
                        v-model="importPaper.start_time"
                        type="datetime"
                        placeholder="选择阅卷时间">
                    </el-date-picker>
                </div>
                <div class="time"> 
                    <span>结束时间：</span>
                    <el-date-picker
                        v-model="importPaper.over_time"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="left_box_tag">
                <div class="label" v-for="card in importPaper.examinationPaper.tag_list">{{card.text}}</div>
            </div>
            <div class="left_box_paper">
                 <h3>{{importPaper.examinationPaper.title}}</h3>
                <p >{{importPaper.examinationPaper.examExplain}}</p>
            </div>
            <div class="left_box_button">
                <el-button class="left_box_button_text" @click="goAllocation">重新分配任务</el-button>
                
                <el-button class="left_box_button_text back" @click="goback">返回菜单</el-button>
            </div>
            <div class="left_box_schedule">
                <div class="left_box_schedule_left">
                    <div class="residue">已经批阅进度</div>
                    <div class="percent">
                        {{already_count}}%
                    </div>
                    
                </div>
                <div class="left_box_schedule_line">

                </div>

                <div class="left_box_schedule_right">
                    <div class="residue">剩余批阅题目</div>
                    <div class="percent">
                        {{residue}}题
                    </div>
                </div>
                <div class="left_box_tip">
                        已审批{{already}}题，仍需审批{{residue}}题。
                </div>
            </div>
            
        </div>
        <div class="right_box">
            <div class="right_box_title">
                <h3>阅卷进度一览（{{teacherTasklist.length}}人）</h3>
            </div>
            <!-- <div class="right_box_residue">
                <el-button class="right_box_residue_button">
                     立即导入答题卡
                </el-button>
                <el-progress :percentage="50"></el-progress>
            </div> -->
            <div class="right_box_residue">
                <div class="right_box_teacher" v-for="i in teacherTasklist">
                    <div class="radius">
                        <span>{{  (i.finish_count/i.count).toFixed(2) * 100 +'%' }}</span>
                    </div>
                    <p>{{i.teacher_name}}</p>
                </div>
            </div>
            <div class="right_box_report">
                <div class="right_box_title">
                    <h3>异常卷报告（{{paperListindex}}个未处理）</h3>
                </div>
                <el-row :gutter="20" class="right_box_card">
                    <el-col :span="8" v-for="(item,i) in paperList">
                        <div class="card_info">
                            <div class="card_info_top">
                                <div class="card_img">
                                    <img :src="'/api/student/question/getImage/'+ item.id+ '?id=1'" >
                                </div>
                                <div class="card_title">
                                    <p >第 {{i+1}}题</p>
                                    <p style="color:#999999"> {{item.teacher_name}}</p>
                                </div>
                               
                                <div  class="discarde_title">
                                    图像异常
                                </div>
                            </div>
                            <div class="card_info_time">
                                {{item.create_date}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 分页 -->
                <div class="page">
                    <el-pagination background layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="pageSize" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getCorrectRateByPaperId,
    TeacherQuestionList,
    TeacherQuestionReset,
    selectTeacheresCountAndUpdateCount,
    TeacherTaskUpdate,
    studentQuestionList,
    studentQuestionSelect
	} from '@/api/api.js'
export default {
    data(){
        return{
            startTime:'',
            endTime:'',
            importPaper:'',
            pageSize:9,
            total:0,
            currentPage:1,
            pageNum:1,
            paperListindex:0,
            teacherTasklist:{

            },
            importPaper:{
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    "tag_list":[],
                    "title":'',
                    "examExplain":''
                }
            },
            already_count:0,
            already:0,
            residue:0,
            count:0,
            paperList:[]

        }
    },
    methods:{
        handleSizeChange(val) {
			this.pageSize = val
			studentQuestionSelect({
				 "paper_id":this.importPaper.paper_id,
                "is_typical_case":3,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		handleCurrentChange(val) {
							
			this.pageNum = val;
			studentQuestionSelect({
				"paper_id":this.importPaper.paper_id,
                "is_typical_case":3,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
                this.paperList = res.data.data.list
               
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
        goback(){
            this.$router.push('webcats_leader_teacher_index')
        },
        // 重新分配任务
        goAllocation(){
            this.$confirm('此操作将重置全部老师的分配任务?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                TeacherQuestionReset(this.importPaper.id).then(res=>{
                    if(res.data.result){
                        TeacherTaskUpdate({
                            "id":this.importPaper.id,
                            "status":1
                        }).then(res=>{
                            if(res.data.result){
                                this.$message.success('重置成功,请前往分配老师。')
                                this.$router.push('webcats_teacher_allocation')
                            }else{
                                this.$message.error('出错了')
                            }
                        })
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }).catch(() => {

            });
           
            // this.$router.push('webcats_teacher_allocation')
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }
        studentQuestionSelect({
            "paper_id":this.importPaper.paper_id,
            "is_typical_case":3,
            "pageSize":this.pageSize,
            "pageNum":this.pageNum
        }).then(res=>{
           
            this.paperList = res.data.data.list
            // console.log(this.paperList)
			this.total= res.data.data.total
            this.currentPage= res.data.data.pageNum
            this.paperListindex = this.paperList.length
        })
        // 查看试卷批阅进度
        getCorrectRateByPaperId(this.importPaper.paper_id).then(res=>{
            // console.log(res)
            if(res.data.data){
                let data = res.data.data
                this.already_count = (data.already_count / data.count).toFixed(2) * 100 
                this.already = data.already_count
                this.residue = data.residue_count
                this.count = data.count
                if(data.residue_count == 0){
                    TeacherTaskUpdate({
                        "id":this.importPaper.id,
                        "status":4
                    })
                }
            }else{
                this.$message.warning('查询不到批阅进度')
            }
        })
        // 查看分配老师进度
        // console.log(this.importPaper)
        selectTeacheresCountAndUpdateCount(this.importPaper.id).then(res=>{
            if(res.data.data){
               
                this.teacherTasklist = res.data.data
            }else{

                this.$message.warning('请分配老师')
            }
        })


        
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>