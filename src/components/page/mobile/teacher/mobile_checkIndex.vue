<template>
  <div style="height:100%">
    <van-empty description="请将屏幕旋转！" v-if="isTip && !isOver"></van-empty>
    <div class="inner draw" @mousemove="beginPath($event)" v-if="!isTip && !isOver">
      <!-- 操作 -->
      
      <div class="wrap">
          <div> 
              <van-button plain type="primary" style="float:left;margin:8px 0px 0px 8px " @click="goback">退出阅卷</van-button>
              <!-- <van-button type="primary" style="float:right;margin:8px 0px 0px 8px ">主要按钮</van-button>
              <van-button type="warning"style="float:right;margin:8px 0px 0px 8px "></van-button> -->
              <div class="box_top_card green" v-for="(item,index) in allTopic" :class="index==selectNum?'iscard':''">
                <!-- <div class="card" v-for="(item,index) in allTopic" :class="index==selectNum?'iscard':''">
                    <p>
                        {{item.status}}【 第 <span v-for="(group,i) in item.groupQuestionArr" v-html="i==item.groupQuestionArr.length-1?group.no:group.no+'、'"></span> 小题 】
                    </p>
                    <p>{{item.list.finish_count}}/{{item.list.count}}</p>
                </div> -->
                <div class="card" > 
                  <p>{{item.status}}【 第 <span v-for="(group,i) in item.groupQuestionArr" v-html="i==item.groupQuestionArr.length-1?group.no:group.no+'、'"></span> 题 】</p>
                  <p>{{item.list.finish_count}}/{{item.list.count}}</p>
                </div>
              </div>
              <!-- <div class="box_top_card warning">
                <div class="card" > 
                  <p>标识题目</p>
                  <p>（优、错、糊）</p>
                </div>
              </div> -->
          </div>
      <canvas 
          id="canvas" 
          class="fl" 
          width="600" 
          height="300" 
          @mousedown="canvasDown($event)" 
          @mouseup="canvasUp($event)"
          @mousemove="canvasMove($event)"
          @touchstart="canvasDown($event)" 
          @touchend="canvasUp($event)"
          @touchmove="canvasMove($event)"
        >
      </canvas>
        <div class="handle_bottom">
          <div class="control">
            <span title="上一步" class="fa-reply" @click="controlCanvas('prev')"></span>
            <span title="下一步" class="fa-share" @click="controlCanvas('next')"></span>
            <span title="清除" class="fa-trash " @click="controlCanvas('clear')"></span>
            <van-radio-group v-model="radio" direction="horizontal" @change="ChangeRadio" style="float:right;padding: 20px 0px;">
              <!-- <van-radio name="">正常试卷</van-radio> -->
              <van-radio name="1">优秀试卷</van-radio>
              <van-radio name="2">典型试卷</van-radio>
              <van-radio name="3">异常卷</van-radio>
            </van-radio-group>
          </div>
          <div>
          
          </div>

        </div>
      </div>
      
      <!--存放图片-->
      <div class="card-left"> 
        <div class="box_total" v-for="(item,i) in NowSelectItem.groupQuestionArr">
          <div class="title" >
              <h5 style="margin-bottom:10px">第{{item.no}}题(满分{{item.score}}分）</h5>
              <h5 >得分：{{item.setgetNum}}分</h5>
              <el-slider
                @change="changeSlider(i,item)"
                class="slider_card"
                :max="item.score"
                v-model="getNum[i]"
                >
              </el-slider>
          </div>

          <div class="card_bottom">
            <van-button type="warning" style="width:90%;margin-bottom:10px" @click="lastTopic">上一题</van-button>
            <van-button type="primary"  style="width:90%" @click="nextTopic">下一题</van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isOver" >
      <div>
          <van-button plain type="primary" style="margin:8px 0px 0px 8px " @click="goback">退出阅卷</van-button>
          <div class="img">
            <img src="../../../../assets/img/overPaper.png" alt="">     
          </div>
          <div class="img_p">
              <h2>
                阅卷完成，真棒！
              </h2> 
              <p>
                  您已经按时完成了所有的阅卷任务。
              </p>
          </div>
      </div>  
    </div>
  </div>
</template>

<style>
  @media screen and (max-width: 700px) {
    #img-box,
    #canvas-drawImage h5,
    #canvas-brush {
      display: none;
    }
    #canvas-drawImage button{
      width: auto;
      position: absolute;
      flex: 1;
    }
    .wrap #control {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      text-align: center;
    }
  }
  .custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 100px;
  }
  .operation{
      height: 120px;
      width: 100%;
  }
  .fix-body {
    position: fixed !important;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .inner.draw {
    display: flex;
    flex-direction: row;
  }
  .draw h5 {
    margin-bottom: 10px;
  }
  #img-box {
    flex: 1;
    padding-left: 10px;
  }
  #img-box .img-item {
    position: relative;
    display: inline-block;
  }
  #img-box .img-item .fa {
    position: absolute;
    cursor: pointer;
    right: 1px;
    top: -1px;
    font-size: 12px;
    font-weight: 1;
    display: none;
    color: #ccc;
  }
  #img-box .img-item:hover .fa {
    display: block;
  }
  #img-box .img-item .fa:hover {
    color: #f2849e;
  }
  #img-box img {
    border: 1px #ccc solid;
    width: 90px;
    height: 60px;
    margin: 5px;
  }
  .wrap{
    width: 600px;
    /* border: 1px #585858 solid; */
    overflow: hidden;
  }
  .fl{
    float: left;
    display: block;
  }
  #canvas{
    border-right: 1px #585858 solid;
    cursor: crosshair;
  }
  #control{
    width: 130px;
    height: 400px;
    margin-left: 4px;
  }
  #control div{
    padding: 5px;
  }
  #canvas-color ul{
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #canvas-color ul li{
    float: left;
    display: inherit;
    width: 13px;
    height: 13px;
    border: 3px #fff solid;
    margin: 8px;
    cursor: pointer;
  }
  #canvas-color .active {
    border: 1px solid #f2849e;
  }
  #canvas-brush span{
    display: inline-block;
    width: 20px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
  }
  #canvas-brush .small {
    font-size: 12px;
  }
  #canvas-brush .middle {
    font-size: 14px;
  }
  #canvas-brush .big {
    font-size: 16px;
  }
 
  #canvas-control span{
    display: inline-block;
    font-size: 14px;
    width: 20px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
  }
  #canvas-control .active,
  #canvas-brush .active {
    color: #f2849e;
  }
  .drawImage {
    width: 100px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }
  html{
    touch-action:none;
    touch-action:pan-y;
  }
