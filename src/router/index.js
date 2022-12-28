import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import AboutVmodel from '../views/about-vmodel/index.js'
// import HomeNav from '../views/home-nav/index.js'

Vue.use(Router)

const componentsArray = [
  // AboutVmodel,
  // HomeNav,
]

// 使用require.context 自动载入 views 下面的所有页面
const modulesFiles = require.context('../views', true, /\index.js$/)
console.log('modulesFiles', modulesFiles, modulesFiles.keys())
modulesFiles.keys().forEach((fileName) => {
  // console.log('modulesFiles foreach', modulesFiles(fileName))
  modulesFiles(fileName).default && componentsArray.push(modulesFiles(fileName).default)
})

console.log('componentsArray', componentsArray)




let routerList = []

componentsArray.forEach((component) => {
  let routerItem = {
    path: '/' + component.name,
    name: component.name,
    component: component
  }
  routerList.push(routerItem)
})

// console.log(routerList)



export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },

    {
      path: '/',
      // name: 'HelloWorld',
      redirect: 'homeNav',
    },

    ...routerList,
    
  ]
})
