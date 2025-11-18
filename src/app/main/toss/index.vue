<template>
  <DisabledDialog
    v-if="tossData.disabled"
    v-model:visible="visible"
    :description="disabledMessage"
    @after-hide="router.replace('/')"
  />
  <HelperDialog
    v-else
    v-model:visible="visible"
    @after-hide="router.replace('/')"
    @launch="active = true"
  />

  <AppLaunchWrapper :active :deep-link="tossData.deepLink">
    <LoadingMask>{{ t('loading.description') }}</LoadingMask>

    <template #success="{ relaunch }">
      <SuccessDialog
        :app-name="appName"
        @after-hide="active = false"
        @relaunch="relaunch()"
      />
    </template>

    <template #notInstalled>
      <NotInstalledDialog
        :app-name="appName"
        @after-hide="visible = false"
      />
    </template>

    <template #notMobile>
      <NotMobileDialog
        :app-name="appName"
        :qr-data="tossData.deepLink"
        :icon-src="urlResolver('toss.png')"
        @after-hide="visible = false"
      />
    </template>
  </AppLaunchWrapper>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { AppLaunchWrapper } from '@/components/base';
import { LoadingMask } from '@/components/ui';
import { useLocaleResolver } from '@/composables/useLocaleResolver';
import { useUrlResolver } from '@/composables/useUrlResolver'
import SuccessDialog from '@/app/main/shared/SuccessDialog.vue';
import NotInstalledDialog from '@/app/main/shared/NotInstalledDialog.vue';
import NotMobileDialog from '@/app/main/shared/NotMobileDialog.vue';
import DisabledDialog from '@/app/main/shared/DisabledDialog.vue';

import HelperDialog from './HelperDialog.vue';
import config from './config.json';
import tossData from './toss.json';

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const appName = useLocaleResolver({ en: 'Toss', ko: '토스' });
const disabledMessage = useLocaleResolver(tossData.disabled);

const router = useRouter();
const urlResolver = useUrlResolver('https://raw.githubusercontent.com/EedoCelsius/Korean-payment-icons/refs/heads/main/payments/')

const visible = ref(true);
const active = ref(false);
</script>
