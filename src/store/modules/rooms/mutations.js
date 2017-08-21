import Vue from 'vue'
import types from './types'
import { firebaseDb, TIMESTAMP } from '@/firebase'

export default {
  [types.CLEAR] (state) {
    state.rooms = {}
    state.editTarget = null
  },
  [types.ADD] (state, { room }) {
    Vue.set(state.rooms, room.id, room)
  },
  [types.CHANGE] (state, { room }) {
    state.rooms[room.id] = room
  },
  [types.REMOVE] (state, { id }) {
    Vue.delete(state.rooms, id)
  },
  [types.READY_EDIT] (state, { id = null, room = null }) {
    let editTarget = null
    if (id) {
      // ID指定
      editTarget = Object.assign({}, state.rooms[id])
    } else {
      const key = firebaseDb.ref('rooms').push().key
      editTarget = {
        id: key,
        password: '',
        name: '',
        note: '',
        created: TIMESTAMP
      }
    }
    // デフォルト情報指定
    if (room) {
      editTarget = Object.assign({}, editTarget, room)
    }
    state.editTarget = editTarget
  },
  [types.LOCAL_EDIT] (state, payload) {
    state.editTarget = Object.assign({}, state.editTarget, payload)
  },
  [types.CANCEL_EDIT] (state) {
    state.editTarget = null
  }
}
