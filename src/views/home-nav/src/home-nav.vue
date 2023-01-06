<template>
  <div>
    <ul>
      <li>
        <a href="/AboutVmodel/index" @click="toPath('AboutVmodel')"> 关于v-model </a>
      </li>
    </ul>

    <tab-bar>
      
      <tab-bar-item>
        <div slot="icon"> icon </div>
        <div slot="title"> title </div>
      </tab-bar-item>

      <tab-bar-item 
        active-color="blue"
      >
        <div slot="icon"> icon </div>
        <div slot="title"> title </div>
      </tab-bar-item>

      <tab-bar-item>
        <div slot="icon"> icon </div>
        <div slot="title"> title </div>
      </tab-bar-item>

      <tab-bar-item>
        <div slot="icon"> icon </div>
        <div slot="title"> title </div>
      </tab-bar-item>

    </tab-bar>

    <div>

      <os-pagination />
    </div>

  </div>
</template>

<script>

import tabBar from '../../../components/tabBar/tabBar.vue'
import tabBarItem from '../../../components/tabBar/tabBarItem.vue'


export default {
  name: 'HomeNav',
  components: {
    tabBar,
    tabBarItem,
  },
  data() {
    return {}
  },

  methods: {

    /**
     * 路由跳转
     * @param {*} routerName 路由名称，一般使用组件名称
     */
    toPath(routerName) {
      this.$router.push({ path: '/' + routerName})
    },
    
  },
}

</script>