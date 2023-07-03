<script>
import { onMounted, onUnmounted, readonly, ref, watch } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import pointApi from '../api/pointApi';
import useReduce from '../hooks/useReduce';
import usePeriod from '../hooks/usePeriod';
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
    const period = usePeriod()
    const event = store.getters['points/getEventById'](parseInt(props.id))
    const _start = ref(0)
    const _limit = ref(10)
    const more = ref(true)
    const lastPosition = ref(0)
    const records = ref([])
    const box = ref(null)
    onMounted(() => {
      getEarnedPoints()
      box.value.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      box.value.removeEventListener('scroll', handleScroll)
    })

    watch(more, (newValue) => {
      getEarnedPoints()
    })

    function handleScroll() {
      let scrollHeight = box.value.scrollHeight
      let clientHeight = box.value.clientHeight
      let scrollTop = box.value.scrollTop
      if (scrollHeight === clientHeight + scrollTop) {
        if (more.value) 
        {
          lastPosition.value++
        }
      }
    }

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
        } else {
          more.value = false
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { 
      event,
      records,
      box,
      period, 
    }
  }
}
</script>
<template>
  <section class="d-flex flex-column align-center">
    <div class="title">我的點數紀錄</div>
    <div class="title">{{ event.name }}</div>
    <div class="record-content" ref="box">
      <div class="record-item d-flex flex-row align-center" style="margin-bottom: 10px;"
        v-for="record in records" :key="record.id">
        <div class="record-item-left">
          <img src="../assets/icons/icon_gold.png" alt="">
          <span>+</span>
          <span>{{ record.points_earned }}</span>
        </div>
        <div class="d-flex flex-column align-center record-item-right">
          <span>信義店</span>
          <span>{{ period.format(record.timestamp) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .record-content {
    min-width: 340px;
    margin: 0 10px;
    height: 460px;
    overflow-y: scroll;
  }
  .record-item {
    width: 300px;
    height: 102px;
    border-radius: 30px;
    border: 1px solid #bbaf95;
    margin: auto;
  }
  .record-item-left {
    border-right: 1px solid #bbaf95;
    padding: 0 0 0 18px;
    width: 38%;
  }
  .record-item-right {
    padding-left: 6px;
    width: 62%;
  }
  img {
    margin-right: 4px;
  }
  span {
    margin-bottom: 4px;
  }
</style>