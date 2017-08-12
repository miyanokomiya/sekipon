import Vue from 'vue'
import type from './type'
import {firebaseDb, TIMESTAMP} from '@/firebase'

export default {
  namespaced: true,
  state: {
    rooms: {},
    editTarget: null
  },
  mutations: {
    [type.CLEAR] (state) {
      state.rooms = {}
    },
    [type.ADD] (state, {room}) {
      Vue.set(state.rooms, room.id, room)
    },
    [type.CHANGE] (state, {room}) {
      state.rooms[room.id] = room
    },
    [type.REMOVE] (state, {id}) {
      Vue.delete(state.rooms, id)
    },
    [type.READY_EDIT] (state, {id}) {
      if (id) {
        state.editTarget = Object.assign({}, state.rooms[id])
      } else {
        const key = firebaseDb.ref('rooms').push().key
        state.editTarget = {
          id: key,
          password: '',
          name: '',
          note: '',
          created: TIMESTAMP
        }
      }
    },
    [type.LOCAL_EDIT] (state, payload) {
      state.editTarget = Object.assign({}, state.editTarget, payload)
    },
    [type.CANCEL_EDIT] (state) {
      state.editTarget = null
    }
  },
  actions: {
    [type.LOAD] (context, payload) {
      const ref = firebaseDb.ref('rooms')
      context.commit(type.CLEAR)
      ref.off()
      ref.on('child_added', data => {
        context.commit(type.ADD, {room: data.val()})
      })
      ref.on('child_changed', data => {
        context.commit(type.CHANGE, {room: data.val()})
      })
      ref.on('child_removed', data => {
        context.commit(type.REMOVE, {id: data.val().id})
      })
    },
    [type.REMOVE] (context, {id}) {
      const key = id
      firebaseDb.ref(`rooms/${key}`).remove()
    },
    [type.COMMIT_EDIT] (context) {
      let target = context.state.editTarget
      firebaseDb.ref(`rooms/${target.id}`).set(target).then(() => {
        context.commit(type.CANCEL_EDIT)
      })
    }
  },
  getters: {}
}
