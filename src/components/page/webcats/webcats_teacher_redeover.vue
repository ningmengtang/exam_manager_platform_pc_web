<template>
    <div>
        <div class="box">
            <div class="box_top">
                <div  class="box_top_title">
                    <h4>今日任务</h4>
                </div>
                <div class="box_top_schedule">
                    <p>总进度：150/300</p>
                </div>
                <div class="box_top_card">
                    <div class="card" v-for="(item,index) in allTopic">
                        <p>
                            正在批阅【 第 <span v-for="(group,i) in item.groupQuestionArr" v-html="i==item.groupQuestionArr.length-1?group.no:group.no+'、'"></span> 小题 】
                        </p>
                        <p>{{item.list.finish_count}}/{{item.list.count}}</p>
                    </div>
                </div>
                <div class="box_top_paper">
                    <p>{{importPaper.title}}</p>
                    <div class="box_top_paper_tap">
                        <div class="label" v-for="card in importPaper.tag_list">{{card.text}}</div>
                </div>
            </div>
        </div>
    </div>
        <div class="box_left" v-if="!isOver">
            <div class="box_canvas">
                <vueCanvas></vueCanvas>
            </div>
            <div class="box_count">
               <div class="box_total" v-for="item in NowSelectItem.groupQuestionArr">
                    <div class="title" >
                        <h5>第{{item.no}}题(满分{{item.score}}分），得分：{{item.setgetNum}}分</h5>
                        <el-radio-group v-model="item.setgetNum" style="margin-top:10px" @change="handChange">
                            <el-radio-button :label="0">0分</el-radio-button>
                            <el-radio-button :label="3">3分</el-radio-button>
                            <el-radio-button :label="item.score">满分</el-radio-button>
                        </el-radio-group>

                    </div>
                    
               </div>
               <div class="totalNum">
                    <div class="num">
                        合计：<span style="font-size:20px;color:#2BBB61">{{total}}分</span>
                    </div>
                    <div class="totalCount">
                        <p >第{{selectNo}}小题</p>
                        <p> 满分：{{alltotal}}分 </p>  
                        <p>合计：{{total}}分</p> 
                    </div>
               </div>
               <div class="buttom">
                   <el-button size="medium" class="last">上一题</el-button>
                   <el-button size="medium" class="reset">重置</el-button>
                   <el-button size="medium" class="next">下一题</el-button>
               </div>
            </div>
        </div>

        <div class="paper_over" v-if="isOver">
            <div class="over_content">   
                <h4>明天任务预览（300）</h4>
                <div class="over_buttom">
                    <div class="card" v-for="i in 3">
                        <p >第四题（30、31小题）</p>
                        <p>150/300</p>
                    </div>
                </div>
                <div class="img">
                    <img src="../../../assets/img/overPaper.png" alt="">
                   
                </div>
                 <div class="img_p">
                        <h2>
                            阅卷完成，真棒！
                        </h2> 
                        <p>
                            您已经按时完成了今天所有的阅卷任务。
                        </p>
                </div>   
                <div class="img_buttom">
                    <el-button size="medium " class="back">返回首页</el-button>
                </div>       
            </div>
        </div>
    </div>
</template>
<script>
import vueCanvas from "@/components/page/vueCanvas.vue"
import {
    TeacherQuestionList,
    apiCommonExamSeleElementTestById,
    studentQuestionList
	} from '@/api/api.js'
export default {
    components:{
        vueCanvas
    },
    data(){
        return{
            importPaper:'',
            isOver:false,
            elementTest:'',
            topicList:[],
            allTopic:[],
            selectNum:0,
            NowSelectItem:[],
            total:0,
            alltotal:0,
            selectNo:[]
        }
    },
    methods:{
        handChange(){
            this.$forceUpdate();
            this.getAllTotal()
            // console.log(this.NowSelectItem)
        },
        getAllTotal(){
            this.total = 0
            this.alltotal = 0
            this.selectNo = []
            let list  = this.NowSelectItem.groupQuestionArr 
            for(var i=0;i<list.length;i++){
                console.log(list)
                this.alltotal = this.alltotal + list[i].score
                this.total = this.total + list[i].setgetNum
                this.selectNo.push(list[i].no)
            }
        }
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }

        TeacherQuestionList({
            "teacher_id":localStorage.getItem('userID'),
            "paper_id":this.importPaper.paper_id,

        }).then(res=>{
            let list = res.data.data.list
            if(list){
                apiCommonExamSeleElementTestById(this.importPaper.paper_id).then(res=>{
                    this.elementTest =JSON.parse(res.data.data.elementTest)
                    let elementTestItems = this.elementTest.items
                    this.topicList= []
                    for(var i=0;i<elementTestItems.length;i++){
                        let item  = elementTestItems[i].items
                        let arry = []
                        for(var k=0;k<item.length;k++){
                            let groupQuestionArr = item[k].items
                            groupQuestionArr.forEach(element => {
                                if(element.groupQuestionArr){
                                    arry.push(element)
                                }
                            });
                        }
                        this.topicList =  this.topicList.concat(arry)
                    }
                    this.allTopic = []
                    for(var a=0;a<this.topicList.length;a++){
                        list.forEach(element => {
                            if(element.question_id == this.topicList[a].id){
                                this.allTopic.push({
                                    "groupQuestionArr":this.topicList[a].groupQuestionArr,
                                    "list":element
                                })
                                
                            }           
                        });   
                    }

                    // 读当前为那道题目
                    // 初始为第一题
                    this.NowSelectItem = this.allTopic[this.selectNum]
                    for(var b=0;b<this.NowSelectItem.groupQuestionArr.length;b++){
                        let item = this.NowSelectItem.groupQuestionArr[b]
                        item.setgetNum = 3
                    }
                    this.getAllTotal()
                    // console.log(this.NowSelectItem)
                })
            }else{
                this.$message.warning('请先分配任务')
            }
        })

        studentQuestionList({
            "paper_id":102,
            "question_id":[272],
            "teacher_id":localStorage.getItem('userID')
            // "status":2
        }).then(res=>{
            console.log(res)
        })
        // 获取学生题目
        studentQuestionList({
            "paper_id":102,
            "question_id":[272],
            "teacher_id":localStorage.getItem('userID'),
            "status":0
        }).then(res=>{
            console.log(res)
        })
    }
}
</script>
<style scoped src="../../../assets/css/teacher_redeover.css"></style>