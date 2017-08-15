import mutations from './mutations'
import actions from './actions'
import { modeTypes, nodeTypes } from './utils'

export default {
  namespaced: true,
  state: {
    profile: null,
    nodeMap: {},
    viewArea: {
      left: 0,
      top: 0,
      scale: 1
    },
    modeType: modeTypes.HAND,
    nodeType: nodeTypes.SEAT,
    canvas: {
      width: 1000,
      height: 1000
    },
    // カーソルに関する情報
    cursorState: {
      position: {
        x: 0,
        y: 0
      },
      // ドラッグ中フラグ
      drag: false,
      // カーソルダウン時の情報
      down: {
        target: null,
        time: 0,
        position: {
          x: 0,
          y: 0
        }
      },
      // カーソルアップ時の情報
      up: {
        time: 0
      },
      // 最新のピンチ距離
      pinchDistance: 0,
      smoothScrollVector: null
    },
    target: {
      root: null
    }
  },
  mutations,
  actions,
  getters: {
    // SVGタグ用のviewBox文字列を生成する
    svgViewBox: state => {
      const viewArea = state.viewArea
      const width = state.canvas.width
      const height = state.canvas.height
      const viewBox = `${viewArea.left} ${viewArea.top} ${width *
        viewArea.scale} ${height * viewArea.scale}`
      return viewBox
    },
    selectedNodeIdList: state => {
      return [state.target.root]
    }
  }
}
