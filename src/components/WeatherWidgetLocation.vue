<template>
  <h2 class="location">
    {{ locationInfo.join(', ') }}
  </h2>
</template>

<script setup lang="ts">
defineProps<{ locationInfo: string[] }>();
</script>

<style scoped lang="scss">
.location {
  text-align: center;
}
</style>
