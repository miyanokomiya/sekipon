<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <div v-if="profile">
        {{profile.name}}
      </div>
      <div class="svg-box">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          :width="canvas.width"
          :height="canvas.height"
          :viewBox="svgViewBox"
          @mousedown.left="downOnCanvas"
          @touchstart="downOnCanvas"
          @mouseup.left="upOnCanvas"
          @touchend="upOnCanvas"
          @mousemove="dragOnCanvas"
          @touchmove="dragOnCanvas"
          @mousewheel.prevent="wheelOnCanvas"
        >
          <g
            v-for="node in nodeMap"
            :key="node.id"
            :data-id="node.id"
            @mousedown.left="downOnNode({target: node.id})"
            @touchstart="downOnNode({target: node.id})"
          >
            <circle
              :cx="node.x"
              :cy="node.y"
              r="30"
              fill="blue"
              :stroke="isSelected(node.id) ? 'black' : 'none'"
              stroke-width="4"
            >
            </circle>
          </g>
        </svg>
      </div>
      <v-btn-toggle :items="toggle_text" v-model="modeType"></v-btn-toggle>
      <v-btn small fab dark class="black" @click="removeNode">
        <v-icon dark>delete</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import types from '@/store/modules/room/types'
import {modeTypes} from '@/store/modules/room'
import * as utils from './utils'

export default {
  name: 'room_edit',
  created () {
    this.load({id: this.$route.params.id})
  },
  data () {
    return {
      toggle_text: [
        { text: modeTypes.HAND, value: modeTypes.HAND },
        { text: modeTypes.SET, value: modeTypes.SET }
      ]
    }
  },
  computed: {
    ...mapState('room', {
      profile: state => state.profile,
      viewArea: state => state.viewArea,
      nodeMap: state => state.nodeMap,
      canvas: state => state.canvas,
      selectedNodeList: state => {
        return [state.target.root]
      },
      _modeType: state => state.modeType
    }),
    ...mapGetters('room', [
      'svgViewBox'
    ]),
    modeType: {
      get () {
        return this._modeType
      },
      set (value) {
        this.changeMode({modeType: value})
      }
    }
  },
  methods: {
    ...mapMutations('room', {
      changeMode: types.CHANGE_MODE,
      _downOnCanvas: types.CURSOR_DOWN,
      downOnNode: types.CURSOR_DOWN_ON_NODE,
      _wheelOnCanvas: types.WHEEL_ON_CANVAS
    }),
    ...mapActions('room', {
      load: types.LOAD,
      _upOnCanvas: types.CURSOR_UP,
      _dragOnCanvas: types.CURSOR_DRAG,
      removeNode: types.REMOVE_NODE
    }),
    downOnCanvas (e) {
      const p = utils.getPoint(e)
      this._downOnCanvas({
        position: p,
        time: Date.now()
      })
    },
    dragOnCanvas (e) {
      const p = utils.getPoint(e)
      this._dragOnCanvas({
        position: p
      })
    },
    upOnCanvas (e) {
      this._upOnCanvas({
        time: Date.now()
      })
    },
    wheelOnCanvas (e) {
      let position = utils.getPoint(e)
      this._wheelOnCanvas({
        deltaY: e.deltaY,
        position
      })
    },
    isSelected (id) {
      return (this.selectedNodeList.indexOf(id) !== -1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.svg-box {
  margin: 0 auto;
  width: 100%;
  height: 600px;
  position: relative;
  border: 1px solid #000;
  overflow: hidden;
  height: 400px;
}
svg {
  font-family: sans-serif;
}
</style>
