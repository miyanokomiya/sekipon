<template>
  <v-card class="room-card">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{room.name}}</h3>
        <div>{{room.note}}</div>
        <div class="grey--text">{{dateFormat(room.created)}}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <router-link :to="`room/${room.id}`" v-if="buttonOpen">
        <v-btn primary dark>Open</v-btn>
      </router-link>
      <v-btn primary small fab dark @click.native="$emit('readyEdit')" v-if="buttonEdit">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-btn small fab dark class="black" v-on:click.native="$emit('removeRoom')" v-if="buttonDelete">
        <v-icon dark>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true
    },
    buttonOpen: {
      type: Boolean,
      default: true
    },
    buttonEdit: {
      type: Boolean,
      default: true
    },
    buttonDelete: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    dateFormat (val) {
      let date = new Date(val)
      return date.toLocaleString()
    }
  }
}
</script>

<style scoped>
.room-card {
  text-align: left;
}
</style>

