import path from 'path';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const APP_DIR = '/src/app';
const configs = import.meta.glob('/src/app/**/config.json', { eager: true });
const components = import.meta.glob('/src/app/**/index.vue');

const loadConfig = (dir) => configs[path.posix.join(dir, 'config.json')]?.default ?? {};

const buildRoutes = (dir, overrides = {}) => {
    const { meta, routes } = loadConfig(dir);
        
    return {
        meta,
        component: components[path.posix.join(dir, 'index.vue')],
        path: path.posix.basename(path.posix.relative(APP_DIR, dir)),
        children: routes?.map((route) => {
            if (typeof route === 'string') route = { src: route }

            const { src, ...subOverrides } = route;
            const subDir = path.posix.join(dir, src)

            return buildRoutes(subDir, subOverrides)
        }),
        ...overrides
    };
};

const router = createRouter({
  history: import.meta.env.VITE_GITHUB_PAGES === 'true'
    ? createWebHashHistory(import.meta.env.BASE_URL)   // GitHub Pages
    : createWebHistory(import.meta.env.BASE_URL),      // 일반 도메인
  routes: [buildRoutes(APP_DIR)],
});

export default router;
