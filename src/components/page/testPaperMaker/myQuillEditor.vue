<template>
    <div>
        <div>
            <div>
            <quill-editor
                v-model="content"
                ref="thisQuillEditor"
                :options="editorOption"
                @focus="onEditorFocus($event)"
                @blur="onEditorBlur($event)"
                @change="onEditorChange($event)">
            </quill-editor></div>
            <div><el-upload
                  ref="quill_editor_uploader_questionPartItem"
                  class="upload-demo"
                  action="/api/temp/image/upload/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :beforeUpload="beforeAvatarUpload"
                  name="image_file"
                  :accept="uploadImgAccepText"
                  multiple
                  :on-exceed="handleExceed"
                  :file-list="questionPartItem.fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
                </el-upload></div>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import * as Quill from 'quill'  //引入编辑器
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)
export default {
    name:"myQuillEditor",
    components: {
        quillEditor,
        ImageDrop
    },
    props:[
        'data',
    ],
    data () {
        return{
            editor: null,   // 富文本编辑器对象
            content: `<p></p>`, // 富文本编辑器默认内容
            editorOption: { //  富文本编辑器配置
          modules: {
              imageDrop: true,
              syntax: {
                  highlight: text => hljs.highlightAuto(text).value
              },
              //简化版
              toolbar: {
                container:[
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                //   ['blockquote', 'code-block'],

                //   [{'header': 1}, {'header': 2}],               // custom button values
                //   [{'list': 'ordered'}, {'list': 'bullet'}],
                //   [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                //   [{'direction': 'rtl'}],                         // text direction

                //   [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

                //   [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                //   [{'font': []}],
                //   [{'align': []}],
                //   ['image','clean'],//去除video即可 暂时去掉公式, 'formula'
                ],
                handlers: {
                    'image': function (value) {
                        if (value) {
                          console.log(value)
                          //自定义图片上传功能
                            alert('自定义图片')
                        } else {
                            this.quill.format('image', false);
                        }
                    }
                }
              }
              
              
              /*toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  ['blockquote', 'code-block'],

                  [{'header': 1}, {'header': 2}],               // custom button values
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                  [{'direction': 'rtl'}],                         // text direction

                  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                  [{'header': [1, 2, 3, 4, 5, 6, false]}],

                  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                  [{'font': []}],
                  [{'align': []}],
                  ['link', 'image','clean'],//去除video即可 暂时去掉公式, 'formula'
              ]*/
          },
          theme: 'snow',
          placeholder: '请输入内容'
      },
        }
    },
    created(){
    //    console.log(this.dataForShowArr)
    },
    methods: {
        // 准备富文本编辑器
        onEditorReady (editor) {},
        // 富文本编辑器 失去焦点事件
        onEditorBlur (editor) {},
        // 富文本编辑器 获得焦点事件
        onEditorFocus (editor) {},
        // 富文本编辑器 内容改变事件
        onEditorChange (editor) {},
        // 富文本编辑器 点击插入图片或者视频
        insertImgClick (e) {
            console.log("调用插入图片函数")
            document.getElementById('insert_image').click();
            if (e.target.className.indexOf('icon-pic') != -1) {
                document.getElementById('insert_image').click();
            } else if (e.target.className.indexOf('icon-video') != -1) {
                document.getElementById('insert_video').click();
            }
        },
        // 富文本编辑器 点击插入图片或者视频上传并预览
        fileInsert (e) {
            var oFile = e.target.files[0];
            if (typeof (oFile) === 'undefined') {
                return;
            }
            let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
            let sfileType = ''; // 上传文件类型
            if (e.target.id == 'insert_image') {
                sfileType = 'image'
                if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg') {
                    alert('不支持该类型图片');
                    return;
                }
            }
            if (e.target.id == 'insert_video') {
                sfileType = 'video';
                if (sExtensionName !== 'mp4' && sExtensionName !== 'avi' && sExtensionName !== 'mov') {
                    alert('不支持该类型视频');
                    return;
                }
                let maxSize = 100*1024*1024;    // 100MB
                if (oFile.size > maxSize) {
                    alert('上传视频大小不能超过100MB');
                    return;
                }
            }
            var reader = new FileReader();
            reader.readAsDataURL(oFile);
            reader.onloadend = () => {
                let formData = new FormData(); // 通过formdata上传
                formData.append('file', oFile);
                let sUrl = '';
                if (sfileType == 'image') {
                    sUrl = 'Pic';
                }
                if (sfileType == 'video') {
                    sUrl = 'Vie';
                }
                var url = this.api_config + '/dealerIndex/upload' + sUrl + '.htm';
                this.axios.post(url, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, res.data.data);  // 这个方法用来手动插入dom到编辑器里
                    let isAndroid = this.$is_android(); // 判断是ios还是android
                    if (isAndroid) {
                        $('video').removeAttr('controls');
                        $('video').attr('x5-video-player-type', 'h5');
                    }
                    this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
                }).catch((response) => {
                    console.log('失败', response);
                })
            }
        },
    },
    mounted(){
        this.editor = this.$refs.thisQuillEditor.quill;
    },
    beforeDestroy(){
        this.editor = null;
        delete this.editor;
    },
}
</script>
<style>

</style>