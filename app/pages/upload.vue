<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-file-up" />
        <h1 class="flex flex-col items-left font-semibold truncate">
          <span class="lg:hidden text-xs text-primary-500 uppercase">idnits</span>
          Validate File
        </h1>
      </div>
      <ToggleMobileMenuBtn />
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6 w-full lg:max-w-4xl mx-auto">
      <span>Select an Internet-Draft to validate, in either XML or plain text (TXT) format:</span>
      <div>
        <div
          ref="dropzone"
          :class="['flex flex-col w-full min-h-50 h-auto bg-gray-300/10 justify-center items-center rounded-xl shadow-md outline p-4', isOverDropZone ? 'outline-emerald-500 shadow-emerald-500/50' : 'outline-white/25']"
        >
          <div class="text-center">
            <strong>Drag and drop an Internet-Draft here</strong> (.xml, .txt)
          </div>
          <span class="my-3 text-gray-400">or</span>
          <UButton class="cursor-pointer" icon="i-lucide-upload" size="lg" @click="uplFileRef.click()">
            Browse File...
          </UButton>
        </div>
      </div>
      <input ref="uplFile" type="file" :accept="allowedTypes.join(', ')" class="hidden" @change="browseFileSelected">

      <UCard variant="subtle" :ui="{ body: 'divide-y divide-(--ui-border) flex flex-col flex-1 gap-y-4' }">
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
      <div class="flex justify-end">
        <UButton label="More Settings" icon="i-lucide-cog" variant="subtle" color="secondary" size="sm" to="/settings" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MODES } from '@ietf-tools/idnits'
import { useDropZone } from '@vueuse/core'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const allowedTypes = ['text/plain', 'application/xml', 'text/xml']
const dropzoneRef = useTemplateRef('dropzone')
const uplFileRef = useTemplateRef('uplFile')

const { isOverDropZone } = useDropZone(dropzoneRef, {
  async onDrop(files) {
    siteStore.validate(await files[0].arrayBuffer(), files[0].name)
    navigateTo('/results')
  },
  dataTypes: ['text/plain', 'application/xml', 'text/xml'],
  preventDefaultForUnhandled: true,
  multiple: false
})

async function browseFileSelected() {
  if (uplFileRef.value.files?.length) {
    siteStore.validate(new Uint8Array(await uplFileRef.value.files[0].arrayBuffer()), uplFileRef.value.files[0].name)
    navigateTo('/results')
  }
}

const validationModes = ref([
  { label: 'Normal', value: MODES.NORMAL },
  { label: 'Forgive Checklist', value: MODES.FORGIVE_CHECKLIST },
  { label: 'Submission', value: MODES.SUBMISSION }
])
</script>
