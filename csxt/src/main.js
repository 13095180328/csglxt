import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//自己的样式在element 后面引入
import './assets/style/public.css'

// 引入axios并挂在Vue原型上实例都可使用
import axios from 'axios'
Vue.prototype.axios = axios;
// 引入qs 方便post方式传参
import qs from 'qs'
Vue.prototype.qs = qs;



//配置全局ip( 每次换ip都要更换 )
let updateip = "http://192.168.0.106:2002";
//把这个ip地址挂在vue原型 供实例使用 （换网需更换端口 还有 跨域cookies认证）
Vue.prototype.apiHost = updateip;


//配置路由守卫
router.beforeEach((to, from, next) => {

    //** 让ajax携带cookie证书 **
  axios.defaults.withCredentials=true;
  axios.get(updateip+'/user/getCookie')
  .then((result)=>{
    if(result.data.isOk || to.path=="/login"){
      next();
    } else {
      next('/login')
    }
  }).catch((err)=>{
   console.error("错误了!"+err.message);
  });
});

















Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
