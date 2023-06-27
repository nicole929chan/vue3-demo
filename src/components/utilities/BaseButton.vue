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
<style scoped>
.btn {
  height: 22px;
  width: 200px;
  border-radius: 47px;
  padding: 11px 10px 11px 10px;
  text-align: center;
  border: 1px solid #8c8477;
  letter-spacing: 2px;
  margin: 12px;
}
.btn-primary {
  /* 暗底白字 */
  color: #fff;
  background-color: #8c8477;
}
.btn-bright {
  /* 亮底黑字 */
  color: #8c8477;
  background-color: #fff;
}
</style>
