<template>
  <el-switch
    v-model="switchValue"
    :style="switchStyles"
    inline-prompt
    :inactive-icon="InactiveIcon"
    :active-icon="ActiveIcon"
  />
</template>

<script setup>
import { computed, h } from 'vue';

const isDarkMode = defineModel({ type: Boolean, default: false });

const switchValue = computed({
  get: () => !isDarkMode.value,
  set: value => (isDarkMode.value = !value)
});

const switchStyles = computed(() => ({
  '--switch-shadow-color': isDarkMode.value
    ? 'rgba(0, 0, 0, 0.75)'
    : 'rgba(0, 31, 255, 0.375)',
  '--switch-text-color': isDarkMode.value ? '#f3f4f6' : '#035e96'
}));

const InactiveIcon = h('i', { class: 'bx bxs-moon-star text-yellow-500 animate-shake' });
const ActiveIcon = h('i', { class: 'bx bxs-sun text-yellow-300 animate-spin-slow' });

defineOptions({
  name: 'DarkModeToggle'
});
</script>

<style scoped>
:deep(.el-switch__core) {
  min-height: 1.35rem;
  border-radius: calc(infinity * 1px);
  box-shadow: inset 0 3px 5px 1px var(--switch-shadow-color);
  --el-switch-off-color: #32327d;
  --el-switch-on-color: #98d1ff;
}

:deep(.el-switch__action) {
  box-shadow: 0px 0px 5px 1px var(--switch-shadow-color);
}

:deep(.el-switch__core .el-switch__inner .is-text) {
  color: var(--switch-text-color);
  font-weight: bold;
}
</style>

<style>
@keyframes shake {
  0%, 15%, 85%, 100% {
    transform: rotate(10deg);
  }
  30% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
  70% {
    transform: rotate(5deg);
  }
}
.animate-shake {
  animation: shake 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin 5s linear infinite;
}
</style>
