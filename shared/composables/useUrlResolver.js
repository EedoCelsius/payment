import { toRef, computed } from 'vue';

export const useUrlResolver = (base) => {
    base = toRef(base);
    
    return (url) => {
        url = toRef(url);
        return computed(() => new URL(url.value, base.value).href);
    };
};
