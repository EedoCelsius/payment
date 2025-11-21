import { defineStore } from 'pinia';
import { useDark } from '@vueuse/core';
import { useI18n } from 'vue-i18n'

export const usePreferencesStore = defineStore('preferences', () => {
    const dark = useDark({
        selector: 'html',
        storageKey: 'preferences-color-scheme',
        valueDark: 'dark',
        valueLight: 'light',
        disableTransition: false
    });
    const locale = useI18n().locale;

    return { dark, locale };
});
