<template>
  <DisabledDialog
    v-if="cardData.disabled"
    v-model:visible="showDialog"
    :description="disabledMessage"
    class="w-full max-w-sm"
    @after-hide="router.replace('/')"
  />
  <CurrencySelectDialog
    v-else
    v-model:visible="showDialog"
    :currencies="currencies"
    class="w-full max-w-sm"
    @select="handleSelect"
    @after-hide="router.replace('/')"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CurrencySelectDialog from '@/app/main/shared/CurrencySelectDialog.vue';
import DisabledDialog from '@/app/main/shared/DisabledDialog.vue';
import { useLocaleResolver } from '@/composables/useLocaleResolver';

import cardData from './card.json';

const router = useRouter();
const showDialog = ref(true);

const disabledMessage = useLocaleResolver(cardData.disabled);

const currencies = Object.keys(cardData.links)

const handleSelect = (currency) => {
  showDialog.value = false;
  location.href = cardData.links[currency];
};
</script>
