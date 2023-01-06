<template>
  <div >
    <el-button @click="() => { isShow = !isShow }"> 搜索 </el-button>

    <el-input 
      v-show="!isShow" 
      v-model="searchString" 
      class="search-input"
      placeholder="Search"
    >
    </el-input>

  </div>
</template>

<script>

export default {
  name: 'Search',
  data(){
    return {
      isShow: true,
      searchString: '',
    }
  }
}

</script>

<style lang="less" scoped>

.search-input{
  width: calc(100% - 90px);
}

</style>