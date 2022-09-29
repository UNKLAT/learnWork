<template>
  <div class="tab-bar__item">

    <div class="tab-bar__item-icon" :style="activeStyle">
      <slot name="icon"> </slot>
    </div>

    <div class="tab-bar__item-title" :style="activeStyle">
      <slot name="title"> </slot>
    </div>

  </div>
</template>

<script>

export default {
  name: 'tabBarItem',
  props: {
    activeColor: {
      type: String,
      default: 'red',
    }
  },

  computed: {
    activeStyle() {
      return 'color:' + this.activeColor
    },
  },
}

</script>

<style scoped>
  .tab-bar__item {
    flex: 1;
    text-align: center;
  }

</style>