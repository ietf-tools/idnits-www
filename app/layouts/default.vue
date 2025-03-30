<template>
  <UApp>
    <UDashboardGroup>
      <UDashboardSearch :groups="groups" />

      <UDashboardSidebar
        v-model:open="open"
        collapsible
        resizable
        class="bg-(--ui-bg-elevated)/25"
        :ui="{ footer: 'lg:border-t lg:border-(--ui-border)' }"
      >
        <template #header="{ collapsed }">
          <ToolsMenu :collapsed="collapsed" />
        </template>

        <template #default="{ collapsed }">
          <UDashboardSearchButton :collapsed="collapsed" label="Command Palette..." class="bg-transparent ring-(--ui-border)" />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            class="mt-auto"
          />
        </template>
      </UDashboardSidebar>

      <slot />
    </UDashboardGroup>
  </UApp>
</template>

<script setup>
const open = ref(false)

const links = [[{
  label: 'Overview',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Validate File',
  icon: 'i-lucide-file-up',
  to: '/upload',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Validate Remote URL',
  icon: 'i-lucide-cloud-download',
  to: '/remote',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-cog',
  onSelect: () => {
    open.value = false
  }
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

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'history',
  label: 'History',
  items: [{
    id: 'past-results',
    label: 'View Last Validation Results',
    icon: 'i-lucide-file-clock'
  }]
}])
</script>
