<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn fab dark class="pink" v-on:click="readyEdit({id:null})">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <!-- 部屋情報カード -->
        <room-card
          v-for="(room, index) in rooms"
          :room="room"
          :index="index"
          :key="room.id"
          @readyEdit="readyEdit(room)"
          @removeRoom="removeRoom(room)">
        </room-card>
      </v-flex>
    </v-layout>
    <!-- 部屋情報編集用ダイアログ -->
    <room-edit-dialog
      :room="editTarget"
      @edit="localEdit"
      @cancel="cancelEdit"
      @save="commitEdit">
    </room-edit-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import types from '@/store/modules/rooms/types'
import RoomCard from './RoomCard'
import RoomEditDialog from './RoomEditDialog'

export default {
  name: 'rooms',
  components: {
    'room-card': RoomCard,
    'room-edit-dialog': RoomEditDialog
  },
  created () {
    this.load()
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('rooms', {
      rooms: state => state.rooms,
      editTarget: state => state.editTarget
    })
  },
  methods: {
    ...mapMutations('rooms', {
      readyEdit: types.READY_EDIT,
      localEdit: types.LOCAL_EDIT,
      cancelEdit: types.CANCEL_EDIT
    }),
    ...mapActions('rooms', {
      load: types.LOAD,
      removeRoom: types.REMOVE,
      commitEdit: types.COMMIT_EDIT
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
