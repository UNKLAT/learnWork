<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <nav-item 
          v-for="(navConfig, index) in navConfigList" 
          :key="index"
          :nav-config="navConfig" 
        >
        </nav-item>

      </el-menu> 


    </el-scrollbar>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import NavItem from './NavItem.vue'
import variables from '@/styles/variables.less'

export default {
  // components: { SidebarItem, Logo },
  components: { NavItem, Logo },

  computed: {
  //   ...mapGetters([
  //     'permission_routes',
  //     'sidebar'
  //   ]),
  //   activeMenu() {
  //     const route = this.$route
  //     const { meta, path } = route
  //     // if set path, the sidebar will highlight the path you set
  //     if (meta.activeMenu) {
  //       return meta.activeMenu
  //     }
  //     return path
  //   },
    showLogo() {
      // return this.$store.state.settings.sidebarLogo
      return true
    },
    variables() {
      return variables
    },
  //   isCollapse() {
  //     return !this.sidebar.opened
  //   }
  },

  data() {
    return {
      activeMenu: 'homeNav',
      navConfigList: [
        {
          index: '1-1',
          name: 'homeNav1',
          icon: 'default',
          hidden: false,
        },
        {
          index: '1-2',
          name: 'AboutVmodel',
          icon: 'AboutVmodel',
          hidden: false,
        },
        {
          index: '1-3',
          name: 'homeNav3',
          icon: 'homeNav3',
          hidden: true,
        },
        {
          index: '1-4',
          name: 'homeNav4',
          icon: 'homeNav',
          hidden: false,
          children: [
            {
              index: '1-4-1',
              name: 'homeNav4-1',
              hidden: false,
            },
            {
              index: '1-4-2',
              name: 'homeNav4-2',
              hidden: false,
            },
            {
              index: '1-4-3',
              name: 'homeNav4-3',
              hidden: false,
            },
          ]
        },
      ],
      isCollapse: false,
    }
  }
}
</script>

<style>

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: white;
}

.el-menu{
  border: none;
}

</style>
