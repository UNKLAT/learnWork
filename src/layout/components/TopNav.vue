<template>
  <div class="topNav">
    <div id="humbergur-container" > 伸缩菜单 </div>

    <el-breadcrumb separator="/" class="pathBreadcrumb">

      <el-breadcrumb-item 
        v-for="(item, index) in breadcrumbList"
        :key="index"
      >

        <router-link v-if="item.path" :to="item.path"> {{ item.name }} </router-link>
        <span v-else> {{ item.name }} </span>
          
      </el-breadcrumb-item>

    </el-breadcrumb>

    <div class="right-menu">

      <search> </search>

      <screenfull></screenfull>

      <el-dropdown trigger="click">

        <span class="el-dropdown__link">
          全局文字下拉
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item> Default </el-dropdown-item>
          <el-dropdown-item> Medium </el-dropdown-item>
          <el-dropdown-item> Small </el-dropdown-item>
          <el-dropdown-item> Mini </el-dropdown-item>
        </el-dropdown-menu>

      </el-dropdown>

      <el-dropdown>

        <span class="el-dropdown__link">
          链接下拉
        </span>

        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item> Profile </el-dropdown-item>
          <el-dropdown-item> Dashboard </el-dropdown-item>
          <el-dropdown-item> Github </el-dropdown-item>
          <el-dropdown-item> Docs </el-dropdown-item>
          <el-dropdown-item> Log Out </el-dropdown-item>

        </el-dropdown-menu>

      </el-dropdown>
      
    </div>

  </div>
</template>

<script>

import Search from './Search.vue';
import Screenfull from './Screenfull.vue';


export default {
  name: 'TopNav',
  components: {
    Search,
    Screenfull
  },

  data() {
    return {
      breadcrumbList: [
        {
          name: 'homeNav',
          path: '/homeNav'
        },
        {
          name: 'AboutVmodel',
          // path: '/AboutVmodel'
        },
        // {
        //   name: 'AboutVmodel',
        //   path: '/AboutVmodel'
        // },
      ]
    }
  },
}

</script>

<style lang="less" scoped>

.topNav{
  height: 50px;
}

#humbergur-container{
  // display: inline-block;
  float: left;
  line-height: 50px;
}

.pathBreadcrumb{
  // display: inline-block;
  float: left;
  margin-left: 10px;
  line-height: 50px;
}

.right-menu{
  display: flex;
  float: right;
  margin-right: 10px;
  line-height: 50px;
}

.el-dropdown__link{
  cursor: pointer;
}


</style>