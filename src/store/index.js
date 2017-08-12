import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/rooms'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    rooms
  },
  mutations: {
  }
})
