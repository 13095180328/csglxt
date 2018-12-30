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


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
