<template>
  <h2 class="place">{{ props.city }}, {{ props.country }}</h2>
</template>

<script setup lang="ts">
const props = defineProps<{ city: string; country: string }>();
</script>

<style scoped>
.place {
  text-align: center;
}
</style>
