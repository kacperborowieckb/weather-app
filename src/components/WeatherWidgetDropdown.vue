<template>
  <div class="dropdown">
    <input
      class="dropdown__input"
      type="text"
      placeholder="Search a place"
      aria-label="Search a place for weather forecast"
    />
    <ul class="dropdown__content"></ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dropdown {
  display: flex;
  justify-content: flex-end;

  &__input {
    $input-width: 160px;

    border: $border-primary;
    outline: none;
    border-radius: $radius-sm;
    padding: $p-xs;
    width: $input-width;
    background-color: $clr-primary-dark;
    cursor: pointer;
    color: $clr-text;
    font-size: $fs-sm;
    transition: all $transition-timing;

    &:focus {
      width: $input-width * 2;
      background-color: $clr-primary-light;
      cursor: text;
    }

    &::placeholder {
      color: $clr-text;
      text-align: center;
      transition: all $transition-timing;
    }

    &:focus::placeholder {
      color: $clr-text-muted;
    }
  }

  &__list {
  }

  &__list-item {
  }
}
</style>
