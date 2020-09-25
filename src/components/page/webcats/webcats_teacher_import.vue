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
                
                <el-button class="left_box_button_text back" @click="goBack">返回菜单</el-button>
            </div>
            <div class="left_box_schedule">
                <div class="left_box_schedule_left">
                    <div class="residue">剩余导入进度</div>
                    <div class="percent">
                        {{surplusPlan}}
                    </div>
                    
                </div>
                <div class="left_box_schedule_line">

                </div>

                <div class="left_box_schedule_right">
                    <div class="residue">剩余导入人数</div>
                    <div class="percent">
                        {{surplusNum}}
                    </div>
                </div>
                <div class="left_box_tip">
                        已导入{{yetPlan + '%'}}的答题卡，仍需导入{{surplusNum}}位考生的答题卡
                </div>
            </div>
            
        </div>
        <div class="right_box">
            <div class="msg_card">
                <el-card>
                    <div v-for=" i in cardList" class="card_list" v-if="cardList">
                        {{i.info}}
                    </div>
                    <div v-if="cardList == '' " class="none_list">
                        暂无导入信息！
                    </div>
                </el-card>
            </div>
            <div class="right_box_title">
                <h3>阅卷进度一览（{{sheetCount}}人）</h3>
            </div>
            <div class="right_box_residue">
                <el-button class="right_box_residue_button" @click="uploadCard">导入答题卡</el-button>
                <el-button class="right_box_residue_button" @click="uploadgoFild">导出详情</el-button>
                <el-progress :percentage="yetPlan"></el-progress>
            </div>
           
            <div class="right_box_report">
                <div class="right_box_title">
                    <h3>异常卷报告（{{cardErrorIndex}}个未处理）</h3>
                </div>
                <el-row :gutter="20" class="right_box_card">
                    <el-col :span="8" v-for="(i,index) in cardError">
                        <div class="card_info">
                            <div class="card_info_top">
                               
                                <div class="card_title">
                                    <p >第 {{index+ 1}}小题</p>
                                    <!-- <p style="color:#999999"> 古德</p> -->
                                </div>
                                <div  class="discarde_title">
                                    上传失败
                                </div>
                                
                            </div>
                            <div class="info">
                                    {{i.info}}
                            </div>
                            <div class="card_info_time">
                                {{i.create_date}}
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
    teacherImportSheet,
    teacherAnswerSheetLogList,
    getAlreadySheetCountAndDispenseCount,
    TeacherQuestionUpdate,
    importSheetGetFiles,
    TeacherTaskUpdate
	} from '@/api/api.js'
