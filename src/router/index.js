import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Rooms from '@/components/Rooms'
import RoomEdit from '@/components/room/Edit'
import RoomUser from '@/components/room/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: RoomEdit
      // children: [
      //   {
      //     path: '',
      //     name: 'room',
      //     component: RoomEdit,
      //     children: []
      //   },
      //   {
      //     path: 'edit',
      //     component: RoomEdit,
      //     children: []
      //   },
      //   {
      //     path: 'user',
      //     component: RoomUser,
      //     children: []
      //   }
      // ]
    },
    {
      path: '/room/:id/edit',
      component: RoomEdit,
      children: []
    },
    {
      path: '/room/:id/user',
      component: RoomUser,
      children: []
    }
  ]
})
