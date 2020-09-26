<template>
<div>
    <el-button type="primary" @click="cameraupload">拍照上传</el-button>
    <div class="upload-item">
        <span>摄像头切换：</span>
        <el-select ref="select" v-model="selectCamera" placeholder="请选择" size="mini" @change="cameraChange">
            <el-option v-for="item in selectOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
    <div class="upload-item">
                    <span>摄像头切换：</span>
                    <el-select ref="select" v-model="selectCamera" placeholder="请选择" size="mini" @change="cameraChange">
                        <el-option v-for="item in selectOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
     <div class="upload-item">
            <span>拍照上传摄像头：</span>
            <video id="video" ref="video" width="360" height="240" controls autoplay playsinline></video>
     </div>
</div>
</template>
<script>
import {getBase64,getUserMedia,gotDevices,getUserMediaSuccess,getUserMediaError,stopMediaTracks} from "./camera.js"
export default {
    data(){
        return{
            canvas:'',
            selectOption:[],
             selectCamera:'',
        }
    },
    mounted(){
        //初始化canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'none';
        this.canvas.height = '2448';
        this.canvas.width = '3264';
        this.context = this.canvas.getContext('2d');

        const constraints = {
            video: {width: 3264, height: 2448},
            audio: false
        };
        //获取摄像头列表
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream =>{
                console.log(stream)
                return navigator.mediaDevices.enumerateDevices();
            }).then( s =>{
                console.log(s)
                this.selectOption = []
                s.forEach(i =>{
                    console.log(i)
                    if(i.kind === 'videoinput'){
                        this.selectOption.push({
                            value:i.deviceId,
                            label:i.label
                        })
                    }
                })
            })
    },
    methods:{
        cameraupload(){
            this.context.drawImage(video, 0, 0, 3264, 2448);
            let pageData = this.canvas.toDataURL("image/jpeg");
            console.log(pageData)
        },
        cameraChange () {//改变摄像头
            navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId:{ exact: this.selectCamera },
                    width: 3264, 
                    height: 2448
                },
				audio: false
            }).then(stream =>{
                //console.log(stream)
                let video = this.$refs.video
                //兼容webkit核心浏览器
                let CompatibleURL = window.URL || window.webkitURL;
                //将视频流设置为video元素的源
                //console.log(stream);
                //video.src = CompatibleURL.createObjectURL(stream);
                video.srcObject = stream;
                video.play();
            }).catch(err =>{
                console.log(err)
            })
        },
    }
}
</script>