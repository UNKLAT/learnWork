<template>
  <div v-if="!navConfig.hidden">

    <el-menu-item 
      v-if="!navConfig.children"
      :index="navConfig.index"
    >
      <div>
        <i v-if="navConfig.icon" :class="menuIcon" class="nav-icon"></i>
        <span> {{ navConfig.name  }} </span>        
      </div>

      
    </el-menu-item>

    <el-submenu v-else :index="navConfig.index">

      <template #title>

        <div>
          <i :class="menuIcon" class="nav-icon"></i>
          <span> {{ navConfig.name  }} </span>          
        </div>

      </template>

      <nav-item 
        v-for="(subNav, index) in navConfig.children" 
        :key="index"
        :nav-config="subNav" 
      >
      </nav-item>
    </el-submenu>

  </div>
</template>

<script>

export default {
  name: 'NavItem',
  components: {
    document,
  },
  props: {
    navConfig: {
      typeo: Object,
      require: true,
    }
  },

  computed: {
    menuIcon() {
      let icon = 'el-icon-eleme'
      if (this.navConfig.icon) {
        icon = this.iconMap[this.navConfig.icon] || 'el-icon-eleme'
      }
      return icon
    }
  },

  data() {
    return {
      iconMap: {
        homeNav: 'el-icon-location',
        AboutVmodel: 'el-icon-help',
        homeNav3: 'el-icon-setting',
      }
    }
  }
}


</script>

<style lang="less" scoped>

@import '../../../styles/variables.less';
.nav-icon {
  width: 1em;
  height: 1em;
  margin-right: 12px;
  color: @menuText;
}

</style>