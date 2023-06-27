<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
}
</script>
<template>
  <input 
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<style scoped>
input {
  height: 40px;
  width: 300px;
  border: 1px solid #e7e4e2;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 12px;
}
</style>