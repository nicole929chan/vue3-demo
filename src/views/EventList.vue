<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AlertBox from '../components/utilities/AlertBox.vue';
export default {
    name: "EventList",
    setup(props, context) {
        const store = useStore();
        store.dispatch("points/getEvents");
    },
    components: { AlertBox }
}
</script>
<template>
  <div id="event-list">
    <section class="container">
      <AlertBox />
    </section>
  </div>
</template>