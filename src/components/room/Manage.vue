<template>
  <v-container>
    <router-link to="user" append><v-btn light>User</v-btn></router-link>
    <router-link to="edit" append><v-btn light>Edit</v-btn></router-link>

    <user-table :nodeMap="nodeMap"></user-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import UserTable from './UserTable'
export default {
  components: {
    'user-table': UserTable
  },
  computed: {
    ...mapState('room', {
      nodeMap: state => state.nodeMap
    })
  }
}
</script>
