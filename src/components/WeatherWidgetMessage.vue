<template>
  <div class="wrapper">
    <p v-for="message in messages">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ message?: string | (string | Error)[] }>();

const messages = computed(() =>
  Array.isArray(props.message) ? props.message : [props.message]
);
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
