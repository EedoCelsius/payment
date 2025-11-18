<template>
  <Button
    :aria-label="t(`labels.${method}`)"
    class="block size-full rounded-2xl border-transparent text-left bg-surface shadow transition no-ripple"
    :class="disabled ? 'opacity-50' : 'hover:-translate-y-1 hover:border-primary hover:shadow-md'"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-5 px-3 py-4">
      <div class="relative flex size-12 items-center justify-center rounded-full bg-surface-100/30">
        <RotatingDisplay :interval="3000" class="h-7 w-7">
          <img
            v-for="src in srcs" :key="src"
            :src="src" :alt="method"
            class="h-full w-full object-contain"
          />
        </RotatingDisplay>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <span
          class="text-xl font-semibold text-surface-950"
          :class="disabled ? 'line-through' : ''"  
        >
          {{ t(`labels.${method}`) }}
        </span>

        <div v-if="currencies.length" class="flex flex-wrap gap-1">
          <Chip
            v-for="currency in currencies" :key="currency"
            class="border border-surface-200 bg-transparent px-2 py-1 text-xs font-semibold"
            :label="currency"
          />
        </div>
      </div>
    </div>
  </Button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Chip from 'primevue/chip'

import { RotatingDisplay } from '@/components/base'
import { useUrlResolver } from '@/composables/useUrlResolver'

import config from './config.json'

const emit = defineEmits(['click'])

const props = defineProps({
  method: { type: String, required: true },
  currencies: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.MethodButton
})

const fileMap = {
  kakao: 'kakaotalk.svg',
  toss: 'toss.png',
  bank: 'bank.svg',
  card: ['visacard.svg', 'mastercard.svg', 'unionpay.svg', 'amex.svg', 'jcb.svg'],
  alipay: 'alipay.svg'
}

const urlResolver = useUrlResolver('https://raw.githubusercontent.com/EedoCelsius/Korean-payment-icons/refs/heads/main/payments')
const srcs = computed(() => {
  let files = fileMap[props.method]
  if (!Array.isArray(files)) files = [files]
  return files.map(file => urlResolver(file))
})
</script>
