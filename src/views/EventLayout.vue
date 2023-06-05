<script>
export default {
  name: 'EventLayout'
}
</script>

<template>
  <div id="event-layout">
    <section class="container">
      <router-view></router-view>
    </section>
  </div>
</template>

<style scoped>
#event-layout {
  background-image: url(../../src/assets/images/bg2.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.container {
  padding-top: 250px;
}
</style>