<template>
  <Button text rounded
    severity="contrast"
    icon="pi pi-globe"
    pt:icon="text-lg"
    size="small"
    aria-label="Change language"
    title="Change language"
    @click="visible = true"
  />

  <Dialog modal dismissableMask
    header="Languages"
    class="w-md md:w-2xl xl:w-4xl"
    pt:content="p-0"
    v-model:visible="visible"
    @hide="searchTerm = ''"
  >
    <div class="@container space-y-4 px-5 pb-5 pt-4">
      <IconField v-if="allowSearch" class="w-full">
        <InputIcon class="pi pi-search text-surface-400" />
        <InputText
          v-model="searchTerm"
          type="search"
          placeholder="Search by name or code"
          class="w-full rounded-full"
        />
      </IconField>

      <ResponsiveGrid
        v-if="filteredLanguages.length"
        :config="{ '0': 1, 'xl': 3, '2xl': 4 }"
        class="max-h-80 gap-2 overflow-y-auto pe-2"
      >
        <LanguageButton
          v-for="lang in filteredLanguages" :key="lang.code"
          :severity="lang.code === currentLocale ? 'success' : 'secondary'"
          :code="lang.code"
          @click="selectLocale(lang.code)"
        />
        <template #empty>
          <Button rounded outlined disabled
            class="size-full border-dashed border-surface-200/50 bg-surface-50/25"
          >
            <Icon icon="famicons:language-sharp" class="text-3xl text-surface-200" />
          </Button>
        </template>
      </ResponsiveGrid>
      <Message 
        v-else
        severity="warn"
        icon="pi pi-exclamation-triangle"
      >
        {{ `No languages found for "${searchTerm}"` }}
      </Message>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';
import { ResponsiveGrid } from '@shared/components/base';
import LanguageButton from './src/languageButton.vue';
import languages from '@shared/assets/data/languages.json';

const props = defineProps({
  codes: {
    type: Array,
    required: true
  },
  allowSearch: {
    type: Boolean,
    default: false
  }
});
const currentLocale = defineModel({ type: String, required: true });

const visible = ref(false);
const searchTerm = ref('');
const options = computed(() => {
  return props.codes.map((code) => {
    const lang = languages[code];
    return {
      code,
      name: lang?.name || code,
      native: lang?.native || code
    };
  });
});

const filteredLanguages = computed(() => {
  const target = searchTerm.value.trim().toLowerCase();
  if (!target) return options.value;

  return options.value.filter(({ code, name, native }) => {
    return [code, name, native].some((value) => value.toLowerCase().includes(target));
  });
});

const selectLocale = (code) => {
  currentLocale.value = code;
  visible.value = false;
};

defineOptions({
  name: 'LanguageSelector',
  components: {
    Dialog,
    Button,
    IconField,
    InputIcon,
    InputText,
    ResponsiveGrid
  }
});
</script>