</style>
<style  scoped>
.box_top_card{
  width: 130px;
  height: 42px;
  /* background: #fff; */
  border-radius: 4px;
  /* border: 1px solid #2BBB61; */
  /* color: ; */
  margin: 8px 0px 0px 8px;
  text-align: center;
  float: right;
  font-size: 14px;
  line-height: 21px;
}
.green{
  color: #fff;
  background: #2BBB61;
}
.warning{
  color: #fff;
  background: #E2633B;
}
.card-left{
  width: 130px;
  padding-top: 15px;
  padding-left: 10px;
  text-align: center;

}
.box_total .title h5{
  margin-bottom: 0px;
}
.slider_card /deep/ .el-slider__runway{
  height: 15px;
  
}
.slider_card /deep/ .el-slider__bar{
  height: 14px;
  background-color: #2BBB61;
  
}
.slider_card /deep/ .el-slider__button-wrapper {
  height: 41px;
  width: 41px;
}
.slider_card /deep/ .el-slider__button{
  width: 20px;
  height: 20px;
  border: 2px solid #2BBB61;
}
.slider_card /deep/ .el-slider__runway{
  margin: 10px 0px;
}
.fa-reply{
  display: inline-block;
  font-size: 14px;
  width: 32px;
  height: 32px;
  margin-right: 60px;
  cursor: pointer;
  background-image: url('../../../../assets/img/last1.png');
}
.fa-share{
  display: inline-block;
  font-size: 14px;
  width: 32px;
  height: 32px;
  margin-right: 60px;
  cursor: pointer;
  background-image: url('../../../../assets/img/next1.png');
}
.fa-trash{
  display: inline-block;
  font-size: 14px;
  width: 32px;
  height: 32px;
  margin-right: 60px;
  cursor: pointer;
  background-image: url('../../../../assets/img/clean1.png');
}
.handle_bottom {
  position: absolute;
  bottom: 5px;
  width: 600px;
  height: 60px;
  line-height: 75px;
  border-bottom: 1px #585858 solid;
  border-top: 1px #585858 solid;
}
.handle_bottom .control{
  width: 100%;
  text-align: center;
}
.card_bottom{
  position: absolute;
  bottom: 10px;
}
.box_top_card .card p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;

}
.iscard{
  border: 1px solid #2BBB61;
  background: #fff;
  color: #2BBB61;
}
.control /deep/ .van-radio__icon--checked .van-icon{
  color: #fff;
  background-color: #2BBB61;
  border-color: #2BBB61;
}
.card_content{
  padding: 20px;
  /* height: 100%; */
  /* background: #f5f5f5; */
}
.box-card{
  /* height: 100%; */
  margin-top: 30px;
  
}
.img{
   width: 200px;
   text-align: center;
   margin: 0 auto;
}
.img img{
  width: 100%;
}
.img_p{
  text-align: center;
}
</style>
<script>
  import {
    TeacherQuestionList,
    apiCommonExamSeleElementTestById,
    studentQuestionList,
    studentQuestionteacherFile,
    getTeacherPaperfinishQuestionArr,
    teacherQuestionResetBefore
	} from '@/api/api.js'
  export default {
    data () {
      return {
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
        scold:0,
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


        context: {},
        imgUrl: [],
        canvasMoveUse: true,
        // value:3,
        radio:1,
        isTip:true,
        // 存储当前表面状态数组-上一步
        preDrawAry: [],
        // 存储当前表面状态数组-下一步
        nextDrawAry: [],
        // 中间数组
        middleAry: [],
        height:'',
        width:'',
        // 配置参数
        config: {
          lineWidth: 1,
          lineColor: '#f32f15',
          shadowBlur: 1
        },
        urlImg:require("./X-3.jpg")
      }
    },
    created () {
      this.$emit('setNav', '在线涂鸦画板')
      let height = window.screen.height
      let width = window.screen.width
      if(width > height) {
        this.isTip = false
        
      }else{
        this.isTip = true
      }
      this.getinit()
    },
    mounted () {
        document.body.style.overflow='hidden';
        window.addEventListener("resize", this.renderResize, false)
        var that = this
        const canvas = document.querySelector('#canvas')
        this.context = canvas.getContext('2d')
        var cW = document.getElementById('canvas').width
        var cH = document.getElementById('canvas').height
        var imgObj = new Image()
        var imgW = ""
        var imgH = ""
        imgObj.src = this.urlSrc
        imgObj.onload = function(){
            imgW = imgObj.width
            imgH = imgObj.height
            // 在canvas绘制前填充白色背景
            that.context.fillStyle = "#fff";
            that.context.fillRect(0, 0, cW, cH)
            that.context.drawImage(this,0,(cH-imgH * cW/imgW)/2,cW,imgH*cW/imgW)
        }
        this.initDraw()
        this.setCanvasStyle()
        // document.querySelector('#footer').classList.add('hide-footer')
        // document.querySelector('body').classList.add('fix-body')
    },
    watch:{
      urlSrc:function(){
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
          this.initDraw()
          this.setCanvasStyle()
      }
    },
    
    // beforeDestroy () {
    //     // 移除监听
    //     window.removeEventListener("resize", this.renderResize, false)
    // },
    destroyed () {
    //   document.querySelector('#footer').classList.remove('hide-footer')
    //   document.querySelector('body').classList.remove('fix-body')
    },
    computed: {
      controls () {
        return [{
          title: '上一步',
          action: 'prev',
          className: this.preDrawAry.length ? 'active fa fa-reply' : 'fa fa-reply'
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
    methods: {
      // 改变试卷类型
      ChangeRadio(){
        console.log(this.radio)
      },
      goback(){
        this.$router.push('mobile_teacherIndex')
      },
      // 改变分数
      // changeSlider(i){
      //     this.getNum[i] = ''
      //     this.$forceUpdate();
      //     this.getAllTotal()
      // },
      changeSlider(i,item){
        this.NowSelectItem.groupQuestionArr[i].setgetNum = this.getNum[i]
        this.$forceUpdate(); 
      },
      getAllTotal(){
        // this.total = 0
        // this.alltotal = 0
        // this.selectNo = []
        // let list  = this.NowSelectItem.groupQuestionArr 
        // for(var i=0;i<list.length;i++){
        //   this.alltotal = this.alltotal + list[i].score
        //   this.total = this.total + list[i].setgetNum
        //   this.selectNo.push(list[i].no)
        // }
      },
      getinit(){
        let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
        if(importPaper){
            this.importPaper = importPaper
        }else{
            this.$message.warning('无试卷数据')
        }
        // 获取当前老师需要批该的任务
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
                    for(var j=0;j<list.length;j++){
                        // 这题已完成
                        if(list[j].finish_count >= list[j].count ){
                            // console.log('批阅完成')
                            for(let k=0;k<this.allTopic.length;k++){
                                
                                if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                    this.allTopic[k].status = '批阅完成'
                                    break
                                }
                            }
                            //正在批阅 
                        }else if( list[j].finish_count > 0  && list[j].finish_count < list[j].count ){
                            // console.log('正在批阅')

                            
                            for(let k=0;k<this.allTopic.length;k++){
                             
                                if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                    this.allTopic[k].status = '正在批阅'
                                    break
                                }
                            }
                            // 待批阅
                        }else if(list[j].finish_count == 0 ){
                            // console.log('待批阅')
                            for(let k=0;k<this.allTopic.length;k++){
                                if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                    this.allTopic[k].status = '待批阅'
                                    break
                                }
                            }
                        }else{
                            for(let k=0;k<this.allTopic.length;k++){
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
                            //  console.log(this.selectNum)
                        }


                    }
                    console.log(this.allTopic)
                    console.log(list)
                    // this.$forceUpdate(); 
                    // 读当前为那道题目
                    // 初始为第一题
                    if(this.selectNum == '批阅完成'){
                        this.isOver = true
                        this.$message.warning('全部批阅完成')

                    }else{


                        this.NowSelectItem = this.allTopic[this.selectNum]

                        // console.log(this.NowSelectItem)



                        this.getNum = []
                        for(var b=0;b<this.NowSelectItem.groupQuestionArr.length;b++){
                            let item = this.NowSelectItem.groupQuestionArr[b]
                            item.setgetNum = 3
                            this.getNum.push(3)
                        }
                        this.getAllTotal()

                        // 获取学生的试题id
                        let question_id = []
                        this.NowSelectItem.groupQuestionArr.forEach(element => {
                            question_id.push(element.id)
                        });
                        // 获取学生的试题
                        studentQuestionList({
                            "paper_id":this.importPaper.paper_id,
                            "question_id":question_id,
                            "teacher_id":localStorage.getItem('userID'),
                            "status":2
                        }).then(res=>{
                            // 上次没修改完成的试题
                            // console.log()
                            if(res.data.data){
                                this.nowQuestion = res.data.data.list
                                this.urlSrc = this.nowQuestion[0].id
                            }else{
                                // 获取学生题目
                                studentQuestionList({
                                    "paper_id":this.importPaper.paper_id,
                                    "question_id":question_id,
                                    "teacher_id":localStorage.getItem('userID'),
                                    "status":0
                                }).then(res=>{
                                    if(res.data.data){
                                        this.nowQuestion = res.data.data.list
                                        this.urlSrc = this.nowQuestion[0].id
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
      },
      renderResize() {
          // 判断横竖屏
          let width = window.screen.width
          let height = window.screen.height
          if(width > height) {
            this.isTip = false
            this.$router.go(0)
          }else{
            this.isTip = true
          }
          // 做页面适配
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
      removeImg (src) {
        this.imgUrl = this.imgUrl.filter(item => item !== src)
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
      NextWaitPromise(id,radio,setgetNum,formData,oldTopic){
        return new Promise((resolve,reject)=>{
            studentQuestionteacherFile(id,radio,setgetNum,formData).then(res=>{
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
          return new File([u8arr], fileName , {
              type: 'image/png'
          })
      },
      // 上一题
      lastTopic(){
          if(this.oldTaskList.length == 0){
              this.$message.warning('没有上一条题数据！')
          }else{
              let oldTask  =  this.oldTaskList[this.oldTaskList.length-1]
              teacherQuestionResetBefore({
                  "student_with_question_id":oldTask
              }).then(res=>{
                  if(res.data.result){
                    this.oldTaskList.pop()
                  // 获取当前老师需要批该的任务
                  TeacherQuestionList({
                      "teacher_id":localStorage.getItem('userID'),
                      "paper_id":this.importPaper.paper_id,
                  }).then(res=>{
                      let list = ''
                      list = res.data.data.list
                      // console.log(list)
                      if(list){
                          this.elementTest = ''
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

                              // console.log(this.allTopic)
                              for(var j=0;j<list.length;j++){
                                  // 这题已完成
                                  if(list[j].finish_count >= list[j].count ){
                                      // console.log('批阅完成')
                                      for(let k=0;k<this.allTopic.length;k++){

                                          if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                              this.allTopic[k].status = '批阅完成'
                                              break
                                          }
                                      }
                                      //正在批阅 
                                  }else if( list[j].finish_count > 0  && list[j].finish_count < list[j].count ){
                                      // console.log('正在批阅')


                                      for(let k=0;k<this.allTopic.length;k++){
                                      
                                          if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                              this.allTopic[k].status = '正在批阅'
                                              break
                                          }
                                      }
                                      // 待批阅
                                  }else if(list[j].finish_count == 0 ){
                                      // console.log('待批阅')
                                      for(let k=0;k<this.allTopic.length;k++){
                                          if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                              this.allTopic[k].status = '待批阅'
                                              break
                                          }
                                      }
                                  }else{
                                      for(let k=0;k<this.allTopic.length;k++){
                                          if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                              this.allTopic[k].status = '待批阅'
                                              break
                                          }
                                      }
                                  }

                              }
                              this.selectNum = 0
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

                              // 读当前为那道题目
                              this.NowSelectItem = []
                              // 初始为第一题
                              if(this.selectNum == '批阅完成'){
                                  this.isOver = true
                                  // console.log(this.isOver)
                                  this.$message.warning('全部批阅完成')
                              }else{
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
                                  // 获取学生的试题
                                  // this.nowQuestion = ''
                                  // this.urlSrc = ''
                                  studentQuestionList({
                                      "paper_id":this.importPaper.paper_id,
                                      "question_id":question_id,
                                      "teacher_id":localStorage.getItem('userID'),
                                      "status":2
                                  }).then(res=>{
                                      // 上次没修改完成的试题
                                      if(res.data.data){
                                          this.nowQuestion = res.data.data.list
                                          this.urlSrc = this.nowQuestion[0].id



                                      }else{
                                          // 获取学生题目
                                          studentQuestionList({
                                              "paper_id":this.importPaper.paper_id,
                                              "question_id":question_id,
                                              "teacher_id":localStorage.getItem('userID'),
                                              "status":0
                                          }).then(res=>{
                                              if(res.data.data){
                                                  this.nowQuestion = res.data.data.list
                                                  this.urlSrc = this.nowQuestion[0].id



                                              }else{
                                                  this.$message.warning('修改完成。')
                                              }
                                          })
                                      }
                                  })
                              }
                          })
                          this.ispush = 1
                      }else{
                          this.$message.warning('请先分配任务')
                      }
                  })
                  }else{
                      this.$message.error(res.data.message)
                  }
              })
          }
      },
      // 下一题
      nextTopic(){
        // console.log('生成图片成功')
        const canvas = document.querySelector('#canvas')
        var ctx=canvas.getContext("2d"); 
        ctx.fillStyle="#E992B9";
        ctx.lineWidth=1;
          // ctx.fillText(str,0,20); 
        const src = canvas.toDataURL('image/png')
        let formData = new FormData()
        let fileName = new Date().getTime() +'.png'
        formData.append('file',this.dataURLtoFile(src,fileName))
        let alllist = this.NowSelectItem.groupQuestionArr
        // this.isNext = false
        let promiseArr = []
        // 存储上一条的数据

        let oldTopic = []

        for(var i=0;i<this.nowQuestion.length;i++){
            for(var k=0;k<alllist.length;k++){
                if(alllist[k].id == this.nowQuestion[i].question_id){
                    promiseArr.push(this.NextWaitPromise(this.nowQuestion[i].id,this.radio,alllist[k].setgetNum,formData,oldTopic))
                    // this.getNextWait(this.nowQuestion[i].id,this.is_typical_case,alllist[k].setgetNum,radio,formData)
                    // studentQuestionteacherFile(this.nowQuestion[i].id,this.is_typical_case,list[k].setgetNum,radio,formData).then(res=>{
                    //     console.log(res)
                    // })
                }
            } 
        }
        Promise.all(promiseArr).then(res=>{
            this.oldTaskList.push(oldTopic)
            // console.log(oldTopic)
            this.importPaper = []
            let importPaper = JSON.parse(sessionStorage.getItem("importPaper"))
            if(importPaper){
                this.importPaper = importPaper
            }else{
                this.$message.warning('无试卷数据')
            }
            // 获取当前老师需要批该的任务
            TeacherQuestionList({
                "teacher_id":localStorage.getItem('userID'),
                "paper_id":this.importPaper.paper_id,
            }).then(res=>{
                let list = ''
                list = res.data.data.list
                // console.log(list)
                if(list){
                    this.elementTest = ''
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
                        console.log(list)
                        console.log(this.topicList)

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

                        // console.log(this.allTopic)
                        for(var j=0;j<list.length;j++){
                            // 这题已完成
                            if(list[j].finish_count >= list[j].count ){
                                // console.log('批阅完成')
                                for(let k=0;k<this.allTopic.length;k++){

                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '批阅完成'
                                        break
                                    }
                                }
                                //正在批阅 
                            }else if( list[j].finish_count > 0  && list[j].finish_count < list[j].count ){
                                // console.log('正在批阅')


                                for(let k=0;k<this.allTopic.length;k++){
                                
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '正在批阅'
                                        break
                                    }
                                }
                                // 待批阅
                            }else if(list[j].finish_count == 0 ){
                                // console.log('待批阅')
                                for(let k=0;k<this.allTopic.length;k++){
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '待批阅'
                                        break
                                    }
                                }
                            }else{
                                for(let k=0;k<this.allTopic.length;k++){
                                    if(this.allTopic[k].groupQuestionArr[0].id == list[j].question_id){
                                        this.allTopic[k].status = '待批阅'
                                        break
                                    }
                                }
                            }

                        }

                        console.log(this.allTopic)



                        this.selectNum = 0
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

                        console.log(121)
                        // 读当前为那道题目
                        this.NowSelectItem = []
                        // 初始为第一题
                        if(this.selectNum == '批阅完成'){
                            this.isOver = true
                            // console.log(this.isOver)
                            this.$message.warning('全部批阅完成')
                        }else{
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
                            // 获取学生的试题
                            // this.nowQuestion = ''
                            // this.urlSrc = ''
                            studentQuestionList({
                                "paper_id":this.importPaper.paper_id,
                                "question_id":question_id,
                                "teacher_id":localStorage.getItem('userID'),
                                "status":2
                            }).then(res=>{
                                // 上次没修改完成的试题
                                if(res.data.data){
                                    this.nowQuestion = res.data.data.list
                                    this.urlSrc = this.nowQuestion[0].id
                                }else{
                                    // 获取学生题目
                                    studentQuestionList({
                                        "paper_id":this.importPaper.paper_id,
                                        "question_id":question_id,
                                        "teacher_id":localStorage.getItem('userID'),
                                        "status":0
                                    }).then(res=>{
                                        if(res.data.data){
                                            this.nowQuestion = res.data.data.list
                                            this.urlSrc = this.nowQuestion[0].id
                                        }else{
                                            // this.isOver = true
                                            this.$message.warning('修改完成。')
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.ispush = 1
                }else{
                    this.$message.warning('请先分配任务')
                }
          })
        }).catch(err=>{
            this.$message.error('批改失败')
            reject(false)
        })
      }

    }
  }
</script>