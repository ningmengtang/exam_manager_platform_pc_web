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
                    <div class="card" v-for="i in 3">
                        <p >第四题（30、31小题）</p>
                        <p>150/300</p>
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
               <div class="box_total">
                    <div class="title">
                        <h5>30题(满分5分），得分：3分</h5>
                        <el-radio-group v-model="radio1" style="margin-top:10px">
                            <el-radio-button label="0分"></el-radio-button>
                            <el-radio-button label="3分"></el-radio-button>
                            <el-radio-button label="满分"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="title">
                        <h5>30题(满分5分），得分：3分</h5>
                        <el-radio-group v-model="radio1" style="margin-top:10px">
                            <el-radio-button label="0分"></el-radio-button>
                            <el-radio-button label="3分"></el-radio-button>
                            <el-radio-button label="满分"></el-radio-button>
                        </el-radio-group>
                   </div>
                   <div class="title">
                        <h5>30题(满分5分），得分：3分</h5>
                        <el-radio-group v-model="radio1" style="margin-top:10px">
                            <el-radio-button label="0分"></el-radio-button>
                            <el-radio-button label="3分"></el-radio-button>
                            <el-radio-button label="满分"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="title">
                        <h5>30题(满分5分），得分：3分</h5>
                        <el-radio-group v-model="radio1" style="margin-top:10px">
                            <el-radio-button label="0分"></el-radio-button>
                            <el-radio-button label="3分"></el-radio-button>
                            <el-radio-button label="满分"></el-radio-button>
                        </el-radio-group>
                   </div>
               </div>
               <div class="totalNum">
                    <div class="num">
                        合计：9分
                    </div>
                    <div class="totalCount">
                        <p>第4大题题（30、31小题）</p>
                        <p>满分：15分 </p>  
                        <p>合计：9分</p> 
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
export default {
    components:{
        vueCanvas
    },
    data(){
        return{
            importPaper:'',
            isOver:false
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
<style scoped src="../../../assets/css/teacher_redeover.css"></style>