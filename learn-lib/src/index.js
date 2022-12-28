import { osPagination } from "../packages/os-pagination"

let components = [
  osPagination,
]

/** 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册 */
const install = function(Vue, options) {
  if (install.installed) return
  // 用 class component 的写法 时候使用 component.extendOptions.name，
  // 正常使用vue模板语法写组件使用 component.name 即可
  components.map(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install as learnLib,
  // 以下是单个组件引入使用
  osPagination,
}