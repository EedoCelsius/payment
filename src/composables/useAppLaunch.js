import { ref } from 'vue';
import { useMobileCheck } from './useMobileCheck';

const isMobile = useMobileCheck();

export const useAppLaunch = (deepLink, timeout=2000) => {
    const isLoading = ref(false);
    const loadFailed = ref(null);

    let launchResolves = [];
    const success = () => {
        isLoading.value = false;
        loadFailed.value = false;
        launchResolves.forEach((resolve) => resolve(true));
    }

    window.addEventListener('blur', success);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) success()
    })

    const launch = async () => {
        isLoading.value = true;
        loadFailed.value = null;
        window.location.href = deepLink;

        if (!isMobile.value) {
            isLoading.value = false;
            loadFailed.value = true;
            return false;
        }
        
        return new Promise((resolve) => {
            launchResolves.push(resolve);
            setTimeout(() => {
                if (!isLoading.value) return;
                isLoading.value = false;
                loadFailed.value = true;
                launchResolves.forEach((resolve) => resolve(false));
            }, timeout);
        });
    };

    return { launch, isLoading, loadFailed };
};
