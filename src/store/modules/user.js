const state = () => ({
  
})

// 同步方法，一般用来修改state
const mutations = {

}

// 异步方法，一般用于异步获取数据，触发mutations
const actions = {

  // 登录方法
  login({ commit }, userInfo) {
    return new Promise()
  },

  // 获取用户信息
  getInfo({ commit, state }){
    return new Promise()
  },
}

export default {
  namespaced: true,
  state
}