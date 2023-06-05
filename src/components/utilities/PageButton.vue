<script>
export default {
  name: 'PageButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, context) {
    let attribute = '';
    attribute = props.active ? 'active' : 'inactive';

    return {
      attribute
    }
  }
}
</script>
<template>
  <div class="page-button" :class="[attribute]">
    <slot>未定義</slot>
  </div>
</template>
<style scoped>
.page-button {
  height: 24px;
  width: 166px;
  border-radius: 30px;
  padding: 10px 4px 10px 4px;
  margin: 4px;
  text-align: center;
  letter-spacing: 2px;
}
.active {
  background-color: #2C2C2C;
  color: #fff;
}
.inactive {
  background-color: linear-gradient(0deg, #CEC8BC, #CEC8BC);
  color: #8C8477;
  border: 1px solid #8C8477;
}
</style>