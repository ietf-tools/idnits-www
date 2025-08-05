<template>
  <UApp>
    <div class="fixed inset-0 flex overflow-hidden">
      <!-- Mobile -->
      <USlideover v-model:open="siteStore.mobileSidebarOpen" side="left">
        <template #content>
          <div class="h-18 shrink-0 flex items-center gap-1.5 px-4">
            <ToolsMenu />
            <USeparator orientation="vertical" class="mx-3" />
            <UButton class="cursor-pointer" icon="i-lucide-x" size="lg" color="neutral" variant="subtle" @click="siteStore.mobileSidebarOpen = false" />
          </div>

          <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
            <UNavigationMenu
              :items="links[0]"
              orientation="vertical"
              :ui="{ link: 'text-lg' }"
            />

            <USeparator />

            <UNavigationMenu
              :items="links[1]"
              orientation="vertical"
              class="mt-auto"
              :ui="{ link: 'text-md' }"
            />
          </div>
        </template>
      </USlideover>

      <!-- Desktop -->
      <div class="hidden lg:flex flex-col min-h-svh min-w-16 w-72 shrink-0 border-r border-(--ui-border) bg-(--ui-bg-elevated)/25">
        <div class="h-18 shrink-0 flex items-center gap-1.5 px-4">
          <ToolsMenu />
        </div>

        <div class="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
          <UNavigationMenu
            :items="links[0]"
            orientation="vertical"
          />

          <USeparator />

          <UButton
            icon="i-lucide-download"
            label="Download CLI"
            variant="subtle"
            color="secondary"
            to="https://github.com/ietf-tools/idnits/tree/v3?tab=readme-ov-file#installation"
            target="_blank"
          />

          <div v-if="showResults">
            <USeparator class="mb-4" />
            <UNavigationMenu
              :items="resultLinks"
              orientation="vertical"
            />
          </div>

          <UNavigationMenu
            :items="links[1]"
            orientation="vertical"
            class="mt-auto"
          />
        </div>
      </div>

      <slot />
    </div>
  </UApp>
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

const route = useRoute()
const siteStore = useSiteStore()

const showResults = computed(() => {
  return route.name === 'results'
})

const links = [[{
  label: 'Overview',
  icon: 'i-lucide-house',
  to: '/',
  onSelect() {
    siteStore.mobileSidebarOpen = false
  }
}, {
  label: 'Validate File',
  icon: 'i-lucide-file-up',
  to: '/upload',
  onSelect() {
    siteStore.mobileSidebarOpen = false
  }
}, {
  label: 'Validate Remote URL',
  icon: 'i-lucide-cloud-download',
  to: '/remote',
  onSelect() {
    siteStore.mobileSidebarOpen = false
  }
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-cog',
  onSelect() {
    siteStore.mobileSidebarOpen = false
  }
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/ietf-tools/idnits/issues',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/ietf-tools/idnits',
  target: '_blank'
}]]

const resultLinks = [
  {
    label: 'Results',
    icon: 'i-lucide-list-checks',
    to: '/results',
    onSelect() {
      siteStore.mobileSidebarOpen = false
    }
  }
]
</script>
