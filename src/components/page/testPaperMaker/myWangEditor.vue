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
       <el-row v-loading="editorUpdateImg">
        <div
            :class="'editor_'+classUniqueId"
            ref="myWangEditor"
        >
        </div>
       </el-row>
    </div>
</template>
<script>
// import { quillEditor } from 'vue-quill-editor'
// import * as Quill from 'quill'  //引入编辑器
// import ImagePaste from 'quill-yang-image-paste';
// Quill.register('modules/imagePaste', ImagePaste);
// 引入 wangEditor
import wangEditor from 'wangeditor'
export default {
    name:"myWangEditor",
    components: {
        // quillEditor
        wangEditor
    },
    props:[
        'contentData',
        'classUniqueId'
    ],
    data() {
        return {
            //编辑器
            editor: null,
            // imagePaste: {},
            /**
             * 允许上传的图片类型
             */
            uploadImgAccepText:".jpg,.jpeg,.png",
            editorUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            serverUrl: '/api/temp/image/upload/',  // 这里写你要上传的图片服务器地址
            header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
            //uploaderClassUniqueId: this.classUniqueId,
            detailContent: null, // 富文本内容
        }
    },
    // watch: {
    //   contentData(val) {
    //     this.detailContent = this.contentData;
    //     this.editor.txt.html(this.detailContent)
    //   }
    // },
    mounted(){
        //console.log("富文本编辑器模块，赋值detailContent")
        this.detailContent = this.contentData;
        //console.log("开始创建富文本编辑器.editor_"+this.classUniqueId)
        let editor = new wangEditor(`.editor_`+this.classUniqueId)

        //插入图片转换base64
        editor.customConfig.uploadImgShowBase64 = true
        // 自定义菜单配置
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontName',  // 字体
            'fontSize',  // 字号
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'list',  // 列表
            'justify',  // 对齐方式
            //'quote',  // 引用
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
        ]
        // 自定义字体
        editor.customConfig.fontNames = [
            '宋体',
            '仿宋',
            'Arial',
            'Tahoma',
            'Verdana'
        ]
        //配置方法
        editor.customConfig.onchange = (newHtml) => {
            this.detailContent = newHtml
            this.$options.methods.onEditorChange.bind(this)()
        }
        // 创建编辑器
        editor.create()

        this.editor = editor

        this.editor.txt.html(this.detailContent)

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
            this.editorUpdateImg = true
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
            this.editorUpdateImg = false
        },
        // 上传图片失败
        uploadError(res, file) {
            // loading动画消失
            this.editorUpdateImg = false
            this.$message.error('图片插入失败')
        },
        // 编辑器变化
        onEditorChange() {
            //console.log("更新数据")
            this.$emit('update:contentData' , this.detailContent)
        },
        // 编辑器准备就绪
        onEditorReady() {},
    }
}
</script>