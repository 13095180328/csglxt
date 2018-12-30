<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  },

  
}
</script>

<style>
  html,body,#app,#logBox,#frameBox{
    height: 100%;
    margin: 0px;
  }
  /* 整个右边板块的背景色 */
  #mainContent{background-color:#f9f9f9;}



</style>
