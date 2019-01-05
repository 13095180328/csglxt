<template>

  <el-header id="myel-header" height="100px">
    <div id="rightUser">
      <p>
        欢迎您&nbsp;
        <span id="nameBox">{{ getusernam() }}</span>
      </p>
      <p class="p2">添加管理员账户</p>
    </div>
  </el-header>

</template>






<script>
export default {
    data(){
      return {
        getusernam(){
          this.axios.get(this.apiHost+'/user/getusername')
          .then((result)=>{
            if(result.data){
              let nameBox = document.getElementById('nameBox');
              nameBox.innerHTML = result.data;
            }
          })
        }

      }
    },

    mmethods:{
      getusernam(){
        let str = "zfc"+1;
        return str;
      }

    },
      //视图挂载完成执行的钩子




}
</script>







<style>

</style>
