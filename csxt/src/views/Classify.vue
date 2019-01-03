<template>
    <el-container id="frameBox">
    <!-- 左边的盒子 -->
    <LeftMenu></LeftMenu>
    

    <!-- 右边的盒子 包含 变化内容 头部 尾部-->
    <el-container id="mainContent">
      <!-- 右边上面的盒子 -->
      <RightTop></RightTop>


      <!-- 中间内容盒子 --------------------内容模块-->
      <el-main>
        <!-- 卡片组件 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户登录2</span>
            <el-button type="text">操作按钮1</el-button>
            <el-button type="text">操作按钮2</el-button>
          </div>
          <!-- 内容 -->
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">

                <el-table-column
                  prop="name"
                  label="分类名称"
                  width="500">
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="管理">
                </el-table-column>
            </el-table>

        </el-card>
      </el-main>


      
      <!-- 下面的盒子 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>







<script>
// 引入导航组件
  import LeftMenu from '../components/leftMenu';
  import RightTop from '../components/rightTop.vue';
  import RightBottom from '../components/rightBottom.vue';
export default {
    
    data() {
      return {
        tableData: [{
          name: '日用品1',
          address: '上海市普陀区金沙江路',
          Datah:'<i class="el-icon-edit"></i>'
        }, {
          name: '日用品2',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: '日用品3',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '日用品4',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },








    components: {
      //注册组件
      LeftMenu,
      RightTop,
      RightBottom
    },
}
</script>









<style>


</style>
