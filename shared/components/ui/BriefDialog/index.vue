<template>
  <Dialog class="w-full max-w-sm">
    <template #header>
      <h2>{{ title }}</h2>
    </template>

    <div class="flex items-center" :class="icon && 'gap-6 p-3'">
      <i v-if="icon" class="text-4xl" :class="icon" aria-hidden="true" />
      <slot>{{ description }}</slot>
    </div>

    <template #footer v-if="$slots.footer">
      <div class="flex items-center gap-3 w-full">
        <slot name="footer" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  icon: {
    type: String,
    required: true
  }
});
</script>
