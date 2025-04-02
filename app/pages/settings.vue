<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-cog" />
        <h1 class="flex items-center gap-1.5 font-semibold text-(--ui-text-highlighted) truncate">Settings</h1>
      </div>
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <div>
          <div class="text-base text-pretty font-semibold text-(--ui-text-highlighted)">General</div>
          <div class="text-[15px] text-pretty text-(--ui-text-muted) mt-1">Common site settings</div>
          <UCard class="mt-4" variant="subtle" :ui="{ container: 'divide-y divide-(--ui-border)' }">
            <UFormField
              key="colorMode"
              name="Color Theme"
              label="Color Theme"
              description="Display the site in light / dark mode or follow system settings."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USelect
                v-model="siteStore.theme"
                :items="themes"
                class="w-44"
              />
            </UFormField>
          </UCard>
        </div>

        <div>
          <div class="text-base text-pretty font-semibold text-(--ui-text-highlighted)">Validation</div>
          <div class="text-[15px] text-pretty text-(--ui-text-muted) mt-1">Configure how validation on documents should be performed.</div>
          <UCard class="mt-4" variant="subtle" :ui="{ body: 'divide-y divide-(--ui-border) flex flex-col flex-1 gap-y-4' }">
            <UFormField
              key="validationMode"
              name="Validation Mode"
              label="Validation Mode"
              description="The mode to use when validating Internet-Drafts."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USelect
                v-model="siteStore.mode"
                :items="validationModes"
                class="w-44"
              />
            </UFormField>
            <UFormField
              key="offline"
              name="Offline Only"
              label="Offline Only"
              description="Disable validation checks that require a connection to remote APIs."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USwitch
                v-model="siteStore.offline"
              />
            </UFormField>
            <UFormField
              key="useCurrentYear"
              name="Use Current Year"
              label="Use Current Year"
              description="Expect the current year in the boilerplate. Uncheck to specify a custom year."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USwitch
                v-model="siteStore.useCurrentYear"
              />
            </UFormField>
            <UFormField
              v-if="!siteStore.useCurrentYear"
              key="useCustomYear"
              name="Use Custom year"
              label="Use Custom year"
              description="Expect this custom year in the boilerplate."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <UInputNumber v-model="siteStore.customYear" class="w-32" placeholder="Enter a year" :min="1980" :max="9999" :format-options="{ useGrouping: false }" />
            </UFormField>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MODES } from '@ietf-tools/idnits'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const themes = ref([
  { label: 'System', value: 'system', icon: 'i-lucide-monitor' },
  { label: 'Light', value: 'light', icon: 'i-lucide-sun' },
  { label: 'Dark', value: 'dark', icon: 'i-lucide-moon' }
])

const validationModes = ref([
  { label: 'Normal', value: MODES.NORMAL },
  { label: 'Forgive Checklist', value: MODES.FORGIVE_CHECKLIST },
  { label: 'Submission', value: MODES.SUBMISSION }
])
</script>
