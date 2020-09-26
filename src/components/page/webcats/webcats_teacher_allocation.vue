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
                <el-button class="left_box_button_text back" @click="goback">返回菜单</el-button>
            </div>
            <div class="left_box_schedule">
                <div class="left_box_schedule_left" style="width:100%">
                    <div class="residue">需要分配答题卡</div>
                    <div class="percent">
                        {{yetPlan}}份
                    </div>
                    
                </div>
                
                <div class="left_box_tip">
                        已分配0张答题卡，仍需分配{{yetPlan}}位考生的答题卡。
                </div>
            </div>
        </div>
        <div class="right_box">
            <div class="right_box_top">
                <div class="select_topic" v-for="(item,index) in topicList ">
                    <h4 class="title">第{{index + 1}}部分</h4>
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
                <el-button class="right_box_bottom_btn last" @click="lastTopic">上一题</el-button>
                <el-button class="right_box_bottom_btn next" @click="nextTopic">下一题</el-button>
                <el-button class="right_box_bottom_btn reset" @click="resetTopic">重置所有分配方案</el-button>
                <el-button class="right_box_bottom_btn affirm" @click="affirmPlan">确认分配方案</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    schoolSelectTeacher,
    apiCommonExamSeleElementTestById,
    TeacherQuestionAdd,
    getAlreadySheetCountAndDispenseCount,
    TeacherTaskUpdate
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
            isNext:true,
            selectTopicList:[],
            selectIndex:0,
            data: generateData(),
            NowSlectItem:[],
            importPaper:{
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    "tag_list":[],
                    "title":'',
                    "examExplain":''
                }
            },
            value: [1, 4],
            teacherList:[],
            paperId:'',
            selectTeacher:[],
            startTime:'',
            endTime:'',
            yetPlan:0,
            topic:[{
                title:'第一大题',
                item:[1,2,3,4,5,6]
            },
            {
                title:'第二大题',
                item:[1,2,3,4,5,6]
            },
            
            ],
            allTaskList:[],
            paperId:'',
            taskId:''
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper

            this.paperId = this.importPaper.paper_id
            this.taskId = this.importPaper.id

            // 查询当前试卷已经导入答题卡的总数与已分发的份数
            getAlreadySheetCountAndDispenseCount(this.importPaper.paper_id).then(res=>{
                if(res.data.result){
                    let data = res.data.data
                    // console.log(data)
                    if(data.dispenseCount == data.sheetCount){
                        this.yetPlan = data.dispenseCount    
                    }else{

                        this.$message.warning('请导入全部学生答题卡,再进行分配！')
                        this.$router.push('webcats_teacher_import')
                    }
                }else{
                    this.$router.push('webcats_leader_teacher_index')
                    this.$message.warning('查询不到导入进度')
                }
            })
            apiCommonExamSeleElementTestById(this.paperId).then(res=>{
                this.elementTest = JSON.parse(res.data.data.elementTest)
                let elementTestItems = this.elementTest.items
                // 所有题目
                this.topicList= []
                for(var i=0;i<elementTestItems.length;i++){
                    let item  = elementTestItems[i].items
                    console.log(item)
                    let arry = []
                    for(var k=0;k<item.length;k++){
                        let groupQuestionArr = item[k].items
                        groupQuestionArr.forEach(element => {
                            if(element.questionTypeName == '综合题'){
                                arry.push(element)
                            }
                        });
                        // arry = arry.concat(item[k].items)
                    }
                    this.topicList.push(arry)
                }
                // 当前分配题目
                this.selectTopicList = []
                for(var k=0;k<this.topicList.length;k++){
                    this.topicList[k].forEach(ele => {
                        if(ele.groupQuestionArr){
                            this.selectTopicList.push(ele)
                        }
                    });
                }

                // 读当前的第一题

                let firstItem =  this.selectTopicList[this.selectIndex]
                this.NowSlectItem = []
                firstItem.groupQuestionArr.forEach(ele => {
                    this.NowSlectItem.push({
                        "no":ele.no,
                        "id":ele.id
                    })
                });
              
                this.selectTopicList.forEach(element => {
                    this.allTaskList.push([])
                });
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
                        // console.log(list)
                        for(var i=0;i<list.length;i++){
                            if(list[i].id == localStorage.getItem('userID')){
                                continue
                            }else if(list[i].role_list && list[i].role_list[0].roleName == '教师组长'){
                                continue
                                
                            }else{
                                this.teacherList.push(list[i])
                            }
                        }
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
            // this.yetPlan
        },

        // 返回菜单
        goback(){
            this.$router.push('webcats_leader_teacher_index')
        },
        getClass(no){
            for(var i=0;i<this.NowSlectItem.length;i++){
                if(no == this.NowSlectItem[i].no ){
                    return 'select'
                }
            }
        },


        // 下一题
        nextTopic(){
            console.log(this.selectTeacher.length)
            console.log(this.yetPlan)
            if(this.selectTeacher.length < this.yetPlan){
                if(this.selectTeacher.length>0){
                    // console.log(this.selectIndex)
                    if(this.selectIndex >= this.selectTopicList.length){
                        this.selectIndex = this.selectTopicList.length -1
                        this.$message.warning('当前任务已经分配完成，请确认所有分配方案')
                    }else{
                        // 总份数

                        let Allnum = this.yetPlan 
                        let allTaskList = []
                        for(var i=0;i<this.NowSlectItem.length;i++){
                            for(var a=0;a<this.selectTeacher.length;a++){
                                // 处理最后一个
                                if(a == this.selectTeacher.length -1){

                                    allTaskList.push({
                                        "teacher_id":this.selectTeacher[a],
                                        "question_id":this.NowSlectItem[i].id,
                                        "count":Allnum -( parseInt(Allnum/this.selectTeacher.length) * a),
                                        "paper_id":this.paperId,
                                        "task_id":this.taskId
                                    })
                                }else{
                                    allTaskList.push({
                                        "teacher_id":this.selectTeacher[a],
                                        "question_id":this.NowSlectItem[i].id,
                                        "count":parseInt(Allnum/this.selectTeacher.length),
                                        "paper_id":this.paperId,
                                        "task_id":this.taskId
                                    })
                                }
                            }
                        }

                        this.allTaskList[this.selectIndex] = allTaskList
                        this.selectIndex++
                        // 初始化数据
                        if(this.selectIndex >= this.selectTopicList.length ){
                            this.selectIndex = this.selectTopicList.length
                        }else{
                            let firstItem =  this.selectTopicList[this.selectIndex]
                        
                            this.NowSlectItem = []
                            firstItem.groupQuestionArr.forEach(ele => {
                                this.NowSlectItem.push({
                                    "no":ele.no,
                                    "id":ele.id
                                })
                            });

                            this.$forceUpdate();
                        
                            this.selectTeacher = []
                            // console.log(this.allTaskList)

                        }
                    }

                }else{
                    this.$message.warning('请分配老师')
                }
            }else{
                this.$message.warning('分配的老师不能多于总试卷')
            }

        },

        // 上一题
        lastTopic(){
            this.selectIndex--
            if(this.selectIndex >= 0){
                let firstItem = this.selectTopicList[this.selectIndex]
                this.NowSlectItem = []
                    firstItem.groupQuestionArr.forEach(ele => {
                        this.NowSlectItem.push({
                        "no":ele.no,
                        "id":ele.id
                    })
                });
                this.$forceUpdate();    
                this.selectTeacher = []
            }else{
                this.selectIndex = 0
                this.$message.warning('没有更多题目')
            }
        },
        // 重置
        resetTopic(){
            // 读当前的第一题
            this.selectIndex = 0
            this.NowSlectItem = []
            this.allTaskList = []
            let firstItem =  this.selectTopicList[this.selectIndex]
            firstItem.groupQuestionArr.forEach(ele => {
                this.NowSlectItem.push({
                    "no":ele.no,
                    "id":ele.id
                })
            });
            this.selectTopicList.forEach(element => {
                this.allTaskList.push([])
            });
            this.selectTeacher = []
            this.$forceUpdate();   
        },
        async getPlan(data,index){
			await this.getPlanPromise(data,index)
			// return n 
        },
        getPlanPromise(data,index){
			return new Promise((resolve,reject)=>{
                TeacherQuestionAdd(data).then(res=>{
                    if(res.data.result){

                    }else{
                        this.isNext = false
                        // this.$message.error(res.data.message)
                        this.$message.error(res.data.message)
                    }
                    resolve(res)
                })
			})
		},
        // 确认提交
        affirmPlan(){
            // console.log(this.allTaskList)
            let taskList = []
            for(var k=0;k<this.allTaskList.length;k++){
                let array = this.allTaskList[k]
                array.forEach(element => {
                    // console.log(element)
                    taskList.push(element)
                });
                // this.getPlan(this.allTaskList[k],k)
            }
            this.isNext = true
            // console.log(taskList)
            for(var i=0;i<taskList.length;i++){
               
                this.getPlan(taskList[i],i)
            }
            this.$message.success('分配成功')
            if(this.isNext){
                TeacherTaskUpdate({
                    "id":this.importPaper.id,
                    "status":3
                }).then(res=>{
                    if(res.data.result){
                        this.$router.push('webcats_leader_teacher_index')
                    }else{
                        this.$message.error('出错了')
                    }
                })
            }else{
                this.$message.error('分配失败')
            }
           
            
        }
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>
