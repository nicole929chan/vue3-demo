<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import BaseInput from './utilities/BaseInput.vue';
import BaseButton from './utilities/BaseButton.vue';
import MessageBox from './utilities/MessageBox.vue';
import pointApi from '../api/pointApi';
export default {
  name: 'PointPass',
  components: {
    BaseInput,
    BaseButton,
    MessageBox,
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    const store = useStore()
    const code = ref('')
    const success = ref(false)

    async function accumulate() {
      try {
        let newPoint = await pointApi.accumulate(store.state.user.id, parseInt(props.id))
        success.value = newPoint.statusText === 'OK' ? true : false;
      } catch(err) {
        console.log(err)
      }
    }

    return {
      code,
      accumulate,
      success,
    }
  }
}
</script>
<template>
  <section class="d-flex flex-column align-center">
    <img src="https://placehold.co/600x400/png" style="width: 80%;" />
    <BaseInput
      type="text"
      maxlength="4"
      autofocus
      autocomplete="off"
      label="請輸入通行碼"
      v-model="code"
    />
    <div @click="accumulate">
      <base-button>送出</base-button>
    </div>
    <message-box v-if="success">
      <template v-slot:icon>
        <img src="../assets/icons/icon_gold.png" alt="">
      </template>
      <template v-slot:title>
        集點成功
      </template>
      <template v-slot:description>
        恭喜獲得點數 x 點
      </template>
      <template v-slot:buttons>
        <div @click="success = false">
          <base-button>確定</base-button>
        </div>
      </template>
    </message-box>
  </section>
</template>