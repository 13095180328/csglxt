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
                  <el-button size="mini" @click="handleEdit( scope.row.userid)">
                    <i class="el-icon-edit"></i>编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete( scope.row.userid)"
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

    <!-- 模态框 -->
    <el-dialog
      title="修改用户资料"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <!-- 放表单 -->
      <el-form
          label-position="right"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
          >
          <el-form-item label="账号" prop="username">
            <el-input class="useralter" type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input class="useralter" type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 下拉框 -->
          <el-form-item label="用户组" prop="usergroup">
            <el-select v-model="ruleForm2.usergroup" placeholder="请选择" class="optionalert">
              <el-option label="普通管理员" value="普通管理"></el-option>
              <el-option label="超级管理员" value="超级管理"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          </el-form-item> -->
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">确定修改</el-button>
      </span>
    </el-dialog>


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
      tableData: [],
      dialogVisible: false, //控制模态框的隐藏还是弹出

      ruleForm2: {
        username: "",
        userpwd: "",
        usergroup:'',
        userid:0
      },
      rules2: {
        username: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: 'blur', message: "用户名必须填写" },
           //min: 6 最小长度   max: 18 最大长度
          { min:6, max:18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        userpwd:[
          { required: true, trigger: 'blur', message: "密码必须填写" },
          { min: 1, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        usergroup:[
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },

  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },

  methods: {
    //封装请求用户列表的axios
    getUsers(){
      this.axios.get(this.apiHost+"/user/userlist").then((result)=>{
        this.tableData = result.data;
      }).catch((err)=>{
        console.log(err.message);
      })
    },


    // 编辑用户 实现修改资料 就是带着用户点当前的 id去后端查了 在回填
    handleEdit(id) {
      console.log(id);
      this.axios.get(this.apiHost+'/user/getuserid?userid='+id)
      .then((result)=>{
        // 返回的是旧数据 需要回到修改框里(旧数据再模态框里)
        this.ruleForm2 = result.data[0];
        this.dialogVisible = true;
      }).catch(err=>{
        this.$message.error('出错了：'+err.message); //调用消息框给用户提示
      })
    },

    // 修改模态框的方法 点击会显示模态框
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          //通过前端验证  将新数据发给后端 （后端存入数据库）
          this.axios.post(this.apiHost+"/user/newuserdata",
          this.qs.stringify(this.ruleForm2)).then((result)=>{
            if(result.data.isOk){
              this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                //VUE实例才加this 修改完毕后关闭对话框
                this.dialogVisible=false;
                this.getUsers()    //调用获取全部用户列表方法
            } else {
              this.$message.error(result.data.msg);
            }
          }).catch((err)=>{
            this.$message.error('错了哦'+err.message);
          })
        } else {
          // alert("登录失败✖");
          return false;
        }
      });
    },


    // 删除用户的方法
    // scope.row就是一行数据（数据对象）{userid:4,username:’赵六’}
    handleDelete( id) {
      console.log(id);
      // 发axios发请求 带着id
      this.axios(this.apiHost+'/user/dellist?userid='+id)
      .then((result)=>{
        if(result.data.isOk){
          // 删除成功就提示消息
          this.$message({
          message: result.data.msg,
          type: 'success'
          });
          // 调用查看列表的方法
          this.getUsers();
        } else {
          // 否则就是出错了
          this.$message.error('出错了：'+result.data.msg);
        }
      })
    },




    //关闭对话框方法
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

    
  },



  // 组件实例化之后执行的钩子
  created(){
    // 使用axios发请求 
    this.axios.get(this.apiHost+"/user/userlist").then((result)=>{

      this.tableData = result.data;
    }).catch((err)=>{
      console.log(err.message);
    })
    this.getUsers();
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
.useralter{ width:230px;}
.optionalert{ width:130px;}
</style>
