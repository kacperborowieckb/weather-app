<template>
  <header class="header">Header</header>
  <main class="main">
    <WeatherWidget />
  </main>
  <footer class="footer">Footer</footer>
</template>

<script setup lang="ts">
import WeatherWidget from "./components/WeatherWidget.vue";
</script>

<style scoped>
.header {
  height: 72px;
}

.main {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}

.footer {
  height: 72px;
}
</style>
