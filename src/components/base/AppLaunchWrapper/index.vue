<template>
  <template v-if="active">
    <slot v-if="app.isLoading.value" name="loading"><slot /></slot>
    <template v-else>
      <template v-if="app.loadFailed.value">
        <slot v-if="!isMobile" name="notMobile"><slot name="failed" /></slot>
        <slot v-else name="notInstalled"><slot name="failed" /></slot>
      </template>
      <slot v-else name="success" :relaunch="app.launch" />
    </template>
  </template>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useAppLaunch } from '@/composables/useAppLaunch';
import { useMobileCheck } from '@/composables/useMobileCheck';

const props = defineProps({
  deepLink: { type: String, required: true },
  active: { type: Boolean, default: false }
});

const app = useAppLaunch(props.deepLink);
const isMobile = useMobileCheck();

watch(() => props.active, () => { props.active && app.launch() });
onMounted(() => { props.active && app.launch() });
</script>