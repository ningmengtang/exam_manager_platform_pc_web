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
                    meta: { title: '教师-试卷管理-学生导入' }
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
                    name:'order_admin_add2',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/order/order_admin_add2.vue'),
                    meta: { title: '管理员-普通订单' }

                },
                {
                    path: '/order_admin_add3',
                    name:'order_admin_add3',
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
                    name:'distribution_admin_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/distribution/distribution_admin_affirm.vue'),
                    meta: { title: '管理员-试卷分发-试卷确认' }

                },
                {
                    path: '/distribution_admin_order_affirm',
                    name:'distribution_admin_order_affirm',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/distribution/distribution_admin_order_affirm.vue'),
                    meta: { title: '管理员-订单详情' }

                },
               
                {
                    path: '/distribution_school_affirm',
                    name:'distribution_school_affirm',
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
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/testPaperMaker/test_paper_maker.vue'),
                    meta: { title: '组卷工具' }
                },
                {
                    name: 'test_paper_maker_for_task',
                    path: '/test_paper_maker_for_task',
                    component: () =>
                        import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/testPaperMaker/test_paper_maker_for_task.vue'),
                    meta: { title: '试卷下载' }
                }



            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '@/components/page/login/Login.vue'),
            meta: { title: '学生-登录' }
        },
        {
            path: '/vueCanvas',
            component: () =>
                import ( /* webpackChunkName: "distribution_affirm" */ '../components/page/vueCanvas.vue'),
            meta: { title: '试卷下载' }
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