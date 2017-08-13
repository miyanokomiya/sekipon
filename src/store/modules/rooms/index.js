import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    rooms: {},
    editTarget: null
  },
  mutations,
  actions,
  getters: {}
}
