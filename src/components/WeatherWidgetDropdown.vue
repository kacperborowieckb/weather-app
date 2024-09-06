<template>
  <div class="dropdown">
    <input
      class="dropdown__input"
      type="text"
      placeholder="Search a place"
      aria-label="Search a place for weather forecast"
    />
    <ul class="dropdown__list">
      <li class="dropdown__list-item">Lublin, Poland</li>
      <li class="dropdown__list-item">
        Lubumbashi, Democratic Republic of the Congo
      </li>
      <li class="dropdown__list-item">Lubei District, China</li>
      <li class="dropdown__list-item">Lublin, Poland</li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dropdown {
  $dropdown-max-height: 240px;
  $input-width: 160px;

  position: relative;
  width: min-content;
  margin-left: auto;

  &__input {
    border: $border-primary;
    outline: none;
    border-radius: $radius-sm;
    padding: $p-xs;
    width: $input-width;
    background-color: $clr-primary-dark;
    cursor: pointer;
    color: $clr-text;
    font-size: $fs-sm;
    transition: all $transition-duration ease-out;

    &:focus,
    &:not(:placeholder-shown) {
      border-radius: $radius-sm $radius-sm 0 0;
      width: $input-width * 2;
      background-color: $clr-primary-light;
      cursor: text;
    }

    &:focus::placeholder {
      color: $clr-text-muted;
    }

    &:focus ~ ul {
      max-height: $dropdown-max-height;
      border-color: $clr-primary-very-light;

      & li {
        opacity: 1;
      }
    }

    &::placeholder {
      color: $clr-text;
      text-align: center;
      transition: all $transition-duration ease-out;
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    max-height: 0;
    overflow-x: scroll;
    list-style: none;
    border: $border-primary;
    border-top: none;
    border-color: transparent;
    border-radius: 0 0 $radius-sm $radius-sm;
    background-color: $clr-primary-dark;
    transition: all $transition-duration ease-in-out;
  }

  &__list-item {
    overflow: hidden;
    padding: $p-xs;
    opacity: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all $transition-duration ease-out;

    &:hover {
      background-color: $clr-primary-light;
      cursor: pointer;
    }
  }
}
</style>
