<template>
  <div>
    <ul>
      <li>
        <a href="/AboutVmodel" @click="toPath('AboutVmodel')"> 关于v-model </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HomeNav',
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