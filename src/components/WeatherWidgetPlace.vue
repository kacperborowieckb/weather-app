<template>
  <h2 class="place">{{ props.name }}, {{ props.country }}, {{ props.date }}</h2>
</template>

<script setup lang="ts">
export type Place = {
  name: string;
  country: string;
  date?: string;
};

const props = defineProps<Place>();
</script>

<style scoped lang="scss">
.place {
  text-align: center;
}
</style>
