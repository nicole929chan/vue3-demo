import { ref } from 'vue'

export default function(fn) {
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)

  function createPromise(...args) {
    fn(args).then(res => {
      error.value = ''
      results.value = res[0]
    }).catch(err => {
      results.value = []
      error.value = err.message
    }).finally(() => {
      loading.value = false
    }) 
  }

  

  return {
    loading, 
    error, 
    createPromise,
    results, 
  }
}