import { createApp, h } from 'vue';
import { RouterView } from 'vue-router';
import PrimeVue from 'primevue/config';
import ElementPlus from 'element-plus';

import pvOptions from '@/plugins/primevue';
import pinia from '@/plugins/pinia';
import i18n from '@/plugins/i18n';
import router from '@/plugins/router';
import { head, unheadSetup } from '@/plugins/unhead';

import '@/plugins/styles/index.css';
import '@/styles/index.css';

const app = createApp({ render: () => h(RouterView), setup: unheadSetup });
app.use(PrimeVue, pvOptions);
app.use(ElementPlus);
app.use(pinia);
app.use(i18n);
app.use(router);
app.use(head);

app.mount('#app');
