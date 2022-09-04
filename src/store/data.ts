import $http from '@/axios/http'
import api from '@/axios/api'

export const state = () => ({
  topfreeappList: {
    entry: [],
  },
  topgrossingappList: {
    entry: [],
  },
})

export const getters = {
  topFreeAppList:
    ({ topfreeappList }) =>
    limit => {
      return topfreeappList.entry.slice(0, limit)
    },
  grossingAppList: ({ topgrossingappList }) => {
    return topgrossingappList.entry
  },
}

export const actions = {
  async getTopFreeAppList({ commit, state }) {
    const res = await $http.get(`/${api.topfreeapplications}`)
    if (res === undefined) {
      return
    }
    const { data: { feed: { entry = [] } = {} } = {} } = res
    commit('setData', { topfreeappList: { entry } })
  },
  async getGrossingAppList({ commit, state }) {
    const res = await $http.get(`/${api.topgrossingapplications}`)
    if (res === undefined) {
      return
    }
    const { data: { feed: { entry = [] } = {} } = {} } = res
    commit('setData', { topgrossingappList: { entry } })
  },
  async getLookup({ commit, state }, id) {
    const res = await $http.get(`/${api.lookup}${id}`)
    if (res === undefined) {
      return
    }
    const { data } = res
    commit('setLookupData', { ...data })
  },
}

export const mutations = {
  setData(state, payload) {
    Object.keys(payload).forEach(key => (state[key] = payload[key]))
  },
  setLookupData(state, payload) {
    const { results = [] } = payload
    results.forEach(lookupItem => {
      const matchItem = state.topfreeappList.entry.find(item => item.appid === lookupItem.trackId.toString())
      if (matchItem) {
        matchItem.averageUserRating = lookupItem.averageUserRating
        matchItem.userRatingCount = lookupItem.userRatingCount
      }
    })
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}
