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
            <el-button type="text">操作按钮1</el-button>
            <el-button type="text">操作按钮2</el-button>
            <el-button type="text">操作按钮3</el-button>
          </div>

          <!-- 内容 -->
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">

              <el-table-column label="编号" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.userid }}</span>
                </template>
              </el-table-column>

              <el-table-column label="账号" width="200">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="编号" width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.addDate | foramtData }}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户组" width="200">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.usergroup }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"></i>编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <i class="el-icon-delete"></i>删除
                  </el-button>
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
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop.vue";
import RightBottom from "../components/rightBottom.vue";

// 引入格式时间的组件
import moment from 'moment'

export default {
  //用户管理
  data() {
    return {
      tableData: []
    };
  },

  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  // 组件实例化之后执行的钩子
  created(){
    // 使用axios发请求 
    this.axios.get("http://192.168.0.106:2001/user/userlist").then((result)=>{
      console.log(result.data);
      this.tableData = result.data;
    }).catch((err)=>{
      console.log(err.message);
    })
  },

  // 过滤方法
  filters:{
    foramtData(oldDate){
       return moment(oldDate).format("YYYY年MM月DD日");
    }
  }

};
</script>











<style>
/* 距离上班的距离 */
#contentBox {
  margin-top: -95px;
}
</style>
