import { ref } from "vue"

export default function() {
  const total = ref(0)

  function calculate(items, column) {
    total.value = items.reduce((acc, item) => acc + item[column], 0)
  }

  return {
    total,
    calculate
  }
}