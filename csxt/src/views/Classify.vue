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
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
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

</style>
