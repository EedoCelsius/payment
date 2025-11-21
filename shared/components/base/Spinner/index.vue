<template>
  <div
    class="relative"
    :style="{ width: `${diameter}px`, height: `${diameter}px` }"
    aria-hidden="true"
  >
    <div
      class="size-full animate-spin rounded-full border-solid border-current"
      :style="{ borderWidth: `${thickness}px`, borderColor: trackColor, borderTopColor: indicatorColor }"
    />
    <div class="absolute inset-0 flex size-full items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  diameter: {
    type: Number,
    default: 64
  },
  thickness: {
    type: Number,
    default: 6
  },
  trackColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.25)'
  },
  indicatorColor: {
    type: String,
    default: '#fff'
  }
});

defineOptions({
  name: 'Spinner'
});
</script>
