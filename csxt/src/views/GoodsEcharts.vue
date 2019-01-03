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
            <span>销售统计</span>
            <el-button type="text">操作按钮1</el-button>
            <el-button type="text">操作按钮2</el-button>
          </div>
          <!-- 内容 -->

        <!-- 显示echarts报表的dom盒子 -->
        <div id="main" style="width: 90%;height:420px;"></div>

          
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

  //引入报表
  import echarts from 'echarts';

export default {
    
  mounted(){
        // 4-1. 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 4-2. 指定图表的配置项和数据
        var option = {
            //标题
            title: {
                text: '商品销量报表'
            },
            //工具提示
            tooltip: {},
            //工具箱
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            //图例
            legend: {
                data:['销量']
            },
            //X轴数据
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","零食"]
            },
            //Y轴数据
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20,120]
            }]
        };

        // 4-3. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
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
