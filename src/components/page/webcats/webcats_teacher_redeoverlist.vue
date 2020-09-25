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
                <el-button class="left_box_button_text" @click="goAllocation">重新分配任务</el-button>
                
                <el-button class="left_box_button_text back" @click="goback">返回菜单</el-button>
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
            
        </div>
        <div class="right_box">
            <div class="right_box_title">
                <h3>阅卷进度一览（{{teacherTasklist.length}}人）</h3>
            </div>
            <!-- <div class="right_box_residue">
                <el-button class="right_box_residue_button">
                     立即导入答题卡
                </el-button>
                <el-progress :percentage="50"></el-progress>
            </div> -->
            <div class="right_box_residue">
                <div class="right_box_teacher" v-for="i in teacherTasklist">
                    <div class="radius">
                        <span>{{  (i.finish_count/i.count).toFixed(2) * 100 +'%' }}</span>
                    </div>
                    <p>{{i.teacher_name}}</p>
                </div>
            </div>
            <div class="right_box_report">
                <div class="right_box_title">
                    <h3>异常卷报告（{{paperListindex}}个未处理）</h3>
                </div>
                <el-row :gutter="20" class="right_box_card">
                    <el-col :span="8" v-for="(item,i) in paperList" >
                        <div class="card_info" @click="clickCard(item)">
                            <div class="card_info_top">
                                <div class="card_img">
                                    <img :src="'/api/student/question/getImage/'+ item.item_imgs[0].id+ '?id=1'" >
                                </div>
                                <div class="card_title">
                                    <p >第 {{i+1}}题</p>
                                    <p style="color:#999999"> {{item.teacher_name}}</p>
                                </div>
                               
                                <div  class="discarde_title">
                                    图像异常
                                </div>
                            </div>
                            <div class="card_info_time">
                                {{item.create_date}}
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


        <el-dialog
            title="编辑试题"
            :visible.sync="dialogVisible"
            class="dialog">
            <el-form  label-width="120px">
                <el-form-item label="原试题：">
                    <el-image 
                        style="width: 180px; height: 60px"
                        :src="srcList[0]" 
                        :preview-src-list="srcList">
                    </el-image>
                </el-form-item>
                <!-- <el-form-item label="上传批改试题：">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :http-request="uploadFile"
                        >
                         <i  class="el-icon-plus avatar-uploader-icon" style="line-height: 120px;"></i>
                     
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="得分：">
                    <el-input-number v-model="paperErrList.score " @change="handleChangeNum" :min="0" style="widtn:180px"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getCorrectRateByPaperId,
    TeacherQuestionList,
    TeacherQuestionReset,
    selectTeacheresCountAndUpdateCount,
    TeacherTaskUpdate,
    studentQuestionList,
    studentQuestionSelect,
    studentQuestionSelectImg,
    TeacherQuestionUpdate,
    studentQuestionUpdate
	} from '@/api/api.js'