export default {
    data(){
        return{
            startTime:'',
            endTime:'',
            importPaper:{
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    "tag_list":[],
                    "title":'',
                    "examExplain":''
                }
            },
            cardError:[],
            cardErrorIndex:0,
            pageSize:9,
            total:0,
            currentPage:1,
            pageNum:1,
            cardList:'',
            isAllocation:false,
            surplusPlan:'',
            surplusNum:'',
            yetPlan:0,
            sheetCount:0
        }
    },
    methods:{
        handleSizeChange(){
            this.pageSize = val
			teacherAnswerSheetLogList({
				"paper_id": this.importPaper.paper_id,
                "is_error":true,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
				this.cardError = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
        },
        handleCurrentChange(){
            this.pageNum = val;
			teacherAnswerSheetLogList({
				"paper_id": this.importPaper.paper_id,
                "is_error":true,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
                this.cardError = res.data.data.list
               
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
        },
        goBack(){
            this.$router.push('webcats_leader_teacher_index')
        },
        // 前往分配
        goAllocation(){
            // console.log(this.importPaper)
            if(this.isAllocation){
                TeacherTaskUpdate({
                    "id":this.importPaper.id,
                    "status":1
                }).then(res=>{
                    if(res.data.result){
                        this.$router.push('webcats_teacher_allocation')
                    }else{
                        this.$message.error('出错了')
                    }
                })
                
            }else{

                this.$message.warning('请导入全部学生答题卡')
            }
            
        },
        // 导入答题卡
        uploadCard(){
            var input =  document.createElement('input')
			input.type = 'file'
			input.accept = '.rar,.RAR,.zip,.ZIP,.7z,.jpg,.JPG'
			input.addEventListener('change',(event)=>{
				let file = event.target.files[0]
				var data = new FormData()
                data.append('file',file)
                // const loading = this.$loading({
                //     lock: true,
                //     text: '正在导入答题卡,请稍等！',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
				teacherImportSheet(this.importPaper.paper_id,data).then(res=>{
                    // loading.close();
					if(res.data.result){
						this.$message.success('正在导入答题卡,请稍等！')
                        // 查询当前试卷已经导入答题卡的总数与已分发的份数
                        getAlreadySheetCountAndDispenseCount(this.importPaper.paper_id).then(res=>{
                            if(res.data.result){
                                let data = res.data.data
                                // console.log(data)
                                if(data.dispenseCount == data.sheetCount){
                                    this.isAllocation = true
                                    this.yetPlan = 100
                                    this.surplusPlan = '0%'
                                    this.surplusNum = 0
                                    
                                }else{
                                
                                    this.yetPlan = (data.sheetCount / data.dispenseCount).toFixed(2) * 100 
                                    this.surplusPlan = 100 - ((data.sheetCount / data.dispenseCount).toFixed(2) * 100) + '%'
                                    this.surplusNum = data.dispenseCount  - data.sheetCount
                                    this.isAllocation = false
                                }
                                  this.$forceUpdate();
                            }else{
                                this.$message.warning('查询不到导入进度')
                            }
                        })
                        // 查询教师答题卡导入日志
                        teacherAnswerSheetLogList({
                            "paper_id": this.importPaper.paper_id
                        }).then(res=>{
                            // console.log(res)
                            if(res.data.data.list){
                                this.cardList = res.data.data.list
                            }else{
                                this.cardList = ''
                            }
                        })
					}else{
						this.$message.error(res.data.message)
					}
				})
			})
			input.click()
			input.remove()
           
        },
        // 导出进度详情
        uploadgoFild(){
            importSheetGetFiles(this.importPaper.paper_sn).then(res=>{
				const blob = new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'})
				let link = document.createElement('a');
				let objectUrl = URL.createObjectURL(blob);
				link.setAttribute("href",objectUrl);
				link.setAttribute("download",'答题卡进度详情.zip'); 
				link.click();
				//释放内存
				window.URL.revokeObjectURL(link.href)
			})
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
            // console.log(this.importPaper)
        }else{
            this.$message.warning('无试卷数据')
        }

        // 查询教师答题卡导入日志
        teacherAnswerSheetLogList({
            "paper_id": this.importPaper.paper_id
        }).then(res=>{
            // console.log(res)
            if(res.data.data.list){
                this.cardList = res.data.data.list
              
            }else{
                this.cardList = ''
            }
           
        })
        teacherAnswerSheetLogList({
            "paper_id": this.importPaper.paper_id,
            "is_error":true,
            "pageSize":this.pageSize,
            "pageNum":this.pageNum
        }).then(res=>{
            // console.log(res)
            if(res.data.data.list){
                this.cardError = res.data.data.list
                this.cardErrorIndex = this.cardError.length
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
                // console.log(this.cardError)
            }else{
                this.cardError = []
                this.cardErrorIndex = 0
            }
        })

        // 查询当前试卷已经导入答题卡的总数与已分发的份数
        getAlreadySheetCountAndDispenseCount(this.importPaper.paper_id).then(res=>{
            // console.log(res)
            if(res.data.result){
                let data = res.data.data
                // console.log(data)
                if(data.dispenseCount == data.sheetCount){
                    this.sheetCount = data.sheetCount
                    this.isAllocation = true
                    this.yetPlan = 100
                    this.surplusPlan = '0%'
                    this.surplusNum = 0
                }else{
                    this.sheetCount = data.sheetCount
                    this.yetPlan = (data.sheetCount / data.dispenseCount).toFixed(2) * 100 
                    this.surplusPlan = 100 - ((data.sheetCount / data.dispenseCount).toFixed(2) * 100) + '%'
                    this.surplusNum = data.dispenseCount  - data.sheetCount
                    this.isAllocation = false
                }
            }else{
                this.$message.warning('查询不到导入进度')
            }
        })
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>