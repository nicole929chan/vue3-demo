<script>
export default {
  name: 'RegularEventRedeeming',
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, context) {
    console.log('here ', props)
  }
}
</script>

<template>
  <div>regular event redeeming</div>
</template>