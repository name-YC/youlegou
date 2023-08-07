// @ts-ignore
import { createStore } from 'vuex'
// import {useStore} from 'vuex'
export default createStore({
  state() {
    return {
      // 面包屑列表数据
      breadListState: [],
      bgc: 'dark',
      // 用户名
      username: '',
      theme: 'chalk'
    }
  },
  getters: {
  },
  mutations: {
    // 面包屑
    breadListMutations(state: any, list: any) {
      state.breadListState = list
    },
    bgc() {
      console.log(this.state.bgc)
      if (this.state.bgc === 'bark') {
        this.state.bgc = 'light'
      } else {
        this.state.bgc = 'bark'
      }
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
