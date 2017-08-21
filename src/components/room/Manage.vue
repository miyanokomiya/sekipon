<template>
  <v-container v-if="profile">
    <router-link to="user" append><v-btn light>User</v-btn></router-link>
    <router-link to="edit" append><v-btn light>Edit</v-btn></router-link>

    <v-flex xs12 sm6 offset-sm3>
      <!-- 部屋情報カード -->
      <room-card
        :buttonOpen="false"
        :buttonEdit="true"
        :buttonDelete="true"
        :room="profile"
        @readyEdit="profileReadyEdit({room: profile})"
        @removeRoom="profileRemoveRoom(profile)">
      </room-card>
    </v-flex>

    <!-- 部屋情報編集用ダイアログ -->
    <room-edit-dialog
      :room="profileEditTarget"
      @edit="profileLocalEdit"
      @cancel="profileCancelEdit"
      @save="profileCommitEdit">
    </room-edit-dialog>

    <!--<user-table :nodeMap="nodeMap"></user-table>-->
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import UserTable from './UserTable'
import RoomCard from '../RoomCard'
import RoomEditDialog from '../RoomEditDialog'
import types from '@/store/modules/rooms/types'

export default {
  components: {
    'user-table': UserTable,
    'room-card': RoomCard,
    'room-edit-dialog': RoomEditDialog
  },
  computed: {
    ...mapState('room', {
      nodeMap: state => state.nodeMap,
      profile: state => state.profile
    }),
    ...mapState('rooms', {
      profileEditTarget: state => state.editTarget
    })
  },
  methods: {
    ...mapMutations('rooms', {
      profileReadyEdit: types.READY_EDIT,
      profileLocalEdit: types.LOCAL_EDIT,
      profileCancelEdit: types.CANCEL_EDIT
    }),
    ...mapActions('rooms', {
      profileRemoveRoom: types.REMOVE,
      profileCommitEdit: types.COMMIT_EDIT
    })
  }
}
</script>
