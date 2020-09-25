<template>
    <div class="feeback">
        <div class="left_box">
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
            <div class="left_box_paper">
                <h3>{{importPaper.examinationPaper.title}}</h3>
                <p >{{importPaper.examinationPaper.examExplain}}</p>
            </div>
            <div class="paper_score">
                <p>最终得分：<span style="color:#FB4B1C">{{allScore}}分 </span></p>
            </div>
            <div class="paper_topic">
                <div v-for="(item,index) in allElementTest" class="elementTopic">
                    <h3>第{{index+1}}部分</h3>

                    <el-radio-group v-model="elementItem" @change="getQuery">
						<el-radio-button v-for="(i,ind) in item" :label="i.id">
							第{{i.no}}小题
						</el-radio-button>
					</el-radio-group>
                </div> 
            </div>

            <div class="paper_bottom">
                <!-- <el-button size="medium" class="last" >查看上一题</el-button> -->
                <el-button size="medium" class="next" @click="goback">返回</el-button>
                <p>注意核实个人信息和考试信息，如有不符立刻联系老师</p>
            </div>
        </div>
        <div class="right_box">
            <div class="right_content">
                <span class="title">
                    第{{selectTopic.element.no}}题
                </span>
                <span>
                    得分：{{selectTopic.question.score}}分(满分{{selectTopic.element.score}}分)
                </span>
            </div>
            <div class="topic">
                <div class="topic_text">
                    <p v-html="selectTopic.element.topic_text"></p>
                </div>
                <div v-if="selectTopic.element.questionTypeName == '单选/多选题'">
                    <div v-for="(item,i) in selectTopic.element.items" style="padding: 5px 0px">
                        <span>{{Allletter[i]}}、</span>
                        <span v-html="item.topic_text"  style="display: inline-block;">

                        </span>
                    </div>
                </div>

                <!-- <div  v-if="selectTopic.element.questionTypeName == '综合题'">
                    
                </div> -->
            </div>
           <div class="paper_answer">
                <h3>我的答案</h3>
                <div v-if="selectTopic.element.questionTypeName == '综合题'">
                    <el-image 
                        style="width: 180px; height: 60px"
                        :src="imgUrl[0]" 
                        :preview-src-list="imgUrl">
                    </el-image>
                </div>
                <p v-if="selectTopic.element.questionTypeName == '单选/多选题'">{{selectTopic.question.answer_test}}</p>
            </div>
            <div class="paper_answer" v-if="selectTopic.element.questionTypeName == '综合题'">
                <h3>老师批改答案</h3>
                <div >
                    <el-image 
                        style="width: 180px; height: 60px"
                        :src="imgUrlTeacher[0]" 
                        :preview-src-list="imgUrlTeacher">
                    </el-image>
                </div>
            </div>
            <div class="paper_answer">
                <h3>参考答案</h3>
                <p  v-if="selectTopic.element.questionTypeName == '单选/多选题'">{{selectTopic.element.anwser.answer_text}}</p>

                <p v-html="selectTopic.element.anwser.analysis_text"></p>
            </div>
        </div>
    </div>
</template>
<script>
import {
    teacherTestSelectTaskforStudent,
    studentQuestionList,
    studentQuestionSelect,
    apiCommonExamSeleElementTestById,
    adminExamQuestion,
    studentQuestiongetImageListSn
	} from '@/api/api.js'
export default {
    data(){
        return{
           importPaper:{
               examinationPaper:{
                   title:'',
                   examExplain:''
               },
           },
           imgUrl:[],
           imgUrlTeacher:[],
           paper_id:'',
           task_id:'',
           allScore:0,
           elementTest:'',
           elementItem:'',
           Allletter:[],
           allElementTest:[],
           selectIndex:0,
           selectTopic:{
               question:{
                   
                  
               },
               element:{
                   anwser:{
                       answer_text:'',
                       analysis_text:''
                   },
               }
           },

        }
    },
    methods:{
        getQuery(){
            
            console.log(this.elementItem)
            studentQuestionSelect({
                "paper_id":this.paper_id,
                "student_id":this.student_id,
                "question_id":this.elementItem
            }).then(res=>{
                if(res.data.data.list){
                    let list = res.data.data.list[0]
                    this.selectTopic.question = list
                    for(var i=0;i<this.allElementTest.length;i++){
                        let item  = this.allElementTest[i]
                        // console.log(item)
                        for(var k=0;k<item.length;k++){
                            if(item[k].id == this.elementItem){
                                this.selectTopic.element = item[k]
                                break
                            }
                        }
                    } 

                    if(this.selectTopic.element.questionTypeName == '综合题'){
                        console.log('进入综合题')
                        // console.log(this.selectTopic.element.sn)
                        studentQuestiongetImageListSn(this.selectTopic.question.sn).then(res=>{
                            // console.log(res)
                            this.imgUrl = []
                            this.imgUrlTeacher = []
                            if(res.data.data){
                                let data = res.data.data
                                for(var k=0;k<data.length;k++){
                                    this.imgUrl.push('/api/student/question/getImage/' +data[k].id+'?id=1'+"&d=" + new Date().getTime())
                                    this.imgUrlTeacher.push('/api/student/question/getImage/' +data[k].id+'?id=2'+"&d=" + new Date().getTime())
                                }
                                
                                
                            }
                        })
                    }
                    // adminExamQuestion({
                    //     "question_id":this.elementItem
                    // }).then(res=>{
                    //     console.log(res)
                    // })


                }else{
                    this.$message.warning('暂无该试题信息！')
                }
            })
        },
        goback(){
            this.$router.push('/webcats_teacher_feeback')
        },
        // 去掉所有css样式
        getSelectIndex(index){
            console.log(index)
        }

    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        // 拿到a-z 的大写字母
        this.Allletter = []
        for(var i=0;i<26;i++){  
            this.Allletter.push(String.fromCharCode(65+i));//输出A-Z  26个大写字母  
        }

        if(importPaper){
            this.importPaper = importPaper
            this.paper_id = this.importPaper.paper_id
            this.task_id = this.importPaper.id
            this.student_id = this.$route.query.studenId
            studentQuestionSelect({
                "paper_id":this.paper_id,
                "student_id":this.student_id
            }).then(res=>{
                let list = res.data.data.list
                this.allScore = 0
                for(var i=0;i<list.length;i++){
                    this.allScore = this.allScore +  Number(list[i].score)
                }

                // 试卷分组
                apiCommonExamSeleElementTestById(this.importPaper.paper_id).then(res=>{
                    this.elementTest =JSON.parse(res.data.data.elementTest)
                    console.log(this.elementTest)
                    let  elementTestItems = this.elementTest.items

                    console.log(elementTestItems)
                    this.allElementTest = []
                    for(var j=0;j<elementTestItems.length;j++){
                        let item  = elementTestItems[j].items
                        let arry = []
                        item.forEach(element => {
                            console.log(element)
                            for(var k=0;k<element.items.length;k++){
                                let i = element.items[k]
                                arry.push(i)
                            }
                         
                        });


                        // console.log(arry)
                        this.allElementTest.push(arry)
                    }
                    console.log(this.allElementTest)
                    this.elementItem = this.allElementTest[0][0].id
                    this.getQuery()


                    // console.log(this.selectTopic)
                    // console.log(this.allElementTest)
                    // 细分部分

                })
                
            })
        }else{

            this.$message.warning('无试卷数据')
        }
    }
}
</script>
<style  scoped scoped src="../../../assets/css/teacher_feeback.css">

</style>