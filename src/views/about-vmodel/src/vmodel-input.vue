<template>

  <div>
    <el-input 
      v-bind="$attrs"
      @input="inputValue"
    ></el-input>

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
      // value = 159
      this.$emit('input', value)
    },
  },

}
</script>
