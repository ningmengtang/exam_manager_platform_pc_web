import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
			 meta: { title: '自述文件' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
				{
				    path: '/index_student',
				    component: () => import(/* webpackChunkName:"index_student"*/ '../components/page/index/index_student.vue'),
				    meta: { title: '学生-系统首页' }
				},
				{
				    path: '/index_teacher',
				    component: () => import(/* webpackChunkName: "index_teacher" */ '../components/page/index/index_teacher.vue'),
				    meta: { title: '教师-系统首页' }
				},
				{
				    path: '/index_school',
				    component: () => import(/* webpackChunkName: "index_teacher" */ '../components/page/index/index_school.vue'),
				    meta: { title: '学校-系统首页' }
				},
				{
				    path: '/manage_student',
				    component: () => import(/* webpackChunkName: "manage_student" */ '../components/page/manage/manage_student.vue'),
				    meta: { title: '学生-试卷管理' }
				},
				{
				    path: '/manage_teacher',
				    component: () => import(/* webpackChunkName: "manage_teacher" */ '../components/page/manage/manage_teacher.vue'),
				    meta: { title: '教师-试卷管理' }
				},
				{
				    path: '/manage_school',
				    component: () => import(/* webpackChunkName: "manage_teacher" */ '../components/page/manage/manage_school.vue'),
				    meta: { title: '学校-试卷管理' }
				},
				
				{
				    path: '/manage_teacher_import',
				    component: () => import(/* webpackChunkName: "manage_teacher_importr" */ '../components/page/manage/manage_teacher_import.vue'),
				    meta: { title: '教师-试卷管理-学生导入' }
				},
				{
				    path: '/manage_teacher_submit',
				    component: () => import(/* webpackChunkName: "manage_teacher_submit" */ '../components/page/manage/manage_teacher_submit.vue'),
				    meta: { title: '教师-试卷管理-提交试卷' }
				},
				{
				    path: '/order_school',
				    component: () => import(/* webpackChunkName: "order_school" */ '../components/page/order/order_school.vue'),
				    meta: { title: '学校-订购管理' }
				},
				{
				    path: '/personal_student',
				    component: () => import(/* webpackChunkName: "personal_student" */ '../components/page/personal/personal_student.vue'),
				    meta: { title: '学生-个人中心' }
				},
				{
				    path: '/personal_teacher',
				    component: () => import(/* webpackChunkName: "personal_teacher" */ '../components/page/personal/personal_teacher.vue'),
				    meta: { title: '教师-个人中心' }
				},
				{
				    path: '/personal_school',
				    component: () => import(/* webpackChunkName: "personal_teacher" */ '../components/page/personal/personal_school.vue'),
				    meta: { title: '学校-个人中心' }
				},
				{
				    path: '/distribution_teacher',
				    component: () => import(/* webpackChunkName: "personal_teacher" */ '../components/page/distribution/distribution_teacher.vue'),
				    meta: { title: '教师-试卷分发' }
				}
				
				
               
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '@/components/page/login/Login.vue'),
            meta: { title: '学生-登录' }
        },
        {
            path: '*',
            redirect: '/404',
			meta: { title: '' }
        }
    ]
});

