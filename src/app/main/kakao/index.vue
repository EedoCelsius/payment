<template>
  <DisabledDialog
    v-if="kakaoData.disabled"
    v-model:visible="visible"
    :description="disabledMessage"
    @after-hide="router.replace('/')"
  />

  <AppLaunchWrapper v-else active :deep-link="kakaoData.deepLink">
    <LoadingMask>{{ t('loading.description') }}</LoadingMask>

    <template #success="{ relaunch }">
      <SuccessDialog
        v-model:visible="visible"
        :app-name="appName"
        @after-hide="router.replace('/')"
        @relaunch="relaunch()"
      />
    </template>

    <template #notInstalled>
      <NotInstalledDialog
        v-model:visible="visible"
        :app-name="appName"
        @after-hide="router.replace('/')"
      />
    </template>

    <template #notMobile>
      <NotMobileDialog
        v-model:visible="visible"
        :app-name="appName"
        :qr-data="kakaoData.deepLink"
        :qr-icon="urlResolver('kakaotalk.svg')"
        @after-hide="router.replace('/')"
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

import config from './config.json';
import kakaoData from './kakao.json';

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const appName = useLocaleResolver({
  en: 'KakaoTalk',
  ko: '카카오톡'
});

const router = useRouter();
const disabledMessage = useLocaleResolver(kakaoData.disabled);
const urlResolver = useUrlResolver('https://raw.githubusercontent.com/EedoCelsius/Korean-payment-icons/refs/heads/main/payments/')
const { deepLink, qrIcon } = kakaoData;

const visible = ref(true);
</script>
