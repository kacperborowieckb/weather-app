<template>
  <div class="wrapper">
    <p v-for="message in props.messages">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ messages?: (string | Error)[] }>();
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2.5/1;
  text-align: center;
}
</style>
