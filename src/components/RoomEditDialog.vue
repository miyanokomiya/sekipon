<template>
  <v-layout row justify-center>
    <v-dialog v-model="room" persistent v-if="room">
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
          <v-btn class="blue--text darken-1" flat @click.native="$emit('cancel')">Cancel</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="$emit('save')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['room'],
  computed: {
    name: {
      get () {
        return this.room.name
      },
      set (value) {
        this.$emit('edit', {name: value})
      }
    },
    password: {
      get () {
        return this.room.password
      },
      set (value) {
        this.$emit('edit', {password: value})
      }
    },
    note: {
      get () {
        return this.room.note
      },
      set (value) {
        this.$emit('edit', {note: value})
      }
    }
  }
}
</script>

<style scoped>

</style>

