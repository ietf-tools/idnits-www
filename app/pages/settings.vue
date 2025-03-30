<template>
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Settings" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <div>
          <UPageCard
            title="General"
            description="Common site settings"
            variant="naked"
            class="mb-4"
          />

          <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-(--ui-border)' }">
            <UFormField
              key="colorMode"
              name="Color Theme"
              label="Color Theme"
              description="Display the site in light / dark mode or follow system settings."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <UColorModeSelect />
            </UFormField>
          </UPageCard>
        </div>

        <div>
          <UPageCard
            title="Validation"
            description="Configure how validation on documents should be performed."
            variant="naked"
            class="mb-4"
          />

          <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-(--ui-border)' }">
            <UFormField
              key="defaultMode"
              name="Default Validation Mode"
              label="Default Validation Mode"
              description="The validation mode to use by default."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USelect
                v-model="siteStore.defaultValidationMode"
                :items="validationModes"
                class="w-44"
              />
            </UFormField>
            <UFormField
              key="offline"
              name="Offline Only"
              label="Offline Only"
              description="Disable validation checks that require connection to remote APIs."
              class="flex items-center justify-between not-last:pb-4 gap-2"
            >
              <USwitch
                v-model="siteStore.offline"
              />
            </UFormField>
          </UPageCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import { MODES } from '@ietf-tools/idnits'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const validationModes = ref([
  { label: 'Normal', value: MODES.NORMAL },
  { label: 'Forgive Checklist', value: MODES.FORGIVE_CHECKLIST },
  { label: 'Submission', value: MODES.SUBMISSION }
])
</script>
