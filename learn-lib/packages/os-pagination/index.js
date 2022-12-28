import osPagination from './src/os-pagination.vue'

osPagination.install = (Vue) => {
  // console.log(osPagination.extendOptions, Vue, 'os-pagination, index')
  Vue.component(osPagination.name, osPagination)
}

export {
  osPagination
}