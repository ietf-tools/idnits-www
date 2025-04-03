<template>
  <UApp>
    <div class="fixed inset-0 flex overflow-hidden">
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
const links = [[{
  label: 'Overview',
  icon: 'i-lucide-house',
  to: '/'
}, {
  label: 'Validate File',
  icon: 'i-lucide-file-up',
  to: '/upload'
}, {
  label: 'Validate Remote URL',
  icon: 'i-lucide-cloud-download',
  to: '/remote'
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-cog'
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/ietf-tools/idnits-www',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/ietf-tools/idnits',
  target: '_blank'
}]]
</script>
