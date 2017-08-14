export const SCALE_MAX = 10
export const SCALE_MIN = 0.2

export function v2f (viewArea, p) {
  return {
    x: p.x * viewArea.scale + viewArea.left,
    y: p.y * viewArea.scale + viewArea.top
  }
}
export function f2v (viewArea, p) {
  return {
    x: (p.x - viewArea.left) / viewArea.scale,
    y: (p.y - viewArea.top) / viewArea.scale
  }
}
export function v2fScaler (viewArea, c) {
  return c * viewArea.scale
}
export function f2vScaler (viewArea, c) {
  return c / viewArea.scale
}

/**
 * 表示エリアを最適化する
 * @param {*} nodeMap ノードマップ
 * @param {Number} viewWidth 表示領域幅
 * @param {Number} viewHeight 表示領域高さ
 * @return {*} 表示領域情報
 */
export function getAdjustedViewArea (nodeMap, viewWidth, viewHeight) {
  // 原点を中心としたノードの縦横で最も遠い距離を取得
  let maxW = 200
  let maxH = 200
  for (let k in nodeMap) {
    let n = nodeMap[k]
    maxW = Math.max(maxW, Math.abs(n.x))
    maxH = Math.max(maxH, Math.abs(n.y))
  }

  // 最も遠い点が収まるスケール計算
  let scaleW = maxW / ((viewWidth - 50) / 2)
  let scaleH = maxH / ((viewHeight - 50) / 2)
  let scale = Math.max(scaleW, scaleH)
  scale = adjustScaleLimit(scale)
  scale = Math.max(scale, 2.5)

  return {
    scale: scale,
    left: -viewWidth / 2 * scale,
    top: -viewHeight / 2 * scale,
    width: viewWidth,
    height: viewHeight
  }
}

/**
 * スケールを適正な範囲に収める
 * @param {Number} scale スケール
 * @return {Number} 調整後スケール
 */
function adjustScaleLimit (scale) {
  scale = Math.max(scale, SCALE_MIN)
  scale = Math.min(scale, SCALE_MAX)
  return scale
}

export function wheelCanvas (viewArea, deltaX, p) {
  let delta = deltaX < 0 ? 1.8 : -1.8
  let scale = viewArea.scale / Math.pow(1.03, delta)

  return setScaleAndAdjust(viewArea, scale, p)
}

export function pinchCanvas (viewArea, p0, p1, latestPinchDistance) {
  let center = {
    x: (p0.x + p1.x) / 2,
    y: (p0.y + p1.y) / 2
  }

  let scale = viewArea.scale
  let d = Math.pow(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2), 1 / 2)
  if (latestPinchDistance && latestPinchDistance > 0) {
    let delta = latestPinchDistance - d

    scale = viewArea.scale / Math.pow(1.01, -delta / 2)
  }

  let nextViewArea = setScaleAndAdjust(viewArea, scale, center)
  return [nextViewArea, d]
}

export function setScaleAndAdjust (viewArea, scale, p) {
  scale = adjustScaleLimit(scale)

  if (!p) {
    // 座標指定がなければ表示領域の中心を基準とする
    p = {
      x: viewArea.width / 2,
      y: viewArea.height / 2
    }
  }

  // カーソル位置を基準にスケール変更
  let tmpViewArea = Object.assign({}, viewArea, {
    scale: scale
  })
  let f = v2f(viewArea, p)
  let f2 = v2f(tmpViewArea, p)
  let dx = f.x - f2.x
  let dy = f.y - f2.y

  return Object.assign({}, viewArea, {
    scale: scale,
    left: viewArea.left + dx,
    top: viewArea.top + dy
  })
}
