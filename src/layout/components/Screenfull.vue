<template>
  <div class="screenfull-container">

    <div @click="toggleScreenfull">
      <span v-if="isFull"> 全屏 </span>
      <span v-else> 还原 </span>
    </div>

  </div>
</template>

<script>
import { elementAt } from 'rxjs';


export default {
  name: 'Screenfull',
  data(){
    return {
      isFull: true,
    }
  },

  methods: {

    /** 全屏切换  */
    toggleScreenfull() {

      if (this.isFull) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }

      this.isFull = !this.isFull
    }

  }
}

</script>

<style lang="less" scoped>

.screenfull-container{
  width: 50px;
  margin-left: 5px;
  text-align: center;
  cursor: pointer;
}

</style>