<template>
  <h2 class="place">
    {{ props.localizedName }}, {{ props.country }}, {{ props.date }}
  </h2>
</template>

<script setup lang="ts">
export type Place = {
  localizedName: string;
  country: string;
  date: string;
};

const props = defineProps<Place>();
</script>

<style scoped lang="scss">
.place {
  text-align: center;
}
</style>
