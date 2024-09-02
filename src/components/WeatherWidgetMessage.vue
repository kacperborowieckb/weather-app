<template>
  <div class="wrapper">
    <p>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2.5/1;
  text-align: center;
}
</style>
