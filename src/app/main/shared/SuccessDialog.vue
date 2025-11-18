<template>
  <BriefDialog modal dismissableMask
    v-model:visible="visible"
    :title="t('title')"
    :description="t('description', { appName })"
    icon="pi pi-check text-success"
  >
    <template #footer>
      <Button outlined
        :label="t('actions.relaunch')"
        class="flex-[7] rounded-2xl font-semibold"
        @click="$emit('relaunch')"
      />
      <Button outlined
        severity="secondary"
        :label="t('actions.close')"
        class="flex-[3] rounded-2xl font-semibold"
        @click="visible = false"
      />
    </template>
  </BriefDialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { BriefDialog } from '@/components/ui';
import Button from 'primevue/button';

import config from './config.json';

defineEmits(['relaunch']);

const visible = defineModel('visible', { default: true })

const props = defineProps({
  appName: {
    type: String,
    required: true
  }
});

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.SuccessDialog
});
</script>
