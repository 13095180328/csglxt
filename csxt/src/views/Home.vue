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
            <span>卡片名称</span>
          </div>
          <!-- 提示消息框 -->
          <el-alert title="商品总数" type="success" show-icon></el-alert>
          <el-alert title="导入数据：" type="info" show-icon></el-alert>
          <!-- 俩个栅格 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <!-- 一个栅格里面是一个卡片 -->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>销售商品</span>
                </div>
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="date" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="address" label="销量" width="180"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <!-- 第二个小栅格 -->
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>缺货的商品</span>
                </div>
                <el-table :data="tableData2" stripe style="width: 100%">
                  <el-table-column prop="date2" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="address2" label="销量" width="180"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
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

// 表格的
 data() {
      return {
        tableData: [{
          date: '天下秀',
          address: '10'
        }, {
          date: '大前门',
          address: '20'
        }, {
          date: '黄果树',
          address: '30'
        }, {
          date: '哈德门',
          address: '40'
        }],
        //缺货货物
        tableData2:[{date2:'中华',address2:'12'}]
      }
    },

  methods:{
    // 菜单展开和收起的方法
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },

    //公共样式 注册组件
  components: {
   LeftMenu,
   RightTop,
   RightBottom
  },

}
</script>

<style>
/* 整个右边板块的背景色 */
#mainContent{background-color:#f9f9f9;}
</style>



