import { computed } from 'vue';

import { createHead } from '@unhead/vue/client';
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocaleResolver } from '@shared/composables';

import rootConfig from '@/app/config.json';

const head = createHead();

function unheadSetup() {
    const route = useRoute();
    const i18n = useI18n();

    const appTitle = useLocaleResolver(rootConfig.meta.title);
    const pageTitle = useLocaleResolver(() => route.meta.title);
    const title = computed(() => pageTitle.value === appTitle.value ? pageTitle.value : `${pageTitle.value} | ${appTitle.value}`);

    const description = useLocaleResolver(() => route.meta.description);
    const canonicalUrl = computed(() => new URL(route.fullPath, window.location.origin).href);

    useHead({
        title: title,
        htmlAttrs: {
            lang: i18n.locale
        },
        meta: [
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'website' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'color-scheme', content: 'light dark' }
        ],
        link: [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
            { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
            { rel: 'manifest', href: '/site.webmanifest' }
        ]
    });
}

export { head, unheadSetup };
