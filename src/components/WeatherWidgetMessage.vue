<template>
  <div class="weather-message-wrapper">
    <p v-for="message in messages" :key="message.toString()">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ messages?: (string | Error)[] }>();
</script>

<style lang="scss">
.weather-message-wrapper {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  padding: $p-xs;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
