<template>
  <h2 class="place">{{ props.name }}, {{ props.country }}</h2>
</template>

<script setup lang="ts">
export type Place = {
  name: string;
  country: string;
};

const props = defineProps<Place>();
</script>

<style scoped lang="scss">
.place {
  text-align: center;
}
</style>
