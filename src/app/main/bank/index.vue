<template>
  <DisabledDialog
    v-if="bankData.disabled"
    v-model:visible="showDialog"
    :description="disabledMessage"
    class="w-full max-w-sm"
    @after-hide="router.replace('/')"
  />

  <Dialog v-else modal dismissableMask
    v-model:visible="showDialog"
    class="@container w-full max-w-md"
    pt:content="flex flex-col overflow-hidden"
    @after-hide="router.replace('/')"
  >
    <template #header>
      <p class="text-xl font-semibold">{{ t('title') }}</p>
    </template>

    <p v-if="!bankData.amount?.krw" class="mb-2" v-html="t('instruction.withoutAmount')" />
    <p v-else class="mb-2" v-html="t('instruction.withAmount', { amount: amountHTML })" />
    <div ref="container" class="space-y-3 py-3 overflow-auto">
      <CopyWrapper
        v-for="account in bankData.accounts"
        :key="account.number"
        :source="formatAccountPayload(account)"
        v-slot="{ trigger: copyAll, copied: copiedAll }"
      >
        <ActionCard :standing
          class="items-center gap-0 rounded-2xl border border-neutral-500/10 bg-surface-100/10 shadow-sm transition duration-300"
          :class="copiedAll && 'text-success'"
        >
          <div class="flex items-center gap-4 px-4 py-5">
            <div class="flex size-13 shrink-0 items-center justify-center rounded-full bg-surface shadow-sm @max-2xs:hidden">
              <img
                :src="urlResolver(`${account.type === 'bank' ? 'banks' : 'securities'}/${account.firm}.svg`).value"
                :alt="account.firm"
                class="size-10 object-contain"
              />
            </div>

            <div class="flex flex-col items-baseline gap-1">
              <div class="flex flex-wrap items-baseline gap-2">
                <span class="text-xl font-bold">{{ account.firm }}</span>
                <span class="text-sm">{{ account.holder }}</span>
              </div>

              <CopyWrapper
                :source="account.number"
                v-slot="{ trigger: copyNumbers, copied: copiedNumbers, source }"
              >
                <Button
                  text
                  :label="source"
                  :icon="copiedNumbers ? 'pi pi-check' : 'pi pi-copy'"
                  iconPos="right"
                  severity="contrast"
                  class="p-0 gap-1 leading-none"
                  :class="(copiedAll || copiedNumbers) && 'text-success'"
                  :aria-label="t('copy.label.numbers', { firm: account.firm })"
                  @click="copyNumbers"
                />
              </CopyWrapper>
            </div>
          </div>

          <template #button>
            <Button
              class="text-white size-full rounded-none border-none"
              :class="copiedAll ? 'bg-success' : 'bg-dark'"
              :icon="copiedAll ? 'pi pi-check' : !standing && 'pi pi-clipboard'"
              iconPos="right"
              :label="standing && (copiedAll ? t('copy.copied.all') : t('copy.label.all'))"
              :size="standing ? 'small' : 'large'"
              :aria-label="t('copy.aria', { firm: account.firm })"
              @click="copyAll"
            />
          </template>
        </ActionCard>
      </CopyWrapper>
    </div>
  </Dialog>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { DisabledDialog } from '@/components';
import { ActionCard, CopyWrapper } from '@shared/components/base';
import { BREAKPOINTS, useElementBreakpoints, useLocaleResolver, useUrlResolver } from '@shared/composables';

import config from './config.json';
import bankData from './bank.json';

const { t, locale } = useI18n({
  useScope: 'local',
  messages: config.messages.index,
});

const router = useRouter();
const showDialog = ref(true);
const container = ref()

const disabledMessage = useLocaleResolver(bankData.disabled);

const amountHTML = computed(() => (
  `<strong class="text-emerald-500">₩${bankData.amount?.krw?.toLocaleString(locale.value)}</strong>`
));

const formatAccountPayload = (account) => bankData.amount?.krw
  ? `${account.firm} ${account.number} ${account.holder} [${bankData.amount.krw}원]`
  : `${account.firm} ${account.number} ${account.holder}`;
const standing = useElementBreakpoints(container, BREAKPOINTS.CONTAINER, { strategy: 'max-width' }).sm

const urlResolver = useUrlResolver('https://raw.githubusercontent.com/EedoCelsius/Korean-payment-icons/refs/heads/main/firms/')
</script>
