<script>
export default {
  name: 'NonRegularEvent',
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
  <div>non regular event</div>
</template>