<template>
          <!-- 下面的盒子 -->
      <el-footer>
        <p>&copy;Copyriht 2018 益家超市管理系统</p>
      </el-footer>

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
              console.log(result.data)
              nameBox.innerHTML = result.data;
            }
          })
        }

      }
    },
}
</script>







<style>


</style>

