import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import VCharts from 'v-charts'
import { messages } from './components/common/i18n';
import  global  from'./components/common/globalVariable';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import './assets/icon/iconfont.css';
import Vue2OrgTree from 'vue2-org-tree'
//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

//富文本编辑器
Vue.use(VueQuillEditor)

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VCharts)
Vue.use(Vue2OrgTree)
Vue.use(global)
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
//全局变量
Vue.prototype.global = {  
      loginUserType:localStorage.getItem('loginUserType'),  
      loginToken: localStorage.getItem('loginToken'),  
      userID:localStorage.getItem('userID'),  
	  userName:localStorage.getItem('userName')
    };  
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const role  = localStorage.getItem('loginUserType');
  const token  = localStorage.getItem('loginToken');
  if(!role && !token && to.path !== '/login'){
        next('/login');
  }else if(role && token && to.path == '/login'){
        next(`/index_${role}`)
  }else{
      next()
  }
});

// router.beforeEach((to, from, next) => {
//   // ... 
//   console.log(to)
//   console.log(from)
// })
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// });

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
