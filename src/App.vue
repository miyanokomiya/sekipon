<template>
  <v-app id="app" toolbar footer>
    <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher overflow>
      <v-list dense>
        <router-link to="/rooms">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Room List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer persistent v-model="drawerRight" light right enable-resize-watcher overflow absolute>
      <router-view name="right-toolber"></router-view>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{topTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <v-container fluid class="main-container">
        <router-view name="main"></router-view>
      </v-container>
    </main>
    <v-footer class="indigo">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import types from '@/store/types'
export default {
  name: 'app',
  created () {
    this.$store.commit(types.SET_TITLE, 'SEKIPON')
  },
  data () {
    return {
      drawer: true,
      drawerRight: true
    }
  },
  computed: {
    topTitle () {
      return this.$store.state.topTitle
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  padding: 10px;
}
</style>
