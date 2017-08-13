import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/rooms'
import room from './modules/room'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    rooms,
    room
  },
  mutations: {
  }
})
