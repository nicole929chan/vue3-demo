<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import pointApi from '../api/pointApi'
import useReduce from '../hooks/useReduce'
import usePeriod from '../hooks/usePeriod'

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
    const store = useStore()
    const period = usePeriod()
    const reducer = useReduce()
    const regular = props.item.type === 'regular period' ? true : false;
    function toDetail() {
      router.push({
        name: 'non-regular-event',
        params: {
          id: props.item.id
        }
      })
    }

    onMounted(() => {
      pointApi.getEarnedPoints({
        'user_id': store.state.user.id,
        'event_id': props.item.id
      })
        .then(res => {
          reducer.calculate(res, 'points_earned')
        })
        .catch(err => {
          console.log(err)
        })
    })

    return {
      regular,
      period,
      toDetail,
      reducer
    }
  }
}
</script>
<template>
  <div class="w-100 d-flex flex-column align-center mt-14">
    <div class="event-item text-400_" @click="toDetail">
      <div class="event-title">{{ item.name }}</div>
      <div class="period">{{ period.format(item.start_date, item.end_date) }}</div>
      <div class="d-flex flex-row justify-end" style="margin: 20px 20px 0 0;" v-if="regular">
        <span class="dot">目前點數&nbsp;</span>
        <span class="points">{{ reducer.total }}</span>
        <span class="dot">點</span>
      </div>
      <div class="d-flex flex-row justify-end" style="margin: 20px 20px 0 0;" v-else>
        <span class="points">{{ reducer.total }}</span>
        <span class="points">/</span>
        <span class="points">{{ item.points }}</span>
        <span class="dot">點</span>
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