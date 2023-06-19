<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'NonRegularEvent',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    const store = useStore()
    const event = computed(() => {
      return store.getters['points/getEventById'](parseInt(props.id))
    })

    return {
      event
    }
  }
}
</script>

<template>
  <section>
    <div class="title">{{ event.name }}</div>
    <div class="points-area">
      diamonds
    </div>
  </section>
</template>