<template>
  <div class="app-wrapper" :class="classObj">
    <div >

    </div>

    <sidebar class="sidebar-container"> </sidebar>

    <div 
      class="main-container"
    >
      
      <top-nav> </top-nav>
      
      <app-main />

    </div>
  </div>


</template>

<script>
import { Sidebar } from './components/index.js'
import AppMain from './components/AppMain.vue';
import TopNav from './components/TopNav.vue';

export default {
  name: 'Layout',
  components: { 
    Sidebar,
    AppMain,
    TopNav,
  },

  data() {
    return {
      classObj: '',
    }
  }
}


</script>

<style lang="less" scoped>

@bg-color: black;

.app-wrapper{
  height: 100%;
  width: 100%;
  // display: flex;
}
.sidebar-container{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  width: 210px !important;
  overflow: hidden;

  background-color: @bg-color;
}

.main-container{
 position: relative;
 min-height: 100%;
 margin-left: 210px;
 overflow: auto;
}

</style>
