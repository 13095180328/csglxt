<template>
    <!-- 左边的盒子 -->
    <el-aside width="231px">
      <!-- 自己加的标签 -->
      <div id="titleBox">
        <h1>益家超市管理系统</h1>
        <div class="msgBox">
          <span class="s1">你好&nbsp;</span>
          <span class="s2">{{ getusernam() }}</span>
        </div>
        <div class="msgBox1">
          <span class="t1">管理首页</span>
          <span class="t2"> <a href="javascript:void(0)" @click="userOut()">退出系统</a></span>
        </div>
      </div>

      <!-- 左边菜单 -->
      <el-menu
        :unique-opened="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="/classify"> <router-link to="/classify">分类管理</router-link></el-menu-item>
          <el-menu-item index="/addclassify"> <router-link to="/addclassify">添加分类</router-link></el-menu-item>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goodslist"> <router-link to="/goodslist">商品管理</router-link></el-menu-item>
          <el-menu-item index="/goodsadd"> <router-link to="/goodsadd">添加商品</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项2</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项2</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>统计管理</span>
          </template>
          <el-menu-item index="/goodsecharts"> <router-link to="/goodsecharts">销售管理</router-link></el-menu-item>
          <el-menu-item index="1-2">管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="/userlist"> <router-link to="/userlist">账号管理</router-link></el-menu-item>
          <el-menu-item index="/useradd"> <router-link to="/useradd">添加账号</router-link></el-menu-item>
          <el-menu-item index="/pwdedit"> <router-link to="/pwdedit">密码修改</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项2</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项2</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>








<script>
    export default {

    data(){
      return {
        getusernam(){
          this.axios.get(this.apiHost+'/user/getusername')
          .then((result)=>{
            if(result.data){
              let nameBox = document.querySelector('.s2');
              nameBox.innerHTML = result.data;
            }
          })
        }

      }
    },





        methods: {
            // 菜单展开和收起的方法
          handleOpen(key, keyPath) {
              console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
              console.log(key, keyPath);
          },

        // 用户退出方法
          userOut(){  
            this.axios.get(this.apiHost+'/user/userOut')
            .then((result)=>{
              // 根据后端返回的作判断
              if(result.data.isOk){
                //根据是否清除成功处理业务逻辑
                this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                setTimeout(()=>{
                  this.$router.push("/login");
                },100)
              }
            }).catch((err)=>{
              console.log(err);
            })
          }
        },

        
    }

</script>





<style>
/* .is-opened{
  border:1px red solid;
  background-color:rgba(0, 0, 0, 0.3);
  } */
</style>
