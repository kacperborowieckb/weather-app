<template>
  <h2 class="place">
    {{ placeInfo.join(', ') }}
  </h2>
</template>

<script setup lang="ts">
defineProps<{ placeInfo: string[] }>();
</script>

<style scoped lang="scss">
.place {
  text-align: center;
}
</style>
