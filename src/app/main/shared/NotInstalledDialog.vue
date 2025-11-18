<template>
  <BriefDialog modal dismissableMask
    v-model:visible="visible"
    :title="t('title')"
    :description="t('description', { appName })"
    icon="pi pi-exclamation-triangle text-warning"
  >
    <template #footer>
      <div class="flex items-center gap-3 w-full">
        <CopyWrapper
          :source="currentUrl"
          v-slot="{ trigger, copied }"
        >
          <Button outlined
            :severity="copied ? 'success' : 'warn'"
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
  </BriefDialog>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import { CopyWrapper } from '@/components/base';
import { BriefDialog } from '@/components/ui';

import config from './config.json';

const props = defineProps({
  appName: {
    type: String,
    required: true
  }
});

const visible = defineModel('visible', { default: true })

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.NotInstalledDialog
});

const currentUrl = computed(() => window.location.href);
</script>
