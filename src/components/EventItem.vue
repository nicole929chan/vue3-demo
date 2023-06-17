<script>
import { useRouter } from 'vue-router'

export default {
  name: 'EventItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const router = useRouter()
    const period = `${props.item.start_date} - ${props.item.end_date}`
    function toDetail() {
      router.push({
        name: 'non-regular-event',
        params: {
          id: props.item.id
        }
      })
    }

    return {
      period,
      toDetail
    }
  }
}
</script>
<template>
  <div class="w-100 d-flex flex-column align-center mt-14">
    <div class="event-item text-400_" @click="toDetail">
      <div class="event-title">{{ item.name }}</div>
      <div class="period">{{ period }}</div>
      <div class="d-flex flex-row justify-end">
        <span>0</span>
        <span>/</span>
        <span>{{ item.points }}</span>
        <span>點</span>
      </div>
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