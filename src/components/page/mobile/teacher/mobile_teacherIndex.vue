<template>
    <div class="home">
       <van-nav-bar
            title="标题"
            left-text="返回"
            left-arrow
            @click-right="onClickRight"
        />
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
            <!-- <div class="">

            </div> -->
        </div>
        <Tabbar /> 
    </div>
</template>
<script>
import Tabbar from '../common/tabbar.vue'  
import {
    TeacherQuestionExamList
	} from '@/api/api.js'
export default {
    components: {
        Tabbar
    },
    data(){
        return{
            pageSize:1,
            pageNum:1,
            paperInfo:{
                "paper_title":null,
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    title:null,
                    tag_list:[]
                }
            }
        }
    },
    mounted(){
        // 查看所属试卷
        TeacherQuestionExamList({
            "id": this.obj,
            "pageSize": this.pageSize,
			"pageNum": this.pageNum
        }).then(res=>{

            this.paperInfo = res.data.data.list[0]
            console.log(this.paperInfo)
        })
    }

}
</script>
<style scoped>
.home{
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
<style scoped src="../../../../assets/css/mobile.css"></style>