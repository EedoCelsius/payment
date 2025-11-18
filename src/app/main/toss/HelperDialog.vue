<template>
  <Dialog modal dismissableMask v-model:visible="visible" class="w-full max-w-md">
    <template #header>
      <h2>{{ t('title') }}</h2>
    </template>

    <div class="space-y-4">
      <p v-if="!tossData.amount?.krw" v-html="t('description.withoutAmount')" />
      <p v-else v-html="t('description.withAmount', { amount: amountHTML })" />
      <CopyWrapper :source="accountPayload" :copiedDuration="750" v-slot="{ trigger, copied }">
        <Button
          severity="secondary"
          class="w-full rounded-3xl py-10 shadow"
          :class="copied ? 'border-success/75 bg-success/5 translate-y-[2px]' : 'border-surface-100/75 bg-surface'"
          @click="trigger"
        >
          <div class="flex flex-col items-center gap-5">
            <div class="flex size-22 items-center justify-center rounded-3xl bg-surface-100/20 shadow-inner">
              <img
                :src="urlResolver(`../src/firms/${tossData.account.bank}.svg`)"
                :alt="tossData.account.bank"
                class="size-15 object-contain"
              />
            </div>

            <div class="space-y-2">
              <p class="text-2xl font-bold text-surface-900">
                {{ tossData.account.bank }}
                <span class="text-base font-medium text-surface-400">
                  ({{ tossData.account.holder }})
                </span>
              </p>
              <p class="font-mono font-semibold leading-none tracking-[2.5px]">
                {{ tossData.account.number }}
              </p>
            </div>
          </div>
        </Button>
      </CopyWrapper>

      <p class="flex items-center justify-center gap-1 text-xs text-surface-500">
        {{ t('helper') }}
        <i class="bx bx-copy text-sm" aria-hidden="true" />
      </p>
    </div>

    <template #footer>
      <div class="flex gap-3 w-full">
        <Button
          class="flex-[7] rounded-2xl border-none bg-blue-500 text-white font-semibold"
          @click="handleClick"
          :aria-busy="countdown.isRunning.value"
        >
          <span class="flex items-center justify-center gap-3">
            {{ countdown.isRunning.value ? t('actions.open') : t('actions.reopen') }}
            <Spinner v-if="countdown.isRunning.value" :diameter="26" :thickness="2">
              <span class="text-sm">
                {{ Math.ceil(countdown.remaining.value / 1000) }}
              </span>
            </Spinner>
          </span>
        </Button>
        <Button outlined
          severity="secondary"
          class="flex-[3] rounded-2xl font-semibold"
          :label="t('actions.close')"
          @click="visible = false"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import { CopyWrapper, Spinner } from '@/components/base';
import { useUrlResolver } from '@/composables/useUrlResolver';
import { useCountdown } from '@/composables/useCountdown';
import { useClipboard } from '@vueuse/core';

import config from './config.json';
import tossData from './toss.json';

const { t, locale } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const emit = defineEmits(['launch']);
const visible = defineModel('visible', { type: Boolean, default: false });

const clipboard = useClipboard();

const accountPayload = computed(() => {
  return tossData.amount?.krw
    ? `${tossData.account.bank} ${tossData.account.number} ${tossData.account.holder} [${tossData.amount.krw}원]`
    : `${tossData.account.bank} ${tossData.account.number} ${tossData.account.holder}`;
});
const amountHTML = computed(() => (
  `<strong class="text-success-500">₩${tossData.amount?.krw?.toLocaleString(locale.value)}</strong>`
));
const urlResolver = useUrlResolver(import.meta.url);

const COUNTDOWN_SECONDS = 5;
const countdown = useCountdown(COUNTDOWN_SECONDS * 1000, { 
  immediate: false,
  onFinish: () => { emit('launch') } 
});

const handleClick = () => {
  countdown.pause();
  emit('launch');
};

watch(visible, () => { 
  if (!visible.value) {
    countdown.pause();
    return;
  }
  clipboard.copy(accountPayload.value);
  countdown.reset();
});
onMounted(() => { 
  if (!visible.value) return;
  clipboard.copy(accountPayload.value);
  countdown.reset();
});
</script>
