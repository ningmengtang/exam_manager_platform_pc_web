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
                <div class="select_topic" v-for="(item,index) in topicList ">
                    <h4 class="title">第{{index + 1}}大题</h4>
                    <el-button class="select_topic_btn" v-for="i in item"  :class="getClass(i.no)" >
                        第{{i.no}}题
                    </el-button>
                </div>
            </div>

            <div class="right_box_content">
                <h3 class="title">正在分配【 第 <span v-for="(item,i) in NowSlectItem" v-html="i==NowSlectItem.length-1?item.no:item.no+'、'"></span> 小题 】的阅卷老师</h3>
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
                <el-button class="right_box_bottom_btn next" @click="nextTopic">下一题</el-button>
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
import { forEach } from 'jszip';
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
            topicList:[],
            selectTopicList:[],
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
            
            ],
            allTaskList:[]
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
            this.paperId = this.importPaper.examinationPaper.id
            apiCommonExamSeleElementTestById(this.paperId).then(res=>{
                this.elementTest = JSON.parse(res.data.data.elementTest)
                console.log(this.elementTest)
                let elementTestItems = this.elementTest.items

                this.topicList= []
                for(var i=0;i<elementTestItems.length;i++){
                    
                    let item = elementTestItems[i].items[0].items
                    this.topicList.push(item)
                }
                this.selectTopicList = []
                for(var k=0;k<this.topicList.length;k++){
                    this.topicList[k].forEach(ele => {
                        if(ele.groupQuestionArr){
                            this.selectTopicList.push(ele)
                        }
                    });
                }

                // 读当前的第一题
                let firstItem =  this.selectTopicList[0]

                // for(var a=0;a<firstItem.length;a++){

                // }
                this.NowSlectItem = []
                firstItem.groupQuestionArr.forEach(ele => {
                    this.NowSlectItem.push({
                        "no":ele.no,
                        "id":""
                    })
                });
                console.log(this.NowSlectItem)
                
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
            }
        })
    },
    methods:{
        // 改变老师
        handleChangeTeacher(){
            console.log(this.selectTeacher)
        },

        getClass(no){
            for(var i=0;i<this.NowSlectItem.length;i++){
                if(no == this.NowSlectItem[i].no ){
                    return 'select'
                }
            }
            // return ''
        },


        // 下一题
        nextTopic(){
            // console.log(this.selectTeacher.length>0)
            if(this.selectTeacher.length>0){
                this.NowSlectItem.forEach(ele => {
                //    for(var )
                });
                console.log(this.NowSlectItem)
                console.log(this.selectTeacher)
            }else{
                 this.$message.warning('请分配老师')
            }
        }
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>
