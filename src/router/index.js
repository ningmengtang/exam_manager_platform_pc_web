import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login',
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '' },
            children: [{
                    path: '/index_student',
                    component: () =>
                        import ( /* webpackChunkName:"index_student"*/ '../components/page/index/index_student.vue'),
                    meta: { title: '学生-系统首页' }
                },
                {
                    path: '/index_teacher',
                    component: () =>
                        import ( /* webpackChunkName: "index_teacher" */ '../components/page/index/index_teacher.vue'),
                    meta: { title: '教师-系统首页' }
                },
                {
                    path: '/index_school',
                    component: () =>
                        import ( /* webpackChunkName: "index_teacher" */ '../components/page/index/index_school.vue'),
                    meta: { title: '学校-系统首页' }
                },
                {
                    path: '/index_admin',
                    component: () =>
                        import ( /* webpackChunkName:"index_admin"*/ '../components/page/index/index_admin.vue'),
                    meta: { title: '管理员-系统首页' }
                },
                {
                    path: '/index_user',
                    component: () =>
                        import ( /* webpackChunkName:"index_student"*/ '../components/page/index/index_user.vue'),
                    meta: { title: '专家-系统首页' }
                },
                {
                    path: '/manage_student',
                    component: () =>
                        import ( /* webpackChunkName: "manage_student" */ '../components/page/manage/manage_student.vue'),
                    meta: { title: '学生-试卷管理' }
                },
                {
                    path: '/manage_user',
                    component: () =>
                        import ( /* webpackChunkName: "manage_student" */ '../components/page/manage/manage_user.vue'),
                    meta: { title: '专家-试卷管理' }
                },
                {
                    path: '/manage_teacher',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher" */ '../components/page/manage/manage_teacher.vue'),
                    meta: { title: '教师-试卷管理' }
                },
                {
                    path: '/manage_school',
                    component: () =>
                        import ( /* webpackChunkName: "manage_school" */ '../components/page/manage/manage_school.vue'),
                    meta: { title: '学校-试卷管理' }
                },
                {
                    path: '/manage_admin',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher" */ '../components/page/manage/manage_admin.vue'),
                    meta: { title: '管理员-试卷管理' }
                },

                {
                    path: '/manage_teacher_import',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_importr" */ '../components/page/manage/manage_teacher_import.vue'),
                    meta: { title: '教师-试卷管理-提交试卷' }
                },
                {
                    path: '/manage_user_import',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_importr" */ '../components/page/manage/manage_user_import.vue'),
                    meta: { title: '专家-试卷管理-提交试卷' }
                },
                {
                    path: '/manage_teacher_submit',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_submit" */ '../components/page/manage/manage_teacher_submit.vue'),
                    meta: { title: '教师-试卷管理-提交试卷' }
                },
                {
                    path: '/manage_admin_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher" */ '../components/page/manage/manage_admin_affirm.vue'),
                    meta: { title: '管理员-试卷管理-试卷确认' }
                },
                {
                    path: '/order_school',
                    component: () =>
                        import ( /* webpackChunkName: "order_school" */ '../components/page/order/order_school.vue'),
                    meta: { title: '学校-订购管理' }
                },
                // {
                //     path: '/order_school_add',
                //     component: () =>
                //         import ( /* webpackChunkName: "order_school_add" */ '../components/page/order/order_school_add.vue'),
                //     meta: { title: '学校-订购管理-新增订购' }
                // },
                {
                    path: '/order_school_add2',
                    component: () =>
                        import ( /* webpackChunkName: "order_school_add" */ '../components/page/order/order_school_add2.vue'),
                    meta: { title: '学校-订购管理-新增订购' }
                },
                {
                    path: '/order_school_add3',
                    component: () =>
                        import ( /* webpackChunkName: "order_school_add" */ '../components/page/order/order_school_add3.vue'),
                    meta: { title: '学校-订购管理-期末试卷-新增订购' }
                },
                {
                    path: '/order_admin_add2',
                    name: 'order_admin_add2',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/order/order_admin_add2.vue'),
                    meta: { title: '管理员-普通订单' }

                },
                {
                    path: '/order_admin_add3',
                    name: 'order_admin_add3',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/order/order_admin_add3.vue'),
                    meta: { title: '管理员-期末订单' }

                },
                {
                    path: '/order_admin',
                    component: () =>
                        import ( /* webpackChunkName: "order_admin" */ '../components/page/order/order_admin.vue'),
                    meta: { title: '管理员-订购管理' }
                },
                {
                    path: '/order_admin_add',
                    component: () =>
                        import ( /* webpackChunkName: "order_admin_add" */ '../components/page/order/order_admin_add.vue'),
                    meta: { title: '管理员-订购管理-新增订购' }
                },
                {
                    path: '/manage_admin_class',
                    component: () =>
                        import ( /* webpackChunkName: "manage_admin_class" */ '../components/page/manage/manage_admin_class.vue'),
                    meta: { title: '管理员-班级管理' }
                },
                {
                    path: 'manage_school_subordinate',
                    component: () =>
                        import ( /* webpackChunkName: "manage_school_subordinate"*/ '../components/page/manage/manage_school_subordinate.vue'),
                    meta: { title: '学校-用户管理' }
                },

                {
                    path: 'distribution_school',
                    component: () =>
                        import ( /* webpackChunkName: "manage_school_subordinate"*/ '../components/page/distribution/distribution_school.vue'),
                    meta: { title: '学校-分配试卷' }
                },
                {
                    path: 'manage_school_add',
                    component: () =>
                        import ( /* webpackChunkName: "manage_school_add"*/ '../components/page/manage/manage_school_add.vue'),
                    meta: { title: '学校-用户管理-新增用户' }
                },
                {
                    path: 'manage_school_change',
                    name: 'manage_school_change',
                    component: () =>
                        import ( /* webpackChunkName: "mmanage_school_change"*/ '../components/page/manage/manage_school_change.vue'),
                    meta: { title: '学校-用户管理-用户修改' }
                },
                {
                    path: 'manage_school_class',
                    component: () =>
                        import ( /* webpackChunkName: "manage_school_add"*/ '../components/page/manage/manage_school_class.vue'),
                    meta: { title: '学校-教师管理-分配班级' }
                },
                {
                    path: '/personal_student',
                    component: () =>
                        import ( /* webpackChunkName: "personal_student" */ '../components/page/personal/personal_student.vue'),
                    meta: { title: '学生-个人中心' }
                },
                {
                    path: '/personal_teacher',
                    component: () =>
                        import ( /* webpackChunkName: "personal_teacher" */ '../components/page/personal/personal_teacher.vue'),
                    meta: { title: '教师-个人中心' }
                },
                {
                    path: '/personal_school',
                    component: () =>
                        import ( /* webpackChunkName: "personal_school" */ '../components/page/personal/personal_school.vue'),
                    meta: { title: '学校-个人中心' }
                },
                {
                    path: '/personal_admin',
                    component: () =>
                        import ( /* webpackChunkName: "personal_school" */ '../components/page/personal/personal_admin.vue'),
                    meta: { title: '管理员-个人中心' }
                },
                {
                    path: '/examine_admin',

                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/examine/examine_admin.vue'),
                    meta: { title: '管理员-试卷审核' }
                },
                {
                    path: '/examine_user',

                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/examine/examine_user.vue'),
                    meta: { title: '专家-试卷审核' }
                },
                {
                    path: '/personal_user',
                    component: () =>
                        import ( /* webpackChunkName: "personal_user" */ '../components/page/personal/personal_user.vue'),
                    meta: { title: '专家-个人中心' }
                },
                {
                    path: '/distribution_teacher',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_teacher" */ '../components/page/distribution/distribution_teacher.vue'),
                    meta: { title: '教师-试卷分发' }
                },
                {
                    path: '/manage_teacher_subordinate',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_subordinate" */ '../components/page/manage/manage_teacher_subordinate.vue'),
                    meta: { title: '教师-学生管理' }
                },
                {
                    path: '/manage_teacher_add',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_add" */ '../components/page/manage/manage_teacher_add.vue'),
                    meta: { title: '教师-学生管理-学生新增' }
                },
                {
                    path: '/manage_teacher_change',
                    name: 'manage_teacher_change',
                    component: () =>
                        import ( /* webpackChunkName: "manage_teacher_add" */ '../components/page/manage/manage_teacher_change.vue'),
                    meta: { title: '教师-学生管理-学生修改' }
                },
                {
                    path: '/distribution_admin',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_admin" */ '../components/page/distribution/distribution_admin.vue'),
                    meta: { title: '管理员-试卷分发' }
                },
                {
                    path: '/distribution_admin_affirm',
                    name: 'distribution_admin_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/distribution/distribution_admin_affirm.vue'),
                    meta: { title: '管理员-试卷分发-试卷确认' }

                },
                {
                    path: '/distribution_admin_order_affirm',
                    name: 'distribution_admin_order_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/distribution/distribution_admin_order_affirm.vue'),
                    meta: { title: '管理员-订单详情' }

                },

                {
                    path: '/distribution_school_affirm',
                    name: 'distribution_school_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/distribution/distribution_school_affirm.vue'),
                    meta: { title: '学校-试卷分发-试卷确认' }
                },
                {
                    path: '/user_control',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/user/user_control.vue'),
                    meta: { title: '管理员-用户管理' }
                },
                {
                    path: '/user_control_add',
                    component: () =>
                        import ( /* webpackChunkName: "user_control_add" */ '../components/page/user/user_control_add.vue'),
                    meta: { title: '管理员-用户管理-用户添加' }
                },
                {
                    name: 'user_control_change',
                    path: '/user_control_change',
                    component: () =>
                        import ( /* webpackChunkName: "user_control_changed" */ '../components/page/user/user_control_change.vue'),
                    meta: { title: '管理员-用户管理-用户修改' }

                },
                {
                    name: 'log_all',
                    path: '/log_all',
                    component: () =>
                        import ( /* webpackChunkName: "log_all" */ '../components/page/log/log_all.vue'),
                    meta: { title: '管理员-日志' }

                },
                {
                    name: 'log_papers',
                    path: '/log_papers',
                    component: () =>
                        import ( /* webpackChunkName: "log_papers" */ '../components/page/log/log_papers.vue'),
                    meta: { title: '管理员-订单操作日志' }

                },
                {
                    name: 'test_paper_maker',
                    path: '/test_paper_maker',
                    component: () =>
                        import ( /* webpackChunkName: "test_paper_maker" */ '../components/page/testPaperMaker/test_paper_maker.vue'),
                    meta: { title: '组卷工具' }
                },
                {
                    name: 'test_paper_maker_for_task',
                    path: '/test_paper_maker_for_task',
                    component: () =>
                        import ( /* webpackChunkName: "test_paper_maker_for_task" */ '../components/page/testPaperMaker/test_paper_maker_for_task.vue'),
                    meta: { title: '试卷下载' }
                },
                {
                    path: '/webcats_leader_teacher_index',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_leader_teacher_index.vue'),
                    meta: { title: '教师-阅卷管理' }
                },
                {
                    path: '/webcats_teacher_import',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_import.vue'),
                    meta: { title: '教师-阅卷管理-导入答题卡' }
                },
                {
                    path: '/webcats_teacher_allocation',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_allocation.vue'),
                    meta: { title: '教师-阅卷管理-分配老师' }
                },
                {
                    path: '/webcats_teacher_redeoverlist',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_redeoverlist.vue'),
                    meta: { title: '教师-阅卷管理-查看进度' }
                },
                {
                    path: '/webcats_teacher_redeover',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_redeover.vue'),
                    meta: { title: '教师-阅卷管理-批阅' }
                },
                {
                    path: '/webcats_teacher_feeback',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_feeback.vue'),
                    meta: { title: '教师-阅卷管理-考试反馈' }
                },
                {
                    name:'webcats_teacher_feebacklist',
                    path: '/webcats_teacher_feebacklist',
                    component: () =>
                        import ( /* webpackChunkName: "user_control" */ '../components/page/webcats/webcats_teacher_feebacklist.vue'),
                    meta: { title: '教师-阅卷管理-考试反馈详情' }
                },



                {
                    name: 'examination_manage',
                    path: '/examination_manage',
                    component: () =>
                        import ( /* webpackChunkName: "examination_manage" */ '../components/page/examination/examination_manage'),
                    meta: { title: '学生-考试管理' }
                },
                {
                    name: 'examination_process',
                    path: '/examination_process',
                    component: () =>
                        import ( /* webpackChunkName: "examination_process" */ '../components/page/examination/examination_process'),
                    meta: { title: '学生-考试-首页' }
                },
                {
                    name: 'examination_faceRecognition',
                    path: '/examination_faceRecognition',
                    component: () =>
                        import ( /* webpackChunkName: "examination_faceRecognition" */ '../components/page/examination/examination_faceRecognition'),
                    meta: { title: '学生-考试-人脸识别' }
                },
                {
                    name: 'examination_scantronNone',
                    path: '/examination_scantronNone',
                    component: () =>
                        import ( /* webpackChunkName: "examination_scantronNone" */ '../components/page/examination/examination_scantronNone'),
                    meta: { title: '学生-考试-无答题卡' }
                },
                {
                    name: 'examination_scantronHas',
                    path: '/examination_scantronHas',
                    component: () =>
                        import ( /* webpackChunkName: "examination_scantronHas" */ '../components/page/examination/examination_scantronHas'),
                    meta: { title: '学生-考试-有答题卡' }
                },
                {
                    name: 'examination_scantronImg',
                    path: '/examination_scantronImg',
                    component: () =>
                        import ( /* webpackChunkName: "examination_scantronImg" */ '../components/page/examination/examination_scantronImg'),
                    meta: { title: '学生-考试-图片试卷' }
                },
                {
                    name: 'examination_feedback',
                    path: '/examination_feedback',
                    component: () =>
                        import ( /* webpackChunkName: "examination_feedback" */ '../components/page/examination/examination_feedback'),
                    meta: { title: '学生-考试-考后反馈-查看' }
                },
                {
                    name: 'examination_finish',
                    path: '/examination_finish',
                    component: () =>
                        import ( /* webpackChunkName: "eexamination_finish" */ '../components/page/examination/examination_finish'),
                    meta: { title: '学生-考试-考试完成' }
                },
                




            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '@/components/page/login/Login.vue'),
            meta: { title: '学生-登录' }
        },
        {
            path: '/vueVideo',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/vueVideo.vue'),
            meta: { title: '摄像头' }
        },


        // mobile
        {
            path: '/mobile_examination_finish',
            name: 'mobile_examination_finish',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/mobile/student/mobile_examination_finish.vue'),
            meta: { title: '学生考试完成' }
        },
        {
            path: '/mobile_examination_upfile',
            name: 'mobile_examination_upfile',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_upfile" */ '../components/page/mobile/student/mobile_examination_upfile.vue'),
            meta: { title: '学生考试上传图片答案' }
        },
        {
            path: '/mobile_examination_faceRecognition',
            name: 'mobile_examination_faceRecognition',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_faceRecognition" */ '../components/page/mobile/student/mobile_examination_faceRecognition.vue'),
            meta: { title: '学生考试上传图片答案' }
        },
        {
            path: '/mobile_examination_scantronNone',
            name: 'mobile_examination_scantronNone',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_scantronNone" */ '../components/page/mobile/student/mobile_examination_scantronNone.vue'),
            meta: { title: '学生考试无答题卡' }
        },
        {
            path: '/mobile_examination_scantronHas',
            name: 'mobile_examination_scantronHas',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_scantronHas" */ '../components/page/mobile/student/mobile_examination_scantronHas.vue'),
            meta: { title: '学生考试有答题卡' }
        },
        {
            path: '/mobile_examination_scantronImg',
            name: 'mobile_examination_scantronImg',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_scantronImg" */ '../components/page/mobile/student/mobile_examination_scantronImg.vue'),
            meta: { title: '学生考试图片试卷' }
        },
        {
            path: '/mobile_examination_feedback',
            name: 'mobile_examination_feedback',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_feedback" */ '../components/page/mobile/student/mobile_examination_feedback.vue'),
            meta: { title: '学生考后反馈' }
        },

        {
            path: '/mobile_examination_process',
            name: 'mobile_examination_process',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_process" */ '../components/page/mobile/student/mobile_examination_process.vue'),
            meta: { title: '学生考试首页' }
        },
        {
            path: '/mobile_examination_manage',
            name: 'mobile_examination_manage',
            component: () =>
                import ( /* webpackChunkName: "mobile_examination_manage" */ '../components/page/mobile/student/mobile_examination_manage.vue'),
            meta: { title: '学生考试试题' }
        },
        {
            path: '/mobile_personal_student',
            name: 'mobile_personal_student',
            component: () =>
                import ( /* webpackChunkName: "mobile_personal_student" */ '../components/page/mobile/student/mobile_personal_student.vue'),
            meta: { title: '学生考试试题' }
        },


        {
            path: '/mobile_teacherIndex',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/mobile/teacher/mobile_teacherIndex.vue'),
            meta: { title: '手机教师首页' }
        },
        {
            path: '/mobile_checkIndex',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/mobile/teacher/mobile_checkIndex.vue'),
            meta: { title: '手机教师批改试卷' }
        },
        {
            path: '/mobile_userInfo',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/mobile/common/userInfo.vue'),
            meta: { title: '手机个人信息' }
        },

        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],

});