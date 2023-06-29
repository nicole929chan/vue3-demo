<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import pointApi from '../api/pointApi';
import useReduce from '../hooks/useReduce';
export default {
  name: 'PointRecords',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const _start = ref(0)
    const _limit = ref(3)
    const more = ref(0)
    const records = ref([])
    onMounted(() => {
      getEarnedPoints()
    })

    watch(more, (newValue) => {
      getEarnedPoints()
    })

    async function getEarnedPoints() {
      try {
        _start.value = more.value * _limit.value
        let res = await pointApi.getEarnedPoints({
          user_id: store.state.user.id,
          event_id: props.id,
          _start: _start.value,
          _limit: _limit.value,
        })
        // reducer.calculate(res, 'points_earned')
        // earnedPoints.value = reducer.total.value
        if (res.length > 0) {
          res.forEach(item => {
            records.value.push(item)
          })
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { 
      more,
      records, 
    }
  }
}
</script>
<template>
  <div>
    more {{ more }}
    records {{ records }}
    <button @click="more++">more</button>
  </div>
</template>