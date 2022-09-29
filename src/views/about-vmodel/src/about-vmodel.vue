<template>

  <div>

    <div class="vmodel-input">

      <div>
        <span> v-model使用验证 </span>

        <vmodel-input 
          v-model="vInputValue"
        >
        </vmodel-input>
      </div>

      <label-input
        extend-class="div-display__inline-block"
        :label-show="false"
        v-model='testValue'
        clearable
      ></label-input> 

    </div>


  </div>

</template>

<script>
import vmodelInput from "./vmodel-input.vue"
import LabelInput from "./label-input.vue"
export default {
  name: 'AboutVmodel',
  components: { vmodelInput, LabelInput },
  data() {
    return {
      vInputValue: '',
      testValue: '',
    }
  },
}
</script>

<style>
.vmodel-input{
  /* width: 20%; */
  display: flex;
}
</style>