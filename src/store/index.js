import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/rooms'
import room from './modules/room'
import types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    topTitle: 'SEKIPON'
  },
  modules: {
    rooms,
    room
  },
  mutations: {
    [types.SET_TITLE] (state, payload) {
      state.topTitle = payload
    }
  }
})
