<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PageButton from '../components/utilities/PageButton.vue';
import AlertBox from '../components/utilities/AlertBox.vue';
import EventItem from '../components/EventItem.vue';
export default {
    name: "EventList",
    setup(props, context) {
      const store = useStore();
      store.dispatch("points/getEvents");
      const events = computed(() => {
        return store.getters['points/eventList']
      })

      return {
        events
      }
    },
    components: {
      PageButton,
      AlertBox,
      EventItem,
    }
   
}
</script>
<template>
  <div id="event-list">
    <section class="container">
      <div class="w-100 d-flex flex-row justify-center">
        <div>
          <page-button :active="true">活動 {{ events.length }}</page-button>
        </div>
        <div>
          <page-button :active="false">禮物券</page-button>
        </div>
      </div>
      <alert-box></alert-box>
      <EventItem v-for="event in events" :key="event.id" :item="event" />
    </section>
  </div>
</template>
<style scoped>
  .container {
    padding-top: 194px;
  }
</style>