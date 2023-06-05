<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AlertBox',
  setup(props, context) {
    const store = useStore();
    const loading = computed(() => {
      return store.state.loading
    })
    const message = computed(() => {
      return store.state.message
    })

    return {
      loading,
      message,
    }
  }
}
</script> 
<template>
    <div class="alert" v-if="loading || message">
        <div v-show="loading">載入中</div>
        <div v-show="message">{{ message }}</div>
    </div>
</template>
<style scoped>
  .alert {
    margin: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #3f352c;
    text-align: center;
  }
</style>