<template>
    <div>
        <div class="box">
            <div class="box_top">
                <div  class="box_top_title">
                    <h4>任务</h4>
                </div>
                <div class="box_top_schedule">
                    <!-- <p>总进度：150/300</p> -->
                </div>
                <div class="box_top_card">
                    <div class="card" v-for="(item,index) in allTopic" :class="index==selectNum?'iscard':''">
                        <p>
                            {{item.status}}【 第 <span v-for="(group,i) in item.groupQuestionArr" v-html="i==item.groupQuestionArr.length-1?group.no:group.no+'、'"></span> 小题 】
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
                <vueCanvas :urlSrc="urlSrc" :ispush="ispush" @getUrlBlob="getUrlBlob"  @NogetUrlBlob="NogetUrlBlob" @openPic="openPic"></vueCanvas>
            </div>
            <div class="box_count">
               <div class="box_total" v-for="(item,i) in NowSelectItem.groupQuestionArr">
                    <div class="title" >
                        <h5>第{{item.no}}题(满分{{item.score}}分），得分：{{item.setgetNum}}分</h5>
                        <el-radio-group v-model="item.setgetNum" style="margin-top:10px" @change="handChange(i)">
                            <el-radio-button :label="0">0分</el-radio-button>
                            <el-radio-button :label="3">3分</el-radio-button>
                            <el-radio-button :label="item.score">满分</el-radio-button>
                            <el-input class="getNumclass" type="number" v-model="getNum[i]" placeholder="自定义" @change="changeCustom(item,i)"></el-input>
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
                   <el-button size="medium" class="last" @click="lastTopic">上一题</el-button>
                   <el-button size="medium" class="reset">重置</el-button>
                   <el-button size="medium" class="next" @click="nextTopic">下一题</el-button>
               </div>
            </div>
        </div>

        <div class="paper_over" v-if="isOver">
            <div class="over_content">   
                <!-- <h4>明天任务预览（300）</h4>
                <div class="over_buttom">
                    <div class="card" v-for="i in 3">
                        <p >第四题（30、31小题）</p>
                        <p>150/300</p>
                    </div>
                </div> -->
                <div class="img">
                    <img src="../../../assets/img/overPaper.png" alt="">
                   
                </div>
                 <div class="img_p">
                        <h2>
                            阅卷完成，真棒！
                        </h2> 
                        <p>
                            您已经按时完成了所有的阅卷任务。
                        </p>
                </div>   
                <div class="img_buttom">
                    <el-button size="medium " class="back" @click="goback">返回首页</el-button>
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
    studentQuestionList,
    studentQuestionteacherFile,
    getTeacherPaperfinishQuestionArr,
    teacherQuestionResetBefore,
    studentQuestiongetImageListSn
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
            selectNo:[],
            nowQuestion:[],
            urlSrc:'',
            getNum:[],
            ispush:1,
            is_typical_case:0,
            isNext:true,
            oldTaskList:[],
            srcList:[]
        }
    },
    methods:{
        handChange(i){
            this.getNum[i] = ''
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
                this.alltotal = this.alltotal + list[i].score
                this.total = this.total + list[i].setgetNum
                this.selectNo.push(list[i].no)
            }
        },
        goback(){
            this.$router.push('webcats_leader_teacher_index')
        },

        // 查看图片
        openPic(){
            // console.log('asdas')
            
        },
        // 改变自定义分数
        changeCustom(item,i){
            let num = this.getNum[i]
            if(num > item.score){
                this.getNum[i] = item.setgetNum
                this.$message.warning('自定义分数不能超过满分！')
            }else {
                item.setgetNum =  Number(num)
                
            }
            this.$forceUpdate(); 
            this.getAllTotal()
        },
        // 上一题
        lastTopic(){
            if(this.oldTaskList.length == 0){
                this.$message.warning('没有上一条题数据！')
            }else{
                let oldTask  =  this.oldTaskList[this.oldTaskList.length-1]
              
                let nowId = []
                for(var i=0;i<this.nowQuestion.length;i++){
                    nowId.push(this.nowQuestion[i].id)
                }
                // console.log(nowId)

                
                teacherQuestionResetBefore({
                    "student_with_question_id":oldTask,
                    "current_question_id":nowId
                }).then(res=>{
                    console.log(res)
                    if(res.data.result){
                        this.oldTaskList.pop()

                        // 获取当前老师需要批该的任务
                        this.getNowTeacherCheck()
                        this.ispush = 1
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        // 下一题
        nextTopic(){
            // 触发子节点将canvas转成base64
            this.ispush = 2
            // this.
            // console.log('下一题')
        },
        NogetUrlBlob(){
            this.ispush = 1
        },
        // 子节点返回base64图片
        getUrlBlob(data){
            let alllist = this.NowSelectItem.groupQuestionArr
            let promiseArr = []
             // 存储上一条的数据
            let oldTopic = []
            // 扫描上传
            if(this.is_sheet_upload){
                let selectData = data[0]
                let formData = new FormData()
                let fileName = new Date().getTime() +'.png'
                formData.append('file',this.dataURLtoFile(selectData.teacherImg,fileName))
                for(var j=0;j<selectData.question_id.length;j++){
                    let item = selectData.question_id[j]
                    let itemId = selectData.dataId[j]
                    // console.log(itemId)
                    for(var k=0;k<alllist.length;k++){
                        if(alllist[k].id == item){
                            
                           
                            promiseArr.push(this.NextWaitPromise(itemId,selectData.radioType,alllist[k].setgetNum,formData,oldTopic))
                        }
                    }
                }
            }
            // 非扫描上传
            
            else{
                console.log(data)
                for(var i=0;i<data.length;i++){
                    let formData = new FormData()
                    let fileName = new Date().getTime() +'.png'
                    formData.append('file',this.dataURLtoFile(data[i].teacherImg,fileName))
                    
                    for(var k=0;k<alllist.length;k++){
                        if(alllist[k].id == data[i].question_id){
                            // console.log('上传文件')
                            // console.log(data[i].teacherImg)
                            promiseArr.push(this.NextWaitPromise(data[i].student_with_question_id,data[i].radioType,alllist[k].setgetNum,formData,oldTopic))
                        }
                    }
                }
            }
            Promise.all(promiseArr).then(res=>{
                // 获取当前老师需要批该的任务
                // 记录上一题信息
                // 去重
                var resList= []
                for(var i=0;i<oldTopic.length;i++){
                    var current = oldTopic[i]
                    if(resList.indexOf(current) === -1){
                        resList.push(current)
                    }
                }
                this.oldTaskList.push(resList)
                this.getNowTeacherCheck()
                this.ispush = 1
            }).catch((err)=>{
                this.$message.error('批改失败')
            })
        },
        NextWaitPromise(id,radio,setgetNum,formData,oldTopic){
            return new Promise((resolve,reject)=>{
                studentQuestionteacherFile(id,radio,setgetNum,formData).then(res=>{
                    console.log(res)
                    oldTopic.push(res.data.data.student_with_question.id)
                  
                    resolve(res)
                }).catch(error=>{
                    console.log(error)
                })
            })
        },
        //将base64转换为文件
		dataURLtoFile(dataurl,fileName) {
		    var arr = dataurl.split(','),
		    bstr = atob(arr[1]),
		    n = bstr.length,
		    u8arr = new Uint8Array(n)
		    while (n--) {
		        u8arr[n] = bstr.charCodeAt(n)
            }
            console.log(1212)
		    return new File([u8arr], fileName , {
		        type: 'image/png'
		    })
        },
        getQuestiongetImageList(sn,question_id){
            return new Promise((resolve,reject)=>{
                studentQuestiongetImageListSn(sn).then(res=>{
                    if(res.data.data){                           
                        let data = res.data.data
                        console.log(data)
                        
                        data.forEach(ele=> {
                            ele.question_id = question_id
                            this.urlSrc.push(ele)
                        });
                    }else{
                        this.$message.warning('暂无试题图片')
                    }
                resolve(res)
                }).catch(error=>{
                    console.log(error)
                })
            })
        },
        issheetuploadgetQuestiongetImageList(sn,question_id,getAll){
            return new Promise((resolve,reject)=>{
                studentQuestiongetImageListSn(sn).then(res=>{
                    if(res.data.data){                           
                        let data = res.data.data
                        // console.log(data)
                        
                        data.forEach(ele=> {
                            ele.question_id = question_id
                            getAll.push(ele)
                        });
                    }else{
                        this.$message.warning('暂无试题图片')
                    }
                resolve(res)
                }).catch(error=>{
                    console.log(error)
                })
            })
        },
        getNowTeacherCheck(){
            // 获取当前老师需要批该的任务
            TeacherQuestionList({
                "teacher_id":localStorage.getItem('userID'),
                "paper_id":this.importPaper.paper_id,
            }).then(res=>{
                let list = res.data.data.list
                console.log(list)
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
                        console.log(list)
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
                        console.log(this.allTopic)
                        for(var j=0;j<list.length;j++){
                            // 这题已完成
                            if(list[j].finish_count >= list[j].count ){
                                console.log('批阅完成')
                                for(let k=0;k<this.allTopic.length;k++){
                                    console.log(this.allTopic[k])
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '批阅完成'
                                        break
                                    }
                                }
                                //正在批阅 
                            }else if( list[j].finish_count > 0  && list[j].finish_count < list[j].count ){
                                console.log('正在批阅')

                                
                                for(let k=0;k<this.allTopic.length;k++){
                                     console.log(this.allTopic[k])
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '正在批阅'
                                        break
                                    }
                                }
                                // 待批阅
                            }else if(list[j].finish_count == 0 ){
                                console.log('待批阅')
                                for(let k=0;k<this.allTopic.length;k++){
                                     console.log(this.allTopic[k])
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '待批阅'
                                        break
                                    }
                                }
                            }else{
                                 console.log('暂无')
                                for(let k=0;k<this.allTopic.length;k++){
                                    console.log(this.allTopic[k])
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '待批阅'
                                        break
                                    }
                                }
                            }
                        
                        }

                        for (let index = 0; index < this.allTopic.length; index++) {
                            if(this.allTopic[index].status == '正在批阅'){
                                this.selectNum = index
                                break
                            }else if(this.allTopic[index].status == '待批阅'){
                                this.selectNum = index
                                break
                            }else if(this.allTopic[this.allTopic.length -1].status == '批阅完成'){
                            
                                this.selectNum = '批阅完成'
                            }


                        }
                        this.$forceUpdate(); 
                        // 读当前为那道题目
                        // 初始为第一题
                        if(this.selectNum == '批阅完成'){
                            this.isOver = true
                            this.$message.warning('全部批阅完成')

                        }else{
                            console.log(this.allTopic)
                            console.log(this.selectNum)
                            this.NowSelectItem = this.allTopic[this.selectNum]

                            console.log(this.NowSelectItem)



                            this.getNum = []
                            for(var b=0;b<this.NowSelectItem.groupQuestionArr.length;b++){
                                let item = this.NowSelectItem.groupQuestionArr[b]
                                item.setgetNum = 3
                                this.getNum.push('')
                            }
                            this.getAllTotal()


                            // 获取学生的试题id
                            let question_id = []
                            this.NowSelectItem.groupQuestionArr.forEach(element => {
                                question_id.push(element.id)
                            });

                            // console.log(this.NowSelectItem)
                            // 获取学生的试题
                            studentQuestionList({
                                "paper_id":this.importPaper.paper_id,
                                "question_id":question_id,
                                "teacher_id":localStorage.getItem('userID'),
                                "status":2
                            }).then(res=>{
                                // 上次没修改完成的试题
                                // console.log(res)
                                if(res.data.data){
                                    
                                    this.nowQuestion = res.data.data.list
                                   
                                    // 判断几张试卷
                                    this.is_sheet_upload = true
                                    for(let i=0;i<this.nowQuestion.length;i++){
                                        if(!this.nowQuestion[i].is_sheet_upload){
                                            this.is_sheet_upload = false
                                        }
                                    }
                                    

                                    this.urlSrc = []
                                    console.log(this.is_sheet_upload)
                                    if(this.is_sheet_upload){
                                        let promiseArr = []
                                        let getAll = []
                                        for(var k=0;k<this.nowQuestion.length;k++){
                                            promiseArr.push(this.issheetuploadgetQuestiongetImageList(this.nowQuestion[k].sn,this.nowQuestion[k].question_id,getAll))
                                        }
                                        Promise.all(promiseArr).then(res=>{
                                            this.urlSrc.push(getAll[0])
                                            let question_id = []
                                            let dataId = []
                                        
                                            for(var k=0;k<this.nowQuestion.length;k++){
                                                question_id.push(this.nowQuestion[k].question_id)
                                                dataId.push(getAll[k].student_with_question_id)
                                            }
                                            this.urlSrc[0].dataId = dataId
                                            this.urlSrc[0].question_id = question_id

                                        })

                                    }else{
                                        let promiseArr = []
                                        for(var k=0;k<this.nowQuestion.length;k++){
                                            promiseArr.push(this.getQuestiongetImageList(this.nowQuestion[k].sn,this.nowQuestion[k].question_id))
                                        }
                                        Promise.all(promiseArr).then(res=>{
                                        })
                                    }

                                }else{
                                    
                                    // 获取学生题目
                                    studentQuestionList({
                                        "paper_id":this.importPaper.paper_id,
                                        "question_id":question_id,
                                        "teacher_id":localStorage.getItem('userID'),
                                        "status":0
                                    }).then(res=>{
                                        console.log(res)
                                        if(res.data.data){
                                            this.nowQuestion = res.data.data.list
                                       
                                            // 判断几张试卷
                                            this.is_sheet_upload = true
                                            
                                            for(let i=0;i<this.nowQuestion.length;i++){
                                                if(!this.nowQuestion[i].is_sheet_upload){
                                                    this.is_sheet_upload = false
                                                }
                                            }
                                            

                                            this.urlSrc = []
                                            console.log(this.is_sheet_upload)
                                            if(this.is_sheet_upload){
                                                let promiseArr = []
                                                let getAll = []
                                                for(var k=0;k<this.nowQuestion.length;k++){
                                                    promiseArr.push(this.issheetuploadgetQuestiongetImageList(this.nowQuestion[k].sn,this.nowQuestion[k].question_id,getAll))
                                                }
                                                Promise.all(promiseArr).then(res=>{
                                                    this.urlSrc.push(getAll[0])
                                                    let question_id = []
                                                    let dataId = []
                                                
                                                    for(var k=0;k<this.nowQuestion.length;k++){
                                                        question_id.push(this.nowQuestion[k].question_id)
                                                        dataId.push(getAll[k].student_with_question_id)
                                                    }
                                                    this.urlSrc[0].dataId = dataId
                                                    this.urlSrc[0].question_id = question_id

                                                })

                                            }else{
                                                let promiseArr = []
                                                for(var k=0;k<this.nowQuestion.length;k++){
                                                    promiseArr.push(this.getQuestiongetImageList(this.nowQuestion[k].sn,this.nowQuestion[k].question_id))
                                                }
                                                Promise.all(promiseArr).then(res=>{
                                                })
                                            }
                                        }else{
                                            
                                            this.$message.warning('修改完成。')
                                        }

                                    })
                                }
                            })
                        }
                    })
                }else{
                    this.$message.warning('请先分配任务')
                }
            }) 
        }
    },
    mounted(){

        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }
        this.getNowTeacherCheck()
    },
    watch:{
        selectNum:function(){
            console.log(1212)
        }
    }
}
</script>
<style scoped src="../../../assets/css/teacher_redeover.css"></style>