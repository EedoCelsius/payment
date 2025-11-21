<template>
  <DisabledDialog
    v-if="alipayData.disabled"
    v-model:visible="showDialog"
    :description="disabledMessage"
    class="w-full max-w-sm"
    @after-hide="router.replace('/')"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { DisabledDialog } from '@/components';
import { useLocaleResolver } from '@shared/composables';

import alipayData from './alipay.json';

const router = useRouter();

const disabledMessage = useLocaleResolver(alipayData.disabled);
const showDialog = ref(true);

onMounted(() => {
  if (alipayData.disabled) return;

  router.replace('/');
  location.href = alipayData["CNY"];
});
</script>
