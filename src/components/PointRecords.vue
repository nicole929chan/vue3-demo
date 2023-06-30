<script>
import { onMounted, onUnmounted, readonly, ref, watch } from 'vue'
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
    const event = store.getters['points/getEventById'](parseInt(props.id))
    const _start = ref(0)
    const _limit = ref(3)
    const more = ref(0)
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
      console.log('scrollHeight', box.value.scrollHeight)
      console.log('clientHeight', box.value.clientHeight)
      console.log('scrollTop', box.value.scrollTop)
      let scrollHeight = box.value.scrollHeight
      let clientHeight = box.value.clientHeight
      let scrollTop = box.value.scrollTop
      if (scrollHeight === clientHeight + scrollTop) {
        console.log('@@@@@')
        // more嘗試用計算屬性, 製作getter與setter, 當fetch沒有資料時就不再增加more??
        more.value++
        console.log('#######', more.value)
        getEarnedPoints()
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
          readonly(more)
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { 
      event,
      more,
      records,
      box, 
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
          <span>{{ record.timestamp }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="foo">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </div> -->
    
  </section>
</template>
<style scoped>
  .record-content {
    min-width: 340px;
    margin: 0 10px;
    height: 180px;
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
    padding: 0 12px;
  }
  .record-item-right {
    padding-left: 6px;
  }
  img {
    margin-right: 4px;
  }
</style>