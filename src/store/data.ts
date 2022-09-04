import $http from '@/axios/http'
import api from '@/axios/api'

export const state = () => ({
  topfreeappList: {},
  topgrossingappList: {},
})

export const getters = {
  topFreeAppList:
    ({ topfreeappList }) =>
    limit => {
      return Array.isArray(topfreeappList.entry) ? topfreeappList.entry.slice(0, limit) : []
    },
  grossingAppList: ({ topgrossingappList }) => {
    return Array.isArray(topgrossingappList.entry) ? topgrossingappList.entry : []
  },
}

export const actions = {
  async getTopFreeAppList({ commit, state }) {
    const res = await $http.get(`/${api.topfreeapplications}`)
    if (res === undefined) {
      return
    }
    commit('setData', { topfreeappList: res.data?.feed })
  },
  async getGrossingAppList({ commit, state }) {
    const res = await $http.get(`/${api.topgrossingapplications}`)
    if (res === undefined) {
      return
    }
    commit('setData', { topgrossingappList: res.data?.feed })
  },
}

export const mutations = {
  setData(state, payload) {
    Object.entries(payload).forEach(([key, value]) => (state[key] = payload[key]))
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
