<template>
  <el-container id="frameBox">
    <!-- 左边的盒子 -->
    <LeftMenu></LeftMenu>
    

    <!-- 右边的盒子 包含 变化内容 头部 尾部-->
    <el-container id="mainContent">
      <!-- 右边上面的盒子 -->
      <RightTop></RightTop>


      <!-- 中间内容盒子 --------------------内容模块-->
      <el-main id="contentBox">
        <!-- 卡片组件 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户管理</span>
          </div>

          <!-- 内容 -->
          <div class="text item">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="用户"
                width="360">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="用户组"
                width="360">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.grouping }}</el-tag>
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

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
        //用户管理
        data() {
      return {
        tableData: [{
          userName: '杰瑞',
          grouping: '普通管理',
        }, {
          userName: '贝塔',
          grouping: '超级管理员',
        }, {
          userName: '汤姆',
          grouping: '普通管理',
        }, {
          userName: '托尼',
          grouping: '超级管理员',
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
/* 距离上班的距离 */
#contentBox{margin-top:-95px;}

</style>
