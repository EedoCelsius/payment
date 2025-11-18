<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        v-if="visible"
        class="fixed inset-0 z-9999 flex flex-col gap-5 items-center justify-center bg-black/25 backdrop-blur"
      >
        <Spinner />
        <div class="text-white">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Spinner } from '@/components/base';
defineProps({
  visible: { type: Boolean, default: true }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
