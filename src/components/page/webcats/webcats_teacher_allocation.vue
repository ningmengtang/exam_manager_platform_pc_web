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
            <div class="right_box_top">
                <div class="select_topic" v-for="item in topic ">
                    <h4 class="title">{{item.title}}</h4>
                    
                    <el-button class="select_topic_btn" v-for="i in item.item" >
                        第{{i}}题
                    </el-button>
                </div>
            </div>

            <div class="right_box_content">
                <h3 class="title">正在分配【第3大题（6、7、8小题）】的阅卷老师</h3>
                <el-transfer 
                    v-model="selectTeacher"
                    :data="teacherList"
                    :props="{key: 'id',label: 'name'}"
                    @change="handleChangeTeacher"
                    :titles="['可分配老师', '已分配老师']"
                  class="transfer">
                </el-transfer>
            </div>

            <div class="right_box_bottom">
                <el-button class="right_box_bottom_btn last">上一题</el-button>
                <el-button class="right_box_bottom_btn next">下一题</el-button>
                <el-button class="right_box_bottom_btn reset">重置所有分配方案</el-button>
                <el-button class="right_box_bottom_btn affirm">确认分配方案</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    schoolSelectTeacher,
    apiCommonExamSeleElementTestById
	} from '@/api/api.js'
export default {
    data(){
        const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data
        };
        return{
            data: generateData(),
            value: [1, 4],
            teacherList:[],
            paperId:'',
            selectTeacher:[],
            importPaper:'',
            startTime:'',
            endTime:'',
            topic:[{
                title:'第一大题',
                item:[1,2,3,4,5,6]
            },
            {
                title:'第二大题',
                item:[1,2,3,4,5,6]
            },
            
            ]
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            
            this.importPaper = importPaper
            console.log(this.importPaper)
            this.paperId = this.importPaper.examinationPaper.id
            apiCommonExamSeleElementTestById(this.paperId).then(res=>{
                this.elementTest = JSON.parse(res.data.data.elementTest)
                // console.log(this.elementTest)
                // 分部分
                let elementTestItems = this.elementTest.items
                console.log(elementTestItems)
                // for(var i=0;i<elementTestItems.length;i++){
                //     // 分
                //     let item = elementTestItems[i].items[0].items
                // }
            })
        }else{
            this.$message.warning('无试卷数据')
        }


        
        schoolSelectTeacher({
            "id":localStorage.getItem('userID')
        }).then(res=>{
            if(res.data.data.list){
                let schoolId = res.data.data.list[0].schoolId
                schoolSelectTeacher({
                    "schoolId":schoolId
                }).then(res=>{
                    this.teacherList = []
                    if(res.data.data.list){
                        let list = res.data.data.list
                        for(var i=0;i<list.length;i++){
                            if(list[i].id == localStorage.getItem('userID')){
                                continue
                            }else{
                                this.teacherList.push(list[i])
                            }
                        }
                        // console.log(this.teacherList)
                    }else{
                        this.$message.warning('无分配老师数据')
                    }
                })
            }else{
                
            } 
        })
    },
    methods:{
        // 改变老师
        handleChangeTeacher(){
            console.log(this.selectTeacher)
        }
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>