export default {
    data(){
        return{
            startTime:'',
            endTime:'',
            importPaper:'',
            pageSize:9,
            total:0,
            currentPage:1,
            pageNum:1,
            paperListindex:0,
            dialogVisible:false,

            teacherTasklist:{

            },
            importPaper:{
                "start_time":'',
                "over_time":'',
                "examinationPaper":{
                    "tag_list":[],
                    "title":'',
                    "examExplain":''
                }
            },
            already_count:0,
            already:0,
            residue:0,
            count:0,
            paperList:[],


            radio:'',
            colors: ['#fef4ac', '#0018ba', '#ffc200', '#f32f15', '#cccccc', '#5ab639'],
            brushs: [{
            className: 'small fa fa-paint-brush',
            lineWidth: 3
            }, {
            className: 'middle fa fa-paint-brush',
            lineWidth: 6
            }, {
            className: 'big fa fa-paint-brush',
            lineWidth: 12
            }],
            // url: require('../../assets/img/fangda.png'),
            srcList: [
            
            ],
            context:{},
            imgUrl: [],
            canvasMoveUse: false,
            // 存储当前表面状态数组-上一步
            preDrawAry: [],
            // 存储当前表面状态数组-下一步
            nextDrawAry: [],
            // 中间数组
            middleAry: [],
            // 试卷参数
            paperErrList:[],
            // 配置参数
            config: {
            lineWidth: 1,
            lineColor: '#f2849e',
            shadowBlur: 2
            },
            img:'',

            }
    },
    created () {
      this.$emit('setNav', '在线涂鸦画板')

    },
    computed: {
      controls () {
        return [{
          title: '上一步',
          action: 'prev',
          className: this.preDrawAry.length ? 'active fa fa-reply' : 'fa fa-reply',
        }, {
          title: '下一步',
          action: 'next',
          className: this.nextDrawAry.length ? 'active fa fa-share' : 'fa fa-share'
        }, {
          title: '清除',
          action: 'clear',
          className: (this.preDrawAry.length || this.nextDrawAry.length) ? 'active fa fa-trash' : 'fa fa-trash'
        }]
      }
    },
    methods:{
        handleSizeChange(val) {
			this.pageSize = val
			studentQuestionSelectImg({
				"paper_id":this.importPaper.paper_id,
                "is_typical_case":3,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
                
				this.paperList = res.data.data.list
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
		handleCurrentChange(val) {
							
			this.pageNum = val;
			studentQuestionSelectImg({
				"paper_id":this.importPaper.paper_id,
                "is_typical_case":3,
                "pageSize":this.pageSize,
                "pageNum":this.pageNum
			}).then(res=>{
                this.paperList = res.data.data.list
               
				this.total= res.data.data.total
				this.currentPage= res.data.data.pageNum
			})
		},
        goback(){
            this.$router.push('webcats_leader_teacher_index')
        },
        // 重新分配任务
        goAllocation(){
            this.$confirm('此操作将重置全部老师的分配任务?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                TeacherQuestionReset(this.importPaper.id).then(res=>{
                    if(res.data.result){
                        TeacherTaskUpdate({
                            "id":this.importPaper.id,
                            "status":1
                        }).then(res=>{
                            if(res.data.result){
                                this.$message.success('重置成功,请前往分配老师。')
                                this.$router.push('webcats_teacher_allocation')
                            }else{
                                this.$message.error('出错了')
                            }
                        })
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }).catch(() => {

            });
           
            // this.$router.push('webcats_teacher_allocation')
        },
        // 处理异常卷
        clickCard(data){
            this.dialogVisible = true
            this.srcList = []
            this.paperErrList = data
            console.log(data)
            for(var i=0;i<data.item_imgs.length;i++){
                let item = data.item_imgs[i].id
                this.srcList.push('/api/student/question/getImage/' +item+'?id=1'+"&d=" + new Date().getTime())
            }
            

            console.log(this.paperErrList)
        },
        uploadFile(){
            
        },
        // 更改得分
        handleChangeNum(){

        },
        // 提交
        pushUpdate(){
            // console.log(this.paperErrList.score)
            studentQuestionUpdate({
                "id":this.paperErrList.id,
                "score":this.paperErrList.score,
                "is_typical_case":0
            }).then(res=>{
                if(res.data.result){
                    this.$message.success('操作成功')
                    this.dialogVisible = false
                    studentQuestionSelectImg({
                        "paper_id":this.importPaper.paper_id,
                        "is_typical_case":3,
                        "pageSize":this.pageSize,
                        "pageNum":this.pageNum
                    }).then(res=>{
                        this.paperList = res.data.data.list
                    
                        this.total= res.data.data.total
                        this.currentPage= res.data.data.pageNum
                    })
                }else{
                    this.$message.error('操作失败')
                }
                // console.log(res)
            })
        },
        removeImg (src) {
            this.imgUrl = this.imgUrl.filter(item => item !== src)
        },
        isPc () {
            const userAgentInfo = navigator.userAgent
            const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
            let flag = true
            for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false
                break
            }
            }
            return flag
        },
        
        initDraw () {
            const preData = this.context.getImageData(0, 0, 600, 400)
            // 空绘图表面进栈
            this.middleAry.push(preData)
        },
        canvasMove (e) {
            if (this.canvasMoveUse) {
            console.log('canvasMove')
            const t = e.target
            let canvasX
            let canvasY
            if (this.isPc()) {
                canvasX = e.clientX - t.parentNode.offsetLeft
                canvasY = e.clientY - t.parentNode.offsetTop - 44 
            } else {
                canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft
                canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop - 44
            }
            this.context.lineTo(canvasX, canvasY)
            this.context.stroke()
            }
        },
        beginPath (e) {
            const canvas = document.querySelector('#canvas')
            if (e.target !== canvas) {
            console.log('beginPath')
            this.context.beginPath()
            }
        },
        // mouseup
        canvasUp (e) {
            console.log('canvasUp')
            const preData = this.context.getImageData(0, 0, 600, 400)
            if (!this.nextDrawAry.length) {
            // 当前绘图表面进栈
            this.middleAry.push(preData)
            } else {
            this.middleAry = []
            this.middleAry = this.middleAry.concat(this.preDrawAry)
            this.middleAry.push(preData)
            this.nextDrawAry = []
            }
            this.canvasMoveUse = false
        },
        // mousedown
        canvasDown (e) {
            console.log('canvasDown')
            this.canvasMoveUse = true
            // client是基于整个页面的坐标
            // offset是cavas距离顶部以及左边的距离
            const canvasX = e.clientX - e.target.parentNode.offsetLeft
            const canvasY = e.clientY - e.target.parentNode.offsetTop -44
            this.setCanvasStyle()
            // 清除子路径
            this.context.beginPath()
            this.context.moveTo(canvasX, canvasY)
            console.log('moveTo', canvasX, canvasY)
            // 当前绘图表面状态
            const preData = this.context.getImageData(0, 0, 600, 400)
            // 当前绘图表面进栈
            this.preDrawAry.push(preData)
        },
        // 设置颜色
        setColor (color) {
            this.config.lineColor = color
        },
        // 设置笔刷大小
        setBrush (type) {
            this.config.lineWidth = type
        },
        // 操作
        controlCanvas (action) {
            switch (action) {
            case 'prev':
                if (this.preDrawAry.length) {
                const popData = this.preDrawAry.pop()
                const midData = this.middleAry[this.preDrawAry.length + 1]
                this.nextDrawAry.push(midData)
                this.context.putImageData(popData, 0, 0)
                }
                break
            case 'next':
                if (this.nextDrawAry.length) {
                const popData = this.nextDrawAry.pop()
                const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2]
                this.preDrawAry.push(midData)
                this.context.putImageData(popData, 0, 0)
                }
                break
            case 'clear':
                var that = this
                const canvas = document.querySelector('#canvas')
                that.context = canvas.getContext('2d')

                var cW = document.getElementById('canvas').width
                var cH = document.getElementById('canvas').height
                
                var imgObj = new Image()
                imgObj.src = '/api/student/question/getImage/' + this.urlSrc+'?id=1'+"&d=" + new Date().getTime()
                console.log(imgObj.src)
                var imgW = ""
                var imgH = ""
                imgObj.onload = function(){
                    imgW = imgObj.width
                    imgH = imgObj.height
                    // 在canvas绘制前填充白色背景
                    that.context.fillStyle = "#fff";
                    that.context.fillRect(0, 0, cW, cH)
                    that.context.drawImage(this,0,(cH-imgH * cW/imgW)/2,cW,imgH*cW/imgW)
                }
                // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                this.preDrawAry = []
                this.nextDrawAry = []
                this.middleAry = [this.middleAry[0]]
                break
            }
        },
        // 生成图片
        getImage () {
            console.log('生成图片成功')
            const canvas = document.querySelector('#canvas')
            var ctx=canvas.getContext("2d"); 
            ctx.fillStyle="#E992B9";
            ctx.lineWidth=1;
            // ctx.fillText(str,0,20); 
            const src = canvas.toDataURL('image/png')
            this.radio = ''
            // this.$emit('getUrlBlob',src,this.radio)
        },
        // 设置绘画配置
        setCanvasStyle () {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      },
    },
    mounted(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }
        studentQuestionSelectImg({
            "paper_id":this.importPaper.paper_id,
            "is_typical_case":3,
            "pageSize":this.pageSize,
            "pageNum":this.pageNum
        }).then(res=>{
            
            this.paperList = res.data.data.list
			this.total= res.data.data.total
            this.currentPage= res.data.data.pageNum
            this.paperListindex = this.paperList.length
        })
        // 查看试卷批阅进度
        getCorrectRateByPaperId(this.importPaper.paper_id).then(res=>{
            // console.log(res)
            if(res.data.data){
                let data = res.data.data
                this.already_count = (data.already_count / data.count).toFixed(2) * 100 
                this.already = data.already_count
                this.residue = data.residue_count
                this.count = data.count
                if(data.residue_count == 0){
                    TeacherTaskUpdate({
                        "id":this.importPaper.id,
                        "status":4
                    })
                }
            }else{
                this.$message.warning('查询不到批阅进度')
            }
        })
        // 查看分配老师进度
        // console.log(this.importPaper)
        selectTeacheresCountAndUpdateCount(this.importPaper.id).then(res=>{
            if(res.data.data){
               
                this.teacherTasklist = res.data.data
            }else{

                this.$message.warning('请分配老师')
            }
        })


        
    }
}
</script>
<style scoped src="../../../assets/css/teacher_import.css"></style>