import Vue from 'vue'
import types from './types'
// import {firebaseDb, TIMESTAMP} from '@/firebase'
import { wheelCanvas, pinchCanvas } from './utils'

export default {
  [types.CLEAR] (state) {
    state.profile = {}
    state.nodeMap = {}
  },
  [types.INIT] (state, { room }) {
    state.profile = room
  },
  [types.CHANGE] (state, { node }) {
    state.nodeMap[node.id] = node
  },

  [types.CHANGE_MODE] (state, { modeType }) {
    state.modeType = modeType
  },
  [types.ADD_NODE] (state, { node }) {
    Vue.set(state.nodeMap, node.id, node)
  },
  [types.REMOVE_NODE] (state, { id }) {
    Vue.delete(state.nodeMap, id)
  },
  [types.SELECT_NODE] (state, { id }) {
    state.target.root = id
  },
  [types.LOCAL_MOVE_NODE] (state, { dx, dy }) {
    const target = state.nodeMap[state.target.root]
    if (target) {
      target.x += dx
      target.y += dy
    }
  },
  [types.UPDATE_NODE] (state, { node }) {
    state.nodeMap[node.id] = node
  },

  [types.MOVE_VIEW] (state, { dx, dy }) {
    const viewArea = state.viewArea
    viewArea.left -= dx
    viewArea.top -= dy
  },

  [types.CURSOR_DOWN] (state, { position, time }) {
    const cursorState = state.cursorState
    cursorState.position = position
    cursorState.drag = true
    const down = cursorState.down
    down.position = position
    down.time = time
  },
  [types.CURSOR_DOWN_ON_NODE] (state, { target }) {
    state.cursorState.down.target = target
  },
  [types.CURSOR_DRAG] (state, { position }) {
    const cursorState = state.cursorState
    cursorState.position = position
  },
  [types.CURSOR_UP] (state, { time }) {
    const cursorState = state.cursorState
    cursorState.drag = false
    state.cursorState.down.target = null
    const up = cursorState.up
    up.time = time
    state.cursorState.pinchDistance = 0
  },
  [types.WHEEL_ON_CANVAS] (state, { deltaY, position }) {
    const info = wheelCanvas(state.viewArea, deltaY, position)
    state.viewArea.left = info.left
    state.viewArea.top = info.top
    state.viewArea.scale = info.scale
  },
  [types.CURSOR_MULTI_TOUCH] (state, { positions }) {
    const p0 = positions[0]
    const p1 = positions[1]
    const result = pinchCanvas(
      state.viewArea,
      p0,
      p1,
      state.cursorState.pinchDistance
    )
    const va = result[0]
    const d = result[1]

    state.viewArea = Object.assign({}, state.viewArea, va)
    state.cursorState.pinchDistance = d
  }
}
