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
            <span>添加用户</span>
            <el-button type="text">操作按钮1</el-button>
            <el-button type="text">操作按钮2</el-button>
            <el-button type="text">操作按钮3</el-button>
          </div>
          
          <!-- 用户登录注册 -->
        <el-form
          label-position="top"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
          >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passAlike">
            <el-input type="password" v-model="ruleForm2.passAlike" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 下拉框 -->
          <el-form-item label="用户组" prop="userElect">
            <el-select v-model="ruleForm2.userElect" placeholder="请选择">
              <el-option label="普通管理员" value="普通管理"></el-option>
              <el-option label="超级管理员" value="超级管理"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          </el-form-item>
        </el-form>

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
    // 验证密码是否一致
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };




    // 返回的数据  对象
    return {
      ruleForm2: {
        pass: "",
        username: "",
        passAlike:"", //确认密码
        userElect:""  //选框
      },
      rules2: {
        username: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: 'blur', message: "用户名必须填写" },
           //min: 6 最小长度   max: 18 最大长度
          { min:6, max:18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        pass:[
          { required: true, trigger: 'blur', message: "密码必须填写" },
          { min: 1, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        passAlike:[
          {required:true, trigger:"blur", message:"确认密码必须填写"},
          {min:1, max:12, message:'确认密码长度 6 到 12个字符', trigger:"blur"},
          //调用自定义的验证方法验证两次密码是否一致
          { validator: validatePassword, trigger: 'blur' }
        ],
        userElect:[
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
    // 提交表单的方法
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          // alert("登录成功✔");
          //使用路由对象的push实现跳转(this指向实例) this.$router.push('/');
         console.log(this.ruleForm2);
        //  后端地址 （是服务器地址就是监听端口那个）
         this.axios.post(this.apiHost+'/user/useradd',
        //  使用qs处理post参数 ruleForm2是返回的对象
         this.qs.stringify(this.ruleForm2)).then((result)=>{
          //  根据返回的结果处理 是否注册成功
              if(result.data.isOk){
                this.$message({
                  message:result.data.msg,
                  type:'success'
                });
                setTimeout(() => {
                  this.$router.push("/userlist");
                },100);
              } else {
                // 添加失败
                this.$message.error(result.data.msg);
              } 
          }).catch(err=>{
            console.log('服务器错误返回的信息',err.message)
          });

        // 通过去那段验证 才使用axios发请求到后端api

        } else {
          // alert("登录失败✖");
          return false;
        }
      });
    },
  }



}
</script>






<style>

.el-input{width:250px;}
.el-input--suffix{width:140px;}





.el-form-item{margin-bottom:10px;}
.el-card__body{padding:0px 30px;}


</style>

