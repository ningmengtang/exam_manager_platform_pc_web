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
                <el-button class="left_box_button_text" @click="goAllocation">立即分配</el-button>
                
                <el-button class="left_box_button_text back">返回菜单</el-button>
            </div>
            <div class="left_box_schedule">
                <div class="left_box_schedule_left">
                    <div class="residue">剩余导入进度</div>
                    <div class="percent">
                        10%
                    </div>
                    
                </div>
                <div class="left_box_schedule_line">

                </div>

                <div class="left_box_schedule_right">
                    <div class="residue">剩余导入进度</div>
                    <div class="percent">
                        10%
                    </div>
                </div>
                <div class="left_box_tip">
                        已导入70%的答题卡，仍需导入30位考生的答题卡
                </div>
            </div>
            
        </div>
        <div class="right_box">
            <div class="right_box_title">
                <h3>阅卷进度一览（10人）</h3>
            </div>
            <div class="right_box_residue">
                <el-button class="right_box_residue_button">
                     立即导入答题卡
                </el-button>
                <el-progress :percentage="50"></el-progress>
            </div>
            <div class="right_box_report">
                <div class="right_box_title">
                    <h3>异常卷报告（10个未处理）</h3>
                </div>
                <el-row :gutter="20" class="right_box_card">
                    <el-col :span="8" v-for="i in 9">
                        <div class="card_info">
                            <div class="card_info_top">
                                <div class="card_img">
                                    <img src="../../../assets/img/img1.png" alt="">
                                </div>
                                <div class="card_title">
                                    <p >第 {{i}}小题</p>
                                    <p style="color:#999999"> 古德</p>
                                </div>
                               
                                <div  class="discarde_title">
                                    图像异常
                                </div>
                            </div>
                            <div class="card_info_time">
                                2020-09-11 14:06:00
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
export default {
    data(){
        return{
            startTime:'',
            endTime:'',
            importPaper:'',
            pageSize:9,
            total:99,
            currentPage:1,
            pageNum:1,
        }
    },
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        // 前往分配
        goAllocation(){
            this.$router.push('webcats_teacher_allocation')
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }
       
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>