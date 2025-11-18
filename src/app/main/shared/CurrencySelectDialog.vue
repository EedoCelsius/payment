<template>
  <Dialog modal dismissableMask
    v-model:visible="visible"
    pt:content="flex flex-col overflow-hidden"
  >
    <template #header>
      <h2>{{ t('title') }}</h2>
    </template>

    <p>{{ t('description') }}</p>
    <div class="my-3 p-1 overflow-auto">
      <ul class="space-y-3">
        <li v-for="currency in props.currencies" :key="currency">
          <Button outlined severity="contrast"
            class="flex w-full p-4 rounded-2xl border-surface-100 font-semibold shadow"
            @click="emit('select', currency)"
          >
            <span class="flex-1 text-left text-lg">{{ currency }}</span>
            <i class="bx bx-chevron-right text-2xl text-primary" aria-hidden="true" />
          </Button>
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import config from './config.json';

const visible = defineModel('visible', { type: Boolean, default: true });
const emit = defineEmits(['select']);

const props = defineProps({
  currencies: {
    type: Array,
    default: () => []
  }
});

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.CurrencySelectDialog
});
</script>
