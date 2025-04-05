<template>
  <UButton class="lg:hidden cursor-pointer" icon="i-lucide-menu" size="xl" color="neutral" variant="subtle" @click="siteStore.mobileSidebarOpen = !siteStore.mobileSidebarOpen" />
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>
