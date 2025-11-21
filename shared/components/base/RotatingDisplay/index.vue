<template>
  <div class="relative">
    <div
      v-for="(entry, i) in entries" :key="entries.key ?? i"
      class="absolute inset-0 h-full w-full transition ease-in-out"
      :class="i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'"
      :style="{ transitionDuration: `${transitionDuration}ms` }"
      :aria-hidden="i !== activeIndex"
    >
      <component :is="entry" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, useSlots, Comment } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const props = defineProps({
  interval: { type: Number, default: 3000 },
  transitionDuration: { type: Number, default: 250 },
  run: { type: Boolean, default: true }
})

const slots = useSlots()
const entries = computed(() => slots.default()[0].children.filter(v => v && v.type !== Comment))

const activeIndex = ref(0)
const { pause, resume } = useIntervalFn(
  () => { activeIndex.value = (activeIndex.value + 1) % entries.value.length },
  props.interval
)
const runOrPause = () => { props.run ? resume() : pause() }

onMounted(runOrPause)
watch(() => props.run, runOrPause, { immediate: true })

watch(() => entries.value.length, () => { activeIndex.value = 0 })
</script>
