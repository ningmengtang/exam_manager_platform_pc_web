<template>
  <div class="appMain">
    <el-backtop></el-backtop>
    <el-container>
      <el-aside class="layout_aside" width="200px" style="text-align:center;position:fixed;">
        
        <!-- <div class="div_menu_item background_blue">
          <i class="el-icon-video-play"></i>选择快捷操作对象
        </div>

        <div class="div_menu_item background_blue">
          {{currentCtrlObj.summary}}
        </div>

        <div class="div_menu_item background_green" style="margin-top:30px;" @click="saveTestPaperCache()">
          <i class="el-icon-collection-tag"></i>完成组卷
        </div>

        <div class="div_menu_item background_red" @click="resetTestPaperObj()">
          <i class="el-icon-collection-tag"></i>重置组卷
        </div>

        <div class="div_menu_item background_orange" style="margin-top:30px;" v-if="!qustionPreviewMode" @click="startTestPaperImgPreview()">>
          <i class="el-icon-collection-tag"></i>预览试题
        </div>
        
        <div class="div_menu_item background_orange" style="margin-top:30px;" v-if="qustionPreviewMode" @click="qustionPreviewMode = false">
          <i class="el-icon-collection-tag"></i>退出预览试题
        </div> -->

        <!-- <div class="div_menu_item background_orange" style="margin-top:30px;" v-if="qustionPreviewMode" @click="returnTop();testPaperQuestionsToImage()">
          <i class="el-icon-collection-tag"></i>预览试题图片
        </div> -->

        <!-- <div class="div_menu_item background_orange" style="margin-top:30px;" @click="testFor100StudentsDownload">
          <i class="el-icon-collection-tag"></i>直接下载试题
        </div>
        

        <div class="div_menu_title background_dark" style="margin-top:30px;">
          <i class="el-icon-menu"></i>添加试卷部分
        </div>

        <div class="div_menu_item" @click="addNewTestPaperQuestionPartItem">
          <i class="el-icon-folder"></i>添加试卷部分
        </div>

        <div class="div_menu_item" @click="addNewTestPaperQuestionBigItem(null)">
          <i class="el-icon-collection-tag"></i>添加一个大题
        </div>

        <div class="div_menu_title background_dark">
          <i class="el-icon-files"></i>添加试卷题目
        </div>

        <div class="div_menu_item">
          <i class="el-icon-document-checked"></i>添加选择题
        </div>

        <div class="div_menu_item">
          <i class="el-icon-document"></i>添加其他题
        </div> -->
        
        </el-aside>
      <el-container>
        <div style="width:100px;position:fixed;top:150px;right:50px;text-align:center;">
          <div style="margin-top:10px;color:#909399;">
            重置功能
          </div>
           <div style="margin-top:10px;">
            <el-button type="danger" round @click="resetTestPaperObj()">重置试卷</el-button>
          </div>
          <div style="margin-top:30px;color:#909399;">
            组卷功能
          </div>
          <div style="margin-top:10px;">
            <el-button style="height:50px;" type="success" round @click="saveTestPaperCache()">完成组卷</el-button>
          </div>

          <div style="margin-top:10px;">
            <el-button style="height:50px;" type="success" round @click="saveTestPaperTempCache()">立刻保存</el-button>
          </div>
         
          <div style="margin-top:30px;color:#909399;">
            试卷预览
          </div>
          <div style="margin-top:10px;">
            <el-button type="warning" round @click="saveTestPaperTempCache();startTestPaperPreview();" v-if="!qustionPreviewMode">预览试题</el-button>
          </div>
          <div style="margin-top:10px;">
            <el-button type="warning" round @click="qustionPreviewMode = false;qustionPreviewImgMode = false;" v-if="qustionPreviewMode">退出预览</el-button>
          </div>
          <div style="margin-top:10px;">
            <el-button type="primary" round @click="downloadTempTestPaper()" v-if="qustionPreviewMode">模拟下载</el-button>
          </div>
        </div>
        <el-header class="layout_header">
          
          <div ref="page_main_tile" class="text_header_title">
            考试综合管理平台-组卷工具(简化版)
          </div>

        </el-header>
        <el-main>
          <!-- 输出试卷预览 -->
          <!-- 每一个部分都独立一个框框，便于辨识 -->
          <!-- ============================================================================================================ -->
          <div v-for="(questionPartItem,questionPartItemIndex) in testPaperObj.items" class="layout_question_part_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;box-shadow:0px 0px 10px rgb(221, 221, 221);" v-if="!qustionPreviewMode" >
          <!-- 第一个部分 -->
          <!-- ============================================================================================================ -->
          <div class="layout_question_part ql-container ql-snow" style="float:left;width:100%;">
            <div class="layout_question_part_header" style="float:left;width:100%;margin-left:30px;">
              <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                <span class="font_question_big" style="color:#d44949;">{{testPaperObj.title}}</span>
              </div>
              <div class="layout_question_part_header_title" style="font-size:18px;line-height:50px;text-align:center;">
                {{testPaperObj.examExplain}}
              </div>
              <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                试卷<span class="font_question_big" style="color:#d44949;" @click="refreshCurrentCtrlObj(questionPartItemIndex,null,null,questionPartItem,null,null)">第{{questionPartItemIndex+1}}部分</span>
                <span class="span_question_part_toolbar" style="margin-left:10px;"><el-button type="danger" size="mini" plain @click="questionPartItem.isHide = true" v-if="!questionPartItem.isHide">隐藏</el-button></span>
                <span class="span_question_part_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain @click="questionPartItem.isHide = false" v-if="questionPartItem.isHide">显示</el-button></span>
              </div>
              <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                <span class="font_question_big">当前部分总分：{{questionPartItem.score}}分 / 试卷总分：{{testPaperObj.score}}分</span>
                </div>
              <div class="layout_question_part_header_title" style="font-size:18px;font-weight:bold;line-height:50px;">
                <i class="el-icon-document"></i>请添加<span class="font_question_big" style="color:#d44949;" @click="refreshCurrentCtrlObj(questionPartItemIndex,null,null,questionPartItem,null,null)">第{{questionPartItemIndex+1}}部分</span>的标题
                <span class="span_question_part_toolbar" style="margin-left:10px;"><el-button type="primary" size="mini" plain @click="addNewTestPaperQuestionBigItem(questionPartItem)">增加大题</el-button></span>
                <span class="span_question_part_toolbar" style="margin-left:10px;"><el-button type="danger" size="mini" plain :disabled="testPaperObj.items.length <= 1" @click="delTestPaperQuestionPartItem(questionPartItemIndex)">删除本部分</el-button></span>
              </div>
              <div class="layout_question_part_header_content" :style="testPaperAnwserSheetStyle">
                <myQuillEditor :contentData.sync="questionPartItem.topic_text" :classUniqueId.sync="questionPartItem.uniqueId" v-if="questionPartItem.isEditing"></myQuillEditor>
                <div class="ql-editor" v-html="questionPartItem.topic_text" v-if="!questionPartItem.isEditing" style="width:100%"></div>
                <div class="ql-editor" v-if="!questionPartItem.isEditing" style="width:100%">
                    <div v-if="null == questionPartItem.topic_text || questionPartItem.topic_text == ''">【空】</div>
                  </div>
                <!--<quill-editor
                  ref="quill_editor_questionPartItem"
                  class="layout_question_part_topic_input"
                  v-model="questionPartItem.topic_text"
                  :options="editorOption"
                  @focus="onEditorFocus($event)"
                  @blur="onEditorBlur($event)"
                  @change="onEditorChange($event)">
                </quill-editor>-->
              </div>
              <!-- 编辑工具栏 -->
              <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                  <el-button type="success" icon="el-icon-check" circle @click="questionPartItem.isEditing = false" :disabled="!questionPartItem.isEditing"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                  <el-button type="primary" icon="el-icon-edit" circle @click="questionPartItem.isEditing = true" :disabled="questionPartItem.isEditing"></el-button>
                </el-tooltip>
              </div>
              <!-- 编辑工具栏 结束 -->
              <!--<div class="quill_editor_uploader">
                <el-upload
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
                </el-upload>
              </div>-->
            </div>
            <!-- 大题 -->
            <!-- ============================================================================================================ -->
            <div v-for="(questionBigItem,questionBigItemIndex) in questionPartItem.items" class="layout_question_big_layout" style="float:left;width:100%;" v-if="!questionPartItem.isHide">
              <div class="layout_question_big_header background_blue" style="float:left;width:10px;height:100px;">
                <!-- 左边方块 -->
              </div>
              <div class="layout_question_big_header" style="float:left;width:770px;margin-left:20px;">
                <div class="layout_question_big_header_title" style="font-size:18px;font-weight:bold;line-height:50px;">
                  <i class="el-icon-document"></i>请添加<span class="font_question_big" style="color:#d44949;" @click="refreshCurrentCtrlObj(questionPartItemIndex,null,null,questionPartItem,null,null)">第{{questionPartItemIndex+1}}部分</span> > <span class="font_question_big" style="color:#2a82e4;" @click="refreshCurrentCtrlObj(questionPartItemIndex,questionBigItemIndex,null,questionPartItem,questionBigItem,null)">第{{questionBigItemIndex+1}}大题</span>的题目
                  
                  <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain icon="el-icon-plus" @click="dialogVisibleForAddQuestion = true;dialogVisibleForAddQuestionParent = questionBigItem;dialogVisibleForAddQuestionTypeName = questionType.comprehensive_topic.name;"></el-button></span>
                  <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain @click="addNewTestPaperQuestionItem(questionBigItem)">增加综合题</el-button></span>
                  <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain icon="el-icon-plus" @click="dialogVisibleForAddQuestion = true;dialogVisibleForAddQuestionParent = questionBigItem;dialogVisibleForAddQuestionTypeName = questionType.single_choice.name;"></el-button></span>
                  <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain @click="addNewTestPaperChoiceQuestionItem(questionBigItem)">增加选择题</el-button></span>
                  
                  <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="danger" size="mini" plain :disabled="questionPartItem.items.length <= 1" @click="delTestPaperQuestionBigItem(questionPartItem,questionBigItemIndex)">删除本大题</el-button></span>
                </div>
                <div class="layout_question_big_header_content" :style="testPaperAnwserSheetStyle">
                  <!-- <quill-editor
                    class="layout_question_big_topic_input"
                    v-model="questionBigItem.topic_text"
                    :options="editorOption"
                    @focus="onEditorFocus($event)"
                    @blur="onEditorBlur($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>-->
                  <myQuillEditor :contentData.sync="questionBigItem.topic_text" :classUniqueId.sync="questionBigItem.uniqueId" v-if="questionBigItem.isEditing"></myQuillEditor>
                  <div class="ql-editor" v-html="questionBigItem.topic_text" v-if="!questionBigItem.isEditing" style="width:100%"></div>
                  <div class="ql-editor" v-if="!questionBigItem.isEditing" style="width:100%">
                    <div v-if="null == questionBigItem.topic_text || questionBigItem.topic_text == ''">【空】</div>
                  </div>
                </div>
                <!-- 编辑工具栏 -->
                <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                  <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                  <el-button type="success" icon="el-icon-check" circle @click="questionBigItem.isEditing = false" :disabled="!questionBigItem.isEditing"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                  <el-button type="primary" icon="el-icon-edit" circle @click="questionBigItem.isEditing = true" :disabled="questionBigItem.isEditing"></el-button>
                  </el-tooltip>
                </div>
                <!-- 编辑工具栏 结束 -->
              </div>
              <!-- 小题 -->
              <!-- ============================================================================================================ -->
              <div v-for="(questionItem,questionItemIndex) in questionBigItem.items" class="layout_question_layout" style="float:left;width:100%;">
                <div class="layout_question_big_header background_green" style="float:left;width:20px;height:100px;">
                <!-- 左边方块 -->
              </div>
                <div class="layout_question" style="float:left;width:770px;margin-left:10px;">
                  <div class="layout_question_title" style="font-size:18px;font-weight:bold;line-height:50px;">
                    <i class="el-icon-document"></i>请添加<span class="font_question_big" style="color:#d44949;" @click="refreshCurrentCtrlObj(questionPartItemIndex,null,null,questionPartItem,null,null)">第{{questionPartItemIndex+1}}部分</span> > <span class="font_question_big" style="color:#2a82e4;" @click="refreshCurrentCtrlObj(questionPartItemIndex,questionBigItemIndex,null,questionPartItem,questionBigItem,null)">第{{questionBigItemIndex+1}}大题</span> > <span class="font_question_big" style="color:#43cf7c;" @click="refreshCurrentCtrlObj(questionPartItemIndex,questionBigItemIndex,questionItemIndex,questionPartItem,questionBigItem,questionItem)">第{{questionItemIndex+1}}小题({{questionItem.questionTypeName}})</span>的题目
                    <span>分值<el-input-number size="mini" :min="1" :max="1000" v-model="questionItem.score"></el-input-number></span>
                    <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="danger" size="mini" plain :disabled="questionBigItem.items.length <=1" @click="delTestPaperQuestionItem(questionBigItem,questionItemIndex)">删除本小题</el-button></span>
                  </div>
                  <div class="layout_question_content" :style="testPaperAnwserSheetStyle">
                    <!-- <quill-editor
                      class="layout_question_topic_input"
                      v-model="questionItem.topic_text"
                      :options="editorOption"
                      @focus="onEditorFocus($event)"
                      @blur="onEditorBlur($event)"
                      @change="onEditorChange($event)">
                    </quill-editor> -->
                    <myQuillEditor :contentData.sync="questionItem.topic_text" :classUniqueId.sync="questionItem.uniqueId" v-if="questionItem.isEditing"></myQuillEditor>
                    <div class="ql-editor" v-html="questionItem.topic_text" v-if="!questionItem.isEditing" style="width:100%"></div>
                    <div class="ql-editor" v-if="!questionItem.isEditing" style="width:100%">
                    <div v-if="null == questionItem.topic_text || questionItem.topic_text == ''">【空】</div>
                  </div>
                  </div>
                  <!-- 编辑工具栏 -->
                  <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                    <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                    <el-button type="success" icon="el-icon-check" circle @click="questionItem.isEditing = false" :disabled="!questionItem.isEditing"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                    <el-button type="primary" icon="el-icon-edit" circle @click="questionItem.isEditing = true" :disabled="questionItem.isEditing"></el-button>
                    </el-tooltip>
                  </div>
                  <!-- 编辑工具栏 结束 -->
                </div>

                <!-- 综合题 设置区域-->
                <!-- ============================================================================================================ -->
                <div class="layout_question_anwser_sheet" style="float:left;width:100%;margin-left:30px;" v-if="questionItem.question_type == questionType.comprehensive_topic.id">
                  <div class="layout_question_anwser_sheet_title" style="font-size:18px;font-weight:bold;line-height:50px;color:#a6a6a6;">
                    <i class="el-icon-document-checked"></i>答题卡显示内容

                  </div>
                  <div class="layout_question_anwser_sheet_content" :style="testPaperAnwserSheetStyle">
                    <!-- <quill-editor
                      class="layout_question_anwser_sheet_content_input"
                      v-model="questionItem.anwserSheet.topic_text"
                      :options="editorOption"
                      @focus="onEditorFocus($event)"
                      @blur="onEditorBlur($event)"
                      @change="onEditorChange($event)">
                    </quill-editor> -->
                    <myQuillEditor :contentData.sync="questionItem.anwserSheet.topic_text" :classUniqueId.sync="'anwserSheet_'+questionItem.uniqueId" v-if="questionItem.anwserSheet.isEditing"></myQuillEditor>
                    <div class="ql-editor" v-html="questionItem.anwserSheet.topic_text" v-if="!questionItem.anwserSheet.isEditing" style="width:100%;border:2px solid #000;"></div>
                  </div>
                  <!-- 编辑工具栏 -->
                  <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                    <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                    <el-button type="success" icon="el-icon-check" circle @click="questionItem.anwserSheet.isEditing = false" :disabled="!questionItem.anwserSheet.isEditing"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                    <el-button type="primary" icon="el-icon-edit" circle @click="questionItem.anwserSheet.isEditing = true" :disabled="questionItem.anwserSheet.isEditing"></el-button>
                    </el-tooltip>
                  </div>
                  <!-- 编辑工具栏 结束 -->
                </div>

                <div class="layout_question_anwser" style="float:left;width:100%;margin-left:30px;" v-if="questionItem.question_type == questionType.comprehensive_topic.id">
                  <div class="layout_question_anwser_title" style="font-size:18px;font-weight:bold;line-height:50px;color:#a6a6a6;">
                    <i class="el-icon-document-checked"></i>请添加标准答案
                  </div>
                  <div class="layout_question_anwser_content" :style="testPaperAnwserSheetStyle">
                    <!-- <quill-editor
                      class="layout_question_anwser_content_input"
                      v-model="questionItem.anwser.answer_text"
                      :options="editorOption"
                      @focus="onEditorFocus($event)"
                      @blur="onEditorBlur($event)"
                      @change="onEditorChange($event)">
                    </quill-editor> -->
                    <myQuillEditor :contentData.sync="questionItem.anwser.answer_text" :classUniqueId.sync="'anwser_'+questionItem.uniqueId" v-if="questionItem.anwser.isEditing"></myQuillEditor>
                    <div class="ql-editor" v-html="questionItem.anwser.answer_text" v-if="!questionItem.anwser.isEditing" style="width:100%"></div>
                  </div>
                  <!-- 编辑工具栏 -->
                  <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                    <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                    <el-button type="success" icon="el-icon-check" circle @click="questionItem.anwser.isEditing = false" :disabled="!questionItem.anwser.isEditing"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                    <el-button type="primary" icon="el-icon-edit" circle @click="questionItem.anwser.isEditing = true" :disabled="questionItem.anwser.isEditing"></el-button>
                    </el-tooltip>
                  </div>
                  <!-- 编辑工具栏 结束 -->
                </div>
                <!-- ============================================================================================================ -->
                <!-- 综合题 设置区域 结束-->

                <!-- 选择题 设置区域-->
                <!-- ============================================================================================================ -->
                <div  v-for="(questionOptionItem,questionOptionItemIndex) in questionItem.items"  class="layout_question_anwser_sheet" style="float:left;width:100%;margin-left:30px;" v-if="questionItem.question_type != questionType.comprehensive_topic.id">
                  <div class="layout_question_anwser_sheet_title" style="font-size:18px;font-weight:bold;line-height:50px;color:#a6a6a6;">
                    <i class="el-icon-document-checked"></i>第{{questionOptionItemIndex + 1}}个选项：{{enCharArr[questionOptionItemIndex]}}，是否正确答案
                    <el-switch
                      v-model="questionOptionItem.questionOptionIsAnwser"
                      @change="changeChoiceQuestionOptionsAnwser(questionItem)"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                    <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="success" size="mini" plain @click="addNewTestPaperChoiceQuestionOptionsItem(questionItem)">增加选项</el-button></span>
                    <span class="span_question_big_toolbar" style="margin-left:10px;"><el-button type="danger" size="mini" plain :disabled="questionItem.items.length <= 1" @click="delNewTestPaperChoiceQuestionOptionsItem(questionItem,questionOptionItemIndex)">删除选项</el-button></span>
                  </div>
                  <div class="layout_question_anwser_sheet_content" :style="testPaperAnwserSheetStyle">
                    <myQuillEditor :contentData.sync="questionOptionItem.topic_text" :classUniqueId.sync="questionOptionItem.uniqueId" v-if="questionOptionItem.isEditing"></myQuillEditor>
                    <div class="ql-editor" v-html="questionOptionItem.topic_text" v-if="!questionOptionItem.isEditing" style="width:100%"></div>
                    <!-- <quill-editor
                      class="layout_question_anwser_sheet_content_input"
                      v-model="questionOptionItem.topic_text"
                      :options="editorOption"
                      @focus="onEditorFocus($event)"
                      @blur="onEditorBlur($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>-->
                  </div>
                  <!-- 编辑工具栏 -->
                  <div class="layout_question_part_header_content_side_tool_bar" style="float:left;width:100px;margin-left:10px;">
                    <el-tooltip class="item" effect="dark" content="完成编辑" placement="top-start">
                    <el-button type="success" icon="el-icon-check" circle @click="questionOptionItem.isEditing = false" :disabled="!questionOptionItem.isEditing"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑文本" placement="top-start">
                    <el-button type="primary" icon="el-icon-edit" circle @click="questionOptionItem.isEditing = true" :disabled="questionOptionItem.isEditing"></el-button>
                    </el-tooltip>
                  </div>
                  <!-- 编辑工具栏 结束 -->
                </div>
                <!-- ============================================================================================================ -->
                <!-- 选择题 设置区域 结束-->
                
                <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;color:#999999;line-height:50px;">-第{{questionPartItemIndex+1}}部分第{{questionBigItemIndex+1}}大题第{{questionItemIndex+1}}小题写完了-</div>
              </div>
              <!-- ============================================================================================================ -->
              <!-- 小题，结束 -->
              <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;color:#999999;line-height:50px;">-第{{questionPartItemIndex+1}}部分第{{questionBigItemIndex+1}}大题写完了-</div>
            </div>
            <!-- ============================================================================================================ -->
            <!-- 大题，结束 -->
           
            
          </div>
          <!-- ============================================================================================================ -->
          <!-- 第一个部分，结束 -->
            <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;">
              <el-tooltip class="item" effect="dark" content="增加试卷部分" placement="top-start">
                <el-button type="success" icon="el-icon-plus" circle @click="addNewTestPaperQuestionPartItem"></el-button>
              </el-tooltip>
            </div>
            <div style="clear:both"></div>
          </div>
          <!-- ============================================================================================================ -->
          <!-- 每一个部分都独立一个框框，便于辨识，结束 -->



          <!-- 题目预览 -->
          <!-- ============================================================================================================ -->
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && !qustionPreviewImgMode"><!-- 临时去掉v-if="qustionPreviewMode && !qustionPreviewImgMode" -->
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
              <span>题目预览</span>
            </div>
          </div>
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && !qustionPreviewImgMode"><!-- 临时去掉v-if="qustionPreviewMode && !qustionPreviewImgMode" -->
            <div class="layout_question_preview_layout_content ql-container ql-snow" style="float:left;margin-left:100px;width:600px;">
              <div style="width:100%" class="layout_test_paper_header">
                <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                  <span class="font_question_big" style="color:#000;">{{testPaperObj.title}}</span>
                </div>
                <div class="layout_question_part_header_title" style="font-size:18px;line-height:30px;text-align:center;">
                  {{testPaperObj.examExplain}}
                </div>
                <div class="layout_question_part_header_title" style="font-size:16px;line-height:20px;text-align:center;">
                  作答时间：{{testPaperObj.examTime}}分钟
                </div>
              </div>
              <!-- 输出部分 -->
              <!-- ============================================================================================================ -->
              <div v-for="(questionPartItem,questionPartItemIndex) in testPaperObj.items" class="layout_question_topic_text ql-editor" :style="testPaperPreviewStyle">
                <div :class="'layout_question_topic_text_'+questionPartItem.uniqueId">
                  <table>
                    <tr>
                      <!-- <td width="70px">
                          <p style="text-align:right;">第{{questionPartItemIndex + 1}}部分、</p>
                          <vue-qr :id="'qr_'+questionPartItem.uniqueId" :text="createQrInfo(testPaperObj.id,questionPartItem.id,null,null)" :margin="0" colorDark="#000" colorLight="#fff" :size="70"></vue-qr>
                      </td> -->
                      <td>
                        <div v-html="questionPartItem.topic_text">
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- 输出大题 -->
                <!-- ============================================================================================================ -->
                <div v-for="(questionBigItem,questionBigItemIndex) in questionPartItem.items" class="layout_question_topic_text">
                  <div :class="'layout_question_topic_text_'+questionBigItem.uniqueId">
                    <table>
                      <tr>
                      <!-- <td width="70px">
                          <p style="text-align:right;">第{{questionBigItemIndex + 1}}大题、</p>
                          <vue-qr :id="'qr_'+questionPartItem.uniqueId" :text="createQrInfo(testPaperObj.id,questionPartItem.id,questionBigItem.id,null)" :margin="0" colorDark="#000" colorLight="#fff" :size="70"></vue-qr>
                      </td> -->
                      <td>
                        <div v-html="questionBigItem.topic_text">
                        </div>
                      </td>
                      </tr>
                    </table>
                  </div>
                  <!-- 输出小题 -->
                  <!-- 输出小题（其他题） -->
                  <!-- ============================================================================================================ -->
                  <div v-for="(questionItem,questionItemIndex) in questionBigItem.items" class="layout_question_topic_text">
                    <div :class="'layout_question_topic_text_'+questionItem.uniqueId">
                      <table>
                        <tr>
                        
                        <td width="530px">
                          <div v-html="questionItem.topic_text">
                          </div>
                        </td>
                        <td width="70px">
                            <p style="text-align:right;">第{{questionItem.no}}小题、</p>
                            <vue-qr :id="'qr_'+questionPartItem.uniqueId" :text="createQrInfo(testPaperObj.id,questionPartItem.id,questionBigItem.id,questionItem.id)" :margin="0" colorDark="#000" colorLight="#fff" :size="70"></vue-qr>
                        </td>
                        </tr>
                      </table>
                    </div>

                    <!-- 输出小题选项 -->
                    <!-- ============================================================================================================ -->
                    <div v-for="(questionOptionItem,questionOptionItemIndex) in questionItem.items" class="layout_question_topic_text" v-if="questionItem.question_type != questionType.comprehensive_topic.id">
                      <div :class="'layout_question_topic_text_'+questionOptionItem.uniqueId">
                        <table>
                          <tr>
                            <td width="70px">
                                <p style="text-align:right;">{{enCharArr[questionOptionItemIndex]}}、</p>
                            </td>
                            <td>
                              <div v-html="questionOptionItem.topic_text">
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                    </div>
                    <!-- ============================================================================================================ -->
                    <!-- 输出小题选项 完成-->

                  </div>
                  <!-- ============================================================================================================ -->
                  <!-- 输出小题（其他题） 完成-->
                  <!-- 输出小题 完成-->

                  
                </div>
                <!-- ============================================================================================================ -->
                <!-- 输出大题 完成-->
              </div>
              <!-- ============================================================================================================ -->
              <!-- 输出部分 完成 -->
            </div>

            <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;color:#999999;line-height:50px;">-所有题目预览完了-</div>
            <div style="clear:both"></div>
          </div>
          <!-- ============================================================================================================ -->
          <!-- 题目预览结束 -->

          <!-- 题目答题卡预览 -->
          <!-- ============================================================================================================ -->
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && !qustionPreviewImgMode">
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
              <span>题目答题卡预览</span>
            </div>
          </div>
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && !qustionPreviewImgMode">
            <div class="layout_question_preview_layout_content ql-container ql-snow" style="float:left;margin-left:100px;width:600px;">
              <div style="width:100%" class="layout_test_paper_header">
                <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                  <span class="font_question_big" style="color:#000;">{{testPaperObj.title}}</span>
                </div>
                <div class="layout_question_part_header_title" style="font-size:18px;line-height:30px;text-align:center;">
                  {{testPaperObj.examExplain}}
                </div>
                <div class="layout_question_part_header_title" style="font-size:16px;line-height:20px;text-align:center;">
                  作答时间：{{testPaperObj.examTime}}分钟
                </div>
              </div>
              <!-- 输出部分 -->
              <!-- ============================================================================================================ -->
              <div v-for="(questionPartItem,questionPartItemIndex) in testPaperObj.items" class="layout_question_topic_text ql-editor" :style="testPaperPreviewStyle">
                <!--  <div :class="'layout_question_anwser_sheet_'+questionPartItem.uniqueId">
                  <table>
                    <td width="70px">
                        <p style="text-align:right;">第{{questionPartItemIndex + 1}}部分、</p>
                    </td>
                    <td>
                      <div v-html="questionPartItem.topic_text">
                      </div>
                    </td>
                  </table>
                </div> -->
                <!-- 输出大题 -->
                <!-- ============================================================================================================ -->
                <div v-for="(questionBigItem,questionBigItemIndex) in questionPartItem.items" class="layout_question_topic_text">
                  <!-- <div :class="'layout_question_anwser_sheet_'+questionBigItem.uniqueId">
                    <table>
                      <td width="70px">
                          <p style="text-align:right;">第{{questionBigItemIndex + 1}}大题、</p>
                      </td>
                      <td>
                        <div v-html="questionBigItem.topic_text">
                        </div>
                      </td>
                    </table>
                  </div> -->
                    <!-- 输出小题（其他题） -->
                    <!-- ============================================================================================================ -->
                    <div v-for="(questionItem,questionItemIndex) in questionBigItem.items" class="layout_question_topic_text">
                      <div style="border:2px solid black;" :class="'layout_question_anwser_sheet_'+questionItem.uniqueId">
                        <table>
                          <tr>
                            <td width="70px">
                                <p style="text-align:right;">第{{questionItem.no}}小题、</p>
                                <vue-qr :id="'qr_'+questionItem.uniqueId" :text="'layout_question_anwser_sheet_'+questionItem.uniqueId" :margin="0" colorDark="#000" colorLight="#fff" :size="70"></vue-qr>
                            </td>
                            <td width="480px" v-if="questionItem.question_type == questionType.comprehensive_topic.id">
                              <div v-html="questionItem.anwserSheet.topic_text">
                              </div>
                              
                            </td>
                            <!-- 输出小题选项 -->
                              <!-- ============================================================================================================ -->
                              <td width="480px" v-if="questionItem.question_type != questionType.comprehensive_topic.id">
                                <div>
                                  <span v-for="(questionOptionItem,questionOptionItemIndex) in questionItem.items" style="text-align:right;border:2px solid black;text-align:center;font-weight:bold;margin-left:10px;margin-top:30px;">&nbsp;&nbsp;&nbsp;{{enCharArr[questionOptionItemIndex]}}&nbsp;&nbsp;&nbsp;</span>
                                </div>
                              </td>
                              <!-- ============================================================================================================ -->
                              <!-- 输出小题选项 完成-->
                          </tr>
                        </table>
                        
                      </div>
                    </div>
                    <!-- ============================================================================================================ -->
                  <!-- 输出小题（其他题） 完成-->


                </div>
                <!-- ============================================================================================================ -->
                <!-- 输出大题 完成-->
              </div>
              <!-- ============================================================================================================ -->
              <!-- 输出部分 完成 -->
            </div>

            <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;color:#999999;line-height:50px;">-所有题目答题卡预览完了-</div>
            <div style="clear:both"></div>
          </div>
          <!-- ============================================================================================================ -->
          <!-- 题目答题卡预览结束 -->

          <!-- 题目预览，图片模式 -->
          <!-- ============================================================================================================ -->
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && qustionPreviewImgMode">
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
              <span>题目预览（图片）</span>
            </div>
          </div>
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && qustionPreviewImgMode">
            <div class="layout_question_preview_layout_content ql-container ql-snow" style="float:left;margin-left:100px;width:600px;">
              <div style="width:100%" class="layout_test_paper_header">
                <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
                  <span class="font_question_big" style="color:#000;">{{testPaperObj.title}}</span>
                </div>
                <div class="layout_question_part_header_title" style="font-size:18px;line-height:30px;text-align:center;">
                  {{testPaperObj.examExplain}}
                </div>
                <div class="layout_question_part_header_title" style="font-size:16px;line-height:20px;text-align:center;">
                  作答时间：{{testPaperObj.examTime}}分钟
                </div>
              </div>
              <!-- 输出部分 -->
              <!-- ============================================================================================================ -->
              <div v-for="(questionPartItem,questionPartItemIndex) in testPaperObj.items" class="layout_question_topic_text ql-editor" :style="testPaperPreviewStyle">
                <!-- <div :class="'layout_question_topic_text_'+questionPartItem.uniqueId" v-html="questionPartItem.topic_text">
                </div> -->
                <img :src="questionPartItem.imgFile" />
                <!-- 输出大题 -->
                <!-- ============================================================================================================ -->
                <div v-for="(questionBigItem,questionBigItemIndex) in questionPartItem.items" class="layout_question_topic_text">
                  <!-- <div :class="'layout_question_topic_text_'+questionBigItem.uniqueId" v-html="questionBigItem.topic_text">
                  </div> -->
                  <img :src="questionBigItem.imgFile" />
                    <!-- 输出小题（其他题） -->
                    <!-- ============================================================================================================ -->
                    <div v-for="(questionItem,questionItemIndex) in questionBigItem.items" class="layout_question_topic_text">
                      <!--<div :class="'layout_question_topic_text_'+questionItem.uniqueId" v-html="questionItem.topic_text">
                      </div>-->
                      <img :src="questionItem.imgFile" />
                      <!-- 输出小题选项 -->
                      <!-- ============================================================================================================ -->
                      <div v-for="(questionOptionItem,questionOptionItemIndex) in questionItem.items" class="layout_question_topic_text" v-if="questionItem.question_type != questionType.comprehensive_topic.id">
                        <!--<div :class="'layout_question_topic_text_'+questionItem.uniqueId" v-html="questionOptionItem.topic_text">
                        </div>-->
                        <img :src="questionOptionItem.imgFile" />
                      </div>
                      <!-- ============================================================================================================ -->
                      <!-- 输出小题选项 完成-->
                    </div>
                    <!-- ============================================================================================================ -->
                  <!-- 输出小题（其他题） 完成-->

                  
                </div>
                <!-- ============================================================================================================ -->
                <!-- 输出大题 完成-->
              </div>
              <!-- ============================================================================================================ -->
              <!-- 输出部分 完成 -->
            </div>

            <div class="layout_padding_footer" style="float:left;height:50px;width:100%;text-align:center;color:#999999;line-height:50px;">-所有题目预览完了-</div>
            <div style="clear:both"></div>
          </div>
          <!-- ============================================================================================================ -->
          <!-- 题目预览，图片模式结束 -->

          

          <!-- <div class="layout_question_preview_layout" style="float:left;margin-left:210px;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode">
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
              <span>题目预览（图片）</span>
            </div>
          </div>
          <div class="layout_question_preview_img_layout" style="float:left;margin-left:210px;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode">
            <div class="preview_img" style="width:100%;">
              <img :src="testPaperPreviewImg"/>

            </div>
          </div> -->

          <!-- 题目预览按钮， -->
          <!-- <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && qustionPreviewImgMode">
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">
              <span>题目预览（模拟下载版本）</span>
            </div>
          </div>
          <div class="layout_question_preview_layout" style="margin-left:auto;margin-right:auto;margin-top:10px;width:800px;background-color:#FFF;" v-if="qustionPreviewMode && qustionPreviewImgMode">
            <div class="layout_question_part_header_title" style="font-size:22px;font-weight:bold;line-height:50px;text-align:center;">

              <div class="div_menu_item background_orange" style="margin-top:30px;" @click="createTestPaperPreviewPdf()" v-if="qustionPreviewMode">
                <i class="el-icon-collection-tag"></i>预览整张试卷
              </div>

              <div class="div_menu_item background_orange" style="margin-top:30px;" @click="createTestPaperAnwserSheetPreviewPdf()" v-if="qustionPreviewMode">
                <i class="el-icon-collection-tag"></i>预览整张答题卡
              </div>

              <div class="div_menu_item background_orange" style="margin-top:30px;" @click="downloadTestPaperAndAnwserSheetPdf()" v-if="qustionPreviewMode">
                <i class="el-icon-collection-tag"></i>下载试卷和答题卡PDF
              </div>
            </div>
          </div> -->
          <!-- 题目预览按钮，结束 -->
          
          <!-- 增加复数小题 -->
          <el-dialog
            :title="dialogVisibleForAddQuestionTypeName"
            :visible.sync="dialogVisibleForAddQuestion"
            width="600px"
            >
            <div style="width:100%;text-align:center">
                <span>添加<el-input-number size="mini" :min="1" :max="1000" v-model="dialogVisibleForAddQuestionNums"></el-input-number>道小题</span>
            </div>
            
            <span slot="footer" class="dialog-footer">

                <el-button @click="dialogVisibleForAddQuestion = false">考虑一下</el-button>
                <el-button v-if="dialogVisibleForAddQuestionTypeName == questionType.single_choice.name" type="primary" @click="dialogVisibleForAddQuestion = false;addNewTestPaperChoiceQuestionItem(dialogVisibleForAddQuestionParent,dialogVisibleForAddQuestionNums)">立刻添加</el-button>
                <el-button v-if="dialogVisibleForAddQuestionTypeName == questionType.comprehensive_topic.name" type="primary" @click="dialogVisibleForAddQuestion = false;addNewTestPaperQuestionItem(dialogVisibleForAddQuestionParent,dialogVisibleForAddQuestionNums)">立刻添加</el-button>
            </span>
          </el-dialog>
          <!-- 增加复数小题，结束 -->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
