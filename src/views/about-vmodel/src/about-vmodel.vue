<template>

  <div>

    <div>
      <span> v-model使用验证 </span>
    </div>

    <div class="vmodel-input">


      <div>
        <span> 直接使用底层el-input</span>

        <vmodel-input 
          v-model="vInputValue"
        >
        </vmodel-input>
      </div>

      <div>
        <span>二次封装扩展</span>
        <label-input
          extend-class="div-display__inline-block"
          :label-show="false"
          v-model='testValue'
          clearable
        ></label-input>         
      </div>



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

  watch: {
    vInputValue(val) {
      console.log(val, 'vInputValue')
    },

    testValue(val) {
      console.log(val, 'testValue')
    },
  },
}
</script>

<style>
.vmodel-input{
  /* width: 20%; */
  display: flex;
}
</style>