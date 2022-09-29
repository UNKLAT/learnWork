<template>
  <div class="label-input" :class="extendClass">

    <span class="prefix-label" v-if="labelShow">
      <span class="required-flag" v-if='required'>*</span> 
      {{ inputLabel + ':'}}
    </span>

    <el-input v-if="inputType === 'input'"
        
      class="filter-item--input"
      v-bind="$attrs"
      @input="inputValue"
      @keyup="inputKeyup"
    >
    </el-input>

    <el-select v-else v-bind="$attrs" @change="optionChange" collapse-tags>
      <el-option
          v-for="item in valueOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          >
      </el-option>
    </el-select>

    <el-tooltip v-if=" tooltip !=='' " class="item" effect="dark" :content="tooltip" placement="bottom-start" >
      
      <el-icon :size="16" class="tooltip-icon"><question-filled /></el-icon>

    </el-tooltip>

    <span v-if="inputType === 'continue'">

      <el-input v-bind="$attrs" ></el-input>
      <span class="continue-icon" > - </span>
      <el-input v-bind="$attrs" ></el-input>

    </span>

    <el-button 
     v-if="detailButton"
     type="primary"
     @click="clickDetail"
     class="detail-button">
      
      操作
      
     </el-button>


  </div>
</template>

<script>

export default {
  name: "LabelInput",
  // inheritAttrs: true,
  inheritAttrs: false,

  emits: ['input', 'keyup', 'optionChange', 'clickDetail'],

  props: {
    required: {
      type: Boolean,
      default: true,
    },

    
    inputLabel: {
      type: String,
      default: ''
    },

    tooltip:{
      type: String,
      default: ''
    },

    inputType:{
      type: String,
      default: 'input'
    },

    valueOption:{
      type: Array,
      default: null,
    },

    extendClass:{
      type: String,
      default: '',
    },
    labelShow:{
      type: Boolean,
      default: true,
    },

    paramKey: {
      type: String,
      default: '',
    },
    detailButton:{
      type: Boolean,
      default: false,
    },

    typeLimit: {
      type: String,
      default: 'string'
    },

  },
  data(){
    return {
      editable: true,
      exportLoad: false,
      value: '',
    }
  },

  mounted() {
    console.log(this.edit)
    this.editable = this.edit === false ? false : true
  },

  methods: {

    inputValue(value){
      value = 159
      console.log(value, this.typeLimit, typeof value, 'inputValue')
      // this.$emit('input', event.target.value)
      
      this.$emit('input', 159)
    },

    inputKeyup(event) {
      // console.log(event, this.typeLimit, typeof value, 'inputKeyup')

      this.$emit('keyup', event)
    },

    optionChange(val){
      this.$emit('optionChange', { value: val, paramKey: this.paramKey })
    },

    clickDetail(){

      this.$emit('clickDetail', { value: true })
    },


  }
}
</script>

<style scoped lang="less">
  
  .label-input{
    padding-bottom: 10px;
    .prefix-label{

      display: inline-block;
      text-align: right;
      width: 120px;
      margin-right: 5px;
      span.required-flag {
        color: red;
      }

    }

    .filter-item--input {
      width: 220px;
    }

    .el-select{
      width: 220px;
    }

    .textarea {
      width: 404px;
    }

    .continue-icon {
      height     : 30px;
      line-height: 30px;
      text-align : center
    }

    .tooltip-icon{
      position: relative;
      top: 3px;
    }

    .detail-button{
      min-height: 30px;
      padding: 5px;
      margin-left: 2px;
    }

  }
  
  .div-display__inline-block{
    display: inline-block;
  }


</style>