import myQuillEditor from './myEditor'
import vueQr from 'vue-qr'
//引入pdf
import "pdfmake/build/pdfmake"
import "pdfmake/build/vfs_fonts"
//引入html2canvas
import html2canvas from "html2canvas"
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import {

	apiCommonExamSeleElementTestById

} from '@/api/api.js'

axios.defaults.responseType = 'json'
export default {
  name: 'testPaperMaker',
  components:{
     quillEditor,
     myQuillEditor,
     vueQr
  },
  data () {
    return {
      /**
       * 允许上传的图片类型
       */
      uploadImgAccepText:".jpg,.jpeg,.png",
      /**
       * 试卷预览图片
       */
      testPaperPreviewImg: "",
      /**
       * 题型数组
       */
      questionType:{
        single_choice:{
          id:"1000",
          name:"单选/多选题"
        },
        single_choice_item:{
          id:"1001",
          name:"单选题选项"
        },
        more_choices:{
          id:"2000",
          name:"多选题"
        },
        more_choices_item:{
          id:"2001",
          name:"多选题选项"
        },
        judge_topic:{
          id:"3000",
          name:"判断题"
        },
        filling_topic:{
          id:"4000",
          name:"填空题"
        },
        composition_topic:{
          id:"5000",
          name:"写作题"
        },
        use_topic:{
          id:"6000",
          name:"应用题"
        },
        use_item_topic:{
          id:"6001",
          name:"应用题小题"
        },
        comprehensive_topic:{
          id:"7000",
          name:"综合题"
        },
        comprehensive_item_topic:{
          id:"7001",
          name:"综合题小题"
        },
      },
      /**
       * 字母数组，预设26个
       */
      enCharArr:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      /**
       * 打印纸张的宽度
       * 打印尺寸大小预设值，默认是A4
       * A4纸张的尺寸是210×297mm，按1英寸=25.41mm换算，即8.264×11.688英寸 
       * 所以，A4纸96dpi下的分辨率是794×1123，这就是我们在制作网页的时候需要的象素。 
       * 但是打印机是无法满幅打印的，总要有页边距，所以我们在制作网页的时候必须减去页边距。
       */
      printA4PaperSizeWidth:649,
      /**
       * 打印纸张的高度
       * 打印尺寸大小预设值，默认是A4
       * A4纸张的尺寸是210×297mm，按1英寸=25.41mm换算，即8.264×11.688英寸 
       * 所以，A4纸96dpi下的分辨率是794×1123，这就是我们在制作网页的时候需要的象素。 
       * 但是打印机是无法满幅打印的，总要有页边距，所以我们在制作网页的时候必须减去页边距。
       */
      printA4PaperSizeHeight:978,

      /**
       * 打印纸张的宽度
       * 打印尺寸大小预设值，可选是A3，横版打印
       */
      printA3PaperSizeWidth:1298,

      /**
       * 打印纸张的高度
       * 打印尺寸大小预设值，可选是A3，横版打印
       */
      printA3PaperSizeHeight:978,

      /**
       * PDF输出参数，A4宽度
       */
      pdfPrintA4PaperSizeWidth:510,
      /**
       * PDF输出参数，A4高度
       */
      pdfPrintA4PaperSizeHidth:721,
      /**
       * PDF输出参数，A3宽度，横版尺寸
       */
      pdfPrintA3PaperSizeWidth:1020,
      /**
       * PDF输出参数，A3高度，横版尺寸
       */
      pdfPrintA3PaperSizeHidth:721,
      /**
       * 试卷
       * 实体类
       * 包括试卷中的所有页面
       */
      testPaper:{
        
        "affix": null,//"string"
        "createDate": null,//"2020-08-16T02:38:43.693Z",
        "downloadNum": null,//int
        "downloadStatus": null,//int
        "elementTest": null,//"string"
        "gradeClass": null,//"string"
        "id": null,//int
        "modifyDate": null,//"2020-08-16T02:38:43.693Z",
        "purpose": null,//int
        "putInto": null,//int
        "sn": null,//"string"
        "status": null,//int
        "subject": null,//"string"
        "title": null,//"string"
        "versions": null,//int
        "years": null,//"string"
        "score": null,//"string"
        "examExplain": null,//"string"
        "examTime": null,//int
        //辅助属性段
        "uniqueId": 0,//string,前端标识元素使用
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
      },
      /**
       * 大题目-部分
       * 实体类
       * 代表着题目的大分类，下面可以有其他部分、大题目
       */
      questionBigPart:{
          "parent_id": null,//int
          "parent_sn": null,//"string"
          "create_date": null,//"2020-08-16T02:37:04.456Z"
          "id": null,//int
          "modify_date": null,//"2020-08-16T02:37:04.456Z"
          "paper_id": null,////int
          "score": null,//"string"
          "sn": null,//"string"
          "topic_text": null,//"string"
          "weight": null,//int
          //辅助属性段，用来辅助前端绑定大题目
          "uniqueId": 1,//string,前端标识元素使用
          "isHide":false,//标志是否隐藏
          "imgFile":null,//imgFile,用于保存上传的文件使用
          "isEditing":false,//标志当前是否处于被编辑状态
          "items": [],
      },
      /**
       * 大题目-大题目
       * 实体类
       * 代表着题目的分类，下面可以有其他题目
       */
      questionBig:{
          "parent_id": null,//int
          "parent_sn": null,//"string"
          "create_date": null,//"2020-08-16T02:37:04.456Z"
          "id": null,//int
          "modify_date": null,//"2020-08-16T02:37:04.456Z"
          "paper_id": null,////int
          "score": null,//"string"
          "sn": null,//"string"
          "topic_text": null,//"string"
          "weight": null,//int
          //辅助属性段，用来辅助前端绑定小题
          "uniqueId": 2,//string,前端标识元素使用
          "imgFile":null,//imgFile,用于保存上传的文件使用
          "isEditing":false,//标志当前是否处于被编辑状态
          "items": [],
      },
      /**
       * 题目-小题目
       * 实体类
       * 代表着用于作答的具体题目，实际用于学生作答
       */
      question:{
        "create_date": null,//"string"
        "modify_date": null,//"string"
        "is_include_images": false,
        "is_include_items": false,
        "parent_id": null,//int
        "parent_sn": null,//"string"
        "question_type": null,//"string"
        "score": 5,//"string"
        "sn": null,//"string"
        "topic_text": null,//"string"
        "weight": null,//int
        //辅助属性段，用来辅助前端绑定小题
        "uniqueId": 3,//string,前端标识元素使用
        "items": [],
        "anwserSheet":null,
        "anwser": null,
        "questionTypeName":null,//string
        "questionOptionIsAnwser":false,//是否正确答案
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
      },
      /**
       * 答题卡
       * 实体类
       * 对应每个题目
       */
      anwserSheet:{
        "id": null,//int
        "sn": null,//"string"
        "create_date": null,//"2020-08-16T02:37:04.456Z"
        "topic_text": null,//"<div><span>揽</span><span>洗</span></div><div><span>直上中天（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）日月</span></div><div><span>欲倾东海（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）乾坤</span></div>",
        "question_id": null,//int
        "question_sn": null,//"202008160086835652937646080"
        //辅助属性段
        "uniqueId": 4,//string,前端标识元素使用
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
      },
      /**
       * 答案
       * 实体类
       * 对应每个题目
       */
      anwser:{
        "id": null,//1,
        "sn": null,//"202008130086594881210810368",
        "create_date": null,//"2020-08-13 19:48:34",
        "answer_text": null,//"B",
        "is_include_images": false,
        "question_id": null,//1,
        "question_sn": null,//"202008130086588928334757888"
        "analysis_text": null,//"string"解题思路
        //辅助属性段
        "uniqueId": 5,//string,前端标识元素使用
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
      },
      /**
       * 试卷的基本信息
       */
      form:{
				title:'',
				examExplain:'',
				examTime:1,
				elementTest:'',
				tag_list:[
				{
					id:''
				},
				{
					id:''
				},
				{
					id:''
				},{
					id:''
				},
				{
					id:''
				}
				]
      },
      /**
       * 批量生成试卷信息模板
       */
      createTestPaperInfoObj:{
        testPaperId:null,
        students:[
          {
            uid:null,
            utype:"student"
          }
        ]
      },
      //正式用于引用的属性
      /**
       * 新增多道小题
       */
      dialogVisibleForAddQuestion: false,
      /**
       * 新增多道小题的类型，与前面的实体类匹配
       */
      dialogVisibleForAddQuestionTypeName: "单选/多选题",
      /**
       * 新增多道小题的数量
       */
      dialogVisibleForAddQuestionNums: 1,
      /**
       * 新增多道小题的父节点，bigquestion
       */
      dialogVisibleForAddQuestionParent: 1,
      /**
       * 二维码包含的数据样板
       */
      qrInfoObj:{
        uid: null,
        utype: null,
      },
      /**
       * 函数方法用户类型，根据不同用户，调用的API路径都不一样例如XX/admin/XX、XX/user/XX
       * 默认是admin
       */
      userTypeForMethods: "admin",
      /**
       * 执行更新题目图片至服务器方法执行标志
       */
      uploadQuestionImgHandleExecFlag: false,
      /**
       * 测试用试卷信息ID
       */
      testPaperObjIdForTestData: 10,
      /**
       * 全屏加载锁定
       */
      fullscreenLoading: false,
      /**
       * 预览模式开关
       */
      qustionPreviewMode: false,
      /**
       * 预览模式，纯图模式，开关
       */
      qustionPreviewImgMode: false,
      /**
       * 最近选择操作对象
       */
      currentCtrlObj: {
        summary:"未选中",
        questionBigPart:{
          "index": null,
          "topic_text": null,
          "uniqueId": null,
        },
        questionBig:{
          "index": null,
          "topic_text": null,
          "uniqueId": null,
        },
        question:{
          "index": null,
          "topic_text": null,
          "uniqueId": null,
        },
      },
      /**
       * 预览时，大题的编号
       */
      previewQuestionBigNum:1,
      /**
       * 预览时，小题的编号
       */
      previewQuestionNum:1,
      /**
       * 编辑器部分
       */
      editor: null,   // 富文本编辑器对象
      content: null, // 富文本编辑器默认内容
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

                  [{'header': 1}, {'header': 2}],               // custom button values
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                  [{'direction': 'rtl'}],                         // text direction

                  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

                  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                  [{'font': []}],
                  [{'align': []}],
                  ['image','clean'],//去除video即可 暂时去掉公式, 'formula'
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
      /**
       * 试卷有效作答区域的样式
       */
      testPaperAnwserSheetStyle:"float:left;width:510px;",
      /**
       * 预览宽度
       */
      testPaperPreviewStyle:"width:580px;",
      /**
       * 试卷
       */
      testPaperObj:{
        "affix": null,//"string"附件
        "createDate": null,//"2020-08-16T02:38:43.693Z",
        "downloadNum": null,//int
        "downloadStatus": null,//int
        "elementTest": null,//"string"
        "gradeClass": null,//"string"
        "id": null,//int
        "modifyDate": null,//"2020-08-16T02:38:43.693Z",
        "purpose": null,//int
        "putInto": null,//int
        "sn": null,//"string"
        "status": null,//int
        "subject": null,//"string"
        "title": "新建试卷",//"string"
        "versions": null,//int
        "years": null,//"string"
        "score": null,//"string"
        "examExplain": null,//"string"
        "examTime": null,//int
        //辅助属性段，用来辅助前端绑定小题
        "uniqueId": 6,//string,前端标识元素使用
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
        "items": [
            //预设试卷第{{questionPartItemIndex+1}}部分
            {
            "parent_id": null,//int
            "parent_sn": null,//"string"
            "create_date": null,//"2020-08-16T02:37:04.456Z"
            "id": null,//int
            "modify_date": null,//"2020-08-16T02:37:04.456Z"
            "paper_id": null,////int
            "score": null,//"string"
            "sn": null,//"string"
            "topic_text": null,//"string"
            "weight": null,//int
            //辅助属性段，用来辅助前端绑定大题目
            "uniqueId": 7,//string,前端标识元素使用
            "isHide":false,//标志是否隐藏
            "imgFile":null,//imgFile,用于保存上传的文件使用
            "isEditing":false,//标志当前是否处于被编辑状态
            "items": [
              //预设试卷第{{questionBigItemIndex+1}}大题
              {
                  "parent_id": null,//int
                  "parent_sn": null,//"string"
                  "create_date": null,//"2020-08-16T02:37:04.456Z"
                  "id": null,//int
                  "modify_date": null,//"2020-08-16T02:37:04.456Z"
                  "paper_id": null,////int
                  "score": null,//"string"
                  "sn": null,//"string"
                  "topic_text": null,//"string"
                  "weight": null,//int
                  //辅助属性段，用来辅助前端绑定小题
                  "uniqueId": 8,//string,前端标识元素使用
                  "imgFile":null,//imgFile,用于保存上传的文件使用
                  "isEditing":false,//标志当前是否处于被编辑状态
                  "items": [
                    //预设试卷第一小题
                    {
                      "create_date": null,//"string"
                      "modify_date": null,//"string"
                      "is_include_images": false,
                      "is_include_items": false,
                      "parent_id": null,//int
                      "parent_sn": null,//"string"
                      "question_type": null,//"string"
                      "score": 5,//"string"
                      "sn": null,//"string"
                      "topic_text": null,//"string"
                      //辅助属性段，用来辅助前端绑定小题
                      "uniqueId": 9,//string,前端标识元素使用
                      "questionTypeName": null,//string
                      "questionOptionIsAnwser":false,//是否正确答案
                      "imgFile":null,//imgFile,用于保存上传的文件使用
                      "isEditing":false,//标志当前是否处于被编辑状态
                      "items": [],
                      "anwserSheet":{//第一小题答题卡
                        "id": null,//int
                        "sn": null,//"string"
                        "create_date": null,//"2020-08-16T02:37:04.456Z"
                        "topic_text": "<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>",//"<div><span>揽</span><span>洗</span></div><div><span>直上中天（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）日月</span></div><div><span>欲倾东海（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）乾坤</span></div>",
                        "question_id": null,//int
                        "question_sn": null,//"202008160086835652937646080"
                        //辅助属性段，用来辅助前端绑定小题
                        "uniqueId": 10,//string,前端标识元素使用
                        "isNull": true,//是否答题卡区域为空
                        "imgFile":null,//imgFile,用于保存上传的文件使用
                        "isEditing":false,//标志当前是否处于被编辑状态
                      },//第一小题答题卡结束
                      "anwser": {//第一小题答案
                        "id": null,//1,
                        "sn": null,//"202008130086594881210810368",
                        "create_date": null,//"2020-08-13 19:48:34",
                        "answer_text": "<p>参考答案：略</p>",//"B",
                        "is_include_images": false,
                        "question_id": null,//1,
                        "question_sn": null,//"202008130086588928334757888"
                        "analysis_text": "<p>解题思路：略</p>",//"string"解题思路
                        //辅助属性段
                        "uniqueId": 11,//string,前端标识元素使用
                        "imgFile":null,//imgFile,用于保存上传的文件使用
                        "isEditing":false,//标志当前是否处于被编辑状态
                      },//第一小题答案结束
                      "weight": null,//int
                    },//预设试卷第一小题结束
                  ],
              },//预设试卷第{{questionBigItemIndex+1}}大题技术
            ],
        },//试卷第{{questionPartItemIndex+1}}部分结束
      ],
      }

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.resetTestPaperObj()
      if(localStorage.getItem('testPaperCache')!=null)
      {
        this.testPaperObj = JSON.parse(localStorage.getItem('testPaperCache'))
        this.$message.success('成功读取上次组卷的历史记录！')
        console.log("已读取上次组卷的历史记录 ")
        this.$forceUpdate();
      }
      if(localStorage.getItem('newTestPaperInfo')!=null)
      {
        var newTestPaperInfo = JSON.parse(localStorage.getItem('newTestPaperInfo'))
        this.form = newTestPaperInfo.form
        this.testPaperObj.title = newTestPaperInfo.form.title
        this.testPaperObj.examExplain = newTestPaperInfo.form.examExplain
        this.testPaperObj.examTime = newTestPaperInfo.form.examTime
      }

      this.qrInfoObj.uid = localStorage.getItem("userID").toString()
      this.qrInfoObj.utype = localStorage.getItem("loginUserType").toString()
      //console.log(this.$route.query.createTestPaperInfoObj)
      // console.log(this.$router.params.createTestPaperInfoObj)
      if(null != this.$route.query && null != this.$route.query.createTestPaperInfoObj)
      {
        //进入批量生产模式
        this.createTestPaperInfoObj = this.$route.query.createTestPaperInfoObj
        
        apiCommonExamSeleElementTestById(this.createTestPaperInfoObj.testPaperId).then(res => {
          if(!res.data.result)
          {
            this.$message.error('获取试卷失败，无法下载！')
            console.log("获取试卷失败，无法下载！")
            return
          }

          var resResultData = res.data

          console.log(resResultData)

          this.testPaperObj = JSON.parse(resResultData.data.elementTest)

          this.$options.methods.multiDownloadTestPaperForStudent.bind(this)(this.createTestPaperInfoObj.students)
        })
        
      }

      /**
       * 启动自动保存功能
       */
      this.$options.methods.autoSaveTestPaperTempCache.bind(this)(10 * 60 * 1000 )
    })
      //console.log(this.testPaperObj)
      //this.editor = this.$refs.myQuillEditor.quill;
      //console.log(this.testPaperObj.items[0].topic_text)
  },
  beforeDestroy(){
    //this.editor = null;
    //delete this.editor;
  },
  methods: {
    /**
     * 测试100个学生批量下载
     */
    testFor100StudentsDownload(){
      var studentIdArr = [{suid:1}]
      this.$options.methods.multiDownloadTestPaperForStudent.bind(this)(studentIdArr)
    },
    /**
     * 为学生批量下载试卷，并加上防伪信息
     */
    multiDownloadTestPaperForStudent(studentIdArr){
      this.$options.methods.startTestPaperImgPreview.bind(this)()

      setTimeout(() => {
        if(this.fullscreenLoading == false)
        {
          //说明预览图操作已经完成
          console.log("预览图操作已经完成")
          
          //开始批量打包
          this.$options.methods.multiDownloadTestPaperAndAnwserSheetPdf.bind(this)(studentIdArr)
          
        }
      },500)
    },
    /**
     * 获取二维码信息用于防伪
     */
    createQrInfo(paperId,qPartId,qBigId,qId) {
      //深拷贝

      let objString = JSON.stringify(this.qrInfoObj)
      let newObj = JSON.parse(objString)

      newObj.paperId = paperId
      newObj.qPartId = qPartId
      newObj.qBigId = qBigId
      newObj.qId = qId

      return JSON.stringify(newObj)

    },
    /**
     * uuid生成器
     */
    createUuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    /**
     * 深拷贝，即对实体类进行内存复制，新建一个对象
     */
    copyPojo(pojoForCopy) {
      let objString = JSON.stringify(pojoForCopy)
      let newObj = JSON.parse(objString)
      //加上时间戳作为唯一标识
      newObj.uniqueId = this.$options.methods.createUuid.bind(this)()
      //console.log("深拷贝后，新对象的uniqueId >>>>> " + newObj.uniqueId)
      return newObj
    },
    /**
     * 重置试卷
     */
    resetTestPaperObj(){
      //深拷贝一个实体类对象
      this.testPaperObj = {
        "affix": null,//"string"附件
        "createDate": null,//"2020-08-16T02:38:43.693Z",
        "downloadNum": null,//int
        "downloadStatus": null,//int
        "elementTest": null,//"string"
        "gradeClass": null,//"string"
        "id": null,//int
        "modifyDate": null,//"2020-08-16T02:38:43.693Z",
        "purpose": null,//int
        "putInto": null,//int
        "sn": null,//"string"
        "status": null,//int
        "subject": null,//"string"
        "title": "新建试卷",//"string"
        "versions": null,//int
        "years": null,//"string"
        "score": null,//"string"
        "examExplain": null,//"string"
        "examTime": null,//int
        //辅助属性段，用来辅助前端绑定小题
        "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
        "imgFile":null,//imgFile,用于保存上传的文件使用
        "isEditing":false,//标志当前是否处于被编辑状态
        "items": [
            //预设试卷第{{questionPartItemIndex+1}}部分
            {
            "parent_id": null,//int
            "parent_sn": null,//"string"
            "create_date": null,//"2020-08-16T02:37:04.456Z"
            "id": null,//int
            "modify_date": null,//"2020-08-16T02:37:04.456Z"
            "paper_id": null,////int
            "score": null,//"string"
            "sn": null,//"string"
            "topic_text": null,//"string"
            "weight": null,//int
            //辅助属性段，用来辅助前端绑定大题目
            "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
            "isHide":false,//标志是否隐藏
            "imgFile":null,//imgFile,用于保存上传的文件使用
            "isEditing":false,//标志当前是否处于被编辑状态
            "items": [
              //预设试卷第{{questionBigItemIndex+1}}大题
              {
                  "parent_id": null,//int
                  "parent_sn": null,//"string"
                  "create_date": null,//"2020-08-16T02:37:04.456Z"
                  "id": null,//int
                  "modify_date": null,//"2020-08-16T02:37:04.456Z"
                  "paper_id": null,////int
                  "score": null,//"string"
                  "sn": null,//"string"
                  "topic_text": null,//"string"
                  "weight": null,//int
                  //辅助属性段，用来辅助前端绑定小题
                  "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
                  "imgFile":null,//imgFile,用于保存上传的文件使用
                  "isEditing":false,//标志当前是否处于被编辑状态
                  "items": [
                    //预设试卷第一小题
                    {
                      "create_date": null,//"string"
                      "modify_date": null,//"string"
                      "is_include_images": false,
                      "is_include_items": false,
                      "parent_id": null,//int
                      "parent_sn": null,//"string"
                      "question_type": this.questionType.comprehensive_topic.id,//"string"
                      "score": 5,//"string"
                      "sn": null,//"string"
                      "topic_text": null,//"string"
                      //辅助属性段，用来辅助前端绑定小题
                      "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
                      "questionTypeName" : this.questionType.comprehensive_topic.name,
                      "questionOptionIsAnwser":false,//是否正确答案
                      "imgFile":null,//imgFile,用于保存上传的文件使用
                      "isEditing":false,//标志当前是否处于被编辑状态
                      "items": [],
                      "anwserSheet":{//第一小题答题卡
                        "id": null,//int
                        "sn": null,//"string"
                        "create_date": null,//"2020-08-16T02:37:04.456Z"
                        "topic_text": "<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>",//"<div><span>揽</span><span>洗</span></div><div><span>直上中天（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）日月</span></div><div><span>欲倾东海（</span><span style=\"width: 26.25px; text-indent: 0px;\"></span><span>）乾坤</span></div>",
                        "question_id": null,//int
                        "question_sn": null,//"202008160086835652937646080"
                        //辅助属性段，用来辅助前端绑定小题
                        "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
                        "isNull": true,//是否答题卡区域为空
                        "imgFile":null,//imgFile,用于保存上传的文件使用
                        "isEditing":false,//标志当前是否处于被编辑状态
                      },//第一小题答题卡结束
                      "anwser": {//第一小题答案
                        "id": null,//1,
                        "sn": null,//"202008130086594881210810368",
                        "create_date": null,//"2020-08-13 19:48:34",
                        "answer_text": "<p>参考答案：略</p>",//"B",
                        "is_include_images": false,
                        "question_id": null,//1,
                        "question_sn": null,//"202008130086588928334757888"
                        "analysis_text": "<p>解题思路：略</p>",//"string"解题思路
                        //辅助属性段
                        "uniqueId": this.$options.methods.createUuid.bind(this)(),//string,前端标识元素使用
                        "imgFile":null,//imgFile,用于保存上传的文件使用
                        "isEditing":false,//标志当前是否处于被编辑状态
                      },//第一小题答案结束
                      "weight": null,//int
                    },//预设试卷第一小题结束
                  ],
              },//预设试卷第{{questionBigItemIndex+1}}大题技术
            ],
        },//试卷第{{questionPartItemIndex+1}}部分结束
      ],
      }
      this.$options.methods.testPaperUpdateScore.bind(this)()
      this.qustionPreviewMode = false
      //重置完成
    },
    /**
     * 新增一个试卷部分
     */
    addNewTestPaperQuestionPartItem () {
      //深拷贝一个实体类对象
      let newQuestionBigPartItem = this.$options.methods.copyPojo.bind(this)(this.questionBigPart);
      let newQuestionBigItem = this.$options.methods.copyPojo.bind(this)(this.questionBig);
      let newQuestionItem = this.$options.methods.copyPojo.bind(this)(this.question);
      let newQuestionAnwserItem = this.$options.methods.copyPojo.bind(this)(this.anwser);
      let newQuestionAnwserSheetItem = this.$options.methods.copyPojo.bind(this)(this.anwserSheet);
      //初始化数值
      newQuestionAnwserSheetItem.isNull = true
      newQuestionItem.question_type = this.questionType.comprehensive_topic.id
      newQuestionItem.questionTypeName = this.questionType.comprehensive_topic.name
      // newQuestionItem.topic_text = "<p>请问题目是什么？</p>"
      // newQuestionBigItem.topic_text = "<p>请问大题题目是什么？</p>"
      // newQuestionBigPartItem.topic_text = "<p>请问本部分的标题是什么？</p>"
      newQuestionAnwserItem.answer_text = "<p>参考答案：略</p>"
      newQuestionAnwserItem.analysis_text = "<p>解题思路：略</p>"

      newQuestionItem.items = []
      newQuestionBigItem.items = []
      newQuestionBigPartItem.items = []

      //嵌套成为完整的部分
      newQuestionItem.anwser = newQuestionAnwserItem
      newQuestionItem.anwserSheet = newQuestionAnwserSheetItem
      newQuestionBigItem.items.push(newQuestionItem)
      newQuestionBigPartItem.items.push(newQuestionBigItem)
      //加入试卷当中
      this.testPaperObj.items.push(newQuestionBigPartItem)

      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 为一个试卷的部分，新增一个大题目
     */
    addNewTestPaperQuestionBigItem (questionBigPartItem) {
      //console.log("开始调用addNewTestPaperQuestionBigItem")
      //console.log(this.currentCtrlObj)
      //当传值为空时
      if(null == questionBigPartItem)
      {
        if(null == this.currentCtrlObj.questionBigPart.uniqueId)
        {
          //没有选中试卷部分，就无法新增大题
          this.$message.error('请选择一个试卷部分，尝试点击第X部分、第X题')
          //跳出方法
          return false
        }

        //搜索题目部分
        this.testPaperObj.items.forEach(element => {
          if(element.uniqueId == this.currentCtrlObj.questionBigPart.uniqueId)
          {
            //console.log("搜索到了对应的试卷部分["+element.uniqueId+"]")
            questionBigPartItem = element
          }
        })
        if(null == questionBigPartItem)
        {
          //没有选中试卷部分，就无法新增大题
          this.$message.error('选择的试卷部分无效，请重新选择，尝试点击第X部分、第X题')
          //跳出方法
          return false
        }
      }

      if(!questionBigPartItem.items)
      {
        //console.log("没有items部分，初始化为[]")
        questionBigPartItem.items = []
      }

      //深拷贝一个实体类对象
      let newQuestionBigItem = this.$options.methods.copyPojo.bind(this)(this.questionBig);
      let newQuestionItem = this.$options.methods.copyPojo.bind(this)(this.question);
      let newQuestionAnwserItem = this.$options.methods.copyPojo.bind(this)(this.anwser);
      let newQuestionAnwserSheetItem = this.$options.methods.copyPojo.bind(this)(this.anwserSheet);
      //初始化数值
      newQuestionAnwserSheetItem.isNull = true
      newQuestionItem.question_type = this.questionType.comprehensive_topic.id
      newQuestionItem.questionTypeName = this.questionType.comprehensive_topic.name
      // newQuestionItem.topic_text = "<p>请问题目是什么？</p>"
      // newQuestionBigItem.topic_text = "<p>请问大题题目是什么？</p>"
      newQuestionAnwserItem.answer_text = "<p>参考答案：略</p>"
      newQuestionAnwserItem.analysis_text = "<p>解题思路：略</p>"
      newQuestionAnwserSheetItem.topic_text = "<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>"

      //嵌套成为完整的部分
      newQuestionItem.anwser = newQuestionAnwserItem
      newQuestionItem.anwserSheet = newQuestionAnwserSheetItem
      newQuestionBigItem.items.push(newQuestionItem)

      //加入现有的实体当中
      questionBigPartItem.items.push(newQuestionBigItem)
      
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 为一个试卷的大题目，新增一个小题目（其他题目）
     */
    addNewTestPaperQuestionItem (questionBigItem,nums) {
      //console.log("开始调用addNewTestPaperQuestionBigItem")
      //console.log(this.currentCtrlObj)
      //当传值为空时
      if(null == questionBigItem)
      {
        return false
      }
      //至少1个
      if(null == nums || nums <=0)
      {
        nums = 1
      }

      if(!questionBigItem.items)
      {
        //console.log("没有items部分，初始化为[]")
        questionBigItem.items = []
      }


      for(let i=0;i<nums;i++)
      {
        //深拷贝一个实体类对象

        let newQuestionItem = this.$options.methods.copyPojo.bind(this)(this.question);
        let newQuestionAnwserItem = this.$options.methods.copyPojo.bind(this)(this.anwser);
        let newQuestionAnwserSheetItem = this.$options.methods.copyPojo.bind(this)(this.anwserSheet);

        //初始化数值
        newQuestionAnwserSheetItem.isNull = true
        newQuestionItem.question_type = this.questionType.comprehensive_topic.id
        newQuestionItem.questionTypeName = this.questionType.comprehensive_topic.name
        // newQuestionItem.topic_text = "<p>请问题目是什么？</p>"
        newQuestionAnwserItem.answer_text = "<p>参考答案：略</p>"
        newQuestionAnwserItem.analysis_text = "<p>解题思路：略</p>"
        newQuestionAnwserSheetItem.topic_text = "<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>"

        //嵌套成为完整的部分
        newQuestionItem.anwser = newQuestionAnwserItem
        newQuestionItem.anwserSheet = newQuestionAnwserSheetItem

        //加入现有的实体当中
        questionBigItem.items.push(newQuestionItem)
      }
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 为一个试卷的大题目，新增一个小题目（选择题目）
     */
    addNewTestPaperChoiceQuestionItem (questionBigItem,nums) {
      //console.log("开始调用addNewTestPaperQuestionBigItem")
      //console.log(this.currentCtrlObj)
      //当传值为空时
      if(null == questionBigItem)
      {
        return false
      }
      //至少1个
      if(null == nums || nums <=0)
      {
        nums = 1
      }

      if(!questionBigItem.items)
      {
        //console.log("没有items部分，初始化为[]")
        questionBigItem.items = []
      }

      for(let i=0;i<nums;i++)
      {
        //深拷贝一个实体类对象

        let newQuestionItem = this.$options.methods.copyPojo.bind(this)(this.question);
        let newQuestionAnwserItem = this.$options.methods.copyPojo.bind(this)(this.anwser);
        let newQuestionAnwserSheetItem = this.$options.methods.copyPojo.bind(this)(this.anwserSheet);

        //初始化数值
        newQuestionAnwserSheetItem.isNull = true
        newQuestionItem.question_type = this.questionType.single_choice.id
        newQuestionItem.questionTypeName = this.questionType.single_choice.name
        // newQuestionItem.topic_text = "<p>请问题目是什么？</p>"
        newQuestionAnwserItem.analysis_text = "<p>解题思路：略</p>"
        newQuestionAnwserSheetItem.topic_text = "<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>"
        
        this.$options.methods.addNewTestPaperChoiceQuestionOptionsItem.bind(this)(newQuestionItem)

        //嵌套成为完整的部分
        newQuestionItem.anwser = newQuestionAnwserItem
        newQuestionItem.anwserSheet = newQuestionAnwserSheetItem

        //加入现有的实体当中
        questionBigItem.items.push(newQuestionItem)
      }
      
        
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 为一个试卷的小题目（选择题目），新增一个选项
     */
    addNewTestPaperChoiceQuestionOptionsItem (questionItem) {
      //console.log("开始调用addNewTestPaperQuestionBigItem")
      //console.log(this.currentCtrlObj)
      //当传值为空时
      if(null == questionItem)
      {
        return false
      }

      if(!questionItem.items)
      {
        //console.log("没有items部分，初始化为[]")
        questionItem.items = []
      }

      //深拷贝一个实体类对象

      let newQuestionItem = this.$options.methods.copyPojo.bind(this)(this.question);

      //初始化数值
      newQuestionItem.question_type = this.questionType.single_choice_item.id
      newQuestionItem.questionTypeName = this.questionType.single_choice_item.name
      newQuestionItem.topic_text = "<p>选择题第X个选项</p>"
      newQuestionItem.items = []

      //加入现有的实体当中
      questionItem.items.push(newQuestionItem)
        
    },
    /**
     * 为一个试卷的小题目（选择题目），删除一个选项
     */
    delNewTestPaperChoiceQuestionOptionsItem (questionItem,questionOptionItemIndex) {
      questionItem.items.splice(questionOptionItemIndex,1)
        
    },
    /**
     * 删除一个试卷部分
     */
    delTestPaperQuestionPartItem(questionPartItemIndex){
      this.testPaperObj.items.splice(questionPartItemIndex,1)
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 删除一个大题
     */
    delTestPaperQuestionBigItem(questionPartItem,questionBigItemIndex){
      questionPartItem.items.splice(questionBigItemIndex,1)
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 删除一个小题
     */
    delTestPaperQuestionItem(questionBigItem,questionItemIndex){
      questionBigItem.items.splice(questionItemIndex,1)
      //更新分数
      this.$options.methods.testPaperUpdateScore.bind(this)()
    },
    /**
     * 保存最近操作对象
     */
    refreshCurrentCtrlObj (questionBigPartIndex,questionBigIndex,questionIndex,questionBigPart,questionBig,question) {
      //console.log("调用refreshCurrentCtrlObj >>>>> " + questionBigPartIndex +" " + questionBigIndex +" " + questionIndex)
      //console.log(questionBigPart)
      //console.log(questionBig)
      //console.log(question)
      if(null != questionBigPartIndex)
      {
        //console.log("调用questionBigPart >>>>> ")
        this.currentCtrlObj.questionBigPart.index = questionBigPartIndex + 1
        this.currentCtrlObj.questionBigPart.uniqueId = questionBigPart.uniqueId
        this.currentCtrlObj.summary = "第"+this.currentCtrlObj.questionBigPart.index+"部分"
      }
      else{
        this.currentCtrlObj.questionBigPart.index = null
        this.currentCtrlObj.questionBigPart.uniqueId = null
      }
      if(null != questionBigIndex)
      {
        //console.log("调用questionBig >>>>> ")
        this.currentCtrlObj.questionBig.index = questionBigIndex + 1
        this.currentCtrlObj.questionBig.uniqueId = questionBig.uniqueId
        this.currentCtrlObj.summary = "第"+this.currentCtrlObj.questionBigPart.index+"部分"+"第"+this.currentCtrlObj.questionBig.index+"大题"
      }
      else{
        this.currentCtrlObj.questionBig.index = null
        this.currentCtrlObj.questionBig.uniqueId = null
      }
      if(null != questionIndex)
      {
        //console.log("调用question >>>>> ")
        this.currentCtrlObj.question.index = questionIndex + 1
        this.currentCtrlObj.question.uniqueId = question.uniqueId
        this.currentCtrlObj.summary = "第"+this.currentCtrlObj.questionBigPart.index+"部分"+"第"+this.currentCtrlObj.questionBig.index+"大题"+"第"+this.currentCtrlObj.question.index+"小题"
      }
      else{
        this.currentCtrlObj.question.index = null
        this.currentCtrlObj.question.uniqueId = null
      }
    },
    /**
     * 准备富文本编辑器
     */
    onEditorReady (editor) {},
    /**
     * 富文本编辑器 失去焦点事件
     */
    onEditorBlur (editor) {},
    /**
     * 富文本编辑器 获得焦点事件
     */
    onEditorFocus (editor) {},
    /**
     * 富文本编辑器 内容改变事件
     */
    onEditorChange (editor) {},
    /**
     * 试卷富文本转img图片
     */
    testPaperToImage() {
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.testPaperPreviewImg = dataURL;
        /*if (this.imgUrl !== "") {
          this.dialogTableVisible = true;
        }*/
      });
    },
    /**
     * 每一个试题的富文本转img图片，并保存起来
     */
    testPaperQuestionsToImage() {
      this.$nextTick(() => {
      //console.log(this.testPaperObj)
      if(null == this.testPaperObj.items)
      {
        console.log("试卷为空，无法转换为图片")
        return
      }
      console.log("每一个试题的富文本转img图片")
      
      //循环输出试卷部分================================================================================================
      
      //输出试卷总抬头
      var testPaperHeaderImgItem=document.querySelector('.layout_test_paper_header')
      
      //扩大分辨率，提高清晰度设置===============
      var doc = window.document;
      var width = 0; 
      var height = 0; 
      var newCanvas = document.createElement("canvas"); 
      var context = newCanvas.getContext("2d");
      var scale = 2; 
      width = testPaperHeaderImgItem.offsetWidth * scale; 
      height = testPaperHeaderImgItem.offsetHeight * scale;
      newCanvas.width = width * scale;
      newCanvas.height = height * scale;
      newCanvas.getContext("2d").scale(scale, scale); 
    
      var opts = {
            scale: scale, 
            canvas: newCanvas,
            useCORS: true, 
            logging: true, 
            width: width, 
            height: height 
        };
      //扩大分辨率，提高清晰度设置，完成===============

      //转化为图片并粘帖
      html2canvas(testPaperHeaderImgItem,opts).then(canvas => {
        let dataURL = canvas.toDataURL("image/png")
        //console.log(dataURL)
        //赋值给试卷
        this.testPaperObj.imgFile = dataURL
        
      })

      this.testPaperObj.items.forEach(questionPartItem => {
        console.log("开始转换 testPaperObj >>>>> ")
        //获取每个试题的预览html
        var questionPartItemImgItem=document.querySelector('.layout_question_topic_text_'+questionPartItem.uniqueId)
        //console.log(questionPartItemImgItem)

        //扩大分辨率，提高清晰度设置===============
        var doc = window.document;
        var width = 0; 
        var height = 0; 
        var newCanvas = document.createElement("canvas"); 
        var context = newCanvas.getContext("2d");
        var scale = 2; 
        width = questionPartItemImgItem.offsetWidth * scale; 
        height = questionPartItemImgItem.offsetHeight * scale;
        //console.log("questionPartItemImgItem.offsetWidth"+questionPartItemImgItem.offsetWidth)
        //console.log("questionPartItemImgItem.offsetHeight"+questionPartItemImgItem.offsetHeight)
        newCanvas.width = width * scale;
        newCanvas.height = height * scale;
        newCanvas.getContext("2d").scale(scale, scale); 
			
        var opts = {
              scale: scale, 
              canvas: newCanvas,
              useCORS: true, 
              logging: true, 
              width: width, 
              height: height 
          };
        //扩大分辨率，提高清晰度设置，完成===============

        //转化为图片并粘帖
        html2canvas(questionPartItemImgItem,opts).then(canvas => {
          let dataURL = canvas.toDataURL("image/png")
          //console.log(dataURL)
          //赋值给题目
          questionPartItem.imgFile = dataURL
          
        })

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {
          //console.log("开始转换 questionPartItem >>>>> " + '.layout_question_topic_text_'+questionBigItem.uniqueId)
          //获取每个试题的预览html
          var questionBigItemImgItem=document.querySelector('.layout_question_topic_text_'+questionBigItem.uniqueId)
          //console.log(questionBigItemImgItem)

          //扩大分辨率，提高清晰度设置===============
          var doc = window.document;
          var width = 0; 
          var height = 0; 
          var newCanvas = document.createElement("canvas"); 
          var context = newCanvas.getContext("2d");
          //var scale = 2; 
          width = questionBigItemImgItem.offsetWidth * scale; 
          height = questionBigItemImgItem.offsetHeight * scale;
          //console.log("questionBigItemImgItem.offsetWidth"+questionBigItemImgItem.offsetWidth)
          //console.log("questionBigItemImgItem.offsetHeight"+questionBigItemImgItem.offsetHeight)
          newCanvas.width = width * scale;
          newCanvas.height = height * scale;
          newCanvas.getContext("2d").scale(scale, scale); 
        
          var opts = {
                scale: scale, 
                canvas: newCanvas,
                useCORS: true, 
                logging: true, 
                width: width, 
                height: height 
            };
          //扩大分辨率，提高清晰度设置，完成===============

          //转化为图片并粘帖
          html2canvas(questionBigItemImgItem,opts).then(canvas => {
            let dataURL = canvas.toDataURL("image/png")
            //赋值给题目
            questionBigItem.imgFile = dataURL
            
          })

          //循环输出小题================================================================================================
          questionBigItem.items.forEach(questionItem => {
            //console.log("开始转换 questionBigItem >>>>> " + '.layout_question_topic_text_'+questionItem.uniqueId)
            //获取每个试题的预览html
            var questionItemImgItem=document.querySelector('.layout_question_topic_text_'+questionItem.uniqueId)

            //扩大分辨率，提高清晰度设置===============
            var doc = window.document;
            var width = 0; 
            var height = 0; 
            var newCanvas = document.createElement("canvas"); 
            var context = newCanvas.getContext("2d");
            //var scale = 2; 
            width = questionItemImgItem.offsetWidth * scale; 
            height = questionItemImgItem.offsetHeight * scale;
            //console.log("questionItemImgItem.offsetWidth"+questionItemImgItem.offsetWidth)
            //console.log("questionItemImgItem.offsetHeight"+questionItemImgItem.offsetHeight)
            newCanvas.width = width * scale;
            newCanvas.height = height * scale;
            newCanvas.getContext("2d").scale(scale, scale); 
          
            var opts = {
                  scale: scale, 
                  canvas: newCanvas,
                  useCORS: true, 
                  logging: true, 
                  width: width, 
                  height: height 
              };
            //扩大分辨率，提高清晰度设置，完成===============

            //转化为图片并粘帖
            html2canvas(questionItemImgItem,opts).then(canvas => {
              let dataURL = canvas.toDataURL("image/png")
              //赋值给题目
              questionItem.imgFile = dataURL
              
            })

            //循环输出小题答题卡选项================================================================================================
            //获取每个试题答题卡的预览html
            var questionAnwserSheetItemImgItem=document.querySelector('.layout_question_anwser_sheet_'+questionItem.uniqueId)
            //console.log("questionAnwserSheetItemImgItem")
            //console.log(questionAnwserSheetItemImgItem)
            //扩大分辨率，提高清晰度设置===============
            var doc = window.document;
            var width = 0; 
            var height = 0; 
            var newCanvas = document.createElement("canvas"); 
            var context = newCanvas.getContext("2d");
            //var scale = 2; 
            width = questionAnwserSheetItemImgItem.offsetWidth * scale; 
            height = questionAnwserSheetItemImgItem.offsetHeight * scale;

            newCanvas.width = width * scale;
            newCanvas.height = height * scale;
            newCanvas.getContext("2d").scale(scale, scale); 
          
            var opts = {
                  scale: scale, 
                  canvas: newCanvas,
                  useCORS: true, 
                  logging: true, 
                  width: width, 
                  height: height 
              };
            //扩大分辨率，提高清晰度设置，完成===============
            //转化为图片并粘帖
            html2canvas(questionAnwserSheetItemImgItem,opts).then(canvas => {
              let dataURL = canvas.toDataURL("image/png")
              //赋值给题目答题卡
              questionItem.anwserSheet.imgFile = dataURL
              //console.log(dataURL)
            })
            //循环输出小题答题卡选项，完成================================================================================================

            //循环输出小题选项================================================================================================
            questionItem.items.forEach(questionOptionsItem => {
              //console.log("开始转换 questionOptionsItem >>>>> " + '.layout_question_topic_text_'+questionOptionsItem.uniqueId)
              //获取每个试题的预览html
              var questionOptionsItemImgItem=document.querySelector('.layout_question_topic_text_'+questionOptionsItem.uniqueId)

              //扩大分辨率，提高清晰度设置===============
              var doc = window.document;
              var width = 0; 
              var height = 0; 
              var newCanvas = document.createElement("canvas"); 
              var context = newCanvas.getContext("2d");
              //var scale = 2; 
              width = questionOptionsItemImgItem.offsetWidth * scale; 
              height = questionOptionsItemImgItem.offsetHeight * scale;
              //console.log("questionOptionsItemImgItem.offsetWidth"+questionOptionsItemImgItem.offsetWidth)
              //console.log("questionOptionsItemImgItem.offsetHeight"+questionOptionsItemImgItem.offsetHeight)
              newCanvas.width = width * scale;
              newCanvas.height = height * scale;
              newCanvas.getContext("2d").scale(scale, scale); 
            
              var opts = {
                    scale: scale, 
                    canvas: newCanvas,
                    useCORS: true, 
                    logging: true, 
                    width: width, 
                    height: height 
                };
              //扩大分辨率，提高清晰度设置，完成===============

              //转化为图片并粘帖
              html2canvas(questionOptionsItemImgItem,opts).then(canvas => {
                let dataURL = canvas.toDataURL("image/png")
                //赋值给题目
                questionOptionsItem.imgFile = dataURL
                
              })

            })
            //循环输出小题选项，完成================================================================================================

          })
          //循环输出小题，完成================================================================================================

        })
        //循环输出大题，完成================================================================================================

      })
      //循环输出试卷部分，完成================================================================================================
      console.log("转换完成 testPaperObj <<<<< ")
      console.log("转换为纯图预览模式")
      this.qustionPreviewImgMode = true
      })
    },
    /**
     * 图片处理相关方法
     */
    handleRemove(file, fileList) {
      //console.log(file, fileList);
      console.log("图片移除");
    },
    handlePreview(file) {
      //console.log(file);
      console.log("图片预览");
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    beforeAvatarUpload(file) {                 
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'jpeg'
        const extension3 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 < 1
        if(!extension && !extension2 && !extension3) {
            this.$message({
                message: '上传文件只能是 jpg、jpeg、png格式!',
                type: 'warning'
            });
        }
        if(!isLt2M) {
            this.$message({
                message: '上传文件大小不能超过 1MB!',
                type: 'warning'
            });
        }
        return extension || extension2 || extension3 && isLt2M
    },
    /**
     * 大题序号顺序编码器
     */
    testPaperQuestionBigCreateAutoNo()
    {
      
      if(null == this.testPaperObj.items)
      {
        //console.log("试卷为空，无法为每一个大题添加试卷中的大题序号")
        return
      }
      //console.log("为每一个大题添加试卷中的大题序号")
      //循环输出试卷部分================================================================================================
      this.testPaperObj.items.forEach(questionPartItem => {

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {
          //console.log("开始编码 >>>>> " + this.previewQuestionBigNum)
              questionBigItem.no = this.previewQuestionBigNum++

        })
        //循环输出大题，完成================================================================================================

      })
      //循环输出试卷部分，完成================================================================================================
      //console.log("小题序号顺序编码完成 <<<<< ")
    },
    /**
     * 小题序号顺序编码器
     */
    testPaperQuestionCreateAutoNo()
    {
      
      if(null == this.testPaperObj.items)
      {
        //console.log("试卷为空，无法为每一个小题添加试卷中的小题序号")
        return
      }
      //console.log("为每一个小题添加试卷中的小题序号")
      //循环输出试卷部分================================================================================================
      this.testPaperObj.items.forEach(questionPartItem => {

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {
          //console.log("开始编码 >>>>> " + this.previewQuestionNum)

          //循环输出小题================================================================================================
          questionBigItem.items.forEach(questionItem => {
            
              questionItem.no = this.previewQuestionNum++
            
          })
          //循环输出小题，完成================================================================================================

        })
        //循环输出大题，完成================================================================================================

      })
      //循环输出试卷部分，完成================================================================================================
      //console.log("小题序号顺序编码完成 <<<<< ")
    },
    /**
     * 快速跳转至顶端
     */
    returnTop(){
      this.$refs.page_main_tile.scrollIntoView()
    },
    /**
     * 开始预览整个试卷
     */
    startTestPaperPreview(){
      this.$options.methods.startFullscreenLoading.bind(this)()
      
      
        this.$refs.page_main_tile.scrollIntoView()
        this.previewQuestionBigNum = 1
        this.previewQuestionNum = 1
        this.$options.methods.testPaperQuestionCreateAutoNo.bind(this)()
        this.qustionPreviewMode = true
        this.qustionPreviewImgMode = false
        setTimeout(() => {
          
          //关闭屏蔽层
          this.fullscreenLoading = false
          
        }, 300);

    },
    /**
     * 开始预览整个试卷（直接进入图片版）
     */
    startTestPaperImgPreview(){
      this.$options.methods.startFullscreenLoading.bind(this)()
      
      
        this.$refs.page_main_tile.scrollIntoView()
        this.previewQuestionBigNum = 1
        this.previewQuestionNum = 1
        this.$options.methods.testPaperQuestionCreateAutoNo.bind(this)()
        this.qustionPreviewMode = true
        this.qustionPreviewImgMode = false
        setTimeout(() => {
          this.$options.methods.testPaperQuestionsToImage.bind(this)()
          //关闭屏蔽层
          this.fullscreenLoading = false
          
        }, 300);

    },
    /**
     * 全屏加载等待
     */
    startFullscreenLoading() {
      this.fullscreenLoading = true;
      const loading = this.$loading({
          lock: true,
          text: "正在加载中，请稍候...",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        //以免长时间无响应，每秒检查一次后主动取消
        var checkExec = setInterval(() => {
          if(this.fullscreenLoading == false)
          {
            clearInterval(checkExec);
            loading.close();
          }
        }, 3000);
        //以免长时间无响应，30秒后主动取消
        setTimeout(() => {
          loading.close();
          this.fullscreenLoading = false
          clearInterval(checkExec);
        }, 30000);
    },
    /**
     * 核算所有分数，并更新
     */
    testPaperUpdateScore()
    {
      
      if(null == this.testPaperObj.items)
      {
        console.log("试卷为空，无法核算分数")
        return
      }
      console.log("开始核算分数")
      //循环输出试卷部分================================================================================================
      //试卷部分总分
      var testPaperScore = 0
      this.testPaperObj.items.forEach(questionPartItem => {

        //试卷部分总分
        var questionPartItemScore = 0

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {

          //大题总分
          var questionBigItemScore = 0

          //循环输出小题================================================================================================
          questionBigItem.items.forEach(questionItem => {
            
              questionBigItemScore +=questionItem.score
            
          })
          //循环输出小题，完成================================================================================================
          questionBigItem.score = questionBigItemScore
          questionPartItemScore += questionBigItemScore
        })
        //循环输出大题，完成================================================================================================
        questionPartItem.score = questionPartItemScore
        testPaperScore += questionPartItemScore
      })
      //循环输出试卷部分，完成================================================================================================
      this.testPaperObj.score = testPaperScore
      console.log("核算所有分数，并更新完成 <<<<< ")
      //console.log(this.testPaperObj)
    },
    /**
     * 开始任务，完成组卷
     */
    saveTestPaperCache(){
      if(!this.qustionPreviewMode)
      {
        this.$message.warning('请先预览试卷再完成组卷！')
        console.log("请先预览试卷再完成组卷！ ")
        return
      }
      localStorage.setItem('testPaperCache', JSON.stringify(this.testPaperObj) )
      localStorage.setItem('testPaperCacheReady', true)
      this.$message.success('已经完成组卷！您现在可以提交试卷入库！')
      console.log("已经完成组卷 ")
      
      if(localStorage.getItem("loginUserType").toString() == "teacher")
      {

        this.$router.push(`/manage_teacher_import`)
      }
      if(localStorage.getItem("loginUserType").toString() == "user")
      {
        
        this.$router.push(`/manage_user_import`)
      }
      if(localStorage.getItem("loginUserType").toString() == "admin")
      {
        
        this.$router.push(`/manage_admin_import`)
      }
      
    },
    /**
     * 下载这张临时的卷子
     */
    downloadTempTestPaper(){
      let  createTestPaperInfoObj = {
 		    testPaperId:-1,
        isTempTestPaper:true,
        students:[
          {
            uid:localStorage.getItem('userID'),
            utype:localStorage.getItem('loginUserType'),
          	items:[]
          }
        ]
      }
      this.$router.push({name :'test_paper_maker_for_task',query:{createTestPaperInfoObj:createTestPaperInfoObj}})
    },
    /**
     * 临时保存组卷数据
     */
    saveTestPaperTempCache(){
      localStorage.setItem('testPaperCache', JSON.stringify(this.testPaperObj) )
      this.$message.success('已经保存当前组卷数据！')
      console.log("已经保存当前组卷数据！ ")
      
    },
    /**
     * 临时保存组卷数据,自动保存,传入的是毫秒数
     */
    autoSaveTestPaperTempCache(autoSaveTimeInterval){
      setInterval(() => {
        localStorage.setItem('testPaperCache', JSON.stringify(this.testPaperObj) )
      this.$message.success('已经自动保存当前组卷数据！')
      console.log("已经自动保存当前组卷数据！ ")
      }, autoSaveTimeInterval);
    },
    /**
     * 开始任务，完成组卷，插入数据库
     */
    startTestPaperUpdatePaperToServer(){
      
      if(!this.qustionPreviewMode)
      {
        this.$message.error('完成组卷前，请先预览试卷！')
        return
      }
      
      this.$options.methods.startFullscreenLoading.bind(this)()
      
        setTimeout(() => {
          this.$options.methods.testPaperUpdatePaperToServer.bind(this)(this.testPaperObjIdForTestData)
          
          //关闭屏蔽层
          //this.fullscreenLoading = false
          
        }, 300);

    },
    /**
     * 完成组卷，插入数据库
     */
    testPaperUpdatePaperToServer(testPaperObjId)
    {
      
      if(null == this.testPaperObj.items)
      {
        console.log("试卷为空，无法插入数据库")
        return false
      }
      console.log("插入试卷")
      //循环输出试卷部分================================================================================================
      //只要上传图片一直没出错，就显示为true
      this.uploadQuestionImgHandleExecFlag = true
      this.testPaperObj.items.forEach((questionPartItem,questionPartItemIndex )=> {
        //console.log("插入部分")
        //将现有对象重新封装
        var questionPartItemJson = {
          "is_include_items": true,
          "paper_id": testPaperObjId,
          "parent_id": null,
          "score": questionPartItem.score,
          "topic_text": questionPartItem.topic_text,
          "weight": this.testPaperObj.items.length - questionPartItemIndex
        }

        var addQuestionPartUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/insert"

        this.$options.methods.post.bind(this)(addQuestionPartUrl,questionPartItemJson)
        .then(res =>{
          //循环输出大题================================================================================================
          //console.log(res)
          if(!res.result)
          {
            this.$message.error('同步试卷至服务器出错！添加试卷部分失败！停止操作！')
            return false
          }

          //将id、sn绑定过来
          questionPartItem.id = res.data.id
          questionPartItem.sn = res.data.sn
          //console.log("questionPartItem.id:" + questionPartItem.id)
          //console.log("questionPartItem.sn:" + questionPartItem.sn)

          //同步上传图片==========================================
          /*this.$options.methods.uploadQuestionPartImg.bind(this)(questionPartItem.id,questionPartItem.imgFile).then(res =>{
            if(!res.result)
            {
              this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
              this.uploadQuestionImgHandleExecFlag = false
              return false
            }
          })
          .catch(err=>{
            this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
            this.uploadQuestionImgHandleExecFlag = false
            return false
          })*/
          //同步上传图片结束==========================================
          
          questionPartItem.items.forEach((questionBigItem,questionBigItemIndex) => {
            //console.log("插入大题")

            //将现有对象重新封装
            var questionBigItemJson = {
              "is_include_items": true,
              "paper_id": testPaperObjId,
              "parent_id": questionPartItem.id,
              "score": questionBigItem.score,
              "topic_text": questionBigItem.topic_text,
              "weight": questionPartItem.items.length - questionBigItemIndex
            }

            var addQuestionBigUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/insert"

            this.$options.methods.post.bind(this)(addQuestionBigUrl,questionBigItemJson)
            .then(res =>{
              if(!res.result)
              {
                this.$message.error('同步试卷至服务器出错！添加大题失败！停止操作！')
                return false
              }

              questionBigItem.id = res.data.id
              questionBigItem.sn = res.data.sn

              //同步上传图片==========================================
              /*this.$options.methods.uploadQuestionBigImg.bind(this)(questionBigItem.id,questionBigItem.imgFile).then(res =>{
                if(!res.result)
                {
                  this.$message.error('同步试卷至服务器出错！添加大题图片失败！')
                  this.uploadQuestionImgHandleExecFlag = false
                  return false
                }
              })
              .catch(err=>{
                this.$message.error('同步试卷至服务器出错！添加大题图片失败！')
                this.uploadQuestionImgHandleExecFlag = false
                return false
              })*/
              //同步上传图片结束==========================================

              //循环输出小题================================================================================================
              questionBigItem.items.forEach((questionItem,questionItemIndex) => {

                //将现有对象重新封装
                var questionItemJson = {
                    "is_include_images": true,
                    "is_include_items": (questionItem.items.length > 0),
                    "parent_id": null,
                    "parent_sn": null,
                    "question_type": questionItem.question_type,
                    "score": questionItem.score,
                    "topic_text": questionItem.topic_text,
                    "weight": questionBigItem.items.length - questionItemIndex
                }

                var addQuestionUrl = "/api/"+this.userTypeForMethods+"/exam/question/insert"

                this.$options.methods.post.bind(this)(addQuestionUrl,questionItemJson)
                .then(res =>{
                  if(!res.result)
                  {
                    this.$message.error('同步试卷至服务器出错！添加小题失败！停止操作！')
                    return false
                  }

                  questionItem.id = res.data.id
                  questionItem.sn = res.data.sn

                  //同步上传图片==========================================
                  /*this.$options.methods.uploadQuestionImg.bind(this)(questionItem.id,questionItem.imgFile).then(res =>{
                    if(!res.result)
                    {
                      this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
                      this.uploadQuestionImgHandleExecFlag = false
                      return false
                    }
                  })
                  .catch(err=>{
                    this.$message.error('同步试卷至服务器出错！添加试题部分图片失败！')
                    this.uploadQuestionImgHandleExecFlag = false
                    return false
                  })*/
                  //同步上传图片结束==========================================

                  //循环输出大题绑定小题选项================================================================================================
                  

                  //将现有对象重新封装
                  var questionToBigItemJson = {
                    "big_question_id": questionBigItem.id,
                    "big_question_sn": questionBigItem.sn,
                    "question_id": questionItem.id,
                    "question_sn": questionItem.sn,
                    "weight": questionBigItem.weight
                  }

                  var addQuestionToBigUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestionWithChildren/withQuestionWithChildren/insert"

                  this.$options.methods.post.bind(this)(addQuestionToBigUrl,questionToBigItemJson)
                  .then(res =>{
                    if(!res.result)
                    {
                      this.$message.error('同步试卷至服务器出错！添加大题绑定小题失败！停止操作！')
                      return false
                    }
                    
                    //循环输出小题的答题卡================================================================================================
                    var questionAnwserSheetItem = questionItem.anwserSheet
                    //将现有对象重新封装
                    var questionAnwserSheetItemJson = {
                      "is_include_images": true,
                      "question_id": questionItem.id,
                      "question_sn": questionItem.sn,
                      "topic_text": questionAnwserSheetItem.topic_text
                    }

                    var addQuestionAnwserUrl = "/api/"+this.userTypeForMethods+"/exam/question/answer/sheet/insert"

                    this.$options.methods.post.bind(this)(addQuestionAnwserUrl,questionAnwserSheetItemJson)
                    .then(res =>{
                      if(!res.result)
                      {
                        this.$message.error('同步试卷至服务器出错！添加小题的答案失败！停止操作！')
                        return false
                      }

                      //循环输出小题的答案================================================================================================
                        var questionAnwserItem = questionItem.anwser
                        //将现有对象重新封装
                        var questionAnwserItemJson = {
                          "analysis_text": questionAnwserItem.analysis_text,
                          "answer_text": questionAnwserItem.answer_text,
                          "is_include_images": true,
                          "question_id": questionItem.id,
                          "question_sn": questionItem.sn,
                        }

                        var addQuestionAnwserUrl = "/api/"+this.userTypeForMethods+"/exam/question/answer/insert"

                        this.$options.methods.post.bind(this)(addQuestionAnwserUrl,questionAnwserItemJson)
                        .then(res =>{
                          if(!res.result)
                          {
                            this.$message.error('同步试卷至服务器出错！添加小题的答案失败！停止操作！')
                            return false
                          }

                          //此时已经结束，关闭屏蔽层
                          if(questionItem.items.length <= 0)
                          {
                            //关闭屏蔽层
                            this.fullscreenLoading = false
                            this.$message.success('同步试卷至服务器完成！')
                            
                          }


                          //循环输出小题选项================================================================================================
                          questionItem.items.forEach((questionOptionItem,questionOptionItemIndex) => {

                            //将现有对象重新封装
                            var questionOptionItemJson = {
                                "is_include_images": true,
                                "is_include_items": (questionOptionItem.items.length > 0),
                                "parent_id": questionItem.id,
                                "parent_sn": questionItem.sn,
                                "question_type": questionOptionItem.question_type,
                                "score": questionOptionItem.score,
                                "topic_text": questionOptionItem.topic_text,
                                "weight": questionItem.items.length - questionOptionItemIndex
                            }

                            var addQuestionOptionUrl = "/api/"+this.userTypeForMethods+"/exam/question/insert"

                            this.$options.methods.post.bind(this)(addQuestionOptionUrl,questionOptionItemJson)
                            .then(res =>{
                              if(!res.result)
                              {
                                this.$message.error('同步试卷至服务器出错！添加小题选项失败！停止操作！')
                                return false
                              }
                              
                              //此时已经结束，关闭屏蔽层
                              if(questionItem.items.length <= 0)
                              {
                                //关闭屏蔽层
                                this.fullscreenLoading = false
                                this.$message.success('同步试卷至服务器完成！')

                              }
                              
                            })
                            .catch(err=>{
                              this.$message.error('同步试卷至服务器出错！添加小题选项失败！停止操作！')
                              return false
                            })

                          })
                          //循环输出小题选项，完成================================================================================================

                          
                        })
                        .catch(err=>{
                          this.$message.error('同步试卷至服务器出错！添加小题的答案失败！停止操作！')
                          return false
                        })
                        
                        //循环输出小题的答案，完成================================================================================================
                      
                    })
                    .catch(err=>{
                      this.$message.error('同步试卷至服务器出错！添加小题的答案失败！停止操作！')
                      return false
                    })
                    
                    //循环输出小题的答题卡，完成================================================================================================
                    
                  })
                  .catch(err=>{
                    this.$message.error('同步试卷至服务器出错！添加大题绑定小题失败！停止操作！')
                    return false
                  })

                  
                  //循环输出大题绑定小题选项，完成================================================================================================

                })
                .catch(err=>{
                  this.$message.error('同步试卷至服务器出错！添加小题失败！停止操作！')
                  return false
                })

              })
              //循环输出小题，完成================================================================================================

              })
              .catch(err=>{
                this.$message.error('同步试卷至服务器出错！添加小题失败！停止操作！')
                return false
              })

          })
          //循环输出大题，完成================================================================================================
        })
        .catch(err=>{
          this.$message.error('同步试卷至服务器出错！添加试卷部分失败！停止操作！')
          return false
        })
        return true
      })
      //循环输出试卷部分，完成================================================================================================
      
      console.log("试卷插入数据库完成 <<<<< ")
      
    },
    /**
     * 变更选择题的正确答案
     */
    changeChoiceQuestionOptionsAnwser(questionItem) {
      let anwserListTemp = []
      //循环一下选项里的正确答案情况
      questionItem.items.forEach((questionOptionsItem,index) => {
        if(questionOptionsItem.questionOptionIsAnwser)
        {
          anwserListTemp.push(this.enCharArr[index])
        }
      })
      //然后拼接字符串
      let anwserStringTemp = ""
      if(anwserListTemp.length > 0)
      {
        anwserListTemp.forEach((anwserStringItem,index) => {
          anwserStringTemp+=anwserStringItem
          if(index < anwserListTemp.length - 1)
          {
            anwserStringTemp+="#"
          }
        })
        
      }
      //赋值给item本身
      questionItem.anwser.answer_text = anwserStringTemp
      //console.log("现在正确答案为：" + questionItem.anwser.answer_text)
    },
    /**
     * 为试题部分上传图片
     */
    uploadQuestionPartImg(questionPartItemId,questionPartItemBase64Img,callback)
    {
      if(null == questionPartItemId || null == questionPartItemBase64Img)
      {
        console.log("传入的ID和图片为空，无法上传")
        return false
      }
      var questionPartItemFormData = this.$options.methods.base64ImgToFormData.bind(this)(questionPartItemBase64Img)
      var uploadQuestionPartImgUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/upload/"+questionPartItemId
      return this.$options.methods.postFormdata(uploadQuestionPartImgUrl,questionPartItemFormData)
    },
    /**
     * 为大题上传图片
     */
    uploadQuestionBigImg(questionBigItemId,questionBigItemBase64Img,callback)
    {
      if(null == questionBigItemId || null == questionBigItemBase64Img)
      {
        console.log("传入的ID和图片为空，无法上传")
        return false
      }
      var questionBigItemFormData = this.$options.methods.base64ImgToFormData.bind(this)(questionBigItemBase64Img)
      var uploadQuestionBigImgUrl = "/api/"+this.userTypeForMethods+"/exam/bigQuestion/upload/"+questionBigItemId
      return this.$options.methods.postFormdata(uploadQuestionBigImgUrl,questionBigItemFormData)
    },
    /**
     * 为小题上传图片
     */
    uploadQuestionImg(questionItemId,questionItemBase64Img,callback)
    {
      if(null == questionItemId || null == questionItemBase64Img)
      {
        console.log("传入的ID和图片为空，无法上传")
        return false
      }
      var questionItemFormData = this.$options.methods.base64ImgToFormData.bind(this)(questionItemBase64Img)
      var uploadQuestionImgUrl = "/api/"+this.userTypeForMethods+"/exam/question/image/upload/"+questionItemId
      return this.$options.methods.postFormdata(uploadQuestionImgUrl,questionItemFormData)
    },
    /**
     * 批量打包下载试卷+答题卡PDF
     */
    multiDownloadTestPaperAndAnwserSheetPdf(studentIdArr){

      if(studentIdArr.length <=0)
      {
        this.$message.error('学生信息为空，无法下载！')
        return
      }


      this.fullscreenLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "正在紧张打包中，请稍候...",
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      });

      //延迟执行，让加载页面load出来
      setTimeout(() => {

        var pdfBlobForZipList = []
        var pdfBlobForZipNum = studentIdArr.length * 2

        studentIdArr.forEach(student => {

          this.qrInfoObj.suid=student.suid

          //生成试卷pdf内容
          var dd_content = this.$options.methods.getTestPaperAllQuestionPreviewImg.bind(this)()
          var docDefinition = { content: dd_content };
          
          /*const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getBlob((blob) => {
              console.log(blob)
            // ...
          });*/

          //console.log(pdfMake.vfs);
          const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getBlob((blob) => {
              //console.log(blob)
            
            pdfBlobForZipList.push({name:'试卷'+student.suid+'.pdf',data:blob})
            
          })

          //生成试卷答题卡pdf内容
          var dd_contentOfAnwserSheet = this.$options.methods.getTestPaperAllQuestionAnwserSheetPreviewImg.bind(this)()
          var docDefinitionOfAnwserSheet = { content: dd_contentOfAnwserSheet };
          
          /*const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getBlob((blob) => {
              console.log(blob)
            // ...
          });*/

          //console.log(pdfMake.vfs);
          const pdfDocGeneratorOfAnwserSheet = pdfMake.createPdf(docDefinitionOfAnwserSheet);
            pdfDocGeneratorOfAnwserSheet.getBlob((blob) => {
              //console.log(blob)
            
            pdfBlobForZipList.push({name:'试卷_答题卡'+ student.suid +'.pdf',data:blob})
            
          })

        });

        

        

        //以免长时间无响应，每秒检查一次后主动取消
        var zip = new JSZip();
        var checkExec = setInterval(() => {
          if(pdfBlobForZipList.length >= pdfBlobForZipNum)
          {
            //执行打包
            pdfBlobForZipList.forEach(pdfBlobForZipItem => {
              
              // 创建一个被用来打包的文件
              zip.file(pdfBlobForZipItem.name, pdfBlobForZipItem.data);
              //zip.file("试卷的答题卡.pdf", testPaperPdfAnwserSheetBlob);
            });

            // 把打包内容异步转成blob二进制格式
            zip.generateAsync({type:"blob"}).then(function(content) {
              // content就是blob数据，这里以example.zip名称下载   

              // 使用了FileSaver.js
              // console.log(content)  
              saveAs(content, "试卷PDF与答题卡PDF_共"+studentIdArr.length+"人.zip");
            });

            clearInterval(checkExec);
            loading.close();
            
            //this.$router.push('/')
            let routeData = this.$router.resolve({ path: '/', query: {  id: 1 } });
            window.open(routeData.href);
          }
        }, 3000);
        //以免长时间无响应，30秒后主动取消
        /*setTimeout(() => {
          loading.close();
          this.fullscreenLoading = false
          clearInterval(checkExec);
        }, 30000);*/

        //生成答题卡pdf内容
        //var docDefinitionAnwserSheet = { content: this.$options.methods.getTestPaperAllQuestionAnwserSheetPreviewImg.bind(this)() };
        
        //console.log(pdfMake.vfs);
        //var testPaperPdfAnwserSheetBlob = pdfMake.createPdf(docDefinitionAnwserSheet).getBlob()

      }, 500);
      
    },
    /**
     * 打包下载试卷+答题卡PDF
     */
    downloadTestPaperAndAnwserSheetPdf(){

      this.fullscreenLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "正在紧张打包中，请稍候...",
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      //延迟执行，让加载页面load出来
      setTimeout(() => {

        var pdfBlobForZipList = []
        var pdfBlobForZipNum = 2

        //生成试卷pdf内容
        var dd_content = this.$options.methods.getTestPaperAllQuestionPreviewImg.bind(this)()
        var docDefinition = { content: dd_content };
        
        /*const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBlob((blob) => {
            console.log(blob)
          // ...
        });*/

        //console.log(pdfMake.vfs);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBlob((blob) => {
            //console.log(blob)
          
          pdfBlobForZipList.push({name:'试卷1.pdf',data:blob})
          
        })

        //生成试卷答题卡pdf内容
        var dd_contentOfAnwserSheet = this.$options.methods.getTestPaperAllQuestionAnwserSheetPreviewImg.bind(this)()
        var docDefinitionOfAnwserSheet = { content: dd_contentOfAnwserSheet };
        
        /*const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBlob((blob) => {
            console.log(blob)
          // ...
        });*/

        //console.log(pdfMake.vfs);
        const pdfDocGeneratorOfAnwserSheet = pdfMake.createPdf(docDefinitionOfAnwserSheet);
          pdfDocGeneratorOfAnwserSheet.getBlob((blob) => {
            //console.log(blob)
          
          pdfBlobForZipList.push({name:'试卷1_答题卡.pdf',data:blob})
          
        })

        //以免长时间无响应，每秒检查一次后主动取消
        var zip = new JSZip();
        var checkExec = setInterval(() => {
          if(pdfBlobForZipList.length >= 2)
          {
            //执行打包
            pdfBlobForZipList.forEach(pdfBlobForZipItem => {
              
              // 创建一个被用来打包的文件
              zip.file(pdfBlobForZipItem.name, pdfBlobForZipItem.data);
              //zip.file("试卷的答题卡.pdf", testPaperPdfAnwserSheetBlob);
            });

            // 把打包内容异步转成blob二进制格式
            zip.generateAsync({type:"blob"}).then(function(content) {
              // content就是blob数据，这里以example.zip名称下载   

              // 使用了FileSaver.js
              // console.log(content)  
              saveAs(content, "试卷PDF+答题卡PDF.zip");
            });

            clearInterval(checkExec);
            loading.close();
            
          }
        }, 3000);
        //以免长时间无响应，30秒后主动取消
        setTimeout(() => {
          loading.close();
          this.fullscreenLoading = false
          clearInterval(checkExec);
        }, 30000);

        //生成答题卡pdf内容
        //var docDefinitionAnwserSheet = { content: this.$options.methods.getTestPaperAllQuestionAnwserSheetPreviewImg.bind(this)() };
        
        //console.log(pdfMake.vfs);
        //var testPaperPdfAnwserSheetBlob = pdfMake.createPdf(docDefinitionAnwserSheet).getBlob()

      }, 500);
      
    },
    /**
     * 生成试卷整体PDF
     */
    createTestPaperPreviewPdf(){
      //生成pdf内容
      var dd = this.$options.methods.getTestPaperAllQuestionPreviewImg.bind(this)()
      var docDefinition = { content: dd };

      this.$options.methods.startFullscreenLoading.bind(this)()
		
			setTimeout(() => {

			  pdfMake.createPdf(docDefinition).open();
			
			//关闭屏蔽层
			//this.fullscreenLoading = false
			
			}, 300);
      //console.log(pdfMake.vfs);
      
    },
    /**
     * 获取所有试卷部分、大题、小题图片
     */
    getTestPaperAllQuestionPreviewImg(){
      var previewImgArr = []
      if(null == this.testPaperObj.items)
      {
        console.log("试卷为空，无法获取试卷")
        return []
      }
      
      console.log("开始获取所有试卷部分、大题、小题图片")
      //循环输出试卷部分================================================================================================

      //试卷抬头
      previewImgArr.push({
        image: this.testPaperObj.imgFile,
        width: this.pdfPrintA4PaperSizeWidth,
      })

      this.testPaperObj.items.forEach(questionPartItem => {

        //试卷部分
        previewImgArr.push({
          image:questionPartItem.imgFile,
          width: this.pdfPrintA4PaperSizeWidth,
        })

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {

          //大题
          previewImgArr.push({
            image: questionBigItem.imgFile,
            width: this.pdfPrintA4PaperSizeWidth, 
          } )

          //循环输出小题================================================================================================
          questionBigItem.items.forEach(questionItem => {
            
              previewImgArr.push({
                image:questionItem.imgFile,
                width: this.pdfPrintA4PaperSizeWidth,
              })

            //循环输出小题选项================================================================================================
            questionItem.items.forEach(questionOptionItem => {
              
                previewImgArr.push({
                  image:questionOptionItem.imgFile,
                  width: this.pdfPrintA4PaperSizeWidth,
                })
              
            })
            //循环输出小题选项，完成================================================================================================

          })
          //循环输出小题，完成================================================================================================
          
        })
        //循环输出大题，完成================================================================================================
        
      })
      //循环输出试卷部分，完成================================================================================================
      
      console.log("获取所有试卷部分、大题、小题图片完成 <<<<< ")
      //console.log(previewImgArr)
      //console.log(this.testPaperObj)
      return previewImgArr
    },
    /**
     * 生成试卷答题卡整体PDF
     */
    createTestPaperAnwserSheetPreviewPdf(){
      //生成pdf内容
      var dd = this.$options.methods.getTestPaperAllQuestionAnwserSheetPreviewImg.bind(this)()
      var docDefinition = { content: dd };

      this.$options.methods.startFullscreenLoading.bind(this)()
		
			setTimeout(() => {
        
			  pdfMake.createPdf(docDefinition).open();
			
			//关闭屏蔽层
			//this.fullscreenLoading = false
			
			}, 300);
      //console.log(pdfMake.vfs);
      
    },
    /**
     * 获取所有试卷小题的答题卡图片
     */
    getTestPaperAllQuestionAnwserSheetPreviewImg(){
      var previewImgArr = []
      if(null == this.testPaperObj.items)
      {
        console.log("试卷为空，无法获取答题卡图片")
        return []
      }
      
      console.log("开始获取所有试卷答题卡图片")
      //循环输出试卷部分================================================================================================

      this.testPaperObj.items.forEach(questionPartItem => {

        //循环输出大题================================================================================================
        questionPartItem.items.forEach(questionBigItem => {

          //循环输出小题================================================================================================
          questionBigItem.items.forEach(questionItem => {
            
              previewImgArr.push({
                image:questionItem.anwserSheet.imgFile,
                width: this.pdfPrintA4PaperSizeWidth,
              })

            //循环输出小题选项================================================================================================
            /*questionItem.items.forEach(questionOptionItem => {
              
                previewImgArr.push({
                  image:questionOptionItem.anwserSheet.imgFile,
                  width: this.pdfPrintA4PaperSizeWidth,
                })
              
            })*/
            //循环输出小题选项，完成================================================================================================

          })
          //循环输出小题，完成================================================================================================
          
        })
        //循环输出大题，完成================================================================================================
        
      })
      //循环输出试卷部分，完成================================================================================================
      
      console.log("获取所有试卷答题卡图片完成 <<<<< ")
      //console.log(previewImgArr)
      //console.log(this.testPaperObj)
      return previewImgArr
    },
    /**
     * base64的图片转换为formdata对象
     */
    base64ImgToFormData(base64Img) {

      var base64String = base64Img
 
      //这里对base64串进行操作，去掉url头，并转换为byte
      var bytes = window.atob(base64String.split(',')[1]);

      var array = [];
      for(var i = 0; i < bytes.length; i++){
          array.push(bytes.charCodeAt(i));
      }
      var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
      var fd = new FormData();
      fd.append('image_file',blob, Date.now() + '.jpg');

      return fd
    },
    /**
     * 基础http请求，get请求类
     */
    get (url, params) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: params
        }).then(res => {
          // console.log(res);

          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 基础http请求，get请求类
     */
    post (url, data) {
      return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
          // console.log(res);
          
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 基础http请求，post请求类，data为formdata
     */
    postFormdata (url, data) {
      return new Promise((resolve, reject) => {
        axios.post(url,data,{
          headers: {
            'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    //方法结束
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.appMain{
  background-color: #dedede;
}*/
.div_menu_title{
  height: 50px;
  line-height: 50px;
  width: 100%;
  float: left;
  color: #FFF;
}
.div_menu_item{
  height: 50px;
  line-height: 50px;
  width: 100%;
  float: left;
  color: #FFF;
}
.div_menu_item:hover{
  color: #d43030;
  cursor:pointer;
  background-color: #FFF;
}
.font_question_big:hover{
  cursor:pointer;
}
.text_header_title{
  color: #909399;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
}
.layout_header{
  height: 100px;
  /*background-color: #242f42;*/
  margin-left:auto;
  margin-right: auto;
  width: 800px;
}
.layout_aside {
  background-color: #344460;
}
.background_dark {
  background-color: #242f42;
}
.background_red {
  background-color: #d43030;
}
.background_blue {
  background-color: #2a82e4;
}
.background_green {
  background-color: #43cf7c;
}
.background_orange {
  background-color: #ff8d1a;
}
.ql-container.ql-snow {
  border: none;
}
</style>
