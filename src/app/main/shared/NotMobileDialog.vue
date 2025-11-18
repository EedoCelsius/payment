<template>
  <Dialog modal dismissableMask v-model:visible="visible" class="w-full max-w-md">
    <template #header>
      <h2>{{ t('title', { appName }) }}</h2>
    </template>

    <p>{{ t('description', { appName }) }}</p>
    <div class="py-2">
      <QrCode :data="qrData" class="bg-white size-52 mx-auto my-4 rounded-lg border border-surface-50 shadow-md">
        <div class="h-full w-full p-1 rounded-md bg-white">
          <img :src="urlResolver(qrIcon)" class="size-full object-contain" />
        </div>
      </QrCode>
      <p class="flex items-center justify-center gap-1 text-xs text-surface-500">
        {{ t('caption', { appName }) }}
        <i class="bx bx-camera text-sm" aria-hidden="true" />
      </p>
    </div>

    <template #footer>
      <div class="flex items-center gap-3 w-full">
        <CopyWrapper
          :source="currentUrl"
          v-slot="{ trigger, copied }"
        >
          <Button outlined
            :severity="copied ? 'success' : 'info'"
            :label="copied ? t('actions.copied') : t('actions.copyLink')"
            :icon="copied ? 'pi pi-check' : ''"
            iconPos="right"
            class="flex-[7] rounded-2xl font-semibold"
            @click="trigger"
          />
        </CopyWrapper>
        <Button outlined
          severity="secondary"
          :label="t('actions.close')"
          class="flex-[3] rounded-2xl font-semibold"
          @click="visible = false"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import { QrCode } from '@/components/ui';
import { CopyWrapper } from '@/components/base';
import { useUrlResolver } from '@/composables/useUrlResolver';

import config from './config.json';

const props = defineProps({
  appName: {
    type: String,
    required: true
  },
  qrData: {
    type: String,
    required: true
  },
  qrIcon: {
    type: String,
    required: true
  }
});

const visible = defineModel('visible', { default: true })

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.NotMobileDialog
});

const urlResolver = useUrlResolver(import.meta.url);
const currentUrl = computed(() => window.location.href);
</script>
