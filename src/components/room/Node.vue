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
  <text stroke="black" :x="node.x" :y="node.y" fontSize="10" textAnchor="middle" >
    {{node.name}}
  </text>
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
