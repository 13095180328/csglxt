<template>
  <div id="logBox">
    <!-- 卡片 -->
    <el-card class="box-card" id="Login">
      <div slot="header" class="clearfix">
        <span>
          <h2>用户登录</h2>
        </span>
        <!-- 登录 -->
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username" id="userId">
            <el-input type="password" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd" id="usermima">
            <el-input  type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>



<script>
export default {
  data() {
    return {
      ruleForm2: {
        userpwd: "",
        username: ""
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
        ]
      }
    };
  },


  methods: {
    // 提交表单的方法
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        // 前端验证
        if (valid) {
          // alert("登录成功✔");
          // 让ajax携带 cookie证书 
          this.axios.defaults.withCredentials=true;
          //使用路由对象的push实现跳转(this指向实例) 验证成功就发ajax 带账号与密码 与数据可对比
          this.axios.post(this.apiHost+"/user/checkLogin",
          this.qs.stringify(this.ruleForm2)).then((result)=>{
            // 判断后端返回的是true 还是false
            if(result.data.isOk){
              //登录成功
              this.$message({
                message: '恭喜你，'+result.data.msg,
                type: 'success'
              });
              this.$router.push("/"); //使用路由对象的push实现跳转
            }else{
              //登录失败
              this.$message({
                message:result.data.msg,
                type: 'success'
              });
            }
          }).catch((err)=>{
              console.log(err);
          })
        
        // 前端验证
        } else {
          alert("登录失败✖");
          return false;
        }
      });
    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>



<style>

  #logBox{
    background:url(../assets/bjt.jpg) no-repeat;
    background-size:100% 100%;
  }
  #Login{
    width:430px;
    height:250px;
    position:absolute;
    top:0px;
    left: 0px;
    right:0px;
    bottom: 0px;
    margin:auto;
  }




  /* 登录框的单独样式 */
#userId{width:330px;}
#usermima{width:330px;}
.el-card__body{padding:0px;}
</style>
