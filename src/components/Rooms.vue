<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn fab dark class="pink" v-on:click="readyEdit({id:null})">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="room-card" v-for="(room, index) in rooms" v-bind:room="room" v-bind:index="index" v-bind:key="room.id">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{room.name}}</h3>
              <div>{{room.note}}</div>
              <div class="grey--text">{{dateFormat(room.created)}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn primary small fab dark @click.native="readyEdit(room)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn small fab dark class="black" v-on:click="removeRoom(room)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 部屋情報編集用ダイアログ -->
    <v-layout row justify-center>
      <v-dialog v-model="editTarget" persistent v-if="editTarget">
        <v-card>
          <v-card-title>
            <span class="headline">Room Profile</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Name" required v-model="name"></v-text-field>
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <v-text-field multi-line label="note" v-model="note"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="cancelEdit">Cancel</v-btn>
            <v-btn class="blue--text darken-1" flat @click.native="commitEdit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import type from '@/store/modules/rooms/type'

export default {
  name: 'hello',
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
    }),
    name: {
      get () {
        return this.editTarget.name
      },
      set (value) {
        this.localEdit({name: value})
      }
    },
    password: {
      get () {
        return this.editTarget.password
      },
      set (value) {
        this.localEdit({password: value})
      }
    },
    note: {
      get () {
        return this.editTarget.note
      },
      set (value) {
        this.localEdit({note: value})
      }
    }
  },
  methods: {
    ...mapMutations('rooms', {
      readyEdit: type.READY_EDIT,
      localEdit: type.LOCAL_EDIT,
      cancelEdit: type.CANCEL_EDIT
    }),
    ...mapActions('rooms', {
      load: type.LOAD,
      removeRoom: type.REMOVE,
      commitEdit: type.COMMIT_EDIT
    }),
    dateFormat (val) {
      let date = new Date(val)
      return date.toLocaleString()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.room-card {
  text-align: left;
}
</style>
