<template>
  <div
    ref="root"
    class="grid"
    :style="`grid-template-columns: repeat(${columns}, minmax(0, 1fr))`"
  >
    <slot />

    <template v-for="n in fillerCount" :key="`filler-${n}`">
      <slot name="empty" />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, toValue, useSlots, Comment } from 'vue'
import { BREAKPOINTS, useElementBreakpoints } from '@shared/composables'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const root = ref()

const breakpoints = {}
Object.keys(props.config).forEach((bp) => {
  breakpoints[bp] = BREAKPOINTS.CONTAINER[bp] ?? bp
})

const active = useElementBreakpoints(root, breakpoints).active()
const columns = computed(() => toValue(props.config[active.value]))

const slots = useSlots()
const items = computed(() => {
  if (!slots.default) return []
  return slots.default()[0].children.filter(v => v && v.type !== Comment)
})

const fillerCount = computed(() => {
  if (!columns.value || !items.value) return 0
  const remainder = items.value.length % columns.value
  return remainder === 0 ? 0 : columns.value - remainder
})

defineOptions({ name: 'ResponsiveGrid' })
</script>
