<template>
  <section class="relative aspect-square bg-surface-0 p-4">
    <div class="flex size-full items-center justify-center">
      <img
        v-if="qrResult.src"
        :src="qrResult.src"
        alt="QR code"
        class="size-full object-contain"
        style="image-rendering: crisp-edges; image-rendering: pixelated;"
      />
      <span v-else class="text-center text-sm text-error">{{ qrResult.error }}</span>
    </div>
    <div
      class="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <slot />
    </div>
  </section>
</template>

<script setup>
import { computedAsync } from '@vueuse/core';
import QRCode from 'qrcode';

const props = defineProps({
  data: {
    type: String,
    required: true
  },
  dark: {
    type: String,
    default: '#000'
  },
  light: {
    type: String,
    default: '#fff'
  }
});

const qrResult = computedAsync(
  async () => {
    const { data, dark, light } = props;
    try {
      const src = await QRCode.toDataURL(data, {
        margin: 0,
        color: { dark, light }
      });
      
      return { src };
    } catch (error) {
      return { error: String(error) };
    }
  }, {}
);

defineOptions({
  name: 'QrCode'
});
</script>
