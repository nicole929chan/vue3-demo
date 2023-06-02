<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AlertBox',
  setup(props, context) {
    const store = useStore();
    const loading = computed(() => {
      return store.getters['points/loadingStatus']
    })
    const error = computed(() => {
      return store.getters['points/errorMessage']
    })

    return {
      loading,
      error,
    }
  }
}
</script> 
<template>
    <div class="alert">
        <div>Loading: {{ loading }}</div>
        <div>Error: {{ error }}</div>
    </div>
</template>
<style scoped>
  .alert {
    margin: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #3f352c;
    text-align: center;
  }
</style>