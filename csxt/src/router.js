import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 引入登录组件
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },

    // 公共组件 菜单 左边标题和底部标题
    {
      path: '/useradd',
      // 添加用户
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserAdd.vue')
    },
    {
      path: '/userlist',
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserList.vue')
    },
    {
      path: '/pwdedit',
      component: () => import(/* webpackChunkName: "UserAdd" */ './views/UserPwdEdit.vue')
    },
    // 分类管理里的俩个子项
    {
      path: '/classify',
      component: () => import( './views/Classify.vue')
    },
  ]


})
