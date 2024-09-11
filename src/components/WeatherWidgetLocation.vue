<template>
  <h2 class="location-info">
    {{ locationInfo.join(', ') }}
  </h2>
</template>

<script setup lang="ts">
defineProps<{ locationInfo: string[] }>();
</script>

<style scoped lang="scss">
.location-info {
  text-align: center;
}
</style>
