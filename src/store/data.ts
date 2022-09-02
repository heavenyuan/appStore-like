import $http from '@/axios/http'
import api from '@/axios/api'

export const state = () => ({
  topfreeappList: {},
  topgrossingappList: {},
})

export const getters = {
  topFreeAppList: ({ topfreeappList }) => {
    return topfreeappList.entry || []
  },
  grossingAppList: ({ topgrossingappList }) => {
    return topgrossingappList.entry || []
  },
}

export const actions = {
  async getTopFreeAppList({ commit, state }, count) {
    const res = await $http.get(`/${api.topfreeapplications}${count}/json`)
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
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        state[key] = payload[key]
      }
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
