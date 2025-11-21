<template>
  <slot :trigger="trigger" :copied="clipboard.copied.value" :source="props.source" />
</template>

<script setup>
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  source: { type: [String, Number], required: true },
  copiedDuration: { type: Number, default: 1500 },
})

const emit = defineEmits(['click', 'copied', 'failed'])

const clipboard = useClipboard({ legacy: true, copiedDuring: props.copiedDuration })

async function trigger(ev) {
  await clipboard.copy(props.source)

  if (clipboard.copied) {
    emit('copied', { value: props.source })
  } 
  else {
    emit('failed', error)
  }

  emit('click', ev)
}
</script>
