<template>
  <BriefDialog modal dismissableMask
    v-model:visible="visible"
    :title="t('title')"
    :description="description ?? t('description')"
    icon="pi pi-exclamation-triangle text-warning"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { BriefDialog } from '@/components/ui'

import config from './config.json';

const visible = defineModel('visible', { type: Boolean, default: true });

const props = defineProps({
  description: {
    type: String,
    default: null
  }
});

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.DisabledDialog
});
</script>
