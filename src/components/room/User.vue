<script>
import Edit from './Edit'
import { modeTypes } from '@/store/modules/room/utils'

export default {
  name: 'room_user',
  mixins: [Edit],
  created () {
    this.changeMode({modeType: modeTypes.TOGGLE_STATE})
  },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>