<template>
  <header class="header">Header</header>
  <main class="main">
    <WeatherWidget />
  </main>
  <footer class="footer">Footer</footer>
</template>

<script setup lang="ts">
import WeatherWidget from "@/components/WeatherWidget.vue";
</script>

<style scoped lang="scss">
.header {
  height: 72px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.footer {
  height: 72px;
}
</style>
