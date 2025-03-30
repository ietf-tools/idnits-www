<template>
  <UDashboardPanel id="upload">
    <template #header>
      <UDashboardNavbar title="Validate File" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <span>Select an Internet-Draft to validate, in either XML or plain text (TXT) format:</span>
      <div>
        <div
          ref="dropzone"
          :class="['flex flex-col w-full min-h-50 h-auto bg-gray-300/10 justify-center items-center rounded-xl shadow-md outline', isOverDropZone ? 'outline-emerald-500 shadow-emerald-500/50' : 'outline-white/25']"
        >
          <div>
            <strong>Drag and drop an Internet-Draft here</strong> (.xml, .txt)
          </div>
          <span class="my-3 text-gray-400">or</span>
          <UButton class="cursor-pointer" icon="i-lucide-upload" size="lg" @click="uplFileRef.click()">
            Browse File...
          </UButton>
        </div>
      </div>
      <input ref="uplFile" type="file" :accept="allowedTypes.join(', ')" class="hidden" @change="browseFileSelected">
    </template>
  </UDashboardPanel>
</template>

<script setup>
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
    siteStore.validate(await uplFileRef.value.files[0].arrayBuffer(), uplFileRef.value.files[0].name)
    navigateTo('/results')
  }
}
</script>
