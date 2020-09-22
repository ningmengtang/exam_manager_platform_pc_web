<template>
    <div class="home">
       <van-nav-bar
            title="首页"
        />
        <div style="height:100%">
            <div class="index_paper_info">
                <h4 style="color:#343434">{{paperInfo.paper_title}}</h4>
                <div class="label-box">
                    <div class="label" v-for="i in paperInfo.examinationPaper.tag_list">{{i.text }}</div>
                </div>
                <div class="time">
                    <span>开始时间：{{paperInfo.start_time}}</span>
                </div>
                <div class="time">
                    <span>结束时间：{{paperInfo.over_time}}</span>
                </div>

                <div class="index_paper_info_p">
                    考试已经正式结束，请注意批阅试卷。
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
                <van-pagination @change="changePage" v-model="currentPage"    :page-count="total" mode="simple"   />
                
            </div>
            <div class="index_paper_buttom">
                <van-button round type="primary" style="width:100%;" @click="openPerpar" v-if="paperInfo.status == 2 || paperInfo.status == 3">立即阅卷</van-button>
            </div>
           
        </div>
      
        <TabbarTeacher /> 
    </div>
</template>
<script>
import TabbarTeacher from '../common/tabbar_teacher.vue'  
import {
    TeacherQuestionExamList,
    getCorrectRateByPaperId
	} from '@/api/api.js'
export default {
    components: {
        TabbarTeacher
    },
    data(){
        return{
            pageSize:1,
            pageNum:1,
            id:'',
            paperInfo:{
                "paper_title":null,
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    title:null,
                    tag_list:[]
                }
            },
            currentPage: 1,
            total:0,
            already_count:0,
            already:0,
            residue:0,
            count:0
        }
    },
    mounted(){
        // 查看所属试卷
        TeacherQuestionExamList({
            "id": [],
            "pageSize": this.pageSize,
            "pageNum": this.pageNum
           
        }).then(res=>{
            this.currentPage = res.data.data.pageNum
            this.total = res.data.data.total
            this.paperInfo = res.data.data.list[0]
            // 查看试卷批阅进度
            getCorrectRateByPaperId(this.paperInfo.paper_id).then(res=>{
                if(res.data.data){
                    let data = res.data.data
                    this.already_count = (data.already_count / data.count).toFixed(2) * 100 
                    this.already = data.already_count
                    this.residue = data.residue_count
                    this.count = data.count
                }else{
                    this.$message.warning('查询不到批阅进度')
                }
            })
        })
       
        let teacherId = localStorage.getItem('userID')
        let roleList = JSON.parse(localStorage.getItem('roleList'))
        

		if(roleList && roleList.roleName == '教师组长' && roleList.teacherId == teacherId){
            localStorage.clear();
            this.$router.push('/login')
		}else{
			this.isLead = false
        }
        
        

    },
    methods:{
        // 改变页数
        changePage(){
            TeacherQuestionExamList({
                "id":[],
                "pageSize": this.pageSize,
                "pageNum": this.currentPage
            }).then(res=>{
                this.currentPage = res.data.data.pageNum
                this.paperInfo = res.data.data.list[0]
                this.total = res.data.data.total
                // 查看试卷批阅进度
                getCorrectRateByPaperId(this.paperInfo.paper_id).then(res=>{
                    if(res.data.data){
                        let data = res.data.data
                        this.already_count = (data.already_count / data.count).toFixed(2) * 100 
                        this.already = data.already_count
                        this.residue = data.residue_count
                        this.count = data.count
                    }else{
                        this.$message.warning('查询不到批阅进度')
                    }
                })
            })
        },
        onClickRight(){

        },
        // 立即阅卷
        openPerpar(){
            sessionStorage.setItem('importPaper', JSON.stringify(this.paperInfo))
			this.$router.push('mobile_checkIndex')
            // this.$router.push('/mobile_checkIndex')
        }
    }

}
</script>
<style scoped>
.home{
  background: #f5f5f5;
  min-height: 100vh;
  height: 100%;
overflow: hidden;
}
</style>
<style scoped src="../../../../assets/css/mobile.css"></style>