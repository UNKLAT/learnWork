import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AboutVmodel from '../views/about-vmodel/index.js'
import HomeNav from '../views/home-nav/index.js'

const modulesFiles = require.context('../view', true, /\index.js$/)
console.log('modulesFiles', modulesFiles)

Vue.use(Router)

const componentsArray = [
  AboutVmodel,
  HomeNav,
]

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
