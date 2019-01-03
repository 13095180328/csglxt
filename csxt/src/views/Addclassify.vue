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
            <span>用户登录1</span>
            <el-button type="text">操作按钮1</el-button>
            <el-button type="text">操作按钮2</el-button>
          </div>

          <!-- 内容 -->
          <div>
            <p>所属分类:</p>
            <el-select id="selectBox" v-model="value" placeholder="------顶层分类------">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

            <el-form
              label-position="top"
              :model="ruleForm3"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
              >
              <el-form-item label="分类名称" prop="pwdUsed">
                <el-input type="text" v-model="ruleForm3.pwdUsed" autocomplete="off"></el-input>
              </el-form-item>

              <p>状态:</p>
              <template>
                <el-radio v-model="radio" label="1">启用</el-radio>
                <el-radio v-model="radio" label="2">禁用</el-radio>
              </template>
              <p><button type="button" class="addbtn">添加</button></p>
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
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
         radio: '1',

        ruleForm3: {
        pwdUsed:'',   //原密码
      },
      rules2: {
        pwdUsed: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: 'blur', message: "分类名称必须填写" },
           //min: 6 最小长度   max: 18 最大长度
          { min:6, max:18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
        ]}
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
/* 下拉框 */
#selectBox{height:30px; width:170px;}
.el-icon-arrow-up{line-height:30px;}
.el-form--label-top .el-form-item__label{padding:0px;}
.el-form-item__content{width:220px;}

.addbtn{background-color:#6aae00; border:none; border-radius:2px; width:50px; height:30;
line-height:20px;
 }
</style>
