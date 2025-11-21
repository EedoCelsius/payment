<template>
  <div class="min-h-screen">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-8 lg:px-12">
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
            shared/components/ui/itemButton
          </p>
          <h1 class="text-3xl font-bold sm:text-4xl">
            {{ t('title') }}
          </h1>
          <p class="max-w-3xl text-base leading-relaxed text-surface-500 dark:text-surface-200">
            {{ t('subtitle') }}
          </p>
        </div>
        <DarkModeToggle
          v-model="preferences.dark"
          aria-label="Toggle dark mode"
        />
      </header>

      <section class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ItemButton
          v-for="item in items"
          :key="item.label"
        >
          <template #item>
            <div
              class="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-semibold text-white shadow-lg shadow-black/10"
              :class="item.swatch"
            >
              <span>{{ item.initials }}</span>
            </div>
          </template>
          <h2 class="text-center text-xl font-bold uppercase text-surface-950">
            TESTING
          </h2>
          <div
            class="mt-1 flex flex-row items-center gap-2 text-sm font-semibold uppercase text-surface-950 opacity-50"
          >
            <p>shop</p>
            <i class="pi pi-arrow-right text-yellow-500"></i>
          </div>
        </ItemButton>
      </section>

      <section class="rounded-xl border border-surface-100 bg-white/70 p-5 text-sm text-surface-600 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur dark:border-surface-800 dark:bg-surface-800/80 dark:text-surface-200">
        <p class="font-semibold text-surface-700 dark:text-surface-50">
          Usage
        </p>
        <p class="mt-2 leading-relaxed">
          Pass any markup through the named <code>item</code> slot for imagery. Pair it with <code>label</code> and <code>action</code> props, and wrap the component with <code>RouterLink</code> when you need navigation.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import { DarkModeToggle } from '@shared/components/ui';
import { usePreferencesStore } from '@shared/stores/preferences';
import ItemButton from '@shared/components/ui/itemButton/index.vue';

import config from './config.json';

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const preferences = usePreferencesStore();

const items = [
  { label: 'Wireless Earbuds', actionKey: 'shop', initials: 'WE', swatch: 'from-sky-500 to-indigo-600' },
  { label: 'Metal Card', actionKey: 'reserve', initials: 'MC', swatch: 'from-zinc-800 to-slate-600' },
  { label: 'Travel Wallet', actionKey: 'browse', initials: 'TW', swatch: 'from-emerald-500 to-lime-500' },
  { label: 'Desk Lamp', actionKey: 'shop', initials: 'DL', swatch: 'from-amber-400 to-orange-500' },
  { label: 'Gift Tote', actionKey: 'browse', initials: 'GT', swatch: 'from-pink-500 to-rose-500' },
  { label: 'Smart Thermostat', actionKey: 'reserve', initials: 'ST', swatch: 'from-cyan-500 to-blue-700' }
];
</script>
