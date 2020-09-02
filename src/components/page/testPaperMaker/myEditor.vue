<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
            style="display:none;"
            :class="'uploader_'+classUniqueId"
            ref="elUploader"
            :action="serverUrl"
            name="image_file"
            :accept="uploadImgAccepText"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
        </el-upload>

        <!--富文本编辑器组件-->
       <el-row v-loading="quillUpdateImg">
        <quill-editor
                v-model="detailContent"
                :class="'ql-editor-class editor_'+classUniqueId"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                @ready="onEditorReady($event)"
        >
        </quill-editor>
       </el-row>
    </div>
</template>
<script>
// import { quillEditor } from 'vue-quill-editor'
// import * as Quill from 'quill'  //引入编辑器
// import ImagePaste from 'quill-yang-image-paste';
// Quill.register('modules/imagePaste', ImagePaste);
export default {
    name:"myQuillEditor",
    components: {
        // quillEditor
    },
    props:[
        'contentData',
        'classUniqueId'
    ],
    data() {
        return {
            imagePaste: {},
            /**
             * 允许上传的图片类型
             */
            uploadImgAccepText:".jpg,.jpeg,.png",
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            serverUrl: '/api/temp/image/upload/',  // 这里写你要上传的图片服务器地址
            header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
            //uploaderClassUniqueId: this.classUniqueId,
            detailContent: null, // 富文本内容
            editorOption: { //  富文本编辑器配置
                modules: {
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    },
                    //简化版
                    toolbar: {
                        container:[
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        //[{'header': 1}, {'header': 2}],               // custom button values
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                        [{'direction': 'rtl'}],                         // text direction

                        //[{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

                        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                        [{'font': []}],
                        [{'align': []}],
                        ['image','clean'],//去除video即可 暂时去掉公式, 'formula'
                        ],
                        //暂时屏蔽
                        /*handlers: {
                            'image': function (value) {
                                this.quill.format('image', false);
                            }
                        }*/
                    },
                    //支持图片拖动、放大缩小
                    /*imageDrop: true, // 拖动加载图片组件。
                    imageResize: { //调整大小组件。
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                    }*/
                },
                theme: 'snow',
                placeholder: '请输入内容',
            }  // 富文本编辑器配置
        }
    },
    watch: {
      contentData(val) {
        this.detailContent = this.contentData;
      }
    },
    mounted(){
        this.detailContent = this.contentData;
        //console.log(this.contentData)
        //console.log(this.classUniqueId)
        //重写img上传的click方法
        /*var imgup=document.querySelector('.quill-editor .ql-image')
            imgup.onclick= () =>{
                console.log('.uploader_'+this.classUniqueId+' .el-upload input')
                document.querySelector('.uploader_'+this.classUniqueId+' .el-upload input').click()
        }*/
        
        //暂时屏蔽
        /*var imgup=document.querySelector('.editor_'+this.classUniqueId+' .ql-image')
            imgup.onclick= () =>{
                //console.log('.uploader_'+this.classUniqueId+' .el-upload input')
                document.querySelector('.uploader_'+this.classUniqueId+' .el-upload input').click()
        }*/
    },
    methods: {
        // 上传图片前
        beforeUpload(res, file) {
            // 显示loading动画
            this.quillUpdateImg = true
        },
        // 上传图片成功
        uploadSuccess(res, file) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditor.quill
            //console.log(res)
            // 如果上传成功
            if (res.result && res.data !== null) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  res.info为服务器返回的图片地址
                quill.insertEmbed(length, 'image', '/api/temp/image/getImage/'+res.data)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                this.$message.error('图片插入失败')
            }
            // loading动画消失
            this.quillUpdateImg = false
        },
        // 上传图片失败
        uploadError(res, file) {
            // loading动画消失
            this.quillUpdateImg = false
            this.$message.error('图片插入失败')
        },
        // 编辑器变化
        onEditorChange(event) {
            //console.log("更新数据")
            this.$emit('update:contentData' , this.detailContent)
        },
        // 编辑器准备就绪
        onEditorReady(event) {},
    }
}
</script>