<template>
  <Button rounded outlined class="@container justify-start">
    <div class="flex items-center gap-4 p-1 @max-3xs:p-3 max-sm:hidden">
      <Icon :icon="iconName" class="size-10 shrink-0 @max-3xs:size-12" aria-hidden="true" />
      <span class="inline-flex items-center truncate text-lg @max-3xs:hidden">{{ displayLabel }}</span>
      <div class="hidden flex-col text-left @max-3xs:flex">
        <strong class="text-lg">{{ languageMeta.native }}</strong>
        <span v-if="languageMeta.showName" class="text-sm">{{ languageMeta.name }}</span>
      </div>
    </div>
    <div class="hidden gap-4 p-1 max-sm:flex">
      <Icon :icon="iconName" class="size-10 shrink-0" aria-hidden="true" />
      <span class="inline-flex items-center truncate text-lg">{{ displayLabel }}</span>
    </div>
  </Button>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import Button from 'primevue/button';
import languages from '@shared/assets/data/languages.json';

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    default: ''
  }
});

const iconName = computed(() => {
  const isoForIcon = (props.flag || `lang-${props.code}`).toLowerCase();
  return `circle-flags:${isoForIcon}`;
});
const languageMeta = computed(() => {
  const meta = languages[props.code] || {};
  const native = meta.native || meta.name || props.code.toUpperCase();
  const name = meta.name || native;

  return {
    native,
    name,
    showName: native !== name
  };
});
const displayLabel = computed(() => {
  return languageMeta.value.showName
    ? `${languageMeta.value.native} • ${languageMeta.value.name}`
    : languageMeta.value.native;
});

defineOptions({
  name: 'LanguageButton'
});
</script>
