<template>
  <div class="min-h-screen bg-surface-0 text-surface-950 transition-colors">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-8 lg:px-12">
      <header class="sticky top-0 z-10 flex flex-col gap-6 py-6 bg-surface-0/95 transition sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-3">
          <h1 class="text-3xl font-semibold sm:text-4xl">
            {{ t('title') }}
          </h1>
          <p class="max-w-2xl text-base text-surface-500">
            {{ t('description') }}
          </p>
        </div>
        <DarkModeToggle
          v-model="preferences.dark"
          aria-label="Toggle dark mode"
        />
      </header>

      <section
        v-for="palette in palettes"
        :key="palette.key"
        class="space-y-4"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div class="space-y-1">
            <h2 class="text-xl font-semibold sm:text-2xl">
              {{ palette.label }}
            </h2>
            <p class="text-sm text-surface-500">
              {{ palette.description }}
            </p>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide text-surface-400">
            {{ t('baseLabel') }} · {{ palette.baseToken }}
          </span>
        </div>

        <div class="overflow-hidden rounded-2xl border border-surface-100 bg-surface-0/90 shadow-lg shadow-black/5 ring-1 ring-black/5">
          <div class="grid grid-cols-2 gap-px bg-surface-50/80 text-xs font-semibold uppercase tracking-wide text-surface-600 transition sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
            <div
              v-for="tone in palette.tones"
              :key="tone.variable"
              class="group relative flex min-h-[7.5rem] flex-col justify-between gap-3 p-4 text-center transition-colors duration-500"
              :class="[tone.swatchClass, tone.foregroundClass]"
            >
              <span class="text-sm font-semibold tracking-wide">
                {{ toneLabel }} {{ tone.grade }}{{ toneSuffix }}
              </span>
              <code
                class="mx-auto rounded-full bg-black/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-black/70 transition"
              >
                {{ tone.variable }}
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { DarkModeToggle } from '@shared/components/ui';
import { usePreferencesStore } from '@shared/stores/preferences';

import config from './config.json';
import swatchClasses from './swatchClasses.json';

const { t } = useI18n({
  useScope: 'local',
  messages: config.messages.index
});

const preferences = usePreferencesStore();

const toneLabel = computed(() => t('toneLabel'));
const toneSuffix = computed(() => t('toneSuffix'));

const paletteKeys = ['primary', 'surface', 'success', 'warning', 'danger', 'error', 'info'];
const toneGrades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const palettes = computed(() =>
  paletteKeys.map((key) => ({
    key,
    label: t(`palettes.${key}.label`),
    description: t(`palettes.${key}.description`),
    baseToken: `--color-${key}`,
    tones: toneGrades.map((grade) => {
      const isLightRange = grade <= 400;
      const isSurface = key === 'surface';

      return {
        grade,
        variable: `${key}-${grade}`,
        swatchClass: swatchClasses[key][grade],
        foregroundClass: isSurface
          ? (isLightRange ? 'text-surface-950' : 'text-surface-50')
          : (isLightRange ? 'text-black' : 'text-white')
      };
    })
  }))
);
</script>
