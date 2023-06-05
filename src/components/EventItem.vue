<script>
export default {
  name: 'EventItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    // 
  }
}
</script>
<template>
  <div class="w-100 d-flex flex-column align-center mt-14">
    <div class="event-item">
      abc
    </div>
  </div>
</template>
<style scoped>
.event-item {
  width: 84%;
  height: 153px;
  background: #f5f4ef;
  box-shadow: 0px 2px 14px rgba(133, 123, 102, 0.1);
  border-radius: 30px;
}
</style>