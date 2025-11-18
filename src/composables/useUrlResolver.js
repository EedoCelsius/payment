import { computed, toRef } from 'vue';

export const useUrlResolver = (base) => {
    base = toRef(base);
    
    return (url) => new URL(url, base.value).href;
};
