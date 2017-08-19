import { firebaseDb } from '@/firebase'
import rootTypes from '@/store/types'
import types from './types'
import { modeTypes, v2f, createNode } from './utils'

export default {
  [types.LOAD] (context, { id }) {
    context.commit(types.CLEAR)
    firebaseDb.ref(`roomDetails`).off()

    // 部屋情報取得
    firebaseDb.ref(`rooms/${id}`).once('value', data => {
      const room = data.val()
      context.commit(types.INIT, { room })
      context.commit(rootTypes.SET_TITLE, room.name, { root: true })

      // 部屋詳細情報と接続
      const ref = firebaseDb.ref(`roomDetails/${id}/nodeMap`)
      ref.on('child_added', data => {
        context.commit(types.ADD_NODE, { node: data.val() })
      })
      ref.on('child_changed', data => {
        context.commit(types.UPDATE_NODE, { node: data.val() })
      })
      ref.on('child_removed', data => {
        context.commit(types.REMOVE_NODE, { id: data.val().id })
      })
    })
  },
  [types.ADD_NODE] (context, { x, y }) {
    const state = context.state
    const roomId = state.profile.id
    const id = firebaseDb.ref('rooms').push().key
    const node = createNode({
      id,
      type: state.nodeType,
      x,
      y,
      state: 0
    })
    firebaseDb.ref(`roomDetails/${roomId}/nodeMap/${id}`).set(node).then(() => {
      context.commit(types.SELECT_NODE, { id })
    })
  },
  [types.REMOVE_NODE] (context) {
    const state = context.state
    const roomId = state.profile.id
    const id = state.target.root
    firebaseDb.ref(`roomDetails/${roomId}/nodeMap/${id}`).remove()
  },
  [types.COMMIT_EDIT] (context) {
    const state = context.state
    const roomId = state.profile.id
    let target = state.editTarget
    firebaseDb
      .ref(`roomDetails/${roomId}/nodeMap/${target.id}`)
      .set(target)
      .then(() => {
        context.commit(types.CANCEL_EDIT)
      })
  },

  [types.CURSOR_DRAG] (context, { position }) {
    const cursorState = context.state.cursorState
    if (cursorState.drag) {
      const viewArea = context.state.viewArea
      const before = v2f(viewArea, cursorState.position)
      const after = v2f(viewArea, position)
      const dx = after.x - before.x
      const dy = after.y - before.y

      // 選択中ノード上か判定
      if (
        !cursorState.down.target ||
        context.getters.selectedNodeIdList.indexOf(cursorState.down.target) ===
          -1
      ) {
        // スクロール
        context.commit(types.MOVE_VIEW, { dx, dy })
      } else {
        // ノード移動
        context.commit(types.LOCAL_MOVE_NODE, { dx, dy })
      }

      context.commit(types.CURSOR_DRAG, { position })
    }
  },
  [types.CURSOR_UP] (context, { time }) {
    const state = context.state
    const roomId = state.profile.id
    const cursorState = state.cursorState
    if (cursorState.drag) {
      // 選択中要素があるかどうか
      const target = state.nodeMap[state.target.root]
      if (target) {
        // 編集をコミットする
        firebaseDb
          .ref(`roomDetails/${roomId}/nodeMap/${target.id}`)
          .update(target)
      }

      if (time - cursorState.down.time < 300) {
        if (!cursorState.down.target) {
          // 新規作成
          const fP = v2f(state.viewArea, cursorState.position)
          context.dispatch(types.ADD_NODE, {
            x: fP.x,
            y: fP.y
          })
        } else {
          // カーソル下に要素あり
          const id = cursorState.down.target
          const target = state.nodeMap[id]

          if (id === state.target.root) {
            // 既に選択中
            if (state.modeType !== modeTypes.TOGGLE_STATE) {
              context.commit(types.READY_EDIT, { id })
            }
          } else {
            // 選択していなかった
            context.commit(types.SELECT_NODE, { id })
          }

          if (state.modeType === modeTypes.TOGGLE_STATE) {
            const nextTarget = Object.assign({}, target, {
              state: target.state === 0 ? 1 : 0
            })
            firebaseDb
              .ref(`roomDetails/${roomId}/nodeMap/${nextTarget.id}`)
              .update(nextTarget)
          }
        }
      }
    }
    context.commit(types.CURSOR_UP, { time })
  }
}
