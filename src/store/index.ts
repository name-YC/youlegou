// @ts-ignore
import { createStore } from 'vuex'
export default createStore({
  state() {
    return {
      // 用户名
      username: '',
      // 面包屑列表数据
      breadListState: [],
    }
  },
  getters: {
  },
  mutations: {
    // 面包屑
    breadListMutations(state: any, list: any) {
      state.breadListState = list
    },
    // 用户名
    setUsername(state: any, name: string) {
      // console.log('名触发')
      state.username = name
    }
  },
  actions: {
  },
  modules: {
  }
})