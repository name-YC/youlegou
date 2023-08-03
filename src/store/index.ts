// @ts-ignore
import { createStore } from 'vuex'
export default createStore({
  state() {
    return {
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
  },
  actions: {
  },
  modules: {
  }
})