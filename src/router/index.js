import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Rooms from '@/components/Rooms'
import RoomEdit from '@/components/room/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms,
      children: []
    },
    {
      path: '/room/:id',
      name: 'room',
      component: RoomEdit,
      children: [{
        path: 'edit',
        component: RoomEdit,
        children: []
      }]
    }
  ]
})
