<template>
  <div class="tab-bar">
    <slot> </slot>
  </div>
</template>

<script>

export default {
  name: 'tabBar',
  props: {

  },

  
}

</script>

<style scoped>

.tab-bar {
  display: flex;
  height: 49px;
  background-color: gray;
}

</style>