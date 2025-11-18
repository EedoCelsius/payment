<template>
  <div
    class="grid overflow-hidden"
    :class="standing ? 'grid-cols-1' : 'grid-cols-[minmax(0,1fr)_auto]'"
  >
    <slot />
    <div :class="standing ? 'w-full h-11' : 'w-16 h-full'">
      <slot name="button" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  standing: {
    type: Boolean,
    default: false
  }
})

defineOptions({ name: 'ActionCard' })
</script>
