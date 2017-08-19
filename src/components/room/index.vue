<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <router-view></router-view>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import types from '@/store/modules/room/types'

export default {
  name: 'room',
  created () {
    this.load({id: this.$route.params.id})
  },
  computed: {
    ...mapState('room', {
      profile: state => state.profile
    })
  },
  methods: {
    ...mapActions('room', {
      load: types.LOAD
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
