<template>
  <!-- 无嵌套的时候，可以不做任何处理，input事件可以将值传递到父组件 -->
  <!-- <el-input 
   v-bind="$attrs"
   @input="inputValue"
  ></el-input> -->
  <div>

    <div>
      <span>做了一层嵌套</span>
      <el-input 
        v-bind="$attrs"
        @input="inputValue"
      ></el-input>
    </div>

  </div>


</template>

<script>
export default {
  name: 'VmodelInput',
  emits: [ 'input' ],
  data() {
    return {

    }
  },

  methods: {
    inputValue(value) {
      console.log(value, 'vmodel-input input')
      value = 159
      this.$emit('input', value)
    },
  },

}
</script>
