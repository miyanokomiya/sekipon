<template>
<g>
  <circle
    :cx="node.x"
    :cy="node.y"
    r="30"
    :fill="node.state === 0 ? 'blue' : 'red'"
    :stroke="isSelected ? 'black' : 'none'"
    stroke-width="4"
  >
  </circle>
</g>
</template>

<script>
export default {
  name: 'node',
  props: ['node', 'isSelected']
}
</script>


<style scoped>

</style>
