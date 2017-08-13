import {firebaseDb} from '@/firebase'
import types from './types'
import {v2f} from './utils'

export default {
  [types.LOAD] (context, {id}) {
    context.commit(types.CLEAR)
    firebaseDb.ref(`roomDetails`).off()

    // 部屋情報取得
    firebaseDb.ref(`rooms/${id}`).once('value', data => {
      context.commit(types.INIT, {room: data.val()})

      // 部屋詳細情報と接続
      const ref = firebaseDb.ref(`roomDetails/${id}/nodeMap`)
      ref.on('child_added', data => {
        context.commit(types.ADD_NODE, {node: data.val()})
      })
      ref.on('child_changed', data => {
        context.commit(types.UPDATE_NODE, {node: data.val()})
      })
      ref.on('child_removed', data => {
        context.commit(types.REMOVE_NODE, {id: data.val().id})
      })
    })
  },
  [types.ADD_NODE] (context, {x, y}) {
    const state = context.state
    const roomId = state.profile.id
    const id = firebaseDb.ref('rooms').push().key
    const type = state.nodeType
    const node = {
      id,
      type,
      x,
      y
    }
    firebaseDb.ref(`roomDetails/${roomId}/nodeMap/${id}`).set(node).then(() => {
      context.commit(types.SELECT_NODE, {id})
    })
  },
  [types.REMOVE_NODE] (context) {
    const state = context.state
    const roomId = state.profile.id
    const id = state.target.root
    firebaseDb.ref(`roomDetails/${roomId}/nodeMap/${id}`).remove()
  },

  [types.CURSOR_DRAG] (context, {position}) {
    const cursorState = context.state.cursorState
    if (cursorState.drag) {
      const viewArea = context.state.viewArea
      const before = v2f(viewArea, cursorState.position)
      const after = v2f(viewArea, position)
      const dx = after.x - before.x
      const dy = after.y - before.y
      if (!cursorState.down.target) {
        // スクロール
        context.commit(types.MOVE_VIEW, {dx, dy})
      } else {
        context.commit(types.LOCAL_MOVE_NODE, {dx, dy})
      }

      context.commit(types.CURSOR_DRAG, {position})
    }
  },
  [types.CURSOR_UP] (context, {time}) {
    const cursorState = context.state.cursorState
    if (cursorState.drag) {
      // 選択中要素があるかどうか
      const target = context.state.nodeMap[context.state.target.root]
      if (target) {
        // 編集をコミットする
        const roomId = context.state.profile.id
        firebaseDb.ref(`roomDetails/${roomId}/nodeMap/${target.id}`).update(target)
      }

      if (time - cursorState.down.time < 300) {
        if (!cursorState.down.target) {
          // 新規作成
          const fP = v2f(context.state.viewArea, cursorState.position)
          context.dispatch(types.ADD_NODE, {
            x: fP.x,
            y: fP.y
          })
        } else {
          // カーソル下に要素あり
          const id = cursorState.down.target
          context.commit(types.SELECT_NODE, {id})
        }
      }
    }
    context.commit(types.CURSOR_UP, {time})
  }
}
