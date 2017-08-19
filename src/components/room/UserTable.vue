<template>
<v-card>
  <v-card-title>
    Nutrition
    <v-spacer></v-spacer>
    <v-text-field
      append-icon="search"
      label="Search"
      single-line
      hide-details
      v-model="search"
    ></v-text-field>
  </v-card-title>
  <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
    >
    <template slot="items" scope="props">
      <td class="text-xs-right">{{ props.item.number }}</td>
      <td class="text-xs-right">{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.state }}</td>
    </template>
    <template slot="pageText" scope="{ pageStart, pageStop }">
      From {{ pageStart }} to {{ pageStop }}
    </template>
  </v-data-table>
</v-card>
</template>

<script>
export default {
  props: ['nodeMap'],
  data () {
    return {
      search: '',
      pagination: {},
      headers: [
        {
          text: 'No.',
          align: 'right',
          sortable: false,
          value: 'number'
        },
        { text: 'Name', value: 'name' },
        { text: 'State', value: 'state' }
      ]
    }
  },
  computed: {
    items () {
      const list = []
      const obj = this.nodeMap
      for (const k in obj) {
        list.push(obj[k])
      }
      return list
    }
  }
}
</script>
