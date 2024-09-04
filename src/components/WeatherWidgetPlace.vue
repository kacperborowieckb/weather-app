<template>
  <h2 class="place">
    {{ props.placeInfo.join(", ") }}
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ placeInfo: string[] }>();
</script>

<style scoped lang="scss">
.place {
  text-align: center;
}
</style>
