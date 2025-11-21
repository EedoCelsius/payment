import { computed } from 'vue';

export const useMobileCheck = () => {
    const getUserAgent = () => {
        if (typeof navigator === 'undefined') return '';
        const { userAgent = '', vendor = '' } = navigator;
        const opera = window.opera ? String(window.opera) : '';

        return `${userAgent} ${vendor} ${opera}`;
    };

    return computed(() => /android|iphone|ipad|ipod|windows phone/i.test(getUserAgent()));
};
