<script>
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import pointApi from '../api/pointApi';
import useReduce from '../hooks/useReduce';
import usePeriod from '../hooks/usePeriod'
import BaseButton from '../components/utilities/BaseButton.vue'
import MessageBox from '../components/utilities/MessageBox.vue'
import PointPass from './PointPass.vue';
import TheRedemption from './TheRedemption.vue';
import { useRouter } from 'vue-router';
export default {
  name: 'NonRegularEvent',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    BaseButton,
    MessageBox,
    PointPass,
    TheRedemption,
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const period = usePeriod()
    const earnedPoints = ref(null)
    const reducer = useReduce()
    const event = store.getters['points/getEventById'](parseInt(props.id))
    const prize = reactive({})
    const gift = reactive({})
    const redeemable = ref(false)
    const successful = ref(false)
    
    onMounted(() => {
      getEarnedPoints()
      getGift()
    })

    const iconPath = computed(() => {
      return (position) => {
        if (earnedPoints.value === null) return;
        let url = ''
        if (earnedPoints.value >= position) {
          if (position%2) {
            url = '../assets/icons/icon_gray.png'
          } else {
            url = '../assets/icons/icon_gold.png'
          }
        } else {
          if (position%2 === 1) {
            url = '../assets/icons/icon_blank_gray.png'
          } else {
            url = '../assets/icons/icon_blank_gold.png'
          }
        }
        let instance = new URL(url, import.meta.url)
        return instance.href
      }
    })

    const canAccumulate = computed(() => {
      return Object.keys(gift).length === 0 
        && period.between(event.start_date, event.end_date)
        && earnedPoints.value < event.points
    })

    const canRedeem = computed(() => {
      return Object.keys(gift).length === 0 
        && period.between(event.redemption_start_date, event.redemption_end_date)
        && earnedPoints.value >= event.points
    });

    watch(successful, (newValue) => {
      if (newValue) {
        getGift()
      }
    })

    const toPointPass = () => {
      router.push({
        name: 'point-pass',
        params: {
          id: props.id
        }
      })
    }

    async function getEarnedPoints() {
      try {
        let res = await pointApi.getEarnedPoints({
          user_id: store.state.user.id,
          event_id: props.id
        })
        reducer.calculate(res, 'points_earned')
        earnedPoints.value = reducer.total.value
      } catch (err) {
        console.log(err);
      }
    }

    async function getGift() {
      try {
        let prizes = await pointApi.getPrizes({
          event_id: props.id
        })
        Object.assign(prize, prizes[0])
        let gifts = await pointApi.getGifts({
          user_id: store.state.user.id,
          prize_id: prizes[0].id
        })
        Object.assign(gift, gifts[0])
      } catch (err) {
        console.log(err)
      }
    }

    async function redeem() {
      try {
        let newGift = await pointApi.redeem(
          store.state.user.id,
          prize.id,
          event.points
        )
        redeemable.value = false
        successful.value = true
      } catch(err) {
      }
    }

    return {
      event,
      earnedPoints,
      iconPath,
      prize,
      canRedeem,
      canAccumulate,
      toPointPass,
      redeem,
      redeemable,
      successful,
      period,
    }
  }
}
</script>

<template>
  <section class="d-flex flex-column align-center">
    <div class="title">{{ event.name }}</div>
    <div id="points-area">
      <template v-for="i in event.points">
        <img :src="iconPath(i)" />
      </template>
    </div>
    <div class="event-brief">
      <div class="d-flex flex-row">
        <div class="mr-12"><img src="../assets/icons/icon_clock.png" alt=""></div>
        <div class="d-flex flex-column">
          <span class="text-300_">集點期間</span>
          <span class="text-400_">{{ period.format(event.start_date, event.end_date) }}</span>
        </div>
      </div>
      <div class="d-flex flex-row mt-12">
        <div class="mr-12"><img src="../assets/icons/icon_clock.png" alt=""></div>
        <div class="d-flex flex-column">
          <span class="text-300_">兌換期間</span>
          <span class="text-400_">{{ period.format(event.redemption_start_date, event.redemption_end_date) }}</span>
        </div>
      </div>
      <div class="d-flex flex-row mt-12">
        <div class="mr-12"><img src="../assets/icons/icon_gift.png" alt=""></div>
        <div class="d-flex flex-column">
          <span class="text-300_">兌換品項</span>
          <span class="text-400_">{{ prize.name }}</span>
        </div>
      </div>
    </div>
    <div v-if="canAccumulate" @click="toPointPass">
      <base-button>點我集點</base-button>
    </div>
    <div v-if="canRedeem" @click="redeemable = true">
      <base-button>點我兌換</base-button>
    </div>
    <div class="event-content">
      {{ event.description }}
    </div>
    <message-box v-if="redeemable">
      <template v-slot:description>
        <div class="text-center">提醒您</div>
        <div class="text-center mt-12">點數兌換後即不可回復，點數兌換須由客服人員操作。</div>
      </template>
      <template v-slot:buttons>
        <div>
          <div @click="redeem">
            <base-button>兌換</base-button>
          </div>
          <div @click="redeemable = false">
            <base-button type="bright">取消</base-button>
          </div>
        </div>
      </template>
    </message-box>
    <message-box v-if="successful">
      <div class="title">兌換成功</div>
      <div @click="successful = false">
        <base-button></base-button>
      </div>
    </message-box>
  </section>
</template>