import { computed, toRef } from 'vue';
import i18n from '@/plugins/i18n';

const locales = computed(() => {
    const fallback = i18n.global.fallbackLocale.value;
    const fallbackList = Array.isArray(fallback) ? fallback : [fallback];

    return [i18n.global.locale.value, ...fallbackList];
});

export const useLocaleResolver = (messages) => {
    messages = toRef(messages);
    return computed(() => {
        if (typeof messages.value === 'string') return messages.value;
        if (typeof messages.value !== 'object') return null;
        return locales.value.map((locale) => messages.value[locale]).find(Boolean);
    });
};
