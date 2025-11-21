<template>
  <div class="min-h-screen px-4 py-8 sm:px-8 lg:px-12">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header class="flex flex-row items-center justify-between">
        <h1 class="text-3xl font-bold">
          {{ t('title') }}
        </h1>

        <div class="flex items-center gap-3">
          <LanguageSelector
            v-model="preferences.locale"
            :codes="availableLocales"
            :allow-search="false"
          />
          <DarkModeToggle v-model="preferences.dark" />
        </div>
      </header>

      <section
        v-for="category in categories" :key="category"
        class="flex flex-col gap-5"
      >
        <h2 class="text-2xl font-semibold">{{ t(`categories.${category}`) }}</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <RouterLink
            v-for="{ name, currencies, disabled } in methods[category]"
            :to="{ path: `/${name}` }"
          >
            <MethodButton :disabled :key="name" :method="name" :currencies />
          </RouterLink>
        </div>
      </section>
      
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView } from 'vue-router';

import { DarkModeToggle, LanguageSelector } from '@shared/components/ui';
import { usePreferencesStore } from '@shared/stores/preferences';

import config from './config.json';
import methods from './methods.json';
import MethodButton from './MethodButton.vue';

const categories = ['krw', 'global'];

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const preferences = usePreferencesStore();
const availableLocales = computed(() => Object.keys(config.messages.index));
</script>
