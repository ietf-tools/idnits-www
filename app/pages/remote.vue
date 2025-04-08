<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-cloud-download" />
        <h1 class="flex flex-col items-left font-semibold truncate">
          <span class="lg:hidden text-xs text-primary-500 uppercase">idnits</span>
          Validate Remote URL
        </h1>
      </div>
      <ToggleMobileMenuBtn />
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6 w-full lg:max-w-4xl mx-auto">
      <span>Enter an URL to an Internet-Draft to validate, in either XML or plain text (TXT) format:</span>

      <UCard variant="subtle" :ui="{ body: 'divide-y divide-(--ui-border) flex flex-col flex-1 gap-y-4' }">
        <UFormField
          key="draftUrl"
          name="Internet-Draft URL"
          label="Internet-Draft URL"
          description="Full URL to the document to validate. Note that only URLs from authorized domains are accepted. Download the CLI to validate any URL."
          class=" not-last:pb-4"
        >
          <UInput
            v-model="draftUrl"
            placeholder="https://"
            class="w-full mt-2"
          />
        </UFormField>
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
      </UCard>
      <div class="flex justify-between items-start">
        <UButton label="More Settings" icon="i-lucide-cog" variant="subtle" color="secondary" size="sm" to="/settings" />
        <UButton label="Validate" icon="i-lucide-check" color="primary" size="lg" class="cursor-pointer" @click="validate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MODES } from '@ietf-tools/idnits'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const toast = useToast()

const draftUrl = ref('')

async function validate() {
  try {
    const docData = await siteStore.fetchRemoteDoc(draftUrl.value)

    siteStore.validate(docData[0], docData[1])
    navigateTo({
      name: 'results',
      query: {
        url: draftUrl.value
      }
    })
  } catch (err) {
    console.warn(err)
    toast.add({
      title: 'Error',
      description: err.message,
      icon: 'i-lucide-triangle-alert',
      color: 'error'
    })
  }
}

const validationModes = ref([
  { label: 'Normal', value: MODES.NORMAL },
  { label: 'Forgive Checklist', value: MODES.FORGIVE_CHECKLIST },
  { label: 'Submission', value: MODES.SUBMISSION }
])
</script>
