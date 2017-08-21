import { firebaseDb } from '@/firebase'
import types from './types'

export default {
  [types.LOAD] (context, payload) {
    const ref = firebaseDb.ref('rooms')
    context.commit(types.CLEAR)
    ref.off()
    ref.on('child_added', data => {
      context.commit(types.ADD, { room: data.val() })
    })
    ref.on('child_changed', data => {
      context.commit(types.CHANGE, { room: data.val() })
    })
    ref.on('child_removed', data => {
      context.commit(types.REMOVE, { id: data.val().id })
    })
  },
  [types.REMOVE] (context, { id }) {
    const key = id
    firebaseDb.ref(`roomDetails/${key}`).remove()
    firebaseDb.ref(`rooms/${key}`).remove()
  },
  [types.COMMIT_EDIT] (context) {
    let target = context.state.editTarget
    firebaseDb.ref(`rooms/${target.id}`).set(target).then(() => {
      context.commit(types.CANCEL_EDIT)
    })
  }
}
