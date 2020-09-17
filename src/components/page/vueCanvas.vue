<template>
  <div class="inner draw" @mousemove="beginPath($event)">
    <div class="wrap">
      <canvas 
        id="canvas" 
        class="fl" 
        width="700" 
        height="500" 
        @mousedown="canvasDown($event)" 
        @mouseup="canvasUp($event)"
        @mousemove="canvasMove($event)"
        @touchstart="canvasDown($event)" 
        @touchend="canvasUp($event)"
        @touchmove="canvasMove($event)"
      >
      </canvas>
      <div id="control" class="fl">

        <div id="canvas-color">
          <h5>
            画笔颜色</h5>
          <ul>
            <li 
              v-for="item in colors" 
              :class="{'active':config.lineColor === item}"
              :style="{ background: item }" 
              @click="setColor(item)"
            ></li>
          </ul>
        </div>

        <div id="canvas-brush">
          <h5>画笔大小</h5>
          <span 
            v-for="pen in brushs" 
            
            :class="[pen.className,{'active': config.lineWidth === pen.lineWidth}]"
            @click="setBrush(pen.lineWidth)"
          >
          <i class="el-icon-edit"></i>
          </span>
        </div>
   
        <div id="canvas-control">
          <h5>操作</h5>
          <span 
            v-for="control in controls" 
            :title="control.title" 
            :class="control.className" 
            @click="controlCanvas(control.action)"
          >

          </span>
        </div>
 
        <!-- <div id="canvas-drawImage">
          <h5>生成图像</h5>
          <button class="drawImage" @click="getImage()">预览</button>
        </div> -->
        <div>
          <el-radio-group v-model="radio" size="mini">
            <el-radio label="1" border style="display:block;margin:8px 0px">优秀试卷</el-radio>
            <el-radio label="2" border style="display:block;margin:8px 0px">典型精题</el-radio>
            <el-radio label="2" border style="display:block;margin:8px 0px">异常卷</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!--存放图片-->
    <div id="img-box" v-show="imgUrl.length">
      <div class="img-item" v-for="src in imgUrl">
        <img :src="src">
        <span class="fa fa-close" @click="removeImg(src)"></span>
      </div>
    </div>


    <div style="display:none">
        <img ref="conf0" src="./X-3.jpg">
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
    /* width: 740px; */
    border: 1px #585858 solid;
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
    width: 180px;
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
  .fa-reply{
    background-image: url('../../assets/img/last.png');
    background-repeat: no-repeat;
  }
  .fa-share{
    background-image: url('../../assets/img/back.png');
    background-repeat: no-repeat;
  }
  .fa-trash{
    background-image: url('../../assets/img/clean.png');
    background-repeat: no-repeat;
  }
  .drawImage {
    width: 100px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }
</style>

<script>
import IconVue from './Icon.vue'
  export default {
    data () {
      return {
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
        context: {},
        imgUrl: [],
        canvasMoveUse: false,
        // 存储当前表面状态数组-上一步
        preDrawAry: [],
        // 存储当前表面状态数组-下一步
        nextDrawAry: [],
        // 中间数组
        middleAry: [],
        // 配置参数
        config: {
          lineWidth: 1,
          lineColor: '#f2849e',
          shadowBlur: 2
        },
        img:require('./X-3.jpg')
      }
    },
    created () {
      this.$emit('setNav', '在线涂鸦画板')

    },
    mounted () {
        var that = this
        const canvas = document.querySelector('#canvas')
        that.context = canvas.getContext('2d')

        var cW = document.getElementById('canvas').width
        var cH = document.getElementById('canvas').height
        console.log(cW)
        console.log(cH)
        var imgObj = new Image()
        imgObj.src = this.img
        var imgW = ""
        var imgH = ""
        imgObj.onload = function(){
            imgW = imgObj.width
            imgH = imgObj.height
            that.context.drawImage(this,0,(cH-imgH * cW/imgW)/2,cW,imgH*cW/imgW)
        }
        // var img = this.$refs.conf0
        // img.onload = ()=>{
        //     this.context.drawImage(img, 0, 0)
        // }
        this.initDraw()
        this.setCanvasStyle()
        
        // document.querySelector('#footer').classList.add('hide-footer')
        // document.querySelector('body').classList.add('fix-body')
    },
    destroyed () {
      document.querySelector('#footer').classList.remove('hide-footer')
      document.querySelector('body').classList.remove('fix-body')
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
    methods: {
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
        const preData = this.context.getImageData(0, 0, 700, 500)
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
            canvasX = e.clientX - t.parentNode.offsetLeft -250
            canvasY = e.clientY - t.parentNode.offsetTop - 100
          } else {
            canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft -250
            canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop - 100
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
        const preData = this.context.getImageData(0, 0, 700, 500)
        if (!this.nextDrawAry.length) {
          // 当前绘图表面进栈
          this.middleAry.push(preData)
        } else {
          // console.log(this.preDrawAry)
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

        const canvasX = e.clientX - e.target.parentNode.offsetLeft - 250
        const canvasY = e.clientY - e.target.parentNode.offsetTop  -100
        console.log(e.clientX)
        console.log(e.clientY)
        this.setCanvasStyle()
        // 清除子路径
        this.context.beginPath()
        this.context.moveTo(canvasX, canvasY)
        console.log('moveTo', canvasX, canvasY)
        // 当前绘图表面状态
        const preData = this.context.getImageData(0, 0, 700, 500)
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
        console.log(action)
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
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
            this.preDrawAry = []
            this.nextDrawAry = []
            this.middleAry = [this.middleAry[0]]
            break
        }
      },
      // 生成图片
      getImage () {
        const canvas = document.querySelector('#canvas')
        // var ctx=canvas.getContext("2d"); 
        // ctx.fillStyle="#E992B9";
        // ctx.lineWidth=1;
        // var str = "假如生活欺骗了你，请不要悲伤！thank you!"
        // ctx.fillText(str,0,20); 
        // const src = canvas.toDataURL('image/png')
        // this.imgUrl.push(src)
        // if (!this.isPc()) {
        //   // window.open(`data:text/plain,${src}`)
        //   window.location.href = src
        // }
      },

      // 设置绘画配置
      setCanvasStyle () {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      }
    }
  }
</script>
