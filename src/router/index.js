import Vue from 'vue'
import Router from 'vue-router'
import Rooms from '@/components/Rooms'
import Room from '@/components/room'
import RoomManage from '@/components/room/Manage'
import RoomEdit from '@/components/room/Edit'
import RoomUser from '@/components/room/User'
import RoomRightTool from '@/components/room/RightTool'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        main: Rooms
      },
      children: []
    },
    {
      path: '/rooms',
      name: 'rooms',
      components: {
        main: Rooms
      },
      children: []
    },
    {
      path: '/room/:id',
      components: {
        main: Room,
        'right-toolber': RoomRightTool
      },
      children: [
        {
          path: '',
          component: RoomManage,
          children: []
        },
        {
          path: 'edit',
          component: RoomEdit,
          children: []
        },
        {
          path: 'user',
          component: RoomUser,
          children: []
        }
      ]
    }
    // {
    //   path: '/room/:id/edit',
    //   components: {
    //     main: RoomEdit,
    //     'right-toolber': RoomRightTool
    //   },
    //   children: []
    // },
    // {
    //   path: '/room/:id/user',
    //   components: {
    //     main: RoomUser
    //   },
    //   children: []
    // }
  ]
})
