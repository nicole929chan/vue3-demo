<template>
  <div>{{ book }}</div>
  <button @click="increment">increment</button>
</template>
<script>
import { ref, shallowRef, shallowReactive, reactive } from 'vue';
export default {
  setup(props, context) {
    const book = shallowReactive({
      title: 'A river runs through it',
      total: 0,
      count: {
        views: 0,
        like: 0
      }
    })

    function increment() {
      // 只有單一更新巢狀屬性才沒有數據代理
      // 第一層屬性放這一塊更新, 則更新巢狀屬性也會更新;
      book.count.views++; 
    }

    return {
      book,
      increment
    }
  }
}
</script>