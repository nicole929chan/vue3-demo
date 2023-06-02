<script>
import { computed } from 'vue';

export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    }
  },
  setup(props, context) {
    // 由CSS類別修改文字顏色與背景色
    const colors = computed(() => {
      return `btn-${props.type}`
    })
    
    return { colors }
  }
}
</script>
<template>
  <div class="btn" :class="colors">
    <slot>確定</slot>
  </div>
</template>
