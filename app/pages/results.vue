<template>
  <UDashboardPanel id="results">
    <template #header>
      <UDashboardNavbar title="Validation Results" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UAlert
        title="Fatal Error"
        :description="siteStore.error"
        icon="i-lucide-circle-x"
        color="error"
        :ui="{
          icon: 'text-3xl'
        }"
      />
    </template>
  </UDashboardPanel>
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>
