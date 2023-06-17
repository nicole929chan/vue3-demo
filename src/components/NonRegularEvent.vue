<script>
import { computed, onMounted } from 'vue';
export default {
  name: 'NonRegularEvent',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    onMounted(() => {
      console.log('abc');
    })
    const event = computed(() => {
      // 
    })
  }
}
</script>

<template>
  <div>non regular event</div>
</template>