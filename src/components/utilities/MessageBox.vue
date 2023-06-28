<script>
export default {
  name: 'MessageBox',
  setup(props, context) {
    // 
  }  
}
</script>
<template>
  <div class="overlay"></div>
  <div class="message-box d-flex flex-column align-center justify-around">
    <slot name="icon"></slot>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="description">
      <slot name="description"></slot>
    </div>
    <slot name="buttons"></slot>
    <slot></slot>
  </div>
</template>
<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
}
.message-box {
  background-color: #fff;
  color: #b1ada9;
  position: fixed;
  top: 180px;
  height: 304px;
  width: 76%;
  border-radius: 40px;
  padding: 32px;
  box-shadow: 0px 2px 10px 0px #00000033;
}
.title {
  font-size: 32px;
  font-weight: 200;
  line-height: 40px;
  letter-spacing: 0px;
  color: #3f352c;
}
</style>