<script>
export default {
  name: 'RegularEvent',
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
  <div>regular event</div>
</template